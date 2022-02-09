package me.flyray.bsin.server.mapper;

import me.flyray.bsin.server.domain.SysPost;
import me.flyray.bsin.server.domain.SysUser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface UserPostMapper {

    void assignPosts(@Param("userId") String userId,@Param("postIds")List<String> postIds);

    void unbindPost(@Param("userId") String userId);

    List<SysPost> getUserByPostId(@Param("postId") String postId);

    SysUser getPostByUserId(@Param("userId") String userId);


}
