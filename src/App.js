// import logo from './logo.svg';
import "./App.css";
// import { useState } from "react";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import ChatHome from "./ChatHome";

function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="App">
      {/* <h1>HEHE</h1> */}
      {/* Lets shove some Components */}

      {!user ? (
        <Login />
      ) : (
        <div className="app-body">
          <Router>
            <Sidebar />

            <Routes>
              <Route path="/" element={<ChatHome />} />

              <Route path="/rooms/:roomId" element={<Chat />} />
            </Routes>

            {/* <Chat /> */}
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
