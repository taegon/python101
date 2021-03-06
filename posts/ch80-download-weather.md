# 부록 A: 기상청 자료 받기

기상청에서는 다양한 기상관측 자료를 홈페이지를 통해서 제공하고 있다. 특히 과거관측자료는 수문 및 관개 분야에서 주 입력자료로 활용된다.

하지만 기상청에서 제공하는 과거일별관측자료는 1년 단위로 1개의 측후소에 대하여, 1개의 관측자료를 테이블 형태로 제공한다. 그래서 지역시스템공학과 및 농공학에 기반을 둔 유사학과에서 연구실 막내가 의례적으로 하는 일 중 하나가 기상청 자료를 받아서 엑셀로 저장하는 일이다. 내가 학교를 다니던 10년이 넘는 시간동안 계속 되어온 풍습이 최근 몇년 동안 바뀌었을 것이라고 생각하진 않는다.

이러한 문제의식에서 기상청 과거일별자료를 좀 더 쉽게 받을 수 있는 서비스를 만들어보면 좋겠다고 생각했고, 관련 내용은 농공학회 56권 6호에 실린 "데이터 로딩 자동화를 위한 RESTful 웹서비스 개발 -일별 기상자료 처리를 중심으로-" 논문을 참고하기 바란다. 비록 4년이나 된 논문이나, 여러분이 처한 사정은 크게 달라지지 않았을 것이므로, 여전히 도움이 될 것이다.

## 간단한 API 사용법

이미 교수님을 통해서 몇번 사용해 보았을 것으로 생각된다. 물론 위에 써놓은 논문은 찾아보지 않았을 것도 잘 안다. 안 읽어도 상관 없으니, 일단 계속 진행해보자.

측후소 119번 (수원)의 2011년부터 2015년까지의 기상 자료를 확인해보자. 브라우저를 열고 아래 주소를 쓰면 된다.

`https://api.taegon.kr/station/119/?sy=2011&ey=2015&format=html`

자 그러면, 2014년부터 최근 날짜까지 기상자료를 구하려면 어떻게 해야할까?

`https://api.taegon.kr/station/119/?sy=2014&ey=2018&format=html`

무엇을 바꾸었는지 눈치챘는가? 측후소 번호(`119`)와 시작연도(`sy=2014`), 끝연도(`ey=2018`)만 원하는대로 바꿔주면 된다.

이렇게 보이는 파일은 엑셀에서 웹자원 불러오기 기능을 이용하여 그대로 이용할 수 있다. 하지만 우리는 프로그래밍에서 다루기 쉬운 파일을 배웠다. 바로 CSV 파일이다.

위에서 설명하지 않는 나머지 한 인자 (`format=html`)대신 `format=csv`를 써보자. 방금 브라우저에서 본 결과가 파일로 다운받아지는 것을 확인할 수 있을 것이다. 사실 이만큼만 해도 꽤 편리해진 것이 사실이다. 하지만 여기까지 하려고 이런 걸 만든 건 아니다.

## 모든 측후소 최근 5년간 자료 받기

이런식으로 웹 주소를 통해 서비스를 제공하는 형태를 Open API 혹은 RESTful API라고 한다. 보다 정확히 말하자면, 여기서 소개한 서비스는 HTTP API라고 쓰는 게 적확하지만, 보고서나 제안서에 쓰기에는 앞서 기술한 단어가 훨씬 유용하다.

어쨌거나 API라고 하는 것은 프로그램 간에 서로 자료를 주고 받기 위한 약속이라는 의미이다. 즉 사람이 쓰기 편하게 만든 것이 아니라, 프로그램이 쓰기 편하게 만든 약속이라는 것이다. 그래서 우리가 배운 프로그래밍 지식을 활용하면, 모든 측후소의 최근 5년간 자료를 받는데, 코드 수십 줄로 해결할 수 있게 되는 것이다.

각설하고 코드부터 살펴보자.

```python
import requests
import os

def main():
    station_ids = [90, 95]
    output_dir = "../../output/python101/weather/"
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    url = 'https://api.taegon.kr/stations/{}/?sy=2014&ey=2018&format=csv'
    for st_id in station_ids:
        download_url = url.format(st_id)
        r = requests.get(download_url)
        with open(output_dir + "{}.csv".format(st_id), 'wb') as f:
            f.write(r.content)

if __name__ == "__main__":
    main()
```

이 코드가 전부이다. 예제로 측후소 리스트는 2개만 적어두었는데, 전체 리스트를 만드는 방법은 여러번 설명하였으므로 생략한다. 파일을 쓸 디렉토리를 설정하고, 해당 디렉토리가 없을 때는 만들도록 하였다. 그 다음은 앞서 소개한 API 주소를 지정하고 있다. 모든 인자는 동일하고, 측후소 번호만 바뀌게 되므로, 수정할 곳을 하나만 지정하였다.

`for` 문에서는 앞서 리스트로 준 측후소를 차례대로 넘겨주면서, `download_url`이라는 주소를 만들고, 이 주소에 접속하여 자료를 받는다. `requests.get()` 부분이 웹을 통해서 자료를 받는 부분이고, 받은 자료는 메모리에 올라가 있으므로, 이를 지정한 파일에 저장하기 위하여 `f.write()`를 실행하고 있다. 이게 전부이다.

여기서, `requests` 모듈이 깔려있지 않다고 에러가 날 수 있는데, PyCharm에서 `파일>설정 (Ctrl+Alt+S)`를 들어가서, 왼쪽 항목 중 "Project: .."로 시작하는 항목 바로 아래 "Project Interpreter"를 선택한다. 그러면 설치면 모듈을 확인할 수 있는데, 오른쪽의 "+"버튼을 이용하여 모듈을 설치하면 된다.