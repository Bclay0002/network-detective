import React, { useState, useRef, useEffect } from 'react';

export default function App() {
  const [messages, setMessages] = useState([
    { type: 'system', text: '[SYSTEM INITIALIZED]: Ready for incident response scripts, routing logs, or network anomalies...' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatOutputRef = useRef(null);

  useEffect(() => {
    if (chatOutputRef.current) {
      chatOutputRef.current.scrollTop = chatOutputRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    setMessages(prev => [...prev, { type: 'user', text: `> USER: ${trimmedInput}` }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmedInput })
      });
      const data = await response.json();
      
      setMessages(prev => [...prev, { type: 'ai', text: data.reply || "Error: Empty response." }]);
    } catch (err) {
      setMessages(prev => [...prev, { type: 'system', text: '[CRITICAL AUTOMATION EXCEPTION]: Server connection timed out.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#0b0f19', color: '#4ade80', fontFamily: 'Courier New, Courier, monospace', margin: 0, padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', boxSizing: 'border-box' }}>
      <div style={{ width: '100%', maxWidth: '800px', backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)', overflow: 'hidden' }}>
        <div style={{ backgroundColor: '#1f2937', padding: '10px 15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #374151' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
          </div>
          <div style={{ color: '#9ca3af', fontSize: '14px' }}>diagnostics_engine.sh — Free Gemini Edition</div>
          <div></div>
        </div>
        
        <div ref={chatOutputRef} style={{ padding: '20px', height: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={
              msg.type === 'system' ? { color: '#6b7280' } :
              msg.type === 'user' ? { color: '#38bdf8', marginTop: '5px' } :
              { color: '#4ade80', backgroundColor: '#1f2937', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #4ade80' }
            }>
              {msg.text}
            </div>
          ))}
          {loading && <div style={{ color: '#6b7280' }}>[ANALYZING INFRASTRUCTURE LOGS...]</div>}
        </div>

        <div style={{ padding: '15px', backgroundColor: '#1f2937', display: 'flex', gap: '10px', borderTop: '1px solid #374151' }}>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows="2" 
            placeholder="Paste BGP leaks, routing errors, or configs here..."
            style={{ flexGrow: 1, backgroundColor: '#0b0f19', border: '1px solid #4b5563', color: '#f3f4f6', padding: '10px', borderRadius: '4px', resize: 'none', fontFamily: 'inherit', outline: 'none' }}
          />
          <button 
            onClick={handleSend}
            style={{ backgroundColor: '#047857', color: 'white', border: 'none', padding: '0 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            RUN DIAGNOSTICS
          </button>
        </div>
      </div>
    </div>
  );
}
