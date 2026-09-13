'use client'

import { useRouter } from 'next/navigation'

export default function AnimeCard({ anime, index }) {
  const router = useRouter()

  return (
    <div
      className="glass fade-up cursor-pointer hover:scale-105 transition-all duration-300"
      onClick={() => router.push(`/anime/${anime.mal_id}`)}
      style={{
        animationDelay: `${index * 50}ms`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ position: "relative", paddingTop: "140%", overflow: "hidden" }}>
        <img
          src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url}
          alt={anime.title}
          style={{
            position: "absolute",
            top: 0, left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(6px)",
          borderRadius: "10px",
          padding: "3px 8px",
          fontSize: "0.75rem",
          fontWeight: 700,
          color: "#fbbf24",
        }}>
          ★ {anime.score || "N/A"}
        </div>
      </div>

      <div style={{ padding: "14px" }}>
        <p style={{
          color: "white",
          fontWeight: 600,
          fontSize: "0.85rem",
          marginBottom: "6px",
          lineHeight: 1.3,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {anime.title}
        </p>
        <p style={{
          color: "rgba(255,255,255,0.45)",
          fontSize: "0.75rem",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          lineHeight: 1.4,
        }}>
          {anime.synopsis || "No synopsis available."}
        </p>
      </div>
    </div>
  )
}