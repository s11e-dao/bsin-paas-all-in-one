package me.flyray.bsin.gateway.interceptor;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author ：bolei
 * @date ：Created in 2021/12/17 13:32
 * @description：
 * @modified By：
 */

@Component
public class AuthorizationInterceptor extends HandlerInterceptorAdapter {

    /**
     * 示例
     * @param request
     * @param response
     * @param handler
     * @return
     * @throws Exception
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = request.getParameter("token");
        return true;
    }
}
