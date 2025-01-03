import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Show from "./pages/Show";
import New from "./pages/New";
import MyJobs from "./pages/MyJobs";
import Edit from "./pages/Edit";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/jobs/:id" element={<Show />} />
            <Route path="/jobs/:id/edit" element={<Edit />} />
            <Route path="/new" element={<New />} />
            <Route path="/myjobs" element={<MyJobs />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
