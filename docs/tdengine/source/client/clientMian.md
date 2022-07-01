# clientMain

## taos_init

```cpp title="clientEnv.c"
volatile int32_t    tscInitRes = 0;

int taos_init() {
  taosThreadOnce(&tscinit, taos_init_imp);
  return tscInitRes;
}

void taos_init_imp(void) {
  // In the APIs of other program language, taos_cleanup is not available yet.
  // So, to make sure taos_cleanup will be invoked to clean up the allocated resource to suppress the valgrind warning.
  atexit(taos_cleanup);

  errno = TSDB_CODE_SUCCESS;
  taosSeedRand(taosGetTimestampSec());

  deltaToUtcInitOnce();

  if (taosCreateLog("taoslog", 10, configDir, NULL, NULL, NULL, NULL, 1) != 0) {
    tscInitRes = -1;
    return;
  }

  if (taosInitCfg(configDir, NULL, NULL, NULL, NULL, 1) != 0) {
    tscInitRes = -1;
    return;
  }

  initMsgHandleFp();
  initQueryModuleMsgHandle();

  rpcInit();

  SCatalogCfg cfg = {.maxDBCacheNum = 100, .maxTblCacheNum = 100};
  catalogInit(&cfg);

  SSchedulerCfg scfg = {.maxJobNum = 100};
  schedulerInit(&scfg);
  tscDebug("starting to initialize TAOS driver");

  taosSetCoreDump(true);

  initTaskQueue();

  clientConnRefPool = taosOpenRef(200, destroyTscObj);
  clientReqRefPool = taosOpenRef(40960, doDestroyRequest);

  // transDestroyBuffer(&conn->readBuf);
  taosGetAppName(appInfo.appName, NULL);
  taosThreadMutexInit(&appInfo.mutex, NULL);

  appInfo.pid = taosGetPId();
  appInfo.startTime = taosGetTimestampMs();
  appInfo.pInstMap = taosHashInit(4, taosGetDefaultHashFunction(TSDB_DATA_TYPE_BINARY), true, HASH_ENTRY_LOCK);
  tscDebug("client is initialized successfully");
}
```

```cpp title="osThread.c"
int32_t taosThreadOnce(TdThreadOnce * onceControl, void(*initRoutine)(void)) {
  return pthread_once(onceControl, initRoutine);
}
```

```cpp title="pthread/pthread_once.c"
int
pthread_once (pthread_once_t * once_control, void (PTW32_CDECL *init_routine) (void))
{
  if (once_control == NULL || init_routine == NULL)
    {
      return EINVAL;
    }
  
  if ((PTW32_INTERLOCKED_LONG)PTW32_FALSE ==
      (PTW32_INTERLOCKED_LONG)PTW32_INTERLOCKED_EXCHANGE_ADD_LONG((PTW32_INTERLOCKED_LONGPTR)&once_control->done,
                                                                  (PTW32_INTERLOCKED_LONG)0)) /* MBR fence */
    {
      ptw32_mcs_local_node_t node;

      ptw32_mcs_lock_acquire((ptw32_mcs_lock_t *)&once_control->lock, &node);

      if (!once_control->done)
	{

#if defined(_MSC_VER) && _MSC_VER < 1400
#pragma inline_depth(0)
#endif

	  pthread_cleanup_push(ptw32_mcs_lock_release, &node);
	  (*init_routine)();
	  pthread_cleanup_pop(0);

#if defined(_MSC_VER) && _MSC_VER < 1400
#pragma inline_depth()
#endif

	  once_control->done = PTW32_TRUE;
	}

	ptw32_mcs_lock_release(&node);
    }

  return 0;

}	
/* pthread_once */
```

## taos_options

```c title="clientEnv.c"
int taos_options(TSDB_OPTION option, const void *arg, ...) {
  static int32_t lock = 0;

  for (int i = 1; atomic_val_compare_exchange_32(&lock, 0, 1) != 0; ++i) {
    if (i % 1000 == 0) {
      tscInfo("haven't acquire lock after spin %d times.", i);
      sched_yield();
    }
  }

  int ret = taos_options_imp(option, (const char *)arg);
  atomic_store_32(&lock, 0);
  return ret;
}

int taos_options_imp(TSDB_OPTION option, const char *str) {
  if (option != TSDB_OPTION_CONFIGDIR) {
    taos_init();  // initialize global config
  } else {
    tstrncpy(configDir, str, PATH_MAX);
    tscInfo("set cfg:%s to %s", configDir, str);
    return 0;
  }

  SConfig     *pCfg = taosGetCfg();
  SConfigItem *pItem = NULL;

  switch (option) {
    case TSDB_OPTION_CONFIGDIR:
      pItem = cfgGetItem(pCfg, "configDir");
      break;
    case TSDB_OPTION_SHELL_ACTIVITY_TIMER:
      pItem = cfgGetItem(pCfg, "shellActivityTimer");
      break;
    case TSDB_OPTION_LOCALE:
      pItem = cfgGetItem(pCfg, "locale");
      break;
    case TSDB_OPTION_CHARSET:
      pItem = cfgGetItem(pCfg, "charset");
      break;
    case TSDB_OPTION_TIMEZONE:
      pItem = cfgGetItem(pCfg, "timezone");
      break;
    default:
      break;
  }
```

## taos_cleanup

```cpp
void taos_cleanup(void) {
  tscInfo("start to cleanup client environment");

  if (atomic_val_compare_exchange_32(&sentinel, TSC_VAR_NOT_RELEASE, TSC_VAR_RELEASED) != TSC_VAR_NOT_RELEASE) {
    return;
  }

  int32_t id = clientReqRefPool;
  clientReqRefPool = -1;
  taosCloseRef(id);

  cleanupTaskQueue();

  id = clientConnRefPool;
  clientConnRefPool = -1;
  taosCloseRef(id);

  hbMgrCleanUp();

  rpcCleanup();
  catalogDestroy();
  schedulerDestroy();

  tscInfo("all local resources released");
  taosCleanupCfg();
  taosCloseLog();
}
```