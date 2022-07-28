package me.flyray.bsin.facade.service;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.Map;

/**
 * @author ：bolei
 * @date ：Created in 2022/3/28 21:28
 * @description：数据字典服务
 */

@Path("dict")
public interface DictService {

    /**
     *添加
     */
    @POST
    @Path("add")
    @Produces("application/json")
    Map<String,Object> add(Map<String,Object> requestMap);

    /**
     *删除
     */
    @POST
    @Path("delete")
    @Produces("application/json")
    Map<String,Object> delete(Map<String,Object> requestMap);

    /**
     *编辑
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
     *通过ID查询字典信息
     */
    @POST
    @Path("getDictById")
    @Produces("application/json")
    Map<String,Object> getDictById(Map<String,Object> requestMap);

    /**
     *通过字典类型查找字典
     * @return 同类型字典
     */
    @POST
    @Path("getDictByType")
    @Produces("application/json")
    Map<String,Object> getDictByType(Map<String,Object> requestMap);

    /**
     * 新增字典项
     */
    @POST
    @Path("addItem")
    @Produces("application/json")
    Map<String,Object> addItem(Map<String,Object> requestMap);

    /**
     * 删除字典项
     */
    @POST
    @Path("deleteItem")
    @Produces("application/json")
    Map<String,Object> deleteItem(Map<String,Object> requestMap);

    /**
     * 通过id查询字典项
     */
    @POST
    @Path("getDictItemById")
    @Produces("application/json")
    Map<String,Object> getDictItemById(Map<String,Object> requestMap);

    /**
     * 修改字典项
     */
    @POST
    @Path("deleteItem")
    @Produces("application/json")
    Map<String,Object> editItem(Map<String,Object> requestMap);

    /**
     * 分页查询字典项集合
     */
    @POST
    @Path("getDictItemPageList")
    @Produces("application/json")
    Map<String,Object> getDictItemPageList(Map<String,Object> requestMap);

    /**
     * 分页查询字典项集合
     */
    @POST
    @Path("getDictItemPageList")
    @Produces("application/json")
    Map<String,Object> getDictItemList(Map<String,Object> requestMap);


}
