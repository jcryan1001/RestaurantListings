import React, { useReducer, Reducer, useEffect } from "react";
import styled from "@emotion/styled";

import { ToggleFilter } from "./ToggleFilter";
import { updateReturn } from "typescript";

export interface RestaurantSearch {
    search: string;
}

export interface RestaurantFiltersState {
    tags: string[];
  isFamilyFriendly: boolean;
    isVeganFriendly: boolean;
   
}

type RestaurantFiltersAction =
  | { type: "toggleTag"; payload: { tag: string } }
  | { type: "toggleFamilyFriendly" }
  | { type: "toggleVeganFriendly" };

const restaurantFiltersReducer: Reducer<RestaurantFiltersState,RestaurantFiltersAction> = (state, action) => {
  switch (action.type) {
    case "toggleTag": {
      const tagIndex = state.tags.indexOf(action.payload.tag);
      if (tagIndex !== -1) {
        return { ...state, tags: state.tags.splice(tagIndex, 1) };
      } else {
        return { ...state, tags: [...state.tags, action.payload.tag] };
      }
    }

    case "toggleFamilyFriendly": {
      return { ...state, isFamilyFriendly: !state.isFamilyFriendly };
    }

    case "toggleVeganFriendly": {
      state.isVeganFriendly = !state.isVeganFriendly;
      return state;
    }

    default:
      throw Error();
  }
};

export interface RestaurantFiltersProps {
    tags: string[];
  onChange?: (value: RestaurantFiltersState) => unknown;
}

const FilterGroup = styled.div({
  marginBottom: "1rem",
});

const FilterTitle = styled.h4({
  marginBottom: "1rem",
  fontSize: "1.1rem",
  fontWeight: 500,
  color: "#2c2c2c",
});


export function RestaurantFilters(props: RestaurantFiltersProps) {
  const { tags = [], onChange} = props;
  const [state, dispatch] = useReducer(restaurantFiltersReducer, {
      tags: [],
    isFamilyFriendly: false,
      isVeganFriendly: false,
      
   
  });

  useEffect(() => {
    onChange?.(state);
  }, [state, onChange]);
     // funtion to sort the tag list in alphabetical order//
    
    var r = tags.filter((value, index) => tags.indexOf(value) === index);
    tags.length = 0;
    tags.push(...r);

   

  return (
    <div style={{ flex: "1 0 250px" }}>
      <FilterGroup>
              <FilterTitle>Tags</FilterTitle>
              {tags.sort(function (a, b) {

                      var textA = a.toUpperCase();
                      var textB = b.toUpperCase();
                      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;

              }) &&
                  
                  
              tags.map((tag) => (
                  <ToggleFilter

                      label={tag}
                      isChecked={state.tags.includes(tag)}
                      onChange={() => dispatch({ type: "toggleTag", payload: { tag } })}
                  />
              ))}
      </FilterGroup>

      <FilterGroup>
        <FilterTitle>Other</FilterTitle>

        <ToggleFilter
          label="Family friendly"
          isChecked={state.isFamilyFriendly}
          onChange={() => dispatch({ type: "toggleFamilyFriendly" })}
        />

        <ToggleFilter
          label="Vegan"
          isChecked={state.isVeganFriendly}
          onChange={() => dispatch({ type: "toggleVeganFriendly" })}
        />
          </FilterGroup>
         
      </div>

  );
}
