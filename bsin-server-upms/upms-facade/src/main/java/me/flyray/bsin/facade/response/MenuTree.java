package me.flyray.bsin.facade.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MenuTree implements Serializable {

    private String menuId;

    private String menuCode;

    private String menuName;

    private String permission;
    //菜单URl
    private String path;

    //菜单图标
    private String icon;

    //父级菜单ID ，一级菜单为0
    private String parentId;

    //菜单类型 C目录  M菜单  B按钮
    private Integer Type;

    private String appId;

    private Integer sort;
    /**
     * 菜单状态
     */
    private Integer status;

    private String remark;

    private List<MenuTree> children;


}
