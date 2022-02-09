package me.flyray.bsin.server.mapper;

import me.flyray.bsin.facade.response.OrgResp;
import me.flyray.bsin.server.domain.SysOrg;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface OrgMapper {

    void deleteById(String orgId);

    void insertOrg(SysOrg record);

    List<OrgResp> selectOrgList(SysOrg sysOrg);

    List<SysOrg> selectOrgListByTenantId(@Param("tenantId")String tenantId);

    void updateById(SysOrg record);

    SysOrg selectById(String orgId);

    SysOrg selectByOrgCode(String orgCode);

}
