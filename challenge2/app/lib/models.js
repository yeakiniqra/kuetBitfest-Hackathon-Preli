const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the ingredient
  quantity: { type: String, required: true }, // e.g., "2 cups", "1 tbsp"
  notes: { type: String, default: null }, // Additional notes, e.g., "chopped", "optional"
});

export const Ingredients =
  mongoose.models.Ingredients ||
  mongoose.model("Ingredients", ingredientSchema);

// {
//     "ingredients": [
//       { "name": "Flour", "quantity": "2 cups",  "notes": "sifted" },
//       { "name": "Butter", "quantity": "1 cup",  "notes": "softened" },
//       { "name": "Sugar", "quantity": "1.5 cups", "notes": "white and brown mixed" },
//       { "name": "Chocolate Chips", "notes": "semi-sweet" }
//     ],
// }
