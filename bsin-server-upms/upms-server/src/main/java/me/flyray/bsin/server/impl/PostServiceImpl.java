package me.flyray.bsin.server.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import me.flyray.bsin.facade.response.PostResp;
import me.flyray.bsin.facade.service.PostService;
import me.flyray.bsin.server.common.ResponseCode;
import me.flyray.bsin.server.domain.SysPost;
import me.flyray.bsin.server.domain.SysRole;
import me.flyray.bsin.server.domain.SysUser;
import me.flyray.bsin.server.exception.BusinessException;
import me.flyray.bsin.server.mapper.*;
import me.flyray.bsin.server.utils.BsinPageUtil;
import me.flyray.bsin.server.utils.BsinServiceContext;
import me.flyray.bsin.server.utils.BsinSnowflake;
import me.flyray.bsin.server.utils.RespBodyHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Transactional(rollbackFor = Exception.class)
public class PostServiceImpl implements PostService {

    @Autowired
    private PostMapper sysPostMapper;
    @Autowired
    private PostRoleMapper postRoleMapper;
    @Autowired
    private UserPostMapper userPostMapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private RoleMapper roleMapper;

    /**
     * 添加岗位
     *
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> add(Map<String, Object> requestMap) {
        // 参数校验
        SysPost post = BsinServiceContext.getReqBodyDto(SysPost.class, requestMap);
        //判断岗位编码是否存在
        SysPost sysPost = sysPostMapper.getPostByPostCode(post.getPostCode());
        if (sysPost != null) {
            throw new BusinessException(ResponseCode.POST_CODE_EXIST);
        }
        String id = BsinSnowflake.getId();
        post.setPostId(id);
        sysPostMapper.insertPost(post);
        return RespBodyHandler.setRespBodyDto(post);
    }

    /**
     * 删除岗位
     *
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> delete(Map<String, Object> requestMap) {
        SysPost post = BsinServiceContext.getReqBodyDtoId(SysPost.class, requestMap);
        // 查询岗位和角色是否有关联
        List<SysPost> roleByPostId = postRoleMapper.getRoleByPostId(post.getPostId());
        // 查询岗位和用户是否有关联
        List<SysPost> userByPostId = userPostMapper.getUserByPostId(post.getPostId());
        if (roleByPostId.size() > 0) {
            throw new BusinessException(ResponseCode.POSITION_ROLE_IS_RELATED);
        } else if (userByPostId.size() > 0) {
            throw new BusinessException(ResponseCode.POSITION_USER_IS_RELATED);
        }
        sysPostMapper.deleteById(post.getPostId());
        return RespBodyHandler.setRespBodyDto(post);
    }

    /**
     * 更新岗位
     *
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> edit(Map<String, Object> requestMap) {
        SysPost sysPost = BsinServiceContext.getReqBodyDtoId(SysPost.class, requestMap);
        sysPostMapper.updateById(sysPost);
        return RespBodyHandler.setRespBodyDto(sysPost);
    }

    /**
     * 根据条件查询岗位列表
     *
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> getPostList(Map<String, Object> requestMap) {
        String postCode = (String) requestMap.get("postCode");
        String postName = (String) requestMap.get("postName");
        String tenantId = (String) requestMap.get("tenantId");
        List<SysPost> post = sysPostMapper.selectPostList(postCode, postName, tenantId);
        return RespBodyHandler.setRespBodyListDto(post);
    }

    /**
     * 分配角色
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> assignRoles(Map<String, Object> requestMap) {
        String postId = (String) requestMap.get("postId");
        String appId = (String) requestMap.get("appId");
        List<String> roleIds = (List<String>) requestMap.get("roleIds");
        if (postId == null ) {
            throw new BusinessException(ResponseCode.ID_NOT_ISNULL);
        }
        // 如果角色列表为零说明解除了所有分配
        postRoleMapper.unAssignRoles(postId,appId);
        if(roleIds.size() < 1){
            return RespBodyHandler.RespBodyDto();
        }
        postRoleMapper.assignRoles(postId, roleIds, appId);
        return RespBodyHandler.RespBodyDto();
    }

    /**
     * 根据租户id查询岗位列表
     *
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> getPostListByTenantId(Map<String, Object> requestMap) {
        String tenantId = (String) requestMap.get("tenantId");
        List<PostResp> postResp = sysPostMapper.selectPostListByTenantId(tenantId);
        return RespBodyHandler.setRespBodyListDto(postResp);
    }

    /**
     * 根据租户id分页查询所有岗位
     *
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> getPageListByTenantId(Map<String, Object> requestMap) {
        Map<String, Object> pagination = (Map<String, Object>) requestMap.get("pagination");
        String tenantId = (String) requestMap.get("tenantId");
        String postId = (String) requestMap.get("postId");
        String postName = (String) requestMap.get("postName");
        String postCode = (String) requestMap.get("postCode");
        BsinPageUtil.pageNotNull(pagination);
        PageHelper.startPage((Integer) pagination.get("pageNum"),(Integer) pagination.get("pageSize"));
        List<SysPost> postList = sysPostMapper.selectList(tenantId, postId, postCode, postName);
        PageInfo<SysPost> pageInfo = new PageInfo<SysPost>(postList);
        return RespBodyHandler.setRespPageInfoBodyDto(pageInfo);
    }

    /**
     * 根据机构id分页查询岗位
     *
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> getPageListByOrgId(Map<String, Object> requestMap) {
        Map<String, Object> pagination = (Map<String, Object>) requestMap.get("pagination");
        String orgId = (String) requestMap.get("orgId");
        String postCode = (String) requestMap.get("postCode");
        String postName = (String) requestMap.get("postName");
        BsinPageUtil.pageNotNull(pagination);
        PageHelper.startPage((Integer) pagination.get("pageNum"),(Integer) pagination.get("pageSize"));
        List<SysPost> postList = sysPostMapper.selectPostListByOrgId(orgId,postCode,postName);
        PageInfo<SysPost> pageInfo = new PageInfo<SysPost>(postList);
        return RespBodyHandler.setRespPageInfoBodyDto(pageInfo);
    }

    /**
     * 根据岗位id查询所有角色
     *
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> getRoleByPostId(Map<String, Object> requestMap) {
        String postId = (String) requestMap.get("postId");
        List<SysRole> roleInfoByPostId = roleMapper.getRoleListByPostId(postId);
        return RespBodyHandler.setRespBodyListDto(roleInfoByPostId);
    }

    /**
     * 查询所有角色
     *
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> getAllRole(Map<String, Object> requestMap) {
        List<SysRole> sysRoles = roleMapper.selectAllRole();
        return RespBodyHandler.setRespBodyListDto(sysRoles);
    }

    /**
     * 根据用户查询已经分配的岗位
     *
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> getAssignedPostByUserId(Map<String, Object> requestMap) {
        String userId = (String) requestMap.get("bizUserId");
        List<SysPost> sysPostList = sysPostMapper.getAlreadyAssignPostByUserId(userId);
        return RespBodyHandler.setRespBodyListDto(sysPostList);
    }

    /**
     * 根据用户查询可以分配的岗位
     *
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> getAssignablePostByUserId(Map<String, Object> requestMap) {
        String userId = (String) requestMap.get("bizUserId");
        SysUser user = userMapper.selectById(userId);
        List<SysPost> postList = sysPostMapper.selectPostListByOrgId(user.getOrgId(),null,null);
        return RespBodyHandler.setRespBodyListDto(postList);
    }

    /**
     * 根据机构id查询岗位
     *
     * @param requestMap
     * @return
     */
    @Override
    public Map<String, Object> getPostListByOrgId(Map<String, Object> requestMap) {
        String orgId = (String) requestMap.get("orgId");
        List<SysPost> postList = sysPostMapper.selectPostListByOrgId(orgId,null,null);
        return RespBodyHandler.setRespBodyListDto(postList);
    }
}
