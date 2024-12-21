import { NextResponse } from "next/server";
import { Ollama } from "@langchain/ollama";
import {
  ChatPromptTemplate,
  FewShotChatMessagePromptTemplate,
} from "@langchain/core/prompts";

const llm = new Ollama({
  model: "qwen2.5-coder:1.5b",
  temperature: 0,
  maxRetries: 2,
});

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

    const examples = [
      {
        input: "I love to eat sweet",
        output: `You can cook Easy Chocolate Fudge
        
    Ingredients:
    - 3 cups granulated sugar
    - 1 1/2 cups (3 sticks) unsalted butter
    - 2/3 cup evaporated milk
    - 12 ounces semi-sweet chocolate chips
    - 7 ounces marshmallow creme
    - 1 teaspoon vanilla extract
    
    Instructions:
    1. Combine sugar, butter, and evaporated milk in a heavy saucepan. Bring to a rolling boil over medium heat, stirring constantly.
    2. Boil for 5 minutes, stirring constantly. Remove from heat.
    3. Stir in chocolate chips until melted.
    4. Stir in marshmallow creme and vanilla extract until smooth.
    5. Pour into a greased 9x13 inch pan.
    6. Let cool completely before cutting into squares.`,
      },
      {
        input: "I want to make something spicy",
        output: `You can cook Spicy Chicken Curry
    
    Ingredients:
    - 1 lb chicken, cut into pieces
    - 2 tablespoons vegetable oil
    - 1 onion, finely chopped
    - 2 garlic cloves, minced
    - 1 tablespoon ginger paste
    - 2 tomatoes, pureed
    - 2 teaspoons chili powder
    - 1 teaspoon turmeric powder
    - 1 teaspoon garam masala
    - 1 cup coconut milk
    - Salt to taste
    
    Instructions:
    1. Heat oil in a pan and sauté onions until golden brown.
    2. Add garlic and ginger paste; cook for 1 minute.
    3. Stir in chili powder, turmeric, and garam masala. Cook for 30 seconds.
    4. Add chicken pieces and cook until browned.
    5. Pour in pureed tomatoes and cook for 5 minutes.
    6. Add coconut milk and simmer for 20 minutes.
    7. Season with salt and serve with rice or naan.`,
      },
    ];

    const examplePrompt =
      ChatPromptTemplate.fromTemplate(`Human: I love to eat {input}.
    AI: {output}`);

    const fewShotPrompt = new FewShotChatMessagePromptTemplate({
      examplePrompt,
      examples,
      inputVariables: ["input"],
    });

    const finalPrompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You are an expert chef who provides detailed recipes, including ingredients and instructions, based on the user's preferences.",
      ],
      fewShotPrompt,
      ["human", "I love to eat {input}."],
    ]);

    const formattedChatPrompt = await finalPrompt.format({
      input: message,
    });

    const response = await llm.invoke(formattedChatPrompt);

    console.log("LLM Result:", response);

    return NextResponse.json({
      data: response,
    });
  } catch (err) {
    console.error("Error :", err);

    return NextResponse.json(
      { error: "Failed to fetch the response" },
      { status: 500 }
    );
  }
}