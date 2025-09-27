import React, { useEffect, useState } from "react";
import Filter from "../../components/shopping-view/filter";
import { sortoption } from "../../data";
import { ArrowUpDown } from "lucide-react";
import {Button}from "../../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../../components/ui/dropdown-menu";

const listing = () => {

const [sortby, setsortby] = useState("price-lowToHigh")
const [filter, setfilter] = useState({})


const hanldefiltering = (key,value)=>{
 let cpyfilter = {...filter}
 if(!cpyfilter[key]){
   cpyfilter[key]=[value]
 }else{
  if(cpyfilter[key].includes(value)){
    cpyfilter[key] = cpyfilter[key].filter((v)=>v !==value)
  }else{
    cpyfilter[key].push(value)
  }
 }
setfilter(cpyfilter)
 sessionStorage.setItem("filter",JSON.stringify(cpyfilter))
 console.log("sdfsd",cpyfilter);

}

useEffect(()=>{
  setfilter(JSON.parse(sessionStorage.getItem("filter")))
},[])

// const hanldefiltering = (key,value)=>{
//  let cpyfilter = {...filter}
//  const currentkey = Object.keys(cpyfilter).indexOf(key)

//  if(currentkey === -1){
//   cpyfilter ={...cpyfilter,[key]:[value]}
//  }else{
//   const currentvalue = cpyfilter[key].indexOf(value)
//  if(currentvalue=== -1){
//   cpyfilter[key].push(value)
//  }else{
//   cpyfilter[key].splice(currentvalue,1)

//  }
  
  
//  }
//  setfilter(cpyfilter)
//  sessionStorage.setItem("filter",JSON.stringify(cpyfilter))
//  console.log(cpyfilter);
// }



  return (
    <section className="bg-slate-200 pt-24 pb-10 ">
      <div className="container  ">
        <main className="grid grid-cols-1 md:grid-cols-[300px_1fr]  gap-4 mt-4  px-6  ">
          <Filter filter={filter} hanldefiltering={hanldefiltering}   />
          <div className="    ">
            {/* all product bar */}
            <div className=" flex justify-between shadow-md p-4   ">
              <div className="  ">
                <h2 className=" font-bold text-lg text-center  ">
                  All Products
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <span className=" text-md text-gray-500 ">10 products</span>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="flex gap-1 items-center text-white  ">
                      <ArrowUpDown className=" w-4 h-4 " /> sort by
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="left" className="w-[200px] bg-white  " >
                    <DropdownMenuRadioGroup>
                      {sortoption.map((item) => (
                        <DropdownMenuRadioItem onClick={()=>{setsortby(item.id) 
                           console.log(item.id);
                        }}  value={item.id} key={item.id} >
                          {item.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {/* all product bar end */}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-4 " >

            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default listing;


