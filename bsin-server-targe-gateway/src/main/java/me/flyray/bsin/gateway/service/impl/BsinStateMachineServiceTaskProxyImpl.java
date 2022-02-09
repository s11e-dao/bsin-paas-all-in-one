package me.flyray.bsin.gateway.service.impl;

import com.alipay.sofa.rpc.api.GenericService;
import com.alipay.sofa.rpc.config.ConsumerConfig;
import me.flyray.bsin.gateway.pojo.Parameter;
import me.flyray.bsin.gateway.service.BsinStateMachineServiceTaskProxy;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class BsinStateMachineServiceTaskProxyImpl implements BsinStateMachineServiceTaskProxy {

    public ConsumerConfig<GenericService> consumerConfig;

    //数组传参
    @Override
    public Object invoke(String serviceName, String serviceMethod, Object[] parameter) {

        ConsumerConfig<GenericService> consumerConfig = new ConsumerConfig<GenericService>()
                .setInterfaceId("me.flyray.bsin.facade.service."+serviceName)
                .setGeneric(true).setDirectUrl("bolt://127.0.0.1:12200");
        GenericService testService = consumerConfig.refer();

        String [] parameterType = new String[parameter.length];

            for (int i = 0; i < parameter.length; i++) {
                if(parameter[i].getClass().getName().equals("com.alibaba.fastjson.JSONObject")){
                  Map<String,Object> map = (Map)parameter[i];
                  parameter[i]=map;
                  parameterType[i]="java.util.Map";
                  continue;
                }
                parameterType[i] = parameter[i].getClass().getName();
                System.out.println(parameterType[i]);
            }

        Object result =  testService.$invoke(serviceMethod, parameterType,parameter);
        System.out.println(result);
        return result;
    }



    //map传参
    @Override
    public Object execute( Map<String,Object> parameter) {
        String serviceName = (String) parameter.get("serviceName");
        String serviceMethod = (String) parameter.get("serviceMethod");
        Map<String,Object> param = (Map<String,Object>) parameter.get("param");

        if(consumerConfig == null){
            consumerConfig = new ConsumerConfig<GenericService>();
        }
        consumerConfig.unRefer();
        consumerConfig.setInterfaceId("me.flyray.bsin.facade.service."+serviceName)
                .setGeneric(true).setDirectUrl("bolt://127.0.0.1:12200");
        GenericService testService = consumerConfig.refer();


        String [] parameterType = new String[param.size()];
        Object [] params = new Object[param.size()];

        int i = 0;
        for (Object paramKey:param.keySet()) {
            parameterType[i]=param.get(paramKey).getClass().getName();
            params[i]=param.get(paramKey);
            i++;
        }

        Object result =  testService.$invoke(serviceMethod, parameterType,params);
        System.out.println(result);
        return result;
    }


    //对象入参
    @Override
    public Object execute(Parameter parameter) {

        ConsumerConfig<GenericService> consumerConfig = new ConsumerConfig<GenericService>()
                .setInterfaceId("me.flyray.bsin.facade.service."+parameter.getServiceName())
                .setGeneric(true).setDirectUrl("bolt://127.0.0.1:12200");
        GenericService testService = consumerConfig.refer();

        String [] parameterType = new String[parameter.getParam().size()];
        Object [] params = new Object[parameter.getParam().size()];
        int i = 0;
        for (String paramName:parameter.getParam().keySet()
        ) {
            parameterType[i]=parameter.getParam().get(paramName).getClass().getName();
            params[i]=parameter.getParam().get(paramName);
            i++;
        }

        Object result =  testService.$invoke(parameter.getServiceMethod(), parameterType,params);
        System.out.println(result);
        return result;
    }

}


