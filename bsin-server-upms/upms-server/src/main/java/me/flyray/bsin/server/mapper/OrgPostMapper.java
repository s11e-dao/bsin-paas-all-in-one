package me.flyray.bsin.server.mapper;

import me.flyray.bsin.server.domain.SysOrg;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface OrgPostMapper {

    void assignPosts(@Param("orgId") String orgId ,@Param("postIds") List<String> postIds);

    void unbindPost(@Param("orgId") String orgId);

    void unbindPosts(@Param("orgId") String orgId ,@Param("postId") String postId);

    List<SysOrg> getPostByOrgId(String orgId);
}
