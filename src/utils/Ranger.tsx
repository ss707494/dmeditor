import { Slider, Stack } from "@mui/material"

export const Ranger=(props:{defaultValue?:number ,min:number, max: number, step: number, onChange?:(v:number, event:any)=>void, onFinish?:(v:number)=>void})=>{
    return <Stack spacing={props.defaultValue} direction="row" sx={{ mb: 1 }} alignItems="center">
    <Slider aria-label="Temperature"
  defaultValue={props.defaultValue}
  valueLabelDisplay="auto"
   step={props.step}
  marks
  min={props.min}
  max={props.max}
  onChange={(e:any, v:number|Array<number>)=>{
    if(props.onChange){
      props.onChange(v as number, e);
    }
  }
  }
  onChangeCommitted={(e:any, v:number|Array<number>)=>{
    if(props.onFinish){
      props.onFinish(v as number);
    }
  }
  }
  />
  </Stack>

}