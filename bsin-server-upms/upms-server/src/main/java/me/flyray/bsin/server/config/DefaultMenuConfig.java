package me.flyray.bsin.server.config;


import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "me.flyray.bsin.default-menu")
public class DefaultMenuConfig {

    private String appId = "xxx123xxx";

    private String menuName = "应用权限管理";

    private Integer sort = 0;

    private Integer type = 0;

    private String permission = "sys";

    private String path = "/bsin-ui-upms";

    private String parentId = "-1";

    private String roleName = "应用默认角色";

}
