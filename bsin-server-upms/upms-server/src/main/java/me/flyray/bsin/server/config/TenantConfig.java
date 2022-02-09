package me.flyray.bsin.server.config;


import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "me.flyray.bsin.tenant")
public class TenantConfig {

    private String password;

    private String postName;

    private String appId;

    private String roleName;

    private String roleId;

    private Integer roleType;

}
