package me.flyray.bsin.server.domain;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * @author ：bolei
 * @date ：Created in 2022/3/28 21:32
 * @description：数据字典
 * @modified By：
 */

@Data
public class SysDict {

    /**
     * 编号
     */
    private String id;

    /**
     * 类型
     */
    private String dictType;

    /**
     * 创建时间
     */
    private LocalDateTime createTime;

    /**
     * 更新时间
     */
    private LocalDateTime updateTime;

    /**
     * 是否是系统内置
     */
    private String systemFlag;

    /**
     * 备注信息
     */
    private String remark;

    /**
     * 租户ID
     */
    private String tenantId;

    /**
     * 删除标记
     */
    private String delFlag;

}
