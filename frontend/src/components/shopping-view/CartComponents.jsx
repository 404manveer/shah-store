import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "../ui/button"
import { Minus, Plus, ShoppingCart, Trash } from "lucide-react"

function CartComponents({cart=[]}) {
  console.log(cart);
  
  return (
<Sheet>
  <SheetTrigger>
    <Button variant="outline"  >
        <ShoppingCart className=" w-6 h-6 "  />
        <span className="sr-only" >shoppin cart</span>

      </Button></SheetTrigger>
  <SheetContent className='bg-white   ' >
    <SheetHeader>
      <SheetTitle className='text-[26px]' >Cart</SheetTitle>
      <SheetDescription className=' mt-8 flex flex-col gap-6 ' >
        {cart?.map((item,idx)=>{
          return(
             <div key={idx} className="flex gap-8  " >
            {/* img */}
            <div className="size-20 shrink-0  overflow-hidden border " >
                <img src={item?.product?.image} alt="" />

            </div>
            <div className="flex justify-between w-full " >
               <div className="" >
                 <h2 className=" font-semibold text-lg " > {item?.product.title} </h2>
                <div className="flex items-center gap-1 mt-2" >
                    <Minus className=" w-4 h-4  " />
                    <span className=" mx-2 " >{item?.quantity}</span>
                    <Plus className="size-4" />
                </div>
               </div>

               <div>
                <span className=" font-bold text-md " >${item?.product?.price}</span>
                <Trash className=" w-5 h-5 ml-4 text-red-600 cursor-pointer mt-2 " />
               </div>
            </div>
        </div>
          )
        })}
       
      
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
  )
}

export default CartComponents