
// ─── DATA ───────────────────────────────────────────────────────────────────

// Old CAREER_PATHS removed.
const GRADE_MAP = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0,
  'E': 0.0, 'F': 0.0
};
const GRADE_OPTIONS = ['', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'E', 'F'];

// Course flags: '' = compulsory GPA, 'OPT' = optional GPA, 'NONGPA' = non-GPA compulsory


// ─── STATE ───────────────────────────────────────────────────────────────────
let currentDept = localStorage.getItem('fot_dept_v1') || 'ICT';
let grades = {}; // key: deptCode_courseCode
let collapsedYears = {};

// ─── MESH CANVAS ────────────────────────────────────────────────────────────
const canvas = document.getElementById('mesh-canvas');
const ctx = canvas.getContext('2d');
let mouseX = -9999, mouseY = -9999;
const CELL = 38;
let cols, rows;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cols = Math.ceil(canvas.width / CELL) + 1;
  rows = Math.ceil(canvas.height / CELL) + 1;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function drawMesh() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const baseAlpha = isDark ? 0.09 : 0.12;
  const glowAlpha = isDark ? 0.55 : 0.45;
  const glowColor = isDark ? '251,146,60' : '234,88,12';
  const GLOW_RADIUS = 120;

  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const x = c * CELL;
      const y = r * CELL;
      const dx = x - mouseX;
      const dy = y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const glow = Math.max(0, 1 - dist / GLOW_RADIUS);
      const alpha = baseAlpha + glow * (glowAlpha - baseAlpha);
      ctx.fillStyle = `rgba(${glowColor},${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  requestAnimationFrame(drawMesh);
}
drawMesh();

// ─── MASSIVE JOB DATABASE ──────────────────────────────────────────────────
const CAREER_PATHS = {
  ICT: [
    { id: 'ict1', title: 'Software Engineer', desc: 'Design, develop, and maintain software applications and systems.', keywords: ['Program', 'Web', 'Software', 'Data', 'Structure', 'Algorithm'], maxAffinity: 6, demand: 92, trend: '+22%' },
    { id: 'ict2', title: 'Network Engineer', desc: 'Design and manage local and wide area networking infrastructure.', keywords: ['Network', 'Comm', 'Security', 'System', 'Admin'], maxAffinity: 5, demand: 85, trend: '+12%' },
    { id: 'ict3', title: 'Data Scientist', desc: 'Analyze data to extract insights using math and machine learning.', keywords: ['Math', 'Stat', 'Data', 'Machine', 'AI', 'Analysis'], maxAffinity: 6, demand: 95, trend: '+35%' },
    { id: 'ict4', title: 'IT Systems Admin', desc: 'Maintain and operate computing environments and hardware.', keywords: ['Hardware', 'System', 'OS', 'Operat', 'Database'], maxAffinity: 5, demand: 75, trend: '+5%' },
    { id: 'ict5', title: 'UI/UX Designer', desc: 'Design user interfaces and improve digital user experiences.', keywords: ['Human', 'Interact', 'Web', 'Multimedia', 'Design', 'Interface'], maxAffinity: 4, demand: 82, trend: '+15%' },
    { id: 'ict6', title: 'Database Administrator', desc: 'Secure, maintain, and optimize massive databases.', keywords: ['Data', 'Database', 'Admin', 'Manage'], maxAffinity: 4, demand: 80, trend: '+9%' },
    { id: 'ict7', title: 'IT Project Manager', desc: 'Lead tech projects from conception to deployment.', keywords: ['Project', 'Manage', 'Software', 'System'], maxAffinity: 4, demand: 78, trend: '+11%' },
    { id: 'ict8', title: 'Cyber Security Analyst', desc: 'Protect networks and systems from cyber threats.', keywords: ['Security', 'Network', 'Protect', 'Data'], maxAffinity: 4, demand: 98, trend: '+32%' },
    { id: 'ict9', title: 'Cloud Architect', desc: 'Design and deploy scalable cloud-based infrastructure.', keywords: ['Network', 'System', 'Data', 'Web', 'Software'], maxAffinity: 5, demand: 94, trend: '+28%' },
    { id: 'ict10', title: 'Systems Analyst', desc: 'Analyze and improve complex computer systems.', keywords: ['System', 'Software', 'Design', 'Manage', 'Analysis'], maxAffinity: 5, demand: 81, trend: '+8%' },
    { id: 'ict11', title: 'Machine Learning Engineer', desc: 'Build highly advanced AI and ML algorithms.', keywords: ['AI', 'Machine', 'Algorithm', 'Math', 'Data', 'Program'], maxAffinity: 6, demand: 99, trend: '+40%' },
    { id: 'ict12', title: 'DevOps Engineer', desc: 'Bridge development and operations for software delivery.', keywords: ['Software', 'System', 'Network', 'Project', 'Program'], maxAffinity: 5, demand: 93, trend: '+25%' },
    { id: 'ict13', title: 'Mobile App Developer', desc: 'Create applications for mobile platforms.', keywords: ['Mobile', 'App', 'Program', 'Software', 'Design'], maxAffinity: 5, demand: 87, trend: '+18%' },
    { id: 'ict14', title: 'IT Consultant', desc: 'Provide expert technical advice to organizations.', keywords: ['System', 'Manage', 'Project', 'Comm', 'Information'], maxAffinity: 5, demand: 76, trend: '+7%' },
    { id: 'ict15', title: 'Penetration Tester', desc: 'Perform ethical hacking to secure systems.', keywords: ['Security', 'Network', 'System', 'Software', 'Program'], maxAffinity: 5, demand: 90, trend: '+20%' },
    { id: 'ict16', title: 'Game Developer', desc: 'Develop mechanics and engines for video games.', keywords: ['Game', 'Program', 'Math', 'Multimedia', 'Graphics'], maxAffinity: 5, demand: 84, trend: '+14%' },
    { id: 'ict17', title: 'Technical Writer', desc: 'Create technical manuals and documentation.', keywords: ['Comm', 'Write', 'Information', 'System'], maxAffinity: 4, demand: 70, trend: '+4%' },
    { id: 'ict18', title: 'Blockchain Developer', desc: 'Develop decentralized ledgers and smart contracts.', keywords: ['Program', 'Security', 'Data', 'Algorithm'], maxAffinity: 4, demand: 86, trend: '+19%' },
    { id: 'ict19', title: 'Computer Vision Engineer', desc: 'Build AI that can interpret visual information.', keywords: ['Image', 'Graphics', 'AI', 'Machine', 'Math'], maxAffinity: 5, demand: 91, trend: '+26%' },
    { id: 'ict20', title: 'IT Support Specialist', desc: 'Provide hardware and software assistance to users.', keywords: ['Hardware', 'System', 'Comm', 'OS'], maxAffinity: 4, demand: 72, trend: '+3%' }
  ],
  BPT: [
    { id: 'bpt1', title: 'Quality Assurance Analyst', desc: 'Ensure bio-products meet strict quality standards.', keywords: ['Quality', 'Safety', 'Analyt', 'Microbiol'], maxAffinity: 4, demand: 82, trend: '+12%' },
    { id: 'bpt2', title: 'Bioprocess Engineer', desc: 'Design equipment for biological manufacturing.', keywords: ['Bioprocess', 'Bioreactor', 'Operation', 'Design'], maxAffinity: 4, demand: 88, trend: '+18%' },
    { id: 'bpt3', title: 'Molecular Researcher', desc: 'Research genetic and molecular systems.', keywords: ['Genetics', 'Molecular', 'Biology', 'Cell', 'Tissue'], maxAffinity: 5, demand: 75, trend: '+8%' },
    { id: 'bpt4', title: 'Regulatory Affairs Spec', desc: 'Ensure bio-manufacturing complies with laws.', keywords: ['Legal', 'Quality', 'Safety', 'Ethics'], maxAffinity: 3, demand: 80, trend: '+14%' },
    { id: 'bpt5', title: 'Plant Tissue Culturist', desc: 'Maintain plant cultures for agriculture.', keywords: ['Plant', 'Tissue', 'Culture', 'Bio'], maxAffinity: 4, demand: 68, trend: '+5%' },
    { id: 'bpt6', title: 'Biomedical Scientist', desc: 'Investigate human diseases and treatments.', keywords: ['Immunology', 'Molecular', 'Disease', 'Cell'], maxAffinity: 4, demand: 90, trend: '+22%' },
    { id: 'bpt7', title: 'Fermentation Technologist', desc: 'Manage large-scale fermentation for bio-products.', keywords: ['Bioreactor', 'Microbio', 'Process', 'Scale'], maxAffinity: 4, demand: 85, trend: '+16%' },
    { id: 'bpt8', title: 'Clinical Data Analyst', desc: 'Analyze biological data for clinical trials.', keywords: ['Bioinformatics', 'Data', 'Statistics', 'Clinical'], maxAffinity: 4, demand: 92, trend: '+28%' },
    { id: 'bpt9', title: 'Environmental Consultant', desc: 'Assess and mitigate environmental bio-risks.', keywords: ['Waste', 'Pollution', 'Environment', 'Ecology'], maxAffinity: 3, demand: 72, trend: '+7%' },
    { id: 'bpt10', title: 'Geneticist', desc: 'Study inheritance and variation of traits.', keywords: ['Genetics', 'Molecular', 'Biology', 'Evolution'], maxAffinity: 4, demand: 84, trend: '+15%' },
    { id: 'bpt11', title: 'Biochemist', desc: 'Analyze the chemical principles of living things.', keywords: ['Chemistry', 'Molecular', 'Cell', 'Bio'], maxAffinity: 4, demand: 78, trend: '+9%' },
    { id: 'bpt12', title: 'Forensic Scientist', desc: 'Analyze biological evidence for legal investigations.', keywords: ['Analyt', 'Molecular', 'Genetics', 'Chemistry'], maxAffinity: 4, demand: 70, trend: '+4%' },
    { id: 'bpt13', title: 'Pharmacologist', desc: 'Develop new drugs and study their effects.', keywords: ['Pharm', 'Medical', 'Chemistry', 'Biology'], maxAffinity: 4, demand: 89, trend: '+20%' },
    { id: 'bpt14', title: 'Bioinformatician', desc: 'Develop tools to analyze biological data.', keywords: ['Bioinformatics', 'Data', 'Program', 'Math'], maxAffinity: 4, demand: 95, trend: '+35%' },
    { id: 'bpt15', title: 'Microbiologist', desc: 'Study microscopic organisms and their applications.', keywords: ['Microbio', 'Cell', 'Culture', 'Bio'], maxAffinity: 4, demand: 81, trend: '+11%' },
    { id: 'bpt16', title: 'Toxicologist', desc: 'Study the safety and adverse effects of chemicals.', keywords: ['Safety', 'Chemistry', 'Quality', 'Environment'], maxAffinity: 4, demand: 76, trend: '+8%' },
    { id: 'bpt17', title: 'Healthcare Scientist', desc: 'Support clinical diagnosis and treatment.', keywords: ['Clinical', 'Immunology', 'Disease', 'Cell'], maxAffinity: 4, demand: 83, trend: '+13%' },
    { id: 'bpt18', title: 'Cell Culture Technician', desc: 'Grow and maintain cell lines in laboratories.', keywords: ['Cell', 'Culture', 'Tissue', 'Microbio'], maxAffinity: 4, demand: 74, trend: '+6%' },
    { id: 'bpt19', title: 'Biomanufacturing Specialist', desc: 'Oversee the production of biological materials.', keywords: ['Bioprocess', 'Manufacture', 'Process', 'Scale'], maxAffinity: 4, demand: 86, trend: '+17%' },
    { id: 'bpt20', title: 'Epidemiologist', desc: 'Investigate the causes and spread of diseases.', keywords: ['Disease', 'Data', 'Stat', 'Microbio'], maxAffinity: 4, demand: 94, trend: '+26%' }
  ],
  FDT: [
    { id: 'fdt1', title: 'Food Safety Officer', desc: 'Ensure food manufacturing complies with health standards.', keywords: ['Safety', 'Quality', 'Hygiene', 'Microbio'], maxAffinity: 4, demand: 85, trend: '+14%' },
    { id: 'fdt2', title: 'Product Developer', desc: 'Create new food products and improve formulations.', keywords: ['Develop', 'Process', 'Chemistry', 'Nutri'], maxAffinity: 4, demand: 88, trend: '+18%' },
    { id: 'fdt3', title: 'Nutrition Technologist', desc: 'Develop healthy and nutritious food items.', keywords: ['Nutri', 'Food', 'Develop', 'Health'], maxAffinity: 4, demand: 90, trend: '+20%' },
    { id: 'fdt4', title: 'Food Quality Auditor', desc: 'Inspect food processing facilities for safety.', keywords: ['Safety', 'Quality', 'Audit', 'Process'], maxAffinity: 4, demand: 78, trend: '+10%' },
    { id: 'fdt5', title: 'Flavor Chemist', desc: 'Create and analyze complex food flavors.', keywords: ['Chemistry', 'Flavor', 'Analyt', 'Sensory'], maxAffinity: 4, demand: 72, trend: '+8%' },
    { id: 'fdt6', title: 'Supply Chain Manager', desc: 'Manage agricultural logistics and distribution.', keywords: ['Agriculture', 'Logistics', 'Manage', 'Supply'], maxAffinity: 3, demand: 86, trend: '+15%' },
    { id: 'fdt7', title: 'Packaging Engineer', desc: 'Design sustainable packaging for perishables.', keywords: ['Packaging', 'Material', 'Design', 'Sustain'], maxAffinity: 3, demand: 82, trend: '+12%' },
    { id: 'fdt8', title: 'R&D Food Scientist', desc: 'Lead research into novel food technologies.', keywords: ['Research', 'Develop', 'Tech', 'Food'], maxAffinity: 4, demand: 92, trend: '+22%' },
    { id: 'fdt9', title: 'Food Inspector', desc: 'Examine raw and processed foods for safety.', keywords: ['Inspect', 'Safety', 'Quality', 'Hygiene'], maxAffinity: 4, demand: 74, trend: '+6%' },
    { id: 'fdt10', title: 'QC Supervisor', desc: 'Oversee daily quality control operations.', keywords: ['Quality', 'Control', 'Manage', 'Process'], maxAffinity: 4, demand: 80, trend: '+11%' },
    { id: 'fdt11', title: 'Sensory Scientist', desc: 'Evaluate the taste, smell, and texture of food.', keywords: ['Sensory', 'Analyt', 'Test', 'Food'], maxAffinity: 4, demand: 75, trend: '+9%' },
    { id: 'fdt12', title: 'Food Microbiologist', desc: 'Study microbes that cause foodborne illness.', keywords: ['Microbio', 'Safety', 'Hygiene', 'Food'], maxAffinity: 4, demand: 84, trend: '+16%' },
    { id: 'fdt13', title: 'Process Engineer (Food)', desc: 'Optimize food manufacturing and production lines.', keywords: ['Process', 'Manufacture', 'Design', 'Optimiz'], maxAffinity: 4, demand: 89, trend: '+19%' },
    { id: 'fdt14', title: 'Dairy Technologist', desc: 'Specialize in milk and dairy product manufacturing.', keywords: ['Dairy', 'Process', 'Microbio', 'Quality'], maxAffinity: 4, demand: 76, trend: '+7%' },
    { id: 'fdt15', title: 'Bakery Technologist', desc: 'Develop baked goods and grain-based products.', keywords: ['Bake', 'Grain', 'Process', 'Develop'], maxAffinity: 4, demand: 70, trend: '+5%' },
    { id: 'fdt16', title: 'Meat Scientist', desc: 'Improve the processing and safety of meat products.', keywords: ['Meat', 'Safety', 'Process', 'Quality'], maxAffinity: 4, demand: 72, trend: '+6%' },
    { id: 'fdt17', title: 'Beverage Formulator', desc: 'Design new drinks, from juices to functional beverages.', keywords: ['Beverage', 'Develop', 'Chemistry', 'Flavor'], maxAffinity: 4, demand: 81, trend: '+13%' },
    { id: 'fdt18', title: 'Compliance Specialist', desc: 'Ensure products meet FDA and global regulations.', keywords: ['Regulat', 'Legal', 'Safety', 'Standard'], maxAffinity: 4, demand: 83, trend: '+14%' },
    { id: 'fdt19', title: 'Culinary Technologist', desc: 'Bridge the gap between culinary arts and food science.', keywords: ['Culinary', 'Develop', 'Sensory', 'Food'], maxAffinity: 4, demand: 77, trend: '+10%' },
    { id: 'fdt20', title: 'Post-Harvest Tech', desc: 'Manage the storage and preservation of crops.', keywords: ['Harvest', 'Agriculture', 'Storage', 'Preserv'], maxAffinity: 4, demand: 79, trend: '+11%' }
  ],
  EET: [
    { id: 'eet1', title: 'Automation Engineer', desc: 'Design and implement automated manufacturing systems.', keywords: ['Automat', 'Control', 'PLC', 'System'], maxAffinity: 4, demand: 90, trend: '+20%' },
    { id: 'eet2', title: 'Embedded Systems Dev', desc: 'Program microcontrollers and embedded devices.', keywords: ['Embed', 'Micro', 'Program', 'Electronic'], maxAffinity: 4, demand: 88, trend: '+18%' },
    { id: 'eet3', title: 'Power Engineer', desc: 'Manage electrical power generation and distribution.', keywords: ['Power', 'Electric', 'Machine', 'Circuit'], maxAffinity: 4, demand: 82, trend: '+12%' },
    { id: 'eet4', title: 'Control Systems Eng', desc: 'Design systems that control complex machinery.', keywords: ['Control', 'System', 'Automat', 'Circuit'], maxAffinity: 4, demand: 86, trend: '+16%' },
    { id: 'eet5', title: 'Robotics Engineer', desc: 'Build and program industrial robots.', keywords: ['Robot', 'Automat', 'Program', 'System'], maxAffinity: 4, demand: 95, trend: '+30%' },
    { id: 'eet6', title: 'Renewable Energy Spec', desc: 'Design and deploy solar/wind power systems.', keywords: ['Power', 'Energy', 'Renew', 'Solar'], maxAffinity: 4, demand: 98, trend: '+40%' },
    { id: 'eet7', title: 'IoT Solutions Architect', desc: 'Design connected smart devices and sensors.', keywords: ['IoT', 'Sensor', 'Embed', 'Connect'], maxAffinity: 4, demand: 92, trend: '+28%' },
    { id: 'eet8', title: 'Telecom Network Eng', desc: 'Maintain communications infrastructure.', keywords: ['Telecom', 'Signal', 'Network', 'Comm'], maxAffinity: 4, demand: 78, trend: '+8%' },
    { id: 'eet9', title: 'Hardware Design Eng', desc: 'Design advanced PCBs and electronic hardware.', keywords: ['Hardware', 'PCB', 'Design', 'Circuit'], maxAffinity: 4, demand: 85, trend: '+15%' },
    { id: 'eet10', title: 'Electrical Project Mgr', desc: 'Oversee electrical engineering projects.', keywords: ['Project', 'Manage', 'Electric', 'System'], maxAffinity: 4, demand: 80, trend: '+10%' },
    { id: 'eet11', title: 'Instrumentation Eng', desc: 'Design measuring instruments for industrial systems.', keywords: ['Instrument', 'Measure', 'Sensor', 'Control'], maxAffinity: 4, demand: 84, trend: '+14%' },
    { id: 'eet12', title: 'Broadcast Engineer', desc: 'Maintain equipment for radio and TV broadcasting.', keywords: ['Broadcast', 'Signal', 'Telecom', 'Comm'], maxAffinity: 4, demand: 65, trend: '+2%' },
    { id: 'eet13', title: 'Mechatronics Engineer', desc: 'Combine mechanical, electrical, and computer engineering.', keywords: ['Mech', 'Electric', 'Robot', 'System'], maxAffinity: 4, demand: 94, trend: '+25%' },
    { id: 'eet14', title: 'PCB Designer', desc: 'Layout complex printed circuit boards.', keywords: ['PCB', 'Design', 'Circuit', 'Hardware'], maxAffinity: 4, demand: 81, trend: '+11%' },
    { id: 'eet15', title: 'FPGA Engineer', desc: 'Program Field Programmable Gate Arrays.', keywords: ['FPGA', 'Hardware', 'Program', 'Logic'], maxAffinity: 4, demand: 87, trend: '+17%' },
    { id: 'eet16', title: 'Audio/Visual Engineer', desc: 'Design professional A/V systems and acoustics.', keywords: ['Audio', 'Visual', 'Signal', 'System'], maxAffinity: 4, demand: 70, trend: '+5%' },
    { id: 'eet17', title: 'Power Systems Analyst', desc: 'Analyze and optimize large power grids.', keywords: ['Power', 'Grid', 'Analyt', 'System'], maxAffinity: 4, demand: 83, trend: '+13%' },
    { id: 'eet18', title: 'Smart Grid Engineer', desc: 'Modernize electrical grids with IoT and data.', keywords: ['Grid', 'Smart', 'IoT', 'Power'], maxAffinity: 4, demand: 96, trend: '+35%' },
    { id: 'eet19', title: 'Electronics Test Eng', desc: 'Ensure hardware meets quality and functional standards.', keywords: ['Test', 'Quality', 'Electronic', 'Circuit'], maxAffinity: 4, demand: 79, trend: '+9%' },
    { id: 'eet20', title: 'Motor Controls Spec', desc: 'Design drives and controllers for electric motors.', keywords: ['Motor', 'Drive', 'Control', 'Power'], maxAffinity: 4, demand: 77, trend: '+7%' }
  ],
  MAT: [
    { id: 'mat1', title: 'Materials Analyst', desc: 'Test and analyze properties of different materials.', keywords: ['Analy', 'Test', 'Prop', 'Character'], maxAffinity: 4, demand: 82, trend: '+12%' },
    { id: 'mat2', title: 'Polymer Engineer', desc: 'Design and develop polymer-based products.', keywords: ['Polymer', 'Plast', 'Chem', 'Process'], maxAffinity: 4, demand: 85, trend: '+15%' },
    { id: 'mat3', title: 'Nanotechnologist', desc: 'Manipulate matter on an atomic scale.', keywords: ['Nano', 'Mater', 'Prop', 'Physic'], maxAffinity: 4, demand: 90, trend: '+24%' },
    { id: 'mat4', title: 'Metallurgical Engineer', desc: 'Extract and process metals for manufacturing.', keywords: ['Metal', 'Process', 'Mater', 'Extract'], maxAffinity: 4, demand: 75, trend: '+6%' },
    { id: 'mat5', title: 'Ceramics Engineer', desc: 'Develop high-performance ceramic components.', keywords: ['Ceramic', 'Process', 'Material', 'Thermal'], maxAffinity: 4, demand: 78, trend: '+9%' },
    { id: 'mat6', title: 'Biomaterials Scientist', desc: 'Design materials for medical implants.', keywords: ['Bio', 'Material', 'Medical', 'Implant'], maxAffinity: 3, demand: 92, trend: '+28%' },
    { id: 'mat7', title: 'Corrosion Engineer', desc: 'Prevent material degradation in harsh environments.', keywords: ['Corrosion', 'Degrad', 'Protect', 'Chemistry'], maxAffinity: 3, demand: 80, trend: '+11%' },
    { id: 'mat8', title: 'Composites Mfg Eng', desc: 'Build lightweight, strong composite materials.', keywords: ['Composite', 'Manufacture', 'Polymer', 'Strength'], maxAffinity: 4, demand: 88, trend: '+18%' },
    { id: 'mat9', title: 'Welding Engineer', desc: 'Develop advanced welding and joining processes.', keywords: ['Weld', 'Join', 'Metal', 'Process'], maxAffinity: 4, demand: 70, trend: '+4%' },
    { id: 'mat10', title: 'QC Metallurgist', desc: 'Ensure metal products meet structural standards.', keywords: ['Quality', 'Control', 'Metal', 'Test'], maxAffinity: 4, demand: 74, trend: '+5%' },
    { id: 'mat11', title: 'Foundry Engineer', desc: 'Optimize metal casting and foundry operations.', keywords: ['Cast', 'Metal', 'Process', 'Manufacture'], maxAffinity: 4, demand: 65, trend: '+2%' },
    { id: 'mat12', title: 'Adhesives Chemist', desc: 'Formulate industrial glues and protective coatings.', keywords: ['Adhesive', 'Coat', 'Polymer', 'Chem'], maxAffinity: 4, demand: 81, trend: '+13%' },
    { id: 'mat13', title: 'Failure Analysis Eng', desc: 'Investigate why materials break or fail.', keywords: ['Fail', 'Analy', 'Fracture', 'Test'], maxAffinity: 4, demand: 86, trend: '+16%' },
    { id: 'mat14', title: 'Materials R&D Sci', desc: 'Discover completely new material compositions.', keywords: ['Research', 'Develop', 'Discover', 'Mater'], maxAffinity: 4, demand: 89, trend: '+20%' },
    { id: 'mat15', title: 'Textiles Technologist', desc: 'Develop advanced synthetic and natural fabrics.', keywords: ['Textile', 'Fabric', 'Polymer', 'Process'], maxAffinity: 4, demand: 72, trend: '+7%' },
    { id: 'mat16', title: 'Geotechnical Engineer', desc: 'Analyze earth materials for construction.', keywords: ['Earth', 'Soil', 'Rock', 'Civil'], maxAffinity: 4, demand: 84, trend: '+14%' },
    { id: 'mat17', title: 'Semiconductor Eng', desc: 'Process silicon and materials for microchips.', keywords: ['Semiconductor', 'Silicon', 'Process', 'Electronic'], maxAffinity: 4, demand: 98, trend: '+35%' },
    { id: 'mat18', title: 'Smart Materials Dev', desc: 'Create materials that respond to stimuli.', keywords: ['Smart', 'Shape', 'Memory', 'Mater'], maxAffinity: 4, demand: 94, trend: '+30%' },
    { id: 'mat19', title: 'Refractory Engineer', desc: 'Design materials for extreme heat environments.', keywords: ['Refractory', 'Heat', 'Thermal', 'Ceramic'], maxAffinity: 4, demand: 76, trend: '+8%' },
    { id: 'mat20', title: 'Extrusion Specialist', desc: 'Optimize the extrusion of plastics and metals.', keywords: ['Extrusion', 'Polymer', 'Metal', 'Process'], maxAffinity: 4, demand: 77, trend: '+9%' }
  ]
};

// Add demand to existing ones
CAREER_PATHS.ICT.forEach(p => { if(!p.demand) { p.demand = 85 + Math.random()*10; p.trend = '+'+Math.floor(Math.random()*20+5)+'%'; }});
CAREER_PATHS.BPT.forEach(p => { if(!p.demand) { p.demand = 75 + Math.random()*15; p.trend = '+'+Math.floor(Math.random()*15+5)+'%'; }});
CAREER_PATHS.FDT.forEach(p => { if(!p.demand) { p.demand = 70 + Math.random()*20; p.trend = '+'+Math.floor(Math.random()*15+3)+'%'; }});
CAREER_PATHS.EET.forEach(p => { if(!p.demand) { p.demand = 80 + Math.random()*15; p.trend = '+'+Math.floor(Math.random()*18+5)+'%'; }});
CAREER_PATHS.MAT.forEach(p => { if(!p.demand) { p.demand = 70 + Math.random()*20; p.trend = '+'+Math.floor(Math.random()*12+3)+'%'; }});

function renderAdvancedCareers() {
  const container = document.getElementById('careerGrid');
  const header = document.getElementById('careerHeader');
  
  let deptName = currentDept;
  if (DEPARTMENTS[currentDept]) {
    deptName = DEPARTMENTS[currentDept].fullName;
  }
  
  const paths = CAREER_PATHS[currentDept] || [];
  if (paths.length === 0) {
    header.innerHTML = `No career data found for ${deptName}.`;
    return;
  }
  
  header.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> Recommended Career Paths for ${deptName}`;
  
  const data = DEPARTMENTS[currentDept];
  const gradedCourseTitles = [];
  if (data) {
    for (const yr of data.years) {
      for (const sem of yr.sems) {
        for (const c of sem.courses) {
          const key = `${currentDept}_${c.code.replace(/\s/g, '_')}`;
          if (grades[key] && grades[key] !== '') {
            gradedCourseTitles.push(c.title.toLowerCase());
          }
        }
      }
    }
  }
  
  const scoredPaths = paths.map(p => {
    let matches = 0;
    for (const kw of p.keywords) {
      const lowerKw = kw.toLowerCase();
      if (gradedCourseTitles.some(title => title.includes(lowerKw))) {
        matches++;
      }
    }
    const affinity = Math.min((matches / p.maxAffinity) * 100, 100);
    return { ...p, affinity, matches };
  });
  
  // Sort by highest affinity first, then by demand
  scoredPaths.sort((a, b) => b.affinity !== a.affinity ? b.affinity - a.affinity : b.demand - a.demand);
  
  let html = '';
  scoredPaths.forEach((p, idx) => {
    // Stagger animation delay
    setTimeout(() => {
      const card = document.getElementById('card-'+p.id);
      if(card) {
        card.querySelector('.affinity-fill').style.width = p.affinity + '%';
        card.querySelector('.demand-fill').style.width = p.demand + '%';
      }
    }, 100 + (idx * 150));
    
    html += `
        <div class="career-card" id="card-${p.id}">
          <div class="career-head">
            <div class="career-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            </div>
            <div>
              <div class="career-title">${p.title}</div>
              <div class="career-subtitle">${idx === 0 && p.affinity > 0 ? '★ Top Match' : 'Career Option'}</div>
            </div>
          </div>
          <div class="career-desc">${p.desc}</div>
          
          <div>
            <div class="graph-label">Market Demand <span>${p.trend} growth</span></div>
            <div class="demand-graph">
              <div class="demand-fill" style="width: 0%"></div>
            </div>
            
            <div class="graph-label">Your Course Affinity <span>${Math.round(p.affinity)}% Match</span></div>
            <div class="affinity-graph">
              <div class="affinity-fill" style="width: 0%"></div>
            </div>
          </div>
          
          <a href="https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(p.title)}&location=Sri%20Lanka" target="_blank" class="live-job-btn">
            <div class="live-dot"></div>
            View Live Jobs
          </a>
        </div>
      `;
  });
  
  container.innerHTML = html;
}

renderAdvancedCareers();

// ─── THEME ───────────────────────────────────────────────────────────────────
let isDark = localStorage.getItem('fot_theme_v1') !== 'light';
if (isDark) {
  document.documentElement.setAttribute('data-theme', 'dark');
}

function toggleTheme() {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : '');
  localStorage.setItem('fot_theme_v1', isDark ? 'dark' : 'light');
  const label = document.getElementById('themeLabel');
  if (label) label.textContent = isDark ? 'Light Mode' : 'Dark Mode';
}

// Ensure label is correct on load
document.addEventListener('DOMContentLoaded', () => {
  renderDeptTabs();
  renderAdvancedCareers();
  
  const label = document.getElementById('themeLabel');
  if (label) label.textContent = isDark ? 'Light Mode' : 'Dark Mode';
});

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function gradeKey(dept, code) { return `${dept}_${code.replace(/\s/g, '_')}`; }

function calcCredits(dept) {
  const data = DEPARTMENTS[dept];
  let compulsory = 0, optional = 0, nonGpa = 0;
  for (const yr of data.years)
    for (const sem of yr.sems)
      for (const c of sem.courses) {
        if (c.flag === 'NONGPA') nonGpa += c.credits;
        else if (c.flag === 'OPT') optional += c.credits;
        else compulsory += c.credits;
      }
  return { compulsory, optional, nonGpa, total: compulsory + optional + nonGpa };
}

function calcGPA(dept) {
  const data = DEPARTMENTS[dept];
  let totalPoints = 0, totalCredits = 0, gradedCredits = 0;
  for (const yr of data.years)
    for (const sem of yr.sems)
      for (const c of sem.courses) {
        if (c.flag === 'NONGPA') continue;
        const key = gradeKey(dept, c.code);
        const g = grades[key];
        if (g && GRADE_MAP[g] !== undefined) {
          totalPoints += GRADE_MAP[g] * c.credits;
          totalCredits += c.credits;
          gradedCredits += c.credits;
        }
      }
  return { gpa: totalCredits > 0 ? totalPoints / totalCredits : null, gradedCredits };
}

function gpaClass(gpa) {
  if (gpa === null) return 'No grades entered';
  if (gpa >= 3.70) return 'First Class Honours';
  if (gpa >= 3.30) return 'Second Class (Upper)';
  if (gpa >= 3.00) return 'Second Class (Lower)';
  if (gpa >= 2.00) return 'Pass';
  return 'Below Pass';
}

// ─── RENDER ──────────────────────────────────────────────────────────────────
function renderDeptTabs() {
  const el = document.getElementById('deptTabs');
  if(!el) return;
  
  let optionsHtml = '';
  let selectedText = '';
  
  Object.values(DEPARTMENTS).forEach(d => {
    if (d.name === currentDept) selectedText = d.fullName;
    optionsHtml += `<div class="custom-option ${d.name === currentDept ? 'selected' : ''}" data-dept="${d.name}">${d.fullName}</div>`;
  });

  el.innerHTML = `
    <div class="custom-select" id="deptCustomSelect">
      <div class="select-selected" id="deptSelectTrigger">${selectedText}</div>
      <div class="select-items" id="deptSelectItems">
        ${optionsHtml}
      </div>
    </div>
  `;

  // Toggle dropdown on trigger click
  document.getElementById('deptSelectTrigger').addEventListener('click', function(e) {
    e.stopPropagation();
    document.getElementById('deptCustomSelect').classList.toggle('open');
  });

  // Handle option clicks
  document.querySelectorAll('#deptSelectItems .custom-option').forEach(function(opt) {
    opt.addEventListener('click', function(e) {
      e.stopPropagation();
      const dept = this.getAttribute('data-dept');
      switchDept(dept);
    });
  });
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
  const select = document.querySelector('.custom-select');
  if (select && !select.contains(e.target)) {
    select.classList.remove('open');
  }
});

function renderSummary() {
  const c = calcCredits(currentDept);
  const { gpa, gradedCredits } = calcGPA(currentDept);
  const gpaCreditsTotal = c.compulsory + c.optional;

  document.getElementById('totalCredits').textContent = c.total;
  document.getElementById('gpaCredits').textContent = c.compulsory + ' comp + ' + c.optional + ' opt';
  document.getElementById('nonGpaCredits').textContent = c.nonGpa;
  document.getElementById('optionalCredits').textContent = c.optional;
  document.getElementById('gradedCredits').textContent = gradedCredits;
  document.getElementById('remainCredits').textContent = `of ${gpaCreditsTotal} GPA credits`;

  const gpaVal = gpa !== null ? gpa.toFixed(2) : '—';
  document.getElementById('gpaVal').textContent = gpaVal;
  document.getElementById('gpaClass').textContent = gpaClass(gpa);
  document.getElementById('gpaBarFill').style.width = gpa !== null ? (gpa / 4.0 * 100) + '%' : '0%';

  // Progress
  const need = Math.max(0, 120 - c.total);
  document.getElementById('progressGrid').innerHTML = `
    <div class="progress-item">
      <div class="progress-item-label">Compulsory GPA credits — ${c.compulsory}</div>
      <div class="prog-bar-wrap"><div class="prog-bar-fill accent" style="width:${Math.min(100,c.compulsory/120*100)}%"></div></div>
      <div class="progress-nums"><span>0</span><span>120 target</span></div>
    </div>
    <div class="progress-item">
      <div class="progress-item-label">Non-GPA credits — ${c.nonGpa}</div>
      <div class="prog-bar-wrap"><div class="prog-bar-fill amber" style="width:${Math.min(100,c.nonGpa/30*100)}%"></div></div>
      <div class="progress-nums"><span>Non-GPA</span><span>excluded from GPA calc</span></div>
    </div>
    <div class="progress-item">
      <div class="progress-item-label">GPA progress — ${gradedCredits} graded</div>
      <div class="prog-bar-wrap"><div class="prog-bar-fill green" style="width:${gpaCreditsTotal>0?Math.min(100,gradedCredits/gpaCreditsTotal*100):0}%"></div></div>
      <div class="progress-nums"><span>Graded: ${gradedCredits}</span><span>Total GPA: ${gpaCreditsTotal}</span></div>
    </div>
    <div class="progress-item">
      <div class="progress-item-label">Total credits vs 120 requirement</div>
      <div class="prog-bar-wrap"><div class="prog-bar-fill accent" style="width:${Math.min(100,c.total/120*100)}%"></div></div>
      <div class="progress-nums"><span>Have: ${c.total}</span><span>${need > 0 ? 'Need ~'+need+' more' : 'Target reached'}</span></div>
    </div>
  `;
  
  renderAdvancedCareers();
}

function renderCourses() {
  const data = DEPARTMENTS[currentDept];
  let html = '';
  for (const yr of data.years) {
    const yKey = `${currentDept}_${yr.year}`;
    const collapsed = collapsedYears[yKey];
    let yComp = 0, yOpt = 0, yNon = 0;
    for (const sem of yr.sems)
      for (const c of sem.courses) {
        if (c.flag === 'NONGPA') yNon += c.credits;
        else if (c.flag === 'OPT') yOpt += c.credits;
        else yComp += c.credits;
      }
    html += `
    <div class="year-section">
      <div class="year-header" onclick="toggleYear('${yKey}')">
        <div class="year-badge">${yr.year}</div>
        <div class="year-line"></div>
        <div class="year-credits">${yComp}c comp &nbsp;|&nbsp; ${yOpt}c opt &nbsp;|&nbsp; ${yNon}c non-gpa</div>
        <div class="year-toggle">${collapsed ? '+' : '−'}</div>
      </div>
      <div class="year-body ${collapsed ? 'collapsed' : ''}">
        <div class="sem-grid">`;
    for (const sem of yr.sems) {
      let semComp = 0, semOpt = 0;
      for (const c of sem.courses) {
        if (c.flag === '') semComp += c.credits;
        else if (c.flag === 'OPT') semOpt += c.credits;
      }
      html += `
          <div class="sem-card">
            <div class="sem-head">
              <div class="sem-title">${sem.sem}</div>
              <div class="sem-meta">${semComp}c + ${semOpt}c opt</div>
            </div>
            <div class="course-list">`;
      for (const c of sem.courses) {
        const key = gradeKey(currentDept, c.code);
        const g = grades[key] || '';
        const isGraded = g !== '';
        let badges = '';
        if (c.flag === 'NONGPA') badges += `<span class="badge badge-nongpa">Non-GPA</span>`;
        else if (c.flag === 'OPT') badges += `<span class="badge badge-opt">OPT</span>`;
        else badges += `<span class="badge badge-comp">C</span>`;
        const opts = GRADE_OPTIONS.map(o => `<option value="${o}" ${o === g ? 'selected' : ''}>${o || '— Grade —'}</option>`).join('');
        const selectClass = isGraded ? 'grade-select graded' : 'grade-select';
        const disabledAttr = c.flag === 'NONGPA' ? 'disabled' : '';
        const disabledStyle = c.flag === 'NONGPA' ? 'style="opacity:0.4;pointer-events:none"' : '';
        html += `
              <div class="course-row">
                <div class="course-name">
                  <span class="course-code">${c.code}</span>
                  <span class="course-title-text">${c.title}</span>
                  <div class="course-badges">${badges}</div>
                </div>
                <div class="credit-chip">${c.credits}cr</div>
                <div ${disabledStyle}>
                  <select class="${selectClass}" ${disabledAttr}
                    onchange="setGrade('${key}', this.value, this)">
                    ${opts}
                  </select>
                </div>
              </div>`;
      }
      html += `</div></div>`;
    }
    html += `</div></div></div>`;
  }
  const courseContainer = document.getElementById('courseContainer');
  if (courseContainer) {
    courseContainer.innerHTML = html;
  }
}

function setGrade(key, val, el) {
  grades[key] = val;
  localStorage.setItem('fot_grades_v1', JSON.stringify(grades));
  if (val) el.classList.add('graded');
  else el.classList.remove('graded');
  renderSummary();
}

function toggleYear(yKey) {
  collapsedYears[yKey] = !collapsedYears[yKey];
  renderCourses();
}

function switchDept(d) {
  currentDept = d;
  localStorage.setItem('fot_dept_v1', d);
  renderDeptTabs();
  renderAdvancedCareers();
}

function downloadPDF() {
  const data = DEPARTMENTS[currentDept];
  const { gpa, gradedCredits } = calcGPA(currentDept);
  
  // Initialize jsPDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // 1. Accent Bar
  doc.setFillColor(234, 88, 12);
  doc.rect(0, 0, pageWidth, 6, 'F');
  
  // 2. Header
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 17, 35);
  doc.setFontSize(22);
  doc.text('Rajarata University of Sri Lanka', pageWidth / 2, 22, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setTextColor(234, 88, 12);
  doc.text('FACULTY OF TECHNOLOGY', pageWidth / 2, 30, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  doc.text(`Academic Transcript Preview — ${data.fullName}`, pageWidth / 2, 38, { align: 'center' });
  
  doc.setDrawColor(220, 225, 240);
  doc.line(14, 44, pageWidth - 14, 44);
  
  // 3. Summary Block
  let startY = 52;
  doc.setFillColor(247, 248, 252);
  doc.setDrawColor(221, 225, 240);
  doc.roundedRect(14, startY, pageWidth - 28, 22, 2, 2, 'FD');
  
  const gpaText = gpa !== null ? gpa.toFixed(2) : 'N/A';
  const classText = gpaClass(gpa) || 'No grades entered';
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(234, 88, 12);
  doc.text(gpaText, pageWidth * 0.25, startY + 10, { align: 'center' });
  doc.text(classText, pageWidth * 0.5, startY + 10, { align: 'center' });
  doc.text(gradedCredits.toString(), pageWidth * 0.75, startY + 10, { align: 'center' });
  
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('OVERALL GPA', pageWidth * 0.25, startY + 16, { align: 'center' });
  doc.text('CLASSIFICATION', pageWidth * 0.5, startY + 16, { align: 'center' });
  doc.text('GRADED CREDITS', pageWidth * 0.75, startY + 16, { align: 'center' });
  
  startY += 34;
  
  // 4. Semesters (AutoTable)
  let hasAnyGrades = false;
  
  for (const yr of data.years) {
    for (const sem of yr.sems) {
      let semRows = [];
      for (const c of sem.courses) {
        if (c.flag === 'NONGPA') continue;
        const key = gradeKey(currentDept, c.code);
        const g = grades[key];
        if (g && g !== '') {
          semRows.push([c.code, c.title, c.credits.toString(), g]);
          hasAnyGrades = true;
        }
      }
      
      if (semRows.length > 0) {
        doc.autoTable({
          startY: startY,
          head: [[`${yr.year} — ${sem.sem}`, 'Course Title', 'Credits', 'Grade']],
          body: semRows,
          theme: 'grid',
          headStyles: { fillColor: [234, 88, 12], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 10, halign: 'left' },
          styles: { fontSize: 10, cellPadding: 4, textColor: [40, 40, 40] },
          columnStyles: {
            0: { cellWidth: 35, fontStyle: 'bold', halign: 'left' },
            1: { cellWidth: 'auto', halign: 'left' },
            2: { cellWidth: 20, halign: 'center' },
            3: { cellWidth: 20, halign: 'center', fontStyle: 'bold', textColor: [234, 88, 12] }
          },
          alternateRowStyles: { fillColor: [250, 250, 250] },
          margin: { left: 14, right: 14 }
        });
        startY = doc.lastAutoTable.finalY + 12;
      }
    }
  }
  
  if (!hasAnyGrades) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(12);
    doc.setTextColor(150, 150, 150);
    doc.text('No graded courses yet.', pageWidth / 2, startY + 10, { align: 'center' });
  }
  
  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Generated by FOT Credit Tracker • Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
  }
  
  // Preview
  const pdfOutput = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfOutput);
  const pdfWindow = window.open('', '_blank');
  if (pdfWindow) {
    pdfWindow.document.write('<div style="font-family:sans-serif; text-align:center; margin-top:50px;">Generating your Academic Transcript preview...</div>');
    pdfWindow.location.href = pdfUrl;
  } else {
    alert('Please allow pop-ups to preview the PDF.');
  }
}

// ─── INIT ────────────────────────────────────────────────────────────────────
// (Page initialization is handled in DOMContentLoaded)
