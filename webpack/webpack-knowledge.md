# Webpack

## sourcemap

- sourcemap是为了解决开发代码与实际运行代码不一致不方便debug的问题，sourcemap帮助我们debug到原始开发（未经压缩合并）的代码
- webpack通过配置可以自动给我们 `source maps` 文件， `map` 文件是一种对应编译文件和源文件的方法

- mappings

  | 位置   | 含义                                      |
  | ------ | ----------------------------------------- |
  | 第一位 | 表示这个位置在（转换后代码的）第几列      |
  | 第二位 | 表示这个位置属于sources属性中的哪一个文件 |
  | 第三位 | 表示这个位置属于转换前代码的第几行        |
  | 第四位 | 表示这个位置属于转换前代码的第几列        |
  | 第五位 | 表示这个位置属于names属性中的哪一个变量   |

  > 所有的值都是以0作为基数。第五位不是必须的，如果该位置没有对应names属性中的变量，可以省略第五位。每一位都采用VLQ编码表示；由于VLQ编码是变长的，所以每一位可以由多个字符构成。

  > 如果某个位置是AAAAA，由于A在VLQ编码中表示0，因此这个位置的五个位都是0。它的意思是，该位置在转换后代码的第0列，对应sources属性中第0个文件，属于转换前代码的第0行第0列，对应names属性中的第0个变量。

  - VLQ编码

    1. 将137改写成二进制形式 10001001

       `let binary = (137).toString(2);`

    2. 七位一组做分组，不足的补0 `0000001 0001001`

       `let padded = binary.padStart(Math.ceil(binary.length/7)*7, '0');`

    3. 最后一组开头补0，其余补1 `10000001 00001001`

       `let groups = padded.match(/\d{7}/g);`

       `groups = groups.map((item, index) => (index === groups.length - 1 ? '0' : '1') + item);`

        `let vlqCode = groups.join('');`

  - Base64 VLQ



## Plugin

| 插件名称                       | 插件描述                                                     |
| ------------------------------ | ------------------------------------------------------------ |
| html-webpack-plugin            | 根据模板生产html的插件                                       |
| webpack.SourceMapDevToolPlugin | webpack内置的精确控制sourcemap的插件                         |
| filemanager-webpack-plugin     | 文件管理插件，在打包前后操作文件（copy、move、delete、mkdir、archive[打包压缩]） |
|                                |                                                              |
|                                |                                                              |

