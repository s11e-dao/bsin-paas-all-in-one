package me.flyray.bsin.server.impl;

import cn.hutool.core.util.StrUtil;
import me.flyray.bsin.facade.response.MenuTree;
import me.flyray.bsin.facade.service.MenuService;
import me.flyray.bsin.server.biz.MenuBiz;
import me.flyray.bsin.server.common.ResponseCode;
import me.flyray.bsin.server.domain.*;
import me.flyray.bsin.server.enums.TenantOrgAppType;
import me.flyray.bsin.server.exception.BusinessException;
import me.flyray.bsin.server.mapper.*;
import me.flyray.bsin.server.utils.BsinServiceContext;
import me.flyray.bsin.server.utils.BsinSnowflake;
import me.flyray.bsin.server.utils.RespBodyHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Transactional(rollbackFor = Exception.class)
public class MenuServiceImpl implements MenuService {

    @Autowired
    private MenuMapper menuMapper;
    @Autowired
    private MenuBiz menuBiz;
    @Autowired
    private TenantMapper tenantMapper;
    @Autowired
    private PostMapper postMapper;
    @Autowired
    private RoleMapper roleMapper;
    @Autowired
    private RoleMenuMapper roleMenuMapper;
    @Autowired
    private TenantAppMapper tenantAppMapper;
    @Autowired
    private AppMapper appMapper;

    /**
     * 添加菜单
     * 1、授权应用不能添加菜单
     * 2、判断菜单编码是否重复
     * 3、添加菜单
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> add(Map<String, Object> requestMap) {
        SysMenu sysMenu = BsinServiceContext.getReqBodyDto(SysMenu.class, requestMap);
        String tenantId = (String)requestMap.get("tenantId");
        // 授权应用不能添加菜单
        String type = tenantAppMapper.selectTenantAppType(tenantId, sysMenu.getAppId()).toString();
        if(type.equals(TenantOrgAppType.AUTH.getCode())|| type.equals(TenantOrgAppType.DEF_AUTH.getCode())){
            throw new BusinessException(ResponseCode.MENU_NOT_ADD);
        }
        //判断菜单编码是否重复
        SysMenu menuInfo = menuMapper.getMenuInfoByMenuCode(sysMenu.getMenuCode());
        if(menuInfo != null){
            throw new BusinessException(ResponseCode.MENU_CODE_EXISTS);
        }
        // 默认排序为99
        if(sysMenu.getSort()==null){
            sysMenu.setSort(99);
        }
        // 不能添加顶级菜单，顶级菜单唯一
        if("-1".equals(sysMenu.getParentId())){
            throw new BusinessException(ResponseCode.NOT_TOP_MENU);
        }
        sysMenu.setMenuId(BsinSnowflake.getId());
        SysApp sysApp = appMapper.getAppInfoByAppId(sysMenu.getAppId(),tenantId);
        sysMenu.setPath("/"+sysApp.getAppCode()+sysMenu.getPath());
        menuMapper.insert(sysMenu);
        // 针对前端组件穿梭框，取消全选状态
        roleMenuMapper.unAuthorizeMenuByAppIdAndMenuId(sysMenu.getAppId(),sysMenu.getParentId());
        return RespBodyHandler.setRespBodyDto(sysMenu);
    }

    /**
     * 根基菜单id删除菜单
     * 1、授权应用不能删除菜单
     * 2、判断该菜单是否存在子菜单，有则提示不能删除
     * 3、删除菜单
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> delete(Map<String, Object> requestMap) {
        SysMenu sysMenu = BsinServiceContext.getReqBodyDtoId(SysMenu.class, requestMap);
        String tenantId = (String)requestMap.get("tenantId");
        SysMenu menu = menuMapper.selectOneByMenuId(sysMenu.getMenuId());
        // 授权应用不能删除菜单
        String type = tenantAppMapper.selectTenantAppType(tenantId, menu.getAppId()).toString();
        if(type.equals(TenantOrgAppType.AUTH.getCode())||type.equals(TenantOrgAppType.DEF_AUTH.getCode())){
            throw new BusinessException(ResponseCode.MENU_NOT_DELETE);
        }
        //判断该菜单是否存在子菜单
        List<SysMenu> sysMenus = menuMapper.selectChild(sysMenu.getMenuId());
        if(sysMenus.size() > 0 ){
            throw new BusinessException(ResponseCode.MENU_EXIST_SUBMENU);
        }
        menuMapper.deleteById(sysMenu.getMenuId());
        return RespBodyHandler.setRespBodyDto(sysMenu);
    }

    /**
     * 编辑菜单
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> edit(Map<String, Object> requestMap) {
        SysMenu sysMenu = BsinServiceContext.getReqBodyDtoId(SysMenu.class,requestMap );
        SysMenu menuInfo = menuMapper.selectOneByMenuId(sysMenu.getMenuId());
        String tenantId = (String)requestMap.get("tenantId");
        // 授权应用不能编辑菜单
        System.out.println(tenantId);
        String type = tenantAppMapper.selectTenantAppType(tenantId, menuInfo.getAppId());
        if(TenantOrgAppType.AUTH.getCode().equals(type)||TenantOrgAppType.DEF_AUTH.getCode().equals(type)){
            throw new BusinessException(ResponseCode.MENU_NOT_UPDATE);
        }

        // 判断菜单编码是否已存在
        if(menuInfo != null && !menuInfo.getMenuId().equals(sysMenu.getMenuId())){
            throw new BusinessException(ResponseCode.MENU_CODE_EXISTS);
        }
        menuMapper.updateById(sysMenu);
        return RespBodyHandler.setRespBodyDto(sysMenu);
    }

    /**
     * 查询应用下的菜单树
     * 1、判断应用id和角色id是否存在
     * 2、根据应用id或应用id和角色id查询菜单集合
     * 3、通过递归调用生成菜单树
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> findMenuTree(Map<String, Object> requestMap) {
        String appId = (String)requestMap.get("appId");
        String roleId = (String)requestMap.get("roleId");
        String tenantId = (String)requestMap.get("tenantId");
        List<SysMenu> sysMenus ;
        if(appId == null || appId.equals("")){
            throw new BusinessException(ResponseCode.ID_NOT_ISNULL);
        }
        if(StrUtil.isNotEmpty(roleId)){
            sysMenus = menuMapper.selectListByAppIdAndRoleId(appId,roleId);
        }
        else{
            sysMenus = menuMapper.selectListByAppId(appId);
        }
        SysTenant sysTenant = tenantMapper.selectTenantInfoByTenantId(tenantId);
        if(sysTenant.getType()==1){
              sysMenus = sysMenus.stream().filter(menu -> !menu.getMenuName().equals("租户管理")).collect(Collectors.toList());
        }
        MenuTree menuTree = new MenuTree();
        List<SysMenu> finalSysMenus = sysMenus;
        List<MenuTree> menuTreeList = sysMenus.stream().filter(menu -> menu.getParentId().equals("-1") )
                .map(m -> {
                    MenuTree level1Menu = new MenuTree(m.getMenuId(),m.getMenuCode(),m.getMenuName(),m.getPermission(),
                            m.getPath(),m.getIcon(),m.getParentId(),m.getType(),m.getAppId(),m.getSort(),m.getStatus(),
                            m.getRemark(),menuBiz.getChildren(m, finalSysMenus));
                    return level1Menu;
                }).sorted(Comparator.comparing(MenuTree::getSort)).collect(Collectors.toList());
        return RespBodyHandler.setRespBodyListDto(menuTreeList);
    }

    /**
     * 根据userId和appCode 查询菜单权限
     * 1、查询用户在某个应用下具有的角色
     * 2、通过角色id集合查询菜单集合
     * 3、通过递归调用生成菜单树
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> getUserMenuTreeByAppCode(Map<String, Object> requestMap) {
        String appCode = (String)requestMap.get("appCode");
        String userId = (String)requestMap.get("userId");

        // 查询当前app下有哪些角色
        List<SysRole> sysRoles = roleMapper.selectListByAppCode(appCode);
        // 查询用户具有的岗位
        List<SysPost> sysPosts = postMapper.getPostByUserId(userId);
        List<SysRole> roles = new ArrayList<>();
        for (SysPost post:sysPosts) {
            roles.addAll(roleMapper.getRoleListByPostId(post.getPostId()));
        }
        // 寻找找出用户所属岗位在该应用下具有的角色
        List<String> roleIds = new ArrayList<>();
        for (SysRole role:roles) {
            for (SysRole appRole : sysRoles)
            if (role.getRoleId().equals(appRole.getRoleId())){
                roleIds.add(role.getRoleId());
            }
        }
        if(roleIds.size()<1){
            throw new BusinessException(ResponseCode.USER_NOT_APP_ROLE);
        }

        List<String> menuIdList = roleMenuMapper.selectUserMenuIds(roleIds);
        List<SysMenu> sysMenuList = menuMapper.selectListByMenuIds(menuIdList);
        // 若顶级菜单不存在，须通过AppCode 查找顶级菜单添加进去
        int i =0;
        for (SysMenu sysMenu:sysMenuList) {
            if(sysMenu.getParentId().equals("-1")){
                break;
            }
            i++;
            if(i == sysMenuList.size()){
                String menuId = menuMapper.selectTopMenuId(appCode);
                menuIdList.add(menuId);
                for(SysMenu menu:sysMenuList){
                    if(!menu.getParentId().equals(menuId)){
                        menuIdList.add(menu.getParentId());
                    }
                }
            }
        }
        List<String> menuIds = menuIdList.stream().distinct().collect(Collectors.toList());
        List<MenuTree> menuTreeList = new ArrayList<>();
        // 如果用户在当前应用下没有权限
        if (menuIds.size() > 0){
            List<SysMenu> sysMenus = menuMapper.selectListByMenuIds(menuIds);
            menuTreeList = sysMenus.stream().filter(menu -> menu.getParentId().equals("-1") )
                    .map(m -> {
                        MenuTree level1Menu = new MenuTree(m.getMenuId(),m.getMenuCode(),m.getMenuName(),m.getPermission(),
                                m.getPath(),m.getIcon(),m.getParentId(),m.getType(),m.getAppId(),m.getSort(),m.getStatus(),m.getRemark(),menuBiz.getChildren(m,sysMenus));
                        return level1Menu;
                    }).sorted(Comparator.comparing(MenuTree::getSort)) .collect(Collectors.toList());
        }
        return RespBodyHandler.setRespBodyListDto(menuTreeList);
    }

    @Override
    public Map<String, Object> getMenusByAppIdAndRoleId(Map<String, Object> requestMap) {
        String appId = (String)requestMap.get("appId");
        String roleId = (String)requestMap.get("roleId");
        List<String> menuIds = menuMapper.selectMenuIdsByAppIdAndRoleId(appId, roleId);
        return RespBodyHandler.setRespBodyListDto(menuIds);
    }
}
