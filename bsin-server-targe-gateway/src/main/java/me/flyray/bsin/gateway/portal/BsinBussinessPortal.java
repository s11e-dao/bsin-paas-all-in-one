package me.flyray.bsin.gateway.portal;

import com.alipay.sofa.rpc.common.json.JSON;
import lombok.extern.log4j.Log4j2;
import me.flyray.bsin.gateway.common.ApiResult;
import me.flyray.bsin.gateway.common.ResponseCode;
import me.flyray.bsin.gateway.context.BsinContextBuilder;
import me.flyray.bsin.gateway.domain.ChoreographyServiceBiz;
import me.flyray.bsin.gateway.exception.BusinessException;
import me.flyray.bsin.gateway.service.ChoreographyServiceService;
import me.flyray.bsin.gateway.service.impl.BsinInvokeService;
import me.flyray.bsin.gateway.service.impl.BsinWebSocketServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * @author ：bolei
 * @date ：Created in 2022/2/7 17:09
 * @description：业务功能请求入口：c端应用
 * @modified By：
 */
@Log4j2
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
        log.info("biz-gateway请求参数:{}", JSON.toJSONString(req));
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
        log.info("拼装报文:{}",reqParam);
        // 获取编排服务
        /*ChoreographyServiceBiz choreographyServiceBiz = choreographyServiceService.getChoreographyServiceByServiceAndMethod(req);
        if(choreographyServiceBiz != null){
            // 2、编排服务调用
            ApiResult apiResult = bsinInvokeService.choreographyInvoke(choreographyServiceBiz, reqParam);
            return apiResult;
        }*/
        // 3、泛化调用
        Map result = new HashMap();
        try {
            result = bsinInvokeService.genericInvoke(serviceName, methodName, reqParam);
//            log.info("泛化调用返回参数:{}",JSON.toJSONString(result));
        }catch (Exception e){
            e.printStackTrace();
            /*String sOut = "";
            StackTraceElement[] trace = e.getStackTrace();
            for (StackTraceElement s : trace) {
                sOut += "\tat " + s + "\r\n";
            }*/
            throw new BusinessException(ResponseCode.FAIL);
        }
        // 4、响应报文处理
        ApiResult apiResult = bsinContextBuilder.buildResMessage(serviceName, methodName, result);
        log.info("biz-gateway响应报文返回参数:{}",JSON.toJSONString(apiResult));
        return  apiResult;
    }
}
