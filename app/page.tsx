"use client";

import { useState, FormEvent } from "react";
import OgPreview from "./components/OgPreview";
import CodeEditor, { type FrameworkTab } from "./components/CodeEditor";

interface GenerateResult {
  title: string;
  metaDescription: string;
  keywords: string[];
  tags: {
    html: string;
    nextjs: string;
    angular: string;
    vue: string;
    reactHelmet: string;
    nuxt: string;
  };
}

const FRAMEWORK_TABS: FrameworkTab[] = [
  { key: "html", label: "HTML", language: "html" },
  { key: "nextjs", label: "Next.js", language: "typescript" },
  { key: "angular", label: "Angular", language: "typescript" },
  { key: "vue", label: "Vue", language: "html" },
  { key: "reactHelmet", label: "React Helmet", language: "typescript" },
  { key: "nuxt", label: "Nuxt", language: "typescript" },
];

export default function HomePage() {
  const [formData, setFormData] = useState({
    companyName: "",
    websiteUrl: "",
    pageType: "homepage",
    industry: "",
    targetAudience: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<GenerateResult | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate meta tags");
      }

      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-grid" />
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />

      <div className="app-container">
        <main className="main-content">
          <header className="header">
            <div className="header-badge">
              <span className="dot" />
              AI-Powered SEO Tool
            </div>
            <h1>
              <span className="gradient-text">Meta Tag</span> Generator
            </h1>
            <p>
              Generate production-ready, SEO-optimized meta tags for any framework
              — powered by Groq AI.
            </p>
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero"
              id="digital-heroes-btn"
            >
              Built for Digital Heroes
            </a>
          </header>

          <form onSubmit={handleSubmit} className="form-card" id="meta-form">
            <div className="form-card-title">Page Details</div>
            <p className="form-card-subtitle">
              Fill in your page info and let AI craft the perfect meta tags.
            </p>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="companyName" className="form-label">
                  Company Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  className="form-input"
                  placeholder="e.g. Acme Corp"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="websiteUrl" className="form-label">
                  Website URL <span className="required">*</span>
                </label>
                <input
                  type="url"
                  id="websiteUrl"
                  name="websiteUrl"
                  className="form-input"
                  placeholder="e.g. https://acme.com"
                  value={formData.websiteUrl}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="pageType" className="form-label">
                  Page Type <span className="required">*</span>
                </label>
                <select
                  id="pageType"
                  name="pageType"
                  className="form-select"
                  value={formData.pageType}
                  onChange={handleChange}
                  required
                >
                  <option value="homepage">Homepage</option>
                  <option value="blog">Blog Post</option>
                  <option value="product">Product Page</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="industry" className="form-label">
                  Industry <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  className="form-input"
                  placeholder="e.g. SaaS, E-commerce, Healthcare"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="targetAudience" className="form-label">
                  Target Audience <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="targetAudience"
                  name="targetAudience"
                  className="form-input"
                  placeholder="e.g. Small business owners, Developers"
                  value={formData.targetAudience}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="description" className="form-label">
                  Page Description <span className="required">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="form-textarea"
                  placeholder="Describe what your page is about — the more detail, the better the results..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                />
              </div>
            </div>

            {error && (
              <div className="error-msg" id="error-message">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn-generate"
              disabled={loading}
              id="generate-btn"
            >
              {loading ? (
                <>
                  <div className="spinner" />
                  Generating with AI...
                </>
              ) : (
                "Generate Meta Tags"
              )}
            </button>
          </form>

          {result && (
            <section className="results-section" id="results">
              <div className="results-header">
                <div className="check-icon">✓</div>
                <div>
                  <h2>Generated Meta Tags</h2>
                  <p className="results-subtitle">
                    Preview how your page appears across platforms, then copy code for your framework.
                  </p>
                </div>
              </div>

              <OgPreview
                title={result.title}
                description={result.metaDescription}
                url={formData.websiteUrl}
                companyName={formData.companyName}
              />

              <div className="meta-details">
                <div className="meta-detail-card">
                  <span className="meta-detail-label">Page Title</span>
                  <p className="meta-detail-value meta-detail-title">{result.title}</p>
                  <span className="meta-detail-count">{result.title.length} chars</span>
                </div>
                <div className="meta-detail-card">
                  <span className="meta-detail-label">Meta Description</span>
                  <p className="meta-detail-value">{result.metaDescription}</p>
                  <span className="meta-detail-count">{result.metaDescription.length} chars</span>
                </div>
                <div className="meta-detail-card meta-detail-keywords">
                  <span className="meta-detail-label">Keywords</span>
                  <div className="keywords-list">
                    {result.keywords.map((kw, i) => (
                      <span key={i} className="keyword-tag">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <CodeEditor tabs={FRAMEWORK_TABS} codeByTab={result.tags} />
            </section>
          )}
        </main>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-name">Raghvendra Misra</div>
            <a
              href="mailto:itsraghav12@gmail.com"
              className="footer-email"
              id="footer-email"
            >
              itsraghav12@gmail.com
            </a>
            <p className="footer-copy">
              © {new Date().getFullYear()} Meta Tag Generator · Powered by Groq AI
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
