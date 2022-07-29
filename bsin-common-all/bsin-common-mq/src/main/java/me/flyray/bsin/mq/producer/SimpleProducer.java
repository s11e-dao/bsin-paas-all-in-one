/**
 * Alipay.com Inc.
 * Copyright (c) 2004-2020 All Rights Reserved.
 */
package me.flyray.bsin.mq.producer;

import me.flyray.bsin.mq.config.MqConfig;
import org.apache.rocketmq.client.producer.DefaultMQProducer;
import org.apache.rocketmq.client.producer.SendResult;
import org.apache.rocketmq.common.message.MessageExt;

import java.util.Date;

public class SimpleProducer {

    public static void main(String... args) throws Exception {
        //创建发送消息对象
        // DefaultMQProducer producer = new DefaultMQProducer(MqConfig.GROUP_ID, MqConfig.RPC_HOOK, true, null);

        DefaultMQProducer producer = new DefaultMQProducer("group1");

        //设定命名服务器地址---获取到消息服务器ip
        producer.setNamesrvAddr(MqConfig.NAMESRV);
        //producer.setNamespace(MqConfig.INSTANCE);
        producer.start();

        MessageExt msg = new MessageExt();
        msg.setTopic(MqConfig.TOPIC);
        msg.setBody((new Date() + " Hello world").getBytes());
        msg.setTags(MqConfig.TAG);
        String timestamp = Long.toString(System.currentTimeMillis());
        msg.setKeys(timestamp);
        SendResult sendResult = producer.send(msg);
        System.out.println(new Date() + " " + sendResult);
    }

}