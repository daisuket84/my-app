import { useState, useEffect } from 'react'

function App() {
  const [inputText, setInputText] = useState('')
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('my-memos')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('my-memos', JSON.stringify(items))
  }, [items])

  const handleAdd = () => {
    if (inputText === '') return
    const newItem = {
      id: Date.now(),
      text: inputText,
      date: new Date().toLocaleString()
    }
    setItems([...items, newItem])
    setInputText('')
  }

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    // Tailwindのクラス名（bg-gray-100, min-h-screen など）でデザインを指定
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">My Memo App</h1>
        
        <div className="flex gap-2 mb-6">
          <input 
            type="text" 
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="メモを入力..."
          />
          <button 
            onClick={handleAdd}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            追加
          </button>
        </div>

        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="border-b pb-3 flex justify-between items-start">
              <div className="flex-1">
                <p className="text-xs text-gray-400">{item.date}</p>
                <p className="text-gray-700 break-all">{item.text}</p>
              </div>
              <button 
                onClick={() => handleDelete(item.id)}
                className="text-red-400 hover:text-red-600 text-sm ml-2"
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App