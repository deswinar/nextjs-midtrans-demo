// src/app/orders/page.js
"use client";

import { useEffect, useState } from "react";
import OrderCard from "@/components/features/orders/OrderCard";
import { fetchOrders } from "@/libs/api";

const STATUS_OPTIONS = ["all", "pending", "success", "settled", "denied", "expired", "refunded"];

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders()
      .then(setOrders)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredOrders =
    filteredStatus === "all"
      ? orders
      : orders.filter((order) => order.paymentStatus === filteredStatus);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Your Transactions</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {STATUS_OPTIONS.map((status) => (
          <button
            key={status}
            onClick={() => setFilteredStatus(status)}
            className={`px-3 py-1 rounded-full border ${
              filteredStatus === status ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid gap-4">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
