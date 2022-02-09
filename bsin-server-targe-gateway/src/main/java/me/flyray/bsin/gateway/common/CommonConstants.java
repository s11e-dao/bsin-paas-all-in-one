package me.flyray.bsin.gateway.common;

/**
 * Created by ace on 2017/8/29.
 */
public class CommonConstants {

    public final static String RESOURCE_TYPE_MENU = "menu";
    public final static String RESOURCE_TYPE_BTN = "button";
    public static final Integer EX_TOKEN_ERROR_CODE = 40101;
    // 用户token异常
    public static final Integer EX_USER_INVALID_CODE = 40102;
    public static final Integer EX_USER_PASS_INVALID_CODE = 400103;
    public static final Integer EX_IMAGECODE_CODE = 400112;
    // 客户端token异常
    public static final Integer EX_CLIENT_INVALID_CODE = 40131;
    public static final Integer EX_CLIENT_FORBIDDEN_CODE = 40331;
    public static final Integer EX_OTHER_CODE = 500;
    public static final String CONTEXT_KEY_PLATFORMID = "currentPlatformId";
    public static final String CONTEXT_KEY_X_ID = "currentXId";
    public static final String CONTEXT_KEY_NAME = "currentName";
    public static final String CONTEXT_KEY_NICKNAME = "currentNickname";
    public static final String CONTEXT_KEY_TOKEN = "currentToken";
    public static final String JWT_KEY_X_ID = "XId";
    //微服务客户端名称或是登陆用户名称
    public static final String JWT_KEY_X_NAME = "XName";
    //登陆用户昵称
    public static final String JWT_KEY_NICKNAME = "nickname";
    public static final String JWT_KEY_CODE = "code";
    //平台编号
    public static final String JWT_KEY_PLATFORMID = "platformId";
    //签名盐值
    public static final String JWT_KEY_SALTKEY = "saltKey";
    //后台登陆用户类型
    public static final String JWT_KEY_USER_TYPE = "userType";
    //应用ID
    public static final String JWT_KEY_APP_ID = "appId";

}
