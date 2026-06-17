interface OgPreviewProps {
  title: string;
  description: string;
  url: string;
  companyName: string;
}

function getDomain(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").split("/")[0] || "example.com";
  }
}

function getDisplayUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname === "/" ? "" : parsed.pathname;
    return `${parsed.hostname.replace(/^www\./, "")}${path}`;
  } catch {
    return url;
  }
}

export default function OgPreview({
  title,
  description,
  url,
  companyName,
}: OgPreviewProps) {
  const domain = getDomain(url);
  const displayUrl = getDisplayUrl(url);
  const initials = companyName
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <section className="og-preview-section">
      <div className="og-preview-header">
        <h3>Social & Search Previews</h3>
        <p>See how your page appears when shared or indexed</p>
      </div>

      <div className="og-preview-grid">
        {/* Google Search */}
        <article className="og-card og-card--google">
          <div className="og-card-platform">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google Search
          </div>
          <div className="og-card-body">
            <div className="google-result">
              <div className="google-result-site">
                <span className="google-favicon">{initials}</span>
                <div>
                  <div className="google-site-name">{companyName}</div>
                  <div className="google-site-url">{displayUrl}</div>
                </div>
              </div>
              <h4 className="google-title">{title}</h4>
              <p className="google-description">{description}</p>
            </div>
          </div>
        </article>

        {/* Facebook / LinkedIn OG */}
        <article className="og-card og-card--facebook">
          <div className="og-card-platform">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                fill="#1877F2"
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
            Facebook / LinkedIn
          </div>
          <div className="og-card-body">
            <div className="social-og-card">
              <div className="social-og-image">
                <div className="social-og-image-placeholder">
                  <span>og:image</span>
                  <small>1200 × 630</small>
                </div>
              </div>
              <div className="social-og-content">
                <span className="social-og-domain">{domain.toUpperCase()}</span>
                <h4 className="social-og-title">{title}</h4>
                <p className="social-og-description">{description}</p>
              </div>
            </div>
          </div>
        </article>

        {/* Twitter / X */}
        <article className="og-card og-card--twitter">
          <div className="og-card-platform">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                fill="currentColor"
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              />
            </svg>
            Twitter / X
          </div>
          <div className="og-card-body">
            <div className="twitter-card">
              <div className="twitter-card-image">
                <div className="social-og-image-placeholder twitter-placeholder">
                  <span>twitter:image</span>
                  <small>1200 × 675</small>
                </div>
              </div>
              <div className="twitter-card-content">
                <h4 className="twitter-card-title">{title}</h4>
                <p className="twitter-card-description">{description}</p>
                <span className="twitter-card-domain">{displayUrl}</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
