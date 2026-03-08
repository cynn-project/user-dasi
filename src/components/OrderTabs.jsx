export default function OrderTabs({ activeTab, onTabChange }) {
  const tabs = ["Semua", "Diproses", "Dikirim", "Selesai", "Dibatalkan"];
  return (
    <div style={{
      display: "flex", gap: 4, borderBottom: "1.5px solid var(--gray-200)",
      marginBottom: 24, fontFamily: "var(--font-body)",
    }}>
      {tabs.map(tab => (
        <button key={tab} onClick={() => onTabChange(tab)} style={{
          padding: "10px 18px", border: "none", background: "none",
          fontSize: 14, fontWeight: activeTab === tab ? 600 : 500,
          color: activeTab === tab ? "var(--blue-primary)" : "var(--gray-500)",
          cursor: "pointer", position: "relative", transition: "color .15s",
          borderBottom: activeTab === tab ? "2.5px solid var(--blue-primary)" : "2.5px solid transparent",
          marginBottom: -1.5,
        }}>
          {tab}
        </button>
      ))}
    </div>
  );
}
