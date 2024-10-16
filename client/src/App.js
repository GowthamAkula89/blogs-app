import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
export 

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isTokenExist = localStorage.getItem('blogAuthToken');
    if(isTokenExist) setIsLoggedIn(true);
  },[])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {isLoggedIn &&
          <>
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        }
      </Routes>
    </Router>
  );
};

export default App;