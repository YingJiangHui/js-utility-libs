import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
export default {
  input: ['packages/image-grayscale-percentage/lib/image-grayscale-percentage.js','packages/image-grayscale-percentage/lib/xxx.ts'],
  output: [{
    dir: 'dist/amd',
    format: 'amd' // broswer
  },{
    dir: 'dist/cjs',
    format: 'cjs' // node
  }],
  plugins:[nodeResolve(),typescript()]
};