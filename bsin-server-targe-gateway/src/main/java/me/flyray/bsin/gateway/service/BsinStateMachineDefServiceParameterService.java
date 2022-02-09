package me.flyray.bsin.gateway.service;

import me.flyray.bsin.gateway.pojo.BsinStateMachineDefServiceParameter;

import java.util.ArrayList;
import java.util.List;

/**
 * @author ：bolei
 * @date ：Created in 2021/12/4 0:50
 * @description：获取bsin状态机服务参数服务
 * @modified By：
 */

public class BsinStateMachineDefServiceParameterService {

    public List<BsinStateMachineDefServiceParameter> getAllStateMachineDefServiceParameter(){
        BsinStateMachineDefServiceParameter bsinStateMachineDefServiceParameter = new BsinStateMachineDefServiceParameter();
        List<BsinStateMachineDefServiceParameter> list = new ArrayList<BsinStateMachineDefServiceParameter>();
        list.add(bsinStateMachineDefServiceParameter);
        return list;
    }
}
