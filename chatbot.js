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
      width: 370px;
      height: 520px;
      background: var(--surface, #0e1120);
      border: 1px solid var(--border, #222745);
      border-radius: 24px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
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
      padding: 18px 20px;
      background: var(--surface2, #131628);
      border-bottom: 1px solid var(--border, #222745);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 600;
      font-size: 14px;
      color: var(--text, #e8eaf8);
    }
    .chat-header-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .chat-header-status {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      color: var(--green, #34d399);
      font-weight: 500;
    }
    .chat-status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--green, #34d399);
      animation: pulse-dot 2s infinite;
    }
    @keyframes pulse-dot {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
    .chat-header-icon {
      color: var(--accent, #fb923c);
    }
    .chat-close {
      background: none;
      border: none;
      color: var(--text3, #4a5280);
      cursor: pointer;
      padding: 5px;
      transition: color 0.2s;
      pointer-events: auto !important;
    }
    .chat-close:hover {
      color: var(--text, #e8eaf8);
    }
    .chat-body {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .chat-body::-webkit-scrollbar { width: 4px; }
    .chat-body::-webkit-scrollbar-thumb { background: var(--border, #222745); border-radius: 2px; }
    .chat-message {
      max-width: 88%;
      padding: 11px 15px;
      border-radius: 16px;
      font-size: 13px;
      line-height: 1.55;
      animation: fadeIn 0.3s ease;
      color: var(--text, #e8eaf8);
    }
    .chat-message.ai {
      align-self: flex-start;
      background: var(--surface3, #1a1f35);
      border-bottom-left-radius: 4px;
    }
    .chat-message.user {
      align-self: flex-end;
      background: var(--accent, #fb923c);
      color: white;
      border-bottom-right-radius: 4px;
    }
    .chat-message strong { color: var(--accent, #fb923c); }
    .chat-message.user strong { color: white; }
    
    /* Inline Icon Styling */
    .inline-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: text-bottom;
      margin-right: 6px;
      color: var(--accent, #fb923c);
    }
    .inline-icon svg {
      width: 16px;
      height: 16px;
    }
    .chat-message.user .inline-icon {
      color: white;
    }
    .icon-list-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 6px;
    }
    .icon-list-item .inline-icon {
      margin-top: 2px;
      margin-right: 8px;
      flex-shrink: 0;
    }
    .icon-list-item-content {
      flex: 1;
    }

    .chat-quick-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 4px;
    }
    .chat-quick-btn {
      background: var(--surface3, #1a1f35);
      border: 1px solid var(--border, #222745);
      color: var(--text2, #9099c8);
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 11px;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
      pointer-events: auto !important;
    }
    .chat-quick-btn:hover {
      border-color: var(--accent, #fb923c);
      color: var(--accent, #fb923c);
      background: rgba(251, 146, 60, 0.1);
    }
    .chat-input-area {
      padding: 14px;
      border-top: 1px solid var(--border, #222745);
      display: flex;
      gap: 10px;
      background: var(--surface2, #131628);
    }
    .chat-input {
      flex: 1;
      background: var(--surface, #0e1120);
      border: 1px solid var(--border, #222745);
      padding: 11px 16px;
      border-radius: 20px;
      color: var(--text, #e8eaf8);
      font-family: inherit;
      font-size: 13px;
      outline: none;
      transition: border-color 0.2s;
    }
    .chat-input:focus {
      border-color: var(--accent, #fb923c);
    }
    .chat-input::placeholder {
      color: var(--text3, #4a5280);
    }
    .chat-send {
      background: var(--accent, #fb923c);
      color: white;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.2s;
      pointer-events: auto !important;
    }
    .chat-send:hover {
      transform: scale(1.1);
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
      background: var(--text3, #4a5280);
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
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @media (max-width: 500px) {
      #chatbot-modal {
        width: calc(100vw - 20px);
        right: 10px;
        bottom: 100px;
        height: 60vh;
      }
    }
  `;
  document.head.appendChild(style);

  // --- ICONS LIBRARY ---
  const ICONS = {
    bot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7v1a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-1H4a1 1 0 0 1-1-1v-1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"></path><path d="M9 13v2"></path><path d="M15 13v2"></path></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>',
    trend: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>',
    briefcase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>',
    clipboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>',
    building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>',
    grad: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>',
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
    thumbs: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
    bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path></svg>',
    smile: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>'
  };

  function icon(name) {
    return `<span class="inline-icon">${ICONS[name] || ''}</span>`;
  }

  // --- INJECT HTML ---
  const container = document.createElement('div');
  container.innerHTML = `
    <div id="chatbot-modal">
      <div class="chat-header">
        <div class="chat-header-left">
          <svg class="chat-header-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7v1a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-1H4a1 1 0 0 1-1-1v-1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"></path><path d="M9 13v2"></path><path d="M15 13v2"></path></svg>
          <div>
            <div>FOT Assistant</div>
            <div class="chat-header-status"><span class="chat-status-dot"></span> Always online</div>
          </div>
        </div>
        <button class="chat-close" id="chat-close-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div class="chat-body" id="chat-body"></div>
      <div class="chat-input-area">
        <input type="text" class="chat-input" id="chat-input" placeholder="Ask me anything about FOT...">
        <button class="chat-send" id="chat-send-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
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

  fab.addEventListener('click', () => modal.classList.toggle('open'));
  closeBtn.addEventListener('click', () => modal.classList.remove('open'));

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

  function addQuickActions(actions) {
    const wrap = document.createElement('div');
    wrap.className = 'chat-quick-actions';
    actions.forEach(a => {
      const btn = document.createElement('button');
      btn.className = 'chat-quick-btn';
      btn.textContent = a;
      btn.addEventListener('click', () => {
        chatInput.value = a;
        handleSend();
      });
      wrap.appendChild(btn);
    });
    chatBody.appendChild(wrap);
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

  // --- DATA ACCESS HELPERS ---
  function getDepts() {
    return typeof DEPARTMENTS !== 'undefined' ? DEPARTMENTS : (window.DEPARTMENTS || null);
  }

  function getGrades() {
    try { return JSON.parse(localStorage.getItem('fot_grades_v1') || '{}'); } catch(e) { return {}; }
  }

  function getCurrentDept() {
    return localStorage.getItem('fot_dept_v1') || 'ICT';
  }

  function getDeptInfo(deptKey) {
    const depts = getDepts();
    if (!depts) return null;
    return depts[deptKey] || null;
  }

  function calcGPAData(deptKey) {
    const depts = getDepts();
    if (!depts || !depts[deptKey]) return { gpa: null, gradedCredits: 0, totalGpaCredits: 0, totalCredits: 0 };
    const data = depts[deptKey];
    const grades = getGrades();
    const GRADE_MAP = { 'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'E': 0.0, 'F': 0.0 };
    let totalPoints = 0, totalCr = 0, gradedCr = 0, allCredits = 0, compCr = 0, optCr = 0, nonGpaCr = 0;
    for (const yr of data.years)
      for (const sem of yr.sems)
        for (const c of sem.courses) {
          allCredits += c.credits;
          if (c.flag === 'NONGPA') { nonGpaCr += c.credits; continue; }
          if (c.flag === 'OPT') optCr += c.credits; else compCr += c.credits;
          const key = `${deptKey}_${c.code.replace(/\s/g, '_')}`;
          const g = grades[key];
          if (g && GRADE_MAP[g] !== undefined) {
            totalPoints += GRADE_MAP[g] * c.credits;
            totalCr += c.credits;
            gradedCr += c.credits;
          }
        }
    return {
      gpa: totalCr > 0 ? totalPoints / totalCr : null,
      gradedCredits: gradedCr,
      totalGpaCredits: compCr + optCr,
      totalCredits: allCredits,
      compulsory: compCr,
      optional: optCr,
      nonGpa: nonGpaCr
    };
  }

  function getGPAClass(gpa) {
    if (gpa === null) return 'Not yet calculated';
    if (gpa >= 3.70) return 'First Class Honours';
    if (gpa >= 3.30) return 'Second Class (Upper)';
    if (gpa >= 3.00) return 'Second Class (Lower)';
    if (gpa >= 2.00) return 'Pass';
    return 'Below Pass';
  }

  function getCoursesForYear(deptKey, yearNum) {
    const info = getDeptInfo(deptKey);
    if (!info) return null;
    const yr = info.years.find(y => y.year.includes(yearNum));
    if (!yr) return null;
    return yr;
  }

  function getGradedCourses(deptKey) {
    const info = getDeptInfo(deptKey);
    if (!info) return [];
    const grades = getGrades();
    const results = [];
    for (const yr of info.years)
      for (const sem of yr.sems)
        for (const c of sem.courses) {
          const key = `${deptKey}_${c.code.replace(/\s/g, '_')}`;
          if (grades[key]) results.push({ ...c, grade: grades[key], year: yr.year, sem: sem.sem });
        }
    return results;
  }

  // --- RESPONSE ENGINE ---
  function getResponse(input) {
    const q = input.toLowerCase().trim();
    const dept = getCurrentDept();
    const deptInfo = getDeptInfo(dept);
    const gpaData = calcGPAData(dept);

    // Greetings
    if (/^(hi|hello|hey|sup|yo|howdy|good morning|good evening|good afternoon)/.test(q)) {
      const deptName = deptInfo ? deptInfo.fullName : dept;
      return {
        text: `Hello! ${icon('bot')} I'm the **FOT Assistant**.\n\nYou're currently viewing the **${deptName}** department. I can help you with:\n\n<div class="icon-list-item">${icon('chart')}<div class="icon-list-item-content">Your **GPA & grades** info</div></div><div class="icon-list-item">${icon('book')}<div class="icon-list-item-content">**Course** details for any year</div></div><div class="icon-list-item">${icon('trend')}<div class="icon-list-item-content">**Credit** requirements</div></div><div class="icon-list-item">${icon('briefcase')}<div class="icon-list-item-content">**Career paths** for your department</div></div><div class="icon-list-item">${icon('clipboard')}<div class="icon-list-item-content">**Grade scale** reference</div></div>\nWhat would you like to know?`,
        actions: ['My GPA', 'Year 1 courses', 'Career paths', 'Credit summary']
      };
    }

    // Help
    if (/^(help|what can you|what do you|commands|options|menu)/.test(q)) {
      return {
        text: `Here's what I can answer:\n\n<div class="icon-list-item">${icon('chart')}<div class="icon-list-item-content">**Grades & GPA** — "my gpa", "my grades", "how am I doing"</div></div><div class="icon-list-item">${icon('book')}<div class="icon-list-item-content">**Courses** — "year 1 courses", "semester 2", "optional courses"</div></div><div class="icon-list-item">${icon('trend')}<div class="icon-list-item-content">**Credits** — "credit summary", "how many credits"</div></div><div class="icon-list-item">${icon('briefcase')}<div class="icon-list-item-content">**Careers** — "career paths", "jobs for ${dept}"</div></div><div class="icon-list-item">${icon('clipboard')}<div class="icon-list-item-content">**Grade Scale** — "grade scale", "what is A+"</div></div><div class="icon-list-item">${icon('building')}<div class="icon-list-item-content">**Department** — "departments", "about ICT"</div></div><div class="icon-list-item">${icon('user')}<div class="icon-list-item-content">**About** — "who made this"</div></div>`,
        actions: ['My GPA', 'Credit summary', 'Career paths', 'Grade scale']
      };
    }

    // Who made this / about
    if (/who (made|built|created|developed|designed)|about (this|the creator|developer)|creator|developer|diwakara/.test(q)) {
      return {
        text: `${icon('user')} This system was designed and developed by **H. M. Pasindu Diwakara** from the Department of Information & Communication Technology (ICT), Faculty of Technology, Rajarata University of Sri Lanka. ${icon('grad')}`
      };
    }

    // GPA query
    if (/gpa|grade point|how am i doing|my grade|my result|my performance|academic/.test(q)) {
      if (gpaData.gpa !== null) {
        const cls = getGPAClass(gpaData.gpa);
        let statusText = '';
        if (gpaData.gpa >= 3.7) statusText = `${icon('star')} Excellent! You're on track for First Class Honours!`;
        else if (gpaData.gpa >= 3.3) statusText = `${icon('thumbs')} Great work! You're in Second Class Upper range.`;
        else if (gpaData.gpa >= 3.0) statusText = `${icon('thumbs')} Good job! Second Class Lower range.`;
        else if (gpaData.gpa >= 2.0) statusText = `${icon('clipboard')} You're passing. Keep pushing for a higher class!`;
        else statusText = `${icon('alert')} Your GPA needs improvement. Focus on upcoming courses!`;

        return {
          text: `${icon('chart')} **Your GPA Summary** (${deptInfo ? deptInfo.fullName : dept})\n\n**Current GPA:** ${gpaData.gpa.toFixed(2)} / 4.00\n**Classification:** ${cls}\n**Graded Credits:** ${gpaData.gradedCredits} of ${gpaData.totalGpaCredits} GPA credits\n**Progress:** ${Math.round(gpaData.gradedCredits / gpaData.totalGpaCredits * 100)}% graded\n\n${statusText}`,
          actions: ['Credit summary', 'My graded courses', 'Career paths']
        };
      } else {
        return {
          text: `${icon('chart')} You haven't entered any grades yet for **${deptInfo ? deptInfo.fullName : dept}**.\n\nUse the grade dropdowns on the main page to enter your grades, then come back and ask me again!`,
          actions: ['Credit summary', 'Year 1 courses', 'Grade scale']
        };
      }
    }

    // Graded courses
    if (/graded courses|my courses|entered grades|which courses/.test(q)) {
      const graded = getGradedCourses(dept);
      if (graded.length === 0) {
        return { text: `You haven't graded any courses yet. Enter grades on the main page first!` };
      }
      let text = `${icon('clipboard')} **Your Graded Courses** (${graded.length} courses)\n\n`;
      graded.forEach(c => {
        text += `<div class="icon-list-item">${icon('chevron')}<div class="icon-list-item-content">**${c.code}** — ${c.title} → **${c.grade}** (${c.credits}cr)</div></div>`;
      });
      return { text };
    }

    // Credit summary
    if (/credit|how many credit|total credit|remaining/.test(q)) {
      return {
        text: `${icon('trend')} **Credit Summary** (${deptInfo ? deptInfo.fullName : dept})\n\n**Total Credits:** ${gpaData.totalCredits}\n**Compulsory GPA:** ${gpaData.compulsory}\n**Optional GPA:** ${gpaData.optional}\n**Non-GPA:** ${gpaData.nonGpa}\n**Graded So Far:** ${gpaData.gradedCredits} of ${gpaData.totalGpaCredits}\n**Remaining to Grade:** ${gpaData.totalGpaCredits - gpaData.gradedCredits}\n\n${gpaData.totalCredits >= 120 ? `${icon('check')} You meet the 120 credit requirement!` : `${icon('alert')} You need ~${120 - gpaData.totalCredits} more credits to reach 120.`}`,
        actions: ['My GPA', 'Year 1 courses', 'Optional courses']
      };
    }

    // Year courses
    const yearMatch = q.match(/year\s*(\d)/);
    if (yearMatch) {
      const yearNum = yearMatch[1];
      const yr = getCoursesForYear(dept, yearNum);
      if (!yr) return { text: `I couldn't find Year ${yearNum} data for ${dept}.` };
      let text = `${icon('book')} **${yr.year} Courses** — ${deptInfo ? deptInfo.fullName : dept}\n\n`;
      for (const sem of yr.sems) {
        text += `**${sem.sem}:**\n`;
        for (const c of sem.courses) {
          const flag = c.flag === 'OPT' ? ' *(Optional)*' : c.flag === 'NONGPA' ? ' *(Non-GPA)*' : '';
          text += `<div class="icon-list-item">${icon('chevron')}<div class="icon-list-item-content">${c.code} — ${c.title} (${c.credits}cr)${flag}</div></div>`;
        }
        text += '\n';
      }
      return { text, actions: yearNum < 4 ? [`Year ${parseInt(yearNum)+1} courses`] : ['My GPA'] };
    }

    // Semester query
    if (/semester\s*(\d)/.test(q)) {
      const semNum = q.match(/semester\s*(\d)/)[1];
      if (!deptInfo) return { text: 'Department data not found.' };
      let found = false;
      let text = `${icon('book')} **Semester ${semNum} Courses:**\n\n`;
      for (const yr of deptInfo.years) {
        for (const sem of yr.sems) {
          if (sem.sem.includes(semNum)) {
            found = true;
            text += `**${yr.year} — ${sem.sem}:**\n`;
            for (const c of sem.courses) {
              const flag = c.flag === 'OPT' ? ' *(Opt)*' : c.flag === 'NONGPA' ? ' *(Non-GPA)*' : '';
              text += `<div class="icon-list-item">${icon('chevron')}<div class="icon-list-item-content">${c.code} — ${c.title} (${c.credits}cr)${flag}</div></div>`;
            }
            text += '\n';
          }
        }
      }
      if (!found) return { text: `No Semester ${semNum} data found.` };
      return { text };
    }

    // Optional courses
    if (/optional|elective/.test(q)) {
      if (!deptInfo) return { text: 'Department data not found.' };
      let text = `${icon('clipboard')} **Optional Courses** — ${deptInfo.fullName}\n\n`;
      let count = 0;
      for (const yr of deptInfo.years)
        for (const sem of yr.sems)
          for (const c of sem.courses)
            if (c.flag === 'OPT') {
              text += `<div class="icon-list-item">${icon('chevron')}<div class="icon-list-item-content">**${c.code}** — ${c.title} (${c.credits}cr) — ${yr.year}</div></div>`;
              count++;
            }
      text += `\n**Total Optional Credits:** ${gpaData.optional} across ${count} courses`;
      return { text };
    }

    // Career paths
    if (/career|job|work|profession|future|employment|path/.test(q)) {
      const careers = {
        ICT: ['Software Engineer', 'Web Developer', 'Data Scientist', 'AI/ML Engineer', 'Mobile App Developer', 'Cybersecurity Analyst', 'Cloud Architect', 'Database Administrator', 'DevOps Engineer', 'UI/UX Designer'],
        BPT: ['Bioprocess Engineer', 'Quality Control Analyst', 'R&D Scientist', 'Bioinformatics Specialist', 'Drug Development Researcher', 'Fermentation Technologist', 'Environmental Biotechnologist', 'Pharmaceutical Scientist'],
        FDT: ['Food Safety Officer', 'Product Developer', 'Nutrition Technologist', 'R&D Food Scientist', 'Quality Auditor', 'Food Microbiologist', 'Process Engineer', 'Supply Chain Manager'],
        EET: ['Automation Engineer', 'Embedded Systems Developer', 'Power Engineer', 'Robotics Engineer', 'Renewable Energy Specialist', 'IoT Solutions Architect', 'Control Systems Engineer', 'Telecom Engineer'],
        MAT: ['Materials Analyst', 'Polymer Engineer', 'Nanotechnologist', 'Metallurgical Engineer', 'Ceramics Engineer', 'Semiconductor Engineer', 'Composites Manufacturing Engineer', 'R&D Materials Scientist']
      };
      const paths = careers[dept] || ['Various technology roles'];
      let text = `${icon('briefcase')} **Career Paths for ${deptInfo ? deptInfo.fullName : dept}**\n\n`;
      paths.forEach((p, i) => {
        text += `${i+1}. **${p}**\n`;
      });
      text += `\n${icon('bulb')} Visit the **Career Insights** page for detailed demand analysis and course affinity matching!`;
      return {
        text,
        actions: ['My GPA', 'Optional courses', 'Credit summary']
      };
    }

    // Grade scale
    if (/grade scale|grading|grade system|what is a\+|what is a-|grade reference|grade point/.test(q)) {
      return {
        text: `${icon('clipboard')} **Grade Scale Reference**\n\n**A+** → 4.0 | **A** → 4.0 | **A-** → 3.7\n**B+** → 3.3 | **B** → 3.0 | **B-** → 2.7\n**C+** → 2.3 | **C** → 2.0 | **C-** → 1.7\n**D+** → 1.3 | **D** → 1.0\n**E / F** → 0.0\n\n**Classifications:**\n🥇 First Class Honours: 3.70 – 4.00\n🥈 Second Upper: 3.30 – 3.69\n🥉 Second Lower: 3.00 – 3.29\n📜 Pass: 2.00 – 2.99`
      };
    }

    // Department info
    if (/department|dept|which dept|all department|list department|about ict|about bpt|about fdt|about eet|about mat/.test(q)) {
      const depts = getDepts();
      if (!depts) return { text: 'Department data not available.' };
      
      // Specific department query
      const deptMatch = q.match(/about\s+(ict|bpt|fdt|eet|mat)/i);
      if (deptMatch) {
        const key = deptMatch[1].toUpperCase();
        const d = depts[key];
        if (d) {
          const data = calcGPAData(key);
          return {
            text: `${icon('building')} **${d.fullName} (${d.name})**\n\n**Total Credits:** ${data.totalCredits}\n**Compulsory:** ${data.compulsory} | **Optional:** ${data.optional} | **Non-GPA:** ${data.nonGpa}\n**Years:** ${d.years.length}\n**Total Courses:** ${d.years.reduce((a, y) => a + y.sems.reduce((b, s) => b + s.courses.length, 0), 0)}`
          };
        }
      }
      
      let text = `${icon('building')} **Available Departments**\n\n`;
      Object.values(depts).forEach(d => {
        const marker = d.name === dept ? ' ← *current*' : '';
        text += `<div class="icon-list-item">${icon('chevron')}<div class="icon-list-item-content">**${d.name}** — ${d.fullName}${marker}</div></div>`;
      });
      text += `\nAsk "about ICT" or any department code for details!`;
      return { text, actions: ['About ICT', 'About BPT', 'About FDT'] };
    }

    // University info
    if (/university|rajarata|faculty|fot|rusl/.test(q)) {
      return {
        text: `${icon('building')} **Faculty of Technology (FOT)**\nRajarata University of Sri Lanka (RUSL)\n\n**Departments:**\n<div class="icon-list-item">${icon('chevron')}<div class="icon-list-item-content">ICT — Information & Communication Technology</div></div><div class="icon-list-item">${icon('chevron')}<div class="icon-list-item-content">BPT — Bioprocess Technology</div></div><div class="icon-list-item">${icon('chevron')}<div class="icon-list-item-content">FDT — Food Technology</div></div><div class="icon-list-item">${icon('chevron')}<div class="icon-list-item-content">EET — Electrical & Electronic Technology</div></div><div class="icon-list-item">${icon('chevron')}<div class="icon-list-item-content">MAT — Materials Technology</div></div>\n**Degree:** B.Sc. (Hons) in Technology\n**Duration:** 4 Years (8 Semesters)\n**Credit Requirement:** ~120 credits`,
        actions: ['Departments', 'My GPA', 'Career paths']
      };
    }

    // Thanks
    if (/thank|thanks|thx|cheers/.test(q)) {
      return { text: `You're welcome! ${icon('smile')} Feel free to ask anything else about your courses, GPA, or career paths!` };
    }

    // Goodbye
    if (/bye|goodbye|see you|later/.test(q)) {
      return { text: `Goodbye! ${icon('smile')} Good luck with your studies! Come back anytime you need help.` };
    }

    // Fallback
    return {
      text: `I'm not sure about that, but I can help with these topics:\n\n<div class="icon-list-item">${icon('chevron')}<div class="icon-list-item-content">**GPA & Grades** — "my gpa"</div></div><div class="icon-list-item">${icon('chevron')}<div class="icon-list-item-content">**Courses** — "year 1 courses"</div></div><div class="icon-list-item">${icon('chevron')}<div class="icon-list-item-content">**Credits** — "credit summary"</div></div><div class="icon-list-item">${icon('chevron')}<div class="icon-list-item-content">**Careers** — "career paths"</div></div><div class="icon-list-item">${icon('chevron')}<div class="icon-list-item-content">**Grade Scale** — "grade scale"</div></div><div class="icon-list-item">${icon('chevron')}<div class="icon-list-item-content">**Departments** — "departments"</div></div>`,
      actions: ['My GPA', 'Career paths', 'Departments', 'Help']
    };
  }

  // --- SEND HANDLER ---
  function handleSend() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    chatInput.value = '';

    addTyping();

    // Simulate brief thinking time
    setTimeout(() => {
      removeTyping();
      const response = getResponse(text);
      addMessage(response.text, 'ai');
      if (response.actions) {
        addQuickActions(response.actions);
      }
    }, 400 + Math.random() * 400);
  }

  sendBtn.addEventListener('click', handleSend);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  // --- WELCOME MESSAGE ---
  function showWelcome() {
    const dept = getCurrentDept();
    const deptInfo = getDeptInfo(dept);
    const name = deptInfo ? deptInfo.fullName : dept;
    addMessage(`Hi! ${icon('bot')} I'm the **FOT Assistant**.\n\nI have all the info about your **${name}** courses, grades, credits, and career paths built right in. No internet needed!\n\nWhat can I help you with?`, 'ai');
    addQuickActions(['My GPA', 'Career paths', 'Credit summary', 'Help']);
  }

  showWelcome();

})();
