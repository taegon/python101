# 파이썬 101

파이썬을 이용하여 CLI 환경에서 구동되는 프로그램을 만들 수 있도록 하는데 목적을 둔다. 기본적으로 간단한 계산 프로그램을 구현하고, 파일 읽고, 쓰는 작업을 다룬다.

일차적인 목표로 한경대 학생들과 함께 연구와 관련된 모델을 각자 구현할 수 있도록 한다.

본 자료와 관련해서 질문이나 수정해야 할 사항, 혹은 제안하고 싶은 내용은 깃허브 이슈에 남겨주기 바랍니다.

깃허브 이슈페이지: [https://github.com/taegon/python101/issues](https://github.com/taegon/python101/issues)

## 환경설정

본 저장소를 이용하기 위해서는 gitbook를 설치해야 한다. npm를 이용해서 설치할 수 있으며, 윈도우에서는 nodejs 설치파일을 설치하고, npm 명령을 실행시키면 별 문제 없이 설치가 되었다.

배치파일도 같이 올려두었는데, 서버는 실행하면 `http://localhost:4000`으로 접속해서 책을 확인할 수 있다. 페이지는 Live reloading (Hot reloading?)되므로, 마크다운 파일을 고치면 변경사항이 반영된 웹페이지 문서를 확인할 수 있다.

~~본 작업은 [여기](http://blog.appkr.kr/work-n-play/pandoc-gitbook-%EC%A0%84%EC%9E%90%EC%B6%9C%ED%8C%90/)를 참조하였으며, 향후 여건이 되면 pandoc를 도입할 생각으로 동일한 문서 구조를 차용하였다.~~

~~gh-pages를 쓰기 위해서 [이 페이지](https://tech.ssut.me/2015/07/28/start-python-documentation-using-sphinx/)를 참조하였다.~~

예전에 사용한 배포과정이 뭔가 찜찜했는데, [캡틴판교님의 코드](https://github.com/joshua1988/learning-note/blob/master/deploy.bat)를 참조하여 정리하였다. `gh-pages` 브랜치를 이용하여 배포하는 것은 똑같은데, `gh-pages` 브랜치의 이력을 남기지 않고, 배포용 용도로만 사용하고 있다. 지난 번에 찜찜했던 부분이 이 부분이었다. 굳이 이력을 남길 필요가 없는 배포과정을 고수하기 위하여 코드가 중복하여 존재하고, `master` 브랜치와 합칠 수도 없는데, 동시에 코드가 존재하는 부분에서 마음이 불편했던 것이다.

캡틴판교님은 자동생성된 배포할 디렉토리에 `git init`를 이용하여 깃 저장소를 초기화하고, 이 저장소를 GitHub에 강제로 푸시하는 방식으로 사용하고 있었다. `gh-pages` 브랜치를 항상 초기화해서, 배포 이력(일시)가 남지 않는 부분이 살짝 아쉬운데, `master` 브랜치에 이력이 고스란히 남아있으므로, 무시하기로 하였다.

[`vuepress`](https://github.com/joshua1988/learning-note)를 이용하니, 산출물([`demo`](https://joshua1988.github.io/learning-note/))이 더 나아보이기도 하였는데, 검색기능이 아쉬워서 일단은 gitbook을 유지 하기로 결심하였다. `vuepress`는 기본적으로 `h2`, `h3` 태그만 검색이 되고, 본문 검색을 위해서는 Algolia Search를 이용하여야 한다. 또 다른 작업이 될 것 같아서, 기본적으로 검색 기능이 제공되는 gitbook를 유지하였다.

* [Node.js](https://nodejs.org/en/): npm를 쓰기 위해서 필요
* gitbook 설치: `npm install gitbook-cli -g`
  * gitbook은 현재(2018년 6월 현재) [https://legacy.gitbook.com](https://legacy.gitbook.com)으로 옮겨졌다. 새로운 gitbook.com은 설치형을 지원하지 않는 것으로 보인다.
