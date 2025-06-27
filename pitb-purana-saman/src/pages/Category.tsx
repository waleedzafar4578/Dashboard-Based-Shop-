import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

type CategoryType = {
  id: number;
  title: string;
};

function Category() {
  const { auth } = useAuth();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, [auth]);

  const fetchCategories = () => {
    if (auth?.token) {
      fetch("http://localhost:5154/v1/categories", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          Accept: "text/plain",
        },
      })
        .then((res) => res.json())
        .then((data) => setCategories(data))
        .catch((err) => {
          console.error("Error fetching categories:", err);
          setMessage("Failed to load categories");
        });
    }
  };

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleAddCategory = () => {
    const title = prompt("Enter new category title:");
    if (!title || !auth?.token) return;

    fetch("http://localhost:5154/v1/categories", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.token}`,
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 0,
        title,
      }),
    })
      .then((res) => {
        if (res.ok) return res.text();
        else throw new Error("Add failed");
      })
      .then(() => {
        showMessage("Category added successfully");
        fetchCategories();
      })
      .catch((err) => {
        console.error(err);
        showMessage("Failed to add category");
      });
  };

  const handleEdit = (category: CategoryType) => {
    const newTitle = prompt("Enter new title for category:", category.title);
    if (!newTitle || !auth?.token) return;

    fetch(`http://localhost:5154/v1/categories/${category.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${auth.token}`,
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: category.id,
        title: newTitle,
      }),
    })
      .then((res) => {
        if (res.ok) return res.text();
        else throw new Error("Update failed");
      })
      .then(() => {
        showMessage("Category updated successfully");
        setCategories((prev) =>
          prev.map((c) =>
            c.id === category.id ? { ...c, title: newTitle } : c
          )
        );
      })
      .catch((err) => {
        console.error(err);
        showMessage("Failed to update category");
      });
  };

  const handleRemove = (category: CategoryType) => {
    if (!auth?.token) return;
    if (!window.confirm(`Are you sure you want to remove "${category.title}"?`)) return;

    fetch(`http://localhost:5154/v1/categories/${category.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth.token}`,
        Accept: "text/plain",
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error("Delete failed");
      })
      .then((data) => {
        showMessage(data.message || "Category removed");
        setCategories((prev) => prev.filter((c) => c.id !== category.id));
      })
      .catch((err) => {
        console.error(err);
        showMessage("Failed to delete category");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Categories CURD MENU</h1>

      {auth?.userrole === "employee" && (
        <button
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
          onClick={handleAddCategory}
        >
          Add New Category
        </button>
      )}

      {message && (
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: "10px",
            borderRadius: "6px",
            marginBottom: "10px",
            color: "#333",
          }}
        >
          {message}
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px",maxHeight:'70vh',overflowY:'auto' }}>
        {categories.map((category) => (
          <div
            key={category.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "8px",
              width: "200px",
            }}
          >
            <p>
              <strong>{category.title}</strong>
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              {(auth?.userrole === "employee" || auth?.userrole === "manager") && (
                <button
                  style={{
                    backgroundColor: "#3498db",
                    color: "white",
                    padding: "4px 8px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleEdit(category)}
                >
                  Edit
                </button>
              )}
              {auth?.userrole === "manager" && (
                <button
                  style={{
                    backgroundColor: "#e74c3c",
                    color: "white",
                    padding: "4px 8px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleRemove(category)}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
