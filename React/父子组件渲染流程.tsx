import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [count, setCount] = useState(1)
  console.log(1)
  useEffect(() => {
    console.log(2)
    return () => {
      console.log(3)
    }
  }, [count])

  useEffect(() => {
    console.log(4)
    setCount(count => count + 1)
  }, [])
  return <Child count={count} />
}

function Child({ count }) {
  useEffect(() => {
    console.log(5)
    return () => {
      console.log(6)
    }
  }, [count]);

  return null;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)

// 1 父组件初始化
// 5 子组件渲染，触发第一个useEffect
// 2 父组件首个useEffect执行
// 4 父组件第二个useEffect执行，并触发state change
// 1 state change 导致父组件重新渲染
// 6 父组件重新渲染触发子组件重新渲染，子组件卸载
// 3 父组件卸载
// 5 state change 触发子组件useEffect依赖
// 2 state change 触发父组件useEffect依赖
