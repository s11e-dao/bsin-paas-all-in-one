package me.flyray.bsin.gateway.portal;

import cn.hutool.core.date.DateField;
import cn.hutool.core.date.DateTime;
import cn.hutool.jwt.JWTPayload;
import cn.hutool.jwt.JWTUtil;
import com.alipay.sofa.rpc.common.json.JSON;
import lombok.extern.slf4j.Slf4j;
import me.flyray.bsin.gateway.common.ApiResult;
import me.flyray.bsin.gateway.common.ResponseCode;
import me.flyray.bsin.gateway.context.BaseContextHandler;
import me.flyray.bsin.gateway.context.BsinContextBuilder;
import me.flyray.bsin.gateway.exception.BusinessException;
import me.flyray.bsin.gateway.service.impl.BsinInvokeService;
import me.flyray.bsin.gateway.utils.SignUtls;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * @author ：bolei
 * @date ：Created in 2022/2/7 17:08
 * @description：开放平台网关入口
 * @modified By：
 */

@Slf4j
@RestController
public class BsinOpenApiPortal {

    @Autowired
    public BsinContextBuilder bsinContextBuilder;
    @Autowired
    public BsinInvokeService bsinInvokeService;

    /**
     * 开放平台接口请求入口
     * 1、通过拦截器验证签名
     * 2、调起服务
     * @param req
     * @return
     */
    @PostMapping("/api-gateway")
    public ApiResult portal(@RequestBody Map<String, Object> req) {
        log.info("api-gateway请求参数:{}", JSON.toJSONString(req));
        // 系统参数
        String serviceName = (String) req.get("serviceName");
        String methodName = (String) req.get("methodName");

        // 获取token
        if("getAccessToken".equals(methodName)){
            String token = generateToken(req);
            Map<String, Object> result = new HashMap<>();
            result.put("accessToken",token);
            return ApiResult.ok(result);
        }
        //TODO 判断用户余额是否够，扣费失败无法调用
        // 异步进行计费统计
        if(!"createWallet".equals(methodName)){
            Map<String, Object> apiConsumingReq = new HashMap<>();
            apiConsumingReq.put("tenantId",BaseContextHandler.get("tenantId"));
            apiConsumingReq.put("appId",BaseContextHandler.get("appId"));
            apiConsumingReq.put("apiName",methodName);
            billingService(apiConsumingReq);
        }

        // 1、拼装报文 业务参数
        Map<String, Object> reqParam = bsinContextBuilder.buildReqMessage(req);

        // 3、泛化调用RPC服务
        Map result = new HashMap();
        try {
            result = bsinInvokeService.genericInvoke(serviceName, methodName, reqParam);
            // TODO 优化项 调用conflux区块链服务返回异常参数
            String detailMessage = (String) result.get("detailMessage");
            if (StringUtils.isNotBlank(detailMessage)){
                return ApiResult.fail(detailMessage);
            }
            log.info("open api 调用返回参数:{}",JSON.toJSONString(result));
        }catch (Exception e){
            e.printStackTrace();
            throw new BusinessException(ResponseCode.FAIL);
        }

        // 4、响应报文处理
        ApiResult apiResult = bsinContextBuilder.buildResMessage(serviceName, methodName, result);
        log.info("api-gateway响应报文返回参数:{}",JSON.toJSONString(apiResult));
        return  apiResult;
    }

    /**
     * 接口计费服务
     * {
     *   "serviceName":"TenantApiConsumingRecordService",
     *   "methodName": "apiConsuming",
     *   "bizParams": {
     *   // 消费记录参数
     *     "tenantId":"租户ID"，
     *     "appId":"应用ID"，
     *     "apiName":"调用接口名称"，
     *     // 出账参数
     *     "serialNo":"账户编号"，
     *     "customerNo":"客户编号"，
     *     "amount":"金额"，
     *     "orderType":订单类型 0、支付 1、退款 2、出售  3、充值 4、转账 5、提现，
     *     "orderNo":"订单号"
     *   }
     * }
     *
     * @return
     */
    public Map billingService(Map<String, Object> req){
        Map result = new HashMap();
        try {
            result = bsinInvokeService.genericInvoke("TenantApiConsumingRecordService", "apiConsuming", req);
            log.info("调用接口消费计费服务结果:{}",JSON.toJSONString(result));
        }catch (Exception e){
            e.printStackTrace();
            throw new BusinessException(ResponseCode.FAIL);
        }
        return result;
    }

    /**
     * 根据appId和签名获取token
     * 1、验证签名
     * 2、返回token
     * @param req
     * @return
     */

    private String generateToken(Map<String, Object> req){
        Map<String,Object> map = new HashMap<String,Object>();
        DateTime now = DateTime.now();
        DateTime newTime = now.offsetNew(DateField.SECOND,1000);
        //签发时间
        map.put(JWTPayload.ISSUED_AT,now);
        //过期时间
        map.put(JWTPayload.EXPIRES_AT,newTime);
        Map<String, Object> bizParams = (Map<String, Object>) req.get("bizParams");
        //生效时间
        map.put(JWTPayload.NOT_BEFORE,now);
        map.put("tenantId",bizParams.get("tenantId"));
        map.put("appId",bizParams.get("appId"));
        String token = JWTUtil.createToken(map, "1234".getBytes());
        return token;
    }

    /**
     * 开放平台接口请求入口
     * @param req
     * @return
     */
    @PostMapping("/api-gateway/oauth2/token/refreshToken")
    public ApiResult refreshToken(@RequestBody Map<String, String> req) {

        return null;
    }


}
