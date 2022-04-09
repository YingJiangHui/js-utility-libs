import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import babel from "rollup-plugin-babel";

export default [{
  input: ['packages/image-grayscale-percentage/lib/image-grayscale-percentage.ts'],
  output: [{
    dir: './packages/image-grayscale-percentage/dist/umd',
    format: 'umd', // broswer
    name: 'aaa'
  },{
    dir: './packages/image-grayscale-percentage/dist/cjs',
    format: 'cjs', // node
    name: 'ccc'
  }],
  plugins:[nodeResolve(),typescript(),babel({
    exclude: 'node_modules/**' // 只编译我们的源代码
  })]
}];