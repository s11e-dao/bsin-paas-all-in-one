package me.flyray.bsin.server.mapper;

import me.flyray.bsin.server.domain.SysUser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface UserMapper {

    void deleteById(String userId);

    void insertUser(SysUser userId);

    List<SysUser> selectByUsername(@Param("username") String username,@Param("nickname") String nickname);

    SysUser selectById(String userId);

    void updateById(SysUser userId);

    SysUser login(@Param("username") String username, @Param("password") String password ,@Param("tenantId") String tenantId);

    void deleteUserById(String orgId);

    List<SysUser> selectList(@Param("tenantId") String tenantId
            , @Param("nickname") String nickname
            , @Param("username") String userName
            , @Param("orgId") String orgId);

    List<SysUser> selectUserByPostIdAndOrgId(@Param("postId") String postId,
                                             @Param("orgId") String orgId);

}
