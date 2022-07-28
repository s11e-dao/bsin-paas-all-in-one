package me.flyray.bsin.gateway.config;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Data
@ConfigurationProperties(prefix = "message")
public class MessageProperties {

    private long fileSize;  //压缩大小


    private double scaleRatio; //压缩比例


    private String upPath; //保存路径


    private String imageType; //图片类型

    private String preImgUrl; //图片回显地址

}
