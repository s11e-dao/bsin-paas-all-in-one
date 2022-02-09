package me.flyray.bsin.server;

import me.flyray.bsin.server.config.DefaultMenuConfig;
import me.flyray.bsin.server.config.TenantConfig;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ImportResource;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * @author ：bolei
 * @date ：Created in 2021/11/30 16:00
 * @description：bsin 脚手架启动类
 * @modified By：
 */

@EnableTransactionManagement
@ImportResource({"classpath*:sofa/rpc-provider.xml"})
@MapperScan("me.flyray.bsin.server.mapper")
@SpringBootApplication
@EnableConfigurationProperties({TenantConfig.class,DefaultMenuConfig.class})
public class BsinUpmsApplication {

    public static void main(String[] args) {
        SpringApplication springApplication = new SpringApplication(BsinUpmsApplication.class);
        springApplication.run(args);
    }

}
