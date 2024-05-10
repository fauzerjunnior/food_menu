import { BikeIcon, TimerIcon } from "lucide-react";
import { Card } from "./ui/card";
import { Restaurant } from "@prisma/client";
import { formatCurrency } from "../_helpers/price";

interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, "deliveryFee" | "deliveryTimeMinutes">;
}

const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
  const formattedDeliveryFee = formatCurrency(Number(restaurant.deliveryFee));

  return (
    <Card className="mt-6 flex justify-around py-3">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-muted-foreground">
          <BikeIcon size={14} />
          <span className="text-xs">Entrega</span>
        </div>

        {Number(restaurant.deliveryFee) > 0 ? (
          <div className="text-xs font-semibold">{formattedDeliveryFee}</div>
        ) : (
          <p className="text-xs font-semibold">Grátis</p>
        )}
      </div>

      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-muted-foreground">
          <TimerIcon size={14} />
          <span className="text-xs">Tempo de entrega</span>
        </div>

        <p className="text-xs font-semibold">
          {restaurant.deliveryTimeMinutes} min
        </p>
      </div>
    </Card>
  );
};

export default DeliveryInfo;
