package me.flyray.bsin.gateway.service.impl;

import me.flyray.bsin.gateway.portal.WebSocketPortal;
import me.flyray.bsin.facade.service.BsinWebSocketService;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.util.Map;


public class BsinWebSocketServiceImpl implements BsinWebSocketService {

    @Autowired
    private WebSocketPortal webSocketPortal;

    /**
     * websocket 定向推送消息
     */
    public void sendTo(Map<String, Object> requestMap) throws IOException {

            String userId=(String) requestMap.get("userId");
            String msg=(String) requestMap.get("msg");
            webSocketPortal.sendMessageTo(msg,userId);
    }

    /**
     * websocket 实现群发功能
     */
    public void sendAll(Map<String, Object> requestMap) throws IOException {
        String msg=(String) requestMap.get("msg");
        webSocketPortal.sendMessageAll(msg,"system");
    }

    /**
     * websocket调用
     */
    public void WebSocketInvoke(String methodName, Map<String, Object> bizParams) throws IOException {
        //实现群发功能
        if (methodName.equals("sendAll")){
            String msg=(String) bizParams.get("msg");
            webSocketPortal.sendMessageAll(msg,"system");
            //推送消息
        }else if (methodName.equals("sendTo")){
            String userId=(String) bizParams.get("userId");
            String msg=(String) bizParams.get("msg");
            webSocketPortal.sendMessageTo(msg,userId);
        }
    }
}
