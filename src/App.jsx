import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const PUBLIC_BASE = import.meta.env.VITE_PUBLIC_BASE_URL;

export default function App() {
  const [content, setContent] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [remainingViews, setRemainingViews] = useState("");
  const [pasteUrl, setPasteUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPasteUrl("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/pastes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          expires_at: expiresAt
            ? new Date(expiresAt).getTime()
            : undefined,
          remaining_views:
            remainingViews !== "" && Number(remainingViews) > 0
              ? Number(remainingViews)
              : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      // ✅ CORRECT paste view URL
      setPasteUrl(`${API_BASE}/pastes/${data.id}`);
      setContent("");
      setExpiresAt("");
      setRemainingViews("");
    } catch {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", fontFamily: "sans-serif" }}>
      <h1>Pastebin Lite</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your paste"
          rows={8}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          required
        />

        <div style={{ marginBottom: "10px" }}>
          <input
            type="datetime-local"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            style={{ width: "48%", marginRight: "4%" }}
          />

          <input
            type="number"
            min={1}
            value={remainingViews}
            onChange={(e) => setRemainingViews(e.target.value)}
            placeholder="Remaining views (optional)"
            style={{ width: "48%" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ padding: "10px 20px", cursor: loading ? "not-allowed" : "pointer" }}
        >
          {loading ? "Creating..." : "Create Paste"}
        </button>
      </form>

      {pasteUrl && (
        <p style={{ marginTop: "20px" }}>
          Paste created:{" "}
          <a href={pasteUrl} target="_blank" rel="noreferrer">
            {pasteUrl}
          </a>
        </p>
      )}

      {error && (
        <p style={{ marginTop: "20px", color: "red" }}>
          {error}
        </p>
      )}
    </div>
  );
}
