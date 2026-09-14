export default function SkeletonCard() {
  return (
    <div
      className="glass"
      style={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{
        paddingTop: "140%",
        position: "relative",
        background: "rgba(255,255,255,0.05)",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
          animation: "shimmer 1.5s infinite",
        }} />
      </div>
      <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{
          height: "14px",
          background: "rgba(255,255,255,0.06)",
          borderRadius: "6px",
          width: "80%",
          overflow: "hidden",
          position: "relative",
        }}>
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
            animation: "shimmer 1.5s infinite",
          }} />
        </div>
        <div style={{
          height: "10px",
          background: "rgba(255,255,255,0.04)",
          borderRadius: "6px",
          width: "60%",
          overflow: "hidden",
          position: "relative",
        }}>
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
            animation: "shimmer 1.5s infinite",
          }} />
        </div>
      </div>
    </div>
  )
}