package me.flyray.bsin.server.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserResp {

    private SysUser sysUser;
    private SysOrg sysOrg;

    private List<SysPost> sysPost;

    private List<SysRole> sysRoleList;

    private Set<SysApp> sysAppSet;

}
