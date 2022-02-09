package me.flyray.bsin.facade.request;

import java.time.LocalDateTime;

public class PostReq {
    /**
     * 岗位id
     */
    private String postId;

    /**
     * 岗位编号
     */
    private String postCode;

    /**
     * 岗位名称
     */
    private String postName;


    /**
     * 岗位排序
     */
    private Integer sort;


    /**
     * 状态 0、启用 1、停用
     */
    private Integer status;

    /**
     * 描述
     */
    private String remark;

    /**
     * 创建者
     */
    private String createBy;

    /**
     * 创建时间
     */
    private LocalDateTime createTime;

    /**
     * 更新者
     */
    private String updateBy;

    /**
     * 更新时间
     */
    private LocalDateTime updateTime;

    /**
     * 租户id
     */
    private String tenantId;
}
