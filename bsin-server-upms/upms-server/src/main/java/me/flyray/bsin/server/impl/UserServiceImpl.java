package me.flyray.bsin.server.impl;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import me.flyray.bsin.facade.service.UserService;
import me.flyray.bsin.server.common.ResponseCode;
import me.flyray.bsin.server.domain.*;
import me.flyray.bsin.server.exception.BusinessException;
import me.flyray.bsin.server.mapper.*;
import me.flyray.bsin.server.utils.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Transactional(rollbackFor = Exception.class)
public class UserServiceImpl implements UserService{

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private UserPostMapper userPostMapper;
    @Autowired
    private OrgMapper orgMapper;
    @Autowired
    private PostMapper postMapper;
    @Autowired
    private RoleMapper roleMapper;
    @Autowired
    private AppMapper appMapper;

    /**
     * 新增
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> add(Map<String, Object> requestMap) {
        SysUser sysUser = BsinServiceContext.getReqBodyDto(SysUser.class, requestMap);
        String userId = BsinSnowflake.getId();
        sysUser.setUserId(userId);
        userMapper.insertUser(sysUser);
        return RespBodyHandler.setRespBodyDto(sysUser);
    }

    /**
     * 删除
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> delete(Map<String, Object> requestMap) {
        String userId = (String) requestMap.get("bizUserId");
        // 检查用户是否存在分配了岗位，如果存在抛出异常提示用户
        SysUser postByUserId = userPostMapper.getPostByUserId(userId);
        if (EmptyChecker.isEmpty(userId)) {
            throw new BusinessException(ResponseCode.ID_NOT_ISNULL);
        }
        else if (EmptyChecker.notEmpty(postByUserId)) {
            throw new BusinessException(ResponseCode.POSITION_USER_IS_RELATED);
        }
        userMapper.deleteById(userId);
        return RespBodyHandler.RespBodyDto();
    }

    /**
     * 更新
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> edit(Map<String, Object> requestMap) {
        SysUser sysUser = BsinServiceContext.getReqBodyDtoId(SysUser.class, requestMap);
        String userId = (String) requestMap.get("bizUserId");
        if (EmptyChecker.isEmpty(userId)) {
            throw new BusinessException(String.valueOf(ResponseCode.ID_NOT_ISNULL));
        }
        sysUser.setUserId(userId);
        userMapper.updateById(sysUser);
        return RespBodyHandler.setRespBodyDto(sysUser);
    }

    /**
     * 根据用户名查询用户
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> getUser(Map<String, Object> requestMap) {
        String username = (String) requestMap.get("username");
        List<SysUser> sysUser = userMapper.selectByUsername(username,null);
        return RespBodyHandler.setRespBodyListDto(sysUser);
    }

    /**
     * 分配岗位
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> assignPost(Map<String, Object> requestMap) {
        String userId = (String) requestMap.get("bizUserId");
        List<String> postIds = (List<String>) requestMap.get("postIds");
        if (EmptyChecker.isEmpty(userId)) {
            throw new BusinessException(String.valueOf(ResponseCode.ID_NOT_ISNULL));
        }
        // 岗位id集合为空时，表示解除所有绑定
        userPostMapper.unbindPost(userId);
        if(postIds.size() < 1){
            return RespBodyHandler.RespBodyDto();
        }
        userPostMapper.assignPosts(userId, postIds);
        return RespBodyHandler.RespBodyDto();
    }

    /**
     * 登录
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> login(Map<String, Object> requestMap) {
        String tenantId = (String)requestMap.get("bizTenantId");
        String username = (String) requestMap.get("username");
        String password = (String) requestMap.get("password");
        // 判断用户名密码是否为空
        if (EmptyChecker.isEmpty(username) || EmptyChecker.isEmpty(password)) {
            throw new BusinessException(String.valueOf(ResponseCode.USERNAME_PASSWORD_ERROR));
        }
        Set<SysApp> appSet = new HashSet<>();
        // 登录返回的用户对象信息
        SysUser loginUser =userMapper.login(username, password,tenantId);
        if(loginUser == null){
            throw new BusinessException(ResponseCode.USER_PASSWORD_IS_FALSE);
        }
        // 登陆返回的用户机构对象信息
        SysOrg sysOrg = orgMapper.selectInfoById(loginUser.getOrgId());
        // 登陆返回的用户岗位对象信息
        List<SysPost> sysPosts = postMapper.getPostByUserId(loginUser.getUserId());
        List<SysRole> roles = new ArrayList<>();
        for (SysPost post:sysPosts) {
            roles.addAll(roleMapper.getRoleListByPostId(post.getPostId()));
        }
        // 登陆返回的用户角色对象信息
        if (roles.size() > 0 && roles != null) {
            for (SysRole role : roles) {
                // 登录返回的所属用户角色的应用
                SysApp sysApp = appMapper.getAppInfoByAppId(role.getAppId(),tenantId);
                appSet.add(sysApp);
            }
        }
        UserResp userResp=new UserResp();
        userResp.setSysUser(loginUser);
        userResp.setSysOrg(sysOrg);
        userResp.setSysPost(sysPosts);
        userResp.setSysRoleList(roles);
        userResp.setSysAppSet(appSet);
        return RespBodyHandler.setRespBodyDto(userResp);
    }


    /**
     * 多条件分页查询用户集合
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> getPageListByTenantId(Map<String, Object> requestMap) {
        Map<String, Object> pagination = (Map<String, Object>) requestMap.get("pagination");
        String tenantId = (String)requestMap.get("tenantId");
        String username = (String)requestMap.get("username");
        String nickname = (String)requestMap.get("nickname");
        String orgId = (String)requestMap.get("orgId");
        PageHelper.startPage((Integer) pagination.get("pageNum"),(Integer) pagination.get("pageSize"));
        List<SysUser> userList = userMapper.selectList(tenantId,nickname,username,orgId);
        PageInfo<SysUser> pageInfo = new PageInfo<SysUser>(userList);
        return RespBodyHandler.setRespPageInfoBodyDto(pageInfo);
    }

    /**
     * 根据用户id查询用户能看到的应用
     * 1、用户所在部门能访问的应用，部门下的用户则能查看
     * 2、但是用户进入应用具有的菜单权限根据用户分配的岗位及岗位对应的角色决定
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> getAppByUserId(Map<String, Object> requestMap) {
        Map<String, Object> pagination = (Map<String, Object>) requestMap.get("pagination");
        String userId = (String) requestMap.get("userId");
        SysUser sysUser = userMapper.selectById(userId);
        PageHelper.startPage((Integer) pagination.get("pageNum"),(Integer) pagination.get("pageSize"));
        List<SysApp> sysApps = appMapper.selectListByOrgId(sysUser.getOrgId());
        PageInfo<SysApp> pageInfo = new PageInfo<SysApp>(sysApps);
        return RespBodyHandler.setRespPageInfoBodyDto(pageInfo);
    }
}
