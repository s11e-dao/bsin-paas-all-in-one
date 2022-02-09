package me.flyray.bsin.facade.service;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.Map;

@Path("menus")
public interface MenuService {

    /**
     * 添加菜单
     */
    @POST
    @Path("add")
    @Produces("application/json")
    Map<String, Object> add(Map<String, Object> requestMap);

    /**
     * 删除菜单
     */
    @POST
    @Path("delete")
    @Produces("application/json")
    Map<String, Object> delete(Map<String, Object> requestMap);

    /**
     * 编辑菜单
     */
    @POST
    @Path("edit")
    @Produces("application/json")
    Map<String, Object> edit(Map<String, Object> requestMap);

    /**
     * 返回菜单树
     */
    @POST
    @Path("findMenuTree")
    @Produces("application/json")
    Map<String, Object> findMenuTree(Map<String, Object> requestMap);


    /**
     * 根据用户id返回菜单权限树
     */
    @POST
    @Path("getUserMenuTreeByAppCode")
    @Produces("application/json")
    Map<String, Object> getUserMenuTreeByAppCode(Map<String, Object> requestMap);

    /**
     * 根据用户id返回菜单权限树
     */
    @POST
    @Path("selectListByAppIdAndRoleId")
    @Produces("application/json")
    Map<String, Object> getMenusByAppIdAndRoleId(Map<String, Object> requestMap);
}
