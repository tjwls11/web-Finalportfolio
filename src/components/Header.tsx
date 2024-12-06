'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { FiAlignJustify } from 'react-icons/fi'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 py-6 px-8 flex items-center justify-between z-30 bg-gray-800">
        <div className="text-white font-black text-2xl">
          <Link href=".">Portfolio</Link>
        </div>
        <div className="hidden lg:flex space-x-4">
          <Link
            href="/about"
            className="hover:text-purple-400 transition text-white"
          >
            About
          </Link>
          <Link
            href="/study"
            className="hover:text-purple-400 transition text-white"
          >
            Study
          </Link>
          <Link
            href="/project"
            className="hover:text-purple-400 transition text-white"
          >
            Project
          </Link>
        </div>
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            <FiAlignJustify size={24} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="lg:hidden bg-gray-800 text-white mt-16 z-20 fixed top-0 left-0 right-0">
          <div className="flex flex-col space-y-4 p-4 text-lg font-bold ml-5">
            <Link
              href="/about"
              className="hover:text-purple-400 transition"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/study"
              className="hover:text-purple-400 transition"
              onClick={() => setMenuOpen(false)}
            >
              Study
            </Link>
            <Link
              href="/project"
              className="hover:text-purple-400 transition"
              onClick={() => setMenuOpen(false)}
            >
              Project
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
