let value;
const reactive = (obj) => {
  value = obj.a;

  Object.defineProperty(obj, "a", {
    get: () => {
      return value;
    },
    set: (val) => {
      value = val;
      fn();
    }
  });

  return obj;
};

// 测试
var obj = reactive({ a: 1 });
var fn = () => {
  console.log('fn执行: ', obj.a);
};

fn();

obj.a = 2;

