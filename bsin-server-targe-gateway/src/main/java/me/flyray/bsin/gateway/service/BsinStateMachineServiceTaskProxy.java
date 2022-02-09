package me.flyray.bsin.gateway.service;

import me.flyray.bsin.gateway.pojo.Parameter;

import java.util.Map;

public interface BsinStateMachineServiceTaskProxy {

    Object invoke(String serviceName,String serviceMethod, Object[]parameter);


    Object execute(Map<String,Object> parameter);

    Object execute(Parameter parameter);
}
