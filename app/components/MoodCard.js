'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function MoodCard({ mood, emoji, delay }) {
  const router = useRouter()
  const cardRef = useRef(null)

  useEffect(() => {
    const $ = window.$
    if (!$ || !cardRef.current) return

    $(cardRef.current).on('click', function (e) {
      const offset = $(this).offset()
      const x = e.pageX - offset.left
      const y = e.pageY - offset.top

      const ripple = $('<span class="ripple"></span>').css({
        left: x - 20,
        top: y - 20,
        width: 40,
        height: 40,
      })

      $(this).append(ripple)

      setTimeout(() => ripple.remove(), 600)
    })

    return () => {
      if ($ && cardRef.current) $(cardRef.current).off('click')
    }
  }, [])

  function handleClick() {
    setTimeout(() => router.push(`/results?mood=${mood}`), 300)
  }

  return (
    <div
      ref={cardRef}
      className="glass fade-up mood-card-wrap cursor-pointer flex flex-col items-center justify-center gap-3 hover:scale-105 transition-all duration-300"
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