const fs = require('fs');

let careers = fs.readFileSync('careers.html', 'utf8');

// 1. Inject CSS
const cssToInject = `
  .live-job-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 16px;
    padding: 10px 18px;
    background: transparent;
    border: 1px solid var(--accent);
    border-radius: 8px;
    font-size: 13px;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    color: var(--accent);
    text-decoration: none;
    transition: all 0.3s;
    width: 100%;
  }
  .live-job-btn:hover {
    background: var(--accent-glow);
    box-shadow: 0 4px 12px var(--accent-glow);
  }
  .live-dot {
    width: 8px;
    height: 8px;
    background-color: var(--red);
    border-radius: 50%;
    position: relative;
  }
  .live-dot::after {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    background-color: var(--red);
    border-radius: 50%;
    animation: pulse 1.5s infinite;
    z-index: 1;
    opacity: 0.6;
  }
  @keyframes pulse {
    0% { transform: scale(0.5); opacity: 0.8; }
    100% { transform: scale(2); opacity: 0; }
  }
`;

if (!careers.includes('.live-job-btn')) {
  careers = careers.replace('  /* Responsive */', cssToInject + '\n  /* Responsive */');
}

// 2. Inject HTML Button
const oldHtml = `            <div class="affinity-graph">
              <div class="affinity-fill" style="width: 0%"></div>
            </div>
          </div>
        </div>
      \`;`;

const newHtml = `            <div class="affinity-graph">
              <div class="affinity-fill" style="width: 0%"></div>
            </div>
          </div>
          <a href="https://www.linkedin.com/jobs/search/?keywords=\${encodeURIComponent(p.title)}&location=Sri%20Lanka" target="_blank" class="live-job-btn">
            <div class="live-dot"></div>
            View Live Jobs
          </a>
        </div>
      \`;`;

if (!careers.includes('live-job-btn')) {
  careers = careers.replace(oldHtml, newHtml);
}

fs.writeFileSync('careers.html', careers);
console.log("Live Jobs button injected to careers.html");
