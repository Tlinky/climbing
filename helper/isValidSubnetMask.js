function isValidSubnetMask(mask) {
  // 分割子网掩码为四个部分
  var parts = mask.split('.');
  if (parts.length !== 4) {
    return false;
  }

  var binaryString = '';
  for (var i = 0; i < parts.length; i++) {
    var part = parseInt(parts[i], 10);
    // 检查每个部分是否在0到255之间
    if (isNaN(part) || part < 0 || part > 255) {
      return false;
    }
    // 转换为二进制并检查是否为8位长
    var binaryPart = part.toString(2);
    binaryPart = '00000000'.substring(binaryPart.length) + binaryPart; // 填充到8位
    binaryString += binaryPart;
  }

  // 检查二进制字符串是否符合有效子网掩码的模式
  if (!/^(1*0*)$/.test(binaryString)) {
    return false;
  }
  // 检查是否存在"01"的模式
  if (binaryString.indexOf('01') !== -1) {
    return false;
  }

  return true;
}

// 测试子网掩码
console.log(isValidSubnetMask("255.255.255.0")); // 应当返回 true
console.log(isValidSubnetMask("255.255.0.0"));   // 应当返回 true
console.log(isValidSubnetMask("255.255.255.255")); // 应当返回 true (全1的特殊情况)
console.log(isValidSubnetMask("255.255.255.240")); // 应当返回 true
console.log(isValidSubnetMask("255.255.255.248")); // 应当返回 true
console.log(isValidSubnetMask("255.255.255.254")); // 应当返回 true
console.log(isValidSubnetMask("255.255.192.0")); // 应当返回 true (这是一个有效的子网掩码)

// 非法格式
console.log(isValidSubnetMask("255.255.255.250")); // 应当返回 false (不是连续的1)
console.log(isValidSubnetMask("255.0.255.0")); // 应当返回 false (不连续的1)
console.log(isValidSubnetMask("255.255.0.255")); // 应当返回 false (不连续的1)
console.log(isValidSubnetMask("255.224.255.0")); // 应当返回 false (不连续的1)
console.log(isValidSubnetMask("240.255.255.0")); // 应当返回 false (不连续的1)
console.log(isValidSubnetMask("255.255.255.256")); // 应当返回 false (256超出了255的范围)
console.log(isValidSubnetMask("0.255.255.255")); // 应当返回 false (以0开始)
console.log(isValidSubnetMask("192.168.1.1")); // 应当返回 false (不是有效的子网掩码)
console.log(isValidSubnetMask("111.111.111.0")); // 应当返回 false (不是有效的子网掩码格式)

console.log(isValidSubnetMask("255.255")); // 应当返回 false (不完整的子网掩码)
console.log(isValidSubnetMask("999.255.255.0")); // 应当返回 false (999超出了255的范围)
console.log(isValidSubnetMask("255.-1.255.0")); // 应当返回 false (负数)
console.log(isValidSubnetMask("abc.def.ghi.jkl")); // 应当返回 false (不是数字)
console.log(isValidSubnetMask("")); // 应当返回 false (空字符串)

