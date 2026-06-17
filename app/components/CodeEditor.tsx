"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { editor } from "monaco-editor";
import type { Monaco } from "@monaco-editor/react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="code-panel-loading">
      <div className="spinner" />
    </div>
  ),
});

export interface FrameworkTab {
  key: string;
  label: string;
  language: string;
}

interface CodeEditorProps {
  tabs: FrameworkTab[];
  codeByTab: Record<string, string>;
}

function defineAppTheme(monaco: Monaco) {
  monaco.editor.defineTheme("app-light", {
    base: "vs",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#f8fafc",
      "editor.foreground": "#334155",
      "editor.lineHighlightBackground": "#f1f5f9",
      "editor.selectionBackground": "#dbeafe",
      "editor.inactiveSelectionBackground": "#e2e8f0",
      "editorLineNumber.foreground": "#94a3b8",
      "editorLineNumber.activeForeground": "#64748b",
      "editorGutter.background": "#f8fafc",
    },
  });
}

export default function CodeEditor({ tabs, codeByTab }: CodeEditorProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [copied, setCopied] = useState(false);

  const currentTab = tabs.find((t) => t.key === activeTab) ?? tabs[0];
  const code = codeByTab[activeTab] ?? "";

  const editorOptions = useMemo<editor.IStandaloneEditorConstructionOptions>(
    () => ({
      readOnly: true,
      automaticLayout: true,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 13,
      lineHeight: 22,
      fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
      fontLigatures: true,
      padding: { top: 16, bottom: 16 },
      renderLineHighlight: "none",
      overviewRulerLanes: 0,
      hideCursorInOverviewRuler: true,
      overviewRulerBorder: false,
      folding: false,
      lineNumbers: "on",
      glyphMargin: false,
      lineDecorationsWidth: 0,
      scrollbar: {
        verticalScrollbarSize: 6,
        horizontalScrollbarSize: 6,
      },
    }),
    []
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="code-editor-section">
      <div className="code-editor-header">
        <div>
          <h3>Framework Implementation</h3>
          <p>Copy production-ready meta tag code for your stack</p>
        </div>
      </div>

      <div className="code-panel">
        <div className="code-panel-toolbar">
          <label className="code-panel-select-wrap">
            <span className="sr-only">Select framework</span>
            <select
              className="code-panel-select"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              {tabs.map((tab) => (
                <option key={tab.key} value={tab.key}>
                  {tab.label}
                </option>
              ))}
            </select>
            <svg
              className="code-panel-chevron"
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </label>

          <button
            type="button"
            className={`btn-copy ${copied ? "copied" : ""}`}
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>

        <div className="code-panel-body">
          <MonacoEditor
            key={activeTab}
            value={code}
            language={currentTab.language}
            theme="app-light"
            height="400px"
            beforeMount={defineAppTheme}
            options={editorOptions}
          />
        </div>
      </div>
    </section>
  );
}
