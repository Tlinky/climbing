/**
 * 冒泡排序
 */
function bubbleSort(arr) {
    const length = arr.length;
    for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // 将顺序不正确的元素互换位置
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

// 示例用法
const array = [5, 2, 4, 6, 1, 3];
const sortedArray = bubbleSort(array);
console.log(sortedArray); // 输出 [1, 2, 3, 4, 5, 6]

// 冒泡排序的时间复杂度为 O(n^2)，其中 n 是数组的长度。尽管冒泡排序不是最快的排序算法，但它是一种稳定的排序算法，并且在某些情况下具有良好的性能
