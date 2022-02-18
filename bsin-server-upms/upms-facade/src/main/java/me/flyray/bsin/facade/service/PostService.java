package me.flyray.bsin.facade.service;

import javax.validation.Valid;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.Map;

@Path("posts")
public interface PostService {
    /**
     * 新增
     */
    @POST
    @Path("add")
    @Produces("application/json")
    public Map<String, Object> add(Map<String, Object> requestMap);

    /**
     * 删除
     */
    @POST
    @Path("delete")
    @Produces("application/json")
    public Map<String, Object> delete(@Valid Map<String, Object> requestMap);

    /**
     * 更新
     */
    @POST
    @Path("edit")
    @Produces("application/json")
    public Map<String, Object> edit(Map<String, Object> requestMap);

    /**
     * 根据条件查询岗位列表
     */
    @POST
    @Path("getPostList")
    @Produces("application/json")
    public Map<String, Object> getPostList(Map<String, Object> requestMap);

    /**
     * 分配角色
     * @return
     */
    @POST
    @Path("assignRole")
    @Produces("application/json")
    public Map<String, Object> assignRoles(Map<String, Object> requestMap);

    /**
     * 根据租户id查询岗位列表
     */
    @POST
    @Path("getPostListByTenantId")
    @Produces("application/json")
    public Map<String, Object> getPostListByTenantId(Map<String, Object> requestMap);


    /**
     *根据租户id分页查询岗位
     */
    @POST
    @Path("getPageListByTenantId")
    @Produces("application/json")
    Map<String,Object> getPageListByTenantId(Map<String,Object> requestMap);

    /**
     * 根据机构id分页查询岗位
     * @return
     */
    @POST
    @Path("getPageListByOrgId")
    @Produces("application/json")
    public Map<String, Object> getPageListByOrgId(Map<String, Object> requestMap);

    /**
     * 根据岗位id查询所有角色
     * @return
     */
    @POST
    @Path("getRoleByPostId")
    @Produces("application/json")
    public Map<String, Object> getRoleByPostId(Map<String, Object> requestMap);

    /**
     * 查询所有角色
     * @return
     */
    @POST
    @Path("getAllRole")
    @Produces("application/json")
    public Map<String, Object> getAllRole(Map<String, Object> requestMap);

    /**
     * 根据用户查询已分配的岗位
     * @return
     */
    @POST
    @Path("getAssignedPostByUserId")
    @Produces("application/json")
    public Map<String, Object> getAssignedPostByUserId(Map<String, Object> requestMap);

    /**
     * 根据用户查询可以分配的岗位
     * @return
     */
    @POST
    @Path("getAssignablePostByUserId")
    @Produces("application/json")
    public Map<String, Object> getAssignablePostByUserId(Map<String, Object> requestMap);

    /**
     * 根据用户查询可以分配的岗位
     * @return
     */
    @POST
    @Path("getPostListByOrgId")
    @Produces("application/json")
    public Map<String, Object> getPostListByOrgId(Map<String, Object> requestMap);
}
