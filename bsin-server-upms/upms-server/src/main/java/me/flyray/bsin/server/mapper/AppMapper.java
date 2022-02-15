package me.flyray.bsin.server.mapper;

import me.flyray.bsin.facade.response.AppResp;
import me.flyray.bsin.server.domain.SysApp;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface AppMapper {

    void insert(SysApp record);

    void deleteById(String appId);

    List<SysApp> selectPageList(@Param("tenantId") String  tenantId ,
                                @Param("appId") String appId,
                                @Param("appCode") String appCode,
                                @Param("appName") String appName
    );

    void updateById(SysApp record);

    SysApp getAppInfoByAppCode(String appCode);

    SysApp getAppInfoByAppId(@Param("appId")String appId,@Param("tenantId") String tenantId);

    List<AppResp> selectListByTenantIdAndAppName(@Param("tenantId") String  tenantId , @Param("appName") String appName);

    List<AppResp> selectListByTenantId(@Param("tenantId") String  tenantId );

    List<String> selectAppIdsByTenantIdAndAppName(@Param("tenantId") String  tenantId , @Param("appName") String appName);

    List<String> selectAppIdsByOrgId(@Param("orgId") String orgId);

    List<SysApp> selectListByOrgId(@Param("orgId") String  orgId );

    List<AppResp> selectOrgAppTypeListByOrgId(@Param("orgId") String  orgId );

    List<SysApp> selectPublishApps();
}
