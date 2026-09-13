'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function WatchlistPage() {
  const router = useRouter()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadWatchlist() {
      try {
        const res = await fetch('/api/watchlist')
        const data = await res.json()
        if (data.success) setItems(data.data)
      } finally {
        setLoading(false)
      }
    }
    loadWatchlist()
  }, [])

  // jQuery filter — runs after items load
  useEffect(() => {
    if (!loading && items.length > 0) {
      const $ = window.$
      if (!$) return

      $('#search-input').on('input', function () {
        const query = $(this).val().toLowerCase()
        $('.anime-card').each(function () {
          const title = $(this).data('title').toLowerCase()
          if (title.includes(query)) {
            $(this).fadeIn(200)
          } else {
            $(this).fadeOut(200)
          }
        })
      })
    }

    return () => {
      const $ = window.$
      if ($) $('#search-input').off('input')
    }
  }, [loading, items])

  async function handleRemove(malId) {
    const $ = window.$
    if ($) {
      $(`#card-${malId}`).slideUp(300, async () => {
        await fetch(`/api/watchlist?malId=${malId}`, { method: 'DELETE' })
        setItems(prev => prev.filter(item => item.malId !== malId))
      })
    } else {
      await fetch(`/api/watchlist?malId=${malId}`, { method: 'DELETE' })
      setItems(prev => prev.filter(item => item.malId !== malId))
    }
  }

  return (
    <main style={{ minHeight: "100vh", padding: "40px 24px", maxWidth: "1100px", margin: "0 auto" }}>

      <div className="fade-up" style={{ marginBottom: "40px" }}>
        <button
          onClick={() => router.push('/')}
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.6)",
            padding: "8px 20px",
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: "0.85rem",
            marginBottom: "28px",
            display: "block",
          }}
        >
          ← Back to moods
        </button>

        <h1 style={{ fontSize: "2.4rem", fontWeight: 700, color: "white", marginBottom: "6px" }}>
          My Watchlist
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem", marginBottom: "24px" }}>
          {items.length} anime saved
        </p>

        {items.length > 0 && (
          <input
            id="search-input"
            type="text"
            placeholder="Search your watchlist..."
            style={{
              width: "100%",
              maxWidth: "400px",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.13)",
              borderRadius: "14px",
              padding: "10px 16px",
              color: "white",
              fontSize: "0.9rem",
              outline: "none",
              backdropFilter: "blur(10px)",
            }}
          />
        )}
      </div>

      {loading && (
        <p style={{ color: "rgba(255,255,255,0.4)", textAlign: "center", marginTop: "80px" }}>
          Loading watchlist...
        </p>
      )}

      {!loading && items.length === 0 && (
        <div style={{ textAlign: "center", marginTop: "80px" }}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "1rem", marginBottom: "20px" }}>
            No anime saved yet
          </p>
          <button
            onClick={() => router.push('/')}
            style={{
              background: "linear-gradient(135deg, #7c3aed, #db2777)",
              border: "none",
              color: "white",
              padding: "10px 24px",
              borderRadius: "22px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "0.9rem",
            }}
          >
            Discover Anime
          </button>
        </div>
      )}

      {!loading && items.length > 0 && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "16px",
        }}>
          {items.map((item, index) => (
            <div
              key={item.malId}
              id={`card-${item.malId}`}
              className="anime-card glass fade-up"
              data-title={item.title}
              style={{
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div style={{ position: "relative", paddingTop: "140%", overflow: "hidden" }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    position: "absolute",
                    top: 0, left: 0,
                    width: "100%", height: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => router.push(`/anime/${item.malId}`)}
                />
                <div style={{
                  position: "absolute",
                  top: "8px", right: "8px",
                  background: "rgba(0,0,0,0.7)",
                  backdropFilter: "blur(6px)",
                  borderRadius: "10px",
                  padding: "3px 8px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#fbbf24",
                }}>
                  ★ {item.score || "N/A"}
                </div>
              </div>

              <div style={{ padding: "12px" }}>
                <p style={{
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  marginBottom: "10px",
                  lineHeight: 1.3,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}>
                  {item.title}
                </p>

                <button
                  onClick={() => handleRemove(item.malId)}
                  style={{
                    width: "100%",
                    background: "rgba(239,68,68,0.15)",
                    border: "1px solid rgba(239,68,68,0.3)",
                    color: "rgba(239,68,68,0.8)",
                    padding: "6px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}