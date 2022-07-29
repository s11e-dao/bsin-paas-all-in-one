/**
 * Alipay.com Inc.
 * Copyright (c) 2004-2020 All Rights Reserved.
 */
package me.flyray.bsin.mq.consumer;

import me.flyray.bsin.mq.config.MqConfig;
import org.apache.rocketmq.client.consumer.DefaultMQPushConsumer;
import org.apache.rocketmq.client.consumer.listener.MessageListenerOrderly;
import org.apache.rocketmq.client.consumer.rebalance.AllocateMessageQueueAveragely;

public class SimpleOrderConsumer {
    public static void main(String... args) throws Exception {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer(MqConfig.INSTANCE, MqConfig.GROUP_ID,
            MqConfig.RPC_HOOK, new AllocateMessageQueueAveragely(), true, null);
        consumer.setNamesrvAddr(MqConfig.NAMESRV);
        consumer.subscribe(MqConfig.TOPIC, MqConfig.TAG);
        consumer.registerMessageListener(((MessageListenerOrderly) new MessageListener()));
        consumer.start();
    }
}