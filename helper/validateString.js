/**
 * Describe: 产品对不同输入框的输入限制经常有如下:
 * - 允许输入：大小写字母、数字、'+'、'/'、'='
 * - 允许输入：大小写字母、数字、'.'、'('
 * - 允许输入：数字、'.'、'/'
 * 在特殊字符一项对不同的使用场景会有不同的限制，开发每次都会单独再写一个正则
 * 为了避免出错和提效，这里把它们整合在一起方便使用只要传入需要支持的规则key即可
 * 参考MDN: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_expressions
 */

/**
 * 验证给定的字符串是否符合指定的字符集。
 *
 * @param {string} str - 要验证的字符串。
 * @param {Array<string>} [baseCase=['letter', 'number']] - 指定要包含的基本字符集的数组。
 * @param {string} [extraChars=''] - 验证中要包含的附加字符.
 */
function validateString(str, baseCase = ["letter", "number"], extraChars = "") {
  var baseLimit = "";
  if (baseCase.includes("number")) {
    baseLimit += "0-9";
  }
  if (baseCase.includes("letter")) {
    baseLimit += "a-zA-Z";
  }
  // 使用正则表达式转义函数来处理特殊字符
  var escapeRegex = function (s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };
  // 构建正则表达式，匹配大小写字母、数字以及额外支持的字符
  var pattern = new RegExp(`^[${baseLimit}${escapeRegex(extraChars)}]+$`);
  return pattern.test(str);
}

// 这里是为了提供错误提示语文案
function addQuotesAndJoin(str) {
  var characters = str.split("");
  var quotedCharacters = characters.map(function (char) {
    return "'" + char + "'";
  });
  return quotedCharacters.join("、");
}
