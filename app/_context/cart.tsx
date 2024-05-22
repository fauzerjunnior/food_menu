/* eslint-disable no-unused-vars */
"use client";

import { Prisma, Product } from "@prisma/client";
import { ReactNode, createContext, useMemo, useState } from "react";
import { calculateProductTotalPrice } from "../_helpers/price";

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          deliveryFee: true;
        };
      };
    };
  }> {
  quantity: number;
}

interface ICartContext {
  subtotalPrice: number;
  totalPrice: number;
  totalDiscounts: number;
  products: CartProduct[];
  addProductToCart: ({
    product,
    quantity,
    emptyCart,
  }: {
    product: Product;
    quantity: number;
    emptyCart?: boolean;
  }) => void;
  decreaseProductQuantity: (productId: string) => void;
  increateProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  subtotalPrice: 0,
  totalPrice: 0,
  totalDiscounts: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increateProductQuantity: () => {},
  removeProductFromCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const subtotalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity;
    }, 0);
  }, [products]);

  const totalPrice = useMemo(() => {
    return (
      products.reduce((acc, product) => {
        return acc + calculateProductTotalPrice(product) * product.quantity;
      }, 0) + Number(products[0]?.restaurant.deliveryFee)
    );
  }, [products]);

  const totalDiscounts =
    subtotalPrice - totalPrice + Number(products[0]?.restaurant.deliveryFee);

  const addProductToCart = ({
    product,
    quantity,
    emptyCart,
  }: {
    product: Product;
    quantity: number;
    emptyCart?: boolean;
  }) => {
    const hasDifferentRestaurantInCart = products.some(
      (item) => item.restaurantId !== product.restaurantId,
    );

    if (hasDifferentRestaurantInCart) {
      setProducts([]);
    }

    const isProductAlreadyInCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (isProductAlreadyInCart) {
      return setProducts((current) =>
        current.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            };
          }

          return cartProduct;
        }),
      );
    }

    setProducts((current) => [...current, { ...product, quantity: quantity }]);
  };

  const decreaseProductQuantity = (productId: string) => {
    return setProducts((current) =>
      current.map((cartProduct) => {
        if (cartProduct.id === productId && cartProduct.quantity > 1) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1,
          };
        }

        return cartProduct;
      }),
    );
  };

  const increateProductQuantity = (productId: string) => {
    return setProducts((current) =>
      current.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }

        return cartProduct;
      }),
    );
  };

  const removeProductFromCart = (productId: string) => {
    return setProducts((products) =>
      products.filter((cartProduct) => cartProduct.id !== productId),
    );
  };

  return (
    <CartContext.Provider
      value={{
        products,
        subtotalPrice,
        totalPrice,
        totalDiscounts,
        addProductToCart,
        decreaseProductQuantity,
        increateProductQuantity,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
