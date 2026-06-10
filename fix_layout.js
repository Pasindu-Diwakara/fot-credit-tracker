const fs = require('fs');
let code = fs.readFileSync('courses.js', 'utf8');
const match = code.match(/const DEPARTMENTS = (\{[\s\S]*\});/);
if (match) {
  const depts = eval('(' + match[1] + ')');
  const newDepts = {};
  newDepts['ICT'] = depts['ICT'];
  for (const k of Object.keys(depts)) {
    if (k !== 'ICT') newDepts[k] = depts[k];
  }
  const newCode = `const DEPARTMENTS = ${JSON.stringify(newDepts, null, 2)};`;
  fs.writeFileSync('courses.js', newCode, 'utf8');
  console.log("Updated courses.js");
} else {
  console.log("DEPARTMENTS not found");
}

// Update index.html
let index = fs.readFileSync('index.html', 'utf8');
if(!index.includes('padding-bottom: 100px;')) {
  index = index.replace('body {', 'body {\n        padding-bottom: 100px;');
}
if(!index.includes('@media (max-width: 380px)')) {
  index = index.replace('    @media (max-width: 600px) {', '    @media (max-width: 380px) {\n      .header-right .theme-btn {\n        flex: 1 1 100%;\n      }\n    }\n\n    @media (max-width: 600px) {');
}
fs.writeFileSync('index.html', index, 'utf8');
console.log("Updated index.html");

// Update careers.html
let careers = fs.readFileSync('careers.html', 'utf8');
if(careers.includes("let currentDept = 'ICT';")) {
  careers = careers.replace("let currentDept = 'ICT';", "let currentDept = localStorage.getItem('fot_dept_v1') || 'ICT';");
}
if(!careers.includes('padding-bottom: 100px;')) {
  careers = careers.replace('body {', 'body {\n        padding-bottom: 100px;');
}
fs.writeFileSync('careers.html', careers, 'utf8');
console.log("Updated careers.html");
