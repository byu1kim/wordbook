import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Profile from "./routes/Profile";
import Signup from "./routes/Signup";
import Words from "./routes/Words";
import NotFound from "./routes/NotFound";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";
import Nav from "./components/Nav";
import { GlobalProvider } from "./components/Context";

import "./App.css";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <ScrollTop />
        <Nav />
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/words" element={<Words />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/Profile" element={<Profile />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
