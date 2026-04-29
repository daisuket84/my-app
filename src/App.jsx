import { useState } from 'react'
import './App.css'

function App() {
  const [inputText, setInputText] = useState('') // 入力中の文字
  const [items, setItems] = useState([])         // メモのリスト（配列）

  const handleAdd = () => {
    if (inputText === '') return // 空っぽなら何もしない
    setItems([...items, inputText]) // 今のリストに新しい文字を追加
    setInputText('') // 入力欄を空にする
  }

  const handleDelete = (index) => {
    const newItems = items.filter((_, i) => i !== index)
    setItems(newItems)
  }


  return (
    <div className="App">
      <h1>Simple Memo App</h1>
      
      <input 
        type="text" 
        value={inputText}
        onChange={(e) => setInputText(e.target.value)} // 文字を打つたびに状態を更新
        placeholder="メモを入力..."
      />
      <button onClick={handleAdd}>追加</button>
      <ul>
        {items.map((item, index) => (
          // <li>と<button>をkey付きのdiv かフラグメントで囲む
          <li key={index}>
            {item}
          <button onClick={()=> handleDelete(index)} style={{marginLeft:'10px'}}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App