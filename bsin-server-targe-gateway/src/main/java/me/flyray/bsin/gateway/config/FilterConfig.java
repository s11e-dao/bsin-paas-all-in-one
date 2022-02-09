package me.flyray.bsin.gateway.config;

import me.flyray.bsin.gateway.interceptor.TokenValidationFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author ：bolei
 * @date ：Created in 2021/12/17 13:00
 * @description：
 * @modified By：
 */

@Configuration
public class FilterConfig {
    @Bean
    public FilterRegistrationBean registFilter() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(new TokenValidationFilter());
        registration.addUrlPatterns("/gateway");
        registration.setName("UrlFilter");
        registration.setOrder(1);
        return registration;
    }

}
