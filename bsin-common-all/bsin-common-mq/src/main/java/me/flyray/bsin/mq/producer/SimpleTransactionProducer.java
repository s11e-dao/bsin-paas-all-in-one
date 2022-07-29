/**
 * Alipay.com Inc.
 * Copyright (c) 2004-2020 All Rights Reserved.
 */
package me.flyray.bsin.mq.producer;

import me.flyray.bsin.mq.config.MqConfig;
import org.apache.rocketmq.client.producer.LocalTransactionState;
import org.apache.rocketmq.client.producer.TransactionListener;
import org.apache.rocketmq.client.producer.TransactionMQProducer;
import org.apache.rocketmq.client.producer.TransactionSendResult;
import org.apache.rocketmq.common.message.Message;
import org.apache.rocketmq.common.message.MessageExt;

import java.util.Date;

public class SimpleTransactionProducer {
    public static void main(String... args) throws Exception {
        TransactionMQProducer producer = new TransactionMQProducer(MqConfig.GROUP_ID, MqConfig.RPC_HOOK);
        producer.setNamesrvAddr(MqConfig.NAMESRV);
        producer.setNamespace(MqConfig.INSTANCE);
        producer.setTransactionListener(new TransactionListener() {
            @Override
            public LocalTransactionState executeLocalTransaction(Message message, Object o) {
                return LocalTransactionState.COMMIT_MESSAGE;
            }

            @Override
            public LocalTransactionState checkLocalTransaction(MessageExt msg) {
                System.out.println(String.format("%s check txn msg body[%s] msgId[%s]", new Date(),
                    new String(msg.getBody()), msg.getMsgId()));
                return LocalTransactionState.COMMIT_MESSAGE;
            }
        });
        producer.start();

        MessageExt msg = new MessageExt();
        msg.setTopic(MqConfig.TOPIC);
        msg.setBody((new Date() + " Hello world").getBytes());
        msg.setTags(MqConfig.TAG);
        String timestamp = Long.toString(System.currentTimeMillis());
        msg.setKeys(timestamp);
        TransactionSendResult sendResult = producer.sendMessageInTransaction(msg, null);
        System.out.println(new Date() + " " + sendResult);
    }
}