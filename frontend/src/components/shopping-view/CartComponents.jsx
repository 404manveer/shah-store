import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
  
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Minus, Plus, ShoppingCart, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItemsThunk,
  updateCartItemsThunk,
} from "../../store/slices/shoping/cartItemSlice";
import React, { useCallback, useMemo } from "react";

function CartComponents({ cart = [] }) {
  const { user } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  

  const deleteHanlder = (productId) => {
    dispatch(deleteCartItemsThunk({ productId, userId: user?.id }));
  };

  const updateHandler = useCallback(({ productId, quantity }) => {
    dispatch(updateCartItemsThunk({ productId, userId: user?.id, quantity }));
  }, [dispatch, user?.id]);

const totalprice = useMemo(
  () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  [cart]
);

  return (
   <Sheet>
  <SheetTrigger>
    <Button variant="ghost" className="flex items-center gap-2">
      <ShoppingCart className="w-5 h-5 " />
     
    </Button>
  </SheetTrigger>

  <SheetContent className="bg-white p-6">
    <SheetHeader>
      <SheetTitle className="text-2xl font-bold">Your Cart</SheetTitle>
      <SheetDescription className="mt-6 space-y-6">
        {cart?.map((item, idx) => (
          <div
            key={idx}
            className="flex gap-4 p-4 border rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            {/* Image */}
            <div className="size-20 shrink-0 rounded-lg overflow-hidden border bg-gray-50">
              <img
                src={item.product.image}
                alt={item.product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex justify-between w-full items-start">
              <div className="pr-4">
                <h2 className="font-semibold text-lg leading-tight line-clamp-2">
                  {item.product.title}
                </h2>

                {/* Quantity Control */}
                <div className="flex items-center gap-2 mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="size-7 p-0 flex items-center justify-center rounded-md"
                    disabled={item.quantity === 1}
                    onClick={() =>
                      updateHandler({
                        productId: item.product._id,
                        quantity: -1,
                      })
                    }
                  >
                    <Minus className="w-4 h-4" />
                  </Button>

                  <span className="w-6 text-center font-medium">
                    {item.quantity}
                  </span>

                  <Button
                    size="sm"
                    variant="outline"
                    className="size-7 p-0 flex items-center justify-center rounded-md"
                    onClick={() =>
                      updateHandler({
                        productId: item.product._id,
                        quantity: +1,
                      })
                    }
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Price + Delete */}
              <div className="text-right">
                <span className="font-bold text-md">
                  ${item.product.price * item.quantity}
                </span>

                <Trash
                  onClick={() => deleteHanlder(item.product._id)}
                  className="w-5 h-5 text-red-600 cursor-pointer mt-3 hover:text-red-700 transition"
                />
              </div>
            </div>
          </div>
        ))}
      </SheetDescription>
    </SheetHeader>

    {/* Footer */}
    <SheetFooter>
      <div className="w-full mt-6 space-y-4">
        {/* Total Price Card */}
        <div className="flex justify-between items-center p-4 border rounded-xl shadow-sm bg-gray-50">
          <h2 className="font-semibold text-lg">Total Amount:</h2>
          <span className="text-lg font-bold">${totalprice}</span>
        </div>

        <Button className="w-full text-white text-lg py-5 rounded-xl">
          Checkout
        </Button>
      </div>
    </SheetFooter>
  </SheetContent>
</Sheet>

  );
}

export default React.memo(CartComponents);

