import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Task from "./pages/Task";
import PrivateRoute from "./components/PrivateRoutes";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/task" element={<Task />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
