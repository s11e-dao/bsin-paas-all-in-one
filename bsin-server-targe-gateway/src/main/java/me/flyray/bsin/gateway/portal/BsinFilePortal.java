package me.flyray.bsin.gateway.portal;

import com.alibaba.fastjson.JSONObject;
import com.alipay.sofa.rpc.common.json.JSON;
import com.aliyun.oss.OSSClient;
import com.aliyun.oss.common.utils.BinaryUtil;
import com.aliyun.oss.model.MatchMode;
import com.aliyun.oss.model.ObjectMetadata;
import com.aliyun.oss.model.PolicyConditions;
import com.aliyun.oss.model.PutObjectRequest;
import io.ipfs.api.IPFS;
import io.ipfs.api.MerkleNode;
import io.ipfs.api.NamedStreamable;
import lombok.extern.log4j.Log4j2;
import me.flyray.bsin.facade.service.FileUpAndDownService;
import me.flyray.bsin.gateway.common.ApiResult;
import me.flyray.bsin.gateway.common.ResponseCode;
import me.flyray.bsin.gateway.config.AliOSSProperties;
import me.flyray.bsin.gateway.config.MessageProperties;
import me.flyray.bsin.gateway.domain.CpqRiskArea;
import me.flyray.bsin.gateway.exception.BusinessException;
import me.flyray.bsin.gateway.service.ExcelService;
import me.flyray.bsin.gateway.service.impl.BsinInvokeService;
import me.flyray.bsin.gateway.utils.GeneratorUtil;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.sql.Date;
import java.util.*;

@Log4j2
@Controller
public class BsinFilePortal implements InitializingBean {

    @Autowired
    public FileUpAndDownService fileUpAndDownService;
    @Autowired
    private AliOSSProperties aliOSSProperties;
    @Autowired
    private MessageProperties config;
    @Autowired
    private ExcelService excelService;
    @Autowired
    public BsinInvokeService bsinInvokeService;

    @PostMapping("/upload")
    @ResponseBody
    public ApiResult upload(@RequestParam(value = "file", required = false) MultipartFile file){
        if(file.isEmpty()){
            throw new BusinessException(ResponseCode.UPLOAD_PICTURE_NOT_EMPTY);
        }
        // ???????????????
        String fileName = file.getOriginalFilename();
        System.out.println("????????????????????????" + fileName);
        // ????????????????????????
        String suffixName = fileName.substring(fileName.lastIndexOf("."));
        System.out.println("????????????????????????" + suffixName);
        // ????????????????????????
        String filePath = config.getUpPath();
        String newUUID = UUID.randomUUID().toString().replaceAll("-", "");
        String newFileName = newUUID + suffixName;
        System.out.println(filePath);
        File dest = new File(filePath + newFileName);
        System.out.println(newFileName);
        // ????????????????????????
        if (!dest.getParentFile().exists()) {
            dest.getParentFile().mkdirs();
        }
        String url = config.getPreImgUrl() + newFileName;
        Map<String, Object> resMap = new HashMap<String, Object>();
        try {
            file.transferTo(dest);
            resMap.put("oldFileName", fileName);
            resMap.put("url", url);
        } catch (IllegalStateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ApiResult.ok(resMap);
    }

    private String host;

    @Override
    public void afterPropertiesSet() throws Exception {
        host = "http://" + aliOSSProperties.getBucket() + "." + aliOSSProperties.getEndpoint();
    }

    /**
     * ????????????????????? ????????????????????????????????????????????????
     * ??????????????? Aliyun(??????????????????????????????????????????????????????????????????) ????????? ????????????????????????????????????????????? ?????????????????????????????????
     * ???????????????????????????????????????????????????
     *  @param request
     * @param response
     */
    @RequestMapping(path = "bsinUpload",method = RequestMethod.GET)
    @ResponseBody
    public ApiResult upload(HttpServletRequest request, HttpServletResponse response) {

        OSSClient ossClient = new OSSClient(aliOSSProperties.getEndpoint(),aliOSSProperties.getAccessKeyId(),aliOSSProperties.getAccessKeySecret());
        JSONObject respJsonObj = new JSONObject();
        try {
            long expireTime = 30;
            long expireEndTime = System.currentTimeMillis() + expireTime * 1000;
            Date expiration = new Date(expireEndTime);
            PolicyConditions policyConds = new PolicyConditions();
            policyConds.addConditionItem(PolicyConditions.COND_CONTENT_LENGTH_RANGE, 0, 1048576000);
            policyConds.addConditionItem(MatchMode.StartWith, PolicyConditions.COND_KEY, aliOSSProperties.getDir());
            String postPolicy = ossClient.generatePostPolicy(expiration, policyConds);
            byte[] binaryData = postPolicy.getBytes("utf-8");
            String encodedPolicy = BinaryUtil.toBase64String(binaryData);
            String postSignature = ossClient.calculatePostSignature(postPolicy);
            respJsonObj.put("accessid", aliOSSProperties.getAccessKeyId());
            respJsonObj.put("policy", encodedPolicy);
            respJsonObj.put("signature", postSignature);
            respJsonObj.put("dir", aliOSSProperties.getDir());
            respJsonObj.put("host", host);
            respJsonObj.put("expire", String.valueOf(expireEndTime / 1000));
            JSONObject jasonCallback = new JSONObject();
            jasonCallback.put("callbackBody",
                    "filename=${object}&size=${size}&mimeType=${mimeType}&height=${imageInfo.height}&width=${imageInfo.width}");
            jasonCallback.put("callbackBodyType", "application/x-www-form-urlencoded");
            String base64CallbackBody = BinaryUtil.toBase64String(jasonCallback.toString().getBytes());
            respJsonObj.put("callback", base64CallbackBody);
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.setHeader("Access-Control-Allow-Methods", "GET, POST");
            respJsonObj.put("code", 200);
            respJsonObj.put("baseUrl", aliOSSProperties.getBaseUrl());
        } catch (Exception e) {

        }
        return ApiResult.ok(respJsonObj);
    }

    /**
     * ????????????????????????????????????
     * @param file
     * @return
     * @throws IOException
     */
    @PostMapping("/aliUpload")
    @ResponseBody
    public Object create(@RequestParam("file") MultipartFile file, HttpServletRequest request) throws IOException {
        OSSClient ossClient = new OSSClient(aliOSSProperties.getEndpoint(),aliOSSProperties.getAccessKeyId(),aliOSSProperties.getAccessKeySecret());
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(file.getSize());
        objectMetadata.setContentType(file.getContentType());
        String ext = FilenameUtils.getExtension(file.getOriginalFilename());
        String uuid = GeneratorUtil.genFileName();
        PutObjectRequest putObjectRequest = new PutObjectRequest(aliOSSProperties.getBucket(), aliOSSProperties.getDir() + uuid + "." + ext, file.getInputStream(), objectMetadata);
        ossClient.putObject(putObjectRequest);
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("url", aliOSSProperties.getBaseUrl() + aliOSSProperties.getDir() + uuid + "." + ext);
        return ApiResult.ok(data);
    }


    /**
     * ????????????
     */
    @PostMapping("/importExcel")
    @ResponseBody
    public Object importExcel(@RequestParam(value = "file") MultipartFile file) {

        try {
            List<CpqRiskArea> cpqRiskAreaList = excelService.importExcel(file);
             Map<String, Object> data = new HashMap<String, Object>();
             data.put("cpqRiskAreaList",cpqRiskAreaList);
             bsinInvokeService.genericInvoke("AdminRiskAreaService", "batchAdd", data);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ApiResult.ok();
    }


    /**
     * ????????????
     */
    @GetMapping("/downloadExcel")
    @ResponseBody
    public Object downloadExcel(HttpServletResponse response) {
        String inFileName = "template.xlsx";
        String fileName = "sort.xlsx";
        excelService.downloadExcel(response,inFileName,fileName);
        return ApiResult.ok();
    }

    private static IPFS ipfs = new IPFS("/ip4/114.116.93.253/tcp/5002");

    /**
     * ???????????????ipfs
     * @param file
     * @return
     * @throws IOException
     */
    @PostMapping("/ipfsUpload")
    @ResponseBody
    public Object ipfsUpload(@RequestParam("file") MultipartFile file, HttpServletRequest request) throws IOException {
        // ???????????????
        String fileName = file.getOriginalFilename();
        // ????????????????????????
        String suffixName = fileName.substring(fileName.lastIndexOf("."));
        // ????????????????????????
        String filePath = config.getUpPath();
        String newUUID = UUID.randomUUID().toString().replaceAll("-", "");
        String newFileName = newUUID + suffixName;
        File dest = new File(filePath + newFileName);
        // ????????????????????????
        if (!dest.getParentFile().exists()) {
            dest.getParentFile().mkdirs();
        }
        try {
            file.transferTo(dest);
        } catch (IllegalStateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        // ????????????????????????????????????ipfs???
        NamedStreamable.FileWrapper filew = new NamedStreamable.FileWrapper(new File(filePath+newFileName));
        MerkleNode addResult = ipfs.add(filew).get(0);
        log.info(String.format("%s??????????????????,Hash??????: %s", (Object) file.getName(), addResult.toString()));
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("fileUrl", "https://ipfs.flyray.me/ipfs/"+ addResult.hash.toString());
        data.put("fileHash", addResult.hash.toString());
        // ??????????????????
        dest.delete();
        return ApiResult.ok(data);
    }

    /**
     * http????????????
     * @param req
     * @return
     */
    @PostMapping("/metadataUpload")
    public ApiResult portal(@RequestBody Map<String, Object> req) throws IOException {
        log.info("metadataUpload????????????:{}", JSON.toJSONString(req));
        String metadata = (String) req.get("metadata");
        // ????????????????????????????????????ipfs???
        byte[] data = metadata.getBytes();
        NamedStreamable.ByteArrayWrapper file = new NamedStreamable.ByteArrayWrapper(data);
        MerkleNode addResult = ipfs.add(file).get(0);
        log.info(String.format("??????????????????,Hash??????: %s", addResult.toString()));
        Map<String, Object> resultData = new HashMap<String, Object>();
        resultData.put("fileUrl", "https://ipfs.flyray.me/ipfs/"+ addResult.hash.toString());
        resultData.put("fileHash", addResult.hash.toString());
        return ApiResult.ok(data);
    }



}
