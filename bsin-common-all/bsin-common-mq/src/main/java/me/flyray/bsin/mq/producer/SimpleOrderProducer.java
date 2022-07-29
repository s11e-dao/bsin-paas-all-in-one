/**
 * Alipay.com Inc.
 * Copyright (c) 2004-2020 All Rights Reserved.
 */
package me.flyray.bsin.mq.producer;

import me.flyray.bsin.mq.config.MqConfig;
import org.apache.rocketmq.client.producer.DefaultMQProducer;
import org.apache.rocketmq.client.producer.MessageQueueSelector;
import org.apache.rocketmq.client.producer.SendResult;
import org.apache.rocketmq.common.message.Message;
import org.apache.rocketmq.common.message.MessageExt;
import org.apache.rocketmq.common.message.MessageQueue;

import java.util.Date;
import java.util.List;

public class SimpleOrderProducer {
    public static void main(String... args) throws Exception {
        DefaultMQProducer producer = new DefaultMQProducer(MqConfig.GROUP_ID, MqConfig.RPC_HOOK, true, null);
        producer.setNamesrvAddr(MqConfig.NAMESRV);
        producer.setNamespace(MqConfig.INSTANCE);
        producer.start();

        MessageExt msg = new MessageExt();
        msg.setTopic(MqConfig.TOPIC);
        msg.setBody((new Date() + " Hello world").getBytes());
        msg.setTags(MqConfig.TAG);
        int orderId = 233;
        msg.setKeys(Integer.toString(orderId));
        SendResult sendResult = producer.send(msg, new MessageQueueSelector() {
            @Override
            public MessageQueue select(List<MessageQueue> mqs, Message message, Object orderId) {
                Integer id = (Integer) orderId;
                int index = id % mqs.size();
                return mqs.get(index);
            }
        }, orderId);
        System.out.println(new Date() + " " + sendResult);
    }
}