FROM woahbase/alpine-mysql
RUN mkdir -p /opt/myrecipe
COPY ./ /opt/myrecipe
RUN apk add python3  python3-dev py3-pip npm mysql mysql-client mariadb-connector-c-dev mariadb-dev gcc libc-dev libevent-dev
RUN pip3 install django configparser djangorestframework drf-yasg djangorestframework-simplejwt django-cors-headers
RUN pip3 install  pymysql django-mysql mysql-connector
#RUN pip3 install --user django-crispy-formsl mysql-python
RUN pip3 install mysqlclient
ENV MYSQL_USER_PWD=123
ENV MYSQL_USER_PWD=123
RUN cd /opt/myrecipe;python3 ./manage.py makemigrations