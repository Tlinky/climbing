# React re-render

## 什么是必要和不必要的重新渲染？

### 必要的重新渲染

重新渲染作为更改源的组件
例如：用户在输入字段时，对应的字段值显示需要更新

### 不必要的重新渲染

由于错误或应用架构效率低下导致的重新渲染
例如：用户在输入字段时，整个页面发生了更新

另外，不必要的重新渲染本身不是问题：React 非常快，通常能够在用户不注意任何事情的情况下处理它们,但是，如果重新渲染发生得太频繁和/或在非常重的组件上发生，这可能会导致用户体验出现“滞后”，每次交互都出现明显的延迟，甚至应用程序变得完全无响应

## React组件何时会重新渲染？

1. 状态改变 - state changes
2. 父级重新渲染 - parent re-renders
3. 上下文改变 - context changes
4. hooks改变 - hooks changes

## 如何减少不必要的重新渲染

1. 状态下放到子组件
2. 使用React.memo 配合 useCallback

## 我们需要怎么做

让组件保持必要的重新渲染，减少不必要的重新渲染

## 参考文档

[The mystery of React Element, children, parents and re-renders](https://www.developerway.com/posts/react-elements-children-parents)
[React re-renders guide: everything, all at once](https://www.developerway.com/posts/react-re-renders-guide)
