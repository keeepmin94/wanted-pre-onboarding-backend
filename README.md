# wanted-pre-onboarding-backend
> 프리온보딩 백엔드 인턴십 선발과제

## 사용 기술
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
<img src="https://img.shields.io/badge/Nodejs-339933?style=for-the-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white">
<img src="https://img.shields.io/badge/Mysql-4479A1?style=for-the-badge&logo=Mysql&logoColor=white">
<img src="https://img.shields.io/badge/sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white">
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white">


## 실행 방법

파일 root경로 접속 후 같은 레벨에 .env 생성해 환경변수 설정
```
MYSQL_USERNAME= {default:root}
MYSQL_PASSWORD= {default:wanted1234}
MYSQL_DATABASE= {default:wanted_db}
MYSQL_HOST= wanted_db_container //변경시 compose-yml의 db 컨테이너 이름 동일하게 변경
MYSQL_PORT= {default:3307}
SERVER_PORT= {default:4000}
```

root경로 레벨에서 다음 명령어 실행
```sh
docker-compose build
docker-compose up -d
```

## DB_ERD
![DB_ERD](./img/DB_ERD.png)

## 사전 준비 사항
### 1. 사용자 등록.

```
[Post] http://localhost:4000/user/ 

body:

{
    "name" : "김철수"
}
```

![유저등록](./img/유저등록.png)

### 2. 회사 등록.
```
[Post] http://localhost:4000/company/ 

body:

{
    "name" : "원티드랩",
    "country" : "한국",
    "area" : "서울"
}
```

![회사등록](./img/회사등록.png)

## 요구 사항

### 1. 채용공고를 등록합니다.
Request
```
[Post] http://localhost:4000/notice 

body:

{
    "position" : "백엔드 개발자",
    "reward" : "5000",
    "skill" : "Express",
    "content" : "원티드 백엔드 개발자 채용공고입니다.",
    "companyId" : 1 //회사 id
}
```
![채용공고등록_Req](./img/채용공고등록_Req.png)

Response
![채용공고등록_Res](./img/채용공고등록_Res.png)

### 2. 채용공고를 수정합니다.

Request (Path Variable:채용 공고 id)
```
[Patch] http://localhost:4000/notice/:id

body:

{
    "position" : "백엔드 주니어 개발자",
    "reward" : "5000",
    "skill" : "Express",
    "content" : "원티드랩 백엔드 주니어 채용공고입니다.(수정됨)",
}
```
![채용공고수정_Req](./img/채용공고수정_Req.png)

Response
![채용공고수정_Res](./img/채용공고수정_Res.png)

### 3. 채용공고를 삭제합니다.

Request (Path Variable:채용 공고 id)
```
[Delete] http://localhost:4000/notice/:id
```
![채용공고삭제_Req](./img/채용공고삭제_Req.png)

### 4-1. 채용공고를 목록을 가져옵니다.

Request
```
[Get] http://localhost:4000/notice/
```
![채용공고목록_Req](./img/채용공고목록_Req.png)

Response
![채용공고목록_Res](./img/채용공고목록_Res.png)

### 4-2. 채용공고를 검색해 목록을 가져옵니다.

Request Request (Query String=tag:검색어)
```
[Get] http://localhost:4000/notice/find?tag=원티드
```
![채용공고검색_Req](./img/채용공고검색_Req.png)

Response
![채용공고검색_Res](./img/채용공고검색_Res.png)

### 5. 채용 상세 페이지를 가져옵니다.

Request (Path Variable:채용 공고 id)
```
[Get] http://localhost:4000/notice/:id
```
![채용공고상세_Req](./img/채용공고상세_Req.png)

Response
![채용공고상세_Res](./img/채용공고상세_Res.png)

### 6. 사용자는 채용공고에 지원합니다.

Request (Path Variable:채용 공고 id)
```
[Post] http://localhost:4000/applicant/:id

body:

{
     "userId" : 1
}
```
![채용지원_Req](./img/채용지원_Req.png)

Response
![채용지원_Res](./img/채용지원_Res.png)

## 요구사항 개발 구현
1. 채용공고를 등록합니다. ✅
2. 채용공고를 수정합니다. ✅
3. 채용공고를 삭제합니다. ✅
4. 채용공고 검색 
4-1. 채용공고 목록을 가져옵니다. ✅
4-2. 채용공고 검색 기능 구현(선택사항 및 가산점요소). ✅
5. 채용 상세 페이지를 가져옵니다.
5-1. “채용내용”이 추가적으로 담겨있음. ✅
5-2. 해당 회사가 올린 다른 채용공고 가 추가적으로 포함됩니다(선택사항 및 가산점요소). ✅
6. 사용자는 채용공고에 지원합니다(선택사항 및 가산점요소)(1회만 지원 가능). ✅
7. Unit Test 구현
8. README 에 요구사항 분석 및 구현 과정을 작성 ✅
9. Git commit 메시지 컨벤션 ✅