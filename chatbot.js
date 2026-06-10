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
        text: `Hello! 👋 I'm the **FOT Assistant**.\n\nYou're currently viewing the **${deptName}** department. I can help you with:\n\n• Your **GPA & grades** info\n• **Course** details for any year\n• **Credit** requirements\n• **Career paths** for your department\n• **Grade scale** reference\n\nWhat would you like to know?`,
        actions: ['My GPA', 'Year 1 courses', 'Career paths', 'Credit summary']
      };
    }

    // Help
    if (/^(help|what can you|what do you|commands|options|menu)/.test(q)) {
      return {
        text: `Here's what I can answer:\n\n📊 **Grades & GPA** — "my gpa", "my grades", "how am I doing"\n📚 **Courses** — "year 1 courses", "semester 2", "optional courses"\n📈 **Credits** — "credit summary", "how many credits"\n💼 **Careers** — "career paths", "jobs for ${dept}"\n📋 **Grade Scale** — "grade scale", "what is A+"\n🏫 **Department** — "departments", "about ICT"\n👤 **About** — "who made this"`,
        actions: ['My GPA', 'Credit summary', 'Career paths', 'Grade scale']
      };
    }

    // Who made this / about
    if (/who (made|built|created|developed|designed)|about (this|the creator|developer)|creator|developer|diwakara/.test(q)) {
      return {
        text: `This system was designed and developed by **H. M. Pasindu Diwakara** from the Department of Information & Communication Technology (ICT), Faculty of Technology, Rajarata University of Sri Lanka. 🎓`
      };
    }

    // GPA query
    if (/gpa|grade point|how am i doing|my grade|my result|my performance|academic/.test(q)) {
      if (gpaData.gpa !== null) {
        const cls = getGPAClass(gpaData.gpa);
        return {
          text: `📊 **Your GPA Summary** (${deptInfo ? deptInfo.fullName : dept})\n\n**Current GPA:** ${gpaData.gpa.toFixed(2)} / 4.00\n**Classification:** ${cls}\n**Graded Credits:** ${gpaData.gradedCredits} of ${gpaData.totalGpaCredits} GPA credits\n**Progress:** ${Math.round(gpaData.gradedCredits / gpaData.totalGpaCredits * 100)}% graded\n\n${gpaData.gpa >= 3.7 ? '🌟 Excellent! You\'re on track for First Class Honours!' : gpaData.gpa >= 3.3 ? '💪 Great work! You\'re in Second Class Upper range.' : gpaData.gpa >= 3.0 ? '👍 Good job! Second Class Lower range.' : gpaData.gpa >= 2.0 ? '📝 You\'re passing. Keep pushing for a higher class!' : '⚠️ Your GPA needs improvement. Focus on upcoming courses!'}`,
          actions: ['Credit summary', 'My graded courses', 'Career paths']
        };
      } else {
        return {
          text: `📊 You haven't entered any grades yet for **${deptInfo ? deptInfo.fullName : dept}**.\n\nUse the grade dropdowns on the main page to enter your grades, then come back and ask me again!`,
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
      let text = `📋 **Your Graded Courses** (${graded.length} courses)\n\n`;
      graded.forEach(c => {
        text += `• **${c.code}** — ${c.title} → **${c.grade}** (${c.credits}cr)\n`;
      });
      return { text };
    }

    // Credit summary
    if (/credit|how many credit|total credit|remaining/.test(q)) {
      return {
        text: `📈 **Credit Summary** (${deptInfo ? deptInfo.fullName : dept})\n\n**Total Credits:** ${gpaData.totalCredits}\n**Compulsory GPA:** ${gpaData.compulsory}\n**Optional GPA:** ${gpaData.optional}\n**Non-GPA:** ${gpaData.nonGpa}\n**Graded So Far:** ${gpaData.gradedCredits} of ${gpaData.totalGpaCredits}\n**Remaining to Grade:** ${gpaData.totalGpaCredits - gpaData.gradedCredits}\n\n${gpaData.totalCredits >= 120 ? '✅ You meet the 120 credit requirement!' : `⚠️ You need ~${120 - gpaData.totalCredits} more credits to reach 120.`}`,
        actions: ['My GPA', 'Year 1 courses', 'Optional courses']
      };
    }

    // Year courses
    const yearMatch = q.match(/year\s*(\d)/);
    if (yearMatch) {
      const yearNum = yearMatch[1];
      const yr = getCoursesForYear(dept, yearNum);
      if (!yr) return { text: `I couldn't find Year ${yearNum} data for ${dept}.` };
      let text = `📚 **${yr.year} Courses** — ${deptInfo ? deptInfo.fullName : dept}\n\n`;
      for (const sem of yr.sems) {
        text += `**${sem.sem}:**\n`;
        for (const c of sem.courses) {
          const flag = c.flag === 'OPT' ? ' *(Optional)*' : c.flag === 'NONGPA' ? ' *(Non-GPA)*' : '';
          text += `• ${c.code} — ${c.title} (${c.credits}cr)${flag}\n`;
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
      let text = `📚 **Semester ${semNum} Courses:**\n\n`;
      for (const yr of deptInfo.years) {
        for (const sem of yr.sems) {
          if (sem.sem.includes(semNum)) {
            found = true;
            text += `**${yr.year} — ${sem.sem}:**\n`;
            for (const c of sem.courses) {
              const flag = c.flag === 'OPT' ? ' *(Opt)*' : c.flag === 'NONGPA' ? ' *(Non-GPA)*' : '';
              text += `• ${c.code} — ${c.title} (${c.credits}cr)${flag}\n`;
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
      let text = `📋 **Optional Courses** — ${deptInfo.fullName}\n\n`;
      let count = 0;
      for (const yr of deptInfo.years)
        for (const sem of yr.sems)
          for (const c of sem.courses)
            if (c.flag === 'OPT') {
              text += `• **${c.code}** — ${c.title} (${c.credits}cr) — ${yr.year}\n`;
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
      let text = `💼 **Career Paths for ${deptInfo ? deptInfo.fullName : dept}**\n\n`;
      paths.forEach((p, i) => {
        text += `${i+1}. **${p}**\n`;
      });
      text += `\n💡 Visit the **Career Insights** page for detailed demand analysis and course affinity matching!`;
      return {
        text,
        actions: ['My GPA', 'Optional courses', 'Credit summary']
      };
    }

    // Grade scale
    if (/grade scale|grading|grade system|what is a\+|what is a-|grade reference|grade point/.test(q)) {
      return {
        text: `📋 **Grade Scale Reference**\n\n**A+** → 4.0 | **A** → 4.0 | **A-** → 3.7\n**B+** → 3.3 | **B** → 3.0 | **B-** → 2.7\n**C+** → 2.3 | **C** → 2.0 | **C-** → 1.7\n**D+** → 1.3 | **D** → 1.0\n**E / F** → 0.0\n\n**Classifications:**\n🥇 First Class Honours: 3.70 – 4.00\n🥈 Second Upper: 3.30 – 3.69\n🥉 Second Lower: 3.00 – 3.29\n📜 Pass: 2.00 – 2.99`
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
            text: `🏫 **${d.fullName} (${d.name})**\n\n**Total Credits:** ${data.totalCredits}\n**Compulsory:** ${data.compulsory} | **Optional:** ${data.optional} | **Non-GPA:** ${data.nonGpa}\n**Years:** ${d.years.length}\n**Total Courses:** ${d.years.reduce((a, y) => a + y.sems.reduce((b, s) => b + s.courses.length, 0), 0)}`
          };
        }
      }
      
      let text = `🏫 **Available Departments**\n\n`;
      Object.values(depts).forEach(d => {
        const marker = d.name === dept ? ' ← *current*' : '';
        text += `• **${d.name}** — ${d.fullName}${marker}\n`;
      });
      text += `\nAsk "about ICT" or any department code for details!`;
      return { text, actions: ['About ICT', 'About BPT', 'About FDT'] };
    }

    // University info
    if (/university|rajarata|faculty|fot|rusl/.test(q)) {
      return {
        text: `🏫 **Faculty of Technology (FOT)**\nRajarata University of Sri Lanka (RUSL)\n\n**Departments:**\n• ICT — Information & Communication Technology\n• BPT — Bioprocess Technology\n• FDT — Food Technology\n• EET — Electrical & Electronic Technology\n• MAT — Materials Technology\n\n**Degree:** B.Sc. (Hons) in Technology\n**Duration:** 4 Years (8 Semesters)\n**Credit Requirement:** ~120 credits`,
        actions: ['Departments', 'My GPA', 'Career paths']
      };
    }

    // Thanks
    if (/thank|thanks|thx|cheers/.test(q)) {
      return { text: `You're welcome! 😊 Feel free to ask anything else about your courses, GPA, or career paths!` };
    }

    // Goodbye
    if (/bye|goodbye|see you|later/.test(q)) {
      return { text: `Goodbye! 👋 Good luck with your studies! Come back anytime you need help.` };
    }

    // Fallback
    return {
      text: `I'm not sure about that, but I can help with these topics:\n\n• **GPA & Grades** — "my gpa"\n• **Courses** — "year 1 courses"\n• **Credits** — "credit summary"\n• **Careers** — "career paths"\n• **Grade Scale** — "grade scale"\n• **Departments** — "departments"`,
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
    addMessage(`Hi! 👋 I'm the **FOT Assistant**.\n\nI have all the info about your **${name}** courses, grades, credits, and career paths built right in. No internet needed!\n\nWhat can I help you with?`, 'ai');
    addQuickActions(['My GPA', 'Career paths', 'Credit summary', 'Help']);
  }

  showWelcome();

})();
