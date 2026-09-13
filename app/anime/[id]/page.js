'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { fetchAnimeById } from '../../lib/fetchAnime'

export default function AnimeDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id
  const { isSignedIn } = useUser()

  const [anime, setAnime] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    async function loadAnime() {
      try {
        setLoading(true)
        const data = await fetchAnimeById(id)
        setAnime(data)
      } catch (err) {
        setError("Couldn't load anime details.")
      } finally {
        setLoading(false)
      }
    }
    loadAnime()
  }, [id])

  async function handleAddToWatchlist() {
    if (!isSignedIn) {
      router.push('/sign-in')
      return
    }

    try {
      setAdding(true)
      const res = await fetch('/api/watchlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          malId: anime.mal_id,
          title: anime.title,
          image: anime.images?.jpg?.large_image_url,
          score: anime.score,
          episodes: anime.episodes,
          synopsis: anime.synopsis,
        })
      })

      const data = await res.json()
      if (data.success) {
        setAdded(true)
      } else {
        alert(data.error)
      }
    } catch (err) {
      alert("Something went wrong.")
    } finally {
      setAdding(false)
    }
  }

  if (loading) return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "rgba(255,255,255,0.5)" }}>Loading anime...</p>
    </main>
  )

  if (error) return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#f87171" }}>{error}</p>
    </main>
  )

  return (
    <main style={{ minHeight: "100vh", padding: "40px 24px", maxWidth: "900px", margin: "0 auto" }}>

      <button
        onClick={() => router.back()}
        className="fade-up"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "rgba(255,255,255,0.6)",
          padding: "8px 20px",
          borderRadius: "20px",
          cursor: "pointer",
          fontSize: "0.85rem",
          marginBottom: "32px",
          display: "block",
        }}
      >
        ← Back
      </button>

      <div className="fade-up" style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
        <img
          src={anime.images?.jpg?.large_image_url}
          alt={anime.title}
          style={{
            width: "220px",
            borderRadius: "16px",
            objectFit: "cover",
            flexShrink: 0,
            alignSelf: "flex-start",
          }}
        />

        <div style={{ flex: 1, minWidth: "260px" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "white", marginBottom: "8px", lineHeight: 1.2 }}>
            {anime.title}
          </h1>

          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem", marginBottom: "20px" }}>
            {anime.title_english && anime.title_english !== anime.title ? anime.title_english : ""}
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "20px" }}>
            {[
              { label: "Score",    value: anime.score    ? `★ ${anime.score}` : "N/A" },
              { label: "Episodes", value: anime.episodes || "?" },
              { label: "Status",   value: anime.status   || "Unknown" },
              { label: "Year",     value: anime.year     || "?" },
            ].map(({ label, value }) => (
              <div key={label} className="glass" style={{ padding: "10px 16px", textAlign: "center" }}>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", marginBottom: "4px" }}>{label}</p>
                <p style={{ color: "white", fontWeight: 600, fontSize: "0.9rem" }}>{value}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
            {anime.genres?.map((g) => (
              <span key={g.mal_id} style={{
                background: "rgba(124,58,237,0.3)",
                border: "1px solid rgba(124,58,237,0.5)",
                color: "rgba(255,255,255,0.8)",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "0.75rem",
              }}>
                {g.name}
              </span>
            ))}
          </div>

          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "24px" }}>
            {anime.synopsis || "No synopsis available."}
          </p>

          <button
            onClick={handleAddToWatchlist}
            disabled={adding || added}
            style={{
              background: added
                ? "rgba(16,185,129,0.3)"
                : "linear-gradient(135deg, #7c3aed, #db2777)",
              border: added ? "1px solid rgba(16,185,129,0.5)" : "none",
              color: "white",
              padding: "12px 28px",
              borderRadius: "24px",
              cursor: adding || added ? "default" : "pointer",
              fontWeight: 600,
              fontSize: "0.95rem",
              transition: "all 0.3s ease",
            }}
          >
            {added ? "✓ Added to Watchlist" : adding ? "Adding..." : "+ Add to Watchlist"}
          </button>

          {!isSignedIn && (
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", marginTop: "10px" }}>
              Sign in to save anime to your watchlist
            </p>
          )}
        </div>
      </div>
    </main>
  )
}