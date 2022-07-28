package me.flyray.bsin.gateway.service.impl;

import com.alipay.sofa.rpc.api.GenericService;
import com.alipay.sofa.rpc.config.ConsumerConfig;
import com.alipay.sofa.rpc.registry.RegistryFactory;
import io.seata.saga.engine.StateMachineEngine;
import io.seata.saga.statelang.domain.ExecutionStatus;
import io.seata.saga.statelang.domain.StateMachineInstance;
import me.flyray.bsin.gateway.common.ApiResult;
import me.flyray.bsin.gateway.domain.ChoreographyServiceBiz;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author ：bolei
 * @date ：Created in 2022/2/7 17:36
 * @description：PRC服务调用
 * @modified By：
 */

@Service
public class BsinInvokeService {

    public static StateMachineEngine stateMachineEngine;

    private static ConcurrentHashMap<String, GenericService> concurrentHashMap = new ConcurrentHashMap<String, GenericService>();

    /**
     * sofa泛化调用
     */
    public Map genericInvoke(String serviceName,String methodName,Map<String,Object> reqParam){
        // 实例化调用客户端
        ConsumerConfig<GenericService> consumerConfig = new ConsumerConfig<GenericService>()
                .setInterfaceId("me.flyray.bsin.facade.service." + serviceName)
                .setGeneric(true)
                .setProtocol("bolt")
                .setSubscribe(true)
                .setRegister(true)
                .setTimeout(60000)
                .setRepeatedReferLimit(-1)
                .setRegistry(RegistryFactory.getRegistryConfigs());
        // 解决sofa consumerConfig重复实例化不能超过三次问题
        String genericServiceKey = consumerConfig.buildKey();
        GenericService genericService = concurrentHashMap.get(genericServiceKey);
        if (null == genericService) {
            synchronized (GenericService.class) {
                genericService = concurrentHashMap.get(genericServiceKey);
                if (null == genericService) {
                    genericService = consumerConfig.refer();
                    concurrentHashMap.put(genericServiceKey, genericService);
                }
            }
        }

        // 根据服务和方法及参数进行远程RPC调用
        Map result = (Map) genericService.$invoke(methodName, new String[] { "java.util.Map" },new Object[] { reqParam });
        return result;
    }

    /**
     * 编排服务调用
     */
    public ApiResult choreographyInvoke(ChoreographyServiceBiz choreographyServiceBiz, Map<String,Object> reqParam){
        String stateMachineName = choreographyServiceBiz.getStateMachineName();
        String businessKey = String.valueOf(System.currentTimeMillis());
        reqParam.put("businessKey", businessKey);
        //sync test  同步
        StateMachineInstance inst = stateMachineEngine.startWithBusinessKey(stateMachineName, null,
                businessKey, reqParam);
        Assert.isTrue(ExecutionStatus.SU.equals(inst.getStatus()),
                "saga transaction execute failed. XID: " + inst.getId());
        System.out.println("saga transaction commit succeed. XID: " + inst.getId());
        return ApiResult.ok("saga transaction commit succeed. XID: " + inst.getId());
    }

}
