package me.flyray.bsin.gateway.context;

import me.flyray.bsin.gateway.common.CommonConstants;
import me.flyray.bsin.gateway.utils.StringHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;


/**
 * Created by bolei on 2017/9/8.
 */
public class BaseContextHandler {

    public static ThreadLocal<Map<String, Object>> threadLocal = new ThreadLocal<Map<String, Object>>();

    public static void set(String key, Object value) {
        Map<String, Object> map = threadLocal.get();
        if (map == null) {
            map = new HashMap<String, Object>();
            threadLocal.set(map);
        }
        map.put(key, value);
    }

    public static Object get(String key){
        Map<String, Object> map = threadLocal.get();
        if (map == null) {
            map = new HashMap<String, Object>();
            threadLocal.set(map);
        }
        return map.get(key);
    }

    public static String getToken(){
        Object value = get(CommonConstants.CONTEXT_KEY_TOKEN);
        return StringHelper.getObjectValue(value);
    }

    public static String getXId(){
        Object value = get(CommonConstants.CONTEXT_KEY_X_ID);
        return StringHelper.getObjectValue(value);
    }

    public static String getXName(){
        Object value = get(CommonConstants.CONTEXT_KEY_NAME);
        return StringHelper.getObjectValue(value);
    }

    public static String getNickname(){
        Object value = get(CommonConstants.CONTEXT_KEY_NICKNAME);
        return StringHelper.getObjectValue(value);
    }

    public static String getPlatformId(){
        Object value = get(CommonConstants.CONTEXT_KEY_PLATFORMID);
        return StringHelper.getObjectValue(value);
    }

    public static String getUserType(){
        Object value = get(CommonConstants.JWT_KEY_USER_TYPE);
        return StringHelper.getObjectValue(value);
    }


    public static void setNickname(String name){set(CommonConstants.CONTEXT_KEY_NICKNAME,name);}
    
    public static void setXId(String XId){
        set(CommonConstants.CONTEXT_KEY_X_ID,XId);
    }

    public static void setUserType(String userType){
        set(CommonConstants.JWT_KEY_USER_TYPE,userType);
    }

    private static String returnObjectValue(Object value) {
        return value==null?null:value.toString();
    }

    public static void remove(){
        threadLocal.remove();
    }


}
