const fs = require('fs');

let index = fs.readFileSync('index.html', 'utf8');

// 1. Add CSS
const newCss = `
    .floating-gpa {
      position: fixed;
      top: -100px;
      left: 50%;
      transform: translateX(-50%);
      padding: 10px 24px;
      border-radius: 30px;
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 12px;
      transition: top 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      border: 1px solid var(--border);
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }
    [data-theme="dark"] .floating-gpa {
      background: rgba(15, 17, 35, 0.7);
    }
    .floating-gpa.visible {
      top: 24px;
      border-color: var(--accent);
    }
    .floating-gpa-label {
      font-size: 12px;
      font-weight: 600;
      color: var(--text2);
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    .floating-gpa-val {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 20px;
      font-weight: 700;
      color: var(--accent);
    }
`;

if (!index.includes('.floating-gpa {')) {
  index = index.replace('  </style>', newCss + '\  </style>');
}

// 2. Add HTML just after <body>
const htmlToAdd = `
  <div id="floatingGpa" class="floating-gpa">
    <div class="floating-gpa-label">Current GPA</div>
    <div class="floating-gpa-val" id="floatingGpaVal">—</div>
  </div>
`;

if (!index.includes('id="floatingGpa"')) {
  index = index.replace('<body>', '<body>\n' + htmlToAdd);
}

// 3. Update renderSummary to update the floating GPA
if (!index.includes("document.getElementById('floatingGpaVal').textContent = gpaVal;")) {
  index = index.replace(
    "document.getElementById('gpaVal').textContent = gpaVal;",
    "document.getElementById('gpaVal').textContent = gpaVal;\n      document.getElementById('floatingGpaVal').textContent = gpaVal;"
  );
}

// 4. Add scroll listener at the bottom of the script
const jsToAdd = `
    window.addEventListener('scroll', () => {
      const dashboard = document.querySelector('.dashboard-glass');
      const floatingGpa = document.getElementById('floatingGpa');
      if (dashboard && floatingGpa) {
        const rect = dashboard.getBoundingClientRect();
        if (rect.bottom < 50) {
          floatingGpa.classList.add('visible');
        } else {
          floatingGpa.classList.remove('visible');
        }
      }
    });
`;

if (!index.includes('floatingGpa.classList.add(\'visible\')')) {
  index = index.replace('</script>', jsToAdd + '\n  </script>');
}

fs.writeFileSync('index.html', index);
console.log("Floating GPA added.");
