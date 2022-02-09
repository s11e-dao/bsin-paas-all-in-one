package me.flyray.bsin.server.biz;

import me.flyray.bsin.facade.response.MenuTree;
import me.flyray.bsin.server.common.ResponseCode;
import me.flyray.bsin.server.domain.SysMenu;
import me.flyray.bsin.server.exception.BusinessException;
import me.flyray.bsin.server.mapper.MenuMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(rollbackFor = Exception.class)
public class MenuBiz {
    @Autowired
    private MenuMapper menuMapper;

    /**
     * 添加菜单
     */
    public void savaMenu(SysMenu sysMenu){
        SysMenu menuInfo = menuMapper.getMenuInfoByMenuCode(sysMenu.getMenuCode());
        if(menuInfo != null){
            throw new BusinessException(ResponseCode.MENU_CODE_EXISTS);
        }
        menuMapper.insert(sysMenu);
    }

    /**
     *获取子菜单数
     */
    public List<MenuTree> getChildren(SysMenu root, List<SysMenu> all) {
        List<MenuTree> children = all.stream().filter(m ->
                m.getParentId().equals(root.getMenuId())
        ).map(m -> {
            MenuTree childMenu = new MenuTree(m.getMenuId(),m.getMenuCode(),m.getMenuName(),m.getPermission(),
                    m.getPath(),m.getIcon(),m.getParentId(),m.getType(),m.getAppId(),m.getSort(),m.getStatus(),
                    m.getRemark(),getChildren(m,all));//递归
            return childMenu;
        }).collect(Collectors.toList());

        return children;
    }
}
