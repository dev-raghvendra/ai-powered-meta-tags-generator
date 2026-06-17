import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { companyName, websiteUrl, pageType, industry, targetAudience, description } = body;

    if (!companyName || !websiteUrl || !pageType || !industry || !targetAudience || !description) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    let apiKey = process.env.GROQ_API_KEY;
    if (apiKey) {
      apiKey = apiKey.trim().replace(/^["']|["']$/g, "");
    }

    console.log("--- API Route Called ---");
    console.log("Raw process.env.GROQ_API_KEY exists:", !!process.env.GROQ_API_KEY);
    console.log("Cleaned API Key preview:", apiKey ? `${apiKey.slice(0, 6)}...${apiKey.slice(-4)} (length: ${apiKey.length})` : "none");

    if (!apiKey || apiKey === "your_groq_api_key_here") {
      return NextResponse.json(
        {
          error: `Groq API key is not configured correctly. The value found is "${apiKey}". Please update GROQ_API_KEY in your .env.local file.`,
        },
        { status: 500 }
      );
    }

    const groq = new Groq({ apiKey });

    const systemPrompt = `You are an expert SEO copywriter and front-end developer.

Your #1 job is to read the user's Page Description carefully and build every meta tag around the specific details in it — products, features, benefits, use cases, terminology, and value propositions mentioned there.

Never write generic filler like "leading provider of solutions" or "your trusted partner" unless the description itself says that.

PLAIN LANGUAGE RULE: Technical acronyms and jargon from the description (e.g. PaaS, SaaS, IaaS, B2B, DevOps, CI/CD) must NOT appear in user-facing copy — title, metaDescription, og:title, og:description, twitter:title, twitter:description, og:image:alt, or JSON-LD description. Use them only to understand context in the analysis step and keywords array. Replace with plain-language equivalents in all readable copy (e.g. PaaS → "cloud platform", SaaS → "online software", IaaS → "cloud infrastructure").

Always return valid JSON only. No markdown fences. No commentary outside JSON.`;

    const userPrompt = `Generate production-ready SEO meta tags for this page.

═══════════════════════════════════════════
PAGE DESCRIPTION (primary source — use this heavily)
═══════════════════════════════════════════
${description}

═══════════════════════════════════════════
CONTEXT
═══════════════════════════════════════════
Company: ${companyName}
URL: ${websiteUrl}
Page Type: ${pageType}
Industry: ${industry}
Target Audience: ${targetAudience}

═══════════════════════════════════════════
STEP 1 — Analyze the description (include in JSON)
═══════════════════════════════════════════
First, extract content directly from the Page Description above:
- "primaryKeyword": the single best SEO keyword phrase for this page
- "secondaryKeywords": 5 keyword phrases found in or strongly implied by the description
- "keyTopics": 4-6 specific topics, features, or offerings mentioned in the description
- "valuePropositions": 2-3 concrete benefits or outcomes stated in the description
- "audienceHooks": 2 phrases that would resonate with "${targetAudience}"

Every item above MUST come from the Page Description — do not invent unrelated topics.
Technical acronyms (PaaS, SaaS, etc.) may appear in analysis and keywords for SEO context, but translate them to plain language in primaryKeyword if used there.

═══════════════════════════════════════════
STEP 2 — Generate SEO fields using Step 1
═══════════════════════════════════════════

READABLE COPY RULE: title and metaDescription must use plain, audience-friendly language. Never include raw acronyms like PaaS, SaaS, IaaS, or other industry jargon — even if they appear in the Page Description. Use plain equivalents instead.

"title" (50-60 chars):
- Lead with primaryKeyword (plain-language version, no acronyms)
- Reference a specific topic or value from the description
- End with " | ${companyName}" or " — ${companyName}"

"metaDescription" (140-160 chars):
- Must mention at least 2 specific details from keyTopics or valuePropositions
- Speak directly to ${targetAudience} in plain language — no acronyms or jargon
- Include primaryKeyword once, naturally
- End with a relevant CTA tied to what the page actually offers

"keywords" (12 items):
- At least 8 must use words or phrases from the Page Description or secondaryKeywords
- Mix: 4 short-tail, 5 long-tail, 3 question/intent queries (e.g. "how to...", "best ... for ...")
- All relevant to ${industry} and ${pageType}
- Acronyms like PaaS or SaaS are allowed here only as searchable keyword terms, not in title or metaDescription

═══════════════════════════════════════════
STEP 3 — Generate framework code in "tags"
═══════════════════════════════════════════
Use ${websiteUrl} for all URLs. Use the title, metaDescription, and keywords from Step 2.
All og:title, og:description, twitter:title, twitter:description, and og:image:alt values must match the plain-language title and metaDescription — no acronyms or jargon in social preview text either.

Each framework string must be complete, copy-paste ready code with ALL of:

STANDARD: charset, viewport, title, description, keywords, author (${companyName}), robots (index,follow), canonical

OPEN GRAPH: og:type (${pageType === "blog" ? "article" : pageType === "product" ? "product" : "website"}), og:url, og:title, og:description, og:site_name, og:locale (en_US), og:image (${websiteUrl}/og-image.jpg), og:image:width (1200), og:image:height (630), og:image:alt (write a descriptive alt using keyTopics from Step 1 — at least 12 words)

TWITTER: twitter:card (summary_large_image), twitter:title, twitter:description, twitter:image, twitter:image:alt

JSON-LD: WebPage or ${pageType === "blog" ? "Article" : pageType === "product" ? "Product" : "Organization"} schema where "description" is a 2-3 sentence plain-language summary (40-80 words) — no acronyms like PaaS or SaaS; use full phrases instead

Framework formats:
- html: full <head> block + <script type="application/ld+json">, 2-space indent
- nextjs: import { Metadata } from "next"; export const metadata: Metadata = {...} with openGraph and twitter objects — must be a string
- angular: component with Meta + Title services, updateTag for every tag
- vue: useHead from @unhead/vue with full meta array
- reactHelmet: functional component with Helmet from react-helmet-async
- nuxt: useSeoMeta + useHead for JSON-LD

Escape newlines as \\n and quotes as \\" inside JSON string values.

═══════════════════════════════════════════
OUTPUT JSON SCHEMA
═══════════════════════════════════════════
{
  "analysis": {
    "primaryKeyword": "...",
    "secondaryKeywords": ["...", "...", "...", "...", "..."],
    "keyTopics": ["...", "...", "...", "..."],
    "valuePropositions": ["...", "..."],
    "audienceHooks": ["...", "..."]
  },
  "title": "...",
  "metaDescription": "...",
  "keywords": ["...", ...12 items],
  "tags": {
    "html": "...",
    "nextjs": "...",
    "angular": "...",
    "vue": "...",
    "reactHelmet": "...",
    "nuxt": "..."
  }
}`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 8192,
    });

    const text = chatCompletion.choices[0]?.message?.content ?? "";

    // Parse the JSON from the response, stripping any markdown fences
    let cleaned = text.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
    }

    let parsed: {
      analysis?: Record<string, unknown>;
      title?: string;
      metaDescription?: string;
      keywords?: string[];
      tags?: Record<string, unknown>;
    };
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      // If direct parse fails, try to extract JSON from the text
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse AI response as JSON");
      }
    }

    // Sanitize output tags to prevent runtime crashes if Groq returns objects instead of strings
    if (parsed && typeof parsed === "object") {
      if (parsed.tags && typeof parsed.tags === "object") {
        for (const key of Object.keys(parsed.tags)) {
          const val = parsed.tags[key];
          if (typeof val === "object" && val !== null) {
            if (key === "nextjs") {
              parsed.tags[key] = `import { Metadata } from "next";\n\nexport const metadata: Metadata = ${JSON.stringify(val, null, 2)};`;
            } else {
              parsed.tags[key] = JSON.stringify(val, null, 2);
            }
          }
        }
      }
    }

    // Strip internal analysis object before returning to client
    if (parsed && typeof parsed === "object" && "analysis" in parsed) {
      delete parsed.analysis;
    }

    return NextResponse.json(parsed);
  } catch (error: unknown) {
    console.error("API Error:", error);
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
