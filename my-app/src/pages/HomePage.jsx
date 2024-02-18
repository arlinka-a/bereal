import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/login">Login/Signup</Link>
    </div>
  );
}

export default HomePage;