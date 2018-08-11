# 월별 통계 만들기

월별 자료는 연도별 자료와 처리방식은 동일하나, 연도와 월, 2가지 인덱스를 갖게 되어 리스트가 조금 더 복잡해진다. 역시나 pandas나 numpy를 잘 쓰게 되면, 이러한 작업을 코드 1-2줄로 해결할 수 있다. 하지만 기초가 없는 상태에서는 암호같을 수 밖에 없다. 따라서 검색을 해서 코드를 찾더라도 정확히 동일한 문제는 푸는 경우는 거의 없으므로 인터넷에서 찾은 코드를 가져다 쓰기도 쉽지가 않다. 따라서 다소 코드가 길어지더라도 C언어의 배열을 이용하는 방식과 같은 형태로 코드를 구성하도록 하겠다.

## 월별 자료 모으기

앞서 연별 자료를 모으던 코드는 아래와 같았다. 리스트(배열)의 인덱스는 0이 첫해, 1이 둘째해를 의미하였다. 월별 자료는 인덱스가 12개씩 한해가 될 것이다. 즉, 아래코드처럼 48년치 자료를 다룬다고 하면, 48 * 12 개 만큼의 리스트를 만들어서 넣어야 할 것이다.

```python
def get_annual_prec(dataset):
    start_year = 1970
    end_year = 2017
    annual_prec = [0 for i in range(start_year, end_year + 1)]

    for data in dataset:
        year = data[0]
        idx = year - start_year
        if idx < 0:
            continue
        annual_prec[idx] += data[3]

    return annual_prec
```

월별 자료를 구하는 함수는 다음과 같이 고쳐서 쓸 수 있을 것이다.

```python
def get_monthly_prec(dataset):
    start_year = 1970
    end_year = 2017
    total_years = end_year - start_year + 1
    month_prec = [0 for i in range(total_years * 12)]

    for data in dataset:
        year = data[0]
        month = data[1]
        idx = (year - start_year) * 12 + (month - 1)
        if idx < 0:
            continue
        month_prec[idx] += data[3]

    return month_prec
```

총 배열의 크기는 연도수에 12를 곱한 수 만큼이 된다는 것은 어렵지 않게 따라올 수 있을 것이다. 그리고 인덱스를 계산하는 부분인 `idx = (year - start_year) * 12 + (month - 1)`은 매우 흔한 계산인데, 연도가 1년 지날때마다 12개씩 건너띄게 되고, 0부터 시작하므로 `(month-1)`로 계산한다.

## 월별 자료 출력하기

월별 자료를 모으고 나면, 자료를 출력하는 것은 어렵지 않다. 아래와 같이 한줄에 한달치 자료만 출력하려면, 인덱스만 잘 계산해서 출력해주면 된다.

```
Year  Mon Prep
1973  1    50
1973  2    70
...
...
...
2017  12    30
```

해당 기능을 구현한 코드는 다음과 같다.

```python
start_year = 1970

def print_monthly_data(dataset):
    print("Year  Mon Prep")
    for i, data in enumerate(dataset):
        year = start_year + i // 12
        month = i % 12 + 1
        print("{}\t{}\t{}".format(year, month, data))
```

`enumerate()`함수는 리스트를 반복할 때, 인덱스를 세어주는 함수이다. 그래서 `i`에는 몇 번째 값인지 인덱스가 할당되고, `data`에 각 월별 강수량합이 들어가게 된다. 인덱스 계산은 앞서 계산한 방식과 거꾸로이다. 인덱스를 이용하여, 연도와 월을 계산하는 과정인데, `//`는 몫을 계산하고, `%`는 나머지를 계산하는 연산자이다. 처음에는 이러한 계산이 매우 어렵게 느껴질 수 있으나, 숫자를 하나씩 넣어보면서 값을 계산해보면 그렇게 어렵지는 않을 것이다.

## 월별 자료 테이블 형태로 출력하기

행 방향으로는 연도를 열 방향으로 월별 자료를 출력하는 코드를 살펴보자.

```python
start_year = 1970
end_year = 2017
total_years = end_year - start_year + 1

def print_month_table_data(dataset):
    print("Year", end="")
    for i in range(12):
        print("{:>8}".format("M" + str(i+1)), end="")
    print()

    for i in range(total_years):
        year = i + start_year
        print(year, end="")
        for j in range(12):
            idx = i * 12 + j
            print("{:8.1f}".format(dataset[idx]), end="")
        print()
```

형식을 잡기 위해서 코드가 다소 복잡해 보이긴 하다. 하지만, 하나씩 고쳐가면서 살펴보면 그렇게 어렵진 않을 것이다. `print` 함수를 쓸 때 `end=""`를 쓰고 있는데, 이걸 쓰지 않으면 `print`문이 호출될때마다 줄바꿈이 되기 때문에 줄바꿈을 방지하기 위하여 추가해주는 코드이다.
