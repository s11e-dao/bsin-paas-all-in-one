/**
 * Alipay.com Inc.
 * Copyright (c) 2004-2020 All Rights Reserved.
 */
package me.flyray.bsin.mq.consumer;

import me.flyray.bsin.mq.config.MqConfig;
import org.apache.rocketmq.client.consumer.DefaultMQPushConsumer;
import org.apache.rocketmq.client.consumer.listener.MessageListenerConcurrently;

public class SimpleConsumer {
    public static void main(String... args) throws Exception {
        //DefaultMQPushConsumer consumer = new DefaultMQPushConsumer(MqConfig.INSTANCE, MqConfig.GROUP_ID,
        //    MqConfig.RPC_HOOK, new AllocateMessageQueueAveragely(), true, null);

        //创建一个消息接收对象consumer
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("group1");


        consumer.setNamesrvAddr(MqConfig.NAMESRV);
        consumer.subscribe(MqConfig.TOPIC, MqConfig.TAG);
        consumer.registerMessageListener(((MessageListenerConcurrently) new MessageListener()));
        consumer.start();
    }
}