package me.flyray.bsin.server.mapper;

import me.flyray.bsin.server.domain.SysOrg;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.net.ServerSocket;
import java.util.List;

@Repository
@Mapper
public interface OrgAppMapper {

    void authorizeApp(@Param("orgId") String orgId, @Param("appId") String appId,@Param("type") String type);

    void unAuthorizeAppsByOrgId(@Param("orgId") String orgId,@Param("type") String type);

    List<String> getOrgIdsByAppId(String appId);

    List<SysOrg> getAppByOrgId(String orgId);

    void unAuthorizeAppsByOrgIdAndAppId(@Param("orgId") String orgId , @Param("appId")String appId);

    Integer selectOrgAppType(@Param("orgId") String orgId,@Param("appId") String appId);


}
