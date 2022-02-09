package me.flyray.bsin.gateway.service;

import io.seata.common.util.StringUtils;
import io.seata.saga.engine.repo.StateMachineRepository;
import io.seata.saga.statelang.domain.StateMachine;
import io.seata.saga.statelang.parser.StateMachineParserFactory;
import me.flyray.bsin.gateway.config.BsinSagaStateMachineConfig;

/**
 * @author ：bolei
 * @date ：Created in 2021/12/4 1:13
 * @description：自定义注册状态机
 * 当部署一个状态机的时候将状态机注册到状态机引擎中
 * @modified By：
 */

public class BsinRegistryStateMachineService {

    public void registryStateMachine(String content){

        BsinSagaStateMachineConfig bsinSagaStateMachineConfig = new BsinSagaStateMachineConfig();

        StateMachineRepository stateMachineRepository = bsinSagaStateMachineConfig.getStateMachineRepository();

        StateMachine stateMachine = StateMachineParserFactory.getStateMachineParser("").parse(content);
        if (stateMachine != null) {
            stateMachine.setContent(content);
            if (StringUtils.isBlank(stateMachine.getTenantId())) {
                stateMachine.setTenantId("tenantId");
            }
            stateMachineRepository.registryStateMachine(stateMachine);
        }

    }
}
