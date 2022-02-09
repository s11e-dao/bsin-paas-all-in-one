package me.flyray.bsin.gateway.pojo;

import java.io.Serializable;
import java.util.Map;

public class Parameter implements Serializable {
    private String serviceName;
    private String serviceMethod;
    private Map<String,Object> param;

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getServiceMethod() {
        return serviceMethod;
    }

    public void setServiceMethod(String serviceMethod) {
        this.serviceMethod = serviceMethod;
    }

    public Map<String, Object> getParam() {
        return param;
    }

    public void setParam(Map<String, Object> param) {
        this.param = param;
    }
}
