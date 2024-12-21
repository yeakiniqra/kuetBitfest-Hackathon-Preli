'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

export default function MainContent() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hi! I'm your Kitchen Buddy. What would you like to cook today?" }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: inputMessage }]);
    
    // Simulate bot response - Replace with actual API call later
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: "I can help you with that! Based on your ingredients, I'd recommend trying..." 
      }]);
    }, 1000);

    setInputMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <span className="text-emerald-600">Dashboard</span>
        </div>
      </header>

      {/* Main Title */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">
          What are we cooking <span className="text-emerald-600">today</span>?
        </h1>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center gap-2">
          PREPARE
        </button>
      </div>

      {/* Enhanced Chatbot Interface */}
      <div className="border border-gray-200 rounded-xl mb-8 bg-gray-50 h-96 flex flex-col">
        {/* Chat Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-emerald-600 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me about recipes, ingredients, or cooking tips..."
              className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <button
              onClick={handleSendMessage}
              className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Personal Meal Plan */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl text-gray-800">
          <span className="font-semibold">Personal</span> meal plan
        </h2>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center gap-2">
          ADD INGREDIENTS
        </button>
      </div>

      {/* Meal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[ 
          {
            type: 'BREAKFAST',
            title: 'Toast with banana flavor',
            image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          },
          {
            type: 'LUNCH',
            title: 'Pizza with varian nut',
            image: 'https://images.unsplash.com/photo-1627662236973-4fd8358fa206?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          },
          {
            type: 'DINNER',
            title: 'Pancake with honey',
            image: 'https://images.unsplash.com/photo-1605926637512-c8b131444a4b?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          },
          {
            type: 'SUPPER',
            title: 'Set of salad',
            image: 'https://images.unsplash.com/photo-1522906456132-bac22adad34e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
        ].map((meal, index) => (
          <div key={index} className="relative group">
            <Image
              src={meal.image}
              alt={meal.title}
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-xl"
            />
            <button className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              {/* Icon placeholder, can replace with an alternative */}
              ❤️
            </button>
            <div className="absolute bottom-4 left-4 text-white">
              <div className="text-sm font-medium">{meal.type}</div>
              <div className="text-lg font-semibold">{meal.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
