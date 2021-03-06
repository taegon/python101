# 파일 쓰기

교수님이 정하신 목표에 도달하기 위해 갈 길이 멀기 때문에, 파일 쓰기는 간단하게 살펴보고 넘어가겠다. 이번 장에서는 이전 장에서 다른 코드를 아주 약간 변형해서, 화면에 출력하는 대신 파일에 그 결과를 출력해보도록 하겠다.

## 파일쓰기의 기본구조

파일 쓰기는 화면에 출력하는 것과 매우 유사한데, 파일 읽기와 같이 파일을 먼저 열어주어야 하는 점이 중요하다. 특히 파일 쓰기를 할 때 작업을 모두 수행한 후, 파일을 제대로 닫아주지 않으면, 결과의 일부 또는 전부가 파일에 기록되지 않을 수 있다. 따라서 아래 제시하는 바와 같이 `with`를 이용한 구문을 적극 권장한다. 기본 구조는 다음과 같다.

```python
filename = "쓰고자 하는 파일명.csv"

with open(filename, "w") as f:
    f.write("year, month, day, tavg\n")
    f.write("2018, 7, 25, 38\n")
    f.write("{},{},{:d},{:.1f}\n", year, month, day, tavg)
```

파일명에서 "쓰고자 하는 파일명"은 실제 파일명이 아니고, 각자 원하는 파일명을 적어주라는 의미이다. 파일명은 한글을 쓰면 안되는 것은 아니나, 왠만하면 모든 경로는 영어로 작성하는 편이 정신건강에 이롭다.

위 코드와 같은 형태로 `with`를 이용한 구문으로 작성하면, 알아서 파일을 닫아주므로 걱정하지 않아도 된다.

파일을 열 때, 읽기와 다른 점은 `"r"` 대신 `"w"`를 쓴다는 점이다. `read`의 `r`과 `write`의 `w`라는 건 안 가르쳐도 알거라고 생각한다. 지진파 공부할 때, P파는 `primary wave`, S파는 `secondary wave`라는 걸 고등학교 지구과학 선생님이 알려주셨다면, 외우는 게 그렇게 어렵진 않았을건데...

기본적으로 `f.write()`를 이용하여 출력하게 되는데, `write()` 함수는 기본적으로 줄바꿈을 하지 않으므로, `\n`를 마지막에 넣어준다. 엔터를 누르라는 기능이라고 생각하면 된다. 또한 값을 출력하기 위해 2가지 형태로 제시하였는데, 주로 처리한 값을 자동으로 입력해야 하므로, `format`를 이용한 형태를 주로 쓰게 된다. 출력되는 패턴을 지정하기 위해서 정수는 `d`, 실수는 `f`, 문자열은 `s`를 쓰지만, 생략하면 변수의 형식에 상관없이 차례에 맞춰서 넣어준다. c언어에서 `printf`와 비슷한데, 정교하게 형식을 맞추진 않더라도 기본적인 구문정도는 익숙해지는 것이 좋다. 특히 실수의 자릿수 지정은 꽤나 자주 이용된다.

## 파일 읽고 쓰기

지난 번에 작성한 읽기 프로그램과 합쳐서 값을 읽고, 그 결과를 출력하는 프로그램을 만들어보자. 4장에서 작성한 코드를 그대로 복사하고, 코드를 약간 추가하여 파일에 그 결과를 적어보겠다.

```python
filename = "../data/90.txt"

data_year = []
data_tavg = []
lines = []

with open(filename, "r") as f:
    for line in f:
        tokens = line.split()
        year = int(tokens[0])
        tavg = float(tokens[4])
        print("Year: {:d}, Temp_Avg: {:.1f}".format(year, tavg))

        lines.append(line) # 읽어온 자료 그대로를 저장한다.

        data_year.append(year)
        data_tavg.append(tavg)

with open("90_copy.txt", "w") as f:
    for line in lines:
        f.write(line)

total_line = len(data_year)
with open("90_simple_tavg.csv", "w") as f:
    f.write("year, temp_avg\n")
    for i in range(total_line):
        f.write("{}, {:.1f}\n".format(data_year[i], data_tavg[i]))
```

조금 복잡해 보이지만, 데이터를 저장하기 위한 코드가 다소 추가되었을 뿐, 내용은 굉장히 간단하다.

`[]`는 리스트로 부르는 자료형인데, 여러가지 값을 하나의 변수명에 넣을 수 있다. 다른 언어에서 배열(array)로 부르는 자료형과 유사하다. 파일 읽기 코드는 그대로 가져왔으며, 다만 읽어온 자료를 변수에 담는 코드만 조금 추가되었다. `=`를 이용해서 값을 할당하면, `=`의 오른쪽 값이 그대로 변수에 바꿔치는 형태로 들어가게 된다. 우리는 여기에서 값을 모두 저장하고 싶은 것이므로, 추가하기 위해서는 리스트의 `append`라는 함수를 이용해서 값을 저장하고 있다. `append`는 추가한다라는 의미이다.

변수에 저장한 값을 2개의 파일로 쓰기를 하고 있는데, 첫번째 형태는 아무 처리도 하지 않고, 그대로 출력하는 방법이고, 두번째는 이미 가공된 변수를 읽어와서 출력하는 형태이다. 아래에 2가지 형태를 혼합한 형태로 작성된 코드를 제시할 것이다. 기능적으로 동일한 코드이므로, 형태에 익숙해지는 것이 좋다. 코드가 길다고 패닉에 빠지면, 갑자기 모든 코드가 암호화되어서 전혀 이해가 되지 않을 것이다.

여기까지 잘 따라왔고, 눈썰미가 있는 몇 안 되는 친구라면, 이상한 점을 하나 발견했을텐데, 바로 `\n`의 유무이다. 2개의 파일 중 1번째는 `\n`를 넣지 않고, 두번째는 `\n`를 적어주었다는 점이 다르다. 이는 `line`이라는 변수에는 아무처리도 하지 않았기 때문에, 줄바꿈 표시까지 들어가 있다. 그래서 `\n`를 추가하면, 줄바꿈을 2번하게 된다. 반면 2번째 파일에서는 한 줄을 읽어서 공백으로 자른 다음 특정 값들만 저장했으므로 `\n`이 들어가 있지 않았다. 그래서 출력할 때 `\n`를 넣어주어야 한다.

## 기상자료 파일 읽어서 출력하기

여기까지 잘 따라왔다면, 완성된 코드를 만들어보도록 하자. 여기서는 계산된 값을 넣기 위해 임의로 켈빈온도를 추가해보자. 화씨를 계산해도 좋겠다.

```python
filename = "../data/90.txt"

dataset = []

with open(filename, "r") as f:
    for line in f:
        if not line.split():
            continue
        tokens = line.split()
        year = int(tokens[0])
        month = int(tokens[1])
        day = int(tokens[2])
        tavg = float(tokens[4])
        kelvin = tavg + 273.15

        dataset.append([year, month, day, tavg, kelvin])

with open("90_kelvin.csv", "w", encoding="utf-8-sig") as f:
    f.write("연, 월, 일, 평균온도(C), 평균온도(K)\n")
    for data in dataset:
        f.write("{}, {}, {}, {:.1f}, {:.2f}\n".format(data[0], data[1], data[2], data[3], data[4]))
```

여기서는 값을 저장하는 방식이 약간 달라졌는데, 여러 개의 값을 한꺼번에 넣어줄 때, `dataset.append([year, month, day, tavg, kelvin])`와 같은 형태로 쓸 수 있다.

파일을 열 때, `encoding="utf-8-sig"`를 추가하였는데, 이는 csv 파일을 생성할 때 한글이 들어간 파일을 생성할 때 내용이 깨져서 볼 수 없는 상황을 막아준다.

출력은 많이 봐왔으므로, 추가설명은 생략하겠다. 자 이제 파일 읽고, 쓰는 것까지 마스터하였다. 다음 장에는 여러 개의 파일을 다루는 방법을 살펴보겠다.
