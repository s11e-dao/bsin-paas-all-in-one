package me.flyray.bsin.gateway.interceptor;

import cn.hutool.core.date.DateField;
import cn.hutool.core.date.DateTime;
import cn.hutool.jwt.JWT;
import cn.hutool.jwt.JWTPayload;
import cn.hutool.jwt.JWTUtil;
import com.alibaba.fastjson.JSONObject;
import me.flyray.bsin.gateway.common.CommonConstants;
import me.flyray.bsin.gateway.context.BaseContextHandler;
import me.flyray.bsin.gateway.exception.BusinessException;
import me.flyray.bsin.gateway.utils.HttpHelper;
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
public class IpfsTokenValidationFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException,BusinessException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        // 防止流读取一次后就没有了, 所以需要将流继续写出去
        //获取用户凭证
        // 校验token
        System.out.println(httpServletRequest.getHeaderNames());
        String token = httpServletRequest.getHeader("Authorization");
        String authorization = httpServletRequest.getHeader("authorization");
        String content = httpServletRequest.getHeader("Content-Type");
        if (token == null || token.equals("") ) {
            // 将异常分发到/error/exthrow控制器
            request.getRequestDispatcher("/error/exthrow").forward(request,response);
            return;
        }

        // 解析token    校验token
        JWT jwt = null;
        try {
            jwt = JWTUtil.parseToken(token);
            boolean verify = jwt.setKey(CommonConstants.JWT_SECRET.getBytes()).verify();
//                boolean validate = jwt.validate(0);
//                if(!verify || !validate){
//                    // 将异常分发到/error/exthrow控制器
//                    request.getRequestDispatcher("/error/exthrow").forward(request,response);
//                    return;
//                }
        } catch (Exception e){
            System.out.println(e);
            // 将异常分发到/error/exthrow控制器
            request.getRequestDispatcher("/error/exthrow").forward(request,response);
            return;
        }
        String userId = (String) jwt.getPayload("userId");
        String username = (String) jwt.getPayload("username");
        String email = (String) jwt.getPayload("email");
        BaseContextHandler.set("email",email);
        String tenantId = (String) jwt.getPayload("tenantId");
        String appId = (String) jwt.getPayload("appId");
        String createBy = (String) jwt.getPayload("createBy");
        String updateBy = (String) jwt.getPayload("updateBy");
        BaseContextHandler.set("tenantId",tenantId);
        BaseContextHandler.set("appId",appId);
        BaseContextHandler.set("userId",userId);
        BaseContextHandler.set("username",username);
        BaseContextHandler.set("createBy",createBy);
        BaseContextHandler.set("updateBy",updateBy);
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {

    }

    public String createToken(Map<String,Object> payload){
        DateTime now=DateTime.now();
        DateTime newTime=now.offsetNew(DateField.MINUTE,1);
        //签发时间
        payload.put(JWTPayload.ISSUED_AT,now);
        //过期时间
        payload.put(JWTPayload.EXPIRES_AT,newTime);
        //生效时间
        payload.put(JWTPayload.NOT_BEFORE,now);
        String token = JWTUtil.createToken(payload, "1234".getBytes());
       return token;
    }


    public static void main(String[] args) {

        Map<String,Object> map=new HashMap<String,Object>();
        DateTime now=DateTime.now();
        DateTime newTime=now.offsetNew(DateField.MINUTE,1);
        //签发时间
        map.put(JWTPayload.ISSUED_AT,now);
        //过期时间
        map.put(JWTPayload.EXPIRES_AT,newTime);
        //生效时间
        map.put(JWTPayload.NOT_BEFORE,now);
        String token = JWTUtil.createToken(map, "1234".getBytes());
        System.out.println(token);
        JWT jwt = JWTUtil.parseToken(token);
        System.out.println(jwt);


    }
}
