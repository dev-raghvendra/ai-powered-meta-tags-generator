# AI-Powered Meta Tags Generator

A production-ready web application that generates SEO-optimized meta tags for any web framework using AI. Powered by [Groq](https://console.groq.com/) and built with [Next.js](https://nextjs.org/).

## Features

✨ **AI-Powered Generation**
- Uses Groq's Llama 3.3-70B model for intelligent, context-aware meta tag generation
- Analyzes your page description to extract key topics and value propositions
- Generates plain-language copy (no jargon) optimized for SEO and social sharing

🎯 **Multi-Framework Support**
Generate framework-specific code snippets for:
- HTML
- Next.js
- Angular
- Vue.js
- React Helmet
- Nuxt

📱 **Comprehensive Meta Tags**
- Page titles and descriptions (optimized character counts)
- Keywords (short-tail, long-tail, and intent-based queries)
- Open Graph tags for social media previews
- Twitter Card tags
- JSON-LD structured data
- Canonical URLs and robots directives

👁️ **Live Previews**
- See exactly how your page appears on Google search results
- Preview social media cards (LinkedIn, Facebook, Twitter)
- Monitor character counts to stay within SEO best practices

## Tech Stack

- **Framework**: Next.js 16.2.9 with App Router
- **Language**: TypeScript
- **UI**: React 19.2.4 with Tailwind CSS 4
- **AI Engine**: Groq SDK (Llama 3.3-70B model)
- **Code Editor**: Monaco Editor
- **Syntax Highlighting**: PrismJS

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- A Groq API key (free tier available at [console.groq.com](https://console.groq.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd assignment-2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the project root:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Fill in the form** with your page details:
   - Company name
   - Website URL
   - Page type (Homepage, Blog Post, or Product Page)
   - Industry
   - Target audience
   - Detailed page description

2. **Click "Generate Meta Tags"** and wait for AI to process your input

3. **View the results**:
   - See a preview of how your page appears in search results
   - Check title, description, and keyword suggestions
   - Copy framework-specific code snippets

4. **Integrate into your project** by copying the generated code for your framework

## Project Structure

```
app/
├── api/
│   └── generate/
│       └── route.ts           # API handler for meta tag generation
├── components/
│   ├── CodeEditor.tsx         # Framework-specific code editor
│   └── OgPreview.tsx          # Social media preview component
├── page.tsx                   # Main form and results page
├── layout.tsx                 # Root layout
└── globals.css               # Global styles
```

## Available Scripts

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## How It Works

### Generation Flow

1. **Form Submission**: User provides page details
2. **API Request**: Data sent to `/api/generate`
3. **AI Analysis**: Groq analyzes the page description to extract:
   - Primary keyword
   - Secondary keywords (5 items)
   - Key topics and features
   - Value propositions
   - Audience hooks
4. **Meta Tag Generation**: AI generates SEO-optimized fields:
   - Title (50-60 chars)
   - Meta description (140-160 chars)
   - Keywords array (12 items)
5. **Framework Code**: AI produces ready-to-use code for all 6 frameworks
6. **Response**: Results displayed with live preview and copy buttons

### AI Prompt Strategy

- **Plain Language Rule**: Technical jargon (PaaS, SaaS, etc.) is translated to plain language in user-facing copy
- **Description-First**: All content is derived from the page description, not generic templates
- **SEO Compliance**: Titles and descriptions follow Google's recommended character limits
- **Context Awareness**: Generated content accounts for industry, target audience, and page type

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GROQ_API_KEY` | Your Groq API key for LLM access | ✅ Yes |

Get your free API key: [console.groq.com](https://console.groq.com/)

## Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add the `GROQ_API_KEY` environment variable in Vercel settings
4. Deploy

```bash
vercel
```

### Deploy Elsewhere

The app can be deployed to any platform that supports Node.js:
- AWS (EC2, Amplify, App Runner)
- Google Cloud (App Engine, Cloud Run)
- DigitalOcean (App Platform)
- Heroku
- Railway
- Render

Remember to set the `GROQ_API_KEY` environment variable on your platform.

## Performance Tips

- **Groq API**: Uses fast inference; typical generation takes 3-5 seconds
- **Caching**: Consider caching results for identical inputs to reduce API calls
- **Rate Limiting**: Implement rate limiting if exposing this publicly

## Troubleshooting

### "Groq API key is not configured correctly"
- Ensure `GROQ_API_KEY` is set in `.env.local`
- Remove any quotes around the key value
- Verify the key is valid at [console.groq.com](https://console.groq.com/)

### Generation timeout
- Check your internet connection
- Verify Groq API is accessible
- Try again in a few moments

### Framework code looks incorrect
- Ensure your page description includes relevant details
- The more specific your description, the better the results

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Author

**Raghvendra Misra**
- Email: itsraghav12@gmail.com
- Website: [Digital Heroes](https://digitalheroesco.com)

## Powered By

- [Groq](https://groq.com/) - Fast LLM inference
- [Next.js](https://nextjs.org/) - React framework
- [Vercel](https://vercel.com/) - Deployment platform
