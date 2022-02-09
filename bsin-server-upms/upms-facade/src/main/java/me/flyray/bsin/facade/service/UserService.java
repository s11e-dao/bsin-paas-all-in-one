package me.flyray.bsin.facade.service;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.Map;

@Path("users")
public interface UserService {
    /**
     * 新增
     * @param requestMap
     * @return
     */
    @POST
    @Path("add")
    @Produces("application/json")
    public Map<String, Object> add(Map<String, Object> requestMap);

    /**
     * 删除
     * @return
     */
    @POST
    @Path("delete")
    @Produces("application/json")
    public Map<String, Object> delete(Map<String, Object> requestMap);

    /**
     * 更新
     * @return
     */
    @POST
    @Path("edit")
    @Produces("application/json")
    public Map<String, Object> edit(Map<String, Object> requestMap);

    /**
     * 根据条件查询用户
     * @return
     */
    @POST
    @Path("getUser")
    @Produces("application/json")
    public Map<String, Object> getUser(Map<String, Object> requestMap);

    /**
     * 分配岗位
     * @return
     */
    @POST
    @Path("assignPost")
    @Produces("application/json")
    public Map<String, Object> assignPost(Map<String, Object> requestMap);

    /**
     * 登录
     * @return
     */
    @POST
    @Path("login")
    @Produces("application/json")
    public Map<String, Object> login(Map<String, Object> requestMap);

    /**
     *根据租户id分页查询
     */
    @POST
    @Path("getPageListByTenantId")
    @Produces("application/json")
    Map<String,Object> getPageListByTenantId(Map<String,Object> requestMap);

    /**
     * 根据userId查询该用户所拥有权限的应用
     * @return
     */
    @POST
    @Path("getAppByUserId")
    @Produces("application/json")
    public Map<String, Object> getAppByUserId(Map<String, Object> requestMap);

}
