import React from 'react'
import { filterData } from '../../data'
import {Checkbox} from "../ui/checkbox"
import {cn} from "../../lib/utils"

const  Filter = ({filter,hanldefiltering,className}) => {
  return (
    <div className={cn('   shadow-sm rounded-xl bg-white  p-4  ',className)}>
        <div className=' ' >
            <h2 className='text-lg font-bold  ' >Filter</h2>
        </div>
        <div className='grid gap-2  ' >
            {
                Object.keys(filterData).map((menuitem)=>{
                    return(
                        <div key={menuitem} >
                         <h3 className='font-semibold text-md mt-4 capitalize ' >{menuitem}</h3>
                         <div>
                           {
                                filterData[menuitem].map((item)=>{
                                    return(
                                      <div  key={item.label} className='flex gap-2 items-center mt-2' >
                                        <Checkbox className='text-white' checked={filter && filter[menuitem] && filter[menuitem].includes(item.label)} onCheckedChange={()=>hanldefiltering(menuitem,item.label)} />    {item.label}
                                      </div>
                                    )
                                })
                            }
                              
                         </div>

                        </div>
                    )
                })
            }

        </div>
    </div>
  )
}


export default Filter




function searchparamshandler(filter){

  const queryparams = []
   
  for(const[key,value] of Object.entries(filter)){
  if(Array.isArray(value) && value.length >0){
  const paravalue = value.join(",")
  queryparams.push(`${key}=${encodeURIComponent(paravalue)}`)
  }
  }
  return queryparams.join('&')
}