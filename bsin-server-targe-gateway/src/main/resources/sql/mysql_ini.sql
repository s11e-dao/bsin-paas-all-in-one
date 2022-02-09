/*
Navicat MySQL Data Transfer

Source Server         : 阿里云数据库
Source Server Version : 50726
Source Host           : rm-2ze2tn8118l90v997no.mysql.rds.aliyuncs.com:3306
Source Database       : bsin-gateway

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2021-12-14 12:46:01
*/

SET FOREIGN_KEY_CHECKS=0;
/* 状态实例 */
-- ----------------------------
-- Table structure for seata_state_inst
-- ----------------------------
DROP TABLE IF EXISTS `seata_state_inst`;
CREATE TABLE `seata_state_inst` (
  `id` varchar(48) NOT NULL COMMENT 'id',
  `machine_inst_id` varchar(128) NOT NULL COMMENT 'state machine instance id',
  `name` varchar(128) NOT NULL COMMENT 'state name',
  `type` varchar(20) DEFAULT NULL COMMENT 'state type',
  `service_name` varchar(128) DEFAULT NULL COMMENT 'service name',
  `service_method` varchar(128) DEFAULT NULL COMMENT 'method name',
  `service_type` varchar(16) DEFAULT NULL COMMENT 'service type',
  `business_key` varchar(48) DEFAULT NULL COMMENT 'business key',
  `state_id_compensated_for` varchar(50) DEFAULT NULL COMMENT 'state compensated for',
  `state_id_retried_for` varchar(50) DEFAULT NULL COMMENT 'state retried for',
  `gmt_started` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP COMMENT 'start time',
  `is_for_update` tinyint(4) DEFAULT NULL COMMENT 'is service for update',
  `input_params` blob COMMENT 'input parameters',
  `output_params` blob COMMENT 'output parameters',
  `status` varchar(2) NOT NULL COMMENT 'status(SU succeed|FA failed|UN unknown|SK skipped|RU running)',
  `excep` blob COMMENT 'exception',
  `gmt_updated` datetime DEFAULT NULL COMMENT 'update time',
  `gmt_end` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT 'end time',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* 状态机定义 */
-- ----------------------------
-- Table structure for seata_state_machine_def
-- ----------------------------
DROP TABLE IF EXISTS `seata_state_machine_def`;
CREATE TABLE `seata_state_machine_def` (
  `id` varchar(32) NOT NULL COMMENT 'id',
  `name` varchar(128) NOT NULL COMMENT '服务名称',
  `tenant_id` varchar(32) NOT NULL COMMENT '租户ID',
  `app_name` varchar(32) NOT NULL COMMENT '应用名称',
  `type` varchar(20) DEFAULT NULL COMMENT '状态语言类型',
  `comment_` varchar(255) DEFAULT NULL COMMENT '备注',
  `ver` varchar(16) NOT NULL COMMENT '版本信息',
  `gmt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `status` varchar(2) NOT NULL COMMENT 'AC:active|IN:inactive',
  `content` blob COMMENT '编排机内容',
  `recover_strategy` varchar(16) DEFAULT NULL COMMENT 'transaction recover strategy(compensate|retry)',
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* 状态机实例 */
-- ----------------------------
-- Table structure for seata_state_machine_inst
-- ----------------------------
DROP TABLE IF EXISTS `seata_state_machine_inst`;
CREATE TABLE `seata_state_machine_inst` (
  `id` varchar(128) NOT NULL COMMENT 'id',
  `machine_id` varchar(32) NOT NULL COMMENT 'state machine definition id',
  `tenant_id` varchar(32) NOT NULL COMMENT '租户ID',
  `parent_id` varchar(128) DEFAULT NULL,
  `gmt_started` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '开始时间',
  `business_key` varchar(48) DEFAULT NULL COMMENT 'business key',
  `start_params` blob COMMENT 'start parameters',
  `gmt_end` timestamp NULL DEFAULT NULL COMMENT 'end time',
  `excep` blob COMMENT 'exception',
  `end_params` blob COMMENT 'end parameters',
  `status` varchar(2) DEFAULT NULL COMMENT 'status(SU succeed|FA failed|UN unknown|SK skipped|RU running)',
  `compensation_status` varchar(2) DEFAULT NULL COMMENT 'compensation status(SU succeed|FA failed|UN unknown|SK skipped|RU running)',
  `is_running` tinyint(1) DEFAULT NULL COMMENT 'is running(0 no|1 yes)',
  `gmt_updated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unikey_buz_tenant` (`tenant_id`,`business_key`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
