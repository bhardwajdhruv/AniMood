'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function ResultsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mood = searchParams.get('mood') || 'Happy'

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px"
    }}>
      <div className="fade-up" style={{ textAlign: "center" }}>

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
            marginBottom: "32px",
            display: "block",
          }}
        >
          ← Back
        </button>

        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem", marginBottom: "12px" }}>
          Showing anime for
        </p>
        <h1 style={{ fontSize: "2.8rem", fontWeight: 700, color: "white", marginBottom: "8px" }}>
          {mood} mood
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem" }}>
          Fetching anime... (coming next week)
        </p>

      </div>
    </main>
  )
}