package me.flyray.bsin.facade.service;

import me.flyray.bsin.gateway.utils.RespBodyHandler;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.Map;

public interface Test {


    @POST
    @Path("test")
    @Produces("application/json")
    Map<String,Object> test(Map<String,Object> reParam);
}
