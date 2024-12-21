import { NextResponse } from "next/server";
import { connectToDB } from "../../lib/db";
import { Ingredients } from "../../lib/models";
export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { name, quantity, notes } = body;

    // Validate input
    if (!name || !quantity) {
      return NextResponse.json(
        { error: "requires in the request body." },
        { status: 400 }
      );
    }

    console.log("Received message:", name, quantity, quantity);

    const newItems = new Ingredients({
      name,
      quantity,
      notes,
    });

    await newItems.save();
    console.log(newItems);

    // do anything

    return NextResponse.json({
      data: newItems,
    });
  } catch (err) {
    console.error("Error :", err);

    return NextResponse.json(
      { error: "Failed to fetch the response" },
      { status: 500 }
    );
  }
}
