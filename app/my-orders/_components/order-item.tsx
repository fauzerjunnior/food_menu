import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const getOrderStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.CANCELLED:
      return "Cancelado";
    case OrderStatus.COMPLETED:
      return "Entregue";
    case OrderStatus.CONFIRMED:
      return "Confirmado";
    case OrderStatus.DELIVERING:
      return "Em transporte";
    case OrderStatus.PREPARING:
      return "Preparando";
  }
};

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <Card>
      <CardContent className="space-y-3 p-5">
        <div className="w-fit rounded-full bg-[#EEEEEE] px-2 text-muted-foreground">
          <span className="text-xs font-semibold">
            {getOrderStatusLabel(order.status)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={order.restaurant.imageUrl} />
            </Avatar>

            <span className="text-sm font-semibold">
              {order.restaurant.name}
            </span>
          </div>

          <Button variant="ghost" size="icon" className="h-5 w-5">
            <ChevronRightIcon />
          </Button>
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div>
          {order.products.map((product) => (
            <div className="flex items-center gap-2" key={product.id}>
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground">
                <span className="block text-xs text-white">
                  {product.quantity}
                </span>
              </div>

              <span className="text-xs text-muted-foreground">
                {product.product.name}
              </span>
            </div>
          ))}
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Total</span>
          <span className="font-semibold">
            R$ {order.totalPrice.toFixed(2).replace(".", ",")}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
