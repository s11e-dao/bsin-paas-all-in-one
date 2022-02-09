package me.flyray.bsin.server.enums;


import com.fasterxml.jackson.annotation.JsonCreator;

/**
 * @author ：bolei
 * @date ：Created in 2022/02/05 16:19
 * @description：租户、机构应用类型 对应 tenant_app org_app中的type
 * @modified By：
 */
public enum TenantOrgAppType {

    /**
     * 默认授权
     */
    DEF_AUTH("0","默认授权"),
    /**
     * 新增授权
     */
    ADD("1", "新增授权"),
    /**
     * 其他授权
     */
    AUTH("2", "其他授权");

    private String code;

    private String desc;

    TenantOrgAppType(String code, String desc) {
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
    public static TenantOrgAppType getInstanceById(Integer id) {
        if (id == null) {
            return null;
        }
        for (TenantOrgAppType status : values()) {
            if (id.equals(status.getCode())) {
                return status;
            }
        }
        return null;
    }
}
