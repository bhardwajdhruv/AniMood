'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import AnimeCard from '../components/AnimeCard'
import SkeletonCard from '../components/SkeletonCard'
import { fetchAnimeByMood } from '../lib/fetchAnime'

export default function ResultsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mood = searchParams.get('mood') || 'Happy'

  const [anime, setAnime] = useState([])
  const [label, setLabel] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadAnime() {
      try {
        setLoading(true)
        const result = await fetchAnimeByMood(mood)
        setAnime(result.anime)
        setLabel(result.label)
      } catch (err) {
        setError("Couldn't load anime. Please try again.")
      } finally {
        setLoading(false)
      }
    }
    loadAnime()
  }, [mood])

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
          ← Back
        </button>

        <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, color: "white", marginBottom: "6px" }}>
          {mood} mood
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem" }}>
          {label}
        </p>
      </div>

      {error && (
        <div style={{ textAlign: "center", color: "#f87171", marginTop: "80px" }}>
          {error}
        </div>
      )}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: "16px",
      }}>
        {loading
          ? Array(12).fill(0).map((_, i) => <SkeletonCard key={i} />)
          : anime.map((item, index) => (
              <AnimeCard key={item.mal_id} anime={item} index={index} />
            ))
        }
      </div>

    </main>
  )
}