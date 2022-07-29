/**
 * Alipay.com Inc.
 * Copyright (c) 2004-2020 All Rights Reserved.
 */
package me.flyray.bsin.mq;

import org.apache.rocketmq.acl.common.AclSigner;
import org.apache.rocketmq.acl.common.AclUtils;
import org.apache.rocketmq.acl.common.SessionCredentials;
import org.apache.rocketmq.acl.common.SigningAlgorithm;
import org.apache.rocketmq.remoting.CommandCustomHeader;
import org.apache.rocketmq.remoting.RPCHook;
import org.apache.rocketmq.remoting.protocol.RemotingCommand;

import java.lang.reflect.Field;
import java.util.SortedMap;
import java.util.TreeMap;
import java.util.concurrent.ConcurrentHashMap;
import java.util.zip.CRC32;

public class SofaMQAclRPCHook implements RPCHook {
    public static final String                                                 INSTANCE_ID = "instanceId";
    public static final String                                                 ACCESS_KEY  = "accessKey";
    public static final String                                                 SIGNATURE   = "signature";
    private SessionCredentials                                                 sessionCredentials;
    private String                                                             instanceId;
    protected ConcurrentHashMap<Class<? extends CommandCustomHeader>, Field[]> fieldCache  = new ConcurrentHashMap<Class<? extends CommandCustomHeader>, Field[]>();

    public SofaMQAclRPCHook(SessionCredentials sessionCredentials, String instanceId) {
        this.sessionCredentials = sessionCredentials;
        this.instanceId = instanceId;
    }

    public void doBeforeRequest(String remoteAddr, RemotingCommand request) {
        byte[] total = AclUtils.combineRequestContent(request,
            parseRequestContent(request, sessionCredentials.getAccessKey(), instanceId));
        String signature = AclSigner.calSignature(calCRC32(total), sessionCredentials.getSecretKey(),
            SigningAlgorithm.HmacSHA256, SessionCredentials.CHARSET);

        request.addExtField(SIGNATURE, signature);
        request.addExtField(ACCESS_KEY, sessionCredentials.getAccessKey());
        request.addExtField(INSTANCE_ID, instanceId);

    }

    public void doAfterResponse(String remoteAddr, RemotingCommand request, RemotingCommand response) {

    }

    protected SortedMap<String, String> parseRequestContent(RemotingCommand request, String ak, String instanceId) {
        CommandCustomHeader header = request.readCustomHeader();
        // sort property
        SortedMap<String, String> map = new TreeMap<String, String>();
        map.put(ACCESS_KEY, ak);
        map.put(INSTANCE_ID, instanceId);
        try {
            // add header properties
            if (null != header) {
                Field[] fields = fieldCache.get(header.getClass());
                if (null == fields) {
                    fields = header.getClass().getDeclaredFields();
                    for (Field field : fields) {
                        field.setAccessible(true);
                    }
                    Field[] tmp = fieldCache.putIfAbsent(header.getClass(), fields);
                    if (null != tmp) {
                        fields = tmp;
                    }
                }

                for (Field field : fields) {
                    Object value = field.get(header);
                    if (null != value && !field.isSynthetic()) {
                        map.put(field.getName(), value.toString());
                    }
                }
            }
            return map;
        } catch (Exception e) {
            throw new RuntimeException("incompatible exception.", e);
        }
    }

    public static byte[] calCRC32(byte[] data) {
        CRC32 crc32 = new CRC32();
        crc32.update(data);
        return Long.toHexString(crc32.getValue()).getBytes(SessionCredentials.CHARSET);
    }
}