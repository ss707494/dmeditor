import { Box, Tabs, Tab } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import {tabCss} from './Tab.css';

export interface TabData{
    title: string,
    element: ReactElement
}

export const PropertyTab = (props:{tabs:Array<TabData>, active?: number})=>{
    const [active, setActive] = useState(props.active?props.active:0);  
    
    useEffect(()=>{
      setActive(props.active?props.active:0)
    },[props.active])

    return (<div className={tabCss()}>
        <div className='tab-header-container'>  
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs  value={false} onChange={(e:any, newValue:number)=>setActive(newValue)}>
                {props.tabs.map((tab:TabData, index:number)=><Tab key={tab.title} style={{textTransform:'none'}} className={index===active?'tab-active':''} label={tab.title} />)}
            </Tabs>    
            </Box>
        </div>
        {props.tabs.map((tab:TabData, index:number)=>
            <div key={tab.title} className="tab-content" style={{display:active==index?'block':'none'}}>{tab.element}</div>)}
    </div>)
}