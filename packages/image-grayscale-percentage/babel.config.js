module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {targets: {node: 'current'}}
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: true,
        helpers:true,
        "corejs": {
          "version": 3,
          "proposals": true
        },
        "useESModules": true
      }
    ]
  ]
}