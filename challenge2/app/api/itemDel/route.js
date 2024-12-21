import { NextResponse } from "next/server";
import { connectToDB } from "../../lib/db";
import { Ingredients } from "../../lib/models";
export async function DELETE(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { id } = body;

    // Validate input
    if (!id) {
      return NextResponse.json(
        { error: "ID is required for deleting an ingredient." },
        { status: 400 }
      );
    }

    const deletedIngredient = await Ingredients.findByIdAndDelete(id);

    if (!deletedIngredient) {
      return NextResponse.json(
        { error: "Ingredient not found." },
        { status: 404 }
      );
    }

    console.log("Received message:", id);

    

    return NextResponse.json({
      message: "Ingredient deleted successfully.",
      data: deletedIngredient,
    });
  } catch (err) {
    console.error("Error :", err);

    return NextResponse.json(
      { error: "Failed to fetch the response" },
      { status: 500 }
    );
  }
}
