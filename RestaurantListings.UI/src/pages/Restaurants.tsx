import React, { useCallback, useEffect, useState } from "react";

import { getRestaurants } from "../api/restaurants";
import { Container } from "../components/Container";
import { RestaurantList } from "../components/RestaurantList";
import {
  RestaurantFilters,
  RestaurantFiltersState,
} from "../components/RestaurantFilters";
import { Restaurant } from "../interfaces/restaurant";

export function Restaurants() {
  const [tags, setTags] = useState<string[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    async function fetchRestaurants() {
      const data = await getRestaurants();
      setRestaurants(data);
      setTags(data.flatMap((x) => x.tags));
    }

    fetchRestaurants();
  }, []);

  const handleFiltersChange = useCallback((value: RestaurantFiltersState) => {
    setRestaurants((nextRestaurants) => {
      if (value.tags.length) {
        value.tags.forEach((tag) => {
          nextRestaurants = nextRestaurants.filter((r) => r.tags.includes(tag));
        });
      }

      if (value.isFamilyFriendly) {
        nextRestaurants = nextRestaurants.filter((r) => r.familyFriendly);
      }

      if (value.isVeganFriendly) {
        nextRestaurants = nextRestaurants.filter((r) => r.veganFriendly);
      }

      return nextRestaurants;
    });
  }, []);

  return (
    <Container>
      <RestaurantFilters tags={tags} onChange={handleFiltersChange} />
      <RestaurantList restaurants={restaurants} />
    </Container>
  );
}
