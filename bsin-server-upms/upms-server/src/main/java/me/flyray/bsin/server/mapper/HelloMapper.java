package me.flyray.bsin.server.mapper;

import me.flyray.bsin.server.domain.Hello;
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
