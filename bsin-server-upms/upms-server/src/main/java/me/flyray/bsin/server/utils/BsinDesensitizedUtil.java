package me.flyray.bsin.server.utils;

import cn.hutool.core.util.StrUtil;

/**
 * @author ：bolei
 * @date ：Created in 2022/4/6 9:22
 * @description：数据脱敏
 * @modified By：
 */

public class BsinDesensitizedUtil {

    /**
     * 姓名脱敏
     * @param fullName
     * @return
     */
    public static String chineseName(String fullName) {
        if(StrUtil.isBlank(fullName) ){
            return "";
        }
        StringBuffer s = new StringBuffer("*");
        s.append(fullName.substring(1));
        return s.toString();
    }

    /**
     * 身份证脱敏
     * idCardNum
     */
    public static String idCardNum(String idNum) {
        if (StrUtil.isBlank(idNum)) {
            return "";
        }
        String f = StrUtil.hide(idNum, 1, idNum.length() - 13);
        String s = StrUtil.hide(f, 13, idNum.length() - 1);
        return s;
    }

}
