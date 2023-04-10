def insertion_sort(A, n):
    for i in range(1, n):
        key = A[i]
        j = i - 1
        while j >= 0 and A[j] > key:
            A[j+1] = A[j]
            j -= 1
        A[j + 1] = key


if __name__ == "__main__":
    list1 = [11, 1, 51, 1, 5, 3]
    insertion_sort(list1, len(list1))
    print(list1)
