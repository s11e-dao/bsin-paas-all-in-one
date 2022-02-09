package me.flyray.bsin.gateway.service;

import me.flyray.bsin.gateway.domain.ChoreographyService;

import java.util.Map;

public interface ChoreographyServiceService {

    ChoreographyService getChoreographyServiceByServiceAndMethod(Map<String,Object> requestMap);
}
