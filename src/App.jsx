import { useState } from "react";

export default function App() {
  const [content, setContent] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [remainingViews, setRemainingViews] = useState("");
  const [pasteUrl, setPasteUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPasteUrl("");

    try {
      const response = await fetch("/api/paste", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          expires_at: expiresAt ? new Date(expiresAt).getTime() : undefined,
          remaining_views: remainingViews ? Number(remainingViews) : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setPasteUrl(`${process.env.PUBLIC_BASE_URL}/paste/${data.id}`);
      setContent("");
      setExpiresAt("");
      setRemainingViews("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "50px auto", fontFamily: "sans-serif" }}>
      <h1>Pastebin Lite</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your paste"
          rows={8}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
          required
        />
        <div style={{ marginBottom: 10 }}>
          <input
            type="datetime-local"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            placeholder="Expires at (optional)"
            style={{ width: "48%", marginRight: "4%" }}
          />
          <input
            type="number"
            value={remainingViews}
            onChange={(e) => setRemainingViews(e.target.value)}
            placeholder="Remaining views (optional)"
            style={{ width: "48%" }}
            min={1}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>
          Create Paste
        </button>
      </form>

      {pasteUrl && (
        <p style={{ marginTop: 20 }}>
          Paste created! <a href={pasteUrl} target="_blank">{pasteUrl}</a>
        </p>
      )}

      {error && (
        <p style={{ marginTop: 20, color: "red" }}>{error}</p>
      )}
    </div>
  );
}
