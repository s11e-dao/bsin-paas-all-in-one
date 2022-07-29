package me.flyray.bsin.mq.config;

import me.flyray.bsin.mq.SofaMQAclRPCHook;
import org.apache.rocketmq.acl.common.SessionCredentials;
import org.apache.rocketmq.remoting.RPCHook;

/**
 * MQ 配置
 */
public class MqConfig {
    /**
     * 启动测试之前请替换如下 XXX 为您的配置
     */
    public static final String  TOPIC      = "BenchmarkTest";
    public static final String  GROUP_ID   = "XXX";
    public static final String  ACCESS_KEY = "XXX";
    public static final String  SECRET_KEY = "XXX";
    public static final String  TAG        = "mq_test_tag";
    public static final String  INSTANCE   = "XXX";
    // ip1:port1;ip2:port2
    public static final String  NAMESRV    = "192.168.4.229:9876";
    public static final RPCHook RPC_HOOK   = new SofaMQAclRPCHook(
        new SessionCredentials(MqConfig.ACCESS_KEY, MqConfig.SECRET_KEY), MqConfig.INSTANCE);
}
