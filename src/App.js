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
import Protected from "./components/Protected";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Nav />
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route
          path="/words"
          element={
            <Protected>
              <Words />
            </Protected>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/confirm" element={<Confirm />}></Route>
        <Route
          path="/Profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
