
# Base images 基础镜像
FROM centos:centos7
 
#MAINTAINER 维护者信息
MAINTAINER network-bigdata-cmss
 
#ADD  获取url中的文件,放在当前目录下
ADD http://nginx.org/download/nginx-1.15.3.tar.gz .
 
#RUN 执行以下命令 
RUN yum install -y pcre-devel wget net-tools gcc zlib zlib-devel make openssl-devel
RUN tar -zxvf nginx-1.15.3.tar.gz
RUN mkdir -p /usr/local/nginx
RUN cd nginx-1.15.3 && ./configure && make && make install
RUN ln -s /usr/local/nginx/sbin/* /usr/local/sbin/
 
#REPLACE CONF 替换配置文件
RUN rm /usr/local/nginx/conf/nginx.conf
ADD config/nginx.conf /usr/local/nginx/conf/
 
#ADD RESOUCES 添加静态资源
RUN rm /usr/local/nginx/html/index.html
RUN mkdir -p /usr/local/nginx/html/static
COPY dist/ /usr/local/nginx/html/static
 
#EXPOSE 映射端口
EXPOSE 1205
 
#CMD 运行以下命令
CMD ["nginx"]