'use client'

type Props = {
  theme: 'dark' | 'light'
  setTheme: (value: 'dark' | 'light') => void
}

export default function ThemeToggle({ theme, setTheme }: Props) {
  return (
    <div className="absolute top-4 right-4 z-50">
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="bg-gray-800 text-white px-4 py-2 rounded shadow hover:bg-gray-700 transition"
      >
        {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </div>
  )
}
