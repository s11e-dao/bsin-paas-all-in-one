package me.flyray.bsin.gateway.domain;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class ChoreographyServiceBiz implements Serializable {

    /**
     * 编排服务
     */
    private String id;

    /**
     *应用id
     */
    private String appId;

    /**
     *服务名
     */
    private String serviceName;

    /**
     *方法名
     */
    private String methodName;

    /**
     *编排机服务名
     */
    private String stateMachineName;

    /**
     *描述
     */
    private String remark;

    /**
     *租户id
     */
    private String tenantId;

    /**
     *状态 0、启用 1、禁用
     */
    private Integer status;

    /**
     *状态机json
     */
    private String stateMachineJson;

    /**
     *版本号
     */
    private String version;

    /**
     *创建时间
     */
    private Date createTime;

    /**
     *创建人
     */
    private String createBy;

    /**
     *更新时间
     */
    private Date updateTime;

    /**
     *更新人
     */
    private String updateBy;

    /**
     *逻辑删除 0、未删除 1、已删除
     */
    private Integer delFlag;

    /**
     *请求报文
     */
    private String requestMessage;

    /**
     *响应报文
     */
    private String responseMessage;

    private static final long serialVersionUID = 1L;

}
