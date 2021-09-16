import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

import { getRestaurants } from "../api/restaurants";
import { Container } from "../components/Container";
import { RestaurantList } from "../components/RestaurantList";
import {
    RestaurantFilters,
    RestaurantFiltersState,
} from "../components/RestaurantFilters";
import { Restaurant } from "../interfaces/restaurant";
import { authService } from "../auth/authService";
import { AuthenticationResultStatus } from "../auth/authService";

export function Restaurants(this: any) {
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
    //values from input goes here to be posted later//
    const [name, setName] = useState("");
    const [description, setdescription] = useState("");
    const [phoneNumber, setphone] = useState("");
    const [address, setaddress] = useState("");
    const token = sessionStorage.getItem("token");

    const handleSubmit = async (e: any) => {
        const result = await authService.isAuthenticated(); //this his how we authenticate if the user is logged in or not
        if (result === true) {
            e.preventDefault();
            const restaurant = { name, description, phoneNumber, address };
            
            fetch("/api/restaurants", {         //here we fetch and post to the controller
                method: "POST",
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(restaurant),
            }).then((response) => {
                console.log(response);
            });
        } else {
            alert("you need to sign in to be able to rate the restraunt!");
        }
    };

    return (
        <Container>
            <RestaurantFilters tags={tags} onChange={handleFiltersChange} />
            <RestaurantList restaurants={restaurants} />
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <label>Add a Restaurant</label>
                    </div>
                    <div className="flip-card-back">
                        <form id="form" className="container1" onSubmit={handleSubmit}>
                            <div>
                                <div>
                                    <label>Name</label>
                                    <div>
                                        {" "}
                                        <input
                                            type="text"
                                            name="name"
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label>Description</label>
                                    <div>
                                        {" "}
                                        <input
                                            type="text"
                                            name="description"
                                            onChange={(e) => setdescription(e.target.value)}
                                        />{" "}
                                    </div>
                                </div>
                                <div>
                                    <label>Phone Number</label>
                                    <div>
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            onChange={(e) => setphone(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label>Address</label>
                                    <div>
                                        <input
                                            type="text"
                                            name="address"
                                            onChange={(e) => setaddress(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label>Vegan friendly</label>
                                    <div>
                                        <input type="checkbox" name="veganfriendly" />
                                    </div>
                                </div>
                                <div>
                                    <label>Family friendly</label>
                                    <div>
                                        <input type="checkbox" name="familyFriendly" />
                                    </div>
                                </div>
                                <div>
                                    <button type="submit">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );
}
