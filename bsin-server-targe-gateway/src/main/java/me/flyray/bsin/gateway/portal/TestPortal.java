package me.flyray.bsin.gateway.portal;

import me.flyray.bsin.gateway.service.impl.BsinInvokeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class TestPortal {

    @Autowired
    private BsinInvokeService bsinInvokeService;

    @PostMapping("/test")
    public void test(){
        Map map = new HashMap();
        bsinInvokeService.genericInvoke("Test","test",map);
    }
}
