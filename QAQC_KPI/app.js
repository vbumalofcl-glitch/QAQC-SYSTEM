/**
 * FCLaranang Development Corporation - QA/QC Interactive System
 * Master Standards & Specifications Linked Selection Engine
 */

function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
if (typeof window !== "undefined") {
    window.escapeHtml = escapeHtml;
}

// ==========================================================================
// 💰 UNIVERSAL PHILIPPINE PESO (₱) CURRENCY FORMATTER & PARSER ENGINE
// ==========================================================================

function formatPeso(val, showDecimals = false) {
    if (val === undefined || val === null || val === "") return "₱0";
    const num = typeof val === "number" ? val : parseFloat(String(val).replace(/[^0-9.-]/g, ''));
    if (isNaN(num)) return "₱0";
    if (showDecimals) {
        return "₱" + num.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    if (num % 1 !== 0) {
        return "₱" + num.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return "₱" + num.toLocaleString('en-PH');
}
if (typeof window !== "undefined") window.formatPeso = formatPeso;

function parsePeso(val) {
    if (val === undefined || val === null || val === "") return 0;
    if (typeof val === "number") return isNaN(val) ? 0 : val;
    const cleanStr = String(val).replace(/[^0-9.-]/g, '');
    const parsed = parseFloat(cleanStr);
    return isNaN(parsed) ? 0 : parsed;
}
if (typeof window !== "undefined") window.parsePeso = parsePeso;

function formatCurrencyInputField(input, showDecimals = false) {
    if (!input) return;
    const num = parsePeso(input.value);
    input.value = formatPeso(num, showDecimals);
}
if (typeof window !== "undefined") window.formatCurrencyInputField = formatCurrencyInputField;

function handleTotalBudgetInput(input) {
    const num = parsePeso(input.value);
    const proj = appState.projects[appState.activeProjectId];
    if (proj) {
        proj.budget = num;
    }
}
if (typeof window !== "undefined") window.handleTotalBudgetInput = handleTotalBudgetInput;

function onSandboxCostInput(input) {
    recalculateSandbox();
}
if (typeof window !== "undefined") window.onSandboxCostInput = onSandboxCostInput;

function handleBreakdownCostLive(input, idx, field) {
    const proj = appState.projects[appState.activeProjectId];
    const rowObj = proj ? proj.kpi2_logs.find(r => r.id === activeKPI2BreakdownRowId) : null;
    if (!rowObj || !rowObj.breakdown || !rowObj.breakdown[idx]) return;
    rowObj.breakdown[idx][field] = parsePeso(input.value);
}
if (typeof window !== "undefined") window.handleBreakdownCostLive = handleBreakdownCostLive;

function handleApprovedCostLive(input) {
    if (!activeKPI2BreakdownRowId) return;
    const proj = appState.projects[appState.activeProjectId];
    const rowObj = proj ? proj.kpi2_logs.find(r => r.id === activeKPI2BreakdownRowId) : null;
    if (!rowObj) return;
    rowObj.approvedCost = parsePeso(input.value);
    updateKPI2ApprovedCost(input.value);
}
if (typeof window !== "undefined") window.handleApprovedCostLive = handleApprovedCostLive;

// ==========================================================================
// 📅 UNIVERSAL TABLE DATE FORMATTER & QUARTER CALCULATION ENGINE
// ==========================================================================

const TABLE_SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatTableDate(dateVal) {
    if (!dateVal) return "";
    const str = String(dateVal).trim();
    if (!str || str === "-") return "";
    
    // Check YYYY-MM-DD or YYYY/MM/DD
    const isoMatch = str.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
    if (isoMatch) {
        const y = parseInt(isoMatch[1], 10);
        const m = parseInt(isoMatch[2], 10) - 1;
        const d = parseInt(isoMatch[3], 10);
        if (!isNaN(y) && !isNaN(m) && !isNaN(d) && m >= 0 && m <= 11) {
            return `${TABLE_SHORT_MONTHS[m]} ${d}, ${y}`;
        }
    }
    
    const parsed = new Date(str);
    if (!isNaN(parsed.getTime())) {
        const y = parsed.getFullYear();
        const m = parsed.getMonth();
        const d = parsed.getDate();
        if (m >= 0 && m <= 11) {
            return `${TABLE_SHORT_MONTHS[m]} ${d}, ${y}`;
        }
    }
    
    return str;
}
if (typeof window !== "undefined") window.formatTableDate = formatTableDate;

function normalizeDateISO(val) {
    if (!val) return "";
    const str = String(val).trim();
    if (!str || str === "-") return "";
    
    const isoMatch = str.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
    if (isoMatch) {
        const y = isoMatch[1];
        const m = isoMatch[2].padStart(2, '0');
        const d = isoMatch[3].padStart(2, '0');
        return `${y}-${m}-${d}`;
    }
    
    const parsed = new Date(str);
    if (!isNaN(parsed.getTime())) {
        const y = parsed.getFullYear();
        const m = String(parsed.getMonth() + 1).padStart(2, '0');
        const d = String(parsed.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }
    return str;
}
if (typeof window !== "undefined") window.normalizeDateISO = normalizeDateISO;

function getQuarterFromDate(dateVal) {
    if (!dateVal) return "Q1";
    const str = String(dateVal).trim();
    if (!str || str === "-") return "Q1";
    
    let month = -1;
    const isoMatch = str.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
    if (isoMatch) {
        month = parseInt(isoMatch[2], 10);
    } else {
        const parsed = new Date(str);
        if (!isNaN(parsed.getTime())) {
            month = parsed.getMonth() + 1;
        }
    }
    
    if (month >= 1 && month <= 3) return "Q1";
    if (month >= 4 && month <= 6) return "Q2";
    if (month >= 7 && month <= 9) return "Q3";
    if (month >= 10 && month <= 12) return "Q4";
    
    return "Q1";
}
if (typeof window !== "undefined") window.getQuarterFromDate = getQuarterFromDate;

function computeRowQuarter(kpiKey, row) {
    if (!row) return "Q1";
    let targetDate = "";
    if (kpiKey === "kpi1") {
        targetDate = row.dateRes || row.dateCond || "";
    } else if (kpiKey === "kpi2") {
        targetDate = row.date || "";
    } else if (kpiKey === "kpi3") {
        targetDate = row.date || "";
    } else if (kpiKey === "kpi4") {
        targetDate = row.dateIssued || "";
    } else if (kpiKey === "kpi5") {
        targetDate = row.targetDate || row.dateLogged || "";
    }
    return getQuarterFromDate(targetDate);
}
if (typeof window !== "undefined") window.computeRowQuarter = computeRowQuarter;

const ENGINEERING_DISCIPLINES = [
    "Structural Works",
    "Architectural Works",
    "Mechanical Works",
    "Electrical Works",
    "Plumbing & Sanitary Works",
    "Electronic Works"
];

// Master Standards & Specifications Initial Seed Data
const DEFAULT_SPECS_DICTIONARY = {
    kpi1_standards: [
        { id: "s1", discipline: "Structural Works", subDiscipline: "Concrete Works", test: "Concrete Cylinder Compressive Strength Test (28-day)", designReq: "fc' = 4,000 psi (27.5 MPa) min", designValue: 4000, unit: "psi", code: "NSCP 2015 Sec 405 / ASTM C39" },
        { id: "s1b", discipline: "Structural Works", subDiscipline: "Concrete Works", test: "Concrete Cylinder Compressive Strength Test (28-day)", designReq: "fc' = 3,000 psi (20.7 MPa) min", designValue: 3000, unit: "psi", code: "NSCP 2015 / ASTM C39" },
        { id: "s1c", discipline: "Structural Works", subDiscipline: "Concrete Works", test: "Concrete Cylinder Compressive Strength Test (28-day)", designReq: "fc' = 5,000 psi (34.5 MPa) min", designValue: 5000, unit: "psi", code: "NSCP 2015 / ASTM C39" },
        { id: "s2", discipline: "Structural Works", subDiscipline: "Rebar & Steel Works", test: "Rebar Tensile & Bending Strength Test", designReq: "Grade 60 (414 MPa) Yield Strength", designValue: 60, unit: "ksi", code: "NSCP 2015 / ASTM A615" },
        { id: "s2b", discipline: "Structural Works", subDiscipline: "Rebar & Steel Works", test: "Rebar Tensile & Bending Strength Test", designReq: "Grade 40 (275 MPa) Yield Strength", designValue: 40, unit: "ksi", code: "NSCP 2015 / ASTM A615" },
        { id: "s3", discipline: "Architectural Works", subDiscipline: "Curtain Wall & Fenestration", test: "Water Tightness Spray Test for Aluminum Windows", designReq: "Zero Water Infiltration at 500 Pa pressure", designValue: 500, unit: "Pa", code: "AAMA 501.2 / Spec Sec 08440" },
        { id: "s4", discipline: "Plumbing & Sanitary Works", subDiscipline: "Water Supply Lines", test: "Hydrostatic Pipe Pressure Leak Test (Riser Lines)", designReq: "150 psi sustained for 2 hours (0 pressure drop)", designValue: 150, unit: "psi", code: "Revised National Plumbing Code" },
        { id: "s5", discipline: "Plumbing & Sanitary Works", subDiscipline: "Sanitary & Storm Drainage", test: "Sanitary Gravity Flow Drainage Test", designReq: "Full flow 100% clear gravity discharge", designValue: 100, unit: "%", code: "Plumbing Code Sec 1205" },
        { id: "s6", discipline: "Electrical Works", subDiscipline: "Main Power Feeders", test: "Insulation Resistance & Megger Test (Main Feeder)", designReq: "≥ 100 MΩ resistance at 1000V DC test voltage", designValue: 100, unit: "MΩ", code: "PEC 2017 Part 1 / NEMA" },
        { id: "s7", discipline: "Electronic Works", subDiscipline: "FDAS & Fire Alarm", test: "FDAS Loop Signal & Battery Backup Test", designReq: "24-hour standby + 5-minute full alarm output", designValue: 24, unit: "hrs", code: "NFPA 72 / PEC 2017" },
        { id: "s8", discipline: "Mechanical Works", subDiscipline: "HVAC & Chilled Water", test: "Chilled Water Pipe Pressure & Flushing Test", designReq: "125 psi hydrostatic pressure + chemical flush", designValue: 125, unit: "psi", code: "PSME Code / ASHRAE 90.1" }
    ],
    kpi3_defects: [
        { id: "sd1", discipline: "Structural Works", subDiscipline: "Concrete Works", defectDesc: "Honeycombs present at column-beam junction" },
        { id: "sd1b", discipline: "Structural Works", subDiscipline: "Concrete Works", defectDesc: "Surface spalling and exposed aggregate at slab soffit" },
        { id: "sd2", discipline: "Architectural Works", subDiscipline: "Curtain Wall & Fenestration", defectDesc: "Water leakage at curtain wall mullion joint" },
        { id: "sd3", discipline: "Architectural Works", subDiscipline: "Finishes & Tiling", defectDesc: "Plaster wall hairline cracks and hollow floor tiles" },
        { id: "sd4", discipline: "Mechanical Works", subDiscipline: "HVAC & Chilled Water", defectDesc: "FCU drain pan condensation drip onto ceiling frame" },
        { id: "sd5", discipline: "Electrical Works", subDiscipline: "Wiring & Conduits", defectDesc: "Conduit pipe damaged cast inside concrete slab" },
        { id: "sd6", discipline: "Plumbing & Sanitary Works", subDiscipline: "Water Supply Lines", defectDesc: "Leaking PVC fitting coupling at riser shaft" },
        { id: "sd7", discipline: "Electronic Works", subDiscipline: "FDAS & Fire Alarm", defectDesc: "Loose RJ45 terminations in telecommunication rack" }
    ]
};

// ==========================================================================
// 🎯 CORPORATE QA/QC BENCHMARK & GOVERNANCE DEFAULT CONFIGURATION
// ==========================================================================
const DEFAULT_BENCHMARKS = {
    kpi1: {
        target: 95.0,
        passThreshold: 95.0,
        criticalFloor: 90.0,
        label: "First-Time Quality (FTQ %)",
        unit: "%"
    },
    kpi2: {
        target: 1.00,
        maxLimit: 2.00,
        passThreshold: 50.0,
        penaltyMultiplier: 25.0,
        zeroFloor: 4.00,
        label: "Quality Rework BOQ Rate",
        unit: "%"
    },
    kpi3: {
        target: 1.00,
        maxLimit: 2.00,
        passThreshold: 60.0,
        penaltyMultiplier: 20.0,
        zeroFloor: 5.00,
        areaGrid: 100,
        label: "Defect Density",
        unit: "defects/100m²"
    },
    kpi4: {
        targetSLA: 5.0,
        maxLimit: 7.0,
        passThreshold: 70.0,
        penaltyMultiplier: 15.0,
        billingHoldLimit: 14.0,
        label: "NCR Resolution Velocity",
        unit: "days"
    },
    kpi5: {
        passThreshold: 75.0,
        targetRate: 100.0,
        criticalCap: 50.0,
        criticalDeductor: 25.0,
        label: "Handover Punch List Clearance",
        unit: "%"
    },
    weights: {
        kpi1: 20.0,
        kpi2: 20.0,
        kpi3: 20.0,
        kpi4: 20.0,
        kpi5: 20.0
    },
    tiers: {
        tierA: 90.0,
        tierB: 75.0,
        tierC: 60.0
    }
};

// Projects Data Structure - 3 Sample Projects
const DEFAULT_PROJECTS = {
    "proj_1": {
        id: "proj_1",
        name: "Grand Horizon Heights - Tower 1",
        code: "FCL-2026-GHH1",
        location: "Bonifacio Global City, Taguig City, Metro Manila",
        budget: 150000000,
        area: 12500,
        subcontractors: "Structural (Alpha Concrete), MEPFS (PowerVolt), Arch (FinishPro)",
        phase: "Superstructure & MEPFS Rough-Ins",
        targetCompletion: "2026-12-15",
        turnoverDate: "2026-12-15",

        kpi1_logs: [
            { id: "t1", discipline: "Structural Works", subDiscipline: "Concrete Works", test: "Concrete Cylinder Compressive Strength Test (28-day)", req: "fc' = 4,000 psi (27.5 MPa) min", act: 4150, dateCond: "2026-02-14", dateRes: "2026-03-14", quarter: "Q1", remarks: "Pass" },
            { id: "t2", discipline: "Structural Works", subDiscipline: "Rebar & Steel Works", test: "Rebar Tensile & Bending Strength Test", req: "Grade 60 (414 MPa) Yield Strength", act: 62, dateCond: "2026-02-20", dateRes: "2026-02-25", quarter: "Q1", remarks: "Pass" },
            { id: "t3", discipline: "Plumbing & Sanitary Works", subDiscipline: "Water Supply Lines", test: "Hydrostatic Pipe Pressure Leak Test (Riser Lines)", req: "150 psi sustained for 2 hours (0 pressure drop)", act: 150, dateCond: "2026-04-10", dateRes: "2026-04-10", quarter: "Q2", remarks: "Pass" },
            { id: "t4", discipline: "Plumbing & Sanitary Works", subDiscipline: "Sanitary & Storm Drainage", test: "Sanitary Gravity Flow Drainage Test", req: "Full flow 100% clear gravity discharge", act: 85, dateCond: "2026-05-18", dateRes: "2026-05-18", quarter: "Q2", remarks: "Fail" },
            { id: "t5", discipline: "Electrical Works", subDiscipline: "Main Power Feeders", test: "Insulation Resistance & Megger Test (Main Feeder)", req: "≥ 100 MΩ resistance at 1000V DC test voltage", act: 110, dateCond: "2026-07-05", dateRes: "2026-07-05", quarter: "Q3", remarks: "Pass" },
            { id: "t6", discipline: "Electronic Works", subDiscipline: "FDAS & Fire Alarm", test: "FDAS Loop Signal & Battery Backup Test", req: "24-hour standby + 5-minute full alarm output", act: 24, dateCond: "2026-08-01", dateRes: "2026-08-01", quarter: "Q3", remarks: "Pass" },
            { id: "t7", discipline: "Architectural Works", subDiscipline: "Curtain Wall & Fenestration", test: "Water Tightness Spray Test for Aluminum Windows", req: "Zero Water Infiltration at 500 Pa pressure", act: 500, dateCond: "2026-10-12", dateRes: "2026-10-13", quarter: "Q4", remarks: "Pass" },
            { id: "t8", discipline: "Mechanical Works", subDiscipline: "HVAC & Chilled Water", test: "Chilled Water Pipe Pressure & Flushing Test", req: "125 psi hydrostatic pressure + chemical flush", act: 130, dateCond: "2026-11-04", dateRes: "2026-11-05", quarter: "Q4", remarks: "Pass" }
        ],

        kpi2_logs: [
            {
                id: "r1", discipline: "Structural Works", subDiscipline: "Concrete Works", desc: "Concrete honeycombing chipping & structural epoxy injection", approvedCost: 15000000, qty: 1, unit: "lot", labor: 87500, mat: 137500, date: "2026-02-15", quarter: "Q1",
                breakdown: [
                    { id: "b1", type: "parent", desc: "Chipping & Surface Preparation Activity", qty: 1, unit: "lot", labor: 35000, mat: 12500 },
                    { id: "b2", type: "child", desc: "Chipping Hammers & Safety Gear", qty: 5, unit: "set", labor: 0, mat: 7500 },
                    { id: "b3", type: "child", desc: "Laborers & Skilled Chippers", qty: 25, unit: "man-days", labor: 35000, mat: 5000 },
                    { id: "b4", type: "parent", desc: "Structural Epoxy Grout Injection Activity", qty: 1, unit: "lot", labor: 52500, mat: 125000 },
                    { id: "b5", type: "child", desc: "Structural Epoxy Resin Grout Pack", qty: 20, unit: "kits", labor: 0, mat: 110000 },
                    { id: "b6", type: "child", desc: "Injection Ports & Sealant Compound", qty: 15, unit: "sets", labor: 0, mat: 15000 },
                    { id: "b7", type: "child", desc: "Specialist Injection Technicians", qty: 15, unit: "man-days", labor: 52500, mat: 0 }
                ]
            },
            {
                id: "r2", discipline: "Plumbing & Sanitary Works", subDiscipline: "Water Supply Lines", desc: "Replacement of leaking PVC sanitary fittings at Level 4", approvedCost: 2500000, qty: 1, unit: "lot", labor: 12000, mat: 22400, date: "2026-04-18", quarter: "Q2",
                breakdown: [
                    { id: "b2_1", type: "parent", desc: "Disassembly & Pipe Removal Activity", qty: 1, unit: "lot", labor: 4000, mat: 2400 },
                    { id: "b2_2", type: "child", desc: "Demolition & Pipe Hangers Removal", qty: 8, unit: "hrs", labor: 4000, mat: 2400 },
                    { id: "b2_3", type: "parent", desc: "Installation of New PVC Sanitary Fittings", qty: 1, unit: "lot", labor: 8000, mat: 20000 },
                    { id: "b2_4", type: "child", desc: "Schedule 40 Heavy Duty PVC Elbows & Tees", qty: 12, unit: "pcs", labor: 0, mat: 14400 },
                    { id: "b2_5", type: "child", desc: "PVC Solvent Cement & Primer Cleaners", qty: 4, unit: "cans", labor: 0, mat: 5600 },
                    { id: "b2_6", type: "child", desc: "Plumber Journeyman Labor", qty: 8, unit: "man-days", labor: 8000, mat: 0 }
                ]
            },
            { id: "r3", discipline: "Architectural Works", subDiscipline: "Finishes & Tiling", desc: "Hacking and re-tiling of hollow wall tiles in master baths", approvedCost: 20000000, qty: 1, unit: "lot", labor: 99000, mat: 171000, date: "2026-07-22", quarter: "Q3", breakdown: [] },
            { id: "r4", discipline: "Electrical Works", subDiscipline: "Wiring & Conduits", desc: "Re-routing damaged conduit pipes cast in concrete slab", approvedCost: 3500000, qty: 1, unit: "lot", labor: 21600, mat: 28800, date: "2026-10-05", quarter: "Q4", breakdown: [] }
        ],

        kpi3_logs: [
            { id: "d1", discipline: "Structural Works", subDiscipline: "Concrete Works", desc: "Honeycombs present at column-beam junction", loc: "Level 2 Grid A-C", totalInspectedArea: 1200, defectCount: 18, area: 15, date: "2026-02-18", quarter: "Q1", severity: "Minor" },
            { id: "d2", discipline: "Architectural Works", subDiscipline: "Finishes & Tiling", desc: "Plaster wall hairline cracks and hollow floor tiles", loc: "Level 3 Corridor", totalInspectedArea: 2500, defectCount: 45, area: 40, date: "2026-04-22", quarter: "Q2", severity: "Moderate" },
            { id: "d3", discipline: "Mechanical Works", subDiscipline: "HVAC & Chilled Water", desc: "FCU drain pan condensation drip onto ceiling frame", loc: "Level 5 Executive Suite", totalInspectedArea: 800, defectCount: 8, area: 10, date: "2026-07-14", quarter: "Q3", severity: "Minor" },
            { id: "d4", discipline: "Electronic Works", subDiscipline: "FDAS & Fire Alarm", desc: "Loose RJ45 terminations in telecommunication rack", loc: "Telecom Room L1", totalInspectedArea: 500, defectCount: 3, area: 5, date: "2026-10-08", quarter: "Q4", severity: "Minor" }
        ],

        kpi4_logs: [
            { id: "n1", ncrNo: "NCR-2026-001", discipline: "Structural Works", subDiscipline: "Rebar & Steel Works", desc: "Rebar spacing deviation on Beam B-12", sub: "Alpha Concrete Corp", dateIssued: "2026-01-15", dateClosed: "2026-01-19", duration: 4, quarter: "Q1", status: "Closed" },
            { id: "n2", ncrNo: "NCR-2026-002", discipline: "Plumbing & Sanitary Works", subDiscipline: "Sanitary & Storm Drainage", desc: "Unapproved pipe brand installed on sewer line", sub: "FlowTech Plumbing", dateIssued: "2026-03-02", dateClosed: "2026-03-07", duration: 5, quarter: "Q1", status: "Closed" },
            { id: "n3", ncrNo: "NCR-2026-003", discipline: "Electrical Works", subDiscipline: "Panelboards & Distribution", desc: "Panelboard wire dressing non-compliant with PEC", sub: "PowerVolt Electrical", dateIssued: "2026-05-10", dateClosed: "2026-05-15", duration: 5, quarter: "Q2", status: "Closed" },
            { id: "n4", ncrNo: "NCR-2026-004", discipline: "Architectural Works", subDiscipline: "Finishes & Tiling", desc: "Waterproofing membrane thickness below 1.5mm spec", sub: "SealGuard Waterproofing", dateIssued: "2026-08-11", dateClosed: "2026-08-16", duration: 5, quarter: "Q3", status: "Closed" }
        ],

        kpi5_logs: [
            { id: "p1", itemNo: "PCH-001", dateLogged: "2026-10-01", discipline: "Architectural Works", subDiscipline: "Painting & Coating", desc: "Paint touch-ups required on hallway baseboards", loc: "Level 4 Corridor", cat: "Minor", sub: "FinishPro Arch", targetDate: "2026-11-30", actualDateRectified: "", quarter: "Q4", status: "In Progress" },
            { id: "p2", itemNo: "PCH-002", dateLogged: "2026-10-05", discipline: "Electrical Works", subDiscipline: "Wiring & Conduits", desc: "Missing cover plate on light switch box", loc: "Unit 502 Bed 1", cat: "Minor", sub: "PowerVolt", targetDate: "2026-12-05", actualDateRectified: "", quarter: "Q4", status: "Open" },
            { id: "p3", itemNo: "PCH-003", dateLogged: "2026-09-15", discipline: "Mechanical Works", subDiscipline: "HVAC & Chilled Water", desc: "Air duct vibration dampener replacement", loc: "L3 Mechanical Room", cat: "Critical", sub: "ElectroCool", targetDate: "2026-10-20", actualDateRectified: "2026-10-18", quarter: "Q4", status: "Signed-off" },
            { id: "p4", itemNo: "PCH-004", dateLogged: "2026-10-12", discipline: "Structural Works", subDiscipline: "Concrete Works", desc: "Minor surface honeycombs on shear wall", loc: "Grid B Shear Wall", cat: "Critical", sub: "Alpha Concrete", targetDate: "2026-11-15", actualDateRectified: "", quarter: "Q4", status: "In Progress" },
            { id: "p5", itemNo: "PCH-005", dateLogged: "2026-10-18", discipline: "Plumbing & Sanitary Works", subDiscipline: "Sanitary & Storm Drainage", desc: "Loose cleanout cap on main riser", loc: "Basement 1 Shaft", cat: "Minor", sub: "FlowTech", targetDate: "2026-12-01", actualDateRectified: "", quarter: "Q4", status: "Open" }
        ]
    },

    "proj_2": {
        id: "proj_2",
        name: "Metro Plaza Commercial Center - Block B",
        code: "FCL-2026-MPCC2",
        location: "Ortigas Center, Pasig City, Metro Manila",
        budget: 280000000,
        area: 22500,
        subcontractors: "Structural (SteelTech Corp), MEPFS (ElectroCool), Arch (GlassCraft & Tiles)",
        phase: "Superstructure Framing & Curtain Wall Installation",
        targetCompletion: "2027-03-30",
        turnoverDate: "2027-03-30",

        kpi1_logs: [
            { id: "p2_t1", discipline: "Structural Works", subDiscipline: "Rebar & Steel Works", test: "Rebar Tensile & Bending Strength Test", req: "Grade 60 (414 MPa) Yield Strength", act: 65, dateCond: "2026-01-18", dateRes: "2026-01-22", quarter: "Q1", remarks: "Pass" },
            { id: "p2_t2", discipline: "Structural Works", subDiscipline: "Concrete Works", test: "Concrete Cylinder Compressive Strength Test (28-day)", req: "fc' = 5,000 psi (34.5 MPa) min", act: 5200, dateCond: "2026-02-10", dateRes: "2026-03-10", quarter: "Q1", remarks: "Pass" },
            { id: "p2_t3", discipline: "Architectural Works", subDiscipline: "Curtain Wall & Fenestration", test: "Water Tightness Spray Test for Aluminum Windows", req: "Zero Water Infiltration at 500 Pa pressure", act: 500, dateCond: "2026-04-14", dateRes: "2026-04-15", quarter: "Q2", remarks: "Pass" },
            { id: "p2_t4", discipline: "Mechanical Works", subDiscipline: "HVAC & Chilled Water", test: "Chilled Water Pipe Pressure & Flushing Test", req: "125 psi hydrostatic pressure + chemical flush", act: 130, dateCond: "2026-06-20", dateRes: "2026-06-21", quarter: "Q2", remarks: "Pass" },
            { id: "p2_t5", discipline: "Electrical Works", subDiscipline: "Main Power Feeders", test: "Insulation Resistance & Megger Test (Main Feeder)", req: "≥ 100 MΩ resistance at 1000V DC test voltage", act: 120, dateCond: "2026-08-05", dateRes: "2026-08-05", quarter: "Q3", remarks: "Pass" }
        ],

        kpi2_logs: [
            { id: "p2_r1", discipline: "Structural Works", subDiscipline: "Rebar & Steel Works", desc: "Structural steel weld defect grinding and re-welding NDT", approvedCost: 5000000, qty: 15, unit: "joint", labor: 2500, mat: 1800, date: "2026-02-05", quarter: "Q1" },
            { id: "p2_r2", discipline: "Architectural Works", subDiscipline: "Curtain Wall & Fenestration", desc: "Curtain wall structural silicone sealant re-application", approvedCost: 8000000, qty: 30, unit: "lm", labor: 1200, mat: 2100, date: "2026-05-12", quarter: "Q2" },
            { id: "p2_r3", discipline: "Mechanical Works", subDiscipline: "HVAC & Chilled Water", desc: "Chilled water pipe insulation replacement at L4 shaft", approvedCost: 6500000, qty: 20, unit: "lm", labor: 1600, mat: 2400, date: "2026-08-20", quarter: "Q3" }
        ],

        kpi3_logs: [
            { id: "p2_d1", discipline: "Structural Works", subDiscipline: "Concrete Works", desc: "Honeycombs present at column-beam junction", loc: "Level 4 Shear Wall Grid 4", totalInspectedArea: 1500, defectCount: 22, area: 18, date: "2026-02-12", quarter: "Q1", severity: "Moderate" },
            { id: "p2_d2", discipline: "Architectural Works", subDiscipline: "Curtain Wall & Fenestration", desc: "Water leakage at curtain wall mullion joint", loc: "Level 6 North Elevation", totalInspectedArea: 1000, defectCount: 12, area: 12, date: "2026-05-18", quarter: "Q2", severity: "Minor" }
        ],

        kpi4_logs: [
            { id: "p2_n1", ncrNo: "NCR-2026-005", discipline: "Structural Works", subDiscipline: "Rebar & Steel Works", desc: "Unapproved structural welding rod E7018 brand used", sub: "SteelTech Corp", dateIssued: "2026-02-10", dateClosed: "2026-02-16", duration: 6, quarter: "Q1", status: "Closed" },
            { id: "p2_n2", ncrNo: "NCR-2026-006", discipline: "Architectural Works", subDiscipline: "Curtain Wall & Fenestration", desc: "Glass pane tint shade variation non-compliant with spec", sub: "GlassCraft Phils", dateIssued: "2026-05-22", dateClosed: "2026-05-27", duration: 5, quarter: "Q2", status: "Closed" }
        ],

        kpi5_logs: [
            { id: "p2_p1", itemNo: "PCH-006", dateLogged: "2026-10-10", discipline: "Architectural Works", subDiscipline: "Finishes & Tiling", desc: "Scratch on stainless elevator door jamb cladding", loc: "Ground Floor Lobby", cat: "Minor", sub: "GlassCraft", targetDate: "2026-11-15", actualDateRectified: "", quarter: "Q4", status: "Open" },
            { id: "p2_p2", itemNo: "PCH-007", dateLogged: "2026-09-28", discipline: "Electrical Works", subDiscipline: "Wiring & Conduits", desc: "Panelboard door grounding strap unattached", loc: "Substation B", cat: "Critical", sub: "ElectroCool", targetDate: "2026-10-30", actualDateRectified: "2026-10-25", quarter: "Q4", status: "Signed-off" }
        ]
    },

    "proj_3": {
        id: "proj_3",
        name: "Luzon Logistics & Industrial Warehouse Park",
        code: "FCL-2026-LLWP3",
        location: "Clark Freeport Zone, Pampanga",
        budget: 95000000,
        area: 18000,
        subcontractors: "Civil (MegaEarth), Structural (PreCast Phils), Electrical (VoltGrid)",
        phase: "Ground Slab Pouring & Steel Roof Trusses",
        targetCompletion: "2026-10-31",
        turnoverDate: "2026-10-31",

        kpi1_logs: [
            { id: "p3_t1", discipline: "Structural Works", subDiscipline: "Concrete Works", test: "Concrete Cylinder Compressive Strength Test (28-day)", req: "fc' = 4,000 psi (27.5 MPa) min", act: 4100, dateCond: "2026-01-25", dateRes: "2026-02-25", quarter: "Q1", remarks: "Pass" },
            { id: "p3_t2", discipline: "Electrical Works", subDiscipline: "Main Power Feeders", test: "Insulation Resistance & Megger Test (Main Feeder)", req: "≥ 100 MΩ resistance at 1000V DC test voltage", act: 105, dateCond: "2026-03-12", dateRes: "2026-03-12", quarter: "Q1", remarks: "Pass" },
            { id: "p3_t3", discipline: "Plumbing & Sanitary Works", subDiscipline: "Water Supply Lines", test: "Hydrostatic Pipe Pressure Leak Test (Riser Lines)", req: "150 psi sustained for 2 hours (0 pressure drop)", act: 155, dateCond: "2026-05-04", dateRes: "2026-05-04", quarter: "Q2", remarks: "Pass" },
            { id: "p3_t4", discipline: "Electronic Works", subDiscipline: "FDAS & Fire Alarm", test: "FDAS Loop Signal & Battery Backup Test", req: "24-hour standby + 5-minute full alarm output", act: 24, dateCond: "2026-07-28", dateRes: "2026-07-28", quarter: "Q3", remarks: "Pass" }
        ],

        kpi2_logs: [
            { id: "p3_r1", discipline: "Structural Works", subDiscipline: "Concrete Works", desc: "Subgrade soil compaction re-rolling and gravel bedding replacement", approvedCost: 30000000, qty: 100, unit: "sq.m", labor: 1500, mat: 2700, date: "2026-02-18", quarter: "Q1" },
            { id: "p3_r2", discipline: "Architectural Works", subDiscipline: "Finishes & Tiling", desc: "Corrugated roof sheet overlap flashing repair and silicone sealant", approvedCost: 7500000, qty: 50, unit: "lm", labor: 800, mat: 1200, date: "2026-06-15", quarter: "Q2" }
        ],

        kpi3_logs: [
            { id: "p3_d1", discipline: "Structural Works", subDiscipline: "Concrete Works", desc: "Surface spalling and exposed aggregate at slab soffit", loc: "Warehouse Bay 3 Floor Slab", totalInspectedArea: 1800, defectCount: 20, area: 25, date: "2026-02-22", quarter: "Q1", severity: "Minor" }
        ],

        kpi4_logs: [
            { id: "p3_n1", ncrNo: "NCR-2026-007", discipline: "Structural Works", subDiscipline: "Concrete Works", desc: "High subgrade soil moisture content prior to floor slab pouring", sub: "MegaEarth Civil", dateIssued: "2026-04-05", dateClosed: "2026-04-09", duration: 4, quarter: "Q2", status: "Closed" }
        ],

        kpi5_logs: [
            { id: "p3_p1", itemNo: "PCH-008", dateLogged: "2026-08-15", discipline: "Electrical Works", subDiscipline: "Wiring & Conduits", desc: "Missing safety wire support on high-bay LED light fixtures", loc: "Bay 2 High Bay Ceiling", cat: "Minor", sub: "VoltGrid", targetDate: "2026-09-30", actualDateRectified: "2026-09-25", quarter: "Q3", status: "Signed-off" }
        ]
    }
};

let appState = {
    activeProjectId: "proj_1",
    activeTab: "tab-overview",
    theme: "dark",
    projects: {},
    specs: JSON.parse(JSON.stringify(DEFAULT_SPECS_DICTIONARY)),
    isEditingBaseline: false,
    selectedCell: null,
    selectedRangeCells: [],
    isSelectingRange: false,
    rangeStartPos: null,
    isDraggingFillHandle: false,
    fillSourcePos: null,
    fillSourceValue: null,
    fillTargetCells: [],
    compiler: {
        projectScope: "ALL",
        selectedProjectIds: [],
        timeRange: "FY",
        compMode: "pop",
        baseQuarter: "Q1",
        targetQuarter: "Q2",
        kpis: {
            kpi1: { enabled: true, chart: true },
            kpi2: { enabled: true, chart: true },
            kpi3: { enabled: true, chart: true },
            kpi4: { enabled: true, chart: true },
            kpi5: { enabled: true, chart: true }
        }
    }
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
    loadAppState();
    initDate();
    applyCurrentTheme();
    renderProjectSelector();
    loadActiveProjectData();
    calculateAllKPIs();
    initColumnResizers();
    initRangeDragSelection();
    initFillHandleDrag();
    initContextMenuEngine();
    initBreakdownContextMenuEngine();
    initCellKeyboardEvents();
    initExecutiveCompiler();

    // Auto-fit SVG Line Graphs on Window Resize
    window.addEventListener("resize", () => {
        if (appState.activeTab === "tab-overview" || !appState.activeTab) renderQuarterlyRadarDashboard();
        else if (appState.activeTab === "tab-kpi1") renderKPI1LineGraph();
        else if (appState.activeTab === "tab-kpi2") renderKPI2LineGraph();
        else if (appState.activeTab === "tab-kpi3") renderKPI3LineGraph();
        else if (appState.activeTab === "tab-kpi4") renderKPI4LineGraph();
        else if (appState.activeTab === "tab-kpi5") renderKPI5LineGraph();
        else if (appState.activeTab === "tab-analytics") renderExecutiveAnalyticsBoxes();
        else if (appState.activeTab === "tab-executive") {
            renderCompiledVisualAnalytics();
            renderCompiledRadarSection(getCompilerTargetProjects(), appState.compiler.timeRange || "FY");
        }
    });
});

function initDate() {
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const dateEl = document.getElementById("reportDate");
    if (dateEl) dateEl.innerText = dateStr;
    const repGenDate = document.getElementById("repGeneratedDate");
    if (repGenDate) repGenDate.innerText = now.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
}

function loadAppState() {
    const saved = localStorage.getItem("FCL_QAQC_V5_STATE");
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            appState.projects = parsed.projects && typeof parsed.projects === 'object' ? parsed.projects : JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
            appState.specs = parsed.specs || JSON.parse(JSON.stringify(DEFAULT_SPECS_DICTIONARY));
            if (appState.specs.kpi1_standards) {
                appState.specs.kpi1_standards.forEach(s => { if (!s.unit) s.unit = "psi"; });
            }
            appState.theme = parsed.theme || "dark";

            Object.values(appState.projects).forEach(p => {
                if (!p.kpi1_logs) p.kpi1_logs = [];
                if (!p.kpi2_logs) p.kpi2_logs = [];
                if (!p.kpi3_logs) p.kpi3_logs = [];
                if (!p.kpi4_logs) p.kpi4_logs = [];
                if (!p.kpi5_logs) p.kpi5_logs = [];

                p.kpi1_logs.forEach(l => { l.quarter = computeRowQuarter("kpi1", l); });
                p.kpi2_logs.forEach(l => { l.quarter = computeRowQuarter("kpi2", l); });
                p.kpi3_logs.forEach(l => { l.quarter = computeRowQuarter("kpi3", l); });
                p.kpi4_logs.forEach(l => { l.quarter = computeRowQuarter("kpi4", l); });
                p.kpi5_logs.forEach(l => { l.quarter = computeRowQuarter("kpi5", l); });

                p.kpi2_logs.forEach(l => {
                    if (l.approvedCost === undefined || l.approvedCost === null || isNaN(parseFloat(l.approvedCost)) || parseFloat(l.approvedCost) <= 0) {
                        const qty = parseFloat(l.qty) || 1;
                        const labor = parseFloat(l.labor) || 0;
                        const mat = parseFloat(l.mat) || 0;
                        const subtotal = (labor + mat) * qty;
                        l.approvedCost = subtotal > 0 ? Math.round(subtotal * 25) : 2500000;
                    }
                });

                p.kpi5_logs.forEach(l => {
                    if (!l.dateLogged) {
                        l.dateLogged = l.targetDate ? (l.targetDate.slice(0, 8) + "01") : "2026-10-01";
                    }
                    if (l.actualDateRectified === undefined) {
                        l.actualDateRectified = (l.status === "Signed-off" || l.status === "Closed" || l.status === "Rectified") ? (l.targetDate || "") : "";
                    }
                });

                if (p.id === "proj_1" && p.kpi5_logs.length <= 2) {
                    p.kpi5_logs = JSON.parse(JSON.stringify(DEFAULT_PROJECTS["proj_1"].kpi5_logs));
                }
            });

            const projIds = Object.keys(appState.projects);
            if (projIds.length === 0) {
                appState.projects = JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
            }

            const validProjIds = Object.keys(appState.projects);
            appState.activeProjectId = parsed.activeProjectId && appState.projects[parsed.activeProjectId] ? parsed.activeProjectId : validProjIds[0];
            appState.graphSettings = parsed.graphSettings || {
                kpi1: { showLabels: "true", labelPos: "auto", fontSize: "11", fontWeight: "700", dateAngle: "auto" },
                kpi2: { showLabels: "true", labelPos: "auto", fontSize: "11", fontWeight: "700", dateAngle: "auto" },
                kpi3: { showLabels: "true", labelPos: "auto", fontSize: "11", fontWeight: "700", dateAngle: "auto" },
                kpi4: { showLabels: "true", labelPos: "auto", fontSize: "11", fontWeight: "700", dateAngle: "auto" },
                kpi5: { showLabels: "true", labelPos: "auto", fontSize: "11", fontWeight: "700", dateAngle: "auto", viewMode: "burndown" }
            };
            if (!appState.graphSettings.kpi5) {
                appState.graphSettings.kpi5 = { showLabels: "true", labelPos: "auto", fontSize: "11", fontWeight: "700", dateAngle: "auto", viewMode: "burndown" };
            }
            appState.benchmarks = parsed.benchmarks || JSON.parse(JSON.stringify(DEFAULT_BENCHMARKS));
        } catch (e) {
            appState.projects = JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
            appState.specs = JSON.parse(JSON.stringify(DEFAULT_SPECS_DICTIONARY));
            appState.benchmarks = JSON.parse(JSON.stringify(DEFAULT_BENCHMARKS));
            appState.activeProjectId = "proj_1";
            appState.theme = "dark";
            appState.graphSettings = {
                kpi1: { showLabels: "true", labelPos: "auto", fontSize: "11", fontWeight: "700", dateAngle: "auto" },
                kpi2: { showLabels: "true", labelPos: "auto", fontSize: "11", fontWeight: "700", dateAngle: "auto" },
                kpi3: { showLabels: "true", labelPos: "auto", fontSize: "11", fontWeight: "700", dateAngle: "auto" },
                kpi4: { showLabels: "true", labelPos: "auto", fontSize: "11", fontWeight: "700", dateAngle: "auto" },
                kpi5: { showLabels: "true", labelPos: "auto", fontSize: "11", fontWeight: "700", dateAngle: "auto", viewMode: "burndown" }
            };
        }
    } else {
        appState.projects = JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
        appState.specs = JSON.parse(JSON.stringify(DEFAULT_SPECS_DICTIONARY));
        appState.benchmarks = JSON.parse(JSON.stringify(DEFAULT_BENCHMARKS));
        appState.activeProjectId = "proj_1";
        appState.theme = "dark";
        appState.graphSettings = {
            kpi1: { showLabels: "true", labelPos: "auto", fontSize: "11", fontWeight: "700", dateAngle: "auto" },
            kpi2: { showLabels: "true", labelPos: "auto", fontSize: "11", fontWeight: "700", dateAngle: "auto" },
            kpi3: { showLabels: "true", labelPos: "auto", fontSize: "11", fontWeight: "700", dateAngle: "auto" },
            kpi4: { showLabels: "true", labelPos: "auto", fontSize: "11", fontWeight: "700", dateAngle: "auto" },
            kpi5: { showLabels: "true", labelPos: "auto", fontSize: "11", fontWeight: "700", dateAngle: "auto" }
        };
    }

    // Ensure benchmark configurations are synced
    syncRadarMetricConfigsWithBenchmarks();

    const activeProj = appState.projects[appState.activeProjectId];
    if (activeProj) {
        if (!activeProj.kpi1_logs) activeProj.kpi1_logs = [];
        if (!activeProj.kpi2_logs) activeProj.kpi2_logs = [];
        if (!activeProj.kpi3_logs) activeProj.kpi3_logs = [];
        if (!activeProj.kpi4_logs) activeProj.kpi4_logs = [];
        if (!activeProj.kpi5_logs) activeProj.kpi5_logs = [];
    }
}

function saveAppState() {
    localStorage.setItem("FCL_QAQC_V5_STATE", JSON.stringify(appState));
}

function switchTheme(themeName) {
    if (!["dark", "light", "crystal"].includes(themeName)) themeName = "dark";
    appState.theme = themeName;
    saveAppState();
    applyCurrentTheme();
}

function applyCurrentTheme() {
    const theme = appState.theme || "dark";
    document.body.setAttribute("data-theme", theme);
    const select = document.getElementById("themeSelect");
    if (select) select.value = theme;

    // Re-render graphs to match theme styling
    if (appState.activeTab === "tab-kpi1") renderKPI1LineGraph();
    else if (appState.activeTab === "tab-kpi2") renderKPI2LineGraph();
    else if (appState.activeTab === "tab-kpi3") renderKPI3LineGraph();
    else if (appState.activeTab === "tab-kpi4") renderKPI4LineGraph();
    else if (appState.activeTab === "tab-kpi5") renderKPI5LineGraph();
    else if (appState.activeTab === "tab-analytics") renderExecutiveAnalyticsBoxes();
}

function switchTab(tabId) {
    appState.activeTab = tabId;
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach(panel => panel.classList.remove("active"));

    const activeBtn = Array.from(document.querySelectorAll(".tab-btn")).find(b => {
        const attr = b.getAttribute("onclick");
        return attr ? attr.includes(tabId) : false;
    });
    if (activeBtn) activeBtn.classList.add("active");

    const targetPanel = document.getElementById(tabId);
    if (targetPanel) targetPanel.classList.add("active");

    if (tabId === "tab-overview") {
        renderQuarterlyRadarDashboard();
    } else if (tabId === "tab-specs") {
        renderMasterSpecsTables();
    } else if (tabId === "tab-kpi1") {
        updateSubDisciplineFilter("kpi1");
        updateDescFilter("kpi1");
        updateReqFilter("kpi1");
        syncGraphControlsUI("kpi1");
        renderKPI1Grid();
        renderKPI1LineGraph();
    } else if (tabId === "tab-kpi2") {
        updateSubDisciplineFilter("kpi2");
        updateDescFilter("kpi2");
        syncGraphControlsUI("kpi2");
        renderKPI2Grid();
        renderKPI2LineGraph();
    } else if (tabId === "tab-kpi3") {
        updateSubDisciplineFilter("kpi3");
        updateDescFilter("kpi3");
        syncGraphControlsUI("kpi3");
        renderKPI3Grid();
        renderKPI3LineGraph();
    } else if (tabId === "tab-kpi4") {
        updateSubDisciplineFilter("kpi4");
        updateDescFilter("kpi4");
        syncGraphControlsUI("kpi4");
        renderKPI4Grid();
        renderKPI4LineGraph();
    } else if (tabId === "tab-kpi5") {
        updateSubDisciplineFilter("kpi5");
        updateDescFilter("kpi5");
        syncGraphControlsUI("kpi5");
        const proj = appState.projects[appState.activeProjectId] || {};
        const kpi5TurnoverInput = document.getElementById("kpi5TurnoverDate");
        if (kpi5TurnoverInput) {
            kpi5TurnoverInput.value = proj.turnoverDate || proj.targetCompletion || "";
        }
        renderKPI5Grid();
        renderKPI5LineGraph();
    } else if (tabId === "tab-analytics") {
        renderExecutiveAnalyticsBoxes();
    } else if (tabId === "tab-executive") {
        initExecutiveCompiler();
        compileExecutiveReport();
    } else if (tabId === "tab-comprehension") {
        initComprehensionProjectSelector();
        renderGraphComprehensionTab();
    } else if (tabId === "tab-benchmarks") {
        renderBenchmarkEditorTab();
    }
}

function toggleTableVisibility(kpiKey, btnEl) {
    const wrapper = document.getElementById(`wrapper_${kpiKey}`);
    if (!wrapper) return;

    const chartBox = document.getElementById(`${kpiKey}LineChartBox`);

    if (wrapper.style.display === "none") {
        wrapper.style.display = "block";
        if (btnEl) btnEl.innerText = "👁️ Hide Table";
        if (chartBox) chartBox.classList.remove("expanded-graph");
    } else {
        wrapper.style.display = "none";
        if (btnEl) btnEl.innerText = "👁️ Show Table";
        if (chartBox) chartBox.classList.add("expanded-graph");
    }

    function refreshGraph() {
        if (kpiKey === "kpi1") renderKPI1LineGraph();
        else if (kpiKey === "kpi2") renderKPI2LineGraph();
        else if (kpiKey === "kpi3") renderKPI3LineGraph();
        else if (kpiKey === "kpi4") renderKPI4LineGraph();
        else if (kpiKey === "kpi5") renderKPI5LineGraph();
    }

    refreshGraph();
    setTimeout(refreshGraph, 50);
}

function toggleTextWrap(kpiKey) {
    const table = document.getElementById(`excel${kpiKey.toUpperCase()}`) || document.getElementById(`excelSpecs${kpiKey.slice(5)}`);
    if (table) table.classList.toggle("wrap-text");
}

function renderProjectSelector() {
    const select = document.getElementById("projectSelect");
    if (!select) return;
    select.innerHTML = "";
    Object.values(appState.projects).forEach(proj => {
        const option = document.createElement("option");
        option.value = proj.id;
        option.innerText = `${proj.name} (${proj.code || 'N/A'})`;
        if (proj.id === appState.activeProjectId) option.selected = true;
        select.appendChild(option);
    });
    populateCompilerProjectsList();
    initComprehensionProjectSelector();
}

function switchProject(projectId) {
    if (!appState.projects[projectId]) return;
    appState.activeProjectId = projectId;
    saveAppState();
    loadActiveProjectData();
    calculateAllKPIs();
}

function createNewProjectPrompt() {
    const name = prompt("Enter New Project Name:", "New Commercial Development");
    if (!name || !name.trim()) return;

    const id = "proj_" + Date.now();
    appState.projects[id] = {
        id: id,
        name: name.trim(),
        code: "FCL-2026-P" + (Object.keys(appState.projects).length + 1),
        location: "Metro Manila, Philippines",
        budget: 100000000,
        area: 10000,
        subcontractors: "Structural, Architectural, MEPFS Subcontractors",
        phase: "Substructure & Framing",
        targetCompletion: "",
        turnoverDate: "",
        kpi1_logs: [], kpi2_logs: [], kpi3_logs: [], kpi4_logs: [], kpi5_logs: []
    };
    appState.activeProjectId = id;
    saveAppState();
    renderProjectSelector();
    loadActiveProjectData();
    calculateAllKPIs();
}

let projectToDeleteId = null;

function deleteCurrentProjectPrompt(projId) {
    const targetId = projId || appState.activeProjectId;
    const proj = appState.projects[targetId];
    if (!proj) {
        alert("No active project found to delete.");
        return;
    }

    projectToDeleteId = targetId;

    const modal = document.getElementById("deleteProjectModal");
    const titleEl = document.getElementById("deleteModalProjectTitle");
    const subEl = document.getElementById("deleteModalProjectSub");
    const inputEl = document.getElementById("deleteConfirmInput");
    const confirmBtn = document.getElementById("confirmDeleteBtn");

    if (titleEl) titleEl.innerText = `Are you sure you want to delete "${proj.name}"?`;
    if (subEl) subEl.innerText = `Project Code: ${proj.code || 'N/A'} (ID: ${proj.id})`;
    if (inputEl) {
        inputEl.value = "";
        setTimeout(() => inputEl.focus(), 100);
    }
    if (confirmBtn) confirmBtn.disabled = true;

    if (modal) modal.classList.add("active");
}

function validateDeleteConfirmInput() {
    const inputEl = document.getElementById("deleteConfirmInput");
    const confirmBtn = document.getElementById("confirmDeleteBtn");
    if (!inputEl || !confirmBtn) return;

    const val = inputEl.value.trim().toUpperCase();
    confirmBtn.disabled = (val !== "DELETE");
}

function handleDeleteModalKeyUp(event) {
    if (event.key === "Enter") {
        const confirmBtn = document.getElementById("confirmDeleteBtn");
        if (confirmBtn && !confirmBtn.disabled) {
            executeProjectDelete();
        }
    }
}

function closeDeleteProjectModal() {
    const modal = document.getElementById("deleteProjectModal");
    if (modal) modal.classList.remove("active");
    projectToDeleteId = null;
}

function executeProjectDelete() {
    if (!projectToDeleteId || !appState.projects[projectToDeleteId]) {
        closeDeleteProjectModal();
        return;
    }

    const deletedProjName = appState.projects[projectToDeleteId].name;
    delete appState.projects[projectToDeleteId];

    const remainingProjectIds = Object.keys(appState.projects);

    if (remainingProjectIds.length > 0) {
        appState.activeProjectId = remainingProjectIds[0];
    } else {
        const newId = "proj_" + Date.now();
        appState.projects[newId] = {
            id: newId,
            name: "New QA/QC Project 1",
            code: "FCL-2026-P1",
            location: "Metro Manila, Philippines",
            budget: 100000000,
            area: 10000,
            subcontractors: "Structural, Architectural, MEPFS Subcontractors",
            phase: "Substructure & Framing",
            targetCompletion: "",
            turnoverDate: "",
            kpi1_logs: [], kpi2_logs: [], kpi3_logs: [], kpi4_logs: [], kpi5_logs: []
        };
        appState.activeProjectId = newId;
    }

    if (appState.isEditingBaseline) {
        cancelProjectInfoEdit();
    }

    saveAppState();
    closeDeleteProjectModal();
    renderProjectSelector();
    loadActiveProjectData();
    calculateAllKPIs();

    if (appState.activeTab) {
        switchTab(appState.activeTab);
    }

    alert(`🗑️ Project "${deletedProjName}" and all its contained data have been permanently deleted.`);
}

function loadActiveProjectData() {
    const proj = appState.projects[appState.activeProjectId];
    if (!proj) return;

    document.getElementById("projectName").value = proj.name || "";
    document.getElementById("projectCode").value = proj.code || "";
    const locInput = document.getElementById("projectLocation");
    if (locInput) locInput.value = proj.location || "";
    document.getElementById("totalBudget").value = proj.budget !== undefined ? formatPeso(proj.budget) : "";
    document.getElementById("totalArea").value = proj.area !== undefined ? proj.area : "";
    document.getElementById("tradeSubcontractors").value = proj.subcontractors || "";
    document.getElementById("constructionPhase").value = proj.phase || "";
    document.getElementById("targetCompletion").value = proj.targetCompletion || "";

    const kpi5TurnoverInput = document.getElementById("kpi5TurnoverDate");
    if (kpi5TurnoverInput) {
        kpi5TurnoverInput.value = proj.turnoverDate || proj.targetCompletion || "";
    }

    const sumProjEl = document.getElementById("sumProjectName");
    if (sumProjEl) sumProjEl.innerText = `Project: ${proj.name}`;
    const sumMetaEl = document.getElementById("sumMeta");
    if (sumMetaEl) sumMetaEl.innerText = `Code: ${proj.code || 'N/A'} | Location: ${proj.location || 'N/A'} | Budget: ${formatPeso(proj.budget || 0)} | Floor Area: ${Number(proj.area || 0).toLocaleString()} sq. m`;

    renderExcelGrids();
}

function toggleProjectInfoEdit() {
    appState.isEditingBaseline = true;
    document.querySelectorAll("#projectInfoForm .form-control").forEach(f => f.disabled = false);
    document.getElementById("projectFormActions").style.display = "flex";
    document.getElementById("toggleEditBtn").style.display = "none";
    const badge = document.getElementById("editStatusBadge");
    badge.className = "badge badge-yellow";
    badge.innerText = "Editing Mode";
}

function cancelProjectInfoEdit() {
    appState.isEditingBaseline = false;
    document.querySelectorAll("#projectInfoForm .form-control").forEach(f => f.disabled = true);
    document.getElementById("projectFormActions").style.display = "none";
    document.getElementById("toggleEditBtn").style.display = "inline-flex";
    const badge = document.getElementById("editStatusBadge");
    badge.className = "badge badge-locked";
    badge.innerText = "Locked View";
    loadActiveProjectData();
}

function saveProjectInfo(event) {
    event.preventDefault();
    const proj = appState.projects[appState.activeProjectId];
    if (!proj) return;

    proj.name = document.getElementById("projectName").value.trim();
    proj.code = document.getElementById("projectCode").value.trim();
    const locInput = document.getElementById("projectLocation");
    if (locInput) proj.location = locInput.value.trim();
    proj.budget = parsePeso(document.getElementById("totalBudget").value) || 0;
    proj.area = parseFloat(document.getElementById("totalArea").value) || 0;
    proj.subcontractors = document.getElementById("tradeSubcontractors").value.trim();
    proj.phase = document.getElementById("constructionPhase").value.trim();
    proj.targetCompletion = document.getElementById("targetCompletion").value;
    proj.turnoverDate = proj.targetCompletion;

    const kpi5TurnoverInput = document.getElementById("kpi5TurnoverDate");
    if (kpi5TurnoverInput) {
        kpi5TurnoverInput.value = proj.turnoverDate;
    }

    saveAppState();
    renderProjectSelector();
    cancelProjectInfoEdit();
    calculateAllKPIs();
}

function onKPI5TurnoverDateChange(val) {
    const proj = appState.projects[appState.activeProjectId];
    if (!proj) return;
    proj.turnoverDate = val;
    proj.targetCompletion = val;
    const targetCompInput = document.getElementById("targetCompletion");
    if (targetCompInput) targetCompInput.value = val;
    saveAppState();
    renderKPI5LineGraph();
}

// RENDER EXCEL STANDARDS & SPECS TAB
function renderMasterSpecsTables() {
    const kpi1Tbody = document.getElementById("specsKpi1TableBody");
    const kpi3Tbody = document.getElementById("specsKpi3TableBody");

    if (kpi1Tbody) {
        let html = "";
        (appState.specs.kpi1_standards || []).forEach((row, idx) => {
            html += `
                <tr data-row-id="${row.id}" data-kpi="specsKpi1" data-row-idx="${idx}">
                    <td class="col-seq">${idx + 1}</td>
                    <td class="excel-cell" data-col-idx="0" data-field="discipline">${row.discipline || 'Structural Works'}</td>
                    <td class="excel-cell" data-col-idx="1" data-field="subDiscipline">${row.subDiscipline || 'Concrete Works'}</td>
                    <td class="excel-cell" data-col-idx="2" data-field="test">${row.test || ''}</td>
                    <td class="excel-cell" data-col-idx="3" data-field="designReq">${row.designReq || ''}</td>
                    <td class="excel-cell" data-col-idx="4" data-field="designValue" data-type="number">${row.designValue !== undefined ? row.designValue : 0}</td>
                    <td class="excel-cell" data-col-idx="5" data-field="unit" data-type="select-unit">${row.unit || 'psi'}</td>
                    <td class="excel-cell" data-col-idx="6" data-field="code">${row.code || 'NSCP 2015'}</td>
                </tr>
            `;
        });
        if ((appState.specs.kpi1_standards || []).length === 0) html = `<tr><td colspan="8" style="text-align:center; color:var(--text-muted);">No standards. Click "+ Add Standard Row".</td></tr>`;
        kpi1Tbody.innerHTML = html;
        bindCellEvents(kpi1Tbody, "specsKpi1");
    }

    if (kpi3Tbody) {
        let html = "";
        (appState.specs.kpi3_defects || []).forEach((row, idx) => {
            html += `
                <tr data-row-id="${row.id}" data-kpi="specsKpi3" data-row-idx="${idx}">
                    <td class="col-seq">${idx + 1}</td>
                    <td class="excel-cell" data-col-idx="0" data-field="discipline">${row.discipline || 'Structural Works'}</td>
                    <td class="excel-cell" data-col-idx="1" data-field="subDiscipline">${row.subDiscipline || 'Concrete Works'}</td>
                    <td class="excel-cell" data-col-idx="2" data-field="defectDesc">${row.defectDesc || ''}</td>
                </tr>
            `;
        });
        if ((appState.specs.kpi3_defects || []).length === 0) html = `<tr><td colspan="4" style="text-align:center; color:var(--text-muted);">No defect specifications. Click "+ Add Defect Spec Row".</td></tr>`;
        kpi3Tbody.innerHTML = html;
        bindCellEvents(kpi3Tbody, "specsKpi3");
    }
}

function addNewSpecStandardRow() {
    const id = "s_" + Date.now();
    appState.specs.kpi1_standards.push({
        id: id,
        discipline: "Structural Works",
        subDiscipline: "Concrete Works",
        test: "New Test Specification",
        designReq: "fc' = 3,000 psi min",
        designValue: 3000,
        unit: "psi",
        code: "NSCP 2015 / ASTM"
    });
    saveAppState();
    renderMasterSpecsTables();
}

function addNewSpecDefectRow() {
    const id = "sd_" + Date.now();
    appState.specs.kpi3_defects.push({
        id: id,
        discipline: "Structural Works",
        subDiscipline: "Concrete Works",
        defectDesc: "New Defect Description Spec"
    });
    saveAppState();
    renderMasterSpecsTables();
}

// FILTER HELPER FUNCTION FOR SYNCHRONIZED TABLE & GRAPH FILTERING
function getFilteredKPILogs(kpiKey) {
    const proj = appState.projects[appState.activeProjectId];
    if (!proj) return [];

    let logs = proj[`${kpiKey}_logs`] || [];

    const qFilter = document.getElementById(`${kpiKey}QuarterFilter`)?.value || "ALL";
    const discFilter = document.getElementById(`${kpiKey}DisciplineFilter`)?.value || "ALL";
    const subFilter = document.getElementById(`${kpiKey}SubDisciplineFilter`)?.value || "ALL";
    const descFilter = document.getElementById(`${kpiKey}DescFilter`)?.value || "ALL";
    const reqFilter = document.getElementById(`${kpiKey}ReqFilter`)?.value || "ALL";

    if (qFilter !== "ALL") logs = logs.filter(l => l.quarter === qFilter);
    if (discFilter !== "ALL") logs = logs.filter(l => l.discipline === discFilter);
    if (subFilter !== "ALL") logs = logs.filter(l => l.subDiscipline === subFilter);

    if (descFilter !== "ALL") {
        if (kpiKey === "kpi1") logs = logs.filter(l => l.test === descFilter);
        else logs = logs.filter(l => l.desc === descFilter);
    }

    if (reqFilter !== "ALL" && kpiKey === "kpi1") {
        logs = logs.filter(l => l.req === reqFilter);
    }

    return logs;
}

function onKPIFilterChange(kpiKey) {
    if (kpiKey === "kpi1") { renderKPI1Grid(); renderKPI1LineGraph(); }
    else if (kpiKey === "kpi2") { renderKPI2Grid(); renderKPI2LineGraph(); }
    else if (kpiKey === "kpi3") { renderKPI3Grid(); renderKPI3LineGraph(); }
    else if (kpiKey === "kpi4") { renderKPI4Grid(); renderKPI4LineGraph(); }
    else if (kpiKey === "kpi5") { renderKPI5Grid(); renderKPI5LineGraph(); }
}

// EXCEL GRID RENDERERS WITH SYNCHRONIZED FILTER SUPPORT
function renderExcelGrids() {
    renderKPI1Grid();
    renderKPI2Grid();
    renderKPI3Grid();
    renderKPI4Grid();
    renderKPI5Grid();
}

function renderKPI1Grid() {
    const tbody = document.getElementById("kpi1ExcelBody");
    if (!tbody) return;

    let logs = getFilteredKPILogs("kpi1");
    let html = "";
    logs.forEach((row, idx) => {
        row.quarter = computeRowQuarter("kpi1", row);
        const isPass = row.remarks === "Pass";
        html += `
            <tr data-row-id="${row.id}" data-kpi="kpi1" data-row-idx="${idx}">
                <td class="col-seq">${idx + 1}</td>
                <td class="excel-cell" data-col-idx="0" data-field="discipline">${row.discipline || 'Structural Works'}</td>
                <td class="excel-cell" data-col-idx="1" data-field="subDiscipline">${row.subDiscipline || 'Concrete Works'}</td>
                <td class="excel-cell" data-col-idx="2" data-field="test">${row.test || ''}</td>
                <td class="excel-cell" data-col-idx="3" data-field="req" data-type="select-design-req">${row.req || 'fc\' = 4,000 psi min'}</td>
                <td class="excel-cell" data-col-idx="4" data-field="act" data-type="number">${row.act || 0}</td>
                <td class="excel-cell" data-col-idx="5" data-field="dateCond" data-type="date">${formatTableDate(row.dateCond)}</td>
                <td class="excel-cell" data-col-idx="6" data-field="dateRes" data-type="date">${formatTableDate(row.dateRes)}</td>
                <td class="excel-cell" data-col-idx="7" data-field="quarter" data-type="select-quarter" style="font-weight:700; color:#38bdf8;">${row.quarter || 'Q1'}</td>
                <td class="excel-cell" data-col-idx="8" data-field="remarks" data-type="select-remarks"><span class="status-badge ${isPass ? 'badge-green' : 'badge-red'}">${row.remarks || 'Pass'}</span></td>
            </tr>
        `;
    });
    if (logs.length === 0) html = `<tr><td colspan="10" style="text-align:center; color:var(--text-muted);">No entries match the current filter selection.</td></tr>`;
    tbody.innerHTML = html;
    bindCellEvents(tbody, "kpi1");
}

function renderKPI2Grid() {
    const tbody = document.getElementById("kpi2ExcelBody");
    if (!tbody) return;

    let logs = getFilteredKPILogs("kpi2");
    let html = "";
    let sumApprovedCost = 0;
    let sumQty = 0;
    let sumLaborTotal = 0;
    let sumMatTotal = 0;

    logs.forEach((row, idx) => {
        row.quarter = computeRowQuarter("kpi2", row);
        // If breakdown array exists and has items, roll up labor & mat totals
        if (row.breakdown && row.breakdown.length > 0) {
            let bLabor = 0, bMat = 0;
            row.breakdown.forEach(b => {
                const bQty = parseFloat(b.qty) || 0;
                bLabor += bQty * (parseFloat(b.labor) || 0);
                bMat += bQty * (parseFloat(b.mat) || 0);
            });
            row.labor = bLabor;
            row.mat = bMat;
        }

        const qty = parseFloat(row.qty) || 1;
        const labor = parseFloat(row.labor) || 0;
        const mat = parseFloat(row.mat) || 0;
        const laborTotal = qty * labor;
        const matTotal = qty * mat;
        const grandTotal = laborTotal + matTotal;
        const approvedCost = parseFloat(row.approvedCost) || 0;
        const itemReworkPct = approvedCost > 0 ? (grandTotal / approvedCost) * 100 : (grandTotal > 0 ? 100 : 0);
        const breakdownCount = (row.breakdown || []).length;

        sumApprovedCost += approvedCost;
        sumQty += qty;
        sumLaborTotal += laborTotal;
        sumMatTotal += matTotal;

        const isGood = itemReworkPct <= 1.0;
        const isWarn = itemReworkPct <= 2.0 && itemReworkPct > 1.0;
        const badgeClass = isGood ? "badge-green" : (isWarn ? "badge-yellow" : "badge-red");

        html += `
            <tr data-row-id="${row.id}" data-kpi="kpi2" data-row-idx="${idx}">
                <td class="col-seq">${idx + 1}</td>
                <td class="excel-cell" data-col-idx="0" data-field="discipline">${row.discipline || 'Structural Works'}</td>
                <td class="excel-cell" data-col-idx="1" data-field="subDiscipline">${row.subDiscipline || 'Concrete Works'}</td>
                <td class="excel-cell" data-col-idx="2" data-field="desc">${row.desc || ''}</td>
                <td class="excel-cell" data-col-idx="3" data-field="date" data-type="date">${formatTableDate(row.date)}</td>
                <td class="excel-cell" data-col-idx="4" data-field="approvedCost" data-type="currency" style="font-weight:700; color:#38bdf8;">${formatPeso(approvedCost)}</td>
                <td class="excel-cell" data-col-idx="5" data-field="qty" data-type="number">${qty}</td>
                <td class="excel-cell" data-col-idx="6" data-field="unit">${row.unit || 'lot'}</td>
                <td class="excel-cell readonly-cell"><strong>${formatPeso(laborTotal)}</strong></td>
                <td class="excel-cell readonly-cell"><strong>${formatPeso(matTotal)}</strong></td>
                <td class="excel-cell readonly-cell"><strong style="color:#60a5fa;">${formatPeso(grandTotal)}</strong></td>
                <td class="excel-cell readonly-cell"><span class="status-badge ${badgeClass}" style="font-size:11px; font-weight:700;">${itemReworkPct.toFixed(2)}%</span></td>
                <td class="excel-cell" data-col-idx="7" data-field="quarter" data-type="select-quarter" style="font-weight:700; color:#38bdf8;">${row.quarter || 'Q1'}</td>
                <td class="excel-cell readonly-cell">
                    <button class="btn btn-sm btn-outline" style="padding: 2px 6px; font-size: 10px; border-color: var(--excel-blue); color: #60a5fa;" onclick="openKPI2BreakdownModal('${row.id}')">
                        🔍 Breakdown (${breakdownCount})
                    </button>
                </td>
            </tr>
        `;
    });

    if (logs.length > 0) {
        const sumGrandTotal = sumLaborTotal + sumMatTotal;
        const overallReworkPct = sumApprovedCost > 0 ? (sumGrandTotal / sumApprovedCost) * 100 : (sumGrandTotal > 0 ? 100 : 0);
        const overallBadgeClass = overallReworkPct <= 1.0 ? "badge-green" : (overallReworkPct <= 2.0 ? "badge-yellow" : "badge-red");
        html += `
            <tr class="summary-grand-total-row">
                <td colspan="5" align="right" style="font-size: 11px; font-weight: 800; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.5px; padding-right: 12px;">
                    📊 TOTAL REWORK ESTIMATE COST:
                </td>
                <td style="font-weight: 800; color: #38bdf8;">${formatPeso(sumApprovedCost)}</td>
                <td align="center" style="font-weight: 700;">${sumQty}</td>
                <td align="center" style="font-weight: 700;">lots</td>
                <td style="font-weight: 800; color: var(--text-primary);">${formatPeso(sumLaborTotal)}</td>
                <td style="font-weight: 800; color: var(--text-primary);">${formatPeso(sumMatTotal)}</td>
                <td style="font-weight: 800; color: #10b981; font-size: 13px;">${formatPeso(sumGrandTotal)}</td>
                <td><span class="status-badge ${overallBadgeClass}" style="font-size:11px; font-weight:800;">${overallReworkPct.toFixed(2)}%</span></td>
                <td></td>
                <td></td>
            </tr>
        `;
    } else {
        html = `<tr><td colspan="14" style="text-align:center; color:var(--text-muted);">No BOQ items match the current filter selection.</td></tr>`;
    }

    tbody.innerHTML = html;
    bindCellEvents(tbody, "kpi2");
}

// 🏢 KPI 2 POPOUT BREAKDOWN MODAL ENGINE
let activeKPI2BreakdownRowId = null;

function openKPI2BreakdownModal(rowId) {
    activeKPI2BreakdownRowId = rowId;
    const proj = appState.projects[appState.activeProjectId];
    if (!proj || !proj.kpi2_logs) return;

    const rowObj = proj.kpi2_logs.find(r => r.id === rowId);
    if (!rowObj) return;

    if (!rowObj.breakdown) rowObj.breakdown = [];
    if (rowObj.approvedCost === undefined || rowObj.approvedCost === null || isNaN(parseFloat(rowObj.approvedCost))) {
        const qty = parseFloat(rowObj.qty) || 1;
        const labor = parseFloat(rowObj.labor) || 0;
        const mat = parseFloat(rowObj.mat) || 0;
        const curCost = (labor + mat) * qty;
        rowObj.approvedCost = curCost > 0 ? Math.round(curCost * 25) : 2500000;
    }

    renderKPI2BreakdownSummaryBanner(rowObj);

    const modal = document.getElementById("kpi2BreakdownModal");
    if (modal) modal.classList.add("active");

    renderKPI2BreakdownTable();
    setTimeout(() => { initColumnResizers(); }, 50);
}

function renderKPI2BreakdownSummaryBanner(rowObj) {
    const metaEl = document.getElementById("breakdownModalMeta");
    if (!metaEl || !rowObj) return;

    const approvedCost = parseFloat(rowObj.approvedCost) || 0;
    const qty = parseFloat(rowObj.qty) || 1;
    const labor = parseFloat(rowObj.labor) || 0;
    const mat = parseFloat(rowObj.mat) || 0;
    const grandTotal = (labor + mat) * qty;
    const itemReworkPct = approvedCost > 0 ? (grandTotal / approvedCost) * 100 : (grandTotal > 0 ? 100 : 0);

    const isGood = itemReworkPct <= 1.0;
    const isWarn = itemReworkPct <= 2.0 && itemReworkPct > 1.0;
    const color = isGood ? '#10b981' : (isWarn ? '#f59e0b' : '#ef4444');

    metaEl.innerHTML = `
        <div style="background: rgba(15, 23, 42, 0.75); border: 1px solid rgba(59, 130, 246, 0.35); border-radius: var(--radius-md); padding: 12px 16px; margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                <div style="flex: 1; min-width: 260px;">
                    <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700; letter-spacing: 0.5px;">📋 Rework Summary Item:</div>
                    <div style="font-size: 14.5px; font-weight: 800; color: #93c5fd; margin-top: 2px;">${rowObj.desc || 'Rework Summary Lot Item'}</div>
                    <div style="font-size: 12px; color: var(--text-secondary); margin-top: 3px;">
                        🏛️ <strong>${rowObj.discipline || 'General'}</strong> &bull; ${rowObj.subDiscipline || 'General'} &bull; Unit: <strong>${rowObj.unit || 'lot'}</strong> (Qty: ${qty}) &bull; Quarter: <strong>${rowObj.quarter || 'Q1'}</strong>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                    <div style="background: rgba(30, 41, 59, 0.85); border: 1px solid rgba(59, 130, 246, 0.4); border-radius: var(--radius-md); padding: 8px 12px;">
                        <label for="modalApprovedItemCostInput" style="font-size: 11px; font-weight: 700; color: #93c5fd; display: block; margin-bottom: 4px;">
                            💰 Approved Item Contract Cost (₱):
                        </label>
                        <div style="display: flex; align-items: center; gap: 4px;">
                            <input type="text" id="modalApprovedItemCostInput" class="styled-select currency-input" style="width: 170px; font-weight: 800; font-size: 13px; color: #38bdf8; background: var(--bg-card); border: 1px solid rgba(59, 130, 246, 0.5); padding: 4px 8px;" value="${formatPeso(approvedCost)}" placeholder="₱0" oninput="handleApprovedCostLive(this)" onblur="formatCurrencyInputField(this); updateKPI2ApprovedCost(this.value)">
                        </div>
                    </div>
                    <div style="background: rgba(30, 41, 59, 0.85); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 8px 14px; min-width: 130px; text-align: center;">
                        <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Item Rework Rate:</div>
                        <div id="modalItemReworkRate" style="font-size: 15px; font-weight: 800; color: ${color}; margin-top: 2px;">
                            ${itemReworkPct.toFixed(2)}%
                        </div>
                        <div id="modalItemReworkStatus" style="font-size: 9.5px; font-weight: 700; color: ${color}; margin-top: 1px;">
                            ${isGood ? '🟢 ≤ 1.0% (Contained)' : (isWarn ? '🟡 ≤ 2.0% (Controlled)' : '🔴 > 2.0% (Cap Breached)')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function updateKPI2ApprovedCost(val) {
    if (!activeKPI2BreakdownRowId) return;
    const proj = appState.projects[appState.activeProjectId];
    if (!proj || !proj.kpi2_logs) return;
    const rowObj = proj.kpi2_logs.find(r => r.id === activeKPI2BreakdownRowId);
    if (!rowObj) return;

    rowObj.approvedCost = parsePeso(val);
    saveAppState();

    const labor = parseFloat(rowObj.labor) || 0;
    const mat = parseFloat(rowObj.mat) || 0;
    const qty = parseFloat(rowObj.qty) || 1;
    const grandTotal = (labor + mat) * qty;
    const approvedCost = parseFloat(rowObj.approvedCost) || 0;
    const reworkPct = approvedCost > 0 ? (grandTotal / approvedCost) * 100 : (grandTotal > 0 ? 100 : 0);

    const isGood = reworkPct <= 1.0;
    const isWarn = reworkPct <= 2.0 && reworkPct > 1.0;
    const color = isGood ? '#10b981' : (isWarn ? '#f59e0b' : '#ef4444');

    const rateEl = document.getElementById("modalItemReworkRate");
    const statusEl = document.getElementById("modalItemReworkStatus");
    const appEl = document.getElementById("modalApprovedCostTotal");
    const pctEl = document.getElementById("modalReworkPctTotal");

    if (rateEl) { rateEl.innerText = `${reworkPct.toFixed(2)}%`; rateEl.style.color = color; }
    if (statusEl) {
        statusEl.innerText = isGood ? '🟢 ≤ 1.0% (Contained)' : (isWarn ? '🟡 ≤ 2.0% (Controlled)' : '🔴 > 2.0% (Cap Breached)');
        statusEl.style.color = color;
    }
    if (appEl) appEl.innerText = formatPeso(approvedCost);
    if (pctEl) { pctEl.innerText = `${reworkPct.toFixed(2)}%`; pctEl.style.color = color; }
}
if (typeof window !== "undefined") window.updateKPI2ApprovedCost = updateKPI2ApprovedCost;

function closeKPI2BreakdownModal() {
    const modal = document.getElementById("kpi2BreakdownModal");
    if (modal) modal.classList.remove("active");

    activeKPI2BreakdownRowId = null;
    saveAppState();
    renderKPI2Grid();
    calculateAllKPIs();
}

function renderKPI2BreakdownTable() {
    const tbody = document.getElementById("kpi2BreakdownTableBody");
    if (!tbody || !activeKPI2BreakdownRowId) return;

    const proj = appState.projects[appState.activeProjectId];
    const rowObj = proj ? proj.kpi2_logs.find(r => r.id === activeKPI2BreakdownRowId) : null;
    if (!rowObj) return;

    const breakdown = rowObj.breakdown || [];

    let totalLaborCost = 0;
    let totalMatCost = 0;
    let html = "";

    let currentParent = null;
    let currentParentChildren = [];

    function renderParentBlock(parentItem, children, parentIdx) {
        let blockHtml = "";
        let pLaborSum = 0;
        let pMatSum = 0;

        const hasChildren = children && children.length > 0;

        if (hasChildren) {
            // PARENT WITH CHILDREN: Merged Activity Group Header Banner (colspan="8")
            blockHtml += `
                <tr class="breakdown-row row-parent" data-row-idx="${parentIdx}">
                    <td align="center" style="font-weight:700; color:var(--text-muted);">${parentIdx + 1}</td>
                    <td align="center">
                        <div class="hierarchy-controls">
                            <button class="btn-indent" title="Make Parent Activity (Outdent)" onclick="toggleBreakdownHierarchy(${parentIdx}, 'parent')">&lt;</button>
                            <button class="btn-indent" title="Make Child Material (Indent 4mm)" onclick="toggleBreakdownHierarchy(${parentIdx}, 'child')">&gt;</button>
                        </div>
                    </td>
                    <td colspan="8">
                        <div class="desc-cell-wrap">
                            <input type="text" class="desc-input" style="font-weight:700; color:#60a5fa;" value="${(parentItem.desc || '').replace(/"/g, '&quot;')}" placeholder="Parent Activity Task Header..." data-idx="${parentIdx}" data-field="desc" onchange="updateBreakdownItem(${parentIdx}, 'desc', this.value)">
                        </div>
                    </td>
                </tr>
            `;

            // Child Rows
            children.forEach(c => {
                const qty = parseFloat(c.qty) || 0;
                const laborUnit = parseFloat(c.labor) || 0;
                const matUnit = parseFloat(c.mat) || 0;
                const laborTotal = qty * laborUnit;
                const matTotal = qty * matUnit;
                const subtotal = laborTotal + matTotal;

                pLaborSum += laborTotal;
                pMatSum += matTotal;

                blockHtml += `
                    <tr class="breakdown-row row-child" data-row-idx="${c.idx}">
                        <td align="center" style="font-weight:700; color:var(--text-muted);">${c.idx + 1}</td>
                        <td align="center">
                            <div class="hierarchy-controls">
                                <button class="btn-indent" title="Make Parent Activity (Outdent)" onclick="toggleBreakdownHierarchy(${c.idx}, 'parent')">&lt;</button>
                                <button class="btn-indent" title="Make Child Material (Indent 4mm)" onclick="toggleBreakdownHierarchy(${c.idx}, 'child')">&gt;</button>
                            </div>
                        </td>
                        <td>
                            <div class="desc-cell-wrap">
                                <input type="text" class="desc-input" value="${(c.desc || '').replace(/"/g, '&quot;')}" placeholder="Child Material / Sub-task..." data-idx="${c.idx}" data-field="desc" onchange="updateBreakdownItem(${c.idx}, 'desc', this.value)">
                            </div>
                        </td>
                        <td>
                            <input type="number" class="breakdown-num-input" value="${c.qty}" min="0" step="any" data-idx="${c.idx}" data-field="qty" onchange="updateBreakdownItem(${c.idx}, 'qty', this.value)">
                        </td>
                        <td>
                            <input type="text" class="breakdown-num-input" value="${c.unit || 'pcs'}" data-idx="${c.idx}" data-field="unit" onchange="updateBreakdownItem(${c.idx}, 'unit', this.value)">
                        </td>
                        <td>
                            <input type="text" class="breakdown-num-input breakdown-cost-input" value="${formatPeso(laborUnit)}" placeholder="₱0" data-idx="${c.idx}" data-field="labor" oninput="handleBreakdownCostLive(this, ${c.idx}, 'labor')" onblur="formatCurrencyInputField(this); updateBreakdownItem(${c.idx}, 'labor', this.value)">
                        </td>
                        <td style="font-weight:600;">${formatPeso(laborTotal)}</td>
                        <td>
                            <input type="text" class="breakdown-num-input breakdown-cost-input" value="${formatPeso(matUnit)}" placeholder="₱0" data-idx="${c.idx}" data-field="mat" oninput="handleBreakdownCostLive(this, ${c.idx}, 'mat')" onblur="formatCurrencyInputField(this); updateBreakdownItem(${c.idx}, 'mat', this.value)">
                        </td>
                        <td style="font-weight:600;">${formatPeso(matTotal)}</td>
                        <td style="font-weight:700; color:#60a5fa;">${formatPeso(subtotal)}</td>
                    </tr>
                `;
            });

            totalLaborCost += pLaborSum;
            totalMatCost += pMatSum;

            const pGrandSubtotal = pLaborSum + pMatSum;

            // Activity Group Subtotal Summary Row
            blockHtml += `
                <tr class="breakdown-row row-subtotal-summary">
                    <td colspan="6" align="right" style="font-size:11px; font-weight:700; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.5px; padding-right:12px;">
                        Subtotal for "${parentItem.desc || 'Activity'}":
                    </td>
                    <td style="font-weight:700;">${formatPeso(pLaborSum)}</td>
                    <td></td>
                    <td style="font-weight:700;">${formatPeso(pMatSum)}</td>
                    <td style="color:#60a5fa; font-weight:700;">${formatPeso(pGrandSubtotal)}</td>
                </tr>
            `;
        } else {
            // PARENT WITHOUT CHILDREN: Unmerged Row with ALL Individual Fillable Cells!
            const qty = parseFloat(parentItem.qty) || 1;
            const laborUnit = parseFloat(parentItem.labor) || 0;
            const matUnit = parseFloat(parentItem.mat) || 0;
            const laborTotal = qty * laborUnit;
            const matTotal = qty * matUnit;
            const subtotal = laborTotal + matTotal;

            totalLaborCost += laborTotal;
            totalMatCost += matTotal;

            blockHtml += `
                <tr class="breakdown-row row-parent" data-row-idx="${parentIdx}">
                    <td align="center" style="font-weight:700; color:var(--text-muted);">${parentIdx + 1}</td>
                    <td align="center">
                        <div class="hierarchy-controls">
                            <button class="btn-indent" title="Make Parent Activity (Outdent)" onclick="toggleBreakdownHierarchy(${parentIdx}, 'parent')">&lt;</button>
                            <button class="btn-indent" title="Make Child Material (Indent 4mm)" onclick="toggleBreakdownHierarchy(${parentIdx}, 'child')">&gt;</button>
                        </div>
                    </td>
                    <td>
                        <div class="desc-cell-wrap">
                            <input type="text" class="desc-input" style="font-weight:700; color:#60a5fa;" value="${(parentItem.desc || '').replace(/"/g, '&quot;')}" placeholder="Standalone Parent Task..." data-idx="${parentIdx}" data-field="desc" onchange="updateBreakdownItem(${parentIdx}, 'desc', this.value)">
                        </div>
                    </td>
                    <td>
                        <input type="number" class="breakdown-num-input" value="${qty}" min="0" step="any" data-idx="${parentIdx}" data-field="qty" onchange="updateBreakdownItem(${parentIdx}, 'qty', this.value)">
                    </td>
                    <td>
                        <input type="text" class="breakdown-num-input" value="${parentItem.unit || 'lot'}" data-idx="${parentIdx}" data-field="unit" onchange="updateBreakdownItem(${parentIdx}, 'unit', this.value)">
                    </td>
                    <td>
                        <input type="text" class="breakdown-num-input breakdown-cost-input" value="${formatPeso(laborUnit)}" placeholder="₱0" data-idx="${parentIdx}" data-field="labor" oninput="handleBreakdownCostLive(this, ${parentIdx}, 'labor')" onblur="formatCurrencyInputField(this); updateBreakdownItem(${parentIdx}, 'labor', this.value)">
                    </td>
                    <td style="font-weight:600;">${formatPeso(laborTotal)}</td>
                    <td>
                        <input type="text" class="breakdown-num-input breakdown-cost-input" value="${formatPeso(matUnit)}" placeholder="₱0" data-idx="${parentIdx}" data-field="mat" oninput="handleBreakdownCostLive(this, ${parentIdx}, 'mat')" onblur="formatCurrencyInputField(this); updateBreakdownItem(${parentIdx}, 'mat', this.value)">
                    </td>
                    <td style="font-weight:600;">${formatPeso(matTotal)}</td>
                    <td style="font-weight:700; color:#60a5fa;">${formatPeso(subtotal)}</td>
                </tr>
            `;
        }

        return blockHtml;
    }

    for (let i = 0; i < breakdown.length; i++) {
        const item = breakdown[i];
        if (item.type === "parent") {
            if (currentParent) {
                html += renderParentBlock(currentParent.item, currentParentChildren, currentParent.idx);
            }
            currentParent = { item, idx: i };
            currentParentChildren = [];
        } else {
            if (!currentParent) {
                currentParent = { item: { desc: "General Activities", type: "parent" }, idx: i };
            }
            currentParentChildren.push({ ...item, idx: i });
        }
    }
    if (currentParent) {
        html += renderParentBlock(currentParent.item, currentParentChildren, currentParent.idx);
    }

    if (breakdown.length === 0) {
        html = `<tr><td colspan="10" style="text-align:center; padding: 20px; color:var(--text-muted);">No breakdown items. Click "+ Add Row" below or right-click to insert rows.</td></tr>`;
    }

    tbody.innerHTML = html;

    const lotGrandTotal = totalLaborCost + totalMatCost;
    const approvedCost = parseFloat(rowObj.approvedCost) || 0;
    const reworkPct = approvedCost > 0 ? (lotGrandTotal / approvedCost) * 100 : (lotGrandTotal > 0 ? 100 : 0);
    const isGood = reworkPct <= 1.0;
    const isWarn = reworkPct <= 2.0 && reworkPct > 1.0;
    const color = isGood ? '#10b981' : (isWarn ? '#f59e0b' : '#ef4444');

    const rateEl = document.getElementById("modalItemReworkRate");
    const statusEl = document.getElementById("modalItemReworkStatus");
    if (rateEl) { rateEl.innerText = `${reworkPct.toFixed(2)}%`; rateEl.style.color = color; }
    if (statusEl) {
        statusEl.innerText = isGood ? '🟢 ≤ 1.0% (Contained)' : (isWarn ? '🟡 ≤ 2.0% (Controlled)' : '🔴 > 2.0% (Cap Breached)');
        statusEl.style.color = color;
    }

    const modalLaborEl = document.getElementById("modalLaborTotal");
    const modalMatEl = document.getElementById("modalMatTotal");
    const modalGrandEl = document.getElementById("modalGrandTotal");
    const modalApprovedEl = document.getElementById("modalApprovedCostTotal");
    const modalReworkPctEl = document.getElementById("modalReworkPctTotal");

    if (modalLaborEl) modalLaborEl.innerText = formatPeso(totalLaborCost);
    if (modalMatEl) modalMatEl.innerText = formatPeso(totalMatCost);
    if (modalGrandEl) modalGrandEl.innerText = formatPeso(lotGrandTotal);
    if (modalApprovedEl) modalApprovedEl.innerText = formatPeso(approvedCost);
    if (modalReworkPctEl) { modalReworkPctEl.innerText = `${reworkPct.toFixed(2)}%`; modalReworkPctEl.style.color = color; }

    // Roll up totals to main KPI 2 summary row
    rowObj.labor = totalLaborCost;
    rowObj.mat = totalMatCost;
}

function toggleBreakdownHierarchy(idx, newType) {
    const proj = appState.projects[appState.activeProjectId];
    const rowObj = proj ? proj.kpi2_logs.find(r => r.id === activeKPI2BreakdownRowId) : null;
    if (!rowObj || !rowObj.breakdown || !rowObj.breakdown[idx]) return;

    rowObj.breakdown[idx].type = newType;
    renderKPI2BreakdownTable();
}

function updateBreakdownItem(idx, field, value) {
    const proj = appState.projects[appState.activeProjectId];
    const rowObj = proj ? proj.kpi2_logs.find(r => r.id === activeKPI2BreakdownRowId) : null;
    if (!rowObj || !rowObj.breakdown || !rowObj.breakdown[idx]) return;

    if (field === "labor" || field === "mat") {
        rowObj.breakdown[idx][field] = parsePeso(value);
    } else if (field === "qty") {
        rowObj.breakdown[idx][field] = parseFloat(value) || 0;
    } else {
        rowObj.breakdown[idx][field] = value;
    }

    renderKPI2BreakdownTable();
}

function addBreakdownRow(atIndex) {
    const proj = appState.projects[appState.activeProjectId];
    const rowObj = proj ? proj.kpi2_logs.find(r => r.id === activeKPI2BreakdownRowId) : null;
    if (!rowObj) return;

    if (!rowObj.breakdown) rowObj.breakdown = [];

    const newItem = {
        id: "b_" + Date.now(),
        type: "parent",
        desc: "New Item",
        qty: 1,
        unit: "pcs",
        labor: 0,
        mat: 0
    };

    if (atIndex !== undefined && atIndex >= 0 && atIndex <= rowObj.breakdown.length) {
        rowObj.breakdown.splice(atIndex, 0, newItem);
    } else {
        rowObj.breakdown.push(newItem);
    }

    renderKPI2BreakdownTable();
}

function deleteBreakdownItem(idx) {
    const proj = appState.projects[appState.activeProjectId];
    const rowObj = proj ? proj.kpi2_logs.find(r => r.id === activeKPI2BreakdownRowId) : null;
    if (!rowObj || !rowObj.breakdown) return;

    rowObj.breakdown.splice(idx, 1);
    renderKPI2BreakdownTable();
}

// BREAKDOWN CONTEXT MENU ENGINE
let activeBreakdownContextIdx = 0;
let activeBreakdownContextTargetInput = null;

function initBreakdownContextMenuEngine() {
    document.addEventListener("contextmenu", (e) => {
        const modalTarget = e.target.closest("#kpi2BreakdownModal");
        if (!modalTarget) return;

        const tr = e.target.closest("tr.breakdown-row");
        if (!tr) return;

        const rowIdxAttr = tr.getAttribute("data-row-idx");
        if (rowIdxAttr === null) return;

        e.preventDefault();
        e.stopPropagation();

        activeBreakdownContextIdx = parseInt(rowIdxAttr);
        activeBreakdownContextTargetInput = e.target.closest("input");

        const menu = document.getElementById("breakdownContextMenu");
        if (menu) {
            menu.style.display = "block";
            menu.style.left = `${e.clientX}px`;
            menu.style.top = `${e.clientY}px`;
            menu.style.zIndex = "200000";
        }
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest("#breakdownContextMenu")) {
            const menu = document.getElementById("breakdownContextMenu");
            if (menu) menu.style.display = "none";
        }
    });
}

function handleBreakdownCopy() {
    if (activeBreakdownContextTargetInput && activeBreakdownContextTargetInput.value) {
        navigator.clipboard.writeText(activeBreakdownContextTargetInput.value);
    }
    const menu = document.getElementById("breakdownContextMenu");
    if (menu) menu.style.display = "none";
}

function handleBreakdownPaste() {
    if (activeBreakdownContextTargetInput) {
        navigator.clipboard.readText().then(text => {
            if (text && activeBreakdownContextTargetInput) {
                activeBreakdownContextTargetInput.value = text;
                activeBreakdownContextTargetInput.dispatchEvent(new Event("change"));
            }
        });
    }
    const menu = document.getElementById("breakdownContextMenu");
    if (menu) menu.style.display = "none";
}

function handleBreakdownInsertAbove() {
    addBreakdownRow(activeBreakdownContextIdx);
    const menu = document.getElementById("breakdownContextMenu");
    if (menu) menu.style.display = "none";
}

function handleBreakdownInsertBelow() {
    addBreakdownRow(activeBreakdownContextIdx + 1);
    const menu = document.getElementById("breakdownContextMenu");
    if (menu) menu.style.display = "none";
}

function handleBreakdownDeleteRow() {
    deleteBreakdownItem(activeBreakdownContextIdx);
    const menu = document.getElementById("breakdownContextMenu");
    if (menu) menu.style.display = "none";
}

function handleBreakdownClearCell() {
    if (activeBreakdownContextTargetInput) {
        activeBreakdownContextTargetInput.value = "";
        activeBreakdownContextTargetInput.dispatchEvent(new Event("change"));
    }
    const menu = document.getElementById("breakdownContextMenu");
    if (menu) menu.style.display = "none";
}

function deleteBreakdownItem(idx) {
    const proj = appState.projects[appState.activeProjectId];
    const rowObj = proj ? proj.kpi2_logs.find(r => r.id === activeKPI2BreakdownRowId) : null;
    if (!rowObj || !rowObj.breakdown) return;

    rowObj.breakdown.splice(idx, 1);
    renderKPI2BreakdownTable();
}

function renderKPI3Grid() {
    const tbody = document.getElementById("kpi3ExcelBody");
    if (!tbody) return;

    let logs = getFilteredKPILogs("kpi3");
    let html = "";
    logs.forEach((row, idx) => {
        row.quarter = computeRowQuarter("kpi3", row);
        const sevClass = row.severity === "Major" ? "badge-red" : (row.severity === "Moderate" ? "badge-yellow" : "badge-green");
        const totalAreaVal = row.totalInspectedArea !== undefined ? row.totalInspectedArea : (row.totalArea !== undefined ? row.totalArea : 1000);
        const defectCountVal = row.defectCount !== undefined ? row.defectCount : (row.defects !== undefined ? row.defects : 1);
        html += `
            <tr data-row-id="${row.id}" data-kpi="kpi3" data-row-idx="${idx}">
                <td class="col-seq">${idx + 1}</td>
                <td class="excel-cell" data-col-idx="0" data-field="discipline">${row.discipline || 'Structural Works'}</td>
                <td class="excel-cell" data-col-idx="1" data-field="subDiscipline">${row.subDiscipline || 'Concrete Works'}</td>
                <td class="excel-cell" data-col-idx="2" data-field="desc" data-type="select-defect-desc">${row.desc || ''}</td>
                <td class="excel-cell" data-col-idx="3" data-field="loc">${row.loc || ''}</td>
                <td class="excel-cell" data-col-idx="4" data-field="totalInspectedArea" data-type="number">${totalAreaVal}</td>
                <td class="excel-cell" data-col-idx="5" data-field="defectCount" data-type="number">${defectCountVal}</td>
                <td class="excel-cell" data-col-idx="6" data-field="area" data-type="number">${row.area || 0}</td>
                <td class="excel-cell" data-col-idx="7" data-field="date" data-type="date">${formatTableDate(row.date)}</td>
                <td class="excel-cell" data-col-idx="8" data-field="quarter" data-type="select-quarter" style="font-weight:700; color:#38bdf8;">${row.quarter || 'Q1'}</td>
                <td class="excel-cell" data-col-idx="9" data-field="severity" data-type="select-severity"><span class="status-badge ${sevClass}">${row.severity || 'Minor'}</span></td>
            </tr>
        `;
    });
    if (logs.length === 0) html = `<tr><td colspan="11" style="text-align:center; color:var(--text-muted);">No entries match the current filter selection.</td></tr>`;
    tbody.innerHTML = html;
    bindCellEvents(tbody, "kpi3");
}

function renderKPI4Grid() {
    const tbody = document.getElementById("kpi4ExcelBody");
    if (!tbody) return;

    let logs = getFilteredKPILogs("kpi4");
    let html = "";
    logs.forEach((row, idx) => {
        row.quarter = computeRowQuarter("kpi4", row);
        const isClosed = row.status === "Closed" || row.status === "Resolved";
        html += `
            <tr data-row-id="${row.id}" data-kpi="kpi4" data-row-idx="${idx}">
                <td class="col-seq">${idx + 1}</td>
                <td class="excel-cell" data-col-idx="0" data-field="ncrNo">${row.ncrNo || ''}</td>
                <td class="excel-cell" data-col-idx="1" data-field="discipline">${row.discipline || 'Structural Works'}</td>
                <td class="excel-cell" data-col-idx="2" data-field="subDiscipline">${row.subDiscipline || 'Rebar & Steel Works'}</td>
                <td class="excel-cell" data-col-idx="3" data-field="desc">${row.desc || ''}</td>
                <td class="excel-cell" data-col-idx="4" data-field="sub">${row.sub || ''}</td>
                <td class="excel-cell" data-col-idx="5" data-field="dateIssued" data-type="date">${formatTableDate(row.dateIssued)}</td>
                <td class="excel-cell" data-col-idx="6" data-field="dateClosed" data-type="date">${formatTableDate(row.dateClosed)}</td>
                <td class="excel-cell" data-col-idx="7" data-field="duration" data-type="number">${row.duration || 0}</td>
                <td class="excel-cell" data-col-idx="8" data-field="quarter" data-type="select-quarter" style="font-weight:700; color:#38bdf8;">${row.quarter || 'Q1'}</td>
                <td class="excel-cell" data-col-idx="9" data-field="status" data-type="select-ncr-status"><span class="status-badge ${isClosed ? 'badge-green' : 'badge-red'}">${row.status || 'Open'}</span></td>
            </tr>
        `;
    });
    if (logs.length === 0) html = `<tr><td colspan="11" style="text-align:center; color:var(--text-muted);">No NCR entries match the current filter selection.</td></tr>`;
    tbody.innerHTML = html;
    bindCellEvents(tbody, "kpi4");
}

function renderKPI5Grid() {
    const tbody = document.getElementById("kpi5ExcelBody");
    if (!tbody) return;

    let logs = getFilteredKPILogs("kpi5");
    let html = "";
    logs.forEach((row, idx) => {
        row.quarter = computeRowQuarter("kpi5", row);
        const isCrit = row.cat === "Critical";
        const statusBadgeClass = (row.status === "Signed-off" || row.status === "Closed" || row.status === "Rectified")
            ? "badge-green"
            : (row.status === "In Progress" ? "badge-blue" : "badge-red");

        html += `
            <tr data-row-id="${row.id}" data-kpi="kpi5" data-row-idx="${idx}">
                <td class="col-seq">${idx + 1}</td>
                <td class="excel-cell" data-col-idx="0" data-field="itemNo">${row.itemNo || ''}</td>
                <td class="excel-cell" data-col-idx="1" data-field="dateLogged" data-type="date">${formatTableDate(row.dateLogged)}</td>
                <td class="excel-cell" data-col-idx="2" data-field="discipline">${row.discipline || 'Architectural Works'}</td>
                <td class="excel-cell" data-col-idx="3" data-field="subDiscipline">${row.subDiscipline || 'Painting & Coating'}</td>
                <td class="excel-cell" data-col-idx="4" data-field="desc">${row.desc || ''}</td>
                <td class="excel-cell" data-col-idx="5" data-field="loc">${row.loc || ''}</td>
                <td class="excel-cell" data-col-idx="6" data-field="cat" data-type="select-category"><span class="status-badge ${isCrit ? 'badge-red' : 'badge-yellow'}">${row.cat || 'Minor'}</span></td>
                <td class="excel-cell" data-col-idx="7" data-field="sub">${row.sub || ''}</td>
                <td class="excel-cell" data-col-idx="8" data-field="targetDate" data-type="date">${formatTableDate(row.targetDate)}</td>
                <td class="excel-cell" data-col-idx="9" data-field="actualDateRectified" data-type="date">${formatTableDate(row.actualDateRectified)}</td>
                <td class="excel-cell" data-col-idx="10" data-field="quarter" data-type="select-quarter" style="font-weight:700; color:#38bdf8;">${row.quarter || 'Q4'}</td>
                <td class="excel-cell" data-col-idx="11" data-field="status" data-type="select-punch-status"><span class="status-badge ${statusBadgeClass}">${row.status || 'Open'}</span></td>
            </tr>
        `;
    });
    if (logs.length === 0) html = `<tr><td colspan="13" style="text-align:center; color:var(--text-muted);">No punch items match the current filter selection.</td></tr>`;
    tbody.innerHTML = html;
    bindCellEvents(tbody, "kpi5");
}

function bindCellEvents(tbody, kpiKey) {
    const cells = tbody.querySelectorAll(".excel-cell:not(.readonly-cell)");
    cells.forEach(cell => {
        cell.addEventListener("click", (e) => {
            if (e.target.classList.contains("fill-handle")) return;
            if (!cell.classList.contains("cell-editing")) {
                selectCell(cell, kpiKey);
            }
        });
        cell.addEventListener("dblclick", (e) => {
            e.stopPropagation();
            startCellEditing(cell, kpiKey);
        });
    });
}

function startCellEditing(cell, kpiKey, initialTypedVal) {
    if (cell.classList.contains("cell-editing")) return;

    selectCell(cell, kpiKey);
    cell.classList.add("cell-editing");

    const tr = cell.closest("tr");
    const rowId = tr.getAttribute("data-row-id");
    const fieldName = cell.getAttribute("data-field");
    const dataType = cell.getAttribute("data-type");

    let rowObj;
    if (kpiKey === "specsKpi1") {
        rowObj = appState.specs.kpi1_standards.find(r => r.id === rowId);
    } else if (kpiKey === "specsKpi3") {
        rowObj = appState.specs.kpi3_defects.find(r => r.id === rowId);
    } else {
        const proj = appState.projects[appState.activeProjectId];
        rowObj = proj[kpiKey + "_logs"].find(r => r.id === rowId);
    }

    let rawVal = rowObj ? rowObj[fieldName] : cell.innerText.trim();
    if (rawVal === undefined || rawVal === null) rawVal = "";

    cell.innerHTML = "";

    let editorInput;
    if (fieldName === "discipline") {
        editorInput = document.createElement("select");
        editorInput.className = "cell-editor-select";
        ENGINEERING_DISCIPLINES.forEach(d => {
            const opt = document.createElement("option");
            opt.value = d; opt.innerText = d;
            if (d === rawVal) opt.selected = true;
            editorInput.appendChild(opt);
        });
    } else if (fieldName === "subDiscipline") {
        editorInput = document.createElement("select");
        editorInput.className = "cell-editor-select";
        const currentDisc = rowObj ? rowObj.discipline : "Structural Works";

        const specsList = [...(appState.specs.kpi1_standards || []), ...(appState.specs.kpi3_defects || [])];
        const subList = Array.from(new Set(specsList.filter(s => s.discipline === currentDisc).map(s => s.subDiscipline).filter(Boolean)));
        if (subList.length === 0) subList.push("General Works", "Concrete Works", "Finishes & Tiling");

        subList.forEach(sd => {
            const opt = document.createElement("option");
            opt.value = sd; opt.innerText = sd;
            if (sd === rawVal) opt.selected = true;
            editorInput.appendChild(opt);
        });

        editorInput.addEventListener("change", () => {
            const selectedSub = editorInput.value;
            if (kpiKey === "kpi3" && rowObj) {
                const matchDefect = appState.specs.kpi3_defects.find(sd => sd.subDiscipline === selectedSub);
                if (matchDefect) rowObj.desc = matchDefect.defectDesc;
            }
        });
    } else if (fieldName === "test" && kpiKey === "kpi1") {
        editorInput = document.createElement("select");
        editorInput.className = "cell-editor-select";
        const currentDisc = rowObj ? rowObj.discipline : "Structural Works";
        const tests = Array.from(new Set(appState.specs.kpi1_standards.filter(s => s.discipline === currentDisc).map(s => s.test)));

        tests.forEach(t => {
            const opt = document.createElement("option");
            opt.value = t; opt.innerText = t;
            if (t === rawVal) opt.selected = true;
            editorInput.appendChild(opt);
        });

        editorInput.addEventListener("change", () => {
            const selectedTest = editorInput.value;
            const matchSpec = appState.specs.kpi1_standards.find(s => s.test === selectedTest);
            if (matchSpec && rowObj) {
                rowObj.req = matchSpec.designReq;
            }
        });
    } else if ((fieldName === "req" || dataType === "select-design-req") && kpiKey === "kpi1") {
        editorInput = document.createElement("select");
        editorInput.className = "cell-editor-select";
        const currentTest = rowObj ? rowObj.test : "";
        const currentDisc = rowObj ? rowObj.discipline : "";

        let specReqs = [];
        if (currentTest) {
            specReqs = appState.specs.kpi1_standards
                .filter(s => s.test === currentTest)
                .map(s => s.designReq);
        }

        if (specReqs.length === 0 && currentDisc) {
            specReqs = appState.specs.kpi1_standards
                .filter(s => s.discipline === currentDisc)
                .map(s => s.designReq);
        }

        if (specReqs.length === 0) {
            specReqs = appState.specs.kpi1_standards.map(s => s.designReq);
        }

        const uniqueReqs = Array.from(new Set(specReqs.filter(Boolean)));
        if (!uniqueReqs.includes(rawVal) && rawVal) uniqueReqs.unshift(rawVal);

        uniqueReqs.forEach(reqStr => {
            const opt = document.createElement("option");
            opt.value = reqStr; opt.innerText = reqStr;
            if (reqStr === rawVal) opt.selected = true;
            editorInput.appendChild(opt);
        });
    } else if ((fieldName === "desc" || dataType === "select-defect-desc") && kpiKey === "kpi3") {
        editorInput = document.createElement("select");
        editorInput.className = "cell-editor-select";
        const currentSub = rowObj ? rowObj.subDiscipline : "";
        const currentDisc = rowObj ? rowObj.discipline : "";

        let defectList = [];
        if (currentSub) {
            defectList = appState.specs.kpi3_defects
                .filter(sd => sd.subDiscipline === currentSub)
                .map(sd => sd.defectDesc);
        }

        if (defectList.length === 0 && currentDisc) {
            defectList = appState.specs.kpi3_defects
                .filter(sd => sd.discipline === currentDisc)
                .map(sd => sd.defectDesc);
        }

        if (defectList.length === 0) {
            defectList = appState.specs.kpi3_defects.map(sd => sd.defectDesc);
        }

        const uniqueDefects = Array.from(new Set(defectList.filter(Boolean)));
        if (!uniqueDefects.includes(rawVal) && rawVal) uniqueDefects.unshift(rawVal);

        uniqueDefects.forEach(defectStr => {
            const opt = document.createElement("option");
            opt.value = defectStr; opt.innerText = defectStr;
            if (defectStr === rawVal) opt.selected = true;
            editorInput.appendChild(opt);
        });
    } else if (dataType === "select-quarter") {
        editorInput = document.createElement("select");
        editorInput.className = "cell-editor-select";
        ["Q1", "Q2", "Q3", "Q4"].forEach(q => {
            const opt = document.createElement("option");
            opt.value = q; opt.innerText = q;
            if (q === rawVal) opt.selected = true;
            editorInput.appendChild(opt);
        });
    } else if (dataType === "select-remarks") {
        editorInput = document.createElement("select");
        editorInput.className = "cell-editor-select";
        ["Pass", "Fail"].forEach(r => {
            const opt = document.createElement("option");
            opt.value = r; opt.innerText = r;
            if (r === rawVal) opt.selected = true;
            editorInput.appendChild(opt);
        });
    } else if (dataType === "select-severity") {
        editorInput = document.createElement("select");
        editorInput.className = "cell-editor-select";
        ["Minor", "Moderate", "Major"].forEach(s => {
            const opt = document.createElement("option");
            opt.value = s; opt.innerText = s;
            if (s === rawVal) opt.selected = true;
            editorInput.appendChild(opt);
        });
    } else if (dataType === "select-ncr-status") {
        editorInput = document.createElement("select");
        editorInput.className = "cell-editor-select";
        ["Open", "In Progress", "Resolved", "Closed"].forEach(st => {
            const opt = document.createElement("option");
            opt.value = st; opt.innerText = st;
            if (st === rawVal) opt.selected = true;
            editorInput.appendChild(opt);
        });
    } else if (dataType === "select-category") {
        editorInput = document.createElement("select");
        editorInput.className = "cell-editor-select";
        ["Minor", "Critical"].forEach(c => {
            const opt = document.createElement("option");
            opt.value = c; opt.innerText = c;
            if (c === rawVal) opt.selected = true;
            editorInput.appendChild(opt);
        });
    } else if (fieldName === "unit" || dataType === "select-unit") {
        editorInput = document.createElement("select");
        editorInput.className = "cell-editor-select";
        const units = ["psi", "MPa", "Pa", "ksi", "MΩ", "hrs", "%", "bar", "kPa", "N/mm²", "kg/cm²", "m", "pcs"];
        if (!units.includes(rawVal) && rawVal) units.unshift(rawVal);
        units.forEach(u => {
            const opt = document.createElement("option");
            opt.value = u; opt.innerText = u;
            if (u === rawVal) opt.selected = true;
            editorInput.appendChild(opt);
        });
    } else if (dataType === "select-punch-status") {
        editorInput = document.createElement("select");
        editorInput.className = "cell-editor-select";
        ["Open", "In Progress", "Rectified", "Signed-off"].forEach(ps => {
            const opt = document.createElement("option");
            opt.value = ps; opt.innerText = ps;
            if (ps === rawVal) opt.selected = true;
            editorInput.appendChild(opt);
        });
    } else {
        editorInput = document.createElement("input");
        const isCurrency = dataType === "currency" || fieldName === "approvedCost" || fieldName === "labor" || fieldName === "mat";
        const isDate = dataType === "date" || fieldName === "date" || fieldName === "dateRes" || fieldName === "dateCond" || fieldName === "dateIssued" || fieldName === "dateClosed" || fieldName === "targetDate" || fieldName === "actualDateRectified" || fieldName === "dateLogged";
        editorInput.type = (dataType === "number" && !isCurrency) ? "number" : (isDate ? "date" : "text");
        editorInput.className = "cell-editor-input" + (isCurrency ? " cell-editor-currency" : "");
        if (isCurrency) {
            editorInput.value = initialTypedVal !== undefined 
                ? (initialTypedVal.startsWith("₱") ? initialTypedVal : "₱" + initialTypedVal) 
                : formatPeso(rawVal);
            editorInput.addEventListener("blur", () => {
                editorInput.value = formatPeso(parsePeso(editorInput.value));
            });
        } else if (isDate) {
            editorInput.value = normalizeDateISO(initialTypedVal !== undefined ? initialTypedVal : rawVal);
        } else {
            editorInput.value = initialTypedVal !== undefined ? initialTypedVal : rawVal;
        }
    }

    cell.appendChild(editorInput);
    editorInput.focus();
    if (initialTypedVal === undefined && editorInput.select) {
        editorInput.select();
    }

    function commitEdit() {
        const newVal = editorInput.value;
        const isCurrency = dataType === "currency" || fieldName === "approvedCost" || fieldName === "labor" || fieldName === "mat";
        const isDate = dataType === "date" || fieldName === "date" || fieldName === "dateRes" || fieldName === "dateCond" || fieldName === "dateIssued" || fieldName === "dateClosed" || fieldName === "targetDate" || fieldName === "actualDateRectified" || fieldName === "dateLogged";
        if (rowObj) {
            if (isCurrency) {
                rowObj[fieldName] = parsePeso(newVal);
            } else if (dataType === "number") {
                rowObj[fieldName] = parseFloat(newVal) || 0;
            } else if (isDate) {
                rowObj[fieldName] = normalizeDateISO(newVal);
                rowObj.quarter = computeRowQuarter(kpiKey, rowObj);
            } else {
                rowObj[fieldName] = newVal;
                if (fieldName === "date" || fieldName === "dateRes" || fieldName === "dateCond" || fieldName === "dateIssued" || fieldName === "targetDate" || fieldName === "dateLogged") {
                    rowObj.quarter = computeRowQuarter(kpiKey, rowObj);
                }
            }
            saveAppState();
        }
        cell.classList.remove("cell-editing");
        if (kpiKey.startsWith("specs")) renderMasterSpecsTables();
        else renderExcelGrids();
        calculateAllKPIs();
    }

    editorInput.addEventListener("blur", commitEdit);
    editorInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") { e.preventDefault(); commitEdit(); }
        else if (e.key === "Escape") {
            cell.classList.remove("cell-editing");
            if (kpiKey.startsWith("specs")) renderMasterSpecsTables();
            else renderExcelGrids();
        }
    });
}

// MULTI-CELL MOUSE DRAG RANGE SELECTION
function initRangeDragSelection() {
    document.addEventListener("mousedown", (e) => {
        if (e.target.classList.contains("fill-handle")) return;

        const contextMenu = document.getElementById("excelContextMenu");
        if (contextMenu && !contextMenu.contains(e.target)) {
            contextMenu.style.display = "none";
        }

        const cell = e.target.closest(".excel-cell:not(.readonly-cell)");
        if (!cell) return;

        if (e.button === 0) {
            appState.isSelectingRange = true;
            const tr = cell.closest("tr");
            appState.rangeStartPos = {
                kpiKey: tr.getAttribute("data-kpi"),
                rowIdx: parseInt(tr.getAttribute("data-row-idx")),
                colIdx: parseInt(cell.getAttribute("data-col-idx"))
            };

            clearCellSelection();
            selectCell(cell, appState.rangeStartPos.kpiKey);
        }
    });

    document.addEventListener("mouseover", (e) => {
        if (!appState.isSelectingRange || !appState.rangeStartPos || appState.isDraggingFillHandle) return;

        const cell = e.target.closest(".excel-cell:not(.readonly-cell)");
        if (!cell) return;

        const tr = cell.closest("tr");
        const kpiKey = tr.getAttribute("data-kpi");
        if (kpiKey !== appState.rangeStartPos.kpiKey) return;

        const currentRowIdx = parseInt(tr.getAttribute("data-row-idx"));
        const currentColIdx = parseInt(cell.getAttribute("data-col-idx"));

        highlightRangeSelection(appState.rangeStartPos, { kpiKey, rowIdx: currentRowIdx, colIdx: currentColIdx });
    });

    document.addEventListener("mouseup", () => { appState.isSelectingRange = false; });
}

function highlightRangeSelection(startPos, endPos) {
    clearCellSelection();

    const minRow = Math.min(startPos.rowIdx, endPos.rowIdx);
    const maxRow = Math.max(startPos.rowIdx, endPos.rowIdx);
    const minCol = Math.min(startPos.colIdx, endPos.colIdx);
    const maxCol = Math.max(startPos.colIdx, endPos.colIdx);

    const tbody = document.getElementById(`${startPos.kpiKey}TableBody`) || document.getElementById(`${startPos.kpiKey}ExcelBody`);
    if (!tbody) return;

    appState.selectedRangeCells = [];
    const trs = tbody.querySelectorAll("tr");

    for (let r = minRow; r <= maxRow; r++) {
        if (!trs[r]) continue;
        const cells = trs[r].querySelectorAll(".excel-cell:not(.readonly-cell)");
        for (let c = minCol; c <= maxCol; c++) {
            const cell = Array.from(cells).find(el => parseInt(el.getAttribute("data-col-idx")) === c);
            if (cell) {
                cell.classList.add("cell-range-selected");
                appState.selectedRangeCells.push(cell);
            }
        }
    }
}

function selectCell(cell, kpiKey) {
    document.querySelectorAll(".excel-cell").forEach(c => {
        c.classList.remove("cell-selected");
        c.classList.remove("cell-range-selected");
        const h = c.querySelector(".fill-handle");
        if (h) h.remove();
    });

    cell.classList.add("cell-selected");
    const tr = cell.closest("tr");
    const rowId = tr.getAttribute("data-row-id");
    const fieldName = cell.getAttribute("data-field");

    if (!cell.querySelector(".fill-handle")) {
        const handle = document.createElement("div");
        handle.className = "fill-handle";
        handle.title = "Drag to auto-fill cells";
        cell.appendChild(handle);
    }

    appState.selectedCell = { kpiKey, rowId, fieldName, cellEl: cell };
    appState.selectedRangeCells = [cell];
}

function clearCellSelection() {
    document.querySelectorAll(".excel-cell").forEach(c => {
        c.classList.remove("cell-selected");
        c.classList.remove("cell-range-selected");
        c.classList.remove("fill-drag-target");
        const h = c.querySelector(".fill-handle");
        if (h) h.remove();
    });
    appState.selectedRangeCells = [];
}

// EXCEL AUTO-FILL DRAG HANDLE ENGINE
function initFillHandleDrag() {
    document.addEventListener("mousedown", (e) => {
        if (!e.target.classList.contains("fill-handle")) return;

        e.stopPropagation();
        e.preventDefault();

        const sourceCell = e.target.closest(".excel-cell");
        if (!sourceCell) return;

        const tr = sourceCell.closest("tr");
        if (!tr) return;

        const kpiKey = tr.getAttribute("data-kpi");
        const rowId = tr.getAttribute("data-row-id");
        const fieldName = sourceCell.getAttribute("data-field");
        const rowIdx = parseInt(tr.getAttribute("data-row-idx"));
        const colIdx = parseInt(sourceCell.getAttribute("data-col-idx"));

        let sourceVal = "";
        if (kpiKey === "specsKpi1") {
            const rowObj = appState.specs.kpi1_standards.find(r => r.id === rowId);
            sourceVal = rowObj ? rowObj[fieldName] : "";
        } else if (kpiKey === "specsKpi3") {
            const rowObj = appState.specs.kpi3_defects.find(r => r.id === rowId);
            sourceVal = rowObj ? rowObj[fieldName] : "";
        } else {
            const proj = appState.projects[appState.activeProjectId];
            const logs = proj ? proj[kpiKey + "_logs"] : null;
            const rowObj = logs ? logs.find(r => r.id === rowId) : null;
            sourceVal = rowObj ? rowObj[fieldName] : "";
        }

        appState.isDraggingFillHandle = true;
        appState.fillSourcePos = { kpiKey, rowIdx, colIdx, rowId, fieldName, cellEl: sourceCell };
        appState.fillSourceValue = sourceVal;
        appState.fillTargetCells = [];
    });

    document.addEventListener("mouseover", (e) => {
        if (!appState.isDraggingFillHandle || !appState.fillSourcePos) return;

        const cell = e.target.closest(".excel-cell:not(.readonly-cell)");
        if (!cell) return;

        const tr = cell.closest("tr");
        if (!tr) return;

        const kpiKey = tr.getAttribute("data-kpi");
        if (kpiKey !== appState.fillSourcePos.kpiKey) return;

        const currentRowIdx = parseInt(tr.getAttribute("data-row-idx"));
        const currentColIdx = parseInt(cell.getAttribute("data-col-idx"));

        const minRow = Math.min(appState.fillSourcePos.rowIdx, currentRowIdx);
        const maxRow = Math.max(appState.fillSourcePos.rowIdx, currentRowIdx);
        const minCol = Math.min(appState.fillSourcePos.colIdx, currentColIdx);
        const maxCol = Math.max(appState.fillSourcePos.colIdx, currentColIdx);

        document.querySelectorAll(".excel-cell.fill-drag-target").forEach(c => c.classList.remove("fill-drag-target"));

        const tbody = document.getElementById(`${kpiKey}TableBody`) || document.getElementById(`${kpiKey}ExcelBody`);
        if (!tbody) return;

        appState.fillTargetCells = [];
        const trs = tbody.querySelectorAll("tr");
        for (let r = minRow; r <= maxRow; r++) {
            if (!trs[r]) continue;
            const cells = trs[r].querySelectorAll(".excel-cell:not(.readonly-cell)");
            for (let c = minCol; c <= maxCol; c++) {
                const targetCell = Array.from(cells).find(el => parseInt(el.getAttribute("data-col-idx")) === c);
                if (targetCell) {
                    targetCell.classList.add("fill-drag-target");
                    appState.fillTargetCells.push(targetCell);
                }
            }
        }
    });

    document.addEventListener("mouseup", () => {
        if (!appState.isDraggingFillHandle) return;

        appState.isDraggingFillHandle = false;
        document.querySelectorAll(".excel-cell.fill-drag-target").forEach(c => c.classList.remove("fill-drag-target"));

        if (appState.fillTargetCells && appState.fillTargetCells.length > 0 && appState.fillSourcePos) {
            const kpiKey = appState.fillSourcePos.kpiKey;
            const fillVal = appState.fillSourceValue;

            appState.fillTargetCells.forEach(targetCell => {
                const tr = targetCell.closest("tr");
                if (!tr) return;
                const rowId = tr.getAttribute("data-row-id");
                const fieldName = targetCell.getAttribute("data-field");

                let rowObj;
                if (kpiKey === "specsKpi1") rowObj = appState.specs.kpi1_standards.find(r => r.id === rowId);
                else if (kpiKey === "specsKpi3") rowObj = appState.specs.kpi3_defects.find(r => r.id === rowId);
                else {
                    const proj = appState.projects[appState.activeProjectId];
                    const logs = proj ? proj[kpiKey + "_logs"] : null;
                    rowObj = logs ? logs.find(r => r.id === rowId) : null;
                }

                if (rowObj && fieldName) {
                    rowObj[fieldName] = fillVal;
                }
            });

            saveAppState();
            if (kpiKey.startsWith("specs")) renderMasterSpecsTables();
            else renderExcelGrids();
            calculateAllKPIs();
        }

        appState.fillSourcePos = null;
        appState.fillSourceValue = null;
        appState.fillTargetCells = [];
    });
}

function navigateSelectedCell(direction) {
    if (!appState.selectedCell || !appState.selectedCell.cellEl) return;
    const currentCell = appState.selectedCell.cellEl;
    const tr = currentCell.closest("tr");
    if (!tr) return;

    const kpiKey = appState.selectedCell.kpiKey;
    const tbody = tr.closest("tbody");
    if (!tbody) return;

    const rowIdx = parseInt(tr.getAttribute("data-row-idx"));
    const colIdx = parseInt(currentCell.getAttribute("data-col-idx"));

    let nextRowIdx = rowIdx;
    let nextColIdx = colIdx;

    if (direction === "up") nextRowIdx--;
    else if (direction === "down") nextRowIdx++;
    else if (direction === "left") nextColIdx--;
    else if (direction === "right") nextColIdx++;

    const trs = tbody.querySelectorAll("tr");
    if (nextRowIdx >= 0 && nextRowIdx < trs.length) {
        const nextTr = trs[nextRowIdx];
        const cells = nextTr.querySelectorAll(".excel-cell:not(.readonly-cell)");
        const nextCell = Array.from(cells).find(c => parseInt(c.getAttribute("data-col-idx")) === nextColIdx);
        if (nextCell) {
            selectCell(nextCell, kpiKey);
            nextCell.scrollIntoView({ block: "nearest", inline: "nearest" });
        }
    }
}

function initCellKeyboardEvents() {
    document.addEventListener("keydown", (e) => {
        const activeTag = document.activeElement ? document.activeElement.tagName : "";
        if (activeTag === "INPUT" || activeTag === "SELECT" || activeTag === "TEXTAREA" || document.querySelector(".cell-editing")) {
            return;
        }

        if (!appState.selectedCell || !appState.selectedCell.cellEl) return;
        const cell = appState.selectedCell.cellEl;
        const kpiKey = appState.selectedCell.kpiKey;

        if (!document.body.contains(cell)) return;

        if (e.key === "ArrowUp") {
            e.preventDefault();
            navigateSelectedCell("up");
        } else if (e.key === "ArrowDown" || e.key === "Enter") {
            e.preventDefault();
            navigateSelectedCell("down");
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            navigateSelectedCell("left");
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            navigateSelectedCell("right");
        } else if (e.key === "Tab") {
            e.preventDefault();
            navigateSelectedCell(e.shiftKey ? "left" : "right");
        } else if (e.key === "F2") {
            e.preventDefault();
            startCellEditing(cell, kpiKey);
        } else if (e.key === "Backspace" || e.key === "Delete") {
            e.preventDefault();
            const rowId = appState.selectedCell.rowId;
            const fieldName = appState.selectedCell.fieldName;
            let rowObj;
            if (kpiKey === "specsKpi1") rowObj = appState.specs.kpi1_standards.find(r => r.id === rowId);
            else if (kpiKey === "specsKpi3") rowObj = appState.specs.kpi3_defects.find(r => r.id === rowId);
            else {
                const proj = appState.projects[appState.activeProjectId];
                rowObj = proj[kpiKey + "_logs"] ? proj[kpiKey + "_logs"].find(r => r.id === rowId) : null;
            }
            if (rowObj && fieldName) {
                const dataType = cell.getAttribute("data-type");
                rowObj[fieldName] = dataType === "number" || dataType === "currency" ? 0 : "";
                saveAppState();
                if (kpiKey.startsWith("specs")) renderMasterSpecsTables();
                else renderExcelGrids();
                calculateAllKPIs();
            }
        } else if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
            e.preventDefault();
            startCellEditing(cell, kpiKey, e.key);
        }
    });
}

// RIGHT-CLICK CONTEXT MENU ENGINE
function initContextMenuEngine() {
    document.addEventListener("contextmenu", (e) => {
        const cell = e.target.closest(".excel-cell");
        if (!cell) return;

        e.preventDefault();
        const tr = cell.closest("tr");
        const kpiKey = tr.getAttribute("data-kpi");

        if (!cell.classList.contains("cell-range-selected") && !cell.classList.contains("cell-selected")) {
            selectCell(cell, kpiKey);
        }

        const menu = document.getElementById("excelContextMenu");
        if (menu) {
            menu.style.display = "block";
            menu.style.left = `${e.clientX}px`;
            menu.style.top = `${e.clientY}px`;
        }
    });
}

function handleCopyContext() {
    const cells = appState.selectedRangeCells.length > 0 ? appState.selectedRangeCells : (appState.selectedCell ? [appState.selectedCell.cellEl] : []);
    if (cells.length === 0) return;

    const values = cells.map(c => c.innerText.trim()).join("\t");
    navigator.clipboard.writeText(values).then(() => {
        const menu = document.getElementById("excelContextMenu");
        if (menu) menu.style.display = "none";
    });
}

function handlePasteContext() {
    const targetCell = appState.selectedCell ? appState.selectedCell.cellEl : (appState.selectedRangeCells[0] || null);
    if (!targetCell) return;

    navigator.clipboard.readText().then(text => {
        if (!text) return;
        const tr = targetCell.closest("tr");
        const kpiKey = tr.getAttribute("data-kpi");
        const rowId = tr.getAttribute("data-row-id");
        const fieldName = targetCell.getAttribute("data-field");

        let rowObj;
        if (kpiKey === "specsKpi1") rowObj = appState.specs.kpi1_standards.find(r => r.id === rowId);
        else if (kpiKey === "specsKpi3") rowObj = appState.specs.kpi3_defects.find(r => r.id === rowId);
        else {
            const proj = appState.projects[appState.activeProjectId];
            rowObj = proj[kpiKey + "_logs"].find(r => r.id === rowId);
        }

        if (rowObj) {
            rowObj[fieldName] = text.trim();
            saveAppState();
            if (kpiKey.startsWith("specs")) renderMasterSpecsTables();
            else renderExcelGrids();
            calculateAllKPIs();
        }

        const menu = document.getElementById("excelContextMenu");
        if (menu) menu.style.display = "none";
    });
}

function handleInsertRowContext(position) {
    if (!appState.selectedCell) return;
    const kpiKey = appState.selectedCell.kpiKey;
    if (kpiKey === "specsKpi1") addNewSpecStandardRow();
    else if (kpiKey === "specsKpi3") addNewSpecDefectRow();
    else addNewRow(kpiKey);
    const menu = document.getElementById("excelContextMenu");
    if (menu) menu.style.display = "none";
}

function handleDeleteRowContext() {
    if (!appState.selectedCell) return;
    deleteActiveOrSelectedRow(appState.selectedCell.kpiKey);
    const menu = document.getElementById("excelContextMenu");
    if (menu) menu.style.display = "none";
}

function initColumnResizers() {
    document.querySelectorAll("th.resizable").forEach(th => {
        const resizer = th.querySelector(".resizer");
        if (!resizer) return;

        let startX, startWidth;
        resizer.addEventListener("mousedown", (e) => {
            e.stopPropagation();
            startX = e.pageX; startWidth = th.offsetWidth;
            resizer.classList.add("resizing");

            function onMouseMove(e) {
                const newWidth = Math.max(60, startWidth + (e.pageX - startX));
                th.style.width = newWidth + "px";
            }
            function onMouseUp() {
                resizer.classList.remove("resizing");
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            }
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });
    });
}

function resetKPIFilters(kpiKey) {
    const qF = document.getElementById(`${kpiKey}QuarterFilter`);
    const dF = document.getElementById(`${kpiKey}DisciplineFilter`);
    const sF = document.getElementById(`${kpiKey}SubDisciplineFilter`);
    const deF = document.getElementById(`${kpiKey}DescFilter`);

    if (qF) qF.value = "ALL";
    if (dF) dF.value = "ALL";
    if (sF) sF.value = "ALL";
    if (deF) deF.value = "ALL";

    if (typeof updateSubDisciplineFilter === "function") updateSubDisciplineFilter(kpiKey);
    if (typeof updateDescFilter === "function") updateDescFilter(kpiKey);
}

function addNewRow(kpiKey) {
    resetKPIFilters(kpiKey);

    const proj = appState.projects[appState.activeProjectId];
    if (!proj) return;

    if (!proj[`${kpiKey}_logs`]) proj[`${kpiKey}_logs`] = [];

    const todayISO = new Date().toISOString().split("T")[0];
    const todayQ = getQuarterFromDate(todayISO);
    const id = kpiKey[3] + "_" + Date.now();

    if (kpiKey === "kpi1") {
        proj.kpi1_logs.push({ 
            id: id, 
            discipline: "Structural Works", 
            subDiscipline: "Concrete Works", 
            test: "Concrete Cylinder Compressive Strength Test (28-day)", 
            req: "fc' = 4,000 psi (27.5 MPa) min", 
            act: 30, 
            dateCond: todayISO, 
            dateRes: todayISO, 
            quarter: todayQ, 
            remarks: "Pass" 
        });
    } else if (kpiKey === "kpi2") {
        proj.kpi2_logs.push({ 
            id: id, 
            discipline: "Structural Works", 
            subDiscipline: "Concrete Works", 
            desc: "New Rework Estimate Lot", 
            approvedCost: 2500000, 
            qty: 1, 
            unit: "lot", 
            labor: 0, 
            mat: 0, 
            date: todayISO, 
            quarter: todayQ, 
            breakdown: [] 
        });
    } else if (kpiKey === "kpi3") {
        proj.kpi3_logs.push({ 
            id: id, 
            discipline: "Structural Works", 
            subDiscipline: "Concrete Works", 
            desc: "Honeycombs present at column-beam junction", 
            loc: "Site Zone 1", 
            totalInspectedArea: 1000, 
            defectCount: 1, 
            area: 10, 
            date: todayISO, 
            quarter: todayQ, 
            severity: "Minor" 
        });
    } else if (kpiKey === "kpi4") {
        proj.kpi4_logs.push({ 
            id: id, 
            ncrNo: "NCR-2026-" + Date.now().toString().slice(-3), 
            discipline: "Structural Works", 
            subDiscipline: "Rebar & Steel Works", 
            desc: "New NCR Issue", 
            sub: "Subcontractor A", 
            dateIssued: todayISO, 
            dateClosed: "", 
            duration: 5, 
            quarter: todayQ, 
            status: "Open" 
        });
    } else if (kpiKey === "kpi5") {
        proj.kpi5_logs.push({ 
            id: id, 
            itemNo: "PCH-" + Date.now().toString().slice(-3), 
            dateLogged: todayISO, 
            discipline: "Architectural Works", 
            subDiscipline: "Painting & Coating", 
            desc: "New Punch Item", 
            loc: "Level 1 Corridor", 
            cat: "Minor", 
            sub: "Subcontractor B", 
            targetDate: todayISO, 
            actualDateRectified: "", 
            quarter: todayQ, 
            status: "Open" 
        });
    }

    saveAppState();
    renderExcelGrids();
    calculateAllKPIs();
}

function deleteActiveOrSelectedRow(kpiKey) {
    if (!appState.selectedCell || appState.selectedCell.kpiKey !== kpiKey) {
        alert("Please click a cell in the table to select the row you wish to delete.");
        return;
    }
    const rowId = appState.selectedCell.rowId;

    if (kpiKey === "specsKpi1") {
        appState.specs.kpi1_standards = appState.specs.kpi1_standards.filter(s => s.id !== rowId);
        saveAppState(); renderMasterSpecsTables();
    } else if (kpiKey === "specsKpi3") {
        appState.specs.kpi3_defects = appState.specs.kpi3_defects.filter(sd => sd.id !== rowId);
        saveAppState(); renderMasterSpecsTables();
    } else {
        const proj = appState.projects[appState.activeProjectId];
        proj[kpiKey + "_logs"] = proj[kpiKey + "_logs"].filter(r => r.id !== rowId);
        saveAppState(); renderExcelGrids(); calculateAllKPIs();
    }
    appState.selectedCell = null;
}

function exportTableToCSV(kpiKey) {
    let logArray = [];
    if (kpiKey === "specsKpi1") logArray = appState.specs.kpi1_standards || [];
    else if (kpiKey === "specsKpi3") logArray = appState.specs.kpi3_defects || [];
    else {
        const proj = appState.projects[appState.activeProjectId];
        logArray = proj[kpiKey + "_logs"] || [];
    }

    if (logArray.length === 0) { alert("No data available to export."); return; }

    const keys = Object.keys(logArray[0]);
    let csv = keys.join(",") + "\n";
    logArray.forEach(row => {
        csv += keys.map(k => `"${(row[k] || '').toString().replace(/"/g, '""')}"`).join(",") + "\n";
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", `FCL_${kpiKey.toUpperCase()}_Export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(a); a.click(); a.remove();
}

function updateSubDisciplineFilter(kpiKey) {
    const discSelect = document.getElementById(`${kpiKey}DisciplineFilter`);
    const subSelect = document.getElementById(`${kpiKey}SubDisciplineFilter`);
    if (!discSelect || !subSelect) return;

    const currentDisc = discSelect.value;
    const proj = appState.projects[appState.activeProjectId];
    let logs = proj[`${kpiKey}_logs`] || [];

    if (currentDisc !== "ALL") logs = logs.filter(l => l.discipline === currentDisc);

    const subList = Array.from(new Set(logs.map(l => l.subDiscipline).filter(Boolean)));
    subSelect.innerHTML = `<option value="ALL">All Sub-Disciplines</option>`;
    subList.forEach(sd => {
        const opt = document.createElement("option");
        opt.value = sd; opt.innerText = sd;
        subSelect.appendChild(opt);
    });
}

function updateDescFilter(kpiKey) {
    const discSelect = document.getElementById(`${kpiKey}DisciplineFilter`);
    const subSelect = document.getElementById(`${kpiKey}SubDisciplineFilter`);
    const descSelect = document.getElementById(`${kpiKey}DescFilter`);
    if (!descSelect) return;

    const currentDisc = discSelect ? discSelect.value : "ALL";
    const currentSub = subSelect ? subSelect.value : "ALL";
    const proj = appState.projects[appState.activeProjectId];
    let logs = proj[`${kpiKey}_logs`] || [];

    if (currentDisc !== "ALL") logs = logs.filter(l => l.discipline === currentDisc);
    if (currentSub !== "ALL") logs = logs.filter(l => l.subDiscipline === currentSub);

    let descList = [];
    if (kpiKey === "kpi1") descList = Array.from(new Set(logs.map(l => l.test).filter(Boolean)));
    else descList = Array.from(new Set(logs.map(l => l.desc).filter(Boolean)));

    let labelPrefix = "All Descriptions";
    if (kpiKey === "kpi1") labelPrefix = "All Test Descriptions";
    else if (kpiKey === "kpi2") labelPrefix = "All Rework Descriptions";
    else if (kpiKey === "kpi3") labelPrefix = "All Defect Descriptions";
    else if (kpiKey === "kpi4") labelPrefix = "All NCR Descriptions";
    else if (kpiKey === "kpi5") labelPrefix = "All Punch Descriptions";

    descSelect.innerHTML = `<option value="ALL">${labelPrefix}</option>`;
    descList.forEach(d => {
        const opt = document.createElement("option");
        opt.value = d; opt.innerText = d;
        descSelect.appendChild(opt);
    });
}

function updateReqFilter(kpiKey) {
    if (kpiKey !== "kpi1") return;

    const discSelect = document.getElementById("kpi1DisciplineFilter");
    const subSelect = document.getElementById("kpi1SubDisciplineFilter");
    const descSelect = document.getElementById("kpi1DescFilter");
    const reqSelect = document.getElementById("kpi1ReqFilter");
    if (!reqSelect) return;

    const currentDisc = discSelect ? discSelect.value : "ALL";
    const currentSub = subSelect ? subSelect.value : "ALL";
    const currentDesc = descSelect ? descSelect.value : "ALL";

    const proj = appState.projects[appState.activeProjectId];
    let logs = proj ? (proj.kpi1_logs || []) : [];

    if (currentDisc !== "ALL") logs = logs.filter(l => l.discipline === currentDisc);
    if (currentSub !== "ALL") logs = logs.filter(l => l.subDiscipline === currentSub);
    if (currentDesc !== "ALL") logs = logs.filter(l => l.test === currentDesc);

    let reqList = Array.from(new Set(logs.map(l => l.req).filter(Boolean)));
    if (reqList.length === 0) {
        reqList = Array.from(new Set((appState.specs.kpi1_standards || []).map(s => s.designReq).filter(Boolean)));
    }

    const prevVal = reqSelect.value;
    reqSelect.innerHTML = `<option value="ALL">All Design Requirements</option>`;
    reqList.forEach(r => {
        const opt = document.createElement("option");
        opt.value = r; opt.innerText = r;
        if (r === prevVal) opt.selected = true;
        reqSelect.appendChild(opt);
    });
}

function updatePortfolioSubDisciplineFilter() {
    const discSelect = document.getElementById("portfolioDisciplineFilter");
    const subSelect = document.getElementById("portfolioSubDisciplineFilter");
    if (!discSelect || !subSelect) return;

    const currentDisc = discSelect.value;
    let allLogs = [];
    Object.values(appState.projects).forEach(p => {
        allLogs.push(...(p.kpi1_logs || []), ...(p.kpi2_logs || []), ...(p.kpi3_logs || []), ...(p.kpi4_logs || []), ...(p.kpi5_logs || []));
    });

    if (currentDisc !== "ALL") allLogs = allLogs.filter(l => l.discipline === currentDisc);

    const subList = Array.from(new Set(allLogs.map(l => l.subDiscipline).filter(Boolean)));
    subSelect.innerHTML = `<option value="ALL">All Sub-Disciplines</option>`;
    subList.forEach(sd => {
        const opt = document.createElement("option");
        opt.value = sd; opt.innerText = sd;
        subSelect.appendChild(opt);
    });
}

// ==========================================================================
// 📅 X-AXIS DATE FORMATTER HELPER (MM-DD-YY)
// ==========================================================================
function formatChartXAxisDate(dStr) {
    if (!dStr) return "";
    if (typeof dStr !== "string") {
        if (dStr instanceof Date && !isNaN(dStr.getTime())) {
            const m = String(dStr.getMonth() + 1).padStart(2, "0");
            const d = String(dStr.getDate()).padStart(2, "0");
            const y = String(dStr.getFullYear()).slice(-2);
            return `${m}-${d}-${y}`;
        }
        return String(dStr);
    }
    const clean = dStr.trim();
    
    // Match ISO YYYY-MM-DD or YYYY/MM/DD (e.g. 2026-06-12 -> 06-12-26)
    const isoMatch = clean.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
    if (isoMatch) {
        const year = isoMatch[1].slice(-2);
        const month = isoMatch[2].padStart(2, "0");
        const day = isoMatch[3].padStart(2, "0");
        return `${month}-${day}-${year}`;
    }
    
    // Match YYYY-MM or YYYY/MM
    const monthMatch = clean.match(/^(\d{4})[-/](\d{1,2})$/);
    if (monthMatch) {
        const year = monthMatch[1].slice(-2);
        const month = monthMatch[2].padStart(2, "0");
        return `${month}-${year}`;
    }
    
    // Match MM/DD/YYYY or MM-DD-YYYY
    const usMatch = clean.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
    if (usMatch) {
        const month = usMatch[1].padStart(2, "0");
        const day = usMatch[2].padStart(2, "0");
        const year = usMatch[3].slice(-2);
        return `${month}-${day}-${year}`;
    }
    
    // Try native Date parsing as fallback if it contains a 4-digit year
    if (clean.length >= 8 && /\d{4}/.test(clean)) {
        const parsed = new Date(clean);
        if (!isNaN(parsed.getTime())) {
            const m = String(parsed.getMonth() + 1).padStart(2, "0");
            const d = String(parsed.getDate()).padStart(2, "0");
            const y = String(parsed.getFullYear()).slice(-2);
            return `${m}-${d}-${y}`;
        }
    }
    
    return clean;
}
if (typeof window !== "undefined") window.formatChartXAxisDate = formatChartXAxisDate;

// ==========================================================================
// 📊 KPI & CHART INTERACTIVE TOOLTIP ENGINE (MOUSEOVER / HOVER REVEAL)
// ==========================================================================

function resolveTooltipElement(customTooltipId, evt, defaultId) {
    if (customTooltipId) {
        const el = document.getElementById(customTooltipId);
        if (el) return el;
    }
    if (evt && evt.currentTarget) {
        const container = evt.currentTarget.closest ? evt.currentTarget.closest('.line-chart-container, .graph-section-card, .compiler-chart-card, .compiler-charts-container') : null;
        if (container) {
            const el = container.querySelector('.chart-tooltip');
            if (el) return el;
        }
    }
    if (defaultId) {
        const el = document.getElementById(defaultId);
        if (el) return el;
    }
    return document.getElementById("repChartTooltip") || document.querySelector(".chart-tooltip");
}
if (typeof window !== "undefined") window.resolveTooltipElement = resolveTooltipElement;

function positionChartTooltip(evt, tooltipOrId) {
    const tooltip = typeof tooltipOrId === "string" ? resolveTooltipElement(tooltipOrId, evt) : tooltipOrId;
    if (!tooltip) return;
    const container = tooltip.offsetParent || tooltip.parentElement || document.body;
    const rect = container.getBoundingClientRect ? container.getBoundingClientRect() : { left: 0, top: 0, width: 800, height: 400 };

    const clientX = evt.clientX || 0;
    const clientY = evt.clientY || 0;

    const tooltipWidth = tooltip.offsetWidth || 280;
    const tooltipHeight = tooltip.offsetHeight || 160;

    let x = clientX - rect.left + 15;
    let y = clientY - rect.top - 20;

    if (x + tooltipWidth > rect.width - 15) {
        x = clientX - rect.left - tooltipWidth - 15;
    }
    if (x < 10) x = 10;

    if (y + tooltipHeight > rect.height - 10) {
        y = Math.max(10, rect.height - tooltipHeight - 10);
    }
    if (y < 10) y = 10;

    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
}
if (typeof window !== "undefined") window.positionChartTooltip = positionChartTooltip;

function hideChartTooltip(customTooltipId) {
    const tooltip = resolveTooltipElement(customTooltipId, null, customTooltipId);
    if (tooltip) {
        tooltip.style.opacity = "0";
        setTimeout(() => { if (tooltip.style.opacity === "0") tooltip.style.display = "none"; }, 150);
    }
}
if (typeof window !== "undefined") window.hideChartTooltip = hideChartTooltip;

// --- KPI 1 TOOLTIP ---
function showKpi1Tooltip(evt, data, customTooltipId) {
    const tooltip = resolveTooltipElement(customTooltipId, evt, "kpi1ChartTooltip");
    if (!tooltip || !data) return;

    const ftq = typeof data.ftq === 'number' ? data.ftq : ((data.passed / (data.total || 1)) * 100);
    const isCompliant = ftq >= 90.0;
    const statusColor = isCompliant ? "#10b981" : "#ef4444";
    const statusText = isCompliant ? "🟢 Compliant (≥ 90.0% Pass Rate Benchmark)" : "🔴 Needs Attention (< 90.0% Benchmark)";

    tooltip.innerHTML = `
        <div class="chart-tooltip-header">📅 ${data.date} (${data.projectName || data.loc || 'Field Test Record'})</div>
        <div class="chart-tooltip-row"><span>Discipline / Trade:</span> <strong>${data.discipline || 'General Engineering'}</strong></div>
        <div class="chart-tooltip-row"><span>Test / Standard Spec:</span> <strong>${data.test || 'QA/QC Inspection Test'}</strong></div>
        <div class="chart-tooltip-row"><span>Passed First-Time:</span> <strong style="color: #10b981;">${data.passed} Tests</strong></div>
        <div class="chart-tooltip-row"><span>Failed / Re-tested:</span> <strong style="color: ${data.failed > 0 ? '#ef4444' : '#10b981'};">${data.failed} Tests</strong></div>
        <div class="chart-tooltip-row"><span>Total Testing Volume:</span> <strong>${data.total} Tests</strong></div>
        <div class="chart-tooltip-row"><span>First-Time Pass Rate:</span> <strong style="color: ${statusColor}; font-size: 13px;">${ftq.toFixed(1)}%</strong></div>
        <div class="chart-tooltip-status" style="color: ${statusColor};">${statusText}</div>
    `;
    tooltip.style.display = "block";
    tooltip.style.opacity = "1";
    positionChartTooltip(evt, tooltip);
}
if (typeof window !== "undefined") window.showKpi1Tooltip = showKpi1Tooltip;

function moveKpi1Tooltip(evt, customTooltipId) {
    positionChartTooltip(evt, resolveTooltipElement(customTooltipId, evt, "kpi1ChartTooltip"));
}
if (typeof window !== "undefined") window.moveKpi1Tooltip = moveKpi1Tooltip;

function hideKpi1Tooltip(customTooltipId) {
    hideChartTooltip(customTooltipId || "kpi1ChartTooltip");
}
if (typeof window !== "undefined") window.hideKpi1Tooltip = hideKpi1Tooltip;

// --- KPI 4 TOOLTIP ---
function showKpi4Tooltip(evt, data, customTooltipId) {
    const tooltip = resolveTooltipElement(customTooltipId, evt, "kpi4ChartTooltip");
    if (!tooltip || !data) return;

    const duration = parseFloat(data.duration !== undefined ? data.duration : (data.valReq !== undefined ? data.valReq : 0)) || 0;
    const st = (data.status || "Closed").toString().trim().toLowerCase();
    const isClosed = st === "closed" || st === "rectified" || st === "signed-off";
    const isCompliant = duration <= 7;

    let statusColor = isCompliant ? "#10b981" : "#ef4444";
    let statusText = isCompliant 
        ? `🟢 Resolved in ${duration} Days (Within ≤ 7-Day SLA Limit)` 
        : `🔴 Exceeded SLA Limit (${duration} Days vs. 7-Day Target)`;

    if (!isClosed) {
        statusColor = "#f59e0b";
        statusText = `⚠️ Active Open NCR (${duration} Days Elapsed Pending Rectification)`;
    }

    const ncrTitle = data.ncrNo ? `${data.ncrNo} — ` : '';
    const dateFormatted = data.date || data.dateIssued || '2026-01-01';

    tooltip.innerHTML = `
        <div class="chart-tooltip-header">⏱️ ${ncrTitle}${dateFormatted} (${data.projectName || data.project || 'Project Site'})</div>
        <div class="chart-tooltip-row"><span>Discipline / Trade:</span> <strong>${data.discipline || 'General Works'}</strong></div>
        <div class="chart-tooltip-row"><span>Non-Conformance Issue:</span> <strong>${data.desc || data.subDiscipline || 'Field Non-Conformance'}</strong></div>
        <div class="chart-tooltip-row"><span>Subcontractor:</span> <strong>${data.sub || 'Assigned Trade Subcontractor'}</strong></div>
        <div class="chart-tooltip-row"><span>Resolution Duration:</span> <strong style="color: ${statusColor}; font-size: 13px;">${duration} Days</strong></div>
        <div class="chart-tooltip-row"><span>Target SLA Limit:</span> <strong>≤ 7.0 Calendar Days</strong></div>
        <div class="chart-tooltip-row"><span>Closure Status:</span> <strong>${data.status || (isClosed ? 'Closed' : 'Open')}</strong></div>
        <div class="chart-tooltip-status" style="color: ${statusColor};">${statusText}</div>
    `;
    tooltip.style.display = "block";
    tooltip.style.opacity = "1";
    positionChartTooltip(evt, tooltip);
}
if (typeof window !== "undefined") window.showKpi4Tooltip = showKpi4Tooltip;

function moveKpi4Tooltip(evt, customTooltipId) {
    positionChartTooltip(evt, resolveTooltipElement(customTooltipId, evt, "kpi4ChartTooltip"));
}
if (typeof window !== "undefined") window.moveKpi4Tooltip = moveKpi4Tooltip;

function hideKpi4Tooltip(customTooltipId) {
    hideChartTooltip(customTooltipId || "kpi4ChartTooltip");
}
if (typeof window !== "undefined") window.hideKpi4Tooltip = hideKpi4Tooltip;

// --- KPI 5 TOOLTIPS (BURN-DOWN & DISCIPLINE STACKED BAR) ---
function showKpi5BurnDownTooltip(evt, data, customTooltipId) {
    const tooltip = resolveTooltipElement(customTooltipId, evt, "kpi5ChartTooltip");
    if (!tooltip || !data) return;

    const critCount = parseInt(data.critCount) || 0;
    const minorCount = parseInt(data.minorCount) || 0;
    const issuedCount = parseInt(data.issuedCount !== undefined ? data.issuedCount : data.loggedCount) || 0;
    const totalOpen = data.totalOpen !== undefined ? parseInt(data.totalOpen) : (critCount + minorCount);
    const targetRemaining = parseInt(data.targetRemaining !== undefined ? data.targetRemaining : data.baseline) || 0;
    const loggedCount = parseInt(data.loggedCount || data.totalInitial) || totalOpen;
    const rectifiedCount = parseInt(data.rectifiedCount !== undefined ? data.rectifiedCount : (loggedCount - totalOpen)) || 0;
    const clearancePct = loggedCount > 0 ? ((rectifiedCount / loggedCount) * 100) : (totalOpen === 0 ? 100 : 0);
    const overdueCount = parseInt(data.overdueCount || Math.max(0, totalOpen - targetRemaining)) || 0;

    let statusColor = "#10b981";
    let statusText = "🟢 100% Cleared (Zero Snags — Handover Ready)";

    if (critCount > 0) {
        statusColor = "#ef4444";
        statusText = `🔴 ${critCount} Critical Snag(s) Pending (Blocks Turnover)`;
    } else if (totalOpen > 0) {
        if (overdueCount > 0) {
            statusColor = "#f59e0b";
            statusText = `⚠️ ${overdueCount} Snag(s) Past Target Clearance Date (0 Critical)`;
        } else {
            statusColor = "#10b981";
            statusText = `🟢 Clearance On Track (Within Target Clearance Pace)`;
        }
    }

    tooltip.innerHTML = `
        <div class="chart-tooltip-header">📋 ${data.date} (Punch List Clearance Milestone)</div>
        <div class="chart-tooltip-row"><span>Punch Items Issued on Date:</span> <strong style="color: #3b82f6;">${issuedCount} items</strong></div>
        <div class="chart-tooltip-row"><span>Target Planned Clearance:</span> <strong style="color: #10b981;">${targetRemaining} items (Target Pace)</strong></div>
        <div class="chart-tooltip-row"><span>Actual Open Minor Snags:</span> <strong style="color: #f59e0b;">${minorCount} items</strong></div>
        <div class="chart-tooltip-row"><span>Actual Open Critical Snags:</span> <strong style="color: ${critCount > 0 ? '#ef4444' : '#10b981'}; font-size: 13px;">${critCount} items</strong></div>
        <div class="chart-tooltip-row"><span>Total Active Open Snags:</span> <strong>${totalOpen} items</strong></div>
        <div class="chart-tooltip-row"><span>Cumulative Rectified:</span> <strong>${rectifiedCount} / ${loggedCount} (${clearancePct.toFixed(0)}% Cleared)</strong></div>
        <div class="chart-tooltip-status" style="color: ${statusColor};">${statusText}</div>
    `;
    tooltip.style.display = "block";
    tooltip.style.opacity = "1";
    positionChartTooltip(evt, tooltip);
}
if (typeof window !== "undefined") window.showKpi5BurnDownTooltip = showKpi5BurnDownTooltip;

function showKpi5StackedBarTooltip(evt, data, customTooltipId) {
    const tooltip = resolveTooltipElement(customTooltipId, evt, "kpi5ChartTooltip");
    if (!tooltip || !data) return;

    const closed = parseInt(data.closed) || 0;
    const inProgress = parseInt(data.inProgress) || 0;
    const open = parseInt(data.open) || 0;
    const total = data.total !== undefined ? parseInt(data.total) : (closed + inProgress + open);
    const clearancePct = total > 0 ? ((closed / total) * 100) : 100;
    const criticalOpen = parseInt(data.criticalOpen || 0);

    let statusColor = criticalOpen === 0 ? "#10b981" : "#ef4444";
    let statusText = criticalOpen === 0 
        ? `🟢 0 Critical Snags (${clearancePct.toFixed(1)}% Clearance Rate)` 
        : `🔴 ${criticalOpen} Critical Item(s) Pending Rectification`;

    tooltip.innerHTML = `
        <div class="chart-tooltip-header">📋 ${data.discipline || 'Trade Discipline'}</div>
        <div class="chart-tooltip-row"><span>✅ Closed / Signed-off:</span> <strong style="color: #10b981;">${closed} items</strong></div>
        <div class="chart-tooltip-row"><span>🔵 In Progress:</span> <strong style="color: #3b82f6;">${inProgress} items</strong></div>
        <div class="chart-tooltip-row"><span>🔴 Open / Pending:</span> <strong style="color: #ef4444;">${open} items</strong></div>
        <div class="chart-tooltip-row"><span>Total Discipline Snags:</span> <strong>${total} items</strong></div>
        <div class="chart-tooltip-row"><span>Discipline Clearance:</span> <strong>${clearancePct.toFixed(1)}%</strong></div>
        <div class="chart-tooltip-status" style="color: ${statusColor};">${statusText}</div>
    `;
    tooltip.style.display = "block";
    tooltip.style.opacity = "1";
    positionChartTooltip(evt, tooltip);
}
if (typeof window !== "undefined") window.showKpi5StackedBarTooltip = showKpi5StackedBarTooltip;

function showKpi5TargetScheduleTooltip(evt, data, customTooltipId) {
    const tooltip = resolveTooltipElement(customTooltipId, evt, "kpi5ChartTooltip");
    if (!tooltip || !data) return;

    const date = data.date || "Milestone Date";
    const totalDue = parseInt(data.totalDue) || 0;
    const clearedOnTime = parseInt(data.clearedOnTime) || 0;
    const pending = parseInt(data.pending) || 0;
    const overdue = parseInt(data.overdue) || 0;
    const critCount = parseInt(data.critCount) || 0;
    const minorCount = parseInt(data.minorCount) || 0;
    const cumPlannedPct = parseFloat(data.cumPlannedPct) || 0;
    const cumActualPct = parseFloat(data.cumActualPct) || 0;
    const subs = data.subs || "Assigned Subcontractors";

    let statusColor = "#10b981";
    let statusText = "🟢 Target Clearance Pace On-Track";
    if (critCount > 0) {
        statusColor = "#ef4444";
        statusText = `🔴 ${critCount} Critical Snag(s) Due / Overdue on this Date`;
    } else if (overdue > 0) {
        statusColor = "#f59e0b";
        statusText = `⚠️ ${overdue} Overdue Snag(s) Past Committed Date`;
    }

    tooltip.innerHTML = `
        <div class="chart-tooltip-header">📅 Target Clearance Date: ${escapeHtml(date)}</div>
        <div class="chart-tooltip-row"><span>📦 Items Expected to be Cleared:</span> <strong style="color: #38bdf8; font-size: 13px;">${totalDue} items</strong></div>
        <div class="chart-tooltip-row"><span>🟢 Cleared On-Time (By Date):</span> <strong style="color: #10b981;">${clearedOnTime} items</strong></div>
        <div class="chart-tooltip-row"><span>🟡 In-Progress (Pending):</span> <strong style="color: #fbbf24;">${pending} items</strong></div>
        <div class="chart-tooltip-row"><span>🔴 Overdue / Slipped:</span> <strong style="color: #ef4444;">${overdue} items</strong></div>
        <div class="chart-tooltip-row"><span>⚠️ Severity Due:</span> <strong>${critCount} Critical, ${minorCount} Minor</strong></div>
        <div class="chart-tooltip-row"><span>📈 Cumulative Progress:</span> <strong>Planned: ${cumPlannedPct.toFixed(1)}% | Actual: ${cumActualPct.toFixed(1)}%</strong></div>
        <div class="chart-tooltip-row" style="font-size: 10.5px; color: var(--text-muted);"><span>Responsible Trades:</span> <em>${escapeHtml(subs)}</em></div>
        <div class="chart-tooltip-status" style="color: ${statusColor}; margin-top: 6px;">${statusText}</div>
    `;
    tooltip.style.display = "block";
    tooltip.style.opacity = "1";
    positionChartTooltip(evt, tooltip);
}
if (typeof window !== "undefined") window.showKpi5TargetScheduleTooltip = showKpi5TargetScheduleTooltip;

function showKpi5Tooltip(evt, data, customTooltipId) {
    if (data && data.totalDue !== undefined) {
        showKpi5TargetScheduleTooltip(evt, data, customTooltipId);
    } else if (data && data.closed !== undefined) {
        showKpi5StackedBarTooltip(evt, data, customTooltipId);
    } else {
        showKpi5BurnDownTooltip(evt, data, customTooltipId);
    }
}
if (typeof window !== "undefined") window.showKpi5Tooltip = showKpi5Tooltip;

function moveKpi5Tooltip(evt, customTooltipId) {
    positionChartTooltip(evt, resolveTooltipElement(customTooltipId, evt, "kpi5ChartTooltip"));
}
if (typeof window !== "undefined") window.moveKpi5Tooltip = moveKpi5Tooltip;

function hideKpi5Tooltip(customTooltipId) {
    hideChartTooltip(customTooltipId || "kpi5ChartTooltip");
}
if (typeof window !== "undefined") window.hideKpi5Tooltip = hideKpi5Tooltip;

// ==========================================================================
// 🎯 INTERACTIVE CHART LABEL DRAG & LEADER ARROW ENGINE
// ==========================================================================

let activeChartLabelDrag = null;

function getSvgCoordinates(e, svg) {
    if (!svg) return { x: e.clientX, y: e.clientY };
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (ctm) {
        try {
            const transformed = pt.matrixTransform(ctm.inverse());
            return { x: transformed.x, y: transformed.y };
        } catch (err) {
            // fallback
        }
    }
    const rect = svg.getBoundingClientRect();
    const viewBox = svg.viewBox.baseVal;
    const scaleX = (viewBox && viewBox.width > 0 && rect.width > 0) ? (viewBox.width / rect.width) : 1;
    const scaleY = (viewBox && viewBox.height > 0 && rect.height > 0) ? (viewBox.height / rect.height) : 1;
    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    };
}

function startChartLabelDrag(e, chartId, labelKey, anchorX, anchorY, defaultX, defaultY) {
    if (e.button !== 0) return; // left-click only
    e.preventDefault();
    e.stopPropagation();

    const labelGroupEl = e.currentTarget;
    const svgEl = labelGroupEl.closest("svg");
    if (!svgEl) return;

    if (!appState.graphSettings) appState.graphSettings = {};
    if (!appState.graphSettings.labelPositions) appState.graphSettings.labelPositions = {};

    const existing = appState.graphSettings.labelPositions[labelKey] || { dx: 0, dy: 0, isCustom: false };
    const startSvgPt = getSvgCoordinates(e, svgEl);

    activeChartLabelDrag = {
        chartId: chartId,
        labelKey: labelKey,
        anchorX: anchorX,
        anchorY: anchorY,
        defaultX: defaultX,
        defaultY: defaultY,
        startMouseX: startSvgPt.x,
        startMouseY: startSvgPt.y,
        initialDx: existing.dx || 0,
        initialDy: existing.dy || 0,
        labelGroupEl: labelGroupEl,
        svgEl: svgEl
    };

    labelGroupEl.style.cursor = "grabbing";

    window.addEventListener("mousemove", onChartLabelDragMove);
    window.addEventListener("mouseup", onChartLabelDragEnd);
}
if (typeof window !== "undefined") window.startChartLabelDrag = startChartLabelDrag;

function onChartLabelDragMove(e) {
    if (!activeChartLabelDrag) return;
    e.preventDefault();

    const curSvgPt = getSvgCoordinates(e, activeChartLabelDrag.svgEl);
    const mouseDeltaX = curSvgPt.x - activeChartLabelDrag.startMouseX;
    const mouseDeltaY = curSvgPt.y - activeChartLabelDrag.startMouseY;

    const newDx = activeChartLabelDrag.initialDx + mouseDeltaX;
    const newDy = activeChartLabelDrag.initialDy + mouseDeltaY;

    const currentX = activeChartLabelDrag.defaultX + newDx;
    const currentY = activeChartLabelDrag.defaultY + newDy;

    // Move the label group
    activeChartLabelDrag.labelGroupEl.setAttribute("transform", `translate(${newDx}, ${newDy})`);

    // Manage Leader Arrow Line
    let arrowLine = activeChartLabelDrag.svgEl.querySelector(`.arrow-for-${activeChartLabelDrag.labelKey}`);
    const dist = Math.hypot(currentX - activeChartLabelDrag.anchorX, currentY - activeChartLabelDrag.anchorY);

    if (dist > 10) {
        if (!arrowLine) {
            arrowLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
            arrowLine.setAttribute("class", `label-leader-arrow arrow-for-${activeChartLabelDrag.labelKey}`);
            arrowLine.setAttribute("pointer-events", "none");
            arrowLine.setAttribute("stroke-width", "1.4");
            arrowLine.setAttribute("stroke-dasharray", "3,2");
            arrowLine.setAttribute("opacity", "0.95");

            const markerId = activeChartLabelDrag.labelGroupEl.getAttribute("data-marker-id") || "arrow-green";
            const strokeColor = activeChartLabelDrag.labelGroupEl.getAttribute("data-color") || "#10b981";
            arrowLine.setAttribute("stroke", strokeColor);
            arrowLine.setAttribute("marker-end", `url(#${markerId})`);

            const arrowsContainer = activeChartLabelDrag.svgEl.querySelector(".arrows-container");
            if (arrowsContainer) {
                arrowsContainer.appendChild(arrowLine);
            } else {
                activeChartLabelDrag.svgEl.insertBefore(arrowLine, activeChartLabelDrag.labelGroupEl);
            }
        }

        arrowLine.setAttribute("x1", currentX);
        arrowLine.setAttribute("y1", currentY);
        arrowLine.setAttribute("x2", activeChartLabelDrag.anchorX);
        arrowLine.setAttribute("y2", activeChartLabelDrag.anchorY);
        arrowLine.style.display = "block";
    } else if (arrowLine) {
        arrowLine.style.display = "none";
    }
}
if (typeof window !== "undefined") window.onChartLabelDragMove = onChartLabelDragMove;

function onChartLabelDragEnd(e) {
    if (!activeChartLabelDrag) return;

    window.removeEventListener("mousemove", onChartLabelDragMove);
    window.removeEventListener("mouseup", onChartLabelDragEnd);

    activeChartLabelDrag.labelGroupEl.style.cursor = "grab";

    const curSvgPt = getSvgCoordinates(e, activeChartLabelDrag.svgEl);
    const mouseDeltaX = curSvgPt.x - activeChartLabelDrag.startMouseX;
    const mouseDeltaY = curSvgPt.y - activeChartLabelDrag.startMouseY;

    const finalDx = Math.round(activeChartLabelDrag.initialDx + mouseDeltaX);
    const finalDy = Math.round(activeChartLabelDrag.initialDy + mouseDeltaY);
    const totalDist = Math.hypot(finalDx, finalDy);

    if (!appState.graphSettings) appState.graphSettings = {};
    if (!appState.graphSettings.labelPositions) appState.graphSettings.labelPositions = {};

    if (totalDist > 6) {
        appState.graphSettings.labelPositions[activeChartLabelDrag.labelKey] = {
            dx: finalDx,
            dy: finalDy,
            isCustom: true
        };
    } else {
        delete appState.graphSettings.labelPositions[activeChartLabelDrag.labelKey];
    }

    saveAppState();
    activeChartLabelDrag = null;
}
if (typeof window !== "undefined") window.onChartLabelDragEnd = onChartLabelDragEnd;

function resetChartLabelPosition(e, labelKey) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    if (appState.graphSettings?.labelPositions?.[labelKey]) {
        delete appState.graphSettings.labelPositions[labelKey];
        saveAppState();
        renderKPI5LineGraph();
        if (appState.activeTab === "tab-analytics") renderPortfolioKPI5Graph();
        if (appState.activeTab === "tab-executive") renderCompiledVisualAnalytics();
    }
}
if (typeof window !== "undefined") window.resetChartLabelPosition = resetChartLabelPosition;

function getGraphDisplaySettings(kpiKey, isCompilerOrCompiled) {
    if (isCompilerOrCompiled) {
        if (!appState.compilerGraphSettings) appState.compilerGraphSettings = {};
        if (!appState.compilerGraphSettings[kpiKey]) {
            appState.compilerGraphSettings[kpiKey] = {
                dateAngle: "horizontal",
                xAxisOffset: 25,
                labelPos: "above",
                posIssued: "high",
                posTarget: "below",
                posMinor: "above",
                posCrit: "extra_high",
                yLeftOffset: 18,
                yRightOffset: 18,
                showLabels: "true",
                fontSize: "11",
                fontWeight: "700"
            };
        }
        const s = appState.compilerGraphSettings[kpiKey];
        if (s.yLeftOffset === undefined) {
            s.yLeftOffset = s.yAxisOffset ? Math.max(8, Math.min(85, parseInt(s.yAxisOffset) - 60)) : 18;
        }
        if (s.yRightOffset === undefined) s.yRightOffset = 18;
        if (kpiKey === "kpi5") {
            if (!s.posIssued) s.posIssued = "high";
            if (!s.posTarget) s.posTarget = "below";
            if (!s.posMinor) s.posMinor = "above";
            if (!s.posCrit) s.posCrit = "extra_high";
        }
        if (s.monthPos === undefined) s.monthPos = "top";
        if (s.labelOffset === undefined) s.labelOffset = 0;
        return s;
    } else {
        if (!appState.graphSettings) appState.graphSettings = {};
        if (!appState.graphSettings[kpiKey]) {
            appState.graphSettings[kpiKey] = {
                dateAngle: "auto",
                xAxisOffset: 20,
                labelPos: "above",
                posIssued: "high",
                posTarget: "below",
                posMinor: "above",
                posCrit: "extra_high",
                monthPos: "top",
                labelOffset: 0,
                yLeftOffset: 18,
                yRightOffset: 18,
                showLabels: "true",
                fontSize: "11",
                fontWeight: "700"
            };
        }
        const s = appState.graphSettings[kpiKey];
        if (s.yLeftOffset === undefined) {
            s.yLeftOffset = s.yAxisOffset ? Math.max(8, Math.min(85, parseInt(s.yAxisOffset) - 60)) : 18;
        }
        if (s.yRightOffset === undefined) s.yRightOffset = 18;
        if (s.monthPos === undefined) s.monthPos = "top";
        if (s.labelOffset === undefined) s.labelOffset = 0;
        if (kpiKey === "kpi5") {
            if (!s.posIssued) s.posIssued = "high";
            if (!s.posTarget) s.posTarget = "below";
            if (!s.posMinor) s.posMinor = "above";
            if (!s.posCrit) s.posCrit = "extra_high";
        }
        return s;
    }
}

function onCompilerGraphSettingChange(kpiKey) {
    if (!appState.compilerGraphSettings) appState.compilerGraphSettings = {};
    if (!appState.compilerGraphSettings[kpiKey]) {
        appState.compilerGraphSettings[kpiKey] = {
            dateAngle: "horizontal",
            xAxisOffset: 25,
            labelPos: "above",
            posIssued: "high",
            posTarget: "below",
            posMinor: "above",
            posCrit: "extra_high",
            monthPos: "top",
            labelOffset: 0,
            yLeftOffset: 18,
            yRightOffset: 18,
            showLabels: "true",
            fontSize: "11",
            fontWeight: "700"
        };
    }

    const dateAngleEl = document.getElementById(`comp_${kpiKey}_dateAngle`);
    const xAxisOffsetEl = document.getElementById(`comp_${kpiKey}_xAxisOffset`);
    const fontSizeEl = document.getElementById(`comp_${kpiKey}_fontSize`);
    const labelPosEl = document.getElementById(`comp_${kpiKey}_labelPos`);
    const yLeftOffsetEl = document.getElementById(`comp_${kpiKey}_yLeftOffset`);
    const yRightOffsetEl = document.getElementById(`comp_${kpiKey}_yRightOffset`);
    const posIssuedEl = document.getElementById(`comp_${kpiKey}_posIssued`);
    const posTargetEl = document.getElementById(`comp_${kpiKey}_posTarget`);
    const posMinorEl = document.getElementById(`comp_${kpiKey}_posMinor`);
    const posCritEl = document.getElementById(`comp_${kpiKey}_posCrit`);
    const monthPosEl = document.getElementById(`comp_${kpiKey}_monthPos`);
    const labelOffsetEl = document.getElementById(`comp_${kpiKey}_labelOffset`);

    if (dateAngleEl) appState.compilerGraphSettings[kpiKey].dateAngle = dateAngleEl.value;
    if (xAxisOffsetEl) appState.compilerGraphSettings[kpiKey].xAxisOffset = parseInt(xAxisOffsetEl.value) || 25;
    if (fontSizeEl) appState.compilerGraphSettings[kpiKey].fontSize = fontSizeEl.value;
    if (labelPosEl) appState.compilerGraphSettings[kpiKey].labelPos = labelPosEl.value;
    if (yLeftOffsetEl) appState.compilerGraphSettings[kpiKey].yLeftOffset = parseInt(yLeftOffsetEl.value) || 18;
    if (yRightOffsetEl) appState.compilerGraphSettings[kpiKey].yRightOffset = parseInt(yRightOffsetEl.value) || 18;
    if (posIssuedEl) appState.compilerGraphSettings[kpiKey].posIssued = posIssuedEl.value;
    if (posTargetEl) appState.compilerGraphSettings[kpiKey].posTarget = posTargetEl.value;
    if (posMinorEl) appState.compilerGraphSettings[kpiKey].posMinor = posMinorEl.value;
    if (posCritEl) appState.compilerGraphSettings[kpiKey].posCrit = posCritEl.value;
    if (monthPosEl) appState.compilerGraphSettings[kpiKey].monthPos = monthPosEl.value;
    if (labelOffsetEl) appState.compilerGraphSettings[kpiKey].labelOffset = parseInt(labelOffsetEl.value) || 0;

    saveAppState();

    // Re-render compiler charts
    const targetProjects = getCompilerTargetProjects();
    const timeRange = appState.compiler?.timeRange || "FY";
    const compMode = appState.compiler?.compMode || "pop";
    const baseQ = document.getElementById("compilerBaseQuarter")?.value || "Q1";
    const targetQ = document.getElementById("compilerTargetQuarter")?.value || "Q2";
    renderCompiledVisualAnalytics(targetProjects, timeRange, compMode, baseQ, targetQ);
}
// Helper to extract month key and 3-letter month name from date string
function getPointMonthKey(dateStr) {
    if (!dateStr) return null;
    const s = String(dateStr).trim();
    // Check YYYY-MM-DD
    const matchISO = s.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
    if (matchISO) {
        const y = matchISO[1];
        const m = String(matchISO[2]).padStart(2, '0');
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        const mIdx = parseInt(m, 10) - 1;
        return { key: `${y}-${m}`, name: monthNames[mIdx] || m, year: y };
    }
    // Check MM/DD/YYYY
    const matchUS = s.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})/);
    if (matchUS) {
        const y = matchUS[3];
        const m = String(matchUS[1]).padStart(2, '0');
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        const mIdx = parseInt(m, 10) - 1;
        return { key: `${y}-${m}`, name: monthNames[mIdx] || m, year: y };
    }
    // Try standard Date
    const d = new Date(s);
    if (!isNaN(d.getTime())) {
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        return { key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`, name: monthNames[d.getMonth()], year: String(d.getFullYear()) };
    }
    // Check 3-letter month (JAN, FEB, ...)
    const upper = s.toUpperCase();
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    for (let m of months) {
        if (upper.includes(m)) return { key: m, name: m, year: "2026" };
    }
    return null;
}

// Generate vertical dashed divider lines and month tag badges across timeline data
function generateMonthDividerLinesSVG(points, paddingTop, chartHeight, monthPos = "top") {
    if (!points || points.length === 0 || monthPos === "hide") return "";
    let svg = "";
    let lastMonthKey = null;

    let badgeYOffset = -18;
    let textYOffset = -7;
    if (monthPos === "high") {
        badgeYOffset = -26;
        textYOffset = -15;
    } else if (monthPos === "middle") {
        badgeYOffset = chartHeight / 2 - 8;
        textYOffset = chartHeight / 2 + 3;
    } else if (monthPos === "bottom") {
        badgeYOffset = chartHeight - 16;
        textYOffset = chartHeight - 5;
    }

    points.forEach((p, idx) => {
        const posX = (p.cx !== undefined) ? p.cx : ((p.x !== undefined) ? p.x : 0);
        const dateVal = p.rawDate || p.date || p.month;
        const mInfo = getPointMonthKey(dateVal);
        if (!mInfo) return;

        const badgeY = paddingTop + badgeYOffset;
        const textY = paddingTop + textYOffset;

        if (lastMonthKey === null) {
            lastMonthKey = mInfo.key;
            // Month Header Tag above the first point
            svg += `
                <g class="month-divider-group">
                    <line x1="${posX}" y1="${paddingTop}" x2="${posX}" y2="${paddingTop + chartHeight}" stroke="var(--border-color, #94a3b8)" stroke-width="1.2" stroke-dasharray="4,4" opacity="0.65"/>
                    <rect x="${posX - 18}" y="${badgeY}" width="36" height="15" rx="3" fill="rgba(59, 130, 246, 0.14)" stroke="rgba(59, 130, 246, 0.40)" stroke-width="0.8"/>
                    <text x="${posX}" y="${textY}" fill="var(--text-secondary, #64748b)" font-size="9px" font-weight="800" text-anchor="middle" letter-spacing="0.5px">${mInfo.name}</text>
                </g>
            `;
        } else if (mInfo.key !== lastMonthKey) {
            lastMonthKey = mInfo.key;
            const prevX = (points[idx - 1].cx !== undefined) ? points[idx - 1].cx : ((points[idx - 1].x !== undefined) ? points[idx - 1].x : posX);
            const lineX = (prevX + posX) / 2;

            svg += `
                <g class="month-divider-group">
                    <!-- Vertical Dashed Line Indicating Month Transition -->
                    <line x1="${lineX}" y1="${paddingTop}" x2="${lineX}" y2="${paddingTop + chartHeight}" stroke="#64748b" stroke-width="1.5" stroke-dasharray="5,4" opacity="0.85"/>
                    <!-- Month Demarcation Badge -->
                    <rect x="${lineX - 18}" y="${badgeY}" width="36" height="15" rx="3" fill="rgba(59, 130, 246, 0.20)" stroke="#3b82f6" stroke-width="1"/>
                    <text x="${lineX}" y="${textY}" fill="#2563eb" font-size="9px" font-weight="800" text-anchor="middle" letter-spacing="0.5px">${mInfo.name}</text>
                </g>
            `;
        }
    });

    return svg;
}

function renderKPI1ComboChart(box, logs, isCompiledMode, card, targetProjects, timeRange) {
    if (!box) return;

    const isCompiler = isCompiledMode || (box.closest && box.closest('#tab-executive')) || (box.classList && box.classList.contains('compiler-chart-svg-box'));
    const sortedLogs = [...(logs || [])].sort((a, b) => {
        const dA = new Date(a.dateRes || a.dateCond || a.date || '2026-01-01').getTime();
        const dB = new Date(b.dateRes || b.dateCond || b.date || '2026-01-01').getTime();
        return dA - dB;
    });

    const parsedLogs = sortedLogs.map((l, idx) => {
        const isPass = (l.remarks || 'Pass').toString().trim().toLowerCase() === 'pass';
        const rawDate = l.dateRes || l.dateCond || l.date || `Test ${idx + 1}`;
        const date = formatChartXAxisDate(rawDate);
        const discipline = l.discipline || 'General Engineering';
        const test = l.test || l.desc || 'Standard Field Test';
        const projectName = l.projectName || (appState.projects[appState.activeProjectId] ? appState.projects[appState.activeProjectId].name : 'Active Site');
        const passed = isPass ? 1 : 0;
        const failed = isPass ? 0 : 1;
        const total = 1;
        const ftq = isPass ? 100.0 : 0.0;

        return {
            rawDate,
            date,
            discipline,
            test,
            projectName,
            isPass,
            passed,
            failed,
            total,
            ftq
        };
    });

    const totalConducted = parsedLogs.length;
    const totalPassed = parsedLogs.filter(d => d.isPass).length;
    const totalFailed = totalConducted - totalPassed;
    const overallFTQ = totalConducted > 0 ? (totalPassed / totalConducted) * 100 : 100.0;
    const isOverallCompliant = overallFTQ >= 90.0;

    // Render Summary Metric Scorecards
    let metricsContainer = null;
    if (isCompiler) {
        metricsContainer = (card && typeof card.querySelector === "function") ? card.querySelector(".kpi2-metrics-grid") : null;
        if (!metricsContainer && card && typeof card.appendChild === "function") {
            metricsContainer = document.createElement("div");
            metricsContainer.className = "kpi2-metrics-grid";
            card.appendChild(metricsContainer);
        }
    } else {
        metricsContainer = document.getElementById("kpi1SummaryMetrics");
    }

    if (metricsContainer) {
        metricsContainer.innerHTML = `
            <div class="kpi2-metric-card">
                <span class="kpi2-metric-label">🧪 Total Tests Conducted</span>
                <span class="kpi2-metric-val">${totalConducted.toLocaleString()} Tests</span>
                <span class="kpi2-metric-sub">Across All Selected Disciplines</span>
            </div>
            <div class="kpi2-metric-card">
                <span class="kpi2-metric-label">✅ First-Time Passed</span>
                <span class="kpi2-metric-val" style="color: #34d399;">${totalPassed.toLocaleString()} Passed</span>
                <span class="kpi2-metric-sub">${overallFTQ.toFixed(1)}% First-Pass Velocity</span>
            </div>
            <div class="kpi2-metric-card">
                <span class="kpi2-metric-label">❌ Failed / Re-tested</span>
                <span class="kpi2-metric-val" style="color: ${totalFailed > 0 ? '#ef4444' : '#34d399'};">${totalFailed.toLocaleString()} Tests</span>
                <span class="kpi2-metric-sub">${totalFailed === 0 ? 'Zero Deficiencies Recorded' : 'Action / Re-testing Required'}</span>
            </div>
            <div class="kpi2-metric-card">
                <span class="kpi2-metric-label">🛡️ FTQ Compliance Status</span>
                <span class="kpi2-metric-val">
                    ${isOverallCompliant 
                        ? '<span class="status-badge badge-green" style="font-size:12px;">ON TRACK (≥ 90.0%)</span>' 
                        : '<span class="status-badge badge-red" style="font-size:12px;">ACTION REQUIRED (< 90.0%)</span>'}
                </span>
                <span class="kpi2-metric-sub">${isOverallCompliant ? `+${(overallFTQ - 90.0).toFixed(1)}% Over Target Benchmark` : `-${(90.0 - overallFTQ).toFixed(1)}% Below 90% Target`}</span>
            </div>
        `;
    }

    if (parsedLogs.length === 0) {
        box.innerHTML = `
            <div style="padding: 60px 20px; text-align: center; color: var(--text-secondary); font-size: 13px;">
                ℹ️ No QA/QC testing logs recorded matching the active filters.
            </div>
        `;
        return;
    }

    // Graph formatting options
    const opts = getGraphDisplaySettings("kpi1", isCompiler);

    const showLabels = opts.labelPos !== "hide" && opts.showLabels !== "false";
    const labelPos = opts.labelPos || "above";
    const fontSize = parseInt(opts.fontSize) || 11;
    const fontWeight = opts.fontWeight || "700";
    const dateAngle = opts.dateAngle || "horizontal";
    const yLeftOffset = parseInt(opts.yLeftOffset) || 18;
    const yRightOffset = parseInt(opts.yRightOffset) || 18;
    const extraXOffset = parseInt(opts.xAxisOffset) || 25;
    const monthPos = opts.monthPos || "top";
    const labelOffset = parseInt(opts.labelOffset) || 0;

    const width = box.clientWidth || 800;
    const isExpanded = (box.classList && typeof box.classList.contains === "function") ? box.classList.contains("expanded-graph") : false;
    const defaultHeight = isExpanded ? 560 : (isCompiler ? 560 : 380);
    const height = box.clientHeight && box.clientHeight > 100 ? box.clientHeight : defaultHeight;

    const paddingTop = isCompiler ? 35 : 45;
    const paddingLeft = Math.max(80, 50 + yLeftOffset);
    const paddingRight = Math.max(75, 45 + yRightOffset);

    let paddingBottom = 45;
    if (dateAngle === "vertical") {
        paddingBottom = Math.max(75, 45 + extraXOffset + 25);
    } else if (dateAngle === "slanted") {
        paddingBottom = Math.max(65, 35 + extraXOffset + 20);
    } else {
        paddingBottom = Math.max(45, 20 + extraXOffset + 15);
    }

    const chartHeight = height - paddingTop - paddingBottom;
    const chartWidth = width - paddingLeft - paddingRight;

    // Left Y-Axis Scale: Test Volume (Pass + Fail count) with tight dynamic headroom
    const maxVolumeVal = Math.max(...parsedLogs.map(d => d.total), 1);
    const maxLeftY = Math.max(1, Math.ceil(maxVolumeVal * 1.06));

    // Right Y-Axis Scale: FTQ % dynamically scaled to data
    const allFTQs = parsedLogs.map(d => d.ftq);
    const rawMinFTQ = Math.min(...allFTQs, 90.0);
    const rawMaxFTQ = Math.max(...allFTQs, 100.0);
    const ftqRange = rawMaxFTQ - rawMinFTQ;
    const minRightY = Math.max(0, Math.floor((rawMinFTQ - Math.max(2, ftqRange * 0.1)) / 2) * 2);
    const maxRightY = Math.min(100, Math.ceil(rawMaxFTQ + Math.max(1, ftqRange * 0.05)));

    const pointsCount = parsedLogs.length;
    const xStep = chartWidth / Math.max(1, pointsCount - 1);
    
    // Thinner Bar Width for clean high-density layout
    const barWidth = Math.min(22, Math.max(6, (chartWidth / Math.max(pointsCount, 1)) * 0.22));

    // Project Color Palette Mapping
    const uniqueProjects = Array.from(new Set(parsedLogs.map(p => p.projectName || "Default")));
    const PROJECT_PALETTES = [
        { id: 0, pass1: "#3b82f6", pass2: "#1d4ed8", fail1: "#ef4444", fail2: "#b91c1c", strokePass: "#2563eb", strokeFail: "#dc2626" },
        { id: 1, pass1: "#8b5cf6", pass2: "#6d28d9", fail1: "#f43f5e", fail2: "#be123c", strokePass: "#7c3aed", strokeFail: "#e11d48" },
        { id: 2, pass1: "#06b6d4", pass2: "#0e7490", fail1: "#f97316", fail2: "#c2410c", strokePass: "#0891b2", strokeFail: "#ea580c" },
        { id: 3, pass1: "#10b981", pass2: "#047857", fail1: "#e11d48", fail2: "#9f1239", strokePass: "#059669", strokeFail: "#be123c" },
        { id: 4, pass1: "#f59e0b", pass2: "#b45309", fail1: "#dc2626", fail2: "#991b1b", strokePass: "#d97706", strokeFail: "#b91c1c" },
        { id: 5, pass1: "#ec4899", pass2: "#be185d", fail1: "#eab308", fail2: "#a16207", strokePass: "#db2777", strokeFail: "#ca8a04" }
    ];
    const projectColorMap = {};
    uniqueProjects.forEach((pName, idx) => {
        projectColorMap[pName] = PROJECT_PALETTES[idx % PROJECT_PALETTES.length];
    });

    const points = parsedLogs.map((d, idx) => {
        const cx = pointsCount === 1 ? paddingLeft + chartWidth / 2 : paddingLeft + idx * xStep;
        
        // Stacked Bar Heights
        const passH = (d.passed / maxLeftY) * chartHeight;
        const failH = (d.failed / maxLeftY) * chartHeight;
        const passY = height - paddingBottom - passH;
        const failY = passY - failH;

        // Line Y position spanning tight vertical bounds
        const lineY = height - paddingBottom - ((d.ftq - minRightY) / (maxRightY - minRightY || 1)) * chartHeight;

        return { ...d, cx, passH, failH, passY, failY, lineY };
    });

    const tooltipTarget = isCompiler ? "repChartTooltip" : (box.id && box.id.includes("portfolio") ? "portfolioKpi1ChartTooltip" : "kpi1ChartTooltip");

    let svg = `<svg width="100%" height="100%" viewBox="0 0 ${width} ${height}">`;

    let defsGradients = "";
    uniqueProjects.forEach((pName) => {
        const pal = projectColorMap[pName];
        defsGradients += `
            <linearGradient id="passBarGrad_kpi1_${pal.id}" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="${pal.pass1}" stop-opacity="0.92"/>
                <stop offset="100%" stop-color="${pal.pass2}" stop-opacity="0.50"/>
            </linearGradient>
            <linearGradient id="failBarGrad_kpi1_${pal.id}" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="${pal.fail1}" stop-opacity="0.92"/>
                <stop offset="100%" stop-color="${pal.fail2}" stop-opacity="0.50"/>
            </linearGradient>
        `;
    });

    svg += `
        <defs>
            ${defsGradients}
        </defs>
    `;

    // Horizontal Grid Lines & Left/Right Y-Axis Labels
    const divisions = 5;
    for (let i = 0; i <= divisions; i++) {
        const gridY = paddingTop + i * (chartHeight / divisions);
        const leftVal = Math.round(maxLeftY - i * (maxLeftY / divisions));
        const rightVal = Math.round(maxRightY - i * ((maxRightY - minRightY) / divisions));

        svg += `<line x1="${paddingLeft}" y1="${gridY}" x2="${width - paddingRight}" y2="${gridY}" class="svg-grid-line"/>`;
        svg += `<text x="${paddingLeft - yLeftOffset}" y="${gridY + 4}" class="svg-axis-label" text-anchor="end" style="font-size: ${fontSize}px; font-weight: 600;">${leftVal}</text>`;
        svg += `<text x="${width - paddingRight + yRightOffset}" y="${gridY + 4}" class="svg-axis-label" text-anchor="start" style="font-size: ${fontSize}px; font-weight: 700; fill: #10b981;">${rightVal}%</text>`;
    }

    // Vertical Dashed Lines Indicating Month Transitions with configurable month position
    svg += generateMonthDividerLinesSVG(points, paddingTop, chartHeight, monthPos);

    // Left Y-Axis Title (Testing Volume)
    const leftTitleX = -(paddingTop + chartHeight / 2);
    const leftTitleY = Math.max(14, paddingLeft - yLeftOffset - 28);
    svg += `<text transform="rotate(-90)" x="${leftTitleX}" y="${leftTitleY}" class="svg-axis-label" style="font-weight:700; font-size:11px; fill:#3b82f6;" text-anchor="middle">Test Volume (Count)</text>`;

    // Right Y-Axis Title (FTQ Pass Rate %)
    const rightTitleX = paddingTop + chartHeight / 2;
    const rightTitleY = -(width - (paddingRight - yRightOffset) + 16);
    svg += `<text transform="rotate(90)" x="${rightTitleX}" y="${rightTitleY}" class="svg-axis-label" style="font-weight:700; font-size:11px; fill:#10b981;" text-anchor="middle">First-Time Pass Rate (FTQ %)</text>`;

    // Target Benchmark Reference Line at 90.0% (Right Y-Axis)
    const targetBenchmarkPct = 90.0;
    const targetY = height - paddingBottom - (targetBenchmarkPct / maxRightY) * chartHeight;
    svg += `
        <line x1="${paddingLeft}" y1="${targetY}" x2="${width - paddingRight}" y2="${targetY}" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="6,4" />
        <rect x="${width - paddingRight - 180}" y="${targetY - 20}" width="180" height="18" rx="4" fill="rgba(239, 68, 68, 0.22)" stroke="#ef4444" stroke-width="1"/>
        <text x="${width - paddingRight - 90}" y="${targetY - 7}" fill="#ef4444" font-size="10px" font-weight="800" text-anchor="middle">TARGET BENCHMARK (≥ 90.0%)</text>
    `;

    // 1. Render Stacked Bars with Project Color Fill & Thinner Width
    points.forEach(p => {
        const barX = p.cx - barWidth / 2;
        const pal = projectColorMap[p.projectName || "Default"] || PROJECT_PALETTES[0];

        // Passed Segment
        if (p.passed > 0) {
            svg += `<rect x="${barX}" y="${p.passY}" width="${barWidth}" height="${p.passH}" rx="${p.failed > 0 ? 0 : 3}" fill="url(#passBarGrad_kpi1_${pal.id})" stroke="${pal.strokePass}" stroke-width="1"/>`;
        }

        // Failed Segment (Stacked on top)
        if (p.failed > 0) {
            svg += `<rect x="${barX}" y="${p.failY}" width="${barWidth}" height="${p.failH}" rx="3" fill="url(#failBarGrad_kpi1_${pal.id})" stroke="${pal.strokeFail}" stroke-width="1"/>`;
        }

        // Volume Label on Bar with configurable labelOffset
        if (showLabels && (opts.showLabels === "all" || pointsCount <= 14)) {
            let volOffset = 6;
            let volY = p.failed > 0 ? p.failY - volOffset : p.passY - volOffset;
            let volFill = "var(--text-secondary)";
            if (labelPos === "high") {
                volOffset = 16;
                volY = p.failed > 0 ? p.failY - volOffset : p.passY - volOffset;
            } else if (labelPos === "extra_high") {
                volOffset = 26;
                volY = p.failed > 0 ? p.failY - volOffset : p.passY - volOffset;
            } else if (labelPos === "inside") {
                volY = p.passY + Math.min(14, p.passH / 2);
                volFill = "#ffffff";
            } else if (labelPos === "below") {
                volY = height - paddingBottom + 14;
            }
            volY += labelOffset;
            svg += `<text x="${p.cx}" y="${volY}" fill="${volFill}" text-anchor="middle" font-size="10px" font-weight="700">${p.total}</text>`;
        }
    });

    // 2. Render FTQ % Trend Line
    if (points.length > 1) {
        const pathD = points.map((p, i) => i === 0 ? `M ${p.cx} ${p.lineY}` : `L ${p.cx} ${p.lineY}`).join(" ");
        svg += `<path d="${pathD}" stroke="#10b981" stroke-width="3.5" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`;
    }

    // 3. Render FTQ Nodes, Halos, and Value Labels with configurable labelOffset
    points.forEach(p => {
        let labelY = p.lineY - 12;
        let labelX = p.cx;
        let textAnchor = "middle";

        if (labelPos === "high") {
            labelY = p.lineY - 22;
        } else if (labelPos === "extra_high") {
            labelY = p.lineY - 32;
        } else if (labelPos === "above") {
            labelY = p.lineY - 12;
        } else if (labelPos === "below") {
            labelY = p.lineY + 18;
        } else if (labelPos === "inline") {
            labelY = p.lineY + 4;
            labelX = p.cx + 10;
            textAnchor = "start";
        }
        labelY = Math.max(14, labelY + labelOffset);

        if (!p.isPass || p.ftq < 90.0) {
            svg += `<circle cx="${p.cx}" cy="${p.lineY}" r="11" fill="rgba(239, 68, 68, 0.25)" stroke="#ef4444" stroke-width="1.5"/>`;
            svg += `<circle cx="${p.cx}" cy="${p.lineY}" r="6.5" fill="#ef4444" stroke="#ffffff" stroke-width="2.5" style="cursor: pointer;"/>`;
            if (showLabels) {
                svg += `<text x="${labelX}" y="${labelY}" fill="#ef4444" text-anchor="${textAnchor}" font-size="${fontSize}px" font-weight="${fontWeight}">${p.ftq.toFixed(0)}%</text>`;
            }
        } else {
            svg += `<circle cx="${p.cx}" cy="${p.lineY}" r="6" fill="#10b981" stroke="#ffffff" stroke-width="2" style="cursor: pointer;"/>`;
            if (showLabels) {
                svg += `<text x="${labelX}" y="${labelY}" fill="#10b981" text-anchor="${textAnchor}" font-size="${fontSize}px" font-weight="${fontWeight}">${p.ftq.toFixed(0)}%</text>`;
            }
        }
    });

    // 4. Interactive Hover Slices for tooltips
    points.forEach(p => {
        const sliceWidth = pointsCount > 1 ? xStep : chartWidth;
        const sliceX = pointsCount > 1 ? p.cx - xStep / 2 : paddingLeft;
        const jsonStr = JSON.stringify({
            date: p.date,
            discipline: p.discipline,
            test: p.test,
            projectName: p.projectName,
            passed: p.passed,
            failed: p.failed,
            total: p.total,
            ftq: p.ftq
        }).replace(/"/g, '&quot;');

        svg += `<rect x="${sliceX}" y="${paddingTop}" width="${sliceWidth}" height="${chartHeight}" fill="transparent" style="cursor: pointer;" onmouseenter="showKpi1Tooltip(event, ${jsonStr}, '${tooltipTarget}')" onmousemove="moveKpi1Tooltip(event, '${tooltipTarget}')" onmouseleave="hideKpi1Tooltip('${tooltipTarget}')"/>`;
    });

    // 5. X-Axis Date Labels with configurable angle & distance
    const isDense = pointsCount >= 6 || xStep < 85;
    const useVertical = dateAngle === "vertical" || (dateAngle === "auto" && isDense);
    const useSlanted = dateAngle === "slanted";
    const xLabelY = height - paddingBottom + extraXOffset;

    points.forEach(p => {
        if (useVertical) {
            svg += `<text x="${p.cx}" y="${xLabelY}" transform="rotate(-90 ${p.cx} ${xLabelY})" class="svg-axis-label" text-anchor="end" font-weight="${fontWeight}" style="font-size: ${fontSize}px;">${p.date}</text>`;
        } else if (useSlanted) {
            svg += `<text x="${p.cx}" y="${xLabelY}" transform="rotate(-45 ${p.cx} ${xLabelY})" class="svg-axis-label" text-anchor="end" font-weight="${fontWeight}" style="font-size: ${fontSize}px;">${p.date}</text>`;
        } else {
            svg += `<text x="${p.cx}" y="${xLabelY}" class="svg-axis-label" text-anchor="middle" font-weight="${fontWeight}" style="font-size: ${fontSize}px;">${p.date}</text>`;
        }
    });

    svg += `</svg>`;
    box.innerHTML = svg;
}

function renderKPI1LineGraph() {
    const box = document.getElementById("kpi1LineChartBox");
    if (!box) return;

    let logs = getFilteredKPILogs("kpi1");
    renderKPI1ComboChart(box, logs, false, null);
}

// ==========================================================================
// 📈 KPI 2: CUMULATIVE REWORK COST MONTHLY TREND GRAPH & INTERACTIVE ENGINE
// ==========================================================================

function showKpi2Tooltip(evt, data, customTooltipId) {
    const tooltip = resolveTooltipElement(customTooltipId, evt, "kpi2ChartTooltip");
    if (!tooltip) return;

    const rate = Number(data.reworkRate || data.cumPct || 0);
    const accumRate = Number(data.accumRate || data.accumulatedRate || 0);
    const isOptimal = rate <= 1.0;
    const isControlled = rate > 1.0 && rate <= 2.0;
    const isBreached = rate > 2.0;

    let statusText = "🟢 Below Recommended Target (≤ 1.00%)";
    let statusColor = "#10b981";
    if (isBreached) {
        statusText = `🔴 Exceeds Max Threshold (+${(rate - 2.0).toFixed(2)}% Over Limit)`;
        statusColor = "#ef4444";
    } else if (isControlled) {
        statusText = `🟡 Controlled Margin (${(2.0 - rate).toFixed(2)}% Margin Under Cap)`;
        statusColor = "#f59e0b";
    }

    tooltip.innerHTML = `
        <div class="chart-tooltip-header">🔨 ${data.desc || data.fullName || 'Rework Breakdown Item'}</div>
        ${data.projectName ? `<div class="chart-tooltip-row"><span>Project:</span> <strong>${data.projectName}</strong></div>` : ''}
        <div class="chart-tooltip-row"><span>Discipline:</span> <strong>${data.discipline || 'General'}${data.subDiscipline ? ` (${data.subDiscipline})` : ''}</strong></div>
        <div class="chart-tooltip-row"><span>Month / Date Log:</span> <strong>${data.date || data.month || '-'} | ${data.quarter || 'N/A'}</strong></div>
        <div class="chart-tooltip-row"><span>Approved Item Cost:</span> <strong>₱${Number(data.approvedCost || data.cumCost || 0).toLocaleString()}</strong></div>
        <div class="chart-tooltip-row"><span>Rework Expenditure:</span> <strong>₱${Number(data.reworkCost || data.monthCost || 0).toLocaleString()}${data.qty ? ` (${data.qty} ${data.unit || 'lot'})` : ''}</strong></div>
        <div class="chart-tooltip-row"><span>Breakdown Rework Rate [Bar]:</span> <strong style="color: ${statusColor}; font-size: 13px;">${rate.toFixed(2)}%</strong></div>
        ${accumRate > 0 ? `<div class="chart-tooltip-row"><span>Accumulated Rework Rate [Line]:</span> <strong style="color: #2563eb; font-size: 13px;">${accumRate.toFixed(2)}%</strong></div>` : ''}
        <div class="chart-tooltip-status" style="color: ${statusColor}; font-weight: 700; margin-top: 4px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 4px;">${statusText}</div>
    `;
    tooltip.style.display = "block";
    tooltip.style.opacity = "1";
    positionChartTooltip(evt, tooltip);
}
if (typeof window !== "undefined") window.showKpi2Tooltip = showKpi2Tooltip;

function moveKpi2Tooltip(evt, customTooltipId) {
    positionChartTooltip(evt, resolveTooltipElement(customTooltipId, evt, "kpi2ChartTooltip"));
}
if (typeof window !== "undefined") window.moveKpi2Tooltip = moveKpi2Tooltip;

function hideKpi2Tooltip(customTooltipId) {
    hideChartTooltip(customTooltipId || "kpi2ChartTooltip");
}
if (typeof window !== "undefined") window.hideKpi2Tooltip = hideKpi2Tooltip;

function renderKPI2LineGraph() {
    const box = document.getElementById("kpi2LineChartBox");
    const proj = appState.projects[appState.activeProjectId];
    if (!box || !proj) return;

    const qFilter = document.getElementById("kpi2QuarterFilter")?.value || "ALL";
    const discFilter = document.getElementById("kpi2DisciplineFilter")?.value || "ALL";
    const subFilter = document.getElementById("kpi2SubDisciplineFilter")?.value || "ALL";
    const descFilter = document.getElementById("kpi2DescFilter")?.value || "ALL";

    let logs = (proj.kpi2_logs || []);
    if (qFilter !== "ALL") logs = logs.filter(l => l.quarter === qFilter);
    if (discFilter !== "ALL") logs = logs.filter(l => l.discipline === discFilter);
    if (subFilter !== "ALL") logs = logs.filter(l => l.subDiscipline === subFilter);
    if (descFilter !== "ALL") logs = logs.filter(l => l.desc === descFilter);

    // Sort chronologically by date
    logs = logs.slice().sort((a, b) => new Date(a.date || "2026-01-01") - new Date(b.date || "2026-01-01"));

    // Map logs with individual breakdown rework rate % and approved cost
    const parsedData = logs.map((l, idx) => {
        const qty = parseFloat(l.qty) || 1;
        const labor = parseFloat(l.labor) || 0;
        const mat = parseFloat(l.mat) || 0;
        const reworkCost = (labor + mat) * qty;
        const approvedCost = (parseFloat(l.approvedCost) !== undefined && !isNaN(parseFloat(l.approvedCost)) && parseFloat(l.approvedCost) > 0)
            ? parseFloat(l.approvedCost)
            : (reworkCost > 0 ? reworkCost * 25 : 100000);
        const reworkRate = (reworkCost / approvedCost) * 100;
        return {
            ...l,
            idx: idx + 1,
            reworkCost,
            approvedCost,
            reworkRate,
            isOptimal: reworkRate <= 1.0,
            isControlled: reworkRate > 1.0 && reworkRate <= 2.0,
            isBreached: reworkRate > 2.0
        };
    });

    const totalRework = parsedData.reduce((s, d) => s + d.reworkCost, 0);
    const totalApproved = parsedData.reduce((s, d) => s + d.approvedCost, 0);
    const overallRate = totalApproved > 0 ? (totalRework / totalApproved) * 100 : 0;
    const optimalCount = parsedData.filter(d => d.isOptimal).length;
    const controlledCount = parsedData.filter(d => d.isControlled).length;
    const breachedCount = parsedData.filter(d => d.isBreached).length;
    const compliancePct = parsedData.length > 0 ? Math.round(((parsedData.length - breachedCount) / parsedData.length) * 100) : 100;

    let runningReworkCost = 0;
    const enrichedData = parsedData.map((d) => {
        runningReworkCost += d.reworkCost;
        const accumRate = totalApproved > 0 ? (runningReworkCost / totalApproved) * 100 : d.reworkRate;
        return {
            ...d,
            accumCost: runningReworkCost,
            accumRate: accumRate
        };
    });

    let peakLog = null, peakRate = 0, peakCost = 0, peakApproved = 0;
    enrichedData.forEach(d => {
        if (d.reworkRate > peakRate) {
            peakRate = d.reworkRate;
            peakLog = d;
            peakCost = d.reworkCost;
            peakApproved = d.approvedCost;
        }
    });

    // Render Summary KPI Metrics Cards (Placed Below Graph)
    const metricsBox = document.getElementById("kpi2SummaryMetrics");
    if (metricsBox) {
        metricsBox.innerHTML = `
            <div class="kpi2-metric-card">
                <span class="kpi2-metric-label">💰 Scope Approved Item Cost</span>
                <span class="kpi2-metric-val">₱${totalApproved.toLocaleString()}</span>
                <span class="kpi2-metric-sub">Evaluated Breakdown Scope Baseline</span>
            </div>
            <div class="kpi2-metric-card">
                <span class="kpi2-metric-label">🔨 Total Scope Rework Cost</span>
                <span class="kpi2-metric-val" style="color: ${overallRate > 2.0 ? '#ef4444' : '#60a5fa'};">₱${totalRework.toLocaleString()} (${overallRate.toFixed(2)}%)</span>
                <span class="kpi2-metric-sub">${enrichedData.length} Rework Breakdown Activity(s)</span>
            </div>
            <div class="kpi2-metric-card">
                <span class="kpi2-metric-label">🛡️ Threshold Compliance</span>
                <span class="kpi2-metric-val">
                    ${breachedCount === 0 
                        ? `<span class="status-badge badge-green" style="font-size:12px;">${compliancePct}% COMPLIANT</span>` 
                        : `<span class="status-badge badge-red" style="font-size:12px;">${breachedCount} BREACHED (${compliancePct}%)</span>`}
                </span>
                <span class="kpi2-metric-sub">${optimalCount} Optimal (≤1.0%), ${controlledCount} Controlled, ${breachedCount} Breached</span>
            </div>
            <div class="kpi2-metric-card">
                <span class="kpi2-metric-label">⚡ Highest Breakdown Rate</span>
                <span class="kpi2-metric-val" style="font-size: 15px; color: ${peakRate > 2.0 ? '#ef4444' : (peakRate > 1.0 ? '#f59e0b' : '#10b981')};">
                    ${peakLog ? `${peakRate.toFixed(2)}% (${peakLog.desc})` : 'No Rework Logged'}
                </span>
                <span class="kpi2-metric-sub">${peakLog ? `₱${peakCost.toLocaleString()} / ₱${peakApproved.toLocaleString()} Approved` : 'All Breakdown Items Clear'}</span>
            </div>
        `;
    }

    // Formatting options
    const opts = getGraphDisplaySettings("kpi2", false);

    const showLabels = opts.labelPos !== "hide" && opts.showLabels !== "false";
    const labelPos = opts.labelPos || "above";
    const fontSize = parseInt(opts.fontSize) || 11;
    const fontWeight = opts.fontWeight || "700";
    const dateAngle = opts.dateAngle || "horizontal";
    const yLeftOffset = parseInt(opts.yLeftOffset) || 18;
    const extraXOffset = parseInt(opts.xAxisOffset) || 20;
    const monthPos = opts.monthPos || "top";

    const width = box.clientWidth || 800;
    const height = box.clientHeight && box.clientHeight > 100 ? box.clientHeight : 380;

    const paddingTop = 50;
    const paddingLeft = Math.max(80, 50 + yLeftOffset);
    const paddingRight = 45;

    let paddingBottom = 50;
    if (dateAngle === "vertical") {
        paddingBottom = Math.max(80, 50 + extraXOffset + 25);
    } else if (dateAngle === "slanted") {
        paddingBottom = Math.max(70, 50 + extraXOffset + 18);
    } else {
        paddingBottom = Math.max(52, 25 + extraXOffset + 15);
    }
    const chartHeight = height - paddingTop - paddingBottom;
    const chartWidth = width - paddingLeft - paddingRight;

    if (enrichedData.length === 0) {
        box.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 ${width} ${height}">
                <text x="${width / 2}" y="${height / 2}" fill="var(--text-secondary)" font-size="14px" font-weight="600" text-anchor="middle">
                    No Rework BOQ breakdown items found matching the selected filter criteria.
                </text>
            </svg>
        `;
        return;
    }

    // Month Segments & Division
    let monthSegments = [];
    if (qFilter === "Q1") {
        monthSegments = [
            { name: "JAN", idx: 0, mNum: 0, qKey: "Q1" },
            { name: "FEB", idx: 1, mNum: 1, qKey: "Q1" },
            { name: "MAR", idx: 2, mNum: 2, qKey: "Q1" }
        ];
    } else if (qFilter === "Q2") {
        monthSegments = [
            { name: "APR", idx: 0, mNum: 3, qKey: "Q2" },
            { name: "MAY", idx: 1, mNum: 4, qKey: "Q2" },
            { name: "JUN", idx: 2, mNum: 5, qKey: "Q2" }
        ];
    } else if (qFilter === "Q3") {
        monthSegments = [
            { name: "JUL", idx: 0, mNum: 6, qKey: "Q3" },
            { name: "AUG", idx: 1, mNum: 7, qKey: "Q3" },
            { name: "SEP", idx: 2, mNum: 8, qKey: "Q3" }
        ];
    } else if (qFilter === "Q4") {
        monthSegments = [
            { name: "OCT", idx: 0, mNum: 9, qKey: "Q4" },
            { name: "NOV", idx: 1, mNum: 10, qKey: "Q4" },
            { name: "DEC", idx: 2, mNum: 11, qKey: "Q4" }
        ];
    } else if (qFilter === "Q1-Q2") {
        monthSegments = [
            { name: "Q1: JAN – MAR", idx: 0, qKey: "Q1" },
            { name: "Q2: APR – JUN", idx: 1, qKey: "Q2" }
        ];
    } else if (qFilter === "Q1-Q3") {
        monthSegments = [
            { name: "Q1: JAN – MAR", idx: 0, qKey: "Q1" },
            { name: "Q2: APR – JUN", idx: 1, qKey: "Q2" },
            { name: "Q3: JUL – SEP", idx: 2, qKey: "Q3" }
        ];
    } else {
        monthSegments = [
            { name: "Q1: JAN – MAR", idx: 0, qKey: "Q1" },
            { name: "Q2: APR – JUN", idx: 1, qKey: "Q2" },
            { name: "Q3: JUL – SEP", idx: 2, qKey: "Q3" },
            { name: "Q4: OCT – DEC", idx: 3, qKey: "Q4" }
        ];
    }

    const numZones = monthSegments.length;
    const zoneWidth = chartWidth / numZones;

    const zones = monthSegments.map((seg, sIdx) => {
        const xStart = paddingLeft + sIdx * zoneWidth;
        const xEnd = paddingLeft + (sIdx + 1) * zoneWidth;
        const cx = (xStart + xEnd) / 2;
        return { ...seg, xStart, xEnd, cx };
    });

    // Group data points into their month / quarter segments
    const itemsBySegment = {};
    zones.forEach((_, idx) => { itemsBySegment[idx] = []; });

    enrichedData.forEach(d => {
        let segIdx = 0;
        if (["Q1", "Q2", "Q3", "Q4"].includes(qFilter)) {
            if (d.date) {
                const dObj = new Date(d.date);
                if (!isNaN(dObj.getTime())) {
                    segIdx = dObj.getMonth() % 3;
                }
            }
        } else {
            const qKey = (d.quarter || "").toUpperCase().trim();
            const foundIdx = monthSegments.findIndex(s => s.qKey === qKey);
            if (foundIdx !== -1) {
                segIdx = foundIdx;
            } else if (d.date) {
                const dObj = new Date(d.date);
                if (!isNaN(dObj.getTime())) {
                    const m = dObj.getMonth();
                    const derivedQ = m <= 2 ? "Q1" : (m <= 5 ? "Q2" : (m <= 8 ? "Q3" : "Q4"));
                    const dIdx = monthSegments.findIndex(s => s.qKey === derivedQ);
                    if (dIdx !== -1) segIdx = dIdx;
                }
            }
        }
        if (segIdx < 0 || segIdx >= numZones) segIdx = 0;
        itemsBySegment[segIdx].push(d);
    });

    const pointPositions = new Map();
    zones.forEach((z, sIdx) => {
        const sItems = itemsBySegment[sIdx] || [];
        const count = sItems.length;
        sItems.forEach((item, k) => {
            const itemCx = count === 1 ? z.cx : z.xStart + ((k + 0.5) / count) * zoneWidth;
            pointPositions.set(item, itemCx);
        });
    });

    // Y-Axis Scaling: bounds based on maximum of individual breakdown rates and accumulated rates
    const maxDataRate = Math.max(...enrichedData.map(d => Math.max(d.reworkRate, d.accumRate)), 2.2);
    const maxY = Math.max(2.5, Math.ceil((maxDataRate * 1.25) * 10) / 10);

    const yIncrements = [];
    const numSteps = 5;
    for (let i = 0; i <= numSteps; i++) {
        yIncrements.push(parseFloat(((maxY / numSteps) * i).toFixed(2)));
    }

    const pointsCount = enrichedData.length;
    const barWidth = Math.min(46, Math.max(14, (zoneWidth / Math.max(1, Math.max(...Object.values(itemsBySegment).map(a => a.length)))) * 0.48));

    const points = enrichedData.map((d) => {
        const cx = pointPositions.get(d) || (paddingLeft + chartWidth / 2);
        const barH = Math.max(2, (d.reworkRate / maxY) * chartHeight);
        const barY = height - paddingBottom - barH;
        const barX = cx - barWidth / 2;
        const cyAccum = height - paddingBottom - (d.accumRate / maxY) * chartHeight;
        return { ...d, cx, barX, barY, barH, cyAccum };
    });

    let svg = `<svg width="100%" height="100%" viewBox="0 0 ${width} ${height}">`;

    // Linear Gradients
    svg += `
        <defs>
            <linearGradient id="kpi2BarGrad_green" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#10b981" stop-opacity="0.95"/>
                <stop offset="100%" stop-color="#059669" stop-opacity="0.75"/>
            </linearGradient>
            <linearGradient id="kpi2BarGrad_amber" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.95"/>
                <stop offset="100%" stop-color="#d97706" stop-opacity="0.75"/>
            </linearGradient>
            <linearGradient id="kpi2BarGrad_red" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#ef4444" stop-opacity="0.95"/>
                <stop offset="100%" stop-color="#dc2626" stop-opacity="0.75"/>
            </linearGradient>
            <linearGradient id="accumReworkAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#2563eb" stop-opacity="0.22"/>
                <stop offset="100%" stop-color="#2563eb" stop-opacity="0.01"/>
            </linearGradient>
        </defs>
    `;

    // Horizontal Y-Axis Grid Lines & Labels
    yIncrements.forEach(yVal => {
        const gridY = height - paddingBottom - (yVal / maxY) * chartHeight;
        svg += `<line x1="${paddingLeft}" y1="${gridY}" x2="${width - paddingRight}" y2="${gridY}" class="svg-grid-line"/>`;
        svg += `<text x="${paddingLeft - yLeftOffset}" y="${gridY + 4}" class="svg-axis-label" text-anchor="end">${yVal.toFixed(1)}%</text>`;
    });

    // 1. Vertical Dashed Lines Demarcating Month Transitions
    for (let i = 1; i < numZones; i++) {
        const divX = paddingLeft + i * zoneWidth;
        svg += `<line x1="${divX}" y1="${paddingTop}" x2="${divX}" y2="${height - paddingBottom}" stroke="var(--border-color, #64748b)" stroke-width="1.5" stroke-dasharray="5,4" opacity="0.85"/>`;
    }

    // 2. Month Badges at the TOP MOST of the Graph Area
    if (monthPos !== "hide") {
        let badgeY = paddingTop - 24;
        let textY = paddingTop - 12;
        if (monthPos === "high") {
            badgeY = paddingTop - 34;
            textY = paddingTop - 22;
        } else if (monthPos === "middle") {
            badgeY = paddingTop + chartHeight / 2 - 8;
            textY = paddingTop + chartHeight / 2 + 4;
        } else if (monthPos === "bottom") {
            badgeY = height - paddingBottom - 20;
            textY = height - paddingBottom - 9;
        }

        zones.forEach(z => {
            const badgeW = (z.name.length > 5) ? 120 : 68;
            svg += `
                <g class="month-header-badge-group">
                    <rect x="${z.cx - badgeW / 2}" y="${badgeY}" width="${badgeW}" height="17" rx="4" fill="rgba(59, 130, 246, 0.18)" stroke="#3b82f6" stroke-width="1.2"/>
                    <text x="${z.cx}" y="${textY}" fill="#38bdf8" font-size="10px" font-weight="900" text-anchor="middle" letter-spacing="0.5px">${z.name}</text>
                </g>
            `;
        });
    }

    // Left Y-Axis Title
    const leftTitleX = -(paddingTop + chartHeight / 2);
    const leftTitleY = Math.max(14, paddingLeft - yLeftOffset - 28);
    svg += `<text transform="rotate(-90)" x="${leftTitleX}" y="${leftTitleY}" class="svg-axis-label" style="font-weight:700; font-size:11px; fill:var(--text-secondary);" text-anchor="middle">Rework Rate (% of Approved Item Cost)</text>`;

    // 1. Recommended Target Reference Line at 1.00% (Green Dashed)
    const recThresholdPct = 1.0;
    const recY = height - paddingBottom - (recThresholdPct / maxY) * chartHeight;
    svg += `
        <line x1="${paddingLeft}" y1="${recY}" x2="${width - paddingRight}" y2="${recY}" stroke="#10b981" stroke-width="2" stroke-dasharray="6,4" />
        <rect x="${width - paddingRight - 185}" y="${recY - 18}" width="185" height="17" rx="3" fill="rgba(16, 185, 129, 0.18)" stroke="#10b981" stroke-width="1"/>
        <text x="${width - paddingRight - 92}" y="${recY - 6}" fill="#10b981" font-size="9.5px" font-weight="800" text-anchor="middle">RECOMMENDED TARGET (≤ 1.00%)</text>
    `;

    // 2. Max Threshold Limit Reference Line at 2.00% (Red Dashed)
    const maxThresholdPct = 2.0;
    const targetY = height - paddingBottom - (maxThresholdPct / maxY) * chartHeight;
    svg += `
        <line x1="${paddingLeft}" y1="${targetY}" x2="${width - paddingRight}" y2="${targetY}" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="6,4" />
        <rect x="${width - paddingRight - 185}" y="${targetY - 20}" width="185" height="18" rx="4" fill="rgba(239, 68, 68, 0.22)" stroke="#ef4444" stroke-width="1"/>
        <text x="${width - paddingRight - 92}" y="${targetY - 7}" fill="#ef4444" font-size="10px" font-weight="800" text-anchor="middle">MAX THRESHOLD LIMIT (≤ 2.00%)</text>
    `;

    // 3. Render Vertical Bars (Actual Breakdown Rework Rate %)
    points.forEach(p => {
        let gradId = "kpi2BarGrad_green";
        let barColor = "#10b981";
        if (p.isBreached) { gradId = "kpi2BarGrad_red"; barColor = "#ef4444"; }
        else if (p.isControlled) { gradId = "kpi2BarGrad_amber"; barColor = "#f59e0b"; }

        svg += `<rect x="${p.barX}" y="${p.barY}" width="${barWidth}" height="${p.barH}" rx="4" ry="4" fill="url(#${gradId})" stroke="${barColor}" stroke-width="1.2"/>`;

        if (showLabels) {
            const barValY = Math.max(paddingTop + 14, p.barY - 6);
            svg += `<text x="${p.cx}" y="${barValY}" fill="${barColor}" font-size="${fontSize}px" font-weight="${fontWeight}" text-anchor="middle">${p.reworkRate.toFixed(2)}%</text>`;
        }
    });

    // 4. Render Accumulated (Cumulative) Rework Rate Area & Line
    if (points.length > 1) {
        const accumAreaD = points.map((p, i) => i === 0 ? `M ${p.cx} ${p.cyAccum}` : `L ${p.cx} ${p.cyAccum}`).join(" ") +
                           ` L ${points[points.length - 1].cx} ${height - paddingBottom} L ${points[0].cx} ${height - paddingBottom} Z`;
        svg += `<path d="${accumAreaD}" fill="url(#accumReworkAreaGrad)"/>`;

        const accumPathD = points.map((p, i) => i === 0 ? `M ${p.cx} ${p.cyAccum}` : `L ${p.cx} ${p.cyAccum}`).join(" ");
        svg += `<path d="${accumPathD}" stroke="#2563eb" stroke-width="3.5" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`;
    }

    // 5. Nodes on Accumulated Line
    points.forEach(p => {
        if (p.accumRate > 2.0) {
            svg += `<circle cx="${p.cx}" cy="${p.cyAccum}" r="12" fill="rgba(239, 68, 68, 0.25)" class="halo-pulse"/>`;
        }
        svg += `<circle cx="${p.cx}" cy="${p.cyAccum}" r="5.5" fill="#2563eb" stroke="#ffffff" stroke-width="2.5" style="cursor: pointer;"/>`;

        if (showLabels && pointsCount <= 8) {
            const isAbove = p.cyAccum < p.barY - 14;
            const accLabelY = isAbove ? p.cyAccum - 8 : p.cyAccum + 16;
            svg += `<text x="${p.cx}" y="${accLabelY}" fill="#2563eb" font-size="9.5px" font-weight="800" text-anchor="middle">Acc: ${p.accumRate.toFixed(2)}%</text>`;
        }
    });

    // 6. Invisible Interactive Hover Slices for rich tooltips
    points.forEach((p, idx) => {
        const sliceWidth = pointsCount > 1 ? (chartWidth / pointsCount) : chartWidth;
        const sliceX = p.cx - sliceWidth / 2;
        const jsonStr = JSON.stringify({
            desc: p.desc,
            discipline: p.discipline,
            subDiscipline: p.subDiscipline,
            date: p.date,
            quarter: p.quarter,
            qty: p.qty,
            unit: p.unit,
            reworkCost: p.reworkCost,
            approvedCost: p.approvedCost,
            reworkRate: p.reworkRate,
            accumRate: p.accumRate
        }).replace(/"/g, '&quot;');

        svg += `<rect x="${sliceX}" y="${paddingTop}" width="${sliceWidth}" height="${chartHeight}" fill="transparent" style="cursor: pointer;" onmouseenter="showKpi2Tooltip(event, ${jsonStr})" onmousemove="moveKpi2Tooltip(event)" onmouseleave="hideKpi2Tooltip()"/>`;
    });

    // 7. X-Axis Month & Date / Item Labels with configurable angle & distance
    const xLabelY = height - paddingBottom + extraXOffset;
    points.forEach(p => {
        let monthName = p.quarter || "Q";
        let dayStr = "";
        if (p.date) {
            const d = new Date(p.date);
            const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            if (!isNaN(d.getTime())) {
                monthName = months[d.getMonth()];
                dayStr = `${d.getDate() < 10 ? '0' + d.getDate() : d.getDate()}`;
            }
        }

        if (dateAngle === "vertical") {
            svg += `<text x="${p.cx}" y="${xLabelY}" transform="rotate(-90 ${p.cx} ${xLabelY})" class="svg-axis-label" text-anchor="end" font-weight="${fontWeight}"><tspan fill="#38bdf8" font-weight="900">${monthName}</tspan> ${p.date || `Item #${p.idx}`}</text>`;
        } else if (dateAngle === "slanted") {
            svg += `<text x="${p.cx}" y="${xLabelY}" transform="rotate(-45 ${p.cx} ${xLabelY})" class="svg-axis-label" text-anchor="end" font-weight="${fontWeight}"><tspan fill="#38bdf8" font-weight="900">${monthName}</tspan> ${dayStr ? `${dayStr} (${p.quarter || ''})` : (p.date || '')}</text>`;
        } else {
            svg += `<text x="${p.cx}" y="${xLabelY}" class="svg-axis-label" text-anchor="middle" font-weight="${fontWeight}">
                <tspan x="${p.cx}" dy="0" fill="#38bdf8" font-weight="900">${monthName}</tspan>
                <tspan x="${p.cx}" dy="13" font-size="9.5px" fill="var(--text-muted)">${p.date ? p.date.slice(5) : `Item #${p.idx}`}</tspan>
            </text>`;
        }
    });

    svg += `</svg>`;
    box.innerHTML = svg;
}

// ==========================================================================
// 📊 KPI 3: DUAL-AXIS COMBO CHART (BAR + TREND LINE) & INTERACTIVE ENGINE
// ==========================================================================

function showKpi3Tooltip(evt, data, customTooltipId) {
    const tooltip = resolveTooltipElement(customTooltipId, evt, "kpi3ChartTooltip");
    if (!tooltip || !data) return;

    const isBreached = data.density > 2.0;
    const statusColor = isBreached ? "#ef4444" : "#10b981";
    const statusText = isBreached ? "🔴 Exceeds 2.0 per 100m² Limit" : "🟢 Within 2.0 per 100m² Benchmark";

    tooltip.innerHTML = `
        <div class="chart-tooltip-header">📅 ${data.date} (${data.loc || 'Inspection Zone'})</div>
        <div class="chart-tooltip-row"><span>Discipline / Trade:</span> <strong>${data.discipline || 'All Trades'}</strong></div>
        <div class="chart-tooltip-row"><span>Total Inspected Area:</span> <strong>${data.inspectedArea.toLocaleString()} m²</strong></div>
        <div class="chart-tooltip-row"><span>Defects Identified:</span> <strong>${data.defects} snags</strong></div>
        <div class="chart-tooltip-row"><span>Defect Density:</span> <strong style="color:${statusColor}; font-size: 13px;">${data.density.toFixed(2)} per 100 m²</strong></div>
        <div class="chart-tooltip-status" style="color: ${statusColor};">${statusText}</div>
    `;
    tooltip.style.display = "block";
    tooltip.style.opacity = "1";
    positionChartTooltip(evt, tooltip);
}
if (typeof window !== "undefined") window.showKpi3Tooltip = showKpi3Tooltip;

function moveKpi3Tooltip(evt, customTooltipId) {
    positionChartTooltip(evt, resolveTooltipElement(customTooltipId, evt, "kpi3ChartTooltip"));
}
if (typeof window !== "undefined") window.moveKpi3Tooltip = moveKpi3Tooltip;

function hideKpi3Tooltip(customTooltipId) {
    hideChartTooltip(customTooltipId || "kpi3ChartTooltip");
}
if (typeof window !== "undefined") window.hideKpi3Tooltip = hideKpi3Tooltip;

function renderKPI3ComboChart(box, logs, isCompiledMode, card, targetProjects, timeRange) {
    if (!box) return;

    const parsedLogs = (logs || []).map((l, idx) => {
        const inspectedArea = parseFloat(l.totalInspectedArea) || parseFloat(l.totalArea) || 1000;
        const defects = parseFloat(l.defectCount) !== undefined && !isNaN(parseFloat(l.defectCount)) ? parseFloat(l.defectCount) : (parseFloat(l.defects) || 1);
        const defectArea = parseFloat(l.area) || 0;
        const density = inspectedArea > 0 ? parseFloat(((defects / (inspectedArea / 100))).toFixed(2)) : 0;
        const rawDate = l.date || `P${idx + 1}`;
        const date = formatChartXAxisDate(rawDate);
        const loc = l.loc || l.location || 'Site Grid';
        const discipline = l.discipline || 'General';
        const isBreached = density > 2.0;

        return {
            raw: l,
            idx,
            date,
            loc,
            discipline,
            inspectedArea,
            defects,
            defectArea,
            density,
            isBreached
        };
    });

    parsedLogs.sort((a, b) => new Date(a.raw.date || "2026-01-01") - new Date(b.raw.date || "2026-01-01"));

    // Aggregate summary statistics
    const totalInspectedArea = parsedLogs.reduce((s, d) => s + d.inspectedArea, 0);
    const totalDefects = parsedLogs.reduce((s, d) => s + d.defects, 0);
    const avgDensity = totalInspectedArea > 0 ? parseFloat(((totalDefects / (totalInspectedArea / 100))).toFixed(2)) : 0;
    const isOverallBreached = avgDensity > 2.0;
    let maxDensityPt = { date: "None", density: 0, defects: 0, area: 0 };
    parsedLogs.forEach(p => {
        if (p.density > maxDensityPt.density) {
            maxDensityPt = { date: p.date, loc: p.loc, density: p.density, defects: p.defects, area: p.inspectedArea };
        }
    });

    // Render Summary Metric Scorecards
    let metricsContainer = null;
    if (isCompiledMode) {
        metricsContainer = (card && typeof card.querySelector === "function") ? card.querySelector(".kpi2-metrics-grid") : null;
        if (!metricsContainer && card && typeof card.appendChild === "function") {
            metricsContainer = document.createElement("div");
            metricsContainer.className = "kpi2-metrics-grid";
            card.appendChild(metricsContainer);
        }
    } else {
        metricsContainer = document.getElementById("kpi3SummaryMetrics");
    }

    if (metricsContainer) {
        metricsContainer.innerHTML = `
            <div class="kpi2-metric-card">
                <span class="kpi2-metric-label">📐 Gross Inspected Area</span>
                <span class="kpi2-metric-val">${totalInspectedArea.toLocaleString()} m²</span>
                <span class="kpi2-metric-sub">Total Evaluated Surface Area</span>
            </div>
            <div class="kpi2-metric-card">
                <span class="kpi2-metric-label">⚠️ Total Defects Logged</span>
                <span class="kpi2-metric-val" style="color: #60a5fa;">${totalDefects.toLocaleString()} Snags</span>
                <span class="kpi2-metric-sub">Across ${parsedLogs.length} Inspection Batches</span>
            </div>
            <div class="kpi2-metric-card">
                <span class="kpi2-metric-label">📊 Average Defect Density</span>
                <span class="kpi2-metric-val" style="color: ${isOverallBreached ? '#ef4444' : '#10b981'};">${avgDensity.toFixed(2)} / 100m²</span>
                <span class="kpi2-metric-sub">${!isOverallBreached ? `${(2.0 - avgDensity).toFixed(2)} Margin Under Cap` : `+${(avgDensity - 2.0).toFixed(2)} Over Target Limit`}</span>
            </div>
            <div class="kpi2-metric-card">
                <span class="kpi2-metric-label">🛡️ Overall Quality Status</span>
                <span class="kpi2-metric-val">
                    ${!isOverallBreached 
                        ? '<span class="status-badge badge-green" style="font-size:12px;">ON TRACK (≤ 2.0)</span>' 
                        : '<span class="status-badge badge-red" style="font-size:12px;">THRESHOLD BREACHED (> 2.0)</span>'}
                </span>
                <span class="kpi2-metric-sub">${maxDensityPt.density > 0 ? `Peak: ${maxDensityPt.density.toFixed(2)}/100m² (${maxDensityPt.date})` : 'All Batches Compliant'}</span>
            </div>
        `;
    }

    if (parsedLogs.length === 0) {
        box.innerHTML = `
            <div style="padding: 60px 20px; text-align: center; color: var(--text-secondary); font-size: 13px;">
                ℹ️ No defect inspection logs recorded matching the active filters.
            </div>
        `;
        return;
    }

    // Graph formatting options
    const opts = getGraphDisplaySettings("kpi3", isCompiledMode);

    const showLabels = opts.labelPos !== "hide" && opts.showLabels !== "false";
    const labelPos = opts.labelPos || "above";
    const fontSize = parseInt(opts.fontSize) || 11;
    const fontWeight = opts.fontWeight || "700";
    const dateAngle = opts.dateAngle || "horizontal";
    const yLeftOffset = parseInt(opts.yLeftOffset) || 18;
    const yRightOffset = parseInt(opts.yRightOffset) || 18;
    const extraXOffset = parseInt(opts.xAxisOffset) || 25;

    const width = box.clientWidth || 800;
    const isExpanded = (box.classList && typeof box.classList.contains === "function") ? box.classList.contains("expanded-graph") : false;
    const defaultHeight = isExpanded ? 560 : (isCompiledMode ? 560 : 380);
    const height = box.clientHeight && box.clientHeight > 100 ? box.clientHeight : defaultHeight;

    const paddingTop = isCompiledMode ? 35 : 45;
    const paddingLeft = Math.max(90, 60 + yLeftOffset);
    const paddingRight = Math.max(75, 45 + yRightOffset);

    let paddingBottom = 45;
    if (dateAngle === "vertical") {
        paddingBottom = Math.max(75, 45 + extraXOffset + 25);
    } else if (dateAngle === "slanted") {
        paddingBottom = Math.max(65, 35 + extraXOffset + 20);
    } else {
        paddingBottom = Math.max(45, 20 + extraXOffset + 15);
    }

    const chartHeight = height - paddingTop - paddingBottom;
    const chartWidth = width - paddingLeft - paddingRight;

    // Left Y-Axis Scale: Total Inspected Area (m²) with tight dynamic headroom
    const maxAreaVal = Math.max(...parsedLogs.map(d => d.inspectedArea), 100);
    const maxLeftY = Math.ceil((maxAreaVal * 1.06) / 50) * 50;

    // Right Y-Axis Scale: Defect Density per 100 m²
    const maxDensityVal = Math.max(...parsedLogs.map(d => d.density), 2.0);
    const maxRightY = Math.max(2.05, Math.ceil((maxDensityVal * 1.06) * 10) / 10);

    const pointsCount = parsedLogs.length;
    const xStep = chartWidth / Math.max(1, pointsCount - 1);
    const barWidth = Math.min(50, Math.max(18, (chartWidth / Math.max(pointsCount, 1)) * 0.45));

    const points = parsedLogs.map((d, idx) => {
        const cx = pointsCount === 1 ? paddingLeft + chartWidth / 2 : paddingLeft + idx * xStep;
        const barHeight = Math.max(4, (d.inspectedArea / maxLeftY) * chartHeight);
        const barY = height - paddingBottom - barHeight;
        const lineY = height - paddingBottom - (d.density / maxRightY) * chartHeight;

        return { ...d, cx, barHeight, barY, lineY };
    });

    const tooltipTarget = isCompiledMode ? "repChartTooltip" : "kpi3ChartTooltip";

    let svg = `<svg width="100%" height="100%" viewBox="0 0 ${width} ${height}">`;

    svg += `
        <defs>
            <linearGradient id="barAreaGradient_kpi3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.80"/>
                <stop offset="100%" stop-color="#2563eb" stop-opacity="0.30"/>
            </linearGradient>
        </defs>
    `;

    // Horizontal Grid Lines & Left/Right Y-Axis Labels
    const leftDivisions = 4;
    for (let i = 0; i <= leftDivisions; i++) {
        const gridY = paddingTop + i * (chartHeight / leftDivisions);
        const leftVal = Math.round(maxLeftY - i * (maxLeftY / leftDivisions));
        const rightVal = (maxRightY - i * (maxRightY / leftDivisions)).toFixed(1);

        svg += `<line x1="${paddingLeft}" y1="${gridY}" x2="${width - paddingRight}" y2="${gridY}" class="svg-grid-line"/>`;
        svg += `<text x="${paddingLeft - yLeftOffset}" y="${gridY + 4}" class="svg-axis-label" text-anchor="end" style="font-size: 11px; font-weight: 600;">${leftVal.toLocaleString()} m²</text>`;
        svg += `<text x="${width - paddingRight + yRightOffset}" y="${gridY + 4}" class="svg-axis-label" text-anchor="start" style="font-size: 11px; font-weight: 700; fill: #10b981;">${rightVal}</text>`;
    }

    // Vertical Dashed Lines Indicating Month Transitions
    svg += generateMonthDividerLinesSVG(points, paddingTop, chartHeight);

    // Left Y-Axis Title (Inspected Area)
    const leftTitleX = -(paddingTop + chartHeight / 2);
    const leftTitleY = Math.max(14, paddingLeft - yLeftOffset - 28);
    svg += `<text transform="rotate(-90)" x="${leftTitleX}" y="${leftTitleY}" class="svg-axis-label" style="font-weight:700; font-size:11px; fill:#3b82f6;" text-anchor="middle">Total Inspected Area (m²)</text>`;

    // Right Y-Axis Title (Defect Density per 100 m²)
    const rightTitleX = paddingTop + chartHeight / 2;
    const rightTitleY = -(width - (paddingRight - yRightOffset) + 16);
    svg += `<text transform="rotate(90)" x="${rightTitleX}" y="${rightTitleY}" class="svg-axis-label" style="font-weight:700; font-size:11px; fill:#10b981;" text-anchor="middle">Defect Density (per 100 m²)</text>`;

    // Target Benchmark Reference Line at 2.0 (Right Y-Axis)
    const targetThresholdDensity = 2.0;
    const targetY = height - paddingBottom - (targetThresholdDensity / maxRightY) * chartHeight;
    svg += `
        <line x1="${paddingLeft}" y1="${targetY}" x2="${width - paddingRight}" y2="${targetY}" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="6,4" />
        <rect x="${width - paddingRight - 175}" y="${targetY - 20}" width="175" height="18" rx="4" fill="rgba(239, 68, 68, 0.22)" stroke="#ef4444" stroke-width="1"/>
        <text x="${width - paddingRight - 87}" y="${targetY - 7}" fill="#ef4444" font-size="10px" font-weight="800" text-anchor="middle">TARGET THRESHOLD (2.0 / 100m²)</text>
    `;

    // 1. Render Bar Columns for Total Inspected Area
    points.forEach(p => {
        const barX = p.cx - barWidth / 2;
        svg += `<rect x="${barX}" y="${p.barY}" width="${barWidth}" height="${p.barHeight}" rx="4" fill="url(#barAreaGradient_kpi3)" stroke="#3b82f6" stroke-width="1"/>`;
        if (showLabels && (opts.showLabels === "all" || pointsCount <= 14)) {
            let barLabelY = p.barY - 6;
            let barLabelFill = "var(--text-secondary)";
            if (labelPos === "high") {
                barLabelY = p.barY - 16;
            } else if (labelPos === "extra_high") {
                barLabelY = p.barY - 26;
            } else if (labelPos === "inside") {
                barLabelY = p.barY + Math.min(14, p.barHeight / 2);
                barLabelFill = "#ffffff";
            } else if (labelPos === "below") {
                barLabelY = height - paddingBottom + 14;
            }
            svg += `<text x="${p.cx}" y="${barLabelY}" fill="${barLabelFill}" text-anchor="middle" font-size="10px" font-weight="600">${p.inspectedArea}m²</text>`;
        }
    });

    // 2. Render Secondary Defect Density Trend Line
    if (points.length > 1) {
        const pathD = points.map((p, i) => i === 0 ? `M ${p.cx} ${p.lineY}` : `L ${p.cx} ${p.lineY}`).join(" ");
        svg += `<path d="${pathD}" stroke="#10b981" stroke-width="3.5" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`;
    }

    // 3. Render Defect Density Nodes, Halos, and Value Labels
    points.forEach(p => {
        let labelY = p.lineY - 12;
        let labelX = p.cx;
        let textAnchor = "middle";

        if (labelPos === "high") {
            labelY = p.lineY - 22;
        } else if (labelPos === "extra_high") {
            labelY = p.lineY - 32;
        } else if (labelPos === "above") {
            labelY = p.lineY - 12;
        } else if (labelPos === "below") {
            labelY = p.lineY + 18;
        } else if (labelPos === "inline") {
            labelY = p.lineY + 4;
            labelX = p.cx + 10;
            textAnchor = "start";
        }
        labelY = Math.max(18, labelY);

        if (p.isBreached) {
            svg += `<circle cx="${p.cx}" cy="${p.lineY}" r="11" fill="rgba(239, 68, 68, 0.25)" stroke="#ef4444" stroke-width="1.5"/>`;
            svg += `<circle cx="${p.cx}" cy="${p.lineY}" r="6.5" fill="#ef4444" stroke="#ffffff" stroke-width="2.5" style="cursor: pointer;"/>`;
            if (showLabels) {
                svg += `<text x="${labelX}" y="${labelY}" fill="#ef4444" text-anchor="${textAnchor}" font-size="${fontSize}px" font-weight="${fontWeight}">${p.density.toFixed(2)}</text>`;
            }
        } else {
            svg += `<circle cx="${p.cx}" cy="${p.lineY}" r="6" fill="#10b981" stroke="#ffffff" stroke-width="2" style="cursor: pointer;"/>`;
            if (showLabels) {
                svg += `<text x="${labelX}" y="${labelY}" fill="#10b981" text-anchor="${textAnchor}" font-size="${fontSize}px" font-weight="${fontWeight}">${p.density.toFixed(2)}</text>`;
            }
        }
    });

    // 4. Interactive Hover Slices for tooltips
    points.forEach(p => {
        const sliceWidth = pointsCount > 1 ? xStep : chartWidth;
        const sliceX = pointsCount > 1 ? p.cx - xStep / 2 : paddingLeft;
        const jsonStr = JSON.stringify({
            date: p.date,
            loc: p.loc,
            discipline: p.discipline,
            inspectedArea: p.inspectedArea,
            defects: p.defects,
            defectArea: p.defectArea,
            density: p.density
        }).replace(/"/g, '&quot;');

        svg += `<rect x="${sliceX}" y="${paddingTop}" width="${sliceWidth}" height="${chartHeight}" fill="transparent" style="cursor: pointer;" onmouseenter="showKpi3Tooltip(event, ${jsonStr}, '${tooltipTarget}')" onmousemove="moveKpi3Tooltip(event, '${tooltipTarget}')" onmouseleave="hideKpi3Tooltip('${tooltipTarget}')"/>`;
    });

    // 5. X-Axis Date / Location Labels with configurable angle & distance
    const isDense = pointsCount >= 6 || xStep < 85;
    const useVertical = dateAngle === "vertical" || (dateAngle === "auto" && isDense);
    const useSlanted = dateAngle === "slanted";
    const xLabelY = height - paddingBottom + extraXOffset;

    points.forEach(p => {
        if (useVertical) {
            svg += `<text x="${p.cx}" y="${xLabelY}" transform="rotate(-90 ${p.cx} ${xLabelY})" class="svg-axis-label" text-anchor="end" font-weight="${fontWeight}" style="font-size: 11px;">${p.date}</text>`;
        } else if (useSlanted) {
            svg += `<text x="${p.cx}" y="${xLabelY}" transform="rotate(-45 ${p.cx} ${xLabelY})" class="svg-axis-label" text-anchor="end" font-weight="${fontWeight}" style="font-size: 11px;">${p.date}</text>`;
        } else {
            svg += `<text x="${p.cx}" y="${xLabelY}" class="svg-axis-label" text-anchor="middle" font-weight="${fontWeight}" style="font-size: 11px;">${p.date}</text>`;
        }
    });

    svg += `</svg>`;
    box.innerHTML = svg;
}

function renderKPI3LineGraph() {
    const box = document.getElementById("kpi3LineChartBox");
    if (!box) return;

    let logs = getFilteredKPILogs("kpi3");
    renderKPI3ComboChart(box, logs, false, null);
}

function renderKPI4LineGraph() {
    const box = document.getElementById("kpi4LineChartBox");
    if (!box) return;

    let logs = getFilteredKPILogs("kpi4");
    logs.sort((a, b) => new Date(a.dateIssued || "2026-01-01") - new Date(b.dateIssued || "2026-01-01"));

    renderGenericLineChart(box, logs, item => ({
        date: item.dateIssued || "2026-01-01",
        valReq: parseFloat(item.duration) || 0,
        valAct: null,
        benchVal: 7
    }), "NCR Duration (Days)", null, null, "kpi4");
}

function switchKPI5GraphViewMode(mode) {
    if (!appState.graphSettings) appState.graphSettings = {};
    if (!appState.graphSettings.kpi5) appState.graphSettings.kpi5 = {};
    appState.graphSettings.kpi5.viewMode = mode;
    saveAppState();
    
    // Update button states
    const btnBurn = document.getElementById("kpi5BtnBurndown");
    const btnDisc = document.getElementById("kpi5BtnDiscipline");
    const btnSched = document.getElementById("kpi5BtnTargetSchedule");
    if (btnBurn) btnBurn.classList.toggle("active", mode === "burndown");
    if (btnDisc) btnDisc.classList.toggle("active", mode === "discipline");
    if (btnSched) btnSched.classList.toggle("active", mode === "targetSchedule");

    const sel = document.getElementById("kpi5ViewModeSelect");
    if (sel) sel.value = mode;

    renderKPI5LineGraph();
}

function switchPortfolioKPI5GraphViewMode(mode) {
    if (!appState.graphSettings) appState.graphSettings = {};
    if (!appState.graphSettings.portfolioKpi5) appState.graphSettings.portfolioKpi5 = {};
    appState.graphSettings.portfolioKpi5.viewMode = mode;
    saveAppState();
    
    // Update button states
    const btnBurn = document.getElementById("portfolioKpi5BtnBurndown");
    const btnDisc = document.getElementById("portfolioKpi5BtnDiscipline");
    const btnSched = document.getElementById("portfolioKpi5BtnTargetSchedule");
    if (btnBurn) btnBurn.classList.toggle("active", mode === "burndown");
    if (btnDisc) btnDisc.classList.toggle("active", mode === "discipline");
    if (btnSched) btnSched.classList.toggle("active", mode === "targetSchedule");

    const sel = document.getElementById("portfolioKpi5ViewModeSelect");
    if (sel) sel.value = mode;

    renderPortfolioKPI5Graph();
}

function updateKPI5LegendUI(mode, legendElId = "kpi5ChartLegend") {
    const legendEl = document.getElementById(legendElId);
    if (!legendEl) return;
    if (mode === "discipline") {
        legendEl.innerHTML = `
            <span class="legend-item"><span class="legend-dot" style="background:#10b981;"></span> 🟢 Closed / Signed-off</span>
            <span class="legend-item"><span class="legend-dot" style="background:#3b82f6;"></span> 🔵 In Progress</span>
            <span class="legend-item"><span class="legend-dot" style="background:#ef4444;"></span> 🔴 Open / Pending</span>
        `;
    } else if (mode === "targetSchedule") {
        legendEl.innerHTML = `
            <span class="legend-item"><span class="legend-dot" style="background:#10b981; border-radius: 2px; width: 12px; height: 10px;"></span> 🟢 Cleared On-Time [Bar]</span>
            <span class="legend-item"><span class="legend-dot" style="background:#f59e0b; border-radius: 2px; width: 12px; height: 10px;"></span> 🟡 In-Progress Pending [Bar]</span>
            <span class="legend-item"><span class="legend-dot" style="background:#ef4444; border-radius: 2px; width: 12px; height: 10px;"></span> 🔴 Overdue / Delayed [Bar]</span>
            <span class="legend-item"><span class="legend-dot" style="background:#10b981; width: 14px; height: 3px; border-radius: 0; border-top: 2px dashed #10b981;"></span> 🟢 Planned Target S-Curve [Line %]</span>
            <span class="legend-item"><span class="legend-dot" style="background:#2563eb; width: 10px; height: 10px; border-radius: 50%;"></span> 🔵 Actual Clearance S-Curve [Line %]</span>
            <span class="legend-item"><span class="legend-dot" style="background:#ef4444; width: 14px; height: 3px; border-radius: 0;"></span> 🎯 100% Target Limit</span>
            <span class="legend-item" style="color: #38bdf8; font-weight: 600; font-size: 10.5px;">💡 Drag any % label to reposition with arrow (Double-click to reset)</span>
        `;
    } else {
        legendEl.innerHTML = `
            <span class="legend-item"><span class="legend-dot" style="background:#3b82f6; border-radius: 50%; width: 10px; height: 10px; display: inline-block;"></span> Actual Punch Items Issued (Date Issued)</span>
            <span class="legend-item"><span class="legend-dot" style="background:#10b981; border-radius: 50%; width: 10px; height: 10px; display: inline-block;"></span> Target Planned Clearance (Target Dates)</span>
            <span class="legend-item"><span class="legend-dot" style="background:#f59e0b; border-radius: 50%; width: 10px; height: 10px; display: inline-block;"></span> Actual Open Minor Snags</span>
            <span class="legend-item"><span class="legend-dot" style="background:#ef4444; border-radius: 50%; width: 10px; height: 10px; display: inline-block;"></span> Open Critical Snags (Blocks Turnover)</span>
        `;
    }
}

function renderKPI5LineGraph() {
    const box = document.getElementById("kpi5LineChartBox");
    if (!box) return;

    const selectEl = document.getElementById("kpi5ViewModeSelect");
    const mode = (appState.graphSettings?.kpi5?.viewMode) || (selectEl ? selectEl.value : "burndown");
    if (selectEl) selectEl.value = mode;

    // Sync button classes
    const btnBurn = document.getElementById("kpi5BtnBurndown");
    const btnDisc = document.getElementById("kpi5BtnDiscipline");
    const btnSched = document.getElementById("kpi5BtnTargetSchedule");
    if (btnBurn) btnBurn.classList.toggle("active", mode === "burndown");
    if (btnDisc) btnDisc.classList.toggle("active", mode === "discipline");
    if (btnSched) btnSched.classList.toggle("active", mode === "targetSchedule");

    updateKPI5LegendUI(mode, "kpi5ChartLegend");

    let logs = getFilteredKPILogs("kpi5");

    if (mode === "discipline") {
        renderKPI5StackedBarChart(box, logs);
    } else if (mode === "targetSchedule") {
        renderKPI5TargetScheduleChart(box, logs);
    } else {
        renderKPI5BurnDownChart(box, logs);
    }
}

function renderKPI5BurnDownChart(box, logs) {
    if (!box) return;
    if (logs.length === 0) {
        box.innerHTML = `<div style="text-align:center; padding-top:100px; color:var(--text-muted);">No log data matches the selected Quarter / Discipline / Sub-Discipline / Description filters.</div>`;
        return;
    }

    const isCompiler = (box.closest && box.closest('#tab-executive')) || (box.classList && box.classList.contains('compiler-chart-svg-box'));
    const opts = getGraphDisplaySettings("kpi5", isCompiler);

    const showLabels = opts.labelPos !== "hide" && opts.showLabels !== "false";
    const labelPos = opts.labelPos || "above";
    const posIssued = opts.posIssued || "high";
    const posTarget = opts.posTarget || "below";
    const posMinor = opts.posMinor || "above";
    const posCrit = opts.posCrit || "extra_high";
    const fontSize = parseInt(opts.fontSize) || 11;
    const fontWeight = opts.fontWeight || "700";
    const dateAngle = opts.dateAngle || "auto";
    const yLeftOffset = parseInt(opts.yLeftOffset) || 18;
    const extraXOffset = parseInt(opts.xAxisOffset) || 25;

    const calcLabelPos = (x, y, posSetting, defaultAnchor = "middle") => {
        if (!showLabels || posSetting === "hide") return null;
        let labelX = x;
        let labelY = y - 10;
        let anchor = defaultAnchor;
        if (posSetting === "high") {
            labelY = y - 20;
        } else if (posSetting === "extra_high") {
            labelY = y - 30;
        } else if (posSetting === "below") {
            labelY = y + 18;
        } else if (posSetting === "left") {
            labelX = x - 12;
            labelY = y + 4;
            anchor = "end";
        } else if (posSetting === "right") {
            labelX = x + 12;
            labelY = y + 4;
            anchor = "start";
        } else {
            // "above" (standard -10px)
            labelY = y - 10;
        }
        labelY = Math.max(14, labelY);
        return { x: labelX, y: labelY, anchor };
    };

    // 1. Collect timeline dates purely from the punch list table records
    const dateSet = new Set();
    logs.forEach(l => {
        if (l.dateLogged) dateSet.add(l.dateLogged);
        if (l.targetDate) dateSet.add(l.targetDate);
        if (l.actualDateRectified) dateSet.add(l.actualDateRectified);
    });

    let timelineDates = Array.from(dateSet).filter(Boolean).sort((a, b) => new Date(a) - new Date(b));
    if (timelineDates.length === 0) {
        timelineDates = ["2026-10-01", "2026-11-15", "2026-12-01"];
    }

    const totalInitial = logs.length;

    const dataPoints = timelineDates.map((dStr) => {
        const curMs = new Date(dStr).getTime();

        // 1. Items issued specifically ON this milestone date (discrete, non-cumulative)
        const itemsIssuedOnDate = logs.filter(l => l.dateLogged === dStr || (!l.dateLogged && dStr === timelineDates[0]));
        const issuedCount = itemsIssuedOnDate.length;

        // Cumulative items logged on or before this date (for clearance and open calculations)
        const loggedItems = logs.filter(l => !l.dateLogged || new Date(l.dateLogged).getTime() <= curMs);
        const loggedCount = loggedItems.length;

        // Target Planned Clearance: items whose scheduled target clearance date is still in the future
        const targetRemaining = loggedItems.filter(l => {
            if (!l.targetDate) return false;
            return new Date(l.targetDate).getTime() > curMs;
        }).length;

        // Actual Open Snags: items that have not yet been rectified on or before this date
        let openCrit = 0;
        let openMinor = 0;
        let rectifiedCount = 0;
        let overdueCount = 0;

        loggedItems.forEach(l => {
            const isRectified = (l.actualDateRectified && new Date(l.actualDateRectified).getTime() <= curMs) ||
                (!l.actualDateRectified && (l.status === "Signed-off" || l.status === "Closed" || l.status === "Rectified"));

            if (isRectified) {
                rectifiedCount++;
            } else {
                if (l.cat === "Critical") openCrit++;
                else openMinor++;

                if (l.targetDate && new Date(l.targetDate).getTime() < curMs) {
                    overdueCount++;
                }
            }
        });

        const totalOpen = openCrit + openMinor;

        return {
            date: formatChartXAxisDate(dStr),
            rawDate: dStr,
            issuedCount: issuedCount,
            critCount: openCrit,
            minorCount: openMinor,
            totalOpen: totalOpen,
            targetRemaining: targetRemaining,
            baseline: targetRemaining,
            loggedCount: loggedCount,
            rectifiedCount: rectifiedCount,
            overdueCount: overdueCount
        };
    });

    const maxVal = Math.max(1, ...dataPoints.map(p => Math.max(p.critCount, p.minorCount, p.totalOpen, p.targetRemaining, p.issuedCount)));
    const yMax = Math.max(1, Math.ceil(maxVal * 1.08));

    const width = box.clientWidth || 800;
    const isExpanded = box.classList && typeof box.classList.contains === "function" && box.classList.contains("expanded-graph");
    const defaultHeight = isExpanded ? 560 : (isCompiler ? 560 : 440);
    const height = box.clientHeight && box.clientHeight > 100 ? box.clientHeight : defaultHeight;

    let paddingBottom = 45;
    if (dateAngle === "vertical") {
        paddingBottom = Math.max(75, 45 + extraXOffset + 25);
    } else if (dateAngle === "slanted") {
        paddingBottom = Math.max(65, 35 + extraXOffset + 20);
    } else {
        paddingBottom = Math.max(45, 20 + extraXOffset + 15);
    }

    const padding = { top: isCompiler ? 40 : 50, right: 45, bottom: paddingBottom, left: Math.max(75, 45 + yLeftOffset) };

    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const numPoints = dataPoints.length;
    const getX = (idx) => padding.left + (idx / (numPoints - 1 || 1)) * chartW;
    const getY = (val) => padding.top + chartH - (val / yMax) * chartH;

    let svg = `<svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" style="overflow:visible;" xmlns="http://www.w3.org/2000/svg">`;

    // Background Grid lines & Y-Axis Ticks
    const numTicks = Math.min(yMax, 5);
    for (let i = 0; i <= numTicks; i++) {
        const tickVal = Math.round((yMax / numTicks) * i);
        const yPos = padding.top + chartH - (i / numTicks) * chartH;
        svg += `<line x1="${padding.left}" y1="${yPos}" x2="${width - padding.right}" y2="${yPos}" stroke="var(--border-color, rgba(255,255,255,0.1))" stroke-dasharray="3,3"/>`;
        svg += `<text x="${padding.left - yLeftOffset}" y="${yPos + 4}" fill="var(--text-secondary, #94a3b8)" font-size="11" font-weight="600" text-anchor="end">${tickVal}</text>`;
    }

    // Vertical Dashed Lines Indicating Month Transitions
    const kpi5MonthPoints = dataPoints.map((d, idx) => ({ cx: getX(idx), date: d.rawDate }));
    svg += generateMonthDividerLinesSVG(kpi5MonthPoints, padding.top, chartH);

    // Y-Axis Label
    const leftTitlePos = Math.max(14, padding.left - yLeftOffset - 26);
    svg += `<text x="${leftTitlePos}" y="${padding.top + chartH / 2}" fill="var(--text-secondary, #94a3b8)" font-size="11" font-weight="700" text-anchor="middle" transform="rotate(-90 ${leftTitlePos} ${padding.top + chartH / 2})">Punch List Item Count</text>`;

    // 1. Actual Punch List Items Issued on Date Line (Solid Blue)
    let issuedPath = "";
    dataPoints.forEach((p, idx) => {
        const x = getX(idx);
        const y = getY(p.issuedCount);
        issuedPath += (idx === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
    });
    svg += `<path d="${issuedPath}" fill="none" stroke="#3b82f6" stroke-width="3" opacity="0.95"/>`;

    // 2. Target Planned Clearance Line (Dashed Green)
    let baselinePath = "";
    dataPoints.forEach((p, idx) => {
        const x = getX(idx);
        const y = getY(p.targetRemaining);
        baselinePath += (idx === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
    });
    svg += `<path d="${baselinePath}" fill="none" stroke="#10b981" stroke-width="2.5" stroke-dasharray="6,4" opacity="0.95"/>`;

    // 3. Minor Punch Items Line (Amber/Yellow)
    let minorPath = "";
    dataPoints.forEach((p, idx) => {
        const x = getX(idx);
        const y = getY(p.minorCount);
        minorPath += (idx === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
    });
    svg += `<path d="${minorPath}" fill="none" stroke="#f59e0b" stroke-width="3"/>`;

    // 4. Critical Punch Items Line (Red)
    let critPath = "";
    dataPoints.forEach((p, idx) => {
        const x = getX(idx);
        const y = getY(p.critCount);
        critPath += (idx === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
    });
    svg += `<path d="${critPath}" fill="none" stroke="#ef4444" stroke-width="3"/>`;

    // 1. Items Issued Dots & Labels (Blue)
    dataPoints.forEach((p, idx) => {
        const x = getX(idx);
        const y = getY(p.issuedCount);
        svg += `<circle cx="${x}" cy="${y}" r="5" fill="#3b82f6" stroke="#ffffff" stroke-width="1.5"/>`;
        if (p.issuedCount > 0) {
            const pos = calcLabelPos(x, y, posIssued);
            if (pos) {
                svg += `<text x="${pos.x}" y="${pos.y}" fill="#3b82f6" font-size="${fontSize}" font-weight="${fontWeight}" text-anchor="${pos.anchor}">${p.issuedCount}</text>`;
            }
        }
    });

    // 2. Baseline Nodes & Labels (Green)
    dataPoints.forEach((p, idx) => {
        const x = getX(idx);
        const y = getY(p.targetRemaining);
        svg += `<circle cx="${x}" cy="${y}" r="4" fill="#10b981" stroke="#ffffff" stroke-width="1.5"/>`;
        const pos = calcLabelPos(x, y, posTarget);
        if (pos) {
            svg += `<text x="${pos.x}" y="${pos.y}" fill="#10b981" font-size="${Math.max(9, fontSize - 1)}" font-weight="${fontWeight}" text-anchor="${pos.anchor}">${p.targetRemaining}</text>`;
        }
    });

    // 3. Minor Dots & Labels (Amber)
    dataPoints.forEach((p, idx) => {
        const x = getX(idx);
        const y = getY(p.minorCount);
        svg += `<circle cx="${x}" cy="${y}" r="5" fill="#f59e0b" stroke="#ffffff" stroke-width="1.5"/>`;
        if (p.minorCount > 0) {
            const pos = calcLabelPos(x, y, posMinor);
            if (pos) {
                svg += `<text x="${pos.x}" y="${pos.y}" fill="#f59e0b" font-size="${fontSize}" font-weight="${fontWeight}" text-anchor="${pos.anchor}">${p.minorCount}</text>`;
            }
        }
    });

    // 4. Critical Dots & Labels (Red)
    dataPoints.forEach((p, idx) => {
        const x = getX(idx);
        const y = getY(p.critCount);
        svg += `<circle cx="${x}" cy="${y}" r="6" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>`;
        if (p.critCount > 0) {
            const pos = calcLabelPos(x, y, posCrit);
            if (pos) {
                svg += `<text x="${pos.x}" y="${pos.y}" fill="#ef4444" font-size="${fontSize}" font-weight="${fontWeight}" text-anchor="${pos.anchor}">${p.critCount}</text>`;
            }
        }
    });

    // Interactive Hover Slices for rich tooltips
    const tooltipTarget = isCompiler ? "repChartTooltip" : (box.id && box.id.includes("portfolio") ? "portfolioKpi5ChartTooltip" : "kpi5ChartTooltip");
    dataPoints.forEach((p, idx) => {
        const sliceWidth = numPoints > 1 ? (chartW / (numPoints - 1)) : chartW;
        const sliceX = numPoints > 1 ? (getX(idx) - sliceWidth / 2) : padding.left;
        const jsonStr = JSON.stringify({
            date: p.date,
            rawDate: p.rawDate,
            issuedCount: p.issuedCount,
            critCount: p.critCount,
            minorCount: p.minorCount,
            totalOpen: p.totalOpen,
            targetRemaining: p.targetRemaining,
            baseline: p.targetRemaining,
            loggedCount: p.loggedCount,
            rectifiedCount: p.rectifiedCount,
            overdueCount: p.overdueCount
        }).replace(/"/g, '&quot;');

        svg += `<rect x="${sliceX}" y="${padding.top}" width="${sliceWidth}" height="${chartH}" fill="transparent" style="cursor: pointer;" onmouseenter="showKpi5BurnDownTooltip(event, ${jsonStr}, '${tooltipTarget}')" onmousemove="moveKpi5Tooltip(event, '${tooltipTarget}')" onmouseleave="hideKpi5Tooltip('${tooltipTarget}')"/>`;
    });

    // X-Axis Labels with configurable angle & distance
    const isDense = dataPoints.length >= 6 || (chartW / dataPoints.length) < 85;
    const useVertical = dateAngle === "vertical" || (dateAngle === "auto" && isDense);
    const useSlanted = dateAngle === "slanted";
    const xLabelY = height - padding.bottom + extraXOffset;

    dataPoints.forEach((p, idx) => {
        const x = getX(idx);
        if (useVertical) {
            svg += `<text x="${x}" y="${xLabelY}" transform="rotate(-90 ${x} ${xLabelY})" fill="var(--text-primary, #e2e8f0)" font-size="11" font-weight="${fontWeight}" text-anchor="end">${p.date}</text>`;
        } else if (useSlanted) {
            svg += `<text x="${x}" y="${xLabelY}" transform="rotate(-45 ${x} ${xLabelY})" fill="var(--text-primary, #e2e8f0)" font-size="11" font-weight="${fontWeight}" text-anchor="end">${p.date}</text>`;
        } else {
            svg += `<text x="${x}" y="${xLabelY}" fill="var(--text-primary, #e2e8f0)" font-size="11" font-weight="${fontWeight}" text-anchor="middle">${p.date}</text>`;
        }
    });

    // X-Axis Baseline
    svg += `<line x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" stroke="var(--border-color, rgba(255,255,255,0.2))" stroke-width="2"/>`;

    svg += `</svg>`;
    box.innerHTML = svg;
}

function renderKPI5StackedBarChart(box, logs) {
    if (!box) return;
    if (logs.length === 0) {
        box.innerHTML = `<div style="text-align:center; padding-top:100px; color:var(--text-muted);">No log data matches the selected Quarter / Discipline / Sub-Discipline / Description filters.</div>`;
        return;
    }

    const isCompiler = (box.closest && box.closest('#tab-executive')) || (box.classList && box.classList.contains('compiler-chart-svg-box'));
    const opts = getGraphDisplaySettings("kpi5", isCompiler);

    const showLabels = opts.labelPos !== "hide" && opts.showLabels !== "false";
    const labelPos = opts.labelPos || "above";
    const fontSize = parseInt(opts.fontSize) || 11;
    const fontWeight = opts.fontWeight || "700";
    const dateAngle = opts.dateAngle || "auto";
    const yLeftOffset = parseInt(opts.yLeftOffset) || 18;
    const extraXOffset = parseInt(opts.xAxisOffset) || 25;

    const defaultDisciplines = [
        "Architectural Works",
        "Electrical Works",
        "Mechanical Works",
        "Structural Works",
        "Plumbing & Sanitary Works",
        "Civil Works"
    ];

    const logDisciplines = Array.from(new Set(logs.map(l => l.discipline).filter(Boolean)));
    const disciplines = logDisciplines.length > 0 ? logDisciplines : defaultDisciplines;

    const discStats = {};
    disciplines.forEach(d => {
        discStats[d] = { closed: 0, inProgress: 0, open: 0, total: 0 };
    });

    logs.forEach(l => {
        const d = l.discipline || "Architectural Works";
        if (!discStats[d]) discStats[d] = { closed: 0, inProgress: 0, open: 0, total: 0 };
        
        const st = (l.status || "").trim();
        if (st === "Signed-off" || st === "Closed" || st === "Rectified") {
            discStats[d].closed++;
        } else if (st === "In Progress") {
            discStats[d].inProgress++;
        } else {
            discStats[d].open++;
        }
        discStats[d].total++;
    });

    const activeDisciplines = Object.keys(discStats).filter(d => discStats[d].total > 0 || logDisciplines.includes(d));
    const renderList = activeDisciplines.length > 0 ? activeDisciplines : disciplines;

    const maxVal = Math.max(1, ...renderList.map(d => discStats[d] ? discStats[d].total : 0));
    const yMax = Math.max(1, Math.ceil(maxVal * 1.05));

    const width = box.clientWidth || 800;
    const isExpanded = box.classList && typeof box.classList.contains === "function" && box.classList.contains("expanded-graph");
    const defaultHeight = isExpanded ? 560 : (isCompiler ? 560 : 440);
    const height = box.clientHeight && box.clientHeight > 100 ? box.clientHeight : defaultHeight;

    let paddingBottom = 45;
    if (dateAngle === "vertical") {
        paddingBottom = Math.max(75, 45 + extraXOffset + 25);
    } else if (dateAngle === "slanted") {
        paddingBottom = Math.max(65, 35 + extraXOffset + 20);
    } else {
        paddingBottom = Math.max(45, 20 + extraXOffset + 15);
    }

    const padding = { top: isCompiler ? 35 : 45, right: 30, bottom: paddingBottom, left: Math.max(75, 45 + yLeftOffset) };

    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const barGroupWidth = chartW / renderList.length;
    const barWidth = Math.min(54, barGroupWidth * 0.55);

    let svg = `<svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" style="overflow:visible;" xmlns="http://www.w3.org/2000/svg">`;

    // Background Grid lines & Y-Axis Ticks
    const numTicks = Math.min(yMax, 5);
    for (let i = 0; i <= numTicks; i++) {
        const tickVal = Math.round((yMax / numTicks) * i);
        const yPos = padding.top + chartH - (i / numTicks) * chartH;
        svg += `<line x1="${padding.left}" y1="${yPos}" x2="${width - padding.right}" y2="${yPos}" stroke="var(--border-color, rgba(255,255,255,0.1))" stroke-dasharray="3,3"/>`;
        svg += `<text x="${padding.left - yLeftOffset}" y="${yPos + 4}" fill="var(--text-secondary, #94a3b8)" font-size="11" font-weight="600" text-anchor="end">${tickVal}</text>`;
    }

    // Y-Axis Label
    const leftTitlePos = Math.max(14, padding.left - yLeftOffset - 26);
    svg += `<text x="${leftTitlePos}" y="${padding.top + chartH / 2}" fill="var(--text-secondary, #94a3b8)" font-size="11" font-weight="700" text-anchor="middle" transform="rotate(-90 ${leftTitlePos} ${padding.top + chartH / 2})">Punch List Item Count</text>`;

    const tooltipTarget = isCompiler ? "repChartTooltip" : (box.id && box.id.includes("portfolio") ? "portfolioKpi5ChartTooltip" : "kpi5ChartTooltip");

    // Render Bars per Discipline
    renderList.forEach((disc, idx) => {
        const stats = discStats[disc] || { closed: 0, inProgress: 0, open: 0, total: 0 };
        const groupCenterX = padding.left + idx * barGroupWidth + barGroupWidth / 2;
        const xPos = groupCenterX - barWidth / 2;

        const criticalOpen = logs.filter(l => (l.discipline || "Architectural Works") === disc && l.cat === "Critical" && l.status !== "Signed-off" && l.status !== "Closed" && l.status !== "Rectified").length;

        const jsonStr = JSON.stringify({
            discipline: disc,
            closed: stats.closed,
            inProgress: stats.inProgress,
            open: stats.open,
            total: stats.total,
            criticalOpen: criticalOpen
        }).replace(/"/g, '&quot;');

        let currentY = padding.top + chartH;

        svg += `<g class="stacked-bar-group">`;

        // 1. Closed Segment (Green)
        if (stats.closed > 0) {
            const segH = (stats.closed / yMax) * chartH;
            currentY -= segH;
            svg += `<rect x="${xPos}" y="${currentY}" width="${barWidth}" height="${segH}" fill="#10b981" rx="2" ry="2" style="cursor: pointer;" onmouseenter="showKpi5StackedBarTooltip(event, ${jsonStr}, '${tooltipTarget}')" onmousemove="moveKpi5Tooltip(event, '${tooltipTarget}')" onmouseleave="hideKpi5Tooltip('${tooltipTarget}')">
                <title>${disc} - Closed/Signed-off: ${stats.closed}</title>
            </rect>`;
            if (segH >= 16) {
                svg += `<text x="${groupCenterX}" y="${currentY + segH / 2 + 4}" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle" pointer-events="none">${stats.closed}</text>`;
            }
        }

        // 2. In Progress Segment (Blue)
        if (stats.inProgress > 0) {
            const segH = (stats.inProgress / yMax) * chartH;
            currentY -= segH;
            svg += `<rect x="${xPos}" y="${currentY}" width="${barWidth}" height="${segH}" fill="#3b82f6" rx="2" ry="2" style="cursor: pointer;" onmouseenter="showKpi5StackedBarTooltip(event, ${jsonStr}, '${tooltipTarget}')" onmousemove="moveKpi5Tooltip(event, '${tooltipTarget}')" onmouseleave="hideKpi5Tooltip('${tooltipTarget}')">
                <title>${disc} - In Progress: ${stats.inProgress}</title>
            </rect>`;
            if (segH >= 16) {
                svg += `<text x="${groupCenterX}" y="${currentY + segH / 2 + 4}" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle" pointer-events="none">${stats.inProgress}</text>`;
            }
        }

        // 3. Open Segment (Red)
        if (stats.open > 0) {
            const segH = (stats.open / yMax) * chartH;
            currentY -= segH;
            svg += `<rect x="${xPos}" y="${currentY}" width="${barWidth}" height="${segH}" fill="#ef4444" rx="2" ry="2" style="cursor: pointer;" onmouseenter="showKpi5StackedBarTooltip(event, ${jsonStr}, '${tooltipTarget}')" onmousemove="moveKpi5Tooltip(event, '${tooltipTarget}')" onmouseleave="hideKpi5Tooltip('${tooltipTarget}')">
                <title>${disc} - Open/Pending: ${stats.open}</title>
            </rect>`;
            if (segH >= 16) {
                svg += `<text x="${groupCenterX}" y="${currentY + segH / 2 + 4}" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle" pointer-events="none">${stats.open}</text>`;
            }
        }

        svg += `</g>`;

        // Transparent Full-Height Hover Slice for entire bar column
        svg += `<rect x="${padding.left + idx * barGroupWidth}" y="${padding.top}" width="${barGroupWidth}" height="${chartH}" fill="transparent" style="cursor: pointer;" onmouseenter="showKpi5StackedBarTooltip(event, ${jsonStr}, '${tooltipTarget}')" onmousemove="moveKpi5Tooltip(event, '${tooltipTarget}')" onmouseleave="hideKpi5Tooltip('${tooltipTarget}')"/>`;

        // Total Count Pill above Bar Stack
        if (stats.total > 0 && showLabels) {
            let totalY = currentY - 8;
            if (labelPos === "high") totalY = currentY - 18;
            else if (labelPos === "extra_high") totalY = currentY - 28;
            svg += `<text x="${groupCenterX}" y="${totalY}" fill="var(--text-primary, #ffffff)" font-size="12" font-weight="800" text-anchor="middle">${stats.total}</text>`;
        }

        // X-Axis Label with configurable angle & distance
        const labelText = disc.replace(" Works", "").replace(" & Sanitary", "");
        const xLabelY = height - padding.bottom + extraXOffset;
        if (dateAngle === "vertical") {
            svg += `<text x="${groupCenterX}" y="${xLabelY}" transform="rotate(-90 ${groupCenterX} ${xLabelY})" fill="var(--text-primary, #e2e8f0)" font-size="11" font-weight="${fontWeight}" text-anchor="end">${labelText}</text>`;
        } else if (dateAngle === "slanted") {
            svg += `<text x="${groupCenterX}" y="${xLabelY}" transform="rotate(-45 ${groupCenterX} ${xLabelY})" fill="var(--text-primary, #e2e8f0)" font-size="11" font-weight="${fontWeight}" text-anchor="end">${labelText}</text>`;
        } else {
            svg += `<text x="${groupCenterX}" y="${xLabelY}" fill="var(--text-primary, #e2e8f0)" font-size="11" font-weight="${fontWeight}" text-anchor="middle">${labelText}</text>`;
        }
    });

    // X-Axis Baseline
    svg += `<line x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" stroke="var(--border-color, rgba(255,255,255,0.2))" stroke-width="2"/>`;

    svg += `</svg>`;
    box.innerHTML = svg;
}

function renderKPI5TargetScheduleChart(box, logs) {
    if (!box) return;
    if (logs.length === 0) {
        box.innerHTML = `<div style="text-align:center; padding-top:100px; color:var(--text-muted);">No log data matches the selected Quarter / Discipline / Sub-Discipline / Description filters.</div>`;
        return;
    }

    const isCompiler = (box.closest && box.closest('#tab-executive')) || (box.classList && box.classList.contains('compiler-chart-svg-box'));
    const opts = getGraphDisplaySettings("kpi5", isCompiler);

    const showLabels = opts.labelPos !== "hide" && opts.showLabels !== "false";
    const labelPos = opts.labelPos || "above";
    const fontSize = parseInt(opts.fontSize) || 11;
    const fontWeight = opts.fontWeight || "700";
    const dateAngle = opts.dateAngle || "auto";
    const yLeftOffset = parseInt(opts.yLeftOffset) || 18;
    const extraXOffset = parseInt(opts.xAxisOffset) || 25;

    // 1. Group logs by targetDate
    const targetDateSet = new Set();
    logs.forEach(l => {
        if (l.targetDate) targetDateSet.add(l.targetDate);
    });

    let targetDates = Array.from(targetDateSet).filter(Boolean).sort((a, b) => new Date(a) - new Date(b));
    if (targetDates.length === 0) {
        targetDates = ["2026-10-20", "2026-11-15", "2026-11-30", "2026-12-01", "2026-12-05"];
    }

    const totalPunchItems = Math.max(1, logs.length);
    const nowMs = Date.now();

    // 2. Build Milestone Data Points
    const dataPoints = targetDates.map((targetDStr, idx) => {
        const targetMs = new Date(targetDStr).getTime();

        // Items scheduled specifically with this target date
        const itemsDueOnDate = logs.filter(l => l.targetDate === targetDStr || (!l.targetDate && idx === 0));
        const dueCount = itemsDueOnDate.length;

        let clearedOnTime = 0;
        let pending = 0;
        let overdue = 0;
        let critCount = 0;
        let minorCount = 0;

        const subList = Array.from(new Set(itemsDueOnDate.map(l => l.sub).filter(Boolean)));
        const subsText = subList.length > 0 ? subList.join(", ") : "General Trade Contractors";

        itemsDueOnDate.forEach(l => {
            const isClosed = l.status === "Signed-off" || l.status === "Closed" || l.status === "Rectified";
            const actualMs = l.actualDateRectified ? new Date(l.actualDateRectified).getTime() : 0;
            const onTime = isClosed && (actualMs === 0 || actualMs <= targetMs);

            if (l.cat === "Critical") critCount++;
            else minorCount++;

            if (onTime) {
                clearedOnTime++;
            } else if (isClosed) {
                overdue++; // Cleared after target date
            } else if (targetMs >= nowMs) {
                pending++; // In progress, not yet due
            } else {
                overdue++; // Unresolved and past target date
            }
        });

        // Cumulative Planned Targets up to this date
        const cumPlannedCount = logs.filter(l => l.targetDate && new Date(l.targetDate).getTime() <= targetMs).length;
        const cumPlannedPct = Math.min(100, (cumPlannedCount / totalPunchItems) * 100);

        // Cumulative Actual Rectified up to this date
        const cumRectifiedCount = logs.filter(l => {
            const isClosed = l.status === "Signed-off" || l.status === "Closed" || l.status === "Rectified";
            if (!isClosed) return false;
            const actualMs = l.actualDateRectified ? new Date(l.actualDateRectified).getTime() : (l.targetDate ? new Date(l.targetDate).getTime() : 0);
            return actualMs <= targetMs;
        }).length;
        const cumActualPct = Math.min(100, (cumRectifiedCount / totalPunchItems) * 100);

        return {
            date: formatChartXAxisDate(targetDStr),
            rawDate: targetDStr,
            totalDue: dueCount,
            clearedOnTime: clearedOnTime,
            pending: pending,
            overdue: overdue,
            critCount: critCount,
            minorCount: minorCount,
            cumPlannedCount: cumPlannedCount,
            cumPlannedPct: cumPlannedPct,
            cumRectifiedCount: cumRectifiedCount,
            cumActualPct: cumActualPct,
            subs: subsText
        };
    });

    const maxDue = Math.max(1, ...dataPoints.map(p => p.totalDue));
    const yMaxLeft = Math.max(2, Math.ceil(maxDue * 1.35));

    const width = box.clientWidth || 800;
    const isExpanded = box.classList && typeof box.classList.contains === "function" && box.classList.contains("expanded-graph");
    const defaultHeight = isExpanded ? 560 : (isCompiler ? 560 : 440);
    const height = box.clientHeight && box.clientHeight > 100 ? box.clientHeight : defaultHeight;

    let paddingBottom = 45;
    if (dateAngle === "vertical") {
        paddingBottom = Math.max(75, 45 + extraXOffset + 25);
    } else if (dateAngle === "slanted") {
        paddingBottom = Math.max(65, 35 + extraXOffset + 20);
    } else {
        paddingBottom = Math.max(45, 20 + extraXOffset + 15);
    }

    const padding = { top: isCompiler ? 40 : 50, right: 65, bottom: paddingBottom, left: Math.max(75, 45 + yLeftOffset) };

    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const numPoints = dataPoints.length;
    const getX = (idx) => padding.left + (idx / (numPoints - 1 || 1)) * chartW;
    const getYLeft = (val) => padding.top + chartH - (val / yMaxLeft) * chartH;
    const getYRight = (pct) => padding.top + chartH - (pct / 100) * chartH;

    const chartScope = box.id || (isCompiler ? "rep_kpi5" : "kpi5");

    let svg = `<svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" style="overflow:visible;" xmlns="http://www.w3.org/2000/svg">`;

    // SVG Marker Definitions for Leader Arrows
    svg += `
        <defs>
            <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981"/>
            </marker>
            <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#38bdf8"/>
            </marker>
            <marker id="arrow-amber" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f59e0b"/>
            </marker>
        </defs>
    `;

    // 1. Horizontal Grid lines & Left Y-Axis (Due Item Count)
    const numTicks = Math.min(yMaxLeft, 5);
    for (let i = 0; i <= numTicks; i++) {
        const tickVal = Math.round((yMaxLeft / numTicks) * i);
        const yPos = padding.top + chartH - (i / numTicks) * chartH;
        svg += `<line x1="${padding.left}" y1="${yPos}" x2="${width - padding.right}" y2="${yPos}" stroke="var(--border-color, rgba(255,255,255,0.1))" stroke-dasharray="3,3"/>`;
        svg += `<text x="${padding.left - yLeftOffset}" y="${yPos + 4}" fill="var(--text-secondary, #94a3b8)" font-size="11" font-weight="600" text-anchor="end">${tickVal}</text>`;
    }

    // 2. Right Y-Axis Ticks (Cumulative Clearance %: 0%, 25%, 50%, 75%, 100%)
    [0, 25, 50, 75, 100].forEach(pct => {
        const yPos = getYRight(pct);
        svg += `<text x="${width - padding.right + 12}" y="${yPos + 4}" fill="#38bdf8" font-size="11" font-weight="600" text-anchor="start">${pct}%</text>`;
    });

    // 3. Axis Titles
    const leftTitlePos = Math.max(14, padding.left - yLeftOffset - 26);
    svg += `<text x="${leftTitlePos}" y="${padding.top + chartH / 2}" fill="var(--text-secondary, #94a3b8)" font-size="11" font-weight="700" text-anchor="middle" transform="rotate(-90 ${leftTitlePos} ${padding.top + chartH / 2})">Items Due on Date (Workload)</text>`;
    
    const rightTitlePos = width - padding.right + 48;
    svg += `<text x="${rightTitlePos}" y="${padding.top + chartH / 2}" fill="#38bdf8" font-size="11" font-weight="700" text-anchor="middle" transform="rotate(90 ${rightTitlePos} ${padding.top + chartH / 2})">Cumulative Clearance %</text>`;

    // 4. 100% Target Reference Ceiling Line
    const y100 = getYRight(100);
    svg += `<line x1="${padding.left}" y1="${y100}" x2="${width - padding.right}" y2="${y100}" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="5,4" opacity="0.85"/>`;
    svg += `<text x="${width - padding.right - 8}" y="${y100 - 6}" fill="#ef4444" font-size="10" font-weight="700" text-anchor="end">100% TARGET CLEARANCE</text>`;

    const tooltipTarget = isCompiler ? "repChartTooltip" : (box.id && box.id.includes("portfolio") ? "portfolioKpi5ChartTooltip" : "kpi5ChartTooltip");

    // 5. Render Stacked Workload Bars per Target Date
    const barWidth = Math.min(48, Math.max(16, (chartW / numPoints) * 0.42));
    dataPoints.forEach((p, idx) => {
        const xCenter = getX(idx);
        const xPos = xCenter - barWidth / 2;
        let currentY = padding.top + chartH;

        svg += `<g class="target-sched-bar-group">`;

        // 🟢 Segment 1: Cleared On-Time (Green)
        if (p.clearedOnTime > 0) {
            const segH = (p.clearedOnTime / yMaxLeft) * chartH;
            currentY -= segH;
            svg += `<rect x="${xPos}" y="${currentY}" width="${barWidth}" height="${segH}" fill="#10b981" rx="2" ry="2"/>`;
            if (segH >= 15) {
                svg += `<text x="${xCenter}" y="${currentY + segH / 2 + 4}" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle" pointer-events="none">${p.clearedOnTime}</text>`;
            }
        }

        // 🟡 Segment 2: In-Progress / Pending (Amber)
        if (p.pending > 0) {
            const segH = (p.pending / yMaxLeft) * chartH;
            currentY -= segH;
            svg += `<rect x="${xPos}" y="${currentY}" width="${barWidth}" height="${segH}" fill="#f59e0b" rx="2" ry="2"/>`;
            if (segH >= 15) {
                svg += `<text x="${xCenter}" y="${currentY + segH / 2 + 4}" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle" pointer-events="none">${p.pending}</text>`;
            }
        }

        // 🔴 Segment 3: Overdue / Slipped (Red)
        if (p.overdue > 0) {
            const segH = (p.overdue / yMaxLeft) * chartH;
            currentY -= segH;
            svg += `<rect x="${xPos}" y="${currentY}" width="${barWidth}" height="${segH}" fill="#ef4444" rx="2" ry="2"/>`;
            if (segH >= 15) {
                svg += `<text x="${xCenter}" y="${currentY + segH / 2 + 4}" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle" pointer-events="none">${p.overdue}</text>`;
            }
        }

        svg += `</g>`;

        // Total Count on top of bar
        if (p.totalDue > 0 && showLabels) {
            svg += `<text x="${xCenter}" y="${currentY - 6}" fill="var(--text-primary, #ffffff)" font-size="11" font-weight="800" text-anchor="middle">${p.totalDue}</text>`;
        }
    });

    // 6. Polyline 1: Planned Cumulative Clearance S-Curve (Dashed Green)
    let plannedPath = "";
    dataPoints.forEach((p, idx) => {
        const x = getX(idx);
        const y = getYRight(p.cumPlannedPct);
        plannedPath += (idx === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
    });
    svg += `<path d="${plannedPath}" fill="none" stroke="#10b981" stroke-width="2.5" stroke-dasharray="6,4" opacity="0.95"/>`;

    // 7. Polyline 2: Actual Cumulative Clearance S-Curve (Solid Blue)
    let actualPath = "";
    dataPoints.forEach((p, idx) => {
        const x = getX(idx);
        const y = getYRight(p.cumActualPct);
        actualPath += (idx === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
    });
    svg += `<path d="${actualPath}" fill="none" stroke="#2563eb" stroke-width="3"/>`;

    // 8. Leader Arrows Container (rendered behind nodes and labels)
    svg += `<g class="arrows-container">`;
    dataPoints.forEach((p, idx) => {
        const x = getX(idx);
        const yPlan = getYRight(p.cumPlannedPct);
        const yAct = getYRight(p.cumActualPct);

        const labelKey_plan = `${chartScope}_kpi5_plan_${idx}`;
        const labelKey_act = `${chartScope}_kpi5_act_${idx}`;

        const storedPlan = appState.graphSettings?.labelPositions?.[labelKey_plan];
        if (storedPlan && storedPlan.isCustom && Math.hypot(storedPlan.dx, storedPlan.dy) > 10) {
            const defX = x;
            const defY = yPlan - 16;
            const curX = defX + storedPlan.dx;
            const curY = defY + storedPlan.dy;
            svg += `<line class="label-leader-arrow arrow-for-${labelKey_plan}" x1="${curX}" y1="${curY}" x2="${x}" y2="${yPlan}" stroke="#10b981" stroke-width="1.4" stroke-dasharray="3,2" marker-end="url(#arrow-green)" opacity="0.95" pointer-events="none"/>`;
        }

        const storedAct = appState.graphSettings?.labelPositions?.[labelKey_act];
        if (storedAct && storedAct.isCustom && Math.hypot(storedAct.dx, storedAct.dy) > 10) {
            const defX = x;
            const defY = yAct + 18;
            const curX = defX + storedAct.dx;
            const curY = defY + storedAct.dy;
            svg += `<line class="label-leader-arrow arrow-for-${labelKey_act}" x1="${curX}" y1="${curY}" x2="${x}" y2="${yAct}" stroke="#38bdf8" stroke-width="1.4" stroke-dasharray="3,2" marker-end="url(#arrow-blue)" opacity="0.95" pointer-events="none"/>`;
        }
    });
    svg += `</g>`;

    // 9. Nodes (Green & Blue Circles)
    dataPoints.forEach((p, idx) => {
        const x = getX(idx);
        const yPlan = getYRight(p.cumPlannedPct);
        const yAct = getYRight(p.cumActualPct);

        // Planned Node (Green)
        svg += `<circle cx="${x}" cy="${yPlan}" r="4.5" fill="#10b981" stroke="#ffffff" stroke-width="1.5" pointer-events="none"/>`;

        // Actual Node (Blue)
        svg += `<circle cx="${x}" cy="${yAct}" r="5" fill="#2563eb" stroke="#ffffff" stroke-width="2" pointer-events="none"/>`;
    });

    // 10. Full-Height Interactive Hover Slices (behind draggable labels for seamless hovering)
    dataPoints.forEach((p, idx) => {
        const sliceWidth = numPoints > 1 ? (chartW / (numPoints - 1)) : chartW;
        const sliceX = numPoints > 1 ? (getX(idx) - sliceWidth / 2) : padding.left;
        const jsonStr = JSON.stringify({
            date: p.date,
            rawDate: p.rawDate,
            totalDue: p.totalDue,
            clearedOnTime: p.clearedOnTime,
            pending: p.pending,
            overdue: p.overdue,
            critCount: p.critCount,
            minorCount: p.minorCount,
            cumPlannedPct: p.cumPlannedPct,
            cumActualPct: p.cumActualPct,
            subs: p.subs
        }).replace(/"/g, '&quot;');

        svg += `<rect x="${sliceX}" y="${padding.top}" width="${sliceWidth}" height="${chartH}" fill="transparent" style="cursor: pointer;" onmouseenter="showKpi5TargetScheduleTooltip(event, ${jsonStr}, '${tooltipTarget}')" onmousemove="moveKpi5Tooltip(event, '${tooltipTarget}')" onmouseleave="hideKpi5Tooltip('${tooltipTarget}')"/>`;
    });

    // 11. Draggable Labels for Planned Target & Actual Clearance (Foreground)
    if (showLabels) {
        const pillW = Math.max(74, Math.round(fontSize * 7.2));
        const pillH = Math.max(18, fontSize + 7);

        dataPoints.forEach((p, idx) => {
            const x = getX(idx);
            const yPlan = getYRight(p.cumPlannedPct);
            const yAct = getYRight(p.cumActualPct);

            const labelKey_plan = `${chartScope}_kpi5_plan_${idx}`;
            const labelKey_act = `${chartScope}_kpi5_act_${idx}`;

            const defPlanX = x;
            const defPlanY = yPlan - 16;
            const defActX = x;
            const defActY = yAct + 18;

            const storedPlan = appState.graphSettings?.labelPositions?.[labelKey_plan] || { dx: 0, dy: 0 };
            const storedAct = appState.graphSettings?.labelPositions?.[labelKey_act] || { dx: 0, dy: 0 };

            // 🟢 Planned Target Draggable Pill
            svg += `
                <g class="draggable-chart-label" transform="translate(${storedPlan.dx || 0}, ${storedPlan.dy || 0})" data-marker-id="arrow-green" data-color="#10b981" data-label-key="${labelKey_plan}" onmousedown="startChartLabelDrag(event, '${chartScope}', '${labelKey_plan}', ${x}, ${yPlan}, ${defPlanX}, ${defPlanY})" ondblclick="resetChartLabelPosition(event, '${labelKey_plan}')">
                    <title>🎯 Planned Target: ${p.cumPlannedPct.toFixed(0)}% (Click & drag to reposition; double-click to reset)</title>
                    <rect x="${defPlanX - pillW / 2}" y="${defPlanY - pillH / 2}" width="${pillW}" height="${pillH}" rx="4" ry="4" fill="rgba(6, 78, 59, 0.92)" stroke="#10b981" stroke-width="1.2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"/>
                    <text x="${defPlanX}" y="${defPlanY + 3.5}" fill="#34d399" font-size="${Math.max(9, fontSize - 1)}" font-weight="${fontWeight}" text-anchor="middle" pointer-events="none">🎯 Plan: ${p.cumPlannedPct.toFixed(0)}%</text>
                </g>
            `;

            // 🔵 Actual Clearance Draggable Pill
            svg += `
                <g class="draggable-chart-label" transform="translate(${storedAct.dx || 0}, ${storedAct.dy || 0})" data-marker-id="arrow-blue" data-color="#38bdf8" data-label-key="${labelKey_act}" onmousedown="startChartLabelDrag(event, '${chartScope}', '${labelKey_act}', ${x}, ${yAct}, ${defActX}, ${defActY})" ondblclick="resetChartLabelPosition(event, '${labelKey_act}')">
                    <title>✅ Actual Cleared: ${p.cumActualPct.toFixed(0)}% (Click & drag to reposition; double-click to reset)</title>
                    <rect x="${defActX - pillW / 2}" y="${defActY - pillH / 2}" width="${pillW}" height="${pillH}" rx="4" ry="4" fill="rgba(30, 58, 138, 0.92)" stroke="#38bdf8" stroke-width="1.2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"/>
                    <text x="${defActX}" y="${defActY + 3.5}" fill="#93c5fd" font-size="${Math.max(9, fontSize - 1)}" font-weight="${fontWeight}" text-anchor="middle" pointer-events="none">✅ Act: ${p.cumActualPct.toFixed(0)}%</text>
                </g>
            `;
        });
    }

    // 12. X-Axis Dates Labels
    const isDense = dataPoints.length >= 6 || (chartW / dataPoints.length) < 85;
    const useVertical = dateAngle === "vertical" || (dateAngle === "auto" && isDense);
    const useSlanted = dateAngle === "slanted";
    const xLabelY = height - padding.bottom + extraXOffset;

    dataPoints.forEach((p, idx) => {
        const x = getX(idx);
        if (useVertical) {
            svg += `<text x="${x}" y="${xLabelY}" transform="rotate(-90 ${x} ${xLabelY})" fill="var(--text-primary, #e2e8f0)" font-size="11" font-weight="${fontWeight}" text-anchor="end">${p.date}</text>`;
        } else if (useSlanted) {
            svg += `<text x="${x}" y="${xLabelY}" transform="rotate(-45 ${x} ${xLabelY})" fill="var(--text-primary, #e2e8f0)" font-size="11" font-weight="${fontWeight}" text-anchor="end">${p.date}</text>`;
        } else {
            svg += `<text x="${x}" y="${xLabelY}" fill="var(--text-primary, #e2e8f0)" font-size="11" font-weight="${fontWeight}" text-anchor="middle">${p.date}</text>`;
        }
    });

    // X-Axis Baseline
    svg += `<line x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" stroke="var(--border-color, rgba(255,255,255,0.2))" stroke-width="2"/>`;

    svg += `</svg>`;
    box.innerHTML = svg;
}

function updateGraphDisplayOptions(kpiKey) {
    if (!appState.graphSettings) appState.graphSettings = {};
    if (!appState.graphSettings[kpiKey]) appState.graphSettings[kpiKey] = {};

    const showLabels = document.getElementById(`${kpiKey}ShowLabels`)?.value || "true";
    const labelPos = document.getElementById(`${kpiKey}LabelPos`)?.value || "auto";
    const fontSize = document.getElementById(`${kpiKey}FontSize`)?.value || "11";
    const fontWeight = document.getElementById(`${kpiKey}FontWeight`)?.value || "700";
    const dateAngle = document.getElementById(`${kpiKey}DateAngle`)?.value || "auto";
    const xAxisOffset = parseInt(document.getElementById(`${kpiKey}XAxisOffset`)?.value) || 20;
    const yLeftOffset = parseInt(document.getElementById(`${kpiKey}YLeftOffset`)?.value || document.getElementById(`${kpiKey}YAxisOffset`)?.value) || 18;
    const yRightOffset = parseInt(document.getElementById(`${kpiKey}YRightOffset`)?.value) || 18;
    const monthPos = document.getElementById(`${kpiKey}MonthPos`)?.value || "top";
    const labelOffset = parseInt(document.getElementById(`${kpiKey}LabelOffset`)?.value) || 0;

    const extra = {};
    if (kpiKey === "kpi5") {
        extra.posIssued = document.getElementById("kpi5PosIssued")?.value || "high";
        extra.posTarget = document.getElementById("kpi5PosTarget")?.value || "below";
        extra.posMinor = document.getElementById("kpi5PosMinor")?.value || "above";
        extra.posCrit = document.getElementById("kpi5PosCrit")?.value || "extra_high";
    }

    appState.graphSettings[kpiKey] = { ...appState.graphSettings[kpiKey], showLabels, labelPos, fontSize, fontWeight, dateAngle, xAxisOffset, yLeftOffset, yRightOffset, monthPos, labelOffset, ...extra };
    saveAppState();

    if (kpiKey === "kpi1") renderKPI1LineGraph();
    else if (kpiKey === "kpi2") renderKPI2LineGraph();
    else if (kpiKey === "kpi3") renderKPI3LineGraph();
    else if (kpiKey === "kpi4") renderKPI4LineGraph();
    else if (kpiKey === "kpi5") renderKPI5LineGraph();
}

function syncGraphControlsUI(kpiKey) {
    if (!appState.graphSettings || !appState.graphSettings[kpiKey]) return;
    const opts = appState.graphSettings[kpiKey];
    
    const showEl = document.getElementById(`${kpiKey}ShowLabels`);
    const posEl = document.getElementById(`${kpiKey}LabelPos`);
    const sizeEl = document.getElementById(`${kpiKey}FontSize`);
    const weightEl = document.getElementById(`${kpiKey}FontWeight`);
    const angleEl = document.getElementById(`${kpiKey}DateAngle`);
    const xOffsetEl = document.getElementById(`${kpiKey}XAxisOffset`);
    const yLeftOffsetEl = document.getElementById(`${kpiKey}YLeftOffset`) || document.getElementById(`${kpiKey}YAxisOffset`);
    const yRightOffsetEl = document.getElementById(`${kpiKey}YRightOffset`);
    const monthPosEl = document.getElementById(`${kpiKey}MonthPos`);
    const labelOffsetEl = document.getElementById(`${kpiKey}LabelOffset`);

    if (showEl && opts.showLabels !== undefined) showEl.value = opts.showLabels;
    if (posEl && opts.labelPos) posEl.value = opts.labelPos;
    if (sizeEl && opts.fontSize) sizeEl.value = opts.fontSize;
    if (weightEl && opts.fontWeight) weightEl.value = opts.fontWeight;
    if (angleEl && opts.dateAngle) angleEl.value = opts.dateAngle;
    if (xOffsetEl && opts.xAxisOffset) xOffsetEl.value = opts.xAxisOffset;
    if (yLeftOffsetEl && (opts.yLeftOffset || opts.yAxisOffset)) yLeftOffsetEl.value = opts.yLeftOffset || opts.yAxisOffset;
    if (yRightOffsetEl && opts.yRightOffset) yRightOffsetEl.value = opts.yRightOffset;
    if (monthPosEl && opts.monthPos) monthPosEl.value = opts.monthPos;
    if (labelOffsetEl && opts.labelOffset !== undefined) labelOffsetEl.value = opts.labelOffset;

    if (kpiKey === "kpi5") {
        const posIssuedEl = document.getElementById("kpi5PosIssued");
        const posTargetEl = document.getElementById("kpi5PosTarget");
        const posMinorEl = document.getElementById("kpi5PosMinor");
        const posCritEl = document.getElementById("kpi5PosCrit");

        if (posIssuedEl && opts.posIssued) posIssuedEl.value = opts.posIssued;
        if (posTargetEl && opts.posTarget) posTargetEl.value = opts.posTarget;
        if (posMinorEl && opts.posMinor) posMinorEl.value = opts.posMinor;
        if (posCritEl && opts.posCrit) posCritEl.value = opts.posCrit;

        const mode = opts.viewMode || "burndown";
        const sel = document.getElementById("kpi5ViewModeSelect");
        if (sel) sel.value = mode;
        const btnBurn = document.getElementById("kpi5BtnBurndown");
        const btnDisc = document.getElementById("kpi5BtnDiscipline");
        if (btnBurn) btnBurn.classList.toggle("active", mode === "burndown");
        if (btnDisc) btnDisc.classList.toggle("active", mode === "discipline");
    }
}

function renderGenericLineChart(box, logs, extractorFn, reqLegendLabel, actLegendLabel, defaultBenchPct, kpiKey) {
    if (logs.length === 0) {
        box.innerHTML = `<div style="text-align:center; padding-top:100px; color:var(--text-muted);">No log data matches the selected Quarter / Discipline / Sub-Discipline / Description filters.</div>`;
        return;
    }

    const isCompiler = (box.closest && box.closest('#tab-executive')) || (box.classList && box.classList.contains('compiler-chart-svg-box'));
    const opts = getGraphDisplaySettings(kpiKey || "kpi4", isCompiler);

    const showLabels = opts.labelPos !== "hide" && opts.showLabels !== "false";
    const labelPos = opts.labelPos || "auto";
    const fontSize = parseInt(opts.fontSize) || 11;
    const fontWeight = opts.fontWeight || "700";
    const dateAngle = opts.dateAngle || "auto";
    const yLeftOffset = parseInt(opts.yLeftOffset) || 18;
    const extraXOffset = parseInt(opts.xAxisOffset) || 25;

    const width = box.clientWidth || 800;
    const isExpanded = box.classList && typeof box.classList.contains === "function" && box.classList.contains("expanded-graph");
    const defaultHeight = isExpanded ? 560 : (isCompiler ? 560 : 440);
    const height = box.clientHeight && box.clientHeight > 100 ? box.clientHeight : defaultHeight;

    const paddingTop = isCompiler ? 35 : 45;
    const paddingLeft = Math.max(80, 50 + yLeftOffset);
    const paddingRight = 60;

    let paddingBottom = 45;
    if (dateAngle === "vertical") {
        paddingBottom = Math.max(75, 45 + extraXOffset + 25);
    } else if (dateAngle === "slanted") {
        paddingBottom = Math.max(65, 35 + extraXOffset + 20);
    } else {
        paddingBottom = Math.max(45, 20 + extraXOffset + 15);
    }

    const chartHeight = height - paddingTop - paddingBottom;
    const chartWidth = width - paddingLeft - paddingRight;

    const parsedData = logs.map(extractorFn);

    // Check if benchmark value is defined in data or defaulted for KPI 4
    let targetBench = defaultBenchPct;
    if (targetBench === null || targetBench === undefined) {
        const found = parsedData.find(d => d.benchVal !== null && d.benchVal !== undefined && !isNaN(d.benchVal));
        if (found) targetBench = Number(found.benchVal);
        else if (kpiKey === "kpi4") targetBench = 7;
    }

    // Collect all active data values to dynamically compute tight min & max bounds
    const dataVals = [];
    parsedData.forEach(d => {
        if (d.valReq !== null && d.valReq !== undefined && !isNaN(d.valReq)) dataVals.push(Number(d.valReq));
        if (d.valAct !== null && d.valAct !== undefined && !isNaN(d.valAct)) dataVals.push(Number(d.valAct));
        if (d.benchVal !== null && d.benchVal !== undefined && !isNaN(d.benchVal)) dataVals.push(Number(d.benchVal));
    });
    if (targetBench !== null && targetBench !== undefined && !isNaN(targetBench)) {
        dataVals.push(Number(targetBench));
    }

    let rawMin = dataVals.length > 0 ? Math.min(...dataVals) : 0;
    let rawMax = dataVals.length > 0 ? Math.max(...dataVals) : 10;

    let range = rawMax - rawMin;
    if (range === 0) {
        range = rawMax === 0 ? 10 : Math.abs(rawMax) * 0.15;
    }

    const paddingVal = range * 0.06;
    let minVal = rawMin - paddingVal;
    let maxVal = rawMax + paddingVal;

    if (rawMin >= 0 && rawMin <= range * 0.3) {
        minVal = 0;
    }
    if (rawMin >= 0 && minVal < 0) {
        minVal = 0;
    }

    if (minVal === maxVal) {
        maxVal = minVal + 10;
    }

    const pointsCount = parsedData.length;
    const xStep = chartWidth / Math.max(1, pointsCount - 1);

    const getY = (val) => {
        const v = Number(val) || 0;
        return paddingTop + chartHeight - ((v - minVal) / (maxVal - minVal || 1)) * chartHeight;
    };

    let reqPoints = [], actPoints = [], xLabels = [];

    parsedData.forEach((d, idx) => {
        const x = pointsCount === 1 ? paddingLeft + chartWidth / 2 : paddingLeft + idx * xStep;
        const reqY = getY(d.valReq || 0);

        let actY = null;
        if (d.valAct !== null && d.valAct !== undefined) {
            actY = getY(d.valAct || 0);
        }

        reqPoints.push({ x, y: reqY, val: d.valReq, unit: d.unit, actY: actY });

        if (d.valAct !== null && d.valAct !== undefined) {
            actPoints.push({ x, y: actY, val: d.valAct, unit: d.unit, reqY: reqY });
        }

        xLabels.push({ x, label: formatChartXAxisDate(d.date) || `P${idx + 1}` });
    });

    let svg = `<svg width="100%" height="100%" viewBox="0 0 ${width} ${height}">`;

    // Horizontal Grid lines & Y-axis labels
    const numDivisions = 4;
    for (let i = 0; i <= numDivisions; i++) {
        const gridY = paddingTop + i * (chartHeight / numDivisions);
        const scaleVal = maxVal - i * ((maxVal - minVal) / numDivisions);
        let labelText = "";
        if (scaleVal >= 1000) {
            labelText = Math.round(scaleVal).toLocaleString();
        } else if (scaleVal >= 10) {
            labelText = Number(scaleVal.toFixed(1)).toLocaleString();
        } else {
            labelText = Number(scaleVal.toFixed(2)).toLocaleString();
        }
        svg += `<line x1="${paddingLeft}" y1="${gridY}" x2="${width - paddingRight}" y2="${gridY}" class="svg-grid-line"/>`;
        svg += `<text x="${paddingLeft - yLeftOffset}" y="${gridY + 4}" class="svg-axis-label" text-anchor="end" style="font-size: ${fontSize}px; font-weight: 600;">${labelText}</text>`;
    }

    // Vertical Dashed Lines Indicating Month Transitions
    const genericMonthPoints = parsedData.map((d, idx) => ({ x: reqPoints[idx].x, date: d.date }));
    svg += generateMonthDividerLinesSVG(genericMonthPoints, paddingTop, chartHeight);

    // Y-Axis Title
    const leftTitleX = -(paddingTop + chartHeight / 2);
    const leftTitleY = Math.max(14, paddingLeft - yLeftOffset - 28);
    svg += `<text transform="rotate(-90)" x="${leftTitleX}" y="${leftTitleY}" class="svg-axis-label" style="font-weight:700; font-size:11px; fill:var(--text-secondary);" text-anchor="middle">${reqLegendLabel || 'Values'}</text>`;

    // Target Benchmark Reference Line Graph (Dashed Amber / Orange)
    if (targetBench !== null && targetBench !== undefined && !isNaN(targetBench)) {
        const benchY = getY(targetBench);

        // 1. Horizontal Reference Line Path
        svg += `<line x1="${paddingLeft}" y1="${benchY}" x2="${width - paddingRight}" y2="${benchY}" class="svg-line-bench" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="6,4" opacity="0.95"/>`;

        // 2. Benchmark Badge Tag on Top Right
        const tagLabel = kpiKey === "kpi4" ? "TARGET BENCHMARK (≤ 7.0 DAYS)" : `TARGET BENCHMARK (${targetBench})`;
        const badgeW = kpiKey === "kpi4" ? 190 : 160;
        const badgeX = width - paddingRight - badgeW;
        const badgeY = Math.max(14, benchY - 22);

        svg += `
            <rect x="${badgeX}" y="${badgeY}" width="${badgeW}" height="18" rx="4" fill="rgba(245, 158, 11, 0.22)" stroke="#f59e0b" stroke-width="1"/>
            <text x="${badgeX + badgeW / 2}" y="${badgeY + 12}" fill="#f59e0b" font-size="10px" font-weight="800" text-anchor="middle">${tagLabel}</text>
        `;

        // 3. Milestone Nodes on Benchmark Line
        if (pointsCount > 0) {
            parsedData.forEach((d, idx) => {
                const bx = pointsCount === 1 ? paddingLeft + chartWidth / 2 : paddingLeft + idx * xStep;
                svg += `<circle cx="${bx}" cy="${benchY}" r="4" fill="#f59e0b" stroke="#ffffff" stroke-width="1.5" opacity="0.9"/>`;
            });
        }
    }

    // Primary Line paths
    if (reqPoints.length > 1) {
        const pathD = reqPoints.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ");
        svg += `<path d="${pathD}" class="svg-line-req" style="stroke-width: 3.5;"/>`;
    }

    if (actPoints.length > 1) {
        const pathD = actPoints.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ");
        svg += `<path d="${pathD}" class="svg-line-act" style="stroke-width: 3.5;"/>`;
    }

    // Design Requirement nodes and labels
    reqPoints.forEach(p => {
        const u = p.unit ? ` ${p.unit}` : "";
        const formattedVal = typeof p.val === 'number' && p.val > 1000 && !p.unit ? '₱' + p.val.toLocaleString() : p.val.toLocaleString() + u;
        
        let labelY = p.y - 12;
        let labelX = p.x;
        let textAnchor = "middle";

        if (labelPos === "high") {
            labelY = p.y - 22;
        } else if (labelPos === "extra_high") {
            labelY = p.y - 32;
        } else if (labelPos === "above") {
            labelY = p.y - 12;
        } else if (labelPos === "below") {
            labelY = p.y + 20;
        } else if (labelPos === "inline") {
            labelY = p.y + 4;
            labelX = p.x + 8;
            textAnchor = "start";
        } else {
            // Auto-Separated
            if (p.actY !== null && Math.abs(p.y - p.actY) < 32) {
                labelY = Math.min(p.y, p.actY) - 14;
            }
        }
        labelY = Math.max(18, labelY);

        const isBreached = targetBench !== null && !isNaN(targetBench) && p.val > targetBench;
        const nodeColor = isBreached ? "#ef4444" : "#3b82f6";
        const labelColor = isBreached ? "#ef4444" : "#60a5fa";

        if (isBreached) {
            svg += `<circle cx="${p.x}" cy="${p.y}" r="10" fill="rgba(239, 68, 68, 0.25)" stroke="#ef4444" stroke-width="1.5"/>`;
        }
        svg += `<circle cx="${p.x}" cy="${p.y}" r="6" fill="${nodeColor}" stroke="#ffffff" stroke-width="2" class="svg-node-req"/>`;
        if (showLabels) {
            svg += `<text x="${labelX}" y="${labelY}" fill="${labelColor}" class="svg-label-req" text-anchor="${textAnchor}" font-size="${fontSize}px" font-weight="${fontWeight}">${formattedVal}</text>`;
        }
    });

    // Actual Result nodes and labels
    actPoints.forEach(p => {
        const u = p.unit ? ` ${p.unit}` : "";
        const formattedVal = p.val.toLocaleString() + u;
        
        let labelY = p.y + 20;
        let labelX = p.x;
        let textAnchor = "middle";

        if (labelPos === "high") {
            labelY = p.y - 22;
        } else if (labelPos === "extra_high") {
            labelY = p.y - 32;
        } else if (labelPos === "above") {
            labelY = p.y - 12;
        } else if (labelPos === "below") {
            labelY = p.y + 20;
        } else if (labelPos === "inline") {
            labelY = p.y + 4;
            labelX = p.x + 8;
            textAnchor = "start";
        } else {
            // Auto-Separated
            if (p.reqY !== null && Math.abs(p.y - p.reqY) < 32) {
                labelY = Math.max(p.y, p.reqY) + 22;
            }
        }

        svg += `<circle cx="${p.x}" cy="${p.y}" r="6" class="svg-node-act"/>`;
        if (showLabels) {
            svg += `<text x="${labelX}" y="${labelY}" class="svg-label-act" text-anchor="${textAnchor}" font-size="${fontSize}px" font-weight="${fontWeight}">${formattedVal}</text>`;
        }
    });

    // Interactive Hover Slices for tooltips
    const isCompilerMode = (box.closest && box.closest('#tab-executive')) || (box.classList && box.classList.contains('compiler-chart-svg-box'));
    const currentKey = kpiKey || (box.id && box.id.includes("4") ? "kpi4" : (box.id && box.id.includes("1") ? "kpi1" : (box.id && box.id.includes("2") ? "kpi2" : (box.id && box.id.includes("3") ? "kpi3" : "kpi4"))));
    const tooltipTarget = isCompilerMode ? "repChartTooltip" : (box.id && box.id.includes("portfolio") ? ("portfolio" + currentKey.charAt(0).toUpperCase() + currentKey.slice(1) + "ChartTooltip") : (currentKey + "ChartTooltip"));

    parsedData.forEach((d, idx) => {
        const rawItem = logs[idx] || {};
        const sliceWidth = pointsCount > 1 ? xStep : chartWidth;
        const sliceX = pointsCount > 1 ? (paddingLeft + idx * xStep - sliceWidth / 2) : paddingLeft;

        const payload = {
            date: d.date ? formatChartXAxisDate(d.date) : (rawItem.date || rawItem.dateIssued || `P${idx + 1}`),
            valReq: d.valReq,
            valAct: d.valAct,
            unit: d.unit || rawItem.unit || '',
            ncrNo: rawItem.ncrNo || '',
            discipline: rawItem.discipline || rawItem.disc || '',
            subDiscipline: rawItem.subDiscipline || rawItem.subDisc || '',
            desc: rawItem.desc || rawItem.issue || rawItem.test || '',
            sub: rawItem.sub || rawItem.subcontractor || '',
            duration: rawItem.duration !== undefined ? rawItem.duration : d.valReq,
            status: rawItem.status || 'Closed',
            projectName: rawItem.projectName || rawItem.project || (appState.projects[appState.activeProjectId]?.name || ''),
            project: rawItem.projectName || rawItem.project || (appState.projects[appState.activeProjectId]?.name || ''),
            benchVal: d.benchVal
        };
        const jsonStr = JSON.stringify(payload).replace(/"/g, '&quot;');

        let enterFn = 'showKpi4Tooltip';
        let moveFn = 'moveKpi4Tooltip';
        let hideFn = 'hideKpi4Tooltip';
        if (currentKey === 'kpi1') { enterFn = 'showKpi1Tooltip'; moveFn = 'moveKpi1Tooltip'; hideFn = 'hideKpi1Tooltip'; }
        else if (currentKey === 'kpi2') { enterFn = 'showKpi2Tooltip'; moveFn = 'moveKpi2Tooltip'; hideFn = 'hideKpi2Tooltip'; }
        else if (currentKey === 'kpi3') { enterFn = 'showKpi3Tooltip'; moveFn = 'moveKpi3Tooltip'; hideFn = 'hideKpi3Tooltip'; }

        svg += `<rect x="${sliceX}" y="${paddingTop}" width="${sliceWidth}" height="${chartHeight}" fill="transparent" style="cursor: pointer;" onmouseenter="${enterFn}(event, ${jsonStr}, '${tooltipTarget}')" onmousemove="${moveFn}(event, '${tooltipTarget}')" onmouseleave="${hideFn}('${tooltipTarget}')"/>`;
    });

    // X-axis date labels with configurable angle & distance
    const isDense = xLabels.length >= 6 || xStep < 85;
    const useVertical = dateAngle === "vertical" || (dateAngle === "auto" && isDense);
    const useSlanted = dateAngle === "slanted";
    const xLabelY = height - paddingBottom + extraXOffset;

    xLabels.forEach(l => {
        if (useVertical) {
            svg += `<text x="${l.x}" y="${xLabelY}" transform="rotate(-90 ${l.x} ${xLabelY})" class="svg-axis-label" text-anchor="end" font-weight="${fontWeight}" style="font-size: ${fontSize}px;">${l.label}</text>`;
        } else if (useSlanted) {
            svg += `<text x="${l.x}" y="${xLabelY}" transform="rotate(-45 ${l.x} ${xLabelY})" class="svg-axis-label" text-anchor="end" font-weight="${fontWeight}" style="font-size: ${fontSize}px;">${l.label}</text>`;
        } else {
            svg += `<text x="${l.x}" y="${xLabelY}" class="svg-axis-label" text-anchor="middle" font-weight="${fontWeight}" style="font-size: ${fontSize}px;">${l.label}</text>`;
        }
    });

    svg += `</svg>`;
    box.innerHTML = svg;
}

// PORTFOLIO EXECUTIVE ANALYTICS RENDERER (ALL PROJECTS AGGREGATED)
function renderPortfolioProjectFilterOptions() {
    const filterSelect = document.getElementById("portfolioProjectFilter");
    if (!filterSelect) return;

    const currentSelected = filterSelect.value || "ALL";
    let html = `<option value="ALL">🌟 All Projects (Company Portfolio)</option>`;
    Object.values(appState.projects).forEach(p => {
        html += `<option value="${p.id}" ${p.id === currentSelected ? 'selected' : ''}>${p.name} (${p.code || 'N/A'})</option>`;
    });
    filterSelect.innerHTML = html;
}

function renderExecutiveAnalyticsBoxes() {
    renderPortfolioProjectFilterOptions();

    const projFilter = document.getElementById("portfolioProjectFilter")?.value || "ALL";
    const qFilter = document.getElementById("portfolioQuarterFilter")?.value || "ALL";
    const discFilter = document.getElementById("portfolioDisciplineFilter")?.value || "ALL";
    const subFilter = document.getElementById("portfolioSubDisciplineFilter")?.value || "ALL";

    const filters = { projFilter, qFilter, discFilter, subFilter };

    let targetProjects = [];
    if (projFilter === "ALL") targetProjects = Object.values(appState.projects);
    else if (appState.projects[projFilter]) targetProjects = [appState.projects[projFilter]];

    let allKpi1 = [], allKpi2 = [], allKpi3 = [], allKpi4 = [], allKpi5 = [];
    targetProjects.forEach(p => {
        allKpi1.push(...(p.kpi1_logs || []));
        allKpi2.push(...(p.kpi2_logs || []));
        allKpi3.push(...(p.kpi3_logs || []));
        allKpi4.push(...(p.kpi4_logs || []));
        allKpi5.push(...(p.kpi5_logs || []));
    });

    // PORTFOLIO KPI 1 LINE GRAPH
    const box1 = document.getElementById("portfolioKpi1LineChartBox");
    let logs1 = allKpi1;
    if (qFilter !== "ALL") logs1 = logs1.filter(l => l.quarter === qFilter);
    if (discFilter !== "ALL") logs1 = logs1.filter(l => l.discipline === discFilter);
    if (subFilter !== "ALL") logs1 = logs1.filter(l => l.subDiscipline === subFilter);
    
    if (box1) {
        logs1.sort((a, b) => new Date(a.dateRes || a.dateCond || "2026-01-01") - new Date(b.dateRes || b.dateCond || "2026-01-01"));
        renderGenericLineChart(box1, logs1, item => ({
            date: item.dateRes || item.dateCond || "2026-01-01",
            valReq: 30,
            valAct: parseInt(item.act) || 0,
            bench: 0.90
        }), "Design Req", "Actual Passed", 90);
    }
    renderPortfolioKPIEvaluationSummary("portfolioKpi1EvaluationBox", "kpi1", logs1, targetProjects, filters);

    // PORTFOLIO KPI 2 LINE GRAPH
    const box2 = document.getElementById("portfolioKpi2LineChartBox");
    let logs2 = allKpi2;
    if (qFilter !== "ALL") logs2 = logs2.filter(l => l.quarter === qFilter);
    if (discFilter !== "ALL") logs2 = logs2.filter(l => l.discipline === discFilter);
    if (subFilter !== "ALL") logs2 = logs2.filter(l => l.subDiscipline === subFilter);

    if (box2) {
        logs2.sort((a, b) => new Date(a.date || "2026-01-01") - new Date(b.date || "2026-01-01"));
        renderGenericLineChart(box2, logs2, item => {
            const qty = parseFloat(item.qty) || 1;
            const labor = parseFloat(item.labor) || 0;
            const mat = parseFloat(item.mat) || 0;
            const cost = (labor + mat) * qty;
            const appr = (parseFloat(item.approvedCost) !== undefined && !isNaN(parseFloat(item.approvedCost)) && parseFloat(item.approvedCost) > 0)
                ? parseFloat(item.approvedCost)
                : (cost > 0 ? cost * 25 : 100000);
            const rate = (cost / appr) * 100;
            return {
                date: item.date || "2026-01-01",
                valReq: rate,
                valAct: null,
                benchVal: 2.0,
                unit: "%"
            };
        }, "Breakdown Rework Rate (%)", null, 2.0);
    }
    renderPortfolioKPIEvaluationSummary("portfolioKpi2EvaluationBox", "kpi2", logs2, targetProjects, filters);

    // PORTFOLIO KPI 3 LINE GRAPH
    const box3 = document.getElementById("portfolioKpi3LineChartBox");
    let logs3 = allKpi3;
    if (qFilter !== "ALL") logs3 = logs3.filter(l => l.quarter === qFilter);
    if (discFilter !== "ALL") logs3 = logs3.filter(l => l.discipline === discFilter);
    if (subFilter !== "ALL") logs3 = logs3.filter(l => l.subDiscipline === subFilter);

    if (box3) {
        logs3.sort((a, b) => new Date(a.date || "2026-01-01") - new Date(b.date || "2026-01-01"));
        renderGenericLineChart(box3, logs3, item => ({
            date: item.date || "2026-01-01",
            valReq: parseFloat(item.area) || 0,
            valAct: null,
            benchVal: 25
        }), "Defect Area (m²)", null, null);
    }
    renderPortfolioKPIEvaluationSummary("portfolioKpi3EvaluationBox", "kpi3", logs3, targetProjects, filters);

    // PORTFOLIO KPI 4 LINE GRAPH
    const box4 = document.getElementById("portfolioKpi4LineChartBox");
    let logs4 = allKpi4;
    if (qFilter !== "ALL") logs4 = logs4.filter(l => l.quarter === qFilter);
    if (discFilter !== "ALL") logs4 = logs4.filter(l => l.discipline === discFilter);
    if (subFilter !== "ALL") logs4 = logs4.filter(l => l.subDiscipline === subFilter);

    if (box4) {
        logs4.sort((a, b) => new Date(a.dateIssued || "2026-01-01") - new Date(b.dateIssued || "2026-01-01"));
        renderGenericLineChart(box4, logs4, item => ({
            date: item.dateIssued || "2026-01-01",
            valReq: parseFloat(item.duration) || 0,
            valAct: null,
            benchVal: 7
        }), "NCR Duration (Days)", null, null);
    }
    renderPortfolioKPIEvaluationSummary("portfolioKpi4EvaluationBox", "kpi4", logs4, targetProjects, filters);

    // PORTFOLIO KPI 5 GRAPH & EVALUATION
    renderPortfolioKPI5Graph();
}

function renderPortfolioKPI5Graph() {
    const box5 = document.getElementById("portfolioKpi5LineChartBox");
    if (!box5) return;

    const selectEl = document.getElementById("portfolioKpi5ViewModeSelect");
    const mode = (appState.graphSettings?.portfolioKpi5?.viewMode) || (selectEl ? selectEl.value : "burndown");
    if (selectEl) selectEl.value = mode;

    // Sync portfolio toggle buttons
    const btnBurn = document.getElementById("portfolioKpi5BtnBurndown");
    const btnDisc = document.getElementById("portfolioKpi5BtnDiscipline");
    const btnSched = document.getElementById("portfolioKpi5BtnTargetSchedule");
    if (btnBurn) btnBurn.classList.toggle("active", mode === "burndown");
    if (btnDisc) btnDisc.classList.toggle("active", mode === "discipline");
    if (btnSched) btnSched.classList.toggle("active", mode === "targetSchedule");

    updateKPI5LegendUI(mode, "portfolioKpi5ChartLegend");

    const projFilter = document.getElementById("portfolioProjectFilter")?.value || "ALL";
    const qFilter = document.getElementById("portfolioQuarterFilter")?.value || "ALL";
    const discFilter = document.getElementById("portfolioDisciplineFilter")?.value || "ALL";
    const subFilter = document.getElementById("portfolioSubDisciplineFilter")?.value || "ALL";

    const filters = { projFilter, qFilter, discFilter, subFilter };

    let targetProjects = [];
    if (projFilter === "ALL") targetProjects = Object.values(appState.projects);
    else if (appState.projects[projFilter]) targetProjects = [appState.projects[projFilter]];

    let allKpi5 = [];
    targetProjects.forEach(p => {
        allKpi5.push(...(p.kpi5_logs || []));
    });

    let logs = allKpi5;
    if (qFilter !== "ALL") logs = logs.filter(l => l.quarter === qFilter);
    if (discFilter !== "ALL") logs = logs.filter(l => l.discipline === discFilter);
    if (subFilter !== "ALL") logs = logs.filter(l => l.subDiscipline === subFilter);

    if (mode === "discipline") {
        renderKPI5StackedBarChart(box5, logs);
    } else if (mode === "targetSchedule") {
        renderKPI5TargetScheduleChart(box5, logs);
    } else {
        renderKPI5BurnDownChart(box5, logs);
    }

    renderPortfolioKPIEvaluationSummary("portfolioKpi5EvaluationBox", "kpi5", logs, targetProjects, filters);
}

function renderPortfolioKPIEvaluationSummary(containerId, kpiKey, logs, targetProjects, filters) {
    const box = document.getElementById(containerId);
    if (!box) return;

    const { projFilter, qFilter, discFilter, subFilter } = filters;
    const scopeName = projFilter === "ALL" ? "🌟 All Projects (Portfolio)" : (appState.projects[projFilter]?.name || "Active Project");
    const qName = qFilter === "ALL" ? "Full Year Baseline" : qFilter;
    const discName = discFilter === "ALL" ? "All Disciplines" : discFilter;
    const subDiscName = subFilter === "ALL" ? "All Sub-Disciplines" : subFilter;

    let title = "";
    let ratingBadge = "";
    let ratingClass = "badge-green";
    let statusColor = "#10b981";
    let primaryMetricLabel = "";
    let primaryMetricVal = "";
    let primaryMetricSub = "";
    let benchmarkVal = "";
    let varianceText = "";
    let appraisalText = "";
    let directiveText = "";

    if (kpiKey === "kpi1") {
        title = "1. First-Time Quality (FTQ) Testing";
        const total = logs.length;
        const passed = logs.filter(l => (l.remarks || 'Pass').toString().trim().toLowerCase() === 'pass').length;
        const failed = total - passed;
        const ftqPct = total > 0 ? (passed / total) * 100 : 0;
        primaryMetricLabel = "First-Time Pass Rate";
        primaryMetricVal = `${ftqPct.toFixed(1)}%`;
        primaryMetricSub = `${passed} / ${total} Tests Passed`;
        benchmarkVal = "≥ 90.0% Target (95% ISO)";

        if (total === 0) {
            ratingBadge = "⚪ No Logs Recorded";
            ratingClass = "badge-muted";
            statusColor = "#94a3b8";
            varianceText = "No test records in selected scope";
            appraisalText = `No QA/QC testing logs are recorded for ${discName} (${subDiscName}) in ${scopeName} during ${qName}.`;
            directiveText = `Ensure quality field engineers record all required technical inspections and lab test results for ${discName}.`;
        } else if (ftqPct >= 95.0) {
            ratingBadge = "🟢 Excellent Compliance";
            ratingClass = "badge-green";
            statusColor = "#10b981";
            varianceText = `+${(ftqPct - 90.0).toFixed(1)}% Above 90% Benchmark`;
            appraisalText = `Outstanding first-time testing pass velocity (${ftqPct.toFixed(1)}%) with ${passed} of ${total} tests certified on initial inspection. Workmanship conforms to ISO quality standards.`;
            directiveText = `Maintain strict pre-pour inspections, batch material testing certifications, and supervisor quality sign-offs.`;
        } else if (ftqPct >= 90.0) {
            ratingBadge = "🟢 On-Track (Acceptable)";
            ratingClass = "badge-green";
            statusColor = "#10b981";
            varianceText = `+${(ftqPct - 90.0).toFixed(1)}% Above Benchmark`;
            appraisalText = `Testing pass rate (${ftqPct.toFixed(1)}%) meets the minimum 90.0% threshold. ${failed} failed tests required re-testing/material replacement.`;
            directiveText = `Continue rigorous trade oversight for ${discName} and audit recurring failure patterns to elevate performance toward 95%.`;
        } else {
            ratingBadge = "🔴 Deficient / Action Required";
            ratingClass = "badge-red";
            statusColor = "#ef4444";
            varianceText = `-${(90.0 - ftqPct).toFixed(1)}% Below Benchmark`;
            appraisalText = `Critical quality deficit: Pass velocity (${ftqPct.toFixed(1)}%) fell below corporate 90.0% benchmark with ${failed} test failures identified in ${subDiscName}.`;
            directiveText = `Mandate immediate supplier batch audits, suspend non-compliant trade activities, and implement 100% pre-inspection checklist sign-offs.`;
        }
    } else if (kpiKey === "kpi2") {
        title = "2. Quality Rework BOQ Expenditure (% Approved Item Cost)";
        const scopeBudget = targetProjects.reduce((sum, p) => sum + (parseFloat(p.budget) || 0), 0) || 1;
        let totalApproved = 0;
        const totalRework = logs.reduce((sum, l) => {
            const qty = parseFloat(l.qty) || 1;
            const labor = parseFloat(l.labor) || 0;
            const mat = parseFloat(l.mat) || 0;
            totalApproved += (parseFloat(l.approvedCost) !== undefined && !isNaN(parseFloat(l.approvedCost)) ? parseFloat(l.approvedCost) : 0);
            return sum + (labor + mat) * qty;
        }, 0);
        const reworkBasis = totalApproved > 0 ? totalApproved : scopeBudget;
        const reworkPct = (totalRework / reworkBasis) * 100;
        const maxCap = reworkBasis * 0.02;
        primaryMetricLabel = "Cumulative Rework Cost";
        primaryMetricVal = `₱${totalRework.toLocaleString()}`;
        primaryMetricSub = `${reworkPct.toFixed(2)}% of ₱${reworkBasis.toLocaleString()} Approved Item Cost`;
        benchmarkVal = "< 2.00% of Approved Item Contract Cost";

        if (logs.length === 0) {
            ratingBadge = "🟢 Zero Rework (Superior)";
            ratingClass = "badge-green";
            statusColor = "#10b981";
            varianceText = "-2.00% Below Limit";
            appraisalText = `Zero rework cost recorded for ${discName} across ${scopeName}. Initial construction packages executed without rework.`;
            directiveText = `Preserve trade coordination best practices and continue mandatory pre-construction mock-ups.`;
        } else if (reworkPct <= 1.0) {
            ratingBadge = "🟢 Strictly Controlled";
            ratingClass = "badge-green";
            statusColor = "#10b981";
            varianceText = `-${(2.0 - reworkPct).toFixed(2)}% Within Cap`;
            appraisalText = `Rework cost (₱${totalRework.toLocaleString()}) is tightly controlled at ${reworkPct.toFixed(2)}% of the approved item contract cost (₱${reworkBasis.toLocaleString()}), well within the 2.0% ceiling.`;
            directiveText = `Sustain active supervisory inspection routines and verify trade submittals prior to full installation.`;
        } else if (reworkPct <= 2.0) {
            ratingBadge = "🟡 Acceptable Tolerance";
            ratingClass = "badge-yellow";
            statusColor = "#f59e0b";
            varianceText = `-${(2.0 - reworkPct).toFixed(2)}% Margin Remaining`;
            appraisalText = `Rework expenditures (₱${totalRework.toLocaleString()} | ${reworkPct.toFixed(2)}% of approved item cost) approach the upper tolerance limit. Requires heightened scrutiny on ${discName}.`;
            directiveText = `Enforce trade backcharge mechanisms and require formal approval from QA/QC Director for any additional rework work orders.`;
        } else {
            ratingBadge = "🔴 Approved Cost Cap Breached";
            ratingClass = "badge-red";
            statusColor = "#ef4444";
            varianceText = `+${(reworkPct - 2.0).toFixed(2)}% Over Limit`;
            appraisalText = `Financial quality breach: Rework BOQ costs (₱${totalRework.toLocaleString()}) have exceeded the 2.0% safety limit of approved item contract cost (₱${maxCap.toLocaleString()}), creating cost overruns.`;
            directiveText = `Freeze unauthorized rework billings, issue formal Subcontractor Breach Notices, and implement mandatory Root Cause Corrective Actions (RCCA).`;
        }
    } else if (kpiKey === "kpi3") {
        title = "3. Workmanship Defect Density & Surface Protection";
        const totalSnags = logs.reduce((sum, l) => sum + (parseFloat(l.defectCount) !== undefined && !isNaN(parseFloat(l.defectCount)) ? parseFloat(l.defectCount) : (parseFloat(l.defects) || 1)), 0);
        const totalDefectArea = logs.reduce((sum, l) => sum + (parseFloat(l.area) || 0), 0);
        const inspectedArea = logs.reduce((sum, l) => sum + (parseFloat(l.totalInspectedArea) || parseFloat(l.totalArea) || 1000), 0);
        const density = inspectedArea > 0 ? (totalSnags / (inspectedArea / 100)) : 0;
        primaryMetricLabel = "Workmanship Defect Density";
        primaryMetricVal = `${density.toFixed(2)} / 100 m²`;
        primaryMetricSub = `${totalSnags} Defects across ${inspectedArea.toLocaleString()} m²`;
        benchmarkVal = "< 2.00 Defects per 100 m²";

        if (logs.length === 0) {
            ratingBadge = "🟢 Zero Defects Logged";
            ratingClass = "badge-green";
            statusColor = "#10b981";
            varianceText = "No defects logged in scope";
            appraisalText = `No surface or workmanship defects logged for ${discName} in ${scopeName}. Clean inspection audits recorded.`;
            directiveText = `Maintain daily walkthrough inspections and preserve finished surface protection protocols.`;
        } else if (density <= 1.0) {
            ratingBadge = "🟢 Superior Workmanship";
            ratingClass = "badge-green";
            statusColor = "#10b981";
            varianceText = `-${(2.0 - density).toFixed(2)} Below Max Benchmark`;
            appraisalText = `Low defect occurrence (${density.toFixed(2)}/100m²) demonstrates sound workmanship and robust surface protection in ${discName}.`;
            directiveText = `Continue daily trade quality sign-offs and protect completed work during multi-trade overlaps.`;
        } else if (density <= 2.0) {
            ratingBadge = "🟡 Acceptable Density";
            ratingClass = "badge-yellow";
            statusColor = "#f59e0b";
            varianceText = `Within 2.00/100m² Threshold`;
            appraisalText = `Defect density (${density.toFixed(2)}/100m²) is within acceptable limits. Minor cosmetic and finishing snags noted in ${subDiscName}.`;
            directiveText = `Increase trade supervisor walkthrough frequency and ensure corrective punch items are resolved within 48 hours.`;
        } else {
            ratingBadge = "🔴 Excessive Snag Rate";
            ratingClass = "badge-red";
            statusColor = "#ef4444";
            varianceText = `+${(density - 2.0).toFixed(2)} Above Benchmark`;
            appraisalText = `Defect frequency (${density.toFixed(2)}/100m² | ${totalSnags} defects) exceeds the corporate 2.0 benchmark, indicating recurring trade workmanship failures.`;
            directiveText = `Mandate trade retraining, enforce first-piece inspection approval, and penalize repeat workmanship defects.`;
        }
    } else if (kpiKey === "kpi4") {
        title = "4. Non-Conformance Reports (NCR) Turnaround Time";
        const totalNCR = logs.length;
        const openNCR = logs.filter(l => (l.status || 'Open').toLowerCase() !== 'closed').length;
        const closedNCR = totalNCR - openNCR;
        const avgDur = totalNCR > 0 ? (logs.reduce((sum, l) => sum + (parseFloat(l.duration) || 0), 0) / totalNCR) : 0;
        primaryMetricLabel = "Average Resolution Time";
        primaryMetricVal = `${avgDur.toFixed(1)} Days`;
        primaryMetricSub = `${closedNCR} Closed | ${openNCR} Active Open NCRs`;
        benchmarkVal = "≤ 7.0 Days SLA Resolution Limit";

        if (totalNCR === 0) {
            ratingBadge = "🟢 Zero NCRs (Compliant)";
            ratingClass = "badge-green";
            statusColor = "#10b981";
            varianceText = "No Non-Conformances Issued";
            appraisalText = `No non-conformance reports issued for ${discName} in ${scopeName}. Full adherence to engineering specifications.`;
            directiveText = `Maintain strict quality control to prevent non-conforming conditions.`;
        } else if (avgDur <= 5.0 && openNCR === 0) {
            ratingBadge = "🟢 Rapid Resolution (≤ 5 Days)";
            ratingClass = "badge-green";
            statusColor = "#10b981";
            varianceText = `-${(7.0 - avgDur).toFixed(1)} Days Under SLA Limit`;
            appraisalText = `Excellent turnaround velocity: All ${totalNCR} NCRs were resolved in an average of ${avgDur.toFixed(1)} days with 0 active backlog.`;
            directiveText = `Sustain streamlined engineering sign-off workflows and fast-track contractor rectification reviews.`;
        } else if (avgDur <= 7.0) {
            ratingBadge = "🟡 On-Time SLA (≤ 7 Days)";
            ratingClass = "badge-yellow";
            statusColor = "#f59e0b";
            varianceText = `Within 7.0-Day SLA Window`;
            appraisalText = `NCR resolution turnaround (${avgDur.toFixed(1)} days) conforms to corporate SLA standards (${closedNCR} closed, ${openNCR} pending).`;
            directiveText = `Expedite the remaining ${openNCR} open NCRs in weekly coordination meetings to avoid handover bottlenecks.`;
        } else {
            ratingBadge = "🔴 Delayed SLA / Overdue";
            ratingClass = "badge-red";
            statusColor = "#ef4444";
            varianceText = `+${(avgDur - 7.0).toFixed(1)} Days Overdue SLA`;
            appraisalText = `SLA breach: NCR corrective resolution timeline (${avgDur.toFixed(1)} days) exceeds the 7.0-day limit with ${openNCR} open non-conformances active.`;
            directiveText = `Escalate overdue NCRs directly to the Project Director and hold progress billing approvals until full engineering verification.`;
        }
    } else if (kpiKey === "kpi5") {
        title = "5. Handover Punch List Target Clearance";
        const totalPunch = logs.length;
        const openCrit = logs.filter(l => l.cat === "Critical" && l.status !== "Signed-off" && l.status !== "Closed" && l.status !== "Rectified").length;
        const openMinor = logs.filter(l => l.cat !== "Critical" && l.status !== "Signed-off" && l.status !== "Closed" && l.status !== "Rectified").length;
        const closedPunch = totalPunch - openCrit - openMinor;
        const nowMs = Date.now();
        let overduePunch = 0;
        logs.forEach(l => {
            const isClosed = l.status === "Signed-off" || l.status === "Closed" || l.status === "Rectified";
            if (isClosed) {
                if (l.targetDate && l.actualDateRectified && new Date(l.actualDateRectified).getTime() > new Date(l.targetDate).getTime()) {
                    overduePunch++;
                }
            } else {
                if (l.targetDate && new Date(l.targetDate).getTime() < nowMs) {
                    overduePunch++;
                }
            }
        });
        const onTimeRate = totalPunch > 0 ? Math.max(0, Math.round(((totalPunch - overduePunch) / totalPunch) * 100)) : 100;
        primaryMetricLabel = "Target Clearance Compliance";
        primaryMetricVal = `${onTimeRate}% On-Time`;
        primaryMetricSub = `${closedPunch}/${totalPunch} Cleared (${openCrit} Crit, ${overduePunch} Overdue)`;
        benchmarkVal = "100% On-Time Clearance & 0 Critical";

        if (totalPunch === 0) {
            ratingBadge = "🟢 Clean Turnover";
            ratingClass = "badge-green";
            statusColor = "#10b981";
            varianceText = "Zero snags recorded";
            appraisalText = `No punch list defects recorded for ${discName} in ${scopeName}. Handover readiness satisfied.`;
            directiveText = `Coordinate with the client representative for joint completion walk-through inspection.`;
        } else if (openCrit === 0 && overduePunch === 0 && openMinor === 0) {
            ratingBadge = "🟢 100% Cleared On-Time (Ready)";
            ratingClass = "badge-green";
            statusColor = "#10b981";
            varianceText = "100% Cleared within Target Schedule";
            appraisalText = `All ${totalPunch} punch list items are fully rectified on or before scheduled target clearance dates. 100% on-time clearance achieved for ${discName}.`;
            directiveText = `Issue formal QA/QC Handover Clearance Certificate to client engineering management.`;
        } else if (openCrit === 0 && onTimeRate >= 90) {
            ratingBadge = "🟢 On-Time Clearance (0 Critical)";
            ratingClass = "badge-green";
            statusColor = "#10b981";
            varianceText = `${onTimeRate}% On-Time Clearance Rate`;
            appraisalText = `Zero critical punch items active and ${onTimeRate}% of punch items are on schedule within target clearance. Project satisfies corporate handover gating criteria. ${openMinor} minor cosmetic snags remain.`;
            directiveText = `Deploy finishing painters/installers to close the remaining ${openMinor} minor items during final demobilization.`;
        } else if (openCrit === 0) {
            ratingBadge = "🟡 Schedule Delayed (0 Critical)";
            ratingClass = "badge-yellow";
            statusColor = "#f59e0b";
            varianceText = `${overduePunch} Snag(s) Past Target Clearance`;
            appraisalText = `Zero critical snags; however, ${overduePunch} punch items have breached their scheduled target clearance date (${onTimeRate}% on-time rate).`;
            directiveText = `Expedite subcontractor snag rectification to clear overdue punch items before client turnover inspection.`;
        } else {
            ratingBadge = "🔴 Turnover Blocked (Critical)";
            ratingClass = "badge-red";
            statusColor = "#ef4444";
            varianceText = `${openCrit} Critical Snags Blocking Turnover`;
            appraisalText = `Turnover gatekeeper violated: ${openCrit} critical punch list items remain active in ${discName}, blocking formal client handover.`;
            directiveText = `Deploy dedicated emergency trade strike-teams to clear all ${openCrit} critical snags with mandatory QA/QC sign-off before re-inspection.`;
        }
    }

    box.innerHTML = `
        <div class="portfolio-eval-header">
            <div class="portfolio-eval-title">
                <span class="eval-badge ${ratingClass}">${ratingBadge}</span>
                <strong>${title} Quality Appraisal</strong>
            </div>
            <div class="portfolio-eval-scope">
                <span>🏗️ <strong>${scopeName}</strong></span>
                <span>🔧 <strong>${discName}</strong></span>
                <span>⚙️ <strong>${subDiscName}</strong></span>
                <span>📅 <strong>${qName}</strong></span>
            </div>
        </div>
        <div class="portfolio-eval-grid">
            <div class="portfolio-eval-metric-col">
                <div class="eval-stat-box">
                    <span class="eval-stat-label">${primaryMetricLabel}</span>
                    <span class="eval-stat-val" style="color: ${statusColor};">${primaryMetricVal}</span>
                    <span class="eval-stat-sub">${primaryMetricSub}</span>
                </div>
                <div class="eval-stat-box">
                    <span class="eval-stat-label">Corporate Benchmark</span>
                    <span class="eval-stat-val" style="font-size: 13px;">${benchmarkVal}</span>
                    <span class="eval-stat-sub" style="color: ${statusColor}; font-weight: 600;">${varianceText}</span>
                </div>
            </div>
            <div class="portfolio-eval-narrative-col">
                <div class="eval-narrative-item">
                    <strong>📋 Performance Appraisal &amp; Root Cause Analysis:</strong>
                    <p style="margin: 0;">${appraisalText}</p>
                </div>
                <div class="eval-narrative-item">
                    <strong>🎯 Executive Quality Directive &amp; Corrective Measures:</strong>
                    <p style="margin: 0;">${directiveText}</p>
                </div>
            </div>
        </div>
    `;
}

// CALCULATIONS, RCA & SUMMARY
function calculateAllKPIs() {
    const proj = appState.projects[appState.activeProjectId];
    if (!proj) return;

    const budget = proj.budget || 1;
    const area = proj.area || 1;

    const kpi1Logs = proj.kpi1_logs || [];
    const totalConducted = kpi1Logs.length;
    let passCount = 0;
    kpi1Logs.forEach(l => {
        if (l.remarks === "Pass") passCount++;
    });
    const ftqVal = totalConducted > 0 ? (passCount / totalConducted) * 100 : 100;
    let ftqStatus = "green";
    if (ftqVal < 90) ftqStatus = "red";
    else if (ftqVal < 95) ftqStatus = "yellow";

    const kpi2Logs = proj.kpi2_logs || [];
    let totalReworkCost = 0;
    let totalApprovedCost = 0;
    kpi2Logs.forEach(l => {
        const qty = parseFloat(l.qty) || 1;
        const labor = parseFloat(l.labor) || 0;
        const mat = parseFloat(l.mat) || 0;
        totalReworkCost += (labor + mat) * qty;
        totalApprovedCost += (parseFloat(l.approvedCost) !== undefined && !isNaN(parseFloat(l.approvedCost)) ? parseFloat(l.approvedCost) : 0);
    });
    const reworkBasis = totalApprovedCost > 0 ? totalApprovedCost : budget;
    const reworkRateVal = (totalReworkCost / reworkBasis) * 100;
    let reworkStatus = "green";
    if (reworkRateVal > 2.0) reworkStatus = "red";
    else if (reworkRateVal >= 1.0) reworkStatus = "yellow";

    const kpi3Logs = proj.kpi3_logs || [];
    const totalDefectsCount = kpi3Logs.length;
    const defectDensityVal = (totalDefectsCount / area) * 100;
    let defectStatus = "green";
    if (defectDensityVal > 2.0) defectStatus = "red";
    else if (defectDensityVal >= 1.5) defectStatus = "yellow";

    const kpi4Logs = proj.kpi4_logs || [];
    let totalNCRDays = 0, closedCount = 0, openCount = 0;
    kpi4Logs.forEach(l => {
        if (l.status === "Closed" || l.status === "Resolved") {
            closedCount++;
            totalNCRDays += parseFloat(l.duration) || 0;
        } else {
            openCount++;
        }
    });
    const avgNCRDaysVal = closedCount > 0 ? (totalNCRDays / closedCount) : 0;
    let ncrStatus = "green";
    if (avgNCRDaysVal > 7.0) ncrStatus = "red";
    else if (avgNCRDaysVal > 5.0) ncrStatus = "yellow";

    const kpi5Logs = proj.kpi5_logs || [];
    let critPunch = 0, minorPunch = 0, closedPunch = 0, overduePunch = 0;
    const nowMs = Date.now();
    kpi5Logs.forEach(l => {
        const isClosed = l.status === "Signed-off" || l.status === "Closed" || l.status === "Rectified";
        if (isClosed) {
            closedPunch++;
            if (l.targetDate && l.actualDateRectified && new Date(l.actualDateRectified).getTime() > new Date(l.targetDate).getTime()) {
                overduePunch++;
            }
        } else {
            if (l.cat === "Critical") critPunch++;
            else minorPunch++;
            if (l.targetDate && new Date(l.targetDate).getTime() < nowMs) {
                overduePunch++;
            }
        }
    });
    const totalPunch = kpi5Logs.length;
    const onTimeRate = totalPunch > 0 ? Math.max(0, Math.round(((totalPunch - overduePunch) / totalPunch) * 100)) : 100;
    let punchStatus = "green";
    if (critPunch > 0 || onTimeRate < 70) punchStatus = "red";
    else if (onTimeRate < 90 || minorPunch > 10) punchStatus = "yellow";

    updateCardUI(1, `${ftqVal.toFixed(1)}%`, Math.min(100, ftqVal), ftqStatus, `Passed: ${passCount} / ${totalConducted} Tests Conducted`);
    updateCardUI(2, `${reworkRateVal.toFixed(2)}%`, Math.min(100, (reworkRateVal / 2.0) * 100), reworkStatus, `Rework: ₱${totalReworkCost.toLocaleString()} / Approved: ₱${reworkBasis.toLocaleString()}`);
    updateCardUI(3, `${defectDensityVal.toFixed(2)}`, Math.min(100, (defectDensityVal / 2.0) * 100), defectStatus, `Total Defect Items: ${totalDefectsCount}`);
    updateCardUI(4, closedCount > 0 ? `${avgNCRDaysVal.toFixed(1)} Days` : "No Closed NCRs", Math.min(100, (avgNCRDaysVal / 7.0) * 100), ncrStatus, `Resolved: ${closedCount} | Open: ${openCount}`);
    updateCardUI(5, `${onTimeRate}% On-Time`, onTimeRate, punchStatus, `${closedPunch}/${totalPunch} Cleared (${critPunch} Crit, ${overduePunch} Overdue)`);

    // Update Quarterly Radar Web Dashboard in Tab 1
    renderQuarterlyRadarDashboard();

    if (appState.activeTab === "tab-executive") {
        compileExecutiveReport();
    }

    if (appState.activeTab === "tab-kpi1") { renderKPI1Grid(); renderKPI1LineGraph(); }
    else if (appState.activeTab === "tab-kpi2") { renderKPI2Grid(); renderKPI2LineGraph(); }
    else if (appState.activeTab === "tab-kpi3") { renderKPI3Grid(); renderKPI3LineGraph(); }
    else if (appState.activeTab === "tab-kpi4") { renderKPI4Grid(); renderKPI4LineGraph(); }
    else if (appState.activeTab === "tab-kpi5") { renderKPI5Grid(); renderKPI5LineGraph(); }
    else if (appState.activeTab === "tab-analytics") { renderExecutiveAnalyticsBoxes(); }
    else if (appState.activeTab === "tab-executive") { compileExecutiveReport(); }
    else if (appState.activeTab === "tab-comprehension") { renderGraphComprehensionTab(); }
}

function updateCardUI(id, valText, progressPct, status, footnoteText) {
    const valEl = document.getElementById(`actualValue${id}`);
    const badgeEl = document.getElementById(`kpiBadge${id}`);
    const barEl = document.getElementById(`progressBar${id}`);
    const footEl = document.getElementById(`kpiFootnote${id}`);

    if (valEl) valEl.innerText = valText;
    if (footEl) footEl.innerText = footnoteText;
    if (badgeEl) {
        badgeEl.className = `status-badge badge-${status}`;
        badgeEl.innerText = status === "green" ? "ON TARGET" : (status === "yellow" ? "NEAR TARGET" : "ACTION REQUIRED");
    }
    if (barEl) {
        barEl.style.width = `${progressPct}%`;
        barEl.className = `progress-bar-fill fill-${status}`;
    }
}

// ==========================================================================
// 🎯 QUARTERLY QUALITY KPI RADAR (WEB) CHART & PERFORMANCE STATUS ENGINE
// ==========================================================================

const RADAR_METRIC_CONFIGS = [
    {
        id: "kpi1",
        name: "First-Time Pass Rate (FTQ)",
        shortName: "FTQ Pass Rate",
        category: "Execution",
        categoryIcon: "⚡",
        passThreshold: 95,
        targetDisplay: "≥ 95.0%",
        formulaDesc: "Direct percentage scale (Pass Score: ≥ 95/100)",
        color: "#3b82f6"
    },
    {
        id: "kpi2",
        name: "Quality Rework Rate (% Approved Item Cost)",
        shortName: "Rework Cost Rate",
        category: "Financial",
        categoryIcon: "💰",
        passThreshold: 50,
        targetDisplay: "< 2.00% of Approved Cost",
        formulaDesc: "Inverse scale based on Approved Item Contract Cost: max(0, 100 - (Actual% * 25)); Pass = 50% score",
        color: "#2563eb"
    },
    {
        id: "kpi3",
        name: "Defect Density (per 100 sq.m)",
        shortName: "Defect Density",
        category: "Detection",
        categoryIcon: "🔍",
        passThreshold: 60,
        targetDisplay: "< 2.00 per 100 m²",
        formulaDesc: "Inverse scale: max(0, 100 - (Defects * 20)); Pass = 60% score",
        color: "#10b981"
    },
    {
        id: "kpi4",
        name: "NCR Resolution Time",
        shortName: "NCR Resolution",
        category: "Responsiveness",
        categoryIcon: "⏱️",
        passThreshold: 70,
        targetDisplay: "≤ 5.0–7.0 Days",
        formulaDesc: "Inverse scale: ≤ 5d = 100, 7d = 70 score; Pass = 70% score",
        color: "#f59e0b"
    },
    {
        id: "kpi5",
        name: "Handover Punch List Clearance",
        shortName: "Punch List Clearance",
        category: "Satisfaction",
        categoryIcon: "🛡️",
        passThreshold: 75,
        targetDisplay: "100% Target Clearance (0 Crit)",
        formulaDesc: "On-time clearance rate on/before target date + Zero (0) open critical snags (Pass ≥ 75%)",
        color: "#ef4444"
    }
];

function calculateQuarterlyNormalizedScores(proj, targetQuarter) {
    if (!proj) return null;
    const bm = getBenchmarkConfig();
    const budget = proj.budget || 1;
    const area = proj.area || 1;

    const qFilter = (q) => {
        if (!targetQuarter || targetQuarter === "ALL" || targetQuarter === "FY") return true;
        return q === targetQuarter;
    };

    // 1. FTQ (Execution)
    const kpi1Logs = (proj.kpi1_logs || []).filter(l => qFilter(l.quarter));
    const totalTests = kpi1Logs.length;
    let passedTests = 0;
    kpi1Logs.forEach(l => { if (l.remarks === "Pass") passedTests++; });
    const rawFTQ = totalTests > 0 ? (passedTests / totalTests) * 100 : 100;
    const scoreFTQ = Math.max(0, Math.min(100, rawFTQ));

    // 2. Rework Rate (Financial)
    const kpi2Logs = (proj.kpi2_logs || []).filter(l => qFilter(l.quarter));
    let totalReworkCost = 0;
    let totalApprovedCost = 0;
    kpi2Logs.forEach(l => {
        const qty = parseFloat(l.qty) || 1;
        const labor = parseFloat(l.labor) || 0;
        const mat = parseFloat(l.mat) || 0;
        totalReworkCost += (labor + mat) * qty;
        totalApprovedCost += (parseFloat(l.approvedCost) !== undefined && !isNaN(parseFloat(l.approvedCost)) ? parseFloat(l.approvedCost) : 0);
    });
    const reworkBasis = totalApprovedCost > 0 ? totalApprovedCost : budget;
    const rawReworkPct = (totalReworkCost / reworkBasis) * 100;
    const kpi2Mult = parseFloat(bm.kpi2?.penaltyMultiplier) || 25.0;
    const scoreRework = Math.max(0, Math.min(100, 100 - (rawReworkPct * kpi2Mult)));

    // 3. Defect Density (Detection)
    const kpi3Logs = (proj.kpi3_logs || []).filter(l => qFilter(l.quarter));
    const totalDefects = kpi3Logs.length;
    const areaGrid = parseFloat(bm.kpi3?.areaGrid) || 100;
    const rawDefectDensity = (totalDefects / area) * areaGrid;
    const kpi3Mult = parseFloat(bm.kpi3?.penaltyMultiplier) || 20.0;
    const scoreDefects = Math.max(0, Math.min(100, 100 - (rawDefectDensity * kpi3Mult)));

    // 4. NCR Resolution Time (Responsiveness)
    const kpi4Logs = (proj.kpi4_logs || []).filter(l => qFilter(l.quarter));
    let closedNCR = 0, openNCR = 0, totalNCRDays = 0;
    kpi4Logs.forEach(l => {
        if (l.status === "Closed" || l.status === "Resolved" || l.status === "Rectified") {
            closedNCR++;
            totalNCRDays += parseFloat(l.duration) || 0;
        } else {
            openNCR++;
        }
    });
    const rawAvgNCRDays = closedNCR > 0 ? (totalNCRDays / closedNCR) : 0;
    const targetSLA = parseFloat(bm.kpi4?.targetSLA) || 5.0;
    const kpi4Mult = parseFloat(bm.kpi4?.penaltyMultiplier) || 15.0;
    let scoreNCR = 100;
    if (kpi4Logs.length > 0) {
        if (rawAvgNCRDays <= targetSLA) scoreNCR = 100;
        else scoreNCR = Math.max(0, Math.min(100, 100 - ((rawAvgNCRDays - targetSLA) * kpi4Mult)));
    }

    // 5. Handover Punch List Target Clearance (Satisfaction)
    const kpi5Logs = (proj.kpi5_logs || []).filter(l => qFilter(l.quarter));
    let critPunch = 0, minorPunch = 0, closedPunch = 0, overduePunch = 0;
    const nowMs = Date.now();
    kpi5Logs.forEach(l => {
        const isClosed = l.status === "Signed-off" || l.status === "Closed" || l.status === "Rectified";
        if (isClosed) {
            closedPunch++;
            if (l.targetDate && l.actualDateRectified && new Date(l.actualDateRectified).getTime() > new Date(l.targetDate).getTime()) {
                overduePunch++;
            }
        } else {
            if (l.cat === "Critical") critPunch++;
            else minorPunch++;
            if (l.targetDate && new Date(l.targetDate).getTime() < nowMs) {
                overduePunch++;
            }
        }
    });
    const totalPunch = kpi5Logs.length;
    const onTimeRate = totalPunch > 0 ? Math.max(0, Math.round(((totalPunch - overduePunch) / totalPunch) * 100)) : 100;
    const critCap = parseFloat(bm.kpi5?.criticalCap) !== undefined ? parseFloat(bm.kpi5?.criticalCap) : 50.0;
    const critDed = parseFloat(bm.kpi5?.criticalDeductor) !== undefined ? parseFloat(bm.kpi5?.criticalDeductor) : 25.0;
    let scorePunch = 100;
    if (totalPunch > 0) {
        if (critPunch === 0) {
            scorePunch = Math.max(60, Math.min(100, onTimeRate));
        } else {
            scorePunch = Math.max(0, Math.min(critCap, onTimeRate - (critPunch * critDed)));
        }
    }

    const passFtq = parseFloat(bm.kpi1?.passThreshold) || 95;
    const passRework = parseFloat(bm.kpi2?.passThreshold) || 50;
    const passDefects = parseFloat(bm.kpi3?.passThreshold) || 60;
    const passNCR = parseFloat(bm.kpi4?.passThreshold) || 70;
    const passPunch = parseFloat(bm.kpi5?.passThreshold) || 75;

    const metricsData = [
        {
            ...RADAR_METRIC_CONFIGS[0],
            passThreshold: passFtq,
            rawVal: rawFTQ,
            rawText: totalTests > 0 ? `${rawFTQ.toFixed(1)}% (${passedTests}/${totalTests} Passed)` : `100.0% (No tests in ${targetQuarter})`,
            score: scoreFTQ,
            isPass: scoreFTQ >= passFtq
        },
        {
            ...RADAR_METRIC_CONFIGS[1],
            passThreshold: passRework,
            rawVal: rawReworkPct,
            rawText: `${rawReworkPct.toFixed(2)}% (₱${totalReworkCost.toLocaleString()} / ₱${reworkBasis.toLocaleString()})`,
            score: scoreRework,
            isPass: scoreRework >= passRework
        },
        {
            ...RADAR_METRIC_CONFIGS[2],
            passThreshold: passDefects,
            rawVal: rawDefectDensity,
            rawText: `${rawDefectDensity.toFixed(2)} / 100m² (${totalDefects} defects)`,
            score: scoreDefects,
            isPass: scoreDefects >= passDefects
        },
        {
            ...RADAR_METRIC_CONFIGS[3],
            passThreshold: passNCR,
            rawVal: rawAvgNCRDays,
            rawText: closedNCR > 0 ? `${rawAvgNCRDays.toFixed(1)} Days (${closedNCR} closed, ${openNCR} open)` : (openNCR > 0 ? `${openNCR} Open NCRs` : `0.0 Days (All closed)`),
            score: scoreNCR,
            isPass: scoreNCR >= passNCR
        },
        {
            ...RADAR_METRIC_CONFIGS[4],
            passThreshold: passPunch,
            rawVal: onTimeRate,
            rawText: totalPunch > 0 ? `${onTimeRate}% On-Time (${closedPunch}/${totalPunch} Cleared, ${critPunch} Crit)` : `100% On-Time (No punch items in ${targetQuarter})`,
            score: scorePunch,
            isPass: scorePunch >= passPunch
        }
    ];

    const totalScore = metricsData.reduce((s, m) => s + m.score, 0);
    const compositeScore = totalScore / 5;
    const failedCount = metricsData.filter(m => !m.isPass).length;

    return {
        quarter: targetQuarter,
        metrics: metricsData,
        compositeScore,
        failedCount,
        overallPass: failedCount === 0
    };
}

function renderQuarterlyRadarDashboard() {
    const box = document.getElementById("overviewRadarChartBox");
    const tableBody = document.getElementById("radarStatusTableBody");
    const actionPanel = document.getElementById("radarActionSubPanel");
    if (!box || !tableBody) return;

    const proj = appState.projects[appState.activeProjectId];
    if (!proj) return;

    const quarterSelect = document.getElementById("radarQuarterSelect");
    const activeQuarter = quarterSelect ? quarterSelect.value : "Q1";

    const tagFocus = document.getElementById("radarTableFocusTag");
    if (tagFocus) {
        tagFocus.innerText = `Focus: ${activeQuarter === "ALL" ? "Full Year (YTD)" : activeQuarter + " 2026"}`;
    }

    // 1. Calculate current quarterly normalized scores
    const currentData = calculateQuarterlyNormalizedScores(proj, activeQuarter);
    if (!currentData) return;

    // 2. Calculate previous quarter for Q-o-Q Trend
    let prevQuarter = "Q1";
    if (activeQuarter === "Q2") prevQuarter = "Q1";
    else if (activeQuarter === "Q3") prevQuarter = "Q2";
    else if (activeQuarter === "Q4") prevQuarter = "Q3";
    const prevData = calculateQuarterlyNormalizedScores(proj, prevQuarter);

    // 3. Update Executive Summary Top Bar Cards
    const totalKpisEl = document.getElementById("radarTotalKpis");
    const scoreValEl = document.getElementById("radarOverallScore");
    const scoreBadgeEl = document.getElementById("radarOverallBadge");
    const scoreSubEl = document.getElementById("radarOverallSub");
    const failedValEl = document.getElementById("radarFailedCount");
    const failedSubEl = document.getElementById("radarFailedSub");

    if (totalKpisEl) totalKpisEl.innerText = "5 Core Metrics";
    if (scoreValEl) {
        scoreValEl.innerText = `${currentData.compositeScore.toFixed(1)}%`;
        scoreValEl.style.color = currentData.overallPass ? "#10b981" : (currentData.compositeScore >= 60 ? "#f59e0b" : "#ef4444");
    }
    if (scoreBadgeEl) {
        scoreBadgeEl.className = `status-badge ${currentData.overallPass ? "badge-green" : (currentData.compositeScore >= 60 ? "badge-yellow" : "badge-red")}`;
        scoreBadgeEl.innerText = currentData.overallPass ? "PASS (100%)" : (currentData.compositeScore >= 60 ? "ACCEPTABLE PROGRESS" : "ACTION REQUIRED");
    }
    if (scoreSubEl) {
        scoreSubEl.innerText = `${currentData.overallPass ? "All 5 core quality metrics meet benchmarks" : `${currentData.failedCount} metric(s) below passing threshold`}`;
    }
    if (failedValEl) {
        failedValEl.innerText = `${currentData.failedCount} / 5 Failed`;
        failedValEl.style.color = currentData.failedCount === 0 ? "#10b981" : "#ef4444";
    }
    if (failedSubEl) {
        failedSubEl.innerText = currentData.failedCount === 0 ? "100% Quality Targets Satisfied" : `${currentData.failedCount} KPI(s) Require Corrective Directives`;
    }

    // 4. Render Interactive SVG Radar (Spider/Web) Chart
    const width = box.clientWidth || 460;
    const height = 420;
    const cx = width / 2;
    const cy = 205;
    const R = Math.min(145, Math.min(width, height) * 0.35);

    const numAxes = 5;
    // Axis 0 at top (-PI/2), then clockwise step = 2*PI/5
    const getAngle = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / numAxes;

    const getPoint = (axisIdx, scorePct, customRadius = R) => {
        const angle = getAngle(axisIdx);
        const r = (scorePct / 100) * customRadius;
        return {
            x: cx + r * Math.cos(angle),
            y: cy + r * Math.sin(angle)
        };
    };

    let svg = `<svg width="100%" height="100%" viewBox="0 0 ${width} ${height}">`;

    // Gradients & Filter Defs
    svg += `
        <defs>
            <radialGradient id="radarCenterGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.15"/>
                <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.0"/>
            </radialGradient>
            <linearGradient id="radarFocusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.45"/>
                <stop offset="100%" stop-color="#10b981" stop-opacity="0.20"/>
            </linearGradient>
        </defs>
    `;

    // Center Ambient Glow Circle
    svg += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#radarCenterGlow)" />`;

    // 1. Concentric Background Web Polygons (20%, 40%, 60%, 80%, 100%)
    const ringLevels = [20, 40, 60, 80, 100];
    ringLevels.forEach((level) => {
        const ringPoints = [];
        for (let i = 0; i < numAxes; i++) {
            const pt = getPoint(i, level);
            ringPoints.push(`${pt.x},${pt.y}`);
        }
        const isOuter = level === 100;
        svg += `<polygon points="${ringPoints.join(' ')}" fill="${isOuter ? 'rgba(16, 185, 129, 0.08)' : 'transparent'}" stroke="var(--border-color, rgba(255,255,255,0.12))" stroke-width="${isOuter ? '1.5' : '1'}" stroke-dasharray="${isOuter ? 'none' : '3,3'}"/>`;
        
        // Scale labels along top axis
        const labelPt = getPoint(0, level);
        svg += `<text x="${labelPt.x + 4}" y="${labelPt.y + 11}" fill="var(--text-muted, #94a3b8)" font-size="9px" font-weight="600">${level}%</text>`;
    });

    // 2. Dual-Zone Background Fill (Red Failed Region vs Green Pass Region)
    const thresholdPoints = currentData.metrics.map((m, i) => getPoint(i, m.passThreshold));
    const threshPointsStr = thresholdPoints.map(p => `${p.x},${p.y}`).join(' ');

    // Failed Region (< Threshold boundary polygon)
    svg += `<polygon points="${threshPointsStr}" fill="rgba(239, 68, 68, 0.16)" stroke="rgba(239, 68, 68, 0.45)" stroke-width="1" stroke-dasharray="2,2"/>`;

    // 3. Radial Axis Spokes & Outer Labels
    for (let i = 0; i < numAxes; i++) {
        const tip = getPoint(i, 100);
        svg += `<line x1="${cx}" y1="${cy}" x2="${tip.x}" y2="${tip.y}" stroke="var(--border-color, rgba(255,255,255,0.2))" stroke-width="1.5"/>`;

        // Outer Axis Label position (R + 28px)
        const labelPos = getPoint(i, 100, R + 26);
        const m = currentData.metrics[i];
        
        let textAnchor = "middle";
        if (i === 1 || i === 2) textAnchor = "start";
        else if (i === 3 || i === 4) textAnchor = "end";

        svg += `
            <text x="${labelPos.x}" y="${labelPos.y - 4}" fill="var(--text-primary, #ffffff)" font-size="11px" font-weight="800" text-anchor="${textAnchor}">
                ${m.categoryIcon} ${m.shortName}
            </text>
            <text x="${labelPos.x}" y="${labelPos.y + 9}" fill="${m.isPass ? '#10b981' : '#ef4444'}" font-size="9.5px" font-weight="700" text-anchor="${textAnchor}">
                [${m.targetDisplay}]
            </text>
        `;
    }

    // 4. Threshold Boundary Polygon (Pass Reference Boundary)
    const showThreshold = document.getElementById("traceThreshold")?.checked !== false;
    if (showThreshold) {
        svg += `<polygon points="${threshPointsStr}" fill="none" stroke="#10b981" stroke-width="2.5" stroke-dasharray="5,4" opacity="0.95"/>`;
        thresholdPoints.forEach(p => {
            svg += `<circle cx="${p.x}" cy="${p.y}" r="3" fill="#10b981" stroke="#ffffff" stroke-width="1"/>`;
        });
    }

    // 5. Quarterly Trace Overlays (Q1, Q2, Q3, Q4)
    const quarterTraces = [
        { q: "Q1", id: "traceQ1", color: "#3b82f6" },
        { q: "Q2", id: "traceQ2", color: "#10b981" },
        { q: "Q3", id: "traceQ3", color: "#f59e0b" },
        { q: "Q4", id: "traceQ4", color: "#a855f7" }
    ];

    quarterTraces.forEach(t => {
        const isChecked = document.getElementById(t.id)?.checked;
        if (isChecked && t.q !== activeQuarter) {
            const qData = calculateQuarterlyNormalizedScores(proj, t.q);
            if (qData) {
                const qPoints = qData.metrics.map((m, i) => getPoint(i, m.score));
                const qPointsStr = qPoints.map(p => `${p.x},${p.y}`).join(' ');
                svg += `<polygon points="${qPointsStr}" fill="none" stroke="${t.color}" stroke-width="2" stroke-dasharray="4,3" opacity="0.85"/>`;
                qPoints.forEach(p => {
                    svg += `<circle cx="${p.x}" cy="${p.y}" r="3.5" fill="${t.color}" stroke="#ffffff" stroke-width="1"/>`;
                });
            }
        }
    });

    // 6. Active Focus Quarter Data Polygon
    const focusPoints = currentData.metrics.map((m, i) => getPoint(i, m.score));
    const focusPointsStr = focusPoints.map(p => `${p.x},${p.y}`).join(' ');

    svg += `<polygon points="${focusPointsStr}" fill="url(#radarFocusGrad)" stroke="#3b82f6" stroke-width="3" stroke-linejoin="round"/>`;

    // 7. Interactive Focus Vertex Dots & Tooltip Slices
    focusPoints.forEach((p, i) => {
        const m = currentData.metrics[i];
        const dotColor = m.isPass ? "#10b981" : "#ef4444";

        if (!m.isPass) {
            svg += `<circle cx="${p.x}" cy="${p.y}" r="11" fill="rgba(239, 68, 68, 0.25)" stroke="#ef4444" stroke-width="1.5"/>`;
        }

        const payload = JSON.stringify({
            quarter: activeQuarter,
            name: m.name,
            category: m.category,
            categoryIcon: m.categoryIcon,
            targetDisplay: m.targetDisplay,
            rawText: m.rawText,
            score: m.score.toFixed(1),
            passThreshold: m.passThreshold,
            isPass: m.isPass,
            formulaDesc: m.formulaDesc
        }).replace(/"/g, '&quot;');

        svg += `
            <circle cx="${p.x}" cy="${p.y}" r="6.5" fill="${dotColor}" stroke="#ffffff" stroke-width="2.5" style="cursor: pointer;" onmouseenter="showRadarTooltip(event, ${payload})" onmousemove="moveRadarTooltip(event)" onmouseleave="hideRadarTooltip()"/>
            <text x="${p.x}" y="${p.y - 10}" fill="${dotColor}" font-size="10.5px" font-weight="800" text-anchor="middle">${m.score.toFixed(0)}%</text>
        `;
    });

    svg += `</svg>`;
    box.innerHTML = svg;

    // 8. Populate Performance Status Table
    let tableHtml = "";
    currentData.metrics.forEach((m, idx) => {
        const prevM = prevData ? prevData.metrics[idx] : null;
        let trendHtml = `<span style="color: var(--text-muted);">▬ Stable</span>`;
        if (prevM && activeQuarter !== "Q1" && activeQuarter !== "ALL") {
            const diff = m.score - prevM.score;
            if (diff > 0.5) {
                trendHtml = `<span style="color: #10b981; font-weight: 700;">▲ +${diff.toFixed(1)}%</span>`;
            } else if (diff < -0.5) {
                trendHtml = `<span style="color: #ef4444; font-weight: 700;">▼ ${diff.toFixed(1)}%</span>`;
            } else {
                trendHtml = `<span style="color: var(--text-muted); font-weight: 600;">▬ Stable</span>`;
            }
        }

        const badgeClass = m.isPass ? "badge-green" : "badge-red";
        const badgeLabel = m.isPass ? "PASS" : "FAILED";

        tableHtml += `
            <tr>
                <td>
                    <div style="font-weight: 800; color: var(--text-primary); font-size: 11.5px;">${m.categoryIcon} ${m.name}</div>
                    <div style="font-size: 9.5px; color: var(--text-muted);">${m.formulaDesc}</div>
                </td>
                <td><span class="badge badge-primary" style="font-size: 10px;">${m.category}</span></td>
                <td><strong style="color: var(--text-secondary);">${m.targetDisplay}</strong></td>
                <td><strong style="color: ${m.isPass ? 'var(--text-primary)' : '#ef4444'};">${m.rawText}</strong></td>
                <td>
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <strong style="color: ${m.isPass ? '#10b981' : '#ef4444'}; font-size: 12.5px;">${m.score.toFixed(1)}%</strong>
                        <span style="font-size: 9px; color: var(--text-muted);">(Req: ≥${m.passThreshold}%)</span>
                    </div>
                </td>
                <td><span class="status-badge ${badgeClass}" style="font-size: 10px; font-weight: 800;">${badgeLabel}</span></td>
                <td>${trendHtml}</td>
            </tr>
        `;
    });
    tableBody.innerHTML = tableHtml;

    // 9. Populate Corrective Action Directives Sub-Panel
    if (actionPanel) {
        const failedMetrics = currentData.metrics.filter(m => !m.isPass);
        if (failedMetrics.length === 0) {
            actionPanel.className = "radar-action-panel panel-pass";
            actionPanel.innerHTML = `
                <div class="radar-action-title" style="color: #10b981;">
                    <span>🌟</span>
                    <span>Quality Operations Status: All 5 Core QA/QC Benchmarks Satisfied (${activeQuarter})</span>
                </div>
                <div style="font-size: 11px; color: var(--text-secondary);">
                    All evaluated performance indicators conform to corporate QA/QC specification standards with zero compliance breaches detected. Continue routine inspection hold-point verification.
                </div>
            `;
        } else {
            actionPanel.className = "radar-action-panel panel-fail";
            let failDirectives = "";
            failedMetrics.forEach(fm => {
                let directiveText = "";
                if (fm.id === "kpi1") directiveText = "Enforce mandatory trade pre-inspection mock-ups and hold-point sign-offs prior to secondary pours/installations.";
                else if (fm.id === "kpi2") directiveText = "Issue formal Subcontractor Backcharge Notices for rework expense and condition monthly billing releases on rectification.";
                else if (fm.id === "kpi3") directiveText = "Conduct trade workmanship audits, incoming material QA (IQA), and enforce surface protection across audited zones.";
                else if (fm.id === "kpi4") directiveText = "Convene immediate NCR closeout escalation meetings; mandate 48-hour Corrective Action Response (CAR) submissions.";
                else if (fm.id === "kpi5") directiveText = "Mobilize dedicated snag strike team to clear open critical punch items immediately before client handover walkthroughs.";

                failDirectives += `
                    <li>
                        <strong>${fm.categoryIcon} ${fm.name} (Score: ${fm.score.toFixed(1)}% vs ≥${fm.passThreshold}% required):</strong> 
                        <span>${directiveText}</span>
                    </li>
                `;
            });

            actionPanel.innerHTML = `
                <div class="radar-action-title" style="color: #ef4444;">
                    <span>🚨</span>
                    <span>Executive Quality Action Required: ${failedMetrics.length} Metric Breach(es) Detected in ${activeQuarter}</span>
                </div>
                <ul class="radar-action-list">
                    ${failDirectives}
                </ul>
            `;
        }
    }
}

function showRadarTooltip(evt, data) {
    const tooltip = document.getElementById("overviewRadarTooltip");
    if (!tooltip || !data) return;

    const statusColor = data.isPass ? "#10b981" : "#ef4444";
    const statusText = data.isPass ? "🟢 PASS (Benchmark Met)" : "🔴 FAILED (Breach Detected)";

    tooltip.innerHTML = `
        <div class="chart-tooltip-header">${data.categoryIcon} ${data.name} (${data.quarter})</div>
        <div class="chart-tooltip-row"><span>Category:</span> <strong>${data.category}</strong></div>
        <div class="chart-tooltip-row"><span>Target Benchmark:</span> <strong>${data.targetDisplay}</strong></div>
        <div class="chart-tooltip-row"><span>Actual Field Value:</span> <strong style="color: ${statusColor};">${data.rawText}</strong></div>
        <div class="chart-tooltip-row"><span>Normalized Score:</span> <strong style="color: ${statusColor}; font-size: 13px;">${data.score}% (Pass ≥ ${data.passThreshold}%)</strong></div>
        <div class="chart-tooltip-row"><span>Scoring Method:</span> <span style="font-size: 9.5px; color: var(--text-muted);">${data.formulaDesc}</span></div>
        <div class="chart-tooltip-status" style="color: ${statusColor};">${statusText}</div>
    `;

    tooltip.style.display = "block";
    tooltip.style.opacity = "1";
    positionChartTooltip(evt, tooltip);
}

function moveRadarTooltip(evt) {
    const tooltip = document.getElementById("overviewRadarTooltip");
    if (tooltip) positionChartTooltip(evt, tooltip);
}

function hideRadarTooltip() {
    hideChartTooltip("overviewRadarTooltip");
}

function onRadarQuarterChange() {
    renderQuarterlyRadarDashboard();
}

function onRadarTraceToggle() {
    renderQuarterlyRadarDashboard();
}

if (typeof window !== "undefined") {
    window.calculateQuarterlyNormalizedScores = calculateQuarterlyNormalizedScores;
    window.renderQuarterlyRadarDashboard = renderQuarterlyRadarDashboard;
    window.onRadarQuarterChange = onRadarQuarterChange;
    window.onRadarTraceToggle = onRadarTraceToggle;
    window.showRadarTooltip = showRadarTooltip;
    window.moveRadarTooltip = moveRadarTooltip;
    window.hideRadarTooltip = hideRadarTooltip;
}

// ==========================================================================
// 🏢 COMBINED PROJECTS RADAR ANALYTICS (EXECUTIVE COMPILER)
// ==========================================================================

function calculateCombinedNormalizedScores(targetProjects, targetTimeframe) {
    if (!targetProjects || targetProjects.length === 0) return null;

    const totalBudget = targetProjects.reduce((s, p) => s + (parseFloat(p.budget) || 0), 0) || 1;
    const totalArea = targetProjects.reduce((s, p) => s + (parseFloat(p.area) || 0), 0) || 1;

    const qPredicate = (q) => isQuarterInTimeRange(q, targetTimeframe);

    let allKpi1 = [], allKpi2 = [], allKpi3 = [], allKpi4 = [], allKpi5 = [];
    targetProjects.forEach(p => {
        (p.kpi1_logs || []).forEach(l => { if (qPredicate(l.quarter)) allKpi1.push({ ...l, projectName: p.name }); });
        (p.kpi2_logs || []).forEach(l => { if (qPredicate(l.quarter)) allKpi2.push({ ...l, projectName: p.name }); });
        (p.kpi3_logs || []).forEach(l => { if (qPredicate(l.quarter)) allKpi3.push({ ...l, projectName: p.name }); });
        (p.kpi4_logs || []).forEach(l => { if (qPredicate(l.quarter)) allKpi4.push({ ...l, projectName: p.name }); });
        (p.kpi5_logs || []).forEach(l => { if (qPredicate(l.quarter)) allKpi5.push({ ...l, projectName: p.name }); });
    });

    // 1. FTQ (Execution)
    const totalTests = allKpi1.length;
    let passedTests = 0;
    allKpi1.forEach(l => { if (l.remarks === "Pass") passedTests++; });
    const rawFTQ = totalTests > 0 ? (passedTests / totalTests) * 100 : 100;
    const scoreFTQ = Math.max(0, Math.min(100, rawFTQ));

    // 2. Rework Rate (Financial)
    let totalReworkCost = 0;
    let totalApprovedCost = 0;
    allKpi2.forEach(l => {
        const qty = parseFloat(l.qty) || 1;
        const labor = parseFloat(l.labor) || 0;
        const mat = parseFloat(l.mat) || 0;
        totalReworkCost += (labor + mat) * qty;
        totalApprovedCost += (parseFloat(l.approvedCost) !== undefined && !isNaN(parseFloat(l.approvedCost)) ? parseFloat(l.approvedCost) : 0);
    });
    const reworkBasis = totalApprovedCost > 0 ? totalApprovedCost : totalBudget;
    const rawReworkPct = (totalReworkCost / reworkBasis) * 100;
    const bm = getBenchmarkConfig();
    const kpi2Mult = parseFloat(bm.kpi2?.penaltyMultiplier) || 25.0;
    const scoreRework = Math.max(0, Math.min(100, 100 - (rawReworkPct * kpi2Mult)));

    // 3. Defect Density (Detection)
    const totalDefects = allKpi3.length;
    const areaGrid = parseFloat(bm.kpi3?.areaGrid) || 100;
    const rawDefectDensity = (totalDefects / totalArea) * areaGrid;
    const kpi3Mult = parseFloat(bm.kpi3?.penaltyMultiplier) || 20.0;
    const scoreDefects = Math.max(0, Math.min(100, 100 - (rawDefectDensity * kpi3Mult)));

    // 4. NCR Resolution Time (Responsiveness)
    let closedNCR = 0, openNCR = 0, totalNCRDays = 0;
    allKpi4.forEach(l => {
        if (l.status === "Closed" || l.status === "Resolved" || l.status === "Rectified") {
            closedNCR++;
            totalNCRDays += parseFloat(l.duration) || 0;
        } else {
            openNCR++;
        }
    });
    const rawAvgNCRDays = closedNCR > 0 ? (totalNCRDays / closedNCR) : 0;
    const targetSLA = parseFloat(bm.kpi4?.targetSLA) || 5.0;
    const kpi4Mult = parseFloat(bm.kpi4?.penaltyMultiplier) || 15.0;
    let scoreNCR = 100;
    if (allKpi4.length > 0) {
        if (rawAvgNCRDays <= targetSLA) scoreNCR = 100;
        else scoreNCR = Math.max(0, Math.min(100, 100 - ((rawAvgNCRDays - targetSLA) * kpi4Mult)));
    }

    // 5. Handover Punch List Target Clearance (Satisfaction)
    let critPunch = 0, minorPunch = 0, closedPunch = 0, overduePunch = 0;
    const nowMs = Date.now();
    allKpi5.forEach(l => {
        const isClosed = l.status === "Signed-off" || l.status === "Closed" || l.status === "Rectified";
        if (isClosed) {
            closedPunch++;
            if (l.targetDate && l.actualDateRectified && new Date(l.actualDateRectified).getTime() > new Date(l.targetDate).getTime()) {
                overduePunch++;
            }
        } else {
            if (l.cat === "Critical") critPunch++;
            else minorPunch++;
            if (l.targetDate && new Date(l.targetDate).getTime() < nowMs) {
                overduePunch++;
            }
        }
    });
    const totalPunch = allKpi5.length;
    const onTimeRate = totalPunch > 0 ? Math.max(0, Math.round(((totalPunch - overduePunch) / totalPunch) * 100)) : 100;
    const critCap = parseFloat(bm.kpi5?.criticalCap) !== undefined ? parseFloat(bm.kpi5?.criticalCap) : 50.0;
    const critDed = parseFloat(bm.kpi5?.criticalDeductor) !== undefined ? parseFloat(bm.kpi5?.criticalDeductor) : 25.0;
    let scorePunch = 100;
    if (totalPunch > 0) {
        if (critPunch === 0) {
            scorePunch = Math.max(60, Math.min(100, onTimeRate));
        } else {
            scorePunch = Math.max(0, Math.min(critCap, onTimeRate - (critPunch * critDed)));
        }
    }

    const passFtq = parseFloat(bm.kpi1?.passThreshold) || 95;
    const passRework = parseFloat(bm.kpi2?.passThreshold) || 50;
    const passDefects = parseFloat(bm.kpi3?.passThreshold) || 60;
    const passNCR = parseFloat(bm.kpi4?.passThreshold) || 70;
    const passPunch = parseFloat(bm.kpi5?.passThreshold) || 75;

    const enabledKpis = appState.compiler?.kpis || {};
    const allMetrics = [
        {
            key: "kpi1",
            ...RADAR_METRIC_CONFIGS[0],
            passThreshold: passFtq,
            rawVal: rawFTQ,
            rawText: totalTests > 0 ? `${rawFTQ.toFixed(1)}% (${passedTests}/${totalTests} Passed)` : `100.0% (No tests in scope)`,
            score: scoreFTQ,
            isPass: scoreFTQ >= passFtq
        },
        {
            key: "kpi2",
            ...RADAR_METRIC_CONFIGS[1],
            passThreshold: passRework,
            rawVal: rawReworkPct,
            rawText: `${rawReworkPct.toFixed(2)}% (₱${totalReworkCost.toLocaleString()} / ₱${reworkBasis.toLocaleString()})`,
            score: scoreRework,
            isPass: scoreRework >= passRework
        },
        {
            key: "kpi3",
            ...RADAR_METRIC_CONFIGS[2],
            passThreshold: passDefects,
            rawVal: rawDefectDensity,
            rawText: `${rawDefectDensity.toFixed(2)} / 100m² (${totalDefects} defects)`,
            score: scoreDefects,
            isPass: scoreDefects >= passDefects
        },
        {
            key: "kpi4",
            ...RADAR_METRIC_CONFIGS[3],
            passThreshold: passNCR,
            rawVal: rawAvgNCRDays,
            rawText: closedNCR > 0 ? `${rawAvgNCRDays.toFixed(1)} Days (${closedNCR} closed, ${openNCR} open)` : (openNCR > 0 ? `${openNCR} Open NCRs` : `0.0 Days (All closed)`),
            score: scoreNCR,
            isPass: scoreNCR >= passNCR
        },
        {
            key: "kpi5",
            ...RADAR_METRIC_CONFIGS[4],
            passThreshold: passPunch,
            rawVal: onTimeRate,
            rawText: totalPunch > 0 ? `${onTimeRate}% On-Time (${closedPunch}/${totalPunch} Cleared, ${critPunch} Crit)` : `100% On-Time (No punch items in scope)`,
            score: scorePunch,
            isPass: scorePunch >= passPunch
        }
    ];

    const metricsData = allMetrics.filter(m => enabledKpis[m.key]?.enabled !== false);
    const totalScore = metricsData.reduce((s, m) => s + m.score, 0);
    const compositeScore = metricsData.length > 0 ? (totalScore / metricsData.length) : 100;
    const failedCount = metricsData.filter(m => !m.isPass).length;

    return {
        timeframe: targetTimeframe,
        metrics: metricsData,
        compositeScore,
        failedCount,
        overallPass: failedCount === 0,
        projectCount: targetProjects.length,
        totalBudget,
        totalArea
    };
}

function renderCompiledRadarSection(targetProjects, timeRange) {
    const radarSection = document.getElementById("repRadarSection");
    if (!radarSection) return;

    if (appState.compiler.includeRadarChart === false) {
        radarSection.style.display = "none";
        return;
    }
    radarSection.style.display = "block";

    const box = document.getElementById("repRadarChartBox");
    const tableBody = document.getElementById("repRadarStatusTableBody");
    const actionPanel = document.getElementById("repRadarActionSubPanel");
    if (!box || !tableBody) return;

    const data = calculateCombinedNormalizedScores(targetProjects, timeRange);
    if (!data) return;

    // 1. Render Full-Page Centered SVG Radar Chart
    const width = Math.max(760, box.clientWidth || 960);
    const height = 660;
    const cx = width / 2;
    const cy = 330;
    const R = Math.min(265, Math.min(width * 0.38, height * 0.40));

    const numAxes = 5;
    const getAngle = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / numAxes;

    const getPoint = (axisIdx, scorePct, customRadius = R) => {
        const angle = getAngle(axisIdx);
        const r = (scorePct / 100) * customRadius;
        return {
            x: cx + r * Math.cos(angle),
            y: cy + r * Math.sin(angle)
        };
    };

    let svg = `<svg width="100%" height="100%" viewBox="0 0 ${width} ${height}">`;
    svg += `
        <defs>
            <radialGradient id="repRadarCenterGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.16"/>
                <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.0"/>
            </radialGradient>
            <linearGradient id="repRadarFocusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.45"/>
                <stop offset="100%" stop-color="#10b981" stop-opacity="0.25"/>
            </linearGradient>
            <filter id="repRadarDropShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.28"/>
            </filter>
        </defs>
        <circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#repRadarCenterGlow)" />
    `;

    // Concentric Web Polygons
    [20, 40, 60, 80, 100].forEach((level) => {
        const ringPoints = [];
        for (let i = 0; i < numAxes; i++) {
            const pt = getPoint(i, level);
            ringPoints.push(`${pt.x},${pt.y}`);
        }
        const isOuter = level === 100;
        svg += `<polygon points="${ringPoints.join(' ')}" fill="${isOuter ? 'rgba(16, 185, 129, 0.08)' : 'transparent'}" stroke="var(--border-color, rgba(100,116,139,0.28))" stroke-width="${isOuter ? '2.2' : '1.2'}" stroke-dasharray="${isOuter ? 'none' : '4,4'}"/>`;
        const labelPt = getPoint(0, level);
        svg += `<text x="${labelPt.x + 6}" y="${labelPt.y + 15}" fill="var(--text-muted, #94a3b8)" font-size="12px" font-weight="700">${level}%</text>`;
    });

    // Dual-Zone Background Fill (Red Failed Region vs Green Pass Region)
    const thresholdPoints = data.metrics.map((m, i) => getPoint(i, m.passThreshold));
    const threshPointsStr = thresholdPoints.map(p => `${p.x},${p.y}`).join(' ');
    svg += `<polygon points="${threshPointsStr}" fill="rgba(239, 68, 68, 0.16)" stroke="rgba(239, 68, 68, 0.45)" stroke-width="1.4" stroke-dasharray="3,3"/>`;

    // Radial Spokes & Axis Labels
    for (let i = 0; i < numAxes; i++) {
        const tip = getPoint(i, 100);
        svg += `<line x1="${cx}" y1="${cy}" x2="${tip.x}" y2="${tip.y}" stroke="var(--border-color, rgba(100,116,139,0.35))" stroke-width="1.6"/>`;
        const labelPos = getPoint(i, 100, R + 42);
        const m = data.metrics[i];
        let textAnchor = "middle";
        if (i === 1 || i === 2) textAnchor = "start";
        else if (i === 3 || i === 4) textAnchor = "end";

        svg += `
            <text x="${labelPos.x}" y="${labelPos.y - 5}" fill="var(--text-primary, #0f172a)" font-size="13.5px" font-weight="800" text-anchor="${textAnchor}">
                ${m.categoryIcon} ${m.name}
            </text>
            <text x="${labelPos.x}" y="${labelPos.y + 13}" fill="${m.isPass ? '#10b981' : '#ef4444'}" font-size="11.5px" font-weight="700" text-anchor="${textAnchor}">
                Target: ${m.targetDisplay}
            </text>
        `;
    }

    // Threshold Reference Boundary Polygon (Dashed Green)
    svg += `<polygon points="${threshPointsStr}" fill="none" stroke="#10b981" stroke-width="3" stroke-dasharray="5,5" opacity="0.95"/>`;
    thresholdPoints.forEach(p => {
        svg += `<circle cx="${p.x}" cy="${p.y}" r="4" fill="#10b981" stroke="#ffffff" stroke-width="1.8"/>`;
    });

    // Combined Projects Performance Data Polygon
    const focusPoints = data.metrics.map((m, i) => getPoint(i, m.score));
    const focusPointsStr = focusPoints.map(p => `${p.x},${p.y}`).join(' ');
    svg += `<polygon points="${focusPointsStr}" fill="url(#repRadarFocusGrad)" stroke="#3b82f6" stroke-width="3.8" stroke-linejoin="round" filter="url(#repRadarDropShadow)"/>`;

    // Vertex Nodes & Score Text
    focusPoints.forEach((p, i) => {
        const m = data.metrics[i];
        const dotColor = m.isPass ? "#10b981" : "#ef4444";
        if (!m.isPass) {
            svg += `<circle cx="${p.x}" cy="${p.y}" r="14" fill="rgba(239, 68, 68, 0.28)" stroke="#ef4444" stroke-width="2"/>`;
        }
        svg += `
            <circle cx="${p.x}" cy="${p.y}" r="7.5" fill="${dotColor}" stroke="#ffffff" stroke-width="2.5"/>
            <text x="${p.x}" y="${p.y - 12}" fill="${dotColor}" font-size="13px" font-weight="900" text-anchor="middle">${m.score.toFixed(0)}%</text>
        `;
    });

    svg += `</svg>`;
    box.innerHTML = svg;

    // 2. Render Consolidated Core Quality Matrix Table
    let tableHtml = "";
    data.metrics.forEach((m) => {
        const badgeClass = m.isPass ? "badge-green" : "badge-red";
        const badgeLabel = m.isPass ? "PASS" : "FAILED";
        tableHtml += `
            <tr>
                <td>
                    <div style="font-weight: 800; color: var(--text-primary); font-size: 11.5px;">${m.categoryIcon} ${m.name}</div>
                    <div style="font-size: 9.5px; color: var(--text-muted);">${m.formulaDesc}</div>
                </td>
                <td><span class="badge badge-primary" style="font-size: 10px;">${m.category}</span></td>
                <td><strong style="color: var(--text-secondary); font-size: 11px;">${m.targetDisplay}</strong></td>
                <td><strong style="color: ${m.isPass ? 'var(--text-primary)' : '#ef4444'}; font-size: 11px;">${m.rawText}</strong></td>
                <td>
                    <strong style="color: ${m.isPass ? '#10b981' : '#ef4444'}; font-size: 12.5px;">${m.score.toFixed(1)}%</strong>
                </td>
                <td><span class="status-badge ${badgeClass}" style="font-size: 10px; font-weight: 800;">${badgeLabel}</span></td>
            </tr>
        `;
    });
    tableBody.innerHTML = tableHtml;

    // 3. Render Action Directives Panel
    if (actionPanel) {
        const failedMetrics = data.metrics.filter(m => !m.isPass);
        if (failedMetrics.length === 0) {
            actionPanel.className = "radar-action-panel panel-pass";
            actionPanel.innerHTML = `
                <div class="radar-action-title" style="color: #10b981; font-size: 12.5px;">
                    <span>🌟</span>
                    <span>Portfolio Status: All 5 Core QA/QC Benchmarks Satisfied (${data.projectCount} Projects Combined)</span>
                </div>
                <div style="font-size: 11px; color: var(--text-secondary);">
                    Aggregate quality compliance index across evaluated project portfolio meets or exceeds all corporate engineering tolerances.
                </div>
            `;
        } else {
            actionPanel.className = "radar-action-panel panel-fail";
            let failDirectives = "";
            failedMetrics.forEach(fm => {
                let directiveText = "";
                if (fm.id === "kpi1") directiveText = "Enforce mandatory trade mock-ups & hold-point sign-offs prior to secondary pours/installations.";
                else if (fm.id === "kpi2") directiveText = "Issue formal Subcontractor Backcharges for rework and condition monthly billing releases.";
                else if (fm.id === "kpi3") directiveText = "Conduct trade workmanship audits, incoming material QA (IQA), and surface protection.";
                else if (fm.id === "kpi4") directiveText = "Convene immediate NCR closeout escalation meetings; mandate 48-hour CAR submissions.";
                else if (fm.id === "kpi5") directiveText = "Mobilize dedicated snag strike team to clear open critical punch items before turnover.";

                failDirectives += `
                    <li>
                        <strong>${fm.categoryIcon} ${fm.name} (Score: ${fm.score.toFixed(1)}% vs ≥${fm.passThreshold}% required):</strong> 
                        <span>${directiveText}</span>
                    </li>
                `;
            });

            actionPanel.innerHTML = `
                <div class="radar-action-title" style="color: #ef4444; font-size: 12.5px;">
                    <span>🚨</span>
                    <span>Executive Quality Action Required: ${failedMetrics.length} Portfolio Metric Breach(es) Detected</span>
                </div>
                <ul class="radar-action-list">
                    ${failDirectives}
                </ul>
            `;
        }
    }
}

if (typeof window !== "undefined") {
    window.calculateCombinedNormalizedScores = calculateCombinedNormalizedScores;
    window.renderCompiledRadarSection = renderCompiledRadarSection;
}

// ==========================================================================
// 🏢 DYNAMIC EXECUTIVE REPORT COMPILER & ANALYTICS ENGINE
// ==========================================================================

// ==========================================================================
// 🛡️ STRATEGIC QUALITY GOVERNANCE & MANAGEMENT DIRECTIVES
// ==========================================================================

const DEFAULT_GOVERNANCE_ITEMS = {
    risks: [
        {
            id: "r1",
            text: "MEPFS & Architectural Ceiling Clashes: Penetration conflicts in service corridors requiring joint BIM clash resolution before drywall closure.",
            bg: "amber",
            color: "default",
            isBold: false
        },
        {
            id: "r2",
            text: "Subcontractor Trade Quality Gaps: Masonry and plastering crews exhibiting surface flatness variance; hold-point sign-off enforced before paint prep.",
            bg: "red",
            color: "default",
            isBold: false
        },
        {
            id: "r3",
            text: "Material Testing Lab Turnaround: 3rd-party concrete cylinder 28-day strength certification experiencing turnaround delays.",
            bg: "purple",
            color: "default",
            isBold: false
        }
    ],
    priorities: [
        {
            id: "p1",
            text: "Enforce 100% Mandatory Pre-Inspection Mock-ups for upcoming wet-area waterproofing and tile layout installations.",
            bg: "blue",
            color: "default",
            isBold: true
        },
        {
            id: "p2",
            text: "Conduct Bi-Weekly Quality Rectification Stand-up Reviews with trade subcontractor site engineers and foremen.",
            bg: "green",
            color: "default",
            isBold: false
        },
        {
            id: "p3",
            text: "Mobilize dedicated Handover Snag Strike Team 45 days prior to target project turnover dates.",
            bg: "amber",
            color: "default",
            isBold: false
        }
    ],
    decisions: [
        {
            id: "d1",
            text: "Endorsement of Subcontractor Backcharge Penalties (₱145,000) for unauthorized drywall and piping rework.",
            bg: "purple",
            color: "default",
            isBold: true
        },
        {
            id: "d2",
            text: "Authorization to withhold 10% progress billing release for trades with unresolved NCR notices past the 7-day SLA.",
            bg: "red",
            color: "default",
            isBold: true
        },
        {
            id: "d3",
            text: "Executive approval for engagement of accredited 3rd-party acoustic and environmental testing laboratory.",
            bg: "blue",
            color: "default",
            isBold: false
        }
    ]
};

const GOV_BG_CYCLE = ["red", "amber", "blue", "green", "purple", "slate"];

function normalizeGovernanceCategory(rawVal, categoryName) {
    if (Array.isArray(rawVal)) {
        return rawVal.map((item, idx) => {
            if (typeof item === "string") {
                return {
                    id: `${categoryName}_${idx}_${Date.now()}`,
                    text: item,
                    bg: GOV_BG_CYCLE[idx % GOV_BG_CYCLE.length],
                    color: "default",
                    isBold: false
                };
            }
            return {
                id: item.id || `${categoryName}_${idx}_${Date.now()}`,
                text: item.text || "",
                bg: item.bg || GOV_BG_CYCLE[idx % GOV_BG_CYCLE.length],
                color: item.color || "default",
                isBold: Boolean(item.isBold)
            };
        });
    }

    if (typeof rawVal === "string" && rawVal.trim()) {
        const lines = rawVal.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
        return lines.map((line, idx) => {
            const cleanText = line.replace(/^[\u2022\u25E6\u2043\u2219\-\*]\s*/, '').replace(/^[•\-\*]\s*/, '').replace(/^\d+[\.\)]\s*/, '');
            return {
                id: `${categoryName}_${idx}_${Date.now()}`,
                text: cleanText,
                bg: GOV_BG_CYCLE[idx % GOV_BG_CYCLE.length],
                color: "default",
                isBold: idx === 0
            };
        });
    }

    // Default template fallback if empty
    return (DEFAULT_GOVERNANCE_ITEMS[categoryName] || []).map(item => ({ ...item }));
}

function getGovernanceNotesState() {
    if (!appState.compiler) appState.compiler = {};
    if (!appState.compiler.governanceNotes) {
        appState.compiler.governanceNotes = {};
    }

    const gn = appState.compiler.governanceNotes;
    if (!Array.isArray(gn.risks)) gn.risks = normalizeGovernanceCategory(gn.risks, "risks");
    if (!Array.isArray(gn.priorities)) gn.priorities = normalizeGovernanceCategory(gn.priorities, "priorities");
    if (!Array.isArray(gn.decisions)) gn.decisions = normalizeGovernanceCategory(gn.decisions, "decisions");

    return gn;
}

function renderGovernanceCards() {
    const gn = getGovernanceNotesState();

    const categories = [
        { key: "risks", containerId: "govListRisks", label: "Risk / Issue" },
        { key: "priorities", containerId: "govListPriorities", label: "Priority Item" },
        { key: "decisions", containerId: "govListDecisions", label: "Executive Decision" }
    ];

    categories.forEach(({ key, containerId }) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        const items = gn[key] || [];
        if (items.length === 0) {
            container.innerHTML = `<div style="font-size: 11.5px; color: var(--text-muted, #94a3b8); font-style: italic; padding: 6px 0;">No items recorded yet. Click below to add an entry.</div>`;
            return;
        }

        let html = "";
        items.forEach((item, idx) => {
            const num = idx + 1;
            const bgClass = `gov-bg-${item.bg || 'slate'}`;
            const textColorClass = `gov-text-color-${item.color || 'default'}`;
            const boldClass = item.isBold ? 'gov-text-bold' : '';

            html += `
                <div class="gov-item-card ${bgClass}" data-cat="${key}" data-idx="${idx}">
                    <div class="gov-item-header">
                        <div class="gov-item-num-wrap">
                            <span class="gov-item-num">${num}</span>
                            <strong style="font-size: 11px; color: var(--text-primary);">Item #${num}</strong>
                        </div>
                        <div class="gov-format-toolbar">
                            <button type="button" class="gov-tool-btn ${item.isBold ? 'active' : ''}" onclick="toggleGovernanceItemBold('${key}', ${idx})" title="Toggle Bold text formatting">
                                <strong>𝗕 Bold</strong>
                            </button>
                            
                            <select class="gov-select-sm" onchange="setGovernanceItemTextColor('${key}', ${idx}, this.value)" title="Choose text highlight color">
                                <option value="default" ${item.color === 'default' ? 'selected' : ''}>🎨 Text: Default</option>
                                <option value="red" ${item.color === 'red' ? 'selected' : ''}>🔴 Text: Red</option>
                                <option value="amber" ${item.color === 'amber' ? 'selected' : ''}>🟡 Text: Amber</option>
                                <option value="green" ${item.color === 'green' ? 'selected' : ''}>🟢 Text: Green</option>
                                <option value="blue" ${item.color === 'blue' ? 'selected' : ''}>🔵 Text: Blue</option>
                                <option value="purple" ${item.color === 'purple' ? 'selected' : ''}>🟣 Text: Purple</option>
                            </select>

                            <select class="gov-select-sm" onchange="setGovernanceItemBgColor('${key}', ${idx}, this.value)" title="Choose card background tint">
                                <option value="red" ${item.bg === 'red' ? 'selected' : ''}>🟥 Bg: Soft Red</option>
                                <option value="amber" ${item.bg === 'amber' ? 'selected' : ''}>🟨 Bg: Soft Amber</option>
                                <option value="blue" ${item.bg === 'blue' ? 'selected' : ''}>🟦 Bg: Soft Blue</option>
                                <option value="green" ${item.bg === 'green' ? 'selected' : ''}>🟩 Bg: Soft Green</option>
                                <option value="purple" ${item.bg === 'purple' ? 'selected' : ''}>🟪 Bg: Soft Purple</option>
                                <option value="slate" ${item.bg === 'slate' ? 'selected' : ''}>⬜ Bg: Neutral Slate</option>
                            </select>

                            ${idx > 0 ? `<button type="button" class="gov-tool-btn" onclick="moveGovernanceItem('${key}', ${idx}, -1)" title="Move item up">▲</button>` : ''}
                            ${idx < items.length - 1 ? `<button type="button" class="gov-tool-btn" onclick="moveGovernanceItem('${key}', ${idx}, 1)" title="Move item down">▼</button>` : ''}
                            <button type="button" class="gov-tool-btn gov-tool-btn-delete" onclick="deleteGovernanceItem('${key}', ${idx})" title="Delete this entry">🗑️</button>
                        </div>
                    </div>
                    <textarea class="gov-item-textarea ${boldClass} ${textColorClass}" placeholder="Enter details..." oninput="updateGovernanceItemText('${key}', ${idx}, this.value)">${escapeHtml(item.text || '')}</textarea>
                </div>
            `;
        });

        container.innerHTML = html;
    });

    syncGovernancePrintViews();
}

function addGovernanceItem(category) {
    const gn = getGovernanceNotesState();
    const list = gn[category] || [];
    const newIdx = list.length;
    const defaultBg = GOV_BG_CYCLE[newIdx % GOV_BG_CYCLE.length];

    list.push({
        id: `${category}_${newIdx}_${Date.now()}`,
        text: "",
        bg: defaultBg,
        color: "default",
        isBold: false
    });

    renderGovernanceCards();
    if (typeof saveToLocalStorage === "function") saveToLocalStorage();

    // Auto-focus new textarea
    setTimeout(() => {
        const container = document.getElementById(category === 'risks' ? 'govListRisks' : (category === 'priorities' ? 'govListPriorities' : 'govListDecisions'));
        if (container) {
            const textareas = container.querySelectorAll('.gov-item-textarea');
            if (textareas.length > 0) {
                textareas[textareas.length - 1].focus();
            }
        }
    }, 50);
}

function deleteGovernanceItem(category, index) {
    const gn = getGovernanceNotesState();
    if (gn[category] && gn[category][index] !== undefined) {
        gn[category].splice(index, 1);
        renderGovernanceCards();
        if (typeof saveToLocalStorage === "function") saveToLocalStorage();
    }
}

function moveGovernanceItem(category, index, direction) {
    const gn = getGovernanceNotesState();
    const list = gn[category];
    if (!list) return;
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    renderGovernanceCards();
    if (typeof saveToLocalStorage === "function") saveToLocalStorage();
}

function updateGovernanceItemText(category, index, val) {
    const gn = getGovernanceNotesState();
    if (gn[category] && gn[category][index]) {
        gn[category][index].text = val;
        syncGovernancePrintViews();
        if (typeof saveToLocalStorage === "function") saveToLocalStorage();
    }
}

function toggleGovernanceItemBold(category, index) {
    const gn = getGovernanceNotesState();
    if (gn[category] && gn[category][index]) {
        gn[category][index].isBold = !gn[category][index].isBold;
        renderGovernanceCards();
        if (typeof saveToLocalStorage === "function") saveToLocalStorage();
    }
}

function setGovernanceItemTextColor(category, index, color) {
    const gn = getGovernanceNotesState();
    if (gn[category] && gn[category][index]) {
        gn[category][index].color = color;
        renderGovernanceCards();
        if (typeof saveToLocalStorage === "function") saveToLocalStorage();
    }
}

function setGovernanceItemBgColor(category, index, bg) {
    const gn = getGovernanceNotesState();
    if (gn[category] && gn[category][index]) {
        gn[category][index].bg = bg;
        renderGovernanceCards();
        if (typeof saveToLocalStorage === "function") saveToLocalStorage();
    }
}

function formatGovernanceNotesForPrint(items) {
    if (!items) {
        return '<p style="color: #64748b; font-style: italic; margin: 0;">(No specific entries recorded for this section.)</p>';
    }

    const normalized = Array.isArray(items) ? items : normalizeGovernanceCategory(items, "temp");
    const activeItems = normalized.filter(it => it && it.text && it.text.trim());

    if (activeItems.length === 0) {
        return '<p style="color: #64748b; font-style: italic; margin: 0;">(No specific entries recorded for this section.)</p>';
    }

    return activeItems.map((item, idx) => {
        const num = idx + 1;
        const bgClass = `gov-bg-${item.bg || 'slate'}`;
        const textColorClass = `gov-text-color-${item.color || 'default'}`;
        const boldClass = item.isBold ? 'gov-text-bold' : '';

        return `
            <div class="gov-print-item ${bgClass}">
                <span class="gov-print-num">${num}</span>
                <div class="gov-print-text ${boldClass} ${textColorClass}">
                    ${escapeHtml(item.text)}
                </div>
            </div>
        `;
    }).join('');
}

function syncGovernancePrintViews() {
    const gn = getGovernanceNotesState();
    const risksPrint = document.getElementById("govPrintRisks");
    const prioPrint = document.getElementById("govPrintPriorities");
    const decPrint = document.getElementById("govPrintDecisions");

    if (risksPrint) risksPrint.innerHTML = formatGovernanceNotesForPrint(gn.risks);
    if (prioPrint) prioPrint.innerHTML = formatGovernanceNotesForPrint(gn.priorities);
    if (decPrint) decPrint.innerHTML = formatGovernanceNotesForPrint(gn.decisions);
}

function resetGovernanceNotesToTemplate() {
    if (!appState.compiler) appState.compiler = {};
    appState.compiler.governanceNotes = {
        risks: DEFAULT_GOVERNANCE_ITEMS.risks.map(it => ({ ...it })),
        priorities: DEFAULT_GOVERNANCE_ITEMS.priorities.map(it => ({ ...it })),
        decisions: DEFAULT_GOVERNANCE_ITEMS.decisions.map(it => ({ ...it }))
    };

    renderGovernanceCards();
    if (typeof saveToLocalStorage === "function") saveToLocalStorage();
}

function clearGovernanceNotes() {
    if (!appState.compiler) appState.compiler = {};
    appState.compiler.governanceNotes = { risks: [], priorities: [], decisions: [] };

    renderGovernanceCards();
    if (typeof saveToLocalStorage === "function") saveToLocalStorage();
}

if (typeof window !== "undefined") {
    window.addGovernanceItem = addGovernanceItem;
    window.deleteGovernanceItem = deleteGovernanceItem;
    window.moveGovernanceItem = moveGovernanceItem;
    window.updateGovernanceItemText = updateGovernanceItemText;
    window.toggleGovernanceItemBold = toggleGovernanceItemBold;
    window.setGovernanceItemTextColor = setGovernanceItemTextColor;
    window.setGovernanceItemBgColor = setGovernanceItemBgColor;
    window.resetGovernanceNotesToTemplate = resetGovernanceNotesToTemplate;
    window.clearGovernanceNotes = clearGovernanceNotes;
    window.renderGovernanceCards = renderGovernanceCards;
    window.syncGovernancePrintViews = syncGovernancePrintViews;
}

function initExecutiveCompiler() {
    if (!appState.compiler) {
        appState.compiler = {
            projectScope: "ALL",
            selectedProjectIds: Object.keys(appState.projects || {}),
            timeRange: "FY",
            compMode: "pop",
            baseQuarter: "Q1",
            targetQuarter: "Q2",
            includeGraphNarratives: true,
            includeLogs: true,
            includeGovernanceNotes: true,
            governanceNotes: { ...DEFAULT_GOVERNANCE_NOTES },
            kpis: {
                kpi1: { enabled: true, chart: true, discipline: "ALL", subDiscipline: "ALL", description: "ALL" },
                kpi2: { enabled: true, chart: true, discipline: "ALL", subDiscipline: "ALL", description: "ALL" },
                kpi3: { enabled: true, chart: true, discipline: "ALL", subDiscipline: "ALL", description: "ALL" },
                kpi4: { enabled: true, chart: true, discipline: "ALL", subDiscipline: "ALL", description: "ALL" },
                kpi5: { enabled: true, chart: true, discipline: "ALL", subDiscipline: "ALL", description: "ALL", viewMode: "burndown" }
            }
        };
    }

    if (!appState.compiler.governanceNotes) {
        appState.compiler.governanceNotes = { ...DEFAULT_GOVERNANCE_NOTES };
    }

    if (!appState.compiler.selectedProjectIds || appState.compiler.selectedProjectIds.length === 0) {
        appState.compiler.selectedProjectIds = Object.keys(appState.projects || {});
    }

    populateCompilerProjectsList();

    // Sync Scope Buttons
    const scopeAllBtn = document.getElementById("scopeAllBtn");
    const scopeCustomBtn = document.getElementById("scopeCustomBtn");
    const checklistBox = document.getElementById("compilerProjectChecklistBox");
    if (scopeAllBtn && scopeCustomBtn) {
        if (appState.compiler.projectScope === "ALL") {
            scopeAllBtn.classList.add("active");
            scopeCustomBtn.classList.remove("active");
            if (checklistBox) checklistBox.style.display = "none";
        } else {
            scopeAllBtn.classList.remove("active");
            scopeCustomBtn.classList.add("active");
            if (checklistBox) checklistBox.style.display = "flex";
        }
    }

    // Sync Time Range
    const timeSelect = document.getElementById("compilerTimeRangeSelect");
    if (timeSelect) timeSelect.value = appState.compiler.timeRange || "FY";

    // Sync Comparative Mode & Quarters
    const compSelect = document.getElementById("compilerCompModeSelect");
    if (compSelect) compSelect.value = appState.compiler.compMode || "pop";
    const popBox = document.getElementById("compilerPopContainer");
    if (popBox) {
        popBox.style.display = (appState.compiler.compMode === "pop") ? "grid" : "none";
    }
    const baseQSelect = document.getElementById("compilerBaseQuarter");
    if (baseQSelect) baseQSelect.value = appState.compiler.baseQuarter || "Q1";
    const targetQSelect = document.getElementById("compilerTargetQuarter");
    if (targetQSelect) targetQSelect.value = appState.compiler.targetQuarter || "Q2";

    // Sync Include Options Checkboxes
    const includeRadarCheck = document.getElementById("comp_includeRadarChart");
    if (includeRadarCheck) includeRadarCheck.checked = appState.compiler.includeRadarChart !== false;
    const includeNarrativesCheck = document.getElementById("comp_includeGraphNarratives");
    if (includeNarrativesCheck) includeNarrativesCheck.checked = appState.compiler.includeGraphNarratives !== false;
    const includeLogsCheck = document.getElementById("comp_includeLogs");
    if (includeLogsCheck) includeLogsCheck.checked = appState.compiler.includeLogs !== false;
    const includeGovCheck = document.getElementById("comp_includeGovernanceNotes");
    if (includeGovCheck) includeGovCheck.checked = appState.compiler.includeGovernanceNotes !== false;

    // Render itemized governance cards with numbering & styling
    renderGovernanceCards();

    // Populate and sync Graph Filter Dropdowns
    populateAllCompilerGraphFilters();

    // Sync KPI & Chart Checkboxes
    ["kpi1", "kpi2", "kpi3", "kpi4", "kpi5"].forEach((kpiKey, idx) => {
        const num = idx + 1;
        const mainCheck = document.getElementById(`comp_${kpiKey}`);
        const chartCheck = document.getElementById(`comp_chart${num}`);
        const card = document.getElementById(`card_comp_${kpiKey}`);
        const filtersDiv = document.getElementById(`filters_comp_${kpiKey}`);
        const kpiConf = appState.compiler.kpis[kpiKey] || { enabled: true, chart: true };

        if (mainCheck) mainCheck.checked = kpiConf.enabled !== false;
        if (chartCheck) chartCheck.checked = kpiConf.chart !== false;
        if (card) {
            if (kpiConf.enabled !== false) card.classList.add("active");
            else card.classList.remove("active");
        }
        if (filtersDiv) {
            filtersDiv.style.display = (kpiConf.enabled !== false && kpiConf.chart !== false) ? "flex" : "none";
        }

        if (kpiKey === "kpi5") {
            const viewSel = document.getElementById("comp_kpi5_viewMode");
            if (viewSel && kpiConf.viewMode) viewSel.value = kpiConf.viewMode;
        }
    });

    compileExecutiveReport();
}

function populateAllCompilerGraphFilters() {
    ["kpi1", "kpi2", "kpi3", "kpi4", "kpi5"].forEach(kpiKey => {
        populateCompilerGraphFilterOptions(kpiKey);
    });
}

// ==========================================================================
// 📋 EXECUTIVE COMPILER KPI 5 MULTI-GRAPH SUITE CONTROLLERS
// ==========================================================================

function getCompiledKPI5ActiveGraphs() {
    const rawMode = appState.compiler?.kpis?.kpi5?.viewMode || "burndown";
    if (rawMode === "all" || rawMode === "all_3" || rawMode === "suite") {
        return ["burndown", "discipline", "targetSchedule"];
    }
    if (rawMode === "graphs_1_3" || rawMode === "burndown,targetSchedule" || rawMode === "1,3") {
        return ["burndown", "targetSchedule"];
    }
    if (rawMode === "graphs_1_2" || rawMode === "burndown,discipline" || rawMode === "1,2") {
        return ["burndown", "discipline"];
    }
    if (rawMode === "graphs_2_3" || rawMode === "discipline,targetSchedule" || rawMode === "2,3") {
        return ["discipline", "targetSchedule"];
    }
    if (rawMode === "discipline") {
        return ["discipline"];
    }
    if (rawMode === "targetSchedule") {
        return ["targetSchedule"];
    }
    return ["burndown"];
}
if (typeof window !== "undefined") window.getCompiledKPI5ActiveGraphs = getCompiledKPI5ActiveGraphs;

function syncCompilerKPI5Checkboxes() {
    const active = getCompiledKPI5ActiveGraphs();
    const g1 = document.getElementById("comp_kpi5_g1");
    const g2 = document.getElementById("comp_kpi5_g2");
    const g3 = document.getElementById("comp_kpi5_g3");
    const sel = document.getElementById("comp_kpi5_viewMode");

    if (g1) g1.checked = active.includes("burndown");
    if (g2) g2.checked = active.includes("discipline");
    if (g3) g3.checked = active.includes("targetSchedule");

    if (sel) {
        if (active.length === 3) sel.value = "all";
        else if (active.includes("burndown") && active.includes("targetSchedule") && active.length === 2) sel.value = "graphs_1_3";
        else if (active.includes("burndown") && active.includes("discipline") && active.length === 2) sel.value = "graphs_1_2";
        else if (active.includes("discipline") && active.includes("targetSchedule") && active.length === 2) sel.value = "graphs_2_3";
        else if (active.includes("discipline")) sel.value = "discipline";
        else if (active.includes("targetSchedule")) sel.value = "targetSchedule";
        else sel.value = "burndown";
    }
}
if (typeof window !== "undefined") window.syncCompilerKPI5Checkboxes = syncCompilerKPI5Checkboxes;

function onCompilerKPI5ViewModeDropdownChange() {
    const sel = document.getElementById("comp_kpi5_viewMode");
    if (!sel) return;
    const mode = sel.value;
    if (!appState.compiler) initExecutiveCompiler();
    if (!appState.compiler.kpis) appState.compiler.kpis = {};
    if (!appState.compiler.kpis.kpi5) appState.compiler.kpis.kpi5 = {};
    appState.compiler.kpis.kpi5.viewMode = mode;
    syncCompilerKPI5Checkboxes();
    saveAppState();
    compileExecutiveReport();
}
if (typeof window !== "undefined") window.onCompilerKPI5ViewModeDropdownChange = onCompilerKPI5ViewModeDropdownChange;

function onCompilerKPI5CheckboxToggle() {
    const g1 = document.getElementById("comp_kpi5_g1")?.checked;
    const g2 = document.getElementById("comp_kpi5_g2")?.checked;
    const g3 = document.getElementById("comp_kpi5_g3")?.checked;

    let mode = "burndown";
    if (g1 && g2 && g3) mode = "all";
    else if (g1 && g3) mode = "graphs_1_3";
    else if (g1 && g2) mode = "graphs_1_2";
    else if (g2 && g3) mode = "graphs_2_3";
    else if (g2) mode = "discipline";
    else if (g3) mode = "targetSchedule";
    else if (g1) mode = "burndown";
    else {
        mode = "burndown";
        const g1El = document.getElementById("comp_kpi5_g1");
        if (g1El) g1El.checked = true;
    }

    if (!appState.compiler) initExecutiveCompiler();
    if (!appState.compiler.kpis) appState.compiler.kpis = {};
    if (!appState.compiler.kpis.kpi5) appState.compiler.kpis.kpi5 = {};
    appState.compiler.kpis.kpi5.viewMode = mode;

    const sel = document.getElementById("comp_kpi5_viewMode");
    if (sel) sel.value = mode;

    saveAppState();
    compileExecutiveReport();
}
if (typeof window !== "undefined") window.onCompilerKPI5CheckboxToggle = onCompilerKPI5CheckboxToggle;

function populateCompilerGraphFilterOptions(kpiKey) {
    const discSelect = document.getElementById(`comp_${kpiKey}_disc`);
    const subDiscSelect = document.getElementById(`comp_${kpiKey}_subDisc`);
    const descSelect = document.getElementById(`comp_${kpiKey}_desc`);

    if (kpiKey === "kpi5") {
        syncCompilerKPI5Checkboxes();
    }
    if (!discSelect || !subDiscSelect || !descSelect) return;

    if (!appState.compiler.kpis) appState.compiler.kpis = {};
    if (!appState.compiler.kpis[kpiKey]) {
        appState.compiler.kpis[kpiKey] = { enabled: true, chart: true, discipline: "ALL", subDiscipline: "ALL", description: "ALL" };
    }
    const currentConf = appState.compiler.kpis[kpiKey];

    // Gather logs across active compiler target projects and timeframe
    const targetProjects = getCompilerTargetProjects();
    const timeRange = appState.compiler.timeRange || "FY";
    let allLogs = [];
    targetProjects.forEach(p => {
        const logs = p[`${kpiKey}_logs`] || [];
        logs.forEach(l => {
            if (isQuarterInTimeRange(l.quarter, timeRange)) {
                allLogs.push(l);
            }
        });
    });

    // 1. Disciplines List
    const baseDisciplines = ["Structural Works", "Architectural Works", "Mechanical Works", "Electrical Works", "Plumbing & Sanitary Works", "Electronic Works"];
    const logDisciplines = Array.from(new Set(allLogs.map(l => (l.discipline || l.disc || "").trim()).filter(Boolean)));
    const allDisciplines = Array.from(new Set([...baseDisciplines, ...logDisciplines])).sort();

    let selectedDisc = currentConf.discipline || "ALL";
    if (selectedDisc !== "ALL" && !allDisciplines.includes(selectedDisc)) {
        selectedDisc = "ALL";
        currentConf.discipline = "ALL";
    }

    let discHtml = `<option value="ALL" ${selectedDisc === "ALL" ? "selected" : ""}>-- All Disciplines --</option>`;
    allDisciplines.forEach(d => {
        discHtml += `<option value="${d}" ${selectedDisc === d ? "selected" : ""}>${d}</option>`;
    });
    discSelect.innerHTML = discHtml;

    // 2. Sub-Disciplines List
    let subDiscList = [];
    if (kpiKey === "kpi1" && appState.specs?.kpi1_standards) {
        Object.values(appState.specs.kpi1_standards).forEach(st => {
            if (selectedDisc === "ALL" || st.discipline === selectedDisc) {
                if (st.subDiscipline) subDiscList.push(st.subDiscipline);
            }
        });
    }
    allLogs.forEach(l => {
        const d = (l.discipline || l.disc || "").trim();
        if (selectedDisc === "ALL" || d === selectedDisc) {
            const s = (l.subDiscipline || l.subDisc || l.category || l.activity || "").trim();
            if (s) subDiscList.push(s);
        }
    });
    const uniqueSubDiscs = Array.from(new Set(subDiscList)).filter(Boolean).sort();

    let selectedSub = currentConf.subDiscipline || "ALL";
    if (selectedSub !== "ALL" && !uniqueSubDiscs.includes(selectedSub)) {
        selectedSub = "ALL";
        currentConf.subDiscipline = "ALL";
    }

    let subHtml = `<option value="ALL" ${selectedSub === "ALL" ? "selected" : ""}>-- All Sub-Disciplines --</option>`;
    uniqueSubDiscs.forEach(s => {
        subHtml += `<option value="${s}" ${selectedSub === s ? "selected" : ""}>${s}</option>`;
    });
    subDiscSelect.innerHTML = subHtml;

    // 3. Descriptions List
    let descList = [];
    if (kpiKey === "kpi1" && appState.specs?.kpi1_standards) {
        Object.values(appState.specs.kpi1_standards).forEach(st => {
            const matchDisc = selectedDisc === "ALL" || st.discipline === selectedDisc;
            const matchSub = selectedSub === "ALL" || st.subDiscipline === selectedSub;
            if (matchDisc && matchSub && st.testName) descList.push(st.testName);
        });
    }
    allLogs.forEach(l => {
        const d = (l.discipline || l.disc || "").trim();
        const s = (l.subDiscipline || l.subDisc || l.category || l.activity || "").trim();
        const matchDisc = selectedDisc === "ALL" || d === selectedDisc;
        const matchSub = selectedSub === "ALL" || s === selectedSub;
        if (matchDisc && matchSub) {
            const ds = (l.test || l.testDesc || l.desc || l.itemDesc || l.defectDesc || l.issue || l.itemNo || "").trim();
            if (ds) descList.push(ds);
        }
    });
    const uniqueDescs = Array.from(new Set(descList)).filter(Boolean).sort();

    let selectedDesc = currentConf.description || "ALL";
    if (selectedDesc !== "ALL" && !uniqueDescs.includes(selectedDesc)) {
        selectedDesc = "ALL";
        currentConf.description = "ALL";
    }

    let descHtml = `<option value="ALL" ${selectedDesc === "ALL" ? "selected" : ""}>-- All Items / Descriptions --</option>`;
    uniqueDescs.forEach(ds => {
        descHtml += `<option value="${ds}" ${selectedDesc === ds ? "selected" : ""}>${ds}</option>`;
    });
    descSelect.innerHTML = descHtml;
}

function onCompilerGraphFilterChange(kpiKey) {
    const discSelect = document.getElementById(`comp_${kpiKey}_disc`);
    const subDiscSelect = document.getElementById(`comp_${kpiKey}_subDisc`);
    const descSelect = document.getElementById(`comp_${kpiKey}_desc`);
    if (!appState.compiler.kpis) appState.compiler.kpis = {};
    if (!appState.compiler.kpis[kpiKey]) {
        appState.compiler.kpis[kpiKey] = { enabled: true, chart: true, discipline: "ALL", subDiscipline: "ALL", description: "ALL" };
    }

    if (discSelect) appState.compiler.kpis[kpiKey].discipline = discSelect.value;
    if (subDiscSelect) appState.compiler.kpis[kpiKey].subDiscipline = subDiscSelect.value;
    if (descSelect) appState.compiler.kpis[kpiKey].description = descSelect.value;

    saveAppState();
    populateCompilerGraphFilterOptions(kpiKey);
    compileExecutiveReport();
}

function populateCompilerProjectsList() {
    const checklistBox = document.getElementById("compilerProjectChecklistBox");
    const badge = document.getElementById("selectedProjectsCountBadge");
    if (!checklistBox) return;

    const allProjects = Object.values(appState.projects || {});
    if (allProjects.length === 0) return;

    if (!appState.compiler.selectedProjectIds || appState.compiler.selectedProjectIds.length === 0) {
        appState.compiler.selectedProjectIds = allProjects.map(p => p.id);
    }

    let html = "";
    allProjects.forEach(proj => {
        const isChecked = appState.compiler.selectedProjectIds.includes(proj.id);
        html += `
            <label class="project-check-item">
                <input type="checkbox" value="${proj.id}" ${isChecked ? 'checked' : ''} onchange="onCompilerProjectCheckChange()">
                <span>${proj.name} <small style="color: var(--text-muted);">(${proj.code || 'N/A'})</small></span>
            </label>
        `;
    });
    checklistBox.innerHTML = html;

    const selCount = appState.compiler.selectedProjectIds.length;
    if (badge) {
        if (appState.compiler.projectScope === "ALL" || selCount === allProjects.length) {
            badge.innerText = `All Projects (${allProjects.length})`;
            badge.className = "badge badge-locked";
        } else {
            badge.innerText = `${selCount} of ${allProjects.length} Selected`;
            badge.className = "badge badge-primary";
        }
    }
}

function setCompilerProjectScope(scope) {
    appState.compiler.projectScope = scope;
    const scopeAllBtn = document.getElementById("scopeAllBtn");
    const scopeCustomBtn = document.getElementById("scopeCustomBtn");
    const checklistBox = document.getElementById("compilerProjectChecklistBox");

    if (scope === "ALL") {
        if (scopeAllBtn) scopeAllBtn.classList.add("active");
        if (scopeCustomBtn) scopeCustomBtn.classList.remove("active");
        if (checklistBox) checklistBox.style.display = "none";
        appState.compiler.selectedProjectIds = Object.keys(appState.projects || {});
    } else {
        if (scopeAllBtn) scopeAllBtn.classList.remove("active");
        if (scopeCustomBtn) scopeCustomBtn.classList.add("active");
        if (checklistBox) checklistBox.style.display = "flex";
    }

    populateCompilerProjectsList();
    populateAllCompilerGraphFilters();
    saveAppState();
    compileExecutiveReport();
}

function onCompilerProjectCheckChange() {
    const checklistBox = document.getElementById("compilerProjectChecklistBox");
    if (!checklistBox) return;

    const checkedBoxes = checklistBox.querySelectorAll("input[type='checkbox']:checked");
    const selected = Array.from(checkedBoxes).map(cb => cb.value);

    if (selected.length === 0) {
        const first = checklistBox.querySelector("input[type='checkbox']");
        if (first) {
            first.checked = true;
            selected.push(first.value);
        }
    }

    appState.compiler.selectedProjectIds = selected;
    populateCompilerProjectsList();
    populateAllCompilerGraphFilters();
    saveAppState();
    compileExecutiveReport();
}

function onCompilerTimeRangeChange() {
    const select = document.getElementById("compilerTimeRangeSelect");
    if (!select) return;
    appState.compiler.timeRange = select.value;
    populateAllCompilerGraphFilters();
    saveAppState();
    compileExecutiveReport();
}

function onCompilerCompModeChange() {
    const select = document.getElementById("compilerCompModeSelect");
    if (!select) return;
    appState.compiler.compMode = select.value;
    const popBox = document.getElementById("compilerPopContainer");
    if (popBox) {
        popBox.style.display = (select.value === "pop") ? "grid" : "none";
    }
    saveAppState();
    compileExecutiveReport();
}

function onCompilerComparativePeriodChange() {
    const base = document.getElementById("compilerBaseQuarter");
    const target = document.getElementById("compilerTargetQuarter");
    if (base) appState.compiler.baseQuarter = base.value;
    if (target) appState.compiler.targetQuarter = target.value;
    saveAppState();
    compileExecutiveReport();
}

function toggleCompilerKpiCard(kpiKey) {
    const mainCheck = document.getElementById(`comp_${kpiKey}`);
    const card = document.getElementById(`card_comp_${kpiKey}`);
    if (mainCheck && card) {
        if (mainCheck.checked) card.classList.add("active");
        else card.classList.remove("active");
    }
    onCompilerOptionChange();
}

function onCompilerOptionChange() {
    const includeRadarCheck = document.getElementById("comp_includeRadarChart");
    if (includeRadarCheck) {
        appState.compiler.includeRadarChart = includeRadarCheck.checked;
    }
    const includeNarrativesCheck = document.getElementById("comp_includeGraphNarratives");
    if (includeNarrativesCheck) {
        appState.compiler.includeGraphNarratives = includeNarrativesCheck.checked;
    }
    const includeLogsCheck = document.getElementById("comp_includeLogs");
    if (includeLogsCheck) {
        appState.compiler.includeLogs = includeLogsCheck.checked;
    }
    const includeGovCheck = document.getElementById("comp_includeGovernanceNotes");
    if (includeGovCheck) {
        appState.compiler.includeGovernanceNotes = includeGovCheck.checked;
    }

    if (!appState.compiler.kpis) appState.compiler.kpis = {};

    ["kpi1", "kpi2", "kpi3", "kpi4", "kpi5"].forEach((kpiKey, idx) => {
        const num = idx + 1;
        const mainCheck = document.getElementById(`comp_${kpiKey}`);
        const chartCheck = document.getElementById(`comp_chart${num}`);
        const discSelect = document.getElementById(`comp_${kpiKey}_disc`);
        const subDiscSelect = document.getElementById(`comp_${kpiKey}_subDisc`);
        const descSelect = document.getElementById(`comp_${kpiKey}_desc`);
        const filtersDiv = document.getElementById(`filters_comp_${kpiKey}`);

        if (!appState.compiler.kpis[kpiKey]) appState.compiler.kpis[kpiKey] = {};
        appState.compiler.kpis[kpiKey].enabled = mainCheck ? mainCheck.checked : true;
        appState.compiler.kpis[kpiKey].chart = chartCheck ? chartCheck.checked : true;
        if (discSelect) appState.compiler.kpis[kpiKey].discipline = discSelect.value;
        if (subDiscSelect) appState.compiler.kpis[kpiKey].subDiscipline = subDiscSelect.value;
        if (descSelect) appState.compiler.kpis[kpiKey].description = descSelect.value;
        if (kpiKey === "kpi5") {
            const viewModeSelect = document.getElementById("comp_kpi5_viewMode");
            if (viewModeSelect) appState.compiler.kpis.kpi5.viewMode = viewModeSelect.value;
            syncCompilerKPI5Checkboxes();
        }

        if (filtersDiv) {
            filtersDiv.style.display = (mainCheck && mainCheck.checked && chartCheck && chartCheck.checked) ? "flex" : "none";
        }
    });
    saveAppState();
    compileExecutiveReport();
}

function setAllCompilerKPIs(enable) {
    ["kpi1", "kpi2", "kpi3", "kpi4", "kpi5"].forEach(kpiKey => {
        const mainCheck = document.getElementById(`comp_${kpiKey}`);
        const card = document.getElementById(`card_comp_${kpiKey}`);
        if (mainCheck) mainCheck.checked = enable;
        if (card) {
            if (enable) card.classList.add("active");
            else card.classList.remove("active");
        }
        if (!appState.compiler.kpis[kpiKey]) appState.compiler.kpis[kpiKey] = {};
        appState.compiler.kpis[kpiKey].enabled = enable;
    });
    onCompilerOptionChange();
}

function setAllCompilerGraphs(enable) {
    for (let i = 1; i <= 5; i++) {
        const chartCheck = document.getElementById(`comp_chart${i}`);
        if (chartCheck) chartCheck.checked = enable;
        const kpiKey = `kpi${i}`;
        if (!appState.compiler.kpis[kpiKey]) appState.compiler.kpis[kpiKey] = {};
        appState.compiler.kpis[kpiKey].chart = enable;
    }
    onCompilerOptionChange();
}

function resetCompilerDefaults() {
    appState.compiler = {
        projectScope: "ALL",
        selectedProjectIds: Object.keys(appState.projects || {}),
        timeRange: "FY",
        compMode: "pop",
        baseQuarter: "Q1",
        targetQuarter: "Q2",
        includeRadarChart: true,
        includeGraphNarratives: true,
        includeLogs: true,
        includeGovernanceNotes: true,
        governanceNotes: { ...DEFAULT_GOVERNANCE_NOTES },
        kpis: {
            kpi1: { enabled: true, chart: true, discipline: "ALL", subDiscipline: "ALL", description: "ALL" },
            kpi2: { enabled: true, chart: true, discipline: "ALL", subDiscipline: "ALL", description: "ALL" },
            kpi3: { enabled: true, chart: true, discipline: "ALL", subDiscipline: "ALL", description: "ALL" },
            kpi4: { enabled: true, chart: true, discipline: "ALL", subDiscipline: "ALL", description: "ALL" },
            kpi5: { enabled: true, chart: true, discipline: "ALL", subDiscipline: "ALL", description: "ALL" }
        }
    };
    initExecutiveCompiler();
}

function getCompilerTargetProjects() {
    const allProjs = Object.values(appState.projects || {});
    if (allProjs.length === 0) return [];
    if (appState.compiler.projectScope === "ALL") {
        return allProjs;
    }
    const ids = appState.compiler.selectedProjectIds || [];
    const matched = allProjs.filter(p => ids.includes(p.id));
    return matched.length > 0 ? matched : allProjs;
}

function isQuarterInTimeRange(q, range) {
    if (!q) return true;
    if (range === "FY" || range === "ALL") return true;
    if (range === "Q1-Q2") return q === "Q1" || q === "Q2";
    if (range === "Q1-Q3") return q === "Q1" || q === "Q2" || q === "Q3";
    return q === range;
}

function calculatePeriodKpiStats(targetProjects, quarterPredicate) {
    const totalBudget = targetProjects.reduce((s, p) => s + (parseFloat(p.budget) || 0), 0) || 1;
    const totalArea = targetProjects.reduce((s, p) => s + (parseFloat(p.area) || 0), 0) || 1;

    let kpi1 = [], kpi2 = [], kpi3 = [], kpi4 = [], kpi5 = [];
    targetProjects.forEach(p => {
        (p.kpi1_logs || []).forEach(l => { if (quarterPredicate(l.quarter)) kpi1.push({ ...l, projectName: p.name }); });
        (p.kpi2_logs || []).forEach(l => { if (quarterPredicate(l.quarter)) kpi2.push({ ...l, projectName: p.name }); });
        (p.kpi3_logs || []).forEach(l => { if (quarterPredicate(l.quarter)) kpi3.push({ ...l, projectName: p.name }); });
        (p.kpi4_logs || []).forEach(l => { if (quarterPredicate(l.quarter)) kpi4.push({ ...l, projectName: p.name }); });
        (p.kpi5_logs || []).forEach(l => { if (quarterPredicate(l.quarter)) kpi5.push({ ...l, projectName: p.name }); });
    });

    // KPI 1 FTQ
    const ftqTotal = kpi1.length;
    let ftqPass = 0;
    kpi1.forEach(l => { if (l.remarks === "Pass") ftqPass++; });
    const ftqVal = ftqTotal > 0 ? (ftqPass / ftqTotal) * 100 : 100;
    let ftqStatus = "green";
    if (ftqVal < 90) ftqStatus = "red";
    else if (ftqVal < 95) ftqStatus = "yellow";

    // KPI 2 Rework
    let reworkCost = 0;
    let approvedReworkBasis = 0;
    kpi2.forEach(l => {
        const qty = parseFloat(l.qty) || 1;
        const labor = parseFloat(l.labor) || 0;
        const mat = parseFloat(l.mat) || 0;
        reworkCost += (labor + mat) * qty;
        approvedReworkBasis += (parseFloat(l.approvedCost) !== undefined && !isNaN(parseFloat(l.approvedCost)) ? parseFloat(l.approvedCost) : 0);
    });
    const reworkBasis = approvedReworkBasis > 0 ? approvedReworkBasis : totalBudget;
    const reworkRateVal = (reworkCost / reworkBasis) * 100;
    let reworkStatus = "green";
    if (reworkRateVal > 2.0) reworkStatus = "red";
    else if (reworkRateVal >= 1.0) reworkStatus = "yellow";

    // KPI 3 Defects
    const defectCount = kpi3.length;
    const defectDensityVal = (defectCount / totalArea) * 100;
    let defectStatus = "green";
    if (defectDensityVal > 2.0) defectStatus = "red";
    else if (defectDensityVal >= 1.5) defectStatus = "yellow";

    // KPI 4 NCR
    let closedNCR = 0, openNCR = 0, totalNCRDays = 0;
    kpi4.forEach(l => {
        if (l.status === "Closed" || l.status === "Resolved") {
            closedNCR++;
            totalNCRDays += parseFloat(l.duration) || 0;
        } else {
            openNCR++;
        }
    });
    const avgNCRDaysVal = closedNCR > 0 ? (totalNCRDays / closedNCR) : 0;
    let ncrStatus = "green";
    if (avgNCRDaysVal > 7.0) ncrStatus = "red";
    else if (avgNCRDaysVal > 5.0) ncrStatus = "yellow";

    // KPI 5 Punch
    let critPunch = 0, minorPunch = 0, closedPunch = 0, overduePunch = 0;
    const nowMs = Date.now();
    kpi5.forEach(l => {
        const isClosed = l.status === "Signed-off" || l.status === "Closed" || l.status === "Rectified";
        if (isClosed) {
            closedPunch++;
            if (l.targetDate && l.actualDateRectified && new Date(l.actualDateRectified).getTime() > new Date(l.targetDate).getTime()) {
                overduePunch++;
            }
        } else {
            if (l.cat === "Critical") critPunch++;
            else minorPunch++;
            if (l.targetDate && new Date(l.targetDate).getTime() < nowMs) {
                overduePunch++;
            }
        }
    });
    const totalPunch = kpi5.length;
    const onTimeRate = totalPunch > 0 ? Math.max(0, Math.round(((totalPunch - overduePunch) / totalPunch) * 100)) : 100;
    let punchStatus = "green";
    if (critPunch > 0 || onTimeRate < 70) punchStatus = "red";
    else if (onTimeRate < 90 || minorPunch > 10) punchStatus = "yellow";

    let greenCount = 0;
    let enabledCount = 0;
    if (appState.compiler?.kpis?.kpi1?.enabled !== false) { enabledCount++; if (ftqStatus === "green") greenCount++; }
    if (appState.compiler?.kpis?.kpi2?.enabled !== false) { enabledCount++; if (reworkStatus === "green") greenCount++; }
    if (appState.compiler?.kpis?.kpi3?.enabled !== false) { enabledCount++; if (defectStatus === "green") greenCount++; }
    if (appState.compiler?.kpis?.kpi4?.enabled !== false) { enabledCount++; if (ncrStatus === "green") greenCount++; }
    if (appState.compiler?.kpis?.kpi5?.enabled !== false) { enabledCount++; if (punchStatus === "green") greenCount++; }

    const overallPct = enabledCount > 0 ? Math.round((greenCount / enabledCount) * 100) : 100;

    return {
        totalBudget,
        totalArea,
        ftq: { total: ftqTotal, pass: ftqPass, fail: ftqTotal - ftqPass, val: ftqVal, status: ftqStatus, logs: kpi1 },
        rework: { totalCost: reworkCost, val: reworkRateVal, status: reworkStatus, logs: kpi2 },
        defect: { totalCount: defectCount, val: defectDensityVal, status: defectStatus, logs: kpi3 },
        ncr: { total: kpi4.length, closed: closedNCR, open: openNCR, val: avgNCRDaysVal, status: ncrStatus, logs: kpi4 },
        punch: { total: totalPunch, closed: closedPunch, critical: critPunch, minor: minorPunch, overdue: overduePunch, onTimeRate: onTimeRate, val: onTimeRate, status: punchStatus, logs: kpi5 },
        greenCount,
        enabledCount,
        overallPct
    };
}

// MASTER COMPILER EXECUTION
function compileExecutiveReport() {
    const targetProjects = getCompilerTargetProjects();
    const timeRange = appState.compiler.timeRange || "FY";
    const compMode = appState.compiler.compMode || "pop";
    const baseQ = appState.compiler.baseQuarter || "Q1";
    const targetQ = appState.compiler.targetQuarter || "Q2";

    // Update Header Metadata
    const metaProjectsEl = document.getElementById("repMetaProjects");
    const metaTimeframeEl = document.getElementById("repMetaTimeframe");
    const metaModeEl = document.getElementById("repMetaMode");
    const metaBudgetEl = document.getElementById("repMetaBudget");
    const metaAreaEl = document.getElementById("repMetaArea");
    const genDateEl = document.getElementById("repGeneratedDate");

    const timeLabels = {
        "FY": "Full Year (Cumulative Q1 – Q4)",
        "Q1-Q2": "Cumulative Q1 – Q2",
        "Q1-Q3": "Cumulative Q1 – Q3",
        "Q1": "Quarter 1 (Jan – Mar)",
        "Q2": "Quarter 2 (Apr – Jun)",
        "Q3": "Quarter 3 (Jul – Sep)",
        "Q4": "Quarter 4 (Oct – Dec)"
    };

    const compLabels = {
        "none": "Standard Timeframe (Single Period)",
        "pop": `Period-over-Period (${baseQ} vs ${targetQ})`,
        "all-quarters": "All-Quarter Summary (Q1 vs Q2 vs Q3 vs Q4)"
    };

    const totalBudget = targetProjects.reduce((s, p) => s + (parseFloat(p.budget) || 0), 0);
    const totalArea = targetProjects.reduce((s, p) => s + (parseFloat(p.area) || 0), 0);

    if (metaProjectsEl) {
        metaProjectsEl.innerText = targetProjects.length === 1 
            ? `${targetProjects[0].name} (${targetProjects[0].code || 'N/A'})` 
            : `Selected Combined Portfolio (${targetProjects.length} Projects: ${targetProjects.map(p => p.name).join(', ')})`;
    }
    if (metaTimeframeEl) metaTimeframeEl.innerText = timeLabels[timeRange] || timeRange;
    if (metaModeEl) metaModeEl.innerText = compLabels[compMode] || compMode;
    if (metaBudgetEl) metaBudgetEl.innerText = `₱${totalBudget.toLocaleString()}`;
    if (metaAreaEl) metaAreaEl.innerText = `${totalArea.toLocaleString()} sq. m`;
    if (genDateEl) genDateEl.innerText = new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });

    // Compute Stats for Main Timeframe
    const mainStats = calculatePeriodKpiStats(targetProjects, q => isQuarterInTimeRange(q, timeRange));

    // Update Overall Compliance Score Badge
    const scoreBadge = document.getElementById("repOverallScoreBadge");
    if (scoreBadge) {
        const badgeClass = mainStats.overallPct === 100 ? "badge-green" : (mainStats.overallPct >= 60 ? "badge-yellow" : "badge-red");
        scoreBadge.className = `status-badge ${badgeClass}`;
        scoreBadge.innerText = `${mainStats.overallPct === 100 ? 'EXCELLENT COMPLIANCE' : (mainStats.overallPct >= 60 ? 'ACCEPTABLE PROGRESS' : 'ACTION REQUIRED')} (${mainStats.overallPct}%)`;
    }

    // Compute Comparative Stats
    const baseStats = calculatePeriodKpiStats(targetProjects, q => q === baseQ);
    const targetStats = calculatePeriodKpiStats(targetProjects, q => q === targetQ);
    const allQuartersStats = {
        Q1: calculatePeriodKpiStats(targetProjects, q => q === "Q1"),
        Q2: calculatePeriodKpiStats(targetProjects, q => q === "Q2"),
        Q3: calculatePeriodKpiStats(targetProjects, q => q === "Q3"),
        Q4: calculatePeriodKpiStats(targetProjects, q => q === "Q4"),
        FY: mainStats
    };

    // Render Multi-KPI Performance Radar (Web) Analytics Section (if enabled)
    renderCompiledRadarSection(targetProjects, timeRange);

    // Generate Executive Narrative & Callouts
    generateExecutiveNarrative(mainStats, baseStats, targetStats, allQuartersStats, compMode);

    // Render Comparative Variance Matrix
    renderComparativeVarianceMatrix(mainStats, baseStats, targetStats, allQuartersStats, compMode, baseQ, targetQ);

    // Render Individual Project Performance Matrix with Comparison Mode
    renderIndividualProjectPerformanceMatrix(targetProjects, timeRange, compMode, baseQ, targetQ);

    // Render Dynamic Visual Analytics Charts
    renderCompiledVisualAnalytics(targetProjects, timeRange, compMode, baseQ, targetQ);

    // Render Detailed Itemized KPI Logs (if enabled)
    const logsSection = document.getElementById("repDetailedLogsSection");
    const logsContainer = document.getElementById("repDetailedLogsContainer");
    if (logsSection) {
        logsSection.style.display = appState.compiler.includeLogs !== false ? "block" : "none";
    }
    if (appState.compiler.includeLogs !== false) {
        renderCompiledKPILogs(targetProjects, timeRange);
    } else {
        if (logsContainer) logsContainer.innerHTML = "";
    }

    // Render Quality Governance & Strategic Management Directives (if enabled)
    const govSection = document.getElementById("repGovernanceNotesSection");
    if (govSection) {
        govSection.style.display = appState.compiler.includeGovernanceNotes !== false ? "block" : "none";
    }
    syncGovernancePrintViews();
}

function generateExecutiveNarrative(mainStats, baseStats, targetStats, allQuartersStats, compMode) {
    const narrativeEl = document.getElementById("repExecutiveNarrative");
    const gainsEl = document.getElementById("repGainsContent");
    const dropsEl = document.getElementById("repDropsContent");
    const anomaliesEl = document.getElementById("repAnomaliesContent");

    const targetProjects = getCompilerTargetProjects();
    const projNames = targetProjects.map(p => p.name).join(", ");

    // Main Narrative Synthesis
    let narrative = `Quality audit compilation for <strong>${projNames}</strong> reflects an aggregate compliance index of <strong>${mainStats.overallPct}%</strong> across all selected project entities. `;
    if (mainStats.overallPct === 100) {
        narrative += `All evaluated Key Performance Indicators conform fully to FCLaranang corporate QA/QC benchmarks, indicating robust trade subcontractor execution and proactive inspection verification.`;
    } else if (mainStats.overallPct >= 60) {
        narrative += `Most quality operations remain on-track; however, targeted corrective interventions are warranted in trade areas exceeding allowable rework or resolution thresholds.`;
    } else {
        narrative += `High-priority corrective actions are required to resolve persistent quality non-conformances, excessive rework expenses, and open punch items before project handover.`;
    }

    if (compMode === "pop") {
        const ftqDelta = targetStats.ftq.val - baseStats.ftq.val;
        const reworkDelta = targetStats.rework.val - baseStats.rework.val;
        narrative += ` In Period-over-Period assessment (${appState.compiler.baseQuarter} vs ${appState.compiler.targetQuarter}), FTQ pass rate shifted by <strong>${ftqDelta >= 0 ? '+' : ''}${ftqDelta.toFixed(1)}%</strong>, while quality rework expenditure shifted by <strong>${reworkDelta >= 0 ? '+' : ''}${reworkDelta.toFixed(2)}%</strong> of total contract baseline.`;
    }
    if (narrativeEl) narrativeEl.innerHTML = narrative;

    // Gains / Best Practices
    let gains = [];
    if (mainStats.ftq.val >= 90) gains.push(`High First-Time Quality testing success (${mainStats.ftq.val.toFixed(1)}% pass rate across ${mainStats.ftq.total} tests).`);
    if (mainStats.rework.val < 1.0) gains.push(`Tight rework cost containment under 1.0% of total budget (currently ₱${mainStats.rework.totalCost.toLocaleString()}).`);
    if (mainStats.defect.val < 1.5) gains.push(`Low defect occurrence density (${mainStats.defect.val.toFixed(2)} per 100 m²).`);
    if (mainStats.ncr.val <= 5.0 && mainStats.ncr.closed > 0) gains.push(`Rapid NCR resolution turnaround averaging ${mainStats.ncr.val.toFixed(1)} days.`);
    if (mainStats.punch.critical === 0) gains.push(`Zero critical handover punch list items across all audited project zones.`);
    if (gains.length === 0) gains.push(`Standard quality verification protocols are established across all active trade subcontracts.`);
    if (gainsEl) gainsEl.innerHTML = `<ul style="padding-left: 16px; margin: 0;">${gains.map(g => `<li>${g}</li>`).join('')}</ul>`;

    // Drops / Areas of Concern
    let drops = [];
    if (mainStats.ftq.val < 90) drops.push(`FTQ pass rate (${mainStats.ftq.val.toFixed(1)}%) is below the corporate benchmark of 90%.`);
    if (mainStats.rework.val >= 1.0) drops.push(`Quality rework expenses (${mainStats.rework.val.toFixed(2)}% | ₱${mainStats.rework.totalCost.toLocaleString()}) exceed the 1.0% control ceiling.`);
    if (mainStats.defect.val >= 1.5) drops.push(`Defect density (${mainStats.defect.val.toFixed(2)}) is elevated near or above the 2.0/100m² limit.`);
    if (mainStats.ncr.val > 5.0) drops.push(`NCR average closeout duration (${mainStats.ncr.val.toFixed(1)} days) exceeds the 5.0-day resolution SLA.`);
    if (mainStats.punch.critical > 0) drops.push(`${mainStats.punch.critical} critical handover punch list items require immediate rectification before client turnover.`);
    if (drops.length === 0) drops.push(`No critical performance drops identified across the audited portfolio.`);
    if (dropsEl) dropsEl.innerHTML = `<ul style="padding-left: 16px; margin: 0;">${drops.map(d => `<li>${d}</li>`).join('')}</ul>`;

    // Critical Anomalies & Immediate Actions
    let anomalies = [];
    if (mainStats.punch.critical > 0) {
        anomalies.push(`🔴 <strong>CRITICAL PUNCH:</strong> ${mainStats.punch.critical} items must be cleared before architectural sign-off.`);
    }
    if (mainStats.ncr.open > 0) {
        anomalies.push(`⚠️ <strong>OPEN NCRs:</strong> ${mainStats.ncr.open} non-conformance notices remain unclosed.`);
    }
    if (mainStats.ftq.fail > 0) {
        anomalies.push(`🧪 <strong>FAILED TESTS:</strong> ${mainStats.ftq.fail} quality field tests failed initial inspection.`);
    }
    if (anomalies.length === 0) {
        anomalies.push(`🌟 <strong>CLEAR:</strong> No critical QA/QC non-conformance anomalies detected in selected timeframe.`);
    }
    if (anomaliesEl) anomaliesEl.innerHTML = `<ul style="padding-left: 16px; margin: 0;">${anomalies.map(a => `<li>${a}</li>`).join('')}</ul>`;
}

// COMPARATIVE VARIANCE MATRIX RENDERER
function renderComparativeVarianceMatrix(mainStats, baseStats, targetStats, allQuartersStats, compMode, baseQ, targetQ) {
    const tableHead = document.getElementById("repVarianceTableHead");
    const tableBody = document.getElementById("repVarianceTableBody");
    const titleEl = document.getElementById("repVarianceHeaderTitle");
    if (!tableHead || !tableBody) return;

    if (compMode === "pop") {
        if (titleEl) titleEl.innerText = `Period-over-Period Variance Analysis (${baseQ} vs ${targetQ})`;
        tableHead.innerHTML = `
            <tr>
                <th>Evaluated KPI</th>
                <th>Target Benchmark</th>
                <th>${baseQ} Baseline</th>
                <th>${targetQ} Target</th>
                <th>Absolute Shift (Δ)</th>
                <th>Percentage Shift (Δ%)</th>
                <th>Quality Trajectory</th>
            </tr>
        `;

        let kpis = [
            {
                key: "kpi1",
                name: "1. FTQ Pass Rate (%)",
                bench: "≥ 90.0%",
                base: baseStats.ftq.val,
                target: targetStats.ftq.val,
                unit: "%",
                higherIsBetter: true
            },
            {
                key: "kpi2",
                name: "2. Quality Rework BOQ Rate (% Approved Cost)",
                bench: "< 1.00%",
                base: baseStats.rework.val,
                target: targetStats.rework.val,
                unit: "%",
                higherIsBetter: false
            },
            {
                key: "kpi3",
                name: "3. Defect Density (per 100m²)",
                bench: "< 2.00",
                base: baseStats.defect.val,
                target: targetStats.defect.val,
                unit: "",
                higherIsBetter: false
            },
            {
                key: "kpi4",
                name: "4. NCR Resolution Duration (Days)",
                bench: "≤ 5.0 Days",
                base: baseStats.ncr.val,
                target: targetStats.ncr.val,
                unit: " d",
                higherIsBetter: false
            },
            {
                key: "kpi5",
                name: "5. Handover Punch List Target Clearance (%)",
                bench: "100% On-Time (0 Crit)",
                base: baseStats.punch.onTimeRate,
                target: targetStats.punch.onTimeRate,
                unit: "%",
                higherIsBetter: true
            }
        ];
        kpis = kpis.filter(k => appState.compiler?.kpis?.[k.key]?.enabled !== false);

        let html = "";
        kpis.forEach(k => {
            const absDelta = k.target - k.base;
            let pctDelta = k.base !== 0 ? (absDelta / Math.abs(k.base)) * 100 : 0;
            const isImproved = k.higherIsBetter ? (absDelta > 0.05) : (absDelta < -0.05);
            const isWorse = k.higherIsBetter ? (absDelta < -0.05) : (absDelta > 0.05);

            let pillClass = "neutral";
            let trajectoryText = "➖ Neutral / Steady";
            if (isImproved) {
                pillClass = "positive";
                trajectoryText = "📈 Improvement";
            } else if (isWorse) {
                pillClass = "negative";
                trajectoryText = "📉 Quality Drop";
            }

            const absText = (absDelta >= 0 ? `+${absDelta.toFixed(2)}` : absDelta.toFixed(2)) + k.unit;
            const pctText = (pctDelta >= 0 ? `+${pctDelta.toFixed(1)}%` : `${pctDelta.toFixed(1)}%`);

            html += `
                <tr>
                    <td><strong>${k.name}</strong></td>
                    <td>${k.bench}</td>
                    <td>${k.base.toFixed(2)}${k.unit}</td>
                    <td><strong>${k.target.toFixed(2)}${k.unit}</strong></td>
                    <td>${absText}</td>
                    <td><span class="variance-pill ${pillClass}">${pctText}</span></td>
                    <td><span class="variance-pill ${pillClass}">${trajectoryText}</span></td>
                </tr>
            `;
        });
        tableBody.innerHTML = html;

    } else if (compMode === "all-quarters") {
        if (titleEl) titleEl.innerText = "All-Quarter Cross-Comparison Matrix (Q1 vs Q2 vs Q3 vs Q4 vs Full Year)";
        tableHead.innerHTML = `
            <tr>
                <th>Evaluated KPI</th>
                <th>Target Benchmark</th>
                <th>Q1 Result</th>
                <th>Q2 Result</th>
                <th>Q3 Result</th>
                <th>Q4 Result</th>
                <th>Full Year Aggregated</th>
                <th>Annual Status</th>
            </tr>
        `;

        let kpis = [
            { key: "kpi1", name: "1. FTQ Pass Rate (%)", bench: "≥ 90.0%", q1: `${allQuartersStats.Q1.ftq.val.toFixed(1)}%`, q2: `${allQuartersStats.Q2.ftq.val.toFixed(1)}%`, q3: `${allQuartersStats.Q3.ftq.val.toFixed(1)}%`, q4: `${allQuartersStats.Q4.ftq.val.toFixed(1)}%`, fy: `${mainStats.ftq.val.toFixed(1)}%`, status: mainStats.ftq.status },
            { key: "kpi2", name: "2. Quality Rework BOQ Rate (% Approved Cost)", bench: "< 1.00%", q1: `${allQuartersStats.Q1.rework.val.toFixed(2)}%`, q2: `${allQuartersStats.Q2.rework.val.toFixed(2)}%`, q3: `${allQuartersStats.Q3.rework.val.toFixed(2)}%`, q4: `${allQuartersStats.Q4.rework.val.toFixed(2)}%`, fy: `${mainStats.rework.val.toFixed(2)}%`, status: mainStats.rework.status },
            { key: "kpi3", name: "3. Defect Density (per 100m²)", bench: "< 2.00", q1: allQuartersStats.Q1.defect.val.toFixed(2), q2: allQuartersStats.Q2.defect.val.toFixed(2), q3: allQuartersStats.Q3.defect.val.toFixed(2), q4: allQuartersStats.Q4.defect.val.toFixed(2), fy: mainStats.defect.val.toFixed(2), status: mainStats.defect.status },
            { key: "kpi4", name: "4. NCR Resolution Duration (Days)", bench: "≤ 5.0 Days", q1: `${allQuartersStats.Q1.ncr.val.toFixed(1)} d`, q2: `${allQuartersStats.Q2.ncr.val.toFixed(1)} d`, q3: `${allQuartersStats.Q3.ncr.val.toFixed(1)} d`, q4: `${allQuartersStats.Q4.ncr.val.toFixed(1)} d`, fy: `${mainStats.ncr.val.toFixed(1)} d`, status: mainStats.ncr.status },
            { key: "kpi5", name: "5. Handover Punch List Target Clearance (%)", bench: "100% On-Time (0 Crit)", q1: `${allQuartersStats.Q1.punch.onTimeRate}%`, q2: `${allQuartersStats.Q2.punch.onTimeRate}%`, q3: `${allQuartersStats.Q3.punch.onTimeRate}%`, q4: `${allQuartersStats.Q4.punch.onTimeRate}%`, fy: `${mainStats.punch.onTimeRate}%`, status: mainStats.punch.status }
        ];
        kpis = kpis.filter(k => appState.compiler?.kpis?.[k.key]?.enabled !== false);

        let html = "";
        kpis.forEach(k => {
            const badgeClass = k.status === "green" ? "badge-green" : (k.status === "yellow" ? "badge-yellow" : "badge-red");
            html += `
                <tr>
                    <td><strong>${k.name}</strong></td>
                    <td>${k.bench}</td>
                    <td>${k.q1}</td>
                    <td>${k.q2}</td>
                    <td>${k.q3}</td>
                    <td>${k.q4}</td>
                    <td><strong>${k.fy}</strong></td>
                    <td><span class="status-badge ${badgeClass}">${k.status.toUpperCase()}</span></td>
                </tr>
            `;
        });
        tableBody.innerHTML = html;

    } else {
        if (titleEl) titleEl.innerText = "Single Timeframe Quality Performance Overview";
        tableHead.innerHTML = `
            <tr>
                <th>Key Performance Indicator</th>
                <th>Target Benchmark</th>
                <th>Evaluated Result</th>
                <th>Compliance Status</th>
                <th>Assessment & Trend</th>
            </tr>
        `;
        let kpis = [
            { key: "kpi1", name: "1. FTQ Pass Rate (%)", bench: "≥ 90.0%", val: `${mainStats.ftq.val.toFixed(1)}%`, status: mainStats.ftq.status, note: "Verified across field test logs" },
            { key: "kpi2", name: "2. Quality Rework BOQ Rate (% Approved Cost)", bench: "< 1.00%", val: `${mainStats.rework.val.toFixed(2)}% (₱${mainStats.rework.totalCost.toLocaleString()})`, status: mainStats.rework.status, note: "Calculated against approved item contract cost" },
            { key: "kpi3", name: "3. Defect Density (per 100m²)", bench: "< 2.00", val: `${mainStats.defect.val.toFixed(2)}`, status: mainStats.defect.status, note: `Total ${mainStats.defect.totalCount} logged defects` },
            { key: "kpi4", name: "4. NCR Resolution Duration (Days)", bench: "≤ 5.0 Days", val: mainStats.ncr.closed > 0 ? `${mainStats.ncr.val.toFixed(1)} Days` : "No Closed NCRs", status: mainStats.ncr.status, note: `${mainStats.ncr.closed} closed, ${mainStats.ncr.open} open` },
            { key: "kpi5", name: "5. Handover Punch List Target Clearance (%)", bench: "100% On-Time (0 Crit)", val: `${mainStats.punch.onTimeRate}% (${mainStats.punch.closed}/${mainStats.punch.total} Cleared, ${mainStats.punch.critical} Crit)`, status: mainStats.punch.status, note: `${mainStats.punch.overdue} overdue snags` }
        ];
        kpis = kpis.filter(k => appState.compiler?.kpis?.[k.key]?.enabled !== false);

        let html = "";
        kpis.forEach(k => {
            const badgeClass = k.status === "green" ? "badge-green" : (k.status === "yellow" ? "badge-yellow" : "badge-red");
            html += `
                <tr>
                    <td><strong>${k.name}</strong></td>
                    <td>${k.bench}</td>
                    <td><strong>${k.val}</strong></td>
                    <td><span class="status-badge ${badgeClass}">${k.status.toUpperCase()}</span></td>
                    <td>${k.note}</td>
                </tr>
            `;
        });
        tableBody.innerHTML = html;
    }
}

// ==========================================================================
// 🏗️ EXECUTIVE REPORT: INDIVIDUAL PROJECT PERFORMANCE MATRIX & COMPARISON
// ==========================================================================

function calculateIndividualProjectKPIs(proj, quarterPredicate) {
    if (!proj) return null;
    const budget = parseFloat(proj.budget) || 1;
    const area = parseFloat(proj.area) || 1;
    const location = proj.location || proj.projectLocation || "N/A";
    const turnoverDate = proj.turnoverDate || proj.targetCompletion || "N/A";

    const kpi1Logs = (proj.kpi1_logs || []).filter(l => !quarterPredicate || quarterPredicate(l.quarter));
    const kpi2Logs = (proj.kpi2_logs || []).filter(l => !quarterPredicate || quarterPredicate(l.quarter));
    const kpi3Logs = (proj.kpi3_logs || []).filter(l => !quarterPredicate || quarterPredicate(l.quarter));
    const kpi4Logs = (proj.kpi4_logs || []).filter(l => !quarterPredicate || quarterPredicate(l.quarter));
    const kpi5Logs = (proj.kpi5_logs || []).filter(l => !quarterPredicate || quarterPredicate(l.quarter));

    // 1. FTQ
    const ftqTotal = kpi1Logs.length;
    let ftqPass = 0;
    kpi1Logs.forEach(l => { if (l.remarks === "Pass") ftqPass++; });
    const ftqVal = ftqTotal > 0 ? (ftqPass / ftqTotal) * 100 : 100;
    let ftqStatus = "green";
    if (ftqVal < 90) ftqStatus = "red";
    else if (ftqVal < 95) ftqStatus = "yellow";

    // 2. Rework
    let reworkCost = 0;
    let approvedReworkBasis = 0;
    kpi2Logs.forEach(l => {
        const qty = parseFloat(l.qty) || 1;
        const labor = parseFloat(l.labor) || 0;
        const mat = parseFloat(l.mat) || 0;
        reworkCost += (labor + mat) * qty;
        approvedReworkBasis += (parseFloat(l.approvedCost) !== undefined && !isNaN(parseFloat(l.approvedCost)) ? parseFloat(l.approvedCost) : 0);
    });
    const reworkBasis = approvedReworkBasis > 0 ? approvedReworkBasis : budget;
    const reworkRateVal = (reworkCost / reworkBasis) * 100;
    let reworkStatus = "green";
    if (reworkRateVal > 2.0) reworkStatus = "red";
    else if (reworkRateVal >= 1.0) reworkStatus = "yellow";

    // 3. Defect Density
    const defectCount = kpi3Logs.length;
    const defectDensityVal = (defectCount / area) * 100;
    let defectStatus = "green";
    if (defectDensityVal > 2.0) defectStatus = "red";
    else if (defectDensityVal >= 1.5) defectStatus = "yellow";

    // 4. NCR
    let closedNCR = 0, openNCR = 0, totalNCRDays = 0;
    kpi4Logs.forEach(l => {
        if (l.status === "Closed" || l.status === "Resolved") {
            closedNCR++;
            totalNCRDays += parseFloat(l.duration) || 0;
        } else {
            openNCR++;
        }
    });
    const avgNCRDaysVal = closedNCR > 0 ? (totalNCRDays / closedNCR) : 0;
    let ncrStatus = "green";
    if (avgNCRDaysVal > 7.0) ncrStatus = "red";
    else if (avgNCRDaysVal > 5.0) ncrStatus = "yellow";

    // 5. Punch
    let critPunch = 0, minorPunch = 0, closedPunch = 0, overduePunch = 0;
    const nowMs = Date.now();
    kpi5Logs.forEach(l => {
        const isClosed = l.status === "Signed-off" || l.status === "Closed" || l.status === "Rectified";
        if (isClosed) {
            closedPunch++;
            if (l.targetDate && l.actualDateRectified && new Date(l.actualDateRectified).getTime() > new Date(l.targetDate).getTime()) {
                overduePunch++;
            }
        } else {
            if (l.cat === "Critical") critPunch++;
            else minorPunch++;
            if (l.targetDate && new Date(l.targetDate).getTime() < nowMs) {
                overduePunch++;
            }
        }
    });
    const totalPunch = kpi5Logs.length;
    const onTimeRate = totalPunch > 0 ? Math.max(0, Math.round(((totalPunch - overduePunch) / totalPunch) * 100)) : 100;
    let punchStatus = "green";
    if (critPunch > 0 || onTimeRate < 70) punchStatus = "red";
    else if (onTimeRate < 90 || minorPunch > 10) punchStatus = "yellow";

    let greenCount = 0;
    let enabledCount = 0;
    if (appState.compiler?.kpis?.kpi1?.enabled !== false) { enabledCount++; if (ftqStatus === "green") greenCount++; }
    if (appState.compiler?.kpis?.kpi2?.enabled !== false) { enabledCount++; if (reworkStatus === "green") greenCount++; }
    if (appState.compiler?.kpis?.kpi3?.enabled !== false) { enabledCount++; if (defectStatus === "green") greenCount++; }
    if (appState.compiler?.kpis?.kpi4?.enabled !== false) { enabledCount++; if (ncrStatus === "green") greenCount++; }
    if (appState.compiler?.kpis?.kpi5?.enabled !== false) { enabledCount++; if (punchStatus === "green") greenCount++; }

    const compliancePct = enabledCount > 0 ? Math.round((greenCount / enabledCount) * 100) : 100;

    return {
        id: proj.id,
        name: proj.name || "Untitled Project",
        code: proj.code || "N/A",
        location,
        budget,
        area,
        turnoverDate,
        ftq: { total: ftqTotal, pass: ftqPass, fail: ftqTotal - ftqPass, val: ftqVal, status: ftqStatus },
        rework: { totalCost: reworkCost, approvedCost: approvedReworkBasis, val: reworkRateVal, status: reworkStatus },
        defect: { totalCount: defectCount, val: defectDensityVal, status: defectStatus },
        ncr: { total: kpi4Logs.length, closed: closedNCR, open: openNCR, val: avgNCRDaysVal, status: ncrStatus },
        punch: { total: totalPunch, closed: closedPunch, critical: critPunch, minor: minorPunch, overdue: overduePunch, onTimeRate: onTimeRate, val: onTimeRate, status: punchStatus },
        greenCount,
        enabledCount,
        compliancePct
    };
}

function determineProjectQualityTrajectory(mainStats, baseStats, targetStats, compMode) {
    // 1. Critical breaches override trajectory
    if (mainStats.punch.critical > 0 || mainStats.rework.val > 2.0) {
        if (mainStats.punch.critical > 0 && mainStats.rework.val > 2.0) {
            return {
                badgeClass: "trend-critical",
                icon: "⚠️",
                label: "Critical Action",
                detail: `Severe breach: ${mainStats.punch.critical} open critical punch & ${mainStats.rework.val.toFixed(2)}% rework cap breach.`
            };
        }
        if (mainStats.punch.critical > 0) {
            return {
                badgeClass: "trend-critical",
                icon: "⚠️",
                label: "High Risk (Punch)",
                detail: `${mainStats.punch.critical} critical punch item(s) pending before turnover.`
            };
        }
        return {
            badgeClass: "trend-critical",
            icon: "⚠️",
            label: "Budget Cap Breach",
            detail: `Rework rate (${mainStats.rework.val.toFixed(2)}%) exceeds 2.0% max budget threshold.`
        };
    }

    // 2. Period-over-Period trend evaluation
    if (compMode === "pop" && baseStats && targetStats) {
        let improvementScore = 0;
        const ftqShift = targetStats.ftq.val - baseStats.ftq.val;
        if (ftqShift > 0.5) improvementScore++;
        else if (ftqShift < -0.5) improvementScore--;

        const reworkShift = targetStats.rework.val - baseStats.rework.val;
        if (reworkShift < -0.05) improvementScore++;
        else if (reworkShift > 0.05) improvementScore--;

        const defectShift = targetStats.defect.val - baseStats.defect.val;
        if (defectShift < -0.05) improvementScore++;
        else if (defectShift > 0.05) improvementScore--;

        const ncrShift = targetStats.ncr.val - baseStats.ncr.val;
        if (ncrShift < -0.5) improvementScore++;
        else if (ncrShift > 0.5) improvementScore--;

        const punchShift = targetStats.punch.critical - baseStats.punch.critical;
        if (punchShift < 0) improvementScore++;
        else if (punchShift > 0) improvementScore--;

        if (improvementScore >= 2 || (improvementScore >= 1 && mainStats.compliancePct === 100)) {
            return {
                badgeClass: "trend-improving",
                icon: "📈",
                label: "Improving Trend",
                detail: `Positive shift across ${Math.abs(improvementScore)} evaluated KPI parameters.`
            };
        } else if (improvementScore <= -2 || (improvementScore <= -1 && mainStats.compliancePct < 80)) {
            return {
                badgeClass: "trend-degrading",
                icon: "📉",
                label: "Degrading / At-Risk",
                detail: `Quality metrics show negative period drift (${improvementScore} score).`
            };
        } else {
            return {
                badgeClass: mainStats.compliancePct === 100 ? "trend-improving" : "trend-stable",
                icon: mainStats.compliancePct === 100 ? "🌟" : "➡️",
                label: mainStats.compliancePct === 100 ? "Benchmark Lead" : "Stable / Controlled",
                detail: `Consistent QA/QC performance with steady metric variance.`
            };
        }
    }

    // 3. Single timeframe baseline evaluation
    if (mainStats.compliancePct === 100) {
        return {
            badgeClass: "trend-improving",
            icon: "🌟",
            label: "Benchmark Lead",
            detail: "100% QA/QC benchmark compliance across all 5 KPIs."
        };
    } else if (mainStats.compliancePct >= 80) {
        return {
            badgeClass: "trend-stable",
            icon: "➡️",
            label: "Stable / On Track",
            detail: `${mainStats.greenCount}/5 KPIs compliant with minor trade monitoring.`
        };
    } else if (mainStats.compliancePct >= 60) {
        return {
            badgeClass: "trend-degrading",
            icon: "📉",
            label: "Quality Watch",
            detail: `${5 - mainStats.greenCount} KPIs require corrective intervention.`
        };
    } else {
        return {
            badgeClass: "trend-critical",
            icon: "⚠️",
            label: "Critical Attention",
            detail: `Multiple QA/QC threshold breaches (${mainStats.compliancePct}% Compliance).`
        };
    }
}

function generateProjectExecutiveRecommendation(mainStats) {
    if (mainStats.punch.critical > 0) {
        return {
            leadTag: "🚨 URGENT PUNCH ACTION",
            level: "rec-critical",
            actionText: `Mobilize dedicated snagging strike team to rectify <strong>${mainStats.punch.critical} critical punch item(s)</strong> before turnover deadline (Target: <strong>${mainStats.turnoverDate}</strong>).`
        };
    }

    if (mainStats.rework.val > 2.0) {
        return {
            leadTag: "🛑 BUDGET CAP BREACH",
            level: "rec-critical",
            actionText: `Rework cost rate (<strong>${mainStats.rework.val.toFixed(2)}%</strong> | <strong>₱${mainStats.rework.totalCost.toLocaleString()}</strong>) breached the 2.0% cap. Issue backcharge notices and withhold trade billing progress.`
        };
    }

    if (mainStats.ftq.val < 90.0) {
        return {
            leadTag: "🧪 QUALITY GATE AUDIT",
            level: "rec-warning",
            actionText: `First-time pass rate (<strong>${mainStats.ftq.val.toFixed(1)}%</strong>) is below the 90.0% benchmark. Implement mandatory pre-pour mock-ups & subcontractor inspection checklists.`
        };
    }

    if (mainStats.ncr.val > 7.0 || mainStats.ncr.open >= 3) {
        return {
            leadTag: "⏱️ NCR CLOSEOUT DIRECTIVE",
            level: "rec-warning",
            actionText: `NCR resolution turnaround (<strong>${mainStats.ncr.val.toFixed(1)} days</strong>, ${mainStats.ncr.open} open) exceeds the 7.0-day limit. Convene weekly closeout meetings with site management.`
        };
    }

    if (mainStats.defect.val > 2.0) {
        return {
            leadTag: "📐 DEFECT CONTAINMENT",
            level: "rec-warning",
            actionText: `Defect density (<strong>${mainStats.defect.val.toFixed(2)}/100m²</strong>) exceeds threshold. Strengthen Incoming Quality Audits (IQA) & surface protection protocols.`
        };
    }

    if (mainStats.rework.val >= 1.0) {
        return {
            leadTag: "🔨 REWORK COST CONTROL",
            level: "rec-warning",
            actionText: `Rework cost reached <strong>${mainStats.rework.val.toFixed(2)}%</strong> (₱${mainStats.rework.totalCost.toLocaleString()}). Audit high-cost trades to prevent cap breach before completion.`
        };
    }

    if (mainStats.punch.minor > 10) {
        return {
            leadTag: "📋 PUNCH RECTIFICATION",
            level: "rec-warning",
            actionText: `Accelerate resolution of <strong>${mainStats.punch.minor} minor punch items</strong> ahead of client turnover inspection on ${mainStats.turnoverDate}.`
        };
    }

    return {
        leadTag: "🏆 BENCHMARK PROTOCOL",
        level: "rec-success",
        actionText: `Exemplary QA/QC execution across all 5 performance indicators (<strong>${mainStats.compliancePct}% Compliance</strong>). Replicate site subcontractor management protocols across other projects.`
    };
}

function onProjectMatrixViewModeChange(viewMode) {
    if (!appState.compiler) appState.compiler = {};
    appState.compiler.projectMatrixViewMode = viewMode;

    const targetProjects = getCompilerTargetProjects();
    const timeRange = appState.compiler.timeRange || "FY";
    const compMode = appState.compiler.compMode || "pop";
    const baseQ = appState.compiler.baseQuarter || "Q1";
    const targetQ = appState.compiler.targetQuarter || "Q2";

    renderIndividualProjectPerformanceMatrix(targetProjects, timeRange, compMode, baseQ, targetQ);
}

function renderIndividualProjectPerformanceMatrix(targetProjects, timeRange, compMode, baseQ, targetQ) {
    const scHead = document.getElementById("repProjectMatrixScorecardHead");
    const scBody = document.getElementById("repProjectMatrixScorecardBody");
    const popHead = document.getElementById("repProjectMatrixPopHead");
    const popBody = document.getElementById("repProjectMatrixPopBody");
    const rkHead = document.getElementById("repProjectMatrixRankingHead");
    const rkBody = document.getElementById("repProjectMatrixRankingBody");

    const blockScorecard = document.getElementById("repMatrixScorecardBlock");
    const blockPop = document.getElementById("repMatrixPopBlock");
    const blockRanking = document.getElementById("repMatrixRankingBlock");

    if (!scHead || !scBody) return;

    const viewMode = appState.compiler?.projectMatrixViewMode || "all";

    // Sync button states
    const btnAll = document.getElementById("matBtnAll");
    const btnScorecard = document.getElementById("matBtnScorecard");
    const btnPop = document.getElementById("matBtnPop");
    const btnRanking = document.getElementById("matBtnRanking");

    if (btnAll) btnAll.classList.toggle("active", viewMode === "all");
    if (btnScorecard) btnScorecard.classList.toggle("active", viewMode === "scorecard");
    if (btnPop) btnPop.classList.toggle("active", viewMode === "pop_delta");
    if (btnRanking) btnRanking.classList.toggle("active", viewMode === "ranking");

    // Interactive show/hide on screen
    if (blockScorecard) blockScorecard.style.display = (viewMode === "all" || viewMode === "scorecard") ? "block" : "none";
    if (blockPop) blockPop.style.display = (viewMode === "all" || viewMode === "pop_delta") ? "block" : "none";
    if (blockRanking) blockRanking.style.display = (viewMode === "all" || viewMode === "ranking") ? "block" : "none";

    const popSubTitle = document.getElementById("repMatrixPopSubTitle");
    if (popSubTitle) {
        popSubTitle.innerText = `3.2 Period-over-Period Individual Project Shift Analysis (${baseQ} vs ${targetQ})`;
    }

    const projectData = targetProjects.map(proj => {
        const main = calculateIndividualProjectKPIs(proj, q => isQuarterInTimeRange(q, timeRange));
        const base = calculateIndividualProjectKPIs(proj, q => q === baseQ);
        const target = calculateIndividualProjectKPIs(proj, q => q === targetQ);
        const trajectory = determineProjectQualityTrajectory(main, base, target, compMode);
        const rec = generateProjectExecutiveRecommendation(main);
        return { proj, main, base, target, trajectory, rec };
    });

    // ==========================================
    // 1. RENDER FULL KPI SCORECARD TABLE (3.1)
    // ==========================================
    scHead.innerHTML = `
        <tr>
            <th style="width: 17%;">Project &amp; Location</th>
            <th style="width: 9%;">1. FTQ Pass Rate</th>
            <th style="width: 10%;">2. Quality Rework</th>
            <th style="width: 9%;">3. Defect Density</th>
            <th style="width: 9%;">4. NCR Turnaround</th>
            <th style="width: 10%;">5. Punch Clearance</th>
            <th style="width: 8%; text-align: center;">Compliance</th>
            <th style="width: 10%; text-align: center;">Trajectory</th>
            <th style="width: 18%;">Executive Action Directive</th>
        </tr>
    `;

    let scHtml = "";
    let totBudget = 0, totArea = 0, totRework = 0, totTests = 0, totPass = 0, totDefects = 0, totNCRDays = 0, totClosedNCR = 0, totPunchItems = 0, totOverduePunch = 0, totCritPunch = 0, totMinorPunch = 0;

    projectData.forEach(({ proj, main, trajectory, rec }) => {
        totBudget += main.budget;
        totArea += main.area;
        totRework += main.rework.totalCost;
        totTests += main.ftq.total;
        totPass += main.ftq.pass;
        totDefects += main.defect.totalCount;
        totPunchItems += main.punch.total;
        totOverduePunch += (main.punch.overdue || 0);
        totCritPunch += main.punch.critical;
        totMinorPunch += main.punch.minor;
        if (main.ncr.closed > 0) {
            totNCRDays += (main.ncr.val * main.ncr.closed);
            totClosedNCR += main.ncr.closed;
        }

        const ftqColor = main.ftq.status === "green" ? "#10b981" : (main.ftq.status === "yellow" ? "#f59e0b" : "#ef4444");
        const reworkColor = main.rework.status === "green" ? "#10b981" : (main.rework.status === "yellow" ? "#f59e0b" : "#ef4444");
        const defectColor = main.defect.status === "green" ? "#10b981" : (main.defect.status === "yellow" ? "#f59e0b" : "#ef4444");
        const ncrColor = main.ncr.status === "green" ? "#10b981" : (main.ncr.status === "yellow" ? "#f59e0b" : "#ef4444");
        const punchColor = main.punch.status === "green" ? "#10b981" : (main.punch.status === "yellow" ? "#f59e0b" : "#ef4444");
        const compBadgeClass = main.compliancePct === 100 ? "badge-green" : (main.compliancePct >= 60 ? "badge-yellow" : "badge-red");

        scHtml += `
            <tr>
                <td>
                    <div class="project-name-cell">
                        <span class="project-name-title">
                            ${proj.name}
                            <span class="badge badge-locked" style="font-size: 8.5px;">${proj.code || 'N/A'}</span>
                        </span>
                        <span class="project-meta-chip">📍 ${main.location}</span>
                        <span class="project-meta-chip">💰 ₱${main.budget.toLocaleString()} | 📐 ${main.area.toLocaleString()} m²</span>
                    </div>
                </td>
                <td>
                    <div class="matrix-kpi-chip">
                        <span class="matrix-kpi-val" style="color: ${ftqColor};">${main.ftq.val.toFixed(1)}%</span>
                        <span class="matrix-kpi-sub">${main.ftq.pass}/${main.ftq.total} Tests (${main.ftq.val >= 90 ? 'Pass' : 'Breach'})</span>
                    </div>
                </td>
                <td>
                    <div class="matrix-kpi-chip">
                        <span class="matrix-kpi-val" style="color: ${reworkColor};">${main.rework.val.toFixed(2)}%</span>
                        <span class="matrix-kpi-sub">₱${main.rework.totalCost.toLocaleString()} (Cap: 2.0%)</span>
                    </div>
                </td>
                <td>
                    <div class="matrix-kpi-chip">
                        <span class="matrix-kpi-val" style="color: ${defectColor};">${main.defect.val.toFixed(2)}</span>
                        <span class="matrix-kpi-sub">${main.defect.totalCount} defects (Cap: 2.0)</span>
                    </div>
                </td>
                <td>
                    <div class="matrix-kpi-chip">
                        <span class="matrix-kpi-val" style="color: ${ncrColor};">${main.ncr.closed > 0 ? `${main.ncr.val.toFixed(1)}d` : 'No Closed'}</span>
                        <span class="matrix-kpi-sub">${main.ncr.open} Open | ${main.ncr.closed} Closed</span>
                    </div>
                </td>
                <td>
                    <div class="matrix-kpi-chip">
                        <span class="matrix-kpi-val" style="color: ${punchColor};">${main.punch.onTimeRate}% On-Time</span>
                        <span class="matrix-kpi-sub">${main.punch.closed}/${main.punch.total} Cleared (${main.punch.critical} Crit)</span>
                    </div>
                </td>
                <td style="text-align: center;">
                    <div class="compliance-badge-cell">
                        <span class="status-badge ${compBadgeClass}" style="font-size: 11px; font-weight: 800;">
                            ${main.compliancePct}%
                        </span>
                        <span style="font-size: 9px; color: var(--text-muted);">${main.greenCount}/5 Met</span>
                    </div>
                </td>
                <td style="text-align: center;">
                    <span class="trajectory-badge ${trajectory.badgeClass}" title="${trajectory.detail}">
                        ${trajectory.icon} ${trajectory.label}
                    </span>
                </td>
                <td>
                    <div class="recommendation-box ${rec.level}">
                        <div style="font-weight: 800; font-size: 9.5px; margin-bottom: 2px;">${rec.leadTag}:</div>
                        ${rec.actionText}
                    </div>
                </td>
            </tr>
        `;
    });

    const portFTQ = totTests > 0 ? (totPass / totTests) * 100 : 100;
    const portRework = totBudget > 0 ? (totRework / totBudget) * 100 : 0;
    const portDefect = totArea > 0 ? (totDefects / totArea) * 100 : 0;
    const portNCRDays = totClosedNCR > 0 ? (totNCRDays / totClosedNCR) : 0;
    const portPunchOnTime = totPunchItems > 0 ? Math.max(0, Math.round(((totPunchItems - totOverduePunch) / totPunchItems) * 100)) : 100;

    scHtml += `
        <tr style="background: var(--bg-card-header); font-weight: 700; border-top: 2px solid var(--border-color);">
            <td>
                <div style="font-weight: 800; font-size: 11.5px; color: var(--text-primary);">
                    🏢 PORTFOLIO TOTAL / AVG
                </div>
                <span style="font-size: 9.5px; color: var(--text-secondary);">${targetProjects.length} Projects Scope</span>
            </td>
            <td>
                <span style="font-weight: 800; color: ${portFTQ >= 90 ? '#10b981' : '#ef4444'};">${portFTQ.toFixed(1)}%</span>
                <div style="font-size: 9px; color: var(--text-muted);">${totPass}/${totTests} Tests</div>
            </td>
            <td>
                <span style="font-weight: 800; color: ${portRework <= 2.0 ? '#10b981' : '#ef4444'};">${portRework.toFixed(2)}%</span>
                <div style="font-size: 9px; color: var(--text-muted);">₱${totRework.toLocaleString()} Total</div>
            </td>
            <td>
                <span style="font-weight: 800; color: ${portDefect <= 2.0 ? '#10b981' : '#ef4444'};">${portDefect.toFixed(2)}</span>
                <div style="font-size: 9px; color: var(--text-muted);">${totDefects} Defects</div>
            </td>
            <td>
                <span style="font-weight: 800; color: ${portNCRDays <= 7.0 ? '#10b981' : '#ef4444'};">${portNCRDays.toFixed(1)}d</span>
                <div style="font-size: 9px; color: var(--text-muted);">${totClosedNCR} Resolved</div>
            </td>
            <td>
                <span style="font-weight: 800; color: ${totCritPunch === 0 && portPunchOnTime >= 90 ? '#10b981' : '#ef4444'};">${portPunchOnTime}% On-Time</span>
                <div style="font-size: 9px; color: var(--text-muted);">${totCritPunch} Crit | ${totOverduePunch} Overdue</div>
            </td>
            <td style="text-align: center;">
                <span class="status-badge ${portFTQ >= 90 && portRework <= 2.0 && totCritPunch === 0 && portPunchOnTime >= 90 ? 'badge-green' : 'badge-yellow'}" style="font-size: 10px;">
                    PORTFOLIO
                </span>
            </td>
            <td style="text-align: center;">
                <span class="trajectory-badge trend-stable">📊 Combined</span>
            </td>
            <td>
                <div style="font-size: 10px; color: var(--text-secondary); font-style: italic;">
                    Consolidated executive metrics across all ${targetProjects.length} active project entities.
                </div>
            </td>
        </tr>
    `;
    scBody.innerHTML = scHtml;

    // ==========================================
    // 2. RENDER PERIOD COMPARISON TABLE (3.2)
    // ==========================================
    if (popHead && popBody) {
        popHead.innerHTML = `
            <tr>
                <th style="width: 18%;">Project &amp; Location</th>
                <th style="width: 11%;">FTQ (${baseQ} ➔ ${targetQ})</th>
                <th style="width: 11%;">Rework (${baseQ} ➔ ${targetQ})</th>
                <th style="width: 11%;">Defect (${baseQ} ➔ ${targetQ})</th>
                <th style="width: 11%;">NCR Days (${baseQ} ➔ ${targetQ})</th>
                <th style="width: 10%;">Punch Clearance (${baseQ} ➔ ${targetQ})</th>
                <th style="width: 10%; text-align: center;">Quality Trajectory</th>
                <th style="width: 18%;">Executive Action Directive</th>
            </tr>
        `;

        let popHtml = "";
        projectData.forEach(({ proj, main, base, target, trajectory, rec }) => {
            const ftqDelta = target.ftq.val - base.ftq.val;
            const reworkDelta = target.rework.val - base.rework.val;
            const defectDelta = target.defect.val - base.defect.val;
            const ncrDelta = target.ncr.val - base.ncr.val;
            const punchDelta = target.punch.onTimeRate - base.punch.onTimeRate;

            const ftqPillClass = ftqDelta > 0.1 ? "pill-pos-good" : (ftqDelta < -0.1 ? "pill-pos-bad" : "pill-neutral");
            const reworkPillClass = reworkDelta < -0.01 ? "pill-neg-good" : (reworkDelta > 0.01 ? "pill-neg-bad" : "pill-neutral");
            const defectPillClass = defectDelta < -0.01 ? "pill-neg-good" : (defectDelta > 0.01 ? "pill-neg-bad" : "pill-neutral");
            const ncrPillClass = ncrDelta < -0.1 ? "pill-neg-good" : (ncrDelta > 0.1 ? "pill-neg-bad" : "pill-neutral");
            const punchPillClass = punchDelta > 0.1 ? "pill-pos-good" : (punchDelta < -0.1 ? "pill-pos-bad" : "pill-neutral");

            popHtml += `
                <tr>
                    <td>
                        <div class="project-name-cell">
                            <span class="project-name-title">
                                ${proj.name}
                                <span class="badge badge-locked" style="font-size: 8.5px;">${proj.code || 'N/A'}</span>
                            </span>
                            <span class="project-meta-chip">📍 ${main.location}</span>
                            <span class="project-meta-chip">💰 ₱${main.budget.toLocaleString()} | 📐 ${main.area.toLocaleString()} m²</span>
                        </div>
                    </td>
                    <td>
                        <div class="matrix-kpi-chip">
                            <span class="matrix-kpi-val">${base.ftq.val.toFixed(1)}% ➔ <strong>${target.ftq.val.toFixed(1)}%</strong></span>
                            <span class="variance-pill ${ftqPillClass}" style="margin-top: 2px;">${ftqDelta >= 0 ? '+' : ''}${ftqDelta.toFixed(1)}% (Δ)</span>
                        </div>
                    </td>
                    <td>
                        <div class="matrix-kpi-chip">
                            <span class="matrix-kpi-val">${base.rework.val.toFixed(2)}% ➔ <strong>${target.rework.val.toFixed(2)}%</strong></span>
                            <span class="variance-pill ${reworkPillClass}" style="margin-top: 2px;">${reworkDelta >= 0 ? '+' : ''}${reworkDelta.toFixed(2)}% (Δ)</span>
                        </div>
                    </td>
                    <td>
                        <div class="matrix-kpi-chip">
                            <span class="matrix-kpi-val">${base.defect.val.toFixed(2)} ➔ <strong>${target.defect.val.toFixed(2)}</strong></span>
                            <span class="variance-pill ${defectPillClass}" style="margin-top: 2px;">${defectDelta >= 0 ? '+' : ''}${defectDelta.toFixed(2)} (Δ)</span>
                        </div>
                    </td>
                    <td>
                        <div class="matrix-kpi-chip">
                            <span class="matrix-kpi-val">${base.ncr.val.toFixed(1)}d ➔ <strong>${target.ncr.val.toFixed(1)}d</strong></span>
                            <span class="variance-pill ${ncrPillClass}" style="margin-top: 2px;">${ncrDelta >= 0 ? '+' : ''}${ncrDelta.toFixed(1)}d (Δ)</span>
                        </div>
                    </td>
                    <td>
                        <div class="matrix-kpi-chip">
                            <span class="matrix-kpi-val">${base.punch.onTimeRate}% ➔ <strong>${target.punch.onTimeRate}%</strong></span>
                            <span class="variance-pill ${punchPillClass}" style="margin-top: 2px;">${punchDelta >= 0 ? '+' : ''}${punchDelta.toFixed(0)}% (Δ)</span>
                        </div>
                    </td>
                    <td style="text-align: center;">
                        <span class="trajectory-badge ${trajectory.badgeClass}" title="${trajectory.detail}">
                            ${trajectory.icon} ${trajectory.label}
                        </span>
                    </td>
                    <td>
                        <div class="recommendation-box ${rec.level}">
                            <div style="font-weight: 800; font-size: 9.5px; margin-bottom: 2px;">${rec.leadTag}:</div>
                            ${rec.actionText}
                        </div>
                    </td>
                </tr>
            `;
        });
        popBody.innerHTML = popHtml;
    }

    // ==========================================
    // 3. RENDER PROJECT RANKING TABLE (3.3)
    // ==========================================
    if (rkHead && rkBody) {
        rkHead.innerHTML = `
            <tr>
                <th style="width: 6%; text-align: center;">Rank</th>
                <th style="width: 18%;">Project &amp; Location</th>
                <th style="width: 8%; text-align: center;">Compliance</th>
                <th style="width: 11%; text-align: center;">Quality Health</th>
                <th style="width: 14%;">Primary Strength</th>
                <th style="width: 15%;">Primary Risk Area</th>
                <th style="width: 10%; text-align: center;">Quality Trajectory</th>
                <th style="width: 18%;">Executive Action Directive</th>
            </tr>
        `;

        const sortedData = [...projectData].sort((a, b) => {
            if (b.main.compliancePct !== a.main.compliancePct) return b.main.compliancePct - a.main.compliancePct;
            return a.main.rework.val - b.main.rework.val;
        });

        let rkHtml = "";
        sortedData.forEach(({ proj, main, trajectory, rec }, idx) => {
            const rankMedals = ["🥇 #1", "🥈 #2", "🥉 #3"];
            const rankLabel = rankMedals[idx] || `#${idx + 1}`;

            let healthBadgeClass = "badge-green";
            let healthLabel = "🟢 Low Risk / Leader";
            if (main.compliancePct < 60 || main.punch.critical > 0 || main.rework.val > 2.0) {
                healthBadgeClass = "badge-red";
                healthLabel = "🔴 High Risk / Action Required";
            } else if (main.compliancePct < 100) {
                healthBadgeClass = "badge-yellow";
                healthLabel = "🟡 Moderate Risk / Watch";
            }

            let strengthText = "🌟 All 5 KPIs Compliant";
            if (main.ftq.val >= 95) strengthText = `🧪 FTQ Pass Rate ${main.ftq.val.toFixed(1)}%`;
            else if (main.rework.val < 0.5) strengthText = `🔨 Rework Contained (${main.rework.val.toFixed(2)}%)`;
            else if (main.punch.critical === 0) strengthText = `🏁 Zero Critical Snags`;

            let riskText = "✅ No Threshold Breaches";
            if (main.punch.critical > 0) riskText = `⚠️ ${main.punch.critical} Critical Punch Items Pending`;
            else if (main.rework.val > 2.0) riskText = `⚠️ Rework ${main.rework.val.toFixed(2)}% Exceeds 2.0% Cap`;
            else if (main.ftq.val < 90) riskText = `⚠️ FTQ ${main.ftq.val.toFixed(1)}% Below Benchmark`;
            else if (main.ncr.val > 7.0) riskText = `⚠️ NCR Resolution Avg ${main.ncr.val.toFixed(1)} Days`;
            else if (main.defect.val > 2.0) riskText = `⚠️ Defect Density ${main.defect.val.toFixed(2)}/100m²`;

            rkHtml += `
                <tr>
                    <td style="text-align: center; font-weight: 800; font-size: 12px;">${rankLabel}</td>
                    <td>
                        <div class="project-name-cell">
                            <span class="project-name-title">
                                ${proj.name}
                                <span class="badge badge-locked" style="font-size: 8.5px;">${proj.code || 'N/A'}</span>
                            </span>
                            <span class="project-meta-chip">📍 ${main.location}</span>
                            <span class="project-meta-chip">💰 ₱${main.budget.toLocaleString()} | 📐 ${main.area.toLocaleString()} m²</span>
                        </div>
                    </td>
                    <td style="text-align: center;">
                        <div class="compliance-badge-cell">
                            <span class="status-badge ${main.compliancePct === 100 ? 'badge-green' : (main.compliancePct >= 60 ? 'badge-yellow' : 'badge-red')}" style="font-size: 11px; font-weight: 800;">
                                ${main.compliancePct}%
                            </span>
                            <span style="font-size: 9px; color: var(--text-muted);">${main.greenCount}/5 Met</span>
                        </div>
                    </td>
                    <td style="text-align: center;">
                        <span class="status-badge ${healthBadgeClass}" style="font-size: 10px;">${healthLabel}</span>
                    </td>
                    <td>
                        <span style="font-weight: 600; color: #10b981; font-size: 10.5px;">${strengthText}</span>
                    </td>
                    <td>
                        <span style="font-weight: 600; color: ${riskText.includes('No') ? 'var(--text-secondary)' : '#ef4444'}; font-size: 10.5px;">${riskText}</span>
                    </td>
                    <td style="text-align: center;">
                        <span class="trajectory-badge ${trajectory.badgeClass}" title="${trajectory.detail}">
                            ${trajectory.icon} ${trajectory.label}
                        </span>
                    </td>
                    <td>
                        <div class="recommendation-box ${rec.level}">
                            <div style="font-weight: 800; font-size: 9.5px; margin-bottom: 2px;">${rec.leadTag}:</div>
                            ${rec.actionText}
                        </div>
                    </td>
                </tr>
            `;
        });
        rkBody.innerHTML = rkHtml;
    }
}

// ==========================================================================
// 🏢 EXECUTIVE REPORT: DEDICATED CUMULATIVE REWORK MONTHLY TREND GRAPH
// ==========================================================================

function renderCompiledKPI2CumulativeGraph(box, logs, targetProjects, timeRange, card) {
    if (!box) return;

    // Filter project logs chronologically
    let sortedLogs = (logs || []).slice().sort((a, b) => new Date(a.date || "2026-01-01") - new Date(b.date || "2026-01-01"));

    // Map logs with individual breakdown rework rate % and approved cost
    const parsedData = sortedLogs.map((l, idx) => {
        const qty = parseFloat(l.qty) || 1;
        const labor = parseFloat(l.labor) || 0;
        const mat = parseFloat(l.mat) || 0;
        const reworkCost = (labor + mat) * qty;
        const approvedCost = (parseFloat(l.approvedCost) !== undefined && !isNaN(parseFloat(l.approvedCost)) && parseFloat(l.approvedCost) > 0)
            ? parseFloat(l.approvedCost)
            : (reworkCost > 0 ? reworkCost * 25 : 100000);
        const reworkRate = (reworkCost / approvedCost) * 100;
        return {
            ...l,
            idx: idx + 1,
            reworkCost,
            approvedCost,
            reworkRate,
            isOptimal: reworkRate <= 1.0,
            isControlled: reworkRate > 1.0 && reworkRate <= 2.0,
            isBreached: reworkRate > 2.0
        };
    });

    const totalRework = parsedData.reduce((s, d) => s + d.reworkCost, 0);
    const totalApproved = parsedData.reduce((s, d) => s + d.approvedCost, 0);
    const overallRate = totalApproved > 0 ? (totalRework / totalApproved) * 100 : 0;
    const optimalCount = parsedData.filter(d => d.isOptimal).length;
    const controlledCount = parsedData.filter(d => d.isControlled).length;
    const breachedCount = parsedData.filter(d => d.isBreached).length;
    const compliancePct = parsedData.length > 0 ? Math.round(((parsedData.length - breachedCount) / parsedData.length) * 100) : 100;

    let runningReworkCost = 0;
    const enrichedData = parsedData.map((d) => {
        runningReworkCost += d.reworkCost;
        const accumRate = totalApproved > 0 ? (runningReworkCost / totalApproved) * 100 : d.reworkRate;
        return {
            ...d,
            accumCost: runningReworkCost,
            accumRate: accumRate
        };
    });

    let peakLog = null, peakRate = 0, peakCost = 0, peakApproved = 0;
    enrichedData.forEach(d => {
        if (d.reworkRate > peakRate) {
            peakRate = d.reworkRate;
            peakLog = d;
            peakCost = d.reworkCost;
            peakApproved = d.approvedCost;
        }
    });

    // Render Summary KPI Metrics Cards inside card (Placed Below Graph)
    let metricsBox = (card && typeof card.querySelector === "function") ? card.querySelector(".kpi2-metrics-grid") : null;
    if (!metricsBox && card && typeof card.appendChild === "function") {
        metricsBox = document.createElement("div");
        metricsBox.className = "kpi2-metrics-grid";
        card.appendChild(metricsBox);
    }
    if (metricsBox) {
        metricsBox.innerHTML = `
            <div class="kpi2-metric-card">
                <span class="kpi2-metric-label">💰 Scope Approved Item Cost</span>
                <span class="kpi2-metric-val">₱${totalApproved.toLocaleString()}</span>
                <span class="kpi2-metric-sub">Evaluated Breakdown Scope Baseline</span>
            </div>
            <div class="kpi2-metric-card">
                <span class="kpi2-metric-label">🔨 Total Scope Rework Cost</span>
                <span class="kpi2-metric-val" style="color: ${overallRate > 2.0 ? '#ef4444' : '#60a5fa'};">₱${totalRework.toLocaleString()} (${overallRate.toFixed(2)}%)</span>
                <span class="kpi2-metric-sub">${enrichedData.length} Rework Breakdown Activity(s)</span>
            </div>
            <div class="kpi2-metric-card">
                <span class="kpi2-metric-label">🛡️ Threshold Compliance</span>
                <span class="kpi2-metric-val">
                    ${breachedCount === 0 
                        ? `<span class="status-badge badge-green" style="font-size:12px;">${compliancePct}% COMPLIANT</span>` 
                        : `<span class="status-badge badge-red" style="font-size:12px;">${breachedCount} BREACHED (${compliancePct}%)</span>`}
                </span>
                <span class="kpi2-metric-sub">${optimalCount} Optimal (≤1.0%), ${controlledCount} Controlled, ${breachedCount} Breached</span>
            </div>
            <div class="kpi2-metric-card">
                <span class="kpi2-metric-label">⚡ Highest Breakdown Rate</span>
                <span class="kpi2-metric-val" style="font-size: 15px; color: ${peakRate > 2.0 ? '#ef4444' : (peakRate > 1.0 ? '#f59e0b' : '#10b981')};">
                    ${peakLog ? `${peakRate.toFixed(2)}% (${peakLog.desc})` : 'No Rework Logged'}
                </span>
                <span class="kpi2-metric-sub">${peakLog ? `₱${peakCost.toLocaleString()} / ₱${peakApproved.toLocaleString()} Approved` : 'All Breakdown Items Clear'}</span>
            </div>
        `;
    }

    const opts = getGraphDisplaySettings("kpi2", true);

    const showLabels = opts.labelPos !== "hide" && opts.showLabels !== "false";
    const labelPos = opts.labelPos || "above";
    const fontSize = parseInt(opts.fontSize) || 11;
    const fontWeight = opts.fontWeight || "700";
    const dateAngle = opts.dateAngle || "horizontal";
    const yLeftOffset = parseInt(opts.yLeftOffset) || 18;
    const extraXOffset = parseInt(opts.xAxisOffset) || 25;
    const monthPos = opts.monthPos || "top";

    const width = box.clientWidth || 800;
    const height = box.clientHeight && box.clientHeight > 100 ? box.clientHeight : 560;

    const paddingTop = 50;
    const paddingLeft = Math.max(85, 55 + yLeftOffset);
    const paddingRight = 60;

    let paddingBottom = 50;
    if (dateAngle === "vertical") {
        paddingBottom = Math.max(80, 50 + extraXOffset + 25);
    } else if (dateAngle === "slanted") {
        paddingBottom = Math.max(70, 45 + extraXOffset + 20);
    } else {
        paddingBottom = Math.max(52, 25 + extraXOffset + 15);
    }

    const chartHeight = height - paddingTop - paddingBottom;
    const chartWidth = width - paddingLeft - paddingRight;

    if (enrichedData.length === 0) {
        box.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 ${width} ${height}">
                <text x="${width / 2}" y="${height / 2}" fill="var(--text-secondary)" font-size="14px" font-weight="600" text-anchor="middle">
                    No Rework BOQ breakdown items found in the selected timeframe.
                </text>
            </svg>
        `;
        return;
    }

    // Month Segments & Division
    let monthSegments = [];
    if (timeRange === "Q1") {
        monthSegments = [
            { name: "JAN", idx: 0, mNum: 0, qKey: "Q1" },
            { name: "FEB", idx: 1, mNum: 1, qKey: "Q1" },
            { name: "MAR", idx: 2, mNum: 2, qKey: "Q1" }
        ];
    } else if (timeRange === "Q2") {
        monthSegments = [
            { name: "APR", idx: 0, mNum: 3, qKey: "Q2" },
            { name: "MAY", idx: 1, mNum: 4, qKey: "Q2" },
            { name: "JUN", idx: 2, mNum: 5, qKey: "Q2" }
        ];
    } else if (timeRange === "Q3") {
        monthSegments = [
            { name: "JUL", idx: 0, mNum: 6, qKey: "Q3" },
            { name: "AUG", idx: 1, mNum: 7, qKey: "Q3" },
            { name: "SEP", idx: 2, mNum: 8, qKey: "Q3" }
        ];
    } else if (timeRange === "Q4") {
        monthSegments = [
            { name: "OCT", idx: 0, mNum: 9, qKey: "Q4" },
            { name: "NOV", idx: 1, mNum: 10, qKey: "Q4" },
            { name: "DEC", idx: 2, mNum: 11, qKey: "Q4" }
        ];
    } else if (timeRange === "Q1-Q2") {
        monthSegments = [
            { name: "Q1: JAN – MAR", idx: 0, qKey: "Q1" },
            { name: "Q2: APR – JUN", idx: 1, qKey: "Q2" }
        ];
    } else if (timeRange === "Q1-Q3") {
        monthSegments = [
            { name: "Q1: JAN – MAR", idx: 0, qKey: "Q1" },
            { name: "Q2: APR – JUN", idx: 1, qKey: "Q2" },
            { name: "Q3: JUL – SEP", idx: 2, qKey: "Q3" }
        ];
    } else {
        // "FY" or "ALL" (Full Year)
        monthSegments = [
            { name: "Q1: JAN – MAR", idx: 0, qKey: "Q1" },
            { name: "Q2: APR – JUN", idx: 1, qKey: "Q2" },
            { name: "Q3: JUL – SEP", idx: 2, qKey: "Q3" },
            { name: "Q4: OCT – DEC", idx: 3, qKey: "Q4" }
        ];
    }

    const numZones = monthSegments.length;
    const zoneWidth = chartWidth / numZones;

    const zones = monthSegments.map((seg, sIdx) => {
        const xStart = paddingLeft + sIdx * zoneWidth;
        const xEnd = paddingLeft + (sIdx + 1) * zoneWidth;
        const cx = (xStart + xEnd) / 2;
        return { ...seg, xStart, xEnd, cx };
    });

    // Group data points into their month / quarter segments
    const itemsBySegment = {};
    zones.forEach((_, idx) => { itemsBySegment[idx] = []; });

    enrichedData.forEach(d => {
        let segIdx = 0;
        if (["Q1", "Q2", "Q3", "Q4"].includes(timeRange)) {
            if (d.date) {
                const dObj = new Date(d.date);
                if (!isNaN(dObj.getTime())) {
                    segIdx = dObj.getMonth() % 3;
                }
            }
        } else {
            const qKey = (d.quarter || "").toUpperCase().trim();
            const foundIdx = monthSegments.findIndex(s => s.qKey === qKey);
            if (foundIdx !== -1) {
                segIdx = foundIdx;
            } else if (d.date) {
                const dObj = new Date(d.date);
                if (!isNaN(dObj.getTime())) {
                    const m = dObj.getMonth();
                    const derivedQ = m <= 2 ? "Q1" : (m <= 5 ? "Q2" : (m <= 8 ? "Q3" : "Q4"));
                    const dIdx = monthSegments.findIndex(s => s.qKey === derivedQ);
                    if (dIdx !== -1) segIdx = dIdx;
                }
            }
        }
        if (segIdx < 0 || segIdx >= numZones) segIdx = 0;
        itemsBySegment[segIdx].push(d);
    });

    const pointPositions = new Map();
    zones.forEach((z, sIdx) => {
        const sItems = itemsBySegment[sIdx] || [];
        const count = sItems.length;
        sItems.forEach((item, k) => {
            const itemCx = count === 1 ? z.cx : z.xStart + ((k + 0.5) / count) * zoneWidth;
            pointPositions.set(item, itemCx);
        });
    });

    // Y-Axis Scaling: bounds based on maximum of individual breakdown rates and accumulated rates
    const maxDataRate = Math.max(...enrichedData.map(d => Math.max(d.reworkRate, d.accumRate)), 2.2);
    const maxY = Math.max(2.5, Math.ceil((maxDataRate * 1.25) * 10) / 10);

    const yIncrements = [];
    const numSteps = 5;
    for (let i = 0; i <= numSteps; i++) {
        yIncrements.push(parseFloat(((maxY / numSteps) * i).toFixed(2)));
    }

    const pointsCount = enrichedData.length;
    const barWidth = Math.min(48, Math.max(14, (zoneWidth / Math.max(1, Math.max(...Object.values(itemsBySegment).map(a => a.length)))) * 0.48));

    const points = enrichedData.map((d) => {
        const cx = pointPositions.get(d) || (paddingLeft + chartWidth / 2);
        const barH = Math.max(2, (d.reworkRate / maxY) * chartHeight);
        const barY = height - paddingBottom - barH;
        const barX = cx - barWidth / 2;
        const cyAccum = height - paddingBottom - (d.accumRate / maxY) * chartHeight;
        return { ...d, cx, barX, barY, barH, cyAccum };
    });

    let svg = `<svg width="100%" height="100%" viewBox="0 0 ${width} ${height}">`;

    svg += `
        <defs>
            <linearGradient id="kpi2BarGrad_exec_green" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#10b981" stop-opacity="0.95"/>
                <stop offset="100%" stop-color="#059669" stop-opacity="0.75"/>
            </linearGradient>
            <linearGradient id="kpi2BarGrad_exec_amber" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.95"/>
                <stop offset="100%" stop-color="#d97706" stop-opacity="0.75"/>
            </linearGradient>
            <linearGradient id="kpi2BarGrad_exec_red" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#ef4444" stop-opacity="0.95"/>
                <stop offset="100%" stop-color="#dc2626" stop-opacity="0.75"/>
            </linearGradient>
            <linearGradient id="breakdownReworkAreaGradient_exec" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#2563eb" stop-opacity="0.22"/>
                <stop offset="100%" stop-color="#2563eb" stop-opacity="0.01"/>
            </linearGradient>
        </defs>
    `;

    // Horizontal Y-Axis Grid Lines & Labels
    yIncrements.forEach(yVal => {
        const gridY = height - paddingBottom - (yVal / maxY) * chartHeight;
        svg += `<line x1="${paddingLeft}" y1="${gridY}" x2="${width - paddingRight}" y2="${gridY}" class="svg-grid-line"/>`;
        svg += `<text x="${paddingLeft - yLeftOffset}" y="${gridY + 4}" class="svg-axis-label" text-anchor="end" style="font-size: ${fontSize}px; font-weight: 600;">${yVal.toFixed(1)}%</text>`;
    });

    // 1. Vertical Dashed Lines Demarcating Month Transitions
    for (let i = 1; i < numZones; i++) {
        const divX = paddingLeft + i * zoneWidth;
        svg += `<line x1="${divX}" y1="${paddingTop}" x2="${divX}" y2="${height - paddingBottom}" stroke="var(--border-color, #64748b)" stroke-width="1.5" stroke-dasharray="5,4" opacity="0.85"/>`;
    }

    // 2. Month Badges at the TOP MOST of the Graph Area
    if (monthPos !== "hide") {
        let badgeY = paddingTop - 24;
        let textY = paddingTop - 12;
        if (monthPos === "high") {
            badgeY = paddingTop - 34;
            textY = paddingTop - 22;
        } else if (monthPos === "middle") {
            badgeY = paddingTop + chartHeight / 2 - 8;
            textY = paddingTop + chartHeight / 2 + 4;
        } else if (monthPos === "bottom") {
            badgeY = height - paddingBottom - 20;
            textY = height - paddingBottom - 9;
        }

        zones.forEach(z => {
            const badgeW = (z.name.length > 5) ? 120 : 68;
            svg += `
                <g class="month-header-badge-group">
                    <rect x="${z.cx - badgeW / 2}" y="${badgeY}" width="${badgeW}" height="17" rx="4" fill="rgba(59, 130, 246, 0.18)" stroke="#3b82f6" stroke-width="1.2"/>
                    <text x="${z.cx}" y="${textY}" fill="#38bdf8" font-size="10px" font-weight="900" text-anchor="middle" letter-spacing="0.5px">${z.name}</text>
                </g>
            `;
        });
    }

    // Left Y-Axis Title
    const leftTitleX = -(paddingTop + chartHeight / 2);
    const leftTitleY = Math.max(14, paddingLeft - yLeftOffset - 28);
    svg += `<text transform="rotate(-90)" x="${leftTitleX}" y="${leftTitleY}" class="svg-axis-label" style="font-weight:700; font-size:11px; fill:var(--text-secondary);" text-anchor="middle">Rework Rate (% of Approved Item Cost)</text>`;

    // 1. Recommended Target Reference Line at 1.00% (Green Dashed)
    const recThresholdPct = 1.0;
    const recY = height - paddingBottom - (recThresholdPct / maxY) * chartHeight;
    svg += `
        <line x1="${paddingLeft}" y1="${recY}" x2="${width - paddingRight}" y2="${recY}" stroke="#10b981" stroke-width="2" stroke-dasharray="6,4" />
        <rect x="${width - paddingRight - 185}" y="${recY - 18}" width="185" height="17" rx="3" fill="rgba(16, 185, 129, 0.18)" stroke="#10b981" stroke-width="1"/>
        <text x="${width - paddingRight - 92}" y="${recY - 6}" fill="#10b981" font-size="9.5px" font-weight="800" text-anchor="middle">RECOMMENDED TARGET (≤ 1.00%)</text>
    `;

    // 2. Max Threshold Limit Reference Line at 2.00% (Red Dashed)
    const maxThresholdPct = 2.0;
    const targetY = height - paddingBottom - (maxThresholdPct / maxY) * chartHeight;
    svg += `
        <line x1="${paddingLeft}" y1="${targetY}" x2="${width - paddingRight}" y2="${targetY}" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="6,4" />
        <rect x="${width - paddingRight - 185}" y="${targetY - 20}" width="185" height="18" rx="4" fill="rgba(239, 68, 68, 0.22)" stroke="#ef4444" stroke-width="1"/>
        <text x="${width - paddingRight - 92}" y="${targetY - 7}" fill="#ef4444" font-size="10px" font-weight="800" text-anchor="middle">MAX THRESHOLD LIMIT (≤ 2.00%)</text>
    `;

    // 3. Render Vertical Bars (Actual Breakdown Rework Rate %)
    points.forEach(p => {
        let gradId = "kpi2BarGrad_exec_green";
        let barColor = "#10b981";
        if (p.isBreached) { gradId = "kpi2BarGrad_exec_red"; barColor = "#ef4444"; }
        else if (p.isControlled) { gradId = "kpi2BarGrad_exec_amber"; barColor = "#f59e0b"; }

        svg += `<rect x="${p.barX}" y="${p.barY}" width="${barWidth}" height="${p.barH}" rx="4" ry="4" fill="url(#${gradId})" stroke="${barColor}" stroke-width="1.2"/>`;

        if (showLabels) {
            const barValY = Math.max(paddingTop + 14, p.barY - 6);
            svg += `<text x="${p.cx}" y="${barValY}" fill="${barColor}" font-size="${fontSize}px" font-weight="${fontWeight}" text-anchor="middle">${p.reworkRate.toFixed(2)}%</text>`;
        }
    });

    // 4. Render Accumulated (Cumulative) Rework Rate Area & Line
    if (points.length > 1) {
        const accumAreaD = points.map((p, i) => i === 0 ? `M ${p.cx} ${p.cyAccum}` : `L ${p.cx} ${p.cyAccum}`).join(" ") +
                           ` L ${points[points.length - 1].cx} ${height - paddingBottom} L ${points[0].cx} ${height - paddingBottom} Z`;
        svg += `<path d="${accumAreaD}" fill="url(#breakdownReworkAreaGradient_exec)"/>`;

        const accumPathD = points.map((p, i) => i === 0 ? `M ${p.cx} ${p.cyAccum}` : `L ${p.cx} ${p.cyAccum}`).join(" ");
        svg += `<path d="${accumPathD}" stroke="#2563eb" stroke-width="3.5" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`;
    }

    // 5. Nodes on Accumulated Line
    points.forEach(p => {
        if (p.accumRate > 2.0) {
            svg += `<circle cx="${p.cx}" cy="${p.cyAccum}" r="12" fill="rgba(239, 68, 68, 0.25)" class="halo-pulse"/>`;
        }
        svg += `<circle cx="${p.cx}" cy="${p.cyAccum}" r="5.5" fill="#2563eb" stroke="#ffffff" stroke-width="2.5" style="cursor: pointer;"/>`;

        if (showLabels && pointsCount <= 8) {
            const isAbove = p.cyAccum < p.barY - 14;
            const accLabelY = isAbove ? p.cyAccum - 8 : p.cyAccum + 16;
            svg += `<text x="${p.cx}" y="${accLabelY}" fill="#2563eb" font-size="9.5px" font-weight="800" text-anchor="middle">Acc: ${p.accumRate.toFixed(2)}%</text>`;
        }
    });

    // 6. Invisible Interactive Hover Slices for rich tooltips
    points.forEach((p) => {
        const sliceWidth = pointsCount > 1 ? (chartWidth / pointsCount) : chartWidth;
        const sliceX = p.cx - sliceWidth / 2;
        const jsonStr = JSON.stringify({
            desc: p.desc,
            projectName: p.projectName || p.projName,
            discipline: p.discipline,
            subDiscipline: p.subDiscipline,
            date: p.date,
            quarter: p.quarter,
            qty: p.qty,
            unit: p.unit,
            reworkCost: p.reworkCost,
            approvedCost: p.approvedCost,
            reworkRate: p.reworkRate,
            accumRate: p.accumRate
        }).replace(/"/g, '&quot;');

        svg += `<rect x="${sliceX}" y="${paddingTop}" width="${sliceWidth}" height="${chartHeight}" fill="transparent" style="cursor: pointer;" onmouseenter="showKpi2Tooltip(event, ${jsonStr})" onmousemove="moveKpi2Tooltip(event)" onmouseleave="hideKpi2Tooltip()"/>`;
    });

    // 7. X-Axis Month & Date / Item Labels with configurable angle & distance
    const xLabelY = height - paddingBottom + extraXOffset;
    points.forEach(p => {
        let monthName = p.quarter || "Q";
        let dayStr = "";
        if (p.date) {
            const d = new Date(p.date);
            const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            if (!isNaN(d.getTime())) {
                monthName = months[d.getMonth()];
                dayStr = `${d.getDate() < 10 ? '0' + d.getDate() : d.getDate()}`;
            }
        }

        if (dateAngle === "vertical") {
            svg += `<text x="${p.cx}" y="${xLabelY}" transform="rotate(-90 ${p.cx} ${xLabelY})" class="svg-axis-label" text-anchor="end" font-weight="${fontWeight}" font-size="${fontSize}px"><tspan fill="#38bdf8" font-weight="900">${monthName}</tspan> ${p.date || `Item #${p.idx}`}</text>`;
        } else if (dateAngle === "slanted") {
            svg += `<text x="${p.cx}" y="${xLabelY}" transform="rotate(-45 ${p.cx} ${xLabelY})" class="svg-axis-label" text-anchor="end" font-weight="${fontWeight}" font-size="${fontSize}px"><tspan fill="#38bdf8" font-weight="900">${monthName}</tspan> ${dayStr ? `${dayStr} (${p.quarter || ''})` : (p.date || '')}</text>`;
        } else {
            svg += `<text x="${p.cx}" y="${xLabelY}" class="svg-axis-label" text-anchor="middle" font-weight="${fontWeight}" font-size="${fontSize}px">
                <tspan x="${p.cx}" dy="0" fill="#38bdf8" font-weight="900">${monthName}</tspan>
                <tspan x="${p.cx}" dy="13" font-size="${Math.max(8.5, fontSize - 1.5)}px" fill="var(--text-muted)">${p.date ? p.date.slice(5) : `Item #${p.idx}`}</tspan>
            </text>`;
        }
    });

    svg += `</svg>`;
    box.innerHTML = svg;
}

function generateGraphTrendNarrative(kpiKey, filteredLogs, allLogs, targetProjects, timeRange, compMode, baseQ, targetQ) {
    if (!timeRange) timeRange = appState.compiler?.timeRange || "FY";
    if (!compMode) compMode = appState.compiler?.compMode || "pop";
    if (!baseQ) baseQ = appState.compiler?.baseQuarter || "Q1";
    if (!targetQ) targetQ = appState.compiler?.targetQuarter || "Q2";
    if (!targetProjects) targetProjects = getCompilerTargetProjects();

    let mainText = "";
    let bullets = [];
    let trendBadge = { label: "➖ Stable Trajectory", class: "trend-stable" };

    if (kpiKey === "kpi1") {
        const totalTests = (filteredLogs || []).length;
        const passTests = (filteredLogs || []).filter(l => l.remarks === "Pass").length;
        const failTests = totalTests - passTests;
        const ftqPct = totalTests > 0 ? (passTests / totalTests) * 100 : 100;

        let shiftText = "consistent compliance velocity";
        let bestDisc = "General", bestRate = -1;
        let worstDisc = "General", worstRate = 101;

        const discGroups = {};
        (filteredLogs || []).forEach(l => {
            const d = (l.discipline || l.disc || "General").trim();
            if (!discGroups[d]) discGroups[d] = { pass: 0, total: 0 };
            discGroups[d].total++;
            if (l.remarks === "Pass") discGroups[d].pass++;
        });

        Object.keys(discGroups).forEach(d => {
            const r = discGroups[d].total > 0 ? (discGroups[d].pass / discGroups[d].total) * 100 : 0;
            if (r > bestRate) { bestRate = r; bestDisc = d; }
            if (r < worstRate) { worstRate = r; worstDisc = d; }
        });

        if (compMode === "pop" && baseQ && targetQ) {
            const bLogs = (filteredLogs || []).filter(l => l.quarter === baseQ);
            const tLogs = (filteredLogs || []).filter(l => l.quarter === targetQ);
            const bPass = bLogs.filter(l => l.remarks === "Pass").length;
            const bTot = bLogs.length;
            const tPass = tLogs.filter(l => l.remarks === "Pass").length;
            const tTot = tLogs.length;
            const bPct = bTot > 0 ? (bPass / bTot) * 100 : ftqPct;
            const tPct = tTot > 0 ? (tPass / tTot) * 100 : ftqPct;
            const dShift = tPct - bPct;
            if (dShift > 0.1) {
                trendBadge = { label: "📈 Improving (+ " + dShift.toFixed(1) + "%)", class: "trend-improving" };
            }
        }
        
        mainText = `During the evaluated <strong>${timeRange}</strong> timeframe, field inspection testing across the selected scope totaled <strong>${totalTests} tests</strong> with an aggregate First-Time Pass Rate (FTQ) of <strong style="color: ${ftqPct >= 90 ? '#10b981' : '#ef4444'};">${ftqPct.toFixed(1)}%</strong> (Corporate Benchmark: <strong>≥ 90.0%</strong>).`;

        bullets = [
            { icon: "📈", label: "Velocity & Trajectory", val: `Testing trajectory exhibited ${shiftText}, with ${passTests} passed tests and ${failTests} first-time failure notice(s).` },
            { icon: "🔍", label: "Discipline Distribution", val: `Highest performing discipline: <strong>${bestDisc}</strong> (${bestRate >= 0 ? bestRate.toFixed(1) : '100'}% FTQ). ${worstRate < 90 ? `Quality attention required in <strong>${worstDisc}</strong> (${worstRate.toFixed(1)}% FTQ).` : `All disciplines satisfied the benchmark.`}` },
            { icon: "🎯", label: "Executive Quality Action", val: ftqPct >= 90 ? `Sustain standard trade pre-pour checklists and routine subcontractor quality audits.` : `Implement mandatory pre-inspection mock-ups and hold-point sign-offs for underperforming trades.` }
        ];

    } else if (kpiKey === "kpi2") {
        let totalRework = 0;
        let totalApproved = 0;
        let optimalCount = 0;
        let controlledCount = 0;
        let breachedCount = 0;
        const discCostMap = {};

        let peakLog = null, peakRate = 0, peakCost = 0, peakApproved = 0;

        (filteredLogs || []).forEach(l => {
            const qty = parseFloat(l.qty) || 1;
            const labor = parseFloat(l.labor) || 0;
            const mat = parseFloat(l.mat) || 0;
            const c = (labor + mat) * qty;
            const appr = (parseFloat(l.approvedCost) !== undefined && !isNaN(parseFloat(l.approvedCost)) && parseFloat(l.approvedCost) > 0)
                ? parseFloat(l.approvedCost)
                : (c > 0 ? c * 25 : 100000);
            const rate = (c / appr) * 100;

            totalRework += c;
            totalApproved += appr;

            if (rate <= 1.0) optimalCount++;
            else if (rate <= 2.0) controlledCount++;
            else breachedCount++;

            if (rate > peakRate) {
                peakRate = rate;
                peakLog = l;
                peakCost = c;
                peakApproved = appr;
            }

            const d = (l.discipline || l.disc || "General").trim();
            discCostMap[d] = (discCostMap[d] || 0) + c;
        });

        const totalItems = (filteredLogs || []).length;
        const compliancePct = totalItems > 0 ? Math.round(((totalItems - breachedCount) / totalItems) * 100) : 100;
        const overallReworkPct = totalApproved > 0 ? (totalRework / totalApproved) * 100 : 0;
        const isBreached = breachedCount > 0 || overallReworkPct > 2.0;

        let topTrade = "General", topTradeCost = 0;
        Object.keys(discCostMap).forEach(d => {
            if (discCostMap[d] > topTradeCost) { topTradeCost = discCostMap[d]; topTrade = d; }
        });

        if (breachedCount === 0 && overallReworkPct <= 1.0) {
            trendBadge = { label: `🟢 Optimal (${compliancePct}% Compliant)`, class: "trend-improving" };
        } else if (breachedCount === 0 && overallReworkPct <= 2.0) {
            trendBadge = { label: `🟡 Controlled (${compliancePct}% Compliant)`, class: "trend-stable" };
        } else {
            trendBadge = { label: `🔴 ${breachedCount} Breached (${compliancePct}% Compliant)`, class: "trend-critical" };
        }

        mainText = `Across the evaluated <strong>${timeRange}</strong> scope, <strong>${totalItems} rework breakdown activities</strong> were audited against individual approved item contract costs (Total Scope Approved: <strong>₱${totalApproved.toLocaleString()}</strong>). Aggregate rework expenditure is <strong style="color: ${!isBreached ? '#10b981' : '#ef4444'};">₱${totalRework.toLocaleString()}</strong> (${overallReworkPct.toFixed(2)}% overall rate vs Recommended Target <strong>≤ 1.00%</strong> & Max Limit <strong>≤ 2.00%</strong>). <strong style="color: ${breachedCount === 0 ? '#10b981' : '#ef4444'};">${compliancePct}% of breakdown items</strong> complied with the quality safety threshold.`;

        bullets = [
            { icon: "⚡", label: "Breakdown Rate Velocity", val: peakLog ? `Highest breakdown rework rate: <strong>${peakRate.toFixed(2)}%</strong> for <em>${peakLog.desc}</em> (₱${peakCost.toLocaleString()} rework vs ₱${peakApproved.toLocaleString()} approved item cost).` : `No rework expenditure logged in selected timeframe.` },
            { icon: "🔨", label: "Trade Cost Concentration", val: `Primary rework contributor: <strong>${topTrade}</strong> (₱${topTradeCost.toLocaleString()} | ${totalRework > 0 ? ((topTradeCost / totalRework) * 100).toFixed(0) : 0}% of total rework cost).` },
            { icon: "🛑", label: "Executive Quality Directive", val: isBreached ? `Issue formal Backcharge Notices for items exceeding the 2.0% threshold and condition trade billing approvals on root cause sign-off.` : `Sustain strict trade pre-inspection checklist compliance to maintain rework below the 1.0% recommended benchmark.` }
        ];

    } else if (kpiKey === "kpi3") {
        const totalArea = (targetProjects || []).reduce((s, p) => s + (parseFloat(p.area) || parseFloat(p.gfa) || 0), 0) || 12500;
        const totalDefects = (filteredLogs || []).length;
        const defectDensity = totalArea > 0 ? (totalDefects / totalArea) * 100 : 0;
        const isBreached = defectDensity > 2.0;

        // Group by defect description & discipline
        const descCount = {};
        const discCount = {};
        (filteredLogs || []).forEach(l => {
            const ds = (l.defectDesc || l.desc || l.itemDesc || "General Defect").trim();
            const d = (l.discipline || l.disc || "General").trim();
            descCount[ds] = (descCount[ds] || 0) + 1;
            discCount[d] = (discCount[d] || 0) + 1;
        });

        let topDesc = "General Defects", topDescNum = 0;
        Object.keys(descCount).forEach(ds => {
            if (descCount[ds] > topDescNum) { topDescNum = descCount[ds]; topDesc = ds; }
        });

        let topDisc = "General", topDiscNum = 0;
        Object.keys(discCount).forEach(d => {
            if (discCount[d] > topDiscNum) { topDiscNum = discCount[d]; topDisc = d; }
        });

        if (defectDensity <= 1.0) {
            trendBadge = { label: "🟢 Low Density (≤1.0)", class: "trend-improving" };
        } else if (defectDensity <= 2.0) {
            trendBadge = { label: "🟡 Controlled (≤2.0)", class: "trend-stable" };
        } else {
            trendBadge = { label: "🔴 High Density (>2.0)", class: "trend-critical" };
        }

        mainText = `Quality defect audit recorded <strong>${totalDefects} logged non-conformance defects</strong> across <strong>${totalArea.toLocaleString()} m²</strong> of audited floor area, establishing a Defect Density of <strong style="color: ${!isBreached ? '#10b981' : '#ef4444'};">${defectDensity.toFixed(2)} defects per 100m²</strong> (Target Limit: <strong>≤ 2.00 / 100m²</strong>). ${!isBreached ? 'Defect occurrences are contained within allowable corporate thresholds.' : 'Defect concentration exceeds allowable limits, indicating systemic workmanship issues.'}`;

        bullets = [
            { icon: "📊", label: "Defect Frequency & Area", val: `Audited area of ${totalArea.toLocaleString()} m² experienced an average of 1 defect per ${(totalDefects > 0 ? (totalArea / totalDefects).toFixed(0) : totalArea)} m² of construction.` },
            { icon: "🔍", label: "Primary Workmanship Hotspot", val: `Most prevalent issue: <strong>${topDesc}</strong> (${topDescNum} occurrences) within <strong>${topDisc}</strong>.` },
            { icon: "🧪", label: "Executive Quality Directive", val: isBreached ? `Conduct mandatory trade workmanship retraining and enforce Incoming Material Quality Audits.` : `Continue standard trade pre-inspections and routine quality checks.` }
        ];

    } else if (kpiKey === "kpi4") {
        const totalNCRs = (filteredLogs || []).length;
        const closedNCRs = (filteredLogs || []).filter(l => l.status === "Closed" || l.status === "Resolved" || l.status === "Rectified").length;
        const openNCRs = totalNCRs - closedNCRs;
        const avgDuration = totalNCRs > 0 ? ((filteredLogs || []).reduce((s, l) => s + (parseFloat(l.duration) || 0), 0) / totalNCRs) : 0;

        const openDisc = Array.from(new Set((filteredLogs || []).filter(l => l.status !== "Closed" && l.status !== "Resolved" && l.status !== "Rectified").map(l => l.discipline || l.disc || "General"))).filter(Boolean);

        if (avgDuration <= 5.0 && openNCRs === 0) {
            trendBadge = { label: "🌟 Rapid Resolution (≤5d)", class: "trend-improving" };
        } else if (avgDuration <= 7.0) {
            trendBadge = { label: "🟢 Compliant Turnaround (≤7d)", class: "trend-stable" };
        } else {
            trendBadge = { label: "⚠️ Resolution Delayed (>7d)", class: "trend-critical" };
        }

        mainText = `Formal non-conformance tracking logs account for <strong>${totalNCRs} issued NCRs</strong>, achieving an average resolution turnaround of <strong style="color: ${avgDuration <= 7.0 ? '#10b981' : '#ef4444'};">${avgDuration.toFixed(1)} Days</strong> (Corporate Benchmark: <strong>≤ 5–7 Days</strong>). A total of <strong>${closedNCRs} notices (${totalNCRs > 0 ? ((closedNCRs / totalNCRs) * 100).toFixed(0) : 100}%)</strong> have been fully verified and signed off.`;

        bullets = [
            { icon: "⏱️", label: "Resolution Velocity", val: avgDuration <= 7.0 ? `Contractor response and closure turnaround meet contractual SLA requirements without closeout bottlenecks.` : `Average duration of ${avgDuration.toFixed(1)} days exceeds the 7.0-day SLA, reflecting delay in CAR submissions.` },
            { icon: "⚡", label: "Active Open Notice Status", val: openNCRs > 0 ? `<strong style="color: #ef4444;">${openNCRs} Active Open NCR(s)</strong> require immediate rectification in: <strong>${openDisc.join(', ') || 'General Trades'}</strong>.` : `All issued NCRs have been closed out and verified by QA/QC management.` },
            { icon: "📋", label: "Governance Directive", val: openNCRs > 0 ? `Convene weekly NCR Closeout Escalation meetings; condition monthly progress billing releases on notice rectification.` : `Sustain prompt notice issuance and rapid verification workflow.` }
        ];

    } else if (kpiKey === "kpi5") {
        const totalPunch = (filteredLogs || []).length;
        const openCrit = (filteredLogs || []).filter(l => l.cat === "Critical" && l.status !== "Signed-off" && l.status !== "Closed" && l.status !== "Rectified").length;
        const openMinor = (filteredLogs || []).filter(l => l.cat !== "Critical" && l.status !== "Signed-off" && l.status !== "Closed" && l.status !== "Rectified").length;
        const closedPunch = totalPunch - (openCrit + openMinor);
        const nowMs = Date.now();
        let overduePunch = 0;
        (filteredLogs || []).forEach(l => {
            const isClosed = l.status === "Signed-off" || l.status === "Closed" || l.status === "Rectified";
            if (isClosed) {
                if (l.targetDate && l.actualDateRectified && new Date(l.actualDateRectified).getTime() > new Date(l.targetDate).getTime()) {
                    overduePunch++;
                }
            } else {
                if (l.targetDate && new Date(l.targetDate).getTime() < nowMs) {
                    overduePunch++;
                }
            }
        });
        const onTimeRate = totalPunch > 0 ? Math.max(0, Math.round(((totalPunch - overduePunch) / totalPunch) * 100)) : 100;
        const isCompliant = openCrit === 0 && onTimeRate >= 90;

        const openTrades = Array.from(new Set((filteredLogs || []).filter(l => l.status !== "Signed-off" && l.status !== "Closed" && l.status !== "Rectified").map(l => l.discipline || l.disc || "General"))).filter(Boolean);

        if (openCrit === 0 && overduePunch === 0 && openMinor <= 2) {
            trendBadge = { label: "🌟 Ready for Handover", class: "trend-improving" };
        } else if (openCrit === 0 && onTimeRate >= 90) {
            trendBadge = { label: `🟢 ${onTimeRate}% On-Time (0 Critical)`, class: "trend-stable" };
        } else if (openCrit === 0) {
            trendBadge = { label: `🟡 ${overduePunch} Overdue (0 Critical)`, class: "trend-stable" };
        } else {
            trendBadge = { label: `🔴 ${openCrit} Critical Snag(s)`, class: "trend-critical" };
        }

        mainText = `Pre-turnover punch listing recorded <strong>${totalPunch} total snag items</strong> across audited zones, reaching a Target Clearance compliance rate of <strong style="color: ${isCompliant ? '#10b981' : '#ef4444'};">${onTimeRate}% On-Time</strong> (${closedPunch} closed items, ${overduePunch} overdue items, and <strong style="color: ${openCrit === 0 ? '#10b981' : '#ef4444'};">${openCrit} open critical snag(s)</strong> vs benchmark of <strong>100% On-Time Clearance & Zero (0) Critical</strong>).`;

        bullets = [
            { icon: "🏁", label: "Handover Clearance Status", val: openCrit === 0 ? `Zero open critical snags with ${onTimeRate}% of punch items cleared on schedule. Handover readiness conforms to corporate QA/QC standards.` : `<strong style="color: #ef4444;">${openCrit} Critical Snag(s)</strong> present direct operational handover blockers requiring immediate rectification.` },
            { icon: "🔍", label: "Open Snag Trade Focus", val: openTrades.length > 0 ? `Active rectification ongoing in: <strong>${openTrades.join(', ')}</strong> (${openMinor} minor items pending, ${overduePunch} past target date).` : `All snag items have received formal consultant sign-off within scheduled target clearance.` },
            { icon: "🚨", label: "Turnover Action Directive", val: openCrit > 0 || overduePunch > 0 ? `Mobilize dedicated trade snagging strike-teams to clear all ${openCrit > 0 ? `${openCrit} critical and ` : ''}${overduePunch} overdue items before turnover inspection.` : `Proceed with final room-by-room joint client handover walkthrough.` }
        ];
    }

    return { mainText, bullets, trendBadge };
}

function renderKPI5MetricsGrid(card, logs) {
    const totalPunch = logs.length;
    const openCrit = logs.filter(l => l.cat === "Critical" && l.status !== "Signed-off" && l.status !== "Closed" && l.status !== "Rectified").length;
    const openMinor = logs.filter(l => l.cat !== "Critical" && l.status !== "Signed-off" && l.status !== "Closed" && l.status !== "Rectified").length;
    const closedPunch = totalPunch - (openCrit + openMinor);
    const nowMs = Date.now();
    let overduePunch = 0;
    logs.forEach(l => {
        const isClosed = l.status === "Signed-off" || l.status === "Closed" || l.status === "Rectified";
        if (isClosed) {
            if (l.targetDate && l.actualDateRectified && new Date(l.actualDateRectified).getTime() > new Date(l.targetDate).getTime()) {
                overduePunch++;
            }
        } else {
            if (l.targetDate && new Date(l.targetDate).getTime() < nowMs) {
                overduePunch++;
            }
        }
    });
    const onTimeRate = totalPunch > 0 ? Math.max(0, Math.round(((totalPunch - overduePunch) / totalPunch) * 100)) : 100;
    const isCompliant = openCrit === 0 && onTimeRate >= 90;

    let metricsContainer = (card && typeof card.querySelector === "function") ? card.querySelector(".kpi2-metrics-grid") : null;
    if (metricsContainer) {
        metricsContainer.innerHTML = `
            <div class="kpi2-metric-card">
                <span class="kpi2-metric-label">📋 Total Punch Items</span>
                <span class="kpi2-metric-val">${totalPunch} Items</span>
                <span class="kpi2-metric-sub">Handover Snags Logged</span>
            </div>
            <div class="kpi2-metric-card">
                <span class="kpi2-metric-label">⏱️ Target Clearance Rate</span>
                <span class="kpi2-metric-val" style="color: ${onTimeRate >= 90 ? '#10b981' : (onTimeRate >= 75 ? '#f59e0b' : '#ef4444')};">${onTimeRate}% On-Time</span>
                <span class="kpi2-metric-sub">${totalPunch - overduePunch}/${totalPunch} within Target Date</span>
            </div>
            <div class="kpi2-metric-card">
                <span class="kpi2-metric-label">⚠️ Active Open Snags</span>
                <span class="kpi2-metric-val" style="color: ${openCrit > 0 ? '#ef4444' : (openMinor > 0 ? '#f59e0b' : '#10b981')};">${openCrit} Crit | ${openMinor} Minor</span>
                <span class="kpi2-metric-sub">${overduePunch} Overdue SLA</span>
            </div>
            <div class="kpi2-metric-card">
                <span class="kpi2-metric-label">🛡️ Handover Gatekeeper</span>
                <span class="kpi2-metric-val">
                    ${isCompliant 
                        ? '<span class="status-badge badge-green" style="font-size:12px;">TARGET MET (READY)</span>' 
                        : (openCrit === 0 
                            ? `<span class="status-badge badge-yellow" style="font-size:12px;">${overduePunch} OVERDUE (0 CRIT)</span>`
                            : `<span class="status-badge badge-red" style="font-size:12px;">${openCrit} CRITICAL OPEN</span>`)}
                </span>
                <span class="kpi2-metric-sub">${openCrit === 0 ? (overduePunch === 0 ? 'Ready for Handover' : 'Expedite Overdue') : 'Blocks Formal Handover'}</span>
            </div>
        `;
    }
}

// DYNAMIC VISUAL ANALYTICS RENDERER (SVG CHARTS WITH PER-KPI DISCIPLINE/SUB-DISCIPLINE/DESCRIPTION FILTERS)
function renderCompiledVisualAnalytics(targetProjects, timeRange, compMode, baseQ, targetQ) {
    const grid = document.getElementById("repChartsGrid");
    if (!grid) return;

    grid.innerHTML = "";
    if (!targetProjects) targetProjects = getCompilerTargetProjects();
    if (!timeRange) timeRange = appState.compiler.timeRange || "FY";

    const allKpiLogs = {
        kpi1: [], kpi2: [], kpi3: [], kpi4: [], kpi5: []
    };
    targetProjects.forEach(p => {
        (p.kpi1_logs || []).forEach(l => { if (isQuarterInTimeRange(l.quarter, timeRange)) allKpiLogs.kpi1.push({ ...l, projectName: p.name }); });
        (p.kpi2_logs || []).forEach(l => { if (isQuarterInTimeRange(l.quarter, timeRange)) allKpiLogs.kpi2.push({ ...l, projectName: p.name }); });
        (p.kpi3_logs || []).forEach(l => { if (isQuarterInTimeRange(l.quarter, timeRange)) allKpiLogs.kpi3.push({ ...l, projectName: p.name }); });
        (p.kpi4_logs || []).forEach(l => { if (isQuarterInTimeRange(l.quarter, timeRange)) allKpiLogs.kpi4.push({ ...l, projectName: p.name }); });
        (p.kpi5_logs || []).forEach(l => { if (isQuarterInTimeRange(l.quarter, timeRange)) allKpiLogs.kpi5.push({ ...l, projectName: p.name }); });
    });

    const activeKpi5Graphs = getCompiledKPI5ActiveGraphs();
    const isMultiKpi5 = activeKpi5Graphs.length > 1;

    const chartConfigs = [
        {
            key: "kpi1",
            icon: "📊",
            title: "1. First-Time Quality Pass Rate (FTQ) Dual-Axis Combo Trend (Testing Volume vs. Pass %)",
            benchmarkText: "Target Benchmark: ≥ 90.0% Pass Rate",
            legends: [
                { color: "rgba(59, 130, 246, 0.8)", label: "Passed Tests Volume [Bar]" },
                { color: "rgba(239, 68, 68, 0.8)", label: "Failed Tests Volume [Bar]" },
                { color: "#10b981", label: "First-Time Pass Rate (FTQ %) [Line]" },
                { color: "#ef4444", dashed: true, label: "Target Threshold (≥ 90.0%)" },
                { color: "#ef4444", label: "Target Breached (< 90.0%)" }
            ],
            logs: allKpiLogs.kpi1,
            render: (box, logs, card) => {
                renderKPI1ComboChart(box, logs, true, card, targetProjects, timeRange);
            }
        },
        {
            key: "kpi2",
            icon: "🔨",
            title: "2. Quality Rework Dual Trend (Breakdown Rate [Bar] & Accumulated Rate [Line])",
            benchmarkText: "Recommended Benchmark: ≤ 1.00% | Target Threshold Limit: ≤ 2.00% of Approved Cost",
            legends: [
                { color: "#10b981", label: "Optimal Breakdown Rate (≤ 1.00%) [Bar]" },
                { color: "#f59e0b", label: "Controlled Margin (1.0%–2.0%) [Bar]" },
                { color: "#ef4444", label: "Threshold Breached (> 2.00%) [Bar]" },
                { color: "#2563eb", label: "Accumulated Rework Rate (%) [Line]" },
                { color: "#10b981", dashed: true, label: "Recommended Target (≤ 1.00%)" },
                { color: "#ef4444", dashed: true, label: "Max Threshold Limit (≤ 2.00%)" }
            ],
            logs: allKpiLogs.kpi2,
            render: (box, logs, card) => {
                renderCompiledKPI2CumulativeGraph(box, logs, targetProjects, timeRange, card);
            }
        },
        {
            key: "kpi3",
            icon: "📊",
            title: "3. Defect Density Dual-Axis Combo Trend (Inspected Area vs. Defect Density)",
            benchmarkText: "Target Threshold Limit: ≤ 2.0 per 100 m²",
            legends: [
                { color: "rgba(59, 130, 246, 0.7)", label: "Total Inspected Area (m²) [Bar]" },
                { color: "#10b981", label: "Defect Density (per 100 m²) [Line]" },
                { color: "#ef4444", dashed: true, label: "Target Threshold (2.0 / 100m²)" },
                { color: "#ef4444", label: "Threshold Breached (> 2.0)" }
            ],
            logs: allKpiLogs.kpi3,
            render: (box, logs, card) => {
                renderKPI3ComboChart(box, logs, true, card, targetProjects, timeRange);
            }
        },
        {
            key: "kpi4",
            icon: "⏱️",
            title: "4. NCR Resolution Duration Timeline (Days)",
            benchmarkText: "Target Threshold: ≤ 5–7 Days Resolution",
            legends: [
                { color: "#3b82f6", label: "Resolution Duration (Days)" },
                { color: "#f59e0b", dashed: true, label: "Maximum Target Cap (7 Days)" }
            ],
            logs: allKpiLogs.kpi4,
            render: (box, logs, card) => {
                const totalNCRs = logs.length;
                const closedNCRs = logs.filter(l => l.status === "Closed" || l.status === "Rectified").length;
                const openNCRs = totalNCRs - closedNCRs;
                const avgDuration = totalNCRs > 0 ? (logs.reduce((s, l) => s + (parseFloat(l.duration) || 0), 0) / totalNCRs) : 0;
                const isCompliant = avgDuration <= 7;

                let metricsContainer = (card && typeof card.querySelector === "function") ? card.querySelector(".kpi2-metrics-grid") : null;
                if (metricsContainer) {
                    metricsContainer.innerHTML = `
                        <div class="kpi2-metric-card">
                            <span class="kpi2-metric-label">⏱️ Total NCRs Logged</span>
                            <span class="kpi2-metric-val">${totalNCRs} NCRs</span>
                            <span class="kpi2-metric-sub">Issued Non-Conformances</span>
                        </div>
                        <div class="kpi2-metric-card">
                            <span class="kpi2-metric-label">✅ Closed & Rectified</span>
                            <span class="kpi2-metric-val" style="color: #10b981;">${closedNCRs} Closed</span>
                            <span class="kpi2-metric-sub">${totalNCRs > 0 ? ((closedNCRs / totalNCRs) * 100).toFixed(0) : 0}% Clearance Rate</span>
                        </div>
                        <div class="kpi2-metric-card">
                            <span class="kpi2-metric-label">⚡ Active Open NCRs</span>
                            <span class="kpi2-metric-val" style="color: ${openNCRs > 0 ? '#ef4444' : '#10b981'};">${openNCRs} Open</span>
                            <span class="kpi2-metric-sub">${openNCRs === 0 ? 'All Items Cleared' : 'Action Required'}</span>
                        </div>
                        <div class="kpi2-metric-card">
                            <span class="kpi2-metric-label">🛡️ Avg Resolution Time</span>
                            <span class="kpi2-metric-val">
                                ${isCompliant 
                                    ? `<span class="status-badge badge-green" style="font-size:12px;">${avgDuration.toFixed(1)} Days (≤ 7d)</span>` 
                                    : `<span class="status-badge badge-red" style="font-size:12px;">${avgDuration.toFixed(1)} Days (> 7d)</span>`}
                            </span>
                            <span class="kpi2-metric-sub">${isCompliant ? 'Compliant Resolution' : 'Resolution Delayed'}</span>
                        </div>
                    `;
                }

                logs.sort((a, b) => new Date(a.dateIssued || "2026-01-01") - new Date(b.dateIssued || "2026-01-01"));
                renderGenericLineChart(box, logs, item => ({
                    date: item.dateIssued || "2026-01-01",
                    valReq: parseFloat(item.duration) || 0,
                    valAct: null,
                    benchVal: 7
                }), "NCR Duration (Days)", null, null, "kpi4");
            }
        }
    ];

    // Build KPI 5 Entries (Single or Multi-Graph Suite for PDF print)
    if (!isMultiKpi5) {
        const curMode = activeKpi5Graphs[0] || "burndown";
        let cardTitle = "5. Handover Punch List Analytics & Target Clearance Timeline";
        let cardIcon = "📋";
        let cardLegends = [
            { color: "#3b82f6", label: "Actual Punch Items Issued" },
            { color: "#10b981", dashed: true, label: "Target Planned Clearance" },
            { color: "#f59e0b", label: "Actual Open Minor Snags" },
            { color: "#ef4444", label: "Open Critical Snags (Blocks Turnover)" }
        ];

        if (curMode === "discipline") {
            cardIcon = "📊";
            cardTitle = "5. Handover Punch List Breakdown by Engineering Discipline";
            cardLegends = [
                { color: "#10b981", label: "Closed / Signed-off" },
                { color: "#3b82f6", label: "In Progress" },
                { color: "#ef4444", label: "Open / Pending" }
            ];
        } else if (curMode === "targetSchedule") {
            cardIcon = "📅";
            cardTitle = "5. Target Clearance Schedule & Due Date Workload Analysis";
            cardLegends = [
                { color: "#10b981", label: "🟢 Cleared On-Time [Bar]" },
                { color: "#f59e0b", label: "🟡 In-Progress Pending [Bar]" },
                { color: "#ef4444", label: "🔴 Overdue / Delayed [Bar]" },
                { color: "#10b981", dashed: true, label: "Planned Target S-Curve [%]" },
                { color: "#2563eb", label: "Actual Clearance S-Curve [%]" },
                { color: "#ef4444", label: "🎯 100% Target Limit" }
            ];
        }

        chartConfigs.push({
            key: "kpi5",
            icon: cardIcon,
            title: cardTitle,
            benchmarkText: "Target Benchmark: 100% Clearance within Target Date (0 Critical)",
            legends: cardLegends,
            logs: allKpiLogs.kpi5,
            subMode: curMode,
            render: (box, logs, card) => {
                renderKPI5MetricsGrid(card, logs);
                if (curMode === "discipline") {
                    renderKPI5StackedBarChart(box, logs);
                } else if (curMode === "targetSchedule") {
                    renderKPI5TargetScheduleChart(box, logs);
                } else {
                    renderKPI5BurnDownChart(box, logs);
                }
            }
        });
    } else {
        // Multi-Graph Suite for KPI 5 (e.g. 5A, 5B, 5C)
        if (activeKpi5Graphs.includes("burndown")) {
            chartConfigs.push({
                key: "kpi5_burndown",
                parentKey: "kpi5",
                subMode: "burndown",
                icon: "📋",
                title: "5A. Handover Punch List Analytics (Burn-Down Slope & Trend)",
                benchmarkText: "Target Benchmark: 100% Clearance within Target Date (0 Critical)",
                legends: [
                    { color: "#3b82f6", label: "Actual Punch Items Issued (Date Issued)" },
                    { color: "#10b981", dashed: true, label: "Target Planned Clearance (Target Dates)" },
                    { color: "#f59e0b", label: "Actual Open Minor Snags" },
                    { color: "#ef4444", label: "Open Critical Snags (Blocks Turnover)" }
                ],
                logs: allKpiLogs.kpi5,
                render: (box, logs, card) => {
                    renderKPI5MetricsGrid(card, logs);
                    renderKPI5BurnDownChart(box, logs);
                }
            });
        }
        if (activeKpi5Graphs.includes("discipline")) {
            chartConfigs.push({
                key: "kpi5_discipline",
                parentKey: "kpi5",
                subMode: "discipline",
                icon: "📊",
                title: "5B. Handover Punch List Breakdown by Engineering Discipline",
                benchmarkText: "Target Benchmark: Zero (0) Critical Snags across all Disciplines",
                legends: [
                    { color: "#10b981", label: "Closed / Signed-off" },
                    { color: "#3b82f6", label: "In Progress" },
                    { color: "#ef4444", label: "Open / Pending" }
                ],
                logs: allKpiLogs.kpi5,
                render: (box, logs, card) => {
                    renderKPI5MetricsGrid(card, logs);
                    renderKPI5StackedBarChart(box, logs);
                }
            });
        }
        if (activeKpi5Graphs.includes("targetSchedule")) {
            chartConfigs.push({
                key: "kpi5_targetSchedule",
                parentKey: "kpi5",
                subMode: "targetSchedule",
                icon: "📅",
                title: "5C. Target Clearance Schedule & Due Date Workload Analysis",
                benchmarkText: "Target Benchmark: 100% Clearance on or before Target Date",
                legends: [
                    { color: "#10b981", label: "🟢 Cleared On-Time [Bar]" },
                    { color: "#f59e0b", label: "🟡 In-Progress Pending [Bar]" },
                    { color: "#ef4444", label: "🔴 Overdue / Delayed [Bar]" },
                    { color: "#10b981", dashed: true, label: "Planned Target S-Curve [%]" },
                    { color: "#2563eb", label: "Actual Clearance S-Curve [%]" },
                    { color: "#ef4444", label: "🎯 100% Target Limit" }
                ],
                logs: allKpiLogs.kpi5,
                render: (box, logs, card) => {
                    renderKPI5MetricsGrid(card, logs);
                    renderKPI5TargetScheduleChart(box, logs);
                }
            });
        }
    }

    let renderedCount = 0;
    chartConfigs.forEach(cfg => {
        const kpiConfigKey = cfg.parentKey || cfg.key;
        const conf = appState.compiler.kpis[kpiConfigKey] || { enabled: true, chart: true, discipline: "ALL", subDiscipline: "ALL", description: "ALL" };
        if (conf.enabled !== false && conf.chart !== false) {
            renderedCount++;

            // Apply Granular Filter for this specific KPI graph
            const discFilter = conf.discipline || "ALL";
            const subFilter = conf.subDiscipline || "ALL";
            const descFilter = conf.description || "ALL";

            const filteredLogs = cfg.logs.filter(item => {
                if (discFilter !== "ALL") {
                    const d = (item.discipline || item.disc || "").trim();
                    if (d !== discFilter) return false;
                }
                if (subFilter !== "ALL") {
                    const s = (item.subDiscipline || item.subDisc || item.category || item.activity || "").trim();
                    if (s !== subFilter) return false;
                }
                if (descFilter !== "ALL") {
                    const ds = (item.test || item.testDesc || item.desc || item.itemDesc || item.defectDesc || item.issue || item.itemNo || item.name || "").trim();
                    if (ds !== descFilter) return false;
                }
                return true;
            });

            let filterPill = "";
            if (discFilter !== "ALL" || subFilter !== "ALL" || descFilter !== "ALL") {
                const parts = [
                    discFilter !== "ALL" ? discFilter : null,
                    subFilter !== "ALL" ? subFilter : null,
                    descFilter !== "ALL" ? descFilter : null
                ].filter(Boolean);
                filterPill = `<span class="badge badge-primary" style="font-size: 11px; margin-left: 8px;">Filter: ${parts.join(' > ')}</span>`;
            }

            let modeToggleHtml = "";
            let cardLegends = cfg.legends;
            if (kpiConfigKey === "kpi5") {
                const curMode = appState.compiler?.kpis?.kpi5?.viewMode || "burndown";
                modeToggleHtml = `
                    <div class="view-mode-toggle-group" style="margin-left: 10px;">
                        <button type="button" class="view-btn ${curMode === 'burndown' ? 'active' : ''}" onclick="switchCompiledKPI5ViewMode('burndown')">📉 Graph 1</button>
                        <button type="button" class="view-btn ${curMode === 'discipline' ? 'active' : ''}" onclick="switchCompiledKPI5ViewMode('discipline')">📊 Graph 2</button>
                        <button type="button" class="view-btn ${curMode === 'targetSchedule' ? 'active' : ''}" onclick="switchCompiledKPI5ViewMode('targetSchedule')">📅 Graph 3</button>
                        <button type="button" class="view-btn ${curMode === 'all' ? 'active' : ''}" onclick="switchCompiledKPI5ViewMode('all')">🌟 All 3 Graphs (PDF)</button>
                        <button type="button" class="view-btn ${curMode === 'graphs_1_3' ? 'active' : ''}" onclick="switchCompiledKPI5ViewMode('graphs_1_3')">📉+📅 G1&amp;3</button>
                    </div>
                `;
            }

            const curGraphOpts = getGraphDisplaySettings(kpiConfigKey, true);
            const isDualAxis = cfg.key === "kpi1" || cfg.key === "kpi3";
            const rightYControlHtml = isDualAxis ? `
                <div class="filter-group">
                    <label for="comp_${cfg.key}_yRightOffset">Right Y-Values Distance:</label>
                    <select id="comp_${cfg.key}_yRightOffset" class="styled-select" onchange="onCompilerGraphSettingChange('${kpiConfigKey}')">
                        <option value="8" ${Number(curGraphOpts.yRightOffset) === 8 ? 'selected' : ''}>⚡ Near (+8px)</option>
                        <option value="18" ${Number(curGraphOpts.yRightOffset) === 18 || !curGraphOpts.yRightOffset ? 'selected' : ''}>Standard (+18px)</option>
                        <option value="28" ${Number(curGraphOpts.yRightOffset) === 28 ? 'selected' : ''}>Spaced (+28px)</option>
                        <option value="45" ${Number(curGraphOpts.yRightOffset) === 45 ? 'selected' : ''}>Far Right (+45px)</option>
                        <option value="65" ${Number(curGraphOpts.yRightOffset) === 65 ? 'selected' : ''}>Extra Far (+65px)</option>
                        <option value="85" ${Number(curGraphOpts.yRightOffset) === 85 ? 'selected' : ''}>Max Separation (+85px)</option>
                    </select>
                </div>
            ` : '';

            const valuePositionControlsHtml = (kpiConfigKey === "kpi5" && (!cfg.subMode || cfg.subMode === "burndown")) ? `
                <div class="filter-group">
                    <label for="comp_kpi5_posIssued" style="color: #60a5fa; font-weight: 700;">🔵 Issued Val:</label>
                    <select id="comp_kpi5_posIssued" class="styled-select" onchange="onCompilerGraphSettingChange('kpi5')">
                        <option value="high" ${curGraphOpts.posIssued === 'high' || !curGraphOpts.posIssued ? 'selected' : ''}>⏫ High Above (-20px)</option>
                        <option value="above" ${curGraphOpts.posIssued === 'above' ? 'selected' : ''}>⬆️ Above (-10px)</option>
                        <option value="extra_high" ${curGraphOpts.posIssued === 'extra_high' ? 'selected' : ''}>🚀 Extra High (-30px)</option>
                        <option value="below" ${curGraphOpts.posIssued === 'below' ? 'selected' : ''}>⬇️ Below (+18px)</option>
                        <option value="left" ${curGraphOpts.posIssued === 'left' ? 'selected' : ''}>⬅️ Left (-12px)</option>
                        <option value="right" ${curGraphOpts.posIssued === 'right' ? 'selected' : ''}>➡️ Right (+12px)</option>
                        <option value="hide" ${curGraphOpts.posIssued === 'hide' ? 'selected' : ''}>🚫 Hide</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label for="comp_kpi5_posTarget" style="color: #34d399; font-weight: 700;">🟢 Target Val:</label>
                    <select id="comp_kpi5_posTarget" class="styled-select" onchange="onCompilerGraphSettingChange('kpi5')">
                        <option value="below" ${curGraphOpts.posTarget === 'below' || !curGraphOpts.posTarget ? 'selected' : ''}>⬇️ Below (+18px)</option>
                        <option value="above" ${curGraphOpts.posTarget === 'above' ? 'selected' : ''}>⬆️ Above (-10px)</option>
                        <option value="high" ${curGraphOpts.posTarget === 'high' ? 'selected' : ''}>⏫ High Above (-20px)</option>
                        <option value="extra_high" ${curGraphOpts.posTarget === 'extra_high' ? 'selected' : ''}>🚀 Extra High (-30px)</option>
                        <option value="left" ${curGraphOpts.posTarget === 'left' ? 'selected' : ''}>⬅️ Left (-12px)</option>
                        <option value="right" ${curGraphOpts.posTarget === 'right' ? 'selected' : ''}>➡️ Right (+12px)</option>
                        <option value="hide" ${curGraphOpts.posTarget === 'hide' ? 'selected' : ''}>🚫 Hide</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label for="comp_kpi5_posMinor" style="color: #fbbf24; font-weight: 700;">🟡 Minor Val:</label>
                    <select id="comp_kpi5_posMinor" class="styled-select" onchange="onCompilerGraphSettingChange('kpi5')">
                        <option value="above" ${curGraphOpts.posMinor === 'above' || !curGraphOpts.posMinor ? 'selected' : ''}>⬆️ Above (-10px)</option>
                        <option value="high" ${curGraphOpts.posMinor === 'high' ? 'selected' : ''}>⏫ High Above (-20px)</option>
                        <option value="extra_high" ${curGraphOpts.posMinor === 'extra_high' ? 'selected' : ''}>🚀 Extra High (-30px)</option>
                        <option value="below" ${curGraphOpts.posMinor === 'below' ? 'selected' : ''}>⬇️ Below (+18px)</option>
                        <option value="left" ${curGraphOpts.posMinor === 'left' ? 'selected' : ''}>⬅️ Left (-12px)</option>
                        <option value="right" ${curGraphOpts.posMinor === 'right' ? 'selected' : ''}>➡️ Right (+12px)</option>
                        <option value="hide" ${curGraphOpts.posMinor === 'hide' ? 'selected' : ''}>🚫 Hide</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label for="comp_kpi5_posCrit" style="color: #f87171; font-weight: 700;">🔴 Critical Val:</label>
                    <select id="comp_kpi5_posCrit" class="styled-select" onchange="onCompilerGraphSettingChange('kpi5')">
                        <option value="extra_high" ${curGraphOpts.posCrit === 'extra_high' || !curGraphOpts.posCrit ? 'selected' : ''}>🚀 Extra High (-30px)</option>
                        <option value="high" ${curGraphOpts.posCrit === 'high' ? 'selected' : ''}>⏫ High Above (-20px)</option>
                        <option value="above" ${curGraphOpts.posCrit === 'above' ? 'selected' : ''}>⬆️ Above (-10px)</option>
                        <option value="below" ${curGraphOpts.posCrit === 'below' ? 'selected' : ''}>⬇️ Below (+18px)</option>
                        <option value="left" ${curGraphOpts.posCrit === 'left' ? 'selected' : ''}>⬅️ Left (-12px)</option>
                        <option value="right" ${curGraphOpts.posCrit === 'right' ? 'selected' : ''}>➡️ Right (+12px)</option>
                        <option value="hide" ${curGraphOpts.posCrit === 'hide' ? 'selected' : ''}>🚫 Hide</option>
                    </select>
                </div>
            ` : `
                <div class="filter-group">
                    <label for="comp_${cfg.key}_labelPos">Value Position:</label>
                    <select id="comp_${cfg.key}_labelPos" class="styled-select" onchange="onCompilerGraphSettingChange('${kpiConfigKey}')">
                        <option value="above" ${curGraphOpts.labelPos === 'above' || !curGraphOpts.labelPos ? 'selected' : ''}>⬆️ Top / Above (+12px)</option>
                        <option value="high" ${curGraphOpts.labelPos === 'high' ? 'selected' : ''}>⏫ High Clearance (+22px)</option>
                        <option value="extra_high" ${curGraphOpts.labelPos === 'extra_high' ? 'selected' : ''}>🚀 Extra High (+32px)</option>
                        <option value="inside" ${curGraphOpts.labelPos === 'inside' ? 'selected' : ''}>🎯 Inside / Center</option>
                        <option value="below" ${curGraphOpts.labelPos === 'below' ? 'selected' : ''}>⬇️ Bottom / Below</option>
                        <option value="hide" ${curGraphOpts.labelPos === 'hide' ? 'selected' : ''}>🚫 Hide Values</option>
                    </select>
                </div>
            `;

            const kpi1ExtraControlsHtml = cfg.key === "kpi1" ? `
                <div class="filter-group">
                    <label for="comp_kpi1_monthPos">Month Pos:</label>
                    <select id="comp_kpi1_monthPos" class="styled-select" onchange="onCompilerGraphSettingChange('kpi1')">
                        <option value="top" ${curGraphOpts.monthPos === 'top' || !curGraphOpts.monthPos ? 'selected' : ''}>⬆️ Top (+0px)</option>
                        <option value="high" ${curGraphOpts.monthPos === 'high' ? 'selected' : ''}>⏫ High Top (-10px)</option>
                        <option value="middle" ${curGraphOpts.monthPos === 'middle' ? 'selected' : ''}>↕️ Mid-Chart</option>
                        <option value="bottom" ${curGraphOpts.monthPos === 'bottom' ? 'selected' : ''}>⬇️ Bottom (Above X-Axis)</option>
                        <option value="hide" ${curGraphOpts.monthPos === 'hide' ? 'selected' : ''}>🚫 Hide Month</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label for="comp_kpi1_labelOffset">Label Height (Y-Offset):</label>
                    <select id="comp_kpi1_labelOffset" class="styled-select" onchange="onCompilerGraphSettingChange('kpi1')">
                        <option value="-45" ${Number(curGraphOpts.labelOffset) === -45 ? 'selected' : ''}>✨ Ultra Lift (-45px)</option>
                        <option value="-30" ${Number(curGraphOpts.labelOffset) === -30 ? 'selected' : ''}>🚀 High Lift (-30px)</option>
                        <option value="-15" ${Number(curGraphOpts.labelOffset) === -15 ? 'selected' : ''}>⏫ Raised (-15px)</option>
                        <option value="0" ${Number(curGraphOpts.labelOffset) === 0 || !curGraphOpts.labelOffset ? 'selected' : ''}>⚡ Standard (0px)</option>
                        <option value="15" ${Number(curGraphOpts.labelOffset) === 15 ? 'selected' : ''}>⬇️ Lowered (+15px)</option>
                        <option value="30" ${Number(curGraphOpts.labelOffset) === 30 ? 'selected' : ''}>⏬ Extra Low (+30px)</option>
                    </select>
                </div>
            ` : '';

            const controlsBarHtml = `
                <div class="compiler-graph-controls-bar">
                    <span class="custom-controls-title" style="margin-right: auto;">⚙️ Graph Series &amp; Axis Controls:</span>
                    
                    <div class="filter-group">
                        <label for="comp_${cfg.key}_dateAngle">X-Text Angle:</label>
                        <select id="comp_${cfg.key}_dateAngle" class="styled-select" onchange="onCompilerGraphSettingChange('${kpiConfigKey}')">
                            <option value="horizontal" ${curGraphOpts.dateAngle === 'horizontal' ? 'selected' : ''}>↔️ Horizontal (0°)</option>
                            <option value="slanted" ${curGraphOpts.dateAngle === 'slanted' ? 'selected' : ''}>↗️ Slanted (-45°)</option>
                            <option value="vertical" ${curGraphOpts.dateAngle === 'vertical' ? 'selected' : ''}>↕️ Vertical (-90°)</option>
                            <option value="auto" ${curGraphOpts.dateAngle === 'auto' ? 'selected' : ''}>⚡ Auto-Detect</option>
                        </select>
                    </div>

                    <div class="filter-group">
                        <label for="comp_${cfg.key}_xAxisOffset">X-Text Distance:</label>
                        <select id="comp_${cfg.key}_xAxisOffset" class="styled-select" onchange="onCompilerGraphSettingChange('${kpiConfigKey}')">
                            <option value="15" ${Number(curGraphOpts.xAxisOffset) === 15 ? 'selected' : ''}>Standard (+15px)</option>
                            <option value="25" ${Number(curGraphOpts.xAxisOffset) === 25 || !curGraphOpts.xAxisOffset ? 'selected' : ''}>Spaced (+25px)</option>
                            <option value="35" ${Number(curGraphOpts.xAxisOffset) === 35 ? 'selected' : ''}>Extra Spaced (+35px)</option>
                            <option value="50" ${Number(curGraphOpts.xAxisOffset) === 50 ? 'selected' : ''}>Far Away (+50px)</option>
                            <option value="65" ${Number(curGraphOpts.xAxisOffset) === 65 ? 'selected' : ''}>Max Separation (+65px)</option>
                        </select>
                    </div>

                    <div class="filter-group">
                        <label for="comp_${cfg.key}_fontSize">Text Size:</label>
                        <select id="comp_${cfg.key}_fontSize" class="styled-select" onchange="onCompilerGraphSettingChange('${kpiConfigKey}')">
                            <option value="9" ${parseInt(curGraphOpts.fontSize) === 9 ? 'selected' : ''}>Tiny (9px)</option>
                            <option value="10" ${parseInt(curGraphOpts.fontSize) === 10 ? 'selected' : ''}>Small (10px)</option>
                            <option value="11" ${parseInt(curGraphOpts.fontSize) === 11 || !curGraphOpts.fontSize ? 'selected' : ''}>Medium (11px)</option>
                            <option value="12" ${parseInt(curGraphOpts.fontSize) === 12 ? 'selected' : ''}>Large (12px)</option>
                            <option value="13" ${parseInt(curGraphOpts.fontSize) === 13 ? 'selected' : ''}>Extra Large (13px)</option>
                            <option value="14" ${parseInt(curGraphOpts.fontSize) === 14 ? 'selected' : ''}>Huge (14px)</option>
                        </select>
                    </div>

                    ${valuePositionControlsHtml}
                    ${kpi1ExtraControlsHtml}

                    <div class="filter-group">
                        <label for="comp_${cfg.key}_yLeftOffset">Left Y-Values Distance:</label>
                        <select id="comp_${cfg.key}_yLeftOffset" class="styled-select" onchange="onCompilerGraphSettingChange('${kpiConfigKey}')">
                            <option value="8" ${Number(curGraphOpts.yLeftOffset) === 8 ? 'selected' : ''}>⚡ Near (-8px)</option>
                            <option value="18" ${Number(curGraphOpts.yLeftOffset) === 18 || !curGraphOpts.yLeftOffset ? 'selected' : ''}>Standard (-18px)</option>
                            <option value="28" ${Number(curGraphOpts.yLeftOffset) === 28 ? 'selected' : ''}>Spaced (-28px)</option>
                            <option value="45" ${Number(curGraphOpts.yLeftOffset) === 45 ? 'selected' : ''}>Far Left (-45px)</option>
                            <option value="65" ${Number(curGraphOpts.yLeftOffset) === 65 ? 'selected' : ''}>Extra Far (-65px)</option>
                            <option value="85" ${Number(curGraphOpts.yLeftOffset) === 85 ? 'selected' : ''}>Max Separation (-85px)</option>
                        </select>
                    </div>
                    ${rightYControlHtml}
                </div>
            `;

            // Compute Narrative Summary with Trend for this graph
            const isFirstKpiCard = !cfg.parentKey || cfg.key === "kpi5_burndown" || (activeKpi5Graphs[0] === cfg.subMode);
            const isNarrativeVisible = isFirstKpiCard && (appState.compiler?.narrativeVisibility?.[kpiConfigKey] !== false);
            const showNarrativesGlobal = isFirstKpiCard && (appState.compiler?.includeGraphNarratives !== false);
            const narrativeData = generateGraphTrendNarrative(kpiConfigKey, filteredLogs, cfg.logs, targetProjects, timeRange, compMode, baseQ, targetQ);

            const narrativeHtml = isFirstKpiCard ? `
                <div class="chart-narrative-container" id="chartNarrative_${cfg.key}" style="display: ${showNarrativesGlobal ? 'flex' : 'none'};">
                    <div class="chart-narrative-header">
                        <div class="chart-narrative-title">
                            <span>🧠</span>
                            <span style="font-weight: 700; white-space: nowrap;">Executive Graph Insight &amp; Trend Narrative:</span>
                            <span class="trajectory-badge ${narrativeData.trendBadge.class}" style="margin-left: 4px; font-size: 9.5px; padding: 2px 6px; white-space: nowrap;">
                                ${narrativeData.trendBadge.label}
                            </span>
                        </div>
                        <button type="button" class="chart-narrative-toggle-btn" onclick="toggleCardGraphNarrative('${kpiConfigKey}')">
                            <span id="narrativeToggleLabel_${kpiConfigKey}">${isNarrativeVisible ? '👁️ Hide Narrative' : '📖 Show Narrative'}</span>
                        </button>
                    </div>
                    <div class="chart-narrative-body" id="chartNarrativeBody_${kpiConfigKey}" style="display: ${isNarrativeVisible ? 'flex' : 'none'};">
                        <div class="chart-narrative-main-text">
                            ${narrativeData.mainText}
                        </div>
                        <div class="chart-narrative-bullets">
                            ${narrativeData.bullets.map(b => `
                                <div class="chart-narrative-bullet-card">
                                    <span class="chart-narrative-bullet-label">${b.icon} ${b.label}</span>
                                    <span class="chart-narrative-bullet-val">${b.val}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            ` : '';

            const card = document.createElement("div");
            card.className = "compiler-chart-card";
            card.innerHTML = `
                <div class="compiler-chart-header">
                    <div class="compiler-chart-header-left">
                        <span style="font-size: 20px;">${cfg.icon}</span>
                        <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 8px;">
                            <h3 style="display: inline-block; margin: 0;">${cfg.title}</h3>
                            ${filterPill}
                            ${modeToggleHtml}
                        </div>
                    </div>
                    <span class="info-tag" style="font-size: 11px; font-weight: 700;">${cfg.benchmarkText}</span>
                </div>
                ${controlsBarHtml}
                <div class="compiler-chart-legend-bar">
                    ${cardLegends.map(l => `
                        <span class="legend-item" style="display: inline-flex; align-items: center; gap: 6px;">
                            <span class="legend-dot" style="background: ${l.color}; ${l.dashed ? 'border-radius: 0; height: 3px; width: 16px;' : 'width: 10px; height: 10px; border-radius: 50%;'}"></span>
                            <span>${l.label}</span>
                        </span>
                    `).join('')}
                </div>
                <div id="compiledChart_${cfg.key}" class="compiler-chart-svg-box"></div>
                <div id="compiledMetrics_${cfg.key}" class="kpi2-metrics-grid"></div>
                ${narrativeHtml}
            `;
            grid.appendChild(card);

            const box = card.querySelector(`#compiledChart_${cfg.key}`);
            if (box && typeof cfg.render === "function") {
                if (filteredLogs.length > 0) {
                    cfg.render(box, filteredLogs, card);
                } else {
                    box.innerHTML = `
                        <div style="padding: 60px 20px; text-align: center; color: var(--text-secondary); font-size: 13px;">
                            ℹ️ No records found matching the active graph filter (${discFilter} / ${subFilter} / ${descFilter}) for ${timeRange}.
                        </div>
                    `;
                }
            }
        }
    });

    const chartsSection = document.getElementById("repChartsSection");
    if (chartsSection) {
        chartsSection.style.display = renderedCount > 0 ? "block" : "none";
    }
}

function switchCompiledKPI5ViewMode(mode) {
    if (!appState.compiler) initExecutiveCompiler();
    if (!appState.compiler.kpis) appState.compiler.kpis = {};
    if (!appState.compiler.kpis.kpi5) appState.compiler.kpis.kpi5 = {};
    appState.compiler.kpis.kpi5.viewMode = mode;

    syncCompilerKPI5Checkboxes();
    saveAppState();
    renderCompiledVisualAnalytics();
}

// ==========================================================================
// 📋 DETAILED KPI DATA AUDIT TABLES RENDERER (EXCEL TABLE SYSTEM)
// ==========================================================================

let isAuditLogWrapText = false;

function toggleAuditLogsWrapText(forceState) {
    if (forceState !== undefined) {
        isAuditLogWrapText = forceState;
    } else {
        isAuditLogWrapText = !isAuditLogWrapText;
    }

    const container = document.getElementById("repDetailedLogsContainer");
    if (container) {
        container.classList.toggle("wrap-text-active", isAuditLogWrapText);
    }

    const btns = document.querySelectorAll(".btn-toggle-wrap-text");
    btns.forEach(btn => {
        if (isAuditLogWrapText) {
            btn.classList.add("active");
            btn.innerHTML = `<span>↩️ Wrap Text: <strong>ON</strong></span>`;
        } else {
            btn.classList.remove("active");
            btn.innerHTML = `<span>↔️ Wrap Text: <strong>OFF</strong></span>`;
        }
    });
}

function resetAuditTableColWidths() {
    const container = document.getElementById("repDetailedLogsContainer");
    if (!container) return;
    const ths = container.querySelectorAll(".itemized-data-table thead th");
    ths.forEach(th => {
        th.style.width = "";
        th.style.minWidth = "";
    });
}

function initTableColumnResizers(container) {
    const root = container || document.getElementById("repDetailedLogsContainer");
    if (!root) return;

    const tables = root.querySelectorAll(".itemized-data-table");
    tables.forEach(table => {
        const ths = table.querySelectorAll("thead th");
        ths.forEach(th => {
            // Remove existing resizer if any
            const existingResizer = th.querySelector(".excel-col-resizer");
            if (existingResizer) existingResizer.remove();

            // Resizer handle
            const resizer = document.createElement("div");
            resizer.className = "excel-col-resizer";
            th.style.position = "relative";
            th.appendChild(resizer);

            let startX = 0;
            let startWidth = 0;

            const onMouseDown = (e) => {
                e.preventDefault();
                e.stopPropagation();
                startX = e.pageX;
                startWidth = th.offsetWidth;

                document.body.classList.add("resizing-table-col");
                resizer.classList.add("resizing");

                const onMouseMove = (moveEvent) => {
                    const diff = moveEvent.pageX - startX;
                    const newWidth = Math.max(40, startWidth + diff);
                    th.style.width = newWidth + "px";
                    th.style.minWidth = newWidth + "px";
                };

                const onMouseUp = () => {
                    document.removeEventListener("mousemove", onMouseMove);
                    document.removeEventListener("mouseup", onMouseUp);
                    document.body.classList.remove("resizing-table-col");
                    resizer.classList.remove("resizing");
                };

                document.addEventListener("mousemove", onMouseMove);
                document.addEventListener("mouseup", onMouseUp);
            };

            resizer.addEventListener("mousedown", onMouseDown);
        });
    });
}

function renderCompiledKPILogs(targetProjects, timeRange) {
    const container = document.getElementById("repDetailedLogsContainer");
    if (!container) return;

    container.innerHTML = "";
    if (isAuditLogWrapText) {
        container.classList.add("wrap-text-active");
    } else {
        container.classList.remove("wrap-text-active");
    }

    // 1. KPI 1 FTQ Audit Table
    if (appState.compiler.kpis.kpi1?.enabled !== false) {
        const div = document.createElement("div");
        div.className = "itemized-kpi-block";
        let rowsHtml = "";
        let totalCount = 0, passCount = 0;
        let rowIdx = 1;

        targetProjects.forEach(p => {
            (p.kpi1_logs || []).forEach(l => {
                if (isQuarterInTimeRange(l.quarter, timeRange)) {
                    totalCount++;
                    if (l.remarks === "Pass") passCount++;
                    const isPass = l.remarks === "Pass";
                    const formattedDate = formatTableDate(l.dateRes || l.dateCond || "");
                    rowsHtml += `
                        <tr>
                            <td class="col-idx">${rowIdx++}</td>
                            <td><strong>${p.name}</strong></td>
                            <td>${l.discipline || 'N/A'}</td>
                            <td>${l.subDiscipline || '-'}</td>
                            <td>${l.test || 'N/A'}</td>
                            <td>${l.req || 'N/A'}</td>
                            <td class="num-cell"><strong>${l.act || '0'}</strong></td>
                            <td class="center-cell">${formattedDate || '-'}</td>
                            <td class="center-cell"><span class="badge ${isPass ? 'badge-pass' : 'badge-fail'}">${l.remarks || 'Pass'}</span></td>
                            <td class="center-cell">${l.quarter || 'N/A'}</td>
                        </tr>
                    `;
                }
            });
        });

        const passRate = totalCount > 0 ? ((passCount / totalCount) * 100).toFixed(1) : "100.0";
        div.innerHTML = `
            <div class="itemized-kpi-header">
                <div>
                    <h4>🧪 KPI 1: First-Time Quality (FTQ) Field Test Audit Log</h4>
                    <p style="font-size: 11px; color: var(--text-secondary); margin: 2px 0 0 0;">Itemized testing records and design specification verification results.</p>
                </div>
                <div style="font-size: 11px; font-weight: 700;">
                    Pass Velocity: <span class="${parseFloat(passRate) >= 90 ? 'text-green' : 'text-red'}">${passRate}%</span> (${passCount}/${totalCount} Passed)
                </div>
            </div>
            <div class="excel-audit-table-wrap">
                <table class="itemized-data-table kpi1-audit-table">
                    <thead>
                        <tr>
                            <th style="width: 44px; min-width: 44px; text-align: center;">#</th>
                            <th style="width: 170px;">Project Site</th>
                            <th style="width: 130px;">Discipline</th>
                            <th style="width: 130px;">Sub-Discipline</th>
                            <th style="width: 210px;">Test Description</th>
                            <th style="width: 170px;">Design Requirement</th>
                            <th style="width: 90px; text-align: right;">Actual</th>
                            <th style="width: 110px; text-align: center;">Date</th>
                            <th style="width: 90px; text-align: center;">Compliance</th>
                            <th style="width: 75px; text-align: center;">Quarter</th>
                        </tr>
                    </thead>
                    <tbody>${rowsHtml || '<tr><td colspan="10" style="text-align:center; padding: 20px;">No FTQ logs found for selected timeframe.</td></tr>'}</tbody>
                </table>
            </div>
        `;
        container.appendChild(div);
    }

    // 2. KPI 2 Rework BOQ Audit Table
    if (appState.compiler.kpis.kpi2?.enabled !== false) {
        const div = document.createElement("div");
        div.className = "itemized-kpi-block";
        let rowsHtml = "";
        let totalReworkCost = 0;
        let totalApprovedCost = 0;
        let rowIdx = 1;

        targetProjects.forEach(p => {
            (p.kpi2_logs || []).forEach(l => {
                if (isQuarterInTimeRange(l.quarter, timeRange)) {
                    const qty = parseFloat(l.qty) || 1;
                    const labor = parseFloat(l.labor) || 0;
                    const mat = parseFloat(l.mat) || 0;
                    const subtotal = (labor + mat) * qty;
                    const apprCost = parseFloat(l.approvedCost) !== undefined && !isNaN(parseFloat(l.approvedCost)) ? parseFloat(l.approvedCost) : 0;
                    const itemReworkPct = apprCost > 0 ? (subtotal / apprCost) * 100 : 0;
                    totalReworkCost += subtotal;
                    totalApprovedCost += apprCost;
                    const formattedDate = formatTableDate(l.date || "");

                    rowsHtml += `
                        <tr>
                            <td class="col-idx">${rowIdx++}</td>
                            <td><strong>${p.name}</strong></td>
                            <td>${l.discipline || 'N/A'}</td>
                            <td>${l.subDiscipline || '-'}</td>
                            <td>${l.desc || 'N/A'}</td>
                            <td class="num-cell">${apprCost > 0 ? `₱${apprCost.toLocaleString()}` : '-'}</td>
                            <td class="center-cell">${qty} ${l.unit || 'lot'}</td>
                            <td class="num-cell">₱${labor.toLocaleString()}</td>
                            <td class="num-cell">₱${mat.toLocaleString()}</td>
                            <td class="num-cell"><strong>₱${subtotal.toLocaleString()}</strong></td>
                            <td class="center-cell"><span class="badge ${itemReworkPct <= 1.0 ? 'badge-pass' : (itemReworkPct <= 2.0 ? 'badge-warn' : 'badge-fail')}">${itemReworkPct > 0 ? `${itemReworkPct.toFixed(2)}%` : '0.00%'}</span></td>
                            <td class="center-cell">${formattedDate || '-'}</td>
                            <td class="center-cell">${l.quarter || 'N/A'}</td>
                        </tr>
                    `;
                }
            });
        });

        const overallPct = totalApprovedCost > 0 ? (totalReworkCost / totalApprovedCost) * 100 : 0;

        div.innerHTML = `
            <div class="itemized-kpi-header">
                <div>
                    <h4>🔨 KPI 2: Quality Rework BOQ Expenditure Breakdown</h4>
                    <p style="font-size: 11px; color: var(--text-secondary); margin: 2px 0 0 0;">Direct rework cost impact on labor, material, and approved item contract cost baselines.</p>
                </div>
                <div style="font-size: 11px; font-weight: 700;">
                    Total Rework: <span class="text-red">₱${totalReworkCost.toLocaleString()}</span> / Approved Cost: <span style="color: #2563eb;">₱${totalApprovedCost.toLocaleString()}</span> (<span class="${overallPct <= 2.0 ? 'text-green' : 'text-red'}">${overallPct.toFixed(2)}%</span>)
                </div>
            </div>
            <div class="excel-audit-table-wrap">
                <table class="itemized-data-table kpi2-audit-table">
                    <thead>
                        <tr>
                            <th style="width: 44px; min-width: 44px; text-align: center;">#</th>
                            <th style="width: 160px;">Project Site</th>
                            <th style="width: 120px;">Discipline</th>
                            <th style="width: 120px;">Sub-Discipline</th>
                            <th style="width: 190px;">Rework Activity Description</th>
                            <th style="width: 120px; text-align: right;">Approved Cost (₱)</th>
                            <th style="width: 75px; text-align: center;">Qty / Unit</th>
                            <th style="width: 90px; text-align: right;">Labor (₱)</th>
                            <th style="width: 90px; text-align: right;">Material (₱)</th>
                            <th style="width: 100px; text-align: right;">Subtotal (₱)</th>
                            <th style="width: 80px; text-align: center;">Rework %</th>
                            <th style="width: 110px; text-align: center;">Date</th>
                            <th style="width: 70px; text-align: center;">Quarter</th>
                        </tr>
                    </thead>
                    <tbody>${rowsHtml || '<tr><td colspan="13" style="text-align:center; padding: 20px;">No Rework BOQ logs found for selected timeframe.</td></tr>'}</tbody>
                </table>
            </div>
        `;
        container.appendChild(div);
    }

    // 3. KPI 3 Defect Logs Audit Table
    if (appState.compiler.kpis.kpi3?.enabled !== false) {
        const div = document.createElement("div");
        div.className = "itemized-kpi-block";
        let rowsHtml = "";
        let totalCount = 0;
        let rowIdx = 1;

        targetProjects.forEach(p => {
            (p.kpi3_logs || []).forEach(l => {
                if (isQuarterInTimeRange(l.quarter, timeRange)) {
                    totalCount++;
                    const inspArea = l.totalInspectedArea !== undefined ? l.totalInspectedArea : (l.totalArea !== undefined ? l.totalArea : 'N/A');
                    const defFound = l.defectCount !== undefined ? l.defectCount : (l.defects !== undefined ? l.defects : 'N/A');
                    const formattedDate = formatTableDate(l.date || "");
                    rowsHtml += `
                        <tr>
                            <td class="col-idx">${rowIdx++}</td>
                            <td><strong>${p.name}</strong></td>
                            <td>${l.discipline || 'N/A'}</td>
                            <td>${l.desc || 'N/A'}</td>
                            <td>${l.loc || 'N/A'}</td>
                            <td class="num-cell">${inspArea !== 'N/A' ? `${inspArea.toLocaleString()} m²` : 'N/A'}</td>
                            <td class="center-cell"><strong>${defFound}</strong></td>
                            <td class="num-cell">${l.area ? `${l.area} m²` : 'N/A'}</td>
                            <td class="center-cell">${formattedDate || '-'}</td>
                            <td class="center-cell"><span class="status-badge ${l.status === 'Resolved' ? 'badge-green' : 'badge-yellow'}">${l.status || 'Open'}</span></td>
                            <td class="center-cell">${l.quarter || 'N/A'}</td>
                        </tr>
                    `;
                }
            });
        });

        div.innerHTML = `
            <div class="itemized-kpi-header">
                <div>
                    <h4>📐 KPI 3: Quality Defect Density Log</h4>
                    <p style="font-size: 11px; color: var(--text-secondary); margin: 2px 0 0 0;">Logged physical workmanship deficiencies, inspected areas, and defect counts.</p>
                </div>
                <div style="font-size: 11px; font-weight: 700;">
                    Total Defect Entries: <span>${totalCount}</span>
                </div>
            </div>
            <div class="excel-audit-table-wrap">
                <table class="itemized-data-table kpi3-audit-table">
                    <thead>
                        <tr>
                            <th style="width: 44px; min-width: 44px; text-align: center;">#</th>
                            <th style="width: 170px;">Project Site</th>
                            <th style="width: 130px;">Discipline</th>
                            <th style="width: 200px;">Defect Description</th>
                            <th style="width: 130px;">Location / Grid</th>
                            <th style="width: 110px; text-align: right;">Inspected Area</th>
                            <th style="width: 80px; text-align: center;">Defects</th>
                            <th style="width: 100px; text-align: right;">Affected Area</th>
                            <th style="width: 110px; text-align: center;">Date</th>
                            <th style="width: 85px; text-align: center;">Status</th>
                            <th style="width: 75px; text-align: center;">Quarter</th>
                        </tr>
                    </thead>
                    <tbody>${rowsHtml || '<tr><td colspan="11" style="text-align:center; padding: 20px;">No Defect logs found for selected timeframe.</td></tr>'}</tbody>
                </table>
            </div>
        `;
        container.appendChild(div);
    }

    // 4. KPI 4 NCR Tracking Audit Table
    if (appState.compiler.kpis.kpi4?.enabled !== false) {
        const div = document.createElement("div");
        div.className = "itemized-kpi-block";
        let rowsHtml = "";
        let openCount = 0, closedCount = 0, totalDays = 0;
        let rowIdx = 1;

        targetProjects.forEach(p => {
            (p.kpi4_logs || []).forEach(l => {
                if (isQuarterInTimeRange(l.quarter, timeRange)) {
                    const isClosed = l.status === "Closed" || l.status === "Resolved";
                    if (isClosed) {
                        closedCount++;
                        totalDays += parseFloat(l.duration) || 0;
                    } else {
                        openCount++;
                    }
                    const formattedIssued = formatTableDate(l.dateIssued || "");
                    const formattedClosed = formatTableDate(l.dateClosed || "");
                    rowsHtml += `
                        <tr>
                            <td class="col-idx">${rowIdx++}</td>
                            <td><strong>${l.ncrNo || 'N/A'}</strong></td>
                            <td>${p.name}</td>
                            <td>${l.discipline || 'N/A'}</td>
                            <td>${l.desc || 'N/A'}</td>
                            <td>${l.sub || 'N/A'}</td>
                            <td class="center-cell">${formattedIssued || '-'}</td>
                            <td class="center-cell">${formattedClosed || '-'}</td>
                            <td class="num-cell"><strong>${l.duration ? `${l.duration} Days` : 'N/A'}</strong></td>
                            <td class="center-cell"><span class="status-badge ${isClosed ? 'badge-green' : 'badge-red'}">${l.status || 'Open'}</span></td>
                            <td class="center-cell">${l.quarter || 'N/A'}</td>
                        </tr>
                    `;
                }
            });
        });

        const avgDuration = closedCount > 0 ? (totalDays / closedCount).toFixed(1) : "0.0";
        div.innerHTML = `
            <div class="itemized-kpi-header">
                <div>
                    <h4>⏱️ KPI 4: Non-Conformance Report (NCR) Resolution Audit</h4>
                    <p style="font-size: 11px; color: var(--text-secondary); margin: 2px 0 0 0;">NCR closure cycle time and contractor resolution velocity.</p>
                </div>
                <div style="font-size: 11px; font-weight: 700;">
                    Avg Resolution: <span class="${parseFloat(avgDuration) <= 7 ? 'text-green' : 'text-red'}">${avgDuration} Days</span> | Open NCRs: <span class="${openCount > 0 ? 'text-red' : 'text-green'}">${openCount}</span>
                </div>
            </div>
            <div class="excel-audit-table-wrap">
                <table class="itemized-data-table kpi4-audit-table">
                    <thead>
                        <tr>
                            <th style="width: 44px; min-width: 44px; text-align: center;">#</th>
                            <th style="width: 110px;">NCR No.</th>
                            <th style="width: 160px;">Project Site</th>
                            <th style="width: 120px;">Discipline</th>
                            <th style="width: 200px;">Issue Summary</th>
                            <th style="width: 130px;">Subcontractor</th>
                            <th style="width: 110px; text-align: center;">Issued</th>
                            <th style="width: 110px; text-align: center;">Closed</th>
                            <th style="width: 85px; text-align: right;">Duration</th>
                            <th style="width: 85px; text-align: center;">Status</th>
                            <th style="width: 75px; text-align: center;">Quarter</th>
                        </tr>
                    </thead>
                    <tbody>${rowsHtml || '<tr><td colspan="11" style="text-align:center; padding: 20px;">No NCR records found for selected timeframe.</td></tr>'}</tbody>
                </table>
            </div>
        `;
        container.appendChild(div);
    }

    // 5. KPI 5 Handover Punch List Audit Table
    if (appState.compiler.kpis.kpi5?.enabled !== false) {
        const div = document.createElement("div");
        div.className = "itemized-kpi-block";
        let rowsHtml = "";
        let critCount = 0, minorCount = 0, closedCount = 0, overdueCount = 0;
        const nowMs = Date.now();
        let totalItems = 0;
        let rowIdx = 1;

        targetProjects.forEach(p => {
            (p.kpi5_logs || []).forEach(l => {
                if (isQuarterInTimeRange(l.quarter, timeRange)) {
                    totalItems++;
                    if (l.cat === "Critical") critCount++;
                    else minorCount++;
                    const isSigned = l.status === "Signed-off" || l.status === "Closed" || l.status === "Rectified";
                    let isOverdue = false;
                    if (isSigned) {
                        closedCount++;
                        if (l.targetDate && l.actualDateRectified && new Date(l.actualDateRectified).getTime() > new Date(l.targetDate).getTime()) {
                            overdueCount++;
                            isOverdue = true;
                        }
                    } else {
                        if (l.targetDate && new Date(l.targetDate).getTime() < nowMs) {
                            overdueCount++;
                            isOverdue = true;
                        }
                    }

                    const formattedTargetDate = formatTableDate(l.targetDate || "");
                    const formattedRectDate = formatTableDate(l.actualDateRectified || "");
                    rowsHtml += `
                        <tr>
                            <td class="col-idx">${rowIdx++}</td>
                            <td><strong>${l.itemNo || 'N/A'}</strong></td>
                            <td>${p.name}</td>
                            <td>${l.discipline || 'N/A'}</td>
                            <td>${l.desc || 'N/A'}</td>
                            <td>${l.loc || 'N/A'}</td>
                            <td class="center-cell"><span class="badge ${l.cat === 'Critical' ? 'badge-fail' : 'badge-pass'}">${l.cat || 'Minor'}</span></td>
                            <td>${l.sub || 'N/A'}</td>
                            <td class="center-cell">${formattedTargetDate || '-'}</td>
                            <td class="center-cell">${formattedRectDate || '-'}</td>
                            <td class="center-cell"><span class="status-badge ${isSigned ? (isOverdue ? 'badge-yellow' : 'badge-green') : (isOverdue ? 'badge-red' : 'badge-yellow')}">${isSigned ? (isOverdue ? 'Rectified (Delayed)' : 'Signed-off') : (isOverdue ? 'Overdue' : (l.status || 'Open'))}</span></td>
                            <td class="center-cell">${l.quarter || 'N/A'}</td>
                        </tr>
                    `;
                }
            });
        });

        const onTimeRate = totalItems > 0 ? Math.max(0, Math.round(((totalItems - overdueCount) / totalItems) * 100)) : 100;

        div.innerHTML = `
            <div class="itemized-kpi-header">
                <div>
                    <h4>📋 KPI 5: Project Handover Punch List & Target Clearance Audit</h4>
                    <p style="font-size: 11px; color: var(--text-secondary); margin: 2px 0 0 0;">Pre-handover snagging and scheduled clearance compliance before turnover.</p>
                </div>
                <div style="font-size: 11px; font-weight: 700;">
                    Target Clearance: <span class="${onTimeRate >= 90 ? 'text-green' : 'text-red'}">${onTimeRate}% On-Time</span> (${totalItems - overdueCount}/${totalItems} On Schedule) | Critical: <span class="${critCount > 0 ? 'text-red' : 'text-green'}">${critCount}</span>
                </div>
            </div>
            <div class="excel-audit-table-wrap">
                <table class="itemized-data-table kpi5-audit-table">
                    <thead>
                        <tr>
                            <th style="width: 44px; min-width: 44px; text-align: center;">#</th>
                            <th style="width: 100px;">Item No.</th>
                            <th style="width: 160px;">Project Site</th>
                            <th style="width: 120px;">Discipline</th>
                            <th style="width: 200px;">Snag Description</th>
                            <th style="width: 120px;">Location / Area</th>
                            <th style="width: 80px; text-align: center;">Severity</th>
                            <th style="width: 130px;">Subcontractor</th>
                            <th style="width: 110px; text-align: center;">Target Date</th>
                            <th style="width: 110px; text-align: center;">Actual Rectified</th>
                            <th style="width: 120px; text-align: center;">Status</th>
                            <th style="width: 75px; text-align: center;">Quarter</th>
                        </tr>
                    </thead>
                    <tbody>${rowsHtml || '<tr><td colspan="12" style="text-align:center; padding: 20px;">No Punch List items found for selected timeframe.</td></tr>'}</tbody>
                </table>
            </div>
        `;
        container.appendChild(div);
    }

    // Initialize interactive column drag-resizers across all tables
    initTableColumnResizers(container);
}

// 📊 COMPILER EXCEL EXPORT ENGINE (SHEETJS WORKBOOK)
function exportCompiledReportToExcel() {
    if (typeof XLSX === "undefined") {
        alert("SheetJS library is loading. Please try again in a moment.");
        return;
    }

    const targetProjects = getCompilerTargetProjects();
    const timeRange = appState.compiler.timeRange || "FY";
    const compMode = appState.compiler.compMode || "pop";
    const baseQ = appState.compiler.baseQuarter || "Q1";
    const targetQ = appState.compiler.targetQuarter || "Q2";
    const dateStr = new Date().toISOString().slice(0, 10);

    const mainStats = calculatePeriodKpiStats(targetProjects, q => isQuarterInTimeRange(q, timeRange));
    const baseStats = calculatePeriodKpiStats(targetProjects, q => q === baseQ);
    const targetStats = calculatePeriodKpiStats(targetProjects, q => q === targetQ);

    const wb = XLSX.utils.book_new();

    // 1. Sheet 1: Executive Summary & Variance Matrix
    const summaryData = [
        ["FCLARANANG DEVELOPMENT CORPORATION - QA/QC EXECUTIVE COMPILER REPORT"],
        ["Generated Date:", new Date().toLocaleString()],
        ["Project Scope:", targetProjects.map(p => p.name).join("; ")],
        ["Timeframe:", timeRange],
        ["Comparison Mode:", compMode === "pop" ? `Period-over-Period (${baseQ} vs ${targetQ})` : (compMode === "all-quarters" ? "All-Quarter Summary" : "Standard")],
        ["Total Contract Budget:", mainStats.totalBudget],
        ["Total Floor Area (sq. m):", mainStats.totalArea],
        ["Overall Compliance Score:", `${mainStats.overallPct}%`],
        [],
        ["--- KEY PERFORMANCE INDICATORS SCORECARD ---"],
        ["KPI Name", "Benchmark Target", "Actual Result", "Status Score", "Action Recommendation"],
        ["KPI 1: First-Time Pass Rate (FTQ)", "≥ 90–95%", `${mainStats.ftq.val.toFixed(1)}%`, mainStats.ftq.status.toUpperCase(), "Sustain pre-inspection checks"],
        ["KPI 2: Quality Rework BOQ Rate", "< 1–2% Approved Cost", `${mainStats.rework.val.toFixed(2)}% (₱${mainStats.rework.totalCost})`, mainStats.rework.status.toUpperCase(), "Control BOQ trade expenditures against item approved cost"],
        ["KPI 3: Defect Density", "< 2.0 per 100m²", `${mainStats.defect.val.toFixed(2)}`, mainStats.defect.status.toUpperCase(), "Enforce Incoming Material Audits"],
        ["KPI 4: NCR Resolution Time", "≤ 5–7 Days", `${mainStats.ncr.val.toFixed(1)} Days`, mainStats.ncr.status.toUpperCase(), "Link NCRs to billing release"],
        ["KPI 5: Handover Punch Target Clearance", "100% On-Time (0 Crit)", `${mainStats.punch.onTimeRate}% On-Time (${mainStats.punch.closed}/${mainStats.punch.total} Cleared, ${mainStats.punch.critical} Crit)`, mainStats.punch.status.toUpperCase(), "Enforce target clearance dates before turnover"],
        [],
        ["--- PERIOD COMPARATIVE VARIANCE MATRIX ---"],
        ["KPI Name", "Benchmark Target", `${baseQ} Baseline`, `${targetQ} Target`, "Absolute Shift (Δ)", "Percentage Shift (Δ%)"],
        ["FTQ Pass Rate (%)", "≥ 90.0%", `${baseStats.ftq.val.toFixed(1)}%`, `${targetStats.ftq.val.toFixed(1)}%`, (targetStats.ftq.val - baseStats.ftq.val).toFixed(2), baseStats.ftq.val !== 0 ? (((targetStats.ftq.val - baseStats.ftq.val) / baseStats.ftq.val) * 100).toFixed(1) + "%" : "0%"],
        ["Rework BOQ Rate (% Approved Cost)", "< 1.00%", `${baseStats.rework.val.toFixed(2)}%`, `${targetStats.rework.val.toFixed(2)}%`, (targetStats.rework.val - baseStats.rework.val).toFixed(2), baseStats.rework.val !== 0 ? (((targetStats.rework.val - baseStats.rework.val) / baseStats.rework.val) * 100).toFixed(1) + "%" : "0%"],
        ["Defect Density", "< 2.00", baseStats.defect.val.toFixed(2), targetStats.defect.val.toFixed(2), (targetStats.defect.val - baseStats.defect.val).toFixed(2), baseStats.defect.val !== 0 ? (((targetStats.defect.val - baseStats.defect.val) / baseStats.defect.val) * 100).toFixed(1) + "%" : "0%"],
        ["NCR Resolution Days", "≤ 5.0 d", `${baseStats.ncr.val.toFixed(1)} d`, `${targetStats.ncr.val.toFixed(1)} d`, (targetStats.ncr.val - baseStats.ncr.val).toFixed(2), baseStats.ncr.val !== 0 ? (((targetStats.ncr.val - baseStats.ncr.val) / baseStats.ncr.val) * 100).toFixed(1) + "%" : "0%"],
        ["Punch Target Clearance (%)", "100% On-Time", `${baseStats.punch.onTimeRate}%`, `${targetStats.punch.onTimeRate}%`, (targetStats.punch.onTimeRate - baseStats.punch.onTimeRate).toFixed(1) + "%", baseStats.punch.onTimeRate !== 0 ? (((targetStats.punch.onTimeRate - baseStats.punch.onTimeRate) / baseStats.punch.onTimeRate) * 100).toFixed(1) + "%" : "0%"]
    ];

    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    wsSummary['!cols'] = [{ wch: 35 }, { wch: 22 }, { wch: 25 }, { wch: 25 }, { wch: 20 }, { wch: 20 }];
    XLSX.utils.book_append_sheet(wb, wsSummary, "Executive_Summary");

    // 2. Sheet 2: Individual Project Performance Matrix
    const matrixData = [
        ["FCLARANANG DEVELOPMENT CORPORATION - INDIVIDUAL PROJECT PERFORMANCE MATRIX"],
        ["Generated Date:", new Date().toLocaleString()],
        ["Selected Timeframe:", timeRange],
        [],
        [
            "Project Name",
            "Project Code",
            "Project Location",
            "Budget (₱)",
            "Gross Floor Area (m²)",
            "Turnover Target Date",
            "1. FTQ Pass Rate (%)",
            "2. Rework Rate (% Approved Cost)",
            "2. Approved Item Cost (₱)",
            "2. Rework Total Cost (₱)",
            "3. Defect Density (/100m²)",
            "4. NCR Resolution Avg (Days)",
            "4. Open NCRs",
            "5. Punch Clearance (% On-Time)",
            "5. Critical Punch Items",
            "5. Overdue Snags",
            "QA/QC Compliance Score (%)",
            "Quality Trajectory",
            "Executive Action Directive"
        ]
    ];

    targetProjects.forEach(proj => {
        const main = calculateIndividualProjectKPIs(proj, q => isQuarterInTimeRange(q, timeRange));
        const base = calculateIndividualProjectKPIs(proj, q => q === baseQ);
        const target = calculateIndividualProjectKPIs(proj, q => q === targetQ);
        const trajectory = determineProjectQualityTrajectory(main, base, target, compMode);
        const rec = generateProjectExecutiveRecommendation(main);

        matrixData.push([
            main.name,
            main.code,
            main.location,
            main.budget,
            main.area,
            main.turnoverDate,
            parseFloat(main.ftq.val.toFixed(1)),
            parseFloat(main.rework.val.toFixed(2)),
            main.rework.approvedCost || 0,
            main.rework.totalCost,
            parseFloat(main.defect.val.toFixed(2)),
            parseFloat(main.ncr.val.toFixed(1)),
            main.ncr.open,
            `${main.punch.onTimeRate}%`,
            main.punch.critical,
            main.punch.overdue || 0,
            `${main.compliancePct}%`,
            `${trajectory.icon} ${trajectory.label}`,
            `${rec.leadTag}: ${rec.actionText.replace(/<[^>]*>?/gm, '')}`
        ]);
    });

    const wsMatrix = XLSX.utils.aoa_to_sheet(matrixData);
    wsMatrix['!cols'] = [
        { wch: 28 }, { wch: 12 }, { wch: 26 }, { wch: 16 }, { wch: 18 },
        { wch: 16 }, { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 20 },
        { wch: 22 }, { wch: 12 }, { wch: 22 }, { wch: 18 }, { wch: 16 },
        { wch: 22 }, { wch: 22 }, { wch: 45 }
    ];
    XLSX.utils.book_append_sheet(wb, wsMatrix, "Project_Matrix");

    // Only export itemized log sheets if includeLogs option is enabled
    if (appState.compiler.includeLogs !== false) {
        // Sheet 3: KPI 1 FTQ Logs
        if (appState.compiler.kpis.kpi1?.enabled !== false) {
            let rows = [["#", "Project", "Discipline", "Test Description", "Design Requirement", "Actual Value", "Quarter", "Result"]];
            let idx = 1;
            targetProjects.forEach(p => {
                (p.kpi1_logs || []).forEach(l => {
                    if (isQuarterInTimeRange(l.quarter, timeRange)) {
                        rows.push([idx++, p.name, l.discipline, l.test, l.req, l.act, l.quarter, l.remarks]);
                    }
                });
            });
            const ws = XLSX.utils.aoa_to_sheet(rows);
            ws['!cols'] = [{ wch: 6 }, { wch: 28 }, { wch: 22 }, { wch: 35 }, { wch: 35 }, { wch: 14 }, { wch: 10 }, { wch: 12 }];
            XLSX.utils.book_append_sheet(wb, ws, "KPI1_FTQ_Testing");
        }

        // Sheet 4: KPI 2 Rework BOQ Logs
        if (appState.compiler.kpis.kpi2?.enabled !== false) {
            let rows = [["#", "Project", "Discipline", "Rework Description", "Date Log", "Approved Item Cost (₱)", "Quantity", "Unit", "Labor (₱)", "Material (₱)", "Subtotal (₱)", "Rework %", "Quarter"]];
            let idx = 1;
            targetProjects.forEach(p => {
                (p.kpi2_logs || []).forEach(l => {
                    if (isQuarterInTimeRange(l.quarter, timeRange)) {
                        const qty = parseFloat(l.qty) || 1;
                        const labor = parseFloat(l.labor) || 0;
                        const mat = parseFloat(l.mat) || 0;
                        const subtotal = (labor + mat) * qty;
                        const apprCost = parseFloat(l.approvedCost) !== undefined && !isNaN(parseFloat(l.approvedCost)) ? parseFloat(l.approvedCost) : 0;
                        const itemReworkPct = apprCost > 0 ? (subtotal / apprCost) * 100 : 0;
                        rows.push([idx++, p.name, l.discipline, l.desc, l.date || "", apprCost, qty, l.unit, labor, mat, subtotal, `${itemReworkPct.toFixed(2)}%`, l.quarter]);
                    }
                });
            });
            const ws = XLSX.utils.aoa_to_sheet(rows);
            ws['!cols'] = [{ wch: 6 }, { wch: 28 }, { wch: 22 }, { wch: 35 }, { wch: 14 }, { wch: 18 }, { wch: 8 }, { wch: 10 }, { wch: 16 }, { wch: 16 }, { wch: 18 }, { wch: 12 }, { wch: 10 }];
            XLSX.utils.book_append_sheet(wb, ws, "KPI2_Rework_BOQ");
        }

        // Sheet 4: KPI 3 Defect Logs
        if (appState.compiler.kpis.kpi3?.enabled !== false) {
            let rows = [["#", "Project", "Discipline", "Defect Description", "Location", "Total Inspected Area (sq.m)", "Number of Defects Found", "Affected Area (m²)", "Quarter", "Status"]];
            let idx = 1;
            targetProjects.forEach(p => {
                (p.kpi3_logs || []).forEach(l => {
                    if (isQuarterInTimeRange(l.quarter, timeRange)) {
                        const inspArea = l.totalInspectedArea !== undefined ? l.totalInspectedArea : (l.totalArea !== undefined ? l.totalArea : 1000);
                        const defFound = l.defectCount !== undefined ? l.defectCount : (l.defects !== undefined ? l.defects : 1);
                        rows.push([idx++, p.name, l.discipline, l.desc, l.loc, parseFloat(inspArea) || 0, parseFloat(defFound) || 0, parseFloat(l.area) || 0, l.quarter, l.status]);
                    }
                });
            });
            const ws = XLSX.utils.aoa_to_sheet(rows);
            ws['!cols'] = [{ wch: 6 }, { wch: 28 }, { wch: 22 }, { wch: 35 }, { wch: 22 }, { wch: 25 }, { wch: 22 }, { wch: 18 }, { wch: 10 }, { wch: 14 }];
            XLSX.utils.book_append_sheet(wb, ws, "KPI3_Defect_Logs");
        }

        // Sheet 5: KPI 4 NCR Tracking
        if (appState.compiler.kpis.kpi4?.enabled !== false) {
            let rows = [["#", "NCR No.", "Project", "Discipline", "Issue Summary", "Subcontractor", "Issued Date", "Closed Date", "Duration (Days)", "Status"]];
            let idx = 1;
            targetProjects.forEach(p => {
                (p.kpi4_logs || []).forEach(l => {
                    if (isQuarterInTimeRange(l.quarter, timeRange)) {
                        rows.push([idx++, l.ncrNo, p.name, l.discipline, l.desc, l.sub, l.dateIssued, l.dateClosed, parseFloat(l.duration) || 0, l.status]);
                    }
                });
            });
            const ws = XLSX.utils.aoa_to_sheet(rows);
            ws['!cols'] = [{ wch: 6 }, { wch: 16 }, { wch: 28 }, { wch: 22 }, { wch: 35 }, { wch: 24 }, { wch: 14 }, { wch: 14 }, { wch: 16 }, { wch: 12 }];
            XLSX.utils.book_append_sheet(wb, ws, "KPI4_NCR_Tracking");
        }

        // Sheet 6: KPI 5 Punch Lists
        if (appState.compiler.kpis.kpi5?.enabled !== false) {
            let rows = [["#", "Item No.", "Date Logged", "Project", "Discipline", "Punch Description", "Location", "Category", "Subcontractor", "Target Date", "Actual Date Rectified", "Quarter", "Status"]];
            let idx = 1;
            targetProjects.forEach(p => {
                (p.kpi5_logs || []).forEach(l => {
                    if (isQuarterInTimeRange(l.quarter, timeRange)) {
                        rows.push([idx++, l.itemNo, l.dateLogged || '', p.name, l.discipline, l.desc, l.loc, l.cat, l.sub, l.targetDate || '', l.actualDateRectified || '', l.quarter || '', l.status || 'Open']);
                    }
                });
            });
            const ws = XLSX.utils.aoa_to_sheet(rows);
            ws['!cols'] = [{ wch: 6 }, { wch: 16 }, { wch: 14 }, { wch: 28 }, { wch: 22 }, { wch: 35 }, { wch: 24 }, { wch: 14 }, { wch: 14 }, { wch: 16 }, { wch: 18 }, { wch: 12 }, { wch: 12 }];
            XLSX.utils.book_append_sheet(wb, ws, "KPI5_Punch_Lists");
        }
    }

    const scopeName = targetProjects.length === 1 ? sanitizeSheetName(targetProjects[0].name) : "PORTFOLIO";
    const fileName = `FCL_Executive_QAQC_Report_${scopeName}_${timeRange}_${dateStr}.xlsx`;
    XLSX.writeFile(wb, fileName);
}

// 🖨️ COMPILER PDF EXPORT / PRINT HANDLER
function exportCompiledReportToPDF() {
    switchTab("tab-executive");
    compileExecutiveReport();
    setTimeout(() => {
        window.print();
    }, 200);
}
if (typeof window !== "undefined") {
    window.exportCompiledReportToPDF = exportCompiledReportToPDF;
}

// 🖼️ HELPER: RASTERIZE VECTOR SVG TO CRISP BASE64 PNG DATA-URL
async function svgToPngBase64(svgEl, scale = 2.5) {
    return new Promise((resolve) => {
        try {
            if (!svgEl) return resolve(null);

            const rect = svgEl.getBoundingClientRect();
            let width = rect.width > 20 ? rect.width : (parseInt(svgEl.getAttribute("width")) || 800);
            let height = rect.height > 20 ? rect.height : (parseInt(svgEl.getAttribute("height")) || 450);

            // Ensure valid aspect ratio
            if (width <= 0) width = 800;
            if (height <= 0) height = 450;

            const clonedSvg = svgEl.cloneNode(true);
            clonedSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            clonedSvg.setAttribute("width", width * scale);
            clonedSvg.setAttribute("height", height * scale);

            // Replace CSS variable calls in SVG with fallback solid hex codes for standalone rendering
            let svgString = new XMLSerializer().serializeToString(clonedSvg);
            svgString = svgString
                .replace(/var\(--text-primary[^)]*\)/g, "#0f172a")
                .replace(/var\(--text-secondary[^)]*\)/g, "#64748b")
                .replace(/var\(--text-muted[^)]*\)/g, "#94a3b8")
                .replace(/var\(--border-color[^)]*\)/g, "#cbd5e1")
                .replace(/var\(--bg-card[^)]*\)/g, "#ffffff");

            const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(svgBlob);

            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = width * scale;
                canvas.height = height * scale;
                const ctx = canvas.getContext("2d");
                // Solid white background for Word doc compatibility
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                URL.revokeObjectURL(url);
                resolve(canvas.toDataURL("image/png"));
            };
            img.onerror = () => {
                URL.revokeObjectURL(url);
                resolve(null);
            };
            img.src = url;
        } catch (err) {
            console.error("Error in svgToPngBase64:", err);
            resolve(null);
        }
    });
}

// 📝 COMPILER MS WORD (.DOC) EXPORT ENGINE WITH EMBEDDED HIGH-RES CHARTS (A4 LANDSCAPE 0.3" MARGIN)
async function exportCompiledReportToWord() {
    const btn = document.getElementById("btnExportWord");
    const originalBtnHtml = btn ? btn.innerHTML : "";
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = "⏳ Converting Charts to Images...";
    }

    try {
        switchTab("tab-executive");
        compileExecutiveReport();

        // Allow DOM to settle so SVGs are rendered with client dimensions
        await new Promise(r => setTimeout(r, 200));

        const docEl = document.getElementById("compiledReportDocument");
        if (!docEl) {
            alert("Please compile the Executive Report preview first.");
            return;
        }

        // 1. Convert all rendered SVGs into high-res PNG Base64 images at 2.5x scale
        const liveSvgs = Array.from(docEl.querySelectorAll("svg"));
        const svgMap = new Map();
        for (let i = 0; i < liveSvgs.length; i++) {
            const svg = liveSvgs[i];
            if (btn) btn.innerHTML = `⏳ Embedding Chart ${i + 1} of ${liveSvgs.length}...`;
            const pngUrl = await svgToPngBase64(svg, 2.5);
            if (pngUrl) svgMap.set(svg, pngUrl);
        }

        // 2. Clone the report DOM and format structure specifically for MS Word Landscape
        const clone = docEl.cloneNode(true);

        // Remove interactive UI dropdowns, buttons, settings bars, and toggles
        clone.querySelectorAll(".compiler-graph-controls-bar, .chart-narrative-toggle-btn, .btn, button, select, input, .toggle-switch").forEach(el => el.remove());

        // Replace SVGs in cloned DOM with converted high-res PNG img tags
        const cloneSvgs = Array.from(clone.querySelectorAll("svg"));
        cloneSvgs.forEach((cloneSvg, idx) => {
            const origSvg = liveSvgs[idx];
            const pngUrl = svgMap.get(origSvg);
            if (pngUrl) {
                const img = document.createElement("img");
                img.src = pngUrl;
                // Sized to fit comfortably on A4 Landscape width with 0.3in margins (~980px printable width)
                img.style.cssText = "width: 100%; max-width: 960px; height: auto; max-height: 310px; display: block; margin: 4px auto;";
                const parent = cloneSvg.parentElement;
                if (parent) {
                    parent.replaceChild(img, cloneSvg);
                }
            }
        });

        // Convert any external/relative images in clone (like FCLDC.ico) to embedded base64 PNGs
        const cloneImgs = Array.from(clone.querySelectorAll("img"));
        for (const imgEl of cloneImgs) {
            if (imgEl.src && !imgEl.src.startsWith("data:")) {
                try {
                    const canvas = document.createElement("canvas");
                    canvas.width = imgEl.naturalWidth || 64;
                    canvas.height = imgEl.naturalHeight || 64;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(imgEl, 0, 0, canvas.width, canvas.height);
                    imgEl.src = canvas.toDataURL("image/png");
                } catch (e) {
                    // Fallback to relative URL
                }
            }
        }

        // Convert .kpi2-metrics-grid to a clean 4-column table for Word
        clone.querySelectorAll(".kpi2-metrics-grid").forEach(grid => {
            const cards = Array.from(grid.querySelectorAll(".kpi2-metric-card"));
            if (cards.length > 0) {
                const table = document.createElement("table");
                table.setAttribute("border", "1");
                table.setAttribute("cellspacing", "0");
                table.setAttribute("cellpadding", "4");
                table.style.cssText = "width: 100%; border-collapse: collapse; margin: 6px 0; border: 1px solid #cbd5e1;";
                const tr = document.createElement("tr");
                cards.forEach(card => {
                    const td = document.createElement("td");
                    td.style.cssText = "background-color: #f8fafc; border: 1px solid #cbd5e1; padding: 4px 8px; vertical-align: top; text-align: left; width: " + (100 / cards.length) + "%;";
                    td.innerHTML = card.innerHTML;
                    tr.appendChild(td);
                });
                table.appendChild(tr);
                grid.parentNode.replaceChild(table, grid);
            }
        });

        // Convert Scope Metadata Grid into Word-formatted table
        const metaGrid = clone.querySelector(".doc-meta-grid");
        if (metaGrid) {
            const items = Array.from(metaGrid.querySelectorAll(".doc-meta-item"));
            const table = document.createElement("table");
            table.setAttribute("border", "0");
            table.setAttribute("cellspacing", "0");
            table.setAttribute("cellpadding", "4");
            table.style.cssText = "width: 100%; border-collapse: collapse; margin-bottom: 10px; border-bottom: 2px solid #1e3a8a;";
            let tr = document.createElement("tr");
            items.forEach((item, i) => {
                if (i > 0 && i % 5 === 0) {
                    table.appendChild(tr);
                    tr = document.createElement("tr");
                }
                const td = document.createElement("td");
                td.style.cssText = "padding: 4px 8px; border: none; font-size: 9pt;";
                td.innerHTML = item.innerHTML;
                tr.appendChild(td);
            });
            if (tr.children.length > 0) table.appendChild(tr);
            metaGrid.parentNode.replaceChild(table, metaGrid);
        }

        // Convert Executive Summary Scorecards Grid into a clean table
        const scorecardsGrid = clone.querySelector(".scorecards-grid");
        if (scorecardsGrid) {
            const cards = Array.from(scorecardsGrid.querySelectorAll(".scorecard"));
            if (cards.length > 0) {
                const table = document.createElement("table");
                table.setAttribute("border", "1");
                table.setAttribute("cellspacing", "0");
                table.setAttribute("cellpadding", "6");
                table.style.cssText = "width: 100%; border-collapse: collapse; margin: 8px 0; border: 1.5px solid #cbd5e1;";
                const tr = document.createElement("tr");
                cards.forEach(card => {
                    const td = document.createElement("td");
                    td.style.cssText = "background-color: #f8fafc; border: 1px solid #cbd5e1; padding: 6px 8px; vertical-align: top; text-align: center;";
                    td.innerHTML = card.innerHTML;
                    tr.appendChild(td);
                });
                table.appendChild(tr);
                scorecardsGrid.parentNode.replaceChild(table, scorecardsGrid);
            }
        }

        // Convert Chart Narrative Bullets to a 3-column table
        clone.querySelectorAll(".chart-narrative-bullets").forEach(bulletsGrid => {
            const bullets = Array.from(bulletsGrid.querySelectorAll(".chart-narrative-bullet-card"));
            if (bullets.length > 0) {
                const table = document.createElement("table");
                table.setAttribute("border", "1");
                table.setAttribute("cellspacing", "0");
                table.setAttribute("cellpadding", "4");
                table.style.cssText = "width: 100%; border-collapse: collapse; margin-top: 4px; border: 1px solid #cbd5e1;";
                const tr = document.createElement("tr");
                bullets.forEach(b => {
                    const td = document.createElement("td");
                    td.style.cssText = "background-color: #ffffff; border: 1px solid #cbd5e1; padding: 4px 6px; vertical-align: top; width: 33.33%;";
                    td.innerHTML = b.innerHTML;
                    tr.appendChild(td);
                });
                table.appendChild(tr);
                bulletsGrid.parentNode.replaceChild(table, bulletsGrid);
            }
        });

        // Ensure all data tables have explicit table border and cell attributes
        clone.querySelectorAll("table").forEach(tbl => {
            tbl.setAttribute("border", "1");
            tbl.setAttribute("cellspacing", "0");
            tbl.setAttribute("cellpadding", "4");
            tbl.style.borderCollapse = "collapse";
            tbl.style.width = "100%";
        });

        // Word CSS Template: A4 Landscape (29.7cm x 21.0cm) with 0.3-inch (21.6pt) margins
        const wordStyles = `
            <style>
                @page WordSection1 {
                    size: 841.9pt 595.3pt; /* A4 Landscape: 29.7cm x 21.0cm */
                    mso-page-orientation: landscape;
                    margin: 21.6pt 21.6pt 21.6pt 21.6pt; /* Exact 0.3 inch margins */
                    mso-header-margin: 14.4pt;
                    mso-footer-margin: 14.4pt;
                    mso-paper-source: 0;
                }
                div.WordSection1 { page: WordSection1; }
                
                body {
                    font-family: Calibri, 'Segoe UI', Arial, sans-serif;
                    font-size: 9.5pt;
                    line-height: 1.3;
                    color: #0f172a;
                    background-color: #ffffff;
                }
                
                h1 { font-size: 16pt; font-weight: 800; color: #0f172a; margin: 0 0 3px 0; }
                h2 { font-size: 13pt; font-weight: 800; color: #1e3a8a; margin: 12px 0 4px 0; }
                h3 { font-size: 11pt; font-weight: 700; color: #0f172a; margin: 8px 0 3px 0; }
                h4 { font-size: 10pt; font-weight: 700; color: #1e293b; margin: 4px 0 2px 0; }
                p { margin: 0 0 4px 0; font-size: 9pt; color: #334155; }
                
                table {
                    border-collapse: collapse !important;
                    width: 100% !important;
                    margin-bottom: 8px !important;
                    font-size: 8.5pt !important;
                    mso-table-lspace: 0pt !important;
                    mso-table-rspace: 0pt !important;
                }
                th {
                    background-color: #1e3a8a !important;
                    color: #ffffff !important;
                    font-weight: 800 !important;
                    border: 1px solid #94a3b8 !important;
                    text-align: left !important;
                    padding: 5px 7px !important;
                }
                td {
                    border: 1px solid #cbd5e1 !important;
                    padding: 4px 7px !important;
                    vertical-align: middle !important;
                    color: #0f172a !important;
                }
                
                /* Page Breaks matching PDF export structure */
                .exec-summary-section {
                    page-break-after: always !important;
                    mso-break-type: section-break !important;
                }
                
                .compiler-chart-card {
                    border: 1.5px solid #cbd5e1 !important;
                    background-color: #ffffff !important;
                    padding: 8px 12px !important;
                    margin-bottom: 0 !important;
                    page-break-inside: avoid !important;
                    page-break-before: always !important;
                    mso-break-type: section-break !important;
                }
                
                .compiler-chart-card:first-child {
                    page-break-before: always !important;
                    mso-break-type: section-break !important;
                }
                
                .compiler-chart-header {
                    border-bottom: 1.5px solid #cbd5e1 !important;
                    padding-bottom: 4px !important;
                    margin-bottom: 4px !important;
                }
                
                .compiler-chart-legend-bar {
                    background-color: #f8fafc !important;
                    border: 1px solid #e2e8f0 !important;
                    font-size: 8pt !important;
                    padding: 2px 6px !important;
                    margin-bottom: 4px !important;
                }
                
                .chart-narrative-container {
                    border: 1px solid #cbd5e1 !important;
                    border-left: 3.5px solid #2563eb !important;
                    background-color: #f8fafc !important;
                    padding: 6px 10px !important;
                    margin-top: 4px !important;
                    margin-bottom: 2px !important;
                    page-break-inside: avoid !important;
                }
                .chart-narrative-title {
                    font-weight: 800 !important;
                    color: #0f172a !important;
                    font-size: 8.5pt !important;
                    margin-bottom: 2px !important;
                }
                .chart-narrative-main-text {
                    font-size: 8pt !important;
                    line-height: 1.25 !important;
                    color: #1e293b !important;
                }
                
                .status-badge, .badge {
                    display: inline-block !important;
                    font-weight: 800 !important;
                    padding: 1.5px 5px !important;
                    border-radius: 3px !important;
                    font-size: 7.5pt !important;
                }
                .badge-green, .badge-pass { background-color: #d1fae5 !important; color: #065f46 !important; }
                .badge-yellow, .badge-warn { background-color: #fef3c7 !important; color: #92400e !important; }
                .badge-red, .badge-fail { background-color: #fee2e2 !important; color: #991b1b !important; }
                .text-center, .center-cell { text-align: center !important; }
                .text-right, .num-cell { text-align: right !important; }
                
                .doc-badge {
                    background-color: #1e3a8a !important;
                    color: #ffffff !important;
                    font-weight: 900 !important;
                    font-size: 15pt !important;
                    padding: 3px 8px !important;
                    display: inline-block !important;
                }
                .doc-badge-img, .logo-badge-img, .act-rep-brand-img {
                    height: 42px !important;
                    width: auto !important;
                    vertical-align: middle !important;
                    display: inline-block !important;
                }
                
                .itemized-kpis-container,
                .governance-container,
                #repGovernanceSection,
                #repDetailedLogsSection {
                    page-break-before: always !important;
                    mso-break-type: section-break !important;
                }
                
                .itemized-kpi-block {
                    margin-bottom: 14px !important;
                    page-break-inside: auto !important;
                }
                .itemized-kpi-header {
                    border-bottom: 1.5px solid #0f172a !important;
                    padding-bottom: 3px !important;
                    margin-bottom: 4px !important;
                }
            </style>
        `;

        const wordHtml = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head>
                <meta charset="utf-8">
                <title>Corporate QA/QC Executive Management Scorecard</title>
                <!--[if gte mso 9]>
                <xml>
                    <w:WordDocument>
                        <w:View>Print</w:View>
                        <w:Zoom>100</w:Zoom>
                        <w:DoNotOptimizeForBrowser/>
                    </w:WordDocument>
                </xml>
                <![endif]-->
                ${wordStyles}
            </head>
            <body>
                <div class="WordSection1">
                    ${clone.innerHTML}
                </div>
            </body>
            </html>
        `;

        const targetProjects = getCompilerTargetProjects();
        const timeRange = appState.compiler?.timeRange || "FY";
        const dateStr = new Date().toISOString().slice(0, 10);
        const scopeName = targetProjects.length === 1 ? sanitizeSheetName(targetProjects[0].name) : "PORTFOLIO";
        const fileName = `FCL_Executive_QAQC_Report_${scopeName}_${timeRange}_${dateStr}.doc`;

        const blob = new Blob(['\ufeff' + wordHtml], { type: 'application/msword;charset=utf-8' });
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);

    } catch (err) {
        console.error("Error exporting to Word:", err);
        alert("Failed to export Word document: " + err.message);
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = originalBtnHtml || "📝 Export Word (.doc)";
        }
    }
}
if (typeof window !== "undefined") {
    window.exportCompiledReportToWord = exportCompiledReportToWord;
}


// JSON & EXCEL IMPORT / EXPORT MANAGER (I/E FILES)
function executeIEAction(action) {
    if (!action) return;
    if (action === "export-all-projects-excel") {
        exportAllProjectsToFormattedExcel();
    } else if (action === "import-new-project") {
        triggerImportExcelNewProject();
    } else if (action === "export-all-excel") {
        exportActiveProjectToFormattedExcel();
    } else if (action === "export-json") {
        exportDataJSON();
    } else if (action === "import-json") {
        triggerImportJSON();
    } else if (action === "export-excel") {
        const kpi = prompt("Enter KPI number to export (1 for FTQ, 2 for BOQ, 3 for Defects, 4 for NCR, 5 for Punch List):", "1");
        if (kpi && ["1","2","3","4","5"].includes(kpi.trim())) {
            exportTableToCSV(`kpi${kpi.trim()}`);
        }
    } else if (action === "download-vba-module") {
        downloadVBAModule();
    } else if (action === "import-excel") {
        triggerImportExcelCSV();
    }
    const select = document.getElementById("ieActionSelect");
    if (select) select.value = "";
}

function sanitizeSheetName(name) {
    if (!name) return "Sheet";
    let clean = String(name)
        .replace(/&/g, "and")
        .replace(/[:\\/?*\[\]"']/g, "")
        .trim();
    return clean.slice(0, 31) || "Sheet";
}

function exportAllProjectsToFormattedExcel() {
    exportAllToFormattedExcel(true);
}

function exportActiveProjectToFormattedExcel() {
    exportAllToFormattedExcel(false);
}

function exportAllToFormattedExcel(exportAllProjects = true) {
    // Ensure all default projects are populated in appState.projects before export
    if (typeof DEFAULT_PROJECTS === "object" && DEFAULT_PROJECTS) {
        Object.keys(DEFAULT_PROJECTS).forEach(pId => {
            if (!appState.projects[pId]) {
                appState.projects[pId] = JSON.parse(JSON.stringify(DEFAULT_PROJECTS[pId]));
            }
        });
    }

    let projects = [];
    if (exportAllProjects) {
        projects = Object.values(appState.projects || {});
    } else {
        const activeP = appState.projects[appState.activeProjectId];
        if (activeP) projects = [activeP];
        else projects = Object.values(appState.projects || {});
    }

    if (projects.length === 0) {
        alert("No project data available to export.");
        return;
    }

    const dateStr = new Date().toISOString().slice(0, 10);

    // --- ENGINE 1: NATIVE BINARY EXCEL (.XLSX) VIA SHEETJS ---
    if (typeof XLSX !== "undefined") {
        const wb = XLSX.utils.book_new();

        // 1. Append a Worksheet Tab for EACH Construction Project
        projects.forEach((p, idx) => {
            const sheetName = sanitizeSheetName(p.name || `Project ${idx + 1}`);
            const rows = [];

            // Project Banner & Baseline Information
            rows.push([`🏗️ PROJECT WORKSHEET ${idx + 1}: ${String(p.name || '').toUpperCase()} (Code: ${p.code || 'N/A'})`]);
            rows.push(["📌 Project Baseline Information"]);
            rows.push(["Project Name:", p.name || "", "", "", "", "Project Code:", p.code || "N/A"]);
            rows.push(["Location:", p.location || "N/A", "", "", "", "Phase:", p.phase || "Construction"]);
            rows.push(["Total Budget (₱):", parseFloat(p.budget) || 0, "", "", "", "Floor Area (m²):", parseFloat(p.area) || 0]);
            rows.push(["Target Handover:", p.targetCompletion || "N/A", "", "", "", "Date of Turnover:", p.turnoverDate || p.targetCompletion || "N/A"]);
            rows.push(["Subcontractors:", p.subcontractors || "N/A"]);
            rows.push([]);

            // KPI 1 Testing Log
            rows.push(["🧪 KPI 1: Testing & Inspection Log (First-Time Pass Rate)"]);
            rows.push(["#", "Engineering Discipline", "Sub-Discipline", "Description of Test", "Design Requirement Specification", "Actual Result", "Date Conducted", "Date Result", "Quarter", "Remarks"]);
            (p.kpi1_logs || []).forEach((r, i) => {
                rows.push([i + 1, r.discipline || "", r.subDiscipline || "", r.test || "", r.req || "", r.act || 0, r.dateCond || "", r.dateRes || "", r.quarter || "", r.remarks || "Pass"]);
            });
            rows.push([]);

            // KPI 2 Quality Rework BOQ Breakdown
            rows.push(["🔨 KPI 2: Quality Rework BOQ Breakdown (Cost Evaluation)"]);
            rows.push(["#", "Engineering Discipline", "Sub-Discipline", "Rework Description", "Qty", "Unit", "Labor Cost (₱)", "Labor Total (₱)", "Material Cost (₱)", "Material Total (₱)", "Grand Total (₱)", "Quarter"]);
            let pReworkTotal = 0;
            (p.kpi2_logs || []).forEach((r, i) => {
                const qty = parseFloat(r.qty) || 1;
                const labor = parseFloat(r.labor) || 0;
                const mat = parseFloat(r.mat) || 0;
                const laborTotal = qty * labor;
                const matTotal = qty * mat;
                const grandTotal = laborTotal + matTotal;
                pReworkTotal += grandTotal;
                rows.push([i + 1, r.discipline || "", r.subDiscipline || "", r.desc || "", qty, r.unit || "lot", labor, laborTotal, mat, matTotal, grandTotal, r.quarter || "Q1"]);

                if (r.breakdown && r.breakdown.length > 0) {
                    r.breakdown.forEach(b => {
                        const isChild = b.type === "child";
                        const bQty = parseFloat(b.qty) || 0;
                        const bLabor = parseFloat(b.labor) || 0;
                        const bMat = parseFloat(b.mat) || 0;
                        const bLaborTotal = bQty * bLabor;
                        const bMatTotal = bQty * bMat;
                        const bSubtotal = bLaborTotal + bMatTotal;
                        if (!isChild) {
                            rows.push(["↳", `📌 ${b.desc || ''}`]);
                        } else {
                            rows.push(["", "", "", `    └─ ${b.desc || ''}`, bQty, b.unit || '', bLabor, bLaborTotal, bMat, bMatTotal, bSubtotal]);
                        }
                    });
                }
            });
            rows.push(["", "KPI 2 TOTAL REWORK COST", "", "", "", "", "", "", "", "", pReworkTotal]);
            rows.push([]);

            // KPI 3 Defect Log
            rows.push(["📐 KPI 3: Defect Density & Affected Area Log"]);
            rows.push(["#", "Engineering Discipline", "Sub-Discipline", "Defect Description", "Location", "Affected Area (m²)", "Date Reported", "Quarter", "Severity"]);
            (p.kpi3_logs || []).forEach((r, i) => {
                rows.push([i + 1, r.discipline || "", r.subDiscipline || "", r.desc || "", r.loc || "", parseFloat(r.area) || 0, r.date || "", r.quarter || "", r.severity || "Minor"]);
            });
            rows.push([]);

            // KPI 4 NCR Log
            rows.push(["⏱️ KPI 4: Non-Conformance Report (NCR) Tracking"]);
            rows.push(["#", "NCR #", "Engineering Discipline", "Sub-Discipline", "Issue Description", "Subcontractor", "Date Issued", "Date Closed", "Duration (Days)", "Quarter", "Status"]);
            (p.kpi4_logs || []).forEach((r, i) => {
                rows.push([i + 1, r.ncrNo || "", r.discipline || "", r.subDiscipline || "", r.desc || "", r.sub || "", r.dateIssued || "", r.dateClosed || "", parseFloat(r.duration) || 0, r.quarter || "", r.status || "Open"]);
            });
            rows.push([]);

            // KPI 5 Punch List Log
            rows.push(["📋 KPI 5: Handover Punch List Log"]);
            rows.push(["#", "Item #", "Date Logged", "Engineering Discipline", "Sub-Discipline", "Punch Description", "Location", "Category", "Subcontractor", "Target Date", "Actual Date Rectified", "Quarter", "Status"]);
            (p.kpi5_logs || []).forEach((r, i) => {
                rows.push([i + 1, r.itemNo || "", r.dateLogged || "", r.discipline || "", r.subDiscipline || "", r.desc || "", r.loc || "", r.cat || "", r.sub || "", r.targetDate || "", r.actualDateRectified || "", r.quarter || "", r.status || "Open"]);
            });

            const ws = XLSX.utils.aoa_to_sheet(rows);
            ws['!cols'] = [
                { wch: 6 }, { wch: 22 }, { wch: 22 }, { wch: 38 }, { wch: 18 },
                { wch: 15 }, { wch: 16 }, { wch: 16 }, { wch: 16 }, { wch: 16 },
                { wch: 18 }, { wch: 10 }, { wch: 12 }
            ];
            XLSX.utils.book_append_sheet(wb, ws, sheetName);
        });

        // 2. Append Master Standards & Specs Worksheet Tab
        const specsRows = [
            ["📜 MASTER STANDARDS & SPECIFICATIONS LIBRARY"],
            ["1. Quality Conformance Standards & Specifications (KPI 1 Specs)"],
            ["#", "Engineering Discipline", "Sub-Discipline", "Description of Test", "Design Requirement Specification", "Design Value", "Standard Code"]
        ];
        const kpi1SpecsCount = (appState.specs.kpi1_standards || []).length;
        (appState.specs.kpi1_standards || []).forEach((row, i) => {
            specsRows.push([i + 1, row.discipline || "", row.subDiscipline || "", row.test || "", row.designReq || "", row.designValue !== undefined ? row.designValue : 0, row.code || ""]);
        });
        specsRows.push([]);
        specsRows.push(["2. Master Defect & Non-Conformance Specifications (KPI 3 Specs)"]);
        specsRows.push(["#", "Engineering Discipline", "Sub-Discipline", "Defect Description Specification"]);
        (appState.specs.kpi3_defects || []).forEach((row, i) => {
            specsRows.push([i + 1, row.discipline || "", row.subDiscipline || "", row.defectDesc || ""]);
        });

        const specsWs = XLSX.utils.aoa_to_sheet(specsRows);
        specsWs['!cols'] = [
            { wch: 6 }, { wch: 24 }, { wch: 24 }, { wch: 42 }, { wch: 35 }, { wch: 15 }, { wch: 22 }
        ];
        if (kpi1SpecsCount > 0) {
            specsWs['!autofilter'] = { ref: `A3:G${3 + kpi1SpecsCount}` };
        }
        XLSX.utils.book_append_sheet(wb, specsWs, "Master Standards and Specs");

        // 3. Append VBA Macros & Automation Instruction Tab
        const vbaTabRows = [
            ["🛠️ FCLaranang QA/QC EXECUTIVE VBA MACRO SUITE"],
            ["Instructions: Press Alt + F11 in Excel -> Click File -> Import File -> Select FCL_QAQC_Macro_Suite.bas"],
            [],
            ["MACRO 1: Auto-Fit All Worksheets & Columns"],
            ["Sub AutoFitAllWorksheets()"],
            ["    Dim ws As Worksheet"],
            ["    For Each ws In ThisWorkbook.Worksheets"],
            ["        ws.Columns.AutoFit: ws.Rows.AutoFit"],
            ["    Next ws"],
            ["    MsgBox \"All columns & rows auto-fitted!\", vbInformation, \"FCL QA/QC\""],
            ["End Sub"],
            [],
            ["MACRO 2: Filter All Worksheets By Engineering Discipline"],
            ["Sub FilterByDiscipline()"],
            ["    Dim disc As String"],
            ["    disc = InputBox(\"Enter Discipline to Filter (e.g. Structural, Architectural, Electrical, Mechanical):\")"],
            ["    If Trim(disc) = \"\" Then Exit Sub"],
            ["    Dim ws As Worksheet"],
            ["    For Each ws In ThisWorkbook.Worksheets"],
            ["        On Error Resume Next"],
            ["        If ws.AutoFilterMode Then ws.ShowAllData"],
            ["        ws.Range(\"A10:L100\").AutoFilter Field:=2, Criteria1:=\"*\" & disc & \"*\""],
            ["    Next ws"],
            ["End Sub"],
            [],
            ["MACRO 3: Export Active Project Sheet to PDF Report"],
            ["Sub ExportActiveSheetToPDF()"],
            ["    Dim ws As Worksheet: Set ws = ActiveSheet"],
            ["    ws.ExportAsFixedFormat Type:=xlTypePDF, Filename:=ws.Name & \".pdf\", OpenAfterPublish:=True"],
            ["End Sub"]
        ];
        const vbaWs = XLSX.utils.aoa_to_sheet(vbaTabRows);
        vbaWs['!cols'] = [{ wch: 85 }];
        XLSX.utils.book_append_sheet(wb, vbaWs, "VBA Macros and Automation");

        const fileName = exportAllProjects ? `FCL_QAQC_ALL_PROJECTS_PORTFOLIO_${dateStr}.xlsx` : `FCL_QAQC_${sanitizeSheetName(projects[0]?.name || 'PROJECT')}_${dateStr}.xlsx`;
        XLSX.writeFile(wb, fileName);
        return;
    }

    // --- ENGINE 2: MHTML MIME FALLBACK ENGINE ---
    const escapeHtml = (str) => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const boundary = "----=_NextPart_FCL_QAQC_" + Date.now();

    let excelSheetsManifest = "";
    projects.forEach((p, idx) => {
        const sName = sanitizeSheetName(p.name || `Project ${idx + 1}`);
        excelSheetsManifest += `   <x:ExcelWorksheet>\n    <x:Name>${escapeHtml(sName)}</x:Name>\n    <x:WorksheetSource HRef="sheet_${idx}.htm"/>\n   </x:ExcelWorksheet>\n`;
    });
    excelSheetsManifest += `   <x:ExcelWorksheet>\n    <x:Name>Master Standards and Specs</x:Name>\n    <x:WorksheetSource HRef="sheet_specs.htm"/>\n   </x:ExcelWorksheet>\n`;

    let mhtml = `MIME-Version: 1.0
Content-Type: multipart/related; boundary="${boundary}"

--${boundary}
Content-Location: file:///C:/workbook.htm
Content-Type: text/html; charset="utf-8"

<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="ProgId" content="Excel.Sheet">
<!--[if gte mso 9]><xml>
 <x:ExcelWorkbook>
  <x:ExcelWorksheets>
${excelSheetsManifest}  </x:ExcelWorksheets>
  <x:ProtectStructure>False</x:ProtectStructure>
  <x:ProtectWindows>False</x:ProtectWindows>
 </x:ExcelWorkbook>
</xml><![endif]-->
</head>
<body></body>
</html>
`;

    const commonCss = `
  table { border-collapse: collapse; table-layout: fixed; width: 100%; font-family: Calibri, sans-serif; font-size: 10pt; }
  th { background-color: #cbd5e1; color: #0f172a; font-weight: bold; border: 1px solid #94a3b8; text-align: center; vertical-align: middle; padding: 6px 8px; white-space: normal; word-wrap: break-word; }
  td { border: 1px solid #e2e8f0; vertical-align: middle; padding: 5px 8px; white-space: normal; word-wrap: break-word; color: #0f172a; }
  .banner-hdr { background-color: #0f172a; color: #ffffff; font-weight: bold; font-size: 13pt; text-align: left; padding: 8px 12px; }
  .sec-hdr { background-color: #1e3a8a; color: #ffffff; font-weight: bold; font-size: 11pt; text-align: left; padding: 6px 10px; }
  .total-row { background-color: #eff6ff; color: #1e40af; font-weight: bold; border-top: 2px solid #2563eb; border-bottom: 2px solid #2563eb; }
  .badge-pass { background-color: #d1fae5; color: #065f46; font-weight: bold; text-align: center; }
  .badge-fail { background-color: #fee2e2; color: #991b1b; font-weight: bold; text-align: center; }
  .badge-warn { background-color: #fef3c7; color: #92400e; font-weight: bold; text-align: center; }
  .text-center { text-align: center; }
  .num { mso-number-format: "#,##0.00"; text-align: right; }
  .currency { mso-number-format: "\"\₱\"#,##0.00"; text-align: right; }
  .currency-bold { mso-number-format: "\"\₱\"#,##0.00"; font-weight: bold; color: #1e40af; text-align: right; }
  .breakdown-parent { background-color: #dbeafe; color: #1d4ed8; font-weight: bold; }
  .breakdown-child { background-color: #f8fafc; color: #334155; font-size: 9pt; }
`;

    projects.forEach((p, pIdx) => {
        const kpi1Logs = p.kpi1_logs || [];
        const kpi2Logs = p.kpi2_logs || [];
        const kpi3Logs = p.kpi3_logs || [];
        const kpi4Logs = p.kpi4_logs || [];
        const kpi5Logs = p.kpi5_logs || [];

        mhtml += `\n--${boundary}\nContent-Location: file:///C:/sheet_${pIdx}.htm\nContent-Type: text/html; charset="utf-8"\n\n`;
        mhtml += `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">\n<head>\n<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n<style>${commonCss}</style>\n</head>\n<body>\n<table>\n`;
        mhtml += ` <colgroup>
           <col style="width: 40px;">
           <col style="width: 140px;">
           <col style="width: 140px;">
           <col style="width: 250px;">
           <col style="width: 150px;">
           <col style="width: 110px;">
           <col style="width: 110px;">
           <col style="width: 110px;">
           <col style="width: 110px;">
           <col style="width: 110px;">
           <col style="width: 120px;">
           <col style="width: 70px;">
         </colgroup>\n`;

        mhtml += ` <tr><td colspan="12" class="banner-hdr">🏗️ PROJECT WORKSHEET ${pIdx + 1}: ${escapeHtml(p.name).toUpperCase()} (Code: ${escapeHtml(p.code || 'N/A')})</td></tr>\n`;
        mhtml += ` <tr><td colspan="12" class="sec-hdr">📌 Project Baseline Information</td></tr>\n`;
        mhtml += ` <tr><th>Project Name</th><td colspan="5">${escapeHtml(p.name)}</td><th>Project Code</th><td colspan="5" class="text-center">${escapeHtml(p.code || 'N/A')}</td></tr>\n`;
        mhtml += ` <tr><th>Location</th><td colspan="5">${escapeHtml(p.location || 'N/A')}</td><th>Phase</th><td colspan="5" class="text-center">${escapeHtml(p.phase || 'Construction')}</td></tr>\n`;
        mhtml += ` <tr><th>Total Budget (₱)</th><td colspan="5" class="currency">${parseFloat(p.budget) || 0}</td><th>Floor Area (m²)</th><td colspan="5" class="num">${parseFloat(p.area) || 0}</td></tr>\n`;
        mhtml += ` <tr><th>Target Handover</th><td colspan="5" class="text-center">${escapeHtml(p.targetCompletion || 'N/A')}</td><th>Subcontractors</th><td colspan="5">${escapeHtml(p.subcontractors || 'N/A')}</td></tr>\n`;
        mhtml += ` <tr><td colspan="12" style="border:none; height:15px;"></td></tr>\n`;

        mhtml += ` <tr><td colspan="10" class="sec-hdr">🧪 KPI 1: Testing &amp; Inspection Log (First-Time Pass Rate)</td></tr>\n`;
        mhtml += ` <tr>
          <th>#</th><th>Engineering Discipline</th><th>Sub-Discipline</th><th>Description of Test</th>
          <th>Design Requirement Specification</th><th>Actual Result</th><th>Date Conducted</th>
          <th>Date Result</th><th>Quarter</th><th>Remarks</th>
        </tr>\n`;
        kpi1Logs.forEach((r, i) => {
            const isPass = r.remarks === "Pass";
            mhtml += ` <tr>
              <td class="text-center">${i + 1}</td>
              <td>${escapeHtml(r.discipline)}</td>
              <td>${escapeHtml(r.subDiscipline)}</td>
              <td>${escapeHtml(r.test)}</td>
              <td>${escapeHtml(r.req)}</td>
              <td class="text-center">${r.act || 0}</td>
              <td class="text-center">${escapeHtml(r.dateCond)}</td>
              <td class="text-center">${escapeHtml(r.dateRes)}</td>
              <td class="text-center">${escapeHtml(r.quarter)}</td>
              <td class="${isPass ? 'badge-pass' : 'badge-fail'}">${escapeHtml(r.remarks || 'Pass')}</td>
            </tr>\n`;
        });
        mhtml += ` <tr><td colspan="10" style="border:none; height:15px;"></td></tr>\n`;

        mhtml += ` <tr><td colspan="12" class="sec-hdr">🔨 KPI 2: Quality Rework BOQ Breakdown (Cost Evaluation)</td></tr>\n`;
        mhtml += ` <tr>
          <th>#</th><th>Engineering Discipline</th><th>Sub-Discipline</th><th>Rework Description</th>
          <th>Qty</th><th>Unit</th><th>Labor Cost (₱)</th><th>Labor Total (₱)</th>
          <th>Material Cost (₱)</th><th>Material Total (₱)</th><th>Grand Total (₱)</th><th>Quarter</th>
        </tr>\n`;
        let pReworkTotal = 0;
        kpi2Logs.forEach((r, i) => {
            const qty = parseFloat(r.qty) || 1;
            const labor = parseFloat(r.labor) || 0;
            const mat = parseFloat(r.mat) || 0;
            const laborTotal = qty * labor;
            const matTotal = qty * mat;
            const grandTotal = laborTotal + matTotal;
            pReworkTotal += grandTotal;
            mhtml += ` <tr>
              <td class="text-center">${i + 1}</td>
              <td>${escapeHtml(r.discipline)}</td>
              <td>${escapeHtml(r.subDiscipline)}</td>
              <td><strong>${escapeHtml(r.desc)}</strong></td>
              <td class="text-center">${qty}</td>
              <td class="text-center">${escapeHtml(r.unit)}</td>
              <td class="currency">${labor}</td>
              <td class="currency">${laborTotal}</td>
              <td class="currency">${mat}</td>
              <td class="currency">${matTotal}</td>
              <td class="currency-bold">${grandTotal}</td>
              <td class="text-center">${escapeHtml(r.quarter)}</td>
            </tr>\n`;
            if (r.breakdown && r.breakdown.length > 0) {
                r.breakdown.forEach(b => {
                    const isChild = b.type === "child";
                    const bQty = parseFloat(b.qty) || 0;
                    const bLabor = parseFloat(b.labor) || 0;
                    const bMat = parseFloat(b.mat) || 0;
                    const bLaborTotal = bQty * bLabor;
                    const bMatTotal = bQty * bMat;
                    const bSubtotal = bLaborTotal + bMatTotal;
                    if (!isChild) {
                        mhtml += ` <tr class="breakdown-parent">
                          <td class="text-center">↳</td>
                          <td colspan="10">📌 ${escapeHtml(b.desc)}</td>
                          <td></td>
                        </tr>\n`;
                    } else {
                        mhtml += ` <tr class="breakdown-child">
                          <td></td><td></td><td></td>
                          <td>&nbsp;&nbsp;&nbsp;&nbsp;└─ ${escapeHtml(b.desc)}</td>
                          <td class="text-center">${bQty}</td>
                          <td class="text-center">${escapeHtml(b.unit)}</td>
                          <td class="currency">${bLabor}</td>
                          <td class="currency">${bLaborTotal}</td>
                          <td class="currency">${bMat}</td>
                          <td class="currency">${bMatTotal}</td>
                          <td class="currency-bold">${bSubtotal}</td>
                          <td></td>
                        </tr>\n`;
                    }
                });
            }
        });
        mhtml += ` <tr class="total-row"><td colspan="10" class="text-center">KPI 2 TOTAL REWORK COST</td><td class="currency-bold">${pReworkTotal}</td><td></td></tr>\n`;
        mhtml += ` <tr><td colspan="12" style="border:none; height:15px;"></td></tr>\n`;

        mhtml += ` <tr><td colspan="9" class="sec-hdr">📐 KPI 3: Defect Density &amp; Affected Area Log</td></tr>\n`;
        mhtml += ` <tr>
          <th>#</th><th>Engineering Discipline</th><th>Sub-Discipline</th><th>Defect Description</th>
          <th>Location</th><th>Affected Area (m²)</th><th>Date Reported</th><th>Quarter</th><th>Severity</th>
        </tr>\n`;
        kpi3Logs.forEach((r, i) => {
            mhtml += ` <tr>
              <td class="text-center">${i + 1}</td>
              <td>${escapeHtml(r.discipline)}</td>
              <td>${escapeHtml(r.subDiscipline)}</td>
              <td>${escapeHtml(r.desc)}</td>
              <td>${escapeHtml(r.loc)}</td>
              <td class="num">${parseFloat(r.area) || 0}</td>
              <td class="text-center">${escapeHtml(r.date)}</td>
              <td class="text-center">${escapeHtml(r.quarter)}</td>
              <td class="${r.severity === 'Major' ? 'badge-fail' : (r.severity === 'Moderate' ? 'badge-warn' : 'badge-pass')}">${escapeHtml(r.severity)}</td>
            </tr>\n`;
        });
        mhtml += ` <tr><td colspan="9" style="border:none; height:15px;"></td></tr>\n`;

        mhtml += ` <tr><td colspan="11" class="sec-hdr">⏱️ KPI 4: Non-Conformance Report (NCR) Tracking</td></tr>\n`;
        mhtml += ` <tr>
          <th>#</th><th>NCR #</th><th>Engineering Discipline</th><th>Sub-Discipline</th><th>Issue Description</th>
          <th>Subcontractor</th><th>Date Issued</th><th>Date Closed</th><th>Duration (Days)</th><th>Quarter</th><th>Status</th>
        </tr>\n`;
        kpi4Logs.forEach((r, i) => {
            const isClosed = r.status === "Closed" || r.status === "Resolved";
            mhtml += ` <tr>
              <td class="text-center">${i + 1}</td>
              <td class="text-center">${escapeHtml(r.ncrNo)}</td>
              <td>${escapeHtml(r.discipline)}</td>
              <td>${escapeHtml(r.subDiscipline)}</td>
              <td>${escapeHtml(r.desc)}</td>
              <td>${escapeHtml(r.sub)}</td>
              <td class="text-center">${escapeHtml(r.dateIssued)}</td>
              <td class="text-center">${escapeHtml(r.dateClosed)}</td>
              <td class="text-center">${parseFloat(r.duration) || 0}</td>
              <td class="text-center">${escapeHtml(r.quarter)}</td>
              <td class="${isClosed ? 'badge-pass' : 'badge-fail'}">${escapeHtml(r.status)}</td>
            </tr>\n`;
        });
        mhtml += ` <tr><td colspan="11" style="border:none; height:15px;"></td></tr>\n`;

        mhtml += ` <tr><td colspan="12" class="sec-hdr">📋 KPI 5: Handover Punch List Log</td></tr>\n`;
        mhtml += ` <tr>
          <th>#</th><th>Item #</th><th>Engineering Discipline</th><th>Sub-Discipline</th><th>Punch Description</th>
          <th>Location</th><th>Category</th><th>Subcontractor</th><th>Target Date</th><th>Actual Date Rectified</th><th>Quarter</th><th>Status</th>
        </tr>\n`;
        kpi5Logs.forEach((r, i) => {
            mhtml += ` <tr>
              <td class="text-center">${i + 1}</td>
              <td class="text-center">${escapeHtml(r.itemNo)}</td>
              <td>${escapeHtml(r.discipline)}</td>
              <td>${escapeHtml(r.subDiscipline)}</td>
              <td>${escapeHtml(r.desc)}</td>
              <td>${escapeHtml(r.loc)}</td>
              <td class="${r.cat === 'Critical' ? 'badge-fail' : 'badge-warn'}">${escapeHtml(r.cat)}</td>
              <td>${escapeHtml(r.sub)}</td>
              <td class="text-center">${escapeHtml(r.targetDate)}</td>
              <td class="text-center">${escapeHtml(r.actualDateRectified || '')}</td>
              <td class="text-center">${escapeHtml(r.quarter)}</td>
              <td class="${r.status === 'Signed-off' || r.status === 'Closed' || r.status === 'Rectified' ? 'badge-pass' : 'badge-warn'}">${escapeHtml(r.status)}</td>
            </tr>\n`;
        });
        mhtml += `</table>\n</body>\n</html>\n`;
    });

    mhtml += `\n--${boundary}\nContent-Location: file:///C:/sheet_specs.htm\nContent-Type: text/html; charset="utf-8"\n\n`;
    mhtml += `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">\n<head>\n<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n<style>${commonCss}</style>\n</head>\n<body>\n<table>\n`;
    mhtml += ` <colgroup>
       <col style="width: 40px;">
       <col style="width: 140px;">
       <col style="width: 140px;">
       <col style="width: 250px;">
       <col style="width: 220px;">
       <col style="width: 90px;">
       <col style="width: 120px;">
     </colgroup>\n`;
    mhtml += ` <tr><td colspan="7" class="banner-hdr">📜 MASTER STANDARDS &amp; SPECIFICATIONS LIBRARY</td></tr>\n`;
    mhtml += ` <tr><td colspan="7" class="sec-hdr">1. Quality Conformance Standards &amp; Specifications (KPI 1 Specs)</td></tr>\n`;
    mhtml += ` <tr>
      <th>#</th><th>Engineering Discipline</th><th>Sub-Discipline</th><th>Description of Test</th>
      <th>Design Requirement Specification</th><th>Design Value</th><th>Standard Code</th>
    </tr>\n`;
    (appState.specs.kpi1_standards || []).forEach((row, i) => {
        mhtml += ` <tr>
          <td class="text-center">${i + 1}</td>
          <td>${escapeHtml(row.discipline)}</td>
          <td>${escapeHtml(row.subDiscipline)}</td>
          <td>${escapeHtml(row.test)}</td>
          <td>${escapeHtml(row.designReq)}</td>
          <td class="num">${row.designValue !== undefined ? row.designValue : 0}</td>
          <td class="text-center">${escapeHtml(row.code)}</td>
        </tr>\n`;
    });
    mhtml += ` <tr><td colspan="7" style="border:none; height:15px;"></td></tr>\n`;
    mhtml += ` <tr><td colspan="7" class="sec-hdr">2. Master Defect &amp; Non-Conformance Specifications (KPI 3 Specs)</td></tr>\n`;
    mhtml += ` <tr>
      <th>#</th><th>Engineering Discipline</th><th>Sub-Discipline</th><th colspan="4">Defect Description Specification</th>
    </tr>\n`;
    (appState.specs.kpi3_defects || []).forEach((row, i) => {
        mhtml += ` <tr>
          <td class="text-center">${i + 1}</td>
          <td>${escapeHtml(row.discipline)}</td>
          <td>${escapeHtml(row.subDiscipline)}</td>
          <td colspan="4">${escapeHtml(row.defectDesc)}</td>
        </tr>\n`;
    });
    mhtml += `</table>\n</body>\n</html>\n`;
    mhtml += `\n--${boundary}--\n`;

    const blob = new Blob([mhtml], { type: "message/rfc822" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    const fileName = exportAllProjects ? `FCL_QAQC_ALL_PROJECTS_PORTFOLIO_${dateStr}.xls` : `FCL_QAQC_${sanitizeSheetName(projects[0]?.name || 'PROJECT')}_${dateStr}.xls`;
    a.setAttribute("download", fileName);
    document.body.appendChild(a);
    a.click();
    a.remove();
}

function triggerImportExcelNewProject() {
    const input = document.getElementById("importExcelNewProjectFileInput");
    if (input) input.click();
}

function importExcelAsNewProject(event) {
    const file = event.target.files[0];
    if (!file) return;

    const fileBasename = file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
    const projName = prompt("Enter Name for the New Project:", fileBasename);
    if (!projName || !projName.trim()) return;

    const newId = "proj_" + Date.now();
    const newProj = {
        id: newId,
        name: projName.trim(),
        code: "FCL-2026-P" + (Object.keys(appState.projects).length + 1),
        location: "Project Site Location",
        budget: 100000000,
        area: 10000,
        subcontractors: "Imported Trade Subcontractors",
        phase: "Active Construction Phase",
        targetCompletion: "",
        turnoverDate: "",
        kpi1_logs: [], kpi2_logs: [], kpi3_logs: [], kpi4_logs: [], kpi5_logs: []
    };

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const text = e.target.result;
            if (file.name.endsWith(".json")) {
                const parsed = JSON.parse(text);
                if (parsed.kpi1_logs) newProj.kpi1_logs = parsed.kpi1_logs;
                if (parsed.kpi2_logs) newProj.kpi2_logs = parsed.kpi2_logs;
                if (parsed.kpi3_logs) newProj.kpi3_logs = parsed.kpi3_logs;
                if (parsed.kpi4_logs) newProj.kpi4_logs = parsed.kpi4_logs;
                if (parsed.kpi5_logs) newProj.kpi5_logs = parsed.kpi5_logs;
            } else {
                // Parse CSV rows into KPI 1 FTQ logs as default
                const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
                if (lines.length > 1) {
                    for (let i = 1; i < lines.length; i++) {
                        const cols = lines[i].split(",").map(c => c.replace(/^"|"$/g, '').trim());
                        if (cols.length >= 2) {
                            newProj.kpi1_logs.push({
                                id: "t_imp_" + i + "_" + Date.now(),
                                discipline: cols[0] || "Structural Works",
                                subDiscipline: cols[1] || "Concrete Works",
                                test: cols[2] || "Concrete Cylinder Compressive Strength Test (28-day)",
                                req: cols[3] || "fc' = 4,000 psi (27.5 MPa) min",
                                act: parseFloat(cols[4]) || 30,
                                dateCond: cols[5] || "",
                                dateRes: cols[6] || "",
                                quarter: cols[7] || "Q1",
                                remarks: cols[8] || "Pass"
                            });
                        }
                    }
                }
            }

            appState.projects[newId] = newProj;
            appState.activeProjectId = newId;
            saveAppState();
            renderProjectSelector();
            loadActiveProjectData();
            calculateAllKPIs();
            alert(`🎉 Success! New Project "${newProj.name}" created and loaded from Excel file "${file.name}"!`);
        } catch (err) {
            alert("Error creating new project from file: " + err.message);
        }
    };
    reader.readAsText(file);
}

function downloadVBAModule() {
    const vbaCode = `Attribute VB_Name = "FCL_QAQC_MacroSuite"
'===============================================================================
' FCLaranang Development Corporation — Executive QA/QC Automation Suite
' Instructions: Open Excel -> Press Alt + F11 -> File -> Import File -> Select this .bas file
'===============================================================================

Sub AutoFitAllWorksheets()
    Dim ws As Worksheet
    For Each ws In ThisWorkbook.Worksheets
        ws.Columns.AutoFit
        ws.Rows.AutoFit
    Next ws
    MsgBox "🎉 All worksheet columns & rows auto-fitted successfully!", vbInformation, "FCL QA/QC Automation"
End Sub

Sub FilterByDiscipline()
    Dim disc As String
    disc = InputBox("Enter Engineering Discipline to Filter (e.g. Structural, Architectural, Mechanical, Electrical, Plumbing):", "FCL QA/QC Discipline Filter")
    If Trim(disc) = "" Then Exit Sub
    
    Dim ws As Worksheet
    For Each ws In ThisWorkbook.Worksheets
        If ws.Name <> "Master Standards and Specs" And ws.Name <> "VBA Macros and Automation" Then
            On Error Resume Next
            If ws.AutoFilterMode Then ws.ShowAllData
            ws.Range("A10:L100").AutoFilter Field:=2, Criteria1:="*" & disc & "*"
            On Error GoTo 0
        End If
    Next ws
    MsgBox "Filtered all project sheets by Discipline: " & disc, vbInformation, "FCL QA/QC Filter"
End Sub

Sub ClearAllFilters()
    Dim ws As Worksheet
    For Each ws In ThisWorkbook.Worksheets
        On Error Resume Next
        If ws.AutoFilterMode Then ws.ShowAllData
        On Error GoTo 0
    Next ws
    MsgBox "All filters cleared across all project sheets!", vbInformation, "FCL QA/QC Filter"
End Sub

Sub ExportActiveSheetToPDF()
    Dim ws As Worksheet
    Set ws = ActiveSheet
    Dim pdfPath As String
    pdfPath = Application.DefaultFilePath & "\\" & ws.Name & "_" & Format(Now, "yyyy-mm-dd") & ".pdf"
    
    ws.ExportAsFixedFormat Type:=xlTypePDF, Filename:=pdfPath, Quality:=xlQualityStandard, IncludeDocProperties:=True, IgnorePrintAreas:=False, OpenAfterPublish:=True
    MsgBox "Exported " & ws.Name & " to PDF:" & vbCrLf & pdfPath, vbInformation, "FCL QA/QC PDF Exporter"
End Sub
`;

    const blob = new Blob([vbaCode], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "FCL_QAQC_Macro_Suite.bas");
    document.body.appendChild(a);
    a.click();
    a.remove();
}

function exportDataJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `FCL_QAQC_FullExcel_Export_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(dlAnchorElem);
    dlAnchorElem.click();
    dlAnchorElem.remove();
}

function triggerImportJSON() {
    const input = document.getElementById("importFileInput");
    if (input) input.click();
}

function importDataJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const isAppend = confirm(`Import File: "${file.name}"\n\nHow would you like to load this data?\n\n• Click 'OK' to APPEND (Add imported records to existing data without deleting current entries)\n• Click 'Cancel' to OVERWRITE (Replace existing data with imported file)`);

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (imported && imported.projects) {
                if (isAppend) {
                    // Merge Projects & Logs
                    Object.keys(imported.projects).forEach(pId => {
                        if (!appState.projects[pId]) {
                            appState.projects[pId] = imported.projects[pId];
                        } else {
                            const curP = appState.projects[pId];
                            const impP = imported.projects[pId];
                            curP.kpi1_logs.push(...(impP.kpi1_logs || []));
                            curP.kpi2_logs.push(...(impP.kpi2_logs || []));
                            curP.kpi3_logs.push(...(impP.kpi3_logs || []));
                            curP.kpi4_logs.push(...(impP.kpi4_logs || []));
                            curP.kpi5_logs.push(...(impP.kpi5_logs || []));
                        }
                    });
                    alert(`Data successfully APPENDED into existing project logs!`);
                } else {
                    appState = imported;
                    alert("Data successfully REPLACED with imported file!");
                }
                saveAppState();
                applyCurrentTheme();
                renderProjectSelector();
                loadActiveProjectData();
                calculateAllKPIs();
            }
        } catch (err) { alert("Error reading JSON file: " + err.message); }
    };
    reader.readAsText(file);
}

function triggerImportExcelCSV() {
    const input = document.getElementById("importExcelFileInput");
    if (input) input.click();
}

function importExcelCSV(event) {
    const file = event.target.files[0];
    if (!file) return;

    const isAppend = confirm(`Import Spreadsheet: "${file.name}"\n\nHow would you like to load this spreadsheet?\n\n• Click 'OK' to APPEND (Add new rows to existing active project logs)\n• Click 'Cancel' to OVERWRITE (Replace active project logs)`);

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const text = e.target.result;
            if (file.name.endsWith(".json")) {
                const imported = JSON.parse(text);
                if (imported && imported.projects) {
                    if (isAppend) {
                        Object.keys(imported.projects).forEach(pId => {
                            if (!appState.projects[pId]) appState.projects[pId] = imported.projects[pId];
                            else {
                                const curP = appState.projects[pId];
                                const impP = imported.projects[pId];
                                curP.kpi1_logs.push(...(impP.kpi1_logs || []));
                                curP.kpi2_logs.push(...(impP.kpi2_logs || []));
                                curP.kpi3_logs.push(...(impP.kpi3_logs || []));
                                curP.kpi4_logs.push(...(impP.kpi4_logs || []));
                                curP.kpi5_logs.push(...(impP.kpi5_logs || []));
                            }
                        });
                        alert(`File data APPENDED into existing project logs!`);
                    } else {
                        appState = imported;
                        alert("File data REPLACED existing project logs!");
                    }
                    saveAppState();
                    applyCurrentTheme();
                    renderProjectSelector();
                    loadActiveProjectData();
                    calculateAllKPIs();
                    return;
                }
            }

            const actionMsg = isAppend ? "APPENDED to existing entries" : "LOADED into active project logs";
            alert(`Spreadsheet file "${file.name}" ${actionMsg} successfully!`);
        } catch (err) {
            alert("Error importing spreadsheet file: " + err.message);
        }
    };
    reader.readAsText(file);
}

// ==========================================================================
// 🏢 INDIVIDUAL ACTIVE PROJECT QA/QC REPORT GENERATOR ENGINE
// ==========================================================================

function openActiveProjectReportModal() {
    const proj = appState.projects[appState.activeProjectId] || Object.values(appState.projects || {})[0];
    if (!proj) {
        alert("No active project selected to generate report.");
        return;
    }

    const titleEl = document.getElementById("actRepModalProjectName");
    const metaEl = document.getElementById("actRepModalProjectMeta");
    const budgetVal = parseFloat(proj.budget !== undefined ? proj.budget : proj.baseline?.budget) || 0;
    const areaVal = parseFloat(proj.area !== undefined ? proj.area : (proj.grossFloorArea !== undefined ? proj.grossFloorArea : proj.baseline?.grossFloorArea)) || 0;
    const locVal = proj.location || proj.baseline?.location || 'N/A';

    if (titleEl) titleEl.innerText = proj.name || "Active Project";
    if (metaEl) metaEl.innerText = `Code: ${proj.code || proj.baseline?.code || 'PRJ-01'} | Location: ${locVal} | Budget: ₱${budgetVal.toLocaleString()} | Gross Floor Area: ${areaVal.toLocaleString()} sq. m`;

    const modal = document.getElementById("activeProjectReportModal");
    if (modal) {
        modal.classList.add("active");
    }
}

function closeActiveProjectReportModal() {
    const modal = document.getElementById("activeProjectReportModal");
    if (modal) {
        modal.classList.remove("active");
    }
}

function toggleActRepLogsCheckboxes(checked) {
    const ids = ["actRepLogKPI1", "actRepLogKPI2", "actRepLogKPI3", "actRepLogKPI4", "actRepLogKPI5"];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.checked = checked;
    });
    const subBox = document.getElementById("actRepSubLogsBox");
    if (subBox) {
        subBox.style.opacity = checked ? "1" : "0.5";
        subBox.style.pointerEvents = checked ? "auto" : "none";
    }
}

function executeActiveProjectPrintReport() {
    const proj = appState.projects[appState.activeProjectId] || Object.values(appState.projects || {})[0];
    if (!proj) {
        alert("No active project available to generate report.");
        return;
    }

    const timeRange = document.getElementById("actRepTimeRangeSelect")?.value || "ALL";
    const incScorecard = document.getElementById("actRepIncScorecard")?.checked !== false;
    const incNarrative = document.getElementById("actRepIncNarrative")?.checked !== false;
    const incCharts = document.getElementById("actRepIncCharts")?.checked !== false;
    const incLogs = document.getElementById("actRepIncLogs")?.checked !== false;
    const logsKPI1 = document.getElementById("actRepLogKPI1")?.checked !== false;
    const logsKPI2 = document.getElementById("actRepLogKPI2")?.checked !== false;
    const logsKPI3 = document.getElementById("actRepLogKPI3")?.checked !== false;
    const logsKPI4 = document.getElementById("actRepLogKPI4")?.checked !== false;
    const logsKPI5 = document.getElementById("actRepLogKPI5")?.checked !== false;
    const incSignoff = document.getElementById("actRepIncSignoff")?.checked !== false;

    const options = {
        timeRange,
        incScorecard,
        incNarrative,
        incCharts,
        incLogs,
        logsKPI1,
        logsKPI2,
        logsKPI3,
        logsKPI4,
        logsKPI5,
        incSignoff
    };

    // 1. Build and render active project document
    buildActiveProjectReportDocument(proj, options);

    // 2. Close modal
    closeActiveProjectReportModal();

    // 3. Mark body for print isolation
    document.body.classList.add("printing-active-project-report");

    // 4. Trigger print
    setTimeout(() => {
        window.print();
    }, 150);

    // 5. Cleanup listener after print
    const cleanUpPrint = () => {
        document.body.classList.remove("printing-active-project-report");
        window.removeEventListener("afterprint", cleanUpPrint);
    };
    window.addEventListener("afterprint", cleanUpPrint);
    setTimeout(cleanUpPrint, 3000);
}
if (typeof window !== "undefined") {
    window.executeActiveProjectPrintReport = executeActiveProjectPrintReport;
}

function buildActiveProjectReportDocument(proj, options) {
    const docContainer = document.getElementById("activeProjectReportDocument");
    if (!docContainer) return;

    const timeRange = options.timeRange || "ALL";
    const budgetVal = parseFloat(proj.budget !== undefined ? proj.budget : proj.baseline?.budget) || 0;
    const areaVal = parseFloat(proj.area !== undefined ? proj.area : (proj.grossFloorArea !== undefined ? proj.grossFloorArea : proj.baseline?.grossFloorArea)) || 0;
    const locVal = proj.location || proj.baseline?.location || 'N/A';
    const dateStr = new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });

    // Filter Logs by Selected Quarter/Timeframe
    const kpi1Logs = (proj.kpi1_logs || []).filter(l => isQuarterInTimeRange(l.quarter, timeRange));
    const kpi2Logs = (proj.kpi2_logs || []).filter(l => isQuarterInTimeRange(l.quarter, timeRange));
    const kpi3Logs = (proj.kpi3_logs || []).filter(l => isQuarterInTimeRange(l.quarter, timeRange));
    const kpi4Logs = (proj.kpi4_logs || []).filter(l => isQuarterInTimeRange(l.quarter, timeRange));
    const kpi5Logs = (proj.kpi5_logs || []).filter(l => isQuarterInTimeRange(l.quarter, timeRange));

    // Calculate KPI 1 Stats
    const totalTests = kpi1Logs.length;
    const passTests = kpi1Logs.filter(l => l.remarks === "Pass").length;
    const failTests = totalTests - passTests;
    const ftqPassRate = totalTests > 0 ? (passTests / totalTests) * 100 : 100;
    const ftqStatus = ftqPassRate >= 95.0 ? "green" : (ftqPassRate >= 90.0 ? "yellow" : "red");

    // Calculate KPI 2 Stats
    const totalReworkCost = kpi2Logs.reduce((sum, item) => {
        const qty = parseFloat(item.qty) || 1;
        const labor = parseFloat(item.labor) || 0;
        const mat = parseFloat(item.mat) || 0;
        const direct = qty * (labor + mat);
        let breakdownSum = 0;
        if (item.breakdown && Array.isArray(item.breakdown) && item.breakdown.length > 0) {
            item.breakdown.forEach(b => {
                const bQty = parseFloat(b.qty) || 0;
                const bRate = parseFloat(b.rate) || 0;
                breakdownSum += (bQty * bRate);
            });
        }
        return sum + (direct + breakdownSum);
    }, 0);
    const reworkRatePct = budgetVal > 0 ? (totalReworkCost / budgetVal) * 100 : 0;
    const reworkStatus = reworkRatePct <= 2.0 ? "green" : (reworkRatePct <= 3.0 ? "yellow" : "red");

    // Calculate KPI 3 Stats
    const totalDefects = kpi3Logs.length;
    const defectDensity = areaVal > 0 ? (totalDefects / (areaVal / 100)) : 0;
    const defectStatus = defectDensity <= 2.0 ? "green" : (defectDensity <= 3.5 ? "yellow" : "red");

    // Calculate KPI 4 Stats
    const totalNCRs = kpi4Logs.length;
    const closedNCRs = kpi4Logs.filter(l => l.status === "Closed" || l.status === "Rectified").length;
    const openNCRs = totalNCRs - closedNCRs;
    const avgNCRDuration = totalNCRs > 0 ? (kpi4Logs.reduce((sum, l) => sum + (parseFloat(l.duration) || 0), 0) / totalNCRs) : 0;
    const ncrStatus = avgNCRDuration <= 7.0 ? "green" : (avgNCRDuration <= 12.0 ? "yellow" : "red");

    // Calculate KPI 5 Stats
    const totalPunch = kpi5Logs.length;
    const openCritPunch = kpi5Logs.filter(l => l.cat === "Critical" && l.status !== "Signed-off" && l.status !== "Closed" && l.status !== "Rectified").length;
    const openMinorPunch = kpi5Logs.filter(l => l.cat !== "Critical" && l.status !== "Signed-off" && l.status !== "Closed" && l.status !== "Rectified").length;
    const closedPunch = totalPunch - (openCritPunch + openMinorPunch);
    const punchStatus = openCritPunch === 0 ? "green" : "red";

    // Overall Compliance Score
    const greenCount = [ftqStatus, reworkStatus, defectStatus, ncrStatus, punchStatus].filter(s => s === "green").length;
    const overallScorePct = Math.round((greenCount / 5) * 100);
    const overallBadgeClass = overallScorePct === 100 ? "badge-green" : (overallScorePct >= 60 ? "badge-yellow" : "badge-red");
    const overallBadgeText = overallScorePct === 100 ? "100% EXCELLENT COMPLIANCE" : (overallScorePct >= 60 ? `${overallScorePct}% SATISFACTORY COMPLIANCE` : `${overallScorePct}% ATTENTION REQUIRED`);

    let html = `
        <!-- Corporate Document Header -->
        <div class="act-rep-header">
            <div class="act-rep-brand">
                <img src="FCLDC.ico" alt="FCLDC Logo" class="act-rep-brand-img">
                <div class="act-rep-brand-text">
                    <h1>FCLaranang Development Corporation</h1>
                    <p>Corporate Quality Assurance &amp; Field Quality Control Division</p>
                </div>
            </div>
            <div class="act-rep-title-badge">
                <h2>PROJECT QA/QC QUALITY COMPLIANCE &amp; AUDIT REPORT</h2>
                <span>Single Project Comprehensive Quality Audit Record</span>
            </div>
        </div>

        <!-- Project Information Metadata Grid -->
        <div class="act-rep-meta-grid">
            <div class="act-rep-meta-item">
                <span class="act-rep-meta-label">Project Name:</span>
                <span class="act-rep-meta-val">${proj.name || 'N/A'}</span>
            </div>
            <div class="act-rep-meta-item">
                <span class="act-rep-meta-label">Project Code / ID:</span>
                <span class="act-rep-meta-val">${proj.code || proj.baseline?.code || 'PRJ-01'}</span>
            </div>
            <div class="act-rep-meta-item">
                <span class="act-rep-meta-label">Project Location:</span>
                <span class="act-rep-meta-val">${locVal}</span>
            </div>
            <div class="act-rep-meta-item">
                <span class="act-rep-meta-label">Construction Phase:</span>
                <span class="act-rep-meta-val">${proj.phase || 'Active Construction'}</span>
            </div>
            <div class="act-rep-meta-item">
                <span class="act-rep-meta-label">Approved Budget:</span>
                <span class="act-rep-meta-val">₱${budgetVal.toLocaleString()}</span>
            </div>
            <div class="act-rep-meta-item">
                <span class="act-rep-meta-label">Gross Floor Area:</span>
                <span class="act-rep-meta-val">${areaVal.toLocaleString()} sq. m</span>
            </div>
            <div class="act-rep-meta-item">
                <span class="act-rep-meta-label">Audit Timeframe:</span>
                <span class="act-rep-meta-val">${timeRange === 'ALL' ? 'Full Project Lifetime (All Quarters)' : `Quarter ${timeRange}`}</span>
            </div>
            <div class="act-rep-meta-item">
                <span class="act-rep-meta-label">Report Date:</span>
                <span class="act-rep-meta-val">${dateStr}</span>
            </div>
        </div>
    `;

    // 1. Overall Executive Summary & Scorecard Table
    if (options.incScorecard) {
        html += `
            <div class="act-rep-section">
                <div class="act-rep-section-header">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 16px;">📌</span>
                        <h3>1. Executive Management QA/QC Scorecard &amp; Audit Summary</h3>
                    </div>
                    <span class="status-badge ${overallBadgeClass}" style="font-size: 11.5px; font-weight: 800;">${overallBadgeText}</span>
                </div>

                <table class="act-rep-scorecard-table">
                    <thead>
                        <tr>
                            <th style="width: 5%;">#</th>
                            <th style="width: 25%;">KPI Indicator &amp; Description</th>
                            <th style="width: 18%;">Target Benchmark Limit</th>
                            <th style="width: 18%;">Actual Measured Result</th>
                            <th style="width: 14%;">Absolute Variance (Δ)</th>
                            <th style="width: 20%;">Evaluation Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>1</strong></td>
                            <td><strong>First Time Quality (FTQ) Pass Rate</strong><br><small style="color: #64748b;">Field inspection test pass velocity</small></td>
                            <td>≥ 95.00% Pass Rate</td>
                            <td><strong>${ftqPassRate.toFixed(2)}%</strong> (${passTests}/${totalTests} Passed)</td>
                            <td style="color: ${ftqPassRate >= 95 ? '#10b981' : '#ef4444'}; font-weight: 700;">${(ftqPassRate - 95.0).toFixed(2)}%</td>
                            <td><span class="status-badge badge-${ftqStatus}">${ftqStatus === 'green' ? 'ON TARGET (MET)' : (ftqStatus === 'yellow' ? 'NEAR TARGET' : 'ACTION REQUIRED')}</span></td>
                        </tr>
                        <tr>
                            <td><strong>2</strong></td>
                            <td><strong>Cumulative Quality Rework Cost Rate</strong><br><small style="color: #64748b;">Rework BOQ cost as % of approved budget</small></td>
                            <td>≤ 2.00% of Total Budget</td>
                            <td><strong>${reworkRatePct.toFixed(2)}%</strong> (₱${totalReworkCost.toLocaleString()})</td>
                            <td style="color: ${reworkRatePct <= 2.0 ? '#10b981' : '#ef4444'}; font-weight: 700;">${(reworkRatePct - 2.0).toFixed(2)}%</td>
                            <td><span class="status-badge badge-${reworkStatus}">${reworkStatus === 'green' ? 'WITHIN LIMIT' : (reworkStatus === 'yellow' ? 'MONITORING' : 'BREACHED')}</span></td>
                        </tr>
                        <tr>
                            <td><strong>3</strong></td>
                            <td><strong>Defect Density Indicator</strong><br><small style="color: #64748b;">Defect occurrences per 100 m² floor area</small></td>
                            <td>≤ 2.00 per 100 m²</td>
                            <td><strong>${defectDensity.toFixed(2)}</strong> (${totalDefects} snags logged)</td>
                            <td style="color: ${defectDensity <= 2.0 ? '#10b981' : '#ef4444'}; font-weight: 700;">${(defectDensity - 2.0).toFixed(2)}</td>
                            <td><span class="status-badge badge-${defectStatus}">${defectStatus === 'green' ? 'WITHIN LIMIT' : (defectStatus === 'yellow' ? 'ELEVATED' : 'BREACHED')}</span></td>
                        </tr>
                        <tr>
                            <td><strong>4</strong></td>
                            <td><strong>NCR Resolution Timeline Duration</strong><br><small style="color: #64748b;">Average turnaround days to rectify &amp; close</small></td>
                            <td>≤ 7.00 Days Average</td>
                            <td><strong>${avgNCRDuration.toFixed(1)} Days</strong> (${closedNCRs} closed, ${openNCRs} open)</td>
                            <td style="color: ${avgNCRDuration <= 7.0 ? '#10b981' : '#ef4444'}; font-weight: 700;">${(avgNCRDuration - 7.0).toFixed(1)} Days</td>
                            <td><span class="status-badge badge-${ncrStatus}">${ncrStatus === 'green' ? 'ON TARGET' : (ncrStatus === 'yellow' ? 'SLIGHT DELAY' : 'ACTION REQUIRED')}</span></td>
                        </tr>
                        <tr>
                            <td><strong>5</strong></td>
                            <td><strong>Handover Punch List Snag Tracking</strong><br><small style="color: #64748b;">Critical snag elimination before handover</small></td>
                            <td>Zero (0) Critical Snags</td>
                            <td><strong>${openCritPunch} Critical</strong> (${openMinorPunch} minor open)</td>
                            <td style="color: ${openCritPunch === 0 ? '#10b981' : '#ef4444'}; font-weight: 700;">${openCritPunch} Critical</td>
                            <td><span class="status-badge badge-${punchStatus}">${punchStatus === 'green' ? 'TARGET MET (0 CRITICAL)' : 'ACTION REQUIRED (BLOCKS HANDOVER)'}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    }

    // Quality Synthesis Narrative & Action Plan
    if (options.incNarrative) {
        let gains = [];
        let drops = [];
        let actions = [];

        if (ftqPassRate >= 95) gains.push(`High First-Time Quality pass velocity (${ftqPassRate.toFixed(1)}%) complying with ISO standard threshold.`);
        else drops.push(`FTQ pass velocity (${ftqPassRate.toFixed(1)}%) is below the corporate 95.0% threshold.`);

        if (reworkRatePct <= 2.0) gains.push(`Rework cost containment strictly controlled at ${reworkRatePct.toFixed(2)}% of total contract value.`);
        else drops.push(`Quality rework cost (${reworkRatePct.toFixed(2)}% | ₱${totalReworkCost.toLocaleString()}) exceeds the 2.0% corporate control ceiling.`);

        if (defectDensity <= 2.0) gains.push(`Defect density (${defectDensity.toFixed(2)}/100m²) demonstrates sound workmanship and surface protection.`);
        else drops.push(`Defect density (${defectDensity.toFixed(2)}/100m²) indicates recurring workmanship snags.`);

        if (avgNCRDuration <= 7.0) gains.push(`Rapid NCR resolution turnaround averaging ${avgNCRDuration.toFixed(1)} days within 7-day SLA.`);
        else drops.push(`NCR turnaround (${avgNCRDuration.toFixed(1)} days) exceeds the 7.0-day resolution SLA.`);

        if (openCritPunch === 0) actions.push(`Zero critical punch items active. Project is verified ready for formal client handover.`);
        else actions.push(`Rectify all ${openCritPunch} open critical punch list snags immediately prior to formal handover inspection.`);

        html += `
            <div class="act-rep-section" style="background: #f8fafc;">
                <div class="act-rep-section-header">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 16px;">🧠</span>
                        <h3>Quality Synthesis Narrative &amp; Action Plan</h3>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; font-size: 11px;">
                    <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px;">
                        <strong style="color: #10b981; display: block; margin-bottom: 4px;">📈 Quality Gains &amp; Best Practices:</strong>
                        <ul style="margin: 0; padding-left: 16px; color: #334155;">
                            ${gains.map(g => `<li style="margin-bottom: 3px;">${g}</li>`).join('')}
                        </ul>
                    </div>
                    <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px;">
                        <strong style="color: #ef4444; display: block; margin-bottom: 4px;">📉 Quality Concerns &amp; Watchlist:</strong>
                        <ul style="margin: 0; padding-left: 16px; color: #334155;">
                            ${drops.length > 0 ? drops.map(d => `<li style="margin-bottom: 3px;">${d}</li>`).join('') : '<li style="color: #10b981;">No active quality drops recorded.</li>'}
                        </ul>
                    </div>
                    <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px;">
                        <strong style="color: #f59e0b; display: block; margin-bottom: 4px;">⚠️ Handover Action Items:</strong>
                        <ul style="margin: 0; padding-left: 16px; color: #334155;">
                            ${actions.map(a => `<li style="margin-bottom: 3px;">${a}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <!-- Summary Evaluation for Each KPI -->
                <div style="margin-top: 14px; border-top: 1.5px solid #cbd5e1; padding-top: 10px;">
                    <h4 style="font-size: 12px; font-weight: 800; color: #0f172a; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">
                        📋 Summary Evaluation by KPI Indicator &amp; Corrective Directives
                    </h4>
                    <table class="act-rep-scorecard-table" style="font-size: 10.5px;">
                        <thead>
                            <tr>
                                <th style="width: 22%;">KPI Indicator</th>
                                <th style="width: 14%;">Measured Result</th>
                                <th style="width: 34%;">Performance Appraisal &amp; Root Cause Analysis</th>
                                <th style="width: 30%;">Quality Directive &amp; Corrective Measures</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>1. FTQ Testing Rate</strong></td>
                                <td><strong style="color: ${ftqStatus === 'green' ? '#10b981' : '#ef4444'};">${ftqPassRate.toFixed(1)}% Pass</strong><br><small style="color: #64748b;">${passTests}/${totalTests} Passed</small></td>
                                <td>${ftqStatus === 'green' 
                                    ? 'Field inspections and lab test results consistently satisfy technical specifications on initial sampling.' 
                                    : 'Test failures detected in field batches requiring re-testing, root-cause investigation, and re-sampling.'}</td>
                                <td>${ftqStatus === 'green' 
                                    ? 'Maintain strict pre-pour QA checklist and certified testing procedures for concrete and structural steel.' 
                                    : 'Enforce mandatory batch pre-qualification and reject non-compliant material suppliers.'}</td>
                            </tr>
                            <tr>
                                <td><strong>2. Quality Rework Rate</strong></td>
                                <td><strong style="color: ${reworkStatus === 'green' ? '#10b981' : '#ef4444'};">${reworkRatePct.toFixed(2)}% of Budget</strong><br><small style="color: #64748b;">₱${totalReworkCost.toLocaleString()}</small></td>
                                <td>${reworkStatus === 'green' 
                                    ? 'Rework BOQ expenditure is strictly controlled within the 2.0% approved budget threshold.' 
                                    : 'Excessive rework rectification cost exceeds the corporate 2.0% budget ceiling, impacting profitability.'}</td>
                                <td>${reworkStatus === 'green' 
                                    ? 'Continue pre-installation mock-ups and trade interface coordination to avoid re-work.' 
                                    : 'Chargeback rework costs to responsible trade subcontractors and enforce mandatory supervisor sign-offs.'}</td>
                            </tr>
                            <tr>
                                <td><strong>3. Defect Density</strong></td>
                                <td><strong style="color: ${defectStatus === 'green' ? '#10b981' : '#ef4444'};">${defectDensity.toFixed(2)} / 100m²</strong><br><small style="color: #64748b;">${totalDefects} Snags</small></td>
                                <td>${defectStatus === 'green' 
                                    ? 'Defect frequency across evaluated floor areas is well controlled below the 2.0/100m² benchmark.' 
                                    : 'Elevated defect occurrence rate indicates recurring workmanship and material handling deficiencies.'}</td>
                                <td>${defectStatus === 'green' 
                                    ? 'Maintain daily site walk audits and enforce surface protection across architectural finishes.' 
                                    : 'Conduct targeted trade refresher training and implement daily first-piece inspection protocols.'}</td>
                            </tr>
                            <tr>
                                <td><strong>4. NCR Resolution Time</strong></td>
                                <td><strong style="color: ${ncrStatus === 'green' ? '#10b981' : '#ef4444'};">${avgNCRDuration.toFixed(1)} Days</strong><br><small style="color: #64748b;">${closedNCRs} Closed | ${openNCRs} Open</small></td>
                                <td>${ncrStatus === 'green' 
                                    ? 'Corrective action requests are resolved and closed promptly within the 7.0-day SLA resolution timeline.' 
                                    : 'NCR resolution cycles are delayed beyond 7.0 days, risking project milestone handover schedules.'}</td>
                                <td>${ncrStatus === 'green' 
                                    ? 'Sustain weekly NCR review meetings and rapid engineering verification workflows.' 
                                    : 'Hold open NCR resolution as a pre-requisite condition for monthly subcontractor progress billings.'}</td>
                            </tr>
                            <tr>
                                <td><strong>5. Handover Punch List</strong></td>
                                <td><strong style="color: ${punchStatus === 'green' ? '#10b981' : '#ef4444'};">${openCritPunch} Critical Snags</strong><br><small style="color: #64748b;">${openMinorPunch} Minor | ${closedPunch} Closed</small></td>
                                <td>${openCritPunch === 0 
                                    ? 'Zero critical defects active. The project meets corporate handover gating criteria.' 
                                    : `${openCritPunch} open critical defects remain unrectified, preventing formal client turnover and acceptance.`}</td>
                                <td>${openCritPunch === 0 
                                    ? 'Proceed with final client walk-through and prepare formal Certificate of Substantial Completion.' 
                                    : 'Deploy emergency trade rectification strike-teams to clear all critical punch list snags immediately.'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    // 2. Visual KPI Trend Analytics Cards (Each on dedicated clean page)
    if (options.incCharts) {
        html += `
            <!-- KPI 1 Chart Card -->
            <div class="act-rep-chart-card">
                <div class="compiler-chart-header">
                    <div class="compiler-chart-header-left">
                        <span style="font-size: 20px;">🧪</span>
                        <h3 style="margin: 0;">1. First Time Quality (FTQ) Testing Pass Rate &amp; Test Volume</h3>
                    </div>
                    <span class="info-tag" style="font-size: 11px; font-weight: 700;">Target Threshold Limit: ≥ 95.0% Pass Rate</span>
                </div>
                <div class="kpi2-metrics-grid" style="margin: 0 0 5mm 0;">
                    <div class="kpi2-metric-card">
                        <span class="kpi2-metric-label">🧪 Total Field Tests</span>
                        <span class="kpi2-metric-val">${totalTests} Tests</span>
                        <span class="kpi2-metric-sub">Conducted Inspections</span>
                    </div>
                    <div class="kpi2-metric-card">
                        <span class="kpi2-metric-label">✅ First-Time Passed</span>
                        <span class="kpi2-metric-val" style="color: #10b981;">${passTests} Tests</span>
                        <span class="kpi2-metric-sub">${ftqPassRate.toFixed(1)}% FTQ Rate</span>
                    </div>
                    <div class="kpi2-metric-card">
                        <span class="kpi2-metric-label">⚠️ Failed / Re-tested</span>
                        <span class="kpi2-metric-val" style="color: ${failTests > 0 ? '#ef4444' : '#10b981'};">${failTests} Tests</span>
                        <span class="kpi2-metric-sub">${totalTests > 0 ? ((failTests / totalTests) * 100).toFixed(1) : 0}% Defect Rate</span>
                    </div>
                    <div class="kpi2-metric-card">
                        <span class="kpi2-metric-label">🛡️ FTQ Compliance</span>
                        <span class="kpi2-metric-val"><span class="status-badge badge-${ftqStatus}">${ftqStatus === 'green' ? 'PASSED (≥ 95%)' : 'ACTION REQ'}</span></span>
                        <span class="kpi2-metric-sub">${ftqStatus === 'green' ? 'Complying with Specs' : 'Target Threshold Breached'}</span>
                    </div>
                </div>
                <div class="compiler-chart-legend-bar">
                    <span class="legend-item" style="display: inline-flex; align-items: center; gap: 6px;"><span class="legend-dot" style="background: rgba(59, 130, 246, 0.7); width: 10px; height: 10px; border-radius: 50%;"></span><span>Conducted Test Volume [Bar]</span></span>
                    <span class="legend-item" style="display: inline-flex; align-items: center; gap: 6px;"><span class="legend-dot" style="background: #10b981; width: 10px; height: 10px; border-radius: 50%;"></span><span>First Time Quality (FTQ) % [Line]</span></span>
                    <span class="legend-item" style="display: inline-flex; align-items: center; gap: 6px;"><span class="legend-dot" style="background: #ef4444; height: 3px; width: 16px;"></span><span>Target Threshold (95.0% Min)</span></span>
                </div>
                <div id="actRepChart_kpi1" class="act-rep-chart-box"></div>
            </div>

            <!-- KPI 2 Chart Card -->
            <div class="act-rep-chart-card">
                <div class="compiler-chart-header">
                    <div class="compiler-chart-header-left">
                        <span style="font-size: 20px;">🔨</span>
                        <h3 style="margin: 0;">2. Cumulative Quality Rework Cost Monthly Trend (% of Budget)</h3>
                    </div>
                    <span class="info-tag" style="font-size: 11px; font-weight: 700;">Target Threshold Limit: ≤ 2.0% of Approved Budget</span>
                </div>
                <div class="kpi2-metrics-grid" style="margin: 0 0 5mm 0;">
                    <div class="kpi2-metric-card">
                        <span class="kpi2-metric-label">💰 Approved Project Budget</span>
                        <span class="kpi2-metric-val">₱${budgetVal.toLocaleString()}</span>
                        <span class="kpi2-metric-sub">Total Contract Value</span>
                    </div>
                    <div class="kpi2-metric-card">
                        <span class="kpi2-metric-label">🔨 Cumulative Rework YTD</span>
                        <span class="kpi2-metric-val" style="color: ${reworkStatus === 'red' ? '#ef4444' : '#2563eb'};">₱${totalReworkCost.toLocaleString()} (${reworkRatePct.toFixed(2)}%)</span>
                        <span class="kpi2-metric-sub">${reworkStatus === 'red' ? 'Threshold Exceeded (> 2.0%)' : 'Running Total to Date'}</span>
                    </div>
                    <div class="kpi2-metric-card">
                        <span class="kpi2-metric-label">🛡️ Current Quality Status</span>
                        <span class="kpi2-metric-val"><span class="status-badge badge-${reworkStatus}">${reworkStatus === 'green' ? 'WITHIN BUDGET (≤ 2.0%)' : 'OVER BUDGET (> 2.0%)'}</span></span>
                        <span class="kpi2-metric-sub">${reworkStatus === 'green' ? 'Rework Cost Contained' : 'Trade Accountability Required'}</span>
                    </div>
                    <div class="kpi2-metric-card">
                        <span class="kpi2-metric-label">📊 Direct Rework Items</span>
                        <span class="kpi2-metric-val">${kpi2Logs.length} Entries</span>
                        <span class="kpi2-metric-sub">BOQ Cost Estimates Logged</span>
                    </div>
                </div>
                <div class="compiler-chart-legend-bar">
                    <span class="legend-item" style="display: inline-flex; align-items: center; gap: 6px;"><span class="legend-dot" style="background: #2563eb; width: 10px; height: 10px; border-radius: 50%;"></span><span>Cumulative Rework Cost % (Running Total)</span></span>
                    <span class="legend-item" style="display: inline-flex; align-items: center; gap: 6px;"><span class="legend-dot" style="background: #ef4444; height: 3px; width: 16px;"></span><span>Target Threshold (2.0% Cap)</span></span>
                </div>
                <div id="actRepChart_kpi2" class="act-rep-chart-box"></div>
            </div>

            <!-- KPI 3 Chart Card -->
            <div class="act-rep-chart-card">
                <div class="compiler-chart-header">
                    <div class="compiler-chart-header-left">
                        <span style="font-size: 20px;">📐</span>
                        <h3 style="margin: 0;">3. Defect Density Dual-Axis Combo Trend (Inspected Area vs. Defect Density)</h3>
                    </div>
                    <span class="info-tag" style="font-size: 11px; font-weight: 700;">Target Threshold Limit: ≤ 2.0 per 100 m²</span>
                </div>
                <div class="kpi2-metrics-grid" style="margin: 0 0 5mm 0;">
                    <div class="kpi2-metric-card">
                        <span class="kpi2-metric-label">📐 Gross Floor Area</span>
                        <span class="kpi2-metric-val">${areaVal.toLocaleString()} m²</span>
                        <span class="kpi2-metric-sub">Evaluated Project Scope</span>
                    </div>
                    <div class="kpi2-metric-card">
                        <span class="kpi2-metric-label">🔍 Total Defects Logged</span>
                        <span class="kpi2-metric-val" style="color: #60a5fa;">${totalDefects} Snags</span>
                        <span class="kpi2-metric-sub">Field Non-Conformances</span>
                    </div>
                    <div class="kpi2-metric-card">
                        <span class="kpi2-metric-label">📊 Average Defect Density</span>
                        <span class="kpi2-metric-val" style="color: ${defectStatus === 'red' ? '#ef4444' : '#10b981'};">${defectDensity.toFixed(2)} / 100m²</span>
                        <span class="kpi2-metric-sub">${defectStatus === 'green' ? 'Below 2.0 Standard' : 'Exceeds 2.0 Standard'}</span>
                    </div>
                    <div class="kpi2-metric-card">
                        <span class="kpi2-metric-label">🛡️ Overall Quality Status</span>
                        <span class="kpi2-metric-val"><span class="status-badge badge-${defectStatus}">${defectStatus === 'green' ? 'ON TARGET (≤ 2.0)' : 'ACTION REQUIRED (> 2.0)'}</span></span>
                        <span class="kpi2-metric-sub">${defectStatus === 'green' ? 'Quality Benchmarks Met' : 'Workmanship Audits Required'}</span>
                    </div>
                </div>
                <div class="compiler-chart-legend-bar">
                    <span class="legend-item" style="display: inline-flex; align-items: center; gap: 6px;"><span class="legend-dot" style="background: rgba(59, 130, 246, 0.7); width: 10px; height: 10px; border-radius: 50%;"></span><span>Total Inspected Area (m²) [Bar]</span></span>
                    <span class="legend-item" style="display: inline-flex; align-items: center; gap: 6px;"><span class="legend-dot" style="background: #10b981; width: 10px; height: 10px; border-radius: 50%;"></span><span>Defect Density (per 100 m²) [Line]</span></span>
                    <span class="legend-item" style="display: inline-flex; align-items: center; gap: 6px;"><span class="legend-dot" style="background: #ef4444; height: 3px; width: 16px;"></span><span>Target Threshold (2.0 / 100m²)</span></span>
                </div>
                <div id="actRepChart_kpi3" class="act-rep-chart-box"></div>
            </div>

            <!-- KPI 4 Chart Card -->
            <div class="act-rep-chart-card">
                <div class="compiler-chart-header">
                    <div class="compiler-chart-header-left">
                        <span style="font-size: 20px;">⏱️</span>
                        <h3 style="margin: 0;">4. NCR Resolution Duration Timeline (Days)</h3>
                    </div>
                    <span class="info-tag" style="font-size: 11px; font-weight: 700;">Target Threshold: ≤ 5–7 Days Resolution</span>
                </div>
                <div class="kpi2-metrics-grid" style="margin: 0 0 5mm 0;">
                    <div class="kpi2-metric-card">
                        <span class="kpi2-metric-label">⏱️ Total NCRs Logged</span>
                        <span class="kpi2-metric-val">${totalNCRs} NCRs</span>
                        <span class="kpi2-metric-sub">Issued Non-Conformances</span>
                    </div>
                    <div class="kpi2-metric-card">
                        <span class="kpi2-metric-label">✅ Closed &amp; Rectified</span>
                        <span class="kpi2-metric-val" style="color: #10b981;">${closedNCRs} Closed</span>
                        <span class="kpi2-metric-sub">${totalNCRs > 0 ? ((closedNCRs / totalNCRs) * 100).toFixed(0) : 0}% Clearance Rate</span>
                    </div>
                    <div class="kpi2-metric-card">
                        <span class="kpi2-metric-label">⚡ Active Open NCRs</span>
                        <span class="kpi2-metric-val" style="color: ${openNCRs > 0 ? '#ef4444' : '#10b981'};">${openNCRs} Open</span>
                        <span class="kpi2-metric-sub">${openNCRs === 0 ? 'All Items Cleared' : 'Action Required'}</span>
                    </div>
                    <div class="kpi2-metric-card">
                        <span class="kpi2-metric-label">🛡️ Avg Resolution Time</span>
                        <span class="kpi2-metric-val"><span class="status-badge badge-${ncrStatus}">${avgNCRDuration.toFixed(1)} Days (${ncrStatus === 'green' ? '≤ 7d' : '> 7d'})</span></span>
                        <span class="kpi2-metric-sub">${ncrStatus === 'green' ? 'Compliant Resolution' : 'Resolution Delayed'}</span>
                    </div>
                </div>
                <div class="compiler-chart-legend-bar">
                    <span class="legend-item" style="display: inline-flex; align-items: center; gap: 6px;"><span class="legend-dot" style="background: #3b82f6; width: 10px; height: 10px; border-radius: 50%;"></span><span>Resolution Duration (Days)</span></span>
                    <span class="legend-item" style="display: inline-flex; align-items: center; gap: 6px;"><span class="legend-dot" style="background: #f59e0b; height: 3px; width: 16px;"></span><span>Maximum Target Cap (7 Days)</span></span>
                </div>
                <div id="actRepChart_kpi4" class="act-rep-chart-box"></div>
            </div>

            <!-- KPI 5 Chart Card -->
            <div class="act-rep-chart-card">
                <div class="compiler-chart-header">
                    <div class="compiler-chart-header-left">
                        <span style="font-size: 20px;">📋</span>
                        <h3 style="margin: 0;">5. Handover Punch List Analytics (Burn-Down Slope)</h3>
                    </div>
                    <span class="info-tag" style="font-size: 11px; font-weight: 700;">Target Benchmark: Zero (0) Critical Snags</span>
                </div>
                <div class="kpi2-metrics-grid" style="margin: 0 0 5mm 0;">
                    <div class="kpi2-metric-card">
                        <span class="kpi2-metric-label">📋 Total Punch Items</span>
                        <span class="kpi2-metric-val">${totalPunch} Items</span>
                        <span class="kpi2-metric-sub">Handover Snags Logged</span>
                    </div>
                    <div class="kpi2-metric-card">
                        <span class="kpi2-metric-label">✅ Rectified / Closed</span>
                        <span class="kpi2-metric-val" style="color: #10b981;">${closedPunch} Signed-off</span>
                        <span class="kpi2-metric-sub">${totalPunch > 0 ? ((closedPunch / totalPunch) * 100).toFixed(0) : 0}% Clearance Rate</span>
                    </div>
                    <div class="kpi2-metric-card">
                        <span class="kpi2-metric-label">⚠️ Open Minor Snags</span>
                        <span class="kpi2-metric-val" style="color: #f59e0b;">${openMinorPunch} Minor</span>
                        <span class="kpi2-metric-sub">Non-Critical Items</span>
                    </div>
                    <div class="kpi2-metric-card">
                        <span class="kpi2-metric-label">🛡️ Critical Snag Status</span>
                        <span class="kpi2-metric-val"><span class="status-badge badge-${punchStatus}">${punchStatus === 'green' ? '0 CRITICAL (TARGET MET)' : `${openCritPunch} CRITICAL OPEN`}</span></span>
                        <span class="kpi2-metric-sub">${punchStatus === 'green' ? 'Ready for Handover' : 'Blocks Formal Handover'}</span>
                    </div>
                </div>
                <div class="compiler-chart-legend-bar">
                    <span class="legend-item" style="display: inline-flex; align-items: center; gap: 6px;"><span class="legend-dot" style="background: #3b82f6; width: 10px; height: 10px; border-radius: 50%;"></span><span>Actual Punch Items Issued (Date Issued)</span></span>
                    <span class="legend-item" style="display: inline-flex; align-items: center; gap: 6px;"><span class="legend-dot" style="background: #10b981; height: 3px; width: 16px;"></span><span>Target Planned Clearance (Target Dates)</span></span>
                    <span class="legend-item" style="display: inline-flex; align-items: center; gap: 6px;"><span class="legend-dot" style="background: #f59e0b; width: 10px; height: 10px; border-radius: 50%;"></span><span>Actual Open Minor Snags</span></span>
                    <span class="legend-item" style="display: inline-flex; align-items: center; gap: 6px;"><span class="legend-dot" style="background: #ef4444; width: 10px; height: 10px; border-radius: 50%;"></span><span>Open Critical Snags (Blocks Turnover)</span></span>
                </div>
                <div id="actRepChart_kpi5" class="act-rep-chart-box"></div>
            </div>
        `;
    }

    // 3. Detailed Itemized KPI Data Audit Logs
    if (options.incLogs) {
        // KPI 1 Log Table
        if (options.logsKPI1 && kpi1Logs.length > 0) {
            html += `
                <div class="act-rep-audit-block">
                    <div class="act-rep-section-header">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span>🧪</span>
                            <h3>Detailed Log: KPI 1 — First-Time Quality (FTQ) Testing Records (${kpi1Logs.length} Records)</h3>
                        </div>
                    </div>
                    <table class="act-rep-audit-table">
                        <thead>
                            <tr>
                                <th style="width: 4%;">#</th>
                                <th style="width: 14%;">Discipline</th>
                                <th style="width: 14%;">Sub-Discipline</th>
                                <th style="width: 26%;">Specific Inspection / Test Description</th>
                                <th style="width: 18%;">Required Specification</th>
                                <th style="width: 8%;">Actual</th>
                                <th style="width: 8%;">Date</th>
                                <th style="width: 8%;">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${kpi1Logs.map((l, i) => `
                                <tr>
                                    <td>${i + 1}</td>
                                    <td>${l.discipline || '-'}</td>
                                    <td>${l.subDiscipline || '-'}</td>
                                    <td><strong>${l.test || '-'}</strong></td>
                                    <td>${l.req || '-'}</td>
                                    <td>${l.act !== undefined ? l.act : '-'}</td>
                                    <td>${formatTableDate(l.dateRes || l.dateCond) || '-'}</td>
                                    <td><span class="status-badge ${l.remarks === 'Pass' ? 'badge-green' : 'badge-red'}">${l.remarks || 'Pass'}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }

        // KPI 2 Log Table
        if (options.logsKPI2 && kpi2Logs.length > 0) {
            html += `
                <div class="act-rep-audit-block">
                    <div class="act-rep-section-header">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span>🔨</span>
                            <h3>Detailed Log: KPI 2 — Quality Rework BOQ Cost Estimates (${kpi2Logs.length} Entries)</h3>
                        </div>
                    </div>
                    <table class="act-rep-audit-table">
                        <thead>
                            <tr>
                                <th style="width: 4%;">#</th>
                                <th style="width: 14%;">Discipline</th>
                                <th style="width: 14%;">Sub-Discipline</th>
                                <th style="width: 28%;">Rework Description &amp; Root Cause</th>
                                <th style="width: 8%;">Qty</th>
                                <th style="width: 10%;">Labor (₱)</th>
                                <th style="width: 10%;">Material (₱)</th>
                                <th style="width: 12%;">Subtotal (₱)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${kpi2Logs.map((l, i) => {
                                const qty = parseFloat(l.qty) || 1;
                                const labor = parseFloat(l.labor) || 0;
                                const mat = parseFloat(l.mat) || 0;
                                const subtotal = qty * (labor + mat);
                                return `
                                    <tr>
                                        <td>${i + 1}</td>
                                        <td>${l.discipline || '-'}</td>
                                        <td>${l.subDiscipline || '-'}</td>
                                        <td><strong>${l.desc || '-'}</strong></td>
                                        <td>${qty} ${l.unit || 'lot'}</td>
                                        <td>${formatPeso(labor)}</td>
                                        <td>${formatPeso(mat)}</td>
                                        <td><strong style="color: #ef4444;">${formatPeso(subtotal)}</strong></td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }

        // KPI 3 Log Table
        if (options.logsKPI3 && kpi3Logs.length > 0) {
            html += `
                <div class="act-rep-audit-block">
                    <div class="act-rep-section-header">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span>📐</span>
                            <h3>Detailed Log: KPI 3 — Defect &amp; Quality Non-Conformance Records (${kpi3Logs.length} Snags)</h3>
                        </div>
                    </div>
                    <table class="act-rep-audit-table">
                        <thead>
                            <tr>
                                <th style="width: 4%;">#</th>
                                <th style="width: 14%;">Discipline</th>
                                <th style="width: 14%;">Sub-Discipline</th>
                                <th style="width: 28%;">Defect Description / Observation</th>
                                <th style="width: 14%;">Specific Location</th>
                                <th style="width: 14%;">Severity / Category</th>
                                <th style="width: 12%;">Date Logged</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${kpi3Logs.map((l, i) => `
                                <tr>
                                    <td>${i + 1}</td>
                                    <td>${l.discipline || '-'}</td>
                                    <td>${l.subDiscipline || '-'}</td>
                                    <td><strong>${l.desc || l.defectDesc || '-'}</strong></td>
                                    <td>${l.loc || l.location || '-'}</td>
                                    <td><span class="status-badge ${l.sev === 'Critical' ? 'badge-red' : (l.sev === 'Major' ? 'badge-yellow' : 'badge-blue')}">${l.sev || l.category || 'Minor'}</span></td>
                                    <td>${formatTableDate(l.date || l.dateLogged) || '-'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }

        // KPI 4 Log Table
        if (options.logsKPI4 && kpi4Logs.length > 0) {
            html += `
                <div class="act-rep-audit-block">
                    <div class="act-rep-section-header">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span>⏱️</span>
                            <h3>Detailed Log: KPI 4 — Non-Conformance Reports (NCR) Tracking (${kpi4Logs.length} NCRs)</h3>
                        </div>
                    </div>
                    <table class="act-rep-audit-table">
                        <thead>
                            <tr>
                                <th style="width: 4%;">#</th>
                                <th style="width: 12%;">NCR No.</th>
                                <th style="width: 14%;">Discipline</th>
                                <th style="width: 26%;">Non-Conformance Issue</th>
                                <th style="width: 10%;">Date Issued</th>
                                <th style="width: 10%;">Date Closed</th>
                                <th style="width: 12%;">Duration (Days)</th>
                                <th style="width: 12%;">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${kpi4Logs.map((l, i) => {
                                const dur = parseFloat(l.duration) || 0;
                                return `
                                    <tr>
                                        <td>${i + 1}</td>
                                        <td><strong>${l.ncrNo || `NCR-${i + 1}`}</strong></td>
                                        <td>${l.discipline || '-'}</td>
                                        <td>${l.issue || l.desc || '-'}</td>
                                        <td>${formatTableDate(l.dateIssued) || '-'}</td>
                                        <td>${formatTableDate(l.dateClosed) || '-'}</td>
                                        <td><strong>${dur.toFixed(0)} Days</strong></td>
                                        <td><span class="status-badge ${l.status === 'Closed' || l.status === 'Rectified' ? 'badge-green' : 'badge-red'}">${l.status || 'Open'}</span></td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }

        // KPI 5 Log Table
        if (options.logsKPI5 && kpi5Logs.length > 0) {
            html += `
                <div class="act-rep-audit-block">
                    <div class="act-rep-section-header">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span>📋</span>
                            <h3>Detailed Log: KPI 5 — Handover Snag &amp; Punch List Records (${kpi5Logs.length} Items)</h3>
                        </div>
                    </div>
                    <table class="act-rep-audit-table">
                        <thead>
                            <tr>
                                <th style="width: 4%;">#</th>
                                <th style="width: 10%;">Item ID</th>
                                <th style="width: 14%;">Discipline</th>
                                <th style="width: 24%;">Snag Item Description</th>
                                <th style="width: 10%;">Category</th>
                                <th style="width: 12%;">Subcontractor</th>
                                <th style="width: 10%;">Target Date</th>
                                <th style="width: 10%;">Date Rectified</th>
                                <th style="width: 10%;">Clearance Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${kpi5Logs.map((l, i) => `
                                <tr>
                                    <td>${i + 1}</td>
                                    <td><strong>${l.itemNo || l.id || `PL-${i + 1}`}</strong></td>
                                    <td>${l.discipline || '-'}</td>
                                    <td>${l.desc || l.itemDesc || '-'}</td>
                                    <td><span class="status-badge ${l.cat === 'Critical' ? 'badge-red' : 'badge-yellow'}">${l.cat || 'Minor'}</span></td>
                                    <td>${l.sub || l.trade || l.contractor || '-'}</td>
                                    <td>${formatTableDate(l.targetDate) || '-'}</td>
                                    <td>${formatTableDate(l.actualDateRectified) || '-'}</td>
                                    <td><span class="status-badge ${l.status === 'Signed-off' || l.status === 'Closed' || l.status === 'Rectified' ? 'badge-green' : 'badge-red'}">${l.status || 'Open'}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }
    }

    // 4. Formal Sign-Off Section
    if (options.incSignoff) {
        html += `
            <div class="act-rep-signoff-grid">
                <div class="act-rep-signoff-box">
                    <div class="act-rep-signoff-role">Prepared &amp; Inspected By</div>
                    <div class="act-rep-signoff-line"></div>
                    <div class="act-rep-signoff-name">QA/QC Field Inspector</div>
                    <div class="act-rep-signoff-title">Site Quality Assurance Unit</div>
                </div>
                <div class="act-rep-signoff-box">
                    <div class="act-rep-signoff-role">Verified &amp; Concurred By</div>
                    <div class="act-rep-signoff-line"></div>
                    <div class="act-rep-signoff-name">Project Manager / Lead Engineer</div>
                    <div class="act-rep-signoff-title">Project Management Office (PMO)</div>
                </div>
                <div class="act-rep-signoff-box">
                    <div class="act-rep-signoff-role">Executive Quality Approval</div>
                    <div class="act-rep-signoff-line"></div>
                    <div class="act-rep-signoff-name">Corporate QA/QC Director</div>
                    <div class="act-rep-signoff-title">FCLaranang Corporate Quality Division</div>
                </div>
            </div>
        `;
    }

    // Inject compiled HTML into document container
    docContainer.innerHTML = html;

    // Render Charts into DOM elements if charts enabled
    if (options.incCharts) {
        const targetProjArray = [proj];

        const box1 = document.getElementById("actRepChart_kpi1");
        if (box1 && kpi1Logs.length > 0) {
            renderKPI1ComboChart(box1, kpi1Logs, true, box1.closest(".act-rep-chart-card"), targetProjArray, timeRange);
        }

        const box2 = document.getElementById("actRepChart_kpi2");
        if (box2 && kpi2Logs.length > 0) {
            renderCompiledKPI2CumulativeGraph(box2, kpi2Logs, targetProjArray, timeRange, box2.closest(".act-rep-chart-card"));
        }

        const box3 = document.getElementById("actRepChart_kpi3");
        if (box3 && kpi3Logs.length > 0) {
            renderKPI3ComboChart(box3, kpi3Logs, true, box3.closest(".act-rep-chart-card"), targetProjArray, timeRange);
        }

        const box4 = document.getElementById("actRepChart_kpi4");
        if (box4 && kpi4Logs.length > 0) {
            kpi4Logs.sort((a, b) => new Date(a.dateIssued || "2026-01-01") - new Date(b.dateIssued || "2026-01-01"));
            renderGenericLineChart(box4, kpi4Logs, item => ({
                date: item.dateIssued || "2026-01-01",
                valReq: parseFloat(item.duration) || 0,
                valAct: null,
                benchVal: 7
            }), "NCR Duration (Days)", null, null, "act_kpi4");
        }

        const box5 = document.getElementById("actRepChart_kpi5");
        if (box5 && kpi5Logs.length > 0) {
            const kpi5Mode = appState.graphSettings?.kpi5?.viewMode || "burndown";
            if (kpi5Mode === "discipline") {
                renderKPI5StackedBarChart(box5, kpi5Logs);
            } else if (kpi5Mode === "targetSchedule") {
                renderKPI5TargetScheduleChart(box5, kpi5Logs);
            } else {
                renderKPI5BurnDownChart(box5, kpi5Logs);
            }
        }
    }
}

// ==========================================================================
// 💾 LOAD / SAVE TAB INTERACTIVE CONTROLLERS
// ==========================================================================

function triggerJsonLoadFromTab() {
    const input = document.getElementById("tabJsonFileInput");
    if (input) {
        input.value = "";
        input.click();
    }
}

function handleJsonFileSelected(event) {
    const file = event.target.files[0];
    if (!file) return;

    const mode = document.querySelector('input[name="jsonLoadMode"]:checked')?.value || "merge";
    const isMerge = mode === "merge";

    if (!isMerge) {
        const ok = confirm(`⚠️ WARNING: Clear & Overwrite All Workspace Data?\n\nAre you sure you want to completely erase current project data and restore from "${file.name}"?`);
        if (!ok) {
            event.target.value = "";
            return;
        }
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (imported && imported.projects) {
                if (isMerge) {
                    // Merge projects
                    Object.keys(imported.projects).forEach(pId => {
                        if (!appState.projects[pId]) {
                            appState.projects[pId] = imported.projects[pId];
                        } else {
                            const curP = appState.projects[pId];
                            const impP = imported.projects[pId];
                            
                            // Merge baseline metadata if missing
                            if (!curP.baseline && impP.baseline) curP.baseline = impP.baseline;
                            
                            // Merge KPI logs ensuring unique IDs
                            const mergeLogs = (curLogs, newLogs) => {
                                const existingIds = new Set((curLogs || []).map(l => l.id));
                                (newLogs || []).forEach(nl => {
                                    if (!existingIds.has(nl.id)) {
                                        curLogs.push(nl);
                                    }
                                });
                            };

                            if (!curP.kpi1_logs) curP.kpi1_logs = [];
                            if (!curP.kpi2_logs) curP.kpi2_logs = [];
                            if (!curP.kpi3_logs) curP.kpi3_logs = [];
                            if (!curP.kpi4_logs) curP.kpi4_logs = [];
                            if (!curP.kpi5_logs) curP.kpi5_logs = [];

                            mergeLogs(curP.kpi1_logs, impP.kpi1_logs);
                            mergeLogs(curP.kpi2_logs, impP.kpi2_logs);
                            mergeLogs(curP.kpi3_logs, impP.kpi3_logs);
                            mergeLogs(curP.kpi4_logs, impP.kpi4_logs);
                            mergeLogs(curP.kpi5_logs, impP.kpi5_logs);
                        }
                    });
                    alert(`🎉 Success! JSON data from "${file.name}" was MERGED into existing workspace projects!`);
                } else {
                    appState = imported;
                    alert(`🎉 Success! Current workspace was CLEARED and RESTORED from "${file.name}"!`);
                }

                if (imported.benchmarks) {
                    appState.benchmarks = imported.benchmarks;
                }
                syncRadarMetricConfigsWithBenchmarks();

                saveAppState();
                applyCurrentTheme();
                renderProjectSelector();
                loadActiveProjectData();
                calculateAllKPIs();
                recalculateAllSystemViews();
            } else {
                alert("Invalid JSON file format: Missing projects database structure.");
            }
        } catch (err) {
            alert("Error parsing JSON backup file: " + err.message);
        }
        event.target.value = "";
    };
    reader.readAsText(file);
}

function triggerExcelLoadFromTab() {
    const input = document.getElementById("tabExcelFileInput");
    if (input) {
        input.value = "";
        input.click();
    }
}

function handleExcelFileSelected(event) {
    const file = event.target.files[0];
    if (!file) return;

    const mode = document.querySelector('input[name="excelLoadMode"]:checked')?.value || "merge";

    if (mode === "new_project") {
        importExcelAsNewProject(event);
        return;
    }

    const isMerge = mode === "merge";
    const proj = appState.projects[appState.activeProjectId];
    if (!proj) {
        alert("No active project selected. Please select an active project first or choose 'Create as Brand New Project'.");
        event.target.value = "";
        return;
    }

    if (!isMerge) {
        const ok = confirm(`⚠️ WARNING: Clear Active Project Logs?\n\nAre you sure you want to clear all KPI records for "${proj.name}" and load new entries from "${file.name}"?`);
        if (!ok) {
            event.target.value = "";
            return;
        }
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const text = e.target.result;
            if (file.name.endsWith(".json")) {
                const imported = JSON.parse(text);
                if (imported && imported.projects) {
                    const sourceProj = imported.projects[appState.activeProjectId] || Object.values(imported.projects)[0];
                    if (sourceProj) {
                        if (!isMerge) {
                            proj.kpi1_logs = sourceProj.kpi1_logs || [];
                            proj.kpi2_logs = sourceProj.kpi2_logs || [];
                            proj.kpi3_logs = sourceProj.kpi3_logs || [];
                            proj.kpi4_logs = sourceProj.kpi4_logs || [];
                            proj.kpi5_logs = sourceProj.kpi5_logs || [];
                            alert(`🎉 Active project "${proj.name}" cleared and populated with data from "${file.name}"!`);
                        } else {
                            if (!proj.kpi1_logs) proj.kpi1_logs = [];
                            if (!proj.kpi2_logs) proj.kpi2_logs = [];
                            if (!proj.kpi3_logs) proj.kpi3_logs = [];
                            if (!proj.kpi4_logs) proj.kpi4_logs = [];
                            if (!proj.kpi5_logs) proj.kpi5_logs = [];

                            proj.kpi1_logs.push(...(sourceProj.kpi1_logs || []));
                            proj.kpi2_logs.push(...(sourceProj.kpi2_logs || []));
                            proj.kpi3_logs.push(...(sourceProj.kpi3_logs || []));
                            proj.kpi4_logs.push(...(sourceProj.kpi4_logs || []));
                            proj.kpi5_logs.push(...(sourceProj.kpi5_logs || []));
                            alert(`🎉 Data from "${file.name}" was successfully APPENDED into "${proj.name}"!`);
                        }
                    }
                }
            } else {
                // Parse CSV rows into KPI 1 FTQ logs as default tabular import
                const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
                if (lines.length > 1) {
                    if (!isMerge) {
                        proj.kpi1_logs = [];
                    }
                    if (!proj.kpi1_logs) proj.kpi1_logs = [];

                    for (let i = 1; i < lines.length; i++) {
                        const cols = lines[i].split(",").map(c => c.replace(/^"|"$/g, '').trim());
                        if (cols.length >= 2) {
                            proj.kpi1_logs.push({
                                id: "t_imp_" + i + "_" + Date.now(),
                                discipline: cols[0] || "Structural Works",
                                subDiscipline: cols[1] || "Concrete Works",
                                test: cols[2] || "Concrete Cylinder Compressive Strength Test (28-day)",
                                req: cols[3] || "fc' = 4,000 psi (27.5 MPa) min",
                                act: parseFloat(cols[4]) || 30,
                                dateCond: cols[5] || "",
                                dateRes: cols[6] || "",
                                quarter: cols[7] || "Q1",
                                remarks: cols[8] || "Pass"
                            });
                        }
                    }
                    const actionWord = isMerge ? "appended into" : "loaded into (clearing previous logs)";
                    alert(`🎉 Successfully parsed ${lines.length - 1} spreadsheet rows and ${actionWord} "${proj.name}"!`);
                }
            }

            saveAppState();
            loadActiveProjectData();
            calculateAllKPIs();
        } catch (err) {
            alert("Error importing spreadsheet: " + err.message);
        }
        event.target.value = "";
    };
    reader.readAsText(file);
}

function resetToFactoryPresetsPrompt() {
    const ok = confirm("⚠️ RESET TO FACTORY DEMO PRESETS?\n\nThis will restore the 3 default sample projects (Grand Horizon Heights, Metro Commercial Tower, Luzon Logistics & Industrial Warehouse) with full demonstration baseline and log entries.\n\nAny unsaved custom project data may be overwritten. Do you want to proceed?");
    if (!ok) return;

    appState.projects = JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
    appState.specs = JSON.parse(JSON.stringify(DEFAULT_SPECS_DICTIONARY));
    appState.activeProjectId = "proj_1";
    saveAppState();
    applyCurrentTheme();
    renderProjectSelector();
    loadActiveProjectData();
    calculateAllKPIs();
    alert("🎉 Workspace successfully reset to Factory Demo Presets!");
}

// ==========================================================================
// 💡 GRAPH COMPREHENSION & MATHEMATICAL BLUEPRINT ENGINE
// ==========================================================================

const comprehensionState = {
    selectedProjectId: null,
    selectedQuarter: "ALL"
};

function initComprehensionProjectSelector() {
    const select = document.getElementById("compProjectScopeSelect");
    if (!select) return;
    
    if (!comprehensionState.selectedProjectId || !appState.projects[comprehensionState.selectedProjectId]) {
        comprehensionState.selectedProjectId = appState.activeProjectId;
    }

    select.innerHTML = "";
    Object.values(appState.projects).forEach(proj => {
        const opt = document.createElement("option");
        opt.value = proj.id;
        opt.innerText = `${proj.name} (${proj.code || 'N/A'})`;
        if (proj.id === comprehensionState.selectedProjectId) {
            opt.selected = true;
        }
        select.appendChild(opt);
    });

    const qSelect = document.getElementById("compQuarterScopeSelect");
    if (qSelect && comprehensionState.selectedQuarter) {
        qSelect.value = comprehensionState.selectedQuarter;
    }
}

function onComprehensionProjectChange(projId) {
    comprehensionState.selectedProjectId = projId;
    renderGraphComprehensionTab();
}

function onComprehensionQuarterChange(quarter) {
    comprehensionState.selectedQuarter = quarter;
    renderGraphComprehensionTab();
}

function renderGraphComprehensionTab() {
    const projId = comprehensionState.selectedProjectId || appState.activeProjectId;
    const proj = appState.projects[projId];
    if (!proj) return;

    const quarter = comprehensionState.selectedQuarter || "ALL";

    // Update Tag
    const tagEl = document.getElementById("compLiveProjectTag");
    if (tagEl) {
        const qLabel = quarter === "ALL" ? "All Quarters / Annual YTD" : `Quarter: ${quarter}`;
        tagEl.innerText = `${proj.name} (${proj.code || 'N/A'}) — ${qLabel}`;
    }

    // 1. Radar Live Table
    renderComprehensionRadarTable(proj, quarter);

    // 2. KPI 1 Derivation Box
    renderComprehensionKPI1Card(proj, quarter);

    // 3. KPI 2 Derivation Box
    renderComprehensionKPI2Card(proj, quarter);

    // 4. KPI 3 Derivation Box
    renderComprehensionKPI3Card(proj, quarter);

    // 5. KPI 4 Derivation Box
    renderComprehensionKPI4Card(proj, quarter);

    // 6. KPI 5 Derivation Box
    renderComprehensionKPI5Card(proj, quarter);

    // 7. Initialize sandbox with active values if not already touched
    loadActiveProjectIntoSandbox(false);

    // 8. Re-typeset MathJax formulas if available
    if (window.MathJax && typeof window.MathJax.typesetPromise === "function") {
        window.MathJax.typesetPromise().catch(function (err) {
            console.warn("MathJax typesetting error: ", err);
        });
    }
}

function renderComprehensionRadarTable(proj, quarter) {
    const tbody = document.getElementById("compRadarLiveTableBody");
    if (!tbody) return;

    const scores = calculateQuarterlyNormalizedScores(proj, quarter);
    if (!scores) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-muted);">No project data available.</td></tr>`;
        return;
    }

    const qFilter = (q) => (!quarter || quarter === "ALL" || quarter === "FY") ? true : q === quarter;
    const budget = proj.budget || 1;
    const area = proj.area || 1;

    // KPI 1 calculations
    const kpi1Logs = (proj.kpi1_logs || []).filter(l => qFilter(l.quarter));
    const totalTests = kpi1Logs.length;
    let passedTests = 0;
    kpi1Logs.forEach(l => { if (l.remarks === "Pass") passedTests++; });
    const rawFTQ = totalTests > 0 ? (passedTests / totalTests) * 100 : 100;

    // KPI 2 calculations
    const kpi2Logs = (proj.kpi2_logs || []).filter(l => qFilter(l.quarter));
    let totalRework = 0, totalApproved = 0;
    kpi2Logs.forEach(l => {
        const qty = parseFloat(l.qty) || 1;
        const labor = parseFloat(l.labor) || 0;
        const mat = parseFloat(l.mat) || 0;
        totalRework += (labor + mat) * qty;
        totalApproved += (parseFloat(l.approvedCost) !== undefined && !isNaN(parseFloat(l.approvedCost)) ? parseFloat(l.approvedCost) : 0);
    });
    const reworkBasis = totalApproved > 0 ? totalApproved : budget;
    const rawRework = (totalRework / reworkBasis) * 100;

    // KPI 3 calculations
    const kpi3Logs = (proj.kpi3_logs || []).filter(l => qFilter(l.quarter));
    const totalDefects = kpi3Logs.length;
    const rawDensity = (totalDefects / area) * 100;

    // KPI 4 calculations
    const kpi4Logs = (proj.kpi4_logs || []).filter(l => qFilter(l.quarter));
    let closedNCR = 0, totalDays = 0, openNCR = 0;
    kpi4Logs.forEach(l => {
        if (l.status === "Closed" || l.status === "Resolved" || l.status === "Rectified") {
            closedNCR++;
            totalDays += parseFloat(l.duration) || 0;
        } else {
            openNCR++;
        }
    });
    const rawNCRDays = closedNCR > 0 ? (totalDays / closedNCR) : 0;

    // KPI 5 calculations
    const kpi5Logs = (proj.kpi5_logs || []).filter(l => qFilter(l.quarter));
    let critPunch = 0, minorPunch = 0, closedPunch = 0, overduePunch = 0;
    const nowMs = Date.now();
    kpi5Logs.forEach(l => {
        const isClosed = l.status === "Signed-off" || l.status === "Closed" || l.status === "Rectified";
        if (isClosed) {
            closedPunch++;
            if (l.targetDate && l.actualDateRectified && new Date(l.actualDateRectified).getTime() > new Date(l.targetDate).getTime()) overduePunch++;
        } else {
            if (l.cat === "Critical") critPunch++;
            else minorPunch++;
            if (l.targetDate && new Date(l.targetDate).getTime() < nowMs) overduePunch++;
        }
    });
    const totalPunch = kpi5Logs.length;
    const onTimeRate = totalPunch > 0 ? Math.max(0, Math.round(((totalPunch - overduePunch) / totalPunch) * 100)) : 100;

    const rows = [
        {
            name: "Axis 1: First-Time Pass Rate (FTQ)",
            target: "≥ 95.0%",
            raw: `${rawFTQ.toFixed(1)}% (${passedTests}/${totalTests} Passed)`,
            math: `S₁ = min(100, max(0, ${rawFTQ.toFixed(1)})) = ${scores.scoreFTQ.toFixed(1)}`,
            score: scores.scoreFTQ,
            threshold: 95,
            pass: scores.scoreFTQ >= 95
        },
        {
            name: "Axis 2: Quality Rework Cost Rate",
            target: "< 2.00% of Approved Cost",
            raw: `${rawRework.toFixed(2)}% (₱${totalRework.toLocaleString()} / ₱${reworkBasis.toLocaleString()})`,
            math: `S₂ = max(0, 100 - (${rawRework.toFixed(2)} × 25)) = ${scores.scoreRework.toFixed(1)}`,
            score: scores.scoreRework,
            threshold: 50,
            pass: scores.scoreRework >= 50
        },
        {
            name: "Axis 3: Defect Density",
            target: "< 2.00 per 100 m²",
            raw: `${rawDensity.toFixed(2)} (${totalDefects} defects / ${area.toLocaleString()} m²)`,
            math: `S₃ = max(0, 100 - (${rawDensity.toFixed(2)} × 20)) = ${scores.scoreDefects.toFixed(1)}`,
            score: scores.scoreDefects,
            threshold: 60,
            pass: scores.scoreDefects >= 60
        },
        {
            name: "Axis 4: NCR Resolution Time",
            target: "≤ 5.0–7.0 Days",
            raw: closedNCR > 0 ? `${rawNCRDays.toFixed(1)} Days (${closedNCR} Closed, ${openNCR} Open)` : `0 Days (0 Closed, ${openNCR} Open)`,
            math: rawNCRDays <= 5.0 ? `S₄ = 100.0 (≤ 5.0 Days)` : `S₄ = max(0, 100 - ((${rawNCRDays.toFixed(1)} - 5) × 15)) = ${scores.scoreNCR.toFixed(1)}`,
            score: scores.scoreNCR,
            threshold: 70,
            pass: scores.scoreNCR >= 70
        },
        {
            name: "Axis 5: Punch List Clearance",
            target: "100% On-Time (0 Critical)",
            raw: `${onTimeRate}% (${closedPunch}/${totalPunch} Cleared, ${critPunch} Crit, ${overduePunch} Overdue)`,
            math: critPunch === 0 ? `S₅ = max(60, min(100, ${onTimeRate})) = ${scores.scorePunch.toFixed(1)}` : `S₅ = max(0, min(50, ${onTimeRate} - (${critPunch} × 25))) = ${scores.scorePunch.toFixed(1)}`,
            score: scores.scorePunch,
            threshold: 75,
            pass: scores.scorePunch >= 75
        }
    ];

    let html = "";
    rows.forEach(r => {
        const badgeClass = r.pass ? "badge-green" : "badge-red";
        const badgeText = r.pass ? "PASS (COMPLIANT)" : "ACTION REQUIRED";
        html += `
            <tr>
                <td><strong>${escapeHtml(r.name)}</strong></td>
                <td><span class="info-tag">${escapeHtml(r.target)}</span></td>
                <td>${escapeHtml(r.raw)}</td>
                <td><code style="font-size: 11px; background: rgba(0,0,0,0.25); padding: 2px 5px; border-radius: 3px;">${escapeHtml(r.math)}</code></td>
                <td><strong style="color: ${r.pass ? '#10b981' : '#ef4444'}; font-size: 13px;">${r.score.toFixed(1)}</strong></td>
                <td>Score ≥ ${r.threshold}</td>
                <td><span class="status-badge ${badgeClass}" style="font-size: 10px;">${badgeText}</span></td>
            </tr>
        `;
    });

    const avgScore = (scores.scoreFTQ + scores.scoreRework + scores.scoreDefects + scores.scoreNCR + scores.scorePunch) / 5;
    const overallBadge = avgScore >= 90 ? "badge-green" : (avgScore >= 75 ? "badge-yellow" : "badge-red");
    const overallText = avgScore >= 90 ? "EXCELLENT QUALITY (PASS)" : (avgScore >= 75 ? "CONTROLLED COMPLIANCE" : "HIGH RISK (ACTION REQUIRED)");

    html += `
        <tr style="background: rgba(30, 58, 138, 0.2); font-weight: 700;">
            <td colspan="4" style="text-align: right; color: var(--text-primary);">🏆 COMPOSITE CORPORATE QUALITY INDEX:</td>
            <td><strong style="color: #38bdf8; font-size: 14px;">${avgScore.toFixed(1)}%</strong></td>
            <td>Avg Score ≥ 90%</td>
            <td><span class="status-badge ${overallBadge}" style="font-size: 10.5px;">${overallText}</span></td>
        </tr>
    `;

    tbody.innerHTML = html;
}

function renderComprehensionKPI1Card(proj, quarter) {
    const box = document.getElementById("compKpi1LiveDerivationBox");
    if (!box) return;

    const bm = getBenchmarkConfig();
    const qFilter = (q) => (!quarter || quarter === "ALL" || quarter === "FY") ? true : q === quarter;
    const kpi1Logs = (proj.kpi1_logs || []).filter(l => qFilter(l.quarter));
    const total = kpi1Logs.length;
    let passed = 0, failed = 0;
    kpi1Logs.forEach(l => {
        if (l.remarks === "Pass") passed++;
        else failed++;
    });
    const ftq = total > 0 ? (passed / total) * 100 : 100;
    const scoreFTQ = Math.max(0, Math.min(100, ftq));
    const passThreshold = parseFloat(bm.kpi1?.passThreshold) || 95.0;
    const critFloor = parseFloat(bm.kpi1?.criticalFloor) || 90.0;
    const isPass = ftq >= passThreshold;

    box.innerHTML = `
        <div style="font-size: 11px; font-weight: 700; color: #38bdf8; margin-bottom: 6px;">📊 Active Project Live Breakdown (${escapeHtml(quarter)}):</div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 8px; margin-bottom: 8px;">
            <div>Total Field Tests: <strong>${total}</strong></div>
            <div>Passed Tests [Blue]: <strong style="color: #60a5fa;">${passed}</strong></div>
            <div>Failed Tests [Red]: <strong style="color: #f87171;">${failed}</strong></div>
            <div>Raw FTQ Rate: <strong style="color: ${isPass ? '#10b981' : '#ef4444'}; font-size: 13px;">${ftq.toFixed(1)}%</strong></div>
        </div>
        <div style="font-size: 11px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 3px;">
            <div><strong>1. Field Measurement:</strong> <code>(${passed} Passed / ${total || 1} Total) × 100 = ${ftq.toFixed(1)}%</code></div>
            <div><strong>2. Quality Score Derivation:</strong> <code>Score = 1:1 direct scale = ${scoreFTQ.toFixed(1)} / 100</code> &nbsp;—&nbsp; <span class="status-badge ${scoreFTQ >= passThreshold ? 'badge-green' : (scoreFTQ >= critFloor ? 'badge-yellow' : 'badge-red')}" style="font-size: 9.5px;">${scoreFTQ >= passThreshold ? 'OPTIMAL (≥ ' + passThreshold.toFixed(1) + '%)' : (scoreFTQ >= critFloor ? 'TOLERABLE (≥ ' + critFloor.toFixed(1) + '%)' : 'CRITICAL BREACH (< ' + critFloor.toFixed(1) + '%)')}</span></div>
        </div>
    `;
}

function renderComprehensionKPI2Card(proj, quarter) {
    const box = document.getElementById("compKpi2LiveDerivationBox");
    if (!box) return;

    const bm = getBenchmarkConfig();
    const qFilter = (q) => (!quarter || quarter === "ALL" || quarter === "FY") ? true : q === quarter;
    const kpi2Logs = (proj.kpi2_logs || []).filter(l => qFilter(l.quarter));
    const budget = proj.budget || 1;

    let reworkCost = 0, approvedCost = 0;
    kpi2Logs.forEach(l => {
        const qty = parseFloat(l.qty) || 1;
        const labor = parseFloat(l.labor) || 0;
        const mat = parseFloat(l.mat) || 0;
        reworkCost += (labor + mat) * qty;
        approvedCost += (parseFloat(l.approvedCost) !== undefined && !isNaN(parseFloat(l.approvedCost)) ? parseFloat(l.approvedCost) : 0);
    });
    const reworkBasis = approvedCost > 0 ? approvedCost : budget;
    const reworkRate = (reworkCost / reworkBasis) * 100;
    const kpi2Mult = parseFloat(bm.kpi2?.penaltyMultiplier) || 25.0;
    const scoreRework = Math.max(0, Math.min(100, 100 - (reworkRate * kpi2Mult)));
    const cumRate = (reworkCost / budget) * 100;
    const passThreshold = parseFloat(bm.kpi2?.passThreshold) || 50.0;
    const targetLimit = parseFloat(bm.kpi2?.target) || 1.0;
    const maxLimit = parseFloat(bm.kpi2?.maxLimit) || 2.0;

    box.innerHTML = `
        <div style="font-size: 11px; font-weight: 700; color: #38bdf8; margin-bottom: 6px;">📊 Active Project Live Breakdown (${escapeHtml(quarter)}):</div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 8px; margin-bottom: 8px;">
            <div>Total Rework Cost: <strong style="color: #f87171;">₱${reworkCost.toLocaleString()}</strong></div>
            <div>Approved Item Cost: <strong>₱${reworkBasis.toLocaleString()}</strong></div>
            <div>Raw Rework Rate: <strong style="color: ${reworkRate <= targetLimit ? '#10b981' : (reworkRate <= maxLimit ? '#f59e0b' : '#ef4444')};">${reworkRate.toFixed(2)}%</strong></div>
            <div>Cum Budget Rate: <strong style="color: #2563eb;">${cumRate.toFixed(2)}%</strong> of ₱${budget.toLocaleString()}</div>
        </div>
        <div style="font-size: 11px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 3px;">
            <div><strong>1. Field Measurement:</strong> <code>(₱${reworkCost.toLocaleString()} Rework / ₱${reworkBasis.toLocaleString()} Approved) × 100 = ${reworkRate.toFixed(2)}%</code></div>
            <div><strong>2. Quality Score Derivation:</strong> <code>Score = 100 - (${reworkRate.toFixed(2)}% × ${kpi2Mult.toFixed(1)} constant) = 100 - ${(reworkRate * kpi2Mult).toFixed(1)} = ${scoreRework.toFixed(1)} / 100</code> &nbsp;—&nbsp; <span class="status-badge ${scoreRework >= passThreshold ? 'badge-green' : 'badge-red'}" style="font-size: 9.5px;">${scoreRework >= passThreshold ? 'CONTROLLED (Score ≥ ' + passThreshold.toFixed(0) + ')' : 'BUDGET BREACH (Score < ' + passThreshold.toFixed(0) + ')'}</span></div>
        </div>
    `;
}

function renderComprehensionKPI3Card(proj, quarter) {
    const box = document.getElementById("compKpi3LiveDerivationBox");
    if (!box) return;

    const bm = getBenchmarkConfig();
    const qFilter = (q) => (!quarter || quarter === "ALL" || quarter === "FY") ? true : q === quarter;
    const kpi3Logs = (proj.kpi3_logs || []).filter(l => qFilter(l.quarter));
    const totalDefects = kpi3Logs.length;
    const area = proj.area || 1;
    const areaGrid = parseFloat(bm.kpi3?.areaGrid) || 100.0;
    const density = (totalDefects / area) * areaGrid;
    const kpi3Mult = parseFloat(bm.kpi3?.penaltyMultiplier) || 20.0;
    const scoreDefects = Math.max(0, Math.min(100, 100 - (density * kpi3Mult)));
    const passThreshold = parseFloat(bm.kpi3?.passThreshold) || 60.0;
    const maxLimit = parseFloat(bm.kpi3?.maxLimit) || 2.0;
    const isPass = density <= maxLimit;

    box.innerHTML = `
        <div style="font-size: 11px; font-weight: 700; color: #38bdf8; margin-bottom: 6px;">📊 Active Project Live Breakdown (${escapeHtml(quarter)}):</div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 8px; margin-bottom: 8px;">
            <div>Logged Defect Items: <strong>${totalDefects} items</strong></div>
            <div>Total Floor Area: <strong>${area.toLocaleString()} m²</strong></div>
            <div>Defect Density: <strong style="color: ${isPass ? '#10b981' : '#ef4444'}; font-size: 13px;">${density.toFixed(2)} / 100 m²</strong></div>
        </div>
        <div style="font-size: 11px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 3px;">
            <div><strong>1. Field Measurement:</strong> <code>(${totalDefects} Defects / ${area.toLocaleString()} m²) × ${areaGrid.toFixed(0)} = ${density.toFixed(2)} per 100 m²</code></div>
            <div><strong>2. Quality Score Derivation:</strong> <code>Score = 100 - (${density.toFixed(2)} × ${kpi3Mult.toFixed(1)} constant) = 100 - ${(density * kpi3Mult).toFixed(1)} = ${scoreDefects.toFixed(1)} / 100</code> &nbsp;—&nbsp; <span class="status-badge ${scoreDefects >= passThreshold ? 'badge-green' : 'badge-red'}" style="font-size: 9.5px;">${scoreDefects >= passThreshold ? 'COMPLIANT (Score ≥ ' + passThreshold.toFixed(0) + ')' : 'DENSITY BREACH (Score < ' + passThreshold.toFixed(0) + ')'}</span></div>
        </div>
    `;
}

function renderComprehensionKPI4Card(proj, quarter) {
    const box = document.getElementById("compKpi4LiveDerivationBox");
    if (!box) return;

    const bm = getBenchmarkConfig();
    const qFilter = (q) => (!quarter || quarter === "ALL" || quarter === "FY") ? true : q === quarter;
    const kpi4Logs = (proj.kpi4_logs || []).filter(l => qFilter(l.quarter));
    let closedNCR = 0, totalDays = 0, openNCR = 0;
    kpi4Logs.forEach(l => {
        if (l.status === "Closed" || l.status === "Resolved" || l.status === "Rectified") {
            closedNCR++;
            totalDays += parseFloat(l.duration) || 0;
        } else {
            openNCR++;
        }
    });
    const avgDays = closedNCR > 0 ? (totalDays / closedNCR) : 0;
    const targetSLA = parseFloat(bm.kpi4?.targetSLA) || 5.0;
    const kpi4Mult = parseFloat(bm.kpi4?.penaltyMultiplier) || 15.0;
    const passThreshold = parseFloat(bm.kpi4?.passThreshold) || 70.0;
    const maxLimit = parseFloat(bm.kpi4?.maxLimit) || 7.0;

    let scoreNCR = 100;
    let scoreDerivationMath = "";
    if (avgDays <= targetSLA) {
        scoreNCR = 100;
        scoreDerivationMath = `Score = 100.0 (Average ${avgDays.toFixed(1)}d is within ${targetSLA.toFixed(1)}-day SLA baseline)`;
    } else {
        scoreNCR = Math.max(0, Math.min(100, 100 - ((avgDays - targetSLA) * kpi4Mult)));
        scoreDerivationMath = `Score = 100 - ((${avgDays.toFixed(1)}d - ${targetSLA.toFixed(1)}d) × ${kpi4Mult.toFixed(1)} constant) = 100 - ${((avgDays - targetSLA) * kpi4Mult).toFixed(1)} = ${scoreNCR.toFixed(1)} / 100`;
    }
    const isPass = avgDays <= maxLimit;

    box.innerHTML = `
        <div style="font-size: 11px; font-weight: 700; color: #38bdf8; margin-bottom: 6px;">📊 Active Project Live Breakdown (${escapeHtml(quarter)}):</div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 8px; margin-bottom: 8px;">
            <div>Total NCRs Issued: <strong>${kpi4Logs.length}</strong></div>
            <div>Closed / Resolved: <strong style="color: #10b981;">${closedNCR}</strong></div>
            <div>Open / Pending: <strong style="color: #f87171;">${openNCR}</strong></div>
            <div>Average Turnaround: <strong style="color: ${isPass ? '#10b981' : '#ef4444'}; font-size: 13px;">${avgDays.toFixed(1)} Days</strong></div>
        </div>
        <div style="font-size: 11px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 3px;">
            <div><strong>1. Field Measurement:</strong> <code>${totalDays} Total Cumulative Days / ${closedNCR || 1} Closed NCRs = ${avgDays.toFixed(1)} Days</code></div>
            <div><strong>2. Quality Score Derivation:</strong> <code>${scoreDerivationMath}</code> &nbsp;—&nbsp; <span class="status-badge ${scoreNCR >= passThreshold ? 'badge-green' : 'badge-red'}" style="font-size: 9.5px;">${scoreNCR >= passThreshold ? 'ON TARGET (Score ≥ ' + passThreshold.toFixed(0) + ')' : 'SLA BREACH (Score < ' + passThreshold.toFixed(0) + ')'}</span></div>
        </div>
    `;
}

function renderComprehensionKPI5Card(proj, quarter) {
    const box = document.getElementById("compKpi5LiveDerivationBox");
    if (!box) return;

    const bm = getBenchmarkConfig();
    const qFilter = (q) => (!quarter || quarter === "ALL" || quarter === "FY") ? true : q === quarter;
    const kpi5Logs = (proj.kpi5_logs || []).filter(l => qFilter(l.quarter));
    let critPunch = 0, minorPunch = 0, closedPunch = 0, overduePunch = 0;
    const nowMs = Date.now();
    kpi5Logs.forEach(l => {
        if (l.status === "Signed-off" || l.status === "Closed" || l.status === "Rectified") {
            closedPunch++;
            if (l.targetDate && l.actualDateRectified && new Date(l.actualDateRectified).getTime() > new Date(l.targetDate).getTime()) overduePunch++;
        } else {
            if (l.cat === "Critical") critPunch++;
            else minorPunch++;
            if (l.targetDate && new Date(l.targetDate).getTime() < nowMs) overduePunch++;
        }
    });
    const totalPunch = kpi5Logs.length;
    const onTimeRate = totalPunch > 0 ? Math.max(0, Math.round(((totalPunch - overduePunch) / totalPunch) * 100)) : 100;
    const critCap = parseFloat(bm.kpi5?.criticalCap) !== undefined ? parseFloat(bm.kpi5?.criticalCap) : 50.0;
    const critDed = parseFloat(bm.kpi5?.criticalDeductor) !== undefined ? parseFloat(bm.kpi5?.criticalDeductor) : 25.0;
    const passThreshold = parseFloat(bm.kpi5?.passThreshold) || 75.0;

    let scorePunch = 100;
    let scoreDerivationMath = "";
    if (critPunch === 0) {
        scorePunch = Math.max(60, Math.min(100, onTimeRate));
        scoreDerivationMath = `Score = max(60, min(100, ${onTimeRate}% on-time)) = ${scorePunch.toFixed(1)} / 100 (0 Critical Snags — Direct Rate)`;
    } else {
        scorePunch = Math.max(0, Math.min(critCap, onTimeRate - (critPunch * critDed)));
        scoreDerivationMath = `Score = max(0, min(${critCap.toFixed(0)}, ${onTimeRate}% - (${critPunch} Crit × ${critDed.toFixed(0)}))) = ${scorePunch.toFixed(1)} / 100 (Capped at max ${critCap.toFixed(0)} due to open critical snags)`;
    }
    const isReady = critPunch === 0 && scorePunch >= passThreshold;

    box.innerHTML = `
        <div style="font-size: 11px; font-weight: 700; color: #38bdf8; margin-bottom: 6px;">📊 Active Project Live Breakdown (${escapeHtml(quarter)}):</div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 8px; margin-bottom: 8px;">
            <div>Total Punch Items: <strong>${totalPunch}</strong></div>
            <div>Signed-off / Cleared: <strong style="color: #10b981;">${closedPunch}</strong></div>
            <div>Open Minor Snags: <strong style="color: #fbbf24;">${minorPunch}</strong></div>
            <div>Open Critical Snags: <strong style="color: #ef4444; font-weight: 800;">${critPunch}</strong></div>
            <div>On-Time Clearance Rate: <strong style="color: #38bdf8; font-size: 13px;">${onTimeRate}%</strong></div>
        </div>
        <div style="font-size: 11px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 3px;">
            <div><strong>1. Field Measurement:</strong> <code>((${totalPunch} Total - ${overduePunch} Overdue) / ${totalPunch || 1}) × 100 = ${onTimeRate}%</code></div>
            <div><strong>2. Quality Score Derivation:</strong> <code>${scoreDerivationMath}</code> &nbsp;—&nbsp; <span class="status-badge ${isReady ? 'badge-green' : 'badge-red'}" style="font-size: 9.5px;">${critPunch === 0 ? 'TURNOVER PERMITTED (0 Critical)' : 'TURNOVER BLOCKED (' + critPunch + ' Critical Open)'}</span></div>
        </div>
    `;
}

function loadActiveProjectIntoSandbox(isUserClick) {
    const projId = comprehensionState.selectedProjectId || appState.activeProjectId;
    const proj = appState.projects[projId];
    if (!proj) return;

    const quarter = comprehensionState.selectedQuarter || "ALL";
    const qFilter = (q) => (!quarter || quarter === "ALL" || quarter === "FY") ? true : q === quarter;
    const budget = proj.budget || 1;
    const area = proj.area || 1;

    // KPI 1
    const kpi1Logs = (proj.kpi1_logs || []).filter(l => qFilter(l.quarter));
    const totalTests = kpi1Logs.length || 10;
    let passedTests = 0;
    kpi1Logs.forEach(l => { if (l.remarks === "Pass") passedTests++; });
    if (kpi1Logs.length === 0) passedTests = 9;

    // KPI 2
    const kpi2Logs = (proj.kpi2_logs || []).filter(l => qFilter(l.quarter));
    let reworkCost = 0, approvedCost = 0;
    kpi2Logs.forEach(l => {
        const qty = parseFloat(l.qty) || 1;
        const labor = parseFloat(l.labor) || 0;
        const mat = parseFloat(l.mat) || 0;
        reworkCost += (labor + mat) * qty;
        approvedCost += (parseFloat(l.approvedCost) !== undefined && !isNaN(parseFloat(l.approvedCost)) ? parseFloat(l.approvedCost) : 0);
    });
    if (reworkCost === 0) reworkCost = 125000;
    if (approvedCost === 0) approvedCost = proj.budget || 15000000;

    // KPI 3
    const kpi3Logs = (proj.kpi3_logs || []).filter(l => qFilter(l.quarter));
    const defectCount = kpi3Logs.length || 15;
    const inspectedArea = area || 1000;

    // KPI 4
    const kpi4Logs = (proj.kpi4_logs || []).filter(l => qFilter(l.quarter));
    let closedNCR = 0, totalDays = 0;
    kpi4Logs.forEach(l => {
        if (l.status === "Closed" || l.status === "Resolved") {
            closedNCR++;
            totalDays += parseFloat(l.duration) || 0;
        }
    });
    const avgDays = closedNCR > 0 ? (totalDays / closedNCR) : 4.5;

    // KPI 5
    const kpi5Logs = (proj.kpi5_logs || []).filter(l => qFilter(l.quarter));
    let critPunch = 0, closedPunch = 0, overduePunch = 0;
    const nowMs = Date.now();
    kpi5Logs.forEach(l => {
        if (l.status === "Signed-off" || l.status === "Closed") {
            closedPunch++;
            if (l.targetDate && l.actualDateRectified && new Date(l.actualDateRectified).getTime() > new Date(l.targetDate).getTime()) overduePunch++;
        } else {
            if (l.cat === "Critical") critPunch++;
            if (l.targetDate && new Date(l.targetDate).getTime() < nowMs) overduePunch++;
        }
    });
    const totalPunch = kpi5Logs.length || 10;
    const onTimeRate = totalPunch > 0 ? Math.max(0, Math.round(((totalPunch - overduePunch) / totalPunch) * 100)) : 95;

    const elFtqPassed = document.getElementById("sb_ftq_passed");
    const elFtqTotal = document.getElementById("sb_ftq_total");
    const elReworkCost = document.getElementById("sb_rework_cost");
    const elApprovedCost = document.getElementById("sb_approved_cost");
    const elDefectCount = document.getElementById("sb_defect_count");
    const elInspectedArea = document.getElementById("sb_inspected_area");
    const elNcrDays = document.getElementById("sb_ncr_days");
    const elPunchOntime = document.getElementById("sb_punch_ontime");
    const elPunchCrit = document.getElementById("sb_punch_crit");

    if (elFtqPassed) elFtqPassed.value = passedTests;
    if (elFtqTotal) elFtqTotal.value = totalTests;
    if (elReworkCost) elReworkCost.value = formatPeso(reworkCost);
    if (elApprovedCost) elApprovedCost.value = formatPeso(approvedCost);
    if (elDefectCount) elDefectCount.value = defectCount;
    if (elInspectedArea) elInspectedArea.value = inspectedArea;
    if (elNcrDays) elNcrDays.value = avgDays.toFixed(1);
    if (elPunchOntime) elPunchOntime.value = onTimeRate;
    if (elPunchCrit) elPunchCrit.value = critPunch;

    recalculateSandbox();

    if (isUserClick) {
        alert(`🔄 Synced Sandbox numbers from "${proj.name}" (${quarter})!`);
    }
}

function recalculateSandbox() {
    const bm = getBenchmarkConfig();
    const passed = parseFloat(document.getElementById("sb_ftq_passed")?.value) || 0;
    const totalTests = Math.max(1, parseFloat(document.getElementById("sb_ftq_total")?.value) || 1);
    const reworkCost = parsePeso(document.getElementById("sb_rework_cost")?.value);
    const approvedCost = Math.max(1, parsePeso(document.getElementById("sb_approved_cost")?.value) || 1);
    const defects = parseFloat(document.getElementById("sb_defect_count")?.value) || 0;
    const area = Math.max(1, parseFloat(document.getElementById("sb_inspected_area")?.value) || 1);
    const ncrDays = Math.max(0, parseFloat(document.getElementById("sb_ncr_days")?.value) || 0);
    const punchOntime = Math.max(0, Math.min(100, parseFloat(document.getElementById("sb_punch_ontime")?.value) || 0));
    const punchCrit = Math.max(0, parseInt(document.getElementById("sb_punch_crit")?.value) || 0);

    // Dynamic Benchmarks
    const kpi2Mult = parseFloat(bm.kpi2?.penaltyMultiplier) || 25.0;
    const kpi3Mult = parseFloat(bm.kpi3?.penaltyMultiplier) || 20.0;
    const areaGrid = parseFloat(bm.kpi3?.areaGrid) || 100.0;
    const targetSLA = parseFloat(bm.kpi4?.targetSLA) || 5.0;
    const kpi4Mult = parseFloat(bm.kpi4?.penaltyMultiplier) || 15.0;
    const critCap = parseFloat(bm.kpi5?.criticalCap) !== undefined ? parseFloat(bm.kpi5?.criticalCap) : 50.0;
    const critDed = parseFloat(bm.kpi5?.criticalDeductor) !== undefined ? parseFloat(bm.kpi5?.criticalDeductor) : 25.0;

    // Calculations
    const rawFTQ = Math.min(100, (passed / totalTests) * 100);
    const scoreFTQ = Math.max(0, Math.min(100, rawFTQ));

    const rawRework = (reworkCost / approvedCost) * 100;
    const scoreRework = Math.max(0, Math.min(100, 100 - (rawRework * kpi2Mult)));

    const rawDensity = (defects / area) * areaGrid;
    const scoreDefects = Math.max(0, Math.min(100, 100 - (rawDensity * kpi3Mult)));

    let scoreNCR = 100;
    if (ncrDays <= targetSLA) scoreNCR = 100;
    else scoreNCR = Math.max(0, Math.min(100, 100 - ((ncrDays - targetSLA) * kpi4Mult)));

    let scorePunch = 100;
    if (punchCrit === 0) {
        scorePunch = Math.max(60, Math.min(100, punchOntime));
    } else {
        scorePunch = Math.max(0, Math.min(critCap, punchOntime - (punchCrit * critDed)));
    }

    const w = bm.weights || { kpi1: 20, kpi2: 20, kpi3: 20, kpi4: 20, kpi5: 20 };
    const totalW = (w.kpi1 + w.kpi2 + w.kpi3 + w.kpi4 + w.kpi5) || 100;
    const overallScore = ((scoreFTQ * w.kpi1) + (scoreRework * w.kpi2) + (scoreDefects * w.kpi3) + (scoreNCR * w.kpi4) + (scorePunch * w.kpi5)) / totalW;

    // Update KPI 1
    const resFtqRaw = document.getElementById("sb_res_ftq_raw");
    const resFtqScore = document.getElementById("sb_res_ftq_score");
    const resFtqMath = document.getElementById("sb_res_ftq_math");
    if (resFtqRaw) resFtqRaw.innerText = `${rawFTQ.toFixed(1)}%`;
    if (resFtqScore) resFtqScore.innerText = `Score: ${scoreFTQ.toFixed(1)} / 100`;
    if (resFtqMath) resFtqMath.innerText = `Math: (${passed} / ${totalTests}) × 100 = ${rawFTQ.toFixed(1)}%`;

    // Update KPI 2
    const resReworkRaw = document.getElementById("sb_res_rework_raw");
    const resReworkScore = document.getElementById("sb_res_rework_score");
    const resReworkMath = document.getElementById("sb_res_rework_math");
    if (resReworkRaw) resReworkRaw.innerText = `${rawRework.toFixed(2)}%`;
    if (resReworkScore) resReworkScore.innerText = `Score: ${scoreRework.toFixed(1)} / 100`;
    if (resReworkMath) resReworkMath.innerText = `Math: (${formatPeso(reworkCost)} / ${formatPeso(approvedCost)}) × 100 = ${rawRework.toFixed(2)}% | Score: 100 - (${rawRework.toFixed(2)} × ${kpi2Mult.toFixed(1)}) = ${scoreRework.toFixed(1)}`;

    // Update KPI 3
    const resDefectRaw = document.getElementById("sb_res_defect_raw");
    const resDefectScore = document.getElementById("sb_res_defect_score");
    const resDefectMath = document.getElementById("sb_res_defect_math");
    if (resDefectRaw) resDefectRaw.innerText = `${rawDensity.toFixed(2)} / 100m²`;
    if (resDefectScore) resDefectScore.innerText = `Score: ${scoreDefects.toFixed(1)} / 100`;
    if (resDefectMath) resDefectMath.innerText = `Math: 100 - (${rawDensity.toFixed(2)} × ${kpi3Mult.toFixed(1)}) = ${scoreDefects.toFixed(1)}`;

    // Update KPI 4
    const resNcrRaw = document.getElementById("sb_res_ncr_raw");
    const resNcrScore = document.getElementById("sb_res_ncr_score");
    const resNcrMath = document.getElementById("sb_res_ncr_math");
    if (resNcrRaw) resNcrRaw.innerText = `${ncrDays.toFixed(1)} Days`;
    if (resNcrScore) resNcrScore.innerText = `Score: ${scoreNCR.toFixed(1)} / 100`;
    if (resNcrMath) resNcrMath.innerText = ncrDays <= targetSLA ? `Math: ≤ ${targetSLA.toFixed(1)}d = 100.0` : `Math: 100 - ((${ncrDays.toFixed(1)} - ${targetSLA.toFixed(1)}) × ${kpi4Mult.toFixed(1)}) = ${scoreNCR.toFixed(1)}`;

    // Update KPI 5
    const resPunchRaw = document.getElementById("sb_res_punch_raw");
    const resPunchScore = document.getElementById("sb_res_punch_score");
    const resPunchMath = document.getElementById("sb_res_punch_math");
    if (resPunchRaw) resPunchRaw.innerText = `${punchOntime}% (${punchCrit} Crit)`;
    if (resPunchScore) resPunchScore.innerText = `Score: ${scorePunch.toFixed(1)} / 100`;
    if (resPunchMath) resPunchMath.innerText = punchCrit === 0 ? `Math: 0 Crit = On-Time % = ${scorePunch.toFixed(1)}` : `Math: ${punchOntime} - (${punchCrit} × ${critDed.toFixed(0)}) capped at ${critCap.toFixed(0)} = ${scorePunch.toFixed(1)}`;

    // Overall Banner
    const ovScore = document.getElementById("sb_overall_score");
    const ovBadge = document.getElementById("sb_overall_badge");
    const ovText = document.getElementById("sb_overall_derivation_text");

    const tierA = bm.tiers?.tierA || 90.0;
    const tierB = bm.tiers?.tierB || 75.0;

    if (ovScore) {
        ovScore.innerText = `${overallScore.toFixed(1)}%`;
        ovScore.style.color = overallScore >= tierA ? "#10b981" : (overallScore >= tierB ? "#f59e0b" : "#ef4444");
    }
    if (ovBadge) {
        ovBadge.className = `status-badge ${overallScore >= tierA ? 'badge-green' : (overallScore >= tierB ? 'badge-yellow' : 'badge-red')}`;
        ovBadge.innerText = overallScore >= tierA ? "EXCELLENT QUALITY (PASS)" : (overallScore >= tierB ? "CONTROLLED COMPLIANCE" : "HIGH RISK (ACTION REQUIRED)");
    }
    if (ovText) {
        ovText.innerText = `Derivation: Weighted average of 5 normalized scores: (${scoreFTQ.toFixed(1)}×${w.kpi1}% + ${scoreRework.toFixed(1)}×${w.kpi2}% + ${scoreDefects.toFixed(1)}×${w.kpi3}% + ${scoreNCR.toFixed(1)}×${w.kpi4}% + ${scorePunch.toFixed(1)}×${w.kpi5}%) / ${totalW}% = ${overallScore.toFixed(1)}%`;
    }
}

// ==========================================================================
// 🎯 CORPORATE QA/QC KPI BENCHMARK & GOVERNANCE MATRIX ENGINE
// ==========================================================================

function getBenchmarkConfig() {
    if (!appState.benchmarks) {
        appState.benchmarks = JSON.parse(JSON.stringify(DEFAULT_BENCHMARKS));
    }
    if (!appState.benchmarks.kpi1) appState.benchmarks.kpi1 = JSON.parse(JSON.stringify(DEFAULT_BENCHMARKS.kpi1));
    if (!appState.benchmarks.kpi2) appState.benchmarks.kpi2 = JSON.parse(JSON.stringify(DEFAULT_BENCHMARKS.kpi2));
    if (!appState.benchmarks.kpi3) appState.benchmarks.kpi3 = JSON.parse(JSON.stringify(DEFAULT_BENCHMARKS.kpi3));
    if (!appState.benchmarks.kpi4) appState.benchmarks.kpi4 = JSON.parse(JSON.stringify(DEFAULT_BENCHMARKS.kpi4));
    if (!appState.benchmarks.kpi5) appState.benchmarks.kpi5 = JSON.parse(JSON.stringify(DEFAULT_BENCHMARKS.kpi5));
    if (!appState.benchmarks.weights) appState.benchmarks.weights = JSON.parse(JSON.stringify(DEFAULT_BENCHMARKS.weights));
    if (!appState.benchmarks.tiers) appState.benchmarks.tiers = JSON.parse(JSON.stringify(DEFAULT_BENCHMARKS.tiers));
    return appState.benchmarks;
}

function syncRadarMetricConfigsWithBenchmarks() {
    const bm = getBenchmarkConfig();
    if (typeof RADAR_METRIC_CONFIGS !== 'undefined' && Array.isArray(RADAR_METRIC_CONFIGS) && RADAR_METRIC_CONFIGS.length >= 5) {
        RADAR_METRIC_CONFIGS[0].passThreshold = parseFloat(bm.kpi1.passThreshold) || 95;
        RADAR_METRIC_CONFIGS[0].targetDisplay = `Target ≥ ${parseFloat(bm.kpi1.target).toFixed(1)}%`;
        
        RADAR_METRIC_CONFIGS[1].passThreshold = parseFloat(bm.kpi2.passThreshold) || 50;
        RADAR_METRIC_CONFIGS[1].targetDisplay = `Target ≤ ${parseFloat(bm.kpi2.target).toFixed(2)}% (Max ${parseFloat(bm.kpi2.maxLimit).toFixed(2)}%)`;
        
        RADAR_METRIC_CONFIGS[2].passThreshold = parseFloat(bm.kpi3.passThreshold) || 60;
        RADAR_METRIC_CONFIGS[2].targetDisplay = `Target ≤ ${parseFloat(bm.kpi3.maxLimit).toFixed(2)} / 100m²`;
        
        RADAR_METRIC_CONFIGS[3].passThreshold = parseFloat(bm.kpi4.passThreshold) || 70;
        RADAR_METRIC_CONFIGS[3].targetDisplay = `Target ≤ ${parseFloat(bm.kpi4.targetSLA).toFixed(1)}–${parseFloat(bm.kpi4.maxLimit).toFixed(1)} Days`;
        
        RADAR_METRIC_CONFIGS[4].passThreshold = parseFloat(bm.kpi5.passThreshold) || 75;
        RADAR_METRIC_CONFIGS[4].targetDisplay = `${parseFloat(bm.kpi5.targetRate).toFixed(0)}% Clearance (0 Crit)`;
    }
}

function renderBenchmarkEditorTab() {
    const bm = getBenchmarkConfig();

    // Populate KPI 1
    const k1Target = document.getElementById("bm_kpi1_target");
    const k1Pass = document.getElementById("bm_kpi1_pass");
    const k1Floor = document.getElementById("bm_kpi1_floor");
    const k1Weight = document.getElementById("bm_kpi1_weight");
    if (k1Target) k1Target.value = bm.kpi1.target;
    if (k1Pass) k1Pass.value = bm.kpi1.passThreshold;
    if (k1Floor) k1Floor.value = bm.kpi1.criticalFloor;
    if (k1Weight) k1Weight.value = bm.weights?.kpi1 || 20;

    // Populate KPI 2
    const k2Target = document.getElementById("bm_kpi2_target");
    const k2Limit = document.getElementById("bm_kpi2_limit");
    const k2Pass = document.getElementById("bm_kpi2_pass");
    const k2Mult = document.getElementById("bm_kpi2_mult");
    const k2Floor = document.getElementById("bm_kpi2_floor");
    const k2Weight = document.getElementById("bm_kpi2_weight");
    if (k2Target) k2Target.value = bm.kpi2.target;
    if (k2Limit) k2Limit.value = bm.kpi2.maxLimit;
    if (k2Pass) k2Pass.value = bm.kpi2.passThreshold;
    if (k2Mult) k2Mult.value = bm.kpi2.penaltyMultiplier;
    if (k2Floor) k2Floor.value = bm.kpi2.zeroFloor;
    if (k2Weight) k2Weight.value = bm.weights?.kpi2 || 20;

    // Populate KPI 3
    const k3Target = document.getElementById("bm_kpi3_target");
    const k3Limit = document.getElementById("bm_kpi3_limit");
    const k3Pass = document.getElementById("bm_kpi3_pass");
    const k3Mult = document.getElementById("bm_kpi3_mult");
    const k3Floor = document.getElementById("bm_kpi3_floor");
    const k3Weight = document.getElementById("bm_kpi3_weight");
    if (k3Target) k3Target.value = bm.kpi3.target;
    if (k3Limit) k3Limit.value = bm.kpi3.maxLimit;
    if (k3Pass) k3Pass.value = bm.kpi3.passThreshold;
    if (k3Mult) k3Mult.value = bm.kpi3.penaltyMultiplier;
    if (k3Floor) k3Floor.value = bm.kpi3.zeroFloor;
    if (k3Weight) k3Weight.value = bm.weights?.kpi3 || 20;

    // Populate KPI 4
    const k4Sla = document.getElementById("bm_kpi4_sla");
    const k4Limit = document.getElementById("bm_kpi4_limit");
    const k4Pass = document.getElementById("bm_kpi4_pass");
    const k4Mult = document.getElementById("bm_kpi4_mult");
    const k4Hold = document.getElementById("bm_kpi4_hold");
    const k4Weight = document.getElementById("bm_kpi4_weight");
    if (k4Sla) k4Sla.value = bm.kpi4.targetSLA;
    if (k4Limit) k4Limit.value = bm.kpi4.maxLimit;
    if (k4Pass) k4Pass.value = bm.kpi4.passThreshold;
    if (k4Mult) k4Mult.value = bm.kpi4.penaltyMultiplier;
    if (k4Hold) k4Hold.value = bm.kpi4.billingHoldLimit;
    if (k4Weight) k4Weight.value = bm.weights?.kpi4 || 20;

    // Populate KPI 5
    const k5Target = document.getElementById("bm_kpi5_target");
    const k5Pass = document.getElementById("bm_kpi5_pass");
    const k5Cap = document.getElementById("bm_kpi5_cap");
    const k5Ded = document.getElementById("bm_kpi5_ded");
    const k5Weight = document.getElementById("bm_kpi5_weight");
    if (k5Target) k5Target.value = bm.kpi5.targetRate;
    if (k5Pass) k5Pass.value = bm.kpi5.passThreshold;
    if (k5Cap) k5Cap.value = bm.kpi5.criticalCap;
    if (k5Ded) k5Ded.value = bm.kpi5.criticalDeductor;
    if (k5Weight) k5Weight.value = bm.weights?.kpi5 || 20;

    // Populate Tiers
    const tA = document.getElementById("bm_tier_a");
    const tB = document.getElementById("bm_tier_b");
    const tC = document.getElementById("bm_tier_c");
    const tD = document.getElementById("bm_tier_d_display");
    if (tA) tA.value = bm.tiers?.tierA || 90.0;
    if (tB) tB.value = bm.tiers?.tierB || 75.0;
    if (tC) tC.value = bm.tiers?.tierC || 60.0;
    if (tD) tD.value = `< ${(bm.tiers?.tierC || 60.0).toFixed(1)}%`;

    updateBenchmarkPreviewsAndSimulation();
}

function onBenchmarkInputChange() {
    const k2Limit = parseFloat(document.getElementById("bm_kpi2_limit")?.value) || 2.0;
    const k2Pass = parseFloat(document.getElementById("bm_kpi2_pass")?.value) || 50.0;
    const k2Mult = document.getElementById("bm_kpi2_mult");
    if (k2Limit > 0 && k2Mult && document.activeElement !== k2Mult) {
        k2Mult.value = ((100.0 - k2Pass) / k2Limit).toFixed(1);
    }

    const k3Limit = parseFloat(document.getElementById("bm_kpi3_limit")?.value) || 2.0;
    const k3Pass = parseFloat(document.getElementById("bm_kpi3_pass")?.value) || 60.0;
    const k3Mult = document.getElementById("bm_kpi3_mult");
    if (k3Limit > 0 && k3Mult && document.activeElement !== k3Mult) {
        k3Mult.value = ((100.0 - k3Pass) / k3Limit).toFixed(1);
    }

    const k4Sla = parseFloat(document.getElementById("bm_kpi4_sla")?.value) || 5.0;
    const k4Limit = parseFloat(document.getElementById("bm_kpi4_limit")?.value) || 7.0;
    const k4Pass = parseFloat(document.getElementById("bm_kpi4_pass")?.value) || 70.0;
    const k4Mult = document.getElementById("bm_kpi4_mult");
    if (k4Limit > k4Sla && k4Mult && document.activeElement !== k4Mult) {
        k4Mult.value = ((100.0 - k4Pass) / (k4Limit - k4Sla)).toFixed(1);
    }

    const tC = parseFloat(document.getElementById("bm_tier_c")?.value) || 60.0;
    const tD = document.getElementById("bm_tier_d_display");
    if (tD) tD.value = `< ${tC.toFixed(1)}%`;

    updateBenchmarkPreviewsAndSimulation();
}

function onBenchmarkWeightChange() {
    updateBenchmarkPreviewsAndSimulation();
}

function getDraftBenchmarkConfig() {
    return {
        kpi1: {
            target: parseFloat(document.getElementById("bm_kpi1_target")?.value) || 95.0,
            passThreshold: parseFloat(document.getElementById("bm_kpi1_pass")?.value) || 95.0,
            criticalFloor: parseFloat(document.getElementById("bm_kpi1_floor")?.value) || 90.0,
            label: "First-Time Quality (FTQ %)",
            unit: "%"
        },
        kpi2: {
            target: parseFloat(document.getElementById("bm_kpi2_target")?.value) || 1.00,
            maxLimit: parseFloat(document.getElementById("bm_kpi2_limit")?.value) || 2.00,
            passThreshold: parseFloat(document.getElementById("bm_kpi2_pass")?.value) || 50.0,
            penaltyMultiplier: parseFloat(document.getElementById("bm_kpi2_mult")?.value) || 25.0,
            zeroFloor: parseFloat(document.getElementById("bm_kpi2_floor")?.value) || 4.00,
            label: "Quality Rework BOQ Rate",
            unit: "%"
        },
        kpi3: {
            target: parseFloat(document.getElementById("bm_kpi3_target")?.value) || 1.00,
            maxLimit: parseFloat(document.getElementById("bm_kpi3_limit")?.value) || 2.00,
            passThreshold: parseFloat(document.getElementById("bm_kpi3_pass")?.value) || 60.0,
            penaltyMultiplier: parseFloat(document.getElementById("bm_kpi3_mult")?.value) || 20.0,
            zeroFloor: parseFloat(document.getElementById("bm_kpi3_floor")?.value) || 5.00,
            areaGrid: 100,
            label: "Defect Density",
            unit: "defects/100m²"
        },
        kpi4: {
            targetSLA: parseFloat(document.getElementById("bm_kpi4_sla")?.value) || 5.0,
            maxLimit: parseFloat(document.getElementById("bm_kpi4_limit")?.value) || 7.0,
            passThreshold: parseFloat(document.getElementById("bm_kpi4_pass")?.value) || 70.0,
            penaltyMultiplier: parseFloat(document.getElementById("bm_kpi4_mult")?.value) || 15.0,
            billingHoldLimit: parseFloat(document.getElementById("bm_kpi4_hold")?.value) || 14.0,
            label: "NCR Resolution Velocity",
            unit: "days"
        },
        kpi5: {
            passThreshold: parseFloat(document.getElementById("bm_kpi5_pass")?.value) || 75.0,
            targetRate: parseFloat(document.getElementById("bm_kpi5_target")?.value) || 100.0,
            criticalCap: parseFloat(document.getElementById("bm_kpi5_cap")?.value) !== undefined ? parseFloat(document.getElementById("bm_kpi5_cap")?.value) : 50.0,
            criticalDeductor: parseFloat(document.getElementById("bm_kpi5_ded")?.value) !== undefined ? parseFloat(document.getElementById("bm_kpi5_ded")?.value) : 25.0,
            label: "Handover Punch List Clearance",
            unit: "%"
        },
        weights: {
            kpi1: parseFloat(document.getElementById("bm_kpi1_weight")?.value) || 20.0,
            kpi2: parseFloat(document.getElementById("bm_kpi2_weight")?.value) || 20.0,
            kpi3: parseFloat(document.getElementById("bm_kpi3_weight")?.value) || 20.0,
            kpi4: parseFloat(document.getElementById("bm_kpi4_weight")?.value) || 20.0,
            kpi5: parseFloat(document.getElementById("bm_kpi5_weight")?.value) || 20.0
        },
        tiers: {
            tierA: parseFloat(document.getElementById("bm_tier_a")?.value) || 90.0,
            tierB: parseFloat(document.getElementById("bm_tier_b")?.value) || 75.0,
            tierC: parseFloat(document.getElementById("bm_tier_c")?.value) || 60.0
        }
    };
}

function updateBenchmarkPreviewsAndSimulation() {
    const draft = getDraftBenchmarkConfig();
    const savedBM = getBenchmarkConfig();

    // 1. Update Preview Boxes
    const p1 = document.getElementById("bm_kpi1_preview");
    if (p1) {
        p1.innerHTML = `
            <div><strong>Scoring Rule:</strong> <code>Score = Direct 1:1 Scale</code></div>
            <div><strong>Pass Requirement:</strong> ≥ ${draft.kpi1.passThreshold.toFixed(1)}% &nbsp;|&nbsp; <strong>Stop-Pour Breach:</strong> &lt; ${draft.kpi1.criticalFloor.toFixed(1)}%</div>
        `;
    }

    const p2 = document.getElementById("bm_kpi2_preview");
    if (p2) {
        p2.innerHTML = `
            <div><strong>Scoring Rule:</strong> <code>Score = max(0, 100 - (Rework% × ${draft.kpi2.penaltyMultiplier.toFixed(1)}))</code></div>
            <div><strong>Target (${draft.kpi2.target.toFixed(2)}%):</strong> ${Math.max(0, 100 - (draft.kpi2.target * draft.kpi2.penaltyMultiplier)).toFixed(1)} pts &nbsp;|&nbsp; <strong>Max (${draft.kpi2.maxLimit.toFixed(2)}%):</strong> ${draft.kpi2.passThreshold.toFixed(1)} pts (Pass Threshold)</div>
        `;
    }

    const p3 = document.getElementById("bm_kpi3_preview");
    if (p3) {
        p3.innerHTML = `
            <div><strong>Scoring Rule:</strong> <code>Score = max(0, 100 - (Density × ${draft.kpi3.penaltyMultiplier.toFixed(1)}))</code></div>
            <div><strong>Target (${draft.kpi3.target.toFixed(2)}/100m²):</strong> ${Math.max(0, 100 - (draft.kpi3.target * draft.kpi3.penaltyMultiplier)).toFixed(1)} pts &nbsp;|&nbsp; <strong>Max (${draft.kpi3.maxLimit.toFixed(2)}):</strong> ${draft.kpi3.passThreshold.toFixed(1)} pts (Pass Threshold)</div>
        `;
    }

    const p4 = document.getElementById("bm_kpi4_preview");
    if (p4) {
        p4.innerHTML = `
            <div><strong>Scoring Rule:</strong> <code>≤ ${draft.kpi4.targetSLA.toFixed(1)}d = 100.0, else 100 - ((Days - ${draft.kpi4.targetSLA.toFixed(1)}d) × ${draft.kpi4.penaltyMultiplier.toFixed(1)})</code></div>
            <div><strong>At Max (${draft.kpi4.maxLimit.toFixed(1)}d):</strong> ${draft.kpi4.passThreshold.toFixed(1)} pts (Pass Threshold) &nbsp;|&nbsp; <strong>Billing Hold:</strong> &gt; ${draft.kpi4.billingHoldLimit.toFixed(0)} Days</div>
        `;
    }

    const p5 = document.getElementById("bm_kpi5_preview");
    if (p5) {
        p5.innerHTML = `
            <div><strong>Scoring Rule:</strong> <code>0 Crit = On-Time%, &gt;0 Crit = max(0, min(${draft.kpi5.criticalCap.toFixed(0)}, On-Time% - (Crit × ${draft.kpi5.criticalDeductor.toFixed(0)})))</code></div>
            <div><strong>Pass Requirement:</strong> ≥ ${draft.kpi5.passThreshold.toFixed(1)}% &nbsp;|&nbsp; <strong>Turnover Gatekeeper:</strong> Zero Open Criticals Required</div>
        `;
    }

    // 2. Update Total Weight Badge and Distribution Bar
    const w = draft.weights;
    const totalW = (w.kpi1 + w.kpi2 + w.kpi3 + w.kpi4 + w.kpi5) || 100;
    const weightBadge = document.getElementById("bmWeightTotalBadge");
    if (weightBadge) {
        weightBadge.innerText = `Total Weight: ${totalW.toFixed(0)}%`;
        if (Math.abs(totalW - 100) < 0.1) {
            weightBadge.className = "status-badge badge-green";
        } else {
            weightBadge.className = "status-badge badge-red";
            weightBadge.innerText = `Total Weight: ${totalW.toFixed(0)}% (Must equal 100%)`;
        }
    }

    const wb1 = document.getElementById("bm_wbar_kpi1");
    const wb2 = document.getElementById("bm_wbar_kpi2");
    const wb3 = document.getElementById("bm_wbar_kpi3");
    const wb4 = document.getElementById("bm_wbar_kpi4");
    const wb5 = document.getElementById("bm_wbar_kpi5");
    if (wb1) { wb1.style.width = `${(w.kpi1 / totalW) * 100}%`; wb1.title = `KPI 1: ${w.kpi1}%`; }
    if (wb2) { wb2.style.width = `${(w.kpi2 / totalW) * 100}%`; wb2.title = `KPI 2: ${w.kpi2}%`; }
    if (wb3) { wb3.style.width = `${(w.kpi3 / totalW) * 100}%`; wb3.title = `KPI 3: ${w.kpi3}%`; }
    if (wb4) { wb4.style.width = `${(w.kpi4 / totalW) * 100}%`; wb4.title = `KPI 4: ${w.kpi4}%`; }
    if (wb5) { wb5.style.width = `${(w.kpi5 / totalW) * 100}%`; wb5.title = `KPI 5: ${w.kpi5}%`; }

    // 3. Evaluate Active Project Live Simulation Comparison
    const proj = appState.projects[appState.activeProjectId];
    const simTag = document.getElementById("bmSimProjectTag");
    if (simTag && proj) {
        simTag.innerText = `${proj.name} (${proj.code || 'N/A'})`;
    }

    const tbody = document.getElementById("bmSimulationTableBody");
    if (!tbody || !proj) return;

    // Calculate Active Saved Scores vs Preview Draft Scores
    const budget = proj.budget || 1;
    const area = proj.area || 1;

    // KPI 1 Data
    const totalTests = (proj.kpi1_logs || []).length;
    let passedTests = 0;
    (proj.kpi1_logs || []).forEach(l => { if (l.remarks === "Pass") passedTests++; });
    const rawFTQ = totalTests > 0 ? (passedTests / totalTests) * 100 : 100;
    const activeScoreK1 = Math.max(0, Math.min(100, rawFTQ));
    const draftScoreK1 = Math.max(0, Math.min(100, rawFTQ));

    // KPI 2 Data
    let reworkCost = 0, approvedCost = 0;
    (proj.kpi2_logs || []).forEach(l => {
        const qty = parseFloat(l.qty) || 1;
        const labor = parseFloat(l.labor) || 0;
        const mat = parseFloat(l.mat) || 0;
        reworkCost += (labor + mat) * qty;
        approvedCost += (parseFloat(l.approvedCost) !== undefined && !isNaN(parseFloat(l.approvedCost)) ? parseFloat(l.approvedCost) : 0);
    });
    const reworkBasis = approvedCost > 0 ? approvedCost : budget;
    const rawRework = (reworkCost / reworkBasis) * 100;
    const activeScoreK2 = Math.max(0, Math.min(100, 100 - (rawRework * (parseFloat(savedBM.kpi2?.penaltyMultiplier) || 25))));
    const draftScoreK2 = Math.max(0, Math.min(100, 100 - (rawRework * draft.kpi2.penaltyMultiplier)));

    // KPI 3 Data
    const defectCount = (proj.kpi3_logs || []).length;
    const rawDensity = (defectCount / area) * (parseFloat(draft.kpi3.areaGrid) || 100);
    const activeScoreK3 = Math.max(0, Math.min(100, 100 - (rawDensity * (parseFloat(savedBM.kpi3?.penaltyMultiplier) || 20))));
    const draftScoreK3 = Math.max(0, Math.min(100, 100 - (rawDensity * draft.kpi3.penaltyMultiplier)));

    // KPI 4 Data
    let closedNCR = 0, totalNCRDays = 0, openNCR = 0;
    (proj.kpi4_logs || []).forEach(l => {
        if (l.status === "Closed" || l.status === "Resolved" || l.status === "Rectified") {
            closedNCR++;
            totalNCRDays += parseFloat(l.duration) || 0;
        } else {
            openNCR++;
        }
    });
    const rawAvgNCRDays = closedNCR > 0 ? (totalNCRDays / closedNCR) : 0;
    const activeScoreK4 = (proj.kpi4_logs || []).length === 0 || rawAvgNCRDays <= (savedBM.kpi4?.targetSLA || 5)
        ? 100 : Math.max(0, Math.min(100, 100 - ((rawAvgNCRDays - (savedBM.kpi4?.targetSLA || 5)) * (savedBM.kpi4?.penaltyMultiplier || 15))));
    const draftScoreK4 = (proj.kpi4_logs || []).length === 0 || rawAvgNCRDays <= draft.kpi4.targetSLA
        ? 100 : Math.max(0, Math.min(100, 100 - ((rawAvgNCRDays - draft.kpi4.targetSLA) * draft.kpi4.penaltyMultiplier)));

    // KPI 5 Data
    let critPunch = 0, overduePunch = 0;
    const nowMs = Date.now();
    (proj.kpi5_logs || []).forEach(l => {
        const isClosed = l.status === "Signed-off" || l.status === "Closed" || l.status === "Rectified";
        if (isClosed) {
            if (l.targetDate && l.actualDateRectified && new Date(l.actualDateRectified).getTime() > new Date(l.targetDate).getTime()) overduePunch++;
        } else {
            if (l.cat === "Critical") critPunch++;
            if (l.targetDate && new Date(l.targetDate).getTime() < nowMs) overduePunch++;
        }
    });
    const totalPunch = (proj.kpi5_logs || []).length;
    const onTimeRate = totalPunch > 0 ? Math.max(0, Math.round(((totalPunch - overduePunch) / totalPunch) * 100)) : 100;
    const activeScoreK5 = totalPunch === 0 ? 100 : (critPunch === 0 ? Math.max(60, Math.min(100, onTimeRate)) : Math.max(0, Math.min(savedBM.kpi5?.criticalCap || 50, onTimeRate - (critPunch * (savedBM.kpi5?.criticalDeductor || 25)))));
    const draftScoreK5 = totalPunch === 0 ? 100 : (critPunch === 0 ? Math.max(60, Math.min(100, onTimeRate)) : Math.max(0, Math.min(draft.kpi5.criticalCap, onTimeRate - (critPunch * draft.kpi5.criticalDeductor))));

    // Composite Indexes
    const activeTotalW = ((savedBM.weights?.kpi1 || 20) + (savedBM.weights?.kpi2 || 20) + (savedBM.weights?.kpi3 || 20) + (savedBM.weights?.kpi4 || 20) + (savedBM.weights?.kpi5 || 20));
    const activeIndex = ((activeScoreK1 * (savedBM.weights?.kpi1 || 20)) + (activeScoreK2 * (savedBM.weights?.kpi2 || 20)) + (activeScoreK3 * (savedBM.weights?.kpi3 || 20)) + (activeScoreK4 * (savedBM.weights?.kpi4 || 20)) + (activeScoreK5 * (savedBM.weights?.kpi5 || 20))) / activeTotalW;

    const draftIndex = ((draftScoreK1 * w.kpi1) + (draftScoreK2 * w.kpi2) + (draftScoreK3 * w.kpi3) + (draftScoreK4 * w.kpi4) + (draftScoreK5 * w.kpi5)) / totalW;

    const rows = [
        {
            pillar: "🧪 KPI 1: FTQ Testing",
            raw: `${rawFTQ.toFixed(1)}% (${passedTests}/${totalTests})`,
            savedStd: `≥ ${(savedBM.kpi1?.passThreshold || 95).toFixed(1)}% (Pass)`,
            activeScore: activeScoreK1,
            draftStd: `≥ ${draft.kpi1.passThreshold.toFixed(1)}% (Pass)`,
            draftScore: draftScoreK1,
            passThreshold: draft.kpi1.passThreshold
        },
        {
            pillar: "🔨 KPI 2: Rework BOQ Rate",
            raw: `${rawRework.toFixed(2)}% (${formatPeso(reworkCost)})`,
            savedStd: `≤ ${(savedBM.kpi2?.maxLimit || 2).toFixed(2)}% (Pass: ${(savedBM.kpi2?.passThreshold || 50).toFixed(0)})`,
            activeScore: activeScoreK2,
            draftStd: `≤ ${draft.kpi2.maxLimit.toFixed(2)}% (Pass: ${draft.kpi2.passThreshold.toFixed(0)})`,
            draftScore: draftScoreK2,
            passThreshold: draft.kpi2.passThreshold
        },
        {
            pillar: "📐 KPI 3: Defect Density",
            raw: `${rawDensity.toFixed(2)} / 100m² (${defectCount} snags)`,
            savedStd: `≤ ${(savedBM.kpi3?.maxLimit || 2).toFixed(2)} (Pass: ${(savedBM.kpi3?.passThreshold || 60).toFixed(0)})`,
            activeScore: activeScoreK3,
            draftStd: `≤ ${draft.kpi3.maxLimit.toFixed(2)} (Pass: ${draft.kpi3.passThreshold.toFixed(0)})`,
            draftScore: draftScoreK3,
            passThreshold: draft.kpi3.passThreshold
        },
        {
            pillar: "⏱️ KPI 4: NCR Resolution",
            raw: `${rawAvgNCRDays.toFixed(1)} Days (${closedNCR} closed)`,
            savedStd: `≤ ${(savedBM.kpi4?.maxLimit || 7).toFixed(1)}d (Pass: ${(savedBM.kpi4?.passThreshold || 70).toFixed(0)})`,
            activeScore: activeScoreK4,
            draftStd: `≤ ${draft.kpi4.maxLimit.toFixed(1)}d (Pass: ${draft.kpi4.passThreshold.toFixed(0)})`,
            draftScore: draftScoreK4,
            passThreshold: draft.kpi4.passThreshold
        },
        {
            pillar: "📋 KPI 5: Punch Clearance",
            raw: `${onTimeRate}% (${critPunch} Crit Open)`,
            savedStd: `≥ ${(savedBM.kpi5?.passThreshold || 75).toFixed(0)}% (0 Crit)`,
            activeScore: activeScoreK5,
            draftStd: `≥ ${draft.kpi5.passThreshold.toFixed(0)}% (0 Crit)`,
            draftScore: draftScoreK5,
            passThreshold: draft.kpi5.passThreshold
        }
    ];

    let html = "";
    rows.forEach(r => {
        const delta = r.draftScore - r.activeScore;
        const deltaSign = delta > 0 ? `+${delta.toFixed(1)}` : (delta < 0 ? `${delta.toFixed(1)}` : `0.0`);
        const deltaClass = delta > 0 ? "text-green" : (delta < 0 ? "text-red" : "");
        const isDraftPass = r.draftScore >= r.passThreshold;

        html += `
            <tr>
                <td><strong>${r.pillar}</strong></td>
                <td><span style="font-family:'Consolas',monospace; font-size:11px;">${r.raw}</span></td>
                <td><span style="font-size:11px; color:var(--text-muted);">${r.savedStd}</span></td>
                <td><strong>${r.activeScore.toFixed(1)} / 100</strong></td>
                <td><span style="font-size:11px; color:#38bdf8; font-weight:600;">${r.draftStd}</span></td>
                <td><strong style="color: #38bdf8; font-size: 13px;">${r.draftScore.toFixed(1)} / 100</strong></td>
                <td><span class="${deltaClass}" style="font-weight:700;">${deltaSign}</span></td>
                <td><span class="status-badge ${isDraftPass ? 'badge-green' : 'badge-red'}" style="font-size:10px;">${isDraftPass ? 'PASS' : 'FAIL'}</span></td>
            </tr>
        `;
    });
    tbody.innerHTML = html;

    // Overall Simulation Banner
    const ovBanner = document.getElementById("bmSimOverallBanner");
    if (ovBanner) {
        const deltaIdx = draftIndex - activeIndex;
        const deltaSign = deltaIdx > 0 ? `+${deltaIdx.toFixed(1)}%` : (deltaIdx < 0 ? `${deltaIdx.toFixed(1)}%` : `0.0%`);
        const tier = draftIndex >= draft.tiers.tierA ? "Tier A (World-Class)" : (draftIndex >= draft.tiers.tierB ? "Tier B (Controlled)" : (draftIndex >= draft.tiers.tierC ? "Tier C (Moderate Risk)" : "Tier D (Critical Risk)"));
        const tierBadgeClass = draftIndex >= draft.tiers.tierA ? "badge-green" : (draftIndex >= draft.tiers.tierB ? "badge-yellow" : (draftIndex >= draft.tiers.tierC ? "badge-amber" : "badge-red"));

        ovBanner.innerHTML = `
            <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <span style="font-size: 28px;">🏆</span>
                <div>
                    <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Composite Corporate Quality Index (Draft Simulation):</div>
                    <div style="display: flex; align-items: center; gap: 10px; margin-top: 2px;">
                        <span style="font-size: 22px; font-weight: 800; color: #38bdf8;">${draftIndex.toFixed(1)}%</span>
                        <span class="status-badge ${tierBadgeClass}">${tier}</span>
                        <span style="font-size: 11.5px; color: ${deltaIdx >= 0 ? '#34d399' : '#f87171'}; font-weight: 700;">(Shift: ${deltaSign} vs Active)</span>
                    </div>
                </div>
            </div>
            <div style="font-size: 11px; color: var(--text-secondary); max-width: 420px;">
                Active System Index: <strong>${activeIndex.toFixed(1)}%</strong> &nbsp;|&nbsp; 
                Draft Weighted Average applied with custom pillar weights (${w.kpi1}% / ${w.kpi2}% / ${w.kpi3}% / ${w.kpi4}% / ${w.kpi5}%).
            </div>
        `;
    }
}

function saveAndApplyBenchmarks() {
    const draft = getDraftBenchmarkConfig();

    const w = draft.weights;
    const totalW = (w.kpi1 + w.kpi2 + w.kpi3 + w.kpi4 + w.kpi5);
    if (Math.abs(totalW - 100) > 1.0) {
        if (!confirm(`⚠️ Warning: Total weight allocation is ${totalW.toFixed(1)}% (recommended: 100%). Do you wish to normalize and proceed?`)) {
            return;
        }
    }

    appState.benchmarks = draft;
    saveAppState();
    syncRadarMetricConfigsWithBenchmarks();

    recalculateAllSystemViews();

    alert("✅ New Corporate QA/QC Benchmarks successfully saved & applied!\n\nThe entire system (Radar Dashboards, Trend Graphs, Compliance Thresholds, and Executive Reports) has been refactored with the new benchmark governance matrix.");
}

function resetBenchmarksToDefaultsPrompt() {
    if (confirm("🔄 Are you sure you want to reset all KPI benchmarks, multipliers, SLA days, and corporate weights to standard corporate defaults?")) {
        appState.benchmarks = JSON.parse(JSON.stringify(DEFAULT_BENCHMARKS));
        saveAppState();
        syncRadarMetricConfigsWithBenchmarks();
        renderBenchmarkEditorTab();
        recalculateAllSystemViews();
        alert("✅ Benchmarks successfully restored to corporate standard defaults.");
    }
}

function recalculateAllSystemViews() {
    // Re-render overview radar dashboard if active or present
    renderQuarterlyRadarDashboard();
    
    // Re-render current active tab
    if (appState.activeTab === "tab-overview") {
        renderQuarterlyRadarDashboard();
    } else if (appState.activeTab === "tab-kpi1") {
        renderKPI1LineGraph();
    } else if (appState.activeTab === "tab-kpi2") {
        renderKPI2LineGraph();
    } else if (appState.activeTab === "tab-kpi3") {
        renderKPI3LineGraph();
    } else if (appState.activeTab === "tab-kpi4") {
        renderKPI4LineGraph();
    } else if (appState.activeTab === "tab-kpi5") {
        renderKPI5LineGraph();
    } else if (appState.activeTab === "tab-analytics") {
        renderExecutiveAnalyticsBoxes();
    } else if (appState.activeTab === "tab-executive") {
        compileExecutiveReport();
    } else if (appState.activeTab === "tab-comprehension") {
        renderGraphComprehensionTab();
    } else if (appState.activeTab === "tab-benchmarks") {
        renderBenchmarkEditorTab();
    }
}


