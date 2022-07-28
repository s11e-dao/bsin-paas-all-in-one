
package me.flyray.bsin.gateway.portal;

import com.alipay.sofa.rpc.api.GenericService;
import com.alipay.sofa.rpc.common.json.JSON;
import com.alipay.sofa.rpc.config.ConsumerConfig;
import com.alipay.sofa.rpc.registry.RegistryFactory;
import io.ipfs.api.IPFS;
import io.ipfs.api.MerkleNode;
import io.ipfs.api.NamedStreamable;
import io.seata.saga.engine.StateMachineEngine;
import io.seata.saga.statelang.domain.ExecutionStatus;
import io.seata.saga.statelang.domain.StateMachineInstance;
import lombok.extern.log4j.Log4j2;
import me.flyray.bsin.gateway.common.ApiResult;
import me.flyray.bsin.gateway.common.ResponseCode;
import me.flyray.bsin.gateway.context.BsinContextBuilder;
import me.flyray.bsin.gateway.domain.ChoreographyServiceBiz;
import me.flyray.bsin.gateway.exception.BusinessException;
import me.flyray.bsin.gateway.service.ChoreographyServiceService;
import me.flyray.bsin.gateway.service.impl.BsinInvokeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 管理后台网关入口
 */
@Log4j2
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

    private static ConcurrentHashMap<String, GenericService> concurrentHashMap = new ConcurrentHashMap<String, GenericService>();

    private static IPFS ipfs = new IPFS("/ip4/114.116.93.253/tcp/5002");

    /**
     * http请求入口
     * 1、拼装请求参数
     * 2、唤起服务: 泛化 编排
     * 3、拼装响应报文
     * @param req
     * @return
     */
    @PostMapping("/gateway")
    public ApiResult portal(@RequestBody Map<String, Object> req) throws IOException {
        log.info("gateway请求参数:{}", JSON.toJSONString(req));
        // 系统参数
        String serviceName = (String) req.get("serviceName");
        String methodName = (String) req.get("methodName");

        if(methodName.equals("metadataUpload")){
            log.info("metadataUpload请求参数:{}", JSON.toJSONString(req));
            Map<String, Object> bizParams = (Map<String, Object>) req.get("bizParams");
            String metadata = (String) bizParams.get("metadata");
            // 讲上传到本地的文件上传到ipfs上
            byte[] data = metadata.getBytes();
            NamedStreamable.ByteArrayWrapper file = new NamedStreamable.ByteArrayWrapper(data);
            MerkleNode addResult = ipfs.add(file).get(0);
            log.info(String.format("文件上传成功,Hash值为: %s", addResult.toString()));
            Map<String, Object> resultData = new HashMap<String, Object>();
            resultData.put("fileUrl", "https://ipfs.flyray.me/ipfs/"+ addResult.hash.toString());
            resultData.put("fileHash", addResult.hash.toString());
            return ApiResult.ok(resultData);
        }


        // 1、拼装报文
        Map<String, Object> reqParam = bsinContextBuilder.buildReqMessage(req);
        log.info("拼装报文:{}",reqParam);
        // 获取编排服务
        /*ChoreographyServiceBiz choreographyServiceBiz = choreographyServiceService.getChoreographyServiceByServiceAndMethod(req);
        if(choreographyServiceBiz != null){
            // 2、编排服务调用
            ApiResult apiResult = bsinInvokeService.choreographyInvoke(choreographyServiceBiz, reqParam);
            return apiResult;
        }*/
        // 3、泛化调用RPC服务
        Map result = null;
        try {
            result = bsinInvokeService.genericInvoke(serviceName, methodName, reqParam);
        }catch (Exception e){
            String sOut = "";
            StackTraceElement[] trace = e.getStackTrace();
            for (StackTraceElement s : trace) {
                sOut += "\tat " + s + "\r\n";
            }
            throw new BusinessException(ResponseCode.FAIL);
        }
        // 4、响应报文处理
        ApiResult apiResult = bsinContextBuilder.buildResMessage(serviceName, methodName, result);
        log.info("gateway响应报文返回参数:{}", JSON.toJSONString(apiResult));
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

