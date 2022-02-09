package me.flyray.bsin.gateway.service.impl;

import me.flyray.bsin.gateway.domain.ChoreographyService;
import me.flyray.bsin.gateway.mapper.ChoreographyServiceMapper;
import me.flyray.bsin.gateway.service.ChoreographyServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ChoreographyServiceServiceImpl implements ChoreographyServiceService {


    @Autowired
    private ChoreographyServiceMapper choreographyServiceMapper;

    @Override
    public ChoreographyService getChoreographyServiceByServiceAndMethod(Map<String, Object> requestMap) {
        String serviceName = (String)requestMap.get("serviceName");
        String methodName = (String)requestMap.get("methodName");
        ChoreographyService choreographyService =  choreographyServiceMapper.selectByServiceNameAndMethodName(serviceName,methodName);
        return choreographyService;
    }
}
