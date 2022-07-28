package me.flyray.bsin.gateway.common;

public enum ResponseCode implements ReturnCode {

    /***********************************通用错误码*****************************************/
    OK("000000", "请求成功"),
    FAIL("100000","服务器在开小差，我们正在加紧处理!"),

    // 用户 100100
    USER_NAME_ISNULL("100101","用户名为空值"),
    USER_DELETE_EXCEPTION("100102","用户删除异常"),
    USER_SAVE_EXCEPTION("100103","用户插入异常"),
    USER_NOT_EXIST("100104","不存在该用户"),
    USER_EXIST("100105","该用户已存在"),
    USER_UPDATE_EXCEPTION("100106","用户更新异常"),
    USERNAME_PASSWORD_ERROR("100107","账号密码错误"),
    PASSWORD_ERROR("100108","密码错误"),

    // 机构 100200
    ORG_NOT_EXIST("100201","机构不存在"),
    ORG_UPDATE_EXCEPTION("100201","机构更新异常"),
    ORG_HAVE_CHILDREN_ORG("100202","机构下存在子集部门"),
    ORG_CODE_EXIST("100203","机构编号已存在"),
    ORG_APP_IS_RELATED("3007","机构应用存在关联"),
    ORG_POST_IS_RELATED("3009","机构岗位存在关联"),

    // 岗位 100300
    POSITION_USER_IS_RELATED("100301","岗位和用户存在关联"),
    POSITION_ROLE_IS_RELATED("100302","岗位角色存在关联"),
    POST_NOT_EXIST("100303","岗位不存在"),
    POST_CODE_EXIST("100304","岗位编号已存在"),
    INVALID_FIELDS("100305", "请求参数非法"),

    // 角色 100400
    ROLE_CODE_EXISTS("100401","编码已存在"),
    // 菜单 100500
    MENU_CODE_EXISTS("100501","编码已存在"),
    // 应用 100600
    APP_EXIST_USER("100602","应用被其他机构使用中"),
    APP_CODE_EXISTS("100601","编码已存在"),
    // 租户 100700
    TENANT_CODE_EXISTS("100701","编码已存在"),

    APPID_NOT_EMPTY("100702","应用ID不能为空"),

    // 文件上传
    UPLOAD_PICTURE_NOT_EMPTY("100701","上传图片不能为空"),
    PICTURE_FORMAT_NOT_FAIL("000701","图片格式错误,仅支持png|jpg|jpeg"),

    TOKEN_ERROR("000001","token失效"),
    ID_NOT_ISNULL("4001","Id不能为空"),

    SIGN_INVALIT("800000","无效的签名"),
    SIGN_NOT_EMPTY("800001","签名参数不能为空");


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
