import React from 'react'
import { filterData } from '../../data'
import {Checkbox} from "../ui/checkbox"

const  Filter = ({filter,hanldefiltering}) => {
  return (
    <div className='shadow-sm rounded-xl bg-white  p-4  '>
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
                                        <Checkbox checked={} onCheckedChange={()=>hanldefiltering(menuitem,item.label)} />    {item.label}
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