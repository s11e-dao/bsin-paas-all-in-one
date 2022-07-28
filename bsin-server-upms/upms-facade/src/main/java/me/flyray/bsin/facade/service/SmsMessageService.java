package me.flyray.bsin.facade.service;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.Map;

@Path("sms")
public interface SmsMessageService {

    /**
     * 发送短信
     */
    @POST
    @Path("sendMsg")
    @Produces("application/json")
    public Map<String, Object> sendMsg(Map<String, Object> requestMap);
}
