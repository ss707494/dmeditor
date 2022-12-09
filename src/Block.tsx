import { AddBoxOutlined } from "@mui/icons-material"
import React from "react"
import { useEffect, useRef, useState,useCallback} from "react"
import { getDef } from "./ToolDefinition"
import { Util } from './utils/Util';
import _debounce from 'lodash/debounce'

export type BlockInfo = {
    type: string
    content?: any,
    settings?: any,
}

interface BlockProps{
    data: any,
    active?:boolean,
    adding?:boolean,
    onActivate?: ()=>void,
    onAddAbove?:any,
    onAddUnder?:any,
    onChange:(data:any)=>void,
    onCancel?:()=>void,
    view?:boolean,
    inBlock?:boolean,
    //undefined means can not have sibling
    siblingDirection?:'vertical'|'horizontal',
}

export const Block = React.memo((props:BlockProps)=>{
    const [isActive, setIsActive] = useState(props.active?true:false);
    // const ref:any = useRef();
    // useOnClickOutside(ref, () => changeActive(false));

    //update is active from props
    useEffect(()=>{
      setIsActive(props.active?true:false)
    }, [props.active]);

    const activeBlock = ()=>{
      setIsActive(true);
      if(props.onActivate){
        props.onActivate();
      }
    }

    const onDataChange = (data:any,debounce?:boolean) =>{ 
      if(debounce){
        debounceSave(data) 
      }else{
        props.onChange(data);
      }
    }
    const debounceSave = useCallback(_debounce((data:any)=>{
      props.onChange(data);
    }, 500), []);

    const render = ()=>{
        let def = getDef( props.data.type );
        if( def){
            if(props.view){
                let ViewRender = def.view;                
                return <ViewRender data={props.data} />
            }else{
                let ToolRender = def.render;
                return <ToolRender adding={props.adding} inBlock={props.inBlock?true:false} onChange={(data:any,debounce?:boolean)=>{onDataChange(data,debounce)}} data={props.data} active={isActive} onCancel={props.onCancel} />
            }
        }else{
            return 'Unknown type:'+props.data.type;
        }
    };

    return <div className={'block-container'+(isActive?' active':'')+(props.inBlock?' inblock':'')} onClick={(e:any)=>activeBlock()}>
            {isActive&&props.siblingDirection==='vertical'&&<div className="tool tool-above">                             
                            <a className="tool-item" href="/" title="Add above" onClick={(e)=>{e.preventDefault();props.onAddAbove()}}>
                                <AddBoxOutlined /></a>
                        </div>}   
                        <div className={"pre-render"}>
                          {Util.renderPreBlock({blockData:props.data.dm_field?props.data.dm_field:''})}
                          </div>         
        <div className={"block block-type-"+props.data.type}>
        {render()}  
        </div>   
    {isActive&&props.siblingDirection==='vertical'&&<div className="tool tool-under">                             
                <a className="tool-item" href="/" title="Add under" onClick={(e)=>{e.preventDefault();props.onAddUnder()}}><AddBoxOutlined /></a>
            </div>}  
    </div>

});

//block: type, required, max, min, containerProperties
//container: allowedType, 
//common: activatedOnSelect(boolean)

//next: trigger
export const DefBlock = (props:{required:boolean, type:string, 
    min?:number, 
    allowedSettings?: string[],
    onActivate?:()=>void,
    active?:boolean,
    max?:number})=>{
    let defaultData = getDef(props.type).initData;
    return <Block onChange={()=>{}} data={defaultData} onActivate={props.onActivate} />
}


const useOnClickOutside = (ref:any, handler:any)=> {
    useEffect(
      () => {
        const listener = (event:any) => {
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          handler(event);
        };
  
        document.getElementById('dmeditor-main')?.addEventListener("mousedown", listener);
        document.getElementById('dmeditor-main')?.addEventListener("touchstart", listener);
  
        return () => {
          document.getElementById('dmeditor-main')?.removeEventListener("mousedown", listener);
          document.getElementById('dmeditor-main')?.removeEventListener("touchstart", listener);
        };
      },
      [ref, handler]
    );
}