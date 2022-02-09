package me.flyray.bsin.facade.service;

import me.flyray.bsin.facade.response.RoleResp;


import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.List;
import java.util.Map;

@Path("roles")
public interface RoleService {

    /**
     * 添加角色
     */
    @POST
    @Path("add")
    @Produces("application/json")
    Map<String, Object> add(Map<String, Object> requestMap);

    /**
     * 删除角色
     */
    @POST
    @Path("delete")
    @Produces("application/json")
    Map<String, Object> delete(Map<String, Object> requestMap);

    /**
     * 编辑角色
     */
    @POST
    @Path("edit")
    @Produces("application/json")
    Map<String, Object> edit(Map<String, Object> requestMap);

    /**
     * 查询角色
     */
    @POST
    @Path("getPageList")
    @Produces("application/json")
    Map<String,Object> getPageList(Map<String, Object> requestMap);

    /**
     * 添加菜单权限
     */
    @POST
    @Path("authorizeMenu")
    @Produces("application/json")
    Map<String, Object> authorizeMenus(Map<String, Object> requestMap);

    /**
     * 根据应用id查询角色列表
     */
    @POST
    @Path("getListByAppId")
    @Produces("application/json")
    Map<String, Object> getListByAppId(Map<String, Object> requestMap);

}
