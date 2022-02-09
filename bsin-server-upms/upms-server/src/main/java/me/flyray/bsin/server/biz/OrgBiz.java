package me.flyray.bsin.server.biz;

import me.flyray.bsin.facade.response.OrgTree;
import me.flyray.bsin.server.domain.SysOrg;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrgBiz {

    /**
     * 递归
     *
     * @param root
     * @param all
     * @return
     */
    public List<OrgTree> getOrgTree(SysOrg root, List<SysOrg> all) {
        List<OrgTree> children = all.stream().filter(m -> {
            return m.getParentId().equals(root.getOrgId());
        }).map(m -> {
            OrgTree childMenu = new OrgTree(m.getOrgId(), m.getOrgCode(), m.getOrgName(), m.getSort(),
                    m.getParentId(), m.getLevel(), m.getType(), m.getLeader(), m.getPhone(), m.getAddress(),
                    m.getEmail(), m.getTenantId(), m.getCreateTime(), m.getRemark(),
                    getOrgTree(m, all)); //递归
            return childMenu;
        }).collect(Collectors.toList());

        return children;
    }
}
