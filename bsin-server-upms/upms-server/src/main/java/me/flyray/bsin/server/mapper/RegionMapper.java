/*
 *    Copyright (c) 2018-2025, lengleng All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the pig4cloud.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: lengleng (wangiegie@gmail.com)
 */
package me.flyray.bsin.server.mapper;

import me.flyray.bsin.server.domain.SysApp;
import me.flyray.bsin.server.domain.SysDict;
import me.flyray.bsin.server.domain.SysRegion;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 行政区域服务
 * @author 博羸
 * @date 2019/03/19
 */

@Mapper
public interface RegionMapper {

    public void insert(SysRegion region);

    public void deleteById(String regionId);

    public void updateById(SysRegion region);

    List<SysRegion> selectSubNodeList(String code);

    SysRegion selectRegionById(String id);

    List<SysRegion> selectAllList();

    List<SysRegion> selectTopLayerList();
}
