/**
 * FCLaranang Construction QA/QC System
 * Product & System Cost Comparison Engine & UI Controller
 * Supports: Boysen, Davies, Buildrite, Sika, Bostik, and Mixed-Brand Estimating
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    const exported = factory();
    root.ProductComparisonData = exported;
    if (typeof window !== 'undefined') {
      window.productComparison = exported.Controller;
    }
  }
}(typeof self !== 'undefined' ? self : this, function() {

  // =========================================================================
  // 1. BRAND METADATA
  // =========================================================================
  const COMPARISON_BRANDS = {
    boysen: {
      key: 'boysen',
      name: 'Pacific Paint (Boysen)',
      shortName: 'Boysen',
      badgeBg: 'rgba(239, 68, 68, 0.12)',
      badgeColor: '#dc2626',
      badgeBorder: 'rgba(239, 68, 68, 0.28)',
      accentColor: '#dc2626',
      logoLetter: 'B'
    },
    davies: {
      key: 'davies',
      name: 'Davies Paints Philippines',
      shortName: 'Davies',
      badgeBg: 'rgba(99, 102, 241, 0.12)',
      badgeColor: '#4f46e5',
      badgeBorder: 'rgba(99, 102, 241, 0.28)',
      accentColor: '#4f46e5',
      logoLetter: 'D'
    },
    buildrite: {
      key: 'buildrite',
      name: 'Buildrite Chemicals',
      shortName: 'Buildrite',
      badgeBg: 'rgba(14, 165, 233, 0.12)',
      badgeColor: '#0284c7',
      badgeBorder: 'rgba(14, 165, 233, 0.28)',
      accentColor: '#0284c7',
      logoLetter: 'BR'
    },
    sika: {
      key: 'sika',
      name: 'Sika Philippines',
      shortName: 'Sika',
      badgeBg: 'rgba(234, 179, 8, 0.15)',
      badgeColor: '#ca8a04',
      badgeBorder: 'rgba(234, 179, 8, 0.3)',
      accentColor: '#ca8a04',
      logoLetter: 'S'
    },
    bostik: {
      key: 'bostik',
      name: 'Bostik Philippines',
      shortName: 'Bostik',
      badgeBg: 'rgba(20, 184, 166, 0.12)',
      badgeColor: '#0d9488',
      badgeBorder: 'rgba(20, 184, 166, 0.28)',
      accentColor: '#0d9488',
      logoLetter: 'BK'
    },
    custom: {
      key: 'custom',
      name: 'Custom / Value Engineered Mix',
      shortName: 'Mix Brand',
      badgeBg: 'rgba(168, 85, 247, 0.12)',
      badgeColor: '#9333ea',
      badgeBorder: 'rgba(168, 85, 247, 0.28)',
      accentColor: '#9333ea',
      logoLetter: 'M'
    }
  };

  // =========================================================================
  // 2. MASTER PRODUCT LOOKUP REGISTRY
  // =========================================================================
  const PRODUCT_LOOKUP_REGISTRY = [
    // BOYSEN PRODUCTS
    {
      id: 'boysen-b-44',
      brandKey: 'boysen',
      code: 'B-44',
      name: 'BOYSEN® Masonry Neutralizer B-44',
      category: 'Surface Prep',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 25.0,
      defaultCoats: 1,
      srp: 420.00,
      notes: 'Dilute 1:9 with water to neutralize high alkalinity (pH > 9)'
    },
    {
      id: 'boysen-b-1705',
      brandKey: 'boysen',
      code: 'B-1705',
      name: 'BOYSEN® Acrytex™ Primer B-1705',
      category: 'Primer',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 25.0,
      defaultCoats: 1,
      srp: 860.00,
      notes: 'Dedicated solvent-based acrylic primer for BOYSEN® Acrytex paint systems'
    },
    {
      id: 'boysen-b-1715',
      brandKey: 'boysen',
      code: 'B-1715',
      name: 'BOYSEN® Acrytex™ Semi-Gloss White B-1715',
      category: 'Topcoat Finish',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 27.5,
      defaultCoats: 2,
      srp: 915.00,
      notes: 'Solvent-based acrylic semi-gloss protective topcoat'
    },
    {
      id: 'boysen-b-7311',
      brandKey: 'boysen',
      code: 'B-7311',
      name: 'BOYSEN® Perma-Putty™ B-7311 High-Build Masonry Putty',
      category: 'Putty / Cast',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 8.0,
      defaultCoats: 1,
      srp: 640.00,
      notes: 'Water-based high-build acrylic spot putty for masonry plaster'
    },
    {
      id: 'boysen-b-310',
      brandKey: 'boysen',
      code: 'B-310',
      name: 'BOYSEN® Chalk Stopper™ B-310 Surface Conditioner',
      category: 'Surface Prep',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 30.0,
      defaultCoats: 1,
      srp: 720.00,
      notes: 'Penetrating surface conditioner for chalking plaster'
    },
    {
      id: 'boysen-b-1350',
      brandKey: 'boysen',
      code: 'B-1350',
      name: 'BOYSEN® Epoxy Primer White B-1350 with Curing Agent',
      category: 'Primer',
      packaging: '4 Liters (Gallon Set)',
      packagingUnit: 'Gallon Set',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 25.0,
      defaultCoats: 1,
      srp: 1150.00,
      notes: '2-pack polyamide cured epoxy primer for concrete and steel'
    },
    {
      id: 'boysen-b-2100',
      brandKey: 'boysen',
      code: 'B-2100',
      name: 'BOYSEN® Epoxy Enamel White B-2100 with Curing Agent',
      category: 'Epoxy Coating',
      packaging: '4 Liters (Gallon Set)',
      packagingUnit: 'Gallon Set',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 25.0,
      defaultCoats: 2,
      srp: 1420.00,
      notes: 'Chemical and abrasion resistant epoxy enamel finish'
    },
    {
      id: 'boysen-k-501',
      brandKey: 'boysen',
      code: 'K-501',
      name: 'BOYSEN® Konstrukt™ Sealtite™ K-501 2K Waterproofing',
      category: 'Waterproofing',
      packaging: '16kg Set',
      packagingUnit: 'Set',
      unitVolume: 16,
      volumeUnit: 'kg',
      coveragePerUnit: 10.0,
      defaultCoats: 2,
      srp: 1180.00,
      notes: 'Flexible 2-pack cementitious waterproof slurry for wet areas'
    },
    {
      id: 'boysen-k-630',
      brandKey: 'boysen',
      code: 'K-630',
      name: 'BOYSEN® Konstrukt™ Join "N" Seal Hybrid PU Sealant',
      category: 'Sealant',
      packaging: '600ml Sausage',
      packagingUnit: 'Sausage',
      unitVolume: 0.6,
      volumeUnit: 'L',
      coveragePerUnit: 12.0,
      defaultCoats: 1,
      srp: 420.00,
      notes: 'Elastomeric hybrid polyurethane joint sealant for facade and control joints'
    },
    {
      id: 'boysen-b-701',
      brandKey: 'boysen',
      code: 'B-701',
      name: 'BOYSEN® Permacoat™ Latex White B-701',
      category: 'Primer',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 27.5,
      defaultCoats: 1,
      srp: 685.00,
      notes: '100% acrylic latex primer for exterior/interior masonry'
    },
    {
      id: 'boysen-b-1711',
      brandKey: 'boysen',
      code: 'B-1711',
      name: 'BOYSEN® Acrytex™ Cast B-1711',
      category: 'Putty / Texture Cast',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 5.5,
      defaultCoats: 1,
      srp: 820.00,
      notes: 'High-build acrylic paste for knock-down or textured relief profiles'
    },
    {
      id: 'boysen-b-1701',
      brandKey: 'boysen',
      code: 'B-1701',
      name: 'BOYSEN® Acrytex™ Flat White B-1701',
      category: 'Topcoat Finish',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 27.5,
      defaultCoats: 2,
      srp: 890.00,
      notes: 'Solvent-based acrylic waterproof protective topcoat'
    },
    {
      id: 'boysen-b-1710',
      brandKey: 'boysen',
      code: 'B-1710',
      name: 'BOYSEN® Acrytex™ Gloss White B-1710',
      category: 'Topcoat Finish',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 27.5,
      defaultCoats: 2,
      srp: 940.00,
      notes: 'High-gloss acrylic barrier finish'
    },
    {
      id: 'boysen-b-1750',
      brandKey: 'boysen',
      code: 'B-1750',
      name: 'BOYSEN® Acrytex™ Reducer B-1750',
      category: 'Thinner / Reducer',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 100.0,
      defaultCoats: 1,
      srp: 540.00,
      notes: 'Specialized aromatic solvent reducer for Acrytex systems'
    },
    {
      id: 'boysen-b-7760',
      brandKey: 'boysen',
      code: 'B-7760',
      name: 'BOYSEN® Plexibond™ B-7760',
      category: 'Waterproofing',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 5.5,
      defaultCoats: 2,
      srp: 890.00,
      notes: 'Cementitious waterproofing compound for firewall, deck, and parapet'
    },
    {
      id: 'boysen-k-201',
      brandKey: 'boysen',
      code: 'K-201',
      name: 'BOYSEN® Konstrukt™ Permaplast™ K-201',
      category: 'Skimcoat',
      packaging: '20kg/bag',
      packagingUnit: 'Bag',
      unitVolume: 20,
      volumeUnit: 'kg',
      coveragePerUnit: 18.0,
      defaultCoats: 1,
      srp: 485.00,
      notes: 'Acrylic water-based superfine skimcoat render'
    },
    {
      id: 'boysen-k-301',
      brandKey: 'boysen',
      code: 'K-301',
      name: 'BOYSEN® Konstrukt™ Tileworks™ K-301 Tile Adhesive',
      category: 'Tile Adhesive',
      packaging: '25kg/bag',
      packagingUnit: 'Bag',
      unitVolume: 25,
      volumeUnit: 'kg',
      coveragePerUnit: 5.0,
      defaultCoats: 1,
      srp: 320.00,
      notes: 'High-adhesion cement-based tile adhesive'
    },
    {
      id: 'boysen-b-2900',
      brandKey: 'boysen',
      code: 'B-2900',
      name: 'BOYSEN® Acqua Epoxy™ B-2900',
      category: 'Epoxy Coating',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 25.0,
      defaultCoats: 2,
      srp: 1450.00,
      notes: 'Water-based epoxy 2-component floor coating'
    },

    // DAVIES PRODUCTS
    {
      id: 'davies-dv-in06',
      brandKey: 'davies',
      code: 'DV-IN06',
      name: 'DAVIES CONCRETE NEUTRALIZER DV-IN06',
      category: 'Surface Prep',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 25.0,
      defaultCoats: 1,
      srp: 390.00,
      notes: 'Acid neutralizer solution to prepare green plaster'
    },
    {
      id: 'davies-dv-in03',
      brandKey: 'davies',
      code: 'DV-IN03',
      name: 'DAVIES MEGACRYL CONCRETE PRIMER DV-IN03',
      category: 'Primer',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 27.5,
      defaultCoats: 1,
      srp: 680.00,
      notes: '100% acrylic water-based concrete primer & sealer'
    },
    {
      id: 'davies-dv-ex03',
      brandKey: 'davies',
      code: 'DV-EX03',
      name: 'DAVIES LIQUID TILE CAST DV-EX03',
      category: 'Putty / Texture Cast',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 5.5,
      defaultCoats: 1,
      srp: 850.00,
      notes: 'Putty-like acrylic paste for architectural textured profile'
    },
    {
      id: 'davies-dv-ex06',
      brandKey: 'davies',
      code: 'DV-EX06',
      name: 'DAVIES LIQUID TILE PRIMER DV-EX06',
      category: 'Primer / Sealer',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 27.5,
      defaultCoats: 1,
      srp: 850.00,
      notes: 'Intermediate protective primer for sealing Liquid Tile cast'
    },
    {
      id: 'davies-dv-ex07',
      brandKey: 'davies',
      code: 'DV-EX07',
      name: 'DAVIES LIQUID TILE DV-EX07',
      category: 'Topcoat Finish',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 25.0,
      defaultCoats: 2,
      srp: 850.00,
      notes: 'Heavy-duty solvent-based acrylic glossy protective topcoat'
    },
    {
      id: 'davies-dv-ex08',
      brandKey: 'davies',
      code: 'DV-EX08',
      name: 'DAVIES LIQUID TILE REDUCER DV-EX08',
      category: 'Thinner / Reducer',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 100.0,
      defaultCoats: 1,
      srp: 520.00,
      notes: 'Solvent thinner for Davies Liquid Tile brush/spray application'
    },
    {
      id: 'davies-dv-ex13',
      brandKey: 'davies',
      code: 'DV-EX13',
      name: 'DAVIES SUN & RAIN DV-EX13',
      category: 'Waterproofing / Topcoat',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 22.5,
      defaultCoats: 2,
      srp: 760.00,
      notes: '100% acrylic elastomeric waterproof wall paint'
    },
    {
      id: 'davies-mondo-sk1',
      brandKey: 'davies',
      code: 'SK-1',
      name: 'DAVIES MONDO™ SK-1 Skimcoat Superfine',
      category: 'Skimcoat',
      packaging: '20kg/bag',
      packagingUnit: 'Bag',
      unitVolume: 20,
      volumeUnit: 'kg',
      coveragePerUnit: 19.0,
      defaultCoats: 1,
      srp: 470.00,
      notes: 'Superfine white powder skimcoat for interior & exterior plaster'
    },
    {
      id: 'davies-epoxy-primer',
      brandKey: 'davies',
      code: 'DV-92-00',
      name: 'DAVIES EPOXY PRIMER DV-92-00',
      category: 'Epoxy Coating',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 25.0,
      defaultCoats: 1,
      srp: 980.00,
      notes: 'High-grade 2-pack polyamide cured epoxy primer'
    },
    {
      id: 'davies-dv-1350',
      brandKey: 'davies',
      code: 'DV-1350',
      name: 'DAVIES Epoxy Primer White DV-1350',
      category: 'Primer',
      packaging: '4 Liters (Gallon Set)',
      packagingUnit: 'Gallon Set',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 25.0,
      defaultCoats: 1,
      srp: 1120.00,
      notes: 'Two-component polyamide epoxy primer for masonry and metals'
    },
    {
      id: 'davies-dv-500',
      brandKey: 'davies',
      code: 'DV-500',
      name: 'DAVIES Pondo Masonry Putty DV-500',
      category: 'Putty / Cast',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 9.0,
      defaultCoats: 1,
      srp: 580.00,
      notes: 'Water-based putty for interior/exterior concrete imperfections'
    },
    {
      id: 'davies-dv-60-00',
      brandKey: 'davies',
      code: 'DV-60-00',
      name: 'DAVIES Roofshield 100% Acrylic Roof Coating',
      category: 'Topcoat Finish',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 25.0,
      defaultCoats: 2,
      srp: 810.00,
      notes: 'Weatherproof elastomeric roof paint'
    },
    {
      id: 'davies-dv-1300',
      brandKey: 'davies',
      code: 'DV-1300',
      name: 'DAVIES Acreex Chlorinated Rubber Floor Coating',
      category: 'Floor Coating',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 20.0,
      defaultCoats: 2,
      srp: 1280.00,
      notes: 'Heavy-duty chemical and traffic resistant chlorinated rubber paint'
    },

    // BUILDRITE PRODUCTS
    {
      id: 'buildrite-etch',
      brandKey: 'buildrite',
      code: 'BR-ETCH',
      name: 'BUILDRITE Acid Etch & Cleaner',
      category: 'Surface Prep',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 30.0,
      defaultCoats: 1,
      srp: 360.00,
      notes: 'Surface de-greaser and efflorescence remover'
    },
    {
      id: 'buildrite-blockout-40',
      brandKey: 'buildrite',
      code: 'BR-FS11',
      name: 'BUILDRITE Blockout 40 Concrete Sealer',
      category: 'Primer',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 26.0,
      defaultCoats: 1,
      srp: 840.00,
      notes: 'Nano-penetrating alkali-resistant primer and damp sealer'
    },
    {
      id: 'buildrite-tofil-800',
      brandKey: 'buildrite',
      code: 'BR-001',
      name: 'BUILDRITE Tofil 800 Intra White',
      category: 'Skimcoat',
      packaging: '20kg/bag',
      packagingUnit: 'Bag',
      unitVolume: 20,
      volumeUnit: 'kg',
      coveragePerUnit: 20.0,
      defaultCoats: 1,
      srp: 459.00,
      notes: 'Superfine skim coat for interior walls and ceilings'
    },
    {
      id: 'buildrite-tofil-801',
      brandKey: 'buildrite',
      code: 'BR-002',
      name: 'BUILDRITE Tofil 801 Extra White',
      category: 'Skimcoat',
      packaging: '20kg/bag',
      packagingUnit: 'Bag',
      unitVolume: 20,
      volumeUnit: 'kg',
      coveragePerUnit: 20.0,
      defaultCoats: 1,
      srp: 518.00,
      notes: 'Superfine exterior & interior skim coat with water-repellent polymers'
    },
    {
      id: 'buildrite-tofil-802',
      brandKey: 'buildrite',
      code: 'BR-004',
      name: 'BUILDRITE Tofil 802 White Paste Putty',
      category: 'Putty / Texture Cast',
      packaging: '25kg/pail',
      packagingUnit: 'Pail',
      unitVolume: 25,
      volumeUnit: 'kg',
      coveragePerUnit: 16.0,
      defaultCoats: 1,
      srp: 620.00,
      notes: 'Ready-to-use acrylic paste putty for patching and texturing'
    },
    {
      id: 'buildrite-sapal-rtu',
      brandKey: 'buildrite',
      code: 'BR-WP01',
      name: 'BUILDRITE Sapal RTU Polyurethane Waterproofing',
      category: 'Waterproofing',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 10.0,
      defaultCoats: 2,
      srp: 1150.00,
      notes: 'Seamless water-based polyurethane elastomeric waterproofing membrane'
    },
    {
      id: 'buildrite-tile-adhesive',
      brandKey: 'buildrite',
      code: 'BR-TA01',
      name: 'BUILDRITE Tile Velvet Standard Tile Adhesive',
      category: 'Tile Adhesive',
      packaging: '25kg/bag',
      packagingUnit: 'Bag',
      unitVolume: 25,
      volumeUnit: 'kg',
      coveragePerUnit: 5.5,
      defaultCoats: 1,
      srp: 310.00,
      notes: 'Polymer-modified cement tile adhesive for ceramic and porcelain'
    },
    {
      id: 'buildrite-rainproof',
      brandKey: 'buildrite',
      code: 'BR-FC01',
      name: 'BUILDRITE Rainproof Weather Guard Topcoat',
      category: 'Topcoat Finish',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 25.0,
      defaultCoats: 2,
      srp: 890.00,
      notes: '100% acrylic all-weather dirt-shedding architectural topcoat'
    },
    {
      id: 'buildrite-br-fs12',
      brandKey: 'buildrite',
      code: 'BR-FS12',
      name: 'BUILDRITE Basecoat Adhesive',
      category: 'Bonding / Basecoat',
      packaging: '25kg/bag',
      packagingUnit: 'Bag',
      unitVolume: 25,
      volumeUnit: 'kg',
      coveragePerUnit: 12.0,
      defaultCoats: 1,
      srp: 495.00,
      notes: 'Polymer modified basecoat for EPS boards, precast, and render adhesion'
    },
    {
      id: 'buildrite-br-fs13',
      brandKey: 'buildrite',
      code: 'BR-FS13',
      name: 'BUILDRITE Tofil 812 Kryocrete Waterproof Render',
      category: 'Waterproofing / Render',
      packaging: '25kg/bag',
      packagingUnit: 'Bag',
      unitVolume: 25,
      volumeUnit: 'kg',
      coveragePerUnit: 14.0,
      defaultCoats: 1,
      srp: 580.00,
      notes: 'Crystalline waterproofing render barrier against water ingress'
    },
    {
      id: 'buildrite-br-fs15',
      brandKey: 'buildrite',
      code: 'BR-FS15',
      name: 'BUILDRITE Tofil 806 Joint Compound',
      category: 'Joint Compound',
      packaging: '28kg/pail',
      packagingUnit: 'Pail',
      unitVolume: 28,
      volumeUnit: 'kg',
      coveragePerUnit: 25.0,
      defaultCoats: 2,
      srp: 680.00,
      notes: 'Ready-mixed jointing compound for gypsum boards and fiber cement'
    },
    {
      id: 'buildrite-br-wp02',
      brandKey: 'buildrite',
      code: 'BR-WP02',
      name: 'BUILDRITE Flexicote Cementitious Waterproofing',
      category: 'Waterproofing',
      packaging: '20kg Set',
      packagingUnit: 'Set',
      unitVolume: 20,
      volumeUnit: 'kg',
      coveragePerUnit: 12.0,
      defaultCoats: 2,
      srp: 1450.00,
      notes: '2-component flexible acrylic polymer modified cement slurry'
    },
    {
      id: 'buildrite-br-ep01',
      brandKey: 'buildrite',
      code: 'BR-EP01',
      name: 'BUILDRITE Epocoat MB Epoxy Moisture Barrier Primer',
      category: 'Primer',
      packaging: '4 Liters (Gallon Set)',
      packagingUnit: 'Gallon Set',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 22.0,
      defaultCoats: 1,
      srp: 1550.00,
      notes: '100% solids epoxy damp-proof primer for concrete floors'
    },
    {
      id: 'buildrite-br-ep02',
      brandKey: 'buildrite',
      code: 'BR-EP02',
      name: 'BUILDRITE Epofloor High-Gloss Epoxy Topcoat',
      category: 'Epoxy Coating',
      packaging: '4 Liters (Gallon Set)',
      packagingUnit: 'Gallon Set',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 20.0,
      defaultCoats: 2,
      srp: 1980.00,
      notes: 'Self-smoothing decorative high-traffic floor epoxy'
    },

    // SIKA PRODUCTS
    {
      id: 'sika-sikalatex',
      brandKey: 'sika',
      code: 'SIKA-LATEX',
      name: 'SIKA SikaLatex® Synthetic Bonding Agent',
      category: 'Primer / Bonding',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 28.0,
      defaultCoats: 1,
      srp: 820.00,
      notes: 'Water-resistant polymer bonding agent for mortars and slurries'
    },
    {
      id: 'sika-top-seal-107',
      brandKey: 'sika',
      code: 'SIKA-107',
      name: 'SIKA SikaTop® Seal-107 2-Component Polymer Slurry',
      category: 'Waterproofing',
      packaging: '25kg Kit (5kg Liq + 20kg Pwd)',
      packagingUnit: 'Kit',
      unitVolume: 25,
      volumeUnit: 'kg',
      coveragePerUnit: 12.5,
      defaultCoats: 2,
      srp: 1850.00,
      notes: 'Heavy-duty polymer-modified waterproofing slurry for concrete structures'
    },
    {
      id: 'sika-sikawall-192',
      brandKey: 'sika',
      code: 'SIKA-W192',
      name: 'SIKA SikaWall®-192 Superfine White Skimcoat',
      category: 'Skimcoat',
      packaging: '20kg/bag',
      packagingUnit: 'Bag',
      unitVolume: 20,
      volumeUnit: 'kg',
      coveragePerUnit: 19.0,
      defaultCoats: 1,
      srp: 520.00,
      notes: 'Smooth, crack-resistant cementitious fairing skimcoat'
    },
    {
      id: 'sika-sikafloor-161',
      brandKey: 'sika',
      code: 'SIKA-F161',
      name: 'SIKA Sikafloor®-161 Epoxy Primer',
      category: 'Epoxy Coating',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 22.0,
      defaultCoats: 1,
      srp: 1650.00,
      notes: '2-part low-viscosity epoxy primer for concrete substrates'
    },
    {
      id: 'sika-sikafloor-264',
      brandKey: 'sika',
      code: 'SIKA-F264',
      name: 'SIKA Sikafloor®-264 Structural Epoxy Topcoat',
      category: 'Epoxy Coating',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 16.0,
      defaultCoats: 2,
      srp: 2350.00,
      notes: 'Coloured epoxy roller & seal coat for industrial high-traffic floors'
    },
    {
      id: 'sika-105',
      brandKey: 'sika',
      code: 'SIKA-105',
      name: 'SIKA SikaTop®-105 Seal Polymer Waterproofing',
      category: 'Waterproofing',
      packaging: '25kg Kit',
      packagingUnit: 'Kit',
      unitVolume: 25,
      volumeUnit: 'kg',
      coveragePerUnit: 12.0,
      defaultCoats: 2,
      srp: 1720.00,
      notes: '2-component polymer modified cementitious slurry'
    },
    {
      id: 'sika-pro3',
      brandKey: 'sika',
      code: 'SIKA-PRO3',
      name: 'SIKA Sikaflex® PRO-3 Polyurethane Joint Sealant',
      category: 'Sealant',
      packaging: '600ml Sausage',
      packagingUnit: 'Sausage',
      unitVolume: 0.6,
      volumeUnit: 'L',
      coveragePerUnit: 10.0,
      defaultCoats: 1,
      srp: 490.00,
      notes: 'High-performance polyurethane sealant for floor and civil engineering joints'
    },
    {
      id: 'sika-11fc',
      brandKey: 'sika',
      code: 'SIKA-11FC',
      name: 'SIKA Sikaflex®-11 FC+ Adhesive & Sealant',
      category: 'Sealant',
      packaging: '310ml Cartridge',
      packagingUnit: 'Cartridge',
      unitVolume: 0.31,
      volumeUnit: 'L',
      coveragePerUnit: 6.0,
      defaultCoats: 1,
      srp: 380.00,
      notes: '1-component polyurethane elastic adhesive and joint sealant'
    },
    {
      id: 'sika-mono',
      brandKey: 'sika',
      code: 'SIKA-MONO',
      name: 'SIKA Sika MonoTop®-615 Structural Repair Mortar',
      category: 'Surface Prep / Repair',
      packaging: '25kg/bag',
      packagingUnit: 'Bag',
      unitVolume: 25,
      volumeUnit: 'kg',
      coveragePerUnit: 14.0,
      defaultCoats: 1,
      srp: 650.00,
      notes: 'Polymer-modified structural patch and repair mortar'
    },

    // BOSTIK PRODUCTS
    {
      id: 'bostik-dampfix-pu',
      brandKey: 'bostik',
      code: 'BK-DFPU',
      name: 'BOSTIK Dampfix PU Polyurethane Waterproofing',
      category: 'Waterproofing',
      packaging: '4 Liters (Gallon)',
      packagingUnit: 'Gallon',
      unitVolume: 4,
      volumeUnit: 'L',
      coveragePerUnit: 9.0,
      defaultCoats: 2,
      srp: 1650.00,
      notes: 'Elastomeric class III liquid polyurethane membrane'
    },
    {
      id: 'bostik-fixall-tile',
      brandKey: 'bostik',
      code: 'BK-FIXALL',
      name: 'BOSTIK Fixall Standard Tile Adhesive',
      category: 'Tile Adhesive',
      packaging: '25kg/bag',
      packagingUnit: 'Bag',
      unitVolume: 25,
      volumeUnit: 'kg',
      coveragePerUnit: 5.0,
      defaultCoats: 1,
      srp: 330.00,
      notes: 'Premium polymer-modified tile adhesive'
    },
    {
      id: 'bostik-bk-hydr',
      brandKey: 'bostik',
      code: 'BK-HYDR',
      name: 'BOSTIK Hydroment 4 Ceramic Tile Grout',
      category: 'Tile Grout',
      packaging: '5kg/bag',
      packagingUnit: 'Bag',
      unitVolume: 5,
      volumeUnit: 'kg',
      coveragePerUnit: 15.0,
      defaultCoats: 1,
      srp: 180.00,
      notes: 'Antimicrobial polymer-modified tile joint grout'
    },
    {
      id: 'bostik-bk-powdfx',
      brandKey: 'bostik',
      code: 'BK-POWDFX',
      name: 'BOSTIK Powrfix Polymer Modified Tile Adhesive',
      category: 'Tile Adhesive',
      packaging: '25kg/bag',
      packagingUnit: 'Bag',
      unitVolume: 25,
      volumeUnit: 'kg',
      coveragePerUnit: 5.5,
      defaultCoats: 1,
      srp: 395.00,
      notes: 'High-strength flexible tile adhesive for heavy porcelain'
    },
    {
      id: 'bostik-bk-seal',
      brandKey: 'bostik',
      code: 'BK-SEAL',
      name: 'BOSTIK Seal \'N\' Flex 1 Polyurethane Construction Sealant',
      category: 'Sealant',
      packaging: '600ml Sausage',
      packagingUnit: 'Sausage',
      unitVolume: 0.6,
      volumeUnit: 'L',
      coveragePerUnit: 12.0,
      defaultCoats: 1,
      srp: 460.00,
      notes: 'Low-modulus polyurethane joint sealant for precast and expansion joints'
    },

    // AUXILIARY COMMODITIES
    {
      id: 'gen-portland-cement',
      brandKey: 'custom',
      code: 'CEM-01',
      name: 'Holcim Excel Type 1P Portland Cement',
      category: 'Surface Prep / Mortar',
      packaging: '40kg/bag',
      packagingUnit: 'Bag',
      unitVolume: 40,
      volumeUnit: 'kg',
      coveragePerUnit: 35.0,
      defaultCoats: 1,
      srp: 240.00,
      notes: 'For mixing with cementitious additives like Plexibond or SikaLatex'
    }
  ];

  // =========================================================================
  // 3. PRE-CONFIGURED WORK SYSTEM TEMPLATES
  // =========================================================================
  const COMPARISON_SYSTEM_TEMPLATES = [
    {
      id: 'system-exterior-textured-wall',
      name: 'Exterior Heavy-Duty Textured Wall System (Acrytex vs Liquid Tile)',
      category: 'Architectural Exterior Coatings',
      defaultArea: 100,
      description: 'Manufacturer-certified multi-stage textured barrier system for exterior masonry walls, firewalls, and parapets against moisture, dirt, and efflorescence.',
      columns: [
        {
          id: 'col-boysen-acrytex',
          brandKey: 'boysen',
          title: 'Catalog 1: Boysen Acrytex System (B-1701 Flat)',
          subtitle: 'Manufacturer Procedure: Neutralizer &rarr; Primer &rarr; Cast &rarr; Topcoat &rarr; Reducer',
          stages: [
            {
              stageNum: 1,
              stageName: 'Stage 1: Substrate Neutralizer',
              stageRole: 'Surface Prep',
              productId: 'boysen-b-44',
              coats: 1,
              coveragePerUnit: 25.0,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 420.00
            },
            {
              stageNum: 2,
              stageName: 'Stage 2: Acrytex Primer B-1705',
              stageRole: 'Primer',
              productId: 'boysen-b-1705',
              coats: 1,
              coveragePerUnit: 25.0,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 860.00
            },
            {
              stageNum: 3,
              stageName: 'Stage 3: High-Build Textured Cast',
              stageRole: 'Putty / Cast',
              productId: 'boysen-b-1711',
              coats: 1,
              coveragePerUnit: 5.5,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 820.00
            },
            {
              stageNum: 4,
              stageName: 'Stage 4: Acrytex Finish Topcoat (2 Coats)',
              stageRole: 'Topcoat Finish',
              productId: 'boysen-b-1701',
              coats: 2,
              coveragePerUnit: 27.5,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 890.00
            },
            {
              stageNum: 5,
              stageName: 'Stage 5: Solvent Reducer Thinner',
              stageRole: 'Thinner / Reducer',
              productId: 'boysen-b-1750',
              coats: 1,
              coveragePerUnit: 100.0,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 540.00
            }
          ]
        },
        {
          id: 'col-davies-liquid-tile',
          brandKey: 'davies',
          title: 'Catalog 2: Davies Liquid Tile System (DV-EX07)',
          subtitle: 'Manufacturer Procedure: Neutralizer &rarr; Primer &rarr; Cast &rarr; Tile Primer &rarr; Topcoat &rarr; Reducer',
          stages: [
            {
              stageNum: 1,
              stageName: 'Stage 1: Substrate Neutralizer',
              stageRole: 'Surface Prep',
              productId: 'davies-dv-in06',
              coats: 1,
              coveragePerUnit: 25.0,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 390.00
            },
            {
              stageNum: 2,
              stageName: 'Stage 2: Megacryl Base Primer',
              stageRole: 'Primer',
              productId: 'davies-dv-in03',
              coats: 1,
              coveragePerUnit: 27.5,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 680.00
            },
            {
              stageNum: 3,
              stageName: 'Stage 3: Liquid Tile Textured Cast',
              stageRole: 'Putty / Cast',
              productId: 'davies-dv-ex03',
              coats: 1,
              coveragePerUnit: 5.5,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 850.00
            },
            {
              stageNum: 4,
              stageName: 'Stage 4: Liquid Tile Intermediate Primer',
              stageRole: 'Primer / Sealer',
              productId: 'davies-dv-ex06',
              coats: 1,
              coveragePerUnit: 27.5,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 850.00
            },
            {
              stageNum: 5,
              stageName: 'Stage 5: Liquid Tile Finish Topcoat (2 Coats)',
              stageRole: 'Topcoat Finish',
              productId: 'davies-dv-ex07',
              coats: 2,
              coveragePerUnit: 25.0,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 850.00
            },
            {
              stageNum: 6,
              stageName: 'Stage 6: Liquid Tile Reducer Thinner',
              stageRole: 'Thinner / Reducer',
              productId: 'davies-dv-ex08',
              coats: 1,
              coveragePerUnit: 100.0,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 520.00
            }
          ]
        }
      ]
    },

    {
      id: 'system-waterproofing',
      name: 'Cementitious & Liquid Waterproofing System',
      category: 'Waterproofing & Moisture Protection',
      defaultArea: 100,
      description: 'Side-by-side comparison of multi-coat waterproofing membranes for roof decks, balconies, firewalls, and wet areas.',
      columns: [
        {
          id: 'col-boysen-plexibond',
          brandKey: 'boysen',
          title: 'Catalog 1: Boysen Plexibond System',
          subtitle: 'Neutralizer &rarr; Plexibond Slurry (1:1 with Cement) &rarr; Protective Latex Topcoat',
          stages: [
            {
              stageNum: 1,
              stageName: 'Stage 1: Masonry Neutralizer',
              stageRole: 'Surface Prep',
              productId: 'boysen-b-44',
              coats: 1,
              coveragePerUnit: 25.0,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 420.00
            },
            {
              stageNum: 2,
              stageName: 'Stage 2: Plexibond Acrylic Slurry (2 Coats)',
              stageRole: 'Waterproofing',
              productId: 'boysen-b-7760',
              coats: 2,
              coveragePerUnit: 5.5,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 890.00
            },
            {
              stageNum: 3,
              stageName: 'Stage 3: Portland Cement Matrix Blend',
              stageRole: 'Surface Prep / Mortar',
              productId: 'gen-portland-cement',
              coats: 1,
              coveragePerUnit: 25.0,
              packaging: '40kg/bag',
              packagingUnit: 'Bag',
              unitCost: 240.00
            },
            {
              stageNum: 4,
              stageName: 'Stage 4: Permacoat Protective Topcoat (2 Coats)',
              stageRole: 'Topcoat Finish',
              productId: 'boysen-b-701',
              coats: 2,
              coveragePerUnit: 27.5,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 685.00
            }
          ]
        },
        {
          id: 'col-buildrite-sapal',
          brandKey: 'buildrite',
          title: 'Catalog 2: Buildrite Sapal RTU System',
          subtitle: 'Surface Clean &rarr; Blockout 40 Primer &rarr; Sapal RTU Polyurethane Membrane &rarr; Rainproof Topcoat',
          stages: [
            {
              stageNum: 1,
              stageName: 'Stage 1: Acid Etch & Surface Cleaner',
              stageRole: 'Surface Prep',
              productId: 'buildrite-etch',
              coats: 1,
              coveragePerUnit: 30.0,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 360.00
            },
            {
              stageNum: 2,
              stageName: 'Stage 2: Blockout 40 Nano-Penetrating Sealer',
              stageRole: 'Primer',
              productId: 'buildrite-blockout-40',
              coats: 1,
              coveragePerUnit: 26.0,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 840.00
            },
            {
              stageNum: 3,
              stageName: 'Stage 3: Sapal RTU Polyurethane Membrane (2 Coats)',
              stageRole: 'Waterproofing',
              productId: 'buildrite-sapal-rtu',
              coats: 2,
              coveragePerUnit: 10.0,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 1150.00
            },
            {
              stageNum: 4,
              stageName: 'Stage 4: Rainproof UV Shield Topcoat (2 Coats)',
              stageRole: 'Topcoat Finish',
              productId: 'buildrite-rainproof',
              coats: 2,
              coveragePerUnit: 25.0,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 890.00
            }
          ]
        },
        {
          id: 'col-sika-topseal',
          brandKey: 'sika',
          title: 'Catalog 3: SikaTop Seal-107 System',
          subtitle: 'Bonding Primer &rarr; 2-Component Polymer Slurry (2mm) &rarr; Protective Screed',
          stages: [
            {
              stageNum: 1,
              stageName: 'Stage 1: SikaLatex Bonding Slurry Primer',
              stageRole: 'Primer / Bonding',
              productId: 'sika-sikalatex',
              coats: 1,
              coveragePerUnit: 28.0,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 820.00
            },
            {
              stageNum: 2,
              stageName: 'Stage 2: SikaTop Seal-107 2-Component Kit (2 Coats)',
              stageRole: 'Waterproofing',
              productId: 'sika-top-seal-107',
              coats: 2,
              coveragePerUnit: 12.5,
              packaging: '25kg Kit (5kg Liq + 20kg Pwd)',
              packagingUnit: 'Kit',
              unitCost: 1850.00
            },
            {
              stageNum: 3,
              stageName: 'Stage 3: Portland Cement Matrix Cap',
              stageRole: 'Surface Prep / Mortar',
              productId: 'gen-portland-cement',
              coats: 1,
              coveragePerUnit: 30.0,
              packaging: '40kg/bag',
              packagingUnit: 'Bag',
              unitCost: 240.00
            }
          ]
        }
      ]
    },

    {
      id: 'system-wall-skimcoat',
      name: 'Wall Skimcoat & Surface Smoothing System',
      category: 'Finishing & Plastering',
      defaultArea: 100,
      description: 'Comparative cost analysis for rendering fair-faced smooth interior and exterior masonry walls prior to final painting.',
      columns: [
        {
          id: 'col-buildrite-tofil',
          brandKey: 'buildrite',
          title: 'Catalog 1: Buildrite Tofil 801 Extra System',
          subtitle: 'Cleaner &rarr; Tofil 801 Extra Skimcoat (20kg) &rarr; Permacoat Primer',
          stages: [
            {
              stageNum: 1,
              stageName: 'Stage 1: Surface Preparation Cleaner',
              stageRole: 'Surface Prep',
              productId: 'buildrite-etch',
              coats: 1,
              coveragePerUnit: 30.0,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 360.00
            },
            {
              stageNum: 2,
              stageName: 'Stage 2: Tofil 801 Extra Superfine Skimcoat',
              stageRole: 'Skimcoat',
              productId: 'buildrite-tofil-801',
              coats: 1,
              coveragePerUnit: 20.0,
              packaging: '20kg/bag',
              packagingUnit: 'Bag',
              unitCost: 518.00
            },
            {
              stageNum: 3,
              stageName: 'Stage 3: Acrylic Wall Primer',
              stageRole: 'Primer',
              productId: 'davies-dv-in03',
              coats: 1,
              coveragePerUnit: 27.5,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 680.00
            }
          ]
        },
        {
          id: 'col-boysen-permaplast',
          brandKey: 'boysen',
          title: 'Catalog 2: Boysen Konstrukt Permaplast K-201',
          subtitle: 'Neutralizer &rarr; Konstrukt K-201 Skimcoat &rarr; Permacoat Primer',
          stages: [
            {
              stageNum: 1,
              stageName: 'Stage 1: Masonry Neutralizer',
              stageRole: 'Surface Prep',
              productId: 'boysen-b-44',
              coats: 1,
              coveragePerUnit: 25.0,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 420.00
            },
            {
              stageNum: 2,
              stageName: 'Stage 2: Konstrukt Permaplast K-201 Acrylic Skimcoat',
              stageRole: 'Skimcoat',
              productId: 'boysen-k-201',
              coats: 1,
              coveragePerUnit: 18.0,
              packaging: '20kg/bag',
              packagingUnit: 'Bag',
              unitCost: 485.00
            },
            {
              stageNum: 3,
              stageName: 'Stage 3: Permacoat Primer B-701',
              stageRole: 'Primer',
              productId: 'boysen-b-701',
              coats: 1,
              coveragePerUnit: 27.5,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 685.00
            }
          ]
        },
        {
          id: 'col-davies-mondo',
          brandKey: 'davies',
          title: 'Catalog 3: Davies Mondo SK-1 System',
          subtitle: 'Neutralizer &rarr; Mondo SK-1 Superfine &rarr; Megacryl Primer',
          stages: [
            {
              stageNum: 1,
              stageName: 'Stage 1: Concrete Neutralizer',
              stageRole: 'Surface Prep',
              productId: 'davies-dv-in06',
              coats: 1,
              coveragePerUnit: 25.0,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 390.00
            },
            {
              stageNum: 2,
              stageName: 'Stage 2: Mondo SK-1 Superfine White Skimcoat',
              stageRole: 'Skimcoat',
              productId: 'davies-mondo-sk1',
              coats: 1,
              coveragePerUnit: 19.0,
              packaging: '20kg/bag',
              packagingUnit: 'Bag',
              unitCost: 470.00
            },
            {
              stageNum: 3,
              stageName: 'Stage 3: Megacryl Concrete Primer',
              stageRole: 'Primer',
              productId: 'davies-dv-in03',
              coats: 1,
              coveragePerUnit: 27.5,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 680.00
            }
          ]
        }
      ]
    },

    {
      id: 'system-floor-epoxy',
      name: 'Floor Epoxy Coating System',
      category: 'Flooring & Industrial Coatings',
      defaultArea: 100,
      description: 'Heavy-duty epoxy floor coating procedure for warehouses, commercial parking, and cleanrooms.',
      columns: [
        {
          id: 'col-sika-epoxy',
          brandKey: 'sika',
          title: 'Catalog 1: Sika Sikafloor System',
          subtitle: 'Acid Etch &rarr; Sikafloor-161 Primer &rarr; Sikafloor-264 Topcoat (2 coats)',
          stages: [
            {
              stageNum: 1,
              stageName: 'Stage 1: Acid Etch & De-greaser',
              stageRole: 'Surface Prep',
              productId: 'buildrite-etch',
              coats: 1,
              coveragePerUnit: 30.0,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 360.00
            },
            {
              stageNum: 2,
              stageName: 'Stage 2: Sikafloor-161 2-Part Epoxy Primer',
              stageRole: 'Primer',
              productId: 'sika-sikafloor-161',
              coats: 1,
              coveragePerUnit: 22.0,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 1650.00
            },
            {
              stageNum: 3,
              stageName: 'Stage 3: Sikafloor-264 Structural Epoxy (2 Coats)',
              stageRole: 'Epoxy Coating',
              productId: 'sika-sikafloor-264',
              coats: 2,
              coveragePerUnit: 16.0,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 2350.00
            }
          ]
        },
        {
          id: 'col-boysen-acqua-epoxy',
          brandKey: 'boysen',
          title: 'Catalog 2: Boysen Acqua Epoxy System',
          subtitle: 'Neutralizer &rarr; Acqua Epoxy B-2900 (2 coats)',
          stages: [
            {
              stageNum: 1,
              stageName: 'Stage 1: Masonry Neutralizer',
              stageRole: 'Surface Prep',
              productId: 'boysen-b-44',
              coats: 1,
              coveragePerUnit: 25.0,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 420.00
            },
            {
              stageNum: 2,
              stageName: 'Stage 2: Acqua Epoxy 2-Part Floor Coating (2 Coats)',
              stageRole: 'Epoxy Coating',
              productId: 'boysen-b-2900',
              coats: 2,
              coveragePerUnit: 25.0,
              packaging: '4 Liters (Gallon)',
              packagingUnit: 'Gallon',
              unitCost: 1450.00
            }
          ]
        }
      ]
    }
  ];

  // =========================================================================
  // 4. CALCULATION ENGINE
  // =========================================================================
  const SystemEstimatorEngine = {
    findProduct(productId) {
      return PRODUCT_LOOKUP_REGISTRY.find(p => p.id === productId) || null;
    },

    calculateStage(stage, areaSqM) {
      const area = Math.max(0.1, parseFloat(areaSqM) || 100);
      const coats = Math.max(1, parseInt(stage.coats, 10) || 1);
      const coveragePerUnit = Math.max(0.1, parseFloat(stage.coveragePerUnit) || 25);
      const unitCost = Math.max(0, parseFloat(stage.unitCost) || 0);

      const effectiveArea = area * coats;
      const prod = this.findProduct(stage.productId);
      const unitVol = prod ? prod.unitVolume : 4;
      const spreadPerMeasure = coveragePerUnit / unitVol;

      const exactUnits = effectiveArea / coveragePerUnit;
      const roundedUnits = Math.ceil(exactUnits);

      const totalCost = roundedUnits * unitCost;
      const theoreticalCost = exactUnits * unitCost;

      const costPerSqM = totalCost / area;
      const theorCostPerSqM = theoreticalCost / area;

      return {
        area,
        coats,
        coveragePerUnit,
        unitCost,
        effectiveArea,
        spreadPerMeasure,
        volumeUnit: prod ? prod.volumeUnit : 'L',
        packagingUnit: stage.packagingUnit || (prod ? prod.packagingUnit : 'Unit'),
        exactUnits,
        roundedUnits,
        totalCost,
        theoreticalCost,
        costPerSqM,
        theorCostPerSqM
      };
    },

    calculateColumn(column, areaSqM) {
      const area = Math.max(0.1, parseFloat(areaSqM) || 100);
      const computedStages = [];
      let grandTotalCost = 0;
      let grandTheorCost = 0;
      let totalPackages = 0;

      const stages = column.stages || [];
      stages.forEach((stage, idx) => {
        const calc = this.calculateStage(stage, area);
        const prod = this.findProduct(stage.productId);
        
        computedStages.push({
          ...stage,
          stageIndex: idx,
          product: prod,
          calc
        });

        grandTotalCost += calc.totalCost;
        grandTheorCost += calc.theoreticalCost;
        totalPackages += calc.roundedUnits;
      });

      const grandCostPerSqM = grandTotalCost / area;
      const grandTheorCostPerSqM = grandTheorCost / area;

      return {
        ...column,
        computedStages,
        grandTotalCost,
        grandTheorCost,
        grandCostPerSqM,
        grandTheorCostPerSqM,
        totalPackages,
        area
      };
    },

    compareColumns(columns, areaSqM) {
      const computedColumns = columns.map(col => this.calculateColumn(col, areaSqM));

      if (computedColumns.length === 0) {
        return { columns: [], lowestCostSqM: 0, highestCostSqM: 0 };
      }

      let lowestCost = Infinity;
      let lowestIndex = -1;
      let highestCost = -Infinity;

      computedColumns.forEach((c, idx) => {
        if (c.grandCostPerSqM < lowestCost) {
          lowestCost = c.grandCostPerSqM;
          lowestIndex = idx;
        }
        if (c.grandCostPerSqM > highestCost) {
          highestCost = c.grandCostPerSqM;
        }
      });

      computedColumns.forEach((col, idx) => {
        col.isLowestCost = (idx === lowestIndex);
        col.diffFromLowest = col.grandCostPerSqM - lowestCost;
        col.percentDiffFromLowest = lowestCost > 0 ? ((col.grandCostPerSqM - lowestCost) / lowestCost) * 100 : 0;
      });

      return {
        columns: computedColumns,
        lowestCostSqM: lowestCost,
        highestCostSqM: highestCost,
        lowestIndex
      };
    }
  };

  // =========================================================================
  // 5. INTERACTIVE UI CONTROLLER
  // =========================================================================
  class ComparisonController {
    constructor() {
      this.currentSystemId = 'system-exterior-textured-wall';
      this.areaSqM = 100;
      this.columns = [];
      this.viewMode = 'cards'; // 'cards' | 'boq'
      this.activeModuleTab = 'matrix'; // 'matrix' | 'systems'
      this.isInitialized = false;
      this.STORAGE_KEY = 'fcl_product_comparison_state_v2';
      this.SYSTEMS_STORAGE_KEY = 'fcldc_custom_comparison_systems_v1';
      this.CUSTOM_PRODUCTS_STORAGE_KEY = 'fcl_imported_comparison_products_v1';
      this.activeSystemToEditId = 'system-exterior-textured-wall';
      this.activeCatalogColIdx = 0;
    }

    init() {
      if (this.isInitialized) return;
      this.loadCustomProducts();
      this.loadState();
      this.populateSystemSelect();
      this.bindEvents();
      this.render();
      this.isInitialized = true;
    }

    loadCustomProducts() {
      try {
        if (typeof localStorage === 'undefined') return;
        const saved = localStorage.getItem(this.CUSTOM_PRODUCTS_STORAGE_KEY);
        if (saved) {
          const customList = JSON.parse(saved);
          if (Array.isArray(customList)) {
            customList.forEach(item => {
              if (!item || !item.id) return;
              const existingIdx = PRODUCT_LOOKUP_REGISTRY.findIndex(p => p.id === item.id || (p.code && item.code && p.code.toLowerCase() === item.code.toLowerCase() && p.brandKey === item.brandKey));
              if (existingIdx !== -1) {
                PRODUCT_LOOKUP_REGISTRY[existingIdx] = Object.assign({}, PRODUCT_LOOKUP_REGISTRY[existingIdx], item);
              } else {
                PRODUCT_LOOKUP_REGISTRY.push(item);
              }
            });
          }
        }
      } catch (e) {
        console.warn('Could not load custom imported products:', e);
      }
    }

    registerImportedProducts(items) {
      if (!Array.isArray(items) || items.length === 0) return 0;
      
      let custom = [];
      try {
        if (typeof localStorage !== 'undefined') {
          const saved = localStorage.getItem(this.CUSTOM_PRODUCTS_STORAGE_KEY);
          if (saved) custom = JSON.parse(saved);
        }
      } catch (e) {}
      if (!Array.isArray(custom)) custom = [];

      let count = 0;
      items.forEach(raw => {
        if (!raw.name && !raw.code) return;
        const brandKey = (raw.brandKey || 'custom').toLowerCase();
        const code = raw.code || `IMP-${Date.now().toString().slice(-4)}`;
        const id = raw.id || `${brandKey}-${code.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

        const pkgStr = (raw.packaging || raw.pack || 'Unit').toString();
        let pkgUnit = raw.packagingUnit || 'Gallon';
        if (!raw.packagingUnit) {
          const lower = pkgStr.toLowerCase();
          if (lower.includes('pail')) pkgUnit = 'Pail';
          else if (lower.includes('bag') || lower.includes('sack')) pkgUnit = 'Bag';
          else if (lower.includes('drum')) pkgUnit = 'Drum';
          else if (lower.includes('can') || lower.includes('tin')) pkgUnit = 'Can';
          else if (lower.includes('set') || lower.includes('kit')) pkgUnit = 'Kit';
          else if (lower.includes('tube') || lower.includes('sausage')) pkgUnit = 'Tube';
          else if (lower.includes('liter') || lower.includes('litre')) pkgUnit = 'Liter';
          else if (lower.includes('gal')) pkgUnit = 'Gallon';
        }

        const prodObj = {
          id: id,
          brandKey: brandKey,
          code: code,
          name: raw.name || raw.desc || 'Custom Product',
          category: raw.category || 'General Products',
          packaging: pkgStr,
          packagingUnit: pkgUnit,
          coveragePerUnit: parseFloat(raw.coveragePerUnit || raw.coverage) || 20.0,
          defaultCoats: parseInt(raw.defaultCoats || raw.coats, 10) || 1,
          srp: raw.srp !== null && raw.srp !== undefined && raw.srp !== '' ? parseFloat(raw.srp) : null,
          notes: raw.notes || raw.remarks || raw.desc || 'Imported product specification'
        };

        const regIdx = PRODUCT_LOOKUP_REGISTRY.findIndex(p => p.id === prodObj.id || (p.code && p.code.toLowerCase() === prodObj.code.toLowerCase() && p.brandKey === prodObj.brandKey));
        if (regIdx !== -1) {
          PRODUCT_LOOKUP_REGISTRY[regIdx] = Object.assign({}, PRODUCT_LOOKUP_REGISTRY[regIdx], prodObj);
        } else {
          PRODUCT_LOOKUP_REGISTRY.push(prodObj);
        }

        const custIdx = custom.findIndex(c => c.id === prodObj.id || (c.code && c.code.toLowerCase() === prodObj.code.toLowerCase() && c.brandKey === prodObj.brandKey));
        if (custIdx !== -1) {
          custom[custIdx] = prodObj;
        } else {
          custom.push(prodObj);
        }
        count++;
      });

      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(this.CUSTOM_PRODUCTS_STORAGE_KEY, JSON.stringify(custom));
        }
      } catch (e) {
        console.warn('Could not save custom products to localStorage:', e);
      }

      if (this.isInitialized) {
        this.render();
        if (this.activeModuleTab === 'systems') {
          this.renderWorkSystemsTab();
        }
      }

      return count;
    }

    loadState() {
      try {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.currentSystemId && parsed.columns && parsed.columns.length > 0) {
            this.currentSystemId = parsed.currentSystemId;
            this.areaSqM = parseFloat(parsed.areaSqM) || 100;
            this.columns = parsed.columns;
            if (parsed.viewMode === 'boq' || parsed.viewMode === 'cards') {
              this.viewMode = parsed.viewMode;
            }
            return;
          }
        }
      } catch (e) {
        console.warn('Could not load comparison state from localStorage:', e);
      }
      this.loadSystemTemplate(this.currentSystemId, false);
    }

    getSystemTemplates() {
      let custom = [];
      try {
        const saved = localStorage.getItem(this.SYSTEMS_STORAGE_KEY);
        if (saved) custom = JSON.parse(saved);
      } catch (e) {
        console.warn('Could not parse custom systems:', e);
      }

      const list = JSON.parse(JSON.stringify(COMPARISON_SYSTEM_TEMPLATES));
      if (Array.isArray(custom) && custom.length > 0) {
        custom.forEach(c => {
          const idx = list.findIndex(t => t.id === c.id);
          if (idx !== -1) {
            list[idx] = c;
          } else {
            list.push(c);
          }
        });
      }
      return list;
    }

    saveSystemTemplate(systemObj) {
      let custom = [];
      try {
        const saved = localStorage.getItem(this.SYSTEMS_STORAGE_KEY);
        if (saved) custom = JSON.parse(saved);
      } catch (e) {}

      const idx = custom.findIndex(c => c.id === systemObj.id);
      if (idx !== -1) {
        custom[idx] = systemObj;
      } else {
        custom.push(systemObj);
      }

      try {
        localStorage.setItem(this.SYSTEMS_STORAGE_KEY, JSON.stringify(custom));
      } catch (e) {
        console.warn('Could not save custom systems to localStorage:', e);
      }

      this.populateSystemSelect();
      if (this.currentSystemId === systemObj.id) {
        this.columns = JSON.parse(JSON.stringify(systemObj.columns));
        this.saveState();
        if (this.activeModuleTab === 'matrix') {
          this.render();
        }
      }
    }

    deleteSystemTemplate(systemId) {
      let custom = [];
      try {
        const saved = localStorage.getItem(this.SYSTEMS_STORAGE_KEY);
        if (saved) custom = JSON.parse(saved);
      } catch (e) {}

      custom = custom.filter(c => c.id !== systemId);
      try {
        localStorage.setItem(this.SYSTEMS_STORAGE_KEY, JSON.stringify(custom));
      } catch (e) {}

      this.populateSystemSelect();
      const all = this.getSystemTemplates();
      this.activeSystemToEditId = all[0].id;
      this.activeCatalogColIdx = 0;
      this.renderWorkSystemsTab();
      if (window.QAQCBridge && window.QAQCBridge.showToast) {
        window.QAQCBridge.showToast('System removed from specifications master.', 'info');
      }
    }

    resetSystemTemplatesToDefault() {
      try {
        localStorage.removeItem(this.SYSTEMS_STORAGE_KEY);
      } catch (e) {}
      this.populateSystemSelect();
      this.activeSystemToEditId = COMPARISON_SYSTEM_TEMPLATES[0].id;
      this.activeCatalogColIdx = 0;
      this.renderWorkSystemsTab();
      if (window.QAQCBridge && window.QAQCBridge.showToast) {
        window.QAQCBridge.showToast('Specifications restored to factory presets.', 'info');
      }
    }

    switchModuleTab(tabId) {
      this.activeModuleTab = tabId === 'systems' ? 'systems' : 'matrix';
      
      const tabBtnMatrix = document.getElementById('tabBtnComparisonMatrix');
      const tabBtnSystems = document.getElementById('tabBtnWorkSystems');
      const panelMatrix = document.getElementById('panelComparisonMatrix');
      const panelSystems = document.getElementById('panelWorkSystems');

      if (tabBtnMatrix) tabBtnMatrix.classList.toggle('active', this.activeModuleTab === 'matrix');
      if (tabBtnSystems) tabBtnSystems.classList.toggle('active', this.activeModuleTab === 'systems');

      if (panelMatrix) panelMatrix.style.display = this.activeModuleTab === 'matrix' ? 'block' : 'none';
      if (panelSystems) panelSystems.style.display = this.activeModuleTab === 'systems' ? 'block' : 'none';

      if (this.activeModuleTab === 'systems') {
        this.renderWorkSystemsTab();
      } else {
        this.render();
      }
    }

    saveState() {
      try {
        const state = {
          currentSystemId: this.currentSystemId,
          areaSqM: this.areaSqM,
          columns: this.columns,
          viewMode: this.viewMode
        };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
      } catch (e) {
        console.warn('Could not save comparison state:', e);
      }
    }

    setViewMode(mode) {
      this.viewMode = mode === 'boq' ? 'boq' : 'cards';
      this.syncViewModeUI();
      this.saveState();
      if (this.viewMode === 'boq') {
        this.renderBoqTable();
      }
    }

    syncViewModeUI() {
      const mode = this.viewMode || 'cards';
      const btnCards = document.getElementById('btnViewCards');
      const btnBoq = document.getElementById('btnViewBoq');
      const cardsContainer = document.getElementById('comparisonColumnsContainer');
      const boqContainer = document.getElementById('comparisonBoqContainer');

      if (btnCards) btnCards.classList.toggle('active', mode === 'cards');
      if (btnBoq) btnBoq.classList.toggle('active', mode === 'boq');

      if (cardsContainer) cardsContainer.style.display = mode === 'cards' ? 'flex' : 'none';
      if (boqContainer) boqContainer.style.display = mode === 'boq' ? 'block' : 'none';
    }

    loadSystemTemplate(systemId, shouldRender = true) {
      const allTemplates = this.getSystemTemplates();
      const template = allTemplates.find(t => t.id === systemId) || allTemplates[0];
      this.currentSystemId = template.id;
      this.columns = JSON.parse(JSON.stringify(template.columns));
      if (template.defaultArea && (!this.areaSqM || this.areaSqM <= 0)) {
        this.areaSqM = template.defaultArea;
      }
      this.saveState();
      if (shouldRender) {
        this.render();
      }
    }

    populateSystemSelect() {
      const select = document.getElementById('comparisonSystemSelect');
      if (!select) return;
      select.innerHTML = '';
      const allTemplates = this.getSystemTemplates();
      allTemplates.forEach(tpl => {
        const opt = document.createElement('option');
        opt.value = tpl.id;
        opt.textContent = `${tpl.name} (${tpl.columns ? tpl.columns.length : 0} Catalogs)`;
        if (tpl.id === this.currentSystemId) opt.selected = true;
        select.appendChild(opt);
      });
    }

    bindEvents() {
      const areaInput = document.getElementById('comparisonAreaInput');
      if (areaInput) {
        areaInput.value = this.areaSqM;
        areaInput.addEventListener('input', (e) => {
          const val = parseFloat(e.target.value);
          if (!isNaN(val) && val > 0) {
            this.areaSqM = val;
            this.updateQuickChipHighlight(val);
            this.saveState();
            this.renderCalculationsOnly();
          }
        });
      }
    }

    setArea(val) {
      val = parseFloat(val) || 100;
      this.areaSqM = val;
      const areaInput = document.getElementById('comparisonAreaInput');
      if (areaInput) areaInput.value = val;
      this.updateQuickChipHighlight(val);
      this.saveState();
      this.render();
    }

    updateQuickChipHighlight(val) {
      document.querySelectorAll('.area-chip').forEach(chip => {
        const textVal = parseFloat(chip.textContent);
        chip.classList.toggle('active', textVal === val);
      });
    }

    loadSystem(systemId) {
      this.loadSystemTemplate(systemId, true);
      const select = document.getElementById('comparisonSystemSelect');
      if (select) select.value = systemId;
    }

    resetToDefault() {
      if (confirm('Reset comparison matrix to factory manufacturer catalog specifications?')) {
        this.loadSystemTemplate(this.currentSystemId, true);
        if (window.QAQCBridge && window.QAQCBridge.showToast) {
          window.QAQCBridge.showToast('Matrix reset to standard manufacturer catalog procedures.', 'info');
        }
      }
    }

    // =======================================================================
    // COLUMN OPERATIONS
    // =======================================================================
    addColumn(brandKey = 'custom') {
      const colIndex = this.columns.length + 1;
      const brandMeta = COMPARISON_BRANDS[brandKey] || COMPARISON_BRANDS.custom;
      
      // Default stages for new column based on brand
      let initialStages = [];
      if (brandKey === 'boysen') {
        initialStages = [
          { stageNum: 1, stageName: 'Stage 1: Neutralizer', stageRole: 'Surface Prep', productId: 'boysen-b-44', coats: 1, coveragePerUnit: 25.0, packaging: '4 Liters (Gallon)', packagingUnit: 'Gallon', unitCost: 420.00 },
          { stageNum: 2, stageName: 'Stage 2: Permacoat Primer', stageRole: 'Primer', productId: 'boysen-b-701', coats: 1, coveragePerUnit: 27.5, packaging: '4 Liters (Gallon)', packagingUnit: 'Gallon', unitCost: 685.00 },
          { stageNum: 3, stageName: 'Stage 3: Acrytex Finish Topcoat', stageRole: 'Topcoat Finish', productId: 'boysen-b-1701', coats: 2, coveragePerUnit: 27.5, packaging: '4 Liters (Gallon)', packagingUnit: 'Gallon', unitCost: 890.00 }
        ];
      } else if (brandKey === 'davies') {
        initialStages = [
          { stageNum: 1, stageName: 'Stage 1: Concrete Neutralizer', stageRole: 'Surface Prep', productId: 'davies-dv-in06', coats: 1, coveragePerUnit: 25.0, packaging: '4 Liters (Gallon)', packagingUnit: 'Gallon', unitCost: 390.00 },
          { stageNum: 2, stageName: 'Stage 2: Megacryl Primer', stageRole: 'Primer', productId: 'davies-dv-in03', coats: 1, coveragePerUnit: 27.5, packaging: '4 Liters (Gallon)', packagingUnit: 'Gallon', unitCost: 680.00 },
          { stageNum: 3, stageName: 'Stage 3: Liquid Tile Topcoat', stageRole: 'Topcoat Finish', productId: 'davies-dv-ex07', coats: 2, coveragePerUnit: 25.0, packaging: '4 Liters (Gallon)', packagingUnit: 'Gallon', unitCost: 850.00 }
        ];
      } else if (brandKey === 'buildrite') {
        initialStages = [
          { stageNum: 1, stageName: 'Stage 1: Etch Cleaner', stageRole: 'Surface Prep', productId: 'buildrite-etch', coats: 1, coveragePerUnit: 30.0, packaging: '4 Liters (Gallon)', packagingUnit: 'Gallon', unitCost: 360.00 },
          { stageNum: 2, stageName: 'Stage 2: Blockout 40 Sealer', stageRole: 'Primer', productId: 'buildrite-blockout-40', coats: 1, coveragePerUnit: 26.0, packaging: '4 Liters (Gallon)', packagingUnit: 'Gallon', unitCost: 840.00 },
          { stageNum: 3, stageName: 'Stage 3: Rainproof Topcoat', stageRole: 'Topcoat Finish', productId: 'buildrite-rainproof', coats: 2, coveragePerUnit: 25.0, packaging: '4 Liters (Gallon)', packagingUnit: 'Gallon', unitCost: 890.00 }
        ];
      } else if (brandKey === 'sika') {
        initialStages = [
          { stageNum: 1, stageName: 'Stage 1: SikaLatex Bonding Primer', stageRole: 'Primer / Bonding', productId: 'sika-sikalatex', coats: 1, coveragePerUnit: 28.0, packaging: '4 Liters (Gallon)', packagingUnit: 'Gallon', unitCost: 820.00 },
          { stageNum: 2, stageName: 'Stage 2: SikaTop Seal-107 Slurry', stageRole: 'Waterproofing', productId: 'sika-top-seal-107', coats: 2, coveragePerUnit: 12.5, packaging: '25kg Kit', packagingUnit: 'Kit', unitCost: 1850.00 }
        ];
      } else if (brandKey === 'bostik') {
        initialStages = [
          { stageNum: 1, stageName: 'Stage 1: Dampfix PU Membrane', stageRole: 'Waterproofing', productId: 'bostik-dampfix-pu', coats: 2, coveragePerUnit: 9.0, packaging: '4 Liters (Gallon)', packagingUnit: 'Gallon', unitCost: 1650.00 }
        ];
      } else {
        // Custom mix
        initialStages = [
          { stageNum: 1, stageName: 'Stage 1: Substrate Prep', stageRole: 'Surface Prep', productId: 'boysen-b-44', coats: 1, coveragePerUnit: 25.0, packaging: '4 Liters (Gallon)', packagingUnit: 'Gallon', unitCost: 420.00 },
          { stageNum: 2, stageName: 'Stage 2: Penetrating Base Primer', stageRole: 'Primer', productId: 'davies-dv-in03', coats: 1, coveragePerUnit: 27.5, packaging: '4 Liters (Gallon)', packagingUnit: 'Gallon', unitCost: 680.00 },
          { stageNum: 3, stageName: 'Stage 3: Finishing Topcoat', stageRole: 'Topcoat Finish', productId: 'boysen-b-1701', coats: 2, coveragePerUnit: 27.5, packaging: '4 Liters (Gallon)', packagingUnit: 'Gallon', unitCost: 890.00 }
        ];
      }

      const newCol = {
        id: 'col-' + Date.now(),
        brandKey: brandKey,
        title: `Catalog ${colIndex}: ${brandMeta.shortName} Specification`,
        subtitle: `Custom Procedure &middot; ${initialStages.length} Process Steps`,
        stages: initialStages
      };

      this.columns.push(newCol);
      this.closeAddColumnModal();
      this.saveState();
      this.render();

      if (window.QAQCBridge && window.QAQCBridge.showToast) {
        window.QAQCBridge.showToast(`Added comparison column for ${brandMeta.shortName}.`, 'success');
      }
    }

    removeColumn(colId) {
      if (this.columns.length <= 1) {
        alert('You must keep at least one comparison column.');
        return;
      }
      this.columns = this.columns.filter(c => c.id !== colId);
      this.saveState();
      this.render();
    }

    updateColumnBrand(colId, newBrandKey) {
      const col = this.columns.find(c => c.id === colId);
      if (!col) return;
      col.brandKey = newBrandKey;
      const meta = COMPARISON_BRANDS[newBrandKey] || COMPARISON_BRANDS.custom;
      col.title = `Catalog: ${meta.shortName} Specification`;
      this.saveState();
      this.render();
    }

    // =======================================================================
    // STAGE OPERATIONS (INSERT AT ANY STEP, REORDER, REMOVE)
    // =======================================================================
    insertStage(colId, targetIndex, defaultProdId = null) {
      const col = this.columns.find(c => c.id === colId);
      if (!col) return;
      if (!col.stages) col.stages = [];

      targetIndex = Math.max(0, Math.min(parseInt(targetIndex, 10) || 0, col.stages.length));

      let prod = null;
      if (defaultProdId) {
        prod = PRODUCT_LOOKUP_REGISTRY.find(p => p.id === defaultProdId);
      }
      if (!prod) {
        prod = PRODUCT_LOOKUP_REGISTRY.find(p => p.brandKey === col.brandKey) || PRODUCT_LOOKUP_REGISTRY[0];
      }

      const displayStepNum = targetIndex + 1;
      const newStage = {
        stageNum: displayStepNum,
        stageName: `Stage ${displayStepNum}: ${prod.category || 'Application Step'}`,
        stageRole: prod.category || 'Application Step',
        productId: prod.id,
        coats: prod.defaultCoats || 1,
        coveragePerUnit: prod.coveragePerUnit || 25.0,
        packaging: prod.packaging || '4 Liters (Gallon)',
        packagingUnit: prod.packagingUnit || 'Gallon',
        unitCost: prod.srp || 500.00
      };

      col.stages.splice(targetIndex, 0, newStage);

      // Re-number all stages
      col.stages.forEach((st, idx) => {
        st.stageNum = idx + 1;
      });

      this.saveState();
      this.render();

      if (window.QAQCBridge && window.QAQCBridge.showToast) {
        window.QAQCBridge.showToast(`Inserted Step ${displayStepNum} into ${col.title}`, 'success');
      }
    }

    addStage(colId) {
      const col = this.columns.find(c => c.id === colId);
      if (!col) return;
      this.insertStage(colId, col.stages ? col.stages.length : 0);
    }

    moveStage(colId, stageIdx, direction) {
      const col = this.columns.find(c => c.id === colId);
      if (!col || !col.stages) return;
      const targetIdx = stageIdx + direction;
      if (targetIdx < 0 || targetIdx >= col.stages.length) return;

      const item = col.stages.splice(stageIdx, 1)[0];
      col.stages.splice(targetIdx, 0, item);

      // Re-number all stages
      col.stages.forEach((st, idx) => {
        st.stageNum = idx + 1;
      });

      this.saveState();
      this.render();

      if (window.QAQCBridge && window.QAQCBridge.showToast) {
        window.QAQCBridge.showToast(`Repositioned to Step ${targetIdx + 1}`, 'info');
      }
    }

    removeStage(colId, stageIdx) {
      const col = this.columns.find(c => c.id === colId);
      if (!col || !col.stages) return;
      if (col.stages.length <= 1) {
        alert('Each column must have at least one product stage.');
        return;
      }
      const removed = col.stages.splice(stageIdx, 1)[0];
      // Re-number stages
      col.stages.forEach((st, idx) => {
        st.stageNum = idx + 1;
      });
      this.saveState();
      this.render();

      if (window.QAQCBridge && window.QAQCBridge.showToast) {
        window.QAQCBridge.showToast(`Removed Step ${stageIdx + 1} (${removed.stageRole || 'Step'})`, 'info');
      }
    }

    updateStageProduct(colId, stageIdx, productId) {
      const col = this.columns.find(c => c.id === colId);
      if (!col || !col.stages || !col.stages[stageIdx]) return;

      const stage = col.stages[stageIdx];
      const prod = PRODUCT_LOOKUP_REGISTRY.find(p => p.id === productId);
      if (!prod) return;

      stage.productId = prod.id;
      stage.stageRole = prod.category;
      stage.coveragePerUnit = prod.coveragePerUnit;
      stage.coats = prod.defaultCoats || 1;
      stage.packaging = prod.packaging;
      stage.packagingUnit = prod.packagingUnit;
      stage.unitCost = prod.srp;

      this.saveState();
      this.render();
    }

    updateStageParam(colId, stageIdx, param, value) {
      const col = this.columns.find(c => c.id === colId);
      if (!col || !col.stages || !col.stages[stageIdx]) return;

      const stage = col.stages[stageIdx];
      if (param === 'coats') {
        stage.coats = Math.max(1, parseInt(value, 10) || 1);
      } else if (param === 'coveragePerUnit') {
        stage.coveragePerUnit = Math.max(0.1, parseFloat(value) || 25);
      } else if (param === 'unitCost') {
        stage.unitCost = Math.max(0, parseFloat(value) || 0);
      } else if (param === 'stageName') {
        stage.stageName = String(value).trim();
      }

      this.saveState();
      this.renderCalculationsOnly();
    }

    // =======================================================================
    // MODALS
    // =======================================================================
    openAddColumnModal() {
      const modal = document.getElementById('modalAddComparisonCol');
      if (modal) modal.style.display = 'flex';
    }

    closeAddColumnModal() {
      const modal = document.getElementById('modalAddComparisonCol');
      if (modal) modal.style.display = 'none';
    }

    // =======================================================================

    // =======================================================================
    // SPECIFIC WORK / APPLICATION SYSTEMS EXCEL TABLE EDITOR
    // =======================================================================
    renderWorkSystemsTab() {
      const container = document.getElementById('panelWorkSystems');
      if (!container) return;

      const allSystems = this.getSystemTemplates();
      let activeSys = allSystems.find(s => s.id === this.activeSystemToEditId) || allSystems[0];
      this.activeSystemToEditId = activeSys.id;

      if (!activeSys.columns || activeSys.columns.length === 0) {
        activeSys.columns = [{
          id: `col-${activeSys.id}-1`,
          brandKey: 'boysen',
          title: 'Catalog 1: Standard Procedure',
          subtitle: 'Manufacturer technical procedure',
          stages: []
        }];
      }

      if (this.activeCatalogColIdx >= activeSys.columns.length) {
        this.activeCatalogColIdx = 0;
      }
      const activeCol = activeSys.columns[this.activeCatalogColIdx];

      // Build options for system selector dropdown
      const systemOptions = allSystems.map(s => {
        return `<option value="${s.id}" ${s.id === activeSys.id ? 'selected' : ''}>${s.name} (${s.columns.length} Catalogs)</option>`;
      }).join('');

      // Build catalog pills
      const catalogPills = activeSys.columns.map((c, idx) => {
        const b = COMPARISON_BRANDS[c.brandKey] || COMPARISON_BRANDS.custom;
        const isActive = idx === this.activeCatalogColIdx;
        return `
          <button type="button" class="systems-cat-pill ${isActive ? 'active' : ''}" onclick="productComparison.selectCatalogColToEdit(${idx})">
            <span class="pill-brand-badge" style="background:${b.badgeBg}; color:${b.badgeColor}; border:1px solid ${b.badgeBorder};">${b.shortName}</span>
            <span class="pill-title">${c.title || `Catalog ${idx + 1}`}</span>
            <span class="pill-steps-count">${c.stages ? c.stages.length : 0} Steps</span>
            ${activeSys.columns.length > 1 ? `
              <span class="pill-remove-btn" onclick="event.stopPropagation(); productComparison.removeCatalogColFromSystem('${activeSys.id}', ${idx})" title="Remove this competitor catalog">✕</span>
            ` : ''}
          </button>
        `;
      }).join('');

      // Helper roles list
      const HELPER_ROLES = [
        'Surface Prep',
        'Primer',
        'Primer / Sealer',
        'Putty / Cast',
        'Skimcoat',
        'Intermediate / Sealer',
        'Topcoat Finish',
        'Thinner / Reducer',
        'Waterproofing',
        'Waterproofing / Render',
        'Tile Adhesive',
        'Tile Grout',
        'Epoxy Coating',
        'Sealant',
        'Bonding Agent',
        'Other / Custom'
      ];

      // Build table rows for activeCol.stages
      const stages = activeCol.stages || [];
      const rowsHtml = stages.map((st, stIdx) => {
        const p = PRODUCT_LOOKUP_REGISTRY.find(prod => prod.id === st.productId) || {};
        const currentBrandKey = p.brandKey || activeCol.brandKey || 'boysen';

        // Role select options
        const roleOptions = HELPER_ROLES.map(role => {
          return `<option value="${role}" ${role === st.stageRole ? 'selected' : ''}>${role}</option>`;
        }).join('');

        // Brand options
        const brandOptions = Object.keys(COMPARISON_BRANDS).map(bk => {
          const b = COMPARISON_BRANDS[bk];
          return `<option value="${bk}" ${bk === currentBrandKey ? 'selected' : ''}>${b.shortName}</option>`;
        }).join('');

        // Product options for this brand
        const prods = PRODUCT_LOOKUP_REGISTRY.filter(prod => prod.brandKey === currentBrandKey || currentBrandKey === 'custom');
        const prodOptions = prods.map(prod => {
          return `<option value="${prod.id}" ${prod.id === st.productId ? 'selected' : ''}>${prod.code ? `[${prod.code}] ` : ''}${prod.name} (${prod.category || 'Product'})</option>`;
        }).join('');

        const isFirst = stIdx === 0;
        const isLast = stIdx === stages.length - 1;

        return `
          <tr class="systems-row">
            <td class="systems-td-step">
              <div class="systems-step-cell">
                <span class="systems-step-num">${st.stageNum}.0</span>
                <div class="systems-step-moves">
                  <button type="button" class="systems-move-micro-btn" onclick="productComparison.moveStepInWorkSystem('${activeSys.id}', ${this.activeCatalogColIdx}, ${stIdx}, -1)" ${isFirst ? 'disabled' : ''} title="Move Step Up">▲</button>
                  <button type="button" class="systems-move-micro-btn" onclick="productComparison.moveStepInWorkSystem('${activeSys.id}', ${this.activeCatalogColIdx}, ${stIdx}, 1)" ${isLast ? 'disabled' : ''} title="Move Step Down">▼</button>
                </div>
              </div>
            </td>
            <td class="systems-td-desc">
              <input type="text" class="systems-cell-input" value="${st.stageName.replace(/"/g, '&quot;')}" onchange="productComparison.updateWorkSystemStep('${activeSys.id}', ${this.activeCatalogColIdx}, ${stIdx}, 'stageName', this.value)" placeholder="e.g. Substrate Preparation">
            </td>
            <td class="systems-td-helper">
              <select class="systems-cell-select helper-select" onchange="productComparison.updateWorkSystemStep('${activeSys.id}', ${this.activeCatalogColIdx}, ${stIdx}, 'stageRole', this.value)">
                ${roleOptions}
              </select>
            </td>
            <td class="systems-td-brand">
              <select class="systems-cell-select brand-select" onchange="productComparison.updateWorkSystemStepBrand('${activeSys.id}', ${this.activeCatalogColIdx}, ${stIdx}, this.value)">
                ${brandOptions}
              </select>
            </td>
            <td class="systems-td-prod">
              <select class="systems-cell-select prod-select" onchange="productComparison.updateWorkSystemStepProduct('${activeSys.id}', ${this.activeCatalogColIdx}, ${stIdx}, this.value)">
                ${prodOptions}
              </select>
            </td>
            <td class="systems-td-pkg">
              <input type="text" class="systems-cell-input pkg-input" value="${(st.packaging || '').replace(/"/g, '&quot;')}" onchange="productComparison.updateWorkSystemStep('${activeSys.id}', ${this.activeCatalogColIdx}, ${stIdx}, 'packaging', this.value)" placeholder="4 Liters (Gallon)">
            </td>
            <td class="systems-td-num">
              <input type="number" step="0.5" min="0.1" class="systems-cell-input num-input" value="${st.coveragePerUnit}" onchange="productComparison.updateWorkSystemStep('${activeSys.id}', ${this.activeCatalogColIdx}, ${stIdx}, 'coveragePerUnit', this.value)">
            </td>
            <td class="systems-td-num">
              <input type="number" min="1" max="10" class="systems-cell-input num-input coats-input" value="${st.coats}" onchange="productComparison.updateWorkSystemStep('${activeSys.id}', ${this.activeCatalogColIdx}, ${stIdx}, 'coats', this.value)">
            </td>
            <td class="systems-td-currency">
              <div class="systems-currency-wrap">
                <span>₱</span>
                <input type="number" step="1" min="0" class="systems-cell-input num-input" value="${st.unitCost}" onchange="productComparison.updateWorkSystemStep('${activeSys.id}', ${this.activeCatalogColIdx}, ${stIdx}, 'unitCost', this.value)">
              </div>
            </td>
            <td class="systems-td-actions">
              <div class="systems-row-actions">
                <button type="button" class="systems-action-pill" onclick="productComparison.insertStepInWorkSystem('${activeSys.id}', ${this.activeCatalogColIdx}, ${stIdx})" title="Insert step above">+ Above</button>
                <button type="button" class="systems-action-pill" onclick="productComparison.insertStepInWorkSystem('${activeSys.id}', ${this.activeCatalogColIdx}, ${stIdx + 1})" title="Insert step below">+ Below</button>
                <button type="button" class="systems-action-pill del" onclick="productComparison.removeStepFromWorkSystem('${activeSys.id}', ${this.activeCatalogColIdx}, ${stIdx})" title="Delete step" ${stages.length <= 1 ? 'disabled' : ''}>🗑</button>
              </div>
            </td>
          </tr>
        `;
      }).join('');

      // Approximate standard rate calculation for 100 sq.m
      let approxCostPerSqM = 0;
      stages.forEach(st => {
        const area = 100;
        const eff = area * (st.coats || 1);
        const units = Math.ceil(eff / (st.coveragePerUnit || 25));
        approxCostPerSqM += (units * (st.unitCost || 0)) / area;
      });

      container.innerHTML = `
        <div class="systems-master-wrapper">
          <!-- Topbar with System Selector & Quick Actions -->
          <div class="systems-master-topbar">
            <div class="systems-topbar-left">
              <div class="systems-badge-tag">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                MASTER PROCEDURE SPECIFICATIONS &amp; STANDARDS
              </div>
              <div class="systems-selector-row">
                <label for="systemEditorSelect">Active Work System:</label>
                <select id="systemEditorSelect" class="systems-selector-dropdown" onchange="productComparison.selectSystemToEdit(this.value)">
                  ${systemOptions}
                </select>
                <button type="button" class="systems-topbar-btn primary" onclick="productComparison.openCreateSystemModal()">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  + Create New Work System
                </button>
              </div>
            </div>

            <div class="systems-topbar-actions">
              <button type="button" class="systems-topbar-btn sync" onclick="productComparison.openInComparisonMatrix('${activeSys.id}')" title="Load this system into Comparison Matrix">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Open in Comparison Matrix ↗
              </button>
              <button type="button" class="systems-topbar-btn" onclick="productComparison.exportSystemExcel('${activeSys.id}')" title="Export this specification table as Excel CSV">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Export System (Excel)
              </button>
              <button type="button" class="systems-topbar-btn reset" onclick="productComparison.resetSystemTemplatesToDefault()" title="Reset all systems to standard manufacturer specifications">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
                Reset Defaults
              </button>
            </div>
          </div>

          <!-- Metadata & Description Card -->
          <div class="systems-meta-card">
            <div class="systems-meta-grid">
              <div class="systems-meta-field name-field">
                <label>System Specification Name:</label>
                <input type="text" class="systems-meta-input" value="${activeSys.name.replace(/"/g, '&quot;')}" onchange="productComparison.updateSystemMetadata('${activeSys.id}', 'name', this.value)">
              </div>
              <div class="systems-meta-field">
                <label>Category / Scope:</label>
                <input type="text" class="systems-meta-input" value="${(activeSys.category || 'Architectural Coatings').replace(/"/g, '&quot;')}" onchange="productComparison.updateSystemMetadata('${activeSys.id}', 'category', this.value)">
              </div>
              <div class="systems-meta-field sm-field">
                <label>Default Area (m²):</label>
                <input type="number" class="systems-meta-input" value="${activeSys.defaultArea || 100}" onchange="productComparison.updateSystemMetadata('${activeSys.id}', 'defaultArea', this.value)">
              </div>
            </div>
            <div class="systems-meta-field desc-field">
              <label>Technical Procedure Scope &amp; Engineering Notes:</label>
              <input type="text" class="systems-meta-input" value="${(activeSys.description || '').replace(/"/g, '&quot;')}" onchange="productComparison.updateSystemMetadata('${activeSys.id}', 'description', this.value)" placeholder="Technical application summary...">
            </div>
          </div>

          <!-- Competitor Catalog Columns Bar -->
          <div class="systems-catalogs-bar">
            <div class="systems-catalogs-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
              <span>Configured Brand Catalogs (${activeSys.columns.length}):</span>
            </div>
            <div class="systems-catalogs-pills">
              ${catalogPills}
              <button type="button" class="systems-add-cat-btn" onclick="productComparison.openAddCatalogColModal('${activeSys.id}')" title="Add another brand procedure to this comparison system">
                + Add Competitor Catalog
              </button>
            </div>
          </div>

          <!-- Catalog Header / Subtitle Card -->
          <div class="systems-catalog-meta-box">
            <div class="catalog-meta-field">
              <label>Catalog Title:</label>
              <input type="text" class="systems-meta-input" value="${(activeCol.title || '').replace(/"/g, '&quot;')}" onchange="productComparison.updateCatalogColTitle('${activeSys.id}', ${this.activeCatalogColIdx}, this.value)">
            </div>
            <div class="catalog-meta-field" style="flex:2;">
              <label>Manufacturer Roadmap / Subtitle:</label>
              <input type="text" class="systems-meta-input" value="${(activeCol.subtitle || '').replace(/"/g, '&quot;')}" onchange="productComparison.updateCatalogColSubtitle('${activeSys.id}', ${this.activeCatalogColIdx}, this.value)">
            </div>
          </div>

          <!-- Excel Spreadsheet Table -->
          <div class="systems-table-card">
            <div class="systems-table-scroll-wrap">
              <table class="systems-excel-table">
                <thead>
                  <tr class="systems-thead-row">
                    <th class="systems-th-step">STEP #</th>
                    <th class="systems-th-desc">STAGE / WORK SCOPE DESCRIPTION</th>
                    <th class="systems-th-helper">HELPER (STAGE ROLE)</th>
                    <th class="systems-th-brand">BRAND</th>
                    <th class="systems-th-prod">PRODUCT TO USE (SPECIFICATION)</th>
                    <th class="systems-th-pkg">PACKAGING &amp; UNIT</th>
                    <th class="systems-th-num">SPREAD (m²)</th>
                    <th class="systems-th-num">COATS</th>
                    <th class="systems-th-currency">SRP (₱)</th>
                    <th class="systems-th-actions">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  ${rowsHtml}
                </tbody>
                <tfoot>
                  <tr class="systems-tfoot-row">
                    <td colspan="2" class="systems-foot-left">
                      <button type="button" class="systems-foot-add-btn" onclick="productComparison.insertStepInWorkSystem('${activeSys.id}', ${this.activeCatalogColIdx}, -1)">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        + Add Process Step (End)
                      </button>
                    </td>
                    <td colspan="4" class="systems-foot-summary">
                      <span>Total Procedure Steps: <strong>${stages.length} Steps</strong></span>
                      &bull;
                      <span>Approx. Theoretical Unit Rate: <strong>₱${approxCostPerSqM.toFixed(2)} / sq.m</strong> (@ 100 m²)</span>
                    </td>
                    <td colspan="4" class="systems-foot-right">
                      <span class="systems-sync-status-pill">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        Synced with Comparison Matrix
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      `;
    }

    selectSystemToEdit(systemId) {
      this.activeSystemToEditId = systemId;
      this.activeCatalogColIdx = 0;
      this.renderWorkSystemsTab();
    }

    selectCatalogColToEdit(colIdx) {
      this.activeCatalogColIdx = colIdx;
      this.renderWorkSystemsTab();
    }

    updateSystemMetadata(systemId, field, value) {
      const all = this.getSystemTemplates();
      const sys = all.find(s => s.id === systemId);
      if (!sys) return;

      if (field === 'name') sys.name = String(value).trim() || 'Work System Specification';
      else if (field === 'category') sys.category = String(value).trim();
      else if (field === 'defaultArea') sys.defaultArea = Math.max(1, parseFloat(value) || 100);
      else if (field === 'description') sys.description = String(value).trim();

      this.saveSystemTemplate(sys);
      this.populateSystemSelect();
      this.renderWorkSystemsTab();
      if (window.QAQCBridge && window.QAQCBridge.showToast) {
        window.QAQCBridge.showToast(`Updated system metadata: "${sys.name}"`, 'success');
      }
    }

    updateCatalogColTitle(systemId, colIdx, title) {
      const all = this.getSystemTemplates();
      const sys = all.find(s => s.id === systemId);
      if (!sys || !sys.columns || !sys.columns[colIdx]) return;
      sys.columns[colIdx].title = String(title).trim() || `Catalog ${colIdx + 1}`;
      this.saveSystemTemplate(sys);
      this.renderWorkSystemsTab();
    }

    updateCatalogColSubtitle(systemId, colIdx, subtitle) {
      const all = this.getSystemTemplates();
      const sys = all.find(s => s.id === systemId);
      if (!sys || !sys.columns || !sys.columns[colIdx]) return;
      sys.columns[colIdx].subtitle = String(subtitle).trim();
      this.saveSystemTemplate(sys);
      this.renderWorkSystemsTab();
    }

    insertStepInWorkSystem(systemId, colIdx, targetStepIdx) {
      const all = this.getSystemTemplates();
      const sys = all.find(s => s.id === systemId);
      if (!sys || !sys.columns || !sys.columns[colIdx]) return;

      const col = sys.columns[colIdx];
      if (!col.stages) col.stages = [];

      if (targetStepIdx < 0 || targetStepIdx > col.stages.length) {
        targetStepIdx = col.stages.length;
      }

      // Pick default product for brand
      const prod = PRODUCT_LOOKUP_REGISTRY.find(p => p.brandKey === col.brandKey) || PRODUCT_LOOKUP_REGISTRY[0];
      const displayNum = targetStepIdx + 1;

      const newStage = {
        stageNum: displayNum,
        stageName: `Stage ${displayNum}: ${prod.category || 'Application Step'}`,
        stageRole: prod.category || 'Surface Prep',
        productId: prod.id,
        coats: prod.defaultCoats || 1,
        coveragePerUnit: prod.coveragePerUnit || 25.0,
        packaging: prod.packaging || '4 Liters (Gallon)',
        packagingUnit: prod.packagingUnit || 'Gallon',
        unitCost: prod.srp || 500.00
      };

      col.stages.splice(targetStepIdx, 0, newStage);
      col.stages.forEach((st, i) => st.stageNum = i + 1);

      this.saveSystemTemplate(sys);
      this.renderWorkSystemsTab();
      if (window.QAQCBridge && window.QAQCBridge.showToast) {
        window.QAQCBridge.showToast(`Added Step ${displayNum} to ${col.title}`, 'success');
      }
    }

    moveStepInWorkSystem(systemId, colIdx, stepIdx, direction) {
      const all = this.getSystemTemplates();
      const sys = all.find(s => s.id === systemId);
      if (!sys || !sys.columns || !sys.columns[colIdx]) return;

      const col = sys.columns[colIdx];
      const targetIdx = stepIdx + direction;
      if (targetIdx < 0 || targetIdx >= col.stages.length) return;

      const item = col.stages.splice(stepIdx, 1)[0];
      col.stages.splice(targetIdx, 0, item);
      col.stages.forEach((st, i) => st.stageNum = i + 1);

      this.saveSystemTemplate(sys);
      this.renderWorkSystemsTab();
    }

    removeStepFromWorkSystem(systemId, colIdx, stepIdx) {
      const all = this.getSystemTemplates();
      const sys = all.find(s => s.id === systemId);
      if (!sys || !sys.columns || !sys.columns[colIdx]) return;

      const col = sys.columns[colIdx];
      if (col.stages.length <= 1) {
        alert('A catalog procedure must retain at least one step.');
        return;
      }

      col.stages.splice(stepIdx, 1);
      col.stages.forEach((st, i) => st.stageNum = i + 1);

      this.saveSystemTemplate(sys);
      this.renderWorkSystemsTab();
      if (window.QAQCBridge && window.QAQCBridge.showToast) {
        window.QAQCBridge.showToast(`Removed step ${stepIdx + 1}.`, 'info');
      }
    }

    updateWorkSystemStep(systemId, colIdx, stepIdx, field, value) {
      const all = this.getSystemTemplates();
      const sys = all.find(s => s.id === systemId);
      if (!sys || !sys.columns || !sys.columns[colIdx] || !sys.columns[colIdx].stages[stepIdx]) return;

      const st = sys.columns[colIdx].stages[stepIdx];
      if (field === 'stageName') st.stageName = String(value).trim();
      else if (field === 'stageRole') st.stageRole = String(value).trim();
      else if (field === 'packaging') st.packaging = String(value).trim();
      else if (field === 'coveragePerUnit') st.coveragePerUnit = Math.max(0.1, parseFloat(value) || 25);
      else if (field === 'coats') st.coats = Math.max(1, parseInt(value, 10) || 1);
      else if (field === 'unitCost') st.unitCost = Math.max(0, parseFloat(value) || 0);

      this.saveSystemTemplate(sys);
    }

    updateWorkSystemStepBrand(systemId, colIdx, stepIdx, brandKey) {
      const all = this.getSystemTemplates();
      const sys = all.find(s => s.id === systemId);
      if (!sys || !sys.columns || !sys.columns[colIdx] || !sys.columns[colIdx].stages[stepIdx]) return;

      const st = sys.columns[colIdx].stages[stepIdx];
      const prod = PRODUCT_LOOKUP_REGISTRY.find(p => p.brandKey === brandKey) || PRODUCT_LOOKUP_REGISTRY[0];

      st.productId = prod.id;
      st.stageRole = prod.category || st.stageRole;
      st.coveragePerUnit = prod.coveragePerUnit || 25.0;
      st.coats = prod.defaultCoats || 1;
      st.packaging = prod.packaging || '4 Liters (Gallon)';
      st.packagingUnit = prod.packagingUnit || 'Gallon';
      st.unitCost = prod.srp || 500.00;

      this.saveSystemTemplate(sys);
      this.renderWorkSystemsTab();
    }

    updateWorkSystemStepProduct(systemId, colIdx, stepIdx, productId) {
      const all = this.getSystemTemplates();
      const sys = all.find(s => s.id === systemId);
      if (!sys || !sys.columns || !sys.columns[colIdx] || !sys.columns[colIdx].stages[stepIdx]) return;

      const st = sys.columns[colIdx].stages[stepIdx];
      const prod = PRODUCT_LOOKUP_REGISTRY.find(p => p.id === productId);
      if (!prod) return;

      st.productId = prod.id;
      st.stageRole = prod.category || st.stageRole;
      st.coveragePerUnit = prod.coveragePerUnit || 25.0;
      st.coats = prod.defaultCoats || 1;
      st.packaging = prod.packaging || '4 Liters (Gallon)';
      st.packagingUnit = prod.packagingUnit || 'Gallon';
      st.unitCost = prod.srp || 500.00;

      this.saveSystemTemplate(sys);
      this.renderWorkSystemsTab();
    }

    openAddCatalogColModal(systemId) {
      const brandKey = prompt('Choose brand for new competitor catalog (boysen, davies, buildrite, sika, bostik, custom):', 'buildrite');
      if (!brandKey) return;
      const bKey = brandKey.trim().toLowerCase();
      const brand = COMPARISON_BRANDS[bKey] || COMPARISON_BRANDS.custom;

      const all = this.getSystemTemplates();
      const sys = all.find(s => s.id === systemId);
      if (!sys) return;

      const colNum = sys.columns.length + 1;
      const defaultProd = PRODUCT_LOOKUP_REGISTRY.find(p => p.brandKey === bKey) || PRODUCT_LOOKUP_REGISTRY[0];

      const newCol = {
        id: `col-${sys.id}-${Date.now()}`,
        brandKey: bKey,
        title: `Catalog ${colNum}: ${brand.shortName} Specification`,
        subtitle: `Manufacturer procedure for ${sys.name}`,
        stages: [
          {
            stageNum: 1,
            stageName: 'Stage 1: Substrate Preparation',
            stageRole: 'Surface Prep',
            productId: defaultProd.id,
            coats: 1,
            coveragePerUnit: defaultProd.coveragePerUnit || 25,
            packaging: defaultProd.packaging || '4 Liters (Gallon)',
            packagingUnit: defaultProd.packagingUnit || 'Gallon',
            unitCost: defaultProd.srp || 400
          }
        ]
      };

      sys.columns.push(newCol);
      this.activeCatalogColIdx = sys.columns.length - 1;
      this.saveSystemTemplate(sys);
      this.renderWorkSystemsTab();
      if (window.QAQCBridge && window.QAQCBridge.showToast) {
        window.QAQCBridge.showToast(`Added ${brand.name} catalog to ${sys.name}`, 'success');
      }
    }

    removeCatalogColFromSystem(systemId, colIdx) {
      const all = this.getSystemTemplates();
      const sys = all.find(s => s.id === systemId);
      if (!sys || !sys.columns || sys.columns.length <= 1) {
        alert('A system must retain at least one catalog specification.');
        return;
      }
      sys.columns.splice(colIdx, 1);
      this.activeCatalogColIdx = Math.max(0, this.activeCatalogColIdx - 1);
      this.saveSystemTemplate(sys);
      this.renderWorkSystemsTab();
    }

    openCreateSystemModal() {
      const modal = document.getElementById('modalCreateWorkSystem');
      if (modal) modal.style.display = 'flex';
    }

    closeCreateSystemModal() {
      const modal = document.getElementById('modalCreateWorkSystem');
      if (modal) modal.style.display = 'none';
    }

    createNewWorkSystem(name, category, defaultArea, brandKey) {
      name = (name || '').trim();
      if (!name) {
        alert('Please enter a work system name.');
        return;
      }

      category = (category || 'Architectural Coatings').trim();
      defaultArea = Math.max(1, parseFloat(defaultArea) || 100);
      brandKey = (brandKey || 'boysen').toLowerCase();
      const brand = COMPARISON_BRANDS[brandKey] || COMPARISON_BRANDS.boysen;

      const newId = `system-custom-${Date.now()}`;
      const matchingProds = PRODUCT_LOOKUP_REGISTRY.filter(p => p.brandKey === brandKey);
      const prepProd = matchingProds.find(p => p.category === 'Surface Prep') || matchingProds[0] || PRODUCT_LOOKUP_REGISTRY[0];
      const primerProd = matchingProds.find(p => p.category === 'Primer') || matchingProds[1] || prepProd;
      const finishProd = matchingProds.find(p => p.category.includes('Topcoat') || p.category.includes('Finish') || p.category.includes('Epoxy') || p.category.includes('Waterproofing')) || matchingProds[2] || primerProd;

      const newSys = {
        id: newId,
        name: name,
        category: category,
        defaultArea: defaultArea,
        description: `Custom engineering specification for ${name}`,
        columns: [
          {
            id: `col-${newId}-1`,
            brandKey: brandKey,
            title: `Catalog 1: ${brand.shortName} System`,
            subtitle: `Procedure: ${prepProd.name} &rarr; ${primerProd.name} &rarr; ${finishProd.name}`,
            stages: [
              {
                stageNum: 1,
                stageName: `Stage 1: ${prepProd.category || 'Substrate Preparation'}`,
                stageRole: prepProd.category || 'Surface Prep',
                productId: prepProd.id,
                coats: prepProd.defaultCoats || 1,
                coveragePerUnit: prepProd.coveragePerUnit || 25,
                packaging: prepProd.packaging || '4 Liters (Gallon)',
                packagingUnit: prepProd.packagingUnit || 'Gallon',
                unitCost: prepProd.srp || 420
              },
              {
                stageNum: 2,
                stageName: `Stage 2: ${primerProd.category || 'Primer'}`,
                stageRole: primerProd.category || 'Primer',
                productId: primerProd.id,
                coats: primerProd.defaultCoats || 1,
                coveragePerUnit: primerProd.coveragePerUnit || 25,
                packaging: primerProd.packaging || '4 Liters (Gallon)',
                packagingUnit: primerProd.packagingUnit || 'Gallon',
                unitCost: primerProd.srp || 700
              },
              {
                stageNum: 3,
                stageName: `Stage 3: ${finishProd.category || 'Protective Finish'}`,
                stageRole: finishProd.category || 'Topcoat Finish',
                productId: finishProd.id,
                coats: finishProd.defaultCoats || 2,
                coveragePerUnit: finishProd.coveragePerUnit || 25,
                packaging: finishProd.packaging || '4 Liters (Gallon)',
                packagingUnit: finishProd.packagingUnit || 'Gallon',
                unitCost: finishProd.srp || 890
              }
            ]
          }
        ]
      };

      this.saveSystemTemplate(newSys);
      this.activeSystemToEditId = newId;
      this.activeCatalogColIdx = 0;
      this.closeCreateSystemModal();
      this.renderWorkSystemsTab();

      if (window.QAQCBridge && window.QAQCBridge.showToast) {
        window.QAQCBridge.showToast(`Created work system "${name}". Added to comparison dropdown list.`, 'success');
      }
    }

    openInComparisonMatrix(systemId) {
      this.loadSystem(systemId);
      this.switchModuleTab('matrix');
      if (window.QAQCBridge && window.QAQCBridge.showToast) {
        window.QAQCBridge.showToast('Switched to Comparison Matrix view.', 'info');
      }
    }

    exportSystemExcel(systemId) {
      const all = this.getSystemTemplates();
      const sys = all.find(s => s.id === systemId);
      if (!sys) return;

      const rows = [
        ['FCLARANANG DEV CORP - WORK SYSTEM SPECIFICATION & PROCEDURAL STANDARDS'],
        ['Work System Name:', sys.name],
        ['Category / Scope:', sys.category || 'Architectural Coatings'],
        ['Default Area (sq.m):', sys.defaultArea || 100],
        ['Export Date:', new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })],
        []
      ];

      sys.columns.forEach((col, cIdx) => {
        const brand = COMPARISON_BRANDS[col.brandKey] || COMPARISON_BRANDS.custom;
        rows.push([`>>> CATALOG ${cIdx + 1}: ${col.title.toUpperCase()} [${brand.name}]`]);
        rows.push(['Step #', 'Stage Description', 'Helper Role', 'Product Code', 'Product Name', 'Packaging', 'Spread (m2/unit)', 'Coats', 'Unit SRP (PHP)']);

        col.stages.forEach(st => {
          const prod = PRODUCT_LOOKUP_REGISTRY.find(p => p.id === st.productId) || {};
          rows.push([
            `${st.stageNum}.0`,
            st.stageName,
            st.stageRole,
            prod.code || '',
            prod.name || '',
            st.packaging,
            st.coveragePerUnit,
            st.coats,
            st.unitCost.toFixed(2)
          ]);
        });
        rows.push([]);
      });

      const csvContent = '\uFEFF' + rows.map(r => r.map(cell => {
        let val = cell === null || cell === undefined ? '' : String(cell);
        if (val.includes(',') || val.includes('"') || val.includes('\n')) {
          val = '"' + val.replace(/"/g, '""') + '"';
        }
        return val;
      }).join(',')).join('\r\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `FCL_Work_System_${sys.id}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (window.QAQCBridge && window.QAQCBridge.showToast) {
        window.QAQCBridge.showToast('Work system standard exported to Excel.', 'success');
      }
    }

    // CSV EXPORT
    // =======================================================================
    exportCsv() {
      const comparison = SystemEstimatorEngine.compareColumns(this.columns, this.areaSqM);
      const tpl = COMPARISON_SYSTEM_TEMPLATES.find(t => t.id === this.currentSystemId) || { name: 'Custom Comparison' };

      const rows = [
        ['FCLARANANG DEV CORP - PRODUCT & SYSTEM COST COMPARISON MATRIX'],
        ['Work System / Specification:', tpl.name],
        ['Surface Area (sq.m):', this.areaSqM.toFixed(2)],
        ['Export Date:', new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })],
        []
      ];

      // Summary table
      rows.push(['--- SUMMARY OF COMPARATIVE ESTIMATES ---']);
      rows.push(['Column #', 'Catalog / Brand', 'Total Packages (PO)', 'Grand Total Cost (PHP)', 'Cost per sq.m (PHP/m2)', 'Variance vs Lowest']);

      comparison.columns.forEach((col, idx) => {
        const brand = COMPARISON_BRANDS[col.brandKey] || COMPARISON_BRANDS.custom;
        const deltaStr = col.isLowestCost ? 'LOWEST COST (BEST VALUE)' : `+PHP ${col.diffFromLowest.toFixed(2)}/m2 (+${col.percentDiffFromLowest.toFixed(1)}%)`;
        rows.push([
          `Column ${idx + 1}`,
          `${col.title} [${brand.name}]`,
          col.totalPackages,
          col.grandTotalCost.toFixed(2),
          col.grandCostPerSqM.toFixed(2),
          deltaStr
        ]);
      });

      rows.push([]);
      rows.push(['--- DETAILED PROCESS STEPS & PRODUCT BREAKDOWN ---']);

      // Detail per column
      comparison.columns.forEach((col, idx) => {
        rows.push([]);
        rows.push([`>>> COLUMN ${idx + 1}: ${col.title.toUpperCase()}`]);
        rows.push(['Step #', 'Stage Name', 'Product Code', 'Product Description', 'Packaging', 'Spread (m2/unit)', 'Coats', 'Req Packages', 'Exact Material', 'Unit SRP (PHP)', 'Total Cost (PHP)', 'Cost/m2 (PHP)']);

        col.computedStages.forEach((st) => {
          const p = st.product || {};
          rows.push([
            st.stageNum,
            st.stageName,
            p.code || '',
            p.name || '',
            st.packaging,
            st.coveragePerUnit,
            st.coats,
            st.calc.roundedUnits,
            `${st.calc.exactUnits.toFixed(2)} ${st.calc.packagingUnit}`,
            st.unitCost.toFixed(2),
            st.calc.totalCost.toFixed(2),
            st.calc.costPerSqM.toFixed(2)
          ]);
        });

        rows.push([
          'TOTALS',
          '',
          '',
          '',
          '',
          '',
          '',
          col.totalPackages,
          '',
          '',
          `PHP ${col.grandTotalCost.toFixed(2)}`,
          `PHP ${col.grandCostPerSqM.toFixed(2)}/m2`
        ]);
      });

      const csvContent = '\uFEFF' + rows.map(r => r.map(cell => `"${String(cell || '').replace(/"/g, '""')}"`).join(',')).join('\r\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `FCL_Product_Cost_Comparison_${this.areaSqM}sqm.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (window.QAQCBridge && window.QAQCBridge.showToast) {
        window.QAQCBridge.showToast('Comparison matrix exported to CSV successfully.', 'success');
      }
    }

    async exportBoqExcel() {
      const comparison = SystemEstimatorEngine.compareColumns(this.columns, this.areaSqM);
      const tpl = COMPARISON_SYSTEM_TEMPLATES.find(t => t.id === this.currentSystemId) || { name: 'Work System Comparison' };
      const safeSystemId = (this.currentSystemId || 'system').replace(/[^a-z0-9_-]/gi, '_');
      const filename = `FCLDC_BOQ_Matrix_${safeSystemId}_${Math.round(this.areaSqM)}sqm.xlsx`;

      // Attempt Template-Based ExcelJS Export using FCL_BOQ_Template.xlsx
      try {
        const getTemplateBuf = typeof window !== 'undefined' && window.getFclTemplateArrayBuffer
          ? window.getFclTemplateArrayBuffer
          : (typeof getFclTemplateArrayBuffer === 'function' ? getFclTemplateArrayBuffer : null);

        const ExcelJSEngine = typeof window !== 'undefined' && window.ExcelJS
          ? window.ExcelJS
          : (typeof ExcelJS !== 'undefined' ? ExcelJS : null);

        if (getTemplateBuf && ExcelJSEngine) {
          const buf = await getTemplateBuf();
          if (buf && buf.byteLength > 0) {
            const wb = new ExcelJSEngine.Workbook();
            await wb.xlsx.load(buf);

            const boqHeaders = [
              'Item #',
              'Process Step',
              'Trade Scope',
              'Assigned Product & Specification',
              'Packaging',
              'Spread (m²/unit)',
              'Coats',
              'Qty to Order (PO)',
              'Unit Rate (PHP Vat-In)',
              'Total Amount (PHP Vat-In)'
            ];

            const colWidths = [
              { width: 12 }, // Item
              { width: 26 }, // Step
              { width: 22 }, // Scope
              { width: 36 }, // Product
              { width: 16 }, // Packaging
              { width: 18 }, // Spread
              { width: 10 }, // Coats
              { width: 18 }, // PO Qty
              { width: 22 }, // Unit Rate
              { width: 24 }  // Total Amount
            ];

            const logoBuffer = wb.media && wb.media.length > 0 ? wb.media[0].buffer : null;
            const logoExt = wb.media && wb.media.length > 0 ? (wb.media[0].extension || 'jpeg') : 'jpeg';

            // Helper to populate an individual BOQ Schedule worksheet
            const populateBoqScheduleSheet = (sh, colData, sheetTitle, pageStr) => {
              colWidths.forEach((w, i) => {
                sh.getColumn(i + 1).width = w.width;
              });

              // Title & ISO Header block
              try { sh.mergeCells('D1:G4'); } catch (e) { /* already merged */ }
              const titleCell = sh.getCell('D1');
              titleCell.value = sheetTitle;
              titleCell.font = { name: 'Segoe UI', size: 14, bold: true, color: { argb: 'FF0F172A' } };
              titleCell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

              // ISO Control block
              sh.getCell('H1').value = 'Doc. Code   :      ';
              sh.getCell('I1').value = 'FM-OPN-02-15 Rev. No.';
              sh.getCell('H2').value = 'Rev. No.     :   ';
              sh.getCell('I2').value = 1;
              sh.getCell('H3').value = 'Eff. Date     :    ';
              sh.getCell('I3').value = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
              sh.getCell('H4').value = 'Page           :    ';
              sh.getCell('I4').value = pageStr || '1 of 1';

              // Project metadata in rows 5-8
              const metaLabels = [
                ['A5', 'PROJECT / SPECIFICATION:', 'C5', tpl.name],
                ['A6', 'PROJECT SURFACE AREA:', 'C6', `${this.areaSqM.toFixed(2)} SQ.M`],
                ['A7', 'DATE OF ESTIMATE:', 'C7', new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })],
                ['A8', 'ENGINEERING DIVISION:', 'C8', 'FCLaranang Development Corporation - QA/QC Department']
              ];

              metaLabels.forEach(([lblCell, lblVal, valCell, dataVal]) => {
                const cL = sh.getCell(lblCell);
                cL.value = lblVal;
                cL.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FF475569' } };
                const cV = sh.getCell(valCell);
                cV.value = dataVal;
                cV.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FF0F172A' } };
              });

              // Header Row 11
              const hRow = sh.getRow(11);
              hRow.height = 28;
              boqHeaders.forEach((hName, idx) => {
                const cell = hRow.getCell(idx + 1);
                cell.value = hName;
                cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
                cell.fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: 'FF1E293B' }
                };
                cell.alignment = { vertical: 'middle', horizontal: idx >= 4 ? 'right' : 'left', wrapText: true };
                cell.border = {
                  top: { style: 'thin', color: { argb: 'FF94A3B8' } },
                  left: { style: 'thin', color: { argb: 'FF94A3B8' } },
                  bottom: { style: 'medium', color: { argb: 'FF0F172A' } },
                  right: { style: 'thin', color: { argb: 'FF94A3B8' } }
                };
              });
              hRow.commit();

              // Update Table1 column names if Table1 exists on this worksheet
              if (sh.tables && sh.tables.Table1 && sh.tables.Table1.table) {
                boqHeaders.forEach((hName, idx) => {
                  if (sh.tables.Table1.table.columns[idx]) {
                    sh.tables.Table1.table.columns[idx].name = hName;
                  }
                });
              }

              // Data Rows 12 onwards
              const stages = colData.computedStages || [];
              stages.forEach((st, idx) => {
                const r = 12 + idx;
                const row = sh.getRow(r);
                row.height = 24;

                row.getCell(1).value = `Step ${idx + 1}.0`;
                row.getCell(2).value = st.stageName;
                row.getCell(3).value = st.stageRole;
                row.getCell(4).value = `${st.product.code ? `[${st.product.code}] ` : ''}${st.product.name}`;
                row.getCell(5).value = st.packaging;
                row.getCell(6).value = st.coveragePerUnit;
                row.getCell(7).value = st.coats;
                row.getCell(8).value = st.calc.roundedUnits;
                row.getCell(9).value = st.unitCost;
                row.getCell(10).value = { formula: `H${r}*I${r}`, result: st.calc.totalCost };

                // Alignments & borders
                for (let c = 1; c <= 10; c++) {
                  const cell = row.getCell(c);
                  cell.font = { name: 'Segoe UI', size: 9 };
                  cell.border = {
                    top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
                    left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
                    bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
                    right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
                  };
                  if (c >= 6) {
                    cell.alignment = { vertical: 'middle', horizontal: 'right' };
                  } else {
                    cell.alignment = { vertical: 'middle', horizontal: 'left' };
                  }
                }

                row.getCell(9).numFmt = '₱#,##0.00';
                row.getCell(10).numFmt = '₱#,##0.00';
                row.commit();
              });

              const lastDataRow = 11 + stages.length;

              // Row: Grand Total
              const grandRow = sh.getRow(lastDataRow + 1);
              grandRow.height = 26;
              grandRow.getCell(2).value = 'GRAND TOTAL ESTIMATED COST (PHP)';
              grandRow.getCell(8).value = colData.totalPackages;
              grandRow.getCell(10).value = { formula: `SUM(J12:J${lastDataRow})`, result: colData.grandTotalCost };
              for (let c = 1; c <= 10; c++) {
                const cell = grandRow.getCell(c);
                cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF0F172A' } };
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF1F5F9' } };
                cell.border = {
                  top: { style: 'medium', color: { argb: 'FF0F172A' } },
                  bottom: { style: 'medium', color: { argb: 'FF0F172A' } }
                };
              }
              grandRow.getCell(10).numFmt = '₱#,##0.00';
              grandRow.getCell(10).alignment = { vertical: 'middle', horizontal: 'right' };
              grandRow.getCell(8).alignment = { vertical: 'middle', horizontal: 'right' };
              grandRow.commit();

              // Row: Final Rate per sq.m
              const rateRow = sh.getRow(lastDataRow + 2);
              rateRow.height = 24;
              rateRow.getCell(2).value = 'FINAL RATE PER SQ.M (PHP / M²)';
              rateRow.getCell(10).value = { formula: `J${lastDataRow + 1}/${this.areaSqM}`, result: colData.grandCostPerSqM };
              rateRow.getCell(10).numFmt = '₱#,##0.00';
              rateRow.getCell(10).alignment = { vertical: 'middle', horizontal: 'right' };
              for (let c = 1; c <= 10; c++) {
                const cell = rateRow.getCell(c);
                cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF1E3A8A' } };
              }
              rateRow.commit();

              // Row: Value Engineering Status
              const statusRow = sh.getRow(lastDataRow + 3);
              statusRow.height = 24;
              statusRow.getCell(2).value = 'VALUE ENGINEERING & AWARD STATUS:';
              statusRow.getCell(4).value = colData.isLowestCost
                ? '★ BEST VALUE (LOWEST ESTIMATED COST)'
                : `+PHP ${colData.diffFromLowest.toFixed(2)}/sq.m (+${colData.percentDiffFromLowest.toFixed(1)}% vs Best Value)`;
              for (let c = 1; c <= 10; c++) {
                const cell = statusRow.getCell(c);
                cell.font = {
                  name: 'Segoe UI',
                  size: 9,
                  bold: true,
                  color: colData.isLowestCost ? { argb: 'FF047857' } : { argb: 'FFB45309' }
                };
              }
              statusRow.commit();

              // Clear excess template rows beyond this table
              const oldRowCount = sh.rowCount;
              if (oldRowCount > lastDataRow + 4) {
                for (let r = lastDataRow + 4; r <= oldRowCount; r++) {
                  sh.getRow(r).values = [];
                }
              }

              // Adjust Table1 bounds if present
              if (sh.tables && sh.tables.Table1 && sh.tables.Table1.table) {
                sh.tables.Table1.table.tableRef = `A11:J${lastDataRow}`;
                sh.tables.Table1.table.autoFilterRef = `A11:J${lastDataRow}`;
              }
            };

            const cols = comparison.columns || [];
            const totalPages = cols.length > 1 ? cols.length + 1 : 1;

            if (cols.length <= 1) {
              // Single Option BOQ
              const col0 = cols[0] || { title: 'Standard System', computedStages: [] };
              const sh1 = wb.getWorksheet(1);
              sh1.name = 'BOQ_Estimate';
              populateBoqScheduleSheet(sh1, col0, 'BILL OF QUANTITIES (BOQ) - ESTIMATE', '1 of 1');
            } else {
              // Multi-Catalog Comparison
              // 1. First Sheet: Comparative Summary Matrix
              const shMatrix = wb.addWorksheet('Comparative Matrix');
              if (logoBuffer) {
                const imgId = wb.addImage({ buffer: logoBuffer, extension: logoExt });
                shMatrix.addImage(imgId, { tl: { col: 0.1, row: 0.1 }, br: { col: 1.9, row: 3.9 } });
              }

              // Format Header in Comparative Matrix
              shMatrix.mergeCells('D1:N4');
              const matTitle = shMatrix.getCell('D1');
              matTitle.value = 'BILL OF QUANTITIES (BOQ) - COMPARATIVE ESTIMATE MATRIX';
              matTitle.font = { name: 'Segoe UI', size: 14, bold: true, color: { argb: 'FF0F172A' } };
              matTitle.alignment = { vertical: 'middle', horizontal: 'center' };

              shMatrix.getCell('O1').value = 'Doc. Code: FM-OPN-02-15';
              shMatrix.getCell('O2').value = 'Rev. No.: 1';
              shMatrix.getCell('O3').value = `Eff. Date: ${new Date().toLocaleDateString('en-US')}`;
              shMatrix.getCell('O4').value = `Page 1 of ${totalPages}`;

              // Project metadata
              shMatrix.getCell('A5').value = 'PROJECT / SYSTEM:';
              shMatrix.getCell('C5').value = tpl.name;
              shMatrix.getCell('A6').value = 'SURFACE AREA:';
              shMatrix.getCell('C6').value = `${this.areaSqM.toFixed(2)} SQ.M`;
              shMatrix.getCell('A7').value = 'DATE GENERATED:';
              shMatrix.getCell('C7').value = new Date().toLocaleString();
              shMatrix.getCell('A8').value = 'ENGINEERING DIVISION:';
              shMatrix.getCell('C8').value = 'FCLaranang Development Corporation - QA/QC Department';

              for (let r = 5; r <= 8; r++) {
                shMatrix.getCell(`A${r}`).font = { bold: true, size: 9, color: { argb: 'FF475569' } };
                shMatrix.getCell(`C${r}`).font = { bold: true, size: 9, color: { argb: 'FF0F172A' } };
              }

              // Build Super-Header Row 11 & Sub-Header Row 12
              const superRow = shMatrix.getRow(11);
              const subRow = shMatrix.getRow(12);
              superRow.height = 26;
              subRow.height = 24;

              shMatrix.getColumn(1).width = 10; // Item
              shMatrix.getColumn(2).width = 28; // Description
              shMatrix.getColumn(3).width = 8;  // Unit
              shMatrix.getColumn(4).width = 12; // Area

              superRow.getCell(1).value = 'ITEM';
              superRow.getCell(2).value = 'WORK & APPLICATION DESCRIPTION';
              superRow.getCell(3).value = 'UNIT';
              superRow.getCell(4).value = 'AREA (M2)';

              let currColIdx = 5;
              cols.forEach((col) => {
                const brand = COMPARISON_BRANDS[col.brandKey] || COMPARISON_BRANDS.custom;
                const startC = currColIdx;
                const endC = currColIdx + 6;
                shMatrix.mergeCells(11, startC, 11, endC);
                const colTitleCell = superRow.getCell(startC);
                colTitleCell.value = `${col.title.toUpperCase()} [${brand.name}]`;
                colTitleCell.alignment = { vertical: 'middle', horizontal: 'center' };
                colTitleCell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
                colTitleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };

                const subTitles = ['PRODUCT SPECIFICATION', 'PACKAGING', 'SPREAD (M2/UNIT)', 'COATS', 'PO ORDER', 'UNIT RATE (PHP)', 'TOTAL AMOUNT (PHP)'];
                subTitles.forEach((stTitle, sIdx) => {
                  const sCell = subRow.getCell(startC + sIdx);
                  sCell.value = stTitle;
                  sCell.font = { bold: true, size: 8, color: { argb: 'FFFFFFFF' } };
                  sCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF334155' } };
                  sCell.alignment = { vertical: 'middle', horizontal: sIdx >= 4 ? 'right' : 'left' };
                  shMatrix.getColumn(startC + sIdx).width = sIdx === 0 ? 30 : 16;
                });
                currColIdx += 7;
              });

              // Variance Analysis Column
              const varColIdx = currColIdx;
              shMatrix.getColumn(varColIdx).width = 24;
              superRow.getCell(varColIdx).value = 'VARIANCE ANALYSIS';
              subRow.getCell(varColIdx).value = 'DIFFERENCE VS LOWEST';
              superRow.getCell(varColIdx).font = { bold: true, color: { argb: 'FFFFFFFF' } };
              superRow.getCell(varColIdx).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF065F46' } };
              subRow.getCell(varColIdx).font = { bold: true, size: 8, color: { argb: 'FFFFFFFF' } };
              subRow.getCell(varColIdx).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF047857' } };

              superRow.commit();
              subRow.commit();

              // Comparative Data Rows (13 onwards)
              const maxStages = Math.max(...cols.map(c => c.computedStages.length), 1);
              for (let i = 0; i < maxStages; i++) {
                const r = 13 + i;
                const dRow = shMatrix.getRow(r);
                dRow.height = 22;

                const sampleStage = cols.find(c => c.computedStages[i])?.computedStages[i];
                const desc = sampleStage ? `${sampleStage.stageName} (${sampleStage.stageRole})` : `Process Step ${i + 1}`;

                dRow.getCell(1).value = `Step ${i + 1}.0`;
                dRow.getCell(2).value = desc;
                dRow.getCell(3).value = 'sq.m';
                dRow.getCell(4).value = this.areaSqM;

                let cIdx = 5;
                let lowestLineCost = Infinity;

                cols.forEach((col) => {
                  const st = col.computedStages[i];
                  if (st) {
                    dRow.getCell(cIdx).value = `${st.product.code ? `[${st.product.code}] ` : ''}${st.product.name}`;
                    dRow.getCell(cIdx + 1).value = st.packaging;
                    dRow.getCell(cIdx + 2).value = st.coveragePerUnit;
                    dRow.getCell(cIdx + 3).value = st.coats;
                    dRow.getCell(cIdx + 4).value = st.calc.roundedUnits;
                    dRow.getCell(cIdx + 5).value = st.unitCost;
                    dRow.getCell(cIdx + 6).value = st.calc.totalCost;

                    dRow.getCell(cIdx + 5).numFmt = '₱#,##0.00';
                    dRow.getCell(cIdx + 6).numFmt = '₱#,##0.00';

                    if (st.calc.costPerSqM < lowestLineCost) lowestLineCost = st.calc.costPerSqM;
                  } else {
                    dRow.getCell(cIdx).value = '— (Step not required) —';
                    dRow.getCell(cIdx + 1).value = '—';
                    dRow.getCell(cIdx + 2).value = '—';
                    dRow.getCell(cIdx + 3).value = '—';
                    dRow.getCell(cIdx + 4).value = 0;
                    dRow.getCell(cIdx + 5).value = 0;
                    dRow.getCell(cIdx + 6).value = 0;
                  }
                  cIdx += 7;
                });

                dRow.getCell(varColIdx).value = lowestLineCost !== Infinity
                  ? `Lowest: PHP ${lowestLineCost.toFixed(2)}/m²`
                  : '—';
                dRow.getCell(varColIdx).font = { italic: true, size: 9, color: { argb: 'FF065F46' } };

                for (let c = 1; c <= varColIdx; c++) {
                  const cell = dRow.getCell(c);
                  cell.border = {
                    top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
                    bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
                    left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
                    right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
                  };
                }
                dRow.commit();
              }

              // Summary Totals in Matrix
              const matLastRow = 12 + maxStages;
              const pkgRow = shMatrix.getRow(matLastRow + 2);
              const totRow = shMatrix.getRow(matLastRow + 3);
              const rateRow = shMatrix.getRow(matLastRow + 4);
              const statusRow = shMatrix.getRow(matLastRow + 5);

              pkgRow.getCell(2).value = 'TOTAL ORDER PACKAGES (PO)';
              totRow.getCell(2).value = 'GRAND TOTAL ESTIMATED COST (PHP)';
              rateRow.getCell(2).value = 'FINAL RATE PER SQ.M (PHP / M²)';
              statusRow.getCell(2).value = 'VALUE ENGINEERING & AWARD STATUS';

              let sumCIdx = 5;
              cols.forEach((col) => {
                pkgRow.getCell(sumCIdx + 4).value = `${col.totalPackages} pkgs`;
                totRow.getCell(sumCIdx + 6).value = col.grandTotalCost;
                totRow.getCell(sumCIdx + 6).numFmt = '₱#,##0.00';
                rateRow.getCell(sumCIdx + 6).value = col.grandCostPerSqM;
                rateRow.getCell(sumCIdx + 6).numFmt = '₱#,##0.00';

                const delta = col.isLowestCost
                  ? '★ BEST VALUE (LOWEST COST)'
                  : `+PHP ${col.diffFromLowest.toFixed(2)}/m² (+${col.percentDiffFromLowest.toFixed(1)}%)`;
                statusRow.getCell(sumCIdx).value = delta;
                statusRow.getCell(sumCIdx).font = { bold: true, color: col.isLowestCost ? { argb: 'FF047857' } : { argb: 'FFB45309' } };
                sumCIdx += 7;
              });

              [pkgRow, totRow, rateRow, statusRow].forEach(r => {
                r.height = 24;
                r.getCell(2).font = { bold: true, color: { argb: 'FF0F172A' } };
                r.commit();
              });

              // 2. Individual BOQ Schedule Sheets for each Brand
              const sh1 = wb.getWorksheet(1);
              sh1.name = `BOQ - Option 1`;
              populateBoqScheduleSheet(sh1, cols[0], `BILL OF QUANTITIES - ${cols[0].title.toUpperCase()}`, `2 of ${totalPages}`);

              for (let c = 1; c < cols.length; c++) {
                const shNext = wb.addWorksheet(`BOQ - Option ${c + 1}`);
                if (logoBuffer) {
                  const imgId = wb.addImage({ buffer: logoBuffer, extension: logoExt });
                  shNext.addImage(imgId, { tl: { col: 0.1, row: 0.1 }, br: { col: 1.9, row: 3.9 } });
                }
                populateBoqScheduleSheet(shNext, cols[c], `BILL OF QUANTITIES - ${cols[c].title.toUpperCase()}`, `${c + 2} of ${totalPages}`);
              }

              // Set Comparative Matrix as FIRST tab
              wb._worksheets = [undefined, shMatrix, sh1, ...wb.worksheets.slice(2)];
              shMatrix.orderNo = 0;
              sh1.orderNo = 1;
            }

            const outBuf = await wb.xlsx.writeBuffer();
            const blob = new Blob([outBuf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            if (typeof window !== 'undefined' && window.QAQCBridge && window.QAQCBridge.showToast) {
              window.QAQCBridge.showToast('BOQ spreadsheet exported to FCL Excel Template (.xlsx) successfully.', 'success');
            }
            return;
          }
        }
      } catch (err) {
        console.warn('ExcelJS BOQ template export failed, falling back to CSV:', err);
      }

      const rows = [
        ['BILL OF QUANTITIES (BOQ) - COMPARATIVE ESTIMATE SPREADSHEET'],
        ['PROJECT / SYSTEM SPECIFICATION:', tpl.name],
        ['PROJECT SURFACE AREA:', `${this.areaSqM.toFixed(2)} SQ.M`],
        ['DATE OF ESTIMATE GENERATION:', new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })],
        ['ORGANIZATION:', 'FCLaranang Development Corporation - QA/QC Division'],
        []
      ];

      // Build Super-Header Row
      const superHeader = ['ITEM', 'WORK & APPLICATION DESCRIPTION', 'UNIT', 'AREA (M2)'];
      const subHeader = ['', '', '', ''];

      comparison.columns.forEach((col) => {
        const brand = COMPARISON_BRANDS[col.brandKey] || COMPARISON_BRANDS.custom;
        const colTitle = `${col.title.toUpperCase()} [${brand.name}]`;
        superHeader.push(colTitle, '', '', '', '', '', '');
        subHeader.push('ASSIGNED PRODUCT', 'PACKAGING', 'SPREAD (M2/UNIT)', 'COATS', 'PO ORDER PACKAGES', 'UNIT RATE (PHP)', 'TOTAL AMOUNT (PHP)');
      });

      superHeader.push('VARIANCE ANALYSIS');
      subHeader.push('DIFFERENCE VS LOWEST');

      rows.push(superHeader);
      rows.push(subHeader);

      const maxStages = Math.max(...comparison.columns.map(c => c.computedStages.length), 1);
      for (let i = 0; i < maxStages; i++) {
        const itemNum = `Step ${i + 1}.0`;
        const sampleStage = comparison.columns.find(c => c.computedStages[i])?.computedStages[i];
        const desc = sampleStage ? `${sampleStage.stageName} (${sampleStage.stageRole})` : `Process Step ${i + 1}`;

        const row = [itemNum, desc, 'sq.m', this.areaSqM.toFixed(2)];

        let lowestLineCost = Infinity;
        comparison.columns.forEach(col => {
          const st = col.computedStages[i];
          if (st) {
            row.push(
              `${st.product.code ? `[${st.product.code}] ` : ''}${st.product.name}`,
              st.packaging,
              st.coveragePerUnit,
              st.coats,
              `${st.calc.roundedUnits} ${st.calc.packagingUnit}`,
              st.unitCost.toFixed(2),
              st.calc.totalCost.toFixed(2)
            );
            if (st.calc.costPerSqM < lowestLineCost) lowestLineCost = st.calc.costPerSqM;
          } else {
            row.push('N/A (Step omitted by procedure)', '—', '—', '—', '0', '0.00', '0.00');
          }
        });

        row.push(lowestLineCost !== Infinity ? `Lowest: PHP ${lowestLineCost.toFixed(2)}/m2` : '—');
        rows.push(row);
      }

      // Summary Totals in BOQ
      rows.push([]);
      rows.push(['--- BILL OF QUANTITIES SUMMARY TOTALS ---']);
      
      const pkgRow = ['TOTAL ORDER PACKAGES (PO)', '', '', ''];
      const totalRow = ['GRAND TOTAL ESTIMATED COST (PHP)', '', '', ''];
      const rateRow = ['FINAL RATE PER SQ.M (PHP / M2)', '', '', ''];
      const statusRow = ['AWARD & VALUE ENGINEERING STATUS', '', '', ''];

      comparison.columns.forEach(col => {
        const delta = col.isLowestCost ? 'LOWEST COST (BEST VALUE)' : `+PHP ${col.diffFromLowest.toFixed(2)}/m2 (+${col.percentDiffFromLowest.toFixed(1)}%)`;
        pkgRow.push(`${col.totalPackages} pkgs`, '', '', '', '', '', '');
        totalRow.push(`PHP ${col.grandTotalCost.toFixed(2)}`, '', '', '', '', '', '');
        rateRow.push(`PHP ${col.grandCostPerSqM.toFixed(2)} / sq.m`, '', '', '', '', '', '');
        statusRow.push(delta, '', '', '', '', '', '');
      });
      pkgRow.push('');
      totalRow.push('');
      rateRow.push('');
      statusRow.push('');

      rows.push(pkgRow, totalRow, rateRow, statusRow);

      // Export with UTF-8 BOM
      const csvContent = '\uFEFF' + rows.map(r => r.map(cell => {
        let val = (cell === null || cell === undefined) ? '' : String(cell);
        if (val.includes(',') || val.includes('"') || val.includes('\n')) {
          val = '"' + val.replace(/"/g, '""') + '"';
        }
        return val;
      }).join(',')).join('\r\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `FCLDC_BOQ_Matrix_${this.currentSystemId}_${this.areaSqM}sqm.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (typeof window !== 'undefined' && window.QAQCBridge && window.QAQCBridge.showToast) {
        window.QAQCBridge.showToast('BOQ spreadsheet exported to Excel successfully.', 'success');
      }
    }

    // =======================================================================
    // RENDERING LOGIC
    // =======================================================================
    render() {
      this.renderKpiRow();
      this.renderColumns();
      this.renderBoqTable();
      this.updateQuickChipHighlight(this.areaSqM);
      this.syncViewModeUI();
    }

    renderCalculationsOnly() {
      this.renderKpiRow();
      this.renderBoqTable();
      // Update DOM values directly without full re-render for speed and focus preservation
      const comparison = SystemEstimatorEngine.compareColumns(this.columns, this.areaSqM);
      comparison.columns.forEach((col, colIdx) => {
        const colEl = document.getElementById(`colCard_${col.id}`);
        if (!colEl) return;

        // Update column header metrics
        const totalEl = colEl.querySelector('.col-header-total');
        if (totalEl) totalEl.textContent = `₱${col.grandTotalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        
        const rateEl = colEl.querySelector('.col-header-rate');
        if (rateEl) rateEl.textContent = `₱${col.grandCostPerSqM.toFixed(2)} / sq.m`;

        // Update footer totals
        const footTotal = colEl.querySelector('.col-foot-total');
        if (footTotal) footTotal.textContent = `₱${col.grandTotalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        const footRate = colEl.querySelector('.col-foot-rate');
        if (footRate) footRate.textContent = `₱${col.grandCostPerSqM.toFixed(2)} / sq.m`;

        const footPkgs = colEl.querySelector('.col-foot-pkgs');
        if (footPkgs) footPkgs.textContent = `${col.totalPackages} ${col.totalPackages === 1 ? 'Package' : 'Packages'}`;

        // Update each stage
        col.computedStages.forEach((st, stIdx) => {
          const rowEl = colEl.querySelector(`[data-stage-row="${col.id}_${stIdx}"]`);
          if (!rowEl) return;

          const reqQtyEl = rowEl.querySelector('.stage-req-qty');
          if (reqQtyEl) {
            reqQtyEl.innerHTML = `<strong>${st.calc.roundedUnits} ${st.calc.packagingUnit}</strong> <small>(${st.calc.exactUnits.toFixed(2)} theor)</small>`;
          }

          const stageTotalEl = rowEl.querySelector('.stage-row-total');
          if (stageTotalEl) {
            stageTotalEl.textContent = `₱${st.calc.totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          }

          const stageRateEl = rowEl.querySelector('.stage-row-rate');
          if (stageRateEl) {
            stageRateEl.textContent = `₱${st.calc.costPerSqM.toFixed(2)}/m²`;
          }
        });
      });
    }

    renderKpiRow() {
      const container = document.getElementById('comparisonKpiRow');
      if (!container) return;

      const comparison = SystemEstimatorEngine.compareColumns(this.columns, this.areaSqM);
      if (!comparison.columns || comparison.columns.length === 0) {
        container.innerHTML = '';
        return;
      }

      container.innerHTML = comparison.columns.map((col, idx) => {
        const brand = COMPARISON_BRANDS[col.brandKey] || COMPARISON_BRANDS.custom;
        const isBest = col.isLowestCost;

        return `
          <div class="comparison-kpi-card ${isBest ? 'best-value' : ''}">
            <div class="kpi-card-header">
              <div class="kpi-brand-badge" style="background:${brand.badgeBg}; color:${brand.badgeColor}; border:1px solid ${brand.badgeBorder};">
                <span class="brand-monogram">${brand.logoLetter}</span>
                <span>${brand.shortName}</span>
              </div>
              ${isBest ? `
                <span class="best-value-ribbon">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  Best Value
                </span>
              ` : `
                <span class="delta-variance-pill">
                  +₱${col.diffFromLowest.toFixed(2)}/m² (+${col.percentDiffFromLowest.toFixed(1)}%)
                </span>
              `}
            </div>

            <div class="kpi-cost-title">${col.title}</div>

            <div class="kpi-cost-display">
              <div class="kpi-main-rate">
                <span class="currency-symbol">₱</span>
                <span class="rate-digits">${col.grandCostPerSqM.toFixed(2)}</span>
                <span class="per-unit">/ sq.m</span>
              </div>
              <div class="kpi-grand-total">
                Grand Total: <strong>₱${col.grandTotalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                <span class="package-count">(${col.totalPackages} pkgs for ${this.areaSqM} m²)</span>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    renderColumns() {
      const container = document.getElementById('comparisonColumnsContainer');
      if (!container) return;

      const comparison = SystemEstimatorEngine.compareColumns(this.columns, this.areaSqM);

      container.innerHTML = comparison.columns.map((col, colIdx) => {
        const brand = COMPARISON_BRANDS[col.brandKey] || COMPARISON_BRANDS.custom;
        const isBest = col.isLowestCost;

        // Build Stages HTML
        const stagesHtml = col.computedStages.map((st, stIdx) => {
          const p = st.product || {};
          const currentBrandKey = p.brandKey || col.brandKey;

          // Build Brand options for stage
          const brandOptions = Object.keys(COMPARISON_BRANDS).map(bk => {
            const b = COMPARISON_BRANDS[bk];
            return `<option value="${bk}" ${bk === currentBrandKey ? 'selected' : ''}>${b.shortName}</option>`;
          }).join('');

          // Build Product options for this stage's selected brand
          const filteredProds = PRODUCT_LOOKUP_REGISTRY.filter(pr => pr.brandKey === currentBrandKey || currentBrandKey === 'custom');
          const productOptions = filteredProds.map(pr => {
            return `<option value="${pr.id}" ${pr.id === st.productId ? 'selected' : ''}>${pr.code ? `[${pr.code}] ` : ''}${pr.name} (${pr.category || 'Product'})</option>`;
          }).join('');

          const isFirst = stIdx === 0;
          const isLast = stIdx === col.computedStages.length - 1;

          return `
            <!-- Between-Step Insertion Divider -->
            <div class="stage-insert-divider ${isFirst ? 'top-divider' : ''}">
              <div class="insert-divider-line"></div>
              <button type="button" class="insert-divider-btn" onclick="productComparison.insertStage('${col.id}', ${stIdx})" title="Insert a new process step before Step ${st.stageNum}">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span>+ Insert Step ${st.stageNum} Here</span>
              </button>
            </div>

            <div class="comparison-stage-card" data-stage-row="${col.id}_${stIdx}">
              <!-- Stage Header -->
              <div class="stage-card-topbar">
                <div style="display:flex; align-items:center; gap:0.4rem; flex-wrap:wrap;">
                  <span class="stage-seq-num">Step ${st.stageNum}</span>
                  <span class="stage-role-pill">${st.stageRole || 'Application Step'}</span>
                </div>
                <div class="stage-topbar-actions">
                  <button type="button" class="stage-action-btn move-btn" title="Move step up" onclick="productComparison.moveStage('${col.id}', ${stIdx}, -1)" ${isFirst ? 'disabled' : ''}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
                  </button>
                  <button type="button" class="stage-action-btn move-btn" title="Move step down" onclick="productComparison.moveStage('${col.id}', ${stIdx}, 1)" ${isLast ? 'disabled' : ''}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <button type="button" class="stage-action-btn insert-micro-btn" title="Insert new step above this" onclick="productComparison.insertStage('${col.id}', ${stIdx})">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    <span>Above</span>
                  </button>
                  <button type="button" class="stage-action-btn insert-micro-btn" title="Insert new step below this" onclick="productComparison.insertStage('${col.id}', ${stIdx + 1})">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    <span>Below</span>
                  </button>
                  <button type="button" class="stage-del-btn" title="Remove this process step" onclick="productComparison.removeStage('${col.id}', ${stIdx})">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>
              </div>

              <!-- Stage Title / Name Editable -->
              <div class="stage-title-field">
                <input type="text" class="stage-name-input" value="${st.stageName}" title="Edit stage label" onchange="productComparison.updateStageParam('${col.id}', ${stIdx}, 'stageName', this.value)">
              </div>

              <!-- Product Selector Row -->
              <div class="stage-prod-select-row">
                <div class="stage-brand-select-wrap">
                  <label class="stage-input-label">Brand</label>
                  <select class="stage-brand-select" onchange="productComparison.onStageBrandChange('${col.id}', ${stIdx}, this.value)">
                    ${brandOptions}
                  </select>
                </div>
                <div class="stage-prod-select-wrap">
                  <label class="stage-input-label">Assigned Catalog Product</label>
                  <select class="stage-prod-select" onchange="productComparison.updateStageProduct('${col.id}', ${stIdx}, this.value)">
                    ${productOptions}
                  </select>
                </div>
              </div>

              <!-- Tech & Calculation Form Grid -->
              <div class="stage-calc-grid">
                <!-- 1. Coverage -->
                <div class="stage-calc-cell">
                  <label class="stage-input-label">Theor. Spread / Packaging</label>
                  <div class="mini-input-group">
                    <input type="number" class="mini-num-input" value="${st.coveragePerUnit}" min="0.1" step="0.5" onchange="productComparison.updateStageParam('${col.id}', ${stIdx}, 'coveragePerUnit', this.value)">
                    <span class="mini-unit">m² / ${st.packagingUnit}</span>
                  </div>
                </div>

                <!-- 2. Coats -->
                <div class="stage-calc-cell">
                  <label class="stage-input-label">Application Coats</label>
                  <div class="mini-input-group">
                    <input type="number" class="mini-num-input" value="${st.coats}" min="1" max="10" step="1" onchange="productComparison.updateStageParam('${col.id}', ${stIdx}, 'coats', this.value)">
                    <span class="mini-unit">${st.coats === 1 ? 'coat' : 'coats'}</span>
                  </div>
                </div>

                <!-- 3. Required Qty Calculated -->
                <div class="stage-calc-cell">
                  <label class="stage-input-label">Material to Order (PO)</label>
                  <div class="stage-req-qty">
                    <strong>${st.calc.roundedUnits} ${st.calc.packagingUnit}</strong>
                    <small>(${st.calc.exactUnits.toFixed(2)} theor)</small>
                  </div>
                </div>

                <!-- 4. Unit Cost SRP -->
                <div class="stage-calc-cell">
                  <label class="stage-input-label">Unit Cost (SRP / Can)</label>
                  <div class="mini-input-group">
                    <span class="peso-sign">₱</span>
                    <input type="number" class="mini-num-input" value="${st.unitCost}" min="0" step="10" onchange="productComparison.updateStageParam('${col.id}', ${stIdx}, 'unitCost', this.value)">
                  </div>
                </div>
              </div>

              <!-- Stage Subtotal Bar -->
              <div class="stage-cost-subtotal-bar">
                <div class="subtotal-left">
                  <span class="subtotal-label">Subtotal:</span>
                  <span class="stage-row-total">₱${st.calc.totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div class="subtotal-right">
                  <span class="subtotal-rate-label">Contribution:</span>
                  <span class="stage-row-rate">₱${st.calc.costPerSqM.toFixed(2)}/m²</span>
                </div>
              </div>
            </div>
          `;
        }).join('');

        return `
          <div class="comparison-col-card ${isBest ? 'best-value-col' : ''}" id="colCard_${col.id}">
            <!-- Column Header -->
            <div class="col-card-header" style="border-top: 4px solid ${brand.accentColor};">
              <div class="col-header-top">
                <div class="col-brand-badge" style="background:${brand.badgeBg}; color:${brand.badgeColor}; border:1px solid ${brand.badgeBorder};">
                  <span class="brand-monogram">${brand.logoLetter}</span>
                  <span>${brand.name}</span>
                </div>
                <div style="display:flex; align-items:center; gap:0.35rem;">
                  ${isBest ? `
                    <span class="best-badge-mini">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      Lowest
                    </span>
                  ` : ''}
                  ${this.columns.length > 1 ? `
                    <button class="col-remove-btn" title="Remove this column" onclick="productComparison.removeColumn('${col.id}')">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  ` : ''}
                </div>
              </div>

              <h3 class="col-card-title">${col.title}</h3>
              <p class="col-card-sub">${col.subtitle || 'Step-by-step manufacturer technical specification'}</p>

              <!-- Quick Cost Banner -->
              <div class="col-banner-metrics">
                <div>
                  <span class="banner-rate-label">Unit Cost:</span>
                  <span class="col-header-rate banner-rate-val">₱${col.grandCostPerSqM.toFixed(2)} / sq.m</span>
                </div>
                <div>
                  <span class="banner-rate-label">Total:</span>
                  <span class="col-header-total banner-total-val">₱${col.grandTotalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>

            <!-- Stages List -->
            <div class="col-stages-container">
              ${stagesHtml}
            </div>

            <!-- Column Footer -->
            <div class="col-card-footer">
              <button class="add-stage-btn" onclick="productComparison.insertStage('${col.id}', ${col.stages ? col.stages.length : 0})">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                + Add Process Step (End)
              </button>

              <div class="col-grand-totals-box">
                <div class="total-row">
                  <span>Packages to Order (${this.areaSqM} m²):</span>
                  <strong class="col-foot-pkgs">${col.totalPackages} ${col.totalPackages === 1 ? 'Package' : 'Packages'}</strong>
                </div>
                <div class="total-row grand">
                  <span>Grand Total Cost:</span>
                  <strong class="col-foot-total total-figure">₱${col.grandTotalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                </div>
                <div class="total-row rate-row">
                  <span>Final Rate per sq.m:</span>
                  <strong class="col-foot-rate rate-figure">₱${col.grandCostPerSqM.toFixed(2)} / sq.m</strong>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    renderBoqTable() {
      const container = document.getElementById('comparisonBoqContainer');
      if (!container) return;

      const comparison = SystemEstimatorEngine.compareColumns(this.columns, this.areaSqM);
      const tpl = COMPARISON_SYSTEM_TEMPLATES.find(t => t.id === this.currentSystemId) || { name: 'Work System Specification' };
      const maxStages = Math.max(...comparison.columns.map(c => c.computedStages.length), 1);

      // Build Super-Headers
      const brandSuperHeaders = comparison.columns.map(col => {
        const brand = COMPARISON_BRANDS[col.brandKey] || COMPARISON_BRANDS.custom;
        return `
          <th colspan="7" class="boq-th-brand-col" style="border-top: 3px solid ${brand.accentColor || '#059669'};">
            <div class="boq-brand-pill-wrap">
              <span class="boq-brand-tag" style="background:${brand.badgeBg}; color:${brand.badgeColor}; border:1px solid ${brand.badgeBorder};">
                ${brand.shortName}
              </span>
              <strong class="boq-col-title">${col.title}</strong>
              ${col.isLowestCost ? '<span class="boq-best-badge">★ BEST VALUE</span>' : `<span class="boq-delta-badge">+₱${col.diffFromLowest.toFixed(2)}/m²</span>`}
            </div>
          </th>
        `;
      }).join('');

      // Build Sub-Headers
      const brandSubHeaders = comparison.columns.map(() => `
        <th class="boq-sub-th">PRODUCT SPECIFICATION</th>
        <th class="boq-sub-th">PACKAGING</th>
        <th class="boq-sub-th">SPREAD</th>
        <th class="boq-sub-th">COATS</th>
        <th class="boq-sub-th">PO ORDER</th>
        <th class="boq-sub-th">UNIT RATE (₱)</th>
        <th class="boq-sub-th">SUBTOTAL (₱)</th>
      `).join('');

      // Build Rows
      let rowsHtml = '';
      for (let i = 0; i < maxStages; i++) {
        const itemCode = `${i + 1}.0`;
        const stageNames = comparison.columns.map(c => c.computedStages[i]).filter(Boolean);
        const primaryStage = stageNames[0];
        const stepDesc = primaryStage ? primaryStage.stageName : `Application Step ${i + 1}`;
        const stepRole = primaryStage ? primaryStage.stageRole : 'Process Stage';

        let lineItemLowestRate = Infinity;
        comparison.columns.forEach(col => {
          const st = col.computedStages[i];
          if (st && st.calc.costPerSqM < lineItemLowestRate) {
            lineItemLowestRate = st.calc.costPerSqM;
          }
        });

        const colCellsHtml = comparison.columns.map(col => {
          const st = col.computedStages[i];
          if (!st) {
            return `
              <td colspan="7" class="boq-cell-na">
                <span class="boq-na-text">— Step not required in ${col.brandKey} procedure —</span>
              </td>
            `;
          }

          const isLineLowest = Math.abs(st.calc.costPerSqM - lineItemLowestRate) < 0.01;
          return `
            <td class="boq-td-prod">
              <div class="boq-prod-name">${st.product.code ? `<strong>[${st.product.code}]</strong> ` : ''}${st.product.name}</div>
              <div class="boq-prod-role">${st.stageRole}</div>
            </td>
            <td class="boq-td-pkg">${st.packaging}</td>
            <td class="boq-td-num">${st.coveragePerUnit} <span class="boq-unit">m²</span></td>
            <td class="boq-td-num">${st.coats}</td>
            <td class="boq-td-po">
              <strong>${st.calc.roundedUnits} ${st.calc.packagingUnit}</strong>
              <small class="boq-theor">(${st.calc.exactUnits.toFixed(2)})</small>
            </td>
            <td class="boq-td-currency">₱${st.unitCost.toFixed(2)}</td>
            <td class="boq-td-currency boq-subtotal-cell ${isLineLowest ? 'boq-line-lowest' : ''}">
              <strong>₱${st.calc.totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
              <span class="boq-cell-rate">₱${st.calc.costPerSqM.toFixed(2)}/m²</span>
            </td>
          `;
        }).join('');

        rowsHtml += `
          <tr class="boq-data-row">
            <td class="boq-td-item"><strong>${itemCode}</strong></td>
            <td class="boq-td-desc">
              <div class="boq-desc-title">${stepDesc}</div>
              <span class="boq-role-tag">${stepRole}</span>
            </td>
            <td class="boq-td-unit">sq.m</td>
            <td class="boq-td-area">${this.areaSqM.toFixed(2)}</td>
            ${colCellsHtml}
            <td class="boq-td-var">
              ${lineItemLowestRate !== Infinity ? `<span class="boq-min-tag">Min: ₱${lineItemLowestRate.toFixed(2)}/m²</span>` : '—'}
            </td>
          </tr>
        `;
      }

      // Footer Cells
      const totalPkgsCells = comparison.columns.map(col => `
        <td colspan="7" class="boq-foot-pkgs">
          <strong>${col.totalPackages} ${col.totalPackages === 1 ? 'Package' : 'Packages'}</strong>
          <span class="boq-foot-sub">for ${this.areaSqM} m²</span>
        </td>
      `).join('');

      const totalCostCells = comparison.columns.map(col => `
        <td colspan="7" class="boq-foot-cost ${col.isLowestCost ? 'boq-foot-best' : ''}">
          <strong class="boq-big-currency">₱${col.grandTotalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
        </td>
      `).join('');

      const totalRateCells = comparison.columns.map(col => `
        <td colspan="7" class="boq-foot-rate ${col.isLowestCost ? 'boq-foot-best' : ''}">
          <strong class="boq-big-rate">₱${col.grandCostPerSqM.toFixed(2)} / sq.m</strong>
        </td>
      `).join('');

      const awardCells = comparison.columns.map(col => `
        <td colspan="7" class="boq-foot-award">
          ${col.isLowestCost
            ? '<span class="boq-award-pill best">★ LOWEST ESTIMATE (BEST VALUE)</span>'
            : `<span class="boq-award-pill delta">+₱${col.diffFromLowest.toFixed(2)}/m² (+${col.percentDiffFromLowest.toFixed(1)}%)</span>`}
        </td>
      `).join('');

      container.innerHTML = `
        <div class="boq-excel-card">
          <!-- BOQ Sheet Topbar -->
          <div class="boq-sheet-topbar">
            <div class="boq-sheet-info">
              <div class="boq-sheet-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                BILL OF QUANTITIES (BOQ) SPREADSHEET
              </div>
              <h2 class="boq-sheet-title">${tpl.name}</h2>
              <div class="boq-sheet-meta">
                <span>Calculated for <strong>${this.areaSqM.toFixed(2)} sq.m</strong></span>
                &bull; <span><strong>${comparison.columns.length} Competitor Catalogs</strong></span>
                &bull; <span>Max Procedure Depth: <strong>${maxStages} Process Steps</strong></span>
              </div>
            </div>
            <div class="boq-sheet-actions">
              <button type="button" class="excel-btn excel-btn-export" onclick="productComparison.exportBoqExcel()" title="Download as BOQ Excel Sheet (.csv)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Export BOQ (Excel)
              </button>
              <button type="button" class="excel-btn excel-btn-reset" onclick="productComparison.setViewMode('cards')" title="Return to Column Cards View">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                Cards View
              </button>
            </div>
          </div>

          <!-- Wide Table Scroll Wrapper -->
          <div class="boq-excel-scroll-wrap">
            <table class="boq-excel-table">
              <thead>
                <!-- Super Headers -->
                <tr class="boq-super-header">
                  <th rowspan="2" class="boq-th-item">ITEM</th>
                  <th rowspan="2" class="boq-th-desc">WORK SCOPE &amp; PROCESS DESCRIPTION</th>
                  <th rowspan="2" class="boq-th-unit">UNIT</th>
                  <th rowspan="2" class="boq-th-area">AREA (m²)</th>
                  ${brandSuperHeaders}
                  <th rowspan="2" class="boq-th-var">VARIANCE</th>
                </tr>
                <!-- Sub Headers -->
                <tr class="boq-sub-header">
                  ${brandSubHeaders}
                </tr>
              </thead>
              <tbody>
                ${rowsHtml}
              </tbody>
              <tfoot>
                <!-- Total Packages Row -->
                <tr class="boq-foot-row boq-row-pkgs">
                  <td colspan="4" class="boq-foot-label">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                    TOTAL MATERIAL PACKAGES TO ORDER (PO)
                  </td>
                  ${totalPkgsCells}
                  <td></td>
                </tr>
                <!-- Grand Total Cost Row -->
                <tr class="boq-foot-row boq-row-grand">
                  <td colspan="4" class="boq-foot-label">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><line x1="12" y1="6" x2="12" y2="18"/></svg>
                    GRAND TOTAL ESTIMATED COST (PHP)
                  </td>
                  ${totalCostCells}
                  <td></td>
                </tr>
                <!-- Final Rate per sq.m -->
                <tr class="boq-foot-row boq-row-rate">
                  <td colspan="4" class="boq-foot-label">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                    FINAL UNIT RATE PER SQ.M (PHP / m²)
                  </td>
                  ${totalRateCells}
                  <td></td>
                </tr>
                <!-- Award Status -->
                <tr class="boq-foot-row boq-row-award">
                  <td colspan="4" class="boq-foot-label">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
                    VALUE ENGINEERING &amp; AWARD STATUS
                  </td>
                  ${awardCells}
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      `;
    }

    onStageBrandChange(colId, stageIdx, newBrandKey) {
      const col = this.columns.find(c => c.id === colId);
      if (!col || !col.stages || !col.stages[stageIdx]) return;

      const stage = col.stages[stageIdx];
      // Pick first product of that brand
      const matchingProd = PRODUCT_LOOKUP_REGISTRY.find(p => p.brandKey === newBrandKey) || PRODUCT_LOOKUP_REGISTRY[0];
      
      stage.productId = matchingProd.id;
      stage.stageRole = matchingProd.category;
      stage.coveragePerUnit = matchingProd.coveragePerUnit;
      stage.coats = matchingProd.defaultCoats || 1;
      stage.packaging = matchingProd.packaging;
      stage.packagingUnit = matchingProd.packagingUnit;
      stage.unitCost = matchingProd.srp;

      this.saveState();
      this.render();
    }
  }

  const Controller = new ComparisonController();
  Controller.loadCustomProducts();

  return {
    BRANDS: COMPARISON_BRANDS,
    PRODUCTS: PRODUCT_LOOKUP_REGISTRY,
    TEMPLATES: COMPARISON_SYSTEM_TEMPLATES,
    Engine: SystemEstimatorEngine,
    Controller: Controller,
    registerImportedProducts: (items) => Controller.registerImportedProducts(items)
  };
}));
