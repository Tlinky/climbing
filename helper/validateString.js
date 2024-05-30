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

function addQuotesAndJoin(str) {
  var characters = str.split("");
  var quotedCharacters = characters.map(function (char) {
    return "'" + char + "'";
  });
  return quotedCharacters.join("、");
}

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_expressions
