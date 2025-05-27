import React from "react";
import { Routes, Route } from "react-router-dom";

// Styles
import "./App.css";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";

const App = () => {
  return (
    <div className="h-screen w-full bg-slate-100 flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
};

export default App;
