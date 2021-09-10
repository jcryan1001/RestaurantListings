import { Restaurant } from "../interfaces/restaurant";

export async function getRestaurants(): Promise<Restaurant[]> {
  const res = await fetch("/api/restaurants");
  return await res.json();
}
