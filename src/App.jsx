import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import HeaderBeforeLogin from "./components/HeaderBeforeLogin";
import HeaderAfterLogin from "./components/HeaderAfterLogin";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MovieDetail from "./pages/MovieDetail";
import Ticket from "./pages/Ticket";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import PaymentPage from "./pages/PaymentPage";
import Banner from "./components/Banner";
import FixedNav from "./components/FixedNav";
import MyCgv from "./pages/MyCgv";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/movie-detail", element: <MovieDetail /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/ticket", element: <Ticket /> },
  { path: "/ticket/seat", element: <SeatSelectionPage /> },
  { path: "/ticket/payment", element: <PaymentPage /> },
  { path: "/mycgv", element: <MyCgv /> },
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showFixedNav, setShowFixedNav] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Double negation to check token existence
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowFixedNav(window.scrollY > 194);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <div
          className="flex-grow"
          style={{ marginTop: showFixedNav ? "60px" : "0" }}
        >
          {isLoggedIn ? (
            <>
              <Banner />
              <HeaderAfterLogin />
              <Nav />
              {showFixedNav && <FixedNav />}
            </>
          ) : (
            <>
              <Banner />
              <HeaderBeforeLogin />
              <Nav />
              {showFixedNav && <FixedNav />}
            </>
          )}
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
