package me.flyray.bsin.gateway.service.impl;

import io.seata.common.util.CollectionUtils;
import io.seata.common.util.StringUtils;
import io.seata.saga.engine.repo.impl.StateMachineRepositoryImpl;
import io.seata.saga.statelang.domain.StateMachine;
import io.seata.saga.statelang.domain.impl.StateMachineImpl;
import io.seata.saga.statelang.parser.StateMachineParserFactory;
import lombok.extern.slf4j.Slf4j;
import me.flyray.bsin.gateway.pojo.BsinStateMachineDefServiceParameter;
import me.flyray.bsin.gateway.service.BsinStateMachineDefServiceParameterService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.util.List;

/**
 * @author ：bolei
 * @date ：Created in 2021/12/3 23:47
 * @description：状态机持久化自定义
 * @modified By：
 */

@Slf4j
public class BsinStateMachineRepositoryImpl extends StateMachineRepositoryImpl {

    private static final Logger LOGGER = LoggerFactory.getLogger(BsinStateMachineRepositoryImpl.class);
    private String jsonParserName = "fastjson";

    /**
     * 自定义获取状态机数据
     * @param resources
     * @param tenantId
     * @throws IOException
     */
    @Override
    public void registryByResources(Resource[] resources, String tenantId) throws IOException {
        // 注释开发环境:启动时从resources中加载获取状态机定义参数列表并入库
        /*if (resources != null) {
            for (Resource resource : resources) {
                String json = IOUtils.toString(resource.getInputStream(), charset);
                registryStateMachine(json,tenantId);
            }
        }*/

        BsinStateMachineDefServiceParameterService bsinStateMachineDefServiceParameterService = new BsinStateMachineDefServiceParameterService();
        // 从数据库中获取状态机数据
        List<BsinStateMachineDefServiceParameter>  bsinStateMachineDefServiceParameterList = bsinStateMachineDefServiceParameterService.getAllStateMachineDefServiceParameter();
        for (BsinStateMachineDefServiceParameter bsinStateMachineDefServiceParameter : bsinStateMachineDefServiceParameterList) {
            StateMachineImpl stateMachine = new StateMachineImpl();
            BeanUtils.copyProperties(bsinStateMachineDefServiceParameter, stateMachine);
            registryStateMachine(stateMachine.getContent(), stateMachine.getTenantId());
        }

    }

    /**
     * 将状态机数据加载到状态机引擎中
     * @param json
     * @param tenantId
     */
    public void registryStateMachine(String json,String tenantId){
        StateMachine stateMachine = StateMachineParserFactory.getStateMachineParser(this.jsonParserName).parse(json);
        if (stateMachine != null) {
            stateMachine.setContent(json);
            if (StringUtils.isBlank(stateMachine.getTenantId())) {
                stateMachine.setTenantId(tenantId);
            }
            registryStateMachine(stateMachine);
            if (LOGGER.isDebugEnabled()) {
                LOGGER.debug("===== StateMachine Loaded: \n{}", json);
            }
        }
    }

}
