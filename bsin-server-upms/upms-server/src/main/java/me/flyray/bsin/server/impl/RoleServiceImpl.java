package me.flyray.bsin.server.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import me.flyray.bsin.facade.service.RoleService;
import me.flyray.bsin.server.common.ResponseCode;
import me.flyray.bsin.server.domain.SysApp;
import me.flyray.bsin.server.domain.SysRole;
import me.flyray.bsin.server.domain.SysTenant;
import me.flyray.bsin.server.exception.BusinessException;
import me.flyray.bsin.server.mapper.AppMapper;
import me.flyray.bsin.server.mapper.RoleMapper;
import me.flyray.bsin.server.mapper.RoleMenuMapper;
import me.flyray.bsin.server.mapper.TenantMapper;
import me.flyray.bsin.server.utils.BsinServiceContext;
import me.flyray.bsin.server.utils.BsinSnowflake;
import me.flyray.bsin.server.utils.RespBodyHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Map;

@Transactional(rollbackFor = Exception.class)
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleMapper roleMapper;
    @Autowired
    private RoleMenuMapper roleMenuMapper;
    @Autowired
    private TenantMapper tenantMapper;
    @Autowired
    private AppMapper appMapper;

    /**
     * 添加角色
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> add(Map<String, Object> requestMap) {
        SysRole role = BsinServiceContext.getReqBodyDto(SysRole.class, requestMap);
        // 判断角色编码是否已存在
        SysRole roleInfo = roleMapper.getRoleInfoByRoleCode(role.getRoleCode());
        if(roleInfo != null){
            throw new BusinessException(ResponseCode.ROLE_CODE_EXISTS);
        }
        role.setRoleId(BsinSnowflake.getId());
        role.setType(3);
        roleMapper.insert(role);
        return RespBodyHandler.setRespBodyDto(role);
    }

    /**
     * 删除角色
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> delete(Map<String, Object> requestMap) {
        SysRole role = BsinServiceContext.getReqBodyDtoId(SysRole.class,requestMap );
        roleMapper.deleteById(role.getRoleId());
        return RespBodyHandler.setRespBodyDto(role);
    }

    /**
     * 编辑角色
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> edit(Map<String, Object> requestMap) {
        SysRole role = BsinServiceContext.getReqBodyDtoId(SysRole.class, requestMap);
        // 判断角色编码是否已存在
        SysRole roleInfo = roleMapper.getRoleInfoByRoleCode(role.getRoleCode());
        if(roleInfo != null && !roleInfo.getRoleCode().equals(role.getRoleCode())){
            throw new BusinessException(ResponseCode.ROLE_CODE_EXISTS);
        }
        roleMapper.updateById(role);
        return RespBodyHandler.setRespBodyDto(role);
    }

    /**
     * 通过角色编码或者角色名称查询当前租户下应用的角色列表（appId必填）
     * @param requestMap
     * @appId
     * @return
     */
    @Override
    public Map<String,Object> getPageList(Map<String, Object> requestMap) {
        String appId = (String)requestMap.get("appId");
        if(appId == null || appId.equals("")){
            throw new BusinessException(ResponseCode.ID_NOT_ISNULL);
        }
        String tenantId = (String)requestMap.get("tenantId");
        String roleCode = (String)requestMap.get("roleCode");
        String roleName = (String)requestMap.get("roleName");
        Map<String,Object> pagination = (Map<String,Object>)requestMap.get("pagination");
        PageHelper.startPage((Integer) pagination.get("pageNum"),(Integer) pagination.get("pageSize"));
        List<SysRole> roles = roleMapper.selectPageList(roleCode,roleName,appId,tenantId);
        PageInfo<SysRole> pageInfo = new PageInfo<SysRole>(roles);
        return me.flyray.bsin.server.utils.RespBodyHandler.setRespPageInfoBodyDto(pageInfo);
    }

    /**
     * 授予菜单权限
     * @param requestMap
     */
    @Override
    public Map<String, Object> authorizeMenus(Map<String, Object> requestMap) {
        String appId = (String) requestMap.get("appId");
        String roleId = (String) requestMap.get("roleId");
        List<String> menus = (List<String>) requestMap.get("menuIds");
        roleMenuMapper.unAuthorizeMenusByRoleId(roleId);
        if(menus.size() < 1){
            return RespBodyHandler.RespBodyDto();
        }
        roleMenuMapper.authorizeMenus(appId, roleId, menus);
        return RespBodyHandler.RespBodyDto();
    }

    /**
     * 通过应用id查询角色列表
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> getListByAppId(Map<String, Object> requestMap) {
        String appId = (String) requestMap.get("appId");
        String tenantId = (String) requestMap.get("tenantId");
        if(appId == null ){
            return null;
        }
        List<SysRole> roles = roleMapper.selectListByAppId(appId,tenantId);
        return RespBodyHandler.setRespBodyListDto(roles);
    }
}
