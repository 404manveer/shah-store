import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { useDispatch} from "react-redux"
import { getCartItemsThunk } from "../../store/slices/shoping/cartItemSlice"

const ProductDetail = ({ ProductDetails, setopen, open,addToCartHandler }) => {
  if (!ProductDetails) return null

  const {
    title,
    brand,
    category,
    description,
    image,
    price,
    saleprice,
    stock,
  } = ProductDetails

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogContent className="max-w-3xl rounded-2xl p-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <DialogHeader className="space-y-2">
                <DialogTitle className="text-2xl font-semibold text-gray-900">
                  {title}
                </DialogTitle>
                <DialogDescription>
                  <span className="text-gray-500 text-sm capitalize">
                    {brand} • {category}
                  </span>
                </DialogDescription>
              </DialogHeader>

              <p className="text-gray-700 mt-3 text-sm leading-relaxed">
                {description}
              </p>

              {/* Price Section */}
              <div className="flex items-center gap-3 mt-4">
                <span className="text-2xl font-bold text-green-600">
                  ₹{saleprice}
                </span>
                {saleprice < price && (
                  <>
                    <span className="text-gray-400 line-through">₹{price}</span>
                    <span className="text-sm text-green-600 font-medium">
                      ({Math.round(((price - saleprice) / price) * 100)}% OFF)
                    </span>
                  </>
                )}
              </div>

              {/* Stock */}
              <div className="mt-3">
                {stock > 0 ? (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700"
                  >
                    In Stock ({stock})
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <Button
                className="flex-1 bg-gray-800 text-white hover:bg-gray-900"
                onClick={() => setopen(false)}
              >
                Close
              </Button>
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => addToCartHandler(ProductDetails._id)}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProductDetail
