import React, { useState, useRef, useEffect } from 'react';

export default function App() {
  const [messages, setMessages] = useState([
    { type: 'system', text: '[SYSTEM INITIALIZED]: Diagnostics matrix online. Select a simulator preset on the left or input a custom incident log below.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatOutputRef = useRef(null);

  useEffect(() => {
    if (chatOutputRef.current) {
      chatOutputRef.current.scrollTop = chatOutputRef.current.scrollHeight;
    }
  }, [messages]);

  // Preset scenarios so recruiters can test with a single click
  const scenarios = [
    {
      title: "🔥 Firewall Breach Attempt",
      log: "WARNING: Unauthenticated POST request detected on admin panel from IP 185.220.101.5. Repeated failures (401 Unauthorized) followed by sudo exploit attempt. Configuration rule 44 broken."
    },
    {
      title: "🕸️ BGP Route Leak",
      log: "BGP_SESSION_CHANGED: Neighbor 192.0.2.1 (AS 65001) sent invalid transit path for prefix 8.8.8.0/24. Local preference override missing. Traffic routing loop detected between core switches."
    },
    {
      title: "⚠️ AWS S3 Bucket Leak",
      log: "AWS_IAM_ALERT: S3 Bucket 'production-customer-data-01' policy updated by user_id_882. Effect: Allow, Principal: '*', Action: 's3:GetObject'. Public access block overridden."
    }
  ];

  const applyScenario = (logText) => {
    setInput(logText);
  };

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    setMessages(prev => [...prev, { type: 'user', text: `> USER REQUEST: ${trimmedInput}` }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmedInput })
      });
      const data = await response.json();
      
      setMessages(prev => [...prev, { type: 'ai', text: data.reply || "Diagnostics complete. System status returned nominal." }]);
    } catch (err) {
      setMessages(prev => [...prev, { type: 'system', text: '[CRITICAL BROKER EXCEPTION]: Server connection timeout. Verify API keys.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#090d16', color: '#f3f4f6', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 20px', boxSizing: 'border-box' }}>
      <div style={{ width: '100%', maxWidth: '1200px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', backgroundColor: '#111827', borderRadius: '16px', border: '1px solid #1f2937', padding: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.6)', boxSizing: 'border-box' }}>
        
        {/* LEFT COLUMN: GUIDANCE AND PRODUCT OVERVIEW */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingRight: '10px' }}>
          <div>
            <div style={{ display: 'inline-block', backgroundColor: '#1e293b', border: '1px solid #3b82f6', color: '#60a5fa', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', trackingLetter: '1px', marginBottom: '16px' }}>
              🤖 Project Showcase
            </div>
            <h1 style={{ margin: '0 0 12px 0', fontSize: '28px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.5px' }}>
              Network Detective
            </h1>
            <p style={{ margin: '0 0 24px 0', color: '#9ca3af', fontSize: '15px', lineHeight: '1.6' }}>
              This platform validates asynchronous automation architectures. It securely connects a serverless backend to public Cloud APIs, processing simulated infrastructure telemetry logs and security configuration faults in real-time.
            </p>

            <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', color: '#9ca3af', letterSpacing: '0.5px' }}>
              Recruiter Quick-Test Presets
            </h3>
            <p style={{ margin: '0 0 16px 0', color: '#6b7280', fontSize: '13px' }}>
              Don't know network syntax? Click any scenario button below to auto-inject faulty enterprise telemetry logs directly into the engine:
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {scenarios.map((scen, idx) => (
                <button 
                  key={idx} 
                  onClick={() => applyScenario(scen.log)}
                  style={{ textAlign: 'left', backgroundColor: '#1f2937', border: '1px solid #374151', padding: '12px 16px', borderRadius: '8px', color: '#e5e7eb', cursor: 'pointer', transition: 'all 0.2s', fontSize: '14px', fontWeight: '500' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.backgroundColor = '#1e293b'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#374151'; e.currentTarget.style.backgroundColor = '#1f2937'; }}
                >
                  {scen.title}
                </button>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid #1f2937', paddingTop: '20px', marginTop: '20px', display: 'flex', gap: '20px', color: '#6b7280', fontSize: '12px' }}>
            <div><strong>Backend Stack:</strong> Vercel Serverless / Google Gemini AI</div>
            <div><strong>Frontend:</strong> React / Micro-styled Flex Matrix</div>
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE DARK TERMINAL */}
        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#030712', borderRadius: '12px', border: '1px solid #1f2937', overflow: 'hidden', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)' }}>
          {/* Header controls bar */}
          <div style={{ backgroundColor: '#111827', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1f2937' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
            </div>
            <div style={{ color: '#4b5563', fontSize: '12px', fontFamily: 'monospace', fontWeight: '600' }}>telemetry_processor.sh</div>
            <div style={{ width: '38px' }}></div>
          </div>
          
          {/* Output chat area */}
          <div ref={chatOutputRef} style={{ padding: '20px', height: '380px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.5' }}>
            {messages.map((msg, i) => (
              <div key={i} style={
                msg.type === 'system' ? { color: '#4b5563', fontStyle: 'italic' } :
                msg.type === 'user' ? { color: '#38bdf8' } :
                { color: '#34d399', backgroundColor: '#111827', padding: '14px', borderRadius: '8px', borderLeft: '3px solid #34d399', whiteSpace: 'pre-wrap' }
              }>
                {msg.text}
              </div>
            ))}
            {loading && <div style={{ color: '#6b7280', fontStyle: 'italic', animation: 'pulse 1.5s infinite' }}>[PROCESSING EXPLOIT RUNTIME DIRECTIVES...]</div>}
          </div>

          {/* Interactive input area */}
          <div style={{ padding: '16px', backgroundColor: '#111827', display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid #1f2937' }}>
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows="3" 
              placeholder="Select a simulator preset on the left or paste server logs here..."
              style={{ width: '100%', backgroundColor: '#030712', border: '1px solid #374151', color: '#f3f4f6', padding: '12px', borderRadius: '6px', resize: 'none', fontFamily: 'monospace', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
            />
            <button 
              onClick={handleSend}
              style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', alignSelf: 'flex-end', transition: 'background 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            >
              Analyze Incident Log →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
