// src/app/api/orders/[id]/route.js
import { NextResponse } from "next/server";
import { readOrders, writeOrders } from "@/libs/orders";

export async function PUT(req, { params }) {
  const body = await req.json();
  const orders = readOrders();
  const index = orders.findIndex((o) => o.id === params.id);

  if (index === -1) {
    return NextResponse.json({ message: "Order not found" }, { status: 404 });
  }

  orders[index] = { ...orders[index], ...body };
  writeOrders(orders);

  return NextResponse.json({ message: "Order updated", order: orders[index] });
}

export async function DELETE(req, { params }) {
  const orders = readOrders();
  const filtered = orders.filter((o) => o.id !== params.id);
  writeOrders(filtered);

  return NextResponse.json({ message: "Order deleted" });
}
