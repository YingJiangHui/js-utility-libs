import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
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
  plugins:[nodeResolve(),typescript()]
}];