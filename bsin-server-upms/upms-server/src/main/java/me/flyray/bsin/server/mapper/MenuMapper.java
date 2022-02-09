package me.flyray.bsin.server.mapper;

import me.flyray.bsin.server.domain.SysMenu;
import me.flyray.bsin.server.domain.SysUser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
@Mapper
public interface MenuMapper {

    void insert(SysMenu record);

    SysMenu getMenuInfoByMenuCode(@Param("menuCode") String menuCode);

    void deleteById(String menuId);

    void updateById(SysMenu record);

    List<SysMenu> selectListByAppIdAndRoleId(@Param("appId") String appId , @Param("roleId") String roleId);

    List<SysMenu> selectListByAppId(String appId );

    List<SysMenu> selectChild(String parentId );

    void deleteByAppId(String appId);

    List<SysMenu> getPermissionMenuTemplate(String appId);

    List<SysMenu> selectMenuButtonByMenuId(String menuId);

    List<SysMenu> selectListByMenuIds(List<String> menuIds);

    List<String> selectMenuIdsByAppIdAndRoleId(@Param("appId") String appId , @Param("roleId") String roleId);

    String selectTopMenuId(String appCode);

    SysMenu selectOneByMenuId(@Param("menuId") String menuId);

}
