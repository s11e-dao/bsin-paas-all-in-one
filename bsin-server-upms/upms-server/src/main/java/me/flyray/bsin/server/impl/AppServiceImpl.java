package me.flyray.bsin.server.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import me.flyray.bsin.facade.response.AppResp;
import me.flyray.bsin.facade.service.AppService;
import me.flyray.bsin.server.biz.AppBiz;
import me.flyray.bsin.server.common.ResponseCode;
import me.flyray.bsin.server.domain.SysApp;
import me.flyray.bsin.server.domain.SysTenant;
import me.flyray.bsin.server.enums.TenantOrgAppType;
import me.flyray.bsin.server.exception.BusinessException;
import me.flyray.bsin.server.mapper.*;
import me.flyray.bsin.server.utils.BsinServiceContext;
import me.flyray.bsin.server.utils.BsinSnowflake;
import me.flyray.bsin.server.utils.RespBodyHandler;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

public class AppServiceImpl implements AppService {

    @Autowired
    private AppMapper appMapper;
    @Autowired
    private AppBiz appBiz;
    @Autowired
    private TenantAppMapper tenantAppMapper;
    @Autowired
    private MenuMapper menuMapper;
    @Autowired
    private OrgAppMapper orgAppMapper;
    @Autowired
    private RoleMapper roleMapper;
    @Autowired
    private RoleMenuMapper roleMenuMapper;
    @Autowired
    private TenantMapper tenantMapper;


    /**
     * 添加应用
     * 1、顶级租户添加默认应用，普通租户添加普通应用
     * @param requestMap
     */
    @Override
    public Map<String, Object> add(Map<String, Object> requestMap) {
        SysApp sysApp = BsinServiceContext.getReqBodyDto(SysApp.class, requestMap);
        String tenantId = (String)requestMap.get("tenantId");
        // 根据租户类型确定应用类型
        SysTenant sysTenant = tenantMapper.selectTenantInfoByTenantId(tenantId);
        if(sysTenant.getType() == 0){
            sysApp.setType(0);
        }else {
            sysApp.setType(1);
        }
        sysApp.setAppId(BsinSnowflake.getId());
        appBiz.savaApp(sysApp,tenantId);
        return RespBodyHandler.setRespBodyDto(sysApp);
    }

    /**
     * 删除(解绑)应用
     * 1、判断当前租户下该应用是授权应用，还是新增应用，授权应用不能删除
     * 2、判断该应用是否被授权其他机构
     * 3、解除租户与应用的绑定
     * 4、解除菜单与角色绑定关系
     * 5、删除应用下的角色
     * 6、删除应用下的菜单
     * 7、删除应用
     * @param requestMap
     */
    @Override
    public Map<String, Object> delete(Map<String, Object> requestMap) {
        SysApp sysApp = BsinServiceContext.getReqBodyDto(SysApp.class, requestMap);
        String tenantId = (String)requestMap.get("tenantId");
        // 授权应用不能删除
        String type = tenantAppMapper.selectTenantAppType(tenantId, sysApp.getAppId()).toString();
        if(type.equals(TenantOrgAppType.AUTH.getCode()) || type.equals(TenantOrgAppType.DEF_AUTH.getCode())){
            throw new BusinessException(ResponseCode.APP_NOT_DELETE);
        }
        // 判断该应用是否被授权给其他机构
        String appId = sysApp.getAppId();
        List<String> orgList= orgAppMapper.getOrgIdsByAppId(appId);
        if(orgList.size()>0){
            throw  new BusinessException(ResponseCode.APP_EXIST_USER);
        }
        // 解除租户与应用的绑定
        tenantAppMapper.unAuthorizeApp(tenantId, appId);
        // 解除菜单与角色绑定关系
        roleMenuMapper.unAuthorizeMenusByAppId(appId);
        // 删除应用下的角色
        roleMapper.deleteByAppId(appId);
        // 删除应用下的菜单
        menuMapper.deleteByAppId(appId);
        // 删除应用
        appMapper.deleteById(appId);

        return RespBodyHandler.setRespBodyDto(sysApp);
    }

    /**
     * 编辑应用
     * 1、授权应用不能编辑
     * @param requestMap
     */
    @Override
    public Map<String, Object> edit(Map<String, Object> requestMap) {
        SysApp sysApp = BsinServiceContext.getReqBodyDtoId(SysApp.class, requestMap);
        String tenantId = (String)requestMap.get("tenantId");
        // 授权应用不能编辑
        String type = tenantAppMapper.selectTenantAppType(tenantId, sysApp.getAppId()).toString();
        if(type.equals(TenantOrgAppType.AUTH.getCode())){
            throw new BusinessException(ResponseCode.APP_NOT_UPDATE);
        }
        //判断应用编码是否已存在
        SysApp appInfo = appMapper.getAppInfoByAppCode(sysApp.getAppCode());
        if(appInfo != null && !appInfo.getAppId().equals(sysApp.getAppId())){
            throw new BusinessException(ResponseCode.APP_CODE_EXISTS);
        }
        appMapper.updateById(sysApp);
        return RespBodyHandler.setRespBodyDto(sysApp);
    }

    /**
     * 根据当前租户多条件分页查询应用
     * @param requestMap
     * @return
     */
    @Override
    public Map<String,Object> getPageList (Map<String, Object> requestMap) {
        String tenantId = (String)requestMap.get("tenantId");
        String appId = (String)requestMap.get("appId");
        String appCode = (String)requestMap.get("appCode");
        String appName = (String)requestMap.get("appName");
        Map<String,Object> pagination = (Map<String,Object>)requestMap.get("pagination");
        PageHelper.startPage((Integer) pagination.get("pageNum"),(Integer) pagination.get("pageSize"));
        List<SysApp> sysApps = appMapper.selectPageList(tenantId,appId,appCode,appName);
        PageInfo<SysApp> pageInfo = new PageInfo<SysApp>(sysApps);
        return RespBodyHandler.setRespPageInfoBodyDto(pageInfo);
    }

    /**
     * 当租户、机构授权应用，查询当前租户下的可授权的应用
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> getAuthorizableList(Map<String, Object> requestMap) {
        String tenantId = (String)requestMap.get("tenantId");
        String appName = (String)requestMap.get("appName");
        List<AppResp> sysApps = appMapper.selectListByTenantIdAndAppName(tenantId,appName);
       return RespBodyHandler.setRespBodyListDto(sysApps);
    }

    /**
     * 查询某个租户下的授权应用
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> getAuthorizedListByTenantId(Map<String, Object> requestMap) {
        String tenantId = (String)requestMap.get("bizTenantId");
        List<AppResp> sysApps = appMapper.selectListByTenantId(tenantId);
        return RespBodyHandler.setRespBodyListDto(sysApps);
    }

    /**
     * 查询基座需要注册的所发布子应用
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> getPublishedApps(Map<String, Object> requestMap) {
        List<SysApp> sysApps = appMapper.selectPublishApps();
        return RespBodyHandler.setRespBodyListDto(sysApps);
    }
}
