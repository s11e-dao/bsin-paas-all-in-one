package me.flyray.bsin.server.utils;

import me.flyray.bsin.server.common.ResponseCode;
import me.flyray.bsin.server.exception.BusinessException;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Date;
import java.util.Map;

/**
 * 空校验辅助类
 */
public class EmptyChecker {

    private EmptyChecker() {
    }

    /**
     *空判断 空返回true
     */
    public static boolean isEmpty(Object obj) {
        if (obj == null || "null".equals(obj.toString()) || "".equals(obj.toString())) {
            throw new BusinessException(ResponseCode.PAGE_NUM_ISNULL);
        }

        if (obj instanceof String) {
            return ((String) obj).trim().length() == 0;
        }

        if (obj instanceof Collection) {
            return ((Collection) obj).isEmpty();
        }

        if (obj instanceof Map) {
            return ((Map) obj).isEmpty();
        }

        return false;
    }

    /**
     *判断非空 非空返回true
     */
    public static boolean notEmpty(Object obj) {
        return !isEmpty(obj);
    }

    /**
     *数组判空 空返回true
     */
    public static boolean isEmpty(Object[] array) {
        return array == null || array.length == 0;
    }

    /**
     *如果任意一个参数为空 返回true
     */
    public static boolean isAnyOneEmpty(Object ... obj) {
        for (Object o : obj) {
            boolean temp = isEmpty(o);
            if (temp) {
                return true;
            }
        }

        return false;
    }

    /**
     *如果所有参数为空 返回true
     */
    public static boolean isAllEmpty(Object ... obj) {
        for (Object o : obj) {
            boolean temp = notEmpty(o);
            if (temp) {
                return false;
            }
        }

        return true;
    }

    /**
     *类 空判断 其中一个值为空返回true
     */
    public static <T> boolean beanIsEmpty(T t){
        if(notEmpty(t)){
            Field[] fields = t.getClass().getDeclaredFields();
            for(Field obj : fields){
                if(isEmpty(getBeanValue(t,obj))){
                    return true;

                }
            }
            return false;
        }

        return true;
    }

    /**
     *类 空判断 所有值为空返回true
     */
    public static <T> boolean beanIsAllEmpty(T t){
        if(notEmpty(t)){
            Field[] fields = t.getClass().getDeclaredFields();
            int num = 0;
            for(Field obj : fields){
                if(isEmpty(getBeanValue(t,obj))){
                    num++;
                }
            }
            return num == fields.length;
        }
        return true;
    }

    //通过反射拿到值
    private static String  getBeanValue(Object obj, Field field){
        try{
            //设置放开私有变量
            field.setAccessible(true);
            //获取属性的名字
            String name = field.getName();
            //将属性名字首字母大写
            name = name.replaceFirst(name.substring(0,1),name.substring(0,1).toUpperCase());
            //整合出属性的get方法
            Method m  = obj.getClass().getMethod("get"+name);

            return dataCheck(m.invoke(obj));
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }

    }

    //处理时间格式的参数
    private static String dataCheck(Object obj){
        SimpleDateFormat simpleFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return (obj instanceof Date || obj instanceof LocalDate) ? simpleFormat.format(obj) : String.valueOf(obj);
    }

}