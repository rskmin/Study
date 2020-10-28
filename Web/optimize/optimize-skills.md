# 网站优化技巧

## 减少传输的数据量

### 减少请求

### 缩小资源

> 缩小是从基于文本的资源中去除所有空白和非必要字符的全过程

#### 工具

```bash
npm install -g minifier html-minify
```

#### 目标

- css
- js
- html
  - html的空白对布局可能会产生影响所以特殊处理

### 服务器压缩

> 合并文件，减小文件体积

#### 工具

```bash
npm install compression 
```

#### 目标

- 文本

### 图像压缩

> 丢弃图像中不必要的数据，并且不明显影响图像视觉质量

## 图片延迟加载

- 项目中，如果一开始加载页面，就把所有的真实图片也加载，不论是从网络消耗上，还是从页面渲染上都是非常消耗性能的，导致页面加载过慢

### 优化 - 延迟加载

> 用默认背景占位,当图片盒子出现在用户视口的时候才进行加载

### 方案

- getBoundingClientRect 获取dom元素距离可视窗口的信息

- 使用 DOM 监听器 IntersectionObserver，监听DOM 元素和视口的交叉信息

  ```js
  let ob = new IntersectionObserver(changes => {
    // changes 是一个数组，包含所有监听的 DOM 元素和视口的交叉信息
    let item = changes[0],
        {
          isIntersecting,
          target,
        } = item;
    if (isIntersection) { // 完全出现
  		singleLazy();
      ob.unobserve(lazyImageBox); // 加载图片后移除监听
    }
  }, {
    threshold: [1] // 完全出现触发
  });
  ob.observe(lazyImageBox);
  ```

  