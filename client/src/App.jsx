import React, { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Homepage from "./pages/home/Homepage";
import Navbar from "./components/navbar/Navbar";
import ProfilePage from "./pages/profile/ProfilePage";
import ProductsPage from "./pages/productadd/ProductsPage";
import IncomePage from "./pages/income/Income";
import ExpensePage from "./pages/expense/ExpensePage";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import ProjectPage from "./pages/project/Project";
const Home = () => {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && location.pathname !== "/register") {
      navigate("/login");
    }
  }, [user, navigate, location.pathname]);
  return (
    <div className="router-home">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Homepage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/product-add" element={<ProductsPage />} />
        <Route path="/project-add" element={<ProjectPage />} />
        <Route path="/income" element={<IncomePage />} />
        <Route path="/expense" element={<ExpensePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
};

export default Home;
