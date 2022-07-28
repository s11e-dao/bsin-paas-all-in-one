package me.flyray.bsin.facade.service;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.Map;

@Path("tenantApp")
public interface TenantAppService {

    /**
     * 添加
     */
    @POST
    @Path("add")
    @Produces("application/json")
    public Map<String,Object> add(Map<String, Object> requestMap);

    /**
     * 删除
     */
    @POST
    @Path("delete")
    @Produces("application/json")
    public Map<String,Object> delete(Map<String, Object> requestMap);

    /**
     * 修改
     */
    @POST
    @Path("edit")
    @Produces("application/json")
    public Map<String,Object> edit(Map<String, Object> requestMap);

    @POST
    @Path("getAppInfo")
    @Produces("application/json")
    Map<String, Object> getAppInfo(Map<String, Object> requestMap);

    /**
     * 分页查询
     */
    @POST
    @Path("getPageList")
    @Produces("application/json")
    public Map<String,Object> getPageList(Map<String, Object> requestMap);
}
