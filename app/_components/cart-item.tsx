import Image from "next/image";
import { CartContext, CartProduct } from "../_context/cart";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItem {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItem) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleIncreaseProductQuantity = () => {
    increaseProductQuantity(cartProduct.id);
  };

  const handleDecreaseProductQuantity = () => {
    decreaseProductQuantity(cartProduct.id);
  };

  const handleRemoveProductFromCart = () => {
    removeProductFromCart(cartProduct.id);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-5">
        <div className="relative h-20 w-20">
          <Image
            className="rounded-lg object-cover"
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-xs">{cartProduct.name}</h3>
          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>

          <div className="flex items-center">
            <div className="flex items-center gap-3 text-center">
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 border border-solid border-muted-foreground"
                onClick={handleDecreaseProductQuantity}
              >
                <ChevronLeftIcon size={16} />
              </Button>
              <span className="block w-4 text-xs">{cartProduct.quantity}</span>
              <Button
                size="icon"
                className="h-7 w-7"
                onClick={handleIncreaseProductQuantity}
              >
                <ChevronRightIcon size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 border border-solid border-muted-foreground"
        onClick={handleRemoveProductFromCart}
      >
        <TrashIcon size={18} />
      </Button>
    </div>
  );
};

export default CartItem;
