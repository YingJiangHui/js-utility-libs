import replace from "@rollup/plugin-replace";
import {nodeResolve} from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import babel from "rollup-plugin-babel";

export default {
  plugins:[
    replace({
      "process.env.NODE_ENV": JSON.stringify("development")
    }),
    nodeResolve(),
    commonjs({
      include: /node_modules/,
    }),
    typescript(),babel({
      presets: ["@babel/preset-react"],
      exclude: 'node_modules/**', // 不检查node_modules里的文件
      runtimeHelpers: true,
      extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".ts"] // 哪些文件需要babel transform
    })]
}