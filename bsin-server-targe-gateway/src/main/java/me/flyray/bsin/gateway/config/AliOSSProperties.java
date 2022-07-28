package me.flyray.bsin.gateway.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Description:
 * User: rize
 * Date: 2020/8/6
 * Time: 15:42
 */
@Data
@ConfigurationProperties(prefix = "aliyun.oss")
public class AliOSSProperties {

    private String accessKeyId;

    private String accessKeySecret;

    private String endpoint;

    private String dir;

    private String baseUrl;

    private String bucket;

}
