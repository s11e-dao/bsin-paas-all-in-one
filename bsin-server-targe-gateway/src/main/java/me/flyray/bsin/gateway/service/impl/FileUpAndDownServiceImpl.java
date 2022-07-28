package me.flyray.bsin.gateway.service.impl;

import com.google.protobuf.ServiceException;
import lombok.extern.slf4j.Slf4j;
import me.flyray.bsin.facade.service.FileUpAndDownService;
import me.flyray.bsin.gateway.common.ResponseCode;
import me.flyray.bsin.gateway.config.MessageProperties;
import me.flyray.bsin.gateway.exception.BusinessException;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
public class FileUpAndDownServiceImpl implements FileUpAndDownService  {

    @Autowired
    private MessageProperties config;

    public Map<String, Object>  uploadPicture(MultipartFile file) throws ServiceException {
        if(file.isEmpty()){
            throw new BusinessException(ResponseCode.UPLOAD_PICTURE_NOT_EMPTY);
        }

        // 获取文件名
        String fileName = file.getOriginalFilename();
        System.out.println("上传的文件名为：" + fileName);
        // 获取文件的后缀名
        String suffixName = fileName.substring(fileName.lastIndexOf("."));
        System.out.println("上传的后缀名为：" + suffixName);
        // 文件上传后的路径
        String filePath = config.getUpPath();
        String newUUID = UUID.randomUUID().toString().replaceAll("-", "");
        String newFileName = newUUID + suffixName;
        System.out.println(filePath);
        File dest = new File(filePath + newFileName);
        System.out.println(newFileName);
        // 检测是否存在目录
        if (!dest.getParentFile().exists()) {
            dest.getParentFile().mkdirs();
        }
        Map<String, Object> resMap = new HashMap<String, Object>();
        try {
            file.transferTo(dest);
            resMap.put("oldFileName", fileName);
            resMap.put("newFileName", newFileName);
            resMap.put("fileSize", file.getSize());
        } catch (IllegalStateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return resMap;
    }

}
