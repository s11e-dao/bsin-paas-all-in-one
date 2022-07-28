package me.flyray.bsin.gateway.exception;

import me.flyray.bsin.gateway.common.ApiResult;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(value = BusinessException.class)
    @ResponseBody
    public ApiResult handleBusinessException(BusinessException e) {
        e.printStackTrace();
        return  ApiResult.fail(e.code,e.getMessage());
    }

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ApiResult handleBusinessException(Exception e) {
        e.printStackTrace();
        return  ApiResult.fail(e.getMessage());
    }



}
