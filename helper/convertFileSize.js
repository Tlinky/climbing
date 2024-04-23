/*
 * @Author: 李廷骏
 * @Date: 2024-04-23 09:09:31
 * @Describe: 实现一个对文件大小的单位进行转换的函数
 */

// 版本1, 将kb转为其他单位
function formatSizeUnits(kb) {
  var result = '';

  if (kb < 1024) {
    result = kb + ' KB';
  } else if (kb < 1024 * 1024) {
    result = (kb / 1024).toFixed(2) + ' MB';
  } else if (kb < 1024 * 1024 * 1024) {
    result = (kb / 1024 / 1024).toFixed(2) + ' GB';
  } else {
    result = (kb / 1024 / 1024 / 1024).toFixed(2) + ' TB';
  }

  return result;
}

// 版本2, 将kb转为其他单位
function formatSizeUnits(kb) {
  let units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let unitIndex = 0;

  while (kb >= 1024 && unitIndex < units.length - 1) {
    kb /= 1024;
    unitIndex++;
  }

  return `${kb.toFixed(2)} ${units[unitIndex]}`;
}
console.log('formatSizeUnits: ', formatSizeUnits(1))

/**
 * 完整版
 * 将文件大小从一个单位转换为另一个单位
 * @param {number} size 文件大小。
 * @param {string} fromUnit 初始单位（'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'）。
 * @param {string} toUnit 目标单位（'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'）。
 * @param {number} [decimalPoint=2] 结果保留的小数位数，默认为2。
 * @return {string} 转换后的文件大小，带单位。
 */
function convertFileSize(size, fromUnit, toUnit, decimalPoint = 2) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const fromIndex = units.indexOf(fromUnit);
  const toIndex = units.indexOf(toUnit);

  if (fromIndex === -1 || toIndex === -1) {
    throw new Error('Invalid units');
  }

  // 计算初始单位与目标单位之间的转换系数
  const exponent = fromIndex - toIndex;
  const resultSize = size * Math.pow(1024, exponent);

  // 返回格式化后的结果，如果需要保留0，则不使用parseFloat
  return parseFloat(resultSize.toFixed(decimalPoint)) + ' ' + toUnit;
}

// 示例使用
console.log(convertFileSize(1, 'GB', 'MB')); // 输出: 1024 MB
console.log(convertFileSize(1, 'MB', 'KB')); // 输出: 1024 KB
console.log(convertFileSize(1, 'KB', 'B')); // 输出: 1024 B
console.log(convertFileSize(1, 'MB', 'GB', 4)); // 输出: 0.001 GB


