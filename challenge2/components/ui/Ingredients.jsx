'use client'

import React, { useState } from 'react';

export default function IngredientsManager() {
  const [ingredients, setIngredients] = useState([
    { id: 1, name: 'Tomatoes', quantity: 5, notes: 'Fresh from market' },
    { id: 2, name: 'Chicken Breast', quantity: 2, notes: 'For dinner' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    quantity: '',
    notes: ''
  });

  const handleAddIngredient = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/itemAdd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newIngredient.name,
          quantity: Number(newIngredient.quantity),
          notes: newIngredient.notes
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add ingredient');
      }

      const data = await response.json();
      
      setIngredients([
        ...ingredients,
        data.data
      ]);

      setNewIngredient({
        name: '',
        quantity: '',
        notes: ''
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding ingredient:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">
          My <span className="text-emerald-600">Ingredients</span>
        </h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
        >
          Add Ingredient
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search ingredients..."
          className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
        />
      </div>

      {/* Add Ingredient Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Add New Ingredient</h2>
            <form onSubmit={handleAddIngredient}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newIngredient.name}
                    onChange={(e) => setNewIngredient({...newIngredient, name: e.target.value})}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    required
                    value={newIngredient.quantity}
                    onChange={(e) => setNewIngredient({...newIngredient, quantity: e.target.value})}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={newIngredient.notes}
                    onChange={(e) => setNewIngredient({...newIngredient, notes: e.target.value})}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    rows={3}
                    placeholder="Add any notes about the ingredient..."
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
                >
                  Add Ingredient
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ingredients List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient.id}
            className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{ingredient.name}</h3>
                <span className="text-gray-600">Quantity: {ingredient.quantity}</span>
              </div>
              <div className="flex gap-2">
                <button className="text-gray-400 hover:text-emerald-600">
                  Edit
                </button>
                <button className="text-gray-400 hover:text-red-600">
                  Delete
                </button>
              </div>
            </div>
            {ingredient.notes && (
              <div className="text-sm text-gray-500 mt-2">
                Notes: {ingredient.notes}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
