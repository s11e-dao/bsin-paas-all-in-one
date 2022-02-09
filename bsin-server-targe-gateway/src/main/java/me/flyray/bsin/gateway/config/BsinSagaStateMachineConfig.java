package me.flyray.bsin.gateway.config;

import io.seata.common.loader.EnhancedServiceLoader;
import io.seata.saga.engine.StateMachineConfig;
import io.seata.saga.engine.config.DbStateMachineConfig;
import io.seata.saga.engine.pcext.InterceptableStateHandler;
import io.seata.saga.engine.pcext.StateHandler;
import io.seata.saga.engine.pcext.StateHandlerInterceptor;
import io.seata.saga.rm.SagaResourceManager;
import me.flyray.bsin.gateway.service.impl.BsinStateMachineRepositoryImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContextAware;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * @author ：bolei
 * @date ：Created in 2021/12/3 22:55
 * @description：bsin状态机自定义配置
 * DbStateMachineConfig是开源的相当于企业版 DtxSagaStateMachineConfig
 * @modified By：
 */

public class BsinSagaStateMachineConfig extends DbStateMachineConfig {

    private static final Logger LOGGER = LoggerFactory.getLogger(BsinSagaStateMachineConfig.class);

    private Resource[] resources = new Resource[0];

    /**
     * 程序加载的时候初始化状态机引擎配置
     * @throws Exception
     */
    @Override
    protected void init() throws Exception {
        setStateMachineRepository(initStateMachineRepository());
        super.init();
    }

    /**
     * 自定义状态机存储实现类
     * @return
     */
    public BsinStateMachineRepositoryImpl initStateMachineRepository() {
        BsinStateMachineRepositoryImpl stateMachineRepository = new BsinStateMachineRepositoryImpl();
        stateMachineRepository.setCharset(super.getCharset());
        stateMachineRepository.setSeqGenerator(super.getSeqGenerator());
        stateMachineRepository.setStateLangStore(super.getStateLangStore());
        stateMachineRepository.setDefaultTenantId(super.getDefaultTenantId());
        if (this.resources != null) {
            try {
                stateMachineRepository.registryByResources(this.resources, super.getDefaultTenantId());
            } catch (IOException var5) {
                LOGGER.error("Load State Language Resources failed.", var5);
            }
        }

        return stateMachineRepository;
    }

    @Override
    protected void loadStateHandlerInterceptors(Map<String, StateHandler> stateHandlerMap) {
        Iterator var2 = stateHandlerMap.values().iterator();

        while(true) {
            StateHandler stateHandler;
            do {
                if (!var2.hasNext()) {
                    return;
                }

                stateHandler = (StateHandler)var2.next();
            } while(!(stateHandler instanceof InterceptableStateHandler));

            InterceptableStateHandler interceptableStateHandler = (InterceptableStateHandler)stateHandler;
            List<StateHandlerInterceptor> interceptorList = EnhancedServiceLoader.loadAll(StateHandlerInterceptor.class);
            Iterator var6 = interceptorList.iterator();

            while(var6.hasNext()) {
                StateHandlerInterceptor interceptor = (StateHandlerInterceptor)var6.next();
                if (interceptor.match(interceptableStateHandler.getClass())) {
                    if(!interceptor.getClass().getSimpleName().equalsIgnoreCase("ServiceTaskHandlerInterceptor")){
                        interceptableStateHandler.addInterceptor(interceptor);
                    }
                }

                if (interceptor instanceof ApplicationContextAware) {
                    ((ApplicationContextAware)interceptor).setApplicationContext(this.getApplicationContext());
                }
            }
        }
    }

}
