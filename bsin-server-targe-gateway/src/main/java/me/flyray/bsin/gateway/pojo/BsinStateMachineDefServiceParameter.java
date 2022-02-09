package me.flyray.bsin.gateway.pojo;

import io.seata.saga.statelang.domain.RecoverStrategy;
import io.seata.saga.statelang.domain.State;
import io.seata.saga.statelang.domain.StateMachine;
import lombok.Data;

import java.util.Date;
import java.util.Map;

/**
 * @author ：bolei
 * @date ：Created in 2021/12/4 0:47
 * @description：状态机数据对象
 * @modified By：
 */

@Data
public class BsinStateMachineDefServiceParameter {

    private String id;

    private String name;

    private String tenantId;

    private String appName;

    private String type;

    private String comment;

    private String version;

    private Date gmtCreate;

    private String status;

    private String content;

    private String paramStatus;

    private String recoverStrategy;

}
