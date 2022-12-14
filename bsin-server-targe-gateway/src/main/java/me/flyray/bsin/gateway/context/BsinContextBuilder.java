package me.flyray.bsin.gateway.context;

import cn.hutool.core.date.DateField;
import cn.hutool.core.date.DateTime;
import cn.hutool.jwt.JWTPayload;
import cn.hutool.jwt.JWTUtil;
import me.flyray.bsin.gateway.common.ApiResult;
import me.flyray.bsin.gateway.common.CommonConstants;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * @author ：bolei
 * @date ：Created in 2022/2/7 17:31
 * @description：请求上下文构建
 * @modified By：
 */

@Service
public class BsinContextBuilder {

    /**
     * 构建请求报文
     * @param requestMap
     */
    public Map<String, Object> buildReqMessage(Map<String, Object> requestMap) {
        String userId = (String) BaseContextHandler.get("userId");
        String username = (String) BaseContextHandler.get("username");
        // 当前登录用户所属租户
        String tenantId = (String) BaseContextHandler.get("tenantId");
        String createBys = (String) BaseContextHandler.get("createBy");
        String updateBys = (String) BaseContextHandler.get("updateBy");
        // 系统参数
        String serviceName = (String) requestMap.get("serviceName");
        String methodName = (String) requestMap.get("methodName");
        // 业务参数
        Map<String, Object> bizParams = (Map<String, Object>) requestMap.get("bizParams");
        Map<String, Object> pagination = (Map<String, Object>) requestMap.get("pagination");
        // 请求业务参数build
        Map<String, Object> reqParam = new HashMap<String, Object>();
        // biz 代表前端传值
        reqParam.put("bizTenantId",bizParams.get("tenantId"));
        reqParam.put("bizUsername",bizParams.get("username"));
        reqParam.put("bizUserId",bizParams.get("userId"));
        bizParams.remove("tenantId");
        bizParams.remove("userId");
        reqParam.putAll(bizParams);
        reqParam.put("pagination", pagination);
        reqParam.put("methodName", methodName);

        if (!methodName.equals("login") && !methodName.equals("getPublishedApps") && !methodName.equals("register")
                && !methodName.equals("daoLogin") && !methodName.equals("mchLogin")){
            reqParam.put("userId", userId);
            if(bizParams.get("username") == null){
                reqParam.put("username", username);
            }
            reqParam.put("tenantId",tenantId);
            reqParam.put("createBy",createBys);
            reqParam.put("updateBy",updateBys);
        }
        if (methodName.equals("daoLogin")){
            reqParam.put("tenantId",reqParam.get("bizTenantId"));
        }
       return reqParam;
    }

    /**
     * 构建相应报文
     * 调用登录相关服务响应成功的生成相应的token
     * @param requestMap
     */
    public ApiResult buildResMessage(String serviceName,String methodName,Map<String, Object> requestMap) {

        //服务端异常捕获不到，暂时这样处理
        if(requestMap.get("data") == null){
            return ApiResult.fail((String) requestMap.get("code"),(String) requestMap.get("message"));
        }
        // 处理调用结果,如果是登录，要特殊处理，生成token
        if (methodName.equals("login") && requestMap.size() > 0 && serviceName.equals("UserService")){
            Map<String, Object> data = userLogin(requestMap);
            return ApiResult.ok(data);
        }else if (methodName.equals("login") && requestMap.size() > 0 && serviceName.equals("HysqCustomerService")){
            Map<String, Object> data = appUserLogin(requestMap);
            return ApiResult.ok(data);
        }else if (methodName.equals("daoLogin") && requestMap.size() > 0 && serviceName.equals("AdminTenantDaoService")){
            Map<String, Object> data = userLogin(requestMap);
            return ApiResult.ok(data);
        } else if(methodName.equals("getRoleInfoByPhone") && requestMap.size() > 0 && serviceName.equals("CustomerService")){
            Map<String, Object> data = cpqUserLogin(requestMap);
            return ApiResult.ok(data);
        }else if(methodName.equals("getUserInfo") && requestMap.size() > 0 && serviceName.equals("CustomerService")){
            Map<String, Object> data = daoUserLogin(requestMap);
            return ApiResult.ok(data);
        }else if(methodName.equals("mchLogin") && requestMap.size() > 0 && serviceName.equals("MerchantService")){
            Map<String, Object> data = mchLogin(requestMap);
            return ApiResult.ok(data);
        }
        // 处理调用结果
        System.out.println(requestMap);
        return ApiResult.ok(requestMap.get("data"), requestMap.get("pagination"));
    }

    /**
     * 畅行码授权登录
     */
    private Map<String,Object> cpqUserLogin(Map result){
        Map<String,Object> map=new HashMap<String,Object>();
        DateTime now=DateTime.now();
        DateTime newTime=now.offsetNew(DateField.MINUTE,1000);
        //签发时间
        map.put(JWTPayload.ISSUED_AT,now);
        //过期时间
        map.put(JWTPayload.EXPIRES_AT,newTime);
        //生效时间
        map.put(JWTPayload.NOT_BEFORE,now);
        Map<String,Object> data = (Map) result.get("data");
        Map<String,Object> userInfo = (Map) data.get("userInfo");
        String userId = (String)userInfo.get("userid");
        String username = (String)userInfo.get("username");
        String mobile = (String)userInfo.get("mobile");
        String idnum = (String)userInfo.get("idnum");
        String tenantId = (String)userInfo.get("tenantId");
        map.put("tenantId",tenantId);
        map.put("userId",userId);
        map.put("username",username);
        map.put("phone",mobile);
        map.put("idnum",idnum);
        String token = JWTUtil.createToken(map, CommonConstants.JWT_SECRET.getBytes());
        data.put("token",token);
        return data;

    }

    /**
     *用户登录
     */
    private Map<String,Object> userLogin(Map result){
        //bsin-server-upms
        Map<String,Object> data = (Map) result.get("data");
        Map<String,Object> sysUser = (Map) data.get("sysUser");
        String userName = (String)sysUser.get("userName");
        String userId = (String)sysUser.get("userId");
        String tenantId = (String)sysUser.get("tenantId");
        String createBy = (String)sysUser.get("userName");
        String updateBy = (String)sysUser.get("userName");
        Map<String,Object> map=new HashMap<String,Object>();
        DateTime now=DateTime.now();
        DateTime newTime=now.offsetNew(DateField.MINUTE,1000);
        //签发时间
        map.put(JWTPayload.ISSUED_AT,now);
        //过期时间
        map.put(JWTPayload.EXPIRES_AT,newTime);
        //生效时间
        map.put(JWTPayload.NOT_BEFORE,now);
        //bsin-server-upms载荷
        map.put("userName",userName);
        map.put("userId",userId);
        map.put("tenantId",tenantId);
        map.put("createBy",createBy);
        map.put("updateBy",updateBy);
        String token = JWTUtil.createToken(map, CommonConstants.JWT_SECRET.getBytes());
        data.put("token",token);
        return data;
    }


    /**
     *app用户登录
     */
    private Map<String,Object> appUserLogin(Map result){
        //bsin-server-huoyuanshequ
        Map<String,Object> data = (Map) result.get("data");
        String userId = (String)data.get("userId");
        String nickname = (String)data.get("nickname");
        String username = (String)data.get("username");
        String email = (String)data.get("email");
        Map<String,Object> map=new HashMap<String,Object>();
        DateTime now=DateTime.now();
        DateTime newTime=now.offsetNew(DateField.SECOND,1000);
        //签发时间
        map.put(JWTPayload.ISSUED_AT,now);
        //过期时间
        map.put(JWTPayload.EXPIRES_AT,newTime);
        //生效时间
        map.put(JWTPayload.NOT_BEFORE,now);
        map.put("userId",userId);
        map.put("nickname",nickname);
        map.put("username",username);
        map.put("email",email);
        String token = JWTUtil.createToken(map, CommonConstants.JWT_SECRET.getBytes());
        data.put("token",token);
        return data;
    }

    /**
     * dao用户登录
     */
    private Map<String,Object> daoUserLogin(Map result){
        //bsin-server-huoyuanshequ
        Map<String,Object> data = (Map) result.get("data");
        String openId = (String)data.get("openid");
        String tenantId = (String)data.get("tenantId");
        String nickname = (String)data.get("nickname");
        String customerNo = (String)data.get("customerNo");
        String headImgUrl = (String)data.get("headImgUrl");
        Map<String,Object> map = new HashMap<String,Object>();
        DateTime now = DateTime.now();
        DateTime newTime = now.offsetNew(DateField.SECOND,1000);
        //签发时间
        map.put(JWTPayload.ISSUED_AT,now);
        //过期时间
        map.put(JWTPayload.EXPIRES_AT,newTime);
        //生效时间
        map.put(JWTPayload.NOT_BEFORE,now);
        map.put("openId",openId);
        map.put("nickname",nickname);
        map.put("tenantId",tenantId);
        map.put("customerNo",customerNo);
        map.put("headImgUrl",headImgUrl);
        String token = JWTUtil.createToken(map, CommonConstants.JWT_SECRET.getBytes());
        data.put("token",token);
        return data;
    }

    /**
     * 商户登录
     */
    private Map<String,Object> mchLogin(Map result){
        //bsin-server-huoyuanshequ
        Map<String,Object> data = (Map) result.get("data");
        Map sysUser = (Map) data.get("sysUser");
        String tenantId = (String) sysUser.get("tenantId");
        Map<String,Object> map = new HashMap<String,Object>();
        DateTime now = DateTime.now();
        DateTime newTime = now.offsetNew(DateField.SECOND,1000);
        //签发时间
        map.put(JWTPayload.ISSUED_AT,now);
        //过期时间
        map.put(JWTPayload.EXPIRES_AT,newTime);
        //生效时间
        map.put(JWTPayload.NOT_BEFORE,now);
        map.put("tenantId",tenantId);
        String token = JWTUtil.createToken(map, CommonConstants.JWT_SECRET.getBytes());
        data.put("token",token);
        return data;
    }
}
