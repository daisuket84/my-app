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

    // 新しいメモオブジェクトを作る
    const newItem = {
      id: Date.now(), // 一意のIDとして現在の時間（ミリ秒）を使用
      text: inputText,
      date: new Date().toLocaleString() // 「2026/4/26 13:45:30」のような形式
    }

    setItems([...items, newItem])
    setInputText('')
  }

  const handleDelete = (id) => {
    // indexではなく、一意の id でフィルタリングする（より安全な方法）
    const newItems = items.filter((item) => item.id !== id)
    setItems(newItems)
  }

  return (
    <div className="App">
      <h1>Dated Memo App</h1>
      <input 
        type="text" 
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="メモを入力..."
      />
      <button onClick={handleAdd}>追加</button>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((item) => (
          <li key={item.id} style={{ borderBottom: '1px solid #ccc',padding: '10px', textAlign:'left'}}>
            <div style={{ fontSize: '0.8em', color: '#888'}}>{item.date}</div>
            <div style={{ fontSize: '1.2em'}}>{item.text}</div>
            <button onClick={() => handleDelete(item.id)} style={{ marginLeft: '10px' }}>
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App