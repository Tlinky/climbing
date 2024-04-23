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
	var symbol = v6 ? ':' : '.';
	var prefix = v6 ? '0x' : '';
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
	if (res1.join(symbol) == res2.join(symbol)) {
		// console.log("在同一个网段");
		return true;
	} else {
		// console.log("不在同一个网段");
		return false;
	}
}