# 原子服务应用开发脚手架

  **文档版本**

| 版本号 | 修改日期   | 编写   | 修改内容                     | 备注 |
| ------ | ---------- | ------ | ---------------------------- | ---- |
| V1.0.0 | 2021/11/30 | bolei | 新建                         |      |

脚手架参考《原子服务开发指南》文档进行使用

## 一、相关术语

| 序号 | 术语/缩略语 | 全称和说明                                                   |
| ---- | ----------- | ------------------------------------------------------------ |
| 1    | 原子服务        | bsin-paas平台服务中不可拆分的最小服务                  |


## 二、原子服务工程规约

### 2.1 工程结构规约


####   工程命名规范

- 第一部分:bsin（平台名称），使用bsin-paas框架需带此标识
- 第二部分:服务类型标识 server 标识服务服务
- 第三部分:业务相关描述
- 第四部分:预留可拓展命名部分，若业务相关描述部分不够准确标识工程可在此进行拓展

 格式：**bsin-server-业务相关描述**
 
 示例: bsin-server-upms

####  工程包名命名

   包名统一使用小写，点分隔符之间有且仅有一个自然语义的英语单词。


```
xxx-server
 └─src
    └─main
       └─.....
    └─test
       └─me.flyray.bsin.server
          └─biz
          └─domain
          └─impl
          └─mapper
```

### 2.2 类名规约

**业务服务接口模块(xxx-facade)**：

request包下请求实体类命名规则**xxxReq**，若请求实体类名中还有内部实体类，可在request包下自定义内部类名

如示例工程中PersonReq中使用内部请求实体类Children

response包下响应实体类命名规则**xxxResp**

service包下业务接口类名命名规则**xxxSVC**

```
facade
  └─request
   ├─xxxReq 请求实体，作为数据传输对象
   ├─xxx
  └─response
   ├─xxxResp 响应实体，作为数据传输对象
   ├─xxx
  └─service
   ├─xxxService 业务接口，服务接口目录，主要是对外发布的服务
```

**业务服务实现模块(xxx-server)**：

- commom中业务常量类命名：xxxConstants
- commom中业务枚举类命名：xxxEnum
- impl中业务核心实现类命名：xxxServiceImpl
- interceptor中私有责任链类命名：xxxInterceptor
- mapper中数据访问类命名：xxxMapper
- domain中实体类名命名自定义
- biz为实现类impl中内部类，类名自定义，命名规则:xxxBiz

```
server
  └─common 公共常量类/枚举类等
       └─constant 
           ├─xxxConstants 业务常量类
       └─enums 
           ├─xxxEnum  业务枚举类
  └─impl
       ├─xxxServiceImpl 业务核心实现，业务逻辑处理流程
  └─ interceptor  
       ├─xxxInterceptor 私有责任链
  └─mapper
       ├─xxxMapper 数据访问
  └─domain
       ├─xxx 业务模型
  └─biz
       ├─xxxBiz 实现类impl中内部类
```

以上包结构中若有未使用的包可删除，如interceptor未进行相应开发逻辑代码可删除

**测试类**

  测试类命名要以它要测试的类的名称开始，以Test结尾

### 2.3 注释参考

类上注释：

-   建议只注释 类的相关描述，开发者，及创建时间

```java
/**
 * xxxxxxxxxxxx类
 * @author xxx  xxx  xxx
 * 2021/4/25 16:01
 */
```

方法上注释：

- 建议注释方法的描述，参数说明，返回值等

```java
/**
  * xxxx （方法描述）
  * @param xxx
  * @param xxx
  * @return
  */
```

注：不建议在方法注释上携带开发者，有多名开发者共同开发同个接口不同方法的可在类注释上体现


### 2.5 初始化脚本

```
// 端口说明
sofa rest 默认端口 8341
```

### 代码生成器使用
参考：https://zhuanlan.zhihu.com/p/361321386