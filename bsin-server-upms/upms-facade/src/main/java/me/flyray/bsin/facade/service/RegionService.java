package me.flyray.bsin.facade.service;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.List;
import java.util.Map;

/**
 * @author ：bolei
 * @date ：Created in 2022/3/28 21:28
 * @description：行政区域服务
 */

@Path("region")
public interface RegionService {

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
     * 根据父级code查询子节点，子区域列表
     */
    @POST
    @Path("getSubNodeList")
    @Produces("application/json")
    Map<String,Object> getSubNodeList(Map<String,Object> requestMap);

    /**
     * 根据父级code查询子节点，树形目录
     */
    @POST
    @Path("getSubNodeTree")
    @Produces("application/json")
    Map<String,Object> getSubNodeTree(Map<String,Object> requestMap);

    /**
     * 查询顶级行政机构
     */
    @POST
    @Path("getSubNodeTree")
    @Produces("application/json")
    Map<String,Object> getTopLayerRegions(Map<String,Object> requestMap);

    /**
     * 查询详情
     */
    @POST
    @Path("getRegionById")
    @Produces("application/json")
    Map<String,Object> getRegionById(Map<String,Object> requestMap);

}
