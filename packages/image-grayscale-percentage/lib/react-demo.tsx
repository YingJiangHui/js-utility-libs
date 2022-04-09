import  React from 'react';
import map from './xxx'
import {FC, PropsWithChildren,HTMLAttributes} from 'react';
console.log(map)
const defaultProps = {}
interface Props  extends HTMLAttributes<any>{

}
type ReactDemoProps = Props & Partial<typeof defaultProps>
const ReactDemo:FC<PropsWithChildren<ReactDemoProps>> = (props)=>{
  const {} = {...defaultProps,...props}
  
  return (<>
    1
  </>)
}

export default ReactDemo