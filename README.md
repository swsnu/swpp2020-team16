# swpp2020-team16 

branch       | Coveralls | Sonarcloud | Travis |
------------ | ---- | ---- | ----
master       | [![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2020-team16/badge.svg?branch=master)](https://coveralls.io/github/swsnu/swpp2020-team16?branch=master) | [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=chullino_swpp2020-team16&metric=alert_status)](https://sonarcloud.io/dashboard?id=chullino_swpp2020-team16) | [![Build Status](https://travis-ci.org/swsnu/swpp2020-team16.svg?branch=master)](https://travis-ci.org/swsnu/swpp2020-team16)
dev  | [![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2020-team16/badge.svg?branch=dev)](https://coveralls.io/github/swsnu/swpp2020-team16?branch=dev) |  [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=chullino_swpp2020-team16&metric=alert_status)](https://sonarcloud.io/dashboard?id=chullino_swpp2020-team16) | [![Build Status](https://travis-ci.org/swsnu/swpp2020-team16.svg?branch=dev)](https://travis-ci.org/swsnu/swpp2020-team16)

## Are you the developer of this project?
If you are a developer of this project, please complete the following 4 settings. Especially, settings for docker is compulsory, so that we can have unified enviroment for development.

(1) setting commit message template.

```
git config commit.template ./.gitmessage.txt
```

(2) setting pre-commit / pre-push hooks. 

```
./etc/githook-scripts/init-hook.sh
```

(3) install docker, docker-compose, docker-machine, virtualbox.

[install docker according to your environment](https://docs.docker.com/get-docker/)
[install docker-compose according to your environment](https://docs.docker.com/compose/install/)
[install docker-machine according to your environment](https://docs.docker.com/machine/install-machine/)
[install virtualbox according to your environment](https://www.virtualbox.org/wiki/Downloads)

(4) create default docker-machine in your terminal.

```
docker-machine create default
```



## How to run

### [Prerequisites For Running In Local Environment]

You need to install docker, docker-compose, docker-machine, virtualbox as explained above.
This project's backend is based on docker, so please remind that it will not run unless you install all required docker services.

### [How to run backend]

move to coding-mbti/backend, 

then run the next command.
```
./local-docker/local-docker-starter-back/init.sh
```
### [How to test/lint backend]

move to coding-mbti/backend, 

then run the next command to test.
```
./local-docker/local-docker-tester-back/init-test.sh
```

run the next command to check pylint
```
./local-docker/local-docker-tester-back/init-pylint.sh
```

### [How to run frontend]

move to coding-mbti/

run the next command
```
yarn start
```

### [How to test/lint frontend]

move to coding-mbti/

run the next command to test
```
yarn test
```

run the next command to check eslint
```
./node_modules/.bin/eslint src/
```