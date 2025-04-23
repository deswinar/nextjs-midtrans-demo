// src/app/api/orders/route.js
import { NextResponse } from "next/server";
import { readOrders, writeOrders } from "@/libs/orders";

export async function GET() {
  const orders = readOrders();
  return NextResponse.json(orders);
}

export async function POST(req) {
  const body = await req.json();
  const orders = readOrders();
  orders.push(body);
  writeOrders(orders);
  return NextResponse.json({ message: "Order created", order: body });
}
