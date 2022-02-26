package me.flyray.bsin.gateway.service.impl;

import com.alipay.sofa.runtime.api.annotation.SofaService;
import com.alipay.sofa.runtime.api.annotation.SofaServiceBinding;
import me.flyray.bsin.facade.service.Test;
import me.flyray.bsin.gateway.utils.RespBodyHandler;

import java.util.Map;

public class TestImpl implements Test {

    @Override
    public Map<String,Object> test(Map<String,Object> reParam){
        System.out.println("执行成功");
        return RespBodyHandler.RespBodyDto();
    }
}
