// 校验子网掩码
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


/**
 * 验证给定的字符串是否是带有子网掩码的 IP 地址形式（x.x.x.x/xx）。
 * @param {string}
 * @returns {boolean}
 */
function validateIpMask(value) {
  const ipMaskRegex = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}\/(3[0-2]|[12]?[0-9])$/;
  return ipMaskRegex.test(value);
}

// 测试用例
const testCases = [
  // 有效的IP/掩码组合
  { input: '192.168.1.1/24', expected: true },
  { input: '0.0.0.0/0', expected: true },
  { input: '255.255.255.255/32', expected: true },
  { input: '10.0.0.1/8', expected: true },
  { input: '172.16.0.0/16', expected: true },
  { input: '1.2.3.4/1', expected: true },
  { input: '192.168.1.1/0', expected: true },
  { input: '192.168.1.1/32', expected: true },

  // 无效的IP/掩码组合
  { input: '256.256.256.256/32', expected: false }, // 超过255
  { input: '192.168.1.1/33', expected: false }, // 掩码超过32
  { input: '192.168.1/24', expected: false }, // 缺少一个八位组
  { input: '192.168.1.1.1/24', expected: false }, // 多了一个八位组
  { input: '192.168.1.256/24', expected: false }, // 超过255
  { input: '192.168.1.-1/24', expected: false }, // 负数
  { input: '192.168.1/24a', expected: false }, // 掩码部分带字母
  { input: 'abc.def.ghi.jkl/24', expected: false }, // 非数字字符
  { input: '192.168.1.1/', expected: false }, // 缺少掩码
  { input: '192.168.1.1', expected: false }, // 缺少掩码
  { input: '/24', expected: false }, // 缺少IP
];

// 运行测试用例
testCases.forEach(({ input, expected }) => {
  const result = validateIpMask(input);
  console.log(`validateIpMask('${input}') = ${result}; Expected: ${expected}`);
});


