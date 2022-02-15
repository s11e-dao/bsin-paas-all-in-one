package me.flyray.bsin.server.impl;

import me.flyray.bsin.facade.response.AppResp;
import me.flyray.bsin.facade.response.OrgResp;
import me.flyray.bsin.facade.response.OrgTree;
import me.flyray.bsin.facade.service.OrgService;
import me.flyray.bsin.server.biz.AppBiz;
import me.flyray.bsin.server.biz.OrgBiz;
import me.flyray.bsin.server.common.ResponseCode;
import me.flyray.bsin.server.domain.SysApp;
import me.flyray.bsin.server.domain.SysOrg;
import me.flyray.bsin.server.domain.SysPost;
import me.flyray.bsin.server.domain.SysUser;
import me.flyray.bsin.server.enums.TenantOrgAppType;
import me.flyray.bsin.server.exception.BusinessException;
import me.flyray.bsin.server.mapper.*;
import me.flyray.bsin.server.utils.BsinServiceContext;
import me.flyray.bsin.server.utils.BsinSnowflake;
import me.flyray.bsin.server.utils.RespBodyHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Transactional(rollbackFor = Exception.class)
public class OrgServiceImpl implements OrgService {

    @Autowired
    private OrgMapper orgMapper;
    @Autowired
    private OrgAppMapper orgAppMapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private OrgPostMapper orgPostMapper;
    @Autowired
    private OrgBiz orgBiz;
    @Autowired
    private AppMapper appMapper;
    @Autowired
    private PostMapper postMapper;
    @Autowired
    private TenantAppMapper tenantAppMapper;
    @Autowired
    private PostRoleMapper postRoleMapper;
    @Autowired
    private AppBiz appBiz;

    /**
     * 新增机构
     *
     * @return
     */
    @Override
    public Map<String, Object> add(Map<String, Object> requestMap) {
        String tenantId = (String) requestMap.get("tenantId");
        SysOrg sysOrg = BsinServiceContext.getReqBodyDto(SysOrg.class, requestMap);
         //判断机构编码是否已存在数据库
        SysOrg org = orgMapper.selectByOrgCode(sysOrg.getOrgCode());
        if (org != null) {
            throw new BusinessException(ResponseCode.ORG_CODE_EXIST);
        }
        String id = BsinSnowflake.getId();
        sysOrg.setOrgId(id);
        orgMapper.insertOrg(sysOrg);
        return RespBodyHandler.setRespBodyDto(sysOrg);
    }

    /**
     * 删除机构
     * 1、判断该机构是否授权应用，如果有抛出异常
     * 2、判断机构是否被分配岗位，如果有抛出异常
     * 3、遍历机构列表，是否有子机构，如果有抛出异常
     * 4、删除机构
     */
    @Override
    public Map<String, Object> delete(Map<String, Object> requestMap) {
        SysOrg sysOrgs = BsinServiceContext.getReqBodyDtoId(SysOrg.class, requestMap);
        // 要删除的对象
        SysOrg sysOrg = orgMapper.selectInfoById(sysOrgs.getOrgId());
        // 根据租户id查询所有机构
        List<SysOrg> orgList = orgMapper.selectOrgListByTenantId(sysOrg.getTenantId());
        // 判断机构应用是否有关联关系
        List<SysOrg> appByOrgId = orgAppMapper.getAppByOrgId(sysOrgs.getOrgId());
        // 判断机构岗位是否有关联关系
        List<String> postIds = orgPostMapper.getPostIdsByOrgId(sysOrgs.getOrgId());
        if (appByOrgId.size() > 0) {
            throw new BusinessException(ResponseCode.ORG_APP_IS_RELATED);
        } else if (postIds.size() > 0) {
            throw new BusinessException(ResponseCode.ORG_POST_IS_RELATED);
        } else {
            // 遍历机构列表
            for (SysOrg org : orgList) {
                // 判断是否有子机构
                boolean isChildrenOrg = sysOrg.getOrgId().equals(org.getParentId());
                if (isChildrenOrg) {
                    throw new BusinessException(ResponseCode.ORG_HAVE_CHILDREN_ORG);
                } else {
                    // 删除机构
                    orgMapper.deleteById(sysOrg.getOrgId());
                    //删除机构下的用户
                    userMapper.deleteUserById(sysOrg.getOrgId());
                }
            }
        }
        return RespBodyHandler.setRespBodyDto(sysOrg);
    }

    /**
     * 更新
     *
     * @return
     */
    @Override
    public Map<String, Object> edit(Map<String, Object> requestMap) {
        SysOrg sysOrg = BsinServiceContext.getReqBodyDto(SysOrg.class, requestMap);
        orgMapper.updateById(sysOrg);
        return RespBodyHandler.setRespBodyDto(sysOrg);
    }

    /**
     * 根据条件查询机构列表
     */
    @Override
    public Map<String, Object> getOrgList(Map<String, Object> requestMap) {
        SysOrg sysOrg = new SysOrg();
        String tenantId = (String) requestMap.get("tenantId");
        String orgCode = (String) requestMap.get("orgCode");
        String orgName = (String) requestMap.get("orgName");
        sysOrg.setOrgCode(orgCode);
        sysOrg.setOrgName(orgName);
        sysOrg.setTenantId(tenantId);
        List<OrgResp> orgResp = orgMapper.selectOrgList(sysOrg);
        return RespBodyHandler.setRespBodyListDto(orgResp);
    }

    /**
     * 展示机构数
     */
    @Override
    public Map<String, Object> getOrgTree(Map<String, Object> requestMap) {
        String tenantId = (String) requestMap.get("tenantId");
        // 获取所有机构信息
        List<SysOrg> orgList = orgMapper.selectOrgListByTenantId(tenantId);
        // 组装成父子的树形目录结构
        // 查询所有的一级机构(parentId=-1)
        List<OrgTree> orgTreeList = orgList.stream().filter(org -> org.getParentId().equals("-1"))
                .map(m -> {
                    OrgTree levelOrg = new OrgTree(m.getOrgId(), m.getOrgCode(), m.getOrgName(), m.getSort(),
                            m.getParentId(), m.getLevel(), m.getType(), m.getLeader(), m.getPhone(), m.getAddress(),
                            m.getEmail(), m.getTenantId(), m.getCreateTime(), m.getRemark(), orgBiz.getOrgTree(m, orgList));
                    return levelOrg;
                }).collect(Collectors.toList());
        return RespBodyHandler.setRespBodyListDto(orgTreeList);
    }

    /**
     * 根据租户id查询机构列表
     */
    @Override
    public Map<String, Object> getOrgListByTenantId(Map<String, Object> requestMap) {
        String tenantId = (String) requestMap.get("tenantId");
        List<SysOrg> orgResp = orgMapper.selectOrgListByTenantId(tenantId);
        return RespBodyHandler.setRespBodyListDto(orgResp);
    }

    /**
     * 授权应用 注：创建租户时，顶级机构下的应用不能解除授权
     * 1、判断是否是顶级机构，顶级机构解绑时需要剔除默认应用id
     * 2、解绑需要解绑的应用，同时解除机构对应岗位的应用角色授权
     * 3、授权需要授权的应用
     * @return
     */
    @Override
    public Map<String, Object> authorizationApps(Map<String, Object> requestMap) {
        String orgId = (String) requestMap.get("orgId");
        String tenantId = (String) requestMap.get("tenantId");
        List<String> appIds = (List<String>) requestMap.get("appIds");
        if (orgId == null) {
            throw new BusinessException(ResponseCode.ID_NOT_ISNULL);
        }
        // 获取机构下的授权应用
        List<String> authedAppIds = appMapper.selectAppIdsByOrgId(orgId);
        // a、全部解绑
        if(appIds.size()<1){
            // 判断是否是顶级机构，顶级机构下的默认应用不解绑
            if(orgMapper.selectInfoById(orgId).getParentId().equals("-1")){
                // 解除新增、其他授权的应用绑定
                orgAppMapper.unAuthorizeAppsByOrgId(orgId,TenantOrgAppType.ADD.getCode());
                orgAppMapper.unAuthorizeAppsByOrgId(orgId,TenantOrgAppType.AUTH.getCode());
                // 去除默认应用
                authedAppIds = authedAppIds.stream().filter(appId -> orgAppMapper.selectOrgAppType(orgId, appId) != 0).collect(Collectors.toList());
                // 解除机构对应岗位的应用角色授权
                for (String authedAppId :authedAppIds) {
                    List<String> postIds = orgPostMapper.getPostIdsByOrgId(orgId);
                    for (String postId :postIds) {
                        postRoleMapper.unAssignRoles(postId, authedAppId);
                    }
                }
            } else {
                // 解除所有应用绑定
               orgAppMapper.unAuthorizeAppsByOrgId(orgId,null);
                // 解除机构对应岗位的应用角色授权
                for (String authedAppId :authedAppIds) {
                    List<String> postIds = orgPostMapper.getPostIdsByOrgId(orgId);
                    for (String postId :postIds) {
                        postRoleMapper.unAssignRoles(postId, authedAppId);
                    }
                }
            }
            return RespBodyHandler.RespBodyDto();
        }
        // b、重新授权逻辑
        // 1、需要解绑的应用ID
        List<String> unAuthAppIds = appBiz.getDifferentAppIds(authedAppIds,appIds);
        // 剔除集合中默认应用id ，顶级机构下默认应用不能解绑
        if(orgMapper.selectInfoById(orgId).getParentId().equals("-1")){
            unAuthAppIds = unAuthAppIds.stream().filter(appId -> orgAppMapper.selectOrgAppType(orgId, appId) != 0).collect(Collectors.toList());
        }
        for (String unAuthAppId : unAuthAppIds){
                // 解绑应用
                orgAppMapper.unAuthorizeAppsByOrgIdAndAppId(orgId,unAuthAppId);
                // 解除机构对应岗位的应用角色授权
                List<String> postIds = orgPostMapper.getPostIdsByOrgId(orgId);
                for (String postId :postIds) {
                    postRoleMapper.unAssignRoles(postId, unAuthAppId);
                }
        }
        // 2、需要授权的应用ID
        List<String> dealAuthAppIds = appBiz.getDifferentAppIds(appIds,authedAppIds);
        if(dealAuthAppIds.size()<1){
            return RespBodyHandler.RespBodyDto();
        }
       // 重新授权应用
        for (String appId:dealAuthAppIds) {
            String type = tenantAppMapper.selectTenantAppType(tenantId, appId).toString();
            orgAppMapper.authorizeApp(orgId, appId,type);
        }
        return RespBodyHandler.RespBodyDto();
    }

    /**
     * 机构分配岗位
     * 1、判断解绑的岗位是否被授权给其他用户
     * 2、解除所有授权
     * 3、重新分配岗位
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> assignPost(Map<String, Object> requestMap) {
        String orgId = (String) requestMap.get("orgId");
        List<String> postIds = (List<String>) requestMap.get("postIds");
        if (orgId == null) {
            throw new BusinessException(ResponseCode.ID_NOT_ISNULL);
        }

        List<SysPost> postList = postMapper.selectPostListByOrgId(orgId,null,null);
        sign:
        for (SysPost post: postList) {
            for (String postId:postIds) {
                if( post.getPostId().equals(postId)){
                    continue sign;
                }
            }
            List<SysUser> userList = userMapper.selectUserByPostIdAndOrgId(post.getPostId(), orgId);
            if(userList.size()>0){
                throw new BusinessException(ResponseCode.USER_POST_IS_RELATED);
            }
        }
        orgPostMapper.unbindPost(orgId);
        if(postIds.size() < 1){
            return RespBodyHandler.RespBodyDto();
        }
        orgPostMapper.assignPosts(orgId, postIds);
        return RespBodyHandler.RespBodyDto();
    }

    /**
     * 根据机构id和岗位id解绑岗位
     * 1、判断岗位是否被授权给其他用户
     * 2、解除绑定
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> unbindPost(Map<String, Object> requestMap) {
        String orgId = (String) requestMap.get("orgId");
        String postId = (String) requestMap.get("postId");
        List<SysUser> userList = userMapper.selectUserByPostIdAndOrgId(postId, orgId);
        if(userList.size()>0){
            throw new BusinessException(ResponseCode.USER_POST_IS_RELATED);
        }
        orgPostMapper.unbindPosts(orgId, postId);
        return RespBodyHandler.RespBodyDto();
    }

    /**
     * 查询机构下的授权应用集合
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> getAppListByOrgId(Map<String, Object> requestMap) {
        String orgId = (String) requestMap.get("orgId");
        List<AppResp> sysAppList = appMapper.selectOrgAppTypeListByOrgId(orgId);
        return RespBodyHandler.setRespBodyListDto(sysAppList);
    }
}
