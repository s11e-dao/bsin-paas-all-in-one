/*
Navicat MySQL Data Transfer

Source Server         : 阿里云数据库
Source Server Version : 50726
Source Host           : rm-2ze2tn8118l90v997no.mysql.rds.aliyuncs.com:3306
Source Database       : bsin-upms

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2022-01-15 21:58:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sys_app
-- ----------------------------
DROP TABLE IF EXISTS `sys_app`;
CREATE TABLE `sys_app` (
  `app_id` varchar(100) NOT NULL COMMENT '应用id',
  `app_code` varchar(100) NOT NULL COMMENT '应用编号',
  `app_name` varchar(100) NOT NULL COMMENT '应用名称',
  `logo` varchar(128) DEFAULT NULL COMMENT '应用图标',
  `url` varchar(255) NOT NULL COMMENT '应用访问地址',
  `type` int(11) DEFAULT '1' COMMENT '应用类型0、默认应用 1、普通应用',
  `status` int(11) DEFAULT '0' COMMENT '应用状态 0、未发布 1、已发布',
  `remark` varchar(255) DEFAULT NULL COMMENT '应用描述',
  `app_Language` int(11) DEFAULT '0' COMMENT '应用前端语言类型 0、vue 1、react',
  `theme` text COMMENT '主题',
  `create_by` varchar(64) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` varchar(64) DEFAULT NULL COMMENT '修改人',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  `del_flag` int(11) DEFAULT '0' COMMENT '逻辑删除 0、未删除 1、已删除',
  PRIMARY KEY (`app_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_app
-- ----------------------------
INSERT INTO `sys_app` VALUES ('1482229940899418112', '007', '007', '0', '222', null, '0', '222', null, null, null, '2022-01-15 13:55:31', null, '2022-01-15 13:56:08', '1');
INSERT INTO `sys_app` VALUES ('1482232639552360448', '2', '2', '2', '222', '0', '0', '2', null, null, null, '2022-01-15 14:06:14', null, null, '1');
INSERT INTO `sys_app` VALUES ('1482233834958360576', '321321', '3213', '321', '321', '0', '0', '321', '321', null, null, '2022-01-15 14:10:59', null, null, '1');
INSERT INTO `sys_app` VALUES ('1482234302900080640', '00000', '00000', '000', '321', '0', '0', '321', '0', null, '321', '2022-01-15 14:12:51', null, null, '1');
INSERT INTO `sys_app` VALUES ('1482238321118810112', '2222', '222', '007', '2222', '0', '1', '007', '7', null, '007', '2022-01-15 14:28:49', null, '2022-01-15 14:32:41', '0');
INSERT INTO `sys_app` VALUES ('1482238528841715712', '00000', '007', '007', '0000', '0', '1', '007', '7', null, '007', '2022-01-15 14:29:38', null, null, '1');
INSERT INTO `sys_app` VALUES ('1482238811147735040', '444', '44333', null, '444', '0', '0', null, null, null, null, '2022-01-15 14:30:46', null, '2022-01-15 14:33:17', '0');
INSERT INTO `sys_app` VALUES ('1482258181861281792', '00000', '0000', null, '000', '0', '1', null, null, null, null, '2022-01-15 15:47:44', null, null, '1');
INSERT INTO `sys_app` VALUES ('1482258597202235392', '000', '00', '0', '00', '0', '1', '0', '0', null, '0', '2022-01-15 15:49:23', null, null, '1');
INSERT INTO `sys_app` VALUES ('1482258804484739072', '00', 'React', '00', '8003', '0', '1', '00', '0', null, '00', '2022-01-15 15:50:13', null, null, '1');
INSERT INTO `sys_app` VALUES ('1482260939590995968', '000000', 'React', null, '0000', '0', '1', null, null, null, null, '2022-01-15 15:58:42', null, null, '0');
INSERT INTO `sys_app` VALUES ('1482262290102358016', '000001', 'Vue3', null, '0000', '0', '1', null, null, null, null, '2022-01-15 16:04:04', null, '2022-01-15 16:05:34', '0');
INSERT INTO `sys_app` VALUES ('1482262709725696000', '321', '321', null, '321', '0', '1', null, null, null, null, '2022-01-15 16:05:44', null, null, '1');
INSERT INTO `sys_app` VALUES ('1482314563520172032', '3213', 'vue', null, '321', '0', '1', null, null, null, null, '2022-01-15 19:31:47', null, null, '0');
INSERT INTO `sys_app` VALUES ('1482324429223628800', '000', 'angular', null, '1', '0', '1', null, null, null, null, '2022-01-15 20:10:59', null, null, '0');
INSERT INTO `sys_app` VALUES ('1482331318737047552', '4455', 'javascript', null, '321', '0', '1', '321', null, null, null, '2022-01-15 20:38:22', null, null, '0');
INSERT INTO `sys_app` VALUES ('1482346066056712192', '4444', 'render', null, 'http://localhost:8003', '0', '1', null, null, null, null, '2022-01-15 21:36:58', null, '2022-01-15 21:43:41', '0');
INSERT INTO `sys_app` VALUES ('1482350294141636608', '1234', 'dom', null, 'http://localhost:8003', '0', '1', null, null, null, null, '2022-01-15 21:53:46', null, null, '0');
INSERT INTO `sys_app` VALUES ('6345489506536636416', 'bsin-ui-upms', '权限管理应用', 'avatars[0]', 'http://localhost:8003', null, '1', '那是一种内在的东西，他们到达不了，也无法触及的', null, null, '智红光', '2021-12-15 11:17:46', null, '2022-01-14 14:38:25', '0');
INSERT INTO `sys_app` VALUES ('xxx123xxx', 'xxx123xxx', '模板应用', null, 'http://baidu.com', '0', '1', '模板应用', '0', null, null, '2021-12-13 15:30:09', null, null, '1');

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `menu_id` varchar(100) NOT NULL COMMENT '菜单id',
  `menu_code` varchar(100) NOT NULL COMMENT '菜单编号',
  `menu_name` varchar(250) NOT NULL COMMENT '菜单名称',
  `permission` varchar(250) DEFAULT NULL COMMENT '菜单权限标识',
  `app_id` varchar(100) DEFAULT NULL COMMENT '应用id',
  `path` varchar(128) DEFAULT NULL COMMENT '前端URL',
  `parent_id` varchar(100) NOT NULL DEFAULT '-1' COMMENT '父菜单编号(默认为-1)',
  `icon` varchar(50) DEFAULT NULL COMMENT '菜单图标',
  `sort` int(11) DEFAULT NULL COMMENT '排序',
  `remark` varchar(500) DEFAULT NULL COMMENT '菜单描述',
  `status` int(11) DEFAULT '0' COMMENT '菜单状态 0、开启 1、禁用',
  `type` int(11) DEFAULT '0' COMMENT '菜单类型 0、主菜单 1、菜单 2、按钮 99、模板菜单',
  `create_by` varchar(50) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` varchar(50) DEFAULT NULL COMMENT '修改人',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  `del_flag` int(11) DEFAULT '0' COMMENT '逻辑删除 0、未删除 1、已删除',
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES ('1481874071586213880', '0', '应用管理', null, 'xxx123xxx', '/application-management', '6345189999375917011', '0', null, '应用管理', '0', '1', null, '2022-01-14 14:21:25', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1481874071586213888', '0', '应用管理', '', '6345489506536636416', '/bsin-ui-upms/application-management', '6345189999375917056', '0', null, '应用管理', '0', '1', '', '2022-01-14 14:21:25', '', '0000-00-00 00:00:00', '0');
INSERT INTO `sys_menu` VALUES ('1481874268722696112', '1', '租户管理', null, 'xxx123xxx', '/tenant-management', '6345189999375917011', '0', null, '租户管理', '0', '1', null, '2022-01-14 14:22:12', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1481874268722696192', '1', '租户管理', '', '6345489506536636416', '/bsin-ui-upms/tenant-management', '6345189999375917056', '0', null, '租户管理', '0', '1', '', '2022-01-14 14:22:12', '', '0000-00-00 00:00:00', '0');
INSERT INTO `sys_menu` VALUES ('1481874362180173920', '2', '机构管理', null, 'xxx123xxx', '/organizational-management', '6345189999375917011', '0', null, '机构管理', '0', '1', null, '2022-01-14 14:22:34', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1481874362180177920', '2', '机构管理', '', '6345489506536636416', '/bsin-ui-upms/organizational-management', '6345189999375917056', '0', null, '机构管理', '0', '1', '', '2022-01-14 14:22:34', '', '0000-00-00 00:00:00', '0');
INSERT INTO `sys_menu` VALUES ('1481874457822852032', '3', '用户管理', null, 'xxx123xxx', '/user-management', '6345189999375917011', '0', null, '用户管理', '0', '1', null, '2022-01-14 14:22:57', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1481874457822892032', '3', '用户管理', '', '6345489506536636416', '/bsin-ui-upms/user-management', '6345189999375917056', '0', null, '用户管理', '0', '1', '', '2022-01-14 14:22:57', '', '0000-00-00 00:00:00', '0');
INSERT INTO `sys_menu` VALUES ('1481874550391181312', '4', '岗位管理', '', 'xxx123xxx', '/post-management', '6345189999375917011', '0', null, '岗位管理', '0', '1', '', '2022-01-14 14:23:19', '', '0000-00-00 00:00:00', '0');
INSERT INTO `sys_menu` VALUES ('1481874550391581312', '4', '岗位管理', null, '6345489506536636416', '/bsin-ui-upms/post-management', '6345189999375917056', '0', null, '岗位管理', '0', '1', null, '2022-01-14 14:23:19', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1481874706662559744', '5', '机构岗位', '', 'xxx123xxx', '/organization-post', '6345189999375917011', '0', null, '机构岗位', '0', '1', '', '2022-01-14 14:23:56', '', '0000-00-00 00:00:00', '0');
INSERT INTO `sys_menu` VALUES ('1481874706662569744', '5', '机构岗位', null, '6345489506536636416', '/bsin-ui-upms/organization-post', '6345189999375917056', '0', null, '机构岗位', '0', '1', null, '2022-01-14 14:23:56', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1481874790112432128', '6', '角色管理', '', 'xxx123xxx', '/role-management', '6345189999375917011', '0', null, '角色管理', '0', '1', '', '2022-01-14 14:24:16', '', '0000-00-00 00:00:00', '0');
INSERT INTO `sys_menu` VALUES ('1481874790112472128', '6', '角色管理', null, '6345489506536636416', '/bsin-ui-upms/role-management', '6345189999375917056', '0', null, '角色管理', '0', '1', null, '2022-01-14 14:24:16', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1481874879719542784', '7', '菜单管理', '', 'xxx123xxx', '/menu-management', '6345189999375917011', '0', null, '菜单管理', '0', '1', '', '2022-01-14 14:24:37', '', '0000-00-00 00:00:00', '0');
INSERT INTO `sys_menu` VALUES ('1481874879719582784', '7', '菜单管理', null, '6345489506536636416', '/bsin-ui-upms/menu-management', '6345189999375917056', '0', null, '菜单管理', '0', '1', null, '2022-01-14 14:24:37', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482324429441732608', '1482324429441732608', '应用权限管理', 'sys', '1482324429223628800', '/system', '-1', null, '0', null, '0', '0', null, '2022-01-15 20:10:59', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482324429563367424', '1482324429563367424', '应用管理', null, '1482324429223628800', '/bsin-ui-upms/application-management', '1482324429441732608', '0', null, '应用管理', '0', '1', null, '2022-01-15 20:10:59', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482324429676613632', '1482324429676613632', '租户管理', null, '1482324429223628800', '/bsin-ui-upms/tenant-management', '1482324429441732608', '0', null, '租户管理', '0', '1', null, '2022-01-15 20:10:59', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482324429789859840', '1482324429789859840', '机构管理', null, '1482324429223628800', '/bsin-ui-upms/organizational-management', '1482324429441732608', '0', null, '机构管理', '0', '1', null, '2022-01-15 20:11:00', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482324429903106048', '1482324429903106048', '用户管理', null, '1482324429223628800', '/bsin-ui-upms/user-management', '1482324429441732608', '0', null, '用户管理', '0', '1', null, '2022-01-15 20:11:00', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482324430020546560', '1482324430020546560', '岗位管理', '', '1482324429223628800', '/bsin-ui-upms/post-management', '1482324429441732608', '0', null, '岗位管理', '0', '1', '', '2022-01-15 20:11:00', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482324430133792768', '1482324430133792768', '机构岗位', '', '1482324429223628800', '/bsin-ui-upms/organization-post', '1482324429441732608', '0', null, '机构岗位', '0', '1', '', '2022-01-15 20:11:00', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482324430247038976', '1482324430247038976', '角色管理', '', '1482324429223628800', '/bsin-ui-upms/role-management', '1482324429441732608', '0', null, '角色管理', '0', '1', '', '2022-01-15 20:11:00', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482324430364479488', '1482324430364479488', '菜单管理', '', '1482324429223628800', '/bsin-ui-upms/menu-management', '1482324429441732608', '0', null, '菜单管理', '0', '1', '', '2022-01-15 20:11:00', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482331318942568448', '1482331318942568448', 'javascript', 'sys', '1482331318737047552', '/system', '-1', null, '0', null, null, '0', null, '2022-01-15 20:38:22', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482331318942568449', '1482331318942568449', '应用权限管理', 'sys', '1482331318737047552', '/system', '1482331318942568448', null, '0', null, null, '0', null, '2022-01-15 20:38:22', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482331319060008960', '1482331319060008960', '应用管理', null, '1482331318737047552', '/bsin-ui-upms/application-management', '1482331318942568449', '0', null, '应用管理', '0', '1', null, '2022-01-15 20:38:22', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482331319177449472', '1482331319177449472', '租户管理', null, '1482331318737047552', '/bsin-ui-upms/tenant-management', '1482331318942568449', '0', null, '租户管理', '0', '1', null, '2022-01-15 20:38:22', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482331319282307072', '1482331319282307072', '机构管理', null, '1482331318737047552', '/bsin-ui-upms/organizational-management', '1482331318942568449', '0', null, '机构管理', '0', '1', null, '2022-01-15 20:38:22', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482331319387164672', '1482331319387164672', '用户管理', null, '1482331318737047552', '/bsin-ui-upms/user-management', '1482331318942568449', '0', null, '用户管理', '0', '1', null, '2022-01-15 20:38:22', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482331319500410880', '1482331319500410880', '岗位管理', '', '1482331318737047552', '/bsin-ui-upms/post-management', '1482331318942568449', '0', null, '岗位管理', '0', '1', '', '2022-01-15 20:38:22', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482331319617851392', '1482331319617851392', '机构岗位', '', '1482331318737047552', '/bsin-ui-upms/organization-post', '1482331318942568449', '0', null, '机构岗位', '0', '1', '', '2022-01-15 20:38:22', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482331319722708992', '1482331319722708992', '角色管理', '', '1482331318737047552', '/bsin-ui-upms/role-management', '1482331318942568449', '0', null, '角色管理', '0', '1', '', '2022-01-15 20:38:22', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482331319827566592', '1482331319827566592', '菜单管理', '', '1482331318737047552', '/bsin-ui-upms/menu-management', '1482331318942568449', '0', null, '菜单管理', '0', '1', '', '2022-01-15 20:38:23', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482346066295787520', '1482346066295787520', 'render', 'sys', '1482346066056712192', '/system', '-1', null, '0', null, null, '0', null, '2022-01-15 21:36:58', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482346066295787521', '1482346066295787521', '应用权限管理', 'sys', '1482346066056712192', '/system', '1482346066295787520', null, '0', null, null, '0', null, '2022-01-15 21:36:58', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482346066421616640', '1482346066421616640', '应用管理', null, '1482346066056712192', '/bsin-ui-upms/application-management', '1482346066295787521', '0', null, '应用管理', '0', '1', null, '2022-01-15 21:36:58', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482346066534862848', '1482346066534862848', '租户管理', null, '1482346066056712192', '/bsin-ui-upms/tenant-management', '1482346066295787521', '0', null, '租户管理', '0', '1', null, '2022-01-15 21:36:58', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482346066652303360', '1482346066652303360', '机构管理', null, '1482346066056712192', '/bsin-ui-upms/organizational-management', '1482346066295787521', '0', null, '机构管理', '0', '1', null, '2022-01-15 21:36:58', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482346066769743872', '1482346066769743872', '用户管理', null, '1482346066056712192', '/bsin-ui-upms/user-management', '1482346066295787521', '0', null, '用户管理', '0', '1', null, '2022-01-15 21:36:58', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482346066887184384', '1482346066887184384', '岗位管理', '', '1482346066056712192', '/bsin-ui-upms/post-management', '1482346066295787521', '0', null, '岗位管理', '0', '1', '', '2022-01-15 21:36:58', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482346067004624896', '1482346067004624896', '机构岗位', '', '1482346066056712192', '/bsin-ui-upms/organization-post', '1482346066295787521', '0', null, '机构岗位', '0', '1', '', '2022-01-15 21:36:59', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482346067122065408', '1482346067122065408', '角色管理', '', '1482346066056712192', '/bsin-ui-upms/role-management', '1482346066295787521', '0', null, '角色管理', '0', '1', '', '2022-01-15 21:36:59', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482346067239505920', '1482346067239505920', '菜单管理', '', '1482346066056712192', '/bsin-ui-upms/menu-management', '1482346066295787521', '0', null, '菜单管理', '0', '1', '', '2022-01-15 21:36:59', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482350294359740416', '1482350294359740416', 'dom', 'sys', '1482350294141636608', '/system', '-1', null, '0', null, null, '0', null, '2022-01-15 21:53:46', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482350294359740417', '1482350294359740417', '应用权限管理', 'sys', '1482350294141636608', '/system', '1482350294359740416', null, '0', null, null, '0', null, '2022-01-15 21:53:46', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482350294477180928', '1482350294477180928', '应用管理', null, '1482350294141636608', '/1234/application-management', '1482350294359740417', '0', null, '应用管理', '0', '1', null, '2022-01-15 21:53:46', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482350294586232832', '1482350294586232832', '租户管理', null, '1482350294141636608', '/1234/tenant-management', '1482350294359740417', '0', null, '租户管理', '0', '1', null, '2022-01-15 21:53:46', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482350294745616384', '1482350294745616384', '机构管理', null, '1482350294141636608', '/1234/organizational-management', '1482350294359740417', '0', null, '机构管理', '0', '1', null, '2022-01-15 21:53:46', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482350294871445504', '1482350294871445504', '用户管理', null, '1482350294141636608', '/1234/user-management', '1482350294359740417', '0', null, '用户管理', '0', '1', null, '2022-01-15 21:53:46', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482350294984691712', '1482350294984691712', '岗位管理', '', '1482350294141636608', '/1234/post-management', '1482350294359740417', '0', null, '岗位管理', '0', '1', '', '2022-01-15 21:53:47', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482350295102132224', '1482350295102132224', '机构岗位', '', '1482350294141636608', '/1234/organization-post', '1482350294359740417', '0', null, '机构岗位', '0', '1', '', '2022-01-15 21:53:47', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482350295211184128', '1482350295211184128', '角色管理', '', '1482350294141636608', '/1234/role-management', '1482350294359740417', '0', null, '角色管理', '0', '1', '', '2022-01-15 21:53:47', null, null, '0');
INSERT INTO `sys_menu` VALUES ('1482350295328624640', '1482350295328624640', '菜单管理', '', '1482350294141636608', '/1234/menu-management', '1482350294359740417', '0', null, '菜单管理', '0', '1', '', '2022-01-15 21:53:47', null, null, '0');
INSERT INTO `sys_menu` VALUES ('6345189999375917011', '6345189941427412992', '应用权限管理', 'sys', 'xxx123xxx', '/system', '-1', '', '0', null, null, '0', null, '2021-12-14 15:27:38', null, null, '0');
INSERT INTO `sys_menu` VALUES ('6345189999375917056', '6345189941427412992', '应用权限管理', 'sys', '6345489506536636416', '/chain/system', '-1', '', '0', null, null, '0', null, '2021-12-14 15:27:38', null, null, '0');

-- ----------------------------
-- Table structure for sys_org
-- ----------------------------
DROP TABLE IF EXISTS `sys_org`;
CREATE TABLE `sys_org` (
  `org_id` varchar(100) NOT NULL COMMENT '机构id',
  `org_code` varchar(100) NOT NULL COMMENT '机构编号',
  `org_name` varchar(255) NOT NULL COMMENT '机构名',
  `sort` int(11) DEFAULT NULL COMMENT '排序',
  `parent_id` varchar(100) DEFAULT '-1' COMMENT '父级编号',
  `level` int(11) DEFAULT '1' COMMENT '机构级别',
  `type` int(11) DEFAULT '1' COMMENT '机构类型 1、公司 2、部门 3、小组 4、其他',
  `leader` varchar(100) DEFAULT NULL COMMENT '负责人',
  `phone` varchar(255) DEFAULT NULL COMMENT '办公电话',
  `address` varchar(1000) DEFAULT NULL COMMENT '地址',
  `remark` varchar(250) DEFAULT NULL COMMENT '描述',
  `email` varchar(500) DEFAULT NULL COMMENT '电子邮箱',
  `tenant_id` varchar(100) NOT NULL COMMENT '租户编号',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  `del_flag` int(11) DEFAULT '0' COMMENT '逻辑删除 0，未删除 1，已删除',
  PRIMARY KEY (`org_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_org
-- ----------------------------
INSERT INTO `sys_org` VALUES ('1481461991431344128', '222222', '顶级机构', null, '-1', null, '1', null, null, null, null, null, '6345824413764157440', null, '2022-01-14 11:32:54', '0');
INSERT INTO `sys_org` VALUES ('1482245925765255168', '22222', '321', null, '1481461991431344128', '312', '1', '321', '321', '321', '321', '321', '6345824413764157440', null, '2022-01-15 15:07:17', '1');
INSERT INTO `sys_org` VALUES ('1482266280068255744', '2222', '蚂蚁金服', null, '1481461991431344128', '1', '2', 'ali', '1', '1', '1', '1', '6345824413764157440', null, '2022-01-15 16:37:15', '0');
INSERT INTO `sys_org` VALUES ('1482270424996909056', '321', '321', null, '1481461991431344128', '321', '1', '321', '321', '321321321', '32', '321', '6345824413764157440', null, '2022-01-15 16:36:32', '1');

-- ----------------------------
-- Table structure for sys_org_app
-- ----------------------------
DROP TABLE IF EXISTS `sys_org_app`;
CREATE TABLE `sys_org_app` (
  `org_id` varchar(100) NOT NULL COMMENT '机构id',
  `app_id` varchar(100) NOT NULL COMMENT '应用id',
  PRIMARY KEY (`org_id`,`app_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_org_app
-- ----------------------------
INSERT INTO `sys_org_app` VALUES ('1481461991431344128', '1482260939590995968');
INSERT INTO `sys_org_app` VALUES ('1481461991431344128', '1482314563520172032');
INSERT INTO `sys_org_app` VALUES ('1481461991431344128', '1482324429223628800');
INSERT INTO `sys_org_app` VALUES ('1481461991431344128', '1482331318737047552');
INSERT INTO `sys_org_app` VALUES ('1481461991431344128', '1482346066056712192');
INSERT INTO `sys_org_app` VALUES ('1481461991431344128', '1482350294141636608');
INSERT INTO `sys_org_app` VALUES ('1481461991431344128', '6345489506536636416');
INSERT INTO `sys_org_app` VALUES ('1482266280068255744', '1482260939590995968');
INSERT INTO `sys_org_app` VALUES ('1482266280068255744', '6345489506536636416');

-- ----------------------------
-- Table structure for sys_org_post
-- ----------------------------
DROP TABLE IF EXISTS `sys_org_post`;
CREATE TABLE `sys_org_post` (
  `org_id` varchar(100) NOT NULL COMMENT '机构id',
  `post_id` varchar(100) NOT NULL COMMENT '岗位id',
  PRIMARY KEY (`org_id`,`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_org_post
-- ----------------------------
INSERT INTO `sys_org_post` VALUES ('1481461991431344128', '6345920456624902144');
INSERT INTO `sys_org_post` VALUES ('1482266280068255744', '1482259720969523200');
INSERT INTO `sys_org_post` VALUES ('1482266280068255744', '6345920456624902144');

-- ----------------------------
-- Table structure for sys_post
-- ----------------------------
DROP TABLE IF EXISTS `sys_post`;
CREATE TABLE `sys_post` (
  `post_id` varchar(100) NOT NULL COMMENT '岗位id',
  `post_code` varchar(100) NOT NULL COMMENT '岗位编号',
  `post_name` varchar(100) DEFAULT NULL COMMENT '岗位名称',
  `sort` int(11) DEFAULT NULL COMMENT '岗位排序',
  `status` int(11) DEFAULT '0' COMMENT '状态 0、启用 1、停用',
  `remark` varchar(500) DEFAULT NULL COMMENT '描述',
  `tenant_id` varchar(100) DEFAULT NULL COMMENT '租户id',
  `create_by` varchar(50) DEFAULT NULL COMMENT '创建者',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` varchar(50) DEFAULT NULL COMMENT '修改人',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  `del_flag` int(11) DEFAULT '0' COMMENT '逻辑删除 0、未删除 1、已删除',
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_post
-- ----------------------------
INSERT INTO `sys_post` VALUES ('1482259720969523200', '321312', '普通用户', null, '0', '1', '6345824413764157440', '312', '2022-01-15 15:53:51', null, '2022-01-15 16:47:33', '0');
INSERT INTO `sys_post` VALUES ('1482259788330045440', '00', '00', null, '0', '00', '6345824413764157440', '00', '2022-01-15 15:54:07', null, null, '1');
INSERT INTO `sys_post` VALUES ('1482273953656475648', '321', '321', null, '0', '321', '6345824413764157440', '321', '2022-01-15 16:50:25', null, null, '1');
INSERT INTO `sys_post` VALUES ('1482274522303434752', '3213', '3213213', null, '0', '321', '6345824413764157440', '321', '2022-01-15 16:52:40', null, '2022-01-15 16:52:52', '1');
INSERT INTO `sys_post` VALUES ('6345920456624902144', '6345920456624902144', '超级管理员岗', null, '0', '321', '6345824413764157440', null, '2021-12-16 15:50:13', null, '2022-01-15 15:23:07', '0');

-- ----------------------------
-- Table structure for sys_post_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_post_role`;
CREATE TABLE `sys_post_role` (
  `app_id` varchar(100) NOT NULL COMMENT '应用id',
  `role_id` varchar(100) NOT NULL COMMENT '角色id',
  `post_id` varchar(100) NOT NULL COMMENT '岗位id',
  PRIMARY KEY (`app_id`,`role_id`,`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_post_role
-- ----------------------------
INSERT INTO `sys_post_role` VALUES ('1482314563520172032', '1482314567609618432', '1482259720969523200');
INSERT INTO `sys_post_role` VALUES ('1482314563520172032', '1482314567609618432', '6345920456624902144');
INSERT INTO `sys_post_role` VALUES ('1482324429223628800', '1481510909087191040', '6345920456624902144');
INSERT INTO `sys_post_role` VALUES ('1482324429223628800', '1482314567609618432', '6345920456624902144');
INSERT INTO `sys_post_role` VALUES ('1482324429223628800', '1482324433485041664', '6345920456624902144');
INSERT INTO `sys_post_role` VALUES ('1482331318737047552', '1481510909087191040', '6345920456624902144');
INSERT INTO `sys_post_role` VALUES ('1482331318737047552', '1482314567609618432', '6345920456624902144');
INSERT INTO `sys_post_role` VALUES ('1482331318737047552', '1482324433485041664', '6345920456624902144');
INSERT INTO `sys_post_role` VALUES ('1482331318737047552', '1482331323032014848', '6345920456624902144');
INSERT INTO `sys_post_role` VALUES ('1482346066056712192', '1481510909087191040', '6345920456624902144');
INSERT INTO `sys_post_role` VALUES ('1482346066056712192', '1482314567609618432', '6345920456624902144');
INSERT INTO `sys_post_role` VALUES ('1482346066056712192', '1482324433485041664', '6345920456624902144');
INSERT INTO `sys_post_role` VALUES ('1482346066056712192', '1482331323032014848', '6345920456624902144');
INSERT INTO `sys_post_role` VALUES ('1482346066056712192', '1482346070821441536', '6345920456624902144');
INSERT INTO `sys_post_role` VALUES ('1482350294141636608', '1481510909087191040', '6345920456624902144');
INSERT INTO `sys_post_role` VALUES ('1482350294141636608', '1482314567609618432', '6345920456624902144');
INSERT INTO `sys_post_role` VALUES ('1482350294141636608', '1482324433485041664', '6345920456624902144');
INSERT INTO `sys_post_role` VALUES ('1482350294141636608', '1482331323032014848', '6345920456624902144');
INSERT INTO `sys_post_role` VALUES ('1482350294141636608', '1482346070821441536', '6345920456624902144');
INSERT INTO `sys_post_role` VALUES ('1482350294141636608', '1482350298751176704', '6345920456624902144');
INSERT INTO `sys_post_role` VALUES ('6345489506536636416', '1481510909087191040', '6345920456624902144');

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `role_id` varchar(100) NOT NULL COMMENT '角色id',
  `role_code` varchar(100) NOT NULL COMMENT '角色编号',
  `role_name` varchar(64) NOT NULL COMMENT '角色名称',
  `app_id` varchar(100) NOT NULL COMMENT '应用id',
  `remark` varchar(255) DEFAULT NULL COMMENT '角色描述',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  `create_by` varchar(100) DEFAULT NULL COMMENT '创建人',
  `update_by` varchar(100) DEFAULT NULL COMMENT '修改人',
  `del_flag` int(11) DEFAULT '0' COMMENT '逻辑删除 0、未删除 1、已删除',
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('1481510909087191040', '1481510909087191040', '超级管理员', '6345489506536636416', null, '2021-12-13 15:52:59', null, null, null, '0');
INSERT INTO `sys_role` VALUES ('1482225821530853376', '213213', '11', '6345489506536636416', null, '2022-01-15 13:39:09', null, null, null, '1');
INSERT INTO `sys_role` VALUES ('1482225887578558464', '3213', '321', '6345489506536636416', '321', '2022-01-15 13:39:25', null, null, null, '1');
INSERT INTO `sys_role` VALUES ('1482228527226032128', '007', '007', '6345489506536636416', '测试编辑操作', '2022-01-15 13:49:54', '2022-01-15 13:51:24', null, null, '0');
INSERT INTO `sys_role` VALUES ('1482277381896015872', '321321', '008', '6345489506536636416', '231', '2022-01-15 17:04:02', '2022-01-15 17:04:08', null, null, '0');
INSERT INTO `sys_role` VALUES ('1482314567609618432', '3213', '应用管理员角色', '1482314563520172032', null, '2022-01-15 19:31:48', null, null, null, '0');
INSERT INTO `sys_role` VALUES ('1482324433485041664', '000', '应用管理员角色', '1482324429223628800', null, '2022-01-15 20:11:00', null, null, null, '0');
INSERT INTO `sys_role` VALUES ('1482331323032014848', '4455', '应用管理员角色', '1482331318737047552', null, '2022-01-15 20:38:23', null, null, null, '0');
INSERT INTO `sys_role` VALUES ('1482346070821441536', '4444', '应用管理员角色', '1482346066056712192', null, '2022-01-15 21:36:59', null, null, null, '0');
INSERT INTO `sys_role` VALUES ('1482350298751176704', '1234', '应用管理员角色', '1482350294141636608', null, '2022-01-15 21:53:47', null, null, null, '0');
INSERT INTO `sys_role` VALUES ('xxx999xxx', '9999', '超级角色', '6345489506536636416', '11111', '2021-12-06 17:50:39', null, '1', null, '1');

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu` (
  `role_id` varchar(100) NOT NULL COMMENT '角色id',
  `menu_id` varchar(100) NOT NULL COMMENT '菜单id',
  `app_id` varchar(100) NOT NULL COMMENT '应用id',
  PRIMARY KEY (`role_id`,`menu_id`,`app_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
INSERT INTO `sys_role_menu` VALUES ('', '6345189999375917011', '');
INSERT INTO `sys_role_menu` VALUES ('1481510909087191040', '1481874071586213888', '6345489506536636416');
INSERT INTO `sys_role_menu` VALUES ('1481510909087191040', '1481874268722696192', '6345489506536636416');
INSERT INTO `sys_role_menu` VALUES ('1481510909087191040', '1481874362180177920', '6345489506536636416');
INSERT INTO `sys_role_menu` VALUES ('1481510909087191040', '1481874457822892032', '6345489506536636416');
INSERT INTO `sys_role_menu` VALUES ('1481510909087191040', '1481874550391581312', '6345489506536636416');
INSERT INTO `sys_role_menu` VALUES ('1481510909087191040', '1481874706662569744', '6345489506536636416');
INSERT INTO `sys_role_menu` VALUES ('1481510909087191040', '1481874790112472128', '6345489506536636416');
INSERT INTO `sys_role_menu` VALUES ('1481510909087191040', '1481874879719582784', '6345489506536636416');
INSERT INTO `sys_role_menu` VALUES ('1481510909087191040', '6345189999375917056', '6345489506536636416');
INSERT INTO `sys_role_menu` VALUES ('1482228527226032128', '1481874071586213888', '6345489506536636416');
INSERT INTO `sys_role_menu` VALUES ('1482228527226032128', '1481874268722696192', '6345489506536636416');
INSERT INTO `sys_role_menu` VALUES ('1482228527226032128', '1481874362180177920', '6345489506536636416');
INSERT INTO `sys_role_menu` VALUES ('1482228527226032128', '1481874457822892032', '6345489506536636416');
INSERT INTO `sys_role_menu` VALUES ('1482228527226032128', '1481874550391581312', '6345489506536636416');
INSERT INTO `sys_role_menu` VALUES ('1482228527226032128', '1481874706662569744', '6345489506536636416');
INSERT INTO `sys_role_menu` VALUES ('1482228527226032128', '1481874790112472128', '6345489506536636416');
INSERT INTO `sys_role_menu` VALUES ('1482228527226032128', '1481874879719582784', '6345489506536636416');
INSERT INTO `sys_role_menu` VALUES ('1482228527226032128', '6345189999375917056', '6345489506536636416');
INSERT INTO `sys_role_menu` VALUES ('1482277381896015872', '1481874071586213888', '6345489506536636416');
INSERT INTO `sys_role_menu` VALUES ('1482277381896015872', '1481874268722696192', '6345489506536636416');
INSERT INTO `sys_role_menu` VALUES ('1482277381896015872', '1481874362180177920', '6345489506536636416');
INSERT INTO `sys_role_menu` VALUES ('1482277381896015872', '1481874457822892032', '6345489506536636416');
INSERT INTO `sys_role_menu` VALUES ('1482277381896015872', '1481874550391581312', '6345489506536636416');
INSERT INTO `sys_role_menu` VALUES ('1482277381896015872', '1481874706662569744', '6345489506536636416');
INSERT INTO `sys_role_menu` VALUES ('1482277381896015872', '1481874790112472128', '6345489506536636416');
INSERT INTO `sys_role_menu` VALUES ('1482277381896015872', '1481874879719582784', '6345489506536636416');
INSERT INTO `sys_role_menu` VALUES ('1482277381896015872', '6345189999375917056', '6345489506536636416');
INSERT INTO `sys_role_menu` VALUES ('1482324433485041664', '1481874071586213880', '1482324429223628800');
INSERT INTO `sys_role_menu` VALUES ('1482324433485041664', '1481874268722696112', '1482324429223628800');
INSERT INTO `sys_role_menu` VALUES ('1482324433485041664', '1481874362180173920', '1482324429223628800');
INSERT INTO `sys_role_menu` VALUES ('1482324433485041664', '1481874457822852032', '1482324429223628800');
INSERT INTO `sys_role_menu` VALUES ('1482324433485041664', '1481874550391181312', '1482324429223628800');
INSERT INTO `sys_role_menu` VALUES ('1482324433485041664', '1481874706662559744', '1482324429223628800');
INSERT INTO `sys_role_menu` VALUES ('1482324433485041664', '1481874790112432128', '1482324429223628800');
INSERT INTO `sys_role_menu` VALUES ('1482324433485041664', '1482324429441732608', '1482324429223628800');
INSERT INTO `sys_role_menu` VALUES ('1482331323032014848', '1481874071586213880', '1482331318737047552');
INSERT INTO `sys_role_menu` VALUES ('1482331323032014848', '1481874268722696112', '1482331318737047552');
INSERT INTO `sys_role_menu` VALUES ('1482331323032014848', '1481874362180173920', '1482331318737047552');
INSERT INTO `sys_role_menu` VALUES ('1482331323032014848', '1481874457822852032', '1482331318737047552');
INSERT INTO `sys_role_menu` VALUES ('1482331323032014848', '1481874550391181312', '1482331318737047552');
INSERT INTO `sys_role_menu` VALUES ('1482331323032014848', '1481874706662559744', '1482331318737047552');
INSERT INTO `sys_role_menu` VALUES ('1482331323032014848', '1481874790112432128', '1482331318737047552');
INSERT INTO `sys_role_menu` VALUES ('1482331323032014848', '1481874879719542784', '1482331318737047552');
INSERT INTO `sys_role_menu` VALUES ('1482346070821441536', '1482346066295787520', '1482346066056712192');
INSERT INTO `sys_role_menu` VALUES ('1482346070821441536', '1482346066295787521', '1482346066056712192');
INSERT INTO `sys_role_menu` VALUES ('1482346070821441536', '1482346066421616640', '1482346066056712192');
INSERT INTO `sys_role_menu` VALUES ('1482346070821441536', '1482346066534862848', '1482346066056712192');
INSERT INTO `sys_role_menu` VALUES ('1482346070821441536', '1482346066652303360', '1482346066056712192');
INSERT INTO `sys_role_menu` VALUES ('1482346070821441536', '1482346066769743872', '1482346066056712192');
INSERT INTO `sys_role_menu` VALUES ('1482346070821441536', '1482346066887184384', '1482346066056712192');
INSERT INTO `sys_role_menu` VALUES ('1482346070821441536', '1482346067004624896', '1482346066056712192');
INSERT INTO `sys_role_menu` VALUES ('1482346070821441536', '1482346067122065408', '1482346066056712192');
INSERT INTO `sys_role_menu` VALUES ('1482346070821441536', '1482346067239505920', '1482346066056712192');
INSERT INTO `sys_role_menu` VALUES ('1482350298751176704', '1482350294359740416', '1482350294141636608');
INSERT INTO `sys_role_menu` VALUES ('1482350298751176704', '1482350294359740417', '1482350294141636608');
INSERT INTO `sys_role_menu` VALUES ('1482350298751176704', '1482350294477180928', '1482350294141636608');
INSERT INTO `sys_role_menu` VALUES ('1482350298751176704', '1482350294586232832', '1482350294141636608');
INSERT INTO `sys_role_menu` VALUES ('1482350298751176704', '1482350294745616384', '1482350294141636608');
INSERT INTO `sys_role_menu` VALUES ('1482350298751176704', '1482350294871445504', '1482350294141636608');
INSERT INTO `sys_role_menu` VALUES ('1482350298751176704', '1482350294984691712', '1482350294141636608');
INSERT INTO `sys_role_menu` VALUES ('1482350298751176704', '1482350295102132224', '1482350294141636608');
INSERT INTO `sys_role_menu` VALUES ('1482350298751176704', '1482350295211184128', '1482350294141636608');
INSERT INTO `sys_role_menu` VALUES ('1482350298751176704', '1482350295328624640', '1482350294141636608');

-- ----------------------------
-- Table structure for sys_tenant
-- ----------------------------
DROP TABLE IF EXISTS `sys_tenant`;
CREATE TABLE `sys_tenant` (
  `tenant_id` varchar(100) NOT NULL COMMENT '租户id',
  `tenant_code` varchar(100) NOT NULL COMMENT '租户编号',
  `tenant_name` varchar(100) NOT NULL COMMENT '租户名',
  `logo` varchar(500) DEFAULT NULL COMMENT '小图标',
  `remark` varchar(250) DEFAULT NULL COMMENT '描述',
  `type` int(11) DEFAULT '1' COMMENT '租户类型 0、超级租户 1、普通租户',
  `status` int(11) DEFAULT '0' COMMENT '租户状态 0、正常 1、冻结',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  `del_flag` int(11) DEFAULT '0' COMMENT '逻辑删除标识：0--未删除 1--已删除',
  PRIMARY KEY (`tenant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_tenant
-- ----------------------------
INSERT INTO `sys_tenant` VALUES ('6345824413764157440', 'HHHHH', '阿里巴巴', 'http://baidu.com', '线上交易中心', '0', '0', '2021-12-16 09:28:35', null, '0');

-- ----------------------------
-- Table structure for sys_tenant_app
-- ----------------------------
DROP TABLE IF EXISTS `sys_tenant_app`;
CREATE TABLE `sys_tenant_app` (
  `tenant_id` varchar(100) NOT NULL COMMENT '租户id',
  `app_id` varchar(100) NOT NULL COMMENT '应用id',
  PRIMARY KEY (`tenant_id`,`app_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_tenant_app
-- ----------------------------
INSERT INTO `sys_tenant_app` VALUES ('6345824413764157440', '1482260939590995968');
INSERT INTO `sys_tenant_app` VALUES ('6345824413764157440', '1482314563520172032');
INSERT INTO `sys_tenant_app` VALUES ('6345824413764157440', '1482324429223628800');
INSERT INTO `sys_tenant_app` VALUES ('6345824413764157440', '1482331318737047552');
INSERT INTO `sys_tenant_app` VALUES ('6345824413764157440', '1482346066056712192');
INSERT INTO `sys_tenant_app` VALUES ('6345824413764157440', '1482350294141636608');
INSERT INTO `sys_tenant_app` VALUES ('6345824413764157440', '6345489506536636416');

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `user_id` varchar(100) NOT NULL COMMENT '用户id',
  `user_name` varchar(250) DEFAULT NULL COMMENT '用户名',
  `password` varchar(500) DEFAULT NULL COMMENT '用户密码',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态 0，在岗 1，离职 ',
  `org_id` varchar(100) NOT NULL COMMENT '所属机构编号',
  `tenant_id` varchar(100) NOT NULL COMMENT '租户id',
  `nickname` varchar(255) DEFAULT NULL COMMENT '用户昵称',
  `phone` varchar(20) DEFAULT NULL COMMENT '用户手机号',
  `avatar` varchar(500) DEFAULT 'https://img0.baidu.com/it/u=2799385184,4103603649&fm=15&fmt=auto COMMENT头像' COMMENT '头像',
  `email` varchar(500) DEFAULT NULL COMMENT '电子邮箱',
  `type` int(11) DEFAULT '0' COMMENT '用户类型 0、普通用户 1、超级管理员',
  `create_by` varchar(100) DEFAULT NULL COMMENT '创建者',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` varchar(100) DEFAULT NULL COMMENT '修改人',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  `del_flag` int(11) DEFAULT '0' COMMENT '逻辑删除 0、未删除 1、已删除',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('1481463573883523072', 'admin', '123456', '0', '1481461991431344128', '6345824413764157440', '深渊巨口', '123456', null, '123456', '1', null, '2022-01-13 11:10:14', null, '2022-01-13 11:27:12', '0');
INSERT INTO `sys_user` VALUES ('1482249088798953472', '000000', '000000', '1', '1481461991431344128', '6345824413764157440', '007', '7', null, '007', '1', null, '2022-01-15 15:11:36', null, '2022-01-15 15:15:51', '1');
INSERT INTO `sys_user` VALUES ('1482250241938952192', '007', '123456', '0', '1481461991431344128', '6345824413764157440', '007', '123', null, '123', '1', null, '2022-01-15 15:16:11', null, null, '1');
INSERT INTO `sys_user` VALUES ('1482270932939706368', 'ali123', '123456', '0', '1482266280068255744', '6345824413764157440', '前端工程师', '12321', null, '321', '1', null, '2022-01-15 16:38:24', null, null, '0');
INSERT INTO `sys_user` VALUES ('1482271746659848192', 'ali123456', '123456', '0', '1482266280068255744', '6345824413764157440', '扫地大爷', '2', null, '000', '0', null, '2022-01-15 16:41:38', null, null, '0');

-- ----------------------------
-- Table structure for sys_user_post
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_post`;
CREATE TABLE `sys_user_post` (
  `user_id` varchar(100) NOT NULL COMMENT '用户id',
  `post_id` varchar(100) NOT NULL COMMENT '岗位id',
  PRIMARY KEY (`user_id`,`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user_post
-- ----------------------------
INSERT INTO `sys_user_post` VALUES ('1481463573883523072', '6345920456624902144');
INSERT INTO `sys_user_post` VALUES ('1482270932939706368', '6345920456624902144');
INSERT INTO `sys_user_post` VALUES ('1482271746659848192', '6345920456624902144');
