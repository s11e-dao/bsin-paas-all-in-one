package me.flyray.bsin.server.impl;

import me.flyray.bsin.facade.response.RegionTree;
import me.flyray.bsin.facade.service.RegionService;
import me.flyray.bsin.server.biz.RegionBiz;
import me.flyray.bsin.server.domain.SysRegion;
import me.flyray.bsin.server.mapper.RegionMapper;
import me.flyray.bsin.server.utils.BsinServiceContext;
import me.flyray.bsin.server.utils.BsinSnowflake;
import me.flyray.bsin.server.utils.RespBodyHandler;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author ：bolei
 * @date ：Created in 2022/3/28 22:37
 * @description：行政区域服务
 * @modified By：
 */

public class RegionServiceImpl implements RegionService {

    @Autowired
    private RegionMapper regionMapper;
    @Autowired
    private RegionBiz regionBiz;

    @Override
    public Map<String, Object> add(Map<String, Object> requestMap) {
        SysRegion region = BsinServiceContext.getReqBodyDto(SysRegion.class, requestMap);
        String id = BsinSnowflake.getId();
        region.setRegionId(id);
        regionMapper.insert(region);
        return RespBodyHandler.setRespBodyDto(region);
    }

    @Override
    public Map<String, Object> delete(Map<String, Object> requestMap) {
        SysRegion region = BsinServiceContext.getReqBodyDtoId(SysRegion.class,requestMap );
        regionMapper.deleteById(region.getRegionId());
        return RespBodyHandler.setRespBodyDto(region);
    }

    @Override
    public Map<String, Object> edit(Map<String, Object> requestMap) {
        SysRegion region = BsinServiceContext.getReqBodyDtoId(SysRegion.class, requestMap);
        regionMapper.updateById(region);
        return RespBodyHandler.setRespBodyDto(region);
    }

    @Override
    public Map<String, Object> getSubNodeList(Map<String, Object> requestMap) {
        String code = (String)requestMap.get("code");
        List<SysRegion> regions = regionMapper.selectSubNodeList(code);
        return RespBodyHandler.setRespBodyListDto(regions);
    }

    @Override
    public Map<String, Object> getTopLayerRegions(Map<String, Object> requestMap) {
        String code = (String)requestMap.get("code");
        List<SysRegion> regions = regionMapper.selectTopLayerList();
        return RespBodyHandler.setRespBodyListDto(regions);
    }

    @Override
    public Map<String, Object> getSubNodeTree(Map<String, Object> requestMap) {

        //等级行政区域
        List<SysRegion> regionList = regionMapper.selectAllList();

        List<SysRegion> finalSysRegion = regionList;

        List<RegionTree> regionTreeList = regionList.stream().filter(region -> region.getParentCode().equals("0") )
                .map(r -> {
                    RegionTree level1Region = new RegionTree(r.getRegionId(),r.getCode(),r.getName(),r.getParentCode(),r.getLayer(),r.getSort(),r.getStatus(),r.getRemark(),r.getCreateTime(),r.getUpdateTime(),regionBiz.getChildren(r, finalSysRegion));
                    return level1Region;
                }).sorted(Comparator.comparing(RegionTree::getSort)).collect(Collectors.toList());
        return RespBodyHandler.setRespBodyListDto(regionTreeList);
    }

    @Override
    public Map<String, Object> getRegionById(Map<String, Object> requestMap) {
        String id = (String)requestMap.get("id");
        SysRegion region = regionMapper.selectRegionById(id);
        return RespBodyHandler.setRespBodyDto(region);
    }
}
