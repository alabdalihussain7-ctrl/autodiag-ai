import { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [text, setText] = useState("");
  const [carModel, setCarModel] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function diagnose() {
    if (!text.trim()) {
      setError("⚠️ يرجى وصف المشكلة أولاً");
      return;
    }
    setError("");
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, carModel }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data.result);
      }
    } catch (e) {
      setError("❌ تعذّر الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>AutoDiag AI — تشخيص أعطال السيارات</title>
        <meta name="description" content="تشخيص أعطال سيارتك بالذكاء الاصطناعي" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>🚗 AutoDiag AI</h1>
          <p style={styles.subtitle}>تشخيص أعطال السيارات بالذكاء الاصطناعي — دقيق، سريع، موثوق</p>
          <div style={styles.badge}>مدعوم بـ GPT-4o mini</div>
        </div>

        {/* Form */}
        <div style={styles.card}>
          <label style={styles.label}>🚘 موديل السيارة (اختياري)</label>
          <input
            style={styles.inputSmall}
            placeholder="مثال: Kia Cerato 2019"
            value={carModel}
            onChange={(e) => setCarModel(e.target.value)}
          />

          <label style={styles.label}>🔧 صف المشكلة</label>
          <textarea
            style={styles.textarea}
            placeholder="مثال: أسمع طقطقة من الأمام عند العبور على المطبات، وعجلة القيادة تهتز عند السرعة العالية"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
          />

          {error && <p style={styles.error}>{error}</p>}

          <button
            style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
            onClick={diagnose}
            disabled={loading}
          >
            {loading ? "⏳ جاري التحليل..." : "🔍 تحليل الآن"}
          </button>
        </div>

        {/* Result */}
        {result && (
          <div style={styles.resultCard}>
            <h2 style={styles.resultTitle}>📋 نتيجة التشخيص</h2>
            <pre style={styles.resultText}>{result}</pre>
          </div>
        )}

        {/* Features */}
        <div style={styles.features}>
          {[
            { icon: "🎯", text: "دقة عالية" },
            { icon: "⚡", text: "نتيجة فورية" },
            { icon: "💰", text: "تكلفة بالريال" },
            { icon: "🔒", text: "آمن وخاص" },
          ].map((f, i) => (
            <div key={i} style={styles.featureItem}>
              <span style={{ fontSize: 24 }}>{f.icon}</span>
              <span>{f.text}</span>
            </div>
          ))}
        </div>

        <p style={styles.footer}>AutoDiag AI © 2026 — للاستخدام الاسترشادي، راجع متخصصًا للتشخيص النهائي</p>
      </div>
    </>
  );
}

const styles = {
  container: {
    background: "#0b1220",
    minHeight: "100vh",
    padding: "40px 20px",
    color: "white",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    direction: "rtl",
    maxWidth: 720,
    margin: "0 auto",
  },
  header: { textAlign: "center", marginBottom: 32 },
  title: { fontSize: 36, margin: 0, fontWeight: "bold" },
  subtitle: { color: "#94a3b8", marginTop: 8, fontSize: 16 },
  badge: {
    display: "inline-block",
    marginTop: 10,
    background: "#1e3a5f",
    color: "#60a5fa",
    padding: "4px 14px",
    borderRadius: 20,
    fontSize: 13,
  },
  card: {
    background: "#111a2e",
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    border: "1px solid #1e3a5f",
  },
  label: { display: "block", marginBottom: 6, color: "#94a3b8", fontSize: 14 },
  inputSmall: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #1e3a5f",
    background: "#0b1220",
    color: "white",
    fontSize: 15,
    marginBottom: 16,
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #1e3a5f",
    background: "#0b1220",
    color: "white",
    fontSize: 15,
    resize: "vertical",
    boxSizing: "border-box",
  },
  error: { color: "#f87171", marginTop: 8, fontSize: 14 },
  button: {
    width: "100%",
    marginTop: 16,
    padding: "14px",
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    border: "none",
    color: "white",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 16,
    fontWeight: "bold",
    transition: "opacity 0.2s",
  },
  resultCard: {
    background: "#111a2e",
    borderRadius: 16,
    padding: 24,
    border: "1px solid #22c55e",
    marginBottom: 20,
  },
  resultTitle: { margin: "0 0 12px", color: "#22c55e", fontSize: 18 },
  resultText: {
    whiteSpace: "pre-wrap",
    fontSize: 14,
    lineHeight: 1.8,
    color: "#e2e8f0",
    margin: 0,
  },
  features: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  featureItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    color: "#94a3b8",
    fontSize: 13,
  },
  footer: { textAlign: "center", color: "#475569", fontSize: 12 },
};
