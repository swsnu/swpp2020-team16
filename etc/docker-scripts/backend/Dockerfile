FROM python:3.7-slim
  
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

ENV DATABASE_URL postgres://postgres@db:5432/postgres

# sharing directory
VOLUME /deploy/swpp2020-team16/coding-mbti/backend

# execution script
COPY ./start-server.sh /usr/local/bin
RUN ln -s /usr/local/bin/start-server.sh /start-server.sh
COPY ./wait-for-it.sh /usr/local/bin
RUN ln -s /usr/local/bin/wait-for-it.sh /wait-for-it.sh
RUN apt update
RUN apt install -y libpq-dev python3-dev build-essential graphviz libgraphviz-dev pkg-config

CMD ["start-server.sh"]
