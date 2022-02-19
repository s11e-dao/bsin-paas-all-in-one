# bsin-paas前端部署文档

[toc]

## **环境准备**

*  特别说明

**请务必按照本文档部署运行章节进行操作，避免踩坑弯路！！**

### 安装node

 去官方下载node版本，进行本地安装

##  **前端代码部署** 

*  特别说明

**无论您是多年编程的高级工程师，还是刚刚入门的实习生，部署请完全参考本文档操作，避免踩坑弯**

### 一、项目下载

> 项目下载

```
git clone https://gitee.com/bsin-paas/all-in-one.git
```

### 二、安装依赖

1、基座依赖安装

> 进入bsin-apps-container根目录执行

```
npm install
```

2、权限管理依赖安装

> 进入bsin-ui-upms根目录执行

```
npm install
```


### 三、配置修改

1、基座配置修改
> 进入bsin-apps-container目录，修改其config目录下的config.ts文件

```
 'process.env.baseUrl': 'http://ip:端口号'
```

2、权限管理配置修改
> 进入bsin-ui-upms目录，修改其目录下的umirc.ts文件
```
  'process.env.baseUrl': 'http://ip:端口号' 
```

### 四、启动顺序

1、先启动基座
> 进入bsin-apps-container根目录执行

```
  npm start
```

2、启动权限管理
> 进入bsin-ui-upms根目录执行

```
  npm start
```

### 五、访问前端
>  chrome 访问http://localhost:8080
>  默认用户名：admin
>  密码：123456

