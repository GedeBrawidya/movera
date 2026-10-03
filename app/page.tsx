"use client";

import { useState, useRef, DragEvent, useEffect } from "react";

// ---- SVG Icons ---- //
const IconUpload = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const IconZap = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const IconShield = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const IconSparkles = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const IconDownload = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const IconTrash = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const IconCheck = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

const IconImage = () => (
  <svg width="44" height="44" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

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
  const toolSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!loading) {
      setProgress(0);
      return;
    }
    const t1 = setTimeout(() => setProgress(30), 200);
    const t2 = setTimeout(() => setProgress(65), 700);
    const t3 = setTimeout(() => setProgress(88), 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [loading]);

  const handleFileSelect = (selectedFile: File | null) => {
    if (!selectedFile) return;
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select a valid image file (JPG, PNG, WebP)");
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size must be under 10MB");
      return;
    }
    setFile(selectedFile);
    setError(null);
    setResult(null);

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(selectedFile);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files[0]);
  };

  const handleRemoveBackground = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch("/api/remove-bg", { method: "POST", body: formData });
      const contentType = res.headers.get("content-type");
      const isJson = contentType && contentType.includes("application/json");

      if (!res.ok) {
        const errorData = isJson ? await res.json() : { error: await res.text() };
        throw new Error(errorData.error || `Server error (${res.status})`);
      }
      const data = await res.json();
      if (!data.result) throw new Error(data.error || "No result returned from server");
      setProgress(100);
      setTimeout(() => setResult(data.result), 300);
    } catch (err) {
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
    <div className="page">
      {/* ---- NAVBAR ---- */}
      <header className="navbar">
        <div className="container navbar-inner">
          <a href="#" className="logo">
            <div className="logo-icon">M</div>
            <span className="logo-name">Movera</span>
          </a>

          <ul className="nav-links">
            <li><a href="#tool">Tool</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How it works</a></li>
          </ul>

          <button
            onClick={() => toolSectionRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="btn btn-primary">
            <IconUpload /> Upload Image
          </button>
        </div>
      </header>

      {/* ---- HERO SECTION ---- */}
      <section className="hero">
        <div className="container">
          <div style={{ marginBottom: "1.25rem", display: "inline-flex" }}>
            <span className="badge">
              ✨ Automatic AI Background Remover
            </span>
          </div>

          <h1 className="hero-title">
            Remove Backgrounds <span className="highlight">Instantly</span>
          </h1>

          <p className="hero-desc">
            High-precision background removal powered by AI. Get clean transparent PNG images in seconds, completely free.
          </p>

          <div className="hero-tags">
            <div className="hero-tag">
              <span className="check">✓</span> No Registration Needed
            </div>
            <div className="hero-tag">
              <span className="check">✓</span> 100% Free HD Download
            </div>
            <div className="hero-tag">
              <span className="check">✓</span> Fast &amp; Secure Processing
            </div>
          </div>
        </div>
      </section>

      {/* ---- INTERACTIVE TOOL SECTION ---- */}
      <section ref={toolSectionRef} id="tool" className="tool-section">
        <div className="container">
          <div className="tool-card">
            {!preview ? (
              /* ---- UPLOAD DROPZONE STATE ---- */
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`dropzone ${isDragging ? "active" : ""}`}>
                <div className="dropzone-icon">
                  <IconUpload />
                </div>

                <h3>Drop your image here, or browse</h3>
                <p>Supports JPG, PNG, and WebP files up to 10MB in size.</p>

                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                  className="btn btn-primary btn-lg">
                  Select Image File
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
                />
              </div>
            ) : (
              /* ---- EDITOR / COMPARISON STATE ---- */
              <div>
                <div className="tool-card-header">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span className="tool-card-title">Image Workspace</span>
                    {result && <span className="badge-success"><IconCheck /> Complete</span>}
                  </div>

                  <button onClick={handleReset} className="btn btn-danger-ghost">
                    <IconTrash /> Reset &amp; Clear
                  </button>
                </div>

                <div className="workspace-grid">
                  {/* Left: Original */}
                  <div className="workspace-panel">
                    <div className="panel-label">Original Image</div>

                    <div className="panel-image-area">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={preview} alt="Original" />
                    </div>

                    <div className="panel-meta">
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "180px" }}>
                        {file?.name}
                      </span>
                      <span>{(file ? file.size / (1024 * 1024) : 0).toFixed(2)} MB</span>
                    </div>

                    {!result && (
                      <button
                        onClick={handleRemoveBackground}
                        disabled={loading}
                        className="btn btn-primary btn-full">
                        {loading ? (
                          <>
                            <div className="spinner" /> Processing with AI ({progress}%)...
                          </>
                        ) : (
                          <>
                            <IconSparkles /> Remove Background Now
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Right: Result */}
                  <div className="workspace-panel">
                    <div className="panel-label">Transparent Result</div>

                    <div className="panel-image-area checkerboard">
                      {result ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={result} alt="Result" />
                      ) : (
                        <div className="panel-empty">
                          <IconImage />
                          <p>Result will appear here</p>
                          <span>Click &quot;Remove Background Now&quot; to begin</span>
                        </div>
                      )}
                    </div>

                    {result ? (
                      <button onClick={handleDownload} className="btn btn-primary btn-full">
                        <IconDownload /> Download Transparent PNG
                      </button>
                    ) : (
                      <div style={{ height: "42px" }} />
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Error banner */}
            {error && (
              <div className="error-box">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---- METRICS STRIP ---- */}
      <section className="section-sm section-dark">
        <div className="container">
          <div className="metrics-grid">
            <div className="metric-item">
              <div className="metric-value">10M+</div>
              <div className="metric-label">Images Processed</div>
            </div>
            <div className="metric-item">
              <div className="metric-value accent">&lt; 3s</div>
              <div className="metric-label">Average Speed</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">99.9%</div>
              <div className="metric-label">Accuracy Rate</div>
            </div>
            <div className="metric-item">
              <div className="metric-value accent">Free</div>
              <div className="metric-label">No Limits</div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- FEATURES ---- */}
      <section id="features" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Movera?</h2>
            <p className="section-subtitle">
              Built with cutting-edge computer vision models to deliver high accuracy without complexity.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <IconSparkles />
              </div>
              <h3>Pixel-Perfect Precision</h3>
              <p>Preserves delicate details like hair, fur, transparent glass, and fine object edges seamlessly.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <IconZap />
              </div>
              <h3>Lightning Fast Output</h3>
              <p>Process high-resolution images instantly. Get results in under 3 seconds without waiting in queues.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <IconShield />
              </div>
              <h3>Complete Data Privacy</h3>
              <p>Your images are processed securely and deleted immediately. We never store or retain your files.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- HOW IT WORKS ---- */}
      <section id="how-it-works" className="section section-dark">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Three Simple Steps</h2>
            <p className="section-subtitle">Effortlessly create transparent background graphics in seconds.</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-num">01</div>
              <h3>Upload Image</h3>
              <p>Select or drag and drop any image file from your device.</p>
            </div>

            <div className="step-card">
              <div className="step-num accent">02</div>
              <h3>AI Processing</h3>
              <p>Our neural network automatically separates subject from background.</p>
            </div>

            <div className="step-card">
              <div className="step-num">03</div>
              <h3>Download PNG</h3>
              <p>Save your high-resolution PNG with transparent background instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- CTA BANNER ---- */}
      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <h2>Ready to remove backgrounds?</h2>
            <p>Try Movera now — 100% free, no credit card required.</p>
            <button
              onClick={() => toolSectionRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="btn btn-primary btn-lg">
              <IconUpload /> Get Started Free
            </button>
          </div>
        </div>
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <strong>Movera AI</strong>
            <span>— Free AI Background Remover</span>
          </div>
          <div className="footer-copy">
            © {new Date().getFullYear()} Movera. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
