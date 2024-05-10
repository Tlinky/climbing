// 快速排序
function quickSort(list) {
  if (list.length < 2) return list;
  let q = list.shift();
  let leftList = list.filter((v) => v <= q);
  let rightList = list.filter((v) => v > q);
  return [...quickSort(leftList), q, ...quickSort(rightList)];
}

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[arr.length - 1]; // 选择最后一个元素作为基准值
  const leftArray = [];
  const rightArray = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      leftArray.push(arr[i]);
    } else {
      rightArray.push(arr[i]);
    }
  }

  return [...quickSort(leftArray), pivot, ...quickSort(rightArray)];
}

// 示例用法
const array = [5, 2, 4, 6, 1, 3];
const sortedArray = quickSort(array);
console.log(sortedArray); // 输出 [1, 2, 3, 4, 5, 6]

// 快速排序的时间复杂度平均为 O(n log n)，其中 n 是数组的长度。它是一种原地排序算法，不需要额外的空间开销，
//因此在排序大量数据时非常高效。快速排序也是一种分治算法，具有良好的性能和稳定性。
