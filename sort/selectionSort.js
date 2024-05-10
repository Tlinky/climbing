function selectionSort(arr) {
  const length = arr.length;
  for (let i = 0; i < length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    // 将找到的最小元素与当前位置元素交换
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}

// 示例用法
const array = [5, 2, 4, 6, 1, 3];
const sortedArray = selectionSort(array);
console.log(sortedArray); // 输出 [1, 2, 3, 4, 5, 6]

// 选择排序的时间复杂度为 O(n^2)，其中 n 是数组的长度。尽管选择排序不是最快的排序算法，但由于其简单性，对于小型数组或基本有序的数组也能够提供合理的性能。
