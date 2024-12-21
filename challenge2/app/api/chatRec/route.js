import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { message } = body;

    // Validate input
    if (!message) {
      return NextResponse.json(
        { error: "message is required in the request body." },
        { status: 400 }
      );
    }

    console.log("Received message:", message);

    // do anything

    return NextResponse.json({
      data: message,
    });
  } catch (err) {
    console.error("Error :", err);

    return NextResponse.json(
      { error: "Failed to fetch the response" },
      { status: 500 }
    );
  }
}
