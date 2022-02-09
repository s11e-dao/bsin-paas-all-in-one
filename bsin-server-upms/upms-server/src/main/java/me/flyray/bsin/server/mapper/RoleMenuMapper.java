package me.flyray.bsin.server.mapper;


import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Mapper
@Repository
public interface RoleMenuMapper {

    void authorizeMenus(@Param("appId") String appId ,@Param("roleId") String roleId, @Param("menuIds") List<String> menuIds);

    void unAuthorizeMenusByAppId(String appId);

    void unAuthorizeMenusByRoleId(String roleId);

    List<String> selectUserMenuIds(@Param("roleIds") List<String> roleIds);

    void unAuthorizeMenuByAppIdAndMenuId(@Param("appId") String appId ,@Param("menuId") String menuId);
}
