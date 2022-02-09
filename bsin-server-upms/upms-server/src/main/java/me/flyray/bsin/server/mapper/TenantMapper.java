package me.flyray.bsin.server.mapper;

import me.flyray.bsin.server.domain.SysTenant;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface TenantMapper {

    void insert(SysTenant record);

    SysTenant getTenantByTenantCode(String tenantCode);

    void deleteById(String tenantId);

    List<SysTenant> selectList(@Param("tenantCode") String tenantCode ,@Param("tenantName") String tenantName);

    void updateById(SysTenant record);

    SysTenant selectByTenantId(String tenantId);

    List<SysTenant> selectAllList();

}
