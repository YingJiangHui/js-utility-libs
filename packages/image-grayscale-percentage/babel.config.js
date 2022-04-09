module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        // polyfill 文档：https://www.imyangyong.com/blog/2020/03/babel/core-js@3%E4%B9%8Bbabel%20polyfill/
        "useBuiltIns": "usage", // usage仅为每个文件添加其使用的polyfill， "usage" | "entry" | false, defaults to false。
        "corejs": 3 // corejs版本，corejs是专门用来做polyfill的
      }
    ]
  ]
}