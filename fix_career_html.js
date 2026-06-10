const fs = require('fs');

let index = fs.readFileSync('careers.html', 'utf8');

const regex = /html \+= \`[\s\S]*?\`;/;
const newHtml = `html += \`
        <div class="career-card" id="card-\${p.id}">
          <div class="career-head">
            <div class="career-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            </div>
            <div>
              <div class="career-title">\${p.title}</div>
              <div class="career-subtitle">\${idx === 0 && p.affinity > 0 ? '★ Top Match' : 'Career Option'}</div>
            </div>
          </div>
          <div class="career-desc">\${p.desc}</div>
          
          <div>
            <div class="graph-label">Market Demand <span>\${p.trend} growth</span></div>
            <div class="demand-graph">
              <div class="demand-fill" style="width: 0%"></div>
            </div>
            
            <div class="graph-label">Your Course Affinity <span>\${Math.round(p.affinity)}% Match</span></div>
            <div class="affinity-graph">
              <div class="affinity-fill" style="width: 0%"></div>
            </div>
          </div>
          
          <a href="https://www.linkedin.com/jobs/search/?keywords=\${encodeURIComponent(p.title)}&location=Sri%20Lanka" target="_blank" class="live-job-btn">
            <div class="live-dot"></div>
            View Live Jobs
          </a>
        </div>
      \`;`;

index = index.replace(regex, newHtml);
fs.writeFileSync('careers.html', index);
console.log("HTML completely fixed.");
