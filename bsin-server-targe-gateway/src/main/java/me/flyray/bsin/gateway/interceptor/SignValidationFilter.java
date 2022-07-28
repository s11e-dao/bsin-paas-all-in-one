package me.flyray.bsin.gateway.interceptor;

import com.alibaba.fastjson.JSONObject;
import com.alipay.sofa.rpc.common.json.JSON;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import me.flyray.bsin.gateway.common.ResponseCode;
import me.flyray.bsin.gateway.context.BaseContextHandler;
import me.flyray.bsin.gateway.exception.BusinessException;
import me.flyray.bsin.gateway.service.impl.BsinInvokeService;
import me.flyray.bsin.gateway.utils.HttpHelper;
import me.flyray.bsin.gateway.utils.SignUtls;
import org.apache.commons.lang3.StringUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * @author ：bolei
 * @date ：Created in 2021/12/17 13:02
 * @description：
 * @modified By：
 */

@Slf4j
public class SignValidationFilter implements Filter {

    public BsinInvokeService bsinInvokeService;

    public SignValidationFilter(BsinInvokeService bsinInvokeService) {
        this.bsinInvokeService = bsinInvokeService;
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @SneakyThrows
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException,BusinessException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        // 防止流读取一次后就没有了, 所以需要将流继续写出去
        ServletRequest requestWrapper = new BodyReaderHttpServletRequestWrapper(httpServletRequest);
        //获取用户凭证
        //=================获取json格式的签名字段=========================
        String body = HttpHelper.getBodyString(requestWrapper);
        if (StringUtils.isNotBlank(body)) {
            JSONObject bodyData = JSONObject.parseObject(body);

            // 根据appId获取appSecret验证签名
            Map<String, String> bizParams = (Map<String, String>) bodyData.get("bizParams");

            String sign = bizParams.get("sign");

            if(StringUtils.isBlank(sign)){
                request.getRequestDispatcher("/error/sign").forward(request,response);
                return;
            }
            //TODO 根据appId调用RPC服务获取appSecret验证签名,后期优化从缓存获取
            Map requestMap = new HashMap();

            String tenantId = "";
            String appId = "";
            String tokenTenantId = (String) BaseContextHandler.get("tenantId");
            String tokenAppId = (String) BaseContextHandler.get("appId");
            log.info("tokenTenantId-----: {}",tokenTenantId);
            log.info("appId-----: {}",tokenAppId);
            // TODO 此处存在线程变量错乱的情况
            if (StringUtils.isBlank(tokenAppId)){
                tenantId  = bizParams.get("tenantId");
                appId = bizParams.get("appId");
            }else {
                log.info("tokenTenantId 不为空-----: {}",tokenTenantId);
                log.info("appId-----: {}",tokenAppId);
                tenantId = tokenTenantId;
                appId = tokenAppId;
            }
            log.info("tenantId-----: {}",tenantId);
            log.info("appId-----: {}",appId);

            // 根据appId获取请求应用信息
            requestMap.put("appId",appId);
            requestMap.put("tenantId",tenantId);
            Map resultMap = getBiganAppInfoService(requestMap);

            Map dataMap = (Map) resultMap.get("data");
            String appSecret = (String) dataMap.get("appSecret");
            bizParams.remove("sign");

            if(!SignUtls.verify(bizParams,appSecret)){
                throw new BusinessException(ResponseCode.SIGN_INVALIT);
            }
        }
        chain.doFilter(requestWrapper, response);
    }

    @Override
    public void destroy() {

    }

    /**
     * 获取开放平台租户的应用信息
     * @param req
     * @return
     */
    public Map getBiganAppInfoService(Map<String, Object> req){
        Map result = new HashMap();
        try {
            result = bsinInvokeService.genericInvoke("TenantAppService", "getAppInfo", req);
            log.info("获取开放平台租户的应用信息:{}", JSON.toJSONString(result));
        }catch (Exception e){
            e.printStackTrace();
            throw new BusinessException(ResponseCode.FAIL);
        }
        return result;
    }

}
