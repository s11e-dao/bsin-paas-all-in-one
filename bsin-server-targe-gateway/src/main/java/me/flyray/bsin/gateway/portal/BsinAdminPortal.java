
package me.flyray.bsin.gateway.portal;

import com.alipay.sofa.rpc.api.GenericService;
import com.alipay.sofa.rpc.config.ConsumerConfig;
import com.alipay.sofa.rpc.registry.RegistryFactory;
import io.seata.saga.engine.StateMachineEngine;
import io.seata.saga.statelang.domain.ExecutionStatus;
import io.seata.saga.statelang.domain.StateMachineInstance;
import me.flyray.bsin.gateway.common.ApiResult;
import me.flyray.bsin.gateway.context.BsinContextBuilder;
import me.flyray.bsin.gateway.domain.ChoreographyServiceBiz;
import me.flyray.bsin.gateway.service.ChoreographyServiceService;
import me.flyray.bsin.gateway.service.impl.BsinInvokeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

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
    public BsinContextBuilder bsinContextBuilder;
    @Autowired
    public BsinInvokeService bsinInvokeService;
    @Autowired
    private ChoreographyServiceService choreographyServiceService;

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
        // 系统参数
        String serviceName = (String) req.get("serviceName");
        String methodName = (String) req.get("methodName");
        // 1、拼装报文
        Map<String, Object> reqParam = bsinContextBuilder.buildReqMessage(req);
        // 获取编排服务
        ChoreographyServiceBiz choreographyServiceBiz = choreographyServiceService.getChoreographyServiceByServiceAndMethod(req);
        if(choreographyServiceBiz != null){
            // 2、编排服务调用
            ApiResult apiResult = bsinInvokeService.choreographyInvoke(choreographyServiceBiz, reqParam);
            return apiResult;
        }
        // 3、泛化调用
        Map result = bsinInvokeService.genericInvoke(serviceName, methodName, reqParam);
        // 4、响应报文处理
        ApiResult apiResult = bsinContextBuilder.buildResMessage(serviceName, methodName, result);
        return  apiResult;
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

