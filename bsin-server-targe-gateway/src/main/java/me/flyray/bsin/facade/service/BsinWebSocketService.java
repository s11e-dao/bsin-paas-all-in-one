package me.flyray.bsin.facade.service;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.io.IOException;
import java.util.Map;

@Path("WebSocketService")
public interface BsinWebSocketService {

    /**
     * 定向推送消息
     */
   @POST
   @Path("sendTo")
   @Produces("application/json")
   void sendTo(Map<String, Object> requestMap)throws IOException;
}
