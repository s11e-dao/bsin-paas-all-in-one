/*
 *
 *      Copyright (c) 2018-2025, lengleng All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without
 *  modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 *  this list of conditions and the following disclaimer.
 *  Redistributions in binary form must reproduce the above copyright
 *  notice, this list of conditions and the following disclaimer in the
 *  documentation and/or other materials provided with the distribution.
 *  Neither the name of the pig4cloud.com developer nor the names of its
 *  contributors may be used to endorse or promote products derived from
 *  this software without specific prior written permission.
 *  Author: lengleng (wangiegie@gmail.com)
 *
 */

package me.flyray.bsin.server.mapper;

import me.flyray.bsin.server.domain.SysApp;
import me.flyray.bsin.server.domain.SysDict;
import me.flyray.bsin.server.domain.SysDictItem;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
 * 字典表 Mapper 接口
 * </p>
 *
 * @author lengleng
 * @since 2017-11-19
 */

@Mapper
public interface DictMapper{

    public void insert(SysDict dict);

    public void deleteById(String appId);

    public List<SysDict> selectPageList(@Param("dictType") String  dictType);

    public void updateById(SysDict dict);

    public void selectOne(@Param("id") String id);

    public List<SysDict> selectListByDictType(String dictType);

    public SysDict selectListById(String id);
}
