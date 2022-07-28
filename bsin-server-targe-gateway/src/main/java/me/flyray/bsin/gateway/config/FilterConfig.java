package me.flyray.bsin.gateway.config;

import me.flyray.bsin.gateway.interceptor.IpfsTokenValidationFilter;
import me.flyray.bsin.gateway.interceptor.SignValidationFilter;
import me.flyray.bsin.gateway.interceptor.TokenValidationFilter;
import me.flyray.bsin.gateway.service.impl.BsinInvokeService;
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
    public FilterRegistrationBean<TokenValidationFilter> registTest1(){
        //通过FilterRegistrationBean实例设置优先级可以生效
        //通过@WebFilter无效
        FilterRegistrationBean<TokenValidationFilter> bean = new FilterRegistrationBean<TokenValidationFilter>();
        bean.setFilter(new TokenValidationFilter());//注册自定义过滤器
        bean.setName("tokenValidationFilter");
        bean.addUrlPatterns("/gateway","/api-gateway");
        bean.setOrder(1);//优先级，最顶级
        return bean;
    }

    /*@Bean
    public FilterRegistrationBean<IpfsTokenValidationFilter> registTest3(){
        //通过FilterRegistrationBean实例设置优先级可以生效
        //通过@WebFilter无效
        FilterRegistrationBean<IpfsTokenValidationFilter> bean = new FilterRegistrationBean<IpfsTokenValidationFilter>();
        bean.setFilter(new IpfsTokenValidationFilter());//注册自定义过滤器
        bean.setName("ipfsTokenValidationFilter");
        bean.addUrlPatterns("/ipfsUpload");
        bean.setOrder(2);//优先级，最顶级
        return bean;
    }*/

    @Bean
    public FilterRegistrationBean<SignValidationFilter> registTest2(){
        //通过FilterRegistrationBean实例设置优先级可以生效
        //通过@WebFilter无效
        FilterRegistrationBean<SignValidationFilter> bean = new FilterRegistrationBean<SignValidationFilter>();
        BsinInvokeService bsinInvokeService = new BsinInvokeService();
        bean.setFilter(new SignValidationFilter(bsinInvokeService));//注册自定义过滤器
        bean.setName("signValidationFilter");
        bean.addUrlPatterns("/api-gateway");
        bean.setOrder(10);//优先级，越低越优先
        return bean;
    }

}
