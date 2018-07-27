# 여러개 파일 읽고 쓰기

이번 장에서는 여러개 파일을 읽고 쓰는 방법에 대해서 살펴보겠다. 이전 장에서 다룬 내용과 크게 다르지 않기 때문에, 쉽게 따라할 수 있을 것이라고 생각한다.

## 여러개 파일 읽고 쓰기의 기본 개념

여러개의 파일을 다룰 때는 동일한 형태의 디렉토리 구조와 파일명을 갖도록 데이터를 준비하는 것이 수월하게 작업할 수 있는 원동력이 된다.

기본적으로 가장 쉽게 할 수 있는 방법은 파일 전체를 알고 있어서, 그걸 코드에 적어주는 방법이 가장 쉽다.

프로그래밍을 처음 접하는 입장에서는 가장 쉬운 방법으로 주어진 폴더에 든 파일을 다 돌리면 안될까라는 생각을 하는 경향이 있는데, 폴더에 동일한 성격을 파일을 다 모아둔다는 게 생각보다 쉬운일이 아니다. 다른 성격의 파일이 섞여있는 경우가 굉장히 많기 때문에, 코드를 작성하는 입장에서는 오히려 고민거리가 많아지는 방법이다.

따라서 우리는 파일명을 모두 다 알고, 이걸 코드에 적는 방식으로 접근하겠다.

## 측후소 2개 자료 읽고 쓰기

이전 장에서 작성한 코드를 다시 가지고 오자.

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

여기서 입력자료의 파일명은, `../data/90.txt`, 출력자료의 파일명은 `90_kelvin.csv`이다. 둘 다 `90`이 들어가는 이름이다. 측후소 `90`과 `95`를 돌린다고 생각하면, 모든 코드는 동일하고, 이 파일명만 `90`과 `95`로 바꾸어주면 된다. 먼저 `90`이 입력 파일명과 출력 파일명으로 2번 입력하므로, 이걸 변수로 뽑아서 한번에 바꿀 수 있도록 바꾸겠다.

```python
station_id = 90
filename = "../data/" + str(station_id) + ".txt"
output_filename = "{}_kelvin.csv".format(station_id)

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

with open(output_filename, "w", encoding="utf-8-sig") as f:
    f.write("연, 월, 일, 평균온도(C), 평균온도(K)\n")
    for data in dataset:
        f.write("{}, {}, {}, {:.1f}, {:.2f}\n".format(data[0], data[1], data[2], data[3], data[4]))
```

`station_id`라는 변수로 측후소 번호 `90`를 저장하였고, 이 변수를 이용하여 파일명을 지정하였다. 파일명을 조합하기 위하여 `+`를 이용하여 만들 수도 있고, `format` 함수를 이용할 수도 있다. 복잡한 패턴일수록 `format`를 이용하는 편이 코드 읽기에 수월할 것이다.

이제 코드를 `90`, `95` 각각 한번씩 고쳐서 넣고 돌리면 출력파일이 생성된다. 하지만 그러려고 프로그램을 짜는 건 아니니까, 한걸음 더 들어가 보자.

## 여러개 파일명 변수에 넣고 반복하기

여러개의 값을 하나에 넣기 위해서 "리스트"를 쓴다고 이야기했었다. 여러개의 파일에서 공통으로 쓰는 부분을 제외하고, 변하는 부분만 뽑아보면 측후소 번호가 남게 된다. 따라서 측후소 번호를 리스트로 만들어서 하나의 변수에 넣어주면, 똑같이 반복실행할 수 있다. 코드는 다음과 같다.

```python
station_ids = [90, 95]

for station_id in station_ids:
    filename = "../data/" + str(station_id) + ".txt"
    output_filename = "{}_kelvin.csv".format(station_id)

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

    with open(output_filename, "w", encoding="utf-8-sig") as f:
        f.write("연, 월, 일, 평균온도(C), 평균온도(K)\n")
        for data in dataset:
            f.write("{}, {}, {}, {:.1f}, {:.2f}\n".format(data[0], data[1], data[2], data[3], data[4]))
```

처음 `station_id`를 지정하는 부분이 `for`문을 이용한 반복문으로 바뀌었다. 그리고 `for`문으로 반복되어야 할 부분은 들여쓰기가 되었다. 이 코드에서는 전체가 반복되어야 하므로 전체적으로 한단계 들여쓰기가 되었다. 왠만한 IDE 혹은 편집기에서는 해당 코드를 선택하고 탭 키를 한번 눌러주면 한단계 들여쓰기가 된다. 반대로 내어쓰기를 하려면 `shift + tab`를 누르면 된다.

## 출력 디렉토리 만들기

이제 56개의 측후소 번호를 다 적어주기 전에, 디렉토리 이름 정리를 한번하자. 지금 코드를 돌리면, 파이썬 코드가 있는 폴더에 출력파일이 생기게 되어 보기가 안 좋다. (특히 교수님이 엄청 싫어하십니다.)

그래서 특정한 디렉토리에 모아서 저장하고 싶은데, 만약 디렉토리가 없는 경우에는 파일을 생성하지 못하고 에러가 나게 된다. 손으로 직접 디렉토리를 만들어줘도 되지만, 나중에 여러개의 폴더를 만들어하는 경우가 생기는데, 일일이 손으로 만들어주다보면 번거로움에 지쳐 프로그래밍을 포기하게 된다.

이 부분은 복사해서 붙이면 되므로 너무 어렵게 생각하지 않아도 된다. 하지만 이러한 작업이 필요하다는 것은 확실히 기억하고 넘어가야 한다.

```python
import os

station_ids = [90, 95]
output_dir = "../output/python101/"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

for station_id in station_ids:
    filename = "../data/" + str(station_id) + ".txt"
    output_filename = output_dir + "{}_kelvin.csv".format(station_id)
```

코드 최상단에 `import os`를 추가해주어야 한다. 이는 모듈을 추가하는 코드인데, 앞으로 필요에 따라 여러가지 모듈을 추가하게 될 것이다.

`output_dir`이라는 변수에 저장하고자 하는 폴더명을 지정하게 되고, 그 다음 2줄은 해당 폴더가 없는 경우, 폴더를 생성토록 한다.

`output_filename`에서 출력 폴더명을 추가해주면 된다. 이 때, `/`가 두번 들어가거나 누락되는 경우를 주의하자. 두번 들어가는 경우, 문제가 되지 않는 편인데, 빠지는 경우에는 폴더 안에 파일이 저장되지 않고 여러개의 파일이 폴더 바깥에 생성되게 된다.

## 측후소 56개를 돌릴 차례

측후소 56개를 돌리려고 하면, 이번 장에 배운 코드에 측후소 번호 56개를 적어주면 된다. 타짜는 눈보다 손이 빠르다지만, 여러분의 손은 타짜의 손보다 빠르다는 걸 잘 안다. 이번 수업에서 가장 쉬운 부분일 것 같다. 열심히 56개를 쓰자. 제일 처음한 친구 코드를 달라고 해서 복사하자. 그게 끝이다. 배운 티 내려면 gist에 올려놓고, 전체 카톡에 주소 붙여주면 된다.

그리고 입력자료가 든 폴더에 56개 측후소 자료 복사해 놓지도 않고, 코드가 안 돌아간다고 좌절하면 안 된다.
