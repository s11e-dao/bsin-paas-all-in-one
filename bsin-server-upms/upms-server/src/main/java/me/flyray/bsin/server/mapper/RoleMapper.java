package me.flyray.bsin.server.mapper;

import me.flyray.bsin.facade.response.RoleResp;
import me.flyray.bsin.server.domain.SysRole;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface RoleMapper {

    void insert(SysRole role);

    SysRole getRoleInfoByRoleCode(@Param("roleCode") String roleCode);

    void deleteById(String roleId);

    void updateById(SysRole role);

    List<SysRole> selectPageList(@Param("roleCode") String roleCode ,
                                  @Param("roleName") String roleName,
                                  @Param("appId") String appId,
                                  @Param("tenantId") String tenantId);

    List<SysRole> selectListByAppId(@Param("appId") String appId,
                                    @Param("tenantId") String tenantId);

    List<SysRole> selectAllRole();

    void deleteByAppId(String appId);

    List<SysRole> selectListByAppCode(@Param("appCode") String appCode);

    List<SysRole> getRoleListByPostId(String postId);



}
