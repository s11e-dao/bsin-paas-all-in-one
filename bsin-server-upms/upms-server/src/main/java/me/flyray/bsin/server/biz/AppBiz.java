package me.flyray.bsin.server.biz;


import me.flyray.bsin.server.common.ResponseCode;
import me.flyray.bsin.server.config.DefaultMenuConfig;
import me.flyray.bsin.server.domain.SysApp;
import me.flyray.bsin.server.domain.SysMenu;
import me.flyray.bsin.server.domain.SysRole;
import me.flyray.bsin.server.enums.TenantOrgAppType;
import me.flyray.bsin.server.exception.BusinessException;
import me.flyray.bsin.server.mapper.*;
import me.flyray.bsin.server.utils.BsinSnowflake;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
public class AppBiz {

    @Autowired
    private DefaultMenuConfig defaultMenuConfig;
    @Autowired
    private AppMapper appMapper;
    @Autowired
    private TenantAppMapper tenantAppMapper;
    @Autowired
    private MenuMapper menuMapper;
    @Autowired
    private MenuBiz menuBiz;
    @Autowired
    private RoleMapper roleMapper;
    @Autowired
    private RoleMenuMapper roleMenuMapper;

    /**
     *  1、添加应用
     *  2、初始化菜单
     *  3、添加一个能访问默认该应用权限管理的角色
     *  4、绑定租户
     * @param sysApp
     * @param tenantId
     */
    public void savaApp(SysApp sysApp , String tenantId){
        SysApp appInfo = appMapper.getAppInfoByAppCode(sysApp.getAppCode());
        if(appInfo != null){
            throw new BusinessException(ResponseCode.APP_CODE_EXISTS);
        }
        String appId = BsinSnowflake.getId();
        sysApp.setAppId(appId);
        appMapper.insert(sysApp);

        List<SysMenu> menuInitList = new LinkedList<>();
        // 设置顶级菜单
        List<String> menuIds = new ArrayList<>();
        SysMenu sysMenu = setAppDefaultTopMenu(sysApp);
        menuIds.add(sysMenu.getMenuId());
        // 创建应用权限管理菜单
        SysMenu upmsTopMenu = setAppUpmsTopMenu(sysApp,sysMenu.getMenuId());
        menuInitList.add(upmsTopMenu);
        menuInitList.add(sysMenu);
        String appMenuId = upmsTopMenu.getMenuId();
        menuIds.add(appMenuId);
        List<SysMenu> templateMenuList = menuMapper.getPermissionMenuTemplate(defaultMenuConfig.getAppId());

        // 获取并创建子菜单即操作菜单信息
        for (SysMenu templateMenu : templateMenuList) {
            String tempMenuId = templateMenu.getMenuId();
            String subMenuId = BsinSnowflake.getId();
            menuIds.add(subMenuId);
            templateMenu.setMenuId(subMenuId);
            setSubmenuValue(templateMenu, sysApp, appMenuId);
            menuInitList.add(templateMenu);
            String menuId = templateMenu.getMenuId();
            // 获取每个管理菜单下的按钮菜单信息
            List<SysMenu> buttonMenuList = menuMapper.selectMenuButtonByMenuId(tempMenuId);
            for (SysMenu buttonMenu : buttonMenuList) {
                setButtonMenu(buttonMenu, sysApp, menuId);
                menuInitList.add(buttonMenu);
            }
        }
        //添加菜单
        for (SysMenu menu:menuInitList) {
            menuBiz.savaMenu(menu);
        }
        String roleId = BsinSnowflake.getId();
        // 为应用添加默认角色
        SysRole sysRole = new SysRole();
        sysRole.setRoleId(roleId);
        sysRole.setAppId(appId);
        sysRole.setRoleCode(sysApp.getAppCode());
        sysRole.setType(1);
        sysRole.setTenantId(tenantId);
        sysRole.setRoleName(defaultMenuConfig.getRoleName());
        roleMapper.insert(sysRole);
        // 为默认角色添加默认权限管理菜单
        roleMenuMapper.authorizeMenus(appId, roleId, menuIds);
        //绑定租户
        List<String> list = new ArrayList<>();
        list.add(appId);
        tenantAppMapper.authorizeApps(tenantId,list, TenantOrgAppType.ADD.getCode());
    }

    /**
     * 设置子应用默认顶级菜单
     * @param sysApp
     * @return
     */
    private SysMenu setAppDefaultTopMenu(SysApp sysApp) {
        SysMenu defaultMenu = new SysMenu();
        String topMenuId = BsinSnowflake.getId();
        defaultMenu.setMenuId(topMenuId);
        defaultMenu.setMenuCode(topMenuId);
        defaultMenu.setSort(defaultMenuConfig.getSort());
        defaultMenu.setType(defaultMenuConfig.getType());
        defaultMenu.setAppId(sysApp.getAppId());
        defaultMenu.setMenuName(sysApp.getAppName());
        defaultMenu.setPermission(defaultMenuConfig.getPermission());
        defaultMenu.setPath("/"+sysApp.getAppCode());
        defaultMenu.setParentId(defaultMenuConfig.getParentId());
        return defaultMenu;
    }

    /**
     * 设置子应用默认次级菜单
     * @param sysApp
     * @return
     */
    private SysMenu setAppUpmsTopMenu(SysApp sysApp,String parentId) {
        SysMenu defaultMenu = new SysMenu();
        String topMenuId = BsinSnowflake.getId();
        defaultMenu.setMenuId(topMenuId);
        defaultMenu.setMenuCode(topMenuId);
        defaultMenu.setSort(defaultMenuConfig.getSort());
        defaultMenu.setType(defaultMenuConfig.getType());
        defaultMenu.setAppId(sysApp.getAppId());
        defaultMenu.setMenuName(defaultMenuConfig.getMenuName());
        defaultMenu.setPermission(defaultMenuConfig.getPermission());
        defaultMenu.setPath("/"+sysApp.getAppCode()+defaultMenuConfig.getPath());
        defaultMenu.setParentId(parentId);
        return defaultMenu;
    }

    /**
     * 设置菜单属性值
     * @param sysMenu
     * @param sysApp
     * @param parentId
     */
    private void setSubmenuValue(SysMenu sysMenu, SysApp sysApp, String parentId) {
        sysMenu.setMenuId(sysMenu.getMenuId());
        sysMenu.setMenuCode(sysMenu.getMenuId());
        String path = sysMenu.getPath();
        sysMenu.setPath("/"+sysApp.getAppCode()+path);
        sysMenu.setAppId(sysApp.getAppId());
        sysMenu.setParentId(parentId);
    }

    /**
     * 设置按钮菜单属性值
     *
     * @param permissionMenu
     * @param saveAppReq
     * @param buttonMenuId
     */
    private void setButtonMenu(SysMenu permissionMenu, SysApp saveAppReq, String buttonMenuId) {
        String menuId = BsinSnowflake.getId();
        permissionMenu.setMenuId(menuId);
        permissionMenu.setMenuCode(menuId);
        String path = permissionMenu.getPath();
        permissionMenu.setPath(path);
        permissionMenu.setAppId(saveAppReq.getAppId());
        permissionMenu.setParentId(buttonMenuId);
    }

    /**
     * 获取appIds1中差异应用ID
     * @return
     */
    public  List<String> getDifferentAppIds(List<String> appIds1, List<String> appIds2) {
        //将t1数组转成list数组
        //用来存放2个数组中不相同的元素
        List<String> resutl = new ArrayList<String>();
        for (String appId : appIds1) {
            if (!appIds2.contains(appId)) {
                resutl.add(appId);
            }
        }
        return resutl;
    }

    public static <T> List<T> compare(T[] t1, T[] t2) {
        List<T> list1 = Arrays.asList(t1); //将t1数组转成list数组
        List<T> list2 = new ArrayList<T>();//用来存放2个数组中不相同的元素
        for (T t : t2) {
            if (!list1.contains(t)) {
                list2.add(t);
            }
        }
        return list2;
    }

    public static void main(String[] arg){
        String[] array1 = {"1", "2", "3"};
        String[] array2 = {"1", "2", "3", "4","44"};
        List<String> list = compare(array1,array2);
        for (String integer : list) {
            System.out.println(integer);
        }
    }

}
