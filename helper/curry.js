/**
 * 给定一个函数 fn，该函数的 length 属性表示它期望接收的参数个数。
 * curry 函数接收这个函数作为参数，并返回一个新的函数 curriedFn
 * @param {*} fn 
 * @returns 
 */
function curry(fn) {
  return function curriedFn(...args) {
    // 检查传入的参数 args 的长度是否大于或等于 fn 函数的期望参数个数
    if(args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      // 如果参数个数不足，则返回一个新的匿名函数，在调用时将之前的参数 args 和当前传入的参数 args2 通过 concat 方法合并起来，并递归调用
      return function(...args2) {
        return curriedFn.apply(this, args.concat(args2));
      }
    }
  }
}

function add(x, y) {
  return x + y;
}

const curriedAdd = curry(add);

console.log(curriedAdd(1)(2));
console.log(curriedAdd(1, 2));
console.log(curriedAdd(1, 2, 3));


// 总结：使用闭包和递归的方式创建一个可重复调用并部分应用参数的函数