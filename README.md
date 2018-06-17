# 파이썬 101

파이썬을 이용하여 CLI 환경에서 구동되는 프로그램을 만들 수 있도록 하는데 목적을 둔다. 기본적으로 간단한 계산 프로그램을 구현하고, 파일 읽고, 쓰는 작업을 다룬다.

## 환경설정

본 저장소를 이용하기 위해서는 gitbook를 설치해야 한다. npm를 이용해서 설치할 수 있으며, 윈도우에서는 nodejs 설치파일을 설치하고, npm 명령을 실행시키면 별 문제 없이 설치가 되었다.

배치파일도 같이 올려두었는데, 서버는 실행하면 `http://localhost:4000`으로 접속해서 책을 확인할 수 있다. 페이지는 Live reloading (Hot reloading?)되므로, 마크다운 파일을 고치면 변경사항이 반영된 웹페이지 문서를 확인할 수 있다.

본 작업은 [여기](http://blog.appkr.kr/work-n-play/pandoc-gitbook-%EC%A0%84%EC%9E%90%EC%B6%9C%ED%8C%90/)를 참조하였으며, 향후 여건이 되면 pandoc를 도입할 생각으로 동일한 문서 구조를 차용하였다.

gh-pages를 쓰기 위해서 [이 페이지](https://tech.ssut.me/2015/07/28/start-python-documentation-using-sphinx/)를 참조하였다.

* [nodejs](https://nodejs.org/en/): npm를 쓰기 위해서 필요
* gitbook 설치: `npm install gitbook-cli -g`
  * gitbook은 현재(2018년 6월 현재) [https://legacy.gitbook.com](https://legacy.gitbook.com)으로 옮겨졌다. 새로운 gitbook.com은 설치형을 지원하지 않는 것으로 보인다.
