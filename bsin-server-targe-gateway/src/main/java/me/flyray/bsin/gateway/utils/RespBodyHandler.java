package me.flyray.bsin.gateway.utils;

import cn.hutool.core.bean.BeanUtil;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RespBodyHandler {


    public static Map<String, Object> RespBodyDto(){
        Map<String, Object> map = new HashMap<>();
        map.put("data","");
        return map;
    }


    public static Map<String, Object> setRespBodyDto(Object object) {
        Map<String, Object> map = new HashMap<>();
        if (null == object) {
            map.put("data","");
            return map;
        } else {
           map.put("data",BeanUtil.beanToMap(object));
            return map;
        }
    }


    public static Map<String, Object> setRespBodyListDto(List<?> list) {
        Map<String, Object> map = new HashMap<>();
        if(list.size() == 0){
            map.put("data","");
            return map;
        }
        map.put("data",list);
        return map;
    }



}
