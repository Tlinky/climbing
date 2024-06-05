// 原理是比较两个网络地址，如果相同，则在同一网段，否则不在同一网段
/**
 * [isEqualSegment 判断两个IP地址是否在同一个网段]
 * @param  {String}  addr1 [地址一]
 * @param  {String}  addr2 [地址二]
 * @param  {String}  mask  [子网掩码]
 * @param  {Boolean}  v6   [是否ipv6]
 * @param  {String}  mask  [地址二的子网掩码]
 * @return {Boolean}       [true or false]
 */
function isEqualSegment(addr1, addr2, mask, v6, mask2) {
  if (!addr1 || !addr2 || !mask) {
    // console.log("参数不能为空");
    return false;
  }
  var symbol = v6 ? ":" : ".";
  var prefix = v6 ? "0x" : "";
  var res1 = [],
    res2 = [];
  addr1 = addr1.split(symbol);
  addr2 = addr2.split(symbol);
  mask2 = mask2 || mask;
  mask = mask.split(symbol);
  mask2 = mask2.split(symbol);
  for (var i = 0, len = addr1.length; i < len; i += 1) {
    res1.push(parseInt(prefix + addr1[i]) & parseInt(prefix + mask[i]));
    res2.push(parseInt(prefix + addr2[i]) & parseInt(prefix + mask2[i]));
  }

  return res1.join(symbol) == res2.join(symbol)
}

// 子网掩码转换 255.255.255.0 转 24
function netmask2CIDR(netmask) {
  return (
    netmask
      .split(".")
      .map(Number)
      .map((part) => (part >>> 0).toString(2))
      .join("")
      .split("1").length - 1
  );
}

// CIDR转换：24 转 255.255.255.0
function cidr2Netmask(bitCount) {
  var mask = [];
  for (var i = 0; i < 4; i++) {
    var n = Math.min(bitCount, 8);
    mask.push(256 - Math.pow(2, 8 - n));
    bitCount -= n;
  }
  return mask.join(".");
}

// 测试用例
const testCases = [
  { ip1: '192.168.1.1', cidr1: 24, ip2: '192.168.1.2', cidr2: 24, expected: true },
  { ip1: '192.168.1.1', cidr1: 24, ip2: '192.168.2.1', cidr2: 24, expected: false },
  { ip1: '10.0.0.1', cidr1: 8, ip2: '10.1.2.3', cidr2: 16, expected: false },
  { ip1: '172.16.0.1', cidr1: 16, ip2: '172.16.0.2', cidr2: 24, expected: true },
  { ip1: '192.168.1.1', cidr1: 24, ip2: '192.168.1.129', cidr2: 25, expected: false },
  { ip1: '2001:db8::1', cidr1: 32, ip2: '2001:db8::2', cidr2: 32, v6: true, expected: true },
  { ip1: '2001:db8:0:1::1', cidr1: 48, ip2: '2001:db8:0:2::1', cidr2: 48, v6: true, expected: true },
];

testCases.forEach(({ ip1, cidr1, ip2, cidr2, v6 = false, expected }) => {
  const netmask1 = cidr2Netmask(cidr1);
  const netmask2 = cidr2Netmask(cidr2);
  const result = isEqualSegment(ip1, ip2, netmask1, v6, netmask2);
  console.log(`IP地址 ${ip1}/${cidr1} 和 ${ip2}/${cidr2} 是否在同一网段: ${result}，预期结果: ${expected}`);
});

// 方案二：
function ipToBinary(ip) {
  return ip.split('.').map(Number).map(num => num.toString(2).padStart(8, '0')).join('');
}

function binaryToIp(binary) {
  return binary.match(/.{1,8}/g).map(bin => parseInt(bin, 2)).join('.');
}

function cidrToSubnetMask(cidr) {
  let mask = '';
  for (let i = 0; i < 32; i++) {
    mask += i < cidr ? '1' : '0';
  }
  return binaryToIp(mask);
}

function isSameSubnet(ip1, cidr1, ip2, cidr2) {
  const subnetMask1 = cidrToSubnetMask(cidr1);
  const subnetMask2 = cidrToSubnetMask(cidr2);

  const ip1Binary = ipToBinary(ip1);
  const ip2Binary = ipToBinary(ip2);
  const subnetMask1Binary = ipToBinary(subnetMask1);
  const subnetMask2Binary = ipToBinary(subnetMask2);

  const networkAddress1 = binaryToIp(ip1Binary.split('').map((bit, i) => bit & subnetMask1Binary[i]).join(''));
  const networkAddress2 = binaryToIp(ip2Binary.split('').map((bit, i) => bit & subnetMask2Binary[i]).join(''));

  return networkAddress1 === networkAddress2;
}
