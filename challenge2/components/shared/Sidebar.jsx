'use client'
import React, { useState } from 'react'
import Link from 'next/link'

const menuItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Recipes', href: '/recipes' },
  { label: 'Meal Planner', href: '/meal-planner' },
  { label: 'Cookbook', href: '/cookbook' },
]

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div 
      className={`h-screen flex flex-col justify-between transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
      style={{
        background: 'linear-gradient(to top, #80FF95, #22859B)',
      }}
    >
      <div>
        <div className="p-4 flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-white text-2xl font-bold">Kitchen Buddy</h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors duration-200"
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div>
        <nav className="mt-8">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link href={item.href} className="flex items-center text-white hover:bg-white/20 transition-colors duration-200 px-4 py-2">
                  <span className={`text-2xl ${isCollapsed ? 'mx-auto' : 'mr-4'}`}></span>
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="p-4">
        <button className="flex items-center text-white hover:bg-white/20 transition-colors duration-200 px-4 py-2 w-full">
          <span className={`text-2xl ${isCollapsed ? 'mx-auto' : 'mr-4'}`}></span>
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  )
}
