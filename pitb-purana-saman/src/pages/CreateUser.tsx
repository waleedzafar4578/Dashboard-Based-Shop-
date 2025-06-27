import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/login";

function CreateUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCreate = async () => {
    setLoading(true);
    setError(null);
    try {
      await createUser({
        id: 0,
        username,
        password,
        role:'',
      });
      alert("User created successfully!");
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Create User</h1>
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
          onClick={handleCreate}
          disabled={loading || !username || !password}
        >
          {loading ? "Creating..." : "Create User"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default CreateUser;
