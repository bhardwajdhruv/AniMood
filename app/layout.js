import "./globals.css"

export const metadata = {
  title: "AniMood",
  description: "Find anime based on your mood",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  )
}