package me.flyray.bsin.gateway.config;

import me.flyray.bsin.gateway.interceptor.AuthorizationInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author ：bolei
 * @date ：Created in 2021/12/17 13:35
 * @description：
 * @modified By：
 */

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {

    public AuthorizationInterceptor interceptor(){
        return new AuthorizationInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(interceptor()).addPathPatterns("/gateway")
                .excludePathPatterns("/api/userInfo","/api/arrange","/upload","/biz-gateway");
    }
}
