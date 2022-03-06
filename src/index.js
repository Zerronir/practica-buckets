import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Header from './components/Header';
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/private/UserProfile";
import reportWebVitals from './reportWebVitals';
import SingleBucket from "./components/SingleBucket";

import { BrowserRouter, Routes, Route } from "react-router-dom";

let item = localStorage.getItem

ReactDOM.render(

  <React.StrictMode>
    <Header />
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />

      {/* Páginas de los buckets */}
      <Route path={`/objects/${localStorage.getItem("user_name")}/:key`} element={<SingleBucket />} />
      {/* Fin páginas de los buckets */}

      {/* Páginas del usuario */}
      <Route path="/user_profile" element={<UserProfile />} />
      {/* Fin de las páginas del usuario*/}

      {/* Rutas de los formularios de inicio de sesion y registro */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
