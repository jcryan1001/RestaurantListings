import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { NavbarLink } from "./components/NavbarLink";
import { Stack } from "./components/Stack";

import { useAuthContext } from "./auth/authContext";
import { AuthRoot } from "./auth/AuthRoot";

import { Restaurants } from "./pages/Restaurants";

function App() {
  const { isAuthenticated } = useAuthContext();

  return (
    <>
      <Navbar>
        <NavbarLink to="/">RestaurantListings</NavbarLink>

        <Stack>
          <NavbarLink to="/auth/register">Register</NavbarLink>
          {isAuthenticated ? (
            <NavbarLink to="/auth/logout">Logout</NavbarLink>
          ) : (
            <NavbarLink to="/auth/login">Login</NavbarLink>
          )}
        </Stack>
      </Navbar>

      <Routes>
        <Route path="/" element={<Navigate to="/restaurants" />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/auth/*" element={<AuthRoot />} />
      </Routes>
    </>
  );
}

export default App;
