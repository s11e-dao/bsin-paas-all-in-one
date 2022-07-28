package me.flyray.bsin.gateway.domain;

import lombok.Data;
import me.flyray.bsin.gateway.common.ExcelColumn;

import java.io.Serializable;
import java.util.Date;

/**
 * 风险地区等级表
 */

@Data
public class CpqRiskArea implements Serializable {

    private Long id;

    /**
     * 省份
     */
    @ExcelColumn(value = "省份", col = 1)
    private String provinceName;

    /**
     * 市
     */
    @ExcelColumn(value = "市", col = 2)
    private String cityName;

    /**
     * 区
     */
    @ExcelColumn(value = "区", col = 3)
    private String areaName;

    /**
     * 风险等级
     */
    @ExcelColumn(value = "风险等级", col = 4)
    private Integer riskLevel;

    /**
     * 风险描述
     */
    @ExcelColumn(value = "风险描述", col = 5)
    private String riskDesc;

    /**
     * 逻辑删除
     */
    private Boolean delFlag;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 修改时间
     */
    private Date updateTime;

}
