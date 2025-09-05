export const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "500px",
        minHeight: 120,
        width: "100%",
        gap: 16,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          border: "6px solid #e0e0e0",
          borderTop: "6px solid var(--color-main)",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <span
        style={{ color: "var(--color-main)", fontWeight: 500, fontSize: 18 }}
      >
        Loading...
      </span>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
