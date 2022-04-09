import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import babel from 'rollup-plugin-babel';

export default [{
  input: 'lib/image-grayscale-percentage.ts',
  output: {
    sourcemap:true,
    dir: 'dist/umd',
    format: 'umd', // browser & node
    name: 'aaa'
  },
  plugins:[nodeResolve(),typescript(),babel({
    exclude: 'node_modules/**', // 只编译我们的源代码
    runtimeHelpers: true,
    sourceMap: true,
    extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".ts"]
  })]
}];