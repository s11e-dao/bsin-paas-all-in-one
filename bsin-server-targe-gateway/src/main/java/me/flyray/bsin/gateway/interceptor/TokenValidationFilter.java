package me.flyray.bsin.gateway.interceptor;

import cn.hutool.core.date.DateField;
import cn.hutool.core.date.DateTime;
import cn.hutool.jwt.JWT;
import cn.hutool.jwt.JWTPayload;
import cn.hutool.jwt.JWTUtil;
import com.alibaba.fastjson.JSONObject;
import me.flyray.bsin.gateway.common.ApiResult;
import me.flyray.bsin.gateway.common.ResponseCode;
import me.flyray.bsin.gateway.context.BaseContextHandler;
import me.flyray.bsin.gateway.exception.BusinessException;
import me.flyray.bsin.gateway.utils.HttpHelper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.HandlerExceptionResolver;

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
public class TokenValidationFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException,BusinessException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        // 防止流读取一次后就没有了, 所以需要将流继续写出去
        ServletRequest requestWrapper = new BodyReaderHttpServletRequestWrapper(httpServletRequest);
        //获取用户凭证
        //=================获取json格式的token字段=========================
        String body = HttpHelper.getBodyString(requestWrapper);
        if (StringUtils.isNotBlank(body)) {
            JSONObject bodyData = JSONObject.parseObject(body);
            String serviceName = String.valueOf(bodyData.get("serviceName"));
            String serviceMethod = String.valueOf(bodyData.get("methodName"));
            // 判断是否诗登录、注册方法，还有火源社区的应用、任务、文章、文章分类如果是则不做token校验，直接返回true
            if (serviceMethod.equals("login") || serviceMethod.equals("getPublishedApps")
                    || serviceMethod.equals("getAllTenantList") || serviceMethod.equals("getArticlePageList")
                    || serviceMethod.equals("register") || serviceMethod.equals("getArticleCategoryList")
                    || serviceMethod.equals("getAppPageList") || serviceMethod.equals("getTaskList")){
                chain.doFilter(requestWrapper, response);
                return;
            }
            // 校验token
            String token = httpServletRequest.getHeader("Authorization");
            if (token == null || token .equals("") ) {
                throw new BusinessException(ResponseCode.TOKEN_ERROR);
            }
//            // 校验token
//            requestWrapper.setAttribute("token",token);
            // JWTUtil.verify(token, "1234".getBytes());
            // 解析token
            JWT jwt = null;
            try {
                jwt = JWTUtil.parseToken(token);
            } catch (Exception e){
                System.out.println(e);
                throw new BusinessException(ResponseCode.TOKEN_ERROR);
            }
            String userId = (String) jwt.getPayload("userId");
            String username = (String) jwt.getPayload("username");
            String email = (String) jwt.getPayload("email");
            BaseContextHandler.set("email",email);
            String tenantId = (String) jwt.getPayload("tenantId");
            String createBy = (String) jwt.getPayload("createBy");
            String updateBy = (String) jwt.getPayload("updateBy");
            BaseContextHandler.set("tenantId",tenantId);
            BaseContextHandler.set("userId",userId);
            BaseContextHandler.set("username",username);
            BaseContextHandler.set("createBy",createBy);
            BaseContextHandler.set("updateBy",updateBy);
        }
        chain.doFilter(requestWrapper, response);
    }

    @Override
    public void destroy() {

    }

    public static void main(String[] args) {

        Map<String,Object> map=new HashMap<>();
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
