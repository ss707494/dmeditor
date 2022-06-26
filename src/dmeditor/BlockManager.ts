import React, { ReactElement } from "react";
import { BlockData } from "./Main";

export interface RenderMainProps{
    data:BlockData,
    isActive:boolean, 
    onChange?:(data:any)=>void,
    onUpdateProperty?:(data:any)=>void
}

export interface RenderSettingProps{
    data:BlockData, 
    onSetting: any, 
    params?:any
}

export interface BlockTypeMenu{
    text: string,
    category: string,
    icon: ReactElement
}

export interface BlockHandler {
    type:string;
    menu: BlockTypeMenu;
    canSelectElement?: boolean,
    getDefaultData: ()=>BlockData;    //when block type is selected
    renderMain: React.FC<RenderMainProps>,       
    renderSetting: React.FC<RenderSettingProps>
}

var blockHandlers:{[key:string]: BlockHandler;} ={};

var blockHandlerArray: Array<BlockHandler> = [];

export const blockManager = {  
    registerBlockType: (handler:BlockHandler)=>{
        blockHandlers[handler.type] = handler;
    },

    getBlockType: (type:string): BlockHandler=>{
        return blockHandlers[type];
    },

    getBlockTypes:()=>{        
        return blockHandlers;
    }
}