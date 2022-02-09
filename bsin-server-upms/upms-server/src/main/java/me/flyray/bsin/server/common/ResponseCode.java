package me.flyray.bsin.server.common;

public enum ResponseCode implements ReturnCode {

    /***********************************通用错误码*****************************************/
    OK("000000", "请求成功"),
    FAIL("100000","请求失败"),

    // 用户 100100
    USER_NAME_ISNULL("100101","用户名为空值"),
    USER_DELETE_EXCEPTION("100102","用户删除异常"),
    USER_SAVE_EXCEPTION("100103","用户插入异常"),
    USER_NOT_EXIST("100104","不存在该用户"),
    USER_EXIST("100105","该用户已存在"),
    USER_UPDATE_EXCEPTION("100106","用户更新异常"),
    USERNAME_PASSWORD_ERROR("100107","账号密码错误"),
    PASSWORD_ERROR("100108","密码错误"),
    USER_POST_IS_RELATED("100109","用户岗位存在关联关系"),
    USER_PASSWORD_IS_FALSE("100110","用户不存在或密码错误"),
    USER_NOT_APP_ROLE("100111","您没有该应用的角色"),

    // 机构 100200
    ORG_NOT_EXIST("100201","机构不存在"),
    ORG_UPDATE_EXCEPTION("100202","机构更新异常"),
    ORG_HAVE_CHILDREN_ORG("100203","机构下存在子集部门"),
    ORG_CODE_EXIST("100204","机构编号已存在"),
    ORG_APP_IS_RELATED("100205","机构应用存在关联"),
    ORG_POST_IS_RELATED("100206","机构岗位存在关联"),

    // 岗位 100300
    POSITION_USER_IS_RELATED("100301","岗位和用户存在关联"),
    POSITION_ROLE_IS_RELATED("100302","岗位角色存在关联"),
    POST_NOT_EXIST("100303","岗位不存在"),
    POST_CODE_EXIST("100304","岗位编号已存在"),
    INVALID_FIELDS("100305", "请求参数非法"),

    // 角色 100400
    ROLE_CODE_EXISTS("100401","编码已存在"),
    ROLE_NOT_ADD("100402","您没有权限为该应用添加角色"),
    ROLE_NOT_DELETE("100403","您没有权限删除该应用的角色"),
    ROLE_NOT_UPDATE("100404","您没有权限编辑该应用的角色"),
    ROLE_NOT_AUTHORIZE_MENU("100405","您没有权限为该应用的角色授予菜单权限"),

    // 菜单 100500
    MENU_CODE_EXISTS("100501","编码已存在"),
    MENU_NOT_ADD("100502","您没有权限为该应用添加菜单"),
    MENU_NOT_DELETE("100503","您没有权限删除该应用的菜单"),
    MENU_NOT_UPDATE("100504","您没有权限编辑该应用的菜单"),
    MENU_EXIST_SUBMENU("100505","该菜单存在子菜单"),

    // 应用 100600
    APP_CODE_EXISTS("100601","应用编码已存在"),
    APP_EXIST_USER("100602","应用被其他机构使用中"),
    APP_NOT_DELETE("100603","您没有权限删除该应用"),
    APP_NOT_UPDATE ("100604","您没有权限编辑该应用"),
    APP_NOT_EXISTS("1006005","该应用不存在"),

    // 租户 100700
    TENANT_CODE_EXISTS("100701","租户编码已存在"),

    // 机构岗位 100800
    ID_NOT_ISNULL("100801","Id不能为空");

    private String code;
    private String message;

    private ResponseCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }


    @Override
    public String getReturnCode() {
        return code;
    }

    @Override
    public String getReturnMessage() {
        return message;
    }

}
