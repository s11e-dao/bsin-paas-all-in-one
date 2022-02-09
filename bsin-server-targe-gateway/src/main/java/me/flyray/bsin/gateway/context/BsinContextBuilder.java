package me.flyray.bsin.gateway.context;

import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * @author ：bolei
 * @date ：Created in 2022/2/7 17:31
 * @description：请求上下文构建
 * @modified By：
 */

@Service
public class BsinContextBuilder {


    /**
     * 构建请求报文
     * @param requestMap
     */
    public Map<String, Object> buildReqMessage(Map<String, Object> requestMap) {
        return null;
    }

    /**
     * 构建相应报文
     * @param requestMap
     */
    public Map<String, Object> buildResMessage(Map<String, Object> requestMap) {
        return null;
    }


}
