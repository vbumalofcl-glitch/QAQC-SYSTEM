/**
 * QA/QC SYSTEM - SUPPLIER'S INFORMATION & CALLING CARDS DIRECTORY
 * Corporate-style directory of Product Suppliers and Specialty Contractors
 * with attached calling cards, full editing capabilities, and localStorage persistence.
 * 
 * Version: 2.5 (2026 Edition)
 */

(function () {
  'use strict';

  // --- Helper: Generate Corporate Calling Card SVG (Data URI) ---
  function generateCorporateCardSVG(contact) {
    const isSupplier = contact.category === 'product_supplier';
    const primaryColor = isSupplier ? (contact.themeColor || '#0284c7') : '#d97706';
    const darkBg = isSupplier ? '#0f172a' : '#1e1b4b';
    const accentGrad = isSupplier ? '#38bdf8' : '#fbbf24';
    const tagText = isSupplier ? 'AUTHORIZED PRODUCT SUPPLIER' : 'SPECIALTY TRADE CONTRACTOR';

    const safeXml = (str) => {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    };

    const company = safeXml(contact.company || 'Company Name');
    const person = safeXml(contact.contactPerson || 'Contact Person');
    const position = safeXml(contact.position || 'Representative');
    const mobile = safeXml(contact.mobile || '+63 900 000 0000');
    const email = safeXml(contact.email || 'contact@example.com');
    const address = safeXml(contact.address || 'Metro Manila, Philippines');
    const initials = company.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase() || 'CC';

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 400" width="100%" height="100%" style="border-radius:12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <linearGradient id="bgGrad_${contact.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${darkBg}" />
      <stop offset="65%" stop-color="${darkBg}" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>
    <linearGradient id="foilGrad_${contact.id}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${primaryColor}" />
      <stop offset="50%" stop-color="${accentGrad}" />
      <stop offset="100%" stop-color="${primaryColor}" />
    </linearGradient>
    <pattern id="dotGrid_${contact.id}" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="#ffffff" fill-opacity="0.04" />
    </pattern>
    <filter id="cardShadow_${contact.id}" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.3" />
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="700" height="400" rx="14" fill="url(#bgGrad_${contact.id})" stroke="#334155" stroke-width="1.5" />
  <rect width="700" height="400" rx="14" fill="url(#dotGrid_${contact.id})" />

  <!-- Top Decorative Foil Bar -->
  <rect x="0" y="0" width="700" height="8" fill="url(#foilGrad_${contact.id})" />

  <!-- Corner Aesthetic Ribbon -->
  <path d="M 620 0 L 700 0 L 700 80 Z" fill="${primaryColor}" fill-opacity="0.25" />

  <!-- Left Logo Badge Box -->
  <g transform="translate(42, 38)">
    <rect width="64" height="64" rx="12" fill="${primaryColor}" fill-opacity="0.15" stroke="${primaryColor}" stroke-width="1.5" />
    <text x="32" y="42" font-size="24" font-weight="900" fill="${accentGrad}" text-anchor="middle" letter-spacing="1">${initials}</text>
  </g>

  <!-- Header: Company & Category -->
  <g transform="translate(122, 54)">
    <text x="0" y="0" font-size="11" font-weight="800" fill="${accentGrad}" letter-spacing="1.5">${tagText}</text>
    <text x="0" y="24" font-size="20" font-weight="800" fill="#ffffff" letter-spacing="0.2">${company}</text>
  </g>

  <!-- Subtle Foil Divider -->
  <line x1="42" y1="126" x2="658" y2="126" stroke="#334155" stroke-width="1" />
  <line x1="42" y1="126" x2="160" y2="126" stroke="url(#foilGrad_${contact.id})" stroke-width="2.5" />

  <!-- Person Name & Position -->
  <g transform="translate(42, 172)">
    <text x="0" y="0" font-size="24" font-weight="800" fill="#f8fafc" letter-spacing="0.4">${person}</text>
    <text x="0" y="24" font-size="13" font-weight="600" fill="#94a3b8" letter-spacing="0.3">${position}</text>
  </g>

  <!-- Contact Details Grid (Left column) -->
  <g transform="translate(42, 240)">
    <!-- Phone / Mobile -->
    <g transform="translate(0, 0)">
      <circle cx="12" cy="10" r="12" fill="${primaryColor}" fill-opacity="0.2" />
      <path d="M 9 6 L 15 6 L 15 14 L 9 14 Z M 11 12 L 13 12" fill="none" stroke="${accentGrad}" stroke-width="1.3" />
      <text x="32" y="14" font-size="13" font-weight="600" fill="#e2e8f0">${mobile}</text>
    </g>

    <!-- Email -->
    <g transform="translate(0, 36)">
      <circle cx="12" cy="10" r="12" fill="${primaryColor}" fill-opacity="0.2" />
      <path d="M 8 7 L 16 7 L 16 13 L 8 13 Z M 8 8 L 12 11 L 16 8" fill="none" stroke="${accentGrad}" stroke-width="1.3" />
      <text x="32" y="14" font-size="13" font-weight="600" fill="#e2e8f0">${email}</text>
    </g>

    <!-- Address -->
    <g transform="translate(0, 72)">
      <circle cx="12" cy="10" r="12" fill="${primaryColor}" fill-opacity="0.2" />
      <path d="M 12 5 A 4 4 0 0 0 8 9 C 8 12 12 15 12 15 C 12 15 16 12 16 9 A 4 4 0 0 0 12 5 Z" fill="none" stroke="${accentGrad}" stroke-width="1.3" />
      <text x="32" y="14" font-size="12" font-weight="500" fill="#94a3b8">${address.slice(0, 48)}${address.length > 48 ? '...' : ''}</text>
    </g>
  </g>

  <!-- Right Decorative Micro-QR Graphic -->
  <g transform="translate(566, 235)">
    <rect width="92" height="92" rx="8" fill="#ffffff" fill-opacity="0.06" stroke="#475569" stroke-width="1" />
    <!-- Simulated QR Pattern -->
    <rect x="10" y="10" width="22" height="22" fill="${accentGrad}" rx="3" />
    <rect x="15" y="15" width="12" height="12" fill="${darkBg}" />
    <rect x="60" y="10" width="22" height="22" fill="${accentGrad}" rx="3" />
    <rect x="65" y="15" width="12" height="12" fill="${darkBg}" />
    <rect x="10" y="60" width="22" height="22" fill="${accentGrad}" rx="3" />
    <rect x="15" y="65" width="12" height="12" fill="${darkBg}" />
    <rect x="38" y="16" width="14" height="6" fill="#cbd5e1" />
    <rect x="42" y="38" width="18" height="18" fill="${accentGrad}" rx="2" />
    <rect x="65" y="44" width="14" height="6" fill="#cbd5e1" />
    <rect x="38" y="70" width="20" height="8" fill="#cbd5e1" />
    <text x="46" y="112" font-size="9" font-weight="700" fill="#64748b" text-anchor="middle" letter-spacing="1">SCAN VCARD</text>
  </g>

  <!-- Bottom Corporate Tagline -->
  <g transform="translate(42, 372)">
    <text x="0" y="0" font-size="10" font-weight="600" fill="#64748b" letter-spacing="0.5">QA/QC APPROVED CORPORATE PARTNER &#8226; FCLARANANG DEV CORP DIRECTORY</text>
  </g>
</svg>
    `.trim();

    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  // --- Initial Master Directory Dataset ---
  const MASTER_SUPPLIERS_DIRECTORY = [
    // -------------------------------------------------------------------------
    // CATEGORY 1: PRODUCT SUPPLIERS (Manufacturers & Material Vendors)
    // -------------------------------------------------------------------------
    {
      id: 'sup-buildrite',
      category: 'product_supplier',
      company: 'Magna Prime Chemical Technologies, Inc.',
      brandName: 'Buildrite Chemicals',
      themeColor: '#0284c7',
      contactPerson: 'Engr. Marcus Vance G. Reyes',
      position: 'Senior Technical Specifications & Key Accounts Manager',
      address: '#168 Magna Prime Complex, Meycauayan Industrial Subd., Bulacan / Ortigas Office, Pasig City',
      mobile: '+63 917 845 2890',
      landline: '(02) 8645-3321 loc 104',
      email: 'm.reyes@magnaprime.com.ph',
      website: 'https://www.buildritechemicals.com',
      scope: [
        'Sapal RTU Waterproofing',
        'Tofil Skimcoat Matrix (800-812)',
        'Tile Grout & Basecoat Adhesives',
        'Concrete Admixtures & Retarders',
        'Industrial Epoxy Flooring Systems',
        'Ready-Mix Repair Mortars'
      ],
      cardPhoto: '',
      notes: 'Direct manufacturer account. Lead time 24-48 hrs for Metro Manila delivery.'
    },
    {
      id: 'sup-boysen',
      category: 'product_supplier',
      company: 'Pacific Paint (Boysen) Philippines, Inc.',
      brandName: 'Pacific Paint (Boysen)',
      themeColor: '#dc2626',
      contactPerson: 'Arch. Christian Dave L. Mendoza',
      position: 'Architectural & Technical Services Consultant',
      address: '292 D. Tuazon St., Quezon City, Metro Manila, Philippines',
      mobile: '+63 918 920 1144',
      landline: '(02) 8364-3505 to 09',
      email: 'cd.mendoza@boysen.com.ph',
      website: 'https://www.boysen.com.ph',
      scope: [
        'Boysen Plexibond Cementitious Waterproofing',
        'Permacoat Acrylic Latexes',
        'Konstrukt Architectural Render & Skimcoats',
        'Elasti-kote Wall Systems',
        'Acqua Epoxy Industrial Enamels',
        'Roofgard Protective Paint'
      ],
      cardPhoto: '',
      notes: 'Provides on-site technical inspection and moisture testing before Plexibond application.'
    },
    {
      id: 'sup-davies',
      category: 'product_supplier',
      company: 'Davies Paints Philippines, Inc.',
      brandName: 'Davies Paints',
      themeColor: '#7c3aed',
      contactPerson: 'Ma. Theresa "Tess" S. Alcantara',
      position: 'Corporate & Infrastructure Accounts Director',
      address: 'Mercedes Ave, San Miguel, Pasig City, Metro Manila, Philippines',
      mobile: '+63 917 552 9840',
      landline: '(02) 8641-7101',
      email: 'tess.alcantara@daviespaints.com.ph',
      website: 'https://www.daviespaints.com.ph',
      scope: [
        'Davies Sun & Rain Elastomeric Coatings',
        'Davies Liquid Tile Acrylic Matrix',
        'Acreex Chlorinated Rubber Floor Coatings',
        'Keramikote Heavy Industrial Coatings',
        'Megacryl Acrylic Latex Series'
      ],
      cardPhoto: '',
      notes: 'Authorized color tinting center coordination with standard 5-day delivery commitment.'
    },
    {
      id: 'sup-bostik',
      category: 'product_supplier',
      company: 'Bostik Philippines, Inc.',
      brandName: 'Bostik (Arkema Group)',
      themeColor: '#008080',
      contactPerson: 'Engr. Rafael "Raffy" D. Bautista',
      position: 'Commercial & Infrastructure Technical Representative',
      address: '35th Flr, Penthouse, Raffles Corporate Center, Emerald Ave, Ortigas Center, Pasig City',
      mobile: '+63 917 630 4412',
      landline: '(02) 8900-5656',
      email: 'rafael.bautista@bostik.com',
      website: 'https://www.bostik.com/philippines',
      scope: [
        'Bostik Seal N Flex Polyurethane Sealants',
        'Flowfill Non-Shrink Structural Grouts (GP & HS)',
        'Bostik Dampfix Rapid Waterproofing Membrane',
        'Patchfix Structural Concrete Repair Mortar',
        'Tile-Mate Epoxy Tile Grouts & Adhesives'
      ],
      cardPhoto: '',
      notes: 'Supplies high-performance expansion joint sealants with manufacturer QA/QC certification.'
    },
    {
      id: 'sup-sika',
      category: 'product_supplier',
      company: 'Sika Philippines, Inc.',
      brandName: 'Sika Philippines',
      themeColor: '#e2001a',
      contactPerson: 'Engr. Leandro Jose M. Santos',
      position: 'Target Market Manager - Concrete & Structural Waterproofing',
      address: 'Unit A & B, 888 Cayetano Ave, Palingon, Tipas, Taguig City, Metro Manila',
      mobile: '+63 919 065 8920',
      landline: '(02) 8790-9800',
      email: 'santos.leandro@ph.sika.com',
      website: 'https://phl.sika.com',
      scope: [
        'SikaGrout-214 Precision Non-Shrink Grout',
        'Sikadur-31 CF Normal Structural Epoxy Adhesive',
        'Sika AnchorFix High-Load Rebar Chemical Anchoring',
        'Sikament-NN High-Range Water Reducing Admixture',
        'Plastocrete Plus Waterproofing Admixture'
      ],
      cardPhoto: '',
      notes: 'Global Swiss formulation. Approved for severe exposure infrastructure specifications.'
    },
    {
      id: 'sup-holcim',
      category: 'product_supplier',
      company: 'Holcim Philippines, Inc.',
      brandName: 'Holcim Cement',
      themeColor: '#0284c7',
      contactPerson: 'Gerardo "Gerry" P. Limlingan',
      position: 'Commercial Bulk & Bagged Cement Accounts Head',
      address: '7th Floor, Two World Square, McKinley Hill, Fort Bonifacio, Taguig City',
      mobile: '+63 917 830 7710',
      landline: '(02) 8581-1511',
      email: 'gerardo.limlingan@holcim.com',
      website: 'https://www.holcim.ph',
      scope: [
        'Holcim Excel Blended Cement (Type 1P)',
        'Holcim Optimo High-Performance Cement',
        'Holcim Solido Structural Concrete Grade',
        'Holcim WallRight Masonry Mortar'
      ],
      cardPhoto: '',
      notes: 'Batching plant delivery agreements with Mill Test Certificates accompanying each shipment.'
    },
    {
      id: 'sup-steelasia',
      category: 'product_supplier',
      company: 'SteelAsia Manufacturing Corp.',
      brandName: 'SteelAsia',
      themeColor: '#334155',
      contactPerson: 'Engr. Vincent Paul T. Tan',
      position: 'Infrastructure Sales & Rebar Technical Specialist',
      address: '23rd Floor, Bonifacio High Street South Corporate Plaza, BGC, Taguig City',
      mobile: '+63 918 801 5566',
      landline: '(02) 8856-6888',
      email: 'vincent.tan@steelasia.com',
      website: 'https://www.steelasia.com',
      scope: [
        'PNS 49 Grade 415 / 275 Deformed Steel Bars',
        'Cut-and-Bend Automated Rebar Solutions',
        'Mechanical Couplers & Rebar Splicing Kits',
        'Seismic Grade Reinforcement Alloys'
      ],
      cardPhoto: '',
      notes: 'Mill test certificates, tensile tests, and elongation reports provided per bundle tag.'
    },

    // -------------------------------------------------------------------------
    // CATEGORY 2: SPECIALTY CONTRACTORS (Trade Contractors & Applicators)
    // -------------------------------------------------------------------------
    {
      id: 'con-alphashield',
      category: 'specialty_contractor',
      company: 'AlphaShield Waterproofing & Membrane Specialists',
      brandName: 'AlphaShield Specialty',
      themeColor: '#d97706',
      contactPerson: 'Engr. Roderick "Erick" Q. De Leon, PECE',
      position: 'Managing Contractor & Technical Operations Director',
      address: 'Unit 402, Megastate Building, G. Araneta Ave, Quezon City, Metro Manila',
      mobile: '+63 917 712 3499',
      landline: '(02) 8714-8820',
      email: 'erick.deleon@alphashieldph.com',
      website: 'https://www.alphashieldph.com',
      scope: [
        'Torched-On SBS/APP Bituminous Sheet Membranes',
        'Polyurethane (PU) Liquid Membrane Application',
        'High-Pressure Polyurethane Chemical Grout Injection',
        'Bentonite Waterstop & Expansion Joint Detailing',
        'Sub-Structure Blindside Waterproofing'
      ],
      cardPhoto: '',
      notes: 'Certified applicator for Buildrite, Boysen, Bostik, and Sika with 5-to-10 Year Water-Tight Warranty.'
    },
    {
      id: 'con-solidfloor',
      category: 'specialty_contractor',
      company: 'SolidFlooring Epoxy & Industrial Screed Contractors',
      brandName: 'SolidFlooring Pro',
      themeColor: '#ea580c',
      contactPerson: 'Engr. Bernardo "Bernie" F. Sison',
      position: 'Project Engineer & Master Applicator',
      address: 'Bldg 3, Metro Industrial Compound, Dr. A. Santos Ave, Sucat, Parañaque City',
      mobile: '+63 918 905 4488',
      landline: '(02) 8826-1930',
      email: 'bernie.sison@solidflooringph.com',
      website: 'https://www.solidflooringph.com',
      scope: [
        'Heavy-Duty Epoxy Self-Leveling Screeds (2mm - 5mm)',
        'Polyurethane Concrete Screeds for Cold Storage',
        'Chemical-Resistant Novolac Epoxy Linings',
        'Diamond Grinding & Shotblasting Surface Prep',
        'Electrostatic Discharge (ESD) Conductive Flooring'
      ],
      cardPhoto: '',
      notes: 'Equipped with heavy captive shotblasting machinery and dust-free diamond grinders.'
    },
    {
      id: 'con-posttension',
      category: 'specialty_contractor',
      company: 'Post-Tension Philippines Engineering Services Corp.',
      brandName: 'PostTension Phils',
      themeColor: '#4338ca',
      contactPerson: 'Engr. Anthony Jerome "AJ" V. Castro, MSCE',
      position: 'Vice President for Engineering & Site Operations',
      address: '14th Floor, Tycoon Center, Pearl Drive, Ortigas Center, Pasig City',
      mobile: '+63 917 898 6720',
      landline: '(02) 8637-2290',
      email: 'aj.castro@posttensionphils.com',
      website: 'https://www.posttensionphils.com',
      scope: [
        'Unbonded Monostrand Post-Tensioning Systems',
        'Bonded Multistrand Slab & Girder Post-Tensioning',
        'Hydraulic Jacking, Elongation Log Signoffs',
        'Structural Retrofitting & Carbon Fiber (CFRP) Wrapping',
        'High-Pressure Duct Grouting'
      ],
      cardPhoto: '',
      notes: 'Provides complete design vetting, elongation calculations, calibration certificates, and QA signoff.'
    },
    {
      id: 'con-sealguard',
      category: 'specialty_contractor',
      company: 'SealGuard Joint Sealants & Facade Restoration Services',
      brandName: 'SealGuard Specialists',
      themeColor: '#059669',
      contactPerson: 'Arch. Maricel G. Villanueva, UAP',
      position: 'Facade Caulking & Exterior Restoration Manager',
      address: 'Lot 18 Blk 4, Commonwealth Industrial Park, Fairview, Quezon City',
      mobile: '+63 920 948 3311',
      landline: '(02) 8931-4475',
      email: 'maricel.villanueva@sealguard.com.ph',
      website: 'https://www.sealguard.com.ph',
      scope: [
        'Precast Concrete Panel Expansion Joint Caulking',
        'Curtain Wall & Structural Glazing Weatherproofing',
        'Polyurethane & Silicone Joint Sealant Replacement',
        'Gondola & Rope Access Building Maintenance',
        'Air & Water Infiltration Remedial Testing'
      ],
      cardPhoto: '',
      notes: 'DOLE-certified gondola and rope-access technicians with safety permits and insurance.'
    },
    {
      id: 'con-pyrostop',
      category: 'specialty_contractor',
      company: 'PyroStop Fireproofing & Insulation Contracting Inc.',
      brandName: 'PyroStop Fire Protection',
      themeColor: '#b91c1c',
      contactPerson: 'Engr. Francis Raymund T. Solis',
      position: 'Technical Director for Passive Fire Protection',
      address: 'Unit 1005, West Tower, Philippine Stock Exchange Centre, Ortigas, Pasig City',
      mobile: '+63 917 622 1888',
      landline: '(02) 8687-5512',
      email: 'fr.solis@pyrostop.com.ph',
      website: 'https://www.pyrostop.com.ph',
      scope: [
        'Intumescent Paint Fireproofing for Structural Steel',
        'Cementitious Spray-Applied Fire Resistive Materials (SFRM)',
        'Firestop Penetration Seals (Pipes, Cables, Ducts)',
        'Fire-Rated Board Enclosures & Joint Systems',
        'BFP-Compliant Fire Resistance Certification'
      ],
      cardPhoto: '',
      notes: 'UL-classified and FM-approved systems with Bureau of Fire Protection (BFP) accredited testing.'
    },
    {
      id: 'con-geomaster',
      category: 'specialty_contractor',
      company: 'GeoMaster Foundation & Ground Engineering Corp.',
      brandName: 'GeoMaster Geotechnical',
      themeColor: '#0d9488',
      contactPerson: 'Engr. Danilo "Danny" K. Navarro, PE',
      position: 'Lead Geotechnical Project Engineer',
      address: 'KM 19 West Service Road, Sun Valley, Parañaque City, Metro Manila',
      mobile: '+63 918 840 9120',
      landline: '(02) 8824-7733',
      email: 'danny.navarro@geomasterph.com',
      website: 'https://www.geomasterph.com',
      scope: [
        'Soil Nailing & Shotcrete Slope Stabilization',
        'Micropiling & Underpinning for Foundation Repairs',
        'Permeation & Jet Grouting for Water Cutoff',
        'Ground Anchors & Retaining Wall Tiebacks',
        'Geotechnical Core Drilling & In-Situ Permeability Tests'
      ],
      cardPhoto: '',
      notes: 'Specialized deep foundation and excavation protection works for basements and hillside projects.'
    }
  ];

  // Initialize calling card photo if blank
  MASTER_SUPPLIERS_DIRECTORY.forEach(item => {
    if (!item.cardPhoto) {
      item.cardPhoto = generateCorporateCardSVG(item);
    }
  });

  // --- Manager Class ---
  class SupplierInfoManager {
    constructor() {
      this.STORAGE_KEY = 'fcl_supplier_info_directory_v2';
      this.activeCategory = 'all'; // 'all' | 'product_supplier' | 'specialty_contractor'
      this.searchQuery = '';
      this.viewMode = 'cards'; // 'cards' | 'table'
      this.editingContactId = null;
      this.currentCardUploadBase64 = null;

      this.data = this.loadData();
    }

    loadData() {
      try {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Ensure each item has an attached calling card photo
            parsed.forEach(c => {
              if (!c.cardPhoto || c.cardPhoto.includes('&bull;') || c.cardPhoto.includes('data:image/svg+xml;utf8,')) {
                c.cardPhoto = generateCorporateCardSVG(c);
              }
            });
            return parsed;
          }
        }
      } catch (e) {
        console.warn('Could not read supplier directory from localStorage:', e);
      }
      return JSON.parse(JSON.stringify(MASTER_SUPPLIERS_DIRECTORY));
    }

    saveData() {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
        this.showToast('Directory changes auto-saved to browser storage', 'success');
        this.updateStats();
      } catch (e) {
        console.error('Failed to save directory data:', e);
        this.showToast('Storage quota exceeded. Could not save photo.', 'error');
      }
    }

    resetToDefaults() {
      if (confirm('Are you sure you want to reset the Supplier & Contractor Directory to standard baseline? Any custom edits or uploaded cards will be restored.')) {
        this.data = JSON.parse(JSON.stringify(MASTER_SUPPLIERS_DIRECTORY));
        this.saveData();
        this.render();
        this.showToast('Directory restored to default baseline', 'info');
      }
    }

    setCategory(category) {
      this.activeCategory = category;
      document.querySelectorAll('.supplier-cat-filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-category') === category);
      });
      this.renderDirectory();
    }

    setSearch(query) {
      this.searchQuery = (query || '').trim().toLowerCase();
      this.renderDirectory();
    }

    setViewMode(mode) {
      this.viewMode = mode;
      document.querySelectorAll('.view-toggle-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-view') === mode);
      });
      this.renderDirectory();
    }

    getFilteredData() {
      let list = [...this.data];

      if (this.activeCategory !== 'all') {
        list = list.filter(item => item.category === this.activeCategory);
      }

      if (this.searchQuery) {
        const q = this.searchQuery;
        list = list.filter(item => {
          return (
            (item.company && item.company.toLowerCase().includes(q)) ||
            (item.contactPerson && item.contactPerson.toLowerCase().includes(q)) ||
            (item.position && item.position.toLowerCase().includes(q)) ||
            (item.address && item.address.toLowerCase().includes(q)) ||
            (item.mobile && item.mobile.toLowerCase().includes(q)) ||
            (item.email && item.email.toLowerCase().includes(q)) ||
            (item.notes && item.notes.toLowerCase().includes(q)) ||
            (Array.isArray(item.scope) && item.scope.some(s => s.toLowerCase().includes(q)))
          );
        });
      }

      return list;
    }

    updateStats() {
      const total = this.data.length;
      const suppliers = this.data.filter(i => i.category === 'product_supplier').length;
      const contractors = this.data.filter(i => i.category === 'specialty_contractor').length;
      const cardsCount = this.data.filter(i => Boolean(i.cardPhoto)).length;

      const elTotal = document.getElementById('statTotalDirectory');
      const elSup = document.getElementById('statTotalSuppliers');
      const elCon = document.getElementById('statTotalContractors');
      const elCards = document.getElementById('statTotalCards');

      const pillAll = document.getElementById('pillCountAll');
      const pillSup = document.getElementById('pillCountSuppliers');
      const pillCon = document.getElementById('pillCountContractors');

      if (elTotal) elTotal.textContent = total;
      if (elSup) elSup.textContent = suppliers;
      if (elCon) elCon.textContent = contractors;
      if (elCards) elCards.textContent = cardsCount;

      if (pillAll) pillAll.textContent = total;
      if (pillSup) pillSup.textContent = suppliers;
      if (pillCon) pillCon.textContent = contractors;
    }

    render() {
      this.updateStats();
      this.renderDirectory();
    }

    renderDirectory() {
      const container = document.getElementById('supplierInfoContentArea');
      if (!container) return;

      const items = this.getFilteredData();

      if (items.length === 0) {
        container.innerHTML = `
          <div class="directory-empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><line x1="7" y1="15" x2="17" y2="15"/><line x1="7" y1="11" x2="13" y2="11"/><circle cx="8" cy="8" r="1"/></svg>
            <h3>No Supplier or Contractor Contacts Found</h3>
            <p>Try refining your search keyword or switching category tabs.</p>
            <button class="excel-btn excel-btn-reset" onclick="supplierInfo.setCategory('all'); supplierInfo.setSearch('');">
              Clear All Filters
            </button>
          </div>
        `;
        return;
      }

      if (this.viewMode === 'table') {
        this.renderTableView(container, items);
      } else {
        this.renderCardsView(container, items);
      }
    }

    renderCardsView(container, items) {
      let html = '<div class="calling-cards-grid">';

      items.forEach(c => {
        const isSupplier = c.category === 'product_supplier';
        const badgeClass = isSupplier ? 'badge-supplier' : 'badge-contractor';
        const badgeLabel = isSupplier ? 'Product Supplier' : 'Specialty Contractor';
        const cardImgSrc = c.cardPhoto || generateCorporateCardSVG(c);

        const scopePills = (c.scope || []).map(s => `<span class="scope-pill">${escapeHtml(s)}</span>`).join('');

        html += `
          <div class="executive-card" data-contact-id="${c.id}">
            <!-- Top Card Header -->
            <div class="card-top-bar">
              <div class="card-company-header">
                <span class="card-category-badge ${badgeClass}">${badgeLabel}</span>
                <h3 class="card-company-title" title="${escapeHtml(c.company)}">${escapeHtml(c.company)}</h3>
              </div>
              <div class="card-quick-actions">
                <button class="icon-tool-btn" onclick="supplierInfo.openEditModal('${c.id}')" title="Edit Contact Details & Card">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                </button>
                <button class="icon-tool-btn danger" onclick="supplierInfo.deleteContact('${c.id}')" title="Delete from Directory">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
              </div>
            </div>

            <!-- Attached Calling Card Photo Box -->
            <div class="calling-card-attachment" onclick="supplierInfo.openCardLightbox('${c.id}')" title="Click to enlarge calling card photo">
              <img src="${cardImgSrc}" alt="Calling Card - ${escapeHtml(c.contactPerson)}" class="calling-card-thumb">
              <div class="calling-card-hover-overlay">
                <span class="overlay-zoom-tag">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                  View Attached Calling Card
                </span>
              </div>
            </div>

            <!-- Representative Bio -->
            <div class="card-bio-section">
              <div class="bio-person-row">
                <div class="person-name-wrap">
                  <span class="person-name">${escapeHtml(c.contactPerson || 'Unassigned')}</span>
                  <span class="person-role">${escapeHtml(c.position || 'Representative')}</span>
                </div>
              </div>

              <!-- Contact Matrix -->
              <div class="contact-specs-list">
                <div class="contact-spec-item" title="Mobile Number">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                  <a href="tel:${escapeHtml(c.mobile || '')}" class="contact-link" onclick="event.stopPropagation()">${escapeHtml(c.mobile || '—')}</a>
                </div>

                <div class="contact-spec-item" title="Office Landline">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span>${escapeHtml(c.landline || '—')}</span>
                </div>

                <div class="contact-spec-item" title="Email Address">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <a href="mailto:${escapeHtml(c.email || '')}" class="contact-link" onclick="event.stopPropagation()">${escapeHtml(c.email || '—')}</a>
                </div>

                <div class="contact-spec-item" title="Office / Plant Address">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span class="address-text">${escapeHtml(c.address || '—')}</span>
                </div>
              </div>

              <!-- Scope / Specialties -->
              ${c.scope && c.scope.length > 0 ? `
                <div class="card-scope-box">
                  <div class="scope-label">Specialties &amp; Services:</div>
                  <div class="scope-pills-wrap">
                    ${scopePills}
                  </div>
                </div>
              ` : ''}

              ${c.notes ? `
                <div class="card-notes-line">
                  <strong>Notes:</strong> ${escapeHtml(c.notes)}
                </div>
              ` : ''}
            </div>

            <!-- Footer Quick Contact Bar -->
            <div class="card-footer-actions">
              <a href="tel:${escapeHtml(c.mobile || '')}" class="card-btn-action primary">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Call
              </a>
              <a href="mailto:${escapeHtml(c.email || '')}" class="card-btn-action">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Email
              </a>
              <button class="card-btn-action" onclick="supplierInfo.copyAddress('${c.id}')" title="Copy Address">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                Address
              </button>
              <button class="card-btn-action" onclick="supplierInfo.openCardLightbox('${c.id}')" title="View Full Calling Card">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                Card
              </button>
            </div>
          </div>
        `;
      });

      html += '</div>';
      container.innerHTML = html;
    }

    renderTableView(container, items) {
      let html = `
        <div class="spreadsheet-scroll-wrap" style="background:#ffffff; border:1px solid var(--border-color); border-radius:8px;">
          <table class="excel-table">
            <thead>
              <tr>
                <th style="width:40px; text-align:center;">#</th>
                <th style="width:100px;">Card Photo</th>
                <th style="width:150px;">Category</th>
                <th style="min-width:200px;">Company Name</th>
                <th style="min-width:180px;">Contact Person &amp; Title</th>
                <th style="width:140px;">Mobile / Landline</th>
                <th style="width:170px;">Email</th>
                <th style="min-width:220px;">Address</th>
                <th style="width:110px; text-align:center;">Actions</th>
              </tr>
            </thead>
            <tbody>
      `;

      items.forEach((c, idx) => {
        const isSupplier = c.category === 'product_supplier';
        const badgeClass = isSupplier ? 'badge-supplier' : 'badge-contractor';
        const badgeLabel = isSupplier ? 'Product Supplier' : 'Specialty Contractor';
        const cardImgSrc = c.cardPhoto || generateCorporateCardSVG(c);

        html += `
          <tr class="excel-row">
            <td class="col-idx text-center">${idx + 1}</td>
            <td style="padding:4px; text-align:center;">
              <img src="${cardImgSrc}" alt="Card" style="width:75px; height:45px; object-fit:cover; border-radius:4px; border:1px solid #cbd5e1; cursor:pointer; box-shadow:0 1px 3px rgba(0,0,0,0.1);" onclick="supplierInfo.openCardLightbox('${c.id}')" title="Click to enlarge">
            </td>
            <td><span class="card-category-badge ${badgeClass}">${badgeLabel}</span></td>
            <td><strong>${escapeHtml(c.company)}</strong></td>
            <td>
              <div style="font-weight:700; color:var(--slate-900);">${escapeHtml(c.contactPerson)}</div>
              <div style="font-size:0.75rem; color:var(--slate-500);">${escapeHtml(c.position)}</div>
            </td>
            <td>
              <div><a href="tel:${escapeHtml(c.mobile)}" style="color:var(--slate-800); text-decoration:none; font-weight:600;">${escapeHtml(c.mobile)}</a></div>
              <div style="font-size:0.72rem; color:var(--slate-500);">${escapeHtml(c.landline)}</div>
            </td>
            <td>
              <a href="mailto:${escapeHtml(c.email)}" style="color:var(--brand-primary); text-decoration:none;">${escapeHtml(c.email)}</a>
            </td>
            <td style="font-size:0.75rem; color:var(--slate-600);">${escapeHtml(c.address)}</td>
            <td style="text-align:center; white-space:nowrap;">
              <button class="row-action-btn" onclick="supplierInfo.openCardLightbox('${c.id}')" title="View Calling Card">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </button>
              <button class="row-action-btn" onclick="supplierInfo.openEditModal('${c.id}')" title="Edit Contact">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              </button>
              <button class="row-action-btn" onclick="supplierInfo.deleteContact('${c.id}')" title="Delete">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </td>
          </tr>
        `;
      });

      html += `
            </tbody>
          </table>
        </div>
      `;

      container.innerHTML = html;
    }

    // --- Modal: Lightbox for Calling Card ---
    openCardLightbox(contactId) {
      const c = this.data.find(i => i.id === contactId);
      if (!c) return;

      const modal = document.getElementById('modalCallingCardLightbox');
      const img = document.getElementById('lightboxCardImage');
      const title = document.getElementById('lightboxCardTitle');
      const sub = document.getElementById('lightboxCardSubtitle');
      const btnDownload = document.getElementById('lightboxCardDownload');

      const cardSrc = c.cardPhoto || generateCorporateCardSVG(c);

      if (img) img.src = cardSrc;
      if (title) title.textContent = `${c.company} — Calling Card`;
      if (sub) sub.textContent = `${c.contactPerson} (${c.position})`;

      if (btnDownload) {
        btnDownload.onclick = () => {
          const a = document.createElement('a');
          a.href = cardSrc;
          const safeName = (c.company + '_' + c.contactPerson).replace(/[^a-zA-Z0-9]/g, '_');
          a.download = `${safeName}_calling_card.png`;
          if (cardSrc.startsWith('data:image/svg+xml')) {
            a.download = `${safeName}_calling_card.svg`;
          }
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };
      }

      if (modal) {
        modal.classList.add('active');
      }
    }

    closeCardLightbox() {
      const modal = document.getElementById('modalCallingCardLightbox');
      if (modal) modal.classList.remove('active');
    }

    // --- Modal: Edit / Add Supplier ---
    openEditModal(contactId = null) {
      this.editingContactId = contactId;
      this.currentCardUploadBase64 = null;

      const modal = document.getElementById('modalEditSupplierInfo');
      const title = document.getElementById('editSupplierModalTitle');

      // Form inputs
      const inCategory = document.getElementById('editContactCategory');
      const inCompany = document.getElementById('editContactCompany');
      const inPerson = document.getElementById('editContactPerson');
      const inPosition = document.getElementById('editContactPosition');
      const inMobile = document.getElementById('editContactMobile');
      const inLandline = document.getElementById('editContactLandline');
      const inEmail = document.getElementById('editContactEmail');
      const inWebsite = document.getElementById('editContactWebsite');
      const inAddress = document.getElementById('editContactAddress');
      const inScope = document.getElementById('editContactScope');
      const inNotes = document.getElementById('editContactNotes');
      const cardPreview = document.getElementById('editCardImagePreview');
      const cardFileInput = document.getElementById('editCardFileInput');

      if (cardFileInput) cardFileInput.value = '';

      if (contactId) {
        const c = this.data.find(i => i.id === contactId);
        if (!c) return;

        if (title) title.textContent = `Edit Supplier / Contractor — ${c.company}`;
        if (inCategory) inCategory.value = c.category;
        if (inCompany) inCompany.value = c.company || '';
        if (inPerson) inPerson.value = c.contactPerson || '';
        if (inPosition) inPosition.value = c.position || '';
        if (inMobile) inMobile.value = c.mobile || '';
        if (inLandline) inLandline.value = c.landline || '';
        if (inEmail) inEmail.value = c.email || '';
        if (inWebsite) inWebsite.value = c.website || '';
        if (inAddress) inAddress.value = c.address || '';
        if (inScope) inScope.value = Array.isArray(c.scope) ? c.scope.join(', ') : '';
        if (inNotes) inNotes.value = c.notes || '';

        const cardSrc = c.cardPhoto || generateCorporateCardSVG(c);
        if (cardPreview) cardPreview.src = cardSrc;
        this.currentCardUploadBase64 = c.cardPhoto;
      } else {
        if (title) title.textContent = 'Add New Supplier or Specialty Contractor';
        if (inCategory) inCategory.value = 'product_supplier';
        if (inCompany) inCompany.value = '';
        if (inPerson) inPerson.value = '';
        if (inPosition) inPosition.value = '';
        if (inMobile) inMobile.value = '';
        if (inLandline) inLandline.value = '';
        if (inEmail) inEmail.value = '';
        if (inWebsite) inWebsite.value = '';
        if (inAddress) inAddress.value = '';
        if (inScope) inScope.value = '';
        if (inNotes) inNotes.value = '';

        const placeholderCard = generateCorporateCardSVG({
          id: 'temp',
          category: 'product_supplier',
          company: 'New Corporate Partner',
          contactPerson: 'Contact Person Name',
          position: 'Technical Representative',
          mobile: '+63 900 000 0000',
          email: 'partner@example.com',
          address: 'Metro Manila, Philippines'
        });
        if (cardPreview) cardPreview.src = placeholderCard;
        this.currentCardUploadBase64 = null;
      }

      if (modal) modal.classList.add('active');
    }

    closeEditModal() {
      const modal = document.getElementById('modalEditSupplierInfo');
      if (modal) modal.classList.remove('active');
      this.editingContactId = null;
      this.currentCardUploadBase64 = null;
    }

    handleCardFileUpload(file) {
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        this.showToast('Please select a valid image file (PNG, JPG, SVG, WebP)', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result;
        this.currentCardUploadBase64 = base64;
        const preview = document.getElementById('editCardImagePreview');
        if (preview) preview.src = base64;
        this.showToast('Calling card image attached! Click Save to apply.', 'info');
      };
      reader.readAsDataURL(file);
    }

    saveContactFromModal() {
      const inCategory = document.getElementById('editContactCategory');
      const inCompany = document.getElementById('editContactCompany');
      const inPerson = document.getElementById('editContactPerson');
      const inPosition = document.getElementById('editContactPosition');
      const inMobile = document.getElementById('editContactMobile');
      const inLandline = document.getElementById('editContactLandline');
      const inEmail = document.getElementById('editContactEmail');
      const inWebsite = document.getElementById('editContactWebsite');
      const inAddress = document.getElementById('editContactAddress');
      const inScope = document.getElementById('editContactScope');
      const inNotes = document.getElementById('editContactNotes');

      const company = (inCompany?.value || '').trim();
      const person = (inPerson?.value || '').trim();

      if (!company) {
        alert('Please provide a Company or Business Name.');
        if (inCompany) inCompany.focus();
        return;
      }

      const rawScope = inScope?.value || '';
      const scopeArray = rawScope.split(',').map(s => s.trim()).filter(Boolean);

      if (this.editingContactId) {
        // Edit existing
        const idx = this.data.findIndex(i => i.id === this.editingContactId);
        if (idx !== -1) {
          const item = this.data[idx];
          item.category = inCategory?.value || item.category;
          item.company = company;
          item.contactPerson = person;
          item.position = (inPosition?.value || '').trim();
          item.mobile = (inMobile?.value || '').trim();
          item.landline = (inLandline?.value || '').trim();
          item.email = (inEmail?.value || '').trim();
          item.website = (inWebsite?.value || '').trim();
          item.address = (inAddress?.value || '').trim();
          item.scope = scopeArray;
          item.notes = (inNotes?.value || '').trim();

          if (this.currentCardUploadBase64) {
            item.cardPhoto = this.currentCardUploadBase64;
          } else if (!item.cardPhoto) {
            item.cardPhoto = generateCorporateCardSVG(item);
          }

          this.saveData();
          this.render();
          this.closeEditModal();
          this.showToast(`Updated contact details for ${company}`, 'success');
        }
      } else {
        // Create new
        const newId = (inCategory?.value === 'specialty_contractor' ? 'con-' : 'sup-') + Date.now().toString().slice(-5);
        const newContact = {
          id: newId,
          category: inCategory?.value || 'product_supplier',
          company: company,
          brandName: company,
          themeColor: inCategory?.value === 'specialty_contractor' ? '#d97706' : '#0284c7',
          contactPerson: person,
          position: (inPosition?.value || '').trim(),
          mobile: (inMobile?.value || '').trim(),
          landline: (inLandline?.value || '').trim(),
          email: (inEmail?.value || '').trim(),
          website: (inWebsite?.value || '').trim(),
          address: (inAddress?.value || '').trim(),
          scope: scopeArray,
          notes: (inNotes?.value || '').trim(),
          cardPhoto: ''
        };

        if (this.currentCardUploadBase64) {
          newContact.cardPhoto = this.currentCardUploadBase64;
        } else {
          newContact.cardPhoto = generateCorporateCardSVG(newContact);
        }

        this.data.unshift(newContact);
        this.saveData();
        this.render();
        this.closeEditModal();
        this.showToast(`Added new contact "${company}" to Directory`, 'success');
      }
    }

    deleteContact(contactId) {
      const idx = this.data.findIndex(i => i.id === contactId);
      if (idx === -1) return;

      const c = this.data[idx];
      if (confirm(`Remove "${c.company} (${c.contactPerson})" from the Directory?`)) {
        this.data.splice(idx, 1);
        this.saveData();
        this.render();
        this.showToast(`Removed "${c.company}"`, 'info');
      }
    }

    copyAddress(contactId) {
      const c = this.data.find(i => i.id === contactId);
      if (!c || !c.address) return;

      navigator.clipboard.writeText(c.address).then(() => {
        this.showToast('Address copied to clipboard!', 'success');
      }).catch(() => {
        prompt('Copy address manually:', c.address);
      });
    }

    exportCSV() {
      const headers = ['Category', 'Company Name', 'Contact Person', 'Position / Title', 'Mobile', 'Landline', 'Email', 'Address', 'Website', 'Scope & Specialties', 'Notes'];
      const rows = this.data.map(c => [
        c.category === 'product_supplier' ? 'Product Supplier' : 'Specialty Contractor',
        c.company || '',
        c.contactPerson || '',
        c.position || '',
        c.mobile || '',
        c.landline || '',
        c.email || '',
        c.address || '',
        c.website || '',
        Array.isArray(c.scope) ? c.scope.join('; ') : '',
        c.notes || ''
      ]);

      const csvContent = [
        headers.map(h => `"${h.replace(/"/g, '""')}"`).join(','),
        ...rows.map(r => r.map(col => `"${String(col).replace(/"/g, '""')}"`).join(','))
      ].join('\r\n');

      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `FCLDC_Suppliers_Contractors_Directory_2026.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      this.showToast('Exported Directory to Excel CSV', 'success');
    }

    showToast(msg, type = 'info') {
      let container = document.getElementById('appToastContainer');
      if (!container) {
        container = document.createElement('div');
        container.id = 'appToastContainer';
        container.className = 'app-toast-container';
        document.body.appendChild(container);
      }
      const toast = document.createElement('div');
      toast.className = `app-toast app-toast-${type}`;
      const iconSvg = type === 'success'
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>'
        : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
      toast.innerHTML = `${iconSvg}<span>${msg}</span>`;
      container.appendChild(toast);
      setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
      }, 2800);
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // --- Singleton Initialization ---
  let supplierInfo = null;

  function initSupplierInfo() {
    if (!supplierInfo) {
      supplierInfo = new SupplierInfoManager();
      window.supplierInfo = supplierInfo;
    }

    // Bind Search Input
    const searchInput = document.getElementById('supplierInfoSearchInput');
    if (searchInput && (!searchInput.dataset || !searchInput.dataset.initialized)) {
      if (searchInput.dataset) searchInput.dataset.initialized = 'true';
      searchInput.addEventListener('input', (e) => {
        supplierInfo.setSearch(e.target.value);
      });
    }

    // Bind Add Button
    const btnAdd = document.getElementById('btnAddSupplierInfo');
    if (btnAdd && (!btnAdd.dataset || !btnAdd.dataset.initialized)) {
      if (btnAdd.dataset) btnAdd.dataset.initialized = 'true';
      btnAdd.addEventListener('click', () => supplierInfo.openEditModal(null));
    }

    // Bind Export Button
    const btnExport = document.getElementById('btnExportSupplierInfo');
    if (btnExport && (!btnExport.dataset || !btnExport.dataset.initialized)) {
      if (btnExport.dataset) btnExport.dataset.initialized = 'true';
      btnExport.addEventListener('click', () => supplierInfo.exportCSV());
    }

    // Bind Reset Defaults
    const btnReset = document.getElementById('btnResetSupplierInfo');
    if (btnReset && (!btnReset.dataset || !btnReset.dataset.initialized)) {
      if (btnReset.dataset) btnReset.dataset.initialized = 'true';
      btnReset.addEventListener('click', () => supplierInfo.resetToDefaults());
    }

    // Bind Category Filter Buttons
    document.querySelectorAll('.supplier-cat-filter-btn').forEach(btn => {
      if (!btn.dataset || !btn.dataset.initialized) {
        if (btn.dataset) btn.dataset.initialized = 'true';
        btn.addEventListener('click', () => {
          const cat = btn.getAttribute('data-category');
          if (cat) supplierInfo.setCategory(cat);
        });
      }
    });

    // Bind View Mode Buttons
    document.querySelectorAll('.view-toggle-btn').forEach(btn => {
      if (!btn.dataset || !btn.dataset.initialized) {
        if (btn.dataset) btn.dataset.initialized = 'true';
        btn.addEventListener('click', () => {
          const view = btn.getAttribute('data-view');
          if (view) supplierInfo.setViewMode(view);
        });
      }
    });

    // File input handler for card upload in modal
    const fileInput = document.getElementById('editCardFileInput');
    if (fileInput && (!fileInput.dataset || !fileInput.dataset.initialized)) {
      if (fileInput.dataset) fileInput.dataset.initialized = 'true';
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          supplierInfo.handleCardFileUpload(e.target.files[0]);
        }
      });
    }

    // Initial render
    supplierInfo.render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSupplierInfo);
  } else {
    initSupplierInfo();
  }

})();
