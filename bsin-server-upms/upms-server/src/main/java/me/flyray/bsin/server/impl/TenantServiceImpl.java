package me.flyray.bsin.server.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import me.flyray.bsin.facade.service.TenantService;
import me.flyray.bsin.server.biz.AppBiz;
import me.flyray.bsin.server.common.ResponseCode;
import me.flyray.bsin.server.config.TenantConfig;
import me.flyray.bsin.server.domain.*;
import me.flyray.bsin.server.enums.TenantAddChannel;
import me.flyray.bsin.server.enums.TenantOrgAppType;
import me.flyray.bsin.server.exception.BusinessException;
import me.flyray.bsin.server.mapper.*;
import me.flyray.bsin.server.utils.BsinPageUtil;
import me.flyray.bsin.server.utils.BsinServiceContext;
import me.flyray.bsin.server.utils.BsinSnowflake;
import me.flyray.bsin.server.utils.RespBodyHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Transactional(rollbackFor = Exception.class)
public class TenantServiceImpl implements TenantService {

    @Autowired
    private TenantConfig tenantConfig;
    @Autowired
    private TenantMapper tenantMapper;
    @Autowired
    private TenantAppMapper tenantAppMapper;
    @Autowired
    private OrgMapper orgMapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private PostMapper postMapper;
    @Autowired
    private OrgPostMapper orgPostMapper;
    @Autowired
    private UserPostMapper userPostMapper;
    @Autowired
    private MenuMapper menuMapper;
    @Autowired
    private RoleMenuMapper roleMenuMapper;
    @Autowired
    private PostRoleMapper postRoleMapper;
    @Autowired
    private RoleMapper roleMapper;
    @Autowired
    private OrgAppMapper orgAppMapper;
    @Autowired
    private AppMapper appMapper;
    @Autowired
    private AppBiz appBiz;

    /**
     * 添加租户
     *
     * @param requestMap
     */
    @Override
    public Map<String, Object> add(Map<String, Object> requestMap) {
        SysTenant sysTenant = BsinServiceContext.getReqBodyDto(SysTenant.class, requestMap);
        SysTenant tenantInfo = tenantMapper.getTenantByTenantCode(sysTenant.getTenantCode());
        if (tenantInfo != null) {
            throw new BusinessException(ResponseCode.TENANT_CODE_EXISTS);
        }
        // 1、添加租户
        String tenantId = BsinSnowflake.getId();
        sysTenant.setTenantId(tenantId);
        tenantMapper.insert(sysTenant);

        // 2、初始化租户对应的机构
        String orgId = BsinSnowflake.getId();
        SysOrg sysOrg = new SysOrg(orgId, sysTenant.getTenantCode(), sysTenant.getTenantName(), tenantId);
        orgMapper.insertOrg(sysOrg);

        // 3、初始租户的超级管理员
        String password = (String) requestMap.get("password");
        String userId = BsinSnowflake.getId();
        SysUser sysUser = new SysUser();

        if(TenantAddChannel.DAO_ADD.getCode().equals(sysTenant.getAddChannel())
            || TenantAddChannel.OPEN_ADD.getCode().equals(sysTenant.getAddChannel())){
            // 用租户名称作为用户名称
            sysUser = new SysUser(userId, sysTenant.getTenantName(), password, orgId, tenantId);
        }else {
            sysUser = new SysUser(userId, sysTenant.getUsername(), tenantConfig.getPassword(), orgId, tenantId);
        }

        userMapper.insertUser(sysUser);

        // 4、初始化一个岗位
        String postId = BsinSnowflake.getId();
        SysPost sysPost = new SysPost(postId, postId, tenantConfig.getPostName(), tenantId);
        postMapper.insertPost(sysPost);

        // 5、建立机构与岗位的关系、用户与岗位的关系
        List<String> posts = new ArrayList<>();
        posts.add(postId);
        orgPostMapper.assignPosts(orgId, posts);
        userPostMapper.assignPosts(userId, posts);

        // 6、给租户及租户机构授权默认可访问应用（权限管理应用）
        String appId = tenantConfig.getAppId();
        List<String> appIds = new ArrayList<>();
        appIds.add(appId);

        // 默认给租户和机构授权应用管理
        tenantAppMapper.authorizeApps(tenantId, appIds, TenantOrgAppType.DEF_AUTH.getCode());
        orgAppMapper.authorizeApp(orgId, appId, TenantOrgAppType.DEF_AUTH.getCode());

        // 如果是dao注册在授权dao默认应用
        String daoAppId = null;
        //  判断是否是dao注册添加，添加默认授权的dao应用
        if(TenantAddChannel.DAO_ADD.getCode().equals(sysTenant.getAddChannel())){
            daoAppId = tenantConfig.getDaoAppId();
            appIds.add(daoAppId);
            // 给机构授权dao默认应用
            orgAppMapper.authorizeApp(orgId, daoAppId, TenantOrgAppType.DEF_AUTH.getCode());
        }else if(TenantAddChannel.OPEN_ADD.getCode().equals(sysTenant.getAddChannel())){
            // TODO 暂时没做授权
        }

        // 7、获取默认普通租户权限管理角色
        String roleId = BsinSnowflake.getId();
        SysRole sysRole = new SysRole(roleId, tenantConfig.getRoleName(), sysTenant.getTenantCode(), appId, tenantId, tenantConfig.getRoleType());
        roleMapper.insert(sysRole);

        // 如果是dao在添加dao应用的角色
        String daoRoleId = BsinSnowflake.getId();
        if(TenantAddChannel.DAO_ADD.getCode().equals(sysTenant.getAddChannel())){
            SysRole daoRole = new SysRole(daoRoleId, tenantConfig.getDaoRoleName(), sysTenant.getTenantCode(), daoAppId, tenantId, tenantConfig.getRoleType());
            roleMapper.insert(daoRole);
        }else if(TenantAddChannel.OPEN_ADD.getCode().equals(sysTenant.getAddChannel())){
            // TODO 暂时没做授权
        }

        // 8、给角色授予菜单权限
        List<SysMenu> sysMenus = menuMapper.selectListByAppId(appId);
        List<String> authMenuIds = new ArrayList<>();
        List<String> roleIds = new ArrayList<>();
        roleIds.add(roleId);
        // 9、移除租户管理菜单
        for (SysMenu sysMenu : sysMenus) {
            if (sysMenu.getMenuName().equals("租户管理")) {
                continue;
            }
            authMenuIds.add(sysMenu.getMenuId());
        }
        roleMenuMapper.authorizeMenus(appId, roleId, authMenuIds);

        // 10、建立岗位与角色的关系
        postRoleMapper.assignRoles(postId, roleIds, appId);

        // 给dao角色授权dao应用菜单
        if(TenantAddChannel.DAO_ADD.getCode().equals(sysTenant.getAddChannel())){
            List<SysMenu> daoMenus = menuMapper.selectListByAppId(daoAppId);
            List<String> daoAuthMenuIds = new ArrayList<>();
            List<String> daoRoleIds = new ArrayList<>();
            daoRoleIds.add(daoRoleId);
            // 9、移除租户管理菜单
            for (SysMenu sysMenu : daoMenus) {
                if (sysMenu.getMenuName().equals("dao管理") || sysMenu.getMenuName().equals("企业管理") ||
                        sysMenu.getMenuName().equals("企业信息") || sysMenu.getMenuName().equals("api费用配置")) {
                    continue;
                }
                daoAuthMenuIds.add(sysMenu.getMenuId());
            }
            roleMenuMapper.authorizeMenus(daoAppId, daoRoleId, daoAuthMenuIds);
            postRoleMapper.assignRoles(postId, daoRoleIds, daoAppId);
        }else if(TenantAddChannel.OPEN_ADD.getCode().equals(sysTenant.getAddChannel())){
            // TODO 暂时没做授权
        }

        return RespBodyHandler.setRespBodyDto(sysTenant);
    }

    /**
     * 删除租户
     * 删除租户对应应用的授权信息
     * 暂时先直接逻辑删除租户信息
     *
     * @param requestMap
     */
    @Override
    public Map<String, Object> delete(Map<String, Object> requestMap) {
        String tenantId = (String) requestMap.get("bizTenantId");
        tenantMapper.deleteById(tenantId);
        return RespBodyHandler.RespBodyDto();
    }

    /**
     * 编辑租户
     *
     * @param requestMap
     */
    @Override
    public Map<String, Object> edit(Map<String, Object> requestMap) {
        SysTenant sysTenant = BsinServiceContext.getReqBodyDtoId(SysTenant.class, requestMap);
        // 判断编码是否已存在
        SysTenant tenantInfo = tenantMapper.getTenantByTenantCode(sysTenant.getTenantCode());
        if (tenantInfo != null && !tenantInfo.getTenantId().equals(sysTenant.getTenantId())) {
            throw new BusinessException(ResponseCode.TENANT_CODE_EXISTS);
        }
        tenantMapper.updateById(sysTenant);
        return RespBodyHandler.setRespBodyDto(sysTenant);
    }

    /**
     * 分页查询展示租户列表
     *
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> getPageList(Map<String, Object> requestMap) {
        String tenantCode = (String) requestMap.get("tenantCode");
        String tenantName = (String) requestMap.get("tenantName");
        Map<String, Object> pagination = (Map<String, Object>) requestMap.get("pagination");
        BsinPageUtil.pageNotNull(pagination);
        PageHelper.startPage((Integer) pagination.get("pageNum"), (Integer) pagination.get("pageSize"));
        List<SysTenant> sysTenants = tenantMapper.selectList(tenantCode, tenantName);
        PageInfo<SysTenant> pageInfo = new PageInfo<SysTenant>(sysTenants);
        return RespBodyHandler.setRespPageInfoBodyDto(pageInfo);
    }

    /**
     * 给租户授权应用，使用场景：超级租户管理员给其他租户授权默认应用
     * 1、先解除给租户的”授权应用“，租户自己添加的应用保持不变 type:1租户新增，2其他授权
     * 2、解除租户授权给机构的”授权应用“
     * 3、解除租户给机构岗位分配的”授权应用“的角色
     * 4、给租户添加授权应用关系
     * 5、添加授权应用的默认角色
     *
     * @param requestMap
     */
    @Override
    public Map<String, Object> authorizeApps(Map<String, Object> requestMap) {
        String tenantId = (String) requestMap.get("bizTenantId");
        final SysTenant sysTenant = tenantMapper.selectTenantInfoByTenantId(tenantId);
        if (sysTenant.getType() == 0) {
            throw new BusinessException(ResponseCode.SUB_TENANT_NOT_AUTH);
        }
        // 获取已经授权的应用ID
        List<String> authedAppIds = appMapper.selectAppIdsByTenantIdAndAppName(tenantId, null);
        List<String> appIds = (List<String>) requestMap.get("appIds");
        List<SysOrg> tenantOrgs = orgMapper.selectOrgListByTenantId(tenantId);
        // 查询租户已授权的应用，不包括租户添加的应用
        // a、全部解除授权逻辑
        if (appIds.size() < 1) {
            // 1、解除给租户的”授权应用“
            tenantAppMapper.unAuthorizeAppByTenantId(tenantId, TenantOrgAppType.AUTH.getCode());
            // 2、解绑租户对应机构下的所有”授权应用“
            for (SysOrg tenantOrg : tenantOrgs) {
                orgAppMapper.unAuthorizeAppsByOrgId(tenantOrg.getOrgId(), TenantOrgAppType.AUTH.getCode());
                // 3、解除机构对应岗位的应用角色授权
                for (String authedAppId : authedAppIds) {
                    List<String> postIds = orgPostMapper.getPostIdsByOrgId(tenantOrg.getOrgId());
                    for (String postId : postIds) {
                        postRoleMapper.unAssignRoles(postId, authedAppId);
                    }
                }
            }
            return RespBodyHandler.RespBodyDto();
        }
        // b、重新授权逻辑 authedAppIds中存在一部分授权不变，一部分需要解除授权 appIds存在一部分不变，一部分添加授权
        // 获取需要解除授权的应用ID
        // authedAppIds:[1,2,5]，sysApps:[1,2,3,4]
        List<String> unAuthAppIds = appBiz.getDifferentAppIds(authedAppIds, appIds);
        // 剔除需集合中默认应用id ，租户下的默认应用不能解绑
        for (String unAuthAppId : unAuthAppIds) {
            // 1、解除给租户的”授权应用“
            tenantAppMapper.unAuthorizeApp(tenantId, unAuthAppId);
            // 2、解绑租户对应机构下的需要解除的”授权应用“
            for (SysOrg tenantOrg : tenantOrgs) {
                orgAppMapper.unAuthorizeAppsByOrgIdAndAppId(tenantOrg.getOrgId(), unAuthAppId);
                // 3、解除机构对应岗位的应用角色授权
                List<String> postIds = orgPostMapper.getPostIdsByOrgId(tenantOrg.getOrgId());
                for (String postId : postIds) {
                    postRoleMapper.unAssignRoles(postId, unAuthAppId);
                }
            }
        }
        // 需要授权的应用ID
        List<String> dealAuthAppIds = appBiz.getDifferentAppIds(appIds, authedAppIds);
        if (dealAuthAppIds.size() < 1) {
            return RespBodyHandler.RespBodyDto();
        }
        tenantAppMapper.authorizeApps(tenantId, dealAuthAppIds, TenantOrgAppType.AUTH.getCode());
        // 添加授权应用的默认角色
        String roleId;
        for (String appId : dealAuthAppIds) {
            roleId = BsinSnowflake.getId();
            SysRole sysRole = new SysRole(roleId, tenantConfig.getRoleName(), roleId, appId, tenantId, 2);
            roleMapper.insert(sysRole);
            List<SysMenu> sysMenus = menuMapper.selectListByAppId(appId);
            List<String> menusIds = sysMenus.stream().map(SysMenu::getMenuId).collect(Collectors.toList());
            roleMenuMapper.authorizeMenus(appId, roleId, menusIds);
        }
        return RespBodyHandler.RespBodyDto();
    }

    /**
     * 获取所有租户列表
     *
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> getAllTenantList(Map<String, Object> requestMap) {
        List<SysTenant> sysTenants = tenantMapper.selectAllList();
        return RespBodyHandler.setRespBodyListDto(sysTenants);
    }

}
