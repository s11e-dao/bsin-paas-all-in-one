package me.flyray.bsin.facade.response;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class PostResp implements Serializable {

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
     * 更新者
     */
    private String updateBy;

    /**
     * 租户id
     */
    private String tenantId;

    public PostResp() {
    }

    public PostResp(String postId, String postCode, String postName, Integer sort, Integer status, String remark, String createBy, String updateBy, String tenantId) {
        this.postId = postId;
        this.postCode = postCode;
        this.postName = postName;
        this.sort = sort;
        this.status = status;
        this.remark = remark;
        this.createBy = createBy;
        this.updateBy = updateBy;
        this.tenantId = tenantId;
    }
}
