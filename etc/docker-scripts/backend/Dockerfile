FROM python:3.7-slim
  
ENV PYTHONUNBUFFERED=0
ENV DATABASE_URL postgres://postgres@db:5432/postgres

# sharing directory
VOLUME /deploy/swpp2020-team16/coding-mbti/backend

# execution script
COPY ./start-server.sh /usr/local/bin
RUN ln -s /usr/local/bin/start-server.sh /start-server.sh
COPY ./init-backend.sh /usr/local/bin
RUN ln -s /usr/local/bin/init-backend.sh /init-backend.sh
COPY ./wait-for-it.sh /usr/local/bin
RUN ln -s /usr/local/bin/wait-for-it.sh /wait-for-it.sh

CMD ["start-server.sh"]