(function() {
  // --- INJECT CSS ---
  const style = document.createElement('style');
  style.textContent = `
    #chatbot-fab {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent) 0%, #d84507 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 32px rgba(234, 88, 12, 0.4);
      cursor: pointer;
      z-index: 9999;
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    }
    #chatbot-fab:hover {
      transform: translateY(-5px) scale(1.05);
      box-shadow: 0 12px 40px rgba(234, 88, 12, 0.6);
    }
    #chatbot-fab svg {
      width: 30px;
      height: 30px;
    }
    #chatbot-modal {
      position: fixed;
      bottom: 110px;
      right: 30px;
      width: 350px;
      height: 500px;
      background: rgba(15, 17, 35, 0.4);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--border-color);
      border-radius: 24px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.4);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      z-index: 9998;
      opacity: 0;
      pointer-events: none;
      transform: translateY(20px) scale(0.95);
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      transform-origin: bottom right;
    }
    #chatbot-modal.open {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0) scale(1);
    }
    .chat-header {
      padding: 20px;
      background: rgba(0, 0, 0, 0.2);
      border-bottom: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 600;
      position: relative;
      z-index: 20;
    }
    .chat-header-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .chat-header-icon {
      color: var(--accent);
    }
    .chat-close, .chat-settings {
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      padding: 5px;
      transition: color 0.2s;
    }
    .chat-close:hover, .chat-settings:hover {
      color: var(--text-main);
    }
    .chat-body {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    .chat-message {
      max-width: 85%;
      padding: 12px 16px;
      border-radius: 16px;
      font-size: 0.95rem;
      line-height: 1.4;
      animation: fadeIn 0.3s ease;
    }
    .chat-message.ai {
      align-self: flex-start;
      background: rgba(255,255,255,0.05);
      border-bottom-left-radius: 4px;
    }
    .chat-message.user {
      align-self: flex-end;
      background: var(--accent);
      color: white;
      border-bottom-right-radius: 4px;
    }
    .chat-input-area {
      padding: 15px;
      border-top: 1px solid var(--border-color);
      display: flex;
      gap: 10px;
    }
    .chat-input {
      flex: 1;
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--border-color);
      padding: 12px 16px;
      border-radius: 20px;
      color: var(--text-main);
      font-family: inherit;
      outline: none;
      transition: border-color 0.2s;
    }
    .chat-input:focus {
      border-color: var(--accent);
    }
    .chat-send {
      background: var(--accent);
      color: white;
      border: none;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .chat-send:hover {
      transform: scale(1.1);
    }
    .chat-send:disabled {
      background: var(--border-color);
      color: var(--text-muted);
      cursor: not-allowed;
      transform: none;
    }

    .typing-indicator {
      display: flex;
      gap: 4px;
      padding: 4px 8px;
      align-items: center;
      justify-content: center;
      height: 20px;
    }
    .typing-dot {
      width: 6px;
      height: 6px;
      background: var(--text-muted);
      border-radius: 50%;
      animation: typingBounce 1.4s infinite ease-in-out both;
    }
    .typing-dot:nth-child(1) { animation-delay: -0.32s; }
    .typing-dot:nth-child(2) { animation-delay: -0.16s; }
    @keyframes typingBounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);

  // --- INJECT HTML ---
  const container = document.createElement('div');
  container.innerHTML = `
    <div id="chatbot-modal">

      <div class="chat-header">
        <div class="chat-header-left">
          <svg class="chat-header-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7v1a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-1H4a1 1 0 0 1-1-1v-1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"></path><path d="M9 13v2"></path><path d="M15 13v2"></path></svg>
          FOT AI
        </div>
        <div>
          <button class="chat-close" id="chat-close-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>

      <div class="chat-body" id="chat-body">
        <div class="chat-message ai">Hi! I'm FOT AI. I can analyze your entered grades and suggest career paths or answer questions about your major. How can I help?</div>
      </div>

      <div class="chat-input-area">
        <input type="text" class="chat-input" id="chat-input" placeholder="Ask about your grades...">
        <button class="chat-send" id="chat-send-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </div>
    </div>

    <div id="chatbot-fab">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
    </div>
  `;
  document.body.appendChild(container);

  // --- LOGIC ---
  const fab = document.getElementById('chatbot-fab');
  const modal = document.getElementById('chatbot-modal');
  const closeBtn = document.getElementById('chat-close-btn');
  const sendBtn = document.getElementById('chat-send-btn');
  const chatInput = document.getElementById('chat-input');
  const chatBody = document.getElementById('chat-body');

  let messageHistory = [];

  fab.addEventListener('click', () => {
    if (modal.classList.contains('open')) {
      modal.classList.remove('open');
    } else {
      modal.classList.add('open');
    }
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('open');
  });

  function formatText(text) {
    let html = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/\n/g, '<br>');
    return html;
  }

  function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = `chat-message ${sender}`;
    msg.innerHTML = formatText(text);
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function addTyping() {
    const msg = document.createElement('div');
    msg.className = 'chat-message ai typing';
    msg.id = 'typing-indicator';
    msg.innerHTML = '<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>';
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function removeTyping() {
    const ind = document.getElementById('typing-indicator');
    if (ind) ind.remove();
  }

  async function handleSend() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Add user msg to UI and History
    addMessage(text, 'user');
    chatInput.value = '';
    sendBtn.disabled = true;

    // Get current context from localStorage
    const dept = localStorage.getItem('fot_dept_v1') || 'ICT';
    const gradesRaw = localStorage.getItem('fot_grades_v1') || '{}';
    let grades = {};
    try { grades = JSON.parse(gradesRaw); } catch(e){}
    
    // Access DEPARTMENTS from the page's global scope
    const allDepts = typeof DEPARTMENTS !== 'undefined' ? DEPARTMENTS : (window.DEPARTMENTS || null);
    const deptInfo = allDepts ? allDepts[dept] : null;
    let coursesStr = "";
    if (deptInfo) {
      coursesStr = "Courses available: " + deptInfo.years.map(y => y.sems.map(s => s.courses.map(c => `${c.code}: ${c.title}`).join(", ")).join("; ")).join(" | ");
    }

    const contextStr = `You represent the Faculty of Technology (FOT) at Rajarata University of Sri Lanka. If asked who built or created you, state professionally that you were developed by H. M. Pasindu Diwakara from the Department of ICT. The user is a student in the ${dept} department. Their current academic grades are: ${JSON.stringify(grades)}. ${coursesStr} Respond concisely and directly.`;

    messageHistory.push({ role: 'user', parts: [{ text: text }] });

    addTyping();

    try {
      // Call the Vercel serverless proxy — API key is kept server-side
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: { text: "You are an expert academic advisor and career counselor for students in the Faculty of Technology. " + contextStr } },
          contents: messageHistory
        })
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('RateLimit');
        }
        throw new Error('API Error: ' + response.statusText);
      }

      const data = await response.json();
      const reply = data.candidates[0].content.parts[0].text;
      
      messageHistory.push({ role: 'model', parts: [{ text: reply }] });
      removeTyping();
      addMessage(reply, 'ai');

    } catch (e) {
      removeTyping();
      let errorMsg = "I'm having trouble connecting right now. Please try again in a moment.";
      if (e.message === 'RateLimit') {
        errorMsg = "You've reached the API rate limit. Please wait about a minute and try again!";
      }
      addMessage(errorMsg, 'ai');
      messageHistory.pop();
    }

    sendBtn.disabled = false;
    chatInput.focus();
  }

  sendBtn.addEventListener('click', handleSend);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });

})();
