package me.flyray.bsin.server.biz;

import me.flyray.bsin.server.mapper.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional(rollbackFor = Exception.class)
public class TenantBiz {



//    /**
//     * 根据租户id删除租户
//     * @param tenantId
//     */
//    public void deleteTenant(String tenantId){
//
//        //解除租户应用之间的绑定关系
//        tenantAppMapper.deleteAppAssociation(tenantId);
//        //删除租户下的机构
//        orgMapper.deleteByTenantId(tenantId);
//        //解除机构与应用、岗位的绑定
//        List<SysOrg> sysOrgs = orgMapper.selectByTenantIdOrgList(tenantId);
//        for (SysOrg sysOrg:sysOrgs) {
//            appOrgMapper.deleteAppAssociationById(sysOrg.getOrgId());
//            orgMapper.deletePostAssociationById(sysOrg.getOrgId());
//        }
//        //删除租户下的用户
//        userMapper.deleteByTenantId(tenantId);
//        //解除用户与岗位的绑定
//        List<String> list = userMapper.selectByTenantId(tenantId);
//        for (String userId:list) {
//            userPostMapper.unbindPost(userId);
//        }
//        //删除租户下的岗位
//        List<PostResp> postResps = postMapper.selectByTenantIdPostList(tenantId);
//        //解除岗位与角色的绑定
//        for (PostResp post: postResps
//        ) {
//            postRoleMapper.unbindRole(post.getPostId());
//        }
//        postMapper.deleteByTenantId(tenantId);
//    }
}
