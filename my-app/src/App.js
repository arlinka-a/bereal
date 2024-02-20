import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../src/context/AuthContext";
import HomePage from "../src/pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MyZonePage from "../src/pages/MyZonePage";
import FileUploadsPage from "./pages/FileUploadsPage";
import ProtectedRoute from "../src/context/ProtectedRoute"; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload-file" element={<FileUploadsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage/>} />
          <Route path="/myzone" element={<ProtectedRoute><MyZonePage /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
