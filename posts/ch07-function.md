# 함수: 프로그램 조각내기

특정 기간의 통계치를 계산하기 이전에 함수에 대해서 간단히 짚고 넘어가겠다. 지금까지 작성한 코드는 길어야 50줄 정도 였는데, 코드가 더 길어지면 읽고 이해하기가 점점 어려워진다. 그래서 프로그래밍에서는 코드를 특정 기능 혹은 특성별로 조각을 내고 그 조각을 조립하는 방식으로 코드를 작성한다. 이미 여러번 사용한 `print()`, `open()`, `format()`과 같은 함수들을 생각해보자. 각각 함수 내부에서는 굉장히 복잡한 계산과정이 이루어지고, 복잡한 코드로 작성되어 있다. 하지만 그 함수를 사용하는 사용자는 그 내부를 전혀 알 필요가 없이, 출력하기 위해, 파일을 열기 위해, 출력형식을 지정해주기 위해 그저 사용할 뿐이다.

같은 방식으로 우리가 작성하는 코드도 함수로 쪼개어서 생각하면, 쪼개진 조각에만 집중하여 개발할 수 있고, 조각들이 완성되면 그 조각을 합쳐서 전체 프로그램을 완성하게 된다.

## 함수의 기본 형식

함수는 `def` 라는 키워드로 시작하는 구문으로 매개변수를 받아서, 계산한 후, 계산 결과를 돌려주는 구조로 이루어진다. 입력값으로 받는 매개변수와 계산결과로 돌려주는 리턴값 모두 생략 가능하다.

```python
def 함수이름(변수1, 변수2):
    계산
    계산
    return 계산결과
```

위와 같은 형식으로 이루어지므로 간단히 눈에 익히고, 이전에 작성했던 프로그램을 수정해보자.

## 여러개 파일 읽고 쓰는 작업을 쪼개자

가장 마지막으로 작성했던 코드를 함수를 이용해서 쪼개기를 하면 다음과 같다. 파일 읽기와 파일 쓰기 부분을 함수로 만들었다. 그렇게 고치고 나면, 여러개의 측후소를 반복해서 실행하는 부분(`for station_id in station_ids:` 부분)의 코드가 굉장히 읽기 편하게 된 것을 알 수 있다.

함수에서 사용한 변수명은 해당 함수 부분에서만 유효하므로, 같은 이름을 사용하더라도 다른 값이 될 수 있고, `write_file` 함수에서 `output_filename` 대신 `filename`으로 다른 이름을 쓸 수도 있다.

함수는 호출하기 전까지는 실행되지 않는다는 점은 주의하자. 지금까지는 프로그램이 가장 첫줄부터 마지막줄까지 차례대로 실행되었지만, 함수로 쓴 코드는 호출되기 전까지 실행되지 않는다. 즉 이 코드에서 실제로 실행이 시작되는 부분은 `station_ids = [90, 95]` 코드부터라고 생각하면 된다.

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
            tavg = float(tokens[4])
            kelvin = tavg + 273.15

            dataset_list.append([year, month, day, tavg, kelvin])
    return dataset_list


def write_file(filename, dataset):
    with open(filename, "w", encoding="utf-8-sig") as f:
        f.write("연, 월, 일, 평균온도(C), 평균온도(K)\n")
        for data in dataset:
            f.write("{}, {}, {}, {:.1f}, {:.2f}\n".format(data[0], data[1], data[2], data[3], data[4]))


station_ids = [90, 95]

for station_id in station_ids:
    filename = "../data/" + str(station_id) + ".txt"
    output_filename = "{}_kelvin.csv".format(station_id)

    dataset = read_dataset(filename)
    write_file(output_filename, dataset)
```

## 메인함수

프로그램 코드를 작성하면, 가장 먼저 실행되는 코드를 컴퓨터에게 알려주어야 한다. 대부분의 언어가 공통적으로 `main` 함수라고 부른다. 파이썬에서는 메인함수를 만드는 부분이 다소 이상한데, 복사해서 쓰면되므로, 굳이 외울 필요는 없다.

앞서 작성한 코드에 메인함수까지 넣어서 작성하면 다음과 같은 코드가 된다. 중복된 코드로 앞서 작성한 두 함수의 내용은 생략하였다. (밑에 코드를 똑같이 타이핑하고 에러난다고 하시면 안된다.)

```python
def read_dataset(filename):
    ...

def write_file(filename, dataset):
    ...

def main():
    station_ids = [90, 95]

    for station_id in station_ids:
        filename = "../data/" + str(station_id) + ".txt"
        output_filename = "{}_kelvin.csv".format(station_id)

        dataset = read_dataset(filename)
        write_file(output_filename, dataset)

if __name__ == "__main__":
    main()
```

앞으로 작성하는 코드는 이런 형식으로 작성하면 좋겠다. 앞서 설명하였듯이 모든 코드가 함수로 정의되어 있으므로, 실제로 구동되는 코드는 `if __name__ == "__main__":` 구문부터 실행이 되고, 해당 구문에서 `main()` 함수를 호출한다. 그리고 그 안에서 다른 함수들을 호출하는 방식으로 프로그램이 구동된다.

조금 더 쪼개기를 하자면, 결국 메인함수의 코드는 다음과 같은 형태가 될 것이다.

```python
def main():
    station_ids = [90, 95]

    for station_id in station_ids:
        read_write_file(station_id)
```

혹은 

```python
def main():
    station_ids = [90, 95]

    read_write_files(station_ids)
```

같은 코드가 될 것이다. 프로그래밍은 이렇게 간단하다.

그리고 여기서 측후소 번호를 단순 입력하라고 했는데, 이 부분도 함수로 만들어서, 함수를 개선하면 된다.

```python
def get_station_ids():
    return [90, 95]


def main():
    station_ids = get_station_ids()

    read_write_files(station_ids)
```

이런 코드가 될 텐데, `get_station_ids()` 함수에서 `os.walk` 혹은 `glob` 함수를 이용해서 디렉토리 전체파일리스트를 가져 와서 리스트를 만들어주어도 된다. 이 경우, 파일을 읽고 쓰는 것을 고민할 필요가 없다. `[90, 95]`와 같은 리스트를 잘 만드는 것에만 집중하면 된다.
