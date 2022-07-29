/**
 * Alipay.com Inc.
 * Copyright (c) 2004-2020 All Rights Reserved.
 */
package me.flyray.bsin.mq.consumer;

import org.apache.rocketmq.client.consumer.listener.*;
import org.apache.rocketmq.common.message.MessageExt;

import java.util.Date;
import java.util.List;

public class MessageListener implements MessageListenerConcurrently, MessageListenerOrderly {
    @Override
    public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> list,
                                                    ConsumeConcurrentlyContext consumeConcurrentlyContext) {
        for (MessageExt msg : list) {
            System.out.println(
                String.format("%s Consume body[%s] msgId[%s]", new Date(), new String(msg.getBody()), msg.getMsgId()));
        }
        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
    }

    @Override
    public ConsumeOrderlyStatus consumeMessage(List<MessageExt> list, ConsumeOrderlyContext consumeOrderlyContext) {
        for (MessageExt msg : list) {
            System.out.println(
                String.format("%s Consume body[%s] msgId[%s]", new Date(), new String(msg.getBody()), msg.getMsgId()));
        }
        return ConsumeOrderlyStatus.SUCCESS;
    }
}