import React from "react";

import { Restaurant } from "../interfaces/restaurant";
import { RestaurantItem } from "./RestaurantItem";

export interface RestaurantListProps {
  restaurants?: Restaurant[];
}

export function RestaurantList(props: RestaurantListProps) {
  const { restaurants = [] } = props;

  return (
    <div>
      {restaurants.map((restaurant) => (
        <RestaurantItem restaurant={restaurant} />
      ))}
    </div>
  );
}
