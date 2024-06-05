"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

export const favoriteRestaurant = async (
  userId: string,
  restaurantId: string,
) => {
  await db.userFavoriteRestaurant.create({
    data: {
      userId,
      restaurantId,
    },
  });

  revalidatePath("/");
};

export const unfavoriteRestaurant = async (
  userId: string,
  restaurantId: string,
) => {
  await db.userFavoriteRestaurant.deleteMany({
    where: {
      userId,
      restaurantId,
    },
  });

  revalidatePath("/");
};
