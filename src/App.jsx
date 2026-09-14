<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Network Detective</title>
    <script src="https://jsdelivr.net"></script>
    <style>
        body {
            background-color: #0b0f19;
            color: #4ade80;
            font-family: 'Courier New', Courier, monospace;
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .terminal-container {
            width: 100%;
            max-width: 800px;
            background-color: #111827;
            border: 1px solid #1f2937;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
            overflow: hidden;
        }
        .terminal-header {
            background-color: #1f2937;
            padding: 10px 15px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #374151;
        }
        .window-dots {
            display: flex;
            gap: 6px;
        }
        .dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
        }
        .dot-red { background-color: #ef4444; }
        .dot-yellow { background-color: #f59e0b; }
        .dot-green { background-color: #10b981; }
        .terminal-title {
            color: #9ca3af;
            font-size: 14px;
        }
        .terminal-body {
            padding: 20px;
            height: 400px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        .system-msg { color: #6b7280; }
        .user-msg { color: #38bdf8; margin-top: 5px; }
        .ai-msg { color: #4ade80; background-color: #1f2937; padding: 12px; border-radius: 6px; border-left: 4px solid #4ade80; }
        .input-area {
            padding: 15px;
            background-color: #1f2937;
            display: flex;
            gap: 10px;
            border-top: 1px solid #374151;
        }
        textarea {
            flex-grow: 1;
            background-color: #0b0f19;
            border: 1px solid #4b5563;
            color: #f3f4f6;
            padding: 10px;
            border-radius: 4px;
            resize: none;
            font-family: inherit;
        }
        textarea:focus {
            outline: none;
            border-color: #4ade80;
        }
        button {
            background-color: #047857;
            color: white;
            border: none;
            padding: 0 20px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
            transition: background 0.2s;
        }
        button:hover { background-color: #065f46; }
    </style>
</head>
<body>

<div class="terminal-container">
    <div class="terminal-header">
        <div class="window-dots">
            <div class="dot dot-red"></div>
            <div class="dot dot-yellow"></div>
            <div class="dot dot-green"></div>
        </div>
        <div class="terminal-title">diagnostics_engine.sh — Free Gemini Edition</div>
        <div></div>
    </div>
    
    <div class="terminal-body" id="chat-output">
        <div class="system-msg">[SYSTEM INIZIALIZED]: Ready for incident response scripts, routing logs, or network anomalies...</div>
    </div>

    <div class="input-area">
        <textarea id="chat-input" rows="2" placeholder="Paste BGP leaks, routing errors, or configs here..."></textarea>
        <button id="send-btn">RUN DIAGNOSTICS</button>
    </div>
</div>

<script>
    const sendBtn = document.getElementById('send-btn');
    const chatInput = document.getElementById('chat-input');
    const chatOutput = document.getElementById('chat-output');

    sendBtn.addEventListener('click', async () => {
        const message = chatInput.value.trim();
        if (!message) return;

        // Append user query
        const userDiv = document.createElement('div');
        userDiv.className = 'user-msg';
        userDiv.innerText = `> USER: ${message}`;
        chatOutput.appendChild(userDiv);
        chatInput.value = '';

        // Add running loader
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'system-msg';
        loadingDiv.innerText = '[ANALYZING INFRASTRUCTURE LOGS...]';
        chatOutput.appendChild(loadingDiv);
        chatOutput.scrollTop = chatOutput.scrollHeight;

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });
            const data = await response.json();
            
            loadingDiv.remove();

            const aiDiv = document.createElement('div');
            aiDiv.className = 'ai-msg';
            aiDiv.innerText = data.reply || "Error: Empty response.";
            chatOutput.appendChild(aiDiv);
        } catch (err) {
            loadingDiv.innerText = '[CRITICAL AUTOMATION EXCEPTION]: Server connection timed out.';
        }
        chatOutput.scrollTop = chatOutput.scrollHeight;
    });
</script>
</body>
</html>
