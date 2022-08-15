import { Routes, Route } from "react-router-dom";
import Login from './components/Login';
import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";


function App() {
  const [usuario, setUsuario] = useState();

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("usuario");
    if (loggedInUser) {
      try {
        const foundUser = JSON.parse(loggedInUser);
        setUsuario(foundUser);
      } catch (error) {
        console.log("Error");
      }
    }
  }, []);

  return (
    <>      
        < Routes >
          <Route path="/" element={<Login usuario={usuario} setUsuario={setUsuario} />}></Route>
          <Route path="/dashboard" element={<Dashboard usuario={usuario} />}></Route>
        </Routes >      
    </>
  );
}

export default App;
