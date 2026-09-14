import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [currentScenario, setCurrentScenario] = useState(null);
  const [logs, setLogs] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiReport, setAiReport] = useState("");
  const [severityScore, setSeverityScore] = useState(0);
  const [latency, setLatency] = useState(0);
  const terminalEndRef = useRef(null);

  const presets = {
    firewall: {
      name: "🔥 Cyber Attack / Firewall Breach",
      log: "CRITICAL: Unauthorized authentication bypass attempt detected at 10.0.4.15:8443. Target node: prod-db-01. Signature matches high-volume SSH brute force exploit. Root access compromised via breached API token rule #8812.",
      impact: "HIGH",
      color: "#ef4444"
    },
    bgp: {
      name: "🕸️ BGP Route Leak / Network Outage",
      log: "ALERT: Border Gateway Protocol peer routing leak detected from AS-65104. Invalid prefix announcement 172.16.0.0/12 accepted by border-switch-02. Asynchronous path loop creating localized 42% packet drop rate.",
      impact: "CRITICAL",
      color: "#f59e0b"
    },
    aws: {
      name: "⚠️ Cloud Data Leak / IAM Misconfig",
      log: "WARN: Production S3 Bucket 'client-records-vault' public access control list changed to standard broad visibility. Read permissions open to anonymous principals without MFA confirmation. Object exfiltration risk active.",
      impact: "MEDIUM",
      color: "#3b82f6"
    }
  };

  const addLog = (text, type = "info") => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { time, text, type }]);
  };

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const triggerDiagnostic = async (key) => {
    if (isProcessing) return;
    
    const scenario = presets[key];
    setCurrentScenario(scenario);
    setIsProcessing(true);
    setAiReport("");
    setSeverityScore(0);
    setLatency(0);
    setLogs([]);

    // Simulate Step-by-Step Backend System Trace Logs
    setTimeout(() => addLog(`📡 Ingesting live system log telemetry stream...`, "info"), 100);
    setTimeout(() => addLog(`🔒 Routing traffic payload via secure Vercel edge framework...`, "info"), 600);
    setTimeout(() => addLog(`🧬 Formatting ingestion schema for serverless model context...`, "process"), 1200);
    setTimeout(() => addLog(`🤖 Querying AI Broker Engine [Gemini Core Stack]...`, "process"), 1900);

    const startTime = performance.now();
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: scenario.log })
      });
      const data = await response.json();
      const endTime = performance.now();
      
      setLatency(Math.round(endTime - startTime));
      setSeverityScore(scenario.impact === "CRITICAL" ? 98 : scenario.impact === "HIGH" ? 82 : 45);
      addLog(`✨ Diagnostics engine payload returned successful [HTTP 200]`, "success");
      setAiReport(data.reply || "Analysis complete. Infrastructure status stable.");
    } catch (err) {
      addLog(`❌ Broker exception: Connection to serverless layer interrupted`, "error");
      setAiReport("Failed to generate report. Please verify your background credentials.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#090d16', color: '#f3f4f6', fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', padding: '30px', boxSizing: 'border-box' }}>
      
      {/* HEADER BANNER */}
      <header style={{ maxWidth: '1400px', margin: '0 auto 30px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '20px' }}>
        <div>
          <h1 style={{ margin: '0 0 6px 0', fontSize: '26px', fontWeight: '800', trackingLetter: '-0.5px', color: '#ffffff' }}>
            AI-Driven Autonomous Network Diagnostics Platform
          </h1>
          <p style={{ margin: 0, color: '#9ca3af', fontSize: '14px' }}>
            Enterprise Cloud Automation Portfolio Piece • Engineered to Securely Process Infrastructure Outages
          </p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '10px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', color: '#38bdf8' }}>
            ☁️ ARCHITECTURE: SERVERLESS VERCEL
          </div>
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '10px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', color: '#34d399' }}>
            🤖 AI BROKER: GEMINI CORE FREE TIER
          </div>
        </div>
      </header>

      {/* MAIN CONTENT GRID */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '400px 1fr', gap: '30px' }}>
        
        {/* LEFT COLUMN: ARCHITECTURE EXPLANATION & INTERACTION PANEL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          
          {/* BUSINESS VALUE COMPONENT FOR RECRUITERS */}
          <section style={{ backgroundColor: '#111827', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px' }}>
            <h2 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#9ca3af', letterSpacing: '1px', marginTop: '0', marginBottom: '14px' }}>
              💼 Executive Impact Summary
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', lineHeight: '1.5', color: '#d1d5db' }}>
              <div style={{ display: 'flex', gap: '10px', alignment: 'flex-start' }}>
                <span style={{ color: '#3b82f6' }}>✔</span>
                <span><strong>Solves High Costs:</strong> Replaces paid $20/mo platform tokens with a customized, zero-cost Google AI enterprise sandbox model.</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignment: 'flex-start' }}>
                <span style={{ color: '#3b82f6' }}>✔</span>
                <span><strong>Recruiter Usability:</strong> Pre-loaded infrastructure incident environments eliminate the need to understand complex system syntax.</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignment: 'flex-start' }}>
                <span style={{ color: '#3b82f6' }}>✔</span>
                <span><strong>Secure Engineering:</strong> Runs calculations inside sandboxed serverless edge pathways, hiding private security keys from frontend users.</span>
              </div>
            </div>
          </section>

          {/* PRESES CONTROLS PANEL */}
          <section style={{ backgroundColor: '#111827', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px' }}>
            <h2 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#9ca3af', letterSpacing: '1px', marginTop: '0', marginBottom: '8px' }}>
              ⚙️ Incident Simulators
            </h2>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 16px 0' }}>
              Select a system incident below to run an automated triage analysis sequence:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {Object.keys(presets).map((key) => (
                <button
                  key={key}
                  onClick={() => triggerDiagnostic(key)}
                  disabled={isProcessing}
                  style={{ textAlign: 'left', backgroundColor: '#1f2937', border: '1px solid #374151', padding: '14px', borderRadius: '8px', color: '#ffffff', cursor: isProcessing ? 'not-allowed' : 'pointer', transition: 'all 0.2s', fontSize: '14px', fontWeight: '600' }}
                  onMouseEnter={(e) => { if(!isProcessing) { e.currentTarget.style.borderColor = '#2563eb'; e.currentTarget.style.backgroundColor = '#1e293b'; } }}
                  onMouseLeave={(e) => { if(!isProcessing) { e.currentTarget.style.borderColor = '#374151'; e.currentTarget.style.backgroundColor = '#1f2937'; } }}
                >
                  {presets[key].name}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: ENTERPRISE SYSTEM GRAPHIC & LIVE METRICS PANEL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          
          {/* ANALYTICS VISUAL METRICS BAR */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            <div style={{ backgroundColor: '#111827', border: '1px solid #1e293b', padding: '20px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#6b7280', fontWeight: '700', marginBottom: '6px' }}>Incident Threat Level</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: currentScenario ? currentScenario.color : '#4b5563' }}>
                {currentScenario ? currentScenario.impact : "IDLE"}
              </div>
            </div>
            <div style={{ backgroundColor: '#111827', border: '1px solid #1e293b', padding: '20px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#6b7280', fontWeight: '700', marginBottom: '6px' }}>System Severity Meter</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: severityScore > 70 ? '#ef4444' : severityScore > 0 ? '#f59e0b' : '#4b5563' }}>
                {severityScore > 0 ? `${severityScore}%` : "0%"}
              </div>
            </div>
