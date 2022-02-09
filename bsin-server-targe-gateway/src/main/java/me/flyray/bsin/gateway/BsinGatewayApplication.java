package me.flyray.bsin.gateway;

import io.seata.saga.engine.StateMachineEngine;
import me.flyray.bsin.gateway.portal.BsinAdminPortal;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ImportResource;

@ImportResource({"classpath*:gateway-starter.xml"})
@SpringBootApplication
public class BsinGatewayApplication {

	public static void main(String[] args) {

		BsinAdminPortal.applicationContext = SpringApplication.run(BsinGatewayApplication.class, args);
		BsinAdminPortal.stateMachineEngine = (StateMachineEngine) BsinAdminPortal.applicationContext.getBean("stateMachineEngine");

	}

}

