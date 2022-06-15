# 기본기 다지기

책을 쓰면서 가장 고민한 부분인데, 바로 프로그래밍의 기본 문법 파트이다. 대부분의 언어가 비슷한 형태를 가지고 있기 때문에, 프로그래밍을 한 번이라도 배워봤다면 쉽게 넘어갈 수 있는 부분이지만, 처음 배우는 입장이라면 이 부분이 가장 어렵고, 지루한 부분이 될 수 있다.

무엇보다 내가 이걸 쓰고 있는 이유는 다른 책들이 커버하지 못하는 부분, 즉 우리 분야 연구와 밀접하게 관련된 예제로 실용적으로 쓸 수 있는 코드를 통해 배움을 전하고자 하는 것인데, 기본 문법 부분은 좋은 책이 너무 많다. 그리고 내가 그걸 일일이 설명하기에도 너무 비효율적이다.

그래서 이번 장은 간단하게 요약 정리만 하고, 대신 학습하기 좋은 링크들로 대체하고자 한다. 그리고 좀 체계적으로 배우고 싶다면, 서점 가면 관련 책이 수백권은 있을텐데, 읽기 편하고 재미있어 보이는 걸로 골아서 보면 된다.

## 공부하기 좋은 자료

* 박연오 저자의 [<파이썬 프로그래밍 입문서 (가제)>](https://python.bakyeono.net/index.html): 우연히 이 자료를 찾게 되었는데, 이걸 보고 나니 내가 기본문법에 관해서 써야겠다는 생각을 완전히 접게 되었다. 7장 정도까지만 보면 될 것 같다.
* [Learn X in Y minutes](https://learnxinyminutes.com/docs/python/): 한 페이지짜리 긴 코드가 있다. 이걸 다 읽을 수 있으면, 문법을 마스터한 것으로 이해해도 된다. 물론 일부만 이해할 수 있다고 해도 상관없다. 맨 아래 관련하여 유용한 자료들을 링크하고 있는데, 이 역시 볼 만하다.
* [PyFormat: Using % and .format() for great good!](https://pyformat.info/): 이 페이지는 출력양식에 대해서 정리해놓은 페이지인데, 아주 잘 정리되어 있다.
* 그 외 다수의 책이 있지만, 이건 개인 취향에 맡기겠다.

## 간단 요약

* 변수 선언이랄 게 없다. 그냥 쓰면 된다. `a=42`라고 쓰고 나면, 그 아래 부터는 `a`라고 쓰면 파이썬이 `42`라고 알아듣는다. 그럼 영문자 a를 쓰고 싶으면, 어떻게 해야하나? `"a"`라고 따옴표를 붙여주면, 변수가 아니라 글자로 인식한다.
* 자료형에는 문자, 정수, 실수 정도가 있다는 건 알고 있자.
* `=`와 `==`의 차이를 알아야 한다. 등호가 한 개일때는 "같다"라는 의미가 아니라, 할당의 의미이다. 앞서 `a=42`라고 쓴 코드처럼, `a`라는 변수에 `42`를 넣는 것(할당)이다. "같다"라는 의미의 등호는 꼭 2개를 써야 한다.
* 사칙연산, 괄호, 수학함수 이런 건 상상하는대로 다 쓸 수 있다. 수학함수와 몫과 나머지 계산 등은 나중에 실제 코드에서 사용하는 예를 통해서 다시 다루겠다.
* 반복문은 `for`와 `while`이 있고, 파이썬에서는 주로 `for`문을 쓴다. `continue`와 `break` 키워드 정도 눈에 익혀놓으면 좋겠다.
* 비교문은 `if`, `elif`, `else`로 구성되는 구문이고, 비교연산자는 상식적으로 쓸 수 있다. 다만, 다른 프로그래밍 언어와 달리 `in`이라는 키워드와 `not`, `and`, `or`와 같은 영어단어를 그대로 쓴다는 점이 특이하다.
  * 비교문에서 하나 더 알고 갈 시스템변수로, `True`, `False`, `None` 정도가 있다.
* 여기서 다시한번, 파이썬에서 들여쓰기는 매우 중요하다. 다른 프로그래밍 언어에서는 코드 덩어리(블록)를 정하기 위해서 대괄호({})나, `if - endif`와 같은 키워드를 이용한다. 하지만 파이썬은 들여쓰기로 블록을 정의하기 때문에, 매우 주의할 필요가 있다.
* 출력은 `print()` 함수를 쓰고, 출력양식을 정하기 위해서는 `format()`함수를 이용할 것이다. 포맷과 관련해서는 위 자료에서 [PyFormat](https://pyformat.info/)를 참조하자.
* 키보드 입력은 `input()`이라는 함수를 쓰는데, 다루지 않을 것이다. 거의 쓸 일이 없다. 대부분 파일에서 자료를 읽게 될 것이다.
* 리스트([]로 묶는 자료형)는 파이썬에서 매우 중요하다. 이 리스트와 사전형(dict) 때문에 파이썬을 쓴다고 해도 과언이 아니다. 기본적으로 인덱스 쓰는 법 정도는 간단히 익혀두자.
  * `a[0]`는 첫번째 원소, `a[-1]`은 마지막 원소, `a[1:3]`은 두번째에서 3번째까지 2개의 값을 담은 리스트를 의미하는데, 이 정도는 이해해야 한다.
* List Comprehensions(지능형 리스트)이라고 부르는 한줄로 리스트를 생성하는 방법이 있는데, 이는 나중에 다시 다루겠다. `[x*2+1 for x in range(5)]`라고 쓰면 1부터 9까지 홀수를 모은 리스트를 만들어준다.
* 함수는 `def function_name(arg1, args2)`와 같이 정의한다. 역시 나중에 상세히 다루겠다. 눈에 익히는 정도로 짚고 넘어가자.