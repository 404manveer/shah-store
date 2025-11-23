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
import {useDispatch,useSelector} from "react-redux"
import { fetchshopingProducts, fetchShoppingProductDetail } from "../../store/actions/shoping/shopingProduct";
import { ShoppingProductCard } from "../../components/shopping-view/product-title";
import {  useSearchParams } from "react-router-dom";
import ProductDetail from "../../components/shopping-view/productDetail";
import { addTocartThunk } from "../../store/slices/shoping/cartItemSlice";
import { toast } from "sonner";
import { productListCleaner } from "../../store/slices/shoping/shopingProductSlice";

const Listing = () => {

const [sortby, setsortby] = useState("price-lowToHigh")
const [filter, setfilter] = useState({})
const [searchparams,setsearchparmas] = useSearchParams()
const [openProductDetaialDialogbox,setOpenProdutcDetailDialogbox] = useState(false)



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
}

const createSerachParamsHelper=(filter)=>{

  const querryparams = []
  for( const [key,value] of Object.entries(filter) ){
    if(Array.isArray(value) && value.length >0  ){
      const paramsvalue = value.join(',')
      querryparams.push(`${key}=${paramsvalue}`)

    }
  }
  return querryparams.join('&')
}

const dispatch = useDispatch()

const {ProductList,productDetail} = useSelector(state=>state.shopingProducts)
const {user} = useSelector(state=>state.userReducer)

useEffect(()=>{
  const saved = sessionStorage.getItem('filter');
  setfilter(saved? JSON.parse(saved):{})
},[])

useEffect(()=>{
  if(filter && Object.keys(filter).length>0){
  
    setsearchparmas( new URLSearchParams(createSerachParamsHelper(filter)))
  }
},[filter])

useEffect(()=>{
  dispatch(fetchshopingProducts({filter,sortby}))
},[filter,sortby])

useEffect(() => {
 
  if (productDetail && Object.keys(productDetail).length > 0) {
    setOpenProdutcDetailDialogbox(true);
    
  }
}, [productDetail]);
useEffect(()=>{
  if(!openProductDetaialDialogbox){
    dispatch(productListCleaner())
  }
},[openProductDetaialDialogbox])








const showProductDetailHnadler = (id)=>{
  dispatch(fetchShoppingProductDetail(id))
 
}

const addToCartHandler = async ( productId,quantity=1 )=>{  
 const res = await dispatch(addTocartThunk({productId,quantity,userId:user.id}))
 console.log("addtocartHandler");
 
if(res.payload.success){
  toast.success(res.payload.message)
  
}

}


  return (
    <section className="bg-slate-200 pt-24 pb-10 ">
      <div className="container  ">
        <main className="grid grid-cols-1 md:grid-cols-[180px_1fr]  gap-4 mt-4  px-6  ">
          <Filter filter={filter} hanldefiltering={hanldefiltering} className=' sticky top-24 left-3 h-fit '   />
          <div className="    ">
            {/* all product bar */}
            <div className=" flex justify-between shadow-md p-4   ">
              <div className="  ">
                <h2 className=" font-bold text-lg text-center  ">
                  All Products
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <span className=" text-md text-gray-500 ">{ProductList?.length} Produsts</span>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="flex gap-1 items-center text-white  ">
                      <ArrowUpDown className=" w-4 h-4 " /> sort by
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="left" className="w-[200px] bg-white  " >
                    <DropdownMenuRadioGroup value={sortby} onValueChange={setsortby} >
                      {sortoption.map((item) => (
                        <DropdownMenuRadioItem   value={item?.id} key={item?.id} >
                          {item?.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {/* all product bar end */}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-8 " >   
             {
              ProductList?.map((item)=>{
               return(
                 <ShoppingProductCard key={item.title}  product={item}  addToCartHandler={addToCartHandler}  showProductDetailHnadler={showProductDetailHnadler} />
            
               )

              })
              
             }
             
              

            </div>
          </div>
        </main>
      <ProductDetail open={openProductDetaialDialogbox} setopen={setOpenProdutcDetailDialogbox}  ProductDetails={productDetail} addToCartHandler={addToCartHandler} />
      </div>
      
    </section>
  );
};

export default Listing;


