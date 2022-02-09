package me.flyray.bsin.server.impl;

import me.flyray.bsin.facade.response.HelloResp;
import me.flyray.bsin.facade.service.HelloService;
import me.flyray.bsin.server.domain.Hello;
import me.flyray.bsin.server.mapper.HelloMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

/**
 * @author ：bolei
 * @date ：Created in 2021/11/30 16:23
 * @description：hello world 实现
 * @modified By：
 */

public class HelloServiceImpl implements HelloService {

    @Autowired
    private HelloMapper helloMapper;

    @Override
    public void add(Map<String, Object> requestMap) {
        Hello hello = new Hello();
        String name = (String) requestMap.get("name");
        // TODO 雪花算法生成ID
        hello.setId("1");
        hello.setName(name);
        hello.setDesc("test");
//        helloMapper.insert(hello);
    }

    @Override
    public List<HelloResp> getList(Map<String, Object> requestMap) {
        return null;
    }
}
