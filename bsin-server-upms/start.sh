#!/bin/sh

WORK_DIR=/home/admin

JAR_NAME=`ls ${WORK_DIR} | grep jar`

JVM_WORK_DIR=${WORK_DIR}/logs/jvm-logs
mkdir -p ${JVM_WORK_DIR}

MEM_OPTS="${MEM_OPTS} -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=512m"
MEM_OPTS="${MEM_OPTS} -XX:+AlwaysPreTouch"
OPTIMIZE_OPTS="-XX:AutoBoxCacheMax=20000 -Djava.security.egd=file:/dev/./urandom"
JMX_OPTS="-Dcom.sun.management.jmxremote.port=9981 -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false"
SHOOTING_OPTS="-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=${JVM_WORK_DIR}/"

JVM="-server ${MEM_OPTS} ${OPTIMIZE_OPTS} ${JMX_OPTS} ${SHOOTING_OPTS}"

cd ${WORK_DIR}

start(){
    java $JVM -jar $JAR_NAME
    if [ $? -eq 0 ]; then
        echo "${JAR_NAME} is started success !"
    else
        echo "${JAR_NAME} is started failed !"
    fi
}

case "$1" in
    start)
        start
    ;;
*)
esac
exit $?
