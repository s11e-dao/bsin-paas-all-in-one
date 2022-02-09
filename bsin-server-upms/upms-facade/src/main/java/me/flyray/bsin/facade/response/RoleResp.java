package me.flyray.bsin.facade.response;


import lombok.Data;
import lombok.EqualsAndHashCode;
import java.io.Serializable;

@EqualsAndHashCode
@Data
public class RoleResp implements Serializable {

        /**
         * 雪花算法生成唯一id
         */
        private String roleId;

        /**
         * 角色名称
         */
        private String roleName;

        /**
         * 角色编码
         */
        private String roleCode;

        /**
         * 描述
         */
        private String remark;

        /**
         * 应用id
         */
        private String appId;

        /**
         * 应用名称
         */
        private String appName;

}
