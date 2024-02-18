import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../src/context/AuthContext";
import HomePage from "../src/pages/HomePage";
import LoginSignupPage from "../src/pages/LoginSignupPage";
import MyZonePage from "../src/pages/MyZonePage";
import ProtectedRoute from "../src/context/ProtectedRoute"; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginSignupPage />} />
          <Route path="/myzone" element={<ProtectedRoute><MyZonePage /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
