# kuetBitfest-Hackathon-Preli Project

## Challenge 1 (Banglish-to-Bengali Transliteration) 

### Tech stack :

- python
- jupyter notebook
  

### Code 
```bash
from transformers import MBartForConditionalGeneration, MBart50TokenizerFast
import torch

model_name = "facebook/mbart-large-50"
tokenizer = MBart50TokenizerFast.from_pretrained(model_name)
model = MBartForConditionalGeneration.from_pretrained(model_name)

print("Available Language Codes:", tokenizer.lang_code_to_id)

tokenizer.src_lang = "en_XX"  
target_language_code = "bn_IN"  

def transliterate_banglish_to_bengali(banglish_text):
    banglish_text = f"{tokenizer.src_lang} {banglish_text}"
    inputs = tokenizer(banglish_text, return_tensors="pt", max_length=512, truncation=True)
    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            forced_bos_token_id=tokenizer.lang_code_to_id[target_language_code]
        )
    
    bengali_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    print("Inputs:", inputs)
    print("Model Outputs:", outputs)
    print("Decoded Bengali Text:", bengali_text)
    return bengali_text

banglish_text = input("Enter Banglish Text: ")

bengali_output = transliterate_banglish_to_bengali(banglish_text)
print(f"Input: {banglish_text}")
print(f"Output: {bengali_output}")

```

## Challenge 2 (Mofa’s Kitchen Buddy)

### Tech Stack : 

- Next.js
- Langchain.js
- Ollama (model)
- MongoDB (database)

### Chat bot : 

```bash

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

```


```bash
- Route: /api/chatRec
Method: POST
Sample Payload:
```json
{
"response": "deleted",
}
```

### Add Ingredients : 

```bash
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
```

```bash
- Route: /api/itlemAdd
Method: POST
Sample Payload:
```json
{
"name": "Alu",
"quantity": "I cup alu",
"notes": "don't need"
}
```

### Delete Ingredients : 

```bash
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

```

```bash
- Route: /api/itemDel
Method: Delete
Sample Payload:
```json
{
"response": "deleted",
}
```


### Update Ingredients : 

```bash
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


```


```bash
- Route: /api/itemUp
Method: Delete
Sample Payload:
```json
{
"response": "deleted",
}
```

