FROM openjdk:11.0.8-jdk
WORKDIR /home/admin

COPY ./upms-server/target/*.jar .
COPY ./start.sh .
EXPOSE 8082

RUN sed -i 's/\r//' ./start.sh

ENTRYPOINT [ "/bin/sh", "/home/admin/start.sh", "start" ]