package me.flyray.bsin.gateway.biz;

import cn.hutool.core.date.DateField;
import cn.hutool.core.date.DateTime;
import cn.hutool.jwt.JWTPayload;
import cn.hutool.jwt.JWTUtil;
import com.alipay.sofa.rpc.api.GenericService;
import com.alipay.sofa.rpc.config.ConsumerConfig;
import io.seata.saga.engine.StateMachineEngine;
import io.seata.saga.statelang.domain.ExecutionStatus;
import io.seata.saga.statelang.domain.StateMachineInstance;
import me.flyray.bsin.gateway.common.ApiResult;
import me.flyray.bsin.gateway.domain.ChoreographyService;
import me.flyray.bsin.gateway.service.ChoreographyServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.HashMap;
import java.util.Map;

@Service
public class GatewayBiz {

    public static StateMachineEngine stateMachineEngine;

    public ConsumerConfig<GenericService> consumerConfig;

    @Autowired
    private ChoreographyServiceService choreographyServiceService;



    /**
     * 根据服务名和方法名获取编排服务
     */
    public ChoreographyService getChoreographyService(Map<String,Object> req){
        ChoreographyService choreographyService = choreographyServiceService.getChoreographyServiceByServiceAndMethod(req);
        return choreographyService;
    }

    public Map<String,Object> executeChoreographyService(Map<String,Object> choreographyService  , Map<String,Object> bizParams){
        String stateMachineName =(String)choreographyService.get("stateMachineName");
        String businessKey = String.valueOf(System.currentTimeMillis());
        bizParams.put("businessKey", businessKey);
        //sync test  同步
        StateMachineInstance inst = stateMachineEngine.startWithBusinessKey(stateMachineName, null,
                businessKey, bizParams);
        Assert.isTrue(ExecutionStatus.SU.equals(inst.getStatus()),
                "saga transaction execute failed. XID: " + inst.getId());
        System.out.println("saga transaction commit succeed. XID: " + inst.getId());
        return null;
    }

    /**
     *用户登录
     */
    public Map<String,Object> userLogin(Map result){
        //bsin-server-upms
        Map<String,Object> data = (Map) result.get("data");
        Map<String,Object> sysUser = (Map) data.get("sysUser");
        String userName = (String)sysUser.get("userName");
        String userId = (String)sysUser.get("userId");
        String tenantId = (String)sysUser.get("tenantId");
        String createBy = (String)sysUser.get("userName");
        String updateBy = (String)sysUser.get("userName");
        Map<String,Object> map=new HashMap<>();
        DateTime now=DateTime.now();
        DateTime newTime=now.offsetNew(DateField.MINUTE,1);
        //签发时间
        map.put(JWTPayload.ISSUED_AT,now);
        //过期时间
        map.put(JWTPayload.EXPIRES_AT,newTime);
        //生效时间
        map.put(JWTPayload.NOT_BEFORE,now);
        //bsin-server-upms载荷
        map.put("userName",userName);
        map.put("userId",userId);
        map.put("tenantId",tenantId);
        map.put("createBy",createBy);
        map.put("updateBy",updateBy);
        String token = JWTUtil.createToken(map, "1234".getBytes());
        data.put("token",token);
       return data;
    }

    /**
     *app用户登录
     */
    public Map<String,Object> appUserLogin(Map result){
        //bsin-server-huoyuanshequ
        Map<String,Object> data = (Map) result.get("data");
        String userId = (String)data.get("userId");
        String nickname = (String)data.get("nickname");
        String email = (String)data.get("email");
        Map<String,Object> map=new HashMap<>();
        DateTime now=DateTime.now();
        DateTime newTime=now.offsetNew(DateField.SECOND,30);
        //签发时间
        map.put(JWTPayload.ISSUED_AT,now);
        //过期时间
        map.put(JWTPayload.EXPIRES_AT,newTime);
        //生效时间
        map.put(JWTPayload.NOT_BEFORE,now);
        map.put("userId",userId);
        map.put("nickname",nickname);
        map.put("email",email);
        String token = JWTUtil.createToken(map, "1234".getBytes());
        data.put("token",token);
        return data;
    }
}
