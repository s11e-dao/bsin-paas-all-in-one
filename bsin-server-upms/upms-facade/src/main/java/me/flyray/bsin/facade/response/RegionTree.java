package me.flyray.bsin.facade.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

/**
 * @author ：bolei
 * @date ：Created in 2022/3/28 21:32
 * @description：行政区域
 * @modified By：
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegionTree {

    /**
     * 区域id
     */
    private String regionId;

    /**
     * 区域代码
     */
    private String code;

    /**
     * 区域名称
     */
    private String name;

    /**
     * 父级代码，省级为0
     */
    private String parentCode;

    /**
     * 层级，1：省级，2：地市，3：区县
     */
    private Integer layer;

    /**
     * 排序
     */
    private Integer sort;

    /**
     * 状态，1：显示，0：隐藏
     */
    private Integer status;

    /**
     * 备注
     */
    private String remark;

    /**
     * 创建时间
     */
    private Timestamp createTime;

    /**
     * 修改时间
     */
    private Timestamp updateTime;

    private List<RegionTree> children;
}
