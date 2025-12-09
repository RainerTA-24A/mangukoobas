import { useState } from 'react'
import './App.css'

const games = [
  { id: 1, title: 'Memory Match', category: 'Puzzle', plays: '', image: '' },
  { id: 2, title: 'Tic-Tac-Toe', category: 'Strategy', plays: '', image: '' },
  { id: 3, title: '', category: '', plays: '', image: '' },
  { id: 4, title: '', category: '', plays: '', image: '' },
  { id: 5, title: '', category: '', plays: '', image: '' },
  { id: 6, title: '', category: '', plays: '', image: '' },
  { id: 7, title: '', category: '', plays: '', image: '' },
  { id: 8, title: '', category: '', plays: '', image: '' },
  { id: 9, title: '', category: '', plays: '', image: '' },
  { id: 10, title: '', category: '', plays: '', image: '' },
  { id: 11, title: '', category: '', plays: '', image: '' },
  { id: 12, title: '', category: '', plays: '', image: '' },
]

const categories = [
  { name: 'Action', icon: '💥', color: '#ff4444' },
  { name: 'Racing', icon: '🏁', color: '#44aaff' },
  { name: 'Puzzle', icon: '🧩', color: '#aa44ff' },
  { name: 'Sports', icon: '⚽', color: '#44ff44' },
  { name: 'Arcade', icon: '👾', color: '#ffaa44' },
  { name: 'Strategy', icon: '♟️', color: '#ff44aa' },
  { name: 'Simulation', icon: '🎮', color: '#44ffaa' },
  { name: 'Girls', icon: '💖', color: '#ff69b4' },
  { name: 'Board Games', icon: '♟️', color: '#8b4513'},
]

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredGames = games.filter(game => {
    const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🎮</span>
            <span className="logo-text">Mängukoobas</span>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Otsi mänge..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-btn">🔍</button>
          </div>
          <nav className="nav-links">
            <a href="#" className="nav-link active">Avaleht</a>
            <a href="#" className="nav-link">Uued</a>
            <a href="#" className="nav-link">Populaarsed</a>
            <a href="#" className="nav-link">Logi sisse</a>
          </nav>
        </div>
      </header>

      {/* Categories */}
      <section className="categories">
        <button
          className={`category-btn ${selectedCategory === 'All' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('All')}
        >
          <span className="category-icon">🎯</span>
          <span>Kõik</span>
        </button>
        {categories.map(cat => (
          <button
            key={cat.name}
            className={`category-btn ${selectedCategory === cat.name ? 'active' : ''}`}
            style={{ '--cat-color': cat.color }}
            onClick={() => setSelectedCategory(cat.name)}
          >
            <span className="category-icon">{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </section>

      {/* Featured Banner */}
      <section className="featured-banner">
        <div className="banner-content">
          <h1>🔥 Nädala mäng</h1>
          <p>Mängi parimaid tasuta mänge otse brauseris!</p>
          <button className="play-now-btn">Mängi kohe! ▶</button>
        </div>
      </section>

      {/* Games Grid */}
      <section className="games-section">
        <h2 className="section-title">
          {selectedCategory === 'All' ? '🎮 Kõik mängud' : `${categories.find(c => c.name === selectedCategory)?.icon} ${selectedCategory} mängud`}
        </h2>
        <div className="games-grid">
          {filteredGames.map(game => (
            <div key={game.id} className="game-card">
              <div className="game-thumbnail">
                <span className="game-emoji">{game.image}</span>
                <div className="play-overlay">
                  <span className="play-icon">▶</span>
                </div>
              </div>
              <div className="game-info">
                <h3 className="game-title">{game.title}</h3>
                <div className="game-meta">
                  <span className="game-category">{game.category}</span>
                  <span className="game-plays">👁 {game.plays}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>🎮 Mängukoobas</h4>
            <p>Parimad tasuta online mängud!</p>
          </div>
          <div className="footer-section">
            <h4>Lingid</h4>
            <a href="#">Meist</a>
            <a href="#">Kontakt</a>
            <a href="#">Privaatsus</a>
          </div>
          <div className="footer-section">
            <h4>Jälgi meid</h4>
            <div className="social-links">
              <span>📘</span>
              <span>🐦</span>
              <span>📸</span>
              <span>▶️</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Mängukoobas. Kõik õigused kaitstud.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
