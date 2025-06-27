import { useNavigate } from "react-router-dom";
import "../style/login.css";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const payload = {
      id: 0,
      username,
      password,
      role: "",
    };
    login(payload);
    navigate("/");
  };

  const handleExit = () => {
    navigate(-1);
  };
  

  return (
    <div className="login-container">
      <div className="login-box">
        <button
          className="exit-button"
          onClick={handleExit}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          ❌
        </button>
        <h1 className="login-title">Welcome to Login</h1>
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="login-button"
          onClick={handleLogin}
          disabled={!username || !password}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
