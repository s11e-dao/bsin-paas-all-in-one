package me.flyray.bsin.gateway.mapper;

import me.flyray.bsin.gateway.domain.ChoreographyService;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface ChoreographyServiceMapper {

    ChoreographyService selectByServiceNameAndMethodName(
            @Param("serviceName") String serviceName,
            @Param("methodName") String methodName);

}
