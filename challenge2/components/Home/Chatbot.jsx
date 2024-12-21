'use client'

import React, { useState, useRef, useEffect } from 'react';

export default function RecipeChatbot() {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: "Hi! I'm your Kitchen Buddy. Tell me what you're craving or what ingredients you have, and I'll suggest some recipes!"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to get recipe suggestion');
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        role: 'bot',
        content: data.data.content
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'bot',
        content: "I'm sorry, I couldn't process your request. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatRecipe = (content) => {
    // Check if the content contains recipe sections
    if (content.includes('Ingredients:') && content.includes('Instructions:')) {
      const sections = content.split(/(?=Ingredients:|Instructions:)/g);
      return sections.map((section, index) => (
        <div key={index} className="mb-4">
          {section.includes('Ingredients:') ? (
            <>
              <h3 className="font-semibold text-emerald-600 mb-2">Ingredients:</h3>
              <ul className="list-disc pl-5">
                {section
                  .replace('Ingredients:', '')
                  .split('\n')
                  .filter(item => item.trim())
                  .map((ingredient, idx) => (
                    <li key={idx} className="mb-1">{ingredient.trim()}</li>
                  ))}
              </ul>
            </>
          ) : section.includes('Instructions:') ? (
            <>
              <h3 className="font-semibold text-emerald-600 mb-2">Instructions:</h3>
              <ol className="list-decimal pl-5">
                {section
                  .replace('Instructions:', '')
                  .split('\n')
                  .filter(item => item.trim())
                  .map((step, idx) => (
                    <li key={idx} className="mb-1">{step.trim()}</li>
                  ))}
              </ol>
            </>
          ) : (
            <p>{section}</p>
          )}
        </div>
      ));
    }
    return content;
  };

  return (
    <div className="flex flex-col h-[600px] border border-gray-200 rounded-xl bg-gray-50">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-white rounded-t-xl">
        <h2 className="font-semibold text-gray-800">Kitchen Buddy</h2>
        <p className="text-sm text-gray-500">Your personal recipe assistant</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-lg ${
                message.role === 'user'
                  ? 'bg-emerald-600 text-white rounded-br-none'
                  : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
              }`}
            >
              {typeof message.content === 'string' 
                ? formatRecipe(message.content)
                : message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 rounded-lg rounded-bl-none shadow-sm p-4 max-w-[80%]">
              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:-.3s]" />
                <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:-.5s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Tell me what you're craving..."
            className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
