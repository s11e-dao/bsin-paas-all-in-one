package me.flyray.bsin.server.mapper;

import me.flyray.bsin.server.domain.SysPost;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface PostRoleMapper {

    void assignRoles(@Param("postId")String postId , @Param("roleIds") List<String> roleIds,@Param("appId")String appId );

    void unAssignRoles(@Param("postId") String postId, @Param("appId") String appId);

    List<SysPost> getRoleByPostId(@Param("postId") String postId);
}
