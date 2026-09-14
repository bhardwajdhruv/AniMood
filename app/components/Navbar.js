'use client'

import { useRouter } from 'next/navigation'
import { UserButton, useUser } from '@clerk/nextjs'

export default function Navbar() {
  const router = useRouter()
  const { isSignedIn, user } = useUser()

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: "14px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "rgba(10,10,20,0.6)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}>
      <span
        onClick={() => router.push('/')}
        style={{
          fontSize: "1.2rem",
          fontWeight: 700,
          color: "white",
          cursor: "pointer",
          letterSpacing: "-0.5px",
        }}
      >
        AniMood
      </span>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {isSignedIn ? (
          <>
            <button
              onClick={() => router.push('/watchlist')}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.7)",
                padding: "7px 16px",
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
              padding: "7px 18px",
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
    </nav>
  )
}