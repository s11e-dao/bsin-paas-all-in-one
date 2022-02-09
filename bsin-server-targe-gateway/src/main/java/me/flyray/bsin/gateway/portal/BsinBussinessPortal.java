package me.flyray.bsin.gateway.portal;

import me.flyray.bsin.gateway.common.ApiResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

/**
 * @author ：bolei
 * @date ：Created in 2022/2/7 17:09
 * @description：业务功能请求入口：c端应用
 * @modified By：
 */


public class BsinBussinessPortal {

    /**
     * http请求入口
     * @param req
     * @return
     */
    @PostMapping("/biz-gateway")
    public ApiResult portal(@RequestBody Map<String, Object> req) {

        return null;
    }
}
