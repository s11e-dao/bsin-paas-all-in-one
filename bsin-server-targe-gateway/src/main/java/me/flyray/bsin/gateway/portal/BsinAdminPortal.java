
package me.flyray.bsin.gateway.portal;

import com.alipay.sofa.rpc.api.GenericService;
import com.alipay.sofa.rpc.config.ConsumerConfig;
import com.alipay.sofa.rpc.registry.RegistryFactory;
import io.seata.saga.engine.StateMachineEngine;
import io.seata.saga.statelang.domain.ExecutionStatus;
import io.seata.saga.statelang.domain.StateMachineInstance;
import me.flyray.bsin.gateway.biz.GatewayBiz;
import me.flyray.bsin.gateway.common.ApiResult;
import me.flyray.bsin.gateway.context.BaseContextHandler;
import me.flyray.bsin.gateway.domain.ChoreographyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 管理后台网关入口
 */
@RestController
public class BsinAdminPortal {

    public static StateMachineEngine stateMachineEngine;
    public static ApplicationContext applicationContext;

    @Autowired
    public GatewayBiz gatewayBiz;

    private static ConcurrentHashMap<String, GenericService> concurrentHashMap = new ConcurrentHashMap<>();

    /**
     * http请求入口
     * 1、拼装请求参数
     * 2、唤起服务: 泛化 编排
     * 3、拼装响应报文
     * @param req
     * @return
     */
    @PostMapping("/gateway")
    public ApiResult portal(@RequestBody Map<String, Object> req) {
        String userId = (String) BaseContextHandler.get("userId");
        String nicknames = (String) BaseContextHandler.get("nickname");
        String tenantId = (String) BaseContextHandler.get("tenantId");
        String createBys = (String) BaseContextHandler.get("createBy");
        String updateBys = (String) BaseContextHandler.get("updateBy");
        // 系统参数
        String serviceName = (String) req.get("serviceName");
        String methodName = (String) req.get("methodName");
        // 业务参数
        Map<String, Object> bizParams = (Map<String, Object>) req.get("bizParams");
        Map<String, Object> pagination = (Map<String, Object>) req.get("pagination");
        // 请求业务参数build
        Map<String, Object> reqParam = new HashMap<String, Object>();
        reqParam.put("bizTenantId",bizParams.get("tenantId"));
        reqParam.put("bizUserId",bizParams.get("userId"));
        bizParams.remove("tenantId");
        bizParams.remove("userId");
        reqParam.putAll(bizParams);
        reqParam.put("pagination", pagination);

        if (!methodName.equals("login") && !methodName.equals("getPublishApps")){
            reqParam.put("userId", userId);
            reqParam.put("tenantId",tenantId);
            reqParam.put("nickname", nicknames);
            reqParam.put("createBy",createBys);
            reqParam.put("updateBy",updateBys);
        }
         // 获取编排服务
        ChoreographyService choreographyService = gatewayBiz.getChoreographyService(req);
        //         调用编排服务
        if(choreographyService != null){
            String stateMachineName =choreographyService.getStateMachineName();
            String businessKey = String.valueOf(System.currentTimeMillis());
            bizParams.put("businessKey", businessKey);
            //sync test  同步
            StateMachineInstance inst = stateMachineEngine.startWithBusinessKey(stateMachineName, null,
                    businessKey, bizParams);
            Assert.isTrue(ExecutionStatus.SU.equals(inst.getStatus()),
                    "saga transaction execute failed. XID: " + inst.getId());
            System.out.println("saga transaction commit succeed. XID: " + inst.getId());
            return ApiResult.ok("saga transaction commit succeed. XID: " + inst.getId());
        }

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

        //服务端异常捕获不到，暂时这样处理
        if(result.get("data")==null){
            return ApiResult.fail((String) result.get("code"),(String) result.get("message"));
        }
        // 处理调用结果,如果是登录，要特殊处理，生成token
        if (methodName.equals("login") && result.size() > 0 && serviceName.equals("UserService")){
             Map<String, Object> data = gatewayBiz.userLogin(result);
            return ApiResult.ok(data);
        }else if (methodName.equals("login") && result.size() > 0 && serviceName.equals("AppUserService")){
             Map<String, Object> data = gatewayBiz.appUserLogin(result);
            return ApiResult.ok(data);
        }
        // 处理调用结果
        System.out.println(result);
        return ApiResult.ok(result.get("data"), result.get("pagination"));
    }

    @GetMapping("/userInfo")
    public ApiResult getUserInfo(@RequestParam String name) {

        ConsumerConfig<GenericService> consumerConfig = new ConsumerConfig<GenericService>()
                .setInterfaceId("com.example.sofademo.service.SampleService")
                .setGeneric(true)
                .setProtocol("bolt")
                .setSubscribe(true)
                .setRegister(true)
                .setRepeatedReferLimit(-1)
                .setRegistry(RegistryFactory.getRegistryConfigs());
        GenericService testService = consumerConfig.refer();
        String result = (String) testService.$genericInvoke("message", new String[]{"java.lang.String"}, new Object[]{name});
        System.out.println(result);
        return ApiResult.ok(result);
    }

    @PostMapping("/arrange")
    public ApiResult arrange(@RequestBody Map<String, Object> blanking) {
        String businessKey = String.valueOf(System.currentTimeMillis());
        blanking.put("businessKey", businessKey);
        //sync test  同步
        StateMachineInstance inst = stateMachineEngine.startWithBusinessKey("reduceInventoryAndBalance", null,
                businessKey, blanking);
        Assert.isTrue(ExecutionStatus.SU.equals(inst.getStatus()),
                "saga transaction execute failed. XID: " + inst.getId());
        System.out.println("saga transaction commit succeed. XID: " + inst.getId());
        return ApiResult.ok();
    }

    @PostMapping("/testStateMachine")
    public ApiResult testStateMachine(@RequestBody Map<String, Object> blanking) {
        String businessKey = String.valueOf(System.currentTimeMillis());
        blanking.put("businessKey", businessKey);
        //sync test  同步
        StateMachineInstance inst = stateMachineEngine.startWithBusinessKey("reduceInventoryAndBalance", null,
                businessKey, blanking);
        Assert.isTrue(ExecutionStatus.SU.equals(inst.getStatus()),
                "saga transaction execute failed. XID: " + inst.getId());
        System.out.println("saga transaction commit succeed. XID: " + inst.getId());
        return ApiResult.ok();
    }

}

