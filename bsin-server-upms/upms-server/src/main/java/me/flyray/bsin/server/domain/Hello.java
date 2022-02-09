package me.flyray.bsin.server.domain;

import lombok.Data;

/**
 * @author ：bolei
 * @date ：Created in 2021/11/30 16:30
 * @description：hello实体类
 * @modified By：
 */

@Data
public class Hello {

    /**
     * 根据雪花算法生成唯一ID
     */
    public String id;

    /**
     * 名称
     */
    public String name;

    /**
     * 描述
     */
    public String desc;

}
