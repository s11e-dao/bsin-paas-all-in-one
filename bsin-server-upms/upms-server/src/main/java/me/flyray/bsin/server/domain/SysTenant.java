package me.flyray.bsin.server.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.flyray.bsin.server.annotate.BsinId;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Transient;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SysTenant implements Serializable {

    /**
     * 租户id
     */
    @BsinId
    private String tenantId;

    /**
     * 租户编号
     */
    @NotBlank
    private String tenantCode;

    /**
     * 租户名
     */
    @NotBlank
    private String tenantName;

    /**
     * 描述
     */
    private String remark;

    /**
     * 小图标
     */
    private String logo;

    /**
     * 租户类型 0、超级租户 1、普通租户
     */
    private Integer type;

    /**
     * 租户状态 0、正常 1、冻结
     */
    private Integer status;

    /**
     * 租户登录用户名称
     */
    @Transient
    private String username;

    /**
     * 创建时间
     */
    @JsonFormat(shape =JsonFormat.Shape.STRING,pattern ="yyyy-MM-dd HH:mm:ss",timezone ="GMT+8")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;

    /**
     * 修改时间
     */
    @JsonFormat(shape =JsonFormat.Shape.STRING,pattern ="yyyy-MM-dd HH:mm:ss",timezone ="GMT+8")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updateTime;

    /**
     * 逻辑删除
     */
    private Integer delFlag;

    private static final long serialVersionUID = 1L;
}
