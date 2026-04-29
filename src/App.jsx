import { useState, useEffect } from 'react' // useEffect を追加
import './App.css'

function App() {
  const [inputText, setInputText] = useState('')
  
  // 1. 初期値を LocalStorage から読み込む
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('my-memos')
    return saved ? JSON.parse(saved) : []
  })

  // 2. items が更新されるたびに、LocalStorage に保存する
  useEffect(() => {
    localStorage.setItem('my-memos', JSON.stringify(items))
  }, [items])

  const handleAdd = () => {
    if (inputText === '') return
    setItems([...items, inputText])
    setInputText('')
  }

  const handleDelete = (index) => {
    const newItems = items.filter((_, i) => i !== index)
    setItems(newItems)
  }

  return (
    <div className="App">
      <h1>Persistent Memo App</h1>
      <input 
        type="text" 
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="メモを入力..."
      />
      <button onClick={handleAdd}>追加</button>

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => handleDelete(index)} style={{ marginLeft: '10px' }}>
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App