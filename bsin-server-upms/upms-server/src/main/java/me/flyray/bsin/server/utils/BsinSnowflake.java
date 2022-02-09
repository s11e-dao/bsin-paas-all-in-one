package me.flyray.bsin.server.utils;

import cn.hutool.core.lang.Snowflake;
import cn.hutool.core.util.IdUtil;

/**
 * @author ：bolei
 * @date ：Created in 2021/12/17 8:32
 * @description：bsin 雪花算法生成ID
 * @modified By：
 */

public class BsinSnowflake {

    /**
     * 通过雪花算法生成ID
     * @return
     */
    public static String getId(){
        Snowflake snowflake = IdUtil.getSnowflake(1, 1);
        long id = snowflake.nextId();
        return String.valueOf(id);
    }
}
