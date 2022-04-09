import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import babel from 'rollup-plugin-babel';

export default [{
  input: ['lib/image-grayscale-percentage.ts'],
  output: [{
    sourcemap:true,
    dir: 'dist/umd',
    format: 'umd', // browser & node
    name: 'aaa'
  }],
  plugins:[nodeResolve(),typescript(),babel({
    exclude: 'node_modules/**', // 不检查node_modules里的文件
    runtimeHelpers: true,
    extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".ts"] // 哪些文件需要babel transform
  })]
}];