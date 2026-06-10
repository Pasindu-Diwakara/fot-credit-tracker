const fs = require('fs');

let index = fs.readFileSync('index.html', 'utf8');

// 1. Replace the HTML generation in renderCourses()
const htmlGenOld = `            const opts = GRADE_OPTIONS.map(o => \`<option value="\${o}" \${o === g ? 'selected' : ''}>\${o || '— Grade —'}</option>\`).join('');
            const selectClass = isGraded ? 'grade-select graded' : 'grade-select';
            const disabledAttr = c.flag === 'NONGPA' ? 'disabled' : '';
            const disabledStyle = c.flag === 'NONGPA' ? 'style="opacity:0.4;pointer-events:none"' : '';
            html += \`
              <div class="course-row">
                <div class="course-name">
                  <span class="course-code">\${c.code}</span>
                  <span class="course-title-text">\${c.title}</span>
                  <div class="course-badges">\${badges}</div>
                </div>
                <div class="credit-chip">\${c.credits}cr</div>
                <div \${disabledStyle}>
                  <select class="\${selectClass}" \${disabledAttr}
                    onchange="setGrade('\${key}', this.value, this)">
                    \${opts}
                  </select>
                </div>
              </div>\`;`;

const htmlGenNew = `            const opts = GRADE_OPTIONS.map(o => \`<div class="custom-option \${o === g ? 'selected' : ''}" data-val="\${o}" onclick="selectGrade(event, '\${key}', '\${o}', this)">\${o || '— Grade —'}</div>\`).join('');
            const selectClass = isGraded ? 'custom-select grade-custom-select graded' : 'custom-select grade-custom-select';
            
            let dropdownHtml = '';
            if (c.flag === 'NONGPA') {
              dropdownHtml = \`<div style="opacity:0.4; font-size:12px; font-weight:500; text-align:center; padding: 8px;">— Grade —</div>\`;
            } else {
              dropdownHtml = \`
                <div class="\${selectClass}" id="gradeContainer_\${key}">
                  <div class="select-selected grade-trigger" onclick="toggleGradeDropdown(event, '\${key}')">\${g || '— Grade —'}</div>
                  <div class="select-items" id="gradeItems_\${key}">
                    \${opts}
                  </div>
                </div>\`;
            }

            html += \`
              <div class="course-row">
                <div class="course-name">
                  <span class="course-code">\${c.code}</span>
                  <span class="course-title-text">\${c.title}</span>
                  <div class="course-badges">\${badges}</div>
                </div>
                <div class="credit-chip">\${c.credits}cr</div>
                <div style="position: relative;">
                  \${dropdownHtml}
                </div>
              </div>\`;`;

index = index.replace(htmlGenOld, htmlGenNew);


// 2. Add toggleGradeDropdown and selectGrade functions, and update the global click listener
const oldClickListener = `    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      const select = document.querySelector('.custom-select');
      if (select && !select.contains(e.target)) {
        select.classList.remove('open');
      }
    });`;

const newClickListener = `    function toggleGradeDropdown(e, key) {
      e.stopPropagation();
      // Close any other open dropdowns first
      document.querySelectorAll('.custom-select.open').forEach(sel => {
        if (sel.id !== 'gradeContainer_' + key && sel.id !== 'deptCustomSelect') {
          sel.classList.remove('open');
        }
      });
      const container = document.getElementById('gradeContainer_' + key);
      container.classList.toggle('open');
    }

    function selectGrade(e, key, val, el) {
      e.stopPropagation();
      setGrade(key, val, el);
      // Close dropdown
      document.getElementById('gradeContainer_' + key).classList.remove('open');
      // Set the text
      document.querySelector('#gradeContainer_' + key + ' .select-selected').textContent = val || '— Grade —';
      
      // Update selected class
      const itemsContainer = document.getElementById('gradeItems_' + key);
      itemsContainer.querySelectorAll('.custom-option').forEach(opt => opt.classList.remove('selected'));
      el.classList.add('selected');
      
      // Update graded style
      if (val) {
        document.getElementById('gradeContainer_' + key).classList.add('graded');
      } else {
        document.getElementById('gradeContainer_' + key).classList.remove('graded');
      }
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.matches('.select-selected')) {
        document.querySelectorAll('.custom-select.open').forEach(sel => sel.classList.remove('open'));
      }
    });`;

index = index.replace(oldClickListener, newClickListener);


// 3. Add CSS for .grade-custom-select
const oldCSS = `    .grade-select:focus {
      outline: none;
      border-color: var(--accent);
    }`;

const newCSS = `    .grade-select:focus {
      outline: none;
      border-color: var(--accent);
    }

    .grade-custom-select {
      max-width: 120px;
      font-size: 12px;
    }
    .grade-custom-select .select-selected {
      padding: 8px 30px 8px 12px;
      font-size: 12px;
    }
    .grade-custom-select .select-items {
      max-height: 250px;
      overflow-y: auto;
      min-width: 100px;
    }
    .grade-custom-select.graded .select-selected {
      border-color: var(--accent);
      background: var(--accent-glow);
      color: var(--accent);
      font-weight: 600;
    }
    [data-theme="dark"] .grade-custom-select.graded .select-selected {
      color: #fdb973;
    }`;

index = index.replace(oldCSS, newCSS);

fs.writeFileSync('index.html', index);
console.log("Updated index.html to use custom grade dropdowns.");
