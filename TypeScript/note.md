# TS Note

- npm i typescript -g

- npm i ts-node -g

## enum

- 普通枚举

```ts
enum Gender {
  GIRL,
  BOY,
}
```

```ts
(function (Gender) {
    Gender[Gender["GIRL"] = 0] = "GIRL";
    Gender[Gender["BOY"] = 1] = "BOY";
})(Gender || (Gender = {}));
```

- 常量枚举

```ts
const enum Color {
  RED, YELLOW, BLUE,
}
```

```ts
var myColor = [2 /* BLUE */, 0 /* RED */, 1 /* YELLOW */];
```

> 常量枚举更加节约内存开销