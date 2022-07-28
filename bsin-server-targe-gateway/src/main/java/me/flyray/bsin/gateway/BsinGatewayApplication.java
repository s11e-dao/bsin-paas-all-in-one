package me.flyray.bsin.gateway;

import io.seata.saga.engine.StateMachineEngine;
import me.flyray.bsin.gateway.config.AliOSSProperties;
import me.flyray.bsin.gateway.config.MessageProperties;
import me.flyray.bsin.gateway.portal.BsinAdminPortal;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.MultipartAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ImportResource;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;


@ImportResource({"classpath*:gateway-starter.xml"})
@EnableConfigurationProperties({MessageProperties.class, AliOSSProperties.class})
@SpringBootApplication(exclude = {MultipartAutoConfiguration.class})
public class BsinGatewayApplication {

	public static void main(String[] args) {

		BsinAdminPortal.applicationContext = SpringApplication.run(BsinGatewayApplication.class, args);
		BsinAdminPortal.stateMachineEngine = (StateMachineEngine) BsinAdminPortal.applicationContext.getBean("stateMachineEngine");

	}
	/**
	 * 显示声明CommonsMultipartResolver为mutipartResolver
	 */
	@Bean(name = "multipartResolver")
	public MultipartResolver multipartResolver() {
		CommonsMultipartResolver resolver = new CommonsMultipartResolver();
		//resolver.setDefaultEncoding("UTF-8");
		//resolveLazily属性启用是为了推迟文件解析，以在在UploadAction中捕获文件大小异常
		resolver.setResolveLazily(true);
		resolver.setMaxInMemorySize(40960);
		resolver.setMaxUploadSize(3 * 1024 * 1024);//上传文件大小 3M 3*1024*1024
		return resolver;
	}

}

