package me.flyray.bsin.gateway.exception;

import me.flyray.bsin.gateway.common.ResponseCode;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class ErrorController {

    /**
     * 拦截器抛出的异常，token失效错误
     * @param request
     */
    @RequestMapping("/error/exthrow")
    public void rethrow(HttpServletRequest request){
        throw new BusinessException(ResponseCode.TOKEN_ERROR);
    }

    /**
     * 拦截器抛出的异常，sign异常
     * @param request
     */
    @RequestMapping("/error/sign")
    public void sign(HttpServletRequest request){
        throw new BusinessException(ResponseCode.SIGN_NOT_EMPTY);
    }
}