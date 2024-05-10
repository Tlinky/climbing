# Element.scrollIntoView()

调用 Element 的 scrollIntoView() 方法会滚动元素的父容器，使被调用 scrollIntoView() 的元素对用户可见

## 使用场景

点击页面上对应锚点跳转到对应位置

## 示例代码

```javascript
function handleJumpTarget(ev) {
  var link = ev.target,
    table = findParent(link, '[data-table]').getAttribute('data-table'),
    chain = link.textContent,
    num = +link.getAttribute('data-num'),
    elem = document.getElementById('rule_%s_%s'.format(table.toLowerCase(), chain));

  if (elem) {
    if (elem.scrollIntoView) {
      elem.scrollIntoView();
    } else {
      (document.documentElement || document.body.parentNode || document.body).scrollTop = elem.offsetTop - 40;
    }
    elem.classList.remove('flash');
    void elem.offsetWidth;
    elem.classList.add('flash');

    if (num) {
      var rule = elem.nextElementSibling.childNodes[num];
      if (rule) {
        rule.classList.remove('flash');
        void rule.offsetWidth;
        rule.classList.add('flash');
      }
    }
  }
}
```
