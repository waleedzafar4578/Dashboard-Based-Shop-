import { useEffect, useState } from "react";
import { fetchOrders, updateOrder, deleteOrder, confirmOrder } from "../services/order";
import { useAuth } from "../context/AuthContext";
import "../style/navbar.css";

function Order() {
  const { auth } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editedOrder, setEditedOrder] = useState<any>({});

  useEffect(() => {
    if (auth?.token) {
      fetchOrders(auth.token)
        .then(setOrders)
        .catch((err) => console.error(err));
    }
  }, [auth]);

  const handleEdit = (order: any) => {
    setEditId(order.id);
    setEditedOrder({ ...order });
  };

  const handleSave = async (id: number) => {
    try {
    if (!auth?.token) return;
      await updateOrder(auth.token, id, editedOrder);
      setEditId(null);
      fetchOrders(auth.token).then(setOrders);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      if (!auth?.token) return;
      await deleteOrder(auth.token, id);
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirm = async (order: any) => {
    try {
      if (!auth?.token) return;
      const updated = { ...order, status: true };
      await updateOrder(auth.token, order.id, updated);
      fetchOrders(auth.token).then(setOrders);
    } catch (err) {
      console.error(err);
    }
  };
  const toggle = async (id: number) => {
    try {
        if (!auth?.token) return;
        await confirmOrder(auth.token, id);
        fetchOrders(auth.token).then(setOrders);
    } catch (err) {
        console.error("Error confirming order:", err);
    }
  };

  return (
    <div style={{ padding: "20px",overflowY:'auto',maxHeight:'90vh' }}>
      <h2>Orders</h2>
      {orders.map((order) => (
        <div key={order.id} style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "10px", borderRadius: "8px" }}>
          {editId === order.id ? (
            <>
              <input
                type="text"
                value={editedOrder.name}
                onChange={(e) => setEditedOrder({ ...editedOrder, name: e.target.value })}
                placeholder="Name"
              />
              <input
                type="email"
                value={editedOrder.email}
                onChange={(e) => setEditedOrder({ ...editedOrder, email: e.target.value })}
                placeholder="Email"
              />
              <input
                type="text"
                value={editedOrder.phone}
                onChange={(e) => setEditedOrder({ ...editedOrder, phone: e.target.value })}
                placeholder="Phone"
              />
              <input
                type="number"
                value={editedOrder.price}
                onChange={(e) => setEditedOrder({ ...editedOrder, price: Number(e.target.value) })}
                placeholder="Price"
              />
              <input
                type="number"
                value={editedOrder.uint}
                onChange={(e) => setEditedOrder({ ...editedOrder, uint: Number(e.target.value) })}
                placeholder="Units"
              />
              <button onClick={() => handleSave(order.id)}>Save</button>
              <button onClick={() => setEditId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {order.name}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Offered Price:</strong> ${order.price}</p>
              <p><strong>Units:</strong> {order.uint}</p>
              <p><strong>Status:</strong> {order.status ? "Confirmed" : "Pending"}</p>
              <p><strong>Product ID:</strong> {order.productId}</p>

              <div style={{ marginTop: "10px" }}>
                {auth?.userrole ==="manager" &&(
                    <button className="navbutton"  style={{
                    backgroundColor: "#e74c3c",
                    color: "white",
                    padding: "0.75rem 1.5rem",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginLeft: "10px"
                  }} onClick={() => handleDelete(order.id)}>Delete</button>
                )}
                {!order.status ? (
                  <button className="navbutton" onClick={() => toggle(order.id)} style={{ marginLeft: "10px" }}>
                    Confirm
                  </button>
                ):(
                    <button className="navbutton" onClick={() => toggle(order.id)}  style={{ marginLeft: "10px" }}>
                    Revert
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Order;
