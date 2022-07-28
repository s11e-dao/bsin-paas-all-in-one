package me.flyray.bsin.server.enums;


import com.fasterxml.jackson.annotation.JsonCreator;

/**
 * @author ：bolei
 * @date ：Created in 2022/02/05 16:19
 * @description：租户添加的渠道
 * @modified By：
 */
public enum TenantAddChannel {


    /**
     * 租户管理添加
     */
    NORMAL_ADD("0","租户管理添加"),

    /**
     * 开放平台注册
     */
    OPEN_ADD("1", "开放平台注册"),

    /**
     * dao组织注册
     */
    DAO_ADD("2", "dao组织注册");

    private String code;

    private String desc;

    TenantAddChannel(String code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    public String getCode() {
        return code;
    }

    public String getDesc() {
        return desc;
    }

    /**
     * Json 枚举序列化
     */
    @JsonCreator
    public static TenantAddChannel getInstanceById(Integer id) {
        if (id == null) {
            return null;
        }
        for (TenantAddChannel status : values()) {
            if (id.equals(status.getCode())) {
                return status;
            }
        }
        return null;
    }

}
