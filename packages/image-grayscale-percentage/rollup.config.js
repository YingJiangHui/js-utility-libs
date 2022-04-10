// @ts-ignore
import rollupConfigCommon from '../../rollup.config.common.js'

export default [{
  input: ['lib/image-grayscale-percentage.ts'],
  output: [{
    sourcemap:true,
    dir: 'dist/es',
    format: 'es', // browser & node
  }],
}].map((config)=>({...rollupConfigCommon,...config}));