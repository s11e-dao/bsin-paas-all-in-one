package me.flyray.bsin.facade.service;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.Map;

@Path("apps")
public interface AppService {

    /**
     *添加应用
     */
    @POST
    @Path("add")
    @Produces("application/json")
    Map<String,Object> add(Map<String,Object> requestMap);

    /**
     *删除应用
     */
    @POST
    @Path("delete")
    @Produces("application/json")
    Map<String,Object> delete(Map<String,Object> requestMap);

    /**
     *编辑应用
     */
    @POST
    @Path("edit")
    @Produces("application/json")
    Map<String,Object> edit(Map<String,Object> requestMap);

    /**
     *分页查询
     */
    @POST
    @Path("getPageList")
    @Produces("application/json")
    Map<String,Object> getPageList(Map<String,Object> requestMap);

    /**
     *根据当前租户查询应用
     */
    @POST
    @Path("getAuthorizableList")
    @Produces("application/json")
    Map<String,Object> getAuthorizableList(Map<String,Object> requestMap);

    /**
     *根据租户id查询应用
     */
    @POST
    @Path("getAuthorizedListByTenantId")
    @Produces("application/json")
    Map<String,Object> getAuthorizedListByTenantId(Map<String,Object> requestMap);


    /**
     *查询所有已发布的应用
     */
    @POST
    @Path("getPublishedApps")
    @Produces("application/json")
    Map<String,Object> getPublishedApps(Map<String,Object> requestMap);
}
