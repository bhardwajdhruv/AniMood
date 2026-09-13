'use client'

import { useRouter } from 'next/navigation'

export default function MoodCard({ mood, emoji, delay }) {
  const router = useRouter()

  function handleClick() {
    router.push(`/results?mood=${mood}`)
  }

  return (
    <div
      className="glass fade-up cursor-pointer flex flex-col items-center justify-center gap-3 hover:scale-105 transition-all duration-300"
      onClick={handleClick}
      style={{
        animationDelay: `${delay}ms`,
        padding: "24px 16px",
        minHeight: "110px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.2)"
      }}
    >
      <span style={{ fontSize: "2.2rem", lineHeight: 1 }}>{emoji}</span>
      <span style={{ color: "white", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.05em" }}>
        {mood}
      </span>
    </div>
  )
}