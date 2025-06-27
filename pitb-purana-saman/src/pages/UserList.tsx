import { useEffect, useState } from "react";
import { deleteUser, getUsers, updateUser } from "../services/user";
import { useAuth } from "../context/AuthContext";
import { User } from "../commonTypes/user";
import "../style/userlist.css";

function UserList() {
  const { auth } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    if (auth?.token) {
      getUsers(auth.token)
        .then((data) => setUsers(data))
        .catch((err) => console.error(err));
    }
  }, [auth]);

  const handleDelete = async (user: User) => {
    if (!auth?.token) return;
    try {
      await deleteUser(user, auth.token);
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete user.");
    }
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      password: user.password,
      role: user.role,
    });
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!auth?.token || !editingUser) return;
    try {
      const updatedUser: User = {
        id: editingUser.id,
        username: formData.username,
        password: formData.password,
        role: formData.role,
      };
      await updateUser(updatedUser, auth.token);
      setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
      setEditingUser(null);
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update user.");
    }
  };

  return (
    <div className="user-list">
      {users.map((user) => (
        <>
          {auth?.userrole === "manager" && user.id !== auth.userid && (
            <div key={user.id} className="user-card">
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
              <div className="user-actions">
                <button
                  className="edit-button"
                  onClick={() => openEditModal(user)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(user)}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          )}
        </>
      ))}

      {editingUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit User</h2>
            <div className="form-group">
              <label>Username:</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                type="password"
              />
            </div>
            <div className="form-group">
              <label>Role:</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleFormChange}
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
              </select>
            </div>
            <div className="modal-buttons">
              <button className="save-button" onClick={handleUpdate}>
                💾 Save
              </button>
              <button
                className="cancel-button"
                onClick={() => setEditingUser(null)}
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserList;
