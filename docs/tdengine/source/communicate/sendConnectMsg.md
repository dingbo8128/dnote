# Send Connect Message

## taosConnectImpl

```cpp title="clientImpl.c"
SMsgSendInfo* body = buildConnectMsg(pRequest, connType);

int64_t transporterId = 0;
asyncSendMsgToServer(pTscObj->pAppInfo->pTransporter, &pTscObj->pAppInfo->mgmtEp.epSet, &transporterId, body);
```

```cpp title="queryUtil.c"
int32_t asyncSendMsgToServer(void* pTransporter, SEpSet* epSet, int64_t* pTransporterId, const SMsgSendInfo* pInfo) {
  return asyncSendMsgToServerExt(pTransporter, epSet, pTransporterId, pInfo, false, NULL);
}
```

## SRpcMsg

```cpp
typedef struct SRpcMsg {
  tmsg_t  msgType;
  void *  pCont;
  int     contLen;
  int32_t code;
  void *  handle;         // rpc handle returned to app
  void *  ahandle;        // app handle set by client
  int64_t refId;          // refid, used by server
  int     noResp;         // has response or not(default 0, 0: resp, 1: no resp);
  int     persistHandle;  // persist handle or not

} SRpcMsg;
```

## asyncSendMsgToServerExt

```cpp title="queryUtil.c"
int32_t asyncSendMsgToServerExt(void* pTransporter, SEpSet* epSet, int64_t* pTransporterId, const SMsgSendInfo* pInfo, bool persistHandle, void *rpcCtx) {
  char* pMsg = rpcMallocCont(pInfo->msgInfo.len);
  if (NULL == pMsg) {
    qError("0x%" PRIx64 " msg:%s malloc failed", pInfo->requestId, TMSG_INFO(pInfo->msgType));
    terrno = TSDB_CODE_TSC_OUT_OF_MEMORY;
    return terrno;
  }

  memcpy(pMsg, pInfo->msgInfo.pData, pInfo->msgInfo.len);
  SRpcMsg rpcMsg = {.msgType = pInfo->msgType,
                    .pCont = pMsg,
                    .contLen = pInfo->msgInfo.len,
                    .ahandle = (void*)pInfo,
                    .handle = pInfo->msgInfo.handle,
                    .persistHandle = persistHandle,
                    .code = 0};
  if (pInfo->msgType == TDMT_VND_QUERY || pInfo->msgType == TDMT_VND_FETCH ||
      pInfo->msgType == TDMT_VND_QUERY_CONTINUE) {
    rpcMsg.persistHandle = 1;
  }

  assert(pInfo->fp != NULL);

  rpcSendRequestWithCtx(pTransporter, epSet, &rpcMsg, pTransporterId, rpcCtx);
  return TSDB_CODE_SUCCESS;
}
```

## rpcSendRequestWithCtx

```cpp title="trans.c"
void rpcSendRequestWithCtx(void* shandle, const SEpSet* pEpSet, SRpcMsg* pMsg, int64_t* pRid, SRpcCtx* pCtx) {
  transSendRequest(shandle, pEpSet, pMsg, pCtx);
}
```

## transSendRequest

```cpp title="transCli.c"
void transSendRequest(void* shandle, const SEpSet* pEpSet, STransMsg* pReq, STransCtx* ctx) {
  STrans* pTransInst = (STrans*)shandle;
  int     index = CONN_HOST_THREAD_INDEX((SCliConn*)pReq->handle);
  if (index == -1) {
    index = cliRBChoseIdx(pTransInst);
  }

  STransConnCtx* pCtx = taosMemoryCalloc(1, sizeof(STransConnCtx));
  pCtx->epSet = *pEpSet;
  pCtx->ahandle = pReq->ahandle;
  pCtx->msgType = pReq->msgType;
  pCtx->hThrdIdx = index;

  if (ctx != NULL) {
    pCtx->appCtx = *ctx;
  }
  assert(pTransInst->connType == TAOS_CONN_CLIENT);

  SCliMsg* cliMsg = taosMemoryCalloc(1, sizeof(SCliMsg));
  cliMsg->ctx = pCtx;
  cliMsg->msg = *pReq;
  cliMsg->st = taosGetTimestampUs();
  cliMsg->type = Normal;

  SCliThrdObj* thrd = ((SCliObj*)pTransInst->tcphandle)->pThreadObj[index];

  tDebug("send request at thread:%d %p, dst: %s:%d, app:%p", index, pReq, EPSET_GET_INUSE_IP(&pCtx->epSet),
         EPSET_GET_INUSE_PORT(&pCtx->epSet), pReq->ahandle);
  ASSERT(transSendAsync(thrd->asyncPool, &(cliMsg->q)) == 0);
}
```
## transSendAsync

```cpp title="transComm.c"
int transSendAsync(SAsyncPool* pool, queue* q) {
  int idx = pool->index;
  idx = idx % pool->nAsync;
  // no need mutex here
  if (pool->index++ > pool->nAsync) {
    pool->index = 0;
  }
  uv_async_t* async = &(pool->asyncs[idx]);
  SAsyncItem* item = async->data;

  int64_t st = taosGetTimestampUs();
  taosThreadMutexLock(&item->mtx);
  QUEUE_PUSH(&item->qmsg, q);
  taosThreadMutexUnlock(&item->mtx);
  int64_t el = taosGetTimestampUs() - st;
  if (el > 50) {
    // tInfo("lock and unlock cost: %d", (int)el);
  }
  return uv_async_send(async);
}
```