import { NextResponse } from "next/server";
import { connectToDB } from "../../lib/db";
import { Ingredients } from "../../lib/models";
export async function PUT(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { id,name, quantity, notes } = body;

    // Validate input
    if (!id) {
      return NextResponse.json(
        { error: "ID is required for updating an ingredient" },
        { status: 400 }
      );
    }

    const updateFields = {};

    if (name) updateFields.name = name;
    if (quantity) updateFields.quantity = quantity;
    if (notes) updateFields.notes = notes;

    const updatedIngredient = await Ingredients.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );

    if (!updatedIngredient) {
      return NextResponse.json(
        { error: "Ingredient not found." },
        { status: 404 }
      );
    }

    console.log("Received message:", name, quantity, quantity);

    return NextResponse.json({
      message: "Ingredient updated successfully.",
      data: updatedIngredient,
    });
  } catch (err) {
    console.error("Error :", err);

    return NextResponse.json(
      { error: "Failed to fetch the response" },
      { status: 500 }
    );
  }
}
