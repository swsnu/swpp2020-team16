(1) 어떻게 사용할 수 있나요?

- init.sh, load.sh, unload.sh가 모두 실행권한을 갖는지 확인해주세요.
  
  - 아니라면, 아래의 실행코드를 입력해주세요.
    : `  chmod +x init.sh  `
    : `  chmod +x load.sh  `
    : `  chmod +x unload.sh  `

- 그 다음 ./init 을 실행해주세요.

(2) 서버를 런하면 에러가 나는 듯 싶은데 어떻게 확인할 수 있나요?

- 컨테이너의 id를 찾습니다.
  - `   docker ps | grep django-backend-server | awk '{print $1}'   `

- 컨테이너의 로그를 확인합니다.
  - `   docker logs <컨테이너 id>   `
