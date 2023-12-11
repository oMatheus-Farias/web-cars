import { Routes, Route } from "react-router-dom";

import Login from "../pages/login";
import Register from "../pages/register";
import Home from "../pages/home";
import Dashboard from "../pages/dashboard";
import New from "../pages/dashboard/new";
import CarDetail from "../pages/cardetail";

import PrivateRoutes from "./privateRoutes";

export default function RoutesApp(){
  return(
    <Routes>
      <Route path="/" element={ <Home/> } />

      <Route path="/login" element={ <Login/> } />
      <Route path="/register" element={ <Register/> } />
      
      <Route path="/cardetail/:id" element={ <CarDetail/> } />
      <Route path="/dashboard" element={ <PrivateRoutes><Dashboard/></PrivateRoutes> } />
      <Route path="dashboard/new" element={ <PrivateRoutes><New/></PrivateRoutes> } />
    </Routes>
  );
};