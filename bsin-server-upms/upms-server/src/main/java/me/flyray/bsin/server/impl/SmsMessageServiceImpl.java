package me.flyray.bsin.server.impl;

import me.flyray.bsin.facade.service.SmsMessageService;
import me.flyray.bsin.server.biz.AliSmsClientBiz;
import me.flyray.bsin.server.utils.RespBodyHandler;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

public class SmsMessageServiceImpl implements SmsMessageService {

    @Autowired
    private AliSmsClientBiz aliSmsClientBiz;

    @Override
    public Map<String, Object> sendMsg(Map<String, Object> requestMap) {
        String phoneNumbers = (String)requestMap.get("phoneNumbers");
        String code = (String)requestMap.get("code");
        try {
            aliSmsClientBiz.sendCode(phoneNumbers,code);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return RespBodyHandler.RespBodyDto();
    }
}
