export const fetchOrders = async (token: string) => {
  const response = await fetch("http://localhost:5154/v1/orders", {
    headers: {
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch orders");
  return await response.json();
};

export const updateOrder = async (token: string, orderId: number, updatedOrder: any) => {
  const response = await fetch(`http://localhost:5154/v1/orders/${orderId}`, {
    method: "PUT",
    headers: {
      Accept: "text/plain",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedOrder),
  });
  if (!response.ok) throw new Error("Failed to update order");
  return await response.json();
};

export const deleteOrder = async (token: string, orderId: number) => {
  const response = await fetch(`http://localhost:5154/v1/orders/${orderId}`, {
    method: "DELETE",
    headers: {
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to delete order");
  return true;
};
export const confirmOrder = async (token: string, orderId: number) => {
  const response = await fetch(`http://localhost:5154/v1/orders/confirm/${orderId}`, {
    method: "PUT",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to confirm order");
  return await response.json();
};
