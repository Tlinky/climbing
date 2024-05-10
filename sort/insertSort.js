/**
 * 插入排序
 * 从右到左 计算量越来越小
 */
function insertSort(list) {
  let len = list.length;
  let num;
  let index;
  for (let i = 1; i < len; i++) {
    index = 0;
    num = list.splice(i, 1, null)[0]; //拿出数值
    for (let j = i - 1; j >= 0; j--) {
      if (list[j] > num) {
        //list【j】 数据左侧的值   如果左侧的值大于当前的值 右移 否则插入 -进入下一轮循环
        list[j + 1] = list[j];
        index++;
      } else {
        list.splice(i - index, 1, num);
        break;
      }
    }
  }
}

function insertSort(arr) {
  const length = arr.length;
  for (let i = 1; i < length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

// 插入排序的时间复杂度为 O(n^2)，其中 n 是数组的长度。尽管插入排序不是最快的排序算法，
// 但对于小型数组或基本有序的数组，它具有良好的性能。此外，插入排序是稳定的，即相等元素的相对顺序在排序过程中保持不变
