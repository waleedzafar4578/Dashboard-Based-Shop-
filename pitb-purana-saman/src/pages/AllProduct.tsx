import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

type ProductType = {
  id: number;
  title: string;
  description: string;
  price: number;
  categoryId: number;
  category: {
    id: number;
    title: string;
  };
};

type CategoryType = {
  id: number;
  title: string;
};

function AllProduct() {
  const { auth } = useAuth();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const [modalMode, setModalMode] = useState<"edit" | "add" | null>(null);
  const [currentProduct, setCurrentProduct] = useState<ProductType | null>(
    null
  );
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    categoryId: 0,
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [auth]);

  const fetchProducts = () => {
    if (auth?.token) {
      fetch("http://localhost:5154/v1/products", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          Accept: "text/plain",
        },
      })
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch(() => showMessage("Failed to load products"));
    }
  };

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
        .catch(() => showMessage("Failed to load categories"));
    }
  };

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  const openEditModal = (product: ProductType) => {
    setModalMode("edit");
    setCurrentProduct(product);
    setForm({
      title: product.title,
      description: product.description,
      price: product.price,
      categoryId: product.categoryId,
    });
  };

  const openAddModal = () => {
    setModalMode("add");
    setCurrentProduct(null);
    setForm({
      title: "",
      description: "",
      price: 0,
      categoryId: categories.length ? categories[0].id : 0,
    });
  };

  const handleModalSubmit = () => {
    if (!auth?.token) return;

    if (modalMode === "edit" && currentProduct) {
      // Update product
      fetch(`http://localhost:5154/v1/products/${currentProduct.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          Accept: "text/plain",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentProduct.id,
          ...form,
        }),
      })
        .then((res) => {
          if (res.ok) return res.text();
          else throw new Error("Update failed");
        })
        .then(() => {
          showMessage("Product updated successfully");
          setModalMode(null);
          fetchProducts();
        })
        .catch(() => showMessage("Failed to update product"));
    }

    if (modalMode === "add") {
      // Add product
      fetch("http://localhost:5154/v1/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          Accept: "text/plain",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 0,
          ...form,
        }),
      })
        .then((res) => {
          if (res.ok) return res.text();
          else throw new Error("Add failed");
        })
        .then(() => {
          showMessage("Product added successfully");
          setModalMode(null);
          fetchProducts();
        })
        .catch(() => showMessage("Failed to add product"));
    }
  };

  const handleRemove = (product: ProductType) => {
    if (!auth?.token) return;
    if (!window.confirm(`Are you sure you want to remove "${product.title}"?`))
      return;

    fetch(`http://localhost:5154/v1/products/${product.id}`, {
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
        showMessage(data.message || "Product removed");
        setProducts((prev) => prev.filter((p) => p.id !== product.id));
      })
      .catch(() => showMessage("Failed to delete product"));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products CRUD MENU</h1>

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

      {auth?.userrole === "employee" && (
        <button
          onClick={openAddModal}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          Add New Product
        </button>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px",height:'70vh',overflowY:'auto' }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "8px",
              width: "250px",
            }}
          >
            <p>
              <strong>{product.title}</strong>
            </p>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category?.title}</p>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                style={{
                  backgroundColor: "#3498db",
                  color: "white",
                  padding: "4px 8px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() => openEditModal(product)}
              >
                Edit
              </button>
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
                  onClick={() => handleRemove(product)}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {modalMode && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "20px",
              minWidth: "300px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <h2>{modalMode === "add" ? "Add New Product" : "Edit Product"}</h2>

            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              style={{
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              style={{
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <input
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: parseInt(e.target.value, 10) })
              }
              style={{
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <select
              value={form.categoryId}
              onChange={(e) =>
                setForm({ ...form, categoryId: parseInt(e.target.value, 10) })
              }
              style={{
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
                marginTop: "10px",
              }}
            >
              <button
                onClick={handleModalSubmit}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "6px 12px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
              <button
                onClick={() => setModalMode(null)}
                style={{
                  backgroundColor: "#ccc",
                  color: "#333",
                  padding: "6px 12px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllProduct;
