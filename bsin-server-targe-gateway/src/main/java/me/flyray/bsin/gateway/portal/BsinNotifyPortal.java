package me.flyray.bsin.gateway.portal;


import com.alibaba.fastjson.JSONObject;
import com.github.binarywang.wxpay.bean.notify.WxPayNotifyResponse;
import com.github.binarywang.wxpay.bean.notify.WxPayOrderNotifyResult;
import com.github.binarywang.wxpay.exception.WxPayException;
import com.github.binarywang.wxpay.service.WxPayService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/notify")
public class BsinNotifyPortal {

    private static final Logger logger = LoggerFactory.getLogger(BsinNotifyPortal.class);

    @Autowired
    private WxPayService wxPayService;

    @RequestMapping("/erp/stock")
    @Transactional(rollbackFor = Exception.class)
    public Object stock(@RequestBody String body) throws Exception {
        JSONObject jsonObject = JSONObject.parseObject(body);
        String ciphertext = jsonObject.getString("ciphertext");
        // 验签

        return "ok";
    }

    @RequestMapping("/wxpay")
    @Transactional(rollbackFor = Exception.class)
    public Object wxpay(@RequestBody String body) throws Exception {
        WxPayOrderNotifyResult result = null;
        try {
            result = wxPayService.parseOrderNotifyResult(body);
        } catch (WxPayException e) {
            logger.error("[微信解析回调请求] 异常", e);
            return WxPayNotifyResponse.fail(e.getMessage());
        }
        logger.info("处理腾讯支付平台的订单支付");
        logger.info(JSONObject.toJSONString(result));

        /* 之前传过去的我们系统的订单ID */
        String orderNo = result.getOutTradeNo();
        String payId = result.getTransactionId();

        // TODO 处理微信支付成功回调

        return WxPayNotifyResponse.success("支付成功");
    }

}


