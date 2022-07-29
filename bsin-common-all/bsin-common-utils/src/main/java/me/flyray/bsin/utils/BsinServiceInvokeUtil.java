package me.flyray.bsin.utils;

import com.alipay.sofa.rpc.api.GenericService;
import com.alipay.sofa.rpc.config.ConsumerConfig;
import com.alipay.sofa.rpc.registry.RegistryFactory;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * bsin rpc 服务调用工具类
 */

public class BsinServiceInvokeUtil {

    private static ConcurrentHashMap<String, GenericService> concurrentHashMap = new ConcurrentHashMap<>();

    /**
     * sofa泛化调用
     */
    public Map genericInvoke(String serviceName, String methodName, Map<String,Object> reqParam){
        // 实例化调用客户端
        ConsumerConfig<GenericService> consumerConfig = new ConsumerConfig<GenericService>()
                .setInterfaceId("me.flyray.bsin.facade.service." + serviceName)
                .setGeneric(true)
                .setProtocol("bolt")
                .setSubscribe(true)
                .setRegister(true)
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

}
