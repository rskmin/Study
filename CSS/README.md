# CSS

## 盒子模型

### 基本概念

- margin、border、padding、content。在网页中，一个元素占有空间的大小由几个部分构成，其中包括元素的内容(content)、元素的内边距(padding)，元素的边框(border)、元素的外边距(margin)四个部分。这四个部分占有的空间中，有的部分可以显示其相应的内容，有的部分只用来分割相邻的区域,这4个部分一起构成了css中元素的盒模型

### 盒模型分类

- W3C盒子模型(标准盒模型)：`box-sizing: content-box;` 默认设置，元素内容占据的空间(content)是由 `width` 属性设置的，而 `padding` 和 `border` 是另外设置的
- IE盒子模型(怪异盒模型): `box-sizing: border-box` width = content + padding + border

## Flex 布局

### 容器属性

- flex布局一般用于单轴线的元素布局，当然也可以设置 `flex-wrap: wrap | wrap-reverse;` 进行多轴线布局

- `flex-direction: row<default> | column | row-reverse | column-reverse;` 元素控制排列方向
- `flex-flow: <flex-direction> <flex-wrap>` 缩写
- `justify-content` 属性定义主轴上的对齐方式， `align-items` 定义在交叉轴上的对齐方式， `align-content` 定义多轴线的对齐方式

### 项目属性

- `order` 定义元素的排列顺序
- `flex-basis: auto<default>` 定义了在分配多余空间之前，项目占据的主轴空间。浏览器根据这个属性计算剩余空间大小
- `flex-grow: 0<default>;` 根据剩余空间放大，`flex-shrink: 1<default>` 根据剩余空间缩小，`flex：<flex-grow> <flex-shrink> <fiex-basis> `  前三个的缩写 俩个快捷值 `auto (1 1 auto)` `none (0 0 auto)`

- `align-self` 单独设置 `align-items` 属性



## 流式布局

### BFC（块格式化上下文）

> BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

- 布局规则

```
1.内联元素沿内联方向显示，即根据文档的书写模式在单词中显示单词的方向，块元素会在垂直方向一个接一个的放置
2.属于同一个BFC的两个相邻BOX的margin会重叠；不同BFC就不会
3.是页面上一个隔离的独立容器，里面的元素不会影响到外面的元素；反之亦然
4.BFC的区域不会和float box重叠
5.计算BFC的高度，浮动元素也参与计算
```

- 应用场景

```
1.清除内部的浮动，触发父元素的BFC属性，会包含float元素
  防止浮动导致父元素高度塌陷父级设置overflow：hidden，元素float:right
2.分属于不同的BFC，可以阻止margin重叠
  避免margin重叠，两个块相邻就会导致外边距被折叠，给中间的设置BFC就会避免，方法就是套个父级设置overflow：hindden
3.阻止元素被浮动元素覆盖，各自是独立的渲染区域；
4.自适应两栏布局
```

### IFC（内联格式化上下文）

