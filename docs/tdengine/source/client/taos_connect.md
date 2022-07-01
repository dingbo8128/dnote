# taos_connect

## taos_connect

```cpp title="clientMain.c"
TAOS *taos_connect(const char *ip, const char *user, const char *pass, const char *db, uint16_t port) {
  tscDebug("try to connect to %s:%u, user:%s db:%s", ip, port, user, db);
  if (user == NULL) {
    user = TSDB_DEFAULT_USER;
  }

  if (pass == NULL) {
    pass = TSDB_DEFAULT_PASS;
  }

  return taos_connect_internal(ip, user, pass, NULL, db, port, CONN_TYPE__QUERY);
}
```

## taos_connect_internal

```cpp title="clientImpl.c" 
TAOS* taos_connect_internal(const char* ip, const char* user, const char* pass, const char* auth, const char* db,
                            uint16_t port, int connType) {
  if (taos_init() != TSDB_CODE_SUCCESS) {
    return NULL;
  }

  if (!validateUserName(user)) {
    terrno = TSDB_CODE_TSC_INVALID_USER_LENGTH;
    return NULL;
  }

  char localDb[TSDB_DB_NAME_LEN] = {0};
  if (db != NULL && strlen(db) > 0) {
    if (!validateDbName(db)) {
      terrno = TSDB_CODE_TSC_INVALID_DB_LENGTH;
      return NULL;
    }

    tstrncpy(localDb, db, sizeof(localDb));
    strdequote(localDb);
  }

  char secretEncrypt[TSDB_PASSWORD_LEN + 1] = {0};
  if (auth == NULL) {
    if (!validatePassword(pass)) {
      terrno = TSDB_CODE_TSC_INVALID_PASS_LENGTH;
      return NULL;
    }

    taosEncryptPass_c((uint8_t*)pass, strlen(pass), secretEncrypt);
  } else {
    tstrncpy(secretEncrypt, auth, tListLen(secretEncrypt));
  }

  SCorEpSet epSet = {0};
  if (ip) {
    if (initEpSetFromCfg(ip, NULL, &epSet) < 0) {
      return NULL;
    }
  } else {
    if (initEpSetFromCfg(tsFirst, tsSecond, &epSet) < 0) {
      return NULL;
    }
  }

  if (port) {
    epSet.epSet.eps[0].port = port;
    epSet.epSet.eps[1].port = port;
  }

  char* key = getClusterKey(user, secretEncrypt, ip, port);

  SAppInstInfo** pInst = NULL;
  taosThreadMutexLock(&appInfo.mutex);

  pInst = taosHashGet(appInfo.pInstMap, key, strlen(key));
  SAppInstInfo* p = NULL;
  if (pInst == NULL) {
    p = taosMemoryCalloc(1, sizeof(struct SAppInstInfo));
    p->mgmtEp = epSet;
    p->pTransporter = openTransporter(user, secretEncrypt, tsNumOfCores);
    p->pAppHbMgr = appHbMgrInit(p, key);
    taosHashPut(appInfo.pInstMap, key, strlen(key), &p, POINTER_BYTES);

    pInst = &p;
  }

  taosThreadMutexUnlock(&appInfo.mutex);

  taosMemoryFreeClear(key);
  return taosConnectImpl(user, &secretEncrypt[0], localDb, NULL, NULL, *pInst, connType);
}

int32_t buildRequest(STscObj* pTscObj, const char* sql, int sqlLen, SRequestObj** pRequest) {
  *pRequest = createRequest(pTscObj, NULL, NULL, TSDB_SQL_SELECT);
  if (*pRequest == NULL) {
    tscError("failed to malloc sqlObj");
    return TSDB_CODE_TSC_OUT_OF_MEMORY;
  }

  (*pRequest)->sqlstr = taosMemoryMalloc(sqlLen + 1);
  if ((*pRequest)->sqlstr == NULL) {
    tscError("0x%" PRIx64 " failed to prepare sql string buffer", (*pRequest)->self);
    (*pRequest)->msgBuf = strdup("failed to prepare sql string buffer");
    return TSDB_CODE_TSC_OUT_OF_MEMORY;
  }

  strntolower((*pRequest)->sqlstr, sql, (int32_t)sqlLen);
  (*pRequest)->sqlstr[sqlLen] = 0;
  (*pRequest)->sqlLen = sqlLen;

  if (taosHashPut(pTscObj->pRequests, &(*pRequest)->self, sizeof((*pRequest)->self), &(*pRequest)->self,
                  sizeof((*pRequest)->self))) {
    destroyRequest(*pRequest);
    *pRequest = NULL;
    tscError("put request to request hash failed");
    return TSDB_CODE_TSC_OUT_OF_MEMORY;
  }

  tscDebugL("0x%" PRIx64 " SQL: %s, reqId:0x%" PRIx64, (*pRequest)->self, (*pRequest)->sqlstr, (*pRequest)->requestId);
  return TSDB_CODE_SUCCESS;
}
```

## taosConnectImpl

```c title="clientImpl.c"
STscObj* taosConnectImpl(const char* user, const char* auth, const char* db, __taos_async_fn_t fp, void* param,
                         SAppInstInfo* pAppInfo, int connType) {
  STscObj* pTscObj = createTscObj(user, auth, db, pAppInfo);
  if (NULL == pTscObj) {
    terrno = TSDB_CODE_TSC_OUT_OF_MEMORY;
    return pTscObj;
  }

  SRequestObj* pRequest = createRequest(pTscObj, fp, param, TDMT_MND_CONNECT);
  if (pRequest == NULL) {
    destroyTscObj(pTscObj);
    terrno = TSDB_CODE_TSC_OUT_OF_MEMORY;
    return NULL;
  }

  SMsgSendInfo* body = buildConnectMsg(pRequest, connType);

  int64_t transporterId = 0;
  asyncSendMsgToServer(pTscObj->pAppInfo->pTransporter, &pTscObj->pAppInfo->mgmtEp.epSet, &transporterId, body);

  tsem_wait(&pRequest->body.rspSem);
  if (pRequest->code != TSDB_CODE_SUCCESS) {
    const char* errorMsg =
        (pRequest->code == TSDB_CODE_RPC_FQDN_ERROR) ? taos_errstr(pRequest) : tstrerror(pRequest->code);
    printf("failed to connect to server, reason: %s\n\n", errorMsg);

    destroyRequest(pRequest);
    taos_close(pTscObj);
    pTscObj = NULL;
  } else {
    tscDebug("0x%" PRIx64 " connection is opening, connId:%u, dnodeConn:%p, reqId:0x%" PRIx64, pTscObj->id,
             pTscObj->connId, pTscObj->pAppInfo->pTransporter, pRequest->requestId);
    destroyRequest(pRequest);
  }

  return pTscObj;
}
```