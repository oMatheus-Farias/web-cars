import { Routes, Route } from "react-router-dom";

import Login from "../pages/login";
import Register from "../pages/register";
import Home from "../pages/home";
import Dashboard from "../pages/dashboard";
import New from "../pages/dashboard/new";
import CarDetail from "../pages/cardetail";

export default function RoutesApp(){
  return(
    <Routes>
      <Route path="/" element={ <Home/> } />

      <Route path="/login" element={ <Login/> } />
      <Route path="/register" element={ <Register/> } />
      
      <Route path="/cardetail" element={ <CarDetail/> } />
      <Route path="/dashboard" element={ <Dashboard/> } />
      <Route path="/new" element={ <New/> } />
    </Routes>
  );
};