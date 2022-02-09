package me.flyray.bsin.gateway.common;

/**
 * Created on 2019/1/2
 * Title: 对于一般返回码应该具有方法功能的接口定义
 * Description: 对于一般返回码应该具有方法功能的接口定义，目前的用途是用于第三方扩展api返回的枚举类型ResponseCode使用
 * Copyright: Copyright(c) 2019
 * Company:
 *
 * @author yifeng
 */
public interface ReturnCode {

    String getReturnCode();

    String getReturnMessage();

}
