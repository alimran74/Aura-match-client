import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className="relative inline-flex">
  <span
    className="inline-flex divide-x divide-gray-300 overflow-hidden rounded border border-gray-300 bg-white shadow-sm"
  >
    <button
      type="button"
      className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative"
    >
      Product
    </button>

    <button
      type="button"
      className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative"
      aria-label="Menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-4"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    </button>
  </span>

  <div
    role="menu"
    className="absolute end-0 top-12 z-auto w-56 overflow-hidden rounded border border-gray-300 bg-white shadow-sm"
  >
    <a
      href="#"
      className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
      role="menuitem"
    >
      Storefront
    </a>

    <a
      href="#"
      className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
      role="menuitem"
    >
      Warehouse
    </a>

    <a
      href="#"
      className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
      role="menuitem"
    >
      Stock
    </a>

    <button
      type="button"
      className="block w-full px-3 py-2 text-left text-sm font-medium text-red-700 transition-colors hover:bg-red-50"
    >
      Delete
    </button>
  </div>
</div>
    </>
  )
}

export default App
