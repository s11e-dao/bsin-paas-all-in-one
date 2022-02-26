package me.flyray.bsin.gateway.portal;

import me.flyray.bsin.gateway.common.ApiResult;
import me.flyray.bsin.gateway.context.BsinContextBuilder;
import me.flyray.bsin.gateway.domain.ChoreographyServiceBiz;
import me.flyray.bsin.gateway.service.ChoreographyServiceService;
import me.flyray.bsin.gateway.service.impl.BsinInvokeService;
import me.flyray.bsin.gateway.service.impl.BsinWebSocketServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Map;

/**
 * @author ：bolei
 * @date ：Created in 2022/2/7 17:09
 * @description：业务功能请求入口：c端应用
 * @modified By：
 */

@RestController
public class BsinBussinessPortal {

    @Autowired
    public BsinContextBuilder bsinContextBuilder;
    @Autowired
    public BsinInvokeService bsinInvokeService;
    @Autowired
    private ChoreographyServiceService choreographyServiceService;
    @Autowired
    private BsinWebSocketServiceImpl webSocketService;

    /**
     * http请求入口
     * @param req
     * @return
     */
    @PostMapping("/biz-gateway")
    public ApiResult portal(@RequestBody Map<String, Object> req) throws IOException {
        // 系统参数
        String serviceName = (String) req.get("serviceName");
        String methodName = (String) req.get("methodName");
        // 业务参数
        Map<String, Object> bizParams = (Map<String, Object>) req.get("bizParams");
        if (serviceName.equals("WebSocketService")){
            // protol为空直接调用
            String protol = (String) bizParams.get("protol");
            if (protol == null){
                webSocketService.WebSocketInvoke(methodName,bizParams);
                return ApiResult.ok();
            }
        }
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
}
