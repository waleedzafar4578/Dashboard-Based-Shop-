import "./style/main.css";
import "./style/navbar.css";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProduct";
import Category from "./pages/Category";
import icn from "../public/iconbar.jpg";
import "./style/login.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import Navbar from "./components/navbar";
import AppLayout from "./layout/AppLayout";
import Login from "./pages/Login";
import PublicHome from "./pages/PublicHome";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useLocation } from "react-router-dom";
import CreateUser from "./pages/CreateUser";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;

function AppContent() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      {!auth && location.pathname !== "/login" && (
        <button
          className="login-button"
          style={{ position: "fixed", top: 10, right: 20, zIndex: 1000 }}
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      )}

      <Routes>
        {auth ? (
          <>
            <Route
              path="/"
              element={<AppLayout sider={<YourSider />} content={<PublicHome />} />}
            />
            <Route
              path="/AllProduct"
              element={
                <AppLayout sider={<YourSider />} content={<AllProducts />} />
              }
            />
            <Route
              path="/Category"
              element={
                <AppLayout sider={<YourSider />} content={<Category />} />
              }
            />
            <Route
              path="/create-user"
              element={
                <AppLayout sider={<YourSider />} content={<CreateUser />} />
              }
            />
            <Route
              path="/view-users"
              element={
                <AppLayout sider={<YourSider />} content={<UserList />} />
              }
            />
            <Route
              path="/Order"
              element={
                <AppLayout sider={<YourSider />} content={<Order />} />
              }
            />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PublicHome />} />
          </>
        )}
      </Routes>
    </>
  );
}

import { useState } from "react";
import UserList from "./pages/UserList";
import Order from "./pages/Order";

function YourSider() {
  const navigate = useNavigate();
  const { auth, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleUserAction = (action: string) => {
    setShowUserMenu(false);
    switch (action) {
      case "add":
        navigate("/create-user");
        break;
      case "view":
        navigate("/view-users");
        break;
      default:
        break;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "96vh",
        justifyContent: "space-between",
      }}
    >
      <Navbar
        logo={
          <img
            src={icn}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "20px",
              marginLeft: "20px",
            }}
          />
        }
        tabs={<NavButton />}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <button
          className="navbutton"
          style={{
            marginBottom: "10px",
            backgroundColor:
              auth?.userrole === "manager" ? "#4CAF50" : "#a9a9a9",
            cursor: auth?.userrole === "manager" ? "pointer" : "not-allowed",
          }}
          onClick={() => {
            if (auth?.userrole === "manager")  handleUserAction("add");
          }}
          disabled={auth?.userrole !== "manager"}
        >
          Add User
        </button>
        <button
          className="navbutton"
          style={{
            marginBottom: "10px",
            backgroundColor:
              auth?.userrole === "manager" ? "#4CAF50" : "#a9a9a9",
            cursor: auth?.userrole === "manager" ? "pointer" : "not-allowed",
          }}
          onClick={() => {
            if (auth?.userrole === "manager")  handleUserAction("view");
          }}
          disabled={auth?.userrole !== "manager"}
        >
          View User
        </button>
          
        <button className="login-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

function NavButton() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <button className="navbutton" onClick={() => navigate("/")}>
        PublicPage
      </button>
      <button className="navbutton" onClick={() => navigate("/AllProduct")}>
        Products
      </button>
      <button className="navbutton" onClick={() => navigate("/Category")}>
        Category
      </button>
      <button className="navbutton" onClick={() => navigate("/Order")}>
        Visiter Orders
      </button>
    </div>
  );
}
