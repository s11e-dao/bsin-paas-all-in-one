package me.flyray.bsin.gateway.common;

import java.io.Serializable;

public class ApiResult<T> implements Serializable {
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public T getPagination() {
        return pagination;
    }

    public void setPagination(T pagination) {
        this.pagination = pagination;
    }

    private String code;

    private String message;

    private T data;

    private T pagination;
    public ApiResult( String code ,String message) {
        this.code = code;
        this.message = message;
    }

    public ApiResult(String code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public ApiResult(String code, String message, T data ,T pagination) {
        this.code = code;
        this.message = message;
        this.data = data;
        this.pagination=pagination;
    }

    public static <T>ApiResult<T> ok(T data){
        return new ApiResult("000000","操作成功",data);
    }
    public static <T>ApiResult<T> ok(T data ,T pagination){
        return new ApiResult("000000","操作成功",data,pagination);
    }
    public static <T>ApiResult<T> ok(){
        return new ApiResult("000000","操作成功",null);
    }
    public static <T>ApiResult<T> fail(String msg){ return new ApiResult("100000",msg,null); }
    public static <T>ApiResult<T> fail(String code,String msg){ return new ApiResult(code,msg);}

}

