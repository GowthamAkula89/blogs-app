import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import HomePage from "./pages/HomePage";
import Payment from "./pages/Payment";
import {Provider} from "react-redux";
import store from "./redux/store";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isTokenExist = localStorage.getItem('blogAuthToken');
    if(isTokenExist) setIsLoggedIn(true);
  },[])

  return (
    <SnackbarProvider maxSnack={2} autoHideDuration={2000}>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {isLoggedIn &&
              <>
                <Route path="/payment" element={<Payment />} />
              </>
            }
          </Routes>
        </Router>
      </Provider>
    </SnackbarProvider>
    
    
  );
};

export default App;