FROM openjdk:11.0.8-jdk
WORKDIR /home/admin

COPY ./target/*.jar .
COPY ./start.sh .
EXPOSE 8083

RUN sed -i 's/\r//' ./start.sh

ENTRYPOINT [ "/bin/sh", "/home/admin/start.sh", "start" ]