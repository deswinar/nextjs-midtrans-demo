// src/lib/orders.js
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/orders.json");

export const readOrders = () => {
  try {
    const file = fs.readFileSync(filePath, "utf-8");
    return file.trim() ? JSON.parse(file) : [];
  } catch (err) {
    console.error("Error reading orders:", err);
    return [];
  }
};

export const writeOrders = (orders) => {
  fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));
};

export const updateOrderById = (id, updates) => {
  const orders = readOrders();
  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) return null;
  orders[index] = { ...orders[index], ...updates };
  writeOrders(orders);
  return orders[index];
};
