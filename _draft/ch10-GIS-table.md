# GIS용 자료구축하기

지금까지 만들어 온 프로그램을 바탕으로 GIS에서 불러올 수 있는 형태를 만들어 보도록 하겠다. 아래 형태와 같이 측후소별로 연별 강수량 테이블을 만들면, join 기능을 이용하여 지도를 생성할 수 있다. 이번 장에는 아래 형태의 출력파일을 만들어보도록 하자.

```
MS,  Y1973,  Y1974
90,   1300,   1200
100,   900,    1100
119,   2000,   1000
....
....
295,   1500,   1200
```

## 배열을 이용하여 구현하기

앞서 배운 바와 같이 미리 배열의 크기를 결정할 수 있다면, 리스트를 이용하여 구현할 수 있다. 먼저 측후소별, 연도별로 자료를 모으는 코드부터 작성해보자.

```python
def get_annual_prec_table(stations):
    start_year = 1973
    end_year = 1974
    station_dataset = []
    for station in stations:
        filename = "../../input/python101/" + str(station) + ".txt"
        dataset = read_dataset(filename)

        annual_prec = [0 for i in range(start_year, end_year + 1)]

        for data in dataset:
            year = data[0]
            idx = year - start_year
            if idx < 0:
                continue
            if idx >= len(annual_prec):
                continue
            annual_prec[idx] += data[3]
        station_dataset.append(annual_prec)

    return station_dataset
```

앞서 8장에서 작성한 코드를 그대로 활용하되, 측후소별로 자료를 모을 수 있도록 리스트를 한겹 더 감싸도록 하였다. `station_dataset`에는 각 측후소별로 연도별 강수량합계인 `annual_prec`가 저장되게 된다. 이 함수를 호출할 때, 측후소번호를 리스트로 넘겨주어야 한다. 이렇게 작성하는 이유는 테스트할 때는 간단히 `get_annual_prec_table([90,100])`과 같이 2개 측후소만 넣고 돌릴 수 있다. 프로그램이 잘 돌아가는 것을 확인한 후, 전체 측후소 리스트는 넘겨주면 된다. 전체 측후소 리스트는 앞서 배웠듯이 손으로 직접 다 써주어도 되지만, 특정 디렉토리의 파일명을 읽어도 되고, 측후소 리스트가 적힌 텍스트 파일을 만들어두고 해당파일을 읽어도 된다.

메인함수는 8장에서 작성한 것을 다소 수정해야하는데, 그 이유는 8장에서는 측후소에 대하여 메인함수에서 루프를 만들었으나, 이번 장에서는 `get_annual_prec_table()`함수에서 반복문을 구성하고 있기 때문이다. 메인함수는 다음과 같다.

```python
def main():
    station_ids = [90]

    annual_prec = get_annual_prec_table(station_ids)
    print_annual_prec_table(annual_prec, station_ids)
```

측후소에 대한 반복문이 사라지고, 단순히 리스트만 넘겨주면 되므로 코드가 훨씬 간단해졌다.

이렇게 읽어들인 자료의 출력은 아래와 같이 어렵지 않게 구현할 수 있다.

```python
def print_annual_prec_table(station_dataset, stations):
    print("MS", end="")
    start_year = 1973
    end_year = 1974
    for year in range(start_year, end_year + 1):
        print(",Y{}".format(year), end="")
    print()

    for i, dataset in enumerate(station_dataset):
        print(stations[i], end="")
        for data in dataset:
            print(",{:.1f}".format(data), end="")
        print()
```

## 사전형을 이용하여 구현하기

파이썬에서는 리스트와 사전형 자료형이 기본 제공되어 C언어나 여타 언어에 비해 코드를 작성하기 편리한 점이 있다. 앞서 배열을 이용하여 구현한 방식과 달리 사전형을 이용하여 구현하는 방법에 대해 살펴보겠다. 사전형으로 구현하면, 인덱스 계산을 고민하지 않아도 되기 때문에 코드를 읽기가 조금 더 수월하다.

위에서 작성한 자료읽기와 출력부분은 아래와 같이 작성할 수 있다. 위 코드와 비교하며 살펴보자.

```python
def get_annual_prec_table_using_dict(stations):
    station_dataset = {}
    for station in stations:
        filename = "../../input/python101/" + str(station) + ".txt"
        dataset = read_dataset(filename)

        for data in dataset:
            year = data[0]
            key = (station, year)

            if key in station_dataset:
                station_dataset[key] += data[3]
            else:
                station_dataset[key] = data[3]

    return station_dataset


def print_annual_prec_table_using_dict(station_dataset, stations):
    print("MS", end="")
    start_year = 1973
    end_year = 1974
    for year in range(start_year, end_year + 1):
        print(",Y{}".format(year), end="")
    print()

    for station in stations:
        print(station, end="")
        for year in range(start_year, end_year + 1):
            key = (station, year)
            print(",{:.1f}".format(station_dataset[key]), end="")
        print()
```
