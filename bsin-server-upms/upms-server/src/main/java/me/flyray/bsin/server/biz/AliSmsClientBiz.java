package me.flyray.bsin.server.biz;

import com.aliyun.dysmsapi20170525.Client;
import com.aliyun.dysmsapi20170525.models.SendSmsRequest;

import com.aliyun.teaopenapi.models.Config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AliSmsClientBiz {

    @Value("${gulimall.sms.sms-access-key-id}")
    private volatile String smsAccessKeyId;
    @Value("${gulimall.sms.sms-access-key-secret}")
    private volatile String smsAccessKeySecret;
    @Value("${gulimall.sms.sms-endpoint}")
    private volatile String smsEndpoint;
    @Value("${gulimall.sms.sms-template-code}")
    private volatile String smsTemplateCode;

    /**
     * 使用AK&SK初始化账号Client
     * @param accessKeyId
     * @param accessKeySecret
     * @return Client
     * @throws Exception
     */
    public static com.aliyun.dysmsapi20170525.Client createClient(String accessKeyId, String accessKeySecret, String endpoint) throws Exception {
        Config config = new Config()
                // 您的AccessKey ID
                .setAccessKeyId(accessKeyId)
                // 您的AccessKey Secret
                .setAccessKeySecret(accessKeySecret);
        // 访问的域名
        config.endpoint = endpoint;
        return new com.aliyun.dysmsapi20170525.Client(config);
    }

    /* *
     * 发送验证码
     * @throws Exception
     */
    public void sendCode(String phoneNumbers, String code) throws Exception {
        Client client = createClient(smsAccessKeyId,
                smsAccessKeySecret,
                smsEndpoint);
        SendSmsRequest sendSmsRequest = new SendSmsRequest()
                .setPhoneNumbers(phoneNumbers)
                .setSignName("飞雷")
                .setTemplateCode(smsTemplateCode)
                .setTemplateParam("{\"code\":\"" + code + "\"}");
        // 复制代码运行请自行打印 API 的返回值
        client.sendSms(sendSmsRequest);
    }
}

