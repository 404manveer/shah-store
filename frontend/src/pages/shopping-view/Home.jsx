import React, { use, useEffect, useState } from "react";
const banner1 ="https://plus.unsplash.com/premium_photo-1664202525979-80d1da46b34b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2xvdGglMjBzaG9wfGVufDB8fDB8fHww";
const banner2 = "https://images.unsplash.com/photo-1577208288347-b24488f3efa5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZSUyMGNvbGxlY3Rpb258ZW58MHx8MHx8fDA%3D";
const banner3 = "https://media.istockphoto.com/id/1134592753/photo/fashionable-handbags-in-a-raw-on-showroom.webp?a=1&b=1&s=612x612&w=0&k=20&c=K-7IkHysMa9rZbi_HWkU2eaOmKebv3S6OabJiwEgeOE=";
import { Card } from "../../components/ui/card";
import { ArrowRight, Carrot, Gift, MoveRight, Pen, Shirt, Shovel } from "lucide-react";
import { ShoppingProductCard } from "../../components/shopping-view/product-title";
import {
  fetchshopingProducts,
  fetchShoppingProductDetail,
} from "../../store/actions/shoping/shopingProduct";
import { useDispatch, useSelector } from "react-redux";
import ProductDetail from "../../components/shopping-view/productDetail";
import { toast } from "sonner";
import { addTocartThunk } from "../../store/slices/shoping/cartItemSlice";
import { productListCleaner } from "../../store/slices/shoping/shopingProductSlice";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

const Home = () => {
  const { ProductList, productDetail } = useSelector(
    (state) => state.shopingProducts
  );
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate()
  const banners = [banner1, banner2, banner3];
  const [currentBanner, setCurrentBanner] = React.useState(0);
  const [openProductDetaialDialogbox, setOpenProdutcDetailDialogbox] =
    useState(false);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  const categories = [
    { id: "child", label: "child", icon: Carrot },
    { id: "mem", label: "Men", icon: Shirt },
    { id: "women", label: "Women", icon: Gift },
    { id: "footwear", label: "Foot Wear", icon: Shovel },
    { id: "accessories", label: "Accessories", icon: Pen },
  ];
  const brands = [
    { id: "nike", label: "Nike", icon: Carrot },
    { id: "sega", label: "Sega", icon: Shirt },
    { id: "puma", label: "Puma", icon: Gift },
    { id: "adidas", label: "Adidas", icon: Shovel },
    { id: "h&m", label: "H&M", icon: Pen },
  ];
  const showProductDetailHnadler = (id) => {
    console.log("clicked>>", id);

    dispatch(fetchShoppingProductDetail(id));
  };

  const addToCartHandler = async (productId, quantity = 1) => {
    const res = await dispatch(
      addTocartThunk({ productId, quantity, userId: user.id })
    );
    console.log("addtocartHandler");

    if (res.payload.success) {
      toast.success(res.payload.message);
    }
  };

  const categoryHandler =(getcurrentcategory)=>{
    sessionStorage.removeItem('filter')
    const currentfilter = {
      category:[getcurrentcategory]
    }
    sessionStorage.setItem('filter',JSON.stringify(currentfilter))
    navigate('/listing')
    
    

  }
  const brandHandler =(getcurrentcategory)=>{
    sessionStorage.removeItem('filter')
    const currentfilter = {
      brand:[getcurrentcategory]
    }
    sessionStorage.setItem('filter',JSON.stringify(currentfilter))
    navigate('/listing')
    
    

  }

  useEffect(() => {
    dispatch(fetchshopingProducts({ fiter: [], sortby: "" }));
  }, []);

  useEffect(() => {
    if (productDetail && Object.keys(productDetail).length > 0) {
      setOpenProdutcDetailDialogbox(true);
    }
  }, [productDetail]);

  useEffect(() => {
    if (!openProductDetaialDialogbox) {
      dispatch(productListCleaner());
    }
  }, [openProductDetaialDialogbox]);



  return (
    <section className="container">
      {/* img */}
      <div className="  banner h-[600px] w-full overflow-hidden relative ">
       <div className=" absolute inset-0 z-0" >
         {banners.map((banner, index) => (
          <img
            key={index}
            src={banner}
            alt={`Banner ${index + 1}`}
            className={` ${
              index === currentBanner ? "opacity-100" : "opacity-0"
            }  w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ease-in-out`}
          />
        ))}
       </div>
       <div className=" absolute inset-0 z-10 bg-black/60 " />
       <div className="absolute z-20 mx-auto w-[60%]   h-full flex items-center justify-center flex-col " >
<div>
  <h2 className=" capitalize text-[40px] font-[400] text-white " >WE picked Every item with care,
  <br /><span className=" font-semibold ">you must try atleast one</span></h2>

<Link to={'/listing'} >
<Button className='capitalize text-white mt-4 text-lg' >Go to collection <MoveRight  className="w-[100px] h-[100px] mt-1 " /> </Button>
</Link>
</div>
       </div>
      </div>

      {/* category */}
      <div className=" px-4 md:px-10">
        <h2 className="text-2xl font-bold my-4 text-center">
          Shop by Category
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories &&
            categories.length > 0 &&
            categories.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card
                onClick={()=>{categoryHandler(item.label,)}}
                  className=" flex flex-col items-center justify-center p-6 gap-2 hover:shadow-lg cursor-pointer "
                  key={idx}
                >
                  <Icon />
                  <span>{item.label}</span>
                </Card>
              );
            })}
        </div>
      </div>

      {/* brand */}
      <div className=" px-4 md:px-10">
        <h2 className="text-2xl font-bold my-4 text-center">Shop by Band</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {brands &&
            brands.length > 0 &&
            brands.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card
                onClick = {()=>{brandHandler(item.label)}}
                  className=" flex flex-col items-center justify-center p-6 gap-2 hover:shadow-lg cursor-pointer "
                  key={idx}
                >
                  <Icon />
                  <span>{item.label}</span>
                </Card>
              );
            })}
        </div>
      </div>

      {/*products  */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 px-4 md:px-10 mt-8">
        {ProductList &&
          ProductList.length > 0 &&
          ProductList.map((item, id) => {
            return (
              <ShoppingProductCard
                key={id}
                addToCartHandler={addToCartHandler}
                showProductDetailHnadler={showProductDetailHnadler}
                product={item}
              />
            );
          })}
        <ProductDetail
          open={openProductDetaialDialogbox}
          setopen={setOpenProdutcDetailDialogbox}
          ProductDetails={productDetail}
          addToCartHandler={addToCartHandler}
        />
      </div>
    </section>
  );
};

export default Home;
