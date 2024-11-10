import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Pages/Header";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Products from "./Pages/Products";
import Cart from "./Pages/Cart";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState(null); 

  return (
    <Router>
      <Header user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/products/:category" element={<Products user={user} isLoggedIn={isLoggedIn} />} />
        <Route path="/cart" element={<Cart user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
