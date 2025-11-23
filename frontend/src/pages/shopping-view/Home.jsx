import React, { useEffect } from "react";
import banner1 from "../../assets/banner-1.webp";
import banner2 from "../../assets/banner-2.webp";
import banner3 from "../../assets/banner-3.webp";
import { Card } from "../../components/ui/card";
import { Carrot, Gift, Pen, Shirt, Shovel } from "lucide-react";
import { ShoppingProductCard } from "../../components/shopping-view/product-title";
import { fetchshopingProducts, fetchShoppingProductDetail } from "../../store/actions/shoping/shopingProduct";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const { ProductList } = useSelector((state) => state.shopingProducts);
  const banners = [banner1, banner2, banner3];
  const [currentBanner, setCurrentBanner] = React.useState(0);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    },5000);

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
        {id:"nike",label:"Nike",icon: Carrot},
        {id:"sega",label:"Sega",icon: Shirt},
        {id:"puma",label:"Puma",icon: Gift},
        {id:"adidas",label:"Adidas",icon: Shovel},
        {id:"h&m",label:"H&M",icon: Pen},
            
        ]
  const showProductDetailHnadler = (id) => {
    dispatch(fetchShoppingProductDetail(id));
  }

        useEffect(()=>{
         const res=  dispatch(fetchshopingProducts({fiter:[],sortby:''}))
          if(res){
            console.log("dfs>>>>",res);
          }
          
        },[])
        
console.log(ProductList,"product home>>>>>>");

  return (
    <section>
      {/* img */}
      <div className=" container banner h-[600px] w-full overflow-hidden relative ">
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
        <h2 className="text-2xl font-bold my-4 text-center">
          Shop by Band
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {brands &&
            brands.length > 0 &&
            brands.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card
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
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 px-4 md:px-10 mt-8" >
        {ProductList && ProductList.length > 0 && ProductList.map((item,id)=>{
          return(
            <ShoppingProductCard key={id} showProductDetailHnadler={showProductDetailHnadler} product={item} />
          )
        })}
      </div>
    </section>
  );
};

export default Home;
