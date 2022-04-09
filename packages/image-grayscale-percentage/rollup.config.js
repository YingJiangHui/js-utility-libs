import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import babel from 'rollup-plugin-babel';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import React from 'react';
import ReactDOM from 'react-dom';
export default [{
  input: ['lib/react-demo.tsx'],
  output: [{
    sourcemap:true,
    dir: 'dist/umd',
    format: 'cjs', // browser & node
    name: 'aaa'
  }],
  plugins:[
    replace({
      "process.env.NODE_ENV": JSON.stringify("development")
    }),
    nodeResolve(),
    commonjs({
      include: /node_modules/,
      namedExports: {
        'react': Object.keys(React),
        'react-dom': Object.keys(ReactDOM),
      }
    }),
    typescript(),babel({
    presets: ["@babel/preset-react"],
    exclude: 'node_modules/**', // 不检查node_modules里的文件
    runtimeHelpers: true,
    extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".ts"] // 哪些文件需要babel transform
  })]
}];