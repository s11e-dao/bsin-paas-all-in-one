package me.flyray.bsin.server.biz;

import me.flyray.bsin.facade.response.RegionTree;
import me.flyray.bsin.server.domain.SysRegion;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author ：bolei
 * @date ：Created in 2022/3/29 13:53
 * @description：行政区域逻辑
 * @modified By：
 */

@Service
@Transactional(rollbackFor = Exception.class)
public class RegionBiz {

    /**
     *获取子菜单数
     */
    public List<RegionTree> getChildren(SysRegion root, List<SysRegion> all) {
        List<RegionTree> children = all.stream().filter(r ->
                r.getParentCode().equals(root.getCode())
        ).map(r -> {
            RegionTree childRegion = new RegionTree(r.getRegionId(),r.getCode(),r.getName(),r.getParentCode(),
                    r.getLayer(),r.getSort(),r.getStatus(),r.getRemark(),r.getCreateTime(),r.getUpdateTime(),getChildren(r,all));
            return childRegion;
        }).sorted(Comparator.comparing(RegionTree::getSort)).collect(Collectors.toList());

        return children;
    }

}
