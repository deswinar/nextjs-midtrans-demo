// src/app/api/payment/webhook/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";
import { updateOrderById } from "@/libs/orders"; // Adjust the import path as necessary

export async function POST(req) {
  const body = await req.json();

  const {
    order_id,
    status_code,
    gross_amount,
    signature_key,
    transaction_status,
    fraud_status,
  } = body;

  console.log("📬 Received webhook payload:");
  console.log(JSON.stringify(body, null, 2));

  // Compute your own signature
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const input = order_id + status_code + gross_amount + serverKey;
  const computedSignature = crypto.createHash("sha512").update(input).digest("hex");

  console.log("🔐 Computed signature:", computedSignature);
  console.log("🔐 Signature from webhook:", signature_key);

  // Verify signature
  if (signature_key !== computedSignature) {
    console.error("❌ Signature mismatch. Webhook rejected.");
    return new NextResponse("Invalid signature", { status: 403 });
  }

  console.log("✅ Signature verified. Processing transaction status...");

  let statusToUpdate = "";

  switch (transaction_status) {
    case "capture":
      if (fraud_status === "challenge") {
        statusToUpdate = "challenged";
      } else if (fraud_status === "accept") {
        statusToUpdate = "success";
      }
      break;

    case "settlement":
      statusToUpdate = "settled";
      break;

    case "pending":
      statusToUpdate = "pending";
      break;

    case "deny":
      statusToUpdate = "denied";
      break;

    case "cancel":
      statusToUpdate = "canceled";
      break;

    case "expire":
      statusToUpdate = "expired";
      break;

    case "refund":
      statusToUpdate = "refunded";
      break;

    case "partial_refund":
      statusToUpdate = "partial_refund";
      break;

    default:
      console.log("ℹ️ Unhandled transaction status:", transaction_status);
      break;
  }

  if (statusToUpdate) {
    const updated = updateOrderById(order_id, {
      paymentStatus: statusToUpdate,
      updatedAt: new Date().toISOString(),
    });

    if (updated) {
      console.log("✅ Order updated:", updated);
    } else {
      console.warn("⚠️ Order not found:", order_id);
    }
  }

  return new NextResponse("Webhook received", { status: 200 });
}
