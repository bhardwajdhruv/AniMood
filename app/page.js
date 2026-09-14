'use client'

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
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px"
    }}>
      <div className="fade-up" style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1 style={{
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 700,
          color: "white",
          marginBottom: "10px",
          letterSpacing: "-0.5px"
        }}>
          AniMood
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(0.9rem, 2vw, 1.1rem)" }}>
          How are you feeling today?
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
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