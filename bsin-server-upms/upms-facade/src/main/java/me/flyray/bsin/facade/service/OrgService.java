package me.flyray.bsin.facade.service;

import javax.validation.Valid;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.Map;

@Path("orgs")
public interface OrgService {
    /**
     * 新增
     * @return
     */
    @POST
    @Path("add")
    @Produces("application/json")
    public Map<String, Object> add( Map<String, Object> requestMap);

    /**
     * 删除
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
     * 根据条件获取机构列表
     * @return
     */
    @POST
    @Path("getOrgList")
    @Produces("application/json")
    public Map<String, Object> getOrgList(Map<String, Object> requestMap);

    /**
     * 获取机构数
     */
    @POST
    @Path("getOrgTree")
    @Produces("application/json")
    public Map<String, Object> getOrgTree(Map<String, Object> requestMap);

    /**
     * 根据租户id查询机构列表
     * @return
     */
    @POST
    @Path("orgListByTenantId")
    @Produces("application/json")
    public Map<String, Object> getOrgListByTenantId(Map<String, Object> requestMap);

    /**
     * 授权应用
     * @return
     */
    @POST
    @Path("authorizationApps")
    @Produces("application/json")
    public Map<String, Object> authorizationApps(Map<String, Object> requestMap);


    /**
     * 分配岗位
     * @return
     */
    @POST
    @Path("assignPost")
    @Produces("application/json")
    public Map<String, Object> assignPost(Map<String, Object> requestMap);

    /**
     * 解除分配
     * @return
     */
    @POST
    @Path("unbindPost")
    @Produces("application/json")
    public Map<String, Object> unbindPost(Map<String, Object> requestMap);

    /**
     * 根据机构id查询应用集合
     * @return
     */
    @POST
    @Path("getAppListByOrgId")
    @Produces("application/json")
    public Map<String, Object> getAppListByOrgId(Map<String, Object> requestMap);

//    /**
//     * 根据机构id查询岗位集合
//     * @return
//     */
//    @POST
//    @Path("getPostListByOrgId")
//    @Produces("application/json")
//    public Map<String, Object> getPostListByOrgId(Map<String, Object> requestMap);
}
