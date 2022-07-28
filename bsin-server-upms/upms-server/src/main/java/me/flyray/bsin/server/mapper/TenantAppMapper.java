package me.flyray.bsin.server.mapper;


import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface TenantAppMapper {

    /**
     * type：1:租户新增授权应用；2:其他授权应用
     */
    void authorizeApps(@Param("tenantId") String tenantId ,@Param("appIds") List<String> appIds,@Param("type") String type);

    /**
     * 解除某一类型的所有授权
     */
    void unAuthorizeAppByTenantId(@Param("tenantId") String tenantId,@Param("type") String type);

    void unAuthorizeApp(@Param("tenantId") String tenantId , @Param("appId") String appId);

    String selectTenantAppType(@Param("tenantId") String tenantId , @Param("appId") String appId);
}
