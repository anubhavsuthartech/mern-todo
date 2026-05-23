import { useState, useEffect } from 'react'
import axios from 'axios'
import './Dashboard.css'

const API = 'http://localhost:5000/api/todos'

export default function Dashboard({ token, onLogout }) {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('medium')
  const [filter, setFilter] = useState('all')
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')
  const [loading, setLoading] = useState(true)
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    axios.get(API, { headers })
      .then(res => { setTodos(res.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, )

  const addTodo = async () => {
    if (!text.trim()) return
    const res = await axios.post(API, { text, priority }, { headers })
    setTodos([res.data, ...todos])
    setText('')
    setPriority('medium')
  }

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t._id === id)
    const res = await axios.put(`${API}/${id}`, { completed: !todo.completed }, { headers })
    setTodos(todos.map(t => t._id === id ? res.data : t))
  }

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`, { headers })
    setTodos(todos.filter(t => t._id !== id))
  }

  const saveEdit = async (id) => {
    if (!editText.trim()) return
    const res = await axios.put(`${API}/${id}`, { text: editText }, { headers })
    setTodos(todos.map(t => t._id === id ? res.data : t))
    setEditId(null)
    setEditText('')
  }

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const priorityColor = { high: '#ef4444', medium: '#f59e0b', low: '#22c55e' }
  const priorityBg = { high: '#450a0a', medium: '#451a03', low: '#052e16' }

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length,
    high: todos.filter(t => t.priority === 'high' && !t.completed).length
  }

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-logo">✅ TodoApp</div>
        <div className="user-info">
          <div className="user-avatar">{user.name?.[0]?.toUpperCase() || 'U'}</div>
          <div>
            <div className="user-name">{user.name}</div>
            <div className="user-email">{user.email}</div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: '#22c55e' }}>{stats.completed}</div>
            <div className="stat-label">Done</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: '#6366f1' }}>{stats.active}</div>
            <div className="stat-label">Active</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: '#ef4444' }}>{stats.high}</div>
            <div className="stat-label">Urgent</div>
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-title">Filter</div>
          {['all', 'active', 'completed'].map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? '📋 All Tasks' : f === 'active' ? '⏳ Active' : '✅ Completed'}
            </button>
          ))}
        </div>

        <button className="logout-btn" onClick={onLogout}>🚪 Logout</button>
      </div>

      {/* Main Content */}
      <div className="main">
        <div className="main-header">
          <div>
            <h1 className="main-title">My Tasks</h1>
            <p className="main-subtitle">
              {stats.active} task{stats.active !== 1 ? 's' : ''} remaining
            </p>
          </div>
        </div>

        {/* Add Todo */}
        <div className="add-card">
          <div className="add-row">
            <input
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTodo()}
              placeholder="What needs to be done? Press Enter or click Add..."
              className="add-input"
            />
            <select
              value={priority}
              onChange={e => setPriority(e.target.value)}
              className="priority-select"
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
            <button onClick={addTodo} className="add-btn">+ Add Task</button>
          </div>
        </div>

        {/* Todo List */}
        <div className="todo-list">
          {loading ? (
            <div className="empty-state">Loading your tasks...</div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🎉</div>
              <div>{filter === 'completed' ? 'No completed tasks yet' : filter === 'active' ? 'No active tasks!' : 'No tasks yet. Add one above!'}</div>
            </div>
          ) : (
            filtered.map(todo => (
              <div key={todo._id} className={`todo-card ${todo.completed ? 'done' : ''}`}>
                <div className="todo-left">
                  <button
                    className={`check-btn ${todo.completed ? 'checked' : ''}`}
                    onClick={() => toggleTodo(todo._id)}
                  >
                    {todo.completed ? '✓' : ''}
                  </button>
                  <div className="todo-content">
                    {editId === todo._id ? (
                      <input
                        className="edit-input"
                        value={editText}
                        onChange={e => setEditText(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') saveEdit(todo._id)
                          if (e.key === 'Escape') setEditId(null)
                        }}
                        autoFocus
                      />
                    ) : (
                      <span className="todo-text">{todo.text}</span>
                    )}
                    <span
                      className="priority-tag"
                      style={{
                        color: priorityColor[todo.priority],
                        background: priorityBg[todo.priority]
                      }}
                    >
                      {todo.priority}
                    </span>
                  </div>
                </div>
                <div className="todo-actions">
                  {editId === todo._id ? (
                    <>
                      <button className="action-btn save" onClick={() => saveEdit(todo._id)}>Save</button>
                      <button className="action-btn cancel" onClick={() => setEditId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="action-btn edit" onClick={() => { setEditId(todo._id); setEditText(todo.text) }}>✏️</button>
                      <button className="action-btn delete" onClick={() => deleteTodo(todo._id)}>🗑️</button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}