import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <Link to="/upload-file">אזור אישי</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </div>
  );
}

export default HomePage;