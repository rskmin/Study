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



## 