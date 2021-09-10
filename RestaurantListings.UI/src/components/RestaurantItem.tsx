import { Restaurant } from "../interfaces/restaurant";

export interface RestaurantItemProps {
  restaurant: Restaurant;
}

export function RestaurantItem(props: RestaurantItemProps) {
  const { restaurant } = props;
  return (
    <div>
      <div style={{ float: "left" }}>
        <img
          className="photo-img"
          width="100px"
          height="100px"
          src={restaurant.photoUri}
        />
      </div>

      <h3>{restaurant.name}</h3>
      <div>{restaurant.address}</div>
      <div>{restaurant.description}</div>
      <div>{restaurant.phoneNumber}</div>
    </div>
  );
}
