/* ==========================================================================
   CAPA Professional Dashboard - Main Application Logic
   ========================================================================== */

(function(){
"use strict";

const seedData = [
  {
    "projectName": "Dizon Project",
    "client": "Dizon Estate",
    "projectLocation": "Baguio City",
    "image": "assets/image_bf4d08472ed140f2a5992bd50b0346d7.jpg",
    "nonConformance": "Inspection record requires CAPA tracking from weekly site observations.",
    "correctiveAction": "Assign responsible party and record correction evidence.",
    "preventiveAction": "Review weekly inspection findings in coordination meeting.",
    "rootCause": "Documentation and ownership gaps during site inspection closeout.",
    "owner": "QAQC",
    "dueDate": "2026-05-24",
    "coverage": "2026-05-13|2026-05-20",
    "remarks": "Site observation documented with photographic evidence.",
    "status": "In Progress",
    "id": "CAPA-1780651017261-0"
  },
  {
    "projectName": "Dizon Project",
    "client": "Dizon Estate",
    "projectLocation": "Baguio City",
    "image": "assets/image_c2c53c22ae4b4a4ba9ef5eb2cf8d1b40.jpg",
    "nonConformance": "Corrective action evidence pending for site observation.",
    "correctiveAction": "Collect photo evidence and validate closure.",
    "preventiveAction": "Add CAPA review checkpoint before report distribution.",
    "rootCause": "Verification schedule not aligned with action owner.",
    "owner": "Project Engineer",
    "dueDate": "2026-05-18",
    "coverage": "2026-05-13|2026-05-20",
    "remarks": "Pending verification by Project Engineer.",
    "status": "Overdue",
    "id": "CAPA-1780651017261-1"
  },
  {
    "projectName": "Dizon Project",
    "client": "Dizon Estate",
    "projectLocation": "Baguio City",
    "image": "",
    "nonConformance": "Preventive action needs confirmation from site team.",
    "correctiveAction": "Close immediate item after site confirmation.",
    "preventiveAction": "Issue reminder and update inspection checklist.",
    "rootCause": "Lessons learned not yet communicated to all sites.",
    "owner": "Project Manager",
    "dueDate": "2026-05-27",
    "coverage": "2026-05-20|2026-05-27",
    "remarks": "Awaiting confirmation from PM.",
    "status": "Open",
    "id": "CAPA-1780651017261-2"
  },
  {
    "projectName": "Dizon Project",
    "client": "Dizon Estate",
    "projectLocation": "Baguio City",
    "image": "",
    "nonConformance": "Completed weekly inspection item archived.",
    "correctiveAction": "Action verified by QAQC.",
    "preventiveAction": "Standard process retained.",
    "rootCause": "N/A - resolved.",
    "owner": "QAQC",
    "dueDate": "2026-05-15",
    "coverage": "2026-05-06|2026-05-13",
    "remarks": "Closed and verified.",
    "status": "Closed",
    "id": "CAPA-1780651017261-3"
  }
];

let capaData;
try {
  const raw = localStorage.getItem("capaDataWorking");
  const stored = raw ? JSON.parse(raw) : null;
  if(Array.isArray(stored) && stored.length > 0){
    capaData = stored.map((item, idx) => {
      const match = seedData.find(s => s.projectName === item.projectName && (s.nonConformance === item.nonConformance || s.owner === item.owner)) || seedData[idx];
      return {
        ...item,
        id: item.id || ("CAPA-" + Date.now() + "-" + idx),
        client: item.client || (match ? match.client : "") || "",
        projectLocation: item.projectLocation || (match ? match.projectLocation : "") || "",
        image: item.image || (match ? match.image : "") || ""
      };
    });
  } else {
    capaData = JSON.parse(JSON.stringify(seedData));
  }
} catch(e) {
  capaData = JSON.parse(JSON.stringify(seedData));
}

try {
  localStorage.setItem("capaDataWorking", JSON.stringify(capaData));
} catch(e) {}

const $ = id => document.getElementById(id);
const rowsEl = $("capaRows"), emptyEl = $("emptyState"), searchEl = $("search"), statusFilterEl = $("statusFilter");
const projectFilterEl = $("projectFilter"), coverageFilterEl = $("coverageFilter"), modal = $("modal"), form = $("projectForm");
const clientDisplay = $("clientDisplay"), projectLocationDisplay = $("projectLocationDisplay");
const clientInput = $("clientInput"), projectLocationInput = $("projectLocationInput");
const imagePreview = $("imagePreview"), previewImage = $("previewImage");
const racimModal = $("racimModal");
const aiPromptModal = $("aiPromptModal"), aiPromptText = $("aiPromptText");
const actionLetterModal = $("actionLetterModal"), actionLetterContent = $("actionLetterContent");
const subcontractorToggle = $("subcontractorToggle");
const noSuperintendentToggle = $("noSuperintendentToggle");
const columnMenu = $("columnMenu"), columnMenuList = $("columnMenuList");
const table = document.querySelector(".table-wrap table");
const editProjectModal = $("editProjectModal"), editProjectForm = $("editProjectForm");
const actionLettersBtn = $("actionLettersBtn"), actionLettersSheet = $("actionLettersSheet"), backToRegistry = $("backToRegistry");
const actionLetterRows = $("actionLetterRows"), actionLetterEmpty = $("actionLetterEmpty");
const actionLetterSearch = $("actionLetterSearch"), actionLetterStatusFilter = $("actionLetterStatusFilter");
const columnHeaders = ["Select","No.","Project Name","Client","Location of Project","Image","Non-Conformance","Corrective Action","Preventive Action","Root Cause","Responsible Party","Due Date","Coverage","Remarks","Status","Action Letter"];
let selectedCapaIds = new Set();
function upgradeActionLetterHtmlHeader(html){
  if(!html) return "";
  let updated = String(html);
  updated = updated.replace(/181\s*SPRINGWATER\s*ST,\s*CRYSTAL\s*CAVE,\s*BAGUIO\s*CITY/gi, "QAQC- AL - 01");
  updated = updated.replace(/TEL\.\s*NO\.\s*074\s*442\s*4571,\s*074\s*442\s*3807/gi, "Rev. No. : 0");
  updated = updated.replace(/WEBSITE:\s*https:\/\/fclgc\.com\/?/gi, "Eff. Date: 08/10/2026");
  return updated;
}

let actionLetters;
try {
  actionLetters = JSON.parse(localStorage.getItem("capaActionLetters") || "[]");
  if(Array.isArray(actionLetters)){
    actionLetters.forEach(al => {
      if(al.html) al.html = upgradeActionLetterHtmlHeader(al.html);
    });
  }
} catch(e) { actionLetters = []; }

let hiddenColumns;
try { hiddenColumns = JSON.parse(localStorage.getItem("capaHiddenColumns") || "[]"); }
catch(e) { hiddenColumns = []; }

function saveData(){
  try {
    localStorage.setItem("capaDataWorking", JSON.stringify(capaData));
  } catch(err) {
    console.warn("localStorage quota warning on capaDataWorking:", err);
    try {
      localStorage.removeItem("capaActionLetters");
      localStorage.setItem("capaDataWorking", JSON.stringify(capaData));
    } catch(e2) {
      console.warn("Storage full, saving lean records:", e2);
      try {
        const leanData = capaData.map(item => ({
          ...item,
          image: item.image && item.image.length > 60000 ? item.image.slice(0, 50000) : item.image
        }));
        localStorage.setItem("capaDataWorking", JSON.stringify(leanData));
      } catch(e3) {
        console.error("Critical storage error:", e3);
      }
    }
  }
}
function escapeHtml(text){ return String(text ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c])); }
function statusClass(status){ return status === "Closed" ? "closed" : status === "Overdue" ? "overdue" : status === "In Progress" ? "progress" : "open"; }
function ordinalWeek(n){ const s=(n%10===1&&n%100!==11)?"st":(n%10===2&&n%100!==12)?"nd":(n%10===3&&n%100!==13)?"rd":"th"; return n+s+" Week"; }
function formatDateNice(v){ if(!v) return ""; const d=new Date(v+"T00:00:00"); return isNaN(d) ? v : d.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}); }
function coverageLabel(v){ if(!v) return ""; const p=String(v).split("|"); return formatDateNice(p[0])+" - "+formatDateNice(p[1]||p[0]); }
function coverageOptionLabel(v,i){ return ordinalWeek(i+1)+" - "+coverageLabel(v); }
function readImageAsDataUrl(file, maxWidth = 1000, maxHeight = 1000, quality = 0.8){
  return new Promise(resolve => {
    if(!file) return resolve("");
    let resolved = false;
    const safeResolve = val => {
      if(!resolved){
        resolved = true;
        resolve(val || "");
      }
    };
    // Safe timeout fallback so form submit never hangs
    setTimeout(() => safeResolve(""), 4000);

    const r = new FileReader();
    r.onerror = () => safeResolve("");
    r.onload = (e) => {
      const rawUrl = e.target.result || "";
      if(!rawUrl || !rawUrl.startsWith("data:image/")) return safeResolve(rawUrl);
      try {
        const img = new Image();
        img.onerror = () => safeResolve(rawUrl);
        img.onload = () => {
          try {
            let width = img.width;
            let height = img.height;
            if(width > maxWidth || height > maxHeight){
              if(width > height){
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
              } else {
                width = Math.round((width * maxHeight) / height);
                height = maxHeight;
              }
            }
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            const mimeType = (file.type === "image/png" || file.type === "image/webp") ? "image/png" : "image/jpeg";
            const compressed = canvas.toDataURL(mimeType, quality);
            safeResolve(compressed);
          } catch(err){
            safeResolve(rawUrl);
          }
        };
        img.src = rawUrl;
      } catch(err){
        safeResolve(rawUrl);
      }
    };
    r.readAsDataURL(file);
  });
}
function makeCoverageValue(){ const s=$("coverageStart").value; const e=$("coverageEnd").value; if(!s && !e) return ""; return (s||e)+"|"+(e||s); }
function showToast(text){ const t=$("toast"); t.textContent=text; t.style.display="block"; setTimeout(()=>{t.style.display="none";},1800); }

function saveHiddenColumns(){
  localStorage.setItem("capaHiddenColumns", JSON.stringify(hiddenColumns));
}

function applyColumnVisibility(){
  if(!table) return;
  columnHeaders.forEach((name, index) => {
    const hide = hiddenColumns.includes(index);
    table.querySelectorAll("tr").forEach(row => {
      const cell = row.children[index];
      if(cell) cell.style.display = hide ? "none" : "";
    });
  });
}

function buildColumnMenu(){
  columnMenuList.innerHTML = columnHeaders.map((name, index) => `
    <label>
      <input type="checkbox" data-col="${index}" ${hiddenColumns.includes(index) ? "" : "checked"}>
      <span>${escapeHtml(name)}</span>
    </label>
  `).join("");
}

function openColumnMenu(x, y){
  buildColumnMenu();
  columnMenu.classList.add("active");
  const rect = columnMenu.getBoundingClientRect();
  const left = Math.min(x, window.innerWidth - rect.width - 12);
  const top = Math.min(y, window.innerHeight - rect.height - 12);
  columnMenu.style.left = Math.max(8, left) + "px";
  columnMenu.style.top = Math.max(8, top) + "px";
}

function closeColumnMenu(){
  columnMenu.classList.remove("active");
}

function updateClientLocationDisplay(){
  const project = projectFilterEl.value;
  const records = capaData.filter(item => !project || item.projectName === project);
  const clients = [...new Set(records.map(item => item.client).filter(Boolean))];
  const locations = [...new Set(records.map(item => item.projectLocation).filter(Boolean))];

  if(clientInput && projectLocationInput){
    if(document.activeElement !== clientInput){
      if(project){
        clientInput.disabled = false;
        clientInput.value = clients.length ? clients[0] : "";
        clientInput.placeholder = `Client for ${project}...`;
        clientInput.title = `Client name for ${project}`;
      } else {
        clientInput.disabled = true;
        clientInput.value = clients.length ? (clients.length === 1 ? clients[0] : `Multiple Clients (${clients.length})`) : "";
        clientInput.placeholder = "Select a project to edit client";
        clientInput.title = "Select a specific project from the dropdown to edit client";
      }
    }
    if(document.activeElement !== projectLocationInput){
      if(project){
        projectLocationInput.disabled = false;
        projectLocationInput.value = locations.length ? locations[0] : "";
        projectLocationInput.placeholder = `Location for ${project}...`;
        projectLocationInput.title = `Project location for ${project}`;
      } else {
        projectLocationInput.disabled = true;
        projectLocationInput.value = locations.length ? (locations.length === 1 ? locations[0] : `Multiple Locations (${locations.length})`) : "";
        projectLocationInput.placeholder = "Select a project to edit location";
        projectLocationInput.title = "Select a specific project from the dropdown to edit location";
      }
    }
  }

  if(clientDisplay){
    clientDisplay.textContent = project
      ? (clients.length ? clients.join(", ") : "Not set")
      : (clients.length ? "Multiple / All Clients" : "All Clients");
  }
  if(projectLocationDisplay){
    projectLocationDisplay.textContent = project
      ? (locations.length ? locations.join(", ") : "Not set")
      : (locations.length ? "Multiple / All Locations" : "All Locations");
  }
}

function saveProjectClientLocation(field, value){
  const project = projectFilterEl.value;
  if(!project) return;
  const cleanVal = String(value ?? "").trim();
  let updated = false;
  capaData.forEach(item => {
    if(item.projectName === project){
      if(field === "client" && item.client !== cleanVal){ item.client = cleanVal; updated = true; }
      if(field === "projectLocation" && item.projectLocation !== cleanVal){ item.projectLocation = cleanVal; updated = true; }
    }
  });
  if(updated){
    saveData();
    const rows = filteredData();
    rowsEl.querySelectorAll("tr").forEach((tr, i) => {
      const item = rows[i];
      if(item && item.projectName === project){
        if(field === "client" && tr.children[1]) tr.children[1].textContent = cleanVal;
        if(field === "projectLocation" && tr.children[2]) tr.children[2].textContent = cleanVal;
      }
    });
    renderActionLetters();
  }
}

function scopedData(){
  const project = projectFilterEl.value;
  const coverage = coverageFilterEl.value;
  return capaData.filter(item => (!project || item.projectName === project) && coverageMatchesFilter(item.coverage, coverage));
}
function filteredData(){
  const q = searchEl.value.toLowerCase().trim();
  const status = statusFilterEl.value;
  return scopedData().filter(item => {
    const text = Object.values(item).join(" ").toLowerCase();
    return (!q || text.includes(q)) && (!status || item.status === status);
  });
}
function updateProjectFilter(){
  const current = projectFilterEl.value;
  const projects = [...new Set(capaData.map(x => x.projectName).filter(Boolean))].sort();
  projectFilterEl.innerHTML = '<option value="">All Projects</option>' + projects.map(p => `<option value="${escapeHtml(p)}">${escapeHtml(p)}</option>`).join("");
  if(projects.includes(current)) projectFilterEl.value = current;

  const datalist = $("existingProjectsList");
  if(datalist){
    datalist.innerHTML = projects.map(p => `<option value="${escapeHtml(p)}"></option>`).join("");
  }
}
const monthCoverageFilters = [
  ["month-01", "January"],
  ["month-02", "February"],
  ["month-03", "March"],
  ["month-04", "April"],
  ["month-05", "May"],
  ["month-06", "June"],
  ["month-07", "July"],
  ["month-08", "August"],
  ["month-09", "September"],
  ["month-10", "October"],
  ["month-11", "November"],
  ["month-12", "December"]
];
function isMonthCoverageFilter(value){
  return /^month-(0[1-9]|1[0-2])$/.test(String(value || ""));
}
function coverageMatchesFilter(itemCoverage, filterValue){
  if(!filterValue) return true;
  if(isMonthCoverageFilter(filterValue)){
    const targetMonth = filterValue.slice(6);
    const parts = String(itemCoverage || "").split("|").filter(Boolean);
    return parts.some(dateValue => String(dateValue).slice(5,7) === targetMonth);
  }
  return itemCoverage === filterValue;
}
function updateCoverageFilter(){
  const current = coverageFilterEl.value;
  const project = projectFilterEl.value;
  const values = capaData.filter(x => !project || x.projectName === project).map(x => x.coverage).filter(Boolean);
  const weeks = [...new Set(values)].sort();
  const monthOptions = monthCoverageFilters.map(([value,label]) => `<option value="${value}">${label}</option>`).join("");
  const weekOptions = weeks.map((w,i) => `<option value="${escapeHtml(w)}">${escapeHtml(coverageOptionLabel(w,i))}</option>`).join("");
  coverageFilterEl.innerHTML = '<option value="">All Coverage</option><optgroup label="Monthly">' + monthOptions + '</optgroup><optgroup label="Weekly">' + weekOptions + '</optgroup>';
  if(weeks.includes(current) || isMonthCoverageFilter(current)) coverageFilterEl.value = current;
}

function updateStatusMix(){
  const data = scopedData();
  const total = data.length || 0;
  const closed = data.filter(x => x.status === "Closed").length;
  const progress = data.filter(x => x.status === "In Progress").length;
  const openOverdue = data.filter(x => x.status === "Open" || x.status === "Overdue").length;

  const pct = count => total ? Math.round((count / total) * 100) : 0;
  const closedP = pct(closed);
  const progressP = pct(progress);
  const openOverdueP = pct(openOverdue);

  const closedEnd = closedP;
  const progressEnd = closedP + progressP;

  const donut = document.getElementById("statusDonut");
  if(donut){
    donut.style.background = `conic-gradient(var(--green) 0 ${closedEnd}%, var(--blue) ${closedEnd}% ${progressEnd}%, var(--red) ${progressEnd}% 100%)`;
  }

  const center = document.getElementById("statusDonutCenter");
  if(center){
    center.innerHTML = `${total}<br>Total`;
  }

  const closedEl = document.getElementById("closedPct");
  const progressEl = document.getElementById("progressPct");
  const openOverdueEl = document.getElementById("openOverduePct");

  if(closedEl) closedEl.textContent = `${closedP}%`;
  if(progressEl) progressEl.textContent = `${progressP}%`;
  if(openOverdueEl) openOverdueEl.textContent = `${openOverdueP}%`;
}

function updateKpis(){
  const data = scopedData();
  const count = s => data.filter(x => x.status === s).length;
  $("kpiTotal").textContent = data.length;
  $("kpiOpen").textContent = count("Open");
  $("kpiProgress").textContent = count("In Progress");
  $("kpiOverdue").textContent = count("Overdue");
  $("kpiClosed").textContent = count("Closed");
}
function updateOwnerBars(){
  const wrap = $("ownerBars");
  const counts = scopedData().reduce((a,x) => { a[x.owner||"Unassigned"]=(a[x.owner||"Unassigned"]||0)+1; return a; }, {});
  const max = Math.max(1, ...Object.values(counts));
  wrap.innerHTML = Object.entries(counts).sort((a,b)=>b[1]-a[1]).map(([owner,count]) => `
    <div class="bar-row"><strong>${escapeHtml(owner)}</strong><div class="bar"><span style="width:${(count/max)*100}%"></span></div><strong>${count}</strong></div>
  `).join("") || '<div class="empty" style="display:block;padding:10px;">No records.</div>';
}
function updateSelectionState(){
  const rows = filteredData();
  const visibleIds = rows.map(r => r.id);
  const visibleSelectedCount = visibleIds.filter(id => selectedCapaIds.has(id)).length;
  const totalSelectedCount = selectedCapaIds.size;

  const selectAll = $("selectAllCapa");
  if(selectAll){
    if(visibleIds.length === 0){
      selectAll.checked = false;
      selectAll.indeterminate = false;
    } else if(visibleSelectedCount === visibleIds.length){
      selectAll.checked = true;
      selectAll.indeterminate = false;
    } else if(visibleSelectedCount > 0){
      selectAll.checked = false;
      selectAll.indeterminate = true;
    } else {
      selectAll.checked = false;
      selectAll.indeterminate = false;
    }
  }

  const bulkBar = $("selectedBulkBar");
  const countEl = $("selectedCount");
  if(bulkBar){
    if(totalSelectedCount > 0){
      bulkBar.style.display = "inline-flex";
      if(countEl) countEl.textContent = totalSelectedCount;
    } else {
      bulkBar.style.display = "none";
    }
  }
}

function formatCellContent(text){
  if(text === undefined || text === null) return "";
  const str = String(text).trim();
  if(!str) return "";
  const safe = escapeHtml(str);
  return safe.replace(/\r?\n/g, "<br>");
}

function renderRows(){
  updateProjectFilter();
  updateCoverageFilter();
  const rows = filteredData();
  rowsEl.innerHTML = rows.map((item, index) => {
    const isSelected = selectedCapaIds.has(item.id);
    return `
    <tr class="${isSelected ? 'row-selected' : ''}" data-id="${escapeHtml(item.id)}">
      <td class="select-col" style="text-align:center;">
        <input type="checkbox" class="capa-row-select" data-id="${escapeHtml(item.id)}" ${isSelected ? 'checked' : ''} aria-label="Select row ${index + 1}">
      </td>
      <td class="num-col" style="text-align:center;">${index + 1}</td>
      <td><button type="button" class="project-link" data-edit-id="${escapeHtml(item.id)}">${escapeHtml(item.projectName)}</button></td>
      <td>${escapeHtml(item.client)}</td>
      <td>${escapeHtml(item.projectLocation)}</td>
      <td class="capa-img-cell" style="text-align:center; vertical-align:middle;">
        <div class="table-img-container" data-id="${escapeHtml(item.id)}" title="Click to upload / change photo (Double-click to expand)">
          <input type="file" accept="image/*" class="table-inline-img-input" style="display:none;" data-id="${escapeHtml(item.id)}">
          ${item.image ? `
            <div class="table-img-wrapper">
              <img class="thumb" src="${item.image}" alt="CAPA image" data-preview="1">
              <div class="table-img-hover-overlay">
                <i class="fas fa-camera"></i>
                <span>Change Photo</span>
              </div>
            </div>
          ` : `
            <div class="table-no-img-btn">
              <i class="fas fa-camera"></i>
              <span>Upload Photo</span>
            </div>
          `}
        </div>
      </td>
      <td class="cell-formatted-text">${formatCellContent(item.nonConformance)}</td>
      <td class="cell-formatted-text">${formatCellContent(item.correctiveAction)}</td>
      <td class="cell-formatted-text">${formatCellContent(item.preventiveAction)}</td>
      <td class="cell-formatted-text">${formatCellContent(item.rootCause)}</td>
      <td>${escapeHtml(item.owner)}</td>
      <td>${escapeHtml(item.dueDate)}</td>
      <td>${escapeHtml(coverageLabel(item.coverage))}</td>
      <td class="cell-formatted-text">${formatCellContent(item.remarks || "")}</td>
      <td><span class="pill ${statusClass(item.status)}">${escapeHtml(item.status)}</span></td>
      <td class="action-letter-col" style="text-align:center; white-space:nowrap;">
        <button type="button" class="print-capa-letter-btn" data-id="${escapeHtml(item.id)}" title="Print selected CAPA action letter">Print selected CAPA action letter</button>
      </td>
    </tr>
  `;
  }).join("");
  emptyEl.style.display = rows.length ? "none" : "block";
  updateKpis();
  updateStatusMix();
  updateOwnerBars();
  updateClientLocationDisplay();
  updateSelectionState();
  applyColumnVisibility();
  enforceGraphVisuals();
}


function autoGrowTextarea(textarea){
  if(!textarea) return;
  textarea.style.height = "auto";
  textarea.style.height = Math.max(textarea.scrollHeight + 2, 44) + "px";
}

function autoGrowSheetTextareas(scope){
  const root = scope || document;
  root.querySelectorAll("textarea.field").forEach(textarea => {
    autoGrowTextarea(textarea);
    if(!textarea.dataset.autogrowBound){
      textarea.addEventListener("input", () => autoGrowTextarea(textarea));
      textarea.dataset.autogrowBound = "1";
    }
  });
}

function openModal(){
  modal.classList.add("active");
  autoGrowSheetTextareas(modal);
  if($("clientName")) delete $("clientName").dataset.userEdited;
  if($("projectLocation")) delete $("projectLocation").dataset.userEdited;
  if(projectFilterEl.value && $("projectName") && !$("projectName").value.trim()){
    $("projectName").value = projectFilterEl.value;
    const match = capaData.find(x => x.projectName === projectFilterEl.value);
    if(match){
      if($("clientName") && match.client) $("clientName").value = match.client;
      if($("projectLocation") && match.projectLocation) $("projectLocation").value = match.projectLocation;
      if($("owner") && match.owner) $("owner").value = match.owner;
    }
  }
  $("projectName").focus();
}
function closeModal(){ modal.classList.remove("active"); }
function openImagePreview(src){ previewImage.src = src; imagePreview.classList.add("active"); }
function closeImagePreview(){ imagePreview.classList.remove("active"); previewImage.src = ""; }

function openRacim(){ racimModal.classList.add("active"); }
function closeRacim(){ racimModal.classList.remove("active"); }

function buildActionLetter(recordOrList, options = {}){
  const today = new Date().toLocaleDateString("en-US", {year:"numeric", month:"long", day:"numeric"});
  let items = [];
  if(Array.isArray(recordOrList)){
    items = recordOrList;
  } else if(recordOrList && typeof recordOrList === "object"){
    items = [recordOrList];
  }

  const isCompiler = Boolean(options && options.isCompiler);
  const breakBeforeSignatures = Boolean(options && options.breakBeforeSignatures);
  const alOrientation = (options && options.orientation) || "portrait";
  const alColPercentages = typeof getActionLetterColumnPercentages === "function" ? getActionLetterColumnPercentages(alOrientation) : {
    no: 6, finding: 34, rootCause: 15, correctiveAction: 18, preventiveAction: 18, dueDate: 9
  };

  const alColgroupHtml = "<colgroup>" + ACTION_LETTER_COLUMNS.map(col => {
    const pct = alColPercentages[col.key] || (100 / ACTION_LETTER_COLUMNS.length);
    return `<col data-al-col-key="${col.key}" style="width:${pct.toFixed(3)}%;">`;
  }).join("") + "</colgroup>";

  const alThs = ACTION_LETTER_COLUMNS.map((col, idx) => {
    const isLast = idx === ACTION_LETTER_COLUMNS.length - 1;
    const resizerIdx = isLast ? Math.max(0, ACTION_LETTER_COLUMNS.length - 2) : idx;
    const resizerHtml = isCompiler ? `<div class="al-col-resizer" data-al-col-index="${resizerIdx}" data-al-col-key="${col.key}" title="Drag left/right to adjust column widths"></div>` : '';
    const thClass = col.thClass || "";
    return `<th class="${thClass}" data-al-col-key="${col.key}"><div class="th-content">${escapeHtml(col.name)}</div>${resizerHtml}</th>`;
  }).join("");

  const useEditFields = !items.length && editProjectModal && editProjectModal.classList.contains("active");
  const fieldValue = (addId, editId) => {
    const el = $(useEditFields ? editId : addId);
    return el ? el.value.trim() : "";
  };

  const distinctProjects = [...new Set(items.map(x => x.projectName).filter(Boolean))];
  const distinctClients = [...new Set(items.map(x => x.client).filter(Boolean))];
  const distinctLocations = [...new Set(items.map(x => x.projectLocation).filter(Boolean))];
  const distinctOwners = [...new Set(items.map(x => x.owner).filter(Boolean))];
  const distinctStatuses = [...new Set(items.map(x => x.status).filter(Boolean))];
  const distinctDueDates = [...new Set(items.map(x => x.dueDate).filter(Boolean))];

  const projectName = distinctProjects.length ? distinctProjects.join(", ") : (fieldValue("projectName", "editProjectName") || "[PROJECT NAME]");
  const clientName = distinctClients.length ? distinctClients.join(", ") : fieldValue("clientName", "editClientName");
  const projectLocation = distinctLocations.length ? distinctLocations.join(", ") : fieldValue("projectLocation", "editProjectLocation");
  const owner = distinctOwners.length ? distinctOwners.join(", ") : (fieldValue("owner", "editOwner") || "[RESPONSIBLE PARTY]");
  const status = distinctStatuses.length ? distinctStatuses.join(", ") : (fieldValue("status", "editStatus") || "Open");
  const dueDate = distinctDueDates.length ? distinctDueDates.join(", ") : (fieldValue("dueDate", "editDueDate") || "[DUE DATE]");

  let coverageText = "";
  if(items.length > 0 && items[0].coverage){
    const cov = splitCoverage(items[0].coverage);
    coverageText = (cov.start || "[START]") + " to " + (cov.end || "[END]");
  } else {
    const start = fieldValue("coverageStart", "editCoverageStart");
    const end = fieldValue("coverageEnd", "editCoverageEnd");
    coverageText = (start || end) ? ((start || "[START]") + " to " + (end || "[END]")) : "[COVERAGE PERIOD]";
  }

  const letterNo = "AL-CAPA-" + new Date().toISOString().slice(0,10).replaceAll("-","") + "-001";

  let ncRowsHtml = "";
  if(items.length > 0){
    ncRowsHtml = items.map((item, idx) => {
      const num = item._regNo !== undefined ? item._regNo : (idx + 1);
      const imgHtml = item.image ? `<div class="nc-cell-img-wrap" contenteditable="false"><img src="${escapeHtml(item.image)}" alt="NC Evidence" class="nc-cell-image"></div>` : '';
      return `
        <tr>
          <td class="nc-no">${num}</td>
          <td class="nc-finding-cell">
            <div class="nc-finding-text"><strong>${formatCellContent(item.nonConformance || "[NON-CONFORMANCE FINDING]")}</strong></div>
            ${imgHtml}
            <div class="nc-cell-img-placeholder no-print" contenteditable="false" style="${item.image ? 'display:none;' : ''}">
              <label class="nc-upload-label"><i class="fas fa-camera"></i> Attach Photo (1.25" × 1.25")<input type="file" class="nc-cell-img-input" accept="image/*" style="display:none;"></label>
            </div>
          </td>
          <td>${formatCellContent(item.rootCause || "[ROOT CAUSE]")}</td>
          <td>${formatCellContent(item.correctiveAction || "[CORRECTIVE ACTION]")}</td>
          <td>${formatCellContent(item.preventiveAction || "[PREVENTIVE ACTION]")}</td>
          <td>${escapeHtml(item.dueDate || dueDate || "[DUE DATE]")}</td>
        </tr>
      `;
    }).join("");
  } else {
    const nonConformance = fieldValue("nonConformance", "editNonConformance") || "[INSERT DESCRIPTION OF THE NON-CONFORMANCE HERE]";
    const currentImg = (currentProject && currentProject.image) || "";
    const imgHtml = currentImg ? `<div class="nc-cell-img-wrap" contenteditable="false"><img src="${escapeHtml(currentImg)}" alt="NC Evidence" class="nc-cell-image"></div>` : '';
    ncRowsHtml = `
      <tr>
        <td class="nc-no">1</td>
        <td class="nc-finding-cell">
          <div class="nc-finding-text"><strong>${escapeHtml(nonConformance)}</strong></div>
          ${imgHtml}
          <div class="nc-cell-img-placeholder no-print" contenteditable="false" style="${currentImg ? 'display:none;' : ''}">
            <label class="nc-upload-label"><i class="fas fa-camera"></i> Attach Photo (1.25" × 1.25")<input type="file" class="nc-cell-img-input" accept="image/*" style="display:none;"></label>
          </div>
        </td>
        <td>[Paste root cause]</td>
        <td>[Paste corrective action]</td>
        <td>[Paste preventive action]</td>
        <td>${escapeHtml(dueDate || "[DUE DATE]")}</td>
      </tr>
    `;
  }

  return `
  <div class="letter-page">
    <table class="letter-header-table">
      <tr>
        <td class="letter-header-logo-cell">
          <img class="letter-logo" src="assets/action_letter_logo.jpg" alt="FCL Aranangg Development Corporation Logo">
        </td>
        <td class="letter-header-title-cell">
          <h1>ACTION LETTER</h1>
          <h2>CORRECTIVE AND PREVENTIVE ACTION (CAPA)</h2>
        </td>
        <td class="letter-header-contact-cell">
          <div class="letter-contact">
            <div><strong>QAQC- AL - 01</strong></div>
            <div><strong>Rev. No. : 0</strong></div>
            <div><strong>Eff. Date: 08/10/2026</strong></div>
          </div>
        </td>
      </tr>
    </table>
    <div class="letter-stripe"></div>
    <div class="letter-body">
      <table class="letter-info">
        <tr><th>DATE:</th><td>${today}</td></tr>
        <tr><th>ACTION LETTER NO.:</th><td>${letterNo}</td></tr>
        <tr><th>PROJECT:</th><td>${escapeHtml(projectName)}</td></tr>
        <tr><th>CLIENT:</th><td>${escapeHtml(clientName || "[CLIENT NAME]")}</td></tr>
        <tr><th>LOCATION / AREA:</th><td>${escapeHtml(projectLocation || "[PROJECT LOCATION]")}</td></tr>
        <tr><th>COVERAGE:</th><td>${escapeHtml(coverageText)}</td></tr>
        <tr><th>RESPONSIBLE PARTY:</th><td>${escapeHtml(owner)}</td></tr>
        <tr><th>STATUS:</th><td>${escapeHtml(status)}</td></tr>
        <tr><th>TARGET DUE DATE:</th><td><strong>${escapeHtml(dueDate)}</strong></td></tr>
      </table>

      <div class="letter-section">
        <div class="letter-section-title">Non-Conformance and CAPA Summary</div>
      </div>

      <table class="nc-summary-table">
        ${alColgroupHtml}
        <thead>
          <tr>
            ${alThs}
          </tr>
        </thead>
        <tbody id="ncLetterRows">
          ${ncRowsHtml}
        </tbody>
      </table>

      <div class="letter-section">
        <div class="letter-section-title">Verification and Evidence Required</div>
        <div class="letter-section-content letter-editable" contenteditable="true">
          <strong>Required evidence for closure:</strong> inspection record, before-and-after photos, updated checklist / method statement, verification record, responsible discipline sign-off, and QAQC closure confirmation.
        </div>
      </div>

      <div class="letter-section">
        <div class="letter-section-title">Instruction to Project Manager</div>
        <div class="letter-section-content" contenteditable="true">
          <strong>The Project Manager is hereby directed to coordinate, implement, and monitor the required CAPA actions.</strong>
          The CAPA plan and supporting evidence shall be submitted to QAQC for verification on or before the target due date.
          Delayed or incomplete response may require escalation to the <strong>Operation Manager</strong>.
        </div>
      </div>

      <div class="signature-block-container">
        <div class="letter-two-col signature-section">
          <div class="sign-box">
            <div class="sign-role">Prepared By</div>
            <div class="sign-sub">QAQC / CAPA Coordinator</div>
            <div class="sign-line">
              <label class="signature-upload-box">
                <input type="file" accept="image/*" class="signature-input" data-target="prepared_by">
                <span class="signature-upload-hint">CLICK TO UPLOAD SIGNATURE</span>
                <img class="signature-preview" data-preview="prepared_by" alt="Prepared By signature">
              </label>
              <div class="signature-name-line">
                <input type="text" placeholder="Prepared By Name">
              </div>
              <div><strong>Date:</strong> <input type="date" class="signature-date-input" style="border:0;border-bottom:0;outline:0;font-size:10px;width:150px;"></div>
            </div>
          </div>
          <div class="sign-box">
            <div class="sign-role">Checked By</div>
            <div class="sign-sub">QAQC Manager / Authorized QAQC Representative</div>
            <div class="sign-line">
              <label class="signature-upload-box">
                <input type="file" accept="image/*" class="signature-input" data-target="checked_by">
                <span class="signature-upload-hint">CLICK TO UPLOAD SIGNATURE</span>
                <img class="signature-preview" data-preview="checked_by" alt="Checked By signature">
              </label>
              <div class="signature-name-line">
                <input type="text" placeholder="Checked By Name">
              </div>
              <div><strong>Date:</strong> <input type="date" class="signature-date-input" style="border:0;border-bottom:0;outline:0;font-size:10px;width:150px;"></div>
            </div>
          </div>
        </div>

        <div class="letter-two-col signature-section">
          <div class="sign-box">
            <div class="sign-role">Operation Manager</div>
            <div class="sign-sub">(Reviewer and Approver)</div>
            <div class="sign-line">
              <label class="signature-upload-box">
                <input type="file" accept="image/*" class="signature-input" data-target="operation_manager">
                <span class="signature-upload-hint">CLICK TO UPLOAD SIGNATURE</span>
                <img class="signature-preview" data-preview="operation_manager" alt="Operation Manager signature">
              </label>
              <div class="signature-name-line">
                <input type="text" placeholder="Operation Manager Name">
              </div>
              <div><strong>Date:</strong> <input type="date" class="signature-date-input" style="border:0;border-bottom:0;outline:0;font-size:10px;width:150px;"></div>
            </div>
          </div>
          <div class="sign-box">
            <div class="sign-role">Project Manager</div>
            <div class="sign-sub">(Action Owner)</div>
            <div class="sign-line">
              <label class="signature-upload-box">
                <input type="file" accept="image/*" class="signature-input" data-target="project_manager">
                <span class="signature-upload-hint">CLICK TO UPLOAD SIGNATURE</span>
                <img class="signature-preview" data-preview="project_manager" alt="Project Manager signature">
              </label>
              <div class="signature-name-line">
                <input type="text" placeholder="Project Manager Name">
              </div>
              <div><strong>Date:</strong> <input type="date" class="signature-date-input" style="border:0;border-bottom:0;outline:0;font-size:10px;width:150px;"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="letter-section">
        <div class="letter-section-title">Response Required</div>
        <div class="letter-section-content">
          <strong>Please refer to CAPA plan and submit closure evidence within the required timeframe.</strong>
          Failure to respond may result in escalation and management review.
        </div>
      </div>
    </div>
    <div class="letter-footer">
      <div class="letter-footer-black">COMMITTED TO QUALITY. DRIVEN BY EXCELLENCE.</div>
      <div class="letter-footer-red"></div>
    </div>
  </div>`;
}


function renumberNcLetterRows(){
  const tbody = document.getElementById("ncLetterRows");
  if(!tbody) return;
  Array.from(tbody.querySelectorAll("tr")).forEach((row, index) => {
    const noCell = row.querySelector(".nc-no");
    if(noCell) noCell.textContent = index + 1;
  });
}

function bindNcLetterRowControls(){ /* Auto-populated from selection */ }

function openActionLetter(recordOrList){
  currentOpenedActionLetterId = null;
  const deleteBtn = document.getElementById("deleteCurrentActionLetterBtn");
  if(deleteBtn) deleteBtn.style.display = "none";

  const modal = document.getElementById("actionLetterModal");
  const content = document.getElementById("actionLetterContent");
  if(!modal || !content){
    alert("Action Letter is not available.");
    return;
  }
  content.innerHTML = buildActionLetter(recordOrList);
  if(typeof window.bindActionLetterSignatureUploads === "function"){
    window.bindActionLetterSignatureUploads();
  }
  if(typeof window.bindNcCellImageUploads === "function"){
    window.bindNcCellImageUploads();
  }
  content.querySelectorAll(".letter-page-break").forEach(bindPageBreakEvents);
  modal.style.display = "flex";
  modal.style.zIndex = "99999";
  modal.classList.add("active");
  const wrap = modal.querySelector(".action-letter-preview-wrap");
  if(wrap){
    wrap.scrollTop = 0;
  }
  bindNcLetterRowControls();
}

function printActionLetterForRecord(recordOrList){
  openActionLetter(recordOrList);
}

function closeActionLetter(){
  const modal = document.getElementById("actionLetterModal");
  if(modal){
    modal.classList.remove("active");
    modal.style.display = "none";
  }
}

async function copyActionLetter(){
  const text = actionLetterContent ? actionLetterContent.innerText : "";
  try{
    if(navigator.clipboard){
      navigator.clipboard.writeText(text);
    }
  }catch(err){}
  showToast("Action letter copied");
}

function getActionLetterPrintCss(orientation = 'portrait'){
  return `
    @page { size: ${orientation === 'landscape' ? 'A4 landscape' : 'A4 portrait'}; margin: 8mm; }
    body { margin: 0; background: white; font-family: Arial, Helvetica, sans-serif; color: #111827; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    * { box-sizing: border-box; }
    .letter-a4-preview { width: 100%; margin: 0 auto; background: white; border: 0; border-radius: 0; padding: 0; box-shadow: none; }
    .letter-page { width: 100%; background: white; color: #111827; font-size: 9pt; line-height: 1.3; position: relative; }
    .letter-header-table { width: 100%; border-collapse: collapse; border: 0 !important; }
    .letter-header-table td { border: 0 !important; padding: 0 3px; }
    .letter-header-logo-cell img { max-height: 36px; }
    .letter-header-title-cell h1 { font-size: 15px; margin: 0; font-weight: 900; }
    .letter-header-title-cell h2 { font-size: 8px; margin: 2px 0 0; color: #e30613; font-weight: 900; }
    .letter-stripe {
      height: 6px !important;
      background: linear-gradient(90deg, #020617 0%, #020617 52%, #e30613 52%, #e30613 100%) !important;
      margin: 2mm 0 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .letter-info { width: ${orientation === 'landscape' ? '82%' : '80%'}; margin: 0 auto 3mm; border-collapse: collapse; font-size: 9pt; }
    .letter-info th { background: #000 !important; color: #fff !important; padding: 3px 6px; border: 1px solid #555; }
    .letter-info td { padding: 3px 6px; border: 1px solid #777; font-weight: 700; }
    .letter-section { margin-bottom: 2mm; border: 1px solid #999; }
    .letter-section-title {
      display: inline-flex !important;
      align-items: center !important;
      background: #050505 !important;
      color: #ffffff !important;
      padding: 4px 10px !important;
      min-width: 170px !important;
      font-size: 9pt !important;
      font-weight: 900 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.03em !important;
      position: relative !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .letter-section-title:after {
      content: "" !important;
      position: absolute !important;
      right: -16px !important;
      top: 0 !important;
      border-top: 22px solid #e30613 !important;
      border-right: 16px solid transparent !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .letter-section-content { padding: 5px 7px; font-size: 8.5pt; }
    .letter-two-col { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid #999; margin-bottom: 2mm; }
    .sign-box { padding: 4px 6px; border-right: 1px solid #999; }
    .sign-box:last-child { border-right: 0; }
    .sign-role { font-size: 8.5pt; font-weight: 900; text-transform: uppercase; }
    .sign-sub { font-size: 7.5pt; font-weight: 700; }
    .signature-block-container {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      margin-top: 2mm;
    }
    .signature-block-container.break-page-before {
      page-break-before: always !important;
      break-before: page !important;
      margin-top: 8mm !important;
    }
    .nc-summary-table { width: 100% !important; table-layout: fixed !important; border-collapse: collapse !important; border: 1px solid #000 !important; font-size: 8pt !important; margin: 2mm 0; }
    .nc-summary-table th { background: #000 !important; color: #fff !important; padding: 3px; border: 1px solid #000 !important; }
    .nc-summary-table td { border: 1px solid #000 !important; padding: 3px; vertical-align: top; }
    .nc-finding-text strong { color: #e30613 !important; font-weight: 700; }
    .nc-cell-image { width: 1.25in !important; height: 1.25in !important; max-width: 1.25in !important; max-height: 1.25in !important; min-width: 1.25in !important; min-height: 1.25in !important; object-fit: contain !important; object-position: center center !important; display: block; margin: 3px auto; }
    .signature-upload-box { border: 1px dashed #777; min-height: 26px; height: 26px; display: flex; align-items: center; justify-content: center; }
    .signature-upload-box img { max-height: 24px; object-fit: contain; }
    .letter-footer { display: flex; height: 14px; margin-top: 3mm; }
    .letter-footer-black { flex: 1; background: #050505; color: #fff; font-size: 6.5pt; font-weight: 900; display: flex; align-items: center; padding-left: 8px; }
    .letter-footer-red { width: 40px; background: #e30613; }
    .no-print, .signature-upload-hint, .nc-upload-label, input[type="file"], .action-letter-break-control { display: none !important; }
  `;
}

function printActionLetter(){
  if(!actionLetterContent || !actionLetterContent.innerHTML.trim()){
    openActionLetter();
  }
  const html = typeof getPrintableActionLetterHtml === 'function' ? getPrintableActionLetterHtml() : (actionLetterContent ? actionLetterContent.innerHTML : '');
  const css = getActionLetterPrintCss("portrait");

  let printFrame = document.getElementById("capaPrintFrame");
  if(!printFrame){
    printFrame = document.createElement("iframe");
    printFrame.id = "capaPrintFrame";
    printFrame.style.position = "fixed";
    printFrame.style.right = "0";
    printFrame.style.bottom = "0";
    printFrame.style.width = "0";
    printFrame.style.height = "0";
    printFrame.style.border = "0";
    printFrame.style.visibility = "hidden";
    document.body.appendChild(printFrame);
  }

  const frameDoc = printFrame.contentDocument || printFrame.contentWindow.document;
  frameDoc.open();
  frameDoc.write(`<!doctype html><html><head><meta charset="utf-8"><title>CAPA Action Letter</title><style>${css}</style></head><body><div class="letter-a4-preview">${html}</div></body></html>`);
  frameDoc.close();

  setTimeout(function(){
    try{
      printFrame.contentWindow.focus();
      printFrame.contentWindow.print();
    }catch(e){
      window.print();
    }
  }, 250);
}

function buildCapaAiPrompt(){
  const projectName = $("projectName").value.trim();
  const clientName = $("clientName") ? $("clientName").value.trim() : "";
  const projectLocation = $("projectLocation") ? $("projectLocation").value.trim() : "";
  const nonConformance = $("nonConformance").value.trim();
  const owner = $("owner").value.trim();
  const dueDate = $("dueDate").value;
  const coverageStart = $("coverageStart").value;
  const coverageEnd = $("coverageEnd").value;
  const status = $("status").value;

  return `You are a construction QAQC CAPA assistant for a General Contractor.

Generate practical CAPA recommendations based on this Non-Conformance. If multiple findings are provided, organize the response for up to four (4) non-conformance items.

Project Name: ${projectName || "[not provided]"}
Client: ${clientName || "[not provided]"}
Location of Project: ${projectLocation || "[not provided]"}
Coverage Period: ${coverageStart || "[not provided]"} to ${coverageEnd || "[not provided]"}
Responsible Party / Owner: ${owner || "[not provided]"}
Due Date: ${dueDate || "[not provided]"}
Current Status: ${status || "[not provided]"}

Non-Conformance:
${nonConformance || "[describe the non-conformance here]"}

Please provide the answer in this format:
1. Probable Root Cause
2. Immediate Correction / Containment
3. Corrective Action
4. Preventive Action
5. Verification of Effectiveness
6. Evidence Required for Closure
7. Recommended Responsible Party / Discipline
8. Suggested Priority and Target Closure Date
9. Notes / Risks

Requirements:
- Keep actions specific, measurable, and construction-site practical.
- Separate correction, corrective action, and preventive action clearly.
- Use QAQC / OM / PM / Project Superintendent / Project Engineer discipline roles only.
- Do not invent facts. State assumptions if needed.`;
}

function openAiPrompt(){
  aiPromptText.value = buildCapaAiPrompt();
  aiPromptModal.classList.add("active");
}

function closeAiPrompt(){
  aiPromptModal.classList.remove("active");
}

async function copyAiPrompt(){
  aiPromptText.select();
  aiPromptText.setSelectionRange(0, 999999);
  try{
    await navigator.clipboard.writeText(aiPromptText.value);
    showToast("AI prompt copied");
  }catch(err){
    document.execCommand("copy");
    showToast("AI prompt copied");
  }
}


function saveActionLetters(){
  localStorage.setItem("capaActionLetters", JSON.stringify(actionLetters));
}

function getCurrentLetterMeta(){
  const todayIso = new Date().toISOString().slice(0,10);
  const content = document.getElementById("actionLetterContent");
  
  let projectName = "", clientName = "", projectLocation = "", dueDate = "", status = "Open", coverage = "", letterNo = "";
  
  if(content){
    const infoTable = content.querySelector(".letter-info");
    if(infoTable){
      infoTable.querySelectorAll("tr").forEach(tr => {
        const th = (tr.querySelector("th") ? tr.querySelector("th").textContent : "").trim().toUpperCase();
        const td = (tr.querySelector("td") ? tr.querySelector("td").textContent : "").trim();
        if(th.includes("PROJECT:")) projectName = td;
        else if(th.includes("CLIENT:")) clientName = td;
        else if(th.includes("LOCATION") || th.includes("AREA:")) projectLocation = td;
        else if(th.includes("DUE DATE:")) dueDate = td;
        else if(th.includes("STATUS:")) status = td;
        else if(th.includes("COVERAGE:")) coverage = td;
        else if(th.includes("ACTION LETTER NO.:") || th.includes("ACTION LETTER NO:")) letterNo = td;
      });
    }
  }

  const useEditFields = editProjectModal && editProjectModal.classList.contains("active");
  const fieldValue = (addId, editId) => {
    const el = $(useEditFields ? editId : addId);
    return el ? el.value.trim() : "";
  };

  if(!projectName) projectName = fieldValue("projectName", "editProjectName");
  if(!clientName) clientName = fieldValue("clientName", "editClientName");
  if(!projectLocation) projectLocation = fieldValue("projectLocation", "editProjectLocation");
  if(!dueDate) dueDate = fieldValue("dueDate", "editDueDate");
  if(!coverage) coverage = useEditFields ? makeEditCoverageValue() : makeCoverageValue();
  if(!letterNo) letterNo = "AL-CAPA-" + todayIso.replaceAll("-","") + "-001";

  return {
    id: "AL-" + Date.now(),
    issuedDate: todayIso,
    letterNo: letterNo || ("AL-CAPA-" + todayIso.replaceAll("-","") + "-001"),
    projectName: projectName || "[Project Name]",
    client: clientName || "[Client]",
    projectLocation: projectLocation || "[Location]",
    dueDate: dueDate || "[Due Date]",
    status: status || "Open",
    coverage: coverage || "[Coverage]"
  };
}

function createPageBreakElement(){
  const pb = document.createElement("div");
  pb.className = "letter-page-break";
  pb.setAttribute("contenteditable", "false");
  pb.setAttribute("draggable", "true");
  pb.innerHTML = `
    <div class="page-break-toolbar no-print">
      <span class="page-break-title">✂ PAGE BREAK (Page will split here when printed)</span>
      <div class="page-break-buttons">
        <button type="button" class="btn-pb-move-up" title="Move page break higher">▲ Move Up</button>
        <button type="button" class="btn-pb-move-down" title="Move page break lower">▼ Move Down</button>
        <button type="button" class="btn-pb-remove" title="Remove this page break">✕ Remove</button>
      </div>
    </div>
  `;
  bindPageBreakEvents(pb);
  return pb;
}

let compilerHasActionLetterBreak = false;

function bindPageBreakEvents(pb){
  if(!pb) return;
  const btnUp = pb.querySelector(".btn-pb-move-up");
  const btnDown = pb.querySelector(".btn-pb-move-down");
  const btnRemove = pb.querySelector(".btn-pb-remove");

  if(btnUp){
    btnUp.onclick = function(e){
      e.stopPropagation();
      let prev = pb.previousElementSibling;
      while(prev && (prev.classList.contains("letter-page-break") || prev.tagName === "STYLE" || prev.classList.contains("no-print") || prev.classList.contains("page-sheet-header-badge"))){
        prev = prev.previousElementSibling;
      }
      if(prev && prev.parentNode){
        prev.parentNode.insertBefore(pb, prev);
        pb.scrollIntoView({behavior:"smooth", block:"center"});
        showToast("Page break moved up");
      } else {
        showToast("Already at top of letter content");
      }
    };
  }

  if(btnDown){
    btnDown.onclick = function(e){
      e.stopPropagation();
      let next = pb.nextElementSibling;
      while(next && (next.classList.contains("letter-page-break") || next.tagName === "STYLE" || next.classList.contains("no-print") || next.classList.contains("page-sheet-header-badge"))){
        next = next.nextElementSibling;
      }
      if(next && next.parentNode){
        next.parentNode.insertBefore(pb, next.nextElementSibling);
        pb.scrollIntoView({behavior:"smooth", block:"center"});
        showToast("Page break moved down");
      } else {
        showToast("Already at bottom of letter content");
      }
    };
  }

  if(btnRemove){
    btnRemove.onclick = function(e){
      e.stopPropagation();
      if(compilerPrintArea && compilerPrintArea.contains(pb)){
        compilerHasActionLetterBreak = false;
      }
      pb.remove();
      showToast("Page break removed");
    };
  }

  pb.ondragstart = function(e){
    e.dataTransfer.setData("text/plain", "page-break");
    pb.classList.add("dragging");
  };
  pb.ondragend = function(){
    pb.classList.remove("dragging");
  };
}

function insertPageBreakInActionLetter(){
  const content = document.getElementById("actionLetterContent");
  if(!content){
    showToast("Action Letter preview not found");
    return;
  }
  
  const existingBreak = content.querySelector(".letter-page-break");
  if(existingBreak){
    existingBreak.scrollIntoView({behavior:"smooth", block:"center"});
    showToast("Use ▲ Move Up or ▼ Move Down to adjust page break position");
    return;
  }

  const sigSection = content.querySelector(".signature-block-container") || content.querySelector(".signature-section") || content.querySelector(".letter-two-col") || content.querySelector(".letter-section:last-of-type");
  const pb = createPageBreakElement();
  
  if(sigSection && sigSection.parentNode){
    sigSection.parentNode.insertBefore(pb, sigSection);
  } else {
    const page = content.querySelector(".letter-page") || content;
    page.appendChild(pb);
  }

  pb.scrollIntoView({behavior:"smooth", block:"center"});
  showToast("Page break added! Click ▲ Move Up or ▼ Move Down to adjust position.");
}

function insertPageBreakInCompilerPreview(){
  if(!compilerPrintArea){
    showToast("Report preview not found");
    return;
  }
  
  // Find Action Letter in compilerPrintArea
  const actionLetterPreview = compilerPrintArea.querySelector(".action-letter-sheet") || compilerPrintArea.querySelector(".letter-a4-preview") || compilerPrintArea.querySelector(".letter-page");
  if(!actionLetterPreview){
    showToast("No Action Letter found in preview. Please ensure Action Letters are enabled in Section 3.");
    return;
  }

  const existingBreak = actionLetterPreview.querySelector(".letter-page-break");
  if(existingBreak){
    existingBreak.scrollIntoView({behavior:"smooth", block:"center"});
    showToast("Page break already added. Click ▲ Move Up or ▼ Move Down to adjust.");
    return;
  }

  compilerHasActionLetterBreak = true;
  const sigSection = actionLetterPreview.querySelector(".signature-block-container") || actionLetterPreview.querySelector(".signature-section") || actionLetterPreview.querySelector(".letter-two-col") || actionLetterPreview.querySelector(".letter-section:last-of-type");
  const pb = createPageBreakElement();

  if(sigSection && sigSection.parentNode){
    sigSection.parentNode.insertBefore(pb, sigSection);
  } else {
    const page = actionLetterPreview.querySelector(".letter-page") || actionLetterPreview;
    page.appendChild(pb);
  }

  bindPageBreakEvents(pb);
  pb.scrollIntoView({behavior:"smooth", block:"center"});
  showToast("Page break added to Action Letter! Click ▲ Move Up or ▼ Move Down to adjust position.");
}

let currentOpenedActionLetterId = null;

function deleteActionLetter(id, closeModal){
  const idx = actionLetters.findIndex(item => item.id === id);
  if(idx < 0){
    showToast("Action Letter not found.");
    return;
  }
  const item = actionLetters[idx];
  const letterNo = item.letterNo || "this action letter";
  const proj = item.projectName ? ` for ${item.projectName}` : "";
  if(confirm(`Are you sure you want to delete Action Letter ${letterNo}${proj} from the log register?\n\nThis action cannot be undone.`)){
    actionLetters.splice(idx, 1);
    saveActionLetters();
    renderActionLetters();
    if(closeModal || (currentOpenedActionLetterId === id && actionLetterModal && (actionLetterModal.classList.contains("active") || actionLetterModal.style.display !== "none"))){
      closeActionLetter();
    }
    showToast(`Action Letter ${letterNo} deleted.`);
  }
}
window.deleteActionLetter = deleteActionLetter;

function saveCurrentActionLetter(){
  if(!actionLetterContent || !actionLetterContent.innerHTML.trim()){
    openActionLetter();
  }
  const meta = getCurrentLetterMeta();
  const printableHtml = typeof getPrintableActionLetterHtml === "function" ? getPrintableActionLetterHtml() : (actionLetterContent ? actionLetterContent.innerHTML : "");
  const existingIndex = actionLetters.findIndex(item => item.letterNo === meta.letterNo && item.projectName === meta.projectName);
  const record = {
    ...meta,
    id: existingIndex >= 0 ? actionLetters[existingIndex].id : ("AL-" + Date.now()),
    html: printableHtml
  };
  currentOpenedActionLetterId = record.id;
  const deleteBtn = document.getElementById("deleteCurrentActionLetterBtn");
  if(deleteBtn) deleteBtn.style.display = "inline-flex";

  if(existingIndex >= 0){
    actionLetters[existingIndex] = record;
  } else {
    actionLetters.unshift(record);
  }
  saveActionLetters();
  renderActionLetters();
  showToast(`Action Letter ${record.letterNo} logged into Action Letter Registry!`);
}

function openSavedActionLetter(id){
  const record = actionLetters.find(item => item.id === id);
  if(!record){
    alert("Saved action letter not found.");
    return;
  }
  currentOpenedActionLetterId = id;
  const deleteBtn = document.getElementById("deleteCurrentActionLetterBtn");
  if(deleteBtn) deleteBtn.style.display = "inline-flex";

  record.html = upgradeActionLetterHtmlHeader(record.html);
  saveActionLetters();

  actionLetterContent.innerHTML = record.html;
  actionLetterModal.classList.add("active");
  actionLetterModal.style.display = "flex";
  actionLetterModal.style.zIndex = "99999";
  const wrap = actionLetterModal.querySelector(".action-letter-preview-wrap");
  if(wrap) wrap.scrollTop = 0;
}

function printSavedActionLetter(id){
  const record = actionLetters.find(item => item.id === id);
  if(!record){
    alert("Saved action letter not found.");
    return;
  }
  record.html = upgradeActionLetterHtmlHeader(record.html);
  actionLetterContent.innerHTML = record.html;
  printActionLetter();
}

function renderActionLetters(){
  if(!actionLetterRows || !actionLetterEmpty) return;

  const project = projectFilterEl ? projectFilterEl.value : "";
  const coverage = coverageFilterEl ? coverageFilterEl.value : "";
  const q = actionLetterSearch ? actionLetterSearch.value.toLowerCase().trim() : "";
  const statusFilter = actionLetterStatusFilter ? actionLetterStatusFilter.value : "";

  const filtered = actionLetters.filter(item => {
    const text = [
      item.issuedDate,
      item.letterNo,
      item.projectName,
      item.client,
      item.projectLocation,
      item.dueDate,
      item.status
    ].join(" ").toLowerCase();

    return (!project || item.projectName === project) &&
           (!coverage || item.coverage === coverage) &&
           (!statusFilter || item.status === statusFilter) &&
           (!q || text.includes(q));
  });

  actionLetterRows.innerHTML = filtered.map(item => `
    <tr data-letter-id="${escapeHtml(item.id)}">
      <td>${escapeHtml(item.issuedDate)}</td>
      <td><strong>${escapeHtml(item.letterNo)}</strong></td>
      <td>${escapeHtml(item.projectName)}</td>
      <td>${escapeHtml(item.client)}</td>
      <td>${escapeHtml(item.projectLocation)}</td>
      <td>${escapeHtml(item.dueDate)}</td>
      <td><span class="pill ${statusClass(item.status)}">${escapeHtml(item.status)}</span></td>
      <td style="text-align:center; white-space:nowrap;">
        <button type="button" class="btn-action-view" data-view-letter-id="${escapeHtml(item.id)}" title="View Action Letter">View</button>
        <button type="button" class="btn-action-delete" data-delete-letter-id="${escapeHtml(item.id)}" title="Delete Action Letter from Log Register">Delete</button>
      </td>
    </tr>
  `).join("");

  actionLetterEmpty.style.display = filtered.length ? "none" : "block";
}

function showActionLettersSheet(){
  renderActionLetters();
  document.body.classList.add("show-action-letters");
  if(actionLettersSheet) actionLettersSheet.scrollIntoView({behavior:"smooth", block:"start"});
}

function showRegistrySheet(){
  document.body.classList.remove("show-action-letters");
  const registry = document.querySelector(".panel:not(.action-letters-sheet)");
  if(registry) registry.scrollIntoView({behavior:"smooth", block:"start"});
}


function enforceGraphVisuals(){
  const ownerBars = document.getElementById("ownerBars");
  if(ownerBars){
    ownerBars.querySelectorAll(".bar-row").forEach(row => {
      row.style.gridTemplateColumns = "220px minmax(180px, 1fr) 38px";
      row.style.minWidth = "480px";
      const label = row.querySelector("strong:first-child");
      if(label){
        label.style.whiteSpace = "nowrap";
        label.style.wordBreak = "keep-all";
        label.style.overflow = "visible";
        label.style.textOverflow = "clip";
        label.style.display = "inline-block";
        label.style.width = "220px";
        label.style.minWidth = "220px";
        label.style.maxWidth = "220px";
      }
    });
  }
  updateStatusMix();
  document.querySelectorAll(".legend-item").forEach(item => {
    if(item.textContent.trim().toLowerCase() === "in progress"){
      const dot = item.querySelector(".dot");
      if(dot) dot.style.background = "var(--blue)";
    }
  });
}

function rowsForExport(){
  const source = selectedCapaIds.size > 0
    ? capaData.filter(item => selectedCapaIds.has(item.id))
    : capaData;

  return source.map((item, index) => ({
    "No.": index + 1,
    "Project Name": item.projectName || "",
    "Client": item.client || "",
    "Location of Project": item.projectLocation || "",
    "Image": item.image ? "Attached" : "",
    "Non-Conformance": item.nonConformance || "",
    "Corrective Action": item.correctiveAction || "",
    "Preventive Action": item.preventiveAction || "",
    "Root Cause": item.rootCause || "",
    "Responsible Party": item.owner || "",
    "Due Date": item.dueDate || "",
    "Coverage": coverageLabel(item.coverage),
    "Remarks": item.remarks || "",
    "Status": item.status || ""
  }));
}
function downloadBlob(content, filename, type){
  const blob = content instanceof Blob ? content : new Blob([content], {type});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}
function exportCsv(){
  const data = rowsForExport();
  const headers = Object.keys(data[0] || {"Project Name":"","Client":"","Location of Project":"","Image":"","Non-Conformance":"","Corrective Action":"","Preventive Action":"","Root Cause":"","Responsible Party":"","Due Date":"","Coverage":"","Remarks":"","Status":""});
  const csv = [headers, ...data.map(row => headers.map(h => row[h]))].map(row => row.map(v => `"${String(v ?? "").replace(/"/g,'""')}"`).join(",")).join("\n");
  downloadBlob(csv, "capa_register.csv", "text/csv;charset=utf-8");
}
function exportExcel(){
  const data = rowsForExport();
  const headers = Object.keys(data[0] || {"Project Name":"","Client":"","Location of Project":"","Image":"","Non-Conformance":"","Corrective Action":"","Preventive Action":"","Root Cause":"","Responsible Party":"","Due Date":"","Coverage":"","Remarks":"","Status":""});
  const table = `<html><head><meta charset="utf-8"></head><body><table border="1"><thead><tr>${headers.map(h=>`<th>${escapeHtml(h)}</th>`).join("")}</tr></thead><tbody>${data.map(row=>`<tr>${headers.map(h=>`<td>${escapeHtml(row[h])}</td>`).join("")}</tr>`).join("")}</tbody></table></body></html>`;
  downloadBlob(table, "capa_register.xls", "application/vnd.ms-excel;charset=utf-8");
}
function parseCsv(text){
  const rows=[]; let row=[], val="", q=false;
  for(let i=0;i<text.length;i++){
    const c=text[i], n=text[i+1];
    if(c === '"' && q && n === '"'){ val+='"'; i++; }
    else if(c === '"'){ q=!q; }
    else if(c === "," && !q){ row.push(val); val=""; }
    else if((c === "\n" || c === "\r") && !q){ if(c === "\r" && n === "\n") i++; row.push(val); if(row.some(x=>x.trim()!=="")) rows.push(row); row=[]; val=""; }
    else val+=c;
  }
  row.push(val); if(row.some(x=>x.trim()!=="")) rows.push(row);
  if(!rows.length) return [];
  const headers = rows[0].map(h=>h.trim());
  return rows.slice(1).map(vals => { const obj={}; headers.forEach((h,i)=>obj[h]=vals[i]||""); return obj; });
}
function normalizeImportedRow(row){
  const get=(...names)=>{ for(const n of names){ if(row[n] !== undefined && row[n] !== null) return row[n]; } return ""; };
  return {
    projectName:String(get("Project Name","Project","projectName")).trim(),
    client:String(get("Client","client")).trim(),
    projectLocation:String(get("Location of Project","Project Location","Location","projectLocation")).trim(),
    image:"",
    nonConformance:String(get("Non-Conformance","Non Conformance","NC","nonConformance")).trim(),
    correctiveAction:String(get("Corrective Action","correctiveAction")).trim(),
    preventiveAction:String(get("Preventive Action","preventiveAction")).trim(),
    rootCause:String(get("Root Cause","rootCause")).trim(),
    owner:String(get("Responsible Party","Owner","owner")).trim(),
    dueDate:String(get("Due Date","dueDate")).trim(),
    coverage:String(get("Coverage","coverage")).trim(),
    remarks:String(get("Remarks","remarks")).trim(),
    status:String(get("Status","status") || "Open").trim()
  };
}

function openAiPrompt(){
  aiPromptText.value = buildCapaAiPrompt();
  aiPromptModal.classList.add("active");
}

function closeAiPrompt(){
  aiPromptModal.classList.remove("active");
}

async function copyAiPrompt(){
  try{
    await navigator.clipboard.writeText(aiPromptText.value);
  }catch(err){
    aiPromptText.focus();
    aiPromptText.select();
    document.execCommand("copy");
  }
  showToast("AI prompt copied");
}









const actionLetterBtn = $("actionLetterBtn");
const actionLetterTopBtn = $("actionLetterTopBtn");
const logActionLetterBtn = $("logActionLetterBtn");
const addPageBreakBtn = $("addPageBreakBtn");
const closeActionLetterBtn = $("closeActionLetter");
const copyActionLetterBtn = $("copyActionLetter");
const printActionLetterBtn = $("printActionLetter");

if(actionLetterBtn){ actionLetterBtn.addEventListener("click", openActionLetter); }
if(actionLetterTopBtn){ actionLetterTopBtn.addEventListener("click", openActionLetter); }
if(logActionLetterBtn){ logActionLetterBtn.addEventListener("click", saveCurrentActionLetter); }
if(addPageBreakBtn){ addPageBreakBtn.addEventListener("click", insertPageBreakInActionLetter); }
if(closeActionLetterBtn){ closeActionLetterBtn.addEventListener("click", closeActionLetter); }
if(copyActionLetterBtn){ copyActionLetterBtn.addEventListener("click", copyActionLetter); }
if(printActionLetterBtn){ printActionLetterBtn.addEventListener("click", printActionLetter); }
if(actionLetterModal){
  actionLetterModal.addEventListener("click", function(e){
    if(e.target === actionLetterModal) closeActionLetter();
  });
}

const aiAssistBtn = $("aiAssistPrompt");
const closeAiBtn = $("closeAiPrompt");
const copyAiBtn = $("copyAiPrompt");
const openChatBtn = $("openChatGPT");

if(aiAssistBtn){
  aiAssistBtn.onclick = function(){
    openAiPrompt();
  };
}

if(closeAiBtn){
  closeAiBtn.onclick = function(){
    closeAiPrompt();
    closeActionLetter();
  };
}

if(copyAiBtn){
  copyAiBtn.onclick = function(){
    copyAiPrompt();
  };
}

if(openChatBtn){
  openChatBtn.onclick = function(){
    window.open("https://chatgpt.com/", "_blank");
  };
}

if(aiPromptModal){
  aiPromptModal.addEventListener("click", e => {
    if(e.target === aiPromptModal){
      closeAiPrompt();
    closeActionLetter();
    }
  });
}

$("openRacimCard").addEventListener("click", openRacim);
$("closeRacim").addEventListener("click", closeRacim);
subcontractorToggle.addEventListener("change", () => {
  document.body.classList.toggle("subcontractor-on", subcontractorToggle.checked);
});
noSuperintendentToggle.addEventListener("change", () => {
  document.body.classList.toggle("no-superintendent", noSuperintendentToggle.checked);
});
racimModal.addEventListener("click", e => { if(e.target === racimModal) closeRacim(); });

$("openModal").addEventListener("click", openModal);
$("closeModal").addEventListener("click", closeModal);
$("resetForm").addEventListener("click", () => { form.reset(); autoGrowSheetTextareas(modal); });
modal.addEventListener("click", e => { /* outside click disabled for Add NC */ });
imagePreview.addEventListener("click", e => { if(e.target === imagePreview) closeImagePreview(); });
document.addEventListener("keydown", e => {
  if(e.key === "Escape"){
    closeImagePreview();
    closeModal();
    closeRacim();
    closeAiPrompt();
    closeActionLetter();
  }
});

document.addEventListener("click", function(e){
  const projectBtn = e.target.closest(".project-link");
  if(projectBtn){
    e.preventDefault();
    e.stopPropagation();
    openEditProject(projectBtn.dataset.editId);
  }
});


if($("closeEditProject")) $("closeEditProject").addEventListener("click", closeEditProject);
if(editProjectModal) editProjectModal.addEventListener("click", e => { /* outside click disabled for Edit CAPA */ });
if(editProjectForm) editProjectForm.addEventListener("submit", saveEditProject);
if($("deleteEditProject")) $("deleteEditProject").addEventListener("click", deleteEditProjectRecord);

searchEl.addEventListener("input", renderRows);
statusFilterEl.addEventListener("change", renderRows);
projectFilterEl.addEventListener("change", () => { renderRows();
enforceGraphVisuals(); renderActionLetters(); });
coverageFilterEl.addEventListener("change", () => { renderRows(); renderActionLetters(); });

if(clientInput){
  clientInput.addEventListener("input", e => {
    saveProjectClientLocation("client", e.target.value);
  });
  clientInput.addEventListener("change", e => {
    saveProjectClientLocation("client", e.target.value);
    showToast(`Updated client for ${projectFilterEl.value || "project"}`);
  });
}

if(projectLocationInput){
  projectLocationInput.addEventListener("input", e => {
    saveProjectClientLocation("projectLocation", e.target.value);
  });
  projectLocationInput.addEventListener("change", e => {
    saveProjectClientLocation("projectLocation", e.target.value);
    showToast(`Updated location for ${projectFilterEl.value || "project"}`);
  });
}

const addProjectNameEl = $("projectName");
if(addProjectNameEl){
  addProjectNameEl.addEventListener("input", function(){
    const val = this.value.trim();
    const match = capaData.find(x => x.projectName && x.projectName.toLowerCase() === val.toLowerCase());
    if(match){
      if($("clientName") && match.client && !$("clientName").dataset.userEdited) {
        $("clientName").value = match.client;
      }
      if($("projectLocation") && match.projectLocation && !$("projectLocation").dataset.userEdited) {
        $("projectLocation").value = match.projectLocation;
      }
      if($("owner") && match.owner && !$("owner").value.trim()) {
        $("owner").value = match.owner;
      }
    }
  });
}
if($("clientName")) {
  $("clientName").addEventListener("input", function() { this.dataset.userEdited = "1"; });
}
if($("projectLocation")) {
  $("projectLocation").addEventListener("input", function() { this.dataset.userEdited = "1"; });
}

// Select All Checkbox
const selectAllEl = $("selectAllCapa");
if(selectAllEl){
  selectAllEl.addEventListener("change", function(){
    const visibleRows = filteredData();
    if(this.checked){
      visibleRows.forEach(r => selectedCapaIds.add(r.id));
    } else {
      visibleRows.forEach(r => selectedCapaIds.delete(r.id));
    }
    renderRows();
  });
}

// Row Selection Checkbox change delegation
rowsEl.addEventListener("change", function(e){
  const chk = e.target.closest(".capa-row-select");
  if(chk){
    const id = chk.dataset.id;
    const tr = chk.closest("tr");
    if(chk.checked){
      selectedCapaIds.add(id);
      if(tr) tr.classList.add("row-selected");
    } else {
      selectedCapaIds.delete(id);
      if(tr) tr.classList.remove("row-selected");
    }
    updateSelectionState();
  }
});

// Bulk Action Button Listeners
if($("bulkClearBtn")){
  $("bulkClearBtn").addEventListener("click", () => {
    selectedCapaIds.clear();
    renderRows();
  });
}

if($("bulkDeleteBtn")){
  $("bulkDeleteBtn").addEventListener("click", () => {
    if(!selectedCapaIds.size) return;
    const count = selectedCapaIds.size;
    if(!confirm(`Delete ${count} selected CAPA record(s)?`)) return;
    capaData = capaData.filter(item => !selectedCapaIds.has(item.id));
    selectedCapaIds.clear();
    saveData();
    renderRows();
    renderActionLetters();
    showToast(`Deleted ${count} CAPA record(s)`);
  });
}

function applyBulkStatus(status){
  if(!selectedCapaIds.size) return;
  let count = 0;
  capaData.forEach(item => {
    if(selectedCapaIds.has(item.id)){
      item.status = status;
      count++;
    }
  });
  if(count > 0){
    saveData();
    renderRows();
    renderActionLetters();
    showToast(`Marked ${count} record(s) as ${status}`);
  }
}

if($("bulkCloseBtn")) $("bulkCloseBtn").addEventListener("click", () => applyBulkStatus("Closed"));
rowsEl.addEventListener("dblclick", e => {
  const img = e.target.closest('img[data-preview="1"]');
  if(img){
    e.stopPropagation();
    openImagePreview(img.src);
  }
});

rowsEl.addEventListener("click", e => {
  const imgContainer = e.target.closest(".table-img-container");
  if(imgContainer && rowsEl.contains(imgContainer)){
    const input = imgContainer.querySelector(".table-inline-img-input");
    if(input && e.target !== input){
      e.stopPropagation();
      input.click();
      return;
    }
  }

  const printBtn = e.target.closest(".print-capa-letter-btn");
  if(printBtn && rowsEl.contains(printBtn)){
    e.stopPropagation();
    const id = printBtn.dataset.id;
    const allFiltered = filteredData();
    allFiltered.forEach((item, i) => { item._regNo = i + 1; });

    let targets = [];
    if(selectedCapaIds.size > 0 && selectedCapaIds.has(id)){
      targets = allFiltered.filter(item => selectedCapaIds.has(item.id));
    } else if(selectedCapaIds.size > 0){
      targets = allFiltered.filter(item => selectedCapaIds.has(item.id));
    } else {
      const single = allFiltered.find(item => item.id === id);
      if(single) targets = [single];
    }

    if(targets.length > 0){
      printActionLetterForRecord(targets);
    }
  }
});

rowsEl.addEventListener("change", async e => {
  const input = e.target.closest(".table-inline-img-input");
  if(input && input.files && input.files[0]){
    const file = input.files[0];
    const itemId = input.dataset.id;
    const itemIndex = capaData.findIndex(x => x.id === itemId);
    if(itemIndex >= 0){
      showToast("Compressing and updating image...");
      const compressedDataUrl = await readImageAsDataUrl(file, 1000, 1000, 0.8);
      if(compressedDataUrl){
        capaData[itemIndex].image = compressedDataUrl;
        saveData();
        if(typeof saveDataToBackend === "function") saveDataToBackend();
        renderRows();
        renderActionLetters();
        showToast("Evidence photo updated successfully!");
      }
    }
  }
});

if($("bulkPrintLetterBtn")){
  $("bulkPrintLetterBtn").addEventListener("click", () => {
    if(!selectedCapaIds.size) return;
    const allFiltered = filteredData();
    allFiltered.forEach((item, i) => { item._regNo = i + 1; });
    const selectedRecords = allFiltered.filter(item => selectedCapaIds.has(item.id));
    if(selectedRecords.length > 0){
      printActionLetterForRecord(selectedRecords);
    }
  });
}


function splitCoverage(value){
  const parts = String(value || "").split("|");
  return {start: parts[0] || "", end: parts[1] || ""};
}

function makeEditCoverageValue(){
  const start = $("editCoverageStart") ? $("editCoverageStart").value : "";
  const end = $("editCoverageEnd") ? $("editCoverageEnd").value : "";
  if(!start && !end) return "";
  return (start || end) + "|" + (end || start);
}

function openEditProject(id){
  const index = capaData.findIndex(item => item.id === id);
  const item = capaData[index];
  if(!item) {
    alert("Could not find this CAPA record.");
    return;
  }
  const coverage = splitCoverage(item.coverage);
  $("editIndex").value = index;
  $("editProjectName").value = item.projectName || "";
  $("editClientName").value = item.client || "";
  $("editProjectLocation").value = item.projectLocation || "";
  $("editOwner").value = item.owner || "";
  $("editNonConformance").value = item.nonConformance || "";
  $("editCorrectiveAction").value = item.correctiveAction || "";
  $("editPreventiveAction").value = item.preventiveAction || "";
  $("editRootCause").value = item.rootCause || "";
  $("editRemarks").value = item.remarks || "";
  $("editCoverageStart").value = coverage.start;
  $("editCoverageEnd").value = coverage.end;
  $("editDueDate").value = item.dueDate || "";
  $("editStatus").value = item.status || "Open";
  
  const editImgUpload = $("editImageUpload");
  if(editImgUpload) editImgUpload.value = "";
  window._editProjectCurrentImage = item.image || "";
  const previewWrap = $("editImagePreviewWrap");
  const previewImg = $("editImagePreview");
  if(previewWrap && previewImg){
    if(item.image){
      previewImg.src = item.image;
      previewWrap.style.display = "flex";
    } else {
      previewImg.src = "";
      previewWrap.style.display = "none";
    }
  }

  if(editImgUpload){
    editImgUpload.onchange = async function(){
      const file = editImgUpload.files && editImgUpload.files[0];
      if(file){
        const dataUrl = await readImageAsDataUrl(file);
        window._editProjectCurrentImage = dataUrl;
        if(previewWrap && previewImg){
          previewImg.src = dataUrl;
          previewWrap.style.display = "flex";
        }
      }
    };
  }
  const removeEditImgBtn = $("removeEditImageBtn");
  if(removeEditImgBtn){
    removeEditImgBtn.onclick = function(){
      window._editProjectCurrentImage = "";
      if(editImgUpload) editImgUpload.value = "";
      if(previewWrap && previewImg){
        previewImg.src = "";
        previewWrap.style.display = "none";
      }
      showToast("Image removed");
    };
  }

  editProjectModal.classList.add("active");
  autoGrowSheetTextareas(editProjectModal);
}

function closeEditProject(){
  editProjectModal.classList.remove("active");
}

async function saveEditProject(event){
  event.preventDefault();
  const index = Number($("editIndex").value);
  if(!Number.isInteger(index) || !capaData[index]) return;

  const imageInput = $("editImageUpload");
  const newUploaded = imageInput && imageInput.files && imageInput.files[0] ? await readImageAsDataUrl(imageInput.files[0]) : "";
  const finalImage = newUploaded || window._editProjectCurrentImage || (window._editProjectCurrentImage === "" ? "" : (capaData[index].image || ""));

  capaData[index] = {
    ...capaData[index],
    id:capaData[index].id || ("CAPA-" + Date.now()),
    projectName:$("editProjectName").value.trim(),
    client:$("editClientName").value.trim(),
    projectLocation:$("editProjectLocation").value.trim(),
    owner:$("editOwner").value.trim(),
    nonConformance:$("editNonConformance").value.trim(),
    correctiveAction:$("editCorrectiveAction").value.trim(),
    preventiveAction:$("editPreventiveAction").value.trim(),
    rootCause:$("editRootCause").value.trim(),
    remarks:$("editRemarks").value.trim(),
    coverage:makeEditCoverageValue(),
    dueDate:$("editDueDate").value,
    status:$("editStatus").value,
    image:finalImage
  };

  // Sync client and location across all records of this project
  if(capaData[index].projectName){
    const projName = capaData[index].projectName;
    const clName = capaData[index].client;
    const locName = capaData[index].projectLocation;
    capaData.forEach(item => {
      if(item.projectName === projName){
        if(clName) item.client = clName;
        if(locName) item.projectLocation = locName;
      }
    });
  }

  saveData();
  renderRows();
  renderActionLetters();
  closeEditProject();
  showToast("CAPA record updated");
}

function deleteEditProjectRecord(){
  const index = Number($("editIndex").value);
  if(!Number.isInteger(index) || !capaData[index]) return;
  if(!confirm("Delete this CAPA record?")) return;
  capaData.splice(index, 1);
  saveData();
  renderRows();
  renderActionLetters();
  closeEditProject();
  showToast("CAPA record deleted");
}


function renumberNcEntries(){
  document.querySelectorAll('#ncEntriesWrap .nc-entry-card').forEach((card, index) => {
    const no = index + 1;
    card.dataset.ncEntry = String(no);
    const title = card.querySelector('.nc-entry-title');
    if(title) title.textContent = 'Non-Conformance ' + no;
    const removeBtn = card.querySelector('.nc-remove-btn');
    if(removeBtn) removeBtn.style.display = no === 1 ? 'none' : 'inline-flex';
  });
}

function createAdditionalNcEntry(){
  const wrap = document.getElementById('ncEntriesWrap');
  if(!wrap) return;
  const next = wrap.querySelectorAll('.nc-entry-card').length + 1;
  const card = document.createElement('div');
  card.className = 'nc-entry-card';
  card.dataset.ncEntry = String(next);
  card.innerHTML = `
    <div class="nc-entry-head">
      <div class="nc-entry-title">Non-Conformance ${next}</div>
      <button class="btn btn-light nc-remove-btn" type="button">Remove</button>
    </div>
    <div class="form-row full"><label>Image for CAPA Registry</label><input class="field registry-image-upload nc-image" type="file" accept="image/*"></div>
    <div class="form-row full"><label>Non-Conformance</label><textarea class="field nc-nonconformance" required placeholder="Describe the observed issue"></textarea></div>
    <div class="form-row full"><label>Corrective Action</label><textarea class="field nc-corrective" placeholder="Immediate correction / containment"></textarea></div>
    <div class="form-row full"><label>Preventive Action</label><textarea class="field nc-preventive" placeholder="Steps to prevent recurrence"></textarea></div>
    <div class="form-row full"><label>Root Cause</label><textarea class="field nc-rootcause" placeholder="Why did it happen?"></textarea></div>`;
  wrap.appendChild(card);
  renumberNcEntries();
}

function resetAdditionalNcEntries(){
  const wrap = document.getElementById('ncEntriesWrap');
  if(!wrap) return;
  wrap.querySelectorAll('.nc-entry-card').forEach((card, index) => { if(index > 0) card.remove(); });
  renumberNcEntries();
}

function collectNcEntryCards(){
  return Array.from(document.querySelectorAll('#ncEntriesWrap .nc-entry-card'));
}

document.addEventListener('click', function(e){
  const addBtn = e.target.closest && e.target.closest('#addNewNcBtn');
  if(addBtn){ e.preventDefault(); createAdditionalNcEntry(); return; }
  const removeBtn = e.target.closest && e.target.closest('.nc-remove-btn');
  if(removeBtn){ e.preventDefault(); const card = removeBtn.closest('.nc-entry-card'); if(card) card.remove(); renumberNcEntries(); }
});
renumberNcEntries();

form.addEventListener("submit", async e => {
  e.preventDefault();
  try {
    const projectName = ($("projectName")?.value || "").trim() || "General Project";
    const client = ($("clientName")?.value || "").trim();
    const projectLocation = ($("projectLocation")?.value || "").trim();
    const owner = ($("owner")?.value || "").trim() || "QAQC";
    let dueDate = ($("dueDate")?.value || "").trim();
    if(!dueDate){
      // Default due date to 7 days from today if not selected
      const d = new Date(Date.now() + 7 * 86400000);
      dueDate = d.toISOString().split("T")[0];
    }
    const coverage = makeCoverageValue();
    const status = ($("status")?.value || "Open").trim();

    const base = {
      projectName,
      client,
      projectLocation,
      owner,
      dueDate,
      coverage,
      remarks: "",
      status
    };

    const cards = collectNcEntryCards();
    const entries = [];
    for(const card of cards){
      let image = "";
      try {
        const imageInput = card.querySelector(".nc-image");
        if(imageInput && imageInput.files && imageInput.files[0]){
          image = await readImageAsDataUrl(imageInput.files[0]);
        }
      } catch(imgErr){
        console.warn("Image read error:", imgErr);
      }

      const nonConformance = (card.querySelector(".nc-nonconformance")?.value || card.querySelector("#nonConformance")?.value || card.querySelector("textarea")?.value || "").trim();
      const correctiveAction = (card.querySelector(".nc-corrective")?.value || card.querySelector("#correctiveAction")?.value || "").trim();
      const preventiveAction = (card.querySelector(".nc-preventive")?.value || card.querySelector("#preventiveAction")?.value || "").trim();
      const rootCause = (card.querySelector(".nc-rootcause")?.value || card.querySelector("#rootCause")?.value || "").trim();

      if(nonConformance || correctiveAction || preventiveAction || rootCause){
        entries.push({
          image,
          nonConformance: nonConformance || "[Observed Non-Conformance]",
          correctiveAction,
          preventiveAction,
          rootCause
        });
      }
    }

    if(!entries.length){
      const fallbackNc = ($("nonConformance")?.value || "").trim();
      if(fallbackNc){
        entries.push({
          image: "",
          nonConformance: fallbackNc,
          correctiveAction: ($("correctiveAction")?.value || "").trim(),
          preventiveAction: ($("preventiveAction")?.value || "").trim(),
          rootCause: ($("rootCause")?.value || "").trim()
        });
      }
    }

    if(!entries.length){
      alert("Please enter the Non-Conformance finding description.");
      return;
    }

    const stamp = Date.now();
    const items = entries.map((entry, index) => ({
      id: "CAPA-" + stamp + "-" + (index + 1),
      groupId: "CAPA-GROUP-" + stamp,
      ...base,
      ...entry
    }));

    capaData.unshift(...items);

    // Sync client and location to any existing items of this project if previously unset
    if(base.projectName && (base.client || base.projectLocation)){
      capaData.forEach(item => {
        if(item.projectName === base.projectName){
          if(base.client && !item.client) item.client = base.client;
          if(base.projectLocation && !item.projectLocation) item.projectLocation = base.projectLocation;
        }
      });
    }

    saveData();
    form.reset();
    resetAdditionalNcEntries();
    closeModal();
    searchEl.value = "";
    statusFilterEl.value = "";
    projectFilterEl.value = "";
    coverageFilterEl.value = "";
    renderRows();
    renderActionLetters();
    showToast(items.length + " NC" + (items.length > 1 ? "s" : "") + " saved to registry!");
  } catch(err) {
    console.error("Save NC Error:", err);
    alert("Error saving NC: " + err.message);
  }
});

/* ==========================================================================
   REPORT COMPILER WITH LIVE PREVIEW & COVERAGE-AWARE ACTION LETTER INTEGRATION
   ========================================================================== */

const reportCompilerModal = $("reportCompilerModal");
const closeReportCompilerBtn = $("closeReportCompiler");
const compilerPrintBtn = $("compilerPrintBtn");
const compilerRefreshBtn = $("compilerRefreshBtn");
const compilerProjectSelect = $("compilerProjectSelect");
const compilerCoverageSelect = $("compilerCoverageSelect");
const compilerStatusMode = $("compilerStatusMode");
const compilerRuleTip = $("compilerRuleTip");
const compilerCustomStatuses = $("compilerCustomStatuses");
const compilerExcludePrevClosed = $("compilerExcludePrevClosed");
const compilerIncludeActionLetters = $("compilerIncludeActionLetters");
const compilerActionLetterOptions = $("compilerActionLetterOptions");
const compilerLetterSource = $("compilerLetterSource");
const compilerLetterPageBreak = $("compilerLetterPageBreak");
const compilerLetterPhotos = $("compilerLetterPhotos");
const compilerAddPageBreakBtn = $("compilerAddPageBreakBtn");
const compilerToolbarAddPageBreakBtn = $("compilerToolbarAddPageBreakBtn");
const compilerDocTitle = $("compilerDocTitle");
const compilerDocCode = $("compilerDocCode");
const compilerRevNo = $("compilerRevNo");
const compilerEffDate = $("compilerEffDate");
const compColImages = $("compColImages");
const compColRootCause = $("compColRootCause");
const compColCorrective = $("compColCorrective");
const compColPreventive = $("compColPreventive");
const compColRemarks = $("compColRemarks");
const compStatOpen = $("compStatOpen");
const compStatProgress = $("compStatProgress");
const compStatOverdue = $("compStatOverdue");
const compStatClosed = $("compStatClosed");
const compilerStatsPills = $("compilerStatsPills");
const compilerPrintArea = $("compilerPrintArea");
const compilerPagesContainer = $("compilerPagesContainer");
const compilerPreviewStatus = $("compilerPreviewStatus");
const compilerSelectAllColsBtn = $("compilerSelectAllColsBtn");
const compilerDeselectAllColsBtn = $("compilerDeselectAllColsBtn");
const compilerPaperOrientation = $("compilerPaperOrientation");
const compilerWirPagination = $("compilerWirPagination");
const compilerLetterPaperFormat = $("compilerLetterPaperFormat");
const compilerLetterPagination = $("compilerLetterPagination");
const compilerCoverageStart = $("compilerCoverageStart");
const compilerCoverageEnd = $("compilerCoverageEnd");
const compilerRuleText = $("compilerRuleText");

const PAPER_CONFIGS = {
  "a4-landscape": { name: "A4 Landscape", size: "A4", orientation: "landscape", cssSize: "A4 landscape", widthMm: 297, heightMm: 210, widthPx: 1123, paperClass: "paper-a4-landscape landscape" },
  "a4-portrait": { name: "A4 Portrait", size: "A4", orientation: "portrait", cssSize: "A4 portrait", widthMm: 210, heightMm: 297, widthPx: 794, paperClass: "paper-a4-portrait portrait" },
  "letter-landscape": { name: "Letter Landscape", size: "letter", orientation: "landscape", cssSize: "letter landscape", widthMm: 279.4, heightMm: 215.9, widthPx: 1056, paperClass: "paper-letter-landscape landscape" },
  "letter-portrait": { name: "Letter Portrait", size: "letter", orientation: "portrait", cssSize: "letter portrait", widthMm: 215.9, heightMm: 279.4, widthPx: 816, paperClass: "paper-letter-portrait portrait" },
  "legal-landscape": { name: "Legal Landscape", size: "legal", orientation: "landscape", cssSize: "legal landscape", widthMm: 355.6, heightMm: 215.9, widthPx: 1344, paperClass: "paper-legal-landscape landscape" },
  "legal-portrait": { name: "Legal Portrait", size: "legal", orientation: "portrait", cssSize: "legal portrait", widthMm: 215.9, heightMm: 355.6, widthPx: 816, paperClass: "paper-legal-portrait portrait" },
  "a3-landscape": { name: "A3 Landscape", size: "A3", orientation: "landscape", cssSize: "A3 landscape", widthMm: 420, heightMm: 297, widthPx: 1587, paperClass: "paper-a3-landscape landscape" },
  "a3-portrait": { name: "A3 Portrait", size: "A3", orientation: "portrait", cssSize: "A3 portrait", widthMm: 297, heightMm: 420, widthPx: 1123, paperClass: "paper-a3-portrait portrait" }
};

function parsePaperSetting(val, defaultKey = "a4-landscape"){
  const key = String(val || "").trim().toLowerCase();
  if(PAPER_CONFIGS[key]) return { key, ...PAPER_CONFIGS[key] };
  if(key === "portrait") return { key: "a4-portrait", ...PAPER_CONFIGS["a4-portrait"] };
  if(key === "landscape") return { key: "a4-landscape", ...PAPER_CONFIGS["a4-landscape"] };
  return { key: defaultKey, ...PAPER_CONFIGS[defaultKey] };
}

// Complete 14-column registry mapping for Report Compiler
const COMPILER_COLUMN_WEIGHTS = {
  landscape: {
    no: 3.5,
    project: 8,
    client: 6.5,
    location: 6.5,
    image: 13,
    nonConformance: 15,
    correctiveAction: 11,
    preventiveAction: 11,
    rootCause: 6,
    owner: 5,
    dueDate: 5,
    coverage: 4,
    remarks: 4,
    status: 4.5
  },
  portrait: {
    no: 3.5,
    project: 7.5,
    client: 6,
    location: 6,
    image: 16,
    nonConformance: 14,
    correctiveAction: 10,
    preventiveAction: 10,
    rootCause: 6,
    owner: 5,
    dueDate: 5,
    coverage: 4,
    remarks: 3.5,
    status: 3.5
  }
};

let customColPercentagesByOrientation = {
  landscape: {},
  portrait: {}
};

function getActiveColumnPercentages(activeCols, orientation){
  if(!customColPercentagesByOrientation[orientation]){
    customColPercentagesByOrientation[orientation] = {};
  }
  const customMap = customColPercentagesByOrientation[orientation];
  const weights = COMPILER_COLUMN_WEIGHTS[orientation] || COMPILER_COLUMN_WEIGHTS.landscape;

  const allCustomExist = activeCols.length > 0 && activeCols.every(col => typeof customMap[col.key] === "number");
  
  if(allCustomExist){
    const currentSum = activeCols.reduce((sum, col) => sum + customMap[col.key], 0);
    if(currentSum > 0){
      const result = {};
      activeCols.forEach(col => {
        result[col.key] = (customMap[col.key] / currentSum) * 100;
      });
      return result;
    }
  }

  // Calculate normalized default percentages summing to 100%
  let totalWeight = 0;
  activeCols.forEach(col => {
    totalWeight += (weights[col.key] || 5);
  });

  const result = {};
  activeCols.forEach(col => {
    const raw = weights[col.key] || 5;
    const pct = totalWeight > 0 ? (raw / totalWeight) * 100 : (100 / activeCols.length);
    result[col.key] = pct;
    customMap[col.key] = pct;
  });
  return result;
}

// Complete 6-column Action Letter summary mapping for Report Compiler
const ACTION_LETTER_COLUMNS = [
  { key: "no", name: "No.", thClass: "nc-no" },
  { key: "finding", name: "Non-Conformance Finding", thClass: "" },
  { key: "rootCause", name: "Root Cause", thClass: "" },
  { key: "correctiveAction", name: "Corrective Action", thClass: "nc-action" },
  { key: "preventiveAction", name: "Preventive Action", thClass: "nc-action" },
  { key: "dueDate", name: "Due Date", thClass: "nc-date" }
];

const ACTION_LETTER_COLUMN_WEIGHTS = {
  portrait: {
    no: 6,
    finding: 34,
    rootCause: 15,
    correctiveAction: 18,
    preventiveAction: 18,
    dueDate: 9
  },
  landscape: {
    no: 5,
    finding: 33,
    rootCause: 16,
    correctiveAction: 19,
    preventiveAction: 19,
    dueDate: 8
  }
};

let customActionLetterColPercentagesByOrientation = {
  portrait: {},
  landscape: {}
};

function getActionLetterColumnPercentages(orientation){
  const orientKey = orientation === "landscape" ? "landscape" : "portrait";
  if(!customActionLetterColPercentagesByOrientation[orientKey]){
    customActionLetterColPercentagesByOrientation[orientKey] = {};
  }
  const customMap = customActionLetterColPercentagesByOrientation[orientKey];
  const weights = ACTION_LETTER_COLUMN_WEIGHTS[orientKey] || ACTION_LETTER_COLUMN_WEIGHTS.portrait;

  const allCustomExist = ACTION_LETTER_COLUMNS.every(col => typeof customMap[col.key] === "number");
  if(allCustomExist){
    const currentSum = ACTION_LETTER_COLUMNS.reduce((sum, col) => sum + customMap[col.key], 0);
    if(currentSum > 0){
      const result = {};
      ACTION_LETTER_COLUMNS.forEach(col => {
        result[col.key] = (customMap[col.key] / currentSum) * 100;
      });
      return result;
    }
  }

  let totalWeight = 0;
  ACTION_LETTER_COLUMNS.forEach(col => {
    totalWeight += (weights[col.key] || 10);
  });

  const result = {};
  ACTION_LETTER_COLUMNS.forEach(col => {
    const raw = weights[col.key] || 10;
    const pct = totalWeight > 0 ? (raw / totalWeight) * 100 : (100 / ACTION_LETTER_COLUMNS.length);
    result[col.key] = pct;
    customMap[col.key] = pct;
  });
  return result;
}

// Interactive Draggable Page Break State & Slicing
let customWirPageBreaks = [];
let customLetterPageBreaks = [];

function getWirPageBreakSlices(items){
  if(!items.length) return [{ items: [], startIndex: 0 }];
  const paginationVal = compilerWirPagination ? compilerWirPagination.value : "auto";
  
  if(paginationVal === "custom" && customWirPageBreaks.length > 0){
    const validBreaks = [...new Set(customWirPageBreaks)]
      .filter(b => b > 0 && b < items.length)
      .sort((a, b) => a - b);
    
    if(validBreaks.length > 0){
      const slices = [];
      let prev = 0;
      validBreaks.forEach(b => {
        slices.push({ items: items.slice(prev, b), startIndex: prev });
        prev = b;
      });
      slices.push({ items: items.slice(prev), startIndex: prev });
      return slices;
    }
  }

  if(paginationVal !== "auto" && paginationVal !== "custom"){
    const rowsPerPage = parseInt(paginationVal, 10) || items.length;
    const slices = [];
    for(let i = 0; i < items.length; i += rowsPerPage){
      slices.push({ items: items.slice(i, i + rowsPerPage), startIndex: i });
    }
    return slices;
  }

  // Smart Auto-pagination: 5 rows per page for landscape, 4 for portrait
  const wirSetting = parsePaperSetting(compilerPaperOrientation ? compilerPaperOrientation.value : "a4-landscape", "a4-landscape");
  const autoRowsPerPage = wirSetting.orientation === "portrait" ? 4 : 5;
  if(items.length > autoRowsPerPage){
    const slices = [];
    for(let i = 0; i < items.length; i += autoRowsPerPage){
      slices.push({ items: items.slice(i, i + autoRowsPerPage), startIndex: i });
    }
    return slices;
  }

  return [{ items: items, startIndex: 0 }];
}

function getLetterPageBreakSlices(items){
  if(!items.length) return [{ items: [], startIndex: 0 }];
  const paginationVal = compilerLetterPagination ? compilerLetterPagination.value : "auto";
  
  if(paginationVal === "custom" && customLetterPageBreaks.length > 0){
    const validBreaks = [...new Set(customLetterPageBreaks)]
      .filter(b => b > 0 && b < items.length)
      .sort((a, b) => a - b);
    
    if(validBreaks.length > 0){
      const slices = [];
      let prev = 0;
      validBreaks.forEach(b => {
        slices.push({ items: items.slice(prev, b), startIndex: prev });
        prev = b;
      });
      slices.push({ items: items.slice(prev), startIndex: prev });
      return slices;
    }
  }

  if(paginationVal !== "auto" && paginationVal !== "custom"){
    const findingsPerPage = parseInt(paginationVal, 10) || items.length;
    const slices = [];
    for(let i = 0; i < items.length; i += findingsPerPage){
      slices.push({ items: items.slice(i, i + findingsPerPage), startIndex: i });
    }
    return slices;
  }

  // Auto mode: 2 findings per letter page so findings, images and signatures never overflow
  const autoFindingsPerPage = 2;
  if(items.length > autoFindingsPerPage){
    const slices = [];
    for(let i = 0; i < items.length; i += autoFindingsPerPage){
      slices.push({ items: items.slice(i, i + autoFindingsPerPage), startIndex: i });
    }
    return slices;
  }

  return [{ items: items, startIndex: 0 }];
}

const COMPILER_COLUMNS = [
  {
    id: "compColNo",
    key: "no",
    name: "No.",
    thClass: "col-no",
    renderTh: (resizerHtml) => `<th class="col-no" data-col-key="no"><div class="th-content">No.</div>${resizerHtml}</th>`,
    renderTd: (item, idx) => `<td class="col-no" style="text-align:center;">${idx + 1}</td>`
  },
  {
    id: "compColProject",
    key: "project",
    name: "Project Name",
    thClass: "col-proj",
    renderTh: (resizerHtml) => `<th class="col-proj" data-col-key="project"><div class="th-content">Project Name</div>${resizerHtml}</th>`,
    renderTd: (item) => `<td class="col-proj"><strong>${escapeHtml(item.projectName)}</strong></td>`
  },
  {
    id: "compColClient",
    key: "client",
    name: "Client",
    thClass: "col-client",
    renderTh: (resizerHtml) => `<th class="col-client" data-col-key="client"><div class="th-content">Client</div>${resizerHtml}</th>`,
    renderTd: (item) => `<td class="col-client">${escapeHtml(item.client)}</td>`
  },
  {
    id: "compColLocation",
    key: "location",
    name: "Location",
    thClass: "col-loc",
    renderTh: (resizerHtml) => `<th class="col-loc" data-col-key="location"><div class="th-content">Location</div>${resizerHtml}</th>`,
    renderTd: (item) => `<td class="col-loc">${escapeHtml(item.projectLocation)}</td>`
  },
  {
    id: "compColImages",
    key: "image",
    name: "Image",
    thClass: "col-img",
    renderTh: (resizerHtml) => `<th class="col-img" data-col-key="image"><div class="th-content">Image</div>${resizerHtml}</th>`,
    renderTd: (item) => `<td class="col-img" style="text-align:center;vertical-align:middle;padding:1px;">${item.image ? `<img class="thumb-img" src="${item.image}" alt="NC Photo">` : `<span class="no-img">No image</span>`}</td>`
  },
  {
    id: "compColNc",
    key: "nonConformance",
    name: "Non-Conformance",
    thClass: "col-nc",
    renderTh: (resizerHtml) => `<th class="col-nc" data-col-key="nonConformance"><div class="th-content">Non-Conformance</div>${resizerHtml}</th>`,
    renderTd: (item) => `<td class="col-nc cell-formatted-text"><strong>${formatCellContent(item.nonConformance)}</strong></td>`
  },
  {
    id: "compColCorrective",
    key: "correctiveAction",
    name: "Corrective Action",
    thClass: "col-ca",
    renderTh: (resizerHtml) => `<th class="col-ca" data-col-key="correctiveAction"><div class="th-content">Corrective Action</div>${resizerHtml}</th>`,
    renderTd: (item) => `<td class="col-ca cell-formatted-text">${formatCellContent(item.correctiveAction)}</td>`
  },
  {
    id: "compColPreventive",
    key: "preventiveAction",
    name: "Preventive Action",
    thClass: "col-pa",
    renderTh: (resizerHtml) => `<th class="col-pa" data-col-key="preventiveAction"><div class="th-content">Preventive Action</div>${resizerHtml}</th>`,
    renderTd: (item) => `<td class="col-pa cell-formatted-text">${formatCellContent(item.preventiveAction)}</td>`
  },
  {
    id: "compColRootCause",
    key: "rootCause",
    name: "Root Cause",
    thClass: "col-rc",
    renderTh: (resizerHtml) => `<th class="col-rc" data-col-key="rootCause"><div class="th-content">Root Cause</div>${resizerHtml}</th>`,
    renderTd: (item) => `<td class="col-rc cell-formatted-text">${formatCellContent(item.rootCause)}</td>`
  },
  {
    id: "compColOwner",
    key: "owner",
    name: "Responsible Party",
    thClass: "col-owner",
    renderTh: (resizerHtml) => `<th class="col-owner" data-col-key="owner"><div class="th-content">Responsible Party</div>${resizerHtml}</th>`,
    renderTd: (item) => `<td class="col-owner" style="text-align:center;">${escapeHtml(item.owner)}</td>`
  },
  {
    id: "compColDueDate",
    key: "dueDate",
    name: "Due Date",
    thClass: "col-due",
    renderTh: (resizerHtml) => `<th class="col-due" data-col-key="dueDate"><div class="th-content">Due Date</div>${resizerHtml}</th>`,
    renderTd: (item) => `<td class="col-due" style="text-align:center;">${escapeHtml(item.dueDate)}</td>`
  },
  {
    id: "compColCoverage",
    key: "coverage",
    name: "Coverage",
    thClass: "col-cov",
    renderTh: (resizerHtml) => `<th class="col-cov" data-col-key="coverage"><div class="th-content">Coverage</div>${resizerHtml}</th>`,
    renderTd: (item) => `<td class="col-cov" style="text-align:center;">${escapeHtml(coverageLabel(item.coverage))}</td>`
  },
  {
    id: "compColRemarks",
    key: "remarks",
    name: "Remarks",
    thClass: "col-remarks",
    renderTh: (resizerHtml) => `<th class="col-remarks" data-col-key="remarks"><div class="th-content">Remarks</div>${resizerHtml}</th>`,
    renderTd: (item) => `<td class="col-remarks cell-formatted-text">${formatCellContent(item.remarks || "")}</td>`
  },
  {
    id: "compColStatus",
    key: "status",
    name: "Status",
    thClass: "col-status",
    renderTh: (resizerHtml) => `<th class="col-status" data-col-key="status"><div class="th-content">Status</div>${resizerHtml}</th>`,
    renderTd: (item) => {
      let statusBadge = "";
      if(item.status === "Closed" && item._isClosedInCoverage){
        statusBadge = `<div class="status-badge-closed-coverage"><div class="status-badge-main">CLOSED</div><div class="status-badge-sub">In Coverage</div></div>`;
      } else {
        statusBadge = `<span class="pill ${statusClass(item.status)}">${escapeHtml(item.status)}</span>`;
      }
      return `<td class="col-status" style="text-align:center;">${statusBadge}</td>`;
    }
  }
];

function getActiveCompilerColumns(){
  return COMPILER_COLUMNS.filter(col => {
    const el = document.getElementById(col.id);
    return el ? el.checked : true;
  });
}

let currentCompilerZoom = 1;
let currentCompilerZoomMode = "fit";

function applyCompilerZoom(modeOrVal){
  const wirSetting = parsePaperSetting(compilerPaperOrientation ? compilerPaperOrientation.value : "a4-landscape", "a4-landscape");
  const alSetting = parsePaperSetting(compilerLetterPaperFormat ? compilerLetterPaperFormat.value : "a4-portrait", "a4-portrait");
  const includeLetters = compilerIncludeActionLetters && compilerIncludeActionLetters.checked;
  
  let sheetWidthPx = wirSetting.widthPx;
  if(includeLetters){
    sheetWidthPx = Math.max(sheetWidthPx, alSetting.widthPx);
  }

  if(modeOrVal === "fit"){
    currentCompilerZoomMode = "fit";
    const availableWidth = Math.max(320, (compilerPreviewScroll ? compilerPreviewScroll.clientWidth : 1000) - 50);
    let fitScale = availableWidth / sheetWidthPx;
    fitScale = Math.min(1.15, Math.max(0.35, fitScale));
    currentCompilerZoom = fitScale;
  } else {
    currentCompilerZoomMode = "manual";
    currentCompilerZoom = Number(modeOrVal) || 1;
  }

  // Update active button state in toolbar
  document.querySelectorAll(".compiler-zoom-controls .zoom-btn").forEach(b => {
    if(currentCompilerZoomMode === "fit"){
      b.classList.toggle("active", b.dataset.zoom === "fit");
    } else {
      b.classList.toggle("active", Number(b.dataset.zoom) === currentCompilerZoom);
    }
  });

  if(compilerPagesContainer){
    compilerPagesContainer.style.transform = `scale(${currentCompilerZoom})`;
    compilerPagesContainer.style.transformOrigin = "top center";
  }
}

function parseDateOnly(dateStr){
  if(!dateStr) return "";
  const s = String(dateStr).trim().slice(0, 10);
  if(/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  return "";
}

function getReportCoverageRange(){
  let start = compilerCoverageStart ? parseDateOnly(compilerCoverageStart.value) : "";
  let end = compilerCoverageEnd ? parseDateOnly(compilerCoverageEnd.value) : "";

  if(!start && !end && compilerCoverageSelect && compilerCoverageSelect.value){
    const covVal = compilerCoverageSelect.value;
    if(isMonthCoverageFilter(covVal)){
      const m = covVal.slice(6);
      const year = new Date().getFullYear();
      start = `${year}-${m}-01`;
      const lastDay = new Date(year, parseInt(m, 10), 0).getDate();
      end = `${year}-${m}-${String(lastDay).padStart(2, '0')}`;
    } else {
      const parts = covVal.split("|").filter(Boolean);
      start = parseDateOnly(parts[0]);
      end = parseDateOnly(parts[1] || parts[0]);
    }
  }
  return { start, end };
}

function updateCompilerProjectOptions(){
  if(!compilerProjectSelect) return;
  if(!Array.isArray(capaData) || capaData.length === 0){
    capaData = JSON.parse(JSON.stringify(seedData));
  }
  const current = compilerProjectSelect.value || (projectFilterEl ? projectFilterEl.value : "") || "";
  const projects = [...new Set(capaData.map(x => x.projectName).filter(Boolean))].sort();
  compilerProjectSelect.innerHTML = '<option value="">All Projects</option>' + projects.map(p => `<option value="${escapeHtml(p)}">${escapeHtml(p)}</option>`).join("");
  if(projects.includes(current)) compilerProjectSelect.value = current;
}

function updateCompilerCoverageOptions(){
  if(!compilerCoverageSelect) return;
  if(!Array.isArray(capaData) || capaData.length === 0){
    capaData = JSON.parse(JSON.stringify(seedData));
  }
  const current = compilerCoverageSelect.value || (coverageFilterEl ? coverageFilterEl.value : "") || "";
  const proj = compilerProjectSelect ? compilerProjectSelect.value : "";
  const values = capaData.filter(x => !proj || x.projectName === proj).map(x => x.coverage).filter(Boolean);
  const weeks = [...new Set(values)].sort();
  const monthOptions = monthCoverageFilters.map(([value,label]) => `<option value="${value}">${label}</option>`).join("");
  const weekOptions = weeks.map((w,i) => `<option value="${escapeHtml(w)}">${escapeHtml(coverageOptionLabel(w,i))}</option>`).join("");
  compilerCoverageSelect.innerHTML = '<option value="">All Coverage Dates (Show All Records)</option><optgroup label="Weekly Coverage">' + weekOptions + '</optgroup><optgroup label="Monthly Coverage">' + monthOptions + '</optgroup>';
  if(weeks.includes(current) || isMonthCoverageFilter(current)){
    compilerCoverageSelect.value = current;
    syncCoverageDatesFromPreset(current);
  } else {
    compilerCoverageSelect.value = "";
    if(compilerCoverageStart) compilerCoverageStart.value = "";
    if(compilerCoverageEnd) compilerCoverageEnd.value = "";
  }
}

function syncCoverageDatesFromPreset(presetVal){
  if(!presetVal){
    if(compilerCoverageStart) compilerCoverageStart.value = "";
    if(compilerCoverageEnd) compilerCoverageEnd.value = "";
    return;
  }
  if(isMonthCoverageFilter(presetVal)){
    const m = presetVal.slice(6);
    const year = new Date().getFullYear();
    const lastDay = new Date(year, parseInt(m, 10), 0).getDate();
    if(compilerCoverageStart) compilerCoverageStart.value = `${year}-${m}-01`;
    if(compilerCoverageEnd) compilerCoverageEnd.value = `${year}-${m}-${String(lastDay).padStart(2, '0')}`;
  } else {
    const parts = presetVal.split("|").filter(Boolean);
    if(compilerCoverageStart) compilerCoverageStart.value = parseDateOnly(parts[0]);
    if(compilerCoverageEnd) compilerCoverageEnd.value = parseDateOnly(parts[1] || parts[0]);
  }
}

function getCompiledData(){
  if(!Array.isArray(capaData) || capaData.length === 0){
    capaData = JSON.parse(JSON.stringify(seedData));
  }

  const project = compilerProjectSelect ? compilerProjectSelect.value.trim() : "";
  const { start: covStart, end: covEnd } = getReportCoverageRange();
  const statusMode = compilerStatusMode ? compilerStatusMode.value : "smart-coverage";
  const excludePrevClosed = compilerExcludePrevClosed ? compilerExcludePrevClosed.checked : true;
  
  const allowOpen = statusMode === "custom" ? (compStatOpen ? compStatOpen.checked : true) : true;
  const allowProgress = statusMode === "custom" ? (compStatProgress ? compStatProgress.checked : true) : true;
  const allowOverdue = statusMode === "custom" ? (compStatOverdue ? compStatOverdue.checked : true) : true;
  const allowClosed = statusMode === "custom" ? (compStatClosed ? compStatClosed.checked : true) : (statusMode !== "active-only");

  let totalAvailable = 0;
  let excludedPrevClosedCount = 0;
  let closedInCoverageCount = 0;
  let openCount = 0;
  let progressCount = 0;
  let overdueCount = 0;

  const filtered = [];

  capaData.forEach(item => {
    if(project && item.projectName && item.projectName.trim().toLowerCase() !== project.toLowerCase()) return;
    totalAvailable++;

    const itemStatus = item.status || "Open";
    const itemParts = String(item.coverage || "").split("|").filter(Boolean);
    const itemStart = parseDateOnly(itemParts[0]);
    const itemEnd = parseDateOnly(itemParts[1] || itemParts[0]);
    const itemDue = parseDateOnly(item.dueDate);

    // Determine if item falls within report coverage date range
    let isWithinCoverage = true;
    if(covStart || covEnd){
      const refStart = itemStart || itemDue || "";
      const refEnd = itemEnd || itemStart || itemDue || "";

      if(covStart && refEnd && refEnd < covStart){
        isWithinCoverage = false;
      } else if(covEnd && refStart && refStart > covEnd){
        isWithinCoverage = false;
      }
    }

    if(itemStatus === "Closed"){
      if(!allowClosed) return;

      if(excludePrevClosed && covStart){
        const closedBefore = (itemEnd && itemEnd < covStart) || (!itemEnd && itemDue && itemDue < covStart);
        if(closedBefore){
          excludedPrevClosedCount++;
        } else if(isWithinCoverage){
          filtered.push({...item, _isClosedInCoverage: true});
          closedInCoverageCount++;
        } else {
          excludedPrevClosedCount++;
        }
      } else {
        filtered.push({...item, _isClosedInCoverage: isWithinCoverage});
        if(isWithinCoverage) closedInCoverageCount++;
      }
    } else {
      // Active statuses (Open, In Progress, Overdue)
      let includeActive = false;
      if(statusMode === "smart-coverage" || statusMode === "active-only"){
        includeActive = true;
      } else if(statusMode === "all"){
        includeActive = (!covStart || isWithinCoverage);
      } else if(statusMode === "custom"){
        if(itemStatus === "Open" && allowOpen) includeActive = true;
        if(itemStatus === "In Progress" && allowProgress) includeActive = true;
        if(itemStatus === "Overdue" && allowOverdue) includeActive = true;
      }

      if(includeActive){
        filtered.push(item);
        if(itemStatus === "Open") openCount++;
        else if(itemStatus === "In Progress") progressCount++;
        else if(itemStatus === "Overdue") overdueCount++;
      }
    }
  });

  return {
    items: filtered,
    totalAvailable,
    excludedPrevClosedCount,
    closedInCoverageCount,
    openCount,
    progressCount,
    overdueCount,
    project,
    covStart,
    covEnd
  };
}

function updateCompilerStats(data){
  if(!compilerStatsPills) return;
  const total = data.items.length;
  const active = data.openCount + data.progressCount + data.overdueCount;

  let pillsHtml = `
    <span class="c-stat-pill info"><strong>Total:</strong> ${total} to print</span>
    <span class="c-stat-pill warning"><strong>Active:</strong> ${active}</span>
    <span class="c-stat-pill success"><strong>Resolved in Coverage:</strong> ${data.closedInCoverageCount}</span>
  `;

  if(data.excludedPrevClosedCount > 0){
    pillsHtml += `<span class="c-stat-pill muted" title="Issues closed before coverage start date are hidden from this report"><strong>Excluded Prev Closed:</strong> ${data.excludedPrevClosedCount}</span>`;
  }

  compilerStatsPills.innerHTML = pillsHtml;

  const coverageRangeText = (data.covStart && data.covEnd) ? `${formatDateNice(data.covStart)} – ${formatDateNice(data.covEnd)}` : (data.covStart ? `From ${formatDateNice(data.covStart)}` : 'All Dates');
  if(compilerPreviewStatus){
    const wirSetting = parsePaperSetting(compilerPaperOrientation ? compilerPaperOrientation.value : "a4-landscape", "a4-landscape");
    const alSetting = parsePaperSetting(compilerLetterPaperFormat ? compilerLetterPaperFormat.value : "a4-portrait", "a4-portrait");
    const includeLetters = compilerIncludeActionLetters && compilerIncludeActionLetters.checked;
    const formatInfo = includeLetters ? `WIR: ${wirSetting.name} | AL: ${alSetting.name}` : `WIR: ${wirSetting.name}`;
    compilerPreviewStatus.textContent = `Live Preview • ${formatInfo} • ${total} Record${total === 1 ? '' : 's'} (${coverageRangeText})`;
  }

  if(compilerRuleText){
    if(data.covStart && data.covEnd){
      compilerRuleText.innerHTML = `<strong>Report Coverage:</strong> ${formatDateNice(data.covStart)} to ${formatDateNice(data.covEnd)}.<br>Issues resolved/closed within this coverage are <strong>INCLUDED</strong>. Issues closed prior to ${formatDateNice(data.covStart)} are <strong>EXCLUDED</strong>.`;
    } else if(data.covStart){
      compilerRuleText.innerHTML = `<strong>Report Coverage:</strong> Starting ${formatDateNice(data.covStart)}.<br>Issues closed prior to ${formatDateNice(data.covStart)} are <strong>EXCLUDED</strong>.`;
    } else {
      compilerRuleText.innerHTML = `<strong>Coverage Closure Rule:</strong> Issues resolved/closed within the report coverage are <strong>INCLUDED</strong>. Issues closed in previous weeks are <strong>EXCLUDED</strong>.`;
    }
  }
}

function generateCompiledRegistryHtml(compiledResult){
  const items = compiledResult.items;
  const project = compiledResult.project;
  const covStart = compiledResult.covStart;
  const covEnd = compiledResult.covEnd;

  const docTitle = compilerDocTitle ? compilerDocTitle.value.trim() : "WEEKLY INSPECTION REPORT";
  const docCode = compilerDocCode ? compilerDocCode.value.trim() : "QAQC- WIR - TABLE 2";
  const revNo = compilerRevNo ? compilerRevNo.value.trim() : "Rev. No. : 0";
  const effDate = compilerEffDate ? compilerEffDate.value.trim() : "Eff. Date: 11/10/2025";
  const wirSetting = parsePaperSetting(compilerPaperOrientation ? compilerPaperOrientation.value : "a4-landscape", "a4-landscape");
  const orientation = wirSetting.orientation;

  const activeCols = getActiveCompilerColumns();
  const colPercentages = getActiveColumnPercentages(activeCols, orientation);

  const distinctClients = [...new Set(items.map(x => x.client).filter(Boolean))];
  const distinctLocs = [...new Set(items.map(x => x.projectLocation).filter(Boolean))];

  const clientText = distinctClients.length ? distinctClients.join(", ") : (clientInput && clientInput.value ? clientInput.value : "All Clients");
  const locText = distinctLocs.length ? distinctLocs.join(", ") : (projectLocationInput && projectLocationInput.value ? projectLocationInput.value : "All Locations");
  const projectText = project || "All Projects";
  const coverageText = (covStart && covEnd) ? `${formatDateNice(covStart)} – ${formatDateNice(covEnd)}` : (covStart ? `From ${formatDateNice(covStart)}` : "All Coverage Periods");
  const todayText = new Date().toLocaleDateString("en-US", {year:"numeric", month:"short", day:"numeric"});

  let colgroupHtml = "<colgroup>" + activeCols.map(col => {
    const pct = colPercentages[col.key] || (100 / activeCols.length);
    return `<col data-col-key="${col.key}" style="width:${pct.toFixed(3)}%;">`;
  }).join("") + "</colgroup>";

  let ths = activeCols.map((col, idx) => {
    const isLast = idx === activeCols.length - 1;
    // Every column gets a resizer! If it's the last column, dragging its right boundary resizes the pair (N-2, N-1)
    const resizerIdx = isLast ? Math.max(0, activeCols.length - 2) : idx;
    const resizerHtml = activeCols.length > 1 ? `<div class="col-resizer" data-col-index="${resizerIdx}" data-col-key="${col.key}" title="Drag left/right to adjust column widths"></div>` : '';
    return col.renderTh(resizerHtml);
  }).join("");

  // Sort items by project name when All Projects is selected
  let orderedItems = [...items];
  if(!project){
    orderedItems.sort((a, b) => (a.projectName || "").localeCompare(b.projectName || ""));
  }

  // Pre-calculate per-project stats for 1-row 5 KPI cards
  const projectStats = {};
  orderedItems.forEach(item => {
    const pName = (item.projectName || "Unassigned Project").trim();
    if(!projectStats[pName]){
      projectStats[pName] = {
        name: pName,
        client: item.client || "",
        location: item.projectLocation || "",
        total: 0,
        open: 0,
        progress: 0,
        overdue: 0,
        closed: 0,
        items: []
      };
    }
    if(!projectStats[pName].client && item.client) projectStats[pName].client = item.client;
    if(!projectStats[pName].location && item.projectLocation) projectStats[pName].location = item.projectLocation;
    
    projectStats[pName].total++;
    const st = (item.status || "Open").trim().toLowerCase();
    if(st === "closed") projectStats[pName].closed++;
    else if(st === "in progress" || st === "progress") projectStats[pName].progress++;
    else if(st === "overdue") projectStats[pName].overdue++;
    else projectStats[pName].open++;
    
    projectStats[pName].items.push(item);
  });

  function renderProjectKpiCards(stats){
    if(!stats) return "";
    return `
      <div class="project-kpi-row">
        <div class="proj-kpi-card proj-kpi-total">
          <div class="proj-kpi-label">TOTAL CAPA</div>
          <div class="proj-kpi-val">${stats.total}</div>
        </div>
        <div class="proj-kpi-card proj-kpi-open">
          <div class="proj-kpi-label">OPEN</div>
          <div class="proj-kpi-val">${stats.open}</div>
        </div>
        <div class="proj-kpi-card proj-kpi-progress">
          <div class="proj-kpi-label">IN PROGRESS</div>
          <div class="proj-kpi-val">${stats.progress}</div>
        </div>
        <div class="proj-kpi-card proj-kpi-overdue">
          <div class="proj-kpi-label">OVERDUE</div>
          <div class="proj-kpi-val">${stats.overdue}</div>
        </div>
        <div class="proj-kpi-card proj-kpi-closed">
          <div class="proj-kpi-label">CLOSED</div>
          <div class="proj-kpi-val">${stats.closed}</div>
        </div>
      </div>
    `;
  }

  // Transmittal variables with persistent customization support
  const allProjectNames = Object.keys(projectStats).filter(Boolean);
  const projectNamesListText = allProjectNames.length ? allProjectNames.join(", ") : (projectText || "All Ongoing Projects");

  const defaultRecipientTo = !project
    ? `Attention: FCLDC - President, CEO, BOD's\nProject Names: ${projectNamesListText}\nScope: Weekly QA/QC Inspection & Verification Scope`
    : `Attention: FCLDC - President, CEO, BOD's\nProject Name: ${projectText}\nScope: Weekly QA/QC Inspection & Verification Scope`;
  
  const recipientToText = (typeof window._compilerCustomTransmittalTo === "string" && window._compilerCustomTransmittalTo.trim()) 
    ? window._compilerCustomTransmittalTo 
    : defaultRecipientTo;

  const ccOm = (typeof window._compilerCustomCcOm === "string" && window._compilerCustomCcOm.trim()) ? window._compilerCustomCcOm : "Operations Manager";
  const ccPm = (typeof window._compilerCustomCcPm === "string" && window._compilerCustomCcPm.trim()) ? window._compilerCustomCcPm : "Project Manager";
  const ccQs = (typeof window._compilerCustomCcQs === "string" && window._compilerCustomCcQs.trim()) ? window._compilerCustomCcQs : "Quantity Surveyor";
  const ccLead = (typeof window._compilerCustomCcLead === "string" && window._compilerCustomCcLead.trim()) ? window._compilerCustomCcLead : "Lead Project Engineer";

  const totalFindingsCount = items.length;
  const projectCount = Object.keys(projectStats).length;

  const defaultBodyText = !project
    ? `We submit herewith the consolidated Weekly Inspection Report (WIR) covering all active construction projects for the period of ${coverageText}. A total of ${totalFindingsCount} quality inspection observation(s) and non-conformance item(s) across ${projectCount} project(s) have been verified and documented on site. Site execution teams and responsible parties are requested to review the project breakdowns below and enforce the corresponding corrective and preventive actions on or before the specified due dates.`
    : `We submit herewith the Weekly Inspection Report (WIR) for ${projectText} covering the inspection period of ${coverageText}. A total of ${totalFindingsCount} quality observation(s) and non-conformance finding(s) have been verified on site. Site execution teams and responsible parties are requested to review and strictly implement the containment, corrective, and preventive measures outlined in the table below on or before their respective target dates.`;

  const transmittalBodyText = (typeof window._compilerCustomTransmittalBody === "string" && window._compilerCustomTransmittalBody.trim())
    ? window._compilerCustomTransmittalBody
    : defaultBodyText;

  const transmittalMemoHtml = `
    <div class="compiled-transmittal-memo">
      <div class="transmittal-memo-header">
        <div class="transmittal-to-box">
          <div class="transmittal-field-title"><i class="fas fa-user-tag"></i> TO / RECIPIENT:</div>
          <div class="transmittal-recipient-content" contenteditable="true" id="compilerTransmittalTo" title="Click to edit Recipient & Project Names">${escapeHtml(recipientToText)}</div>
        </div>
        <div class="transmittal-meta-box">
          <div class="transmittal-meta-row">
            <span class="tm-label">COVERAGE:</span>
            <span class="tm-val">${escapeHtml(coverageText)}</span>
          </div>
          <div class="transmittal-meta-row">
            <span class="tm-label">SUBJECT:</span>
            <span class="tm-val"><strong>${escapeHtml(docTitle)} — ${escapeHtml(projectText)}</strong></span>
          </div>
          <div class="transmittal-cc-row">
            <span class="tm-label">CC:</span>
            <div class="transmittal-cc-list">
              <span class="cc-pill"><strong>OM:</strong> <span contenteditable="true" class="cc-editable" data-cc="om" title="Click to edit OM">${escapeHtml(ccOm)}</span></span>
              <span class="cc-pill"><strong>PM:</strong> <span contenteditable="true" class="cc-editable" data-cc="pm" title="Click to edit PM">${escapeHtml(ccPm)}</span></span>
              <span class="cc-pill"><strong>Lead Project:</strong> <span contenteditable="true" class="cc-editable" data-cc="lead" title="Click to edit Lead Project">${escapeHtml(ccLead)}</span></span>
            </div>
          </div>
        </div>
      </div>
      <div class="transmittal-letter-body-wrap">
        <div class="transmittal-letter-body" contenteditable="true" id="compilerTransmittalBody" title="Click to edit transmittal summary letter">${escapeHtml(transmittalBodyText)}</div>
      </div>
    </div>
  `;

  const sheets = getWirPageBreakSlices(orderedItems);

  let wirHtml = "";
  sheets.forEach((sheetObj, sheetIdx) => {
    const sheetItems = sheetObj.items;
    const sheetStartIndex = sheetObj.startIndex;
    const isFirstSheet = sheetIdx === 0;
    const isLastSheet = sheetIdx === sheets.length - 1;
    const isMultiSheet = sheets.length > 1;
    const pageNumText = isMultiSheet ? `Sheet ${sheetIdx + 1} of ${sheets.length}` : "";

    let bodyContentHtml = "";

    if(sheetItems.length > 0){
      if(activeCols.length > 0){
        if(!project){
          // Group sheet items by project
          const sheetProjects = {};
          sheetItems.forEach((item, localIdx) => {
            const pName = (item.projectName || "Unassigned Project").trim();
            if(!sheetProjects[pName]) sheetProjects[pName] = [];
            sheetProjects[pName].push({ item, globalIdx: sheetStartIndex + localIdx });
          });

          bodyContentHtml = Object.keys(sheetProjects).map(pName => {
            const pGroup = sheetProjects[pName];
            const pStats = projectStats[pName] || { name: pName, total: pGroup.length, open: 0, progress: 0, overdue: 0, closed: 0, client: pGroup[0].item.client, location: pGroup[0].item.projectLocation };
            
            const rowsHtml = pGroup.map(({ item, globalIdx }) => {
              const tds = activeCols.map(col => col.renderTd(item, globalIdx)).join("");
              const isNotFirstGlobalRow = globalIdx > 0;
              const quickBreakBtn = isNotFirstGlobalRow ? `
                <button type="button" class="row-page-break-trigger no-print" data-insert-wir-break="${globalIdx}" title="Insert Page Break before Row #${globalIdx + 1}">
                  ✂
                </button>
              ` : '';
              const dropGuideRow = `<tr class="page-break-drop-row no-print" data-drop-wir-idx="${globalIdx}"><td colspan="${activeCols.length}" class="page-break-drop-cell"><div class="page-break-drop-guide" data-drop-wir-idx="${globalIdx}"><span>⬇ Drop to Break Page before Row #${globalIdx + 1}</span></div></td></tr>`;

              return `
                ${dropGuideRow}
                <tr data-wir-row-idx="${globalIdx}">
                  ${tds}
                  ${quickBreakBtn}
                </tr>
              `;
            }).join("");

            return `
              <div class="compiled-project-section">
                <div class="compiled-project-banner">
                  <div class="compiled-project-banner-title">
                    <span class="proj-banner-label">PROJECT:</span>
                    <span class="proj-banner-name">${escapeHtml(pName)}</span>
                  </div>
                  <div class="compiled-project-banner-meta">
                    <span><strong>Client:</strong> ${escapeHtml(pStats.client || "N/A")}</span>
                    <span><strong>Location:</strong> ${escapeHtml(pStats.location || "N/A")}</span>
                  </div>
                </div>
                ${renderProjectKpiCards(pStats)}
                <table class="compiled-table">
                  ${colgroupHtml}
                  <thead><tr>${ths}</tr></thead>
                  <tbody>${rowsHtml}</tbody>
                </table>
              </div>
            `;
          }).join("");

        } else {
          // Single project selected
          const pStats = projectStats[project] || { total: sheetItems.length, open: 0, progress: 0, overdue: 0, closed: 0 };
          const rowsHtml = sheetItems.map((item, localIdx) => {
            const globalIdx = sheetStartIndex + localIdx;
            const tds = activeCols.map(col => col.renderTd(item, globalIdx)).join("");
            const isNotFirstGlobalRow = globalIdx > 0;
            const quickBreakBtn = isNotFirstGlobalRow ? `
              <button type="button" class="row-page-break-trigger no-print" data-insert-wir-break="${globalIdx}" title="Insert Page Break before Row #${globalIdx + 1}">
                ✂
              </button>
            ` : '';
            const dropGuideRow = `<tr class="page-break-drop-row no-print" data-drop-wir-idx="${globalIdx}"><td colspan="${activeCols.length}" class="page-break-drop-cell"><div class="page-break-drop-guide" data-drop-wir-idx="${globalIdx}"><span>⬇ Drop to Break Page before Row #${globalIdx + 1}</span></div></td></tr>`;

            return `
              ${dropGuideRow}
              <tr data-wir-row-idx="${globalIdx}">
                ${tds}
                ${quickBreakBtn}
              </tr>
            `;
          }).join("");

          bodyContentHtml = `
            ${isFirstSheet ? renderProjectKpiCards(pStats) : ''}
            <table class="compiled-table" id="compiledRegistryTable">
              ${colgroupHtml}
              <thead><tr>${ths}</tr></thead>
              <tbody>${rowsHtml}</tbody>
            </table>
          `;
        }
      } else {
        bodyContentHtml = `<div style="text-align:center;padding:24px;color:#64748b;font-weight:700;">No column headers selected. Please check at least one column above.</div>`;
      }
    } else {
      const colCount = Math.max(1, activeCols.length);
      bodyContentHtml = `<table class="compiled-table"><thead><tr>${ths}</tr></thead><tbody><tr><td colspan="${colCount}" style="text-align:center;padding:24px;color:#64748b;font-weight:700;">No CAPA items match the selected project and coverage dates.</td></tr></tbody></table>`;
    }

    const separatorHtml = isFirstSheet ? "" : `
      <div class="compiled-page-separator draggable-page-break no-print" draggable="true" data-drag-break-type="wir" data-break-index="${sheetStartIndex}" data-sheet-index="${sheetIdx}" title="Drag up or down over rows to adjust page break position">
        <div class="page-break-left">
          <span class="page-break-handle-icon">⋮⋮</span>
          <span class="page-break-badge"><i class="fas fa-arrows-alt-v"></i> PAGE BREAK PREVIEW • SHEET ${sheetIdx + 1} OF ${sheets.length}</span>
          <span class="page-break-subtext">(Drag up/down to move break line)</span>
        </div>
        <div class="page-break-actions">
          <button type="button" class="page-break-remove-btn" data-remove-wir-break="${sheetStartIndex}" title="Remove this page break and merge with previous sheet">✕ Remove Break</button>
        </div>
      </div>
    `;

    const sheetHeaderBadgeHtml = `
      <div class="page-sheet-header-badge no-print">
        <div class="page-sheet-badge-title">
          <span class="page-num-pill">PAGE ${sheetIdx + 1} OF ${sheets.length}</span>
          <span class="page-sheet-doc-name">WEEKLY INSPECTION REPORT</span>
          <span class="page-sheet-dim">(${escapeHtml(wirSetting.name)})</span>
        </div>
        <div class="page-sheet-badge-actions">
          ${sheetItems.length > 1 ? `
            <button type="button" class="btn-sheet-action btn-sheet-add-break" data-wir-sheet-add-break="${sheetIdx}" title="Add a page break on this sheet to split rows across pages">
              ✂ + Add Page Break
            </button>
          ` : ''}
          ${!isFirstSheet ? `
            <button type="button" class="btn-sheet-action btn-sheet-remove-break" data-remove-wir-break="${sheetStartIndex}" title="Merge this page with the previous page">
              ✕ Merge Sheet
            </button>
          ` : ''}
        </div>
      </div>
    `;

    // The formal title header table and transmittal memo are rendered ONLY on the first page!
    const pageHeaderHtml = isFirstSheet ? `
      <table class="compiled-registry-header">
        <colgroup>
          <col style="width: 58mm;">
          <col style="width: auto;">
          <col style="width: 52mm;">
        </colgroup>
        <tr>
          <td class="compiled-logo-cell">
            <img src="assets/registry_print_logo.png" alt="FCL Aranangg and Quality Management Logos">
          </td>
          <td class="compiled-title-cell">
            <div>${escapeHtml(docTitle)}</div>
            ${isMultiSheet ? `<div style="font-size:7.5pt;font-weight:700;color:#64748b;margin-top:2px;">${pageNumText}</div>` : ''}
          </td>
          <td class="compiled-meta-cell">
            <div>${escapeHtml(docCode)}</div>
            <div>${escapeHtml(revNo)}</div>
            <div>${escapeHtml(effDate)}</div>
            <div>Date Reported: ${escapeHtml(todayText)}</div>
          </td>
        </tr>
      </table>

      ${transmittalMemoHtml}
    ` : `
      <div class="compiled-sheet-running-header">
        <div class="running-header-left">
          <span class="running-doc-title">WEEKLY INSPECTION REPORT</span>
          <span class="running-doc-code">${escapeHtml(docCode)}</span>
        </div>
        <div class="running-header-right">
          <span class="running-cov-period">${escapeHtml(coverageText)}</span>
          <span class="running-page-num">${pageNumText}</span>
        </div>
      </div>
    `;

    // Formal QAQC Team Sign-off block rendered on the LAST sheet only!
    const wirSignoffHtml = isLastSheet ? `
      <div class="wir-signoff-section">
        <div class="wir-signoff-header">
          <span class="wir-signoff-title">PREPARED BY: QAQC TEAM</span>
        </div>
        <div class="wir-signoff-grid">
          <div class="wir-sign-box">
            <div class="wir-sign-role">QAQC Engineer 1</div>
            <div class="sign-line">
              <label class="signature-upload-box">
                <input type="file" accept="image/*" class="signature-input" data-target="wir_qaqc_eng1">
                <span class="signature-upload-hint">CLICK TO UPLOAD SIGNATURE</span>
                <img class="signature-preview" data-preview="wir_qaqc_eng1" alt="QAQC Engineer 1 Signature">
              </label>
              <div class="signature-name-line">
                <input type="text" value="Engr. Alyssa Claire Estrera" placeholder="Engr. Alyssa Claire Estrera">
              </div>
              <div class="signature-date-row"><strong>Date:</strong> <input type="date" class="signature-date-input" value="${new Date().toISOString().slice(0,10)}"></div>
            </div>
          </div>

          <div class="wir-sign-box">
            <div class="wir-sign-role">QAQC Superintendent 1</div>
            <div class="sign-line">
              <label class="signature-upload-box">
                <input type="file" accept="image/*" class="signature-input" data-target="wir_qaqc_supt1">
                <span class="signature-upload-hint">CLICK TO UPLOAD SIGNATURE</span>
                <img class="signature-preview" data-preview="wir_qaqc_supt1" alt="QAQC Superintendent 1 Signature">
              </label>
              <div class="signature-name-line">
                <input type="text" value="Jemmer Guilao" placeholder="Jemmer Guilao">
              </div>
              <div class="signature-date-row"><strong>Date:</strong> <input type="date" class="signature-date-input" value="${new Date().toISOString().slice(0,10)}"></div>
            </div>
          </div>

          <div class="wir-sign-box">
            <div class="wir-sign-role">QAQC Manager 1</div>
            <div class="sign-line">
              <label class="signature-upload-box">
                <input type="file" accept="image/*" class="signature-input" data-target="wir_qaqc_mgr1">
                <span class="signature-upload-hint">CLICK TO UPLOAD SIGNATURE</span>
                <img class="signature-preview" data-preview="wir_qaqc_mgr1" alt="QAQC Manager 1 Signature">
              </label>
              <div class="signature-name-line">
                <input type="text" value="QAQC Manager" placeholder="QAQC Manager">
              </div>
              <div class="signature-date-row"><strong>Date:</strong> <input type="date" class="signature-date-input" value="${new Date().toISOString().slice(0,10)}"></div>
            </div>
          </div>
        </div>
      </div>
    ` : '';

    const sheetBottomBarHtml = `
      <div class="sheet-bottom-break-bar no-print">
        <span class="sheet-row-info">Sheet ${sheetIdx + 1}: Rows #${sheetStartIndex + 1} to #${sheetStartIndex + sheetItems.length} (${sheetItems.length} items on this page)</span>
        <div style="display:flex;align-items:center;gap:6px;">
          ${sheetItems.length > 1 ? `
            <button type="button" class="btn-sheet-action btn-sheet-add-break" data-wir-sheet-add-break="${sheetIdx}" title="Split this sheet">
              ✂ Split Sheet Here
            </button>
          ` : ''}
        </div>
      </div>
    `;

    wirHtml += `
      ${separatorHtml}
      ${sheetHeaderBadgeHtml}
      <div class="compiled-doc-sheet wir-sheet ${wirSetting.paperClass}">
        <div class="compiled-sheet-inner">
          ${pageHeaderHtml}
          ${bodyContentHtml}
          ${wirSignoffHtml}
          ${sheetBottomBarHtml}
        </div>
      </div>
    `;
  });

  return wirHtml;
}

function generateCompiledActionLetterHtml(compiledResult){
  const items = compiledResult.items;
  const sourceMode = compilerLetterSource ? compilerLetterSource.value : "auto";
  const includePhotos = compilerLetterPhotos ? compilerLetterPhotos.checked : true;
  const alSetting = parsePaperSetting(compilerLetterPaperFormat ? compilerLetterPaperFormat.value : "a4-portrait", "a4-portrait");

  let lettersHtml = "";

  if(sourceMode === "auto" || sourceMode === "both"){
    if(items.length > 0){
      const itemsForLetter = items.map((item, i) => ({
        ...item,
        _regNo: i + 1,
        image: includePhotos ? item.image : ""
      }));

      const letterSheets = getLetterPageBreakSlices(itemsForLetter);

      letterSheets.forEach((sheetObj, batchIdx) => {
        const batchItems = sheetObj.items;
        const sheetStartIndex = sheetObj.startIndex;
        let rawLetterHtml = buildActionLetter(batchItems, {
          isCompiler: true,
          orientation: alSetting.orientation
        });
        
        if(compilerHasActionLetterBreak && letterSheets.length === 1){
          const pbHtml = `
            <div class="letter-page-break" contenteditable="false" draggable="true">
              <div class="page-break-toolbar no-print">
                <span class="page-break-title">✂ PAGE BREAK PREVIEW (Action Letter splits to Page 2 here when printed)</span>
                <div class="page-break-buttons">
                  <button type="button" class="btn-pb-move-up" title="Move page break higher">▲ Move Up</button>
                  <button type="button" class="btn-pb-move-down" title="Move page break lower">▼ Move Down</button>
                  <button type="button" class="btn-pb-remove" title="Remove this page break">✕ Remove</button>
                </div>
              </div>
            </div>
          `;
          if(rawLetterHtml.includes('<div class="signature-block-container">')){
            rawLetterHtml = rawLetterHtml.replace('<div class="signature-block-container">', pbHtml + '<div class="signature-block-container">');
          } else {
            rawLetterHtml += pbHtml;
          }
        }
        
        const partText = letterSheets.length > 1 ? ` • Part ${batchIdx + 1} of ${letterSheets.length}` : "";
        const removeBreakBtn = batchIdx > 0 ? `
          <div class="page-break-actions">
            <button type="button" class="page-break-remove-btn" data-remove-letter-break="${sheetStartIndex}" title="Remove this page break and merge with previous sheet">✕ Remove Break</button>
          </div>
        ` : '';

        const letterHeaderBadgeHtml = `
          <div class="page-sheet-header-badge no-print">
            <div class="page-sheet-badge-title">
              <span class="page-num-pill">PAGE ${batchIdx + 1} OF ${letterSheets.length}</span>
              <span class="page-sheet-doc-name">ACTION LETTER</span>
              <span class="page-sheet-dim">(${escapeHtml(alSetting.name)})</span>
            </div>
            <div class="page-sheet-badge-actions">
              <button type="button" class="btn-sheet-action btn-sheet-add-break" data-action-letter-add-break="true" title="Insert adjustable page break into Action Letter">
                ✂ + Add Page Break
              </button>
              ${batchIdx > 0 ? `
                <button type="button" class="btn-sheet-action btn-sheet-remove-break" data-remove-letter-break="${sheetStartIndex}" title="Remove this page break and merge with previous sheet">
                  ✕ Merge Sheet
                </button>
              ` : ''}
            </div>
          </div>
        `;

        lettersHtml += `
          ${batchIdx > 0 ? `
            <div class="compiled-page-separator draggable-page-break no-print" draggable="true" data-drag-break-type="letter" data-break-index="${sheetStartIndex}" data-sheet-index="${batchIdx}" title="Action Letter Page Break Preview">
              <div class="page-break-left">
                <span class="page-break-handle-icon">⋮⋮</span>
                <span class="page-break-badge"><i class="fas fa-arrows-alt-v"></i> PAGE BREAK PREVIEW • COMPILED ACTION LETTER${partText} (${escapeHtml(alSetting.name)})</span>
              </div>
              ${removeBreakBtn}
            </div>
          ` : ''}
          ${letterHeaderBadgeHtml}
          <div class="compiled-doc-sheet action-letter-sheet ${alSetting.paperClass}">
            <div class="letter-a4-preview">${rawLetterHtml}</div>
          </div>
        `;
      });
    }
  }

  if(sourceMode === "saved" || sourceMode === "both"){
    const project = compiledResult.project;
    const covStart = compiledResult.covStart;
    const covEnd = compiledResult.covEnd;
    const matchingLetters = actionLetters.filter(al => (!project || al.projectName === project));

    if(matchingLetters.length > 0){
      matchingLetters.forEach((al, idx) => {
        lettersHtml += `
          <div class="compiled-page-separator no-print"><span>PAGE BREAK • SAVED ACTION LETTER (${escapeHtml(al.letterNo || 'Letter #' + (idx + 1))} • ${escapeHtml(alSetting.name)})</span></div>
          <div class="compiled-doc-sheet action-letter-sheet ${alSetting.paperClass}">
            <div class="letter-a4-preview">${al.html}</div>
          </div>
        `;
      });
    } else if(sourceMode === "saved"){
      lettersHtml += `
        <div class="compiled-page-separator no-print"><span>PAGE BREAK • ACTION LETTER</span></div>
        <div class="compiled-doc-sheet action-letter-sheet ${alSetting.paperClass}" style="padding:40px;text-align:center;color:#64748b;">
          <h3>No saved action letters found matching ${project ? escapeHtml(project) : 'the project'}.</h3>
          <p>Switch Action Letter Mode to "Auto-compile findings into Action Letter" to automatically generate one.</p>
        </div>
      `;
    }
  }

  return lettersHtml;
}

function bindCompilerColumnResizers(){
  if(!compilerPrintArea) return;

  // 1. Weekly Inspection Report Table Resizers
  const wirResizers = compilerPrintArea.querySelectorAll(".col-resizer");
  wirResizers.forEach(resizer => {
    resizer.addEventListener("mousedown", function(e){
      e.preventDefault();
      e.stopPropagation();

      const colIdx = parseInt(this.dataset.colIndex, 10);
      const activeCols = getActiveCompilerColumns();
      if(isNaN(colIdx) || colIdx < 0 || colIdx >= activeCols.length - 1) return;

      const wirSetting = parsePaperSetting(compilerPaperOrientation ? compilerPaperOrientation.value : "a4-landscape", "a4-landscape");
      const orientation = wirSetting.orientation;
      const colPercentages = getActiveColumnPercentages(activeCols, orientation);

      const colLeft = activeCols[colIdx];
      const colRight = activeCols[colIdx + 1];

      const allWirTables = compilerPrintArea.querySelectorAll(".compiled-table");
      if(!allWirTables.length) return;

      const table = this.closest("table") || allWirTables[0];
      const tableWidthPx = table.offsetWidth;
      if(!tableWidthPx) return;

      const startX = e.pageX;
      const initialPctLeft = colPercentages[colLeft.key];
      const initialPctRight = colPercentages[colRight.key];
      const combinedPct = initialPctLeft + initialPctRight;

      // Minimum percentage for each column (~20px)
      const minPct = Math.max(1.5, (20 / tableWidthPx) * 100);

      const activeResizer = this;
      activeResizer.classList.add("resizing");
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";

      function onMouseMove(e){
        const zoom = currentCompilerZoom || 1;
        const diffPx = (e.pageX - startX) / zoom;
        const diffPct = (diffPx / tableWidthPx) * 100;

        let newPctLeft = initialPctLeft + diffPct;
        
        if(newPctLeft < minPct){
          newPctLeft = minPct;
        } else if(newPctLeft > combinedPct - minPct){
          newPctLeft = combinedPct - minPct;
        }

        const newPctRight = combinedPct - newPctLeft;

        // Save percentages to state
        colPercentages[colLeft.key] = newPctLeft;
        colPercentages[colRight.key] = newPctRight;

        if(!customColPercentagesByOrientation[orientation]){
          customColPercentagesByOrientation[orientation] = {};
        }
        customColPercentagesByOrientation[orientation][colLeft.key] = newPctLeft;
        customColPercentagesByOrientation[orientation][colRight.key] = newPctRight;

        // Live update widths in all WIR tables
        allWirTables.forEach(tbl => {
          const colElLeft = tbl.querySelector(`col[data-col-key="${colLeft.key}"]`);
          const colElRight = tbl.querySelector(`col[data-col-key="${colRight.key}"]`);
          if(colElLeft) colElLeft.style.width = newPctLeft.toFixed(3) + "%";
          if(colElRight) colElRight.style.width = newPctRight.toFixed(3) + "%";
        });
      }

      function onMouseUp(){
        activeResizer.classList.remove("resizing");
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      }

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    });
  });

  // 2. Action Letter Summary Table Resizers
  const alResizers = compilerPrintArea.querySelectorAll(".al-col-resizer");
  alResizers.forEach(resizer => {
    resizer.addEventListener("mousedown", function(e){
      e.preventDefault();
      e.stopPropagation();

      const colIdx = parseInt(this.dataset.alColIndex, 10);
      if(isNaN(colIdx) || colIdx < 0 || colIdx >= ACTION_LETTER_COLUMNS.length - 1) return;

      const alSetting = parsePaperSetting(compilerLetterPaperFormat ? compilerLetterPaperFormat.value : "a4-portrait", "a4-portrait");
      const orientation = alSetting.orientation;
      const colPercentages = getActionLetterColumnPercentages(orientation);

      const colLeft = ACTION_LETTER_COLUMNS[colIdx];
      const colRight = ACTION_LETTER_COLUMNS[colIdx + 1];

      const table = this.closest(".nc-summary-table");
      if(!table) return;

      const tableWidthPx = table.offsetWidth;
      if(!tableWidthPx) return;

      const startX = e.pageX;
      const initialPctLeft = colPercentages[colLeft.key];
      const initialPctRight = colPercentages[colRight.key];
      const combinedPct = initialPctLeft + initialPctRight;

      // Minimum percentage for each column (~20px)
      const minPct = Math.max(2, (20 / tableWidthPx) * 100);

      const activeResizer = this;
      activeResizer.classList.add("resizing");
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";

      const allAlTables = compilerPrintArea.querySelectorAll(".nc-summary-table");

      function onMouseMove(e){
        const zoom = currentCompilerZoom || 1;
        const diffPx = (e.pageX - startX) / zoom;
        const diffPct = (diffPx / tableWidthPx) * 100;

        let newPctLeft = initialPctLeft + diffPct;
        
        if(newPctLeft < minPct){
          newPctLeft = minPct;
        } else if(newPctLeft > combinedPct - minPct){
          newPctLeft = combinedPct - minPct;
        }

        const newPctRight = combinedPct - newPctLeft;

        // Save percentages to state
        colPercentages[colLeft.key] = newPctLeft;
        colPercentages[colRight.key] = newPctRight;

        const orientKey = orientation === "landscape" ? "landscape" : "portrait";
        if(!customActionLetterColPercentagesByOrientation[orientKey]){
          customActionLetterColPercentagesByOrientation[orientKey] = {};
        }
        customActionLetterColPercentagesByOrientation[orientKey][colLeft.key] = newPctLeft;
        customActionLetterColPercentagesByOrientation[orientKey][colRight.key] = newPctRight;

        // Live update widths in all Action Letter tables
        allAlTables.forEach(tbl => {
          const colElLeft = tbl.querySelector(`col[data-al-col-key="${colLeft.key}"]`);
          const colElRight = tbl.querySelector(`col[data-al-col-key="${colRight.key}"]`);
          if(colElLeft) colElLeft.style.width = newPctLeft.toFixed(3) + "%";
          if(colElRight) colElRight.style.width = newPctRight.toFixed(3) + "%";
        });
      }

      function onMouseUp(){
        activeResizer.classList.remove("resizing");
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      }

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    });
  });

  // 3. Right-Click Context Menu on Weekly Inspection Report Headers
  const wirTheads = compilerPrintArea.querySelectorAll(".compiled-table thead");
  wirTheads.forEach(thead => {
    thead.addEventListener("contextmenu", function(e){
      const th = e.target.closest("th[data-col-key]");
      if(th && th.dataset.colKey){
        showCompilerColContextMenu(e, th.dataset.colKey);
      }
    });
  });
}

let currentContextMenuColKey = null;

function isCompilerColumnActive(col){
  const el = document.getElementById(col.id);
  return el ? el.checked : true;
}

function renderCompilerContextMenuColList(){
  const listEl = $("compilerContextColList");
  if(!listEl) return;
  listEl.innerHTML = COMPILER_COLUMNS.map(col => {
    const isChecked = isCompilerColumnActive(col);
    return `
      <label class="context-menu-col-item">
        <input type="checkbox" data-ctx-col-id="${col.id}" data-ctx-col-key="${col.key}" ${isChecked ? 'checked' : ''}>
        <span>${escapeHtml(col.name)}</span>
      </label>
    `;
  }).join("");

  listEl.querySelectorAll("input[type='checkbox']").forEach(cb => {
    cb.addEventListener("change", function(e){
      e.stopPropagation();
      const colId = this.dataset.ctxColId;
      const targetEl = document.getElementById(colId);
      if(targetEl){
        const activeBefore = getActiveCompilerColumns();
        if(!this.checked && activeBefore.length <= 1 && activeBefore[0].id === colId){
          this.checked = true;
          showToast("Cannot hide the last visible column.");
          return;
        }
        targetEl.checked = this.checked;
        const wirSetting = parsePaperSetting(compilerPaperOrientation ? compilerPaperOrientation.value : "a4-landscape", "a4-landscape");
        customColPercentagesByOrientation[wirSetting.orientation] = {};
        renderCompilerPreview();
      }
    });
  });
}

function showCompilerColContextMenu(e, colKey){
  e.preventDefault();
  e.stopPropagation();
  currentContextMenuColKey = colKey;
  
  const menu = $("compilerColContextMenu");
  if(!menu) return;

  const colDef = COMPILER_COLUMNS.find(c => c.key === colKey);
  const colName = colDef ? colDef.name : "Column";
  
  const headerEl = $("compilerContextColHeader");
  if(headerEl) headerEl.textContent = `${colName} Options`;

  const hideBtnSpan = $("compilerContextHideColBtn") ? $("compilerContextHideColBtn").querySelector("span") : null;
  if(hideBtnSpan) hideBtnSpan.textContent = `Hide "${colName}"`;

  renderCompilerContextMenuColList();

  menu.style.display = "block";

  // Calculate coordinates ensuring menu stays inside viewport
  const menuWidth = 240;
  const menuHeight = 310;
  let left = e.clientX;
  let top = e.clientY;

  if(left + menuWidth > window.innerWidth - 10){
    left = window.innerWidth - menuWidth - 10;
  }
  if(top + menuHeight > window.innerHeight - 10){
    top = window.innerHeight - menuHeight - 10;
  }

  menu.style.left = `${Math.max(10, left)}px`;
  menu.style.top = `${Math.max(10, top)}px`;
}

function hideCompilerColContextMenu(){
  const menu = $("compilerColContextMenu");
  if(menu && menu.style.display !== "none"){
    menu.style.display = "none";
  }
  currentContextMenuColKey = null;
}

function bindCompilerPageBreakEvents(){
  if(!compilerPrintArea) return;

  // 1. Remove WIR Page Break Buttons
  compilerPrintArea.querySelectorAll("[data-remove-wir-break]").forEach(btn => {
    btn.addEventListener("click", function(e){
      e.preventDefault();
      e.stopPropagation();
      const breakIdx = parseInt(this.dataset.removeWirBreak, 10);
      if(!isNaN(breakIdx)){
        const allItems = getCompiledData().items;
        if(compilerWirPagination && compilerWirPagination.value !== "custom" && compilerWirPagination.value !== "auto"){
          const rowsPerPage = parseInt(compilerWirPagination.value, 10) || 5;
          customWirPageBreaks = [];
          for(let i = rowsPerPage; i < allItems.length; i += rowsPerPage){
            customWirPageBreaks.push(i);
          }
        }
        customWirPageBreaks = customWirPageBreaks.filter(b => b !== breakIdx);
        if(compilerWirPagination){
          compilerWirPagination.value = customWirPageBreaks.length > 0 ? "custom" : "auto";
        }
        renderCompilerPreview();
        showToast("Page break removed. Sheets merged.");
      }
    });
  });

  // 2. Quick Insert WIR Break Buttons on row hover
  compilerPrintArea.querySelectorAll("[data-insert-wir-break]").forEach(btn => {
    btn.addEventListener("click", function(e){
      e.preventDefault();
      e.stopPropagation();
      const breakIdx = parseInt(this.dataset.insertWirBreak, 10);
      if(!isNaN(breakIdx) && breakIdx > 0){
        const allItems = getCompiledData().items;
        if(compilerWirPagination && compilerWirPagination.value !== "custom" && compilerWirPagination.value !== "auto"){
          const rowsPerPage = parseInt(compilerWirPagination.value, 10) || 5;
          customWirPageBreaks = [];
          for(let i = rowsPerPage; i < allItems.length; i += rowsPerPage){
            customWirPageBreaks.push(i);
          }
        }
        if(!customWirPageBreaks.includes(breakIdx)){
          customWirPageBreaks.push(breakIdx);
          customWirPageBreaks.sort((a, b) => a - b);
        }
        if(compilerWirPagination) compilerWirPagination.value = "custom";
        renderCompilerPreview();
        showToast(`Page break inserted before Row #${breakIdx + 1}.`);
      }
    });
  });

  // 3. Draggable Page Break Separator Line Events
  let draggedBreakIdx = null;
  let draggedBreakType = null;

  compilerPrintArea.querySelectorAll(".draggable-page-break").forEach(sep => {
    sep.addEventListener("dragstart", function(e){
      draggedBreakIdx = parseInt(this.dataset.breakIndex, 10);
      draggedBreakType = this.dataset.dragBreakType || "wir";
      this.classList.add("dragging");
      document.body.classList.add("page-break-dragging");
      e.dataTransfer.setData("text/plain", String(draggedBreakIdx));
      e.dataTransfer.effectAllowed = "move";
    });

    sep.addEventListener("dragend", function(){
      this.classList.remove("dragging");
      document.body.classList.remove("page-break-dragging");
      compilerPrintArea.querySelectorAll(".page-break-drop-guide").forEach(el => el.classList.remove("active-target"));
      draggedBreakIdx = null;
      draggedBreakType = null;
    });
  });

  // 4. Drop Targets between rows
  compilerPrintArea.querySelectorAll(".page-break-drop-guide, [data-drop-wir-idx]").forEach(dropTarget => {
    dropTarget.addEventListener("dragover", function(e){
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      this.classList.add("active-target");
    });

    dropTarget.addEventListener("dragleave", function(){
      this.classList.remove("active-target");
    });

    dropTarget.addEventListener("drop", function(e){
      e.preventDefault();
      this.classList.remove("active-target");
      const targetRowIdx = parseInt(this.dataset.dropWirIdx, 10);
      if(isNaN(targetRowIdx) || targetRowIdx <= 0) return;

      const allItems = getCompiledData().items;
      if(compilerWirPagination && compilerWirPagination.value !== "custom" && compilerWirPagination.value !== "auto"){
        const rowsPerPage = parseInt(compilerWirPagination.value, 10) || 5;
        customWirPageBreaks = [];
        for(let i = rowsPerPage; i < allItems.length; i += rowsPerPage){
          customWirPageBreaks.push(i);
        }
      }

      // Replace old break index with new target row index
      if(draggedBreakIdx !== null){
        customWirPageBreaks = customWirPageBreaks.filter(b => b !== draggedBreakIdx);
      }
      if(!customWirPageBreaks.includes(targetRowIdx)){
        customWirPageBreaks.push(targetRowIdx);
        customWirPageBreaks.sort((a, b) => a - b);
      }
      if(compilerWirPagination) compilerWirPagination.value = "custom";
      renderCompilerPreview();
      showToast(`Page break moved to Row #${targetRowIdx + 1}.`);
    });
  });

  // 5. Remove Action Letter Page Break Buttons
  compilerPrintArea.querySelectorAll("[data-remove-letter-break]").forEach(btn => {
    btn.addEventListener("click", function(e){
      e.preventDefault();
      e.stopPropagation();
      const breakIdx = parseInt(this.dataset.removeLetterBreak, 10);
      if(!isNaN(breakIdx)){
        const allItems = getCompiledData().items;
        if(compilerLetterPagination && compilerLetterPagination.value !== "custom" && compilerLetterPagination.value !== "auto"){
          const findingsPerPage = parseInt(compilerLetterPagination.value, 10) || 2;
          customLetterPageBreaks = [];
          for(let i = findingsPerPage; i < allItems.length; i += findingsPerPage){
            customLetterPageBreaks.push(i);
          }
        }
        customLetterPageBreaks = customLetterPageBreaks.filter(b => b !== breakIdx);
        if(compilerLetterPagination){
          compilerLetterPagination.value = customLetterPageBreaks.length > 0 ? "custom" : "auto";
        }
        renderCompilerPreview();
        showToast("Action Letter page break removed. Sheets merged.");
      }
    });
  });

  // 6. Sheet Header Add Break Buttons on WIR Sheets
  compilerPrintArea.querySelectorAll("[data-wir-sheet-add-break]").forEach(btn => {
    btn.addEventListener("click", function(e){
      e.preventDefault();
      e.stopPropagation();
      const sheetIdx = parseInt(this.dataset.wirSheetAddBreak, 10);
      const allItems = getCompiledData().items;
      const currentSlices = getWirPageBreakSlices(allItems);
      if(sheetIdx >= 0 && sheetIdx < currentSlices.length){
        const currentSlice = currentSlices[sheetIdx];
        if(currentSlice.items.length > 1){
          const halfOffset = Math.ceil(currentSlice.items.length / 2);
          const targetGlobalIdx = currentSlice.startIndex + halfOffset;
          
          if(compilerWirPagination && compilerWirPagination.value !== "custom"){
            customWirPageBreaks = [];
            currentSlices.forEach((sl, idx) => {
              if(idx > 0 && sl.startIndex > 0) customWirPageBreaks.push(sl.startIndex);
            });
          }
          if(!customWirPageBreaks.includes(targetGlobalIdx)){
            customWirPageBreaks.push(targetGlobalIdx);
            customWirPageBreaks.sort((a, b) => a - b);
          }
          if(compilerWirPagination) compilerWirPagination.value = "custom";
          renderCompilerPreview();
          showToast(`Page break added before Row #${targetGlobalIdx + 1}.`);
        } else {
          showToast("This sheet only has 1 row; cannot split further.");
        }
      }
    });
  });

  // 7. Sheet Header Add Break Button on Action Letter
  compilerPrintArea.querySelectorAll("[data-action-letter-add-break]").forEach(btn => {
    btn.addEventListener("click", function(e){
      e.preventDefault();
      e.stopPropagation();
      insertPageBreakInCompilerPreview();
    });
  });

  // 8. Bind Letter Page Break Elements in Compiler Preview
  compilerPrintArea.querySelectorAll(".letter-page-break").forEach(bindPageBreakEvents);
}

function bindTransmittalEditableEvents(){
  if(!compilerPrintArea) return;
  const toEl = compilerPrintArea.querySelector("#compilerTransmittalTo");
  if(toEl && !toEl.dataset.bound){
    toEl.dataset.bound = "1";
    toEl.addEventListener("input", () => { window._compilerCustomTransmittalTo = toEl.innerText; });
  }
  const bodyEl = compilerPrintArea.querySelector("#compilerTransmittalBody");
  if(bodyEl && !bodyEl.dataset.bound){
    bodyEl.dataset.bound = "1";
    bodyEl.addEventListener("input", () => { window._compilerCustomTransmittalBody = bodyEl.innerText; });
  }
  compilerPrintArea.querySelectorAll(".cc-editable").forEach(el => {
    if(!el.dataset.bound){
      el.dataset.bound = "1";
      el.addEventListener("input", () => {
        const key = el.dataset.cc;
        if(key === "om") window._compilerCustomCcOm = el.innerText;
        else if(key === "pm") window._compilerCustomCcPm = el.innerText;
        else if(key === "qs") window._compilerCustomCcQs = el.innerText;
        else if(key === "lead") window._compilerCustomCcLead = el.innerText;
      });
    }
  });
}

function renderCompilerPreview(){
  if(!compilerPrintArea) return;
  try {
    const compiledResult = getCompiledData();
    updateCompilerStats(compiledResult);

    let fullHtml = generateCompiledRegistryHtml(compiledResult);

    if(compilerIncludeActionLetters && compilerIncludeActionLetters.checked){
      try {
        fullHtml += generateCompiledActionLetterHtml(compiledResult);
      } catch(alErr){
        console.error("Action letter compilation error:", alErr);
      }
    }

    compilerPrintArea.innerHTML = fullHtml;

    // Bind signatures and photos within compiled preview if present
    if(typeof window.bindActionLetterSignatureUploads === "function"){
      window.bindActionLetterSignatureUploads();
    }
    if(typeof window.bindNcCellImageUploads === "function"){
      window.bindNcCellImageUploads();
    }
    
    // Bind transmittal editable events (recipient address, cc list, letter body)
    bindTransmittalEditableEvents();

    // Bind draggable column resizers
    bindCompilerColumnResizers();

    // Bind interactive draggable page break events
    bindCompilerPageBreakEvents();

    // Apply zoom scaling
    if(currentCompilerZoomMode === "fit"){
      applyCompilerZoom("fit");
    }
  } catch(err){
    console.error("renderCompilerPreview error:", err);
  }
}

function openReportCompiler(){
  try {
    updateCompilerProjectOptions();
    updateCompilerCoverageOptions();

    if(compilerStatusMode) compilerStatusMode.value = "smart-coverage";
    if(compilerCustomStatuses) compilerCustomStatuses.style.display = "none";
    if(compilerExcludePrevClosed) compilerExcludePrevClosed.checked = true;
    if(compilerIncludeActionLetters) compilerIncludeActionLetters.checked = true;
    if(compilerActionLetterOptions) compilerActionLetterOptions.style.display = "flex";

    // Prepopulate dates if coverage is selected in main dashboard
    if(coverageFilterEl && coverageFilterEl.value){
      syncCoverageDatesFromPreset(coverageFilterEl.value);
    }

    renderCompilerPreview();

    if(reportCompilerModal){
      reportCompilerModal.style.display = "flex";
      reportCompilerModal.classList.add("active");
      reportCompilerModal.scrollTop = 0;
    }

    // Recalculate fit zoom after modal becomes visible
    setTimeout(() => {
      applyCompilerZoom(currentCompilerZoomMode || "fit");
    }, 60);
  } catch(err){
    console.error("Error opening report compiler:", err);
    if(reportCompilerModal){
      reportCompilerModal.style.display = "flex";
      reportCompilerModal.classList.add("active");
    }
  }
}

function closeReportCompiler(){
  if(reportCompilerModal){
    reportCompilerModal.classList.remove("active");
    reportCompilerModal.style.display = "none";
  }
}

function getPrintableCompiledHtml(){
  if(!compilerPrintArea) return '';
  const clone = compilerPrintArea.cloneNode(true);

  // 1. Process all inputs inside the preview to printable text spans
  clone.querySelectorAll('input').forEach(function(input){
    if(input.type === 'file'){
      input.remove();
      return;
    }
    const value = input.value || input.getAttribute('value') || '';
    const span = document.createElement('span');
    span.className = input.classList.contains('signature-date-input') ? 'signature-date-print' : 'signature-name-print';
    span.textContent = value || (input.placeholder || '');
    input.replaceWith(span);
  });

  // 2. Remove hints if signature image exists
  clone.querySelectorAll('.signature-upload-hint').forEach(function(hint){
    const img = hint.parentElement ? hint.parentElement.querySelector('img.signature-preview') : null;
    if(img && img.getAttribute('src')) hint.remove();
  });

  // 3. Make sure signature preview images are visible
  clone.querySelectorAll('img.signature-preview').forEach(function(img){
    if(img.getAttribute('src')){
      img.style.display = 'block';
    }
  });

  // 4. Remove UI resizers, drop guides, badges, toolbars
  clone.querySelectorAll('.col-resizer, .al-col-resizer, .page-sheet-header-badge, .draggable-page-break, .page-break-toolbar, .nc-cell-img-placeholder, .nc-upload-label').forEach(function(el){
    el.remove();
  });

  return clone.innerHTML;
}

function printCompiledDocument(){
  const html = getPrintableCompiledHtml();
  if(!html.trim()){
    showToast("No content to print.");
    return;
  }

  const wirSetting = parsePaperSetting(compilerPaperOrientation ? compilerPaperOrientation.value : "a4-landscape", "a4-landscape");
  const alSetting = parsePaperSetting(compilerLetterPaperFormat ? compilerLetterPaperFormat.value : "a4-portrait", "a4-portrait");

  const css = `
    @page {
      size: ${wirSetting.cssSize};
      margin: 8mm;
    }
    @page wir_page {
      size: ${wirSetting.cssSize};
      margin: 8mm;
    }
    @page letter_page {
      size: ${alSetting.cssSize};
      margin: 8mm;
    }
    body {
      margin: 0;
      background: white;
      font-family: Arial, Helvetica, sans-serif;
      color: #0f172a;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    * {
      box-sizing: border-box;
    }
    .compiled-page-separator {
      display: none !important;
    }
    .compiled-doc-sheet {
      width: 100% !important;
      max-width: 100% !important;
      min-height: auto !important;
      height: auto !important;
      overflow: visible !important;
      padding: 0 !important;
      margin: 0 !important;
      box-shadow: none !important;
      border: none !important;
      position: static !important;
      transform: none !important;
      page-break-after: always !important;
      break-after: page !important;
    }
    .compiled-doc-sheet.wir-sheet {
      page: wir_page;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }
    .compiled-doc-sheet.action-letter-sheet {
      page: letter_page;
      page-break-inside: auto !important;
      break-inside: auto !important;
    }
    .compiled-doc-sheet:last-child {
      page-break-after: auto !important;
      break-after: auto !important;
      margin-bottom: 0 !important;
    }
    .compiled-sheet-inner {
      outline: none !important;
      border: none !important;
      width: 100% !important;
    }
    .compiled-registry-header {
      width: 100%;
      border-collapse: collapse !important;
      border: 1.5px solid #000 !important;
      margin-bottom: 3mm;
      table-layout: fixed;
      box-sizing: border-box;
    }
    .compiled-registry-header td {
      border: 1.5px solid #000 !important;
      padding: 3px 5px;
      vertical-align: middle;
    }
    .compiled-logo-cell { width: 58mm !important; text-align: center; }
    .compiled-logo-cell img { max-height: 42px; display: block; margin: 0 auto; }
    .compiled-title-cell { width: auto !important; text-align: center; font-size: 13pt; font-weight: 900; }
    .compiled-meta-cell { width: 52mm !important; font-size: 8pt; font-weight: 700; }
    .compiled-transmittal-memo {
      border: 1.5px solid #000 !important;
      background: #ffffff !important;
      margin-bottom: 2.5mm !important;
      box-sizing: border-box !important;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      font-family: Arial, Helvetica, sans-serif !important;
    }
    .transmittal-memo-header {
      display: grid !important;
      grid-template-columns: 1.15fr 1fr !important;
      border-bottom: 1px solid #000 !important;
    }
    .transmittal-to-box {
      padding: 3.5px 6px !important;
      border-right: 1px solid #000 !important;
      background: #fafafa !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 2px !important;
      box-sizing: border-box !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .transmittal-field-title {
      font-size: 6.5pt !important;
      font-weight: 900 !important;
      text-transform: uppercase !important;
      color: #0284c7 !important;
      letter-spacing: 0.04em !important;
    }
    .transmittal-recipient-content {
      font-size: 7.2pt !important;
      font-weight: 700 !important;
      color: #0f172a !important;
      line-height: 1.3 !important;
      white-space: pre-line !important;
      outline: none !important;
      border: none !important;
    }
    .transmittal-meta-box {
      padding: 3.5px 6px !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 2px !important;
      font-size: 7pt !important;
      background: #ffffff !important;
      box-sizing: border-box !important;
    }
    .transmittal-meta-row {
      display: flex !important;
      gap: 6px !important;
      line-height: 1.25 !important;
    }
    .tm-label {
      font-weight: 900 !important;
      font-size: 6.5pt !important;
      color: #475569 !important;
      width: 65px !important;
      min-width: 65px !important;
      text-transform: uppercase !important;
    }
    .tm-val {
      color: #0f172a !important;
      font-weight: 700 !important;
    }
    .transmittal-cc-row {
      display: flex !important;
      gap: 6px !important;
      align-items: flex-start !important;
      margin-top: 1px !important;
      line-height: 1.2 !important;
    }
    .transmittal-cc-list {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 3px 6px !important;
    }
    .cc-pill {
      font-size: 6.8pt !important;
      color: #1e293b !important;
      display: inline-flex !important;
      align-items: center !important;
      gap: 3px !important;
      background: #f1f5f9 !important;
      padding: 1px 4px !important;
      border-radius: 3px !important;
      border: 1px solid #cbd5e1 !important;
      box-sizing: border-box !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .cc-editable {
      font-weight: 700 !important;
      outline: none !important;
      border: none !important;
    }
    .transmittal-letter-body-wrap {
      padding: 4px 6px !important;
      background: #ffffff !important;
      box-sizing: border-box !important;
    }
    .transmittal-letter-body {
      font-size: 7.2pt !important;
      line-height: 1.35 !important;
      color: #334155 !important;
      text-align: justify !important;
      white-space: pre-line !important;
      outline: none !important;
      border: none !important;
    }
    .compiled-sheet-running-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid #000;
      padding: 0 0 1.5mm 0;
      margin-bottom: 2.5mm;
      font-size: 7.5pt;
      font-weight: 700;
      color: #1e293b;
      box-sizing: border-box;
    }
    .running-header-left { display: flex; align-items: center; gap: 8px; font-weight: 900; }
    .running-doc-title { text-transform: uppercase; letter-spacing: 0.04em; color: #0f172a; }
    .running-doc-code { color: #64748b; font-weight: 700; font-size: 7pt; }
    .running-header-right { display: flex; align-items: center; gap: 10px; font-size: 7pt; color: #475569; }
    .running-page-num { font-weight: 800; color: #0f172a; }
    .compiled-project-section {
      margin-bottom: 3.5mm;
      page-break-inside: auto;
      break-inside: auto;
    }
    .compiled-project-banner {
      background: #f1f5f9 !important;
      border: 1px solid #000 !important;
      border-left: 4.5px solid #0f172a !important;
      padding: 2.5px 6px !important;
      margin: 2mm 0 1.5mm 0 !important;
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      box-sizing: border-box !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .compiled-project-banner-title {
      display: flex !important;
      align-items: center !important;
      gap: 5px !important;
    }
    .proj-banner-label {
      font-size: 6.5pt !important;
      font-weight: 900 !important;
      color: #0284c7 !important;
      letter-spacing: 0.04em !important;
    }
    .proj-banner-name {
      font-size: 8pt !important;
      font-weight: 900 !important;
      color: #0f172a !important;
    }
    .compiled-project-banner-meta {
      display: flex !important;
      gap: 8px !important;
      font-size: 6.8pt !important;
      color: #334155 !important;
    }
    .project-kpi-row {
      display: grid !important;
      grid-template-columns: repeat(5, 1fr) !important;
      gap: 4px !important;
      margin: 1.5mm 0 2mm 0 !important;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      box-sizing: border-box !important;
    }
    .proj-kpi-card {
      border-radius: 3px !important;
      padding: 2px 4px !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      border: 1px solid #cbd5e1 !important;
      background: #f8fafc !important;
      text-align: center !important;
      box-sizing: border-box !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .proj-kpi-label {
      font-size: 5.5pt !important;
      font-weight: 800 !important;
      letter-spacing: 0.04em !important;
      text-transform: uppercase !important;
      line-height: 1 !important;
      margin-bottom: 1.5px !important;
      white-space: nowrap !important;
    }
    .proj-kpi-val {
      font-size: 9.5pt !important;
      font-weight: 900 !important;
      line-height: 1 !important;
    }
    .proj-kpi-total { background: #0f172a !important; color: #ffffff !important; border-color: #0f172a !important; }
    .proj-kpi-total .proj-kpi-label { color: #94a3b8 !important; }
    .proj-kpi-open { background: #eff6ff !important; color: #1d4ed8 !important; border-color: #93c5fd !important; }
    .proj-kpi-open .proj-kpi-label { color: #2563eb !important; }
    .proj-kpi-progress { background: #fffbeb !important; color: #b45309 !important; border-color: #fcd34d !important; }
    .proj-kpi-progress .proj-kpi-label { color: #d97706 !important; }
    .proj-kpi-overdue { background: #fef2f2 !important; color: #b91c1c !important; border-color: #fca5a5 !important; }
    .proj-kpi-overdue .proj-kpi-label { color: #dc2626 !important; }
    .proj-kpi-closed { background: #f0fdf4 !important; color: #15803d !important; border-color: #86efac !important; }
    .proj-kpi-closed .proj-kpi-label { color: #16a34a !important; }
    /* WIR Sign-off Section on Last Sheet */
    .wir-signoff-section {
      margin-top: 3.5mm !important;
      border: 1.5px solid #000 !important;
      background: #ffffff !important;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      box-sizing: border-box !important;
      font-family: Arial, Helvetica, sans-serif !important;
    }
    .wir-signoff-header {
      background: #0f172a !important;
      color: #ffffff !important;
      padding: 2.5px 6px !important;
      font-size: 7pt !important;
      font-weight: 900 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.04em !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .wir-signoff-grid {
      display: grid !important;
      grid-template-columns: repeat(3, 1fr) !important;
    }
    .wir-sign-box {
      padding: 3px 5px !important;
      border-right: 1px solid #000 !important;
      box-sizing: border-box !important;
      display: flex !important;
      flex-direction: column !important;
    }
    .wir-sign-box:last-child {
      border-right: none !important;
    }
    .wir-sign-role {
      font-size: 7.5pt !important;
      font-weight: 900 !important;
      text-transform: uppercase !important;
      color: #0f172a !important;
      margin-bottom: 2px !important;
    }
    .signature-date-row {
      display: flex !important;
      align-items: center !important;
      gap: 4px !important;
      font-size: 7pt !important;
      margin-top: 1px !important;
    }
    .compiled-table {
      width: 100% !important;
      max-width: 100% !important;
      border-collapse: collapse !important;
      table-layout: fixed !important;
      font-size: ${wirSetting.orientation === 'portrait' ? '5.8pt' : '7pt'} !important;
      line-height: 1.2 !important;
      border: 1.5px solid #000 !important;
      word-break: break-word !important;
      overflow-wrap: break-word !important;
      white-space: normal !important;
      hyphens: auto;
      box-sizing: border-box !important;
    }
    .compiled-table th {
      background: #0f172a !important;
      color: #fff !important;
      font-weight: 800;
      padding: ${wirSetting.orientation === 'portrait' ? '1.5px 2px' : '2.5px 3px'} !important;
      border: 1px solid #000 !important;
      text-align: center;
      word-break: break-word !important;
      overflow-wrap: break-word !important;
      white-space: normal !important;
    }
    .compiled-table td {
      border: 1px solid #000 !important;
      padding: ${wirSetting.orientation === 'portrait' ? '1.5px 2px' : '2.5px 3px'} !important;
      vertical-align: top;
      word-break: break-word !important;
      overflow-wrap: break-word !important;
      white-space: normal !important;
      hyphens: auto;
    }
    .compiled-table tr {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }
    .compiled-table .col-img {
      text-align: center !important;
      vertical-align: middle !important;
      padding: 1px !important;
    }
    .compiled-table .thumb-img {
      width: 1.25in !important;
      height: 1.25in !important;
      max-width: 1.25in !important;
      max-height: 1.25in !important;
      min-width: 1.25in !important;
      min-height: 1.25in !important;
      object-fit: contain !important;
      object-position: center center !important;
      background: transparent !important;
      display: block !important;
      margin: 0 auto !important;
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
      padding: 0 !important;
      box-sizing: border-box !important;
    }
    .status-badge-closed-coverage {
      background: #065f46 !important;
      color: #ffffff !important;
      padding: 2px 3px !important;
      border-radius: 3px !important;
      display: block !important;
      text-align: center !important;
      line-height: 1.25 !important;
      box-sizing: border-box !important;
    }
    .status-badge-main {
      display: block !important;
      font-size: ${wirSetting.orientation === 'portrait' ? '6pt' : '7pt'} !important;
      font-weight: 800 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.03em !important;
    }
    .status-badge-sub {
      display: block !important;
      font-size: ${wirSetting.orientation === 'portrait' ? '4.8pt' : '5.5pt'} !important;
      font-weight: 700 !important;
      opacity: 0.9 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.02em !important;
    }
    .pill {
      font-size: ${wirSetting.orientation === 'portrait' ? '5.5pt' : '6.5pt'};
      font-weight: 800;
      padding: 2px 3px;
      border-radius: 3px;
      display: block;
      text-align: center;
    }
    .pill.closed { background: #d1fae5 !important; color: #065f46 !important; }
    .pill.progress { background: #dbeafe !important; color: #1e40af !important; }
    .pill.overdue { background: #fee2e2 !important; color: #991b1b !important; }
    .pill.open { background: #fef3c7 !important; color: #92400e !important; }
    .col-resizer, .al-col-resizer { display: none !important; }

    /* Action letter print styles matching live preview 100% */
    .compiled-doc-sheet.action-letter-sheet .letter-a4-preview,
    .compiled-doc-sheet.action-letter-sheet .letter-page,
    .letter-a4-preview,
    .letter-page {
      width: 100% !important;
      max-width: 100% !important;
      min-height: auto !important;
      height: auto !important;
      overflow: visible !important;
      margin: 0 auto !important;
      padding: 0 !important;
      font-family: Arial, Helvetica, sans-serif !important;
      font-size: 9pt !important;
      line-height: 1.35 !important;
    }
    .letter-header-table {
      width: 100% !important;
      border-collapse: collapse !important;
      border: 0 !important;
      margin: 0 0 2mm 0 !important;
      table-layout: fixed !important;
    }
    .letter-header-table td {
      border: 0 !important;
      padding: 0 4px !important;
      vertical-align: middle !important;
    }
    .letter-header-logo-cell {
      width: 29% !important;
      text-align: left !important;
      vertical-align: middle !important;
    }
    .letter-header-logo-cell .letter-logo,
    .letter-header-logo-cell img {
      max-width: 100% !important;
      max-height: 40px !important;
      height: 40px !important;
      width: auto !important;
      object-fit: contain !important;
      object-position: left center !important;
      display: block !important;
    }
    .letter-header-title-cell {
      width: 42% !important;
      text-align: center !important;
      padding: 0 3px !important;
      vertical-align: middle !important;
    }
    .letter-header-title-cell h1 {
      font-size: 16px !important;
      margin: 0 !important;
      font-weight: 900 !important;
      line-height: 1.05 !important;
      letter-spacing: 0.05em !important;
      color: #050505 !important;
      white-space: nowrap !important;
      text-align: center !important;
    }
    .letter-header-title-cell h2 {
      font-size: 8.5px !important;
      margin: 2px 0 0 0 !important;
      color: #e30613 !important;
      font-weight: 900 !important;
      letter-spacing: 0.02em !important;
      line-height: 1.1 !important;
      white-space: nowrap !important;
      text-align: center !important;
    }
    .letter-header-contact-cell {
      width: 29% !important;
      text-align: right !important;
      vertical-align: middle !important;
      padding: 0 4px !important;
    }
    .letter-header-contact-cell .letter-contact,
    .letter-contact {
      display: flex !important;
      flex-direction: column !important;
      gap: 2px !important;
      font-size: 7.5px !important;
      line-height: 1.2 !important;
      color: #111827 !important;
      text-align: right !important;
      justify-content: center !important;
      white-space: nowrap !important;
    }
    .letter-header-contact-cell .letter-contact div,
    .letter-contact div {
      text-align: right !important;
      white-space: nowrap !important;
      font-size: 7.5px !important;
    }
    .letter-stripe {
      height: 6px !important;
      background: linear-gradient(90deg, #020617 0%, #020617 52%, #e30613 52%, #e30613 100%) !important;
      margin: 0 0 2.5mm 0 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .letter-info {
      width: ${alSetting.orientation === 'landscape' ? '82%' : '78%'} !important;
      margin: 0 auto 3mm !important;
      border-collapse: collapse !important;
      font-size: 9pt !important;
      table-layout: fixed !important;
    }
    .letter-info th {
      width: 34% !important;
      background: #050505 !important;
      color: #ffffff !important;
      padding: 3px 6px !important;
      border: 1px solid #555 !important;
      font-weight: 900 !important;
      text-transform: uppercase !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .letter-info td {
      padding: 3px 6px !important;
      border: 1px solid #777 !important;
      font-weight: 700 !important;
    }
    .letter-section {
      margin-bottom: 2.5mm !important;
      border: 1px solid #999 !important;
      background: #ffffff !important;
    }
    .letter-section-title {
      display: inline-flex !important;
      align-items: center !important;
      background: #050505 !important;
      color: #ffffff !important;
      padding: 4px 10px !important;
      min-width: 180px !important;
      font-size: 9pt !important;
      font-weight: 900 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.03em !important;
      position: relative !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .letter-section-title:after {
      content: "" !important;
      position: absolute !important;
      right: -16px !important;
      top: 0 !important;
      border-top: 22px solid #e30613 !important;
      border-right: 16px solid transparent !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .letter-section-content {
      padding: 5px 7px !important;
      min-height: 24px !important;
      font-size: 8.5pt !important;
    }
    .nc-summary-table {
      width: 100% !important;
      table-layout: fixed !important;
      border-collapse: collapse !important;
      border: 1px solid #000 !important;
      font-size: 8pt !important;
      margin: 0 0 2.5mm 0 !important;
    }
    .nc-summary-table th {
      background: #050505 !important;
      color: #ffffff !important;
      padding: 3px 2px !important;
      border: 1px solid #000 !important;
      text-align: center !important;
      font-weight: 900 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .nc-summary-table td {
      border: 1px solid #000 !important;
      padding: 3px 2px !important;
      vertical-align: top !important;
      overflow-wrap: anywhere !important;
      word-break: break-word !important;
    }
    .nc-summary-table .nc-finding-cell {
      padding: 0 !important;
      vertical-align: top !important;
    }
    .nc-summary-table .nc-finding-cell .nc-finding-text,
    .nc-summary-table .nc-finding-cell .nc-finding-text strong {
      color: #e30613 !important;
      font-weight: 700 !important;
      display: block !important;
      line-height: 1.15 !important;
      padding: 0 !important;
      margin: 0 !important;
    }
    .nc-cell-img-wrap {
      margin-top: 4px !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      text-align: center !important;
    }
    .nc-cell-image {
      width: 1.25in !important;
      height: 1.25in !important;
      max-width: 1.25in !important;
      max-height: 1.25in !important;
      min-width: 1.25in !important;
      min-height: 1.25in !important;
      object-fit: cover !important;
      display: block !important;
      margin: 0 auto !important;
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
      border-radius: 2px !important;
    }
    .signature-block-container {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      margin-top: 2.5mm !important;
    }
    .letter-two-col {
      display: grid !important;
      grid-template-columns: repeat(2, 1fr) !important;
      border: 1px solid #999 !important;
      margin-bottom: 2.5mm !important;
    }
    .sign-box {
      padding: 4px 6px !important;
      min-height: 42px !important;
      border-right: 1px solid #999 !important;
    }
    .sign-box:last-child {
      border-right: 0 !important;
    }
    .sign-role {
      font-size: 8.5pt !important;
      font-weight: 900 !important;
      text-transform: uppercase !important;
    }
    .sign-sub {
      font-size: 7.5pt !important;
      font-weight: 700 !important;
      line-height: 1.1 !important;
    }
    .sign-line {
      margin-top: 4px !important;
      display: grid !important;
      gap: 2px !important;
      font-size: 8pt !important;
    }
    .signature-upload-box {
      border: 1px dashed #777 !important;
      background: #ffffff !important;
      min-height: 29px !important;
      height: 29px !important;
      margin: 0 !important;
      padding: 0 !important;
      border-radius: 4px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      text-align: center !important;
    }
    .signature-upload-box img[src] {
      display: block !important;
      max-height: 26.4px !important;
      max-width: 100% !important;
      margin: 0 auto !important;
      padding: 0 !important;
      object-fit: contain !important;
      object-position: center center !important;
    }
    .signature-name-print {
      display: block !important;
      width: 100% !important;
      text-align: center !important;
      font-size: 9pt !important;
      font-weight: 700 !important;
      min-height: 14px !important;
      margin-top: 2px !important;
    }
    .signature-date-print {
      display: inline-block !important;
      font-size: 8pt !important;
      font-weight: 700 !important;
      margin-left: 4px !important;
    }
    .letter-footer {
      display: grid !important;
      grid-template-columns: 1.7fr 0.9fr !important;
      height: 12mm !important;
      color: #ffffff !important;
      font-size: 8.5pt !important;
      font-weight: 900 !important;
      letter-spacing: 0.04em !important;
      margin-top: 3mm !important;
    }
    .letter-footer-black {
      background: #050505 !important;
      display: flex !important;
      align-items: center !important;
      padding-left: 8mm !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .letter-footer-red {
      background: #e30613 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .letter-page-break {
      display: block !important;
      page-break-after: always !important;
      break-after: page !important;
      height: 0 !important;
      min-height: 0 !important;
      max-height: 0 !important;
      line-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      border: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
      overflow: hidden !important;
    }
    .no-print,
    .page-break-toolbar,
    .page-sheet-header-badge,
    .draggable-page-break,
    .col-resizer,
    .al-col-resizer,
    .signature-upload-hint,
    .nc-upload-label,
    .nc-cell-img-placeholder,
    input[type="file"] {
      display: none !important;
      visibility: hidden !important;
    }
  `;

  let printFrame = document.getElementById("capaPrintFrame");
  if(!printFrame){
    printFrame = document.createElement("iframe");
    printFrame.id = "capaPrintFrame";
    printFrame.style.position = "fixed";
    printFrame.style.right = "0";
    printFrame.style.bottom = "0";
    printFrame.style.width = "0";
    printFrame.style.height = "0";
    printFrame.style.border = "0";
    printFrame.style.visibility = "hidden";
    document.body.appendChild(printFrame);
  }

  const frameDoc = printFrame.contentDocument || printFrame.contentWindow.document;
  frameDoc.open();
  frameDoc.write(`<!doctype html><html><head><meta charset="utf-8"><title>CAPA Report</title><style>${css}</style></head><body><div id="compilerPrintArea">${html}</div></body></html>`);
  frameDoc.close();

  setTimeout(function(){
    try{
      printFrame.contentWindow.focus();
      printFrame.contentWindow.print();
    }catch(e){
      window.print();
    }
  }, 250);
}

// Wire Compiler Event Listeners
if($("printPdf")) $("printPdf").addEventListener("click", openReportCompiler);
if($("openCompilerBtn")) $("openCompilerBtn").addEventListener("click", openReportCompiler);
if(closeReportCompilerBtn) closeReportCompilerBtn.addEventListener("click", closeReportCompiler);
if(compilerPrintBtn) compilerPrintBtn.addEventListener("click", printCompiledDocument);
if(compilerRefreshBtn) compilerRefreshBtn.addEventListener("click", () => {
  const wirSetting = parsePaperSetting(compilerPaperOrientation ? compilerPaperOrientation.value : "a4-landscape", "a4-landscape");
  const alSetting = parsePaperSetting(compilerLetterPaperFormat ? compilerLetterPaperFormat.value : "a4-portrait", "a4-portrait");
  customColPercentagesByOrientation[wirSetting.orientation] = {};
  customActionLetterColPercentagesByOrientation[alSetting.orientation] = {};
  renderCompilerPreview();
  if(currentCompilerZoomMode === "fit") applyCompilerZoom("fit");
  showToast("Preview refreshed & auto-fitted to paper.");
});

function toggleCompilerSidebar(){
  const layout = document.querySelector(".compiler-layout");
  if(layout){
    const isCollapsed = layout.classList.toggle("sidebar-collapsed");
    const btnText = isCollapsed ? "▶ Show Controls" : "◀ Hide Controls";
    if(compilerToggleSidebarBtn) compilerToggleSidebarBtn.textContent = btnText;
    const headerToggleBtn = $("compilerHeaderToggleSidebarBtn");
    if(headerToggleBtn) headerToggleBtn.textContent = btnText;
    setTimeout(() => {
      if(currentCompilerZoomMode === "fit"){
        applyCompilerZoom("fit");
      }
    }, 150);
  }
}

const compilerToggleSidebarBtn = $("compilerToggleSidebarBtn");
if(compilerToggleSidebarBtn){
  compilerToggleSidebarBtn.addEventListener("click", toggleCompilerSidebar);
}
const compilerHeaderToggleSidebarBtn = $("compilerHeaderToggleSidebarBtn");
if(compilerHeaderToggleSidebarBtn){
  compilerHeaderToggleSidebarBtn.addEventListener("click", toggleCompilerSidebar);
}

if(compilerProjectSelect) compilerProjectSelect.addEventListener("change", () => {
  updateCompilerCoverageOptions();
  renderCompilerPreview();
});

if(compilerCoverageSelect) compilerCoverageSelect.addEventListener("change", () => {
  syncCoverageDatesFromPreset(compilerCoverageSelect.value);
  renderCompilerPreview();
});

if(compilerCoverageStart) compilerCoverageStart.addEventListener("input", renderCompilerPreview);
if(compilerCoverageEnd) compilerCoverageEnd.addEventListener("input", renderCompilerPreview);

if(compilerPaperOrientation) compilerPaperOrientation.addEventListener("change", () => {
  const wirSetting = parsePaperSetting(compilerPaperOrientation ? compilerPaperOrientation.value : "a4-landscape", "a4-landscape");
  customColPercentagesByOrientation[wirSetting.orientation] = {};
  renderCompilerPreview();
  if(currentCompilerZoomMode === "fit") applyCompilerZoom("fit");
});

if(compilerLetterPaperFormat) compilerLetterPaperFormat.addEventListener("change", () => {
  renderCompilerPreview();
  if(currentCompilerZoomMode === "fit") applyCompilerZoom("fit");
});

const compilerResetLetterColWidthsBtn = $("compilerResetLetterColWidthsBtn");
if(compilerResetLetterColWidthsBtn){
  compilerResetLetterColWidthsBtn.addEventListener("click", () => {
    const alSetting = parsePaperSetting(compilerLetterPaperFormat ? compilerLetterPaperFormat.value : "a4-portrait", "a4-portrait");
    const orientKey = alSetting.orientation === "landscape" ? "landscape" : "portrait";
    customActionLetterColPercentagesByOrientation[orientKey] = {};
    renderCompilerPreview();
    if(currentCompilerZoomMode === "fit") applyCompilerZoom("fit");
    showToast("Action Letter column widths reset to default (" + (orientKey === "portrait" ? "Portrait" : "Landscape") + ").");
  });
}

if(compilerStatusMode) compilerStatusMode.addEventListener("change", () => {
  const isCustom = compilerStatusMode.value === "custom";
  if(compilerCustomStatuses) compilerCustomStatuses.style.display = isCustom ? "block" : "none";
  renderCompilerPreview();
});

if(compilerExcludePrevClosed) compilerExcludePrevClosed.addEventListener("change", renderCompilerPreview);

if(compilerIncludeActionLetters) compilerIncludeActionLetters.addEventListener("change", () => {
  if(compilerActionLetterOptions) compilerActionLetterOptions.style.display = compilerIncludeActionLetters.checked ? "flex" : "none";
  renderCompilerPreview();
});

if(compilerLetterSource) compilerLetterSource.addEventListener("change", renderCompilerPreview);
if(compilerLetterPageBreak) compilerLetterPageBreak.addEventListener("change", renderCompilerPreview);
if(compilerLetterPhotos) compilerLetterPhotos.addEventListener("change", renderCompilerPreview);

[compilerDocTitle, compilerDocCode, compilerRevNo, compilerEffDate].forEach(el => {
  if(el) el.addEventListener("input", renderCompilerPreview);
});

// Column Checkbox Select All / Deselect All
if(compilerSelectAllColsBtn){
  compilerSelectAllColsBtn.addEventListener("click", () => {
    COMPILER_COLUMNS.forEach(col => {
      const el = document.getElementById(col.id);
      if(el) el.checked = true;
    });
    const orientation = (compilerPaperOrientation ? compilerPaperOrientation.value : "landscape") === "portrait" ? "portrait" : "landscape";
    customColPercentagesByOrientation[orientation] = {};
    renderCompilerPreview();
  });
}

if(compilerDeselectAllColsBtn){
  compilerDeselectAllColsBtn.addEventListener("click", () => {
    COMPILER_COLUMNS.forEach(col => {
      const el = document.getElementById(col.id);
      if(el) el.checked = false;
    });
    const orientation = (compilerPaperOrientation ? compilerPaperOrientation.value : "landscape") === "portrait" ? "portrait" : "landscape";
    customColPercentagesByOrientation[orientation] = {};
    renderCompilerPreview();
  });
}

const compilerResetColWidthsBtn = $("compilerResetColWidthsBtn");
if(compilerResetColWidthsBtn){
  compilerResetColWidthsBtn.addEventListener("click", () => {
    const orientation = (compilerPaperOrientation ? compilerPaperOrientation.value : "landscape") === "portrait" ? "portrait" : "landscape";
    customColPercentagesByOrientation[orientation] = {};
    renderCompilerPreview();
    if(currentCompilerZoomMode === "fit") applyCompilerZoom("fit");
    showToast("Column widths reset to auto-fit for " + (orientation === "portrait" ? "Portrait" : "Landscape") + ".");
  });
}

// Column Header Context Menu Buttons
const compilerContextHideColBtn = $("compilerContextHideColBtn");
if(compilerContextHideColBtn){
  compilerContextHideColBtn.addEventListener("click", () => {
    if(!currentContextMenuColKey){
      hideCompilerColContextMenu();
      return;
    }
    const colDef = COMPILER_COLUMNS.find(c => c.key === currentContextMenuColKey);
    if(colDef){
      const activeCols = getActiveCompilerColumns();
      if(activeCols.length <= 1){
        showToast("Cannot hide the last visible column.");
        hideCompilerColContextMenu();
        return;
      }
      const el = document.getElementById(colDef.id);
      if(el){
        el.checked = false;
        const wirSetting = parsePaperSetting(compilerPaperOrientation ? compilerPaperOrientation.value : "a4-landscape", "a4-landscape");
        customColPercentagesByOrientation[wirSetting.orientation] = {};
        renderCompilerPreview();
        showToast(`Column "${colDef.name}" hidden.`);
      }
    }
    hideCompilerColContextMenu();
  });
}

const compilerContextShowAllBtn = $("compilerContextShowAllBtn");
if(compilerContextShowAllBtn){
  compilerContextShowAllBtn.addEventListener("click", () => {
    COMPILER_COLUMNS.forEach(col => {
      const el = document.getElementById(col.id);
      if(el) el.checked = true;
    });
    const wirSetting = parsePaperSetting(compilerPaperOrientation ? compilerPaperOrientation.value : "a4-landscape", "a4-landscape");
    customColPercentagesByOrientation[wirSetting.orientation] = {};
    renderCompilerPreview();
    showToast("All columns are now visible.");
    hideCompilerColContextMenu();
  });
}

const compilerContextResetWidthsBtn = $("compilerContextResetWidthsBtn");
if(compilerContextResetWidthsBtn){
  compilerContextResetWidthsBtn.addEventListener("click", () => {
    const wirSetting = parsePaperSetting(compilerPaperOrientation ? compilerPaperOrientation.value : "a4-landscape", "a4-landscape");
    customColPercentagesByOrientation[wirSetting.orientation] = {};
    renderCompilerPreview();
    if(currentCompilerZoomMode === "fit") applyCompilerZoom("fit");
    showToast("Column widths reset to default.");
    hideCompilerColContextMenu();
  });
}

window.addEventListener("click", (e) => {
  const menu = $("compilerColContextMenu");
  if(menu && !menu.contains(e.target)){
    hideCompilerColContextMenu();
  }
});

window.addEventListener("keydown", (e) => {
  if(e.key === "Escape"){
    hideCompilerColContextMenu();
  }
});

if(compilerPreviewScroll){
  compilerPreviewScroll.addEventListener("scroll", hideCompilerColContextMenu);
}

// Bind all 14 column checkboxes to dynamically update preview
COMPILER_COLUMNS.forEach(col => {
  const el = document.getElementById(col.id);
  if(el) el.addEventListener("change", renderCompilerPreview);
});

// Bind pagination controls
if(compilerWirPagination){
  compilerWirPagination.addEventListener("change", renderCompilerPreview);
}
if(compilerLetterPagination){
  compilerLetterPagination.addEventListener("change", renderCompilerPreview);
}

// Bind Action Letter Add Page Break Buttons
if(compilerAddPageBreakBtn){
  compilerAddPageBreakBtn.addEventListener("click", insertPageBreakInCompilerPreview);
}
if(compilerToolbarAddPageBreakBtn){
  compilerToolbarAddPageBreakBtn.addEventListener("click", insertPageBreakInCompilerPreview);
}

// Reset Page Breaks Buttons
const compilerResetWirPageBreaksBtn = $("compilerResetWirPageBreaksBtn");
if(compilerResetWirPageBreaksBtn){
  compilerResetWirPageBreaksBtn.addEventListener("click", () => {
    customWirPageBreaks = [];
    if(compilerWirPagination) compilerWirPagination.value = "auto";
    renderCompilerPreview();
    showToast("WIR page breaks reset to default.");
  });
}

const compilerResetLetterPageBreaksBtn = $("compilerResetLetterPageBreaksBtn");
if(compilerResetLetterPageBreaksBtn){
  compilerResetLetterPageBreaksBtn.addEventListener("click", () => {
    customLetterPageBreaks = [];
    if(compilerLetterPagination) compilerLetterPagination.value = "auto";
    // Also remove any manually inserted letter page breaks in the preview
    if(compilerPrintArea){
      compilerPrintArea.querySelectorAll(".letter-page-break").forEach(el => el.remove());
    }
    renderCompilerPreview();
    showToast("Action Letter page breaks reset to default.");
  });
}

// Bind status filter custom checkboxes
[compStatOpen, compStatProgress, compStatOverdue, compStatClosed].forEach(el => {
  if(el) el.addEventListener("change", renderCompilerPreview);
});

// Zoom Controls
document.querySelectorAll(".compiler-zoom-controls .zoom-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const zoomVal = btn.dataset.zoom;
    applyCompilerZoom(zoomVal);
  });
});

window.addEventListener("resize", () => {
  if(reportCompilerModal && reportCompilerModal.classList.contains("active")){
    if(currentCompilerZoomMode === "fit"){
      applyCompilerZoom("fit");
    }
  }
});

if(reportCompilerModal){
  reportCompilerModal.addEventListener("click", e => {
    if(e.target === reportCompilerModal) closeReportCompiler();
  });
}

$("saveJson").addEventListener("click", () => {
  const exportPayload = {
    exported_at: new Date().toISOString(),
    capaData: Array.isArray(capaData) ? capaData : [],
    actionLetters: Array.isArray(actionLetters) ? actionLetters : [],
    hiddenColumns: Array.isArray(hiddenColumns) ? hiddenColumns : [],
    compilerSettings: {
      paperOrientation: compilerPaperOrientation ? compilerPaperOrientation.value : "a4-landscape",
      wirPagination: compilerWirPagination ? compilerWirPagination.value : "auto",
      letterPaperFormat: compilerLetterPaperFormat ? compilerLetterPaperFormat.value : "a4-portrait",
      letterPagination: compilerLetterPagination ? compilerLetterPagination.value : "auto",
      customWirPageBreaks: customWirPageBreaks,
      customLetterPageBreaks: customLetterPageBreaks,
      hiddenCompilerColumns: COMPILER_COLUMNS.filter(c => { const el = document.getElementById(c.id); return el && !el.checked; }).map(c => c.key),
      activeCompilerColumns: COMPILER_COLUMNS.filter(c => { const el = document.getElementById(c.id); return el && el.checked; }).map(c => c.key),
      customColPercentagesByOrientation: customColPercentagesByOrientation,
      customActionLetterColPercentagesByOrientation: customActionLetterColPercentagesByOrientation,
      includeActionLetters: compilerIncludeActionLetters ? compilerIncludeActionLetters.checked : true,
      letterSource: compilerLetterSource ? compilerLetterSource.value : "auto",
      letterPageBreak: compilerLetterPageBreak ? compilerLetterPageBreak.checked : true,
      letterPhotos: compilerLetterPhotos ? compilerLetterPhotos.checked : true,
      statusMode: compilerStatusMode ? compilerStatusMode.value : "smart-coverage",
      excludePrevClosed: compilerExcludePrevClosed ? compilerExcludePrevClosed.checked : true,
      docTitle: compilerDocTitle ? compilerDocTitle.value : "",
      docCode: compilerDocCode ? compilerDocCode.value : "",
      revNo: compilerRevNo ? compilerRevNo.value : "",
      effDate: compilerEffDate ? compilerEffDate.value : ""
    }
  };
  downloadBlob(JSON.stringify(exportPayload, null, 2), "capa_register.json", "application/json;charset=utf-8");
});
if($("loadExistingFileBtn")){
  $("loadExistingFileBtn").addEventListener("click", () => {
    if(confirm("Load existing CAPA project file into browser? This will restore the existing project records and evidence images.")){
      capaData = JSON.parse(JSON.stringify(seedData));
      saveData();
      selectedCapaIds.clear();
      renderRows();
      renderActionLetters();
      showToast("Existing CAPA project file loaded into browser!");
    }
  });
}

$("loadJsonBtn").addEventListener("click", () => $("jsonFile").click());
$("jsonFile").addEventListener("change", e => {
  const file = e.target.files[0]; if(!file) return;
  const r = new FileReader();
  r.onload = () => {
    try{
      const data = JSON.parse(r.result);
      let records = [];
      let importedActionLetters = null;
      let importedHiddenColumns = null;

      if(Array.isArray(data)){
        records = data;
      } else if(data && typeof data === "object"){
        if(Array.isArray(data.capaData)){
          records = data.capaData;
        } else if(Array.isArray(data.data)){
          records = data.data;
        } else if(Array.isArray(data.records)){
          records = data.records;
        } else if(Array.isArray(data.items)){
          records = data.items;
        }
        if(Array.isArray(data.actionLetters)){
          importedActionLetters = data.actionLetters;
        }
        if(Array.isArray(data.hiddenColumns)){
          importedHiddenColumns = data.hiddenColumns;
        }
      }

      if(!records.length) throw new Error("empty or invalid JSON format");

      capaData = records.map((x, idx) => ({
        id: x.id || ("CAPA-" + Date.now() + "-" + idx),
        groupId: x.groupId || ("CAPA-GROUP-" + Date.now()),
        projectName: (x.projectName || x["Project Name"] || "").trim(),
        client: (x.client || x["Client"] || "").trim(),
        projectLocation: (x.projectLocation || x["Location of Project"] || x["Project Location"] || "").trim(),
        image: (x.image || "").replace(/^\/assets\//, "assets/"),
        nonConformance: (x.nonConformance || x["Non-Conformance"] || "").trim(),
        correctiveAction: (x.correctiveAction || x["Corrective Action"] || "").trim(),
        preventiveAction: (x.preventiveAction || x["Preventive Action"] || "").trim(),
        rootCause: (x.rootCause || x["Root Cause"] || "").trim(),
        owner: (x.owner || x["Responsible Party"] || "").trim(),
        dueDate: (x.dueDate || x["Due Date"] || "").trim(),
        coverage: (x.coverage || x["Coverage"] || "").trim(),
        remarks: (x.remarks || x["Remarks"] || "").trim(),
        status: (x.status || x["Status"] || "Open").trim()
      }));

      if(importedActionLetters !== null){
        actionLetters = importedActionLetters.map(al => ({
          ...al,
          html: (al.html || "").replace(/\/assets\//g, "assets/")
        }));
        try{ localStorage.setItem("capaActionLetters", JSON.stringify(actionLetters)); }catch(e){}
      }
      if(importedHiddenColumns !== null){
        hiddenColumns = importedHiddenColumns;
        try{ localStorage.setItem("capaHiddenColumns", JSON.stringify(hiddenColumns)); }catch(e){}
        applyColumnVisibility();
      }

      // Restore complete Report Compiler settings and column visibility if present
      if(data && typeof data === "object" && data.compilerSettings && typeof data.compilerSettings === "object"){
        const cs = data.compilerSettings;
        if(cs.paperOrientation && compilerPaperOrientation) compilerPaperOrientation.value = cs.paperOrientation;
        if(cs.wirPagination && compilerWirPagination) compilerWirPagination.value = cs.wirPagination;
        if(cs.letterPaperFormat && compilerLetterPaperFormat) compilerLetterPaperFormat.value = cs.letterPaperFormat;
        if(cs.letterPagination && compilerLetterPagination) compilerLetterPagination.value = cs.letterPagination;
        if(Array.isArray(cs.customWirPageBreaks)) customWirPageBreaks = cs.customWirPageBreaks;
        if(Array.isArray(cs.customLetterPageBreaks)) customLetterPageBreaks = cs.customLetterPageBreaks;
        if(typeof cs.includeActionLetters === "boolean" && compilerIncludeActionLetters){
          compilerIncludeActionLetters.checked = cs.includeActionLetters;
          if(compilerActionLetterOptions) compilerActionLetterOptions.style.display = cs.includeActionLetters ? "flex" : "none";
        }
        if(cs.letterSource && compilerLetterSource) compilerLetterSource.value = cs.letterSource;
        if(typeof cs.letterPageBreak === "boolean" && compilerLetterPageBreak) compilerLetterPageBreak.checked = cs.letterPageBreak;
        if(typeof cs.letterPhotos === "boolean" && compilerLetterPhotos) compilerLetterPhotos.checked = cs.letterPhotos;
        if(cs.statusMode && compilerStatusMode) compilerStatusMode.value = cs.statusMode;
        if(typeof cs.excludePrevClosed === "boolean" && compilerExcludePrevClosed) compilerExcludePrevClosed.checked = cs.excludePrevClosed;
        if(cs.docTitle !== undefined && compilerDocTitle) compilerDocTitle.value = cs.docTitle;
        if(cs.docCode !== undefined && compilerDocCode) compilerDocCode.value = cs.docCode;
        if(cs.revNo !== undefined && compilerRevNo) compilerRevNo.value = cs.revNo;
        if(cs.effDate !== undefined && compilerEffDate) compilerEffDate.value = cs.effDate;
        
        if(cs.customColPercentagesByOrientation) customColPercentagesByOrientation = cs.customColPercentagesByOrientation;
        if(cs.customActionLetterColPercentagesByOrientation) customActionLetterColPercentagesByOrientation = cs.customActionLetterColPercentagesByOrientation;

        if(Array.isArray(cs.hiddenCompilerColumns)){
          COMPILER_COLUMNS.forEach(col => {
            const el = document.getElementById(col.id);
            if(el) el.checked = !cs.hiddenCompilerColumns.includes(col.key);
          });
        } else if(Array.isArray(cs.activeCompilerColumns)){
          COMPILER_COLUMNS.forEach(col => {
            const el = document.getElementById(col.id);
            if(el) el.checked = cs.activeCompilerColumns.includes(col.key);
          });
        }
        renderCompilerPreview();
      }

      saveData();
      selectedCapaIds.clear();
      renderRows();
      renderActionLetters();
      showToast("JSON loaded successfully (" + capaData.length + " records" + (importedActionLetters ? ", " + importedActionLetters.length + " action letters" : "") + ")");
    }catch(err){
      console.error("JSON load error:", err);
      alert("Could not load JSON file. Please use a valid CAPA JSON export.");
    }
  };
  r.readAsText(file); e.target.value = "";
});
$("exportExcel").addEventListener("click", exportExcel);
$("exportCsv").addEventListener("click", exportCsv);
$("importCsvBtn").addEventListener("click", () => $("csvFile").click());
$("csvFile").addEventListener("change", e => {
  const file = e.target.files[0]; if(!file) return;
  const r = new FileReader();
  r.onload = () => {
    try{
      const imported = parseCsv(r.result).map(normalizeImportedRow).filter(x => x.projectName || x.nonConformance);
      if(!imported.length) throw new Error("empty");
      capaData = imported; saveData(); renderRows(); showToast("CSV imported");
    }catch(err){ alert("Could not import CSV. Please check the column headers."); }
  };
  r.readAsText(file); e.target.value = "";
});

document.querySelector("thead").addEventListener("contextmenu", e => {
  const th = e.target.closest("th");
  if(!th) return;
  e.preventDefault();
  openColumnMenu(e.clientX, e.clientY);
});

columnMenuList.addEventListener("change", e => {
  const input = e.target.closest("input[data-col]");
  if(!input) return;
  const index = Number(input.dataset.col);
  if(input.checked){
    hiddenColumns = hiddenColumns.filter(col => col !== index);
  } else {
    if(!hiddenColumns.includes(index)) hiddenColumns.push(index);
  }
  saveHiddenColumns();
  applyColumnVisibility();
});

document.addEventListener("click", e => {
  if(!columnMenu.contains(e.target)) closeColumnMenu();
});

document.addEventListener("keydown", e => {
  if(e.key === "Escape") closeColumnMenu();
});


if(actionLettersBtn){ actionLettersBtn.addEventListener("click", showActionLettersSheet); }
if(backToRegistry){ backToRegistry.addEventListener("click", showRegistrySheet); }

if(actionLetterSearch){ actionLetterSearch.addEventListener("input", renderActionLetters); }
if(actionLetterStatusFilter){ actionLetterStatusFilter.addEventListener("change", renderActionLetters); }

const saveActionLetterBtn = $("saveActionLetter");
if(saveActionLetterBtn){ saveActionLetterBtn.addEventListener("click", saveCurrentActionLetter); }

const deleteCurrentActionLetterBtn = $("deleteCurrentActionLetterBtn");
if(deleteCurrentActionLetterBtn){
  deleteCurrentActionLetterBtn.addEventListener("click", () => {
    if(currentOpenedActionLetterId){
      deleteActionLetter(currentOpenedActionLetterId, true);
    }
  });
}

if(actionLetterRows){
  actionLetterRows.addEventListener("click", e => {
    const del = e.target.closest("[data-delete-letter-id]");
    if(del){
      e.stopPropagation();
      e.preventDefault();
      deleteActionLetter(del.dataset.deleteLetterId);
      return;
    }
    const view = e.target.closest("[data-view-letter-id]");
    if(view){
      e.stopPropagation();
      e.preventDefault();
      openSavedActionLetter(view.dataset.viewLetterId);
      return;
    }
    const status = e.target.closest("[data-status-letter-id]");
    if(status){
      e.stopPropagation();
      printSavedActionLetter(status.dataset.statusLetterId);
      return;
    }
    const row = e.target.closest("tr[data-letter-id]");
    if(row) openSavedActionLetter(row.dataset.letterId);
  });
}

$("fitScreen").addEventListener("click", () => { document.body.classList.toggle("fit-mode"); document.body.classList.remove("minimized"); });
$("minimizeDash").addEventListener("click", () => { document.body.classList.toggle("minimized"); document.body.classList.remove("fit-mode"); });
$("expandDash").addEventListener("click", async () => {
  document.body.classList.toggle("expanded"); document.body.classList.remove("minimized");
  try{
    if(!document.fullscreenElement && document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
    else if(document.exitFullscreen) await document.exitFullscreen();
  }catch(err){}
});

/* === FINAL FIX: reliable Add NC / Edit CAPA Action Letter buttons === */
(function(){
  function val(id){ const el = document.getElementById(id); return el ? String(el.value || '').trim() : ''; }
  function esc(text){ return String(text ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c])); }
  function isEditOpen(){ const m = document.getElementById('editProjectModal'); return !!(m && m.classList.contains('active')); }
  function coverageFor(prefix){
    const start = val(prefix + 'CoverageStart');
    const end = val(prefix + 'CoverageEnd');
    if(!start && !end) return '';
    return (start || end) + ' to ' + (end || start);
  }
  function getActionLetterSource(){
    const edit = isEditOpen();
    const p = edit ? 'edit' : '';
    const id = edit ? function(name){ return 'edit' + name.charAt(0).toUpperCase() + name.slice(1); } : function(name){ return name; };
    return {
      mode: edit ? 'edit' : 'add',
      projectName: val(id('projectName')) || '[PROJECT NAME]',
      client: val(id('clientName')) || '[CLIENT NAME]',
      projectLocation: val(id('projectLocation')) || '[PROJECT LOCATION]',
      owner: val(id('owner')) || '[RESPONSIBLE PARTY]',
      nonConformance: val(id('nonConformance')) || '[NON-CONFORMANCE FINDING]',
      correctiveAction: val(id('correctiveAction')) || '[CORRECTIVE ACTION]',
      preventiveAction: val(id('preventiveAction')) || '[PREVENTIVE ACTION]',
      rootCause: val(id('rootCause')) || '[ROOT CAUSE]',
      dueDate: val(id('dueDate')) || '[DUE DATE]',
      status: val(id('status')) || 'Open',
      coverage: edit ? coverageFor('edit') : coverageFor('')
    };
  }


  function buildNcRowsForLetter(d){
    let entries = [];
    if(d.mode === 'add'){
      entries = Array.from(document.querySelectorAll('#ncEntriesWrap .nc-entry-card')).map(card => ({
        nonConformance:(card.querySelector('.nc-nonconformance')?.value || '').trim(),
        rootCause:(card.querySelector('.nc-rootcause')?.value || '').trim(),
        correctiveAction:(card.querySelector('.nc-corrective')?.value || '').trim(),
        preventiveAction:(card.querySelector('.nc-preventive')?.value || '').trim(),
        image:(card.querySelector('.nc-image-preview')?.src || '')
      })).filter(x => x.nonConformance || x.rootCause || x.correctiveAction || x.preventiveAction);
    }
    if(!entries.length){ entries = [d]; }
    return entries.map((entry, index) => {
      const imgHtml = entry.image ? `<div class="nc-cell-img-wrap" contenteditable="false"><img src="${esc(entry.image)}" alt="NC Evidence" class="nc-cell-image"></div>` : '';
      return `
              <tr>
                <td class="nc-no">${index + 1}</td>
                <td class="nc-finding-cell">
                  <div class="nc-finding-text"><strong>${esc(entry.nonConformance || '[NON-CONFORMANCE FINDING]')}</strong></div>
                  ${imgHtml}
                  <div class="nc-cell-img-placeholder no-print" contenteditable="false" style="${entry.image ? 'display:none;' : ''}">
                    <label class="nc-upload-label"><i class="fas fa-camera"></i> Attach Photo (1.25" × 1.25")<input type="file" class="nc-cell-img-input" accept="image/*" style="display:none;"></label>
                  </div>
                </td>
                <td>${esc(entry.rootCause || '[ROOT CAUSE]')}</td>
                <td>${esc(entry.correctiveAction || '[CORRECTIVE ACTION]')}</td>
                <td>${esc(entry.preventiveAction || '[PREVENTIVE ACTION]')}</td>
                <td>${esc(d.dueDate || '[DUE DATE]')}</td>
              </tr>`;
    }).join('');
  }

  window.buildActionLetterFromCurrentFields = function(){
    const d = getActionLetterSource();
    const today = new Date().toLocaleDateString('en-US', {year:'numeric', month:'long', day:'numeric'});
    const letterNo = 'AL-CAPA-' + new Date().toISOString().slice(0,10).replaceAll('-','') + '-001';
    return `
      <div class="letter-page">
        <table class="letter-header-table">
          <tr>
            <td class="letter-header-logo-cell">
              <img class="letter-logo" src="assets/action_letter_logo.jpg" alt="FCL Aranangg Development Corporation Logo">
            </td>
            <td class="letter-header-title-cell">
              <h1>ACTION LETTER</h1>
              <h2>CORRECTIVE AND PREVENTIVE ACTION (CAPA)</h2>
            </td>
            <td class="letter-header-contact-cell">
              <div class="letter-contact">
                <div><strong>QAQC- AL - 01</strong></div>
                <div><strong>Rev. No. : 0</strong></div>
                <div><strong>Eff. Date: 08/10/2026</strong></div>
              </div>
            </td>
          </tr>
        </table>
        <div class="letter-stripe"></div>
        <div class="letter-body">
          <table class="letter-info">
            <tr><th>DATE:</th><td>${esc(today)}</td></tr>
            <tr><th>ACTION LETTER NO.:</th><td>${esc(letterNo)}</td></tr>
            <tr><th>PROJECT:</th><td>${esc(d.projectName)}</td></tr>
            <tr><th>CLIENT:</th><td>${esc(d.client)}</td></tr>
            <tr><th>LOCATION / AREA:</th><td>${esc(d.projectLocation)}</td></tr>
            <tr><th>COVERAGE:</th><td>${esc(d.coverage || '[COVERAGE PERIOD]')}</td></tr>
            <tr><th>RESPONSIBLE PARTY:</th><td>${esc(d.owner)}</td></tr>
            <tr><th>STATUS:</th><td>${esc(d.status)}</td></tr>
            <tr><th>TARGET DUE DATE:</th><td><strong>${esc(d.dueDate)}</strong></td></tr>
          </table>
          <div class="letter-section"><div class="letter-section-title">Non-Conformance and CAPA Summary</div></div>
          <table class="nc-summary-table">
            <thead>
              <tr>
                <th class="nc-no">No.</th>
                <th>Non-Conformance Finding</th>
                <th>Root Cause</th>
                <th class="nc-action">Corrective Action</th>
                <th class="nc-action">Preventive Action</th>
                <th class="nc-date">Due Date</th>
              </tr>
            </thead>
            <tbody id="ncLetterRows">
              ${buildNcRowsForLetter(d)}
            </tbody>
          </table>
          <div class="letter-section">
            <div class="letter-section-title">Verification and Evidence Required</div>
            <div class="letter-section-content letter-editable" contenteditable="true">
              <strong>Required evidence for closure:</strong> inspection record, before-and-after photos, updated checklist / method statement, verification record, responsible discipline sign-off, and QAQC closure confirmation.
            </div>
          </div>
          <div class="letter-section">
            <div class="letter-section-title">Instruction to Project Manager</div>
            <div class="letter-section-content" contenteditable="true">
              <strong>The Project Manager is hereby directed to coordinate, implement, and monitor the required CAPA actions.</strong>
              The CAPA plan and supporting evidence shall be submitted to QAQC for verification on or before the target due date.
            </div>
          </div>
          <div class="letter-two-col signature-section">
            <div class="sign-box">
              <div class="sign-role">Prepared By</div>
              <div class="sign-sub">QAQC / CAPA Coordinator</div>
              <div class="sign-line">
                <label class="signature-upload-box">
                  <input type="file" accept="image/*" class="signature-input" data-target="prepared_by">
                  <span class="signature-upload-hint">CLICK TO UPLOAD SIGNATURE</span>
                  <img class="signature-preview" data-preview="prepared_by" alt="Prepared By signature">
                </label>
                <div class="signature-name-line"><input type="text" placeholder="Prepared By Name"></div>
                <div><strong>Date:</strong> <input type="date" class="signature-date-input"></div>
              </div>
            </div>
            <div class="sign-box">
              <div class="sign-role">Checked By</div>
              <div class="sign-sub">QAQC Manager / Authorized Representative</div>
              <div class="sign-line">
                <label class="signature-upload-box">
                  <input type="file" accept="image/*" class="signature-input" data-target="checked_by">
                  <span class="signature-upload-hint">CLICK TO UPLOAD SIGNATURE</span>
                  <img class="signature-preview" data-preview="checked_by" alt="Checked By signature">
                </label>
                <div class="signature-name-line"><input type="text" placeholder="Checked By Name"></div>
                <div><strong>Date:</strong> <input type="date" class="signature-date-input"></div>
              </div>
            </div>
          </div>
          <div class="letter-two-col signature-section">
            <div class="sign-box">
              <div class="sign-role">Operation Manager</div>
              <div class="sign-sub">Reviewer and Approver</div>
              <div class="sign-line">
                <label class="signature-upload-box">
                  <input type="file" accept="image/*" class="signature-input" data-target="operation_manager">
                  <span class="signature-upload-hint">CLICK TO UPLOAD SIGNATURE</span>
                  <img class="signature-preview" data-preview="operation_manager" alt="Operation Manager signature">
                </label>
                <div class="signature-name-line"><input type="text" placeholder="Operation Manager Name"></div>
                <div><strong>Date:</strong> <input type="date" class="signature-date-input"></div>
              </div>
            </div>
            <div class="sign-box">
              <div class="sign-role">Project Manager</div>
              <div class="sign-sub">Action Owner</div>
              <div class="sign-line">
                <label class="signature-upload-box">
                  <input type="file" accept="image/*" class="signature-input" data-target="project_manager">
                  <span class="signature-upload-hint">CLICK TO UPLOAD SIGNATURE</span>
                  <img class="signature-preview" data-preview="project_manager" alt="Project Manager signature">
                </label>
                <div class="signature-name-line"><input type="text" placeholder="Project Manager Name"></div>
                <div><strong>Date:</strong> <input type="date" class="signature-date-input"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="letter-footer"><div class="letter-footer-black">FCLGC QAQC CAPA ACTION LETTER</div><div class="letter-footer-red"></div></div>
      </div>`;
  };


  window.bindActionLetterSignatureUploads = function(container){
    const root = container || document;
    root.querySelectorAll('.signature-input').forEach(function(input){
      input.onchange = async function(){
        const file = input.files && input.files[0];
        const target = input.getAttribute('data-target');
        const box = input.closest('.signature-upload-box') || input.parentElement;
        const preview = box ? box.querySelector('.signature-preview') : root.querySelector('.signature-preview[data-preview="' + target + '"]');
        const hint = box ? box.querySelector('.signature-upload-hint') : null;
        if(!file || !preview) return;
        
        // Convert & compress signature image to clean, lightweight Base64 (max 600x300 at 0.85 quality)
        const compressedDataUrl = await readImageAsDataUrl(file, 600, 300, 0.85);
        if(compressedDataUrl){
          preview.src = compressedDataUrl;
          preview.style.display = 'block';
          if(hint) hint.style.display = 'none';
        }
      };
    });
  };

  window.bindNcCellImageUploads = function(container){
    const root = container || document;
    root.querySelectorAll('.nc-cell-img-input').forEach(function(input){
      input.onchange = async function(){
        const file = input.files && input.files[0];
        if(!file) return;
        
        // Convert & compress NC photo to optimized Base64 (max 1000x1000 at 0.8 quality)
        const compressedDataUrl = await readImageAsDataUrl(file, 1000, 1000, 0.8);
        if(!compressedDataUrl) return;
        
        const cell = input.closest('td');
        if(cell){
          let imgWrap = cell.querySelector('.nc-cell-img-wrap');
          if(!imgWrap){
            imgWrap = document.createElement('div');
            imgWrap.className = 'nc-cell-img-wrap';
            imgWrap.setAttribute('contenteditable', 'false');
            cell.appendChild(imgWrap);
          }
          imgWrap.innerHTML = '<img src="' + compressedDataUrl + '" alt="NC Evidence" class="nc-cell-image">';
          const placeholder = cell.querySelector('.nc-cell-img-placeholder');
          if(placeholder) placeholder.style.display = 'none';
        }
      };
    });
  };

  window.forceOpenCapaActionLetter = function(e){
    if(e){ e.preventDefault(); e.stopPropagation(); }
    currentOpenedActionLetterId = null;
    const deleteBtn = document.getElementById('deleteCurrentActionLetterBtn');
    if(deleteBtn) deleteBtn.style.display = 'none';

    const modal = document.getElementById('actionLetterModal');
    const content = document.getElementById('actionLetterContent');
    if(!modal || !content){ alert('Action Letter modal was not found.'); return false; }
    content.innerHTML = window.buildActionLetterFromCurrentFields();
    if(typeof window.bindActionLetterSignatureUploads === 'function'){
      window.bindActionLetterSignatureUploads();
    }
    if(typeof window.bindNcCellImageUploads === 'function'){
      window.bindNcCellImageUploads();
    }
    modal.style.display = 'flex';
    modal.style.zIndex = '99999';
    modal.classList.add('active');
    const wrap = modal.querySelector('.action-letter-preview-wrap');
    if(wrap){ wrap.scrollTop = 0; }
    return false;
  };

  ['actionLetterBtn','actionLetterTopBtn'].forEach(function(id){
    const btn = document.getElementById(id);
    if(btn){
      btn.setAttribute('type','button');
      btn.onclick = window.forceOpenCapaActionLetter;
      btn.addEventListener('click', window.forceOpenCapaActionLetter, true);
    }
  });

  const closeBtn = document.getElementById('closeActionLetter');
  if(closeBtn){
    closeBtn.onclick = function(e){
      if(e){ e.preventDefault(); e.stopPropagation(); }
      const modal = document.getElementById('actionLetterModal');
      if(modal){ modal.classList.remove('active'); modal.style.display = 'none'; }
      return false;
    };
  }


  /* Patch: Save Action Letter into Action Letters and preserve signee name/date in Print PDF */
  function getPrintableActionLetterHtml(){
    const source = document.getElementById('actionLetterContent');
    if(!source) return '';
    const clone = source.cloneNode(true);

    clone.querySelectorAll('input').forEach(function(input){
      if(input.type === 'file'){
        input.remove();
        return;
      }
      const value = input.value || input.getAttribute('value') || '';
      const span = document.createElement('span');
      span.className = input.classList.contains('signature-date-input') ? 'signature-date-print' : 'signature-name-print';
      span.textContent = value || (input.placeholder || '');
      input.replaceWith(span);
    });

    clone.querySelectorAll('.signature-upload-hint').forEach(function(hint){
      const img = hint.parentElement ? hint.parentElement.querySelector('img.signature-preview') : null;
      if(img && img.getAttribute('src')) hint.remove();
    });

    clone.querySelectorAll('img.signature-preview').forEach(function(img){
      if(img.getAttribute('src')){
        img.style.display = 'block';
      }
    });

    clone.querySelectorAll('.nc-cell-img-placeholder, .nc-upload-label').forEach(function(el){
      el.remove();
    });

    return clone.innerHTML;
  }

  function getActionLetterPrintCss(){
    return `@page{size:A4 portrait;margin:8mm;}
body{margin:0;background:white;font-family:Arial,Helvetica,sans-serif;color:#111827;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
*{box-sizing:border-box;max-width:100%;overflow-wrap:anywhere;}
.letter-a4-preview{width:100%!important;max-width:100%!important;min-height:auto!important;height:auto!important;margin:0 auto!important;background:white!important;border:0!important;border-radius:0!important;padding:0!important;box-shadow:none!important;overflow:visible!important;}
.letter-page{width:100%!important;min-height:auto!important;height:auto!important;background:white!important;color:#111827!important;font-size:9pt!important;line-height:1.35!important;position:relative!important;overflow:visible!important;}
.letter-header-table{width:100%!important;border-collapse:collapse!important;border:0!important;margin:0 0 2mm 0!important;table-layout:fixed!important;}
.letter-header-table td{border:0!important;padding:0 4px!important;vertical-align:middle!important;}
.letter-header-logo-cell{width:29%!important;text-align:left!important;vertical-align:middle!important;}
.letter-header-logo-cell .letter-logo,
.letter-header-logo-cell img{max-width:100%!important;max-height:40px!important;height:40px!important;width:auto!important;object-fit:contain!important;object-position:left center!important;display:block!important;}
.letter-header-title-cell{width:42%!important;text-align:center!important;padding:0 3px!important;vertical-align:middle!important;}
.letter-header-title-cell h1{margin:0!important;font-size:16px!important;line-height:1.05!important;letter-spacing:.05em!important;font-weight:900!important;color:#050505!important;white-space:nowrap!important;text-align:center!important;}
.letter-header-title-cell h2{margin:2px 0 0!important;font-size:8.5px!important;line-height:1.1!important;color:#e30613!important;font-weight:900!important;letter-spacing:.02em!important;white-space:nowrap!important;text-align:center!important;}
.letter-header-contact-cell{width:29%!important;text-align:right!important;vertical-align:middle!important;padding:0 4px!important;}
.letter-header-contact-cell .letter-contact,
.letter-contact{display:flex!important;flex-direction:column!important;gap:2px!important;font-size:7.5px!important;line-height:1.2!important;color:#111827!important;text-align:right!important;justify-content:center!important;white-space:nowrap!important;}
.letter-header-contact-cell .letter-contact div,
.letter-contact div{text-align:right!important;white-space:nowrap!important;font-size:7.5px!important;}
.letter-stripe{height:6px;margin:0 0 2.5mm 0;background:linear-gradient(90deg,#020617 0%,#020617 52%,#e30613 52%,#e30613 100%);-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}
.letter-body{padding:0 0 4mm;}
.letter-info{width:78%;border-collapse:collapse;margin:0 auto 3mm;font-size:9pt;table-layout:fixed;}
.letter-info th{width:34%;background:#050505!important;color:white!important;text-align:left;padding:3px 6px;border:1px solid #555;font-weight:900;text-transform:uppercase;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}
.letter-info td{padding:3px 6px;border:1px solid #777;font-weight:700;}
.letter-section{margin-bottom:2.5mm;border:1px solid #999;background:white;}
.letter-section-title{display:inline-flex;align-items:center;background:#050505!important;color:white!important;padding:4px 10px;min-width:180px;font-size:9pt;font-weight:900;text-transform:uppercase;letter-spacing:.03em;position:relative;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}
.letter-section-title:after{content:"";position:absolute;right:-16px;top:0;border-top:22px solid #e30613;border-right:16px solid transparent;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}
.letter-section-content{padding:5px 7px;min-height:24px;font-size:8.5pt;}
.letter-two-col{display:grid;grid-template-columns:1fr 1fr;border:1px solid #999;margin-bottom:2.5mm;}
.sign-box{padding:4px 6px;min-height:42px;border-right:1px solid #999;}
.sign-box:last-child{border-right:0;}.sign-role{font-size:8.5pt;font-weight:900;text-transform:uppercase;}.sign-sub{font-size:7.5pt;font-weight:700;margin-top:1px;line-height:1.1;}
.sign-line{margin-top:4px;display:grid;gap:2px;font-size:8pt;}
.signature-name-line{margin-top:1mm;display:grid;gap:0;font-size:8pt;text-align:center;font-weight:700;min-height:14px;}
.signature-name-print{display:block;width:100%;text-align:center;font-size:9pt;font-weight:700;min-height:14px;margin-top:2px;}
.signature-date-print{display:inline-block;min-width:90px;font-size:8pt;font-weight:700;margin-left:4px;}
.signature-block-container{page-break-inside:avoid!important;break-inside:avoid!important;margin-top:2.5mm;}
.letter-footer{display:grid;grid-template-columns:1.7fr .9fr;height:12mm;color:white;font-size:8.5pt;font-weight:900;letter-spacing:.04em;margin-top:3mm;}
.letter-footer-black{background:#050505!important;display:flex;align-items:center;padding-left:8mm;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}.letter-footer-red{background:#e30613!important;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}
.nc-summary-table{display:table;width:100%;border-collapse:collapse!important;table-layout:fixed;border:1px solid #000!important;margin:0 0 2.5mm 0;font-size:8pt!important;}
.nc-summary-table th,.nc-summary-table td{border:1px solid #000!important;padding:3px 2px;font-size:8pt!important;line-height:1.25;vertical-align:top;overflow-wrap:anywhere;word-break:break-word;}
.nc-summary-table td div,.nc-summary-table td strong{border:none!important;border:0!important;background:transparent!important;}
.nc-summary-table .nc-finding-cell{padding:0!important;vertical-align:top!important;}
.nc-summary-table .nc-finding-cell .nc-finding-text,.nc-summary-table .nc-finding-cell .nc-finding-text strong{color:#e30613!important;font-weight:700!important;border:none!important;border:0!important;background:transparent!important;box-shadow:none!important;outline:none!important;padding:0!important;margin:0!important;line-height:1.15!important;display:block!important;}
.nc-summary-table th{background:#050505!important;color:#fff!important;text-align:center;font-weight:900;white-space:normal;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}.nc-summary-table .nc-no{width:7%;text-align:center;}.nc-summary-table .nc-date{width:9%;}.nc-summary-table .nc-action{width:17%;}
.nc-cell-img-wrap{margin-top:4px;display:flex!important;justify-content:center!important;align-items:center!important;text-align:center!important;width:100%!important;}
.nc-cell-image{width:1.25in!important;height:1.25in!important;max-width:1.25in!important;max-height:1.25in!important;min-width:1.25in!important;min-height:1.25in!important;object-fit:cover!important;border:0!important;border:none!important;box-shadow:none!important;outline:none!important;border-radius:2px!important;display:block!important;margin:0 auto!important;}
.nc-cell-img-placeholder{display:none!important;}
.signature-upload-box{border:1px dashed #777!important;background:#fff!important;min-height:29px;height:29px;margin:0!important;padding:0!important;border-radius:4px;display:flex!important;align-items:center!important;justify-content:center!important;text-align:center!important;}
.signature-upload-box img[src]{display:block!important;max-height:26.4px!important;max-width:100%!important;margin:0 auto!important;padding:0!important;object-fit:contain!important;object-position:center center!important;}
.letter-page-break{display:block!important;page-break-after:always!important;break-after:page!important;height:0!important;min-height:0!important;max-height:0!important;line-height:0!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;overflow:hidden!important;}
.no-print,.page-break-toolbar,.page-break-title,.page-break-buttons,.page-break-label{display:none!important;visibility:hidden!important;}`;
  }

  function printActionLetterPatched(){
    const html = getPrintableActionLetterHtml();
    if(!html.trim()){
      if(typeof window.forceOpenCapaActionLetter === 'function') window.forceOpenCapaActionLetter();
    }
    const printableHtml = getPrintableActionLetterHtml();
    const css = getActionLetterPrintCss();

    let printFrame = document.getElementById("capaPrintFrame");
    if(!printFrame){
      printFrame = document.createElement("iframe");
      printFrame.id = "capaPrintFrame";
      printFrame.style.position = "fixed";
      printFrame.style.right = "0";
      printFrame.style.bottom = "0";
      printFrame.style.width = "0";
      printFrame.style.height = "0";
      printFrame.style.border = "0";
      printFrame.style.visibility = "hidden";
      document.body.appendChild(printFrame);
    }

    const frameDoc = printFrame.contentDocument || printFrame.contentWindow.document;
    frameDoc.open();
    frameDoc.write(`<!doctype html><html><head><meta charset="utf-8"><title>CAPA Action Letter</title><style>${css}</style></head><body><div class="letter-a4-preview">${printableHtml}</div></body></html>`);
    frameDoc.close();

    setTimeout(function(){
      try{
        printFrame.contentWindow.focus();
        printFrame.contentWindow.print();
      }catch(e){
        window.print();
      }
    }, 250);
  }

  function saveCurrentActionLetterPatched(){
    const content = document.getElementById('actionLetterContent');
    if(!content || !content.innerHTML.trim()){
      if(typeof window.forceOpenCapaActionLetter === 'function') window.forceOpenCapaActionLetter();
    }
    const meta = getCurrentLetterMeta();
    const printableHtml = getPrintableActionLetterHtml();
    const existingIndex = actionLetters.findIndex(item => item.letterNo === meta.letterNo && item.projectName === meta.projectName);
    const record = {...meta, id: existingIndex >= 0 ? actionLetters[existingIndex].id : meta.id, html: printableHtml};
    currentOpenedActionLetterId = record.id;
    const deleteBtn = document.getElementById('deleteCurrentActionLetterBtn');
    if(deleteBtn) deleteBtn.style.display = 'inline-flex';

    if(existingIndex >= 0){ actionLetters[existingIndex] = record; }
    else { actionLetters.unshift(record); }
    saveActionLetters();
    renderActionLetters();
    showToast(`Action Letter ${record.letterNo} logged into Action Letter Registry!`);
  }

  ['saveActionLetter', 'saveActionLetterTop', 'logActionLetterBtn'].forEach(function(saveButtonId){
    const saveActionLetterBtnPatch = document.getElementById(saveButtonId);
    if(saveActionLetterBtnPatch){
      saveActionLetterBtnPatch.addEventListener('click', function(e){
        e.preventDefault(); e.stopImmediatePropagation();
        saveCurrentActionLetterPatched();
        return false;
      }, true);
    }
  });

  const pageBreakBtnPatch = document.getElementById('addPageBreakBtn');
  if(pageBreakBtnPatch){
    pageBreakBtnPatch.addEventListener('click', function(e){
      e.preventDefault(); e.stopImmediatePropagation();
      insertPageBreakInActionLetter();
      return false;
    }, true);
  }

  const printActionLetterBtnPatch = document.getElementById('printActionLetter');
  if(printActionLetterBtnPatch){
    printActionLetterBtnPatch.addEventListener('click', function(e){
      e.preventDefault(); e.stopImmediatePropagation();
      printActionLetterPatched();
      return false;
    }, true);
  }

  printActionLetter = printActionLetterPatched;
  saveCurrentActionLetter = saveCurrentActionLetterPatched;

})();



/* CAPA HYBRID STATE BRIDGE - internal access for Python save/load */
window.__CAPA_STATE_BRIDGE_READY__ = true;
window.getCapaHybridState = function(){
  return {
    capaData: Array.isArray(capaData) ? capaData : [],
    actionLetters: Array.isArray(actionLetters) ? actionLetters : [],
    hiddenColumns: Array.isArray(hiddenColumns) ? hiddenColumns : []
  };
};
window.setCapaHybridState = function(state){
  state = state || {};
  if(Array.isArray(state.capaData)){
    capaData = state.capaData;
    localStorage.setItem("capaDataWorking", JSON.stringify(capaData));
  }
  if(Array.isArray(state.actionLetters)){
    actionLetters = state.actionLetters;
    localStorage.setItem("capaActionLetters", JSON.stringify(actionLetters));
  }
  if(Array.isArray(state.hiddenColumns)){
    hiddenColumns = state.hiddenColumns;
    localStorage.setItem("capaHiddenColumns", JSON.stringify(hiddenColumns));
  }
  try{ renderRows(); }catch(e){ console.error(e); }
  try{ renderActionLetters(); }catch(e){}
  try{ applyColumnVisibility(); }catch(e){}
};

renderRows();
})();
