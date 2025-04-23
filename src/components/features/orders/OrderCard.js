// src/app/orders/OrderCard.js
export default function OrderCard({ order }) {
    return (
      <div className="border rounded-lg p-4 shadow-sm space-y-2">
        <h2 className="font-bold text-lg">{order.productName}</h2>
        <p>Order ID: {order.id}</p>
        <p>Status: <span className="capitalize font-semibold">{order.paymentStatus}</span></p>
        <p className="text-sm text-gray-500">Date: {new Date(order.createdAt).toLocaleString()}</p>
      </div>
    );
  }
  