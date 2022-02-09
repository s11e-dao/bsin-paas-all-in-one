package me.flyray.bsin.gateway.mapper;

import me.flyray.bsin.gateway.domain.Hello;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

/**
 * @author ：bolei
 * @date ：Created in 2021/11/30 16:54
 * @description：hello数据访问
 */

@Repository
@Mapper
public interface HelloMapper {

    int insert(Hello hello);

}
