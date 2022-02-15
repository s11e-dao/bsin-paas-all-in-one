package me.flyray.bsin.server.mapper;

import me.flyray.bsin.facade.response.PostResp;
import me.flyray.bsin.server.domain.SysApp;
import me.flyray.bsin.server.domain.SysPost;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * SysPost数据访问
 */
@Repository
@Mapper
public interface PostMapper {

    void insertPost(SysPost sysPost);

    void deleteById(@Param("postId") String postId);

    void updateById(SysPost sysPost);

    List<SysPost> selectPostList(@Param("postCode")String postCode,
                                  @Param("postName")String postName,
                                  @Param("tenantId")String tenantId);

    List<PostResp> selectPostListByTenantId(@Param("tenantId") String tenantId);

    List<SysPost> getPostByUserId(@Param("userId")String userId);

    SysPost getPostByPostCode(@Param("postCode")String postCode);

    List<SysPost> selectList(@Param("tenantId") String  tenantId ,
                             @Param("postId") String postId,
                             @Param("postCode") String postCode,
                             @Param("postName") String postName);

    List<SysPost> selectPostListByOrgId(@Param("orgId")String orgId,
                                        @Param("postCode") String postCode ,
                                        @Param("postName") String postName);

    List<SysPost> getAlreadyAssignPostByUserId(@Param("userId")String userId);
}
