package me.flyray.bsin.gateway.portal;

import me.flyray.bsin.gateway.common.ApiResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

/**
 * @author ：bolei
 * @date ：Created in 2022/2/7 17:08
 * @description：开放平台网关入口
 * @modified By：
 */

public class BsinOpenApiPortal {

    /**
     * http请求入口
     * @param req
     * @return
     */
    @PostMapping("/api-gateway")
    public ApiResult portal(@RequestBody Map<String, Object> req) {

        return null;
    }

}
