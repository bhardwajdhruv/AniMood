'use client'

import { useRouter } from 'next/navigation'
import { UserButton, useUser } from '@clerk/nextjs'
import MoodCard from "./components/MoodCard"

const moods = [
  { mood: "Happy",     emoji: "😄" },
  { mood: "Sad",       emoji: "😢" },
  { mood: "Hype",      emoji: "⚡" },
  { mood: "Chill",     emoji: "😌" },
  { mood: "Dark",      emoji: "🌑" },
  { mood: "Romance",   emoji: "💖" },
  { mood: "Thriller",  emoji: "😱" },
  { mood: "Wholesome", emoji: "🌸" },
]

export default function Home() {
  const router = useRouter()
  const { isSignedIn, user } = useUser()

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px"
    }}>

      <div style={{
        position: "fixed",
        top: "20px",
        right: "24px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        zIndex: 10,
      }}>
        {isSignedIn ? (
          <>
            <button
              onClick={() => router.push('/watchlist')}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.7)",
                padding: "8px 16px",
                borderRadius: "20px",
                cursor: "pointer",
                fontSize: "0.85rem",
              }}
            >
              My Watchlist
            </button>
            <UserButton afterSignOutUrl="/" />
          </>
        ) : (
          <button
            onClick={() => router.push('/sign-in')}
            style={{
              background: "linear-gradient(135deg, #7c3aed, #db2777)",
              border: "none",
              color: "white",
              padding: "8px 18px",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: 600,
            }}
          >
            Sign In
          </button>
        )}
      </div>

      <div className="fade-up" style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: 700, color: "white", marginBottom: "10px", letterSpacing: "-0.5px" }}>
          AniMood
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.1rem" }}>
          {isSignedIn ? `Welcome back, ${user.firstName}!` : "How are you feeling today?"}
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px",
        width: "100%",
        maxWidth: "640px"
      }}>
        {moods.map((item, index) => (
          <MoodCard
            key={item.mood}
            mood={item.mood}
            emoji={item.emoji}
            delay={index * 60}
          />
        ))}
      </div>

    </main>
  )
}