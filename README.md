# swpp2020-team16 

status/branch| Coveralls | Sonarcloud | Travis |
------------ | ---- | ---- | ----
Master       | [![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2020-team16/badge.svg?branch=master)](https://coveralls.io/github/swsnu/swpp2020-team16?branch=master) | 소나클라우드 마스터 뱃지 위치 | [![Build Status](https://travis-ci.org/swsnu/swpp2020-team16.svg?branch=master)](https://travis-ci.org/swsnu/swpp2020-team16)
Development  | [![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2020-team16/badge.svg?branch=dev)](https://coveralls.io/github/swsnu/swpp2020-team16?branch=dev) |  소나클라우드 디벨롭 뱃지 위치 | [![Build Status](https://travis-ci.org/swsnu/swpp2020-team16.svg?branch=dev)](https://travis-ci.org/swsnu/swpp2020-team16)

# 즐거운 개발을 위한 설정사항
(1) 커밋 메시지 템플릿 설정하기.
repo root에 .gitmessage.txt 커밋 메시지 템플릿 파일이 있습니다.
이를 활용하기 위해서는 다음의 명령어를 repo root에서 실행하셔야 합니다.
```
git config commit.template ./.gitmessage.txt
```

# How to run


### [Prerequisites]

> (1) download docker
> (2) download docker-compose
> (3) download docker-machine
> (4) run docker-machine

### [How to run backend]

move to coding-mbti/backend

run the next command

> ./local-docker/local-docker-starter-back/init.sh

### [How to test/lint backend]

move to coding-mbti/backend

run the next command to test

> ./local-docker/local-docker-tester-back/init-test.sh

run the next command to check pylint

> ./local-docker/local-docker-tester-back/init-pylint.sh

### [How to run frontend]

move to coding-mbti/

run the next command

> yarn start

### [How to test/lint frontend]

move to coding-mbti/

run the next command to test

> yarn test

run the next command to check eslint

> ./node_modules/.bin/eslint src/
