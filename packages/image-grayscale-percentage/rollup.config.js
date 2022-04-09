import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
export default [{
  input: 'lib/image-grayscale-percentage.ts',
  output: {
    sourcemap:true,
    dir: 'dist/umd',
    format: 'umd', // browser & node
    name: 'aaa'
  },
  plugins:[nodeResolve(),typescript()]
}];