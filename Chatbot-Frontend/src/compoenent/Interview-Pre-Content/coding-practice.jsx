"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

/**
 * Coding Practice Page with HTML / JavaScript / Python (Pyodide) playgrounds.
 *
 * Notes:
 * - Pyodide is loaded from CDN at runtime. No backend required.
 * - JS & HTML run inside a sandboxed iframe for isolation; console messages
 *   are forwarded to parent for display.
 *
 * Paste this single file at: app/coding-practice/page.jsx
 */

const starter = {
  HTML: `<!-- HTML Starter: Build a simple card -->
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>HTML Playground</title>
    <style>
      body { font-family: system-ui, sans-serif; display:flex; align-items:center; justify-content:center; height:100vh; margin:0; background:linear-gradient(135deg,#0f172a,#111827); color:#fff; }
      .card { background:rgba(255,255,255,0.06); padding:2rem; border-radius:12px; max-width:360px; text-align:center; }
      button { margin-top:1rem; padding:0.5rem 1rem; border-radius:8px; border:1px solid rgba(255,255,255,0.12); background:linear-gradient(90deg,#f97316,#ec4899); color:white; }
    </style>
  </head>
  <body>
    <div class="card">
      <h2>Welcome to HTML Playground</h2>
      <p>Change markup / styles and click Run.</p>
      <button onclick="alert('Hello from your HTML!')">Click me</button>
    </div>
  </body>
</html>`,

  JS: `// JavaScript Starter: Implement add function and log result
function add(a, b) {
  return a + b;
}

console.log("add(2,3) =>", add(2, 3));
console.log("Now change code and re-run");`,

  PY: `# Python Starter: implement factorial
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n-1)

print("factorial(5) =>", factorial(5))
# Try other tests or prints below
`,
};

export default function CodingPracticePage() {
  const [mode, setMode] = useState("HTML"); // "HTML" | "JS" | "PY"
  const [code, setCode] = useState(starter.HTML);
  const [output, setOutput] = useState("");
  const iframeRef = useRef(null);
  const [pyReady, setPyReady] = useState(false);
  const pyodideRef = useRef(null);

  // switch starter code when tab changes
  useEffect(() => {
    setOutput("");
    if (mode === "HTML") setCode(starter.HTML);
    if (mode === "JS") setCode(starter.JS);
    if (mode === "PY") setCode(starter.PY);
  }, [mode]);

  // Listen to messages from iframe (console logs & errors)
  useEffect(() => {
    function onMessage(e) {
      // ignore other origins in prod; here allow messages from our iframe only
      const data = e.data || {};
      if (data && data.__playground) {
        const { type, payload } = data;
        if (type === "log") {
          setOutput((o) => (o ? o + "\n" : "") + payload);
        } else if (type === "error") {
          setOutput((o) => (o ? o + "\n" : "") + "Error: " + payload);
        } else if (type === "clear") {
          setOutput("");
        }
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // Load Pyodide when Python mode is requested
  useEffect(() => {
    let aborted = false;
    async function initPyodide() {
      if (pyodideRef.current) {
        setPyReady(true);
        return;
      }
      setOutput((o) => (o ? o + "\n" : "") + "Loading Python runtime (Pyodide) ...");
      try {
        // dynamic import of pyodide from CDN
        // using global loadPyodide function
        // eslint-disable-next-line no-undef
        const pyodideScript = document.createElement("script");
        pyodideScript.src = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js";
        pyodideScript.onload = async () => {
          if (aborted) return;
          // @ts-ignore
          const pyodide = await loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/" });
          pyodideRef.current = pyodide;
          setPyReady(true);
          setOutput((o) => (o ? o + "\n" : "") + "Pyodide ready.");
        };
        pyodideScript.onerror = (err) => {
          setOutput((o) => (o ? o + "\n" : "") + "Failed to load Pyodide: " + err);
        };
        document.head.appendChild(pyodideScript);
      } catch (err) {
        setOutput((o) => (o ? o + "\n" : "") + "Pyodide load error: " + err);
      }
    }

    if (mode === "PY") initPyodide();
    return () => {
      aborted = true;
    };
  }, [mode]);

  // Utility: clear iframe and output
  function clearOutputAndIframe() {
    setOutput("");
    if (iframeRef.current) {
      try {
        iframeRef.current.srcdoc = "";
      } catch (e) {
        // ignore
      }
    }
  }

  // Run HTML: render srcDoc in iframe (safe sandbox)
  function runHTML(userCode) {
    clearOutputAndIframe();
    const html = userCode;
    // set iframe srcdoc
    if (iframeRef.current) {
      iframeRef.current.srcdoc = html;
      // send a clear signal to output (we won't capture alert/popups)
      setOutput("Rendered HTML in preview pane.");
    }
  }

  // Run JS: put user's code into an iframe that captures console and errors and posts message to parent
  function runJS(userCode) {
    setOutput("");
    const wrapped = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title>JS Playground</title>
    <style>body{font-family:system-ui, sans-serif;background:#0b1220;color:#e6eef8;padding:12px}</style>
  </head>
  <body>
    <pre id="out" style="white-space:pre-wrap;font-family:monospace"></pre>
    <script>
      (function(){
        // helper to post logs to parent
        function send(type, payload){
          parent.postMessage({__playground: true, type: type, payload: payload}, "*");
        }
        // capture console
        const orig = console;
        console = {
          log: function(...args){ send('log', args.map(String).join(' ')); orig.log.apply(orig, args); },
          info: function(...args){ send('log', args.map(String).join(' ')); orig.info.apply(orig, args); },
          warn: function(...args){ send('log', args.map(String).join(' ')); orig.warn.apply(orig, args); },
          error: function(...args){ send('error', args.map(String).join(' ')); orig.error.apply(orig, args); }
        };
        window.onerror = function(msg, url, lineno, colno, err){
          send('error', msg + " (line " + lineno + ")");
        };

        // clear previous
        send('clear', '');
        try {
          ${userCode}
        } catch (err) {
          send('error', String(err));
        }
      })();
    </script>
  </body>
</html>`;
    if (iframeRef.current) {
      iframeRef.current.srcdoc = wrapped;
    }
  }

 // Run Python using pyodide
async function runPython(userCode) {
  setOutput("");
  if (!pyodideRef.current) {
    setOutput("Python runtime is not ready. Waiting to load...");
    return;
  }
  try {
    // build wrapper to capture stdout
    const wrapper = `
import sys, io, traceback
out = io.StringIO()
old_stdout = sys.stdout
sys.stdout = out
try:
${userCode.split("\n").map((l) => "    " + l).join("\n")}
except Exception as e:
    traceback.print_exc()
sys.stdout = old_stdout
_result = out.getvalue()
_result
`;
    // run and retrieve _result
    const pyodide = pyodideRef.current;
    await pyodide.loadPackagesFromImports(userCode).catch(()=>{});
    const result = await pyodide.runPythonAsync(wrapper);
    setOutput(String(result || ""));
  } catch (err) {
    setOutput("Error: " + String(err));
  }
}

  // Run handler based on mode
  function handleRun() {
    if (mode === "HTML") {
      runHTML(code);
    } else if (mode === "JS") {
      runJS(code);
    } else if (mode === "PY") {
      runPython(code);
    }
  }

  // Simple UI
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black text-gray-100">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-6 py-8"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-500">
          Coding Practice — Algorithm Challenges
        </h1>
        <p className="mt-2 text-sm text-gray-300">
          Edit code, choose language (HTML / JavaScript / Python) and run in-browser. Python is powered by Pyodide (WASM).
        </p>
      </motion.header>

      <main className="max-w-6xl mx-auto px-6 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Editor + controls */}
        <section className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 shadow-lg flex flex-col">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {["HTML", "JS", "PY"].map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m === "PY" ? "PY" : m === "JS" ? "JS" : "HTML")}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                    (mode === "HTML" && m === "HTML") ||
                    (mode === "JS" && m === "JS") ||
                    (mode === "PY" && m === "PY")
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow"
                      : "bg-slate-700 text-slate-300"
                  }`}
                >
                  {m === "PY" ? "Python" : m === "JS" ? "JavaScript" : "HTML"}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setCode(starter[mode === "PY" ? "PY" : mode === "JS" ? "JS" : "HTML"]);
                }}
                className="text-sm px-3 py-1 rounded-md bg-slate-700 text-slate-200 hover:bg-slate-600"
              >
                Reset
              </button>

              <button
                onClick={handleRun}
                className="flex items-center gap-2 px-4 py-1 rounded-md bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold shadow"
              >
                <Play className="w-4 h-4" /> Run
              </button>
            </div>
          </div>

          <div className="mt-4 flex-1">
            <label className="text-xs text-slate-400">Editor</label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-96 mt-2 p-4 bg-[#0b1220] text-green-200 font-mono text-sm rounded-lg border border-slate-700 resize-y outline-none"
            />
            <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
              <div>Mode: {mode === "PY" ? "Python (Pyodide)" : mode === "JS" ? "JavaScript" : "HTML/CSS/JS"}</div>
              <div>
                {mode === "PY" && (pyReady ? <span className="text-green-400">Pyodide ready</span> : <span>Loading Pyodide...</span>)}
              </div>
            </div>
          </div>
        </section>

        {/* Right: Preview / Terminal */}
        <section className="space-y-4">
          {/* Preview area for HTML/JS */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-3 shadow-lg min-h-[240px]">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-300 font-medium">Preview</div>
              <div className="text-xs text-slate-400">Sandboxed iframe</div>
            </div>
            <div className="w-full h-64 bg-black rounded-md overflow-hidden border border-slate-900">
              <iframe
                ref={iframeRef}
                title="playground-preview"
                sandbox="allow-scripts"
                style={{ width: "100%", height: "100%", border: 0, background: "white" }}
              />
            </div>
          </div>

          {/* Terminal output */}
          <div className="bg-black border border-slate-800 rounded-2xl p-3 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-green-300 font-semibold">Terminal</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setOutput("")}
                  className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-200"
                >
                  Clear
                </button>
                <div className="text-xs text-slate-400">Output / logs / errors</div>
              </div>
            </div>
            <pre className="h-48 overflow-auto text-[13px] font-mono text-green-200 bg-[#021018] p-3 rounded">
              {output || (mode === "HTML" ? "Rendered HTML preview on the right." : "Run your code to see logs and output")}
            </pre>
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto px-6 pb-8 text-xs text-slate-500">
        <div>
          Notes: Python runs entirely in-browser using Pyodide (WASM). For running other languages or isolated sandboxes on a server, integrate a backend runner (Judge0, Docker sandboxes, or similar).
        </div>
      </footer>
    </div>
  );
}
