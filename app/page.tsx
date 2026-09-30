"use client";

import { useState, useRef, DragEvent, useEffect } from "react";

// ---- Icon Components ---- //
const IconUpload = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const IconZap = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const IconShield = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const IconStar = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const IconDownload = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const IconX = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const IconCheck = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

const IconArrowRight = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const IconImage = () => (
  <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const IconSparkle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0L14.09 8.26L22 10L14.09 11.74L12 20L9.91 11.74L2 10L9.91 8.26L12 0Z" />
  </svg>
);

// ---- Loading Spinner ---- //
const Spinner = () => (
  <svg className="animate-spin" width="20" height="20" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

// ---- Features Data ---- //
const features = [
  {
    icon: <IconZap />,
    title: "Lightning Fast",
    description: "AI processes your image in under 3 seconds, no waiting around.",
    color: "from-violet-500/20 to-purple-500/10",
    borderColor: "rgba(139, 92, 246, 0.25)",
    iconBg: "rgba(139, 92, 246, 0.15)",
    iconColor: "#a78bfa",
  },
  {
    icon: <IconStar />,
    title: "Pixel Perfect",
    description: "Professional-grade edge detection preserves hair, fur, and fine details.",
    color: "from-blue-500/20 to-indigo-500/10",
    borderColor: "rgba(99, 102, 241, 0.25)",
    iconBg: "rgba(99, 102, 241, 0.15)",
    iconColor: "#818cf8",
  },
  {
    icon: <IconShield />,
    title: "Private & Secure",
    description: "Your images are never stored. Processed in real-time and discarded.",
    color: "from-emerald-500/20 to-teal-500/10",
    borderColor: "rgba(16, 185, 129, 0.25)",
    iconBg: "rgba(16, 185, 129, 0.15)",
    iconColor: "#34d399",
  },
];

const stats = [
  { value: "10M+", label: "Images Processed" },
  { value: "< 3s", label: "Processing Time" },
  { value: "99.9%", label: "Accuracy Rate" },
  { value: "Free", label: "To Get Started" },
];

const steps = [
  { num: "01", title: "Upload Image", desc: "Drag & drop or click to browse. Supports JPG, PNG, WebP up to 10MB." },
  { num: "02", title: "AI Processing", desc: "Our AI instantly detects and removes the background with precision." },
  { num: "03", title: "Download Result", desc: "Get your transparent PNG ready to use in any project." },
];

// ---- Main Component ---- //
export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Simulated progress animation during loading
  useEffect(() => {
    if (!loading) {
      setProgress(0);
      return;
    }
    setProgress(0);
    const intervals = [
      setTimeout(() => setProgress(20), 200),
      setTimeout(() => setProgress(45), 600),
      setTimeout(() => setProgress(70), 1200),
      setTimeout(() => setProgress(85), 2000),
    ];
    return () => intervals.forEach(clearTimeout);
  }, [loading]);

  const handleFileSelect = (selectedFile: File | null) => {
    if (!selectedFile) return;
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select a valid image file (JPG, PNG, WebP)");
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }
    setFile(selectedFile);
    setError(null);
    setResult(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(selectedFile);
    // Scroll to editor
    setTimeout(() => uploadRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch("/api/remove-bg", { method: "POST", body: formData });
      const contentType = res.headers.get("content-type");
      const isJson = contentType && contentType.includes("application/json");
      if (!res.ok) {
        const errorData = isJson ? await res.json() : { error: await res.text() };
        throw new Error(errorData.error || `Failed to remove background (${res.status})`);
      }
      if (!isJson) throw new Error("Server returned non-JSON response");
      const data = await res.json();
      if (!data.result) throw new Error(data.error || "No result returned from server");
      setProgress(100);
      setTimeout(() => setResult(data.result), 300);
    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : "Failed to remove background");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const link = document.createElement("a");
    link.href = result;
    link.download = `movera-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (!mounted) return null;

  return (
    <div className="bg-animated min-h-screen relative overflow-hidden" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="animate-orb absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.6) 0%, transparent 70%)" }} />
        <div className="animate-orb absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)", animationDelay: "3s" }} />
        <div className="animate-orb absolute top-[40%] right-[10%] w-[300px] h-[300px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)", animationDelay: "6s" }} />
      </div>

      {/* ---- NAVBAR ---- */}
      <nav className="relative z-50 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div style={{ backdropFilter: "blur(20px)", background: "rgba(8,11,20,0.7)" }}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-lg font-bold" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                <span className="gradient-text">Movera</span>
              </span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {["Features", "How it works", "Pricing"].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                  className="text-sm transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}>
                  {item}
                </a>
              ))}
            </div>

            {/* CTA */}
            <button className="btn-primary text-sm" onClick={() => uploadRef.current?.scrollIntoView({ behavior: "smooth" })}>
              <span>Try Free Now</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ---- HERO SECTION ---- */}
      <section className="relative z-10 pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-fadeInUp mb-6 flex justify-center">
            <div className="badge badge-purple">
              <IconSparkle />
              AI-Powered Background Removal
            </div>
          </div>

          {/* Headline */}
          <h1 className="animate-fadeInUp delay-100 text-5xl md:text-7xl font-black leading-tight mb-6"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif", letterSpacing: "-0.03em" }}>
            Remove Background
            <br />
            <span className="gradient-text">Instantly.</span>
          </h1>

          {/* Sub */}
          <p className="animate-fadeInUp delay-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}>
            Professional AI-powered background removal in one click.{" "}
            <span style={{ color: "var(--text-primary)" }}>Fast, precise, and free</span> to start.
          </p>

          {/* Hero CTAs */}
          <div className="animate-fadeInUp delay-300 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              className="btn-primary flex items-center gap-2 text-base px-8 py-4"
              onClick={() => uploadRef.current?.scrollIntoView({ behavior: "smooth" })}>
              <span className="flex items-center gap-2">
                <IconUpload />
                Upload Your Image
              </span>
            </button>
            <button className="btn-secondary text-base px-8 py-4 flex items-center gap-2"
              onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}>
              How it works <IconArrowRight />
            </button>
          </div>

          {/* Trust indicators */}
          <div className="animate-fadeInUp delay-400 mt-10 flex flex-wrap justify-center gap-6 text-sm"
            style={{ color: "var(--text-muted)" }}>
            {["✓ No signup required", "✓ 100% Free to try", "✓ Images never stored"].map((t) => (
              <span key={t} className="flex items-center gap-1">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ---- STATS STRIP ---- */}
      <section className="relative z-10 py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="glass rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="stat-number">{s.value}</div>
                <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- MAIN EDITOR ---- */}
      <section ref={uploadRef} id="editor" className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
              {result ? "✨ Background Removed!" : "Drop Your Image Here"}
            </h2>
            <p style={{ color: "var(--text-secondary)" }}>
              {result ? "Download your transparent PNG below" : "Supports JPG, PNG, WebP — up to 10MB"}
            </p>
          </div>

          {/* Editor Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* ---- Upload Panel ---- */}
            <div className="glass rounded-2xl p-6" style={{ border: "1px solid var(--border-subtle)" }}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-sm uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                  Original Image
                </h3>
                {file && (
                  <button onClick={handleReset}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-all"
                    style={{ color: "var(--text-muted)", background: "rgba(255,255,255,0.05)" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.background = "rgba(239,68,68,0.1)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}>
                    <IconX /> Clear
                  </button>
                )}
              </div>

              {/* Drop Zone */}
              <div
                className={`drop-zone relative ${isDragging ? "dragging" : ""} flex items-center justify-center`}
                style={{ minHeight: "320px" }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !preview && fileInputRef.current?.click()}
                id="drop-zone">

                {preview ? (
                  <div className="w-full h-full p-4">
                    <img src={preview} alt="Preview" className="w-full h-full object-contain rounded-lg"
                      style={{ maxHeight: "280px" }} />
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                        📎 {file?.name}
                      </p>
                      <button onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                        className="text-xs px-3 py-1 rounded-lg transition-colors"
                        style={{ color: "#a78bfa", background: "rgba(139,92,246,0.1)" }}>
                        Change
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-8 cursor-pointer">
                    <div className="animate-float mx-auto mb-5 w-20 h-20 rounded-2xl flex items-center justify-center"
                      style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", color: "#a78bfa" }}>
                      <IconUpload />
                    </div>
                    <p className="font-semibold mb-2">Drag & drop your image</p>
                    <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>or</p>
                    <button
                      className="btn-primary text-sm"
                      onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
                      <span>Browse Files</span>
                    </button>
                    <p className="text-xs mt-4" style={{ color: "var(--text-muted)" }}>
                      JPG · PNG · WebP · Max 10MB
                    </p>
                  </div>
                )}
              </div>

              <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
                onChange={(e) => handleFileSelect(e.target.files?.[0] || null)} />

              {/* Error */}
              {error && (
                <div className="mt-4 flex items-start gap-3 p-4 rounded-xl text-sm"
                  style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#fca5a5" }}>
                  <span className="mt-0.5 flex-shrink-0">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Progress Bar */}
              {loading && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-2" style={{ color: "var(--text-muted)" }}>
                    <span>Processing...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-1 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <div className="progress-bar transition-all duration-500" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="mt-5 flex gap-3">
                <button
                  id="remove-bg-btn"
                  onClick={handleUpload}
                  disabled={!file || loading}
                  className="btn-primary flex-1 flex items-center justify-center gap-2 py-3.5"
                  style={{ opacity: !file || loading ? 0.5 : 1, cursor: !file || loading ? "not-allowed" : "pointer" }}>
                  <span className="flex items-center gap-2">
                    {loading ? <><Spinner /> Removing...</> : <><IconSparkle /> Remove Background</>}
                  </span>
                </button>
              </div>
            </div>

            {/* ---- Result Panel ---- */}
            <div className="glass rounded-2xl p-6" style={{ border: "1px solid var(--border-subtle)" }}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-sm uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                  Result
                </h3>
                {result && (
                  <span className="badge badge-purple text-xs">
                    <IconCheck /> Ready
                  </span>
                )}
              </div>

              {result ? (
                <div className="space-y-4">
                  <div className="checkerboard rounded-xl flex items-center justify-center overflow-hidden"
                    style={{ minHeight: "280px" }}>
                    <img src={result} alt="Background removed" className="max-w-full max-h-72 object-contain" />
                  </div>
                  <button
                    id="download-btn"
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all"
                    style={{ background: "linear-gradient(135deg, #059669, #10b981)", color: "white" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg, #047857, #059669)"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 25px rgba(16,185,129,0.4)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "linear-gradient(135deg, #059669, #10b981)"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                    <IconDownload />
                    Download PNG
                  </button>
                  <button onClick={handleReset}
                    className="w-full py-2.5 rounded-xl text-sm transition-colors"
                    style={{ color: "var(--text-muted)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "var(--text-secondary)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; }}>
                    Process Another Image
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center"
                  style={{ minHeight: "320px" }}>
                  <div className="mb-5 opacity-20" style={{ color: "var(--text-muted)" }}>
                    <IconImage />
                  </div>
                  <p className="font-medium mb-2" style={{ color: "var(--text-muted)" }}>
                    Result will appear here
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-muted)", opacity: 0.6 }}>
                    Upload an image and click &quot;Remove Background&quot;
                  </p>
                  {loading && (
                    <div className="mt-6 flex items-center gap-2" style={{ color: "#a78bfa" }}>
                      <Spinner />
                      <span className="text-sm">AI is working its magic...</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---- HOW IT WORKS ---- */}
      <section id="how-it-works" className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="badge badge-purple mb-4 inline-flex">How it works</div>
            <h2 className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
              Three steps to perfection
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="glass glass-hover rounded-2xl p-7 relative overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                {/* Step number watermark */}
                <div className="absolute top-4 right-4 text-6xl font-black opacity-5"
                  style={{ color: "#a78bfa" }}>{step.num}</div>
                <div className="text-sm font-bold mb-4" style={{ color: "#a78bfa" }}>
                  Step {step.num}
                </div>
                <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- FEATURES ---- */}
      <section id="features" className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="badge badge-purple mb-4 inline-flex">Features</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
              Why choose <span className="gradient-text">Movera?</span>
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              Built with cutting-edge AI for results that professionals trust.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="glass glass-hover rounded-2xl p-7"
                style={{ border: `1px solid ${f.borderColor}` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: f.iconBg, color: f.iconColor }}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-lg mb-3">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CTA BANNER ---- */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl p-12 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(99,102,241,0.15) 50%, rgba(168,85,247,0.1) 100%)", border: "1px solid rgba(139,92,246,0.25)" }}>
            {/* Glow accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 opacity-30"
              style={{ background: "radial-gradient(circle, rgba(139,92,246,0.8) 0%, transparent 70%)", filter: "blur(20px)" }} />
            <div className="relative z-10">
              <div className="text-4xl mb-4">✨</div>
              <h2 className="text-3xl md:text-4xl font-black mb-4"
                style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
                Ready to remove backgrounds?
              </h2>
              <p className="mb-8 text-lg" style={{ color: "var(--text-secondary)" }}>
                Join millions of creators, marketers, and designers.
              </p>
              <button
                className="btn-primary text-base px-10 py-4"
                onClick={() => uploadRef.current?.scrollIntoView({ behavior: "smooth" })}>
                <span>Start for Free — No Signup</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="relative z-10 py-10 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-bold gradient-text">Movera</span>
          </div>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} Movera. Built with ❤️ and AI.
          </p>
          <div className="flex gap-4 text-sm" style={{ color: "var(--text-muted)" }}>
            <a href="#" className="transition-colors hover:text-white">Privacy</a>
            <a href="#" className="transition-colors hover:text-white">Terms</a>
            <a href="#" className="transition-colors hover:text-white">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
