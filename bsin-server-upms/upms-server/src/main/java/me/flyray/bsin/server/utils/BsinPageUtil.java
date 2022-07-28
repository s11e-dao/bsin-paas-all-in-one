package me.flyray.bsin.server.utils;

import me.flyray.bsin.server.common.ResponseCode;
import me.flyray.bsin.server.exception.BusinessException;

import java.util.Map;

public class BsinPageUtil {

    public static void pageNotNull(Map<String, Object> pagination){
        EmptyChecker.isEmpty(pagination);
        Integer pageNum = (Integer)pagination.get("pageNum");
        Integer pageSize = (Integer)pagination.get("pageSize");
        if (pagination.isEmpty() || pageNum == null || pageSize == null){
            throw new BusinessException(ResponseCode.PAGE_NUM_ISNULL);
        }
    }
}
