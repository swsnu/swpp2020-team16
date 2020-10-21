FROM    node:13.12.0
  
# sharing directory
VOLUME /deploy/swpp2020-team16/coding-mbti

# execution script
COPY ./start-server.sh /usr/local/bin
RUN ln -s /usr/local/bin/start-server.sh /start-server.sh
CMD ["start-server.sh"]
