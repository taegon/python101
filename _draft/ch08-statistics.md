# 연별 통계 만들기

앞서 기상자료 파일을 읽어서 계산해보고(예를 들어, 캘빈 온도), 그 결과를 출력해보았다. 이번에는 연평균 값을 계산하고, 이 값을 이용하여 평균, 분산 등 기초 통계를 만들어보겠다. 이 장에서는 리스트를 이용하여 C언어의 배열을 사용하는 방식과 유사한 형태로 구현할 것이다. 이러한 방식에 **매우** 익숙해지고 나면, pandas 패키지를 살펴보길 권한다. 직접 작성하는 코드와 pandas를 이용하여 작성한 방식의 비교는 "파이썬 데이터 분석 입문"을 참고하기 바란다.

## 프로그램 틀 만들기

일단은 지난번에 작성한 코드에서 시작하자. 출력부분은 일단 지우고, 자료를 읽어오는 부분을 가져왔다. 이번장에서는 강수량만 다룰 것이므로 다른 관측치는 무시하고, 날짜와 강수량만 읽어오도록 코드를 수정하였다. 다른 방식으로 저장하여도 상관없으나, 데이터를 사용하는 부분에서 위치를 잘 맞추어주어야 한다. 예를 들어 전체 관측치를 `dataset_list`에 넣어줄 수도 있다.

다음으로 `get_annual_prec`와 `print_stat` 함수는 일별 자료를 연별 자료로 바꾸는 역할과, 이 값들을 이용하여 평균, 분산 등의 통계를 계산하는 기능을 구현하게 될 것이다. 현재는 공란으로 두고 넘어가자. `pass`라고 써두면, 아무 작업을 하지않고 지나간다. `main` 함수에서 자료를 읽어서, 연별 값으로 변환하고, 이 변환된 값을 이용하여 통계를 구하는 작업으로 이루어진다는 것을 읽을 수 있다. 이미 읽어오는 것은 많이 연습하였으므로, 이 코드를 구동하여 에러가 나지 않는다면, 비워 놓은 두 함수에만 집중하여 채워넣으면 된다.

```python
def read_dataset(filename):
    dataset_list = []

    with open(filename, "r") as f:
        for line in f:
            if not line.split():
                continue
            tokens = line.split()
            year = int(tokens[0])
            month = int(tokens[1])
            day = int(tokens[2])
            prec = float(tokens[9])

            dataset_list.append([year, month, day, prec])
    return dataset_list


def get_annual_prec(dataset):
    pass


def print_stat(annual_dataset):
    pass


def main():
    station_ids = [90]

    for station_id in station_ids:
        filename = "../data/" + str(station_id) + ".txt"

        dataset = read_dataset(filename)
        annual_prec = get_annual_prec(dataset)
        print_stat(annual_prec)


if __name__ == "__main__":
    main()
```

## 연별 총강수량 구하기

`get_annual_prec()` 함수를 구현해보자. 같은 연도의 강수량을 모두 더하면 되는 간단한 계산이다. 이걸 컴퓨터에게 지시하기 위한 방법을 살펴보자.

사전형을 이용하면, 기술한 그대로 구현할 수 있다. 사전의 키값으로 연도를 지정하고, 값이 비어있을 때는 해당 값을 삽입하고, 값이 있을 경우에는 누적하는 방식으로 구현할 수 있다. 매우 쉬운 방법이나, C언어에서 이러한 방식으로 구현하기가 어려운 단점이 있다. 따라서 교수님이 작성하신 코드를 읽기 위해서는 동일한 방식으로 접근해야 한다.

C언어는 배열 (정확히는 메모리 주소) 계산이 수월하기 때문에, 일정한 크기의 공간을 준비하고, 미리 약속된 규칙에 따라 위치를 찾는 방식으로 구현된다. 즉, 분석의 시작연도와 종료연도를 안다고 가정하면, 총 몇개의 연평균 값을 구해야 하는지 알 수 있다. 그리고 시작연도를 알고 있으므로, 특정 연도가 시작연도로부터 몇번째 값이 되는지는 쉽게 계산할 수 있다. 코드로 이 방식을 살펴보자.

```python
def get_annual_prec(dataset):
    start_year = 1970
    end_year = 2017
    annual_prec = [0 for i in range(start_year, end_year + 1)]

    for data in dataset:
        year = data[0]
        idx = year - start_year
        annual_prec[idx] += data[3]

    return annual_prec
```

결과는 `print()`를 이용해서 값을 확인할 수 있다. `annual_prec`에는 1970년부터 2017년까지 총 48개의 연평균 기온이 저장되어 있다. 만약 측후소의 관측기간이 이보다 짧거나 데이터가 누락되었다면, 해당 연도는 0으로 기록될 것이다.

여기서, 두 가지 새로운 문법이 등장한다. 먼저 `[0 for i in range(start_year, end_year + 1)]`

`+=` 연산은 누적을 뜻하는 연산으로 `a += 1`은 `a = a + 1`과 같은 의미로 컴퓨터가 이해한다.

데이터가 충분하다면(1970년 이전부터 관측 데이터가 있고, 2017년 이후까지 데이터가 있다면) 위 코드는 별 문제 없이 구동될 것이다. 하지만, 측후소마다 관측 시작 연도가 다를 경우에는 `start_year`와 `end_year`를 바꿀 수도 있겠다.

