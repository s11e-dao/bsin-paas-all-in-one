# bsin-paas服务端部署文档

[toc]

## **环境准备**

*  特别说明

**请务必按照本文档部署运行章节进行操作，避免踩坑弯路！！**



*  环境说明

|   工具    | 版本  |     备注      |
| :-------: | :---: | :-----------: |
|    JDK    |  11   |               |
|   MySQL   |  8.0  | 建议使用MySQL |
|   IDEA    |   | 建议使用IDEA  |
| zookeeper | 3.6.2 |               |
|   seata   | 1.4.2 |               |



##  **服务端代码部署** 

*  特别说明

**无论您是多年编程的高级工程师，还是刚刚入门的实习生，部署请完全参考本文档操作，避免踩坑弯**



### 一、项目下载

> 项目下载

```
git clone https://gitee.com/bsin-paas/all-in-one.git
```


### 二、初始化数据库

> 参数说明

```
版本： mysql8.0
默认字符集: utf8mb4
默认排序规则: utf8mb4_general_ci
```

> 脚本说明

```
bsin-server-upms\doc\init.sql   upms权限管理脚本
bsin-server-targe-gateway\src\main\resources\sql\mysql_ini.sql  网关脚本
```


### 三、配置修改

1、数据库源信息修改（upms和网关application.properties文件都要修改）

```
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/bsin-upms?characterEncoding=UTF-8&serverTimezone=Asia/Shanghai&allowMultiQueries=true&zeroDateTimeBehavior=convertToNull #修改成自己创建的数据库
spring.datasource.username=***  #用户名
spring.datasource.password=***  #密码

```

2、zookeeper配置修改(upms和网关application.properties文件都要确认IP地址是否为本机)

```
# zookeeper配置修改
com.alipay.sofa.rpc.registry.address=zookeeper://127.0.0.1:2181   
```

3、修改seata地址(bsin-server-targe-gateway) file.conf文件

```
service {
  #transaction service group mapping
  vgroupMapping.my_test_tx_group = "default"
  #only support when registry.type=file, please don't set multiple addresses
  #本地环境需要修改
  default.grouplist = "127.0.0.1:8091"			#确定IP是否为本机
  #degrade, current not support
  enableDegrade = false
  #disable seata
  disableGlobalTransaction = false
}
```


### 四、启动顺序

1、先启动zookeeper

```java
在zookeeper的bin目录下输入命令
 
./zkServer.sh start   启动命令
```

2、启动seata

```
在seata的bin目录下输入命令

./seata-server.bat -p 8091 -h 127.0.0.1 -m file   启动命令
```

3、进入项目找到启动类运行

```Java
//先启动网关
bsin-server-targegateway\src\main\java\me\flyray\bsin\gateway\BsinGatewayApplication.java
//继续启动upms
upms-server\src\main\java\me\flyray\bsin\server\BsinUpmsApplication.java
```

