import React, { useState } from 'react';
import { Terminal, Send, Network, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

function App() {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState([
    { role: 'system', text: 'Network Detective Environment Initialized. Ready for log/topology ingestion.' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setLogs(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await response.json();
      
      if (data.error) {
        setLogs(prev => [...prev, { role: 'error', text: `Error: ${data.error}` }]);
      } else {
        setLogs(prev => [...prev, { role: 'agent', text: data.reply }]);
      }
    } catch (err) {
      setLogs(prev => [...prev, { role: 'error', text: 'Failed to communicate with diagnostic backend.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Network className="h-6 w-6 text-emerald-400" />
          <h1 className="text-xl font-bold tracking-tight">
            Network<span className="text-emerald-400">Detective</span>
          </h1>
          <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">Live Demo</span>
        </div>
        <div className="flex items-center space-x-4 text-sm text-slate-400">
          <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-400"/> Free Tier Gemini-Powered</span>
        </div>
      </header>

      {/* Main Terminal Shell */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-6 flex flex-col min-h-0">
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl flex flex-col min-h-0 shadow-2xl overflow-hidden">
          {/* Windows-style Header Bars */}
          <div className="bg-slate-950 px-4 py-2 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/40"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/40"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/40"></span>
              <span className="font-mono pl-2 text-slate-400">diagnostics_engine.sh</span>
            </div>
          </div>

          {/* Chat/Log Stream */}
          <div className="flex-1 overflow-y-auto p-6 font-mono space-y-6 text-sm">
            {logs.map((log, i) => (
              <div key={i} className={`flex gap-3 ${log.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-lg p-4 leading-relaxed ${
                  log.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-br-none ml-12' 
                    : log.role === 'error'
                    ? 'bg-rose-950/50 border border-rose-800 text-rose-300'
                    : log.role === 'system'
                    ? 'bg-slate-950 border border-slate-800 text-slate-400 text-xs'
                    : 'bg-slate-950 border border-slate-800 text-slate-200'
                }`}>
                  {log.role !== 'user' && log.role !== 'system' && (
                    <div className="text-xs text-emerald-400 font-bold mb-1 uppercase tracking-wider">▲ Core Engine Diagnosis:</div>
                  )}
                  <p className="whitespace-pre-wrap">{log.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center space-x-2 text-slate-400 font-mono text-xs animate-pulse">
                <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                <span>Parsing infrastructure data stream...</span>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 bg-slate-950 border-t border-slate-800 flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste BGP leaks, routing errors, trace logs, or device setups..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 font-mono transition-colors placeholder:text-slate-600"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white px-5 rounded-lg flex items-center justify-center transition-colors shadow-lg shadow-emerald-900/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;
