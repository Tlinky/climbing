# call() 和 bind()

call() 和 bind() 都是 JavaScript 函数提供的方法，用于管理函数的执行上下文（即 this 值），但它们在使用和功能上有一些区别。

## call() 方法

call() 方法立即调用函数，并指定函数执行时的 this 值和参数。

语法：function.call(thisArg, arg1, arg2, ...)

第一个参数 thisArg 是要将函数绑定到的对象，即函数在执行时的 this 值。
后续参数 arg1, arg2, ... 是传递给函数的参数。**调用 call() 方法会立即执行函数。**

## bind() 方法

bind() 方法创建一个新函数，并将原始函数绑定到指定的对象作为新函数的 this 值。

语法：function.bind(thisArg, arg1, arg2, ...)

第一个参数 thisArg 是要将函数绑定到的对象，即新函数在执行时的 this 值。
后续参数 arg1, arg2, ... 是预先传递给函数的参数。这些参数会作为新函数的参数，但是在调用 bind() 方法后不会立即执行函数。
bind() 方法返回一个绑定了指定 this 值和参数的新函数，**需要手动调用该函数才能执行。**

## 总结

call() 方法直接调用函数，并指定函数执行时的 this 值和参数。
bind() 方法创建一个新函数，并将原始函数绑定到指定的对象作为新函数的 this 值，可以在稍后的时间点调用该新函数。
需要注意的是，无论是 call() 还是 bind()，它们都不会改变原始函数本身，而只是改变函数在执行时的上下文。

## 具体使用场景实例

背景说明：一个 scan 按钮，点击后执行扫描事件 scan_wifi，现在要在这个按钮前增加一个判断弹窗，确认后再进行按钮事件，
但原先的 scan_wifi 函数中有调用 this,如何在不改变 scan_wifi 的情况下增加一个 scan_wifi_before 函数

### 最简单的办法

使用箭头函数

### 不用箭头函数如何实现

先前的实现

```javascript
scan.click(scan_wifi);
```

错误实例

```javascript

function scan_wifi_before(e, mode) {
  if (mode === 0) {
    var dialog = new UI.dialog({
      content: '你要执行这个操作吗？',
      buttons: [
        {
          value: '确认',
          type: 'primary',
          events: function () {
            dialog.remove();
            scan_wifi(e);
          },
        },
        {
          value: '取消',
          type: 'primary',
        },
      ],
    });
    return;
  }
  scan_wifi(e);
}

scan.click(function(e) {
  scan_wifi_before(e, mode);
})

```

改进实现

```javascript

// 注意此时bind和call改变了this指向
function scan_wifi_before(e, mode) {
  if (mode === 0) {
    var dialog = new UI.dialog({
      content: '你要执行这个操作吗？',
      buttons: [
        {
          value: '确认',
          type: 'primary',
          events: function () {
            dialog.remove();
            scan_wifi.call(this, e);
          }.bind(this),
        },
        {
          value: '取消',
          type: 'primary',
        },
      ],
    });
    return;
  }
  scan_wifi.call(this, e);
}

// 这里将scan_wifi_before的this指向与该匿名函数一致，此时scan_wifi_before的this指向就与先前的scan_wifi的this指向一致
scan.click(function(e) {
  scan_wifi_before.call(this, e, mode);
});

```
