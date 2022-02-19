package me.flyray.bsin.gateway.service.impl;

import me.flyray.bsin.gateway.portal.WebSocketPortal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;

@Service
public class BsinWebSocketService {

    @Autowired
    private WebSocketPortal webSocketPortal;

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
