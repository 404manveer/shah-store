import React from "react";
import { CardContent, Card, CardTitle } from "../ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../ui/button";

export const ShoppingProductCard = ({ product,showProductDetailHnadler, addToCartHandler }) => {

  

  return (
    <Card className='' >
      <div  className="bg-white p-2 rounded-lg  ">
        <div onClick={()=>{showProductDetailHnadler(product._id)}} className=" cursor-pointer relative overflow-hidden rounded-md w-full h-[225px]   ">
          <img
            src={product.image}
            alt={product.title}
            className=" w-full h-full object-center object-cover "
          />
          {product.saleprice > 0 && (
            <Badge className={"absolute top-3 left-3 text-white z-10"}>
              On sale
            </Badge>
          )}
        </div>
        <CardContent onClick={()=>{showProductDetailHnadler(product._id)}} className=" p-2">
          <CardTitle className="text-center text-xl tracking-wide capitalize  cursor-pointer ">
            {product.title}
          </CardTitle>
          <div className="space-y-4">
            <div className=" flex justify-between gap-4  ">
              <span className=" capitalize ">{product.category}</span>
              <span className=" capitalize ">{product.brand}</span>
            </div>
            <div className=" flex justify-between gap-4  ">
              <span className={`${product.saleprice ? " line-through " : ""}`}>
                {" "}
                Price: ${product.price}
              </span>
              {product.saleprice > 0 ? (
                <span> Sale Price: ${product.saleprice}</span>
              ) : (
                ""
              )}
            </div>
          </div>
        </CardContent>
            <Button onClick={()=>addToCartHandler(product._id)}  className=" w-full  text-white items-center ">Add to cart</Button>
      </div>
    </Card>
   
  );
};
