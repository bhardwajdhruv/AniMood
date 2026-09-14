import { ClerkProvider } from '@clerk/nextjs'
import Navbar from './components/Navbar'
import "./globals.css"

export const metadata = {
  title: "AniMood",
  description: "Find anime based on your mood",
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Navbar />
            <div style={{ paddingTop: "64px" }}>
              {children}
            </div>
          </div>
          <script
            src="https://code.jquery.com/jquery-3.7.1.min.js"
            crossOrigin="anonymous"
          />
        </body>
      </html>
    </ClerkProvider>
  )
}