/**
 * IP转数字
 * @param {string} ip
 * @returns
 */
function ip2int(ip) {
	let num = 0;
	ip = ip.split('.');
	num = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256 + Number(ip[2]) * 256 + Number(ip[3]);
	num = num >>> 0;
	return num;
}

/**
 * 获取主机数
 * @param netMask
 * @returns {Number}
 */
function getHostNumber(netMask) {
	var hostNumber = 0;
	var netMaskArray = new Array();
	for (var i = 0; i < 4; i++) {
		netMaskArray[i] = netMask.split('.')[i];
		if (netMaskArray[i] < 255) {
			hostNumber = Math.pow(256, 3 - i) * (256 - netMaskArray[i]);
			break;
		}
	}

	return hostNumber;
}

/**
 * 计算子网起始地址(不包括网络地址)
 */
function getLowAddr(ip, netMask) {
	var lowAddr = '';
	var ipArray = new Array();
	var netMaskArray = new Array();
	// I参数不正确
	if (4 != ip.split('.').length || '' == netMask) {
		return '';
	}
	for (var i = 0; i < 4; i++) {
		ipArray[i] = ip.split('.')[i];
		netMaskArray[i] = netMask.split('.')[i];
		if (ipArray[i] > 255 || ipArray[i] < 0 || (netMaskArray[i] > 255 && netMaskArray[i] < 0)) {
			return '';
		}
		ipArray[i] = ipArray[i] & netMaskArray[i];
	}
	// 构造最小地址
	for (var i = 0; i < 4; i++) {
		if (i == 3) {
			ipArray[i] = ipArray[i] + 1;
		}
		if ('' == lowAddr) {
			lowAddr += ipArray[i];
		} else {
			lowAddr += '.' + ipArray[i];
		}
	}
	return lowAddr;
}
/**
 * 计算子网终止地址（不包括广播地址）
 */
function getHighAddr(ip, netMask) {
	var lowAddr = getLowAddr(ip, netMask);
	var hostNumber = getHostNumber(netMask);
	if ('' == lowAddr || hostNumber == 0) {
		return ip;
	}

	var lowAddrArray = new Array();
	for (var i = 0; i < 4; i++) {
		lowAddrArray[i] = lowAddr.split('.')[i];
		if (i == 3) {
			lowAddrArray[i] = Number(lowAddrArray[i] - 1);
		}
	}
	lowAddrArray[3] = lowAddrArray[3] + Number(hostNumber - 1);
	if (lowAddrArray[3] > 255) {
		var k = parseInt(lowAddrArray[3] / 256);
		lowAddrArray[3] = lowAddrArray[3] % 256;
		lowAddrArray[2] = Number(lowAddrArray[2]) + Number(k);
		if (lowAddrArray[2] > 255) {
			k = parseInt(lowAddrArray[2] / 256);
			lowAddrArray[2] = lowAddrArray[2] % 256;
			lowAddrArray[1] = Number(lowAddrArray[1]) + Number(k);
			if (lowAddrArray[1] > 255) {
				k = parseInt(lowAddrArray[1] / 256);
				lowAddrArray[1] = lowAddrArray[1] % 256;
				lowAddrArray[0] = Number(lowAddrArray[0]) + Number(k);
			}
		}
	}

	var highAddr = '';
	for (var i = 0; i < 4; i++) {
		if (i == 3) {
			lowAddrArray[i] = lowAddrArray[i] - 1;
		}
		if ('' == highAddr) {
			highAddr = lowAddrArray[i];
		} else {
			highAddr += '.' + lowAddrArray[i];
		}
	}

	return highAddr;
}

/**
 * 计算开始/结束地址
 */
function calcSubNetting(ip, mask) {
	if (ip2int(mask) > ip2int('255.255.255.0')) {
		var max = getHighAddr(ip, mask).split('.')[3] || '';
		var min = Math.min(Number(ip.split('.')[3]) + 1, 255);
		var _limit = Math.max(max - min + 1, 0);

		return { start: min + '', limit: _limit + '' };
	}

	return { start: '100', limit: '100' };
}

/**
 * 方法: 返回ip和子网掩码相与的结果
 * 作用: 确保ip在子网掩码内有效
 */
function ipMixMask(ip, mask) {
	var res = [];
	var ipArr = ip.split('.');
	var maskArr = mask.split('.');
	for (var i = 0, len = ipArr.length; i < len; i += 1) {
		res.push(parseInt(ipArr[i]) & parseInt(maskArr[i]));
	}
	return res.join('.');
}