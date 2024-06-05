"use client";

import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "../_lib/utils";
import {
  favoriteRestaurant,
  unfavoriteRestaurant,
} from "../_actions/restaurant";
import { toast } from "sonner";

interface RestaurantItemProps {
  userId?: string;
  restaurant: Restaurant;
  className?: string;
  userFavoriteRestaurants?: UserFavoriteRestaurant[];
}

const RestaurantItem = ({
  userId,
  restaurant,
  className,
  userFavoriteRestaurants,
}: RestaurantItemProps) => {
  const handleFavoriteRestaurant = async () => {
    if (!userId) return;

    try {
      if (isFavorited) {
        await unfavoriteRestaurant(userId, restaurant.id);
        return toast.success("Restaurante removido dos favoritos.");
      }

      await favoriteRestaurant(userId, restaurant.id);

      toast.success("Restaurante favoritado com sucesso!", {
        description:
          "Você pode ver seus restaurantes favoritos na aba de favoritos.",
      });
    } catch (error) {
      toast.error("Erro ao favoritar restaurante.");
    }
  };

  const isFavorited = userFavoriteRestaurants?.some(
    (favorite) => favorite.restaurantId === restaurant.id,
  );

  return (
    <div className={cn("min-w-[266px] max-w-[266px]", className)}>
      <div className="w-full space-y-2">
        <div className="relative h-[136px] w-full">
          <Link href={`/restaurants/${restaurant.id}`}>
            <Image
              src={restaurant.imageUrl}
              fill
              className="rounded-lg object-cover shadow-md"
              alt={restaurant.name}
            />
          </Link>

          <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary bg-white px-[8px] py-[4px]">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold">5.0</span>
          </div>

          {userId && (
            <Button
              size="icon"
              className={`absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700 ${isFavorited && "bg-primary hover:bg-gray-700"}`}
              onClick={handleFavoriteRestaurant}
            >
              <HeartIcon
                className={`full-white h-fit w-fit ${isFavorited && "fill-white"}`}
                size={14}
              />
            </Button>
          )}
        </div>

        <div className="space-y-1">
          <div>
            <h3 className="text-sm font-semibold">{restaurant.name}</h3>
          </div>

          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <BikeIcon className="text-primary" size={12} />
              <span className="text-xs text-muted-foreground">
                {Number(restaurant.deliveryFee) === 0
                  ? "Entrega grátis"
                  : formatCurrency(Number(restaurant.deliveryFee))}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <TimerIcon className="text-primary" size={14} />
              <span className="text-xs text-muted-foreground">
                {restaurant.deliveryTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
