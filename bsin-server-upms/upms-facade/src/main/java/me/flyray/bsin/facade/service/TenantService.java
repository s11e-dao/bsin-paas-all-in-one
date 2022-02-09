package me.flyray.bsin.facade.service;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.Map;

@Path("tenants")
public interface TenantService {

    /**
     * 添加租户
     */
    @POST
    @Path("add")
    @Produces("application/json")
    Map<String, Object> add(Map<String, Object> requestMap);

    /**
     * 删除租户
     */
    @POST
    @Path("delete")
    @Produces("application/json")
    Map<String, Object> delete(Map<String, Object> requestMap);

    /**
     * 编辑租户
     */
    @POST
    @Path("edit")
    @Produces("application/json")
    Map<String, Object> edit(Map<String, Object> requestMap);

    /**
     * 分页查询租户
     */
    @POST
    @Path("getPageList")
    @Produces("application/json")
    Map<String,Object> getPageList(Map<String, Object> requestMap);

    /**
     * 授权应用
     */
    @POST
    @Path("authorizeApp")
    @Produces("application/json")
    Map<String, Object> authorizeApps(Map<String, Object> requestMap);

    /**
     * 查询所有租户
     */
    @POST
    @Path("getAllTenantList")
    @Produces("application/json")
    Map<String,Object> getAllTenantList(Map<String, Object> requestMap);

}
