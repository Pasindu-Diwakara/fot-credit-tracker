const fs = require('fs');

let index = fs.readFileSync('index.html', 'utf8');

// 1. Extract the Download PDF button
const btnStartMatch = '        <button class="primary-btn" onclick="downloadPDF()">';
const startIdx = index.indexOf(btnStartMatch);

if (startIdx !== -1) {
    const endMatch = '        </button>\n';
    const endIdx = index.indexOf(endMatch, startIdx) + endMatch.length;

    const btnHTML = index.substring(startIdx, endIdx);

    // Remove the button from its current position
    index = index.substring(0, startIdx) + index.substring(endIdx);

    // 2. Insert it just before the closing </div> of .header-right
    // We'll find the Theme Toggle button which is the last button currently
    const themeBtnEnd = `        <button class="theme-btn" onclick="toggleTheme()" id="themeBtn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5" />
            <path
              d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <span id="themeLabel">Dark Mode</span>
        </button>\n`;
    
    const themeBtnIdx = index.indexOf(themeBtnEnd);
    if (themeBtnIdx !== -1) {
        index = index.substring(0, themeBtnIdx + themeBtnEnd.length) + btnHTML + index.substring(themeBtnIdx + themeBtnEnd.length);
    }
}

// 3. Update the mobile CSS to explicitly set flex 1 1 100%
const cssMatch = `      .header-right .primary-btn {
        order: 5;
      }`;
const cssReplace = `      .header-right .primary-btn {
        order: 5;
        flex: 1 1 100%;
        width: 100%;
      }`;
index = index.replace(cssMatch, cssReplace);

fs.writeFileSync('index.html', index, 'utf8');
console.log("Fixed button layout");
