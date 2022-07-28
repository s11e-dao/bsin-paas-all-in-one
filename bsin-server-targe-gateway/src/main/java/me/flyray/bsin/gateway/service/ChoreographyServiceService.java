package me.flyray.bsin.gateway.service;

import me.flyray.bsin.gateway.domain.ChoreographyServiceBiz;
import org.springframework.stereotype.Service;

import java.util.Map;


public interface ChoreographyServiceService {

    ChoreographyServiceBiz getChoreographyServiceByServiceAndMethod(Map<String,Object> requestMap);
}
