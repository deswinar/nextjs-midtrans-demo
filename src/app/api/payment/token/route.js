import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";

let snap = new Midtrans.Snap({
    isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export async function POST(request) {
    const { orderId, grossAmount } = await request.json();

    const parameter = {
        transaction_details: {
            order_id: orderId,
            gross_amount: grossAmount,
        },
        credit_card: {
            secure: true,
        },
    };

    try {
        const midtransResponse = await snap.createTransaction(parameter);
        console.log("Midtrans Response: ", midtransResponse);
        // Handle success response from Midtrans API
        return new NextResponse(JSON.stringify(midtransResponse), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error details:", error);

        return new NextResponse(
            JSON.stringify({
                message: "Midtrans Error",
                error: error.message,
                apiResponse: error.ApiResponse ?? null,
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}

export async function GET(request) {
    const { orderId } = request.nextUrl.searchParams;

    try {
        const statusResponse = await snap.transaction.status(orderId);
        return new Response(JSON.stringify(statusResponse), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify(error), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function DELETE(request) {
    const { orderId } = request.nextUrl.searchParams;

    try {
        const cancelResponse = await snap.transaction.cancel(orderId);
        return new Response(JSON.stringify(cancelResponse), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify(error), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function PUT(request) {
    const { orderId, grossAmount } = await request.json();

    const parameter = {
        transaction_details: {
            order_id: orderId,
            gross_amount: grossAmount,
        },
    };

    try {
        const updateResponse = await snap.transaction.update(orderId, parameter);
        return new Response(JSON.stringify(updateResponse), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify(error), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function PATCH(request) {
    const { orderId, grossAmount } = await request.json();

    const parameter = {
        transaction_details: {
            order_id: orderId,
            gross_amount: grossAmount,
        },
    };

    try {
        const patchResponse = await snap.transaction.patch(orderId, parameter);
        return new Response(JSON.stringify(patchResponse), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify(error), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}