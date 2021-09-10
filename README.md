# BMA Dev Test

## RestaurantListings

RestaurantListings is simple restaurant viewer app. The functionality is quite simple: Fetch the list of available restaurants from the API and display them to the user. The user should be able to search the restaurants with a variety of filters. A basic boilerplate has been provided for the app which consists of two main components:

- RestaurantListings - The AspNetCore backend
- RestaurantListings.UI - The React frontend

The application can be started by running the main **RestaurantListings**

```bash
dotnet run -p ./RestaurantListings
```

This will start both the API and React frontend. A Swagger/OpenAPI UI is available on https://localhost:5001/swagger.

## Requirements

The initial implementation has been already been completed; but it's ugly, buggy and uses a variety of bad practices. Refactor the app to meet the following requirements:

- The user is presented with a list of restaurants:

  - The list should show the image, title, description, and other basic info
  - The list should use semantically sound HTML and modern CSS practices
  - Make use of your choice of styling systems (CSS-in-JS, SASS, CSS, etc)
  - **BONUS**: Make the layout responsive
  - **BONUS**: Lazy load the restaurants page

- The user should be able to filter restaurants efficiently and consistently via a number of options:

  - Through the tags:
    - which should be displayed alphabetically
    - Multiple tags can be selected at a time
    - No duplicate tags should be shown
  - Through the family friendly and vegan options, which should check the relevant flags on the restaurant

- Add two or more of the following features:

  - Add a search bar to the filters to allow users to search through the restaurants.

  - Add the ability for **signed in users** to create a new restaurant:

    - New restaurants can be created by sending a POST request to the `/api/restaurants` endpoint. It accepts the following restaurant properties: `name`, `description`, `phoneNumber`, `address`, `veganFriendly`, `familyFriendly` with `name`, `phoneNumber`, and `address` being required.
    - The form should have basic error handling and validation.

  - Add basic rating functionality to the API and frontend:
    - Only signed in users should be able to rate a restaurant
    - The rating should only be between 1 and 5
    - Recalculate the average restaurant rating when a new rating is applied
    - Display the average restaurant rating on the restaurant list
    - Only one rating per user per restaurant should be allowed, but they are allowed to change their rating
