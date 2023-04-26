import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Confirm from "./routes/Confirm";
import Login from "./routes/Login";
import Profile from "./routes/Profile";
import Signup from "./routes/Signup";
import Words from "./routes/Words";
import NotFound from "./routes/NotFound";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";
import Nav from "./components/Nav";
import { Private, Public } from "./components/Protected";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Nav />
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Public>
              <Home />
            </Public>
          }
        ></Route>
        <Route
          path="/words"
          element={
            <Private>
              <Words />
            </Private>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <Public>
              <Login />
            </Public>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <Public>
              <Signup />
            </Public>
          }
        ></Route>
        <Route
          path="/confirm"
          element={
            <Public>
              <Confirm />
            </Public>
          }
        ></Route>
        <Route
          path="/Profile"
          element={
            <Private>
              <Profile />
            </Private>
          }
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
