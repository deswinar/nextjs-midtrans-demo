// src/lib/api.js
export async function fetchOrders() {
  const res = await fetch("/api/orders");
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export async function createOrder(order) {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  if (!res.ok) throw new Error("Failed to create order");
  return res.json();
}

export async function updateOrder(id, order) {
  const res = await fetch(`/api/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  if (!res.ok) throw new Error("Failed to update order");
  return res.json();
}

export async function deleteOrder(id) {
  const res = await fetch(`/api/orders/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete order");
  return res.json();
}

export async function fetchPaymentToken(orderId, grossAmount) {
  const res = await fetch("/api/payment/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orderId, grossAmount }),
  });
  if (!res.ok) throw new Error("Failed to fetch payment token");
  return res.json();
}