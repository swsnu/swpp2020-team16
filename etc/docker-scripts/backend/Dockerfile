FROM    python:3.7

# sharing directory
VOLUME /deploy/swpp2020-team16/coding-mbti/backend

# execution script
COPY ./start-server.sh /usr/local/bin
COPY ./wait-for-it.sh /usr/local/bin
RUN ln -s /usr/local/bin/start-server.sh /start-server.sh
RUN ln -s /usr/local/bin/wait-for-it.sh /wait-for-it.sh

CMD ["start-server.sh"]
