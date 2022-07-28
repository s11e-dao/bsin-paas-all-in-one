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
package me.flyray.bsin.server.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * @author ：bolei
 * @date ：Created in 2022/3/28 21:32
 * @description：数据字典项
 * @modified By：
 */
@Data
public class SysDictItem  {

	/**
	 * 编号
	 */
	private String id;

	/**
	 * 所属字典类id
	 */
	private String dictId;

	/**
	 * 数据值
	 */
	private String itemValue;

	/**
	 * 标签名
	 */
	private String label;

	/**
	 * 类型
	 */
	private String dictType;

	/**
	 * 排序（升序）
	 */
	private Integer sort;

	/**
	 * 创建时间
	 */
	private LocalDateTime createTime;

	/**
	 * 更新时间
	 */
	private LocalDateTime updateTime;

	/**
	 * 备注信息
	 */
	private String remark;

	/**
	 * 删除标记
	 */
	private String delFlag;

}
