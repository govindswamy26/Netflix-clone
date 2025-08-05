import React from "react";
import Home from "./pages/Home/Home.js";
import Login from "./pages/Login/Login.js";
import Player from "./pages/Player/Player.js";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </div>
  );
}

export default App;
