/**
 * FCLaranang Construction QA/QC System
 * Centralized Supplier Price List & Rate Master
 * Brands: Buildrite, Bostik, Davies, Boysen, Sika
 */

const MASTER_SUPPLIER_CATALOGS = {
  "buildrite": {
    "brandKey": "buildrite",
    "brandName": "Buildrite Chemicals",
    "company": "Magna Prime Chemical Technologies, Inc.",
    "badge": "Official Aug 2026",
    "badgeColor": "#0284c7",
    "color": "#0284c7",
    "sourceDoc": "BUILDRITE-OFFICIAL-PRICELIST-FOR-METRO-MANILA-LUZON-AUGUST-012026.pdf",
    "effectiveDate": "August 01, 2026",
    "items": [
      {
        "code": "727201",
        "name": "Tofil 800 Intra White",
        "desc": "Superfine skim coat for interior walls",
        "category": "Finishing Solutions",
        "packaging": "20kg/bag",
        "casePack": "1",
        "srp": 459,
        "casePrice": 459,
        "moq": "",
        "remarks": "",
        "id": "BR-001"
      },
      {
        "code": "700006",
        "name": "Tofil 801 Extra White",
        "desc": "Superfine skim coat",
        "category": "Finishing Solutions",
        "packaging": "20kg/bag",
        "casePack": "1",
        "srp": 518,
        "casePrice": 518,
        "moq": "",
        "remarks": "",
        "id": "BR-002"
      },
      {
        "code": "700013",
        "name": "Tofil 801 Extra Gray",
        "desc": "Superfine skim coat",
        "category": "Finishing Solutions",
        "packaging": "20kg/bag",
        "casePack": "1",
        "srp": 453,
        "casePrice": 453,
        "moq": "",
        "remarks": "",
        "id": "BR-003"
      },
      {
        "code": "700020",
        "name": "Tofil 802 White",
        "desc": "Skim coat paste type",
        "category": "Finishing Solutions",
        "packaging": "5kg/gal",
        "casePack": "4",
        "srp": 478,
        "casePrice": 1912,
        "moq": "",
        "remarks": "",
        "id": "BR-004"
      },
      {
        "code": "700037",
        "name": "Tofil 802 White",
        "desc": "Skim coat paste type",
        "category": "Finishing Solutions",
        "packaging": "20kg/pail",
        "casePack": "1",
        "srp": 1594,
        "casePrice": 1594,
        "moq": "",
        "remarks": "",
        "id": "BR-005"
      },
      {
        "code": "700068",
        "name": "Tofil 803 Wall Primer",
        "desc": "Water based primer and sealer",
        "category": "Finishing Solutions",
        "packaging": "1Litre",
        "casePack": "12",
        "srp": 150,
        "casePrice": 1800,
        "moq": "",
        "remarks": "",
        "id": "BR-006"
      },
      {
        "code": "700075",
        "name": "Tofil 803 Wall Primer",
        "desc": "Water based primer and sealer",
        "category": "Finishing Solutions",
        "packaging": "4Litre",
        "casePack": "4",
        "srp": 527,
        "casePrice": 2108,
        "moq": "",
        "remarks": "",
        "id": "BR-007"
      },
      {
        "code": "700082",
        "name": "Tofil 803 Wall Primer",
        "desc": "Water based primer and sealer",
        "category": "Finishing Solutions",
        "packaging": "16Litre/pail",
        "casePack": "1",
        "srp": 1918,
        "casePrice": 1918,
        "moq": "",
        "remarks": "",
        "id": "BR-008"
      },
      {
        "code": "700112",
        "name": "Tofil 805",
        "desc": "Ready mix thick plastering mortar",
        "category": "Finishing Solutions",
        "packaging": "25kg/bag",
        "casePack": "1",
        "srp": 400,
        "casePrice": 400,
        "moq": "",
        "remarks": "",
        "id": "BR-009"
      },
      {
        "code": "700136",
        "name": "Tofil 807 Putty Master",
        "desc": "Multi-purpose Putty for filling, patching and build up",
        "category": "Finishing Solutions",
        "packaging": "1kg",
        "casePack": "12",
        "srp": 103,
        "casePrice": 1236,
        "moq": "",
        "remarks": "",
        "id": "BR-010"
      },
      {
        "code": "700143",
        "name": "Tofil 807 Putty Master",
        "desc": "Multi-purpose Putty for filling, patching and build up",
        "category": "Finishing Solutions",
        "packaging": "5kg/gal",
        "casePack": "4",
        "srp": 306,
        "casePrice": 1224,
        "moq": "",
        "remarks": "",
        "id": "BR-011"
      },
      {
        "code": "700150",
        "name": "Tofil 807 Putty Master",
        "desc": "Multi-purpose Putty for filling, patching and build up",
        "category": "Finishing Solutions",
        "packaging": "20kg/pail",
        "casePack": "1",
        "srp": 986,
        "casePrice": 986,
        "moq": "",
        "remarks": "",
        "id": "BR-012"
      },
      {
        "code": "700167",
        "name": "Tofil 808",
        "desc": "Jointing compound for Plasterboard, Gypsum board and Fiber cement board",
        "category": "Finishing Solutions",
        "packaging": "20kg/bag",
        "casePack": "1",
        "srp": 777,
        "casePrice": 777,
        "moq": "",
        "remarks": "",
        "id": "BR-013"
      },
      {
        "code": "711453",
        "name": "Tofil 812 Kryocrete",
        "desc": "Thick insulating render at 10-20mm thickness",
        "category": "Finishing Solutions",
        "packaging": ".015cbm/bag",
        "casePack": "1",
        "srp": 340,
        "casePrice": 340,
        "moq": "",
        "remarks": "",
        "id": "BR-014"
      },
      {
        "code": "729526",
        "name": "**Tofil 815 Paint Reinforcer",
        "desc": "Textile glass fiber reinforcement 30gsm (1m x 50m)",
        "category": "Finishing Solutions",
        "packaging": "1m x 50m",
        "casePack": "1",
        "srp": 7950,
        "casePrice": 7950,
        "moq": "",
        "remarks": "**New product",
        "id": "BR-015"
      },
      {
        "code": "729571",
        "name": "Tofil 814 Crack Blocker 1Mx50M",
        "desc": "Alkali-Resistant Fiber Glass Mesh 145 GSM",
        "category": "Finishing Solutions",
        "packaging": "Roll",
        "casePack": "1",
        "srp": 3560,
        "casePrice": 3560,
        "moq": "",
        "remarks": "",
        "id": "BR-016"
      },
      {
        "code": "729946",
        "name": "Tofil 806",
        "desc": "Water-based binder for chalky paint and skim coat",
        "category": "Finishing Solutions",
        "packaging": "4Litre",
        "casePack": "4",
        "srp": 995,
        "casePrice": 3980,
        "moq": "",
        "remarks": "",
        "id": "BR-017"
      },
      {
        "code": "700198",
        "name": "Plasterlite",
        "desc": "Lightweight plastering mortar",
        "category": "Finishing Solutions",
        "packaging": "12kg/bag",
        "casePack": "1",
        "srp": 245,
        "casePrice": 245,
        "moq": "",
        "remarks": "",
        "id": "BR-018"
      },
      {
        "code": "700907",
        "name": "Smartbond Flex Silver C1S1",
        "desc": "Standard adhesion, Extended open time, Standard flexibility",
        "category": "Tiling Solutions",
        "packaging": ".015cbm/bag",
        "casePack": "1",
        "srp": 281,
        "casePrice": 281,
        "moq": "",
        "remarks": "",
        "id": "BR-019"
      },
      {
        "code": "700921",
        "name": "Smartbond Flex Gold C2S1",
        "desc": "Heavy duty adhesion, Extended open time, Standard flexibility",
        "category": "Tiling Solutions",
        "packaging": ".015cbm/bag",
        "casePack": "1",
        "srp": 452,
        "casePrice": 452,
        "moq": "",
        "remarks": "",
        "id": "BR-020"
      },
      {
        "code": "700945",
        "name": "Smartbond Flex Diamond C2ES2",
        "desc": "Heavy duty adhesion, Extended Open time, High flexibility",
        "category": "Tiling Solutions",
        "packaging": ".015cbm/bag",
        "casePack": "1",
        "srp": 630,
        "casePrice": 630,
        "moq": "",
        "remarks": "",
        "id": "BR-021"
      },
      {
        "code": "711354",
        "name": "Smartbond Flex Wall C2TS1",
        "desc": "Heavy duty adhesion, slip resistance on vertical application & standard",
        "category": "Tiling Solutions",
        "packaging": ".015cbm/bag",
        "casePack": "1",
        "srp": 452,
        "casePrice": 452,
        "moq": "",
        "remarks": "",
        "id": "BR-022"
      },
      {
        "code": "713044",
        "name": "Smartbond Flex Hydro",
        "desc": "Flexible tile adhesive for underwater C2S2",
        "category": "Tiling Solutions",
        "packaging": "25kg/bag",
        "casePack": "1",
        "srp": 971,
        "casePrice": 971,
        "moq": "",
        "remarks": "",
        "id": "BR-023"
      },
      {
        "code": "710487",
        "name": "Smartbond Flex White",
        "desc": "Flexible white tile adhesive C2TS1",
        "category": "Tiling Solutions",
        "packaging": "25kg/bag",
        "casePack": "1",
        "srp": 836,
        "casePrice": 836,
        "moq": "",
        "remarks": "",
        "id": "BR-024"
      },
      {
        "code": "700778",
        "name": "Tile Seal White",
        "desc": "Waterproof tile grout",
        "category": "Tiling Solutions",
        "packaging": "2kg/bag",
        "casePack": "10",
        "srp": 77,
        "casePrice": 770,
        "moq": "",
        "remarks": "",
        "id": "BR-025"
      },
      {
        "code": "700785",
        "name": "Tile Seal Cream",
        "desc": "Waterproof tile grout",
        "category": "Tiling Solutions",
        "packaging": "2kg/bag",
        "casePack": "10",
        "srp": 88,
        "casePrice": 880,
        "moq": "",
        "remarks": "",
        "id": "BR-026"
      },
      {
        "code": "700792",
        "name": "Tile Seal Brown",
        "desc": "Waterproof tile grout",
        "category": "Tiling Solutions",
        "packaging": "2kg/bag",
        "casePack": "10",
        "srp": 100,
        "casePrice": 1000,
        "moq": "",
        "remarks": "",
        "id": "BR-027"
      },
      {
        "code": "700815",
        "name": "Tile Seal Dark Gray",
        "desc": "Waterproof tile grout",
        "category": "Tiling Solutions",
        "packaging": "2kg/bag",
        "casePack": "10",
        "srp": 100,
        "casePrice": 1000,
        "moq": "",
        "remarks": "",
        "id": "BR-028"
      },
      {
        "code": "700839",
        "name": "Tile Seal Dark Blue",
        "desc": "Waterproof tile grout",
        "category": "Tiling Solutions",
        "packaging": "2kg/bag",
        "casePack": "10",
        "srp": 215,
        "casePrice": 2150,
        "moq": "",
        "remarks": "",
        "id": "BR-029"
      },
      {
        "code": "700808",
        "name": "Tile Seal Medium Gray",
        "desc": "Waterproof tile grout",
        "category": "Tiling Solutions",
        "packaging": "2kg/Bag",
        "casePack": "10",
        "srp": 79,
        "casePrice": 790,
        "moq": "",
        "remarks": "",
        "id": "BR-030"
      },
      {
        "code": "700846",
        "name": "Tile Seal Beige",
        "desc": "Waterproof tile grout",
        "category": "Tiling Solutions",
        "packaging": "2kg/Bag",
        "casePack": "10",
        "srp": 88,
        "casePrice": 880,
        "moq": "",
        "remarks": "",
        "id": "BR-031"
      },
      {
        "code": "700853",
        "name": "Tile Seal Light Beige",
        "desc": "Waterproof tile grout",
        "category": "Tiling Solutions",
        "packaging": "2kg/Bag",
        "casePack": "10",
        "srp": 88,
        "casePrice": 880,
        "moq": "",
        "remarks": "",
        "id": "BR-032"
      },
      {
        "code": "700822",
        "name": "Tile Seal Light Blue",
        "desc": "Waterproof tile grout",
        "category": "Tiling Solutions",
        "packaging": "2kg/Bag",
        "casePack": "10",
        "srp": 123,
        "casePrice": 1230,
        "moq": "",
        "remarks": "",
        "id": "BR-033"
      },
      {
        "code": "700877",
        "name": "Tile Seal Black",
        "desc": "Waterproof tile grout",
        "category": "Tiling Solutions",
        "packaging": "2kg/Bag",
        "casePack": "10",
        "srp": 140,
        "casePrice": 1400,
        "moq": "",
        "remarks": "",
        "id": "BR-034"
      },
      {
        "code": "700761",
        "name": "Tile grip",
        "desc": "Tile adhesive additive",
        "category": "Tiling Solutions",
        "packaging": "250g/sachet",
        "casePack": "24",
        "srp": 263,
        "casePrice": 6312,
        "moq": "",
        "remarks": "",
        "id": "BR-035"
      },
      {
        "code": "729045",
        "name": "Metaprime Oxylock Red Oxide",
        "desc": "Water-based anti-rust metal primer",
        "category": "Protective Coatings",
        "packaging": "4Litre",
        "casePack": "4",
        "srp": 687,
        "casePrice": 2748,
        "moq": "",
        "remarks": "",
        "id": "BR-036"
      },
      {
        "code": "729052",
        "name": "Metaprime Hydrex Gray",
        "desc": "1 part epoxy grade, anti rust metal primer",
        "category": "Protective Coatings",
        "packaging": "4Litre",
        "casePack": "4",
        "srp": 1124,
        "casePrice": 4496,
        "moq": "",
        "remarks": "",
        "id": "BR-037"
      },
      {
        "code": "715239",
        "name": "Blocktite RRC",
        "desc": "Polyurethane reflective roof coating",
        "category": "Protective Coatings",
        "packaging": "Gallon",
        "casePack": "4",
        "srp": 1279,
        "casePrice": 5116,
        "moq": "",
        "remarks": "",
        "id": "BR-038"
      },
      {
        "code": "715246",
        "name": "Epoxy Primer White (Quart)",
        "desc": "Two component, polyamide curing epoxy coating",
        "category": "Protective Coatings",
        "packaging": "Quart set",
        "casePack": "12",
        "srp": 363,
        "casePrice": 4356,
        "moq": "",
        "remarks": "",
        "id": "BR-039"
      },
      {
        "code": "715253",
        "name": "Epoxy Primer White (Gallon)",
        "desc": "Two component, polyamide curing epoxy coating",
        "category": "Protective Coatings",
        "packaging": "Gallon set",
        "casePack": "4",
        "srp": 1292,
        "casePrice": 5168,
        "moq": "",
        "remarks": "",
        "id": "BR-040"
      },
      {
        "code": "715260",
        "name": "Epoxy Primer Gray (Quart)",
        "desc": "Two component, polyamide curing epoxy coating",
        "category": "Protective Coatings",
        "packaging": "Quart set",
        "casePack": "12",
        "srp": 322,
        "casePrice": 3864,
        "moq": "",
        "remarks": "",
        "id": "BR-041"
      },
      {
        "code": "715277",
        "name": "Epoxy Primer Gray (Gallon)",
        "desc": "Two component, polyamide curing epoxy coating",
        "category": "Protective Coatings",
        "packaging": "Gallon set",
        "casePack": "4",
        "srp": 1129,
        "casePrice": 4516,
        "moq": "",
        "remarks": "",
        "id": "BR-042"
      },
      {
        "code": "715284",
        "name": "Epoxy Primer Red (Quart)",
        "desc": "Two component, polyamide curing epoxy coating",
        "category": "Protective Coatings",
        "packaging": "Quart set",
        "casePack": "12",
        "srp": 368,
        "casePrice": 4416,
        "moq": "",
        "remarks": "",
        "id": "BR-043"
      },
      {
        "code": "715291",
        "name": "Epoxy Primer Red (Gallon)",
        "desc": "Two component, polyamide curing epoxy coating",
        "category": "Protective Coatings",
        "packaging": "Gallon set",
        "casePack": "4",
        "srp": 1310,
        "casePrice": 5240,
        "moq": "",
        "remarks": "",
        "id": "BR-044"
      },
      {
        "code": "715307",
        "name": "Epoxy Primer Black (Quart)",
        "desc": "Two component, polyamide curing epoxy coating",
        "category": "Protective Coatings",
        "packaging": "Quart set",
        "casePack": "12",
        "srp": 372,
        "casePrice": 4464,
        "moq": "",
        "remarks": "",
        "id": "BR-045"
      },
      {
        "code": "715314",
        "name": "Epoxy Primer Black (Gallon)",
        "desc": "Two component, polyamide curing epoxy coating",
        "category": "Protective Coatings",
        "packaging": "Gallon set",
        "casePack": "4",
        "srp": 1330,
        "casePrice": 5320,
        "moq": "",
        "remarks": "",
        "id": "BR-046"
      },
      {
        "code": "715321",
        "name": "Epoxy Reducer",
        "desc": "Solvent Mixture for epoxy",
        "category": "Protective Coatings",
        "packaging": "Gallon",
        "casePack": "4",
        "srp": 1392,
        "casePrice": 5568,
        "moq": "",
        "remarks": "",
        "id": "BR-047"
      },
      {
        "code": "715338",
        "name": "Metal Primer Gray (Quart)",
        "desc": "Rust Inhibiting primer for metal",
        "category": "Protective Coatings",
        "packaging": "Quart",
        "casePack": "12",
        "srp": 201,
        "casePrice": 2412,
        "moq": "",
        "remarks": "",
        "id": "BR-048"
      },
      {
        "code": "715345",
        "name": "Metal Primer Gray (Gallon)",
        "desc": "Rust Inhibiting primer for metal",
        "category": "Protective Coatings",
        "packaging": "Gallon",
        "casePack": "4",
        "srp": 737,
        "casePrice": 2948,
        "moq": "",
        "remarks": "",
        "id": "BR-049"
      },
      {
        "code": "715352",
        "name": "Red Oxide (Quart)",
        "desc": "Rust inhibiting primer for metal",
        "category": "Protective Coatings",
        "packaging": "Quart",
        "casePack": "12",
        "srp": 190,
        "casePrice": 2280,
        "moq": "",
        "remarks": "",
        "id": "BR-050"
      },
      {
        "code": "715369",
        "name": "Red Oxide (Gallon)",
        "desc": "Rust inhibiting primer for metal",
        "category": "Protective Coatings",
        "packaging": "Gallon",
        "casePack": "4",
        "srp": 692,
        "casePrice": 2768,
        "moq": "",
        "remarks": "",
        "id": "BR-051"
      },
      {
        "code": "715376",
        "name": "Rust Converter (Litre)",
        "desc": "Convert rust into protective chemical barrier",
        "category": "Protective Coatings",
        "packaging": "Ltr",
        "casePack": "12",
        "srp": 290,
        "casePrice": 3480,
        "moq": "",
        "remarks": "",
        "id": "BR-052"
      },
      {
        "code": "715383",
        "name": "Rust Converter (Gallon)",
        "desc": "Convert rust into protective chemical barrier",
        "category": "Protective Coatings",
        "packaging": "Gallon",
        "casePack": "4",
        "srp": 993,
        "casePrice": 3972,
        "moq": "",
        "remarks": "",
        "id": "BR-053"
      },
      {
        "code": "700471",
        "name": "Blockout Clever Sil White (5kg)",
        "desc": "Waterbased polyurethane acrylic waterproofing membrane",
        "category": "Waterproofing Solutions",
        "packaging": "5kg",
        "casePack": "4",
        "srp": 2095,
        "casePrice": 8380,
        "moq": "",
        "remarks": "",
        "id": "BR-054"
      },
      {
        "code": "700488",
        "name": "Blockout Clever Sil White (20kg)",
        "desc": "Waterbased polyurethane acrylic waterproofing membrane",
        "category": "Waterproofing Solutions",
        "packaging": "20kg pail",
        "casePack": "1",
        "srp": 7875,
        "casePrice": 7875,
        "moq": "",
        "remarks": "",
        "id": "BR-055"
      },
      {
        "code": "700457",
        "name": "Blockout Clever Sil Gray (5kg)",
        "desc": "Waterbased polyurethane acrylic waterproofing membrane",
        "category": "Waterproofing Solutions",
        "packaging": "5kg",
        "casePack": "4",
        "srp": 2095,
        "casePrice": 8380,
        "moq": "",
        "remarks": "",
        "id": "BR-056"
      },
      {
        "code": "700464",
        "name": "Blockout Clever Sil Gray (20kg)",
        "desc": "Waterbased polyurethane acrylic waterproofing membrane",
        "category": "Waterproofing Solutions",
        "packaging": "20kg pail",
        "casePack": "1",
        "srp": 7875,
        "casePrice": 7875,
        "moq": "",
        "remarks": "",
        "id": "BR-057"
      },
      {
        "code": "700495",
        "name": "Blockout Crystor (5kg)",
        "desc": "Crystalline capillary waterproofer",
        "category": "Waterproofing Solutions",
        "packaging": "5kg",
        "casePack": "4",
        "srp": 772,
        "casePrice": 3088,
        "moq": "",
        "remarks": "",
        "id": "BR-058"
      },
      {
        "code": "700501",
        "name": "Blockout Crystor (25kg)",
        "desc": "Crystalline capillary waterproofer",
        "category": "Waterproofing Solutions",
        "packaging": "25kg/bag",
        "casePack": "1",
        "srp": 2278,
        "casePrice": 2278,
        "moq": "",
        "remarks": "",
        "id": "BR-059"
      },
      {
        "code": "700617",
        "name": "Blocktout ETL White",
        "desc": "Epoxy tank lining",
        "category": "Waterproofing Solutions",
        "packaging": "3.8kg-gal set",
        "casePack": "2",
        "srp": 4878,
        "casePrice": 9756,
        "moq": "",
        "remarks": "",
        "id": "BR-060"
      },
      {
        "code": "700624",
        "name": "Blocktout ETL Aqua Blue",
        "desc": "Epoxy tank lining",
        "category": "Waterproofing Solutions",
        "packaging": "3.8kg-gal set",
        "casePack": "2",
        "srp": 4969,
        "casePrice": 9938,
        "moq": "",
        "remarks": "",
        "id": "BR-061"
      },
      {
        "code": "715420",
        "name": "Blockout IWL (Gallon)",
        "desc": "Integral waterproofer concrete admixture",
        "category": "Waterproofing Solutions",
        "packaging": "Gallon",
        "casePack": "4",
        "srp": 517,
        "casePrice": 2068,
        "moq": "",
        "remarks": "",
        "id": "BR-062"
      },
      {
        "code": "700587",
        "name": "Blockout IWL (20L)",
        "desc": "Integral waterproofer concrete admixture",
        "category": "Waterproofing Solutions",
        "packaging": "20Ltr/cby",
        "casePack": "1",
        "srp": 2494,
        "casePrice": 2494,
        "moq": "",
        "remarks": "",
        "id": "BR-063"
      },
      {
        "code": "700594",
        "name": "Blockout IWL (200L)",
        "desc": "Integral waterproofer concrete admixture",
        "category": "Waterproofing Solutions",
        "packaging": "200Ltr/Drum",
        "casePack": "1",
        "srp": 18921,
        "casePrice": 18921,
        "moq": "",
        "remarks": "",
        "id": "BR-064"
      },
      {
        "code": "700600",
        "name": "Blockout TW",
        "desc": "Epoxy tile waterproofer clear",
        "category": "Waterproofing Solutions",
        "packaging": "3.8kg gal set",
        "casePack": "2",
        "srp": 6193,
        "casePrice": 12386,
        "moq": "",
        "remarks": "",
        "id": "BR-065"
      },
      {
        "code": "700563",
        "name": "Blockout Flexicrete (5kg)",
        "desc": "Flexible cementitious waterproofing",
        "category": "Waterproofing Solutions",
        "packaging": "5kg/set",
        "casePack": "4",
        "srp": 948,
        "casePrice": 3792,
        "moq": "",
        "remarks": "",
        "id": "BR-066"
      },
      {
        "code": "700570",
        "name": "Blockout Flexicrete (18kg)",
        "desc": "Flexible cementitious waterproofing",
        "category": "Waterproofing Solutions",
        "packaging": "18kg/set",
        "casePack": "1",
        "srp": 3347,
        "casePrice": 3347,
        "moq": "",
        "remarks": "",
        "id": "BR-067"
      },
      {
        "code": "700549",
        "name": "Blockout Flexor (5kg)",
        "desc": "High rise negative side cementitious waterproofing 2k",
        "category": "Waterproofing Solutions",
        "packaging": "5kg/set",
        "casePack": "4",
        "srp": 1165,
        "casePrice": 4660,
        "moq": "",
        "remarks": "",
        "id": "BR-068"
      },
      {
        "code": "700556",
        "name": "Blockout Flexor (18kg)",
        "desc": "High rise negative side cementitious waterproofing 2k",
        "category": "Waterproofing Solutions",
        "packaging": "18kg/set",
        "casePack": "1",
        "srp": 3883,
        "casePrice": 3883,
        "moq": "",
        "remarks": "",
        "id": "BR-069"
      },
      {
        "code": "700518",
        "name": "Blockout Leak Plug (1kg)",
        "desc": "Rapid setting mortar for plugging leak on running water",
        "category": "Waterproofing Solutions",
        "packaging": "1kg",
        "casePack": "12",
        "srp": 312,
        "casePrice": 3744,
        "moq": "",
        "remarks": "",
        "id": "BR-070"
      },
      {
        "code": "700525",
        "name": "Blockout Leak Plug (4kg)",
        "desc": "Rapid setting mortar for plugging leak on running water",
        "category": "Waterproofing Solutions",
        "packaging": "4kg/gallon",
        "casePack": "4",
        "srp": 1026,
        "casePrice": 4104,
        "moq": "",
        "remarks": "",
        "id": "BR-071"
      },
      {
        "code": "700532",
        "name": "Blockout Leak Plug (25kg)",
        "desc": "Rapid setting mortar for plugging leak on running water",
        "category": "Waterproofing Solutions",
        "packaging": "25kg/Bag",
        "casePack": "1",
        "srp": 3092,
        "casePrice": 3092,
        "moq": "",
        "remarks": "",
        "id": "BR-072"
      },
      {
        "code": "714027",
        "name": "Blockout 40 Membrane",
        "desc": "Geo-textile waterproofing membrane (1.5m x 10m)",
        "category": "Waterproofing Solutions",
        "packaging": "1.5mx10m/roll",
        "casePack": "1",
        "srp": 8250,
        "casePrice": 8250,
        "moq": "",
        "remarks": "",
        "id": "BR-073"
      },
      {
        "code": "700723",
        "name": "Blockout Strip",
        "desc": "Geo-textile waterproofing strip (20cm x 10m)",
        "category": "Waterproofing Solutions",
        "packaging": "20cmx10m/roll",
        "casePack": "1",
        "srp": 2255,
        "casePrice": 2255,
        "moq": "",
        "remarks": "",
        "id": "BR-074"
      },
      {
        "code": "700709",
        "name": "Blockout Corner In",
        "desc": "Geo-textile waterproof membrane corner inner",
        "category": "Waterproofing Solutions",
        "packaging": "4pcs/pack",
        "casePack": "10",
        "srp": 428,
        "casePrice": 4280,
        "moq": "",
        "remarks": "",
        "id": "BR-075"
      },
      {
        "code": "700693",
        "name": "Blockout Corner Out",
        "desc": "Geo-textile waterproof membrane corner outer",
        "category": "Waterproofing Solutions",
        "packaging": "4pcs/pack",
        "casePack": "10",
        "srp": 545,
        "casePrice": 5450,
        "moq": "",
        "remarks": "",
        "id": "BR-076"
      },
      {
        "code": "710494",
        "name": "Blockout DS Drainage Sheet",
        "desc": "Geo-composite drainage sheet (2m x 20m)",
        "category": "Waterproofing Solutions",
        "packaging": "2m x 20m/roll",
        "casePack": "1",
        "srp": 26096,
        "casePrice": 26096,
        "moq": "",
        "remarks": "",
        "id": "BR-077"
      },
      {
        "code": "710500",
        "name": "Blockout DB Dimple Board with 40pcs Sealing Buttons and 10pcs Profile",
        "desc": "HDPE Dimple Sheet (2m x 20m)",
        "category": "Waterproofing Solutions",
        "packaging": "2m x 20m/roll set",
        "casePack": "1",
        "srp": 19250,
        "casePrice": 19250,
        "moq": "",
        "remarks": "",
        "id": "BR-078"
      },
      {
        "code": "713051",
        "name": "Blockout Cloth P60",
        "desc": "Polyester fleece for horizontal application 60gsm (1m x 50m)",
        "category": "Waterproofing Solutions",
        "packaging": "1mx50m",
        "casePack": "1",
        "srp": 3950,
        "casePrice": 3950,
        "moq": "",
        "remarks": "",
        "id": "BR-079"
      },
      {
        "code": "701324",
        "name": "Blockout Clear",
        "desc": "Water-based polyurethane tile waterproofer",
        "category": "Waterproofing Solutions",
        "packaging": "3.8kg set",
        "casePack": "2",
        "srp": 8100,
        "casePrice": 16200,
        "moq": "",
        "remarks": "",
        "id": "BR-080"
      },
      {
        "code": "711019",
        "name": "Blockout Pool Aqua Blue",
        "desc": "2k polyurethane-based topcoat membrane for swimming pool",
        "category": "Waterproofing Solutions",
        "packaging": "4.8kg set",
        "casePack": "1",
        "srp": 6846,
        "casePrice": 6846,
        "moq": "",
        "remarks": "",
        "id": "BR-081"
      },
      {
        "code": "729502",
        "name": "Blockout Bitum 2K",
        "desc": "2k bitumen-based liquid waterproofing",
        "category": "Waterproofing Solutions",
        "packaging": "20kg set",
        "casePack": "1",
        "srp": 5333,
        "casePrice": 5333,
        "moq": "",
        "remarks": "",
        "id": "BR-082"
      },
      {
        "code": "713075",
        "name": "Blockout Hyperblock Polyurea",
        "desc": "2k fast curing, cold applied polyurea waterproofing",
        "category": "Waterproofing Solutions",
        "packaging": "26.5kg set",
        "casePack": "1",
        "srp": 28957,
        "casePrice": 28957,
        "moq": "",
        "remarks": "",
        "id": "BR-083"
      },
      {
        "code": "700686",
        "name": "Blockout Hyperblock Aqua Light Gray",
        "desc": "2k Aliphatic water-based polyurethane waterproofing",
        "category": "Waterproofing Solutions",
        "packaging": "20kg set",
        "casePack": "1",
        "srp": 14215,
        "casePrice": 14215,
        "moq": "",
        "remarks": "",
        "id": "BR-084"
      },
      {
        "code": "730058",
        "name": "**Blockout Hyperblock 100 White",
        "desc": "Advance 2k Aliphatic water-based polyurethane waterproofing",
        "category": "Waterproofing Solutions",
        "packaging": "20kg/set",
        "casePack": "1",
        "srp": 15361,
        "casePrice": 15361,
        "moq": "",
        "remarks": "**New product",
        "id": "BR-085"
      },
      {
        "code": "728529",
        "name": "Blockout RD",
        "desc": "Masonry injection to block rising dampness",
        "category": "Waterproofing Solutions",
        "packaging": "280mL/cartridge",
        "casePack": "25",
        "srp": 880,
        "casePrice": 22000,
        "moq": "",
        "remarks": "",
        "id": "BR-086"
      },
      {
        "code": "700372",
        "name": "Blockout Sapal 2in1 (100g)",
        "desc": "PU-Acrylic Sealant and Waterproofer",
        "category": "Waterproofing Solutions",
        "packaging": "100g",
        "casePack": "36",
        "srp": 50,
        "casePrice": 1800,
        "moq": "",
        "remarks": "",
        "id": "BR-087"
      },
      {
        "code": "700389",
        "name": "Blockout Sapal 2in1 (1kg)",
        "desc": "PU-Acrylic Sealant and Waterproofer",
        "category": "Waterproofing Solutions",
        "packaging": "1kg",
        "casePack": "12",
        "srp": 457,
        "casePrice": 5484,
        "moq": "",
        "remarks": "",
        "id": "BR-088"
      },
      {
        "code": "700396",
        "name": "Blockout Sapal 2in1 (4L)",
        "desc": "PU-Acrylic Sealant and Waterproofer",
        "category": "Waterproofing Solutions",
        "packaging": "4Litre",
        "casePack": "4",
        "srp": 1938,
        "casePrice": 7752,
        "moq": "",
        "remarks": "",
        "id": "BR-089"
      },
      {
        "code": "700402",
        "name": "Blockout Sapal 2in1 (16L)",
        "desc": "PU-Acrylic Sealant and Waterproofer",
        "category": "Waterproofing Solutions",
        "packaging": "16Litre/pail",
        "casePack": "1",
        "srp": 7430,
        "casePrice": 7430,
        "moq": "",
        "remarks": "",
        "id": "BR-090"
      },
      {
        "code": "728536",
        "name": "Blockout Sapal 2in1 White (4L)",
        "desc": "PU-Acrylic Sealant and Waterproofer",
        "category": "Waterproofing Solutions",
        "packaging": "4Litre",
        "casePack": "4",
        "srp": 1973,
        "casePrice": 7892,
        "moq": "",
        "remarks": "",
        "id": "BR-091"
      },
      {
        "code": "728659",
        "name": "Blockout Sapal 2in1 White (16L)",
        "desc": "PU-Acrylic Sealant and Waterproofer",
        "category": "Waterproofing Solutions",
        "packaging": "16Litre/pail",
        "casePack": "1",
        "srp": 7363,
        "casePrice": 7363,
        "moq": "",
        "remarks": "",
        "id": "BR-092"
      },
      {
        "code": "700419",
        "name": "Blockout Sapal RTU White (4L)",
        "desc": "PU-Acrylic Vertical Waterproofer",
        "category": "Waterproofing Solutions",
        "packaging": "4Litre",
        "casePack": "4",
        "srp": 1502,
        "casePrice": 6008,
        "moq": "",
        "remarks": "",
        "id": "BR-093"
      },
      {
        "code": "700426",
        "name": "Blockout Sapal RTU White (16L)",
        "desc": "PU-Acrylic Vertical Waterproofer",
        "category": "Waterproofing Solutions",
        "packaging": "16Litre/pail",
        "casePack": "1",
        "srp": 5424,
        "casePrice": 5424,
        "moq": "",
        "remarks": "",
        "id": "BR-094"
      },
      {
        "code": "700433",
        "name": "Blockout Sapal RTU Gray (4L)",
        "desc": "PU-Acrylic Vertical Waterproofer",
        "category": "Waterproofing Solutions",
        "packaging": "4Litre",
        "casePack": "4",
        "srp": 1471,
        "casePrice": 5884,
        "moq": "",
        "remarks": "",
        "id": "BR-095"
      },
      {
        "code": "700440",
        "name": "Blockout Sapal RTU Gray (16L)",
        "desc": "PU-Acrylic Vertical Waterproofer",
        "category": "Waterproofing Solutions",
        "packaging": "16Litre/pail",
        "casePack": "1",
        "srp": 5315,
        "casePrice": 5315,
        "moq": "",
        "remarks": "",
        "id": "BR-096"
      },
      {
        "code": "727263",
        "name": "Blockout Sapal RTU Clear (4L)",
        "desc": "PU-Acrylic Vertical Waterproofer",
        "category": "Waterproofing Solutions",
        "packaging": "4Litre",
        "casePack": "4",
        "srp": 1596,
        "casePrice": 6384,
        "moq": "",
        "remarks": "",
        "id": "BR-097"
      },
      {
        "code": "727270",
        "name": "Blockout Sapal RTU Clear (16L)",
        "desc": "PU-Acrylic Vertical Waterproofer",
        "category": "Waterproofing Solutions",
        "packaging": "16Litre/pail",
        "casePack": "1",
        "srp": 5518,
        "casePrice": 5518,
        "moq": "",
        "remarks": "",
        "id": "BR-098"
      },
      {
        "code": "710968",
        "name": "Blockout Silox",
        "desc": "Hydrophobic, easy to clean, matte finish sealer, waterbased",
        "category": "Waterproofing Solutions",
        "packaging": "Gallon",
        "casePack": "4",
        "srp": 1554,
        "casePrice": 6216,
        "moq": "",
        "remarks": "",
        "id": "BR-099"
      },
      {
        "code": "729878",
        "name": "**Blockout Waterguard TPE",
        "desc": "Thermoplastic Elastomeric Swellable Waterstop 20mmx25mmx10m",
        "category": "Waterproofing Solutions",
        "packaging": "roll",
        "casePack": "1",
        "srp": 9604,
        "casePrice": 9604,
        "moq": "",
        "remarks": "**New product",
        "id": "BR-100"
      },
      {
        "code": "701317",
        "name": "Handy Fix Pro",
        "desc": "Multi purpose adhesive & sealant",
        "category": "Sealants and Adhesives",
        "packaging": "280mL/cartridge",
        "casePack": "10",
        "srp": 367,
        "casePrice": 3670,
        "moq": "",
        "remarks": "",
        "id": "BR-101"
      },
      {
        "code": "700365",
        "name": "Handy Fix Grip (100g)",
        "desc": "Construction hybrid adhesive",
        "category": "Sealants and Adhesives",
        "packaging": "100g",
        "casePack": "24",
        "srp": 65,
        "casePrice": 1560,
        "moq": "",
        "remarks": "",
        "id": "BR-102"
      },
      {
        "code": "700341",
        "name": "Handy Fix Grip (450g)",
        "desc": "Construction hybrid adhesive",
        "category": "Sealants and Adhesives",
        "packaging": "450g/cartridge",
        "casePack": "10",
        "srp": 180,
        "casePrice": 1800,
        "moq": "",
        "remarks": "",
        "id": "BR-103"
      },
      {
        "code": "711484",
        "name": "Stopgap Rubberstop Gray (140g)",
        "desc": "Weather resistant silicone sealant",
        "category": "Sealants and Adhesives",
        "packaging": "140g",
        "casePack": "24",
        "srp": 145,
        "casePrice": 3480,
        "moq": "",
        "remarks": "",
        "id": "BR-104"
      },
      {
        "code": "700228",
        "name": "Stopgap Rubberstop Gray (300g)",
        "desc": "Weather resistant silicone sealant",
        "category": "Sealants and Adhesives",
        "packaging": "300g",
        "casePack": "25",
        "srp": 253,
        "casePrice": 6325,
        "moq": "",
        "remarks": "",
        "id": "BR-105"
      },
      {
        "code": "728673",
        "name": "Stopgap Rubberstop Clear (100g)",
        "desc": "Weather resistant silicone sealant",
        "category": "Sealants and Adhesives",
        "packaging": "100g",
        "casePack": "24",
        "srp": 143,
        "casePrice": 3432,
        "moq": "",
        "remarks": "",
        "id": "BR-106"
      },
      {
        "code": "728666",
        "name": "Stopgap Rubberstop Clear (230g)",
        "desc": "Weather resistant silicone sealant",
        "category": "Sealants and Adhesives",
        "packaging": "230g",
        "casePack": "25",
        "srp": 278,
        "casePrice": 6950,
        "moq": "",
        "remarks": "",
        "id": "BR-107"
      },
      {
        "code": "700297",
        "name": "Stopgap 1 Gray (600ml sausage)",
        "desc": "PU hybrid sealant",
        "category": "Sealants and Adhesives",
        "packaging": "600ml/sausage",
        "casePack": "12",
        "srp": 457,
        "casePrice": 5484,
        "moq": "",
        "remarks": "",
        "id": "BR-108"
      },
      {
        "code": "700303",
        "name": "Stopgap 1 White (600ml sausage)",
        "desc": "PU hybrid sealant",
        "category": "Sealants and Adhesives",
        "packaging": "600ml/sausage",
        "casePack": "12",
        "srp": 457,
        "casePrice": 5484,
        "moq": "",
        "remarks": "",
        "id": "BR-109"
      },
      {
        "code": "710470",
        "name": "Stopgap 1 White (280ml cart)",
        "desc": "PU hybrid paintable sealant",
        "category": "Sealants and Adhesives",
        "packaging": "280mL/cartridge",
        "casePack": "10",
        "srp": 245,
        "casePrice": 2450,
        "moq": "",
        "remarks": "",
        "id": "BR-110"
      },
      {
        "code": "700235",
        "name": "Stopgap Foam Seal",
        "desc": "Expandable PU foam sealant",
        "category": "Sealants and Adhesives",
        "packaging": "750ml",
        "casePack": "12",
        "srp": 409,
        "casePrice": 4908,
        "moq": "",
        "remarks": "",
        "id": "BR-111"
      },
      {
        "code": "700242",
        "name": "Stopgap GPN Clear",
        "desc": "General purpose neutral cure sealant",
        "category": "Sealants and Adhesives",
        "packaging": "270ml",
        "casePack": "25",
        "srp": 177,
        "casePrice": 4425,
        "moq": "",
        "remarks": "",
        "id": "BR-112"
      },
      {
        "code": "700259",
        "name": "Stopgap GPN White",
        "desc": "General purpose neutral cure sealant",
        "category": "Sealants and Adhesives",
        "packaging": "270ml",
        "casePack": "25",
        "srp": 177,
        "casePrice": 4425,
        "moq": "",
        "remarks": "",
        "id": "BR-113"
      },
      {
        "code": "700273",
        "name": "Stopgap GPN Brown",
        "desc": "General purpose neutral cure sealant",
        "category": "Sealants and Adhesives",
        "packaging": "270ml",
        "casePack": "25",
        "srp": 177,
        "casePrice": 4425,
        "moq": "",
        "remarks": "",
        "id": "BR-114"
      },
      {
        "code": "727225",
        "name": "Stopgap WPN Clear",
        "desc": "Weather proof neutral cure silicone sealant",
        "category": "Sealants and Adhesives",
        "packaging": "270ml",
        "casePack": "25",
        "srp": 195,
        "casePrice": 4875,
        "moq": "",
        "remarks": "",
        "id": "BR-115"
      },
      {
        "code": "727232",
        "name": "Stopgap WPN White",
        "desc": "Weather proof neutral cure silicone sealant",
        "category": "Sealants and Adhesives",
        "packaging": "270ml",
        "casePack": "25",
        "srp": 195,
        "casePrice": 4875,
        "moq": "",
        "remarks": "",
        "id": "BR-116"
      },
      {
        "code": "727218",
        "name": "Stopgap WPN Black",
        "desc": "Weather proof neutral cure silicone sealant",
        "category": "Sealants and Adhesives",
        "packaging": "270ml",
        "casePack": "25",
        "srp": 195,
        "casePrice": 4875,
        "moq": "",
        "remarks": "",
        "id": "BR-117"
      },
      {
        "code": "727256",
        "name": "Stopgap WPN Gray",
        "desc": "Weather proof neutral cure silicone sealant",
        "category": "Sealants and Adhesives",
        "packaging": "270ml",
        "casePack": "25",
        "srp": 195,
        "casePrice": 4875,
        "moq": "",
        "remarks": "",
        "id": "BR-118"
      },
      {
        "code": "727249",
        "name": "Stopgap WPN Brown",
        "desc": "Weather proof neutral cure silicone sealant",
        "category": "Sealants and Adhesives",
        "packaging": "270ml",
        "casePack": "25",
        "srp": 195,
        "casePrice": 4875,
        "moq": "",
        "remarks": "",
        "id": "BR-119"
      },
      {
        "code": "700310",
        "name": "Stopgap AS",
        "desc": "Acrylic Sealant for indoor gaps",
        "category": "Sealants and Adhesives",
        "packaging": "300ml",
        "casePack": "25",
        "srp": 154,
        "casePrice": 3850,
        "moq": "",
        "remarks": "",
        "id": "BR-120"
      },
      {
        "code": "715208",
        "name": "Stopgap SR (360ml)",
        "desc": "Semi-rigid control floor joint sealant",
        "category": "Sealants and Adhesives",
        "packaging": "360ml set",
        "casePack": "10",
        "srp": 1020,
        "casePrice": 10200,
        "moq": "",
        "remarks": "",
        "id": "BR-121"
      },
      {
        "code": "727188",
        "name": "Stopgap SR (5kg)",
        "desc": "Semi-rigid control floor joint sealant",
        "category": "Sealants and Adhesives",
        "packaging": "5kg set",
        "casePack": "4",
        "srp": 4644,
        "casePrice": 18576,
        "moq": "",
        "remarks": "",
        "id": "BR-122"
      },
      {
        "code": "700334",
        "name": "Stopgap CJ",
        "desc": "Self-levelling construction joint Sealant",
        "category": "Sealants and Adhesives",
        "packaging": "300ml set",
        "casePack": "10",
        "srp": 1098,
        "casePrice": 10980,
        "moq": "",
        "remarks": "",
        "id": "BR-123"
      },
      {
        "code": "700327",
        "name": "Stopgap MR",
        "desc": "Mold resistant sanitary silicone sealant",
        "category": "Sealants and Adhesives",
        "packaging": "270ml",
        "casePack": "25",
        "srp": 321,
        "casePrice": 8025,
        "moq": "",
        "remarks": "",
        "id": "BR-124"
      },
      {
        "code": "700662",
        "name": "Stopgap NW",
        "desc": "Non-woven butyl flashing tape (1*100mm*3m/roll)",
        "category": "Sealants and Adhesives",
        "packaging": "roll",
        "casePack": "32",
        "srp": 215,
        "casePrice": 6880,
        "moq": "",
        "remarks": "",
        "id": "BR-125"
      },
      {
        "code": "700655",
        "name": "Stopgap AF",
        "desc": "Aluminum butyl flashing tape (1*75mm*3m/roll)",
        "category": "Sealants and Adhesives",
        "packaging": "roll",
        "casePack": "48",
        "srp": 150,
        "casePrice": 7200,
        "moq": "",
        "remarks": "",
        "id": "BR-126"
      },
      {
        "code": "700358",
        "name": "Stopgap Smooth with Tool",
        "desc": "Smoothing agent for easy sealant application",
        "category": "Sealants and Adhesives",
        "packaging": "450ml set",
        "casePack": "14",
        "srp": 288,
        "casePrice": 4032,
        "moq": "",
        "remarks": "",
        "id": "BR-127"
      },
      {
        "code": "701010",
        "name": "Surfix Cement Grip (Gallon)",
        "desc": "Acrylic based bonding agent",
        "category": "Concrete Solutions",
        "packaging": "Gallon",
        "casePack": "4",
        "srp": 546,
        "casePrice": 2184,
        "moq": "",
        "remarks": "",
        "id": "BR-128"
      },
      {
        "code": "701027",
        "name": "Surfix Cement Grip (20L)",
        "desc": "Acrylic based bonding agent",
        "category": "Concrete Solutions",
        "packaging": "20Ltr/cby",
        "casePack": "1",
        "srp": 2136,
        "casePrice": 2136,
        "moq": "",
        "remarks": "",
        "id": "BR-129"
      },
      {
        "code": "727478",
        "name": "Cement Eraser",
        "desc": "Non-corrosive cement remover",
        "category": "Concrete Solutions",
        "packaging": "20kg/cby",
        "casePack": "1",
        "srp": 5159,
        "casePrice": 5159,
        "moq": "",
        "remarks": "",
        "id": "BR-130"
      },
      {
        "code": "701041",
        "name": "Cure Sil WB (20L)",
        "desc": "Curing Compound wax base",
        "category": "Concrete Solutions",
        "packaging": "20Ltr/cby",
        "casePack": "1",
        "srp": 899,
        "casePrice": 899,
        "moq": "",
        "remarks": "",
        "id": "BR-131"
      },
      {
        "code": "701058",
        "name": "Cure Sil WB (200L)",
        "desc": "Curing Compound wax base",
        "category": "Concrete Solutions",
        "packaging": "200Ltr/drum",
        "casePack": "1",
        "srp": 5520,
        "casePrice": 5520,
        "moq": "",
        "remarks": "",
        "id": "BR-132"
      },
      {
        "code": "701065",
        "name": "Cure Sil EB (20L)",
        "desc": "Emulsion based curing compound",
        "category": "Concrete Solutions",
        "packaging": "20Ltr/cby",
        "casePack": "1",
        "srp": 1355,
        "casePrice": 1355,
        "moq": "",
        "remarks": "",
        "id": "BR-133"
      },
      {
        "code": "701089",
        "name": "Cure form 300s (20L)",
        "desc": "Mold release agent",
        "category": "Concrete Solutions",
        "packaging": "20L/cby",
        "casePack": "1",
        "srp": 3453,
        "casePrice": 3453,
        "moq": "",
        "remarks": "",
        "id": "BR-134"
      },
      {
        "code": "701096",
        "name": "Cure form 300s (200L)",
        "desc": "Mold release agent",
        "category": "Concrete Solutions",
        "packaging": "200Ltr/drum",
        "casePack": "1",
        "srp": 32807,
        "casePrice": 32807,
        "moq": "",
        "remarks": "",
        "id": "BR-135"
      },
      {
        "code": "701140",
        "name": "Confix IJ (450ml)",
        "desc": "Low viscosity structural epoxy resin for crack injection repair",
        "category": "Concrete Solutions",
        "packaging": "450ml set",
        "casePack": "10",
        "srp": 1123,
        "casePrice": 11230,
        "moq": "",
        "remarks": "",
        "id": "BR-136"
      },
      {
        "code": "701157",
        "name": "Confix IJ (3kg)",
        "desc": "Low viscosity structural epoxy resin for crack injection repair",
        "category": "Concrete Solutions",
        "packaging": "3kg gal Set",
        "casePack": "2",
        "srp": 3341,
        "casePrice": 6682,
        "moq": "",
        "remarks": "",
        "id": "BR-137"
      },
      {
        "code": "701102",
        "name": "Confix Anchor",
        "desc": "Chemical anchor structural epoxy",
        "category": "Concrete Solutions",
        "packaging": "450ml set",
        "casePack": "10",
        "srp": 914,
        "casePrice": 9140,
        "moq": "",
        "remarks": "",
        "id": "BR-138"
      },
      {
        "code": "701133",
        "name": "Confix Grout 40",
        "desc": "Epoxy grout",
        "category": "Concrete Solutions",
        "packaging": "8kg gal set",
        "casePack": "1",
        "srp": 3597,
        "casePrice": 3597,
        "moq": "",
        "remarks": "",
        "id": "BR-139"
      },
      {
        "code": "711040",
        "name": "Confix Concrete Epoxy LV (Quart)",
        "desc": "Low viscosity concrete epoxy for horizontal application",
        "category": "Concrete Solutions",
        "packaging": "Quart Set",
        "casePack": "6",
        "srp": 1502,
        "casePrice": 9012,
        "moq": "",
        "remarks": "",
        "id": "BR-140"
      },
      {
        "code": "711057",
        "name": "Confix Concrete Epoxy LV (7L)",
        "desc": "Low viscosity concrete epoxy for horizontal application",
        "category": "Concrete Solutions",
        "packaging": "7Litre Set",
        "casePack": "2",
        "srp": 5596,
        "casePrice": 11192,
        "moq": "",
        "remarks": "",
        "id": "BR-141"
      },
      {
        "code": "711064",
        "name": "Confix Concrete Epoxy HV (Quart)",
        "desc": "Non sag high viscosity concrete epoxy for vertical application",
        "category": "Concrete Solutions",
        "packaging": "Quart Set",
        "casePack": "6",
        "srp": 1216,
        "casePrice": 7296,
        "moq": "",
        "remarks": "",
        "id": "BR-142"
      },
      {
        "code": "711071",
        "name": "Confix Concrete Epoxy HV (7L)",
        "desc": "Non sag high viscosity concrete epoxy for vertical application",
        "category": "Concrete Solutions",
        "packaging": "7Litre set",
        "casePack": "2",
        "srp": 4232,
        "casePrice": 8464,
        "moq": "",
        "remarks": "",
        "id": "BR-143"
      },
      {
        "code": "714065",
        "name": "Confix Carbon Fiber Plate Epoxy",
        "desc": "Epoxy laminating resin plate",
        "category": "Concrete Solutions",
        "packaging": "3.8kg set",
        "casePack": "2",
        "srp": 2457,
        "casePrice": 4914,
        "moq": "",
        "remarks": "",
        "id": "BR-144"
      },
      {
        "code": "714058",
        "name": "Confix Carbon Fiber Fabric Epoxy",
        "desc": "Epoxy laminating resin fabric",
        "category": "Concrete Solutions",
        "packaging": "3.8kg set",
        "casePack": "2",
        "srp": 3806,
        "casePrice": 7612,
        "moq": "",
        "remarks": "",
        "id": "BR-145"
      },
      {
        "code": "701119",
        "name": "Confix EC",
        "desc": "3-part cement and epoxy combination mortar for self-smoothing floor screeds of 1.5 to 3mm",
        "category": "Concrete Solutions",
        "packaging": "16kg Set",
        "casePack": "1",
        "srp": 4653,
        "casePrice": 4653,
        "moq": "",
        "remarks": "",
        "id": "BR-146"
      },
      {
        "code": "701003",
        "name": "Concrete Patch V",
        "desc": "Non sag repair mortar for vertical application",
        "category": "Concrete Solutions",
        "packaging": "25kg/bag",
        "casePack": "1",
        "srp": 1556,
        "casePrice": 1556,
        "moq": "",
        "remarks": "",
        "id": "BR-147"
      },
      {
        "code": "700990",
        "name": "Concrete Patch H",
        "desc": "Rapid setting for repair mortar for pavement and Floors",
        "category": "Concrete Solutions",
        "packaging": "25kg/bag",
        "casePack": "1",
        "srp": 2641,
        "casePrice": 2641,
        "moq": "",
        "remarks": "",
        "id": "BR-148"
      },
      {
        "code": "701201",
        "name": "Hardcrete 303",
        "desc": "Skim mortar screed 3mm thickness at 3000psi",
        "category": "Concrete Solutions",
        "packaging": "20kg/set",
        "casePack": "1",
        "srp": 1082,
        "casePrice": 1082,
        "moq": "",
        "remarks": "",
        "id": "BR-149"
      },
      {
        "code": "701218",
        "name": "Hardcrete 310",
        "desc": "Formulated screed for thin topping and concrete repair (3,500 PSI @ 10mm)",
        "category": "Concrete Solutions",
        "packaging": "25kg/bag",
        "casePack": "1",
        "srp": 886,
        "casePrice": 886,
        "moq": "",
        "remarks": "",
        "id": "BR-150"
      },
      {
        "code": "701225",
        "name": "Hardcrete 510",
        "desc": "Formulated screed for thin topping and concrete repair (5,000 PSI @ 10mm)",
        "category": "Concrete Solutions",
        "packaging": "25kg/bag",
        "casePack": "1",
        "srp": 1181,
        "casePrice": 1181,
        "moq": "",
        "remarks": "",
        "id": "BR-151"
      },
      {
        "code": "701232",
        "name": "Hardcrete 620",
        "desc": "Formulated screed for thin topping and concrete repair (6,000 PSI @ 20mm)",
        "category": "Concrete Solutions",
        "packaging": "25kg/bag",
        "casePack": "1",
        "srp": 1676,
        "casePrice": 1676,
        "moq": "",
        "remarks": "",
        "id": "BR-152"
      },
      {
        "code": "701164",
        "name": "Surfix Hardcrete Fix",
        "desc": "Hi-performance concrete bonding agent for screed topping and repair mortar",
        "category": "Concrete Solutions",
        "packaging": "4Litre",
        "casePack": "4",
        "srp": 825,
        "casePrice": 3300,
        "moq": "",
        "remarks": "",
        "id": "BR-153"
      },
      {
        "code": "714072",
        "name": "Surfix D",
        "desc": "Concrete surface densifier",
        "category": "Concrete Solutions",
        "packaging": "20kg/cby",
        "casePack": "1",
        "srp": 7390,
        "casePrice": 7390,
        "moq": "",
        "remarks": "",
        "id": "BR-154"
      },
      {
        "code": "701171",
        "name": "Surfix DP",
        "desc": "Liquid dust proofer and hardener for concrete",
        "category": "Concrete Solutions",
        "packaging": "25Kg/cby",
        "casePack": "1",
        "srp": 2166,
        "casePrice": 2166,
        "moq": "",
        "remarks": "",
        "id": "BR-155"
      },
      {
        "code": "714089",
        "name": "Surfix WB",
        "desc": "2k water-based epoxy bonding primer",
        "category": "Concrete Solutions",
        "packaging": "5kg",
        "casePack": "2",
        "srp": 2624,
        "casePrice": 5248,
        "moq": "",
        "remarks": "",
        "id": "BR-156"
      },
      {
        "code": "714096",
        "name": "Surfix SCA",
        "desc": "Scratch coat acrylic",
        "category": "Concrete Solutions",
        "packaging": "4kg",
        "casePack": "4",
        "srp": 783,
        "casePrice": 3132,
        "moq": "",
        "remarks": "",
        "id": "BR-157"
      },
      {
        "code": "710722",
        "name": "Surfix Epocoat MB White",
        "desc": "Epoxy resin based primer for resin based floor coating",
        "category": "Concrete Solutions",
        "packaging": "3.8kg gal set",
        "casePack": "2",
        "srp": 2750,
        "casePrice": 5500,
        "moq": "",
        "remarks": "",
        "id": "BR-158"
      },
      {
        "code": "701249",
        "name": "*Level Up! 403",
        "desc": "Self-levelling compound 3-5mm thickness",
        "category": "Concrete Solutions",
        "packaging": "25kg Bag",
        "casePack": "1",
        "srp": 1941,
        "casePrice": 1941,
        "moq": "",
        "remarks": "*Price adjustment",
        "id": "BR-159"
      },
      {
        "code": "701256",
        "name": "Level Up! 410",
        "desc": "Self-levelling compound 10-25mm thickness",
        "category": "Concrete Solutions",
        "packaging": "25kg bag",
        "casePack": "1",
        "srp": 1522,
        "casePrice": 1522,
        "moq": "",
        "remarks": "",
        "id": "BR-160"
      },
      {
        "code": "700976",
        "name": "Readycrete 4k",
        "desc": "Ready mix concrete @4,000 PSI",
        "category": "Concrete Solutions",
        "packaging": "25kg/bag",
        "casePack": "1",
        "srp": 399,
        "casePrice": 399,
        "moq": "",
        "remarks": "",
        "id": "BR-161"
      },
      {
        "code": "700983",
        "name": "Readycrete 6k",
        "desc": "Ready mix concrete @6,000 PSI",
        "category": "Concrete Solutions",
        "packaging": "25kg/bag",
        "casePack": "1",
        "srp": 499,
        "casePrice": 499,
        "moq": "",
        "remarks": "",
        "id": "BR-162"
      },
      {
        "code": "700969",
        "name": "Solidcure",
        "desc": "Non shrink self-levelling cementitious grout",
        "category": "Concrete Solutions",
        "packaging": "25kg/bag",
        "casePack": "1",
        "srp": 835,
        "casePrice": 835,
        "moq": "",
        "remarks": "",
        "id": "BR-163"
      },
      {
        "code": "714102",
        "name": "Reforce F300",
        "desc": "High performance carbon fiber fabric for structural strengthening (300gsm*50cm*100m)",
        "category": "Concrete Solutions",
        "packaging": "Roll",
        "casePack": "1",
        "srp": 39500,
        "casePrice": 39500,
        "moq": "",
        "remarks": "",
        "id": "BR-164"
      },
      {
        "code": "728574",
        "name": "Reforce F600",
        "desc": "High performance carbon fiber fabric for structural strengthening (600gsm*50cm*50m)",
        "category": "Concrete Solutions",
        "packaging": "Roll",
        "casePack": "1",
        "srp": 40885,
        "casePrice": 40885,
        "moq": "",
        "remarks": "",
        "id": "BR-165"
      },
      {
        "code": "714119",
        "name": "Reforce P50",
        "desc": "Standard Modulus Carbon Plate Laminates 1.2mm (50mm*100meters)",
        "category": "Concrete Solutions",
        "packaging": "Roll",
        "casePack": "1",
        "srp": 39750,
        "casePrice": 39750,
        "moq": "",
        "remarks": "",
        "id": "BR-166"
      },
      {
        "code": "701287",
        "name": "Floortek S (3.5kg)",
        "desc": "Resin-based film-forming gloss sealer",
        "category": "Industrial Flooring",
        "packaging": "3.5kg",
        "casePack": "4",
        "srp": 3083,
        "casePrice": 12332,
        "moq": "",
        "remarks": "",
        "id": "BR-167"
      },
      {
        "code": "715444",
        "name": "Floortek S (16L)",
        "desc": "Resin-based film-forming gloss sealer",
        "category": "Industrial Flooring",
        "packaging": "16ltr pail",
        "casePack": "1",
        "srp": 11981,
        "casePrice": 11981,
        "moq": "",
        "remarks": "",
        "id": "BR-168"
      },
      {
        "code": "711088",
        "name": "Floortek SB",
        "desc": "Epoxy stone binder",
        "category": "Industrial Flooring",
        "packaging": "3.8kg set",
        "casePack": "2",
        "srp": 4995,
        "casePrice": 9990,
        "moq": "",
        "remarks": "",
        "id": "BR-169"
      },
      {
        "code": "711095",
        "name": "Floortek Shield Gray Semi-Gloss",
        "desc": "2k waterbased aliphatic polyurethane coating",
        "category": "Industrial Flooring",
        "packaging": "5kg set",
        "casePack": "2",
        "srp": 6101,
        "casePrice": 12202,
        "moq": "",
        "remarks": "",
        "id": "BR-170"
      },
      {
        "code": "710852",
        "name": "Floortek SM",
        "desc": "Resin-based film-forming matte sealer",
        "category": "Industrial Flooring",
        "packaging": "3.5kg",
        "casePack": "4",
        "srp": 2727,
        "casePrice": 10908,
        "moq": "",
        "remarks": "",
        "id": "BR-171"
      },
      {
        "code": "710869",
        "name": "*Floortek Tarc Asphalt Black",
        "desc": "Traffic acrylic reflectorized coating",
        "category": "Industrial Flooring",
        "packaging": "5kg",
        "casePack": "4",
        "srp": 2105,
        "casePrice": 8420,
        "moq": "",
        "remarks": "*New color name",
        "id": "BR-172"
      },
      {
        "code": "710876",
        "name": "*Floortek Tarc Traffic Yellow",
        "desc": "Traffic acrylic reflectorized coating",
        "category": "Industrial Flooring",
        "packaging": "5kg",
        "casePack": "4",
        "srp": 2236,
        "casePrice": 8944,
        "moq": "",
        "remarks": "*New color name",
        "id": "BR-173"
      },
      {
        "code": "710883",
        "name": "*Floortek Tarc Precision White",
        "desc": "Traffic acrylic reflectorized coating",
        "category": "Industrial Flooring",
        "packaging": "5kg",
        "casePack": "4",
        "srp": 1987,
        "casePrice": 7948,
        "moq": "",
        "remarks": "*New color name",
        "id": "BR-174"
      },
      {
        "code": "728727",
        "name": "*Floortek Unicrete MD Marble Gray",
        "desc": "Thick Polyurethane Mortar medium build 3-5mm",
        "category": "Industrial Flooring",
        "packaging": "25kg set",
        "casePack": "1",
        "srp": 8748,
        "casePrice": 8748,
        "moq": "",
        "remarks": "*New color name",
        "id": "BR-175"
      },
      {
        "code": "728734",
        "name": "*Floortek Unicrete MD Slate Gray",
        "desc": "Thick Polyurethane Mortar medium build 3-5mm",
        "category": "Industrial Flooring",
        "packaging": "25kg set",
        "casePack": "1",
        "srp": 8748,
        "casePrice": 8748,
        "moq": "",
        "remarks": "*New color name",
        "id": "BR-176"
      },
      {
        "code": "728741",
        "name": "*Floortek Unicrete MD Sand Stone Beige",
        "desc": "Thick Polyurethane Mortar medium build 3-5mm",
        "category": "Industrial Flooring",
        "packaging": "25kg set",
        "casePack": "1",
        "srp": 8748,
        "casePrice": 8748,
        "moq": "",
        "remarks": "*New color name",
        "id": "BR-177"
      },
      {
        "code": "729373",
        "name": "Floortek Sportex Warrior Red",
        "desc": "Sports floor coating",
        "category": "Industrial Flooring",
        "packaging": "5kg",
        "casePack": "4",
        "srp": 1475,
        "casePrice": 5900,
        "moq": "",
        "remarks": "",
        "id": "BR-178"
      },
      {
        "code": "729380",
        "name": "Floortek Sportex Tactical Gray",
        "desc": "Sports floor coating",
        "category": "Industrial Flooring",
        "packaging": "5kg",
        "casePack": "4",
        "srp": 1475,
        "casePrice": 5900,
        "moq": "",
        "remarks": "",
        "id": "BR-179"
      },
      {
        "code": "729397",
        "name": "Floortek Sportex Shadow Black",
        "desc": "Sports floor coating",
        "category": "Industrial Flooring",
        "packaging": "5kg",
        "casePack": "4",
        "srp": 1572,
        "casePrice": 6288,
        "moq": "",
        "remarks": "",
        "id": "BR-180"
      },
      {
        "code": "729403",
        "name": "Floortek Sportex Precision White",
        "desc": "Sports floor coating",
        "category": "Industrial Flooring",
        "packaging": "5kg",
        "casePack": "4",
        "srp": 1650,
        "casePrice": 6600,
        "moq": "",
        "remarks": "",
        "id": "BR-181"
      },
      {
        "code": "729410",
        "name": "Floortek Sportex Active Blue",
        "desc": "Sports floor coating",
        "category": "Industrial Flooring",
        "packaging": "5kg",
        "casePack": "4",
        "srp": 1686,
        "casePrice": 6744,
        "moq": "",
        "remarks": "",
        "id": "BR-182"
      },
      {
        "code": "729427",
        "name": "Floortek Sportex Varsity Green",
        "desc": "Sports floor coating",
        "category": "Industrial Flooring",
        "packaging": "5kg",
        "casePack": "4",
        "srp": 1750,
        "casePrice": 7000,
        "moq": "",
        "remarks": "",
        "id": "BR-183"
      },
      {
        "code": "729434",
        "name": "Floortek Sportex Championship Yellow",
        "desc": "Sports floor coating",
        "category": "Industrial Flooring",
        "packaging": "5kg",
        "casePack": "4",
        "srp": 1890,
        "casePrice": 7560,
        "moq": "",
        "remarks": "",
        "id": "BR-184"
      },
      {
        "code": "722701",
        "name": "Stopslip Tiles (1kg)",
        "desc": "Anti-slip coating for floors",
        "category": "Industrial Flooring",
        "packaging": "1kg",
        "casePack": "6",
        "srp": 1325,
        "casePrice": 7950,
        "moq": "",
        "remarks": "",
        "id": "BR-185"
      },
      {
        "code": "714225",
        "name": "Stopslip Tiles (3.5kg)",
        "desc": "Anti-slip coating for floors",
        "category": "Industrial Flooring",
        "packaging": "3.5kg",
        "casePack": "4",
        "srp": 3975,
        "casePrice": 15900,
        "moq": "",
        "remarks": "",
        "id": "BR-186"
      },
      {
        "code": "729625",
        "name": "Floortek Fortex Black",
        "desc": "Epoxy based floor coating",
        "category": "Industrial Flooring",
        "packaging": "3.8kg set",
        "casePack": "2",
        "srp": 3779,
        "casePrice": 7558,
        "moq": "",
        "remarks": "",
        "id": "BR-187"
      },
      {
        "code": "729595",
        "name": "Floortek Fortex Light Gray",
        "desc": "Epoxy based floor coating",
        "category": "Industrial Flooring",
        "packaging": "3.8kg set",
        "casePack": "2",
        "srp": 3779,
        "casePrice": 7558,
        "moq": "",
        "remarks": "",
        "id": "BR-188"
      },
      {
        "code": "729656",
        "name": "Floortek Fortex Dark Gray",
        "desc": "Epoxy based floor coating",
        "category": "Industrial Flooring",
        "packaging": "3.8kg set",
        "casePack": "2",
        "srp": 3779,
        "casePrice": 7558,
        "moq": "",
        "remarks": "",
        "id": "BR-189"
      },
      {
        "code": "729618",
        "name": "Floortek Fortex Safety Blue",
        "desc": "Epoxy based floor coating",
        "category": "Industrial Flooring",
        "packaging": "3.8kg set",
        "casePack": "2",
        "srp": 3779,
        "casePrice": 7558,
        "moq": "",
        "remarks": "",
        "id": "BR-190"
      },
      {
        "code": "729649",
        "name": "Floortek Fortex International Red",
        "desc": "Epoxy based floor coating",
        "category": "Industrial Flooring",
        "packaging": "3.8kg set",
        "casePack": "2",
        "srp": 3779,
        "casePrice": 7558,
        "moq": "",
        "remarks": "",
        "id": "BR-191"
      },
      {
        "code": "729632",
        "name": "Floortek Fortex Safety Green",
        "desc": "Epoxy based floor coating",
        "category": "Industrial Flooring",
        "packaging": "3.8kg set",
        "casePack": "2",
        "srp": 3779,
        "casePrice": 7558,
        "moq": "",
        "remarks": "",
        "id": "BR-192"
      },
      {
        "code": "729601",
        "name": "Floortek Fortex Safety Yellow",
        "desc": "Epoxy based floor coating",
        "category": "Industrial Flooring",
        "packaging": "3.8kg set",
        "casePack": "2",
        "srp": 3779,
        "casePrice": 7558,
        "moq": "",
        "remarks": "",
        "id": "BR-193"
      },
      {
        "code": "729892",
        "name": "Floortek Armex Silver Gray",
        "desc": "Water-based UV resistant floor coating",
        "category": "Industrial Flooring",
        "packaging": "5kg",
        "casePack": "4",
        "srp": 1620,
        "casePrice": 6480,
        "moq": "",
        "remarks": "",
        "id": "BR-194"
      },
      {
        "code": "729908",
        "name": "Floortek Armex Concrete Gray",
        "desc": "Water-based UV resistant floor coating",
        "category": "Industrial Flooring",
        "packaging": "5kg",
        "casePack": "4",
        "srp": 1620,
        "casePrice": 6480,
        "moq": "",
        "remarks": "",
        "id": "BR-195"
      },
      {
        "code": "729885",
        "name": "Floortek Filler",
        "desc": "Sand for broadcast flooring system",
        "category": "Industrial Flooring",
        "packaging": "1kg",
        "casePack": "10",
        "srp": 150,
        "casePrice": 1500,
        "moq": "",
        "remarks": "",
        "id": "BR-196"
      },
      {
        "code": "730133",
        "name": "**Floortek Apex Dark Gray",
        "desc": "Epoxy Mortar Floor Coating 0.5-1.5mm",
        "category": "Industrial Flooring",
        "packaging": "20kg/set",
        "casePack": "1",
        "srp": 11463,
        "casePrice": 11463,
        "moq": "",
        "remarks": "**New product",
        "id": "BR-197"
      },
      {
        "code": "730072",
        "name": "**Floortek Apex Light Gray",
        "desc": "Epoxy Mortar Floor Coating 0.5-1.5mm",
        "category": "Industrial Flooring",
        "packaging": "20kg/set",
        "casePack": "1",
        "srp": 11463,
        "casePrice": 11463,
        "moq": "",
        "remarks": "**New product",
        "id": "BR-198"
      },
      {
        "code": "730195",
        "name": "**Floortek Decorado Stone River Blend",
        "desc": "Decorative Stones",
        "category": "Industrial Flooring",
        "packaging": "20kg/bag",
        "casePack": "1",
        "srp": 1125,
        "casePrice": 1125,
        "moq": "",
        "remarks": "**New product",
        "id": "BR-199"
      },
      {
        "code": "730201",
        "name": "**Floortek Decorado Stone Golden Canyon",
        "desc": "Decorative Stones",
        "category": "Industrial Flooring",
        "packaging": "20kg/bag",
        "casePack": "1",
        "srp": 1125,
        "casePrice": 1125,
        "moq": "",
        "remarks": "**New product",
        "id": "BR-200"
      },
      {
        "code": "730218",
        "name": "**Floortek Decorado Stone Alpine Frost",
        "desc": "Decorative Stones",
        "category": "Industrial Flooring",
        "packaging": "20kg/bag",
        "casePack": "1",
        "srp": 1125,
        "casePrice": 1125,
        "moq": "",
        "remarks": "**New product",
        "id": "BR-201"
      },
      {
        "code": "730485",
        "name": "**Decorado Stone Carpet",
        "desc": "Permeable Stone Carpet",
        "category": "Industrial Flooring",
        "packaging": "3.8kg",
        "casePack": "4",
        "srp": 2185,
        "casePrice": 8740,
        "moq": "",
        "remarks": "**New product",
        "id": "BR-202"
      },
      {
        "code": "730454",
        "name": "**Floortek Relax",
        "desc": "2k Polyurethane Mid-coat for Comfort Floor Systems",
        "category": "Industrial Flooring",
        "packaging": "5kg set",
        "casePack": "2",
        "srp": 2939,
        "casePrice": 5878,
        "moq": "",
        "remarks": "**New product",
        "id": "BR-203"
      },
      {
        "code": "711316",
        "name": "Ritemix Accelerator (20L)",
        "desc": "Accelerating admixture",
        "category": "Admixtures",
        "packaging": "20Ltr/cby",
        "casePack": "1",
        "srp": 1852,
        "casePrice": 1852,
        "moq": "",
        "remarks": "",
        "id": "BR-204"
      },
      {
        "code": "711323",
        "name": "Ritemix Accelerator (200L)",
        "desc": "Accelerating admixture",
        "category": "Admixtures",
        "packaging": "200Ltr/drum",
        "casePack": "1",
        "srp": 17129,
        "casePrice": 17129,
        "moq": "",
        "remarks": "",
        "id": "BR-205"
      },
      {
        "code": "711330",
        "name": "Ritemix Blocksave",
        "desc": "Cement saver for semi-dry concrete",
        "category": "Admixtures",
        "packaging": "20Ltr/cby",
        "casePack": "1",
        "srp": 2453,
        "casePrice": 2453,
        "moq": "",
        "remarks": "",
        "id": "BR-206"
      },
      {
        "code": "714232",
        "name": "Ritemix Blockspeed (25kg)",
        "desc": "Accelerator for semi-dry concrete",
        "category": "Admixtures",
        "packaging": "25kg/cby",
        "casePack": "1",
        "srp": 4158,
        "casePrice": 4158,
        "moq": "",
        "remarks": "",
        "id": "BR-207"
      },
      {
        "code": "715451",
        "name": "Ritemix Blockspeed (Gallon)",
        "desc": "Accelerator for semi-dry concrete",
        "category": "Admixtures",
        "packaging": "Gallon",
        "casePack": "4",
        "srp": 427,
        "casePrice": 1708,
        "moq": "",
        "remarks": "",
        "id": "BR-208"
      },
      {
        "code": "711255",
        "name": "Ritemix PC 100 (20L)",
        "desc": "Polycarboxylate plasticizer low range water reduction",
        "category": "Admixtures",
        "packaging": "20Ltr/cby",
        "casePack": "1",
        "srp": 1680,
        "casePrice": 1680,
        "moq": "",
        "remarks": "",
        "id": "BR-209"
      },
      {
        "code": "711262",
        "name": "Ritemix PC 100 (200L)",
        "desc": "Polycarboxylate plasticizer low range water reduction",
        "category": "Admixtures",
        "packaging": "200Ltr/drum",
        "casePack": "1",
        "srp": 15367,
        "casePrice": 15367,
        "moq": "",
        "remarks": "",
        "id": "BR-210"
      },
      {
        "code": "711279",
        "name": "Ritemix PC 200 (20L)",
        "desc": "Polycarboxylate plasticizer medium range water reduction",
        "category": "Admixtures",
        "packaging": "20Ltr/cby",
        "casePack": "1",
        "srp": 1890,
        "casePrice": 1890,
        "moq": "",
        "remarks": "",
        "id": "BR-211"
      },
      {
        "code": "711286",
        "name": "Ritemix PC 200 (200L)",
        "desc": "Polycarboxylate plasticizer medium range water reduction",
        "category": "Admixtures",
        "packaging": "200Ltr/drum",
        "casePack": "1",
        "srp": 17955,
        "casePrice": 17955,
        "moq": "",
        "remarks": "",
        "id": "BR-212"
      },
      {
        "code": "711293",
        "name": "Ritemix PC 300 (20L)",
        "desc": "Polycarboxylate plasticizer high range water reduction",
        "category": "Admixtures",
        "packaging": "20Ltr/cby",
        "casePack": "1",
        "srp": 2520,
        "casePrice": 2520,
        "moq": "",
        "remarks": "",
        "id": "BR-213"
      },
      {
        "code": "711309",
        "name": "Ritemix PC 300 (200L)",
        "desc": "Polycarboxylate plasticizer high range water reduction",
        "category": "Admixtures",
        "packaging": "200Ltr/drum",
        "casePack": "1",
        "srp": 22050,
        "casePrice": 22050,
        "moq": "",
        "remarks": "",
        "id": "BR-214"
      },
      {
        "code": "711224",
        "name": "Ritemix PCR 100",
        "desc": "High-range water-reducing, and retarding (type G) 3000 to 4000 PSI",
        "category": "Admixtures",
        "packaging": "200Ltr/drum",
        "casePack": "1",
        "srp": 12805,
        "casePrice": 12805,
        "moq": "",
        "remarks": "",
        "id": "BR-215"
      },
      {
        "code": "711231",
        "name": "Ritemix PCR 200",
        "desc": "High-range water-reducing, and retarding (type G) 4000 to 6000 PSI",
        "category": "Admixtures",
        "packaging": "200Ltr/drum",
        "casePack": "1",
        "srp": 15367,
        "casePrice": 15367,
        "moq": "",
        "remarks": "",
        "id": "BR-216"
      },
      {
        "code": "711248",
        "name": "Ritemix PCR 300",
        "desc": "High-range water-reducing, and retarding (type G) 6000 to 8000 PSI",
        "category": "Admixtures",
        "packaging": "200Ltr/drum",
        "casePack": "1",
        "srp": 19207,
        "casePrice": 19207,
        "moq": "",
        "remarks": "",
        "id": "BR-217"
      },
      {
        "code": "700181",
        "name": "Caldus Plaster",
        "desc": "High heat refractory mortar plaster",
        "category": "Specialty Items (with MOQ)",
        "packaging": "25kg/bag",
        "casePack": "1",
        "srp": 2298,
        "casePrice": 2298,
        "moq": "50 bags",
        "remarks": "Specialty MOQ",
        "id": "BR-218"
      },
      {
        "code": "714652",
        "name": "Blockout Waterguard SW25",
        "desc": "Swellable water stopper bar 25mm*20mm*5m",
        "category": "Specialty Items (with MOQ)",
        "packaging": "Roll",
        "casePack": "1",
        "srp": 3415,
        "casePrice": 3415,
        "moq": "1 roll",
        "remarks": "Specialty MOQ",
        "id": "BR-219"
      },
      {
        "code": "714645",
        "name": "*Hyperblock PU Injection",
        "desc": "2k Pu injection resin",
        "category": "Specialty Items (with MOQ)",
        "packaging": "40kg set",
        "casePack": "1",
        "srp": 41280,
        "casePrice": 41280,
        "moq": "1 set",
        "remarks": "*Price adjustment",
        "id": "BR-220"
      },
      {
        "code": "714126",
        "name": "Bensoil",
        "desc": "Soil stabilizer",
        "category": "Specialty Items (with MOQ)",
        "packaging": "20kg/bag",
        "casePack": "1",
        "srp": 1195,
        "casePrice": 1195,
        "moq": "50 bags",
        "remarks": "Specialty MOQ",
        "id": "BR-221"
      },
      {
        "code": "701072",
        "name": "Cure Sil EB (200L Drum)",
        "desc": "Emulsion based curing compound",
        "category": "Specialty Items (with MOQ)",
        "packaging": "200Ltr/drum",
        "casePack": "1",
        "srp": 9545,
        "casePrice": 9545,
        "moq": "1 drum",
        "remarks": "Specialty MOQ",
        "id": "BR-222"
      },
      {
        "code": "715437",
        "name": "Confix UW 1",
        "desc": "Underwater epoxy putty for damp or wet concrete",
        "category": "Specialty Items (with MOQ)",
        "packaging": "Gallon set",
        "casePack": "2",
        "srp": 3993,
        "casePrice": 7986,
        "moq": "40 sets",
        "remarks": "Specialty MOQ",
        "id": "BR-223"
      },
      {
        "code": "714133",
        "name": "Surfix PE",
        "desc": "Two component penetrating epoxy",
        "category": "Specialty Items (with MOQ)",
        "packaging": "3.5kg set",
        "casePack": "2",
        "srp": 2926,
        "casePrice": 5852,
        "moq": "120 gallons",
        "remarks": "Specialty MOQ",
        "id": "BR-224"
      },
      {
        "code": "701126",
        "name": "Surfix FSE",
        "desc": "Fast setting Epoxy",
        "category": "Specialty Items (with MOQ)",
        "packaging": "8kg set",
        "casePack": "1",
        "srp": 3662,
        "casePrice": 3662,
        "moq": "20 sets",
        "remarks": "Specialty MOQ",
        "id": "BR-225"
      },
      {
        "code": "700952",
        "name": "Elastocrete",
        "desc": "Flexible self-levelling mortar",
        "category": "Specialty Items (with MOQ)",
        "packaging": "25kg/bag",
        "casePack": "1",
        "srp": 2040,
        "casePrice": 2040,
        "moq": "40 bags",
        "remarks": "Specialty MOQ",
        "id": "BR-226"
      },
      {
        "code": "701188",
        "name": "Hardcrete NM Gray",
        "desc": "Non-metalic surface hardener",
        "category": "Specialty Items (with MOQ)",
        "packaging": "25kg/bag",
        "casePack": "1",
        "srp": 718,
        "casePrice": 718,
        "moq": "40 bags",
        "remarks": "Specialty MOQ",
        "id": "BR-227"
      },
      {
        "code": "714140",
        "name": "Readycrete UW 4K",
        "desc": "Ready mix concrete (4,000psi) for underwater application",
        "category": "Specialty Items (with MOQ)",
        "packaging": "25kg/bag",
        "casePack": "1",
        "srp": 468,
        "casePrice": 468,
        "moq": "45 bags",
        "remarks": "Specialty MOQ",
        "id": "BR-228"
      },
      {
        "code": "714157",
        "name": "Readycrete UW 6K",
        "desc": "Ready mix concrete (6,000psi) for underwater application",
        "category": "Specialty Items (with MOQ)",
        "packaging": "25kg/bag",
        "casePack": "1",
        "srp": 484,
        "casePrice": 484,
        "moq": "45 bags",
        "remarks": "Specialty MOQ",
        "id": "BR-229"
      },
      {
        "code": "711125",
        "name": "Stopslip Grip Gray",
        "desc": "Polyurethane skid resistant coating",
        "category": "Specialty Items (with MOQ)",
        "packaging": "5kg",
        "casePack": "4",
        "srp": 2192,
        "casePrice": 8768,
        "moq": "100 gallons",
        "remarks": "Specialty MOQ",
        "id": "BR-230"
      },
      {
        "code": "710975",
        "name": "*Floortek Tac Asphalt Black",
        "desc": "Traffic Acrylic coating",
        "category": "Specialty Items (with MOQ)",
        "packaging": "4kg",
        "casePack": "4",
        "srp": 1915,
        "casePrice": 7660,
        "moq": "100 gallons",
        "remarks": "*New color name",
        "id": "BR-231"
      },
      {
        "code": "710999",
        "name": "Floortek Tac Precision White",
        "desc": "Traffic Acrylic coating",
        "category": "Specialty Items (with MOQ)",
        "packaging": "4kg",
        "casePack": "4",
        "srp": 1888,
        "casePrice": 7552,
        "moq": "100 gallons",
        "remarks": "Specialty MOQ",
        "id": "BR-232"
      },
      {
        "code": "710982",
        "name": "Floortek Tac Traffic Yellow",
        "desc": "Traffic Acrylic coating",
        "category": "Specialty Items (with MOQ)",
        "packaging": "4kg",
        "casePack": "4",
        "srp": 2162,
        "casePrice": 8648,
        "moq": "100 gallons",
        "remarks": "Specialty MOQ",
        "id": "BR-233"
      },
      {
        "code": "728710",
        "name": "*Floortek Unicrete MD Purity White",
        "desc": "Thick Polyurethane Mortar medium build 3-5mm",
        "category": "Specialty Items (with MOQ)",
        "packaging": "25kg set",
        "casePack": "1",
        "srp": 8748,
        "casePrice": 8748,
        "moq": "1 set",
        "remarks": "*New color name",
        "id": "BR-234"
      },
      {
        "code": "728772",
        "name": "Floortek Unicrete MD Midnight Black",
        "desc": "Thick Polyurethane Mortar medium build 3-5mm",
        "category": "Specialty Items (with MOQ)",
        "packaging": "25kg set",
        "casePack": "1",
        "srp": 8748,
        "casePrice": 8748,
        "moq": "1 set",
        "remarks": "Specialty MOQ",
        "id": "BR-235"
      },
      {
        "code": "728789",
        "name": "Floortek Unicrete MD Carribean Blue",
        "desc": "Thick Polyurethane Mortar medium build 3-5mm",
        "category": "Specialty Items (with MOQ)",
        "packaging": "25kg set",
        "casePack": "1",
        "srp": 8748,
        "casePrice": 8748,
        "moq": "1 set",
        "remarks": "Specialty MOQ",
        "id": "BR-236"
      },
      {
        "code": "728796",
        "name": "Floortek Unicrete MD Dessert Yellow",
        "desc": "Thick Polyurethane Mortar medium build 3-5mm",
        "category": "Specialty Items (with MOQ)",
        "packaging": "25kg set",
        "casePack": "1",
        "srp": 8748,
        "casePrice": 8748,
        "moq": "1 set",
        "remarks": "Specialty MOQ",
        "id": "BR-237"
      },
      {
        "code": "728758",
        "name": "Floortek Unicrete MD Terracotta Red",
        "desc": "Thick Polyurethane Mortar medium build 3-5mm",
        "category": "Specialty Items (with MOQ)",
        "packaging": "25kg set",
        "casePack": "1",
        "srp": 8748,
        "casePrice": 8748,
        "moq": "1 set",
        "remarks": "Specialty MOQ",
        "id": "BR-238"
      },
      {
        "code": "728765",
        "name": "Floortek Unicrete MD Bamboo Green",
        "desc": "Thick Polyurethane Mortar medium build 3-5mm",
        "category": "Specialty Items (with MOQ)",
        "packaging": "25kg set",
        "casePack": "1",
        "srp": 8748,
        "casePrice": 8748,
        "moq": "1 set",
        "remarks": "Specialty MOQ",
        "id": "BR-239"
      },
      {
        "code": "730102",
        "name": "**Floortek Apex Black",
        "desc": "Epoxy Mortar Floor Coating 0.5-1.5mm",
        "category": "Specialty Items (with MOQ)",
        "packaging": "20kg set",
        "casePack": "1",
        "srp": 11463,
        "casePrice": 11463,
        "moq": "16 sets",
        "remarks": "**New product",
        "id": "BR-240"
      },
      {
        "code": "730096",
        "name": "Floortek Apex Safety Blue",
        "desc": "Epoxy Mortar Floor Coating 0.5-1.5mm",
        "category": "Specialty Items (with MOQ)",
        "packaging": "20kg set",
        "casePack": "1",
        "srp": 11463,
        "casePrice": 11463,
        "moq": "16 sets",
        "remarks": "Specialty MOQ",
        "id": "BR-241"
      },
      {
        "code": "730126",
        "name": "Floortek Apex International Red",
        "desc": "Epoxy Mortar Floor Coating 0.5-1.5mm",
        "category": "Specialty Items (with MOQ)",
        "packaging": "20kg set",
        "casePack": "1",
        "srp": 11463,
        "casePrice": 11463,
        "moq": "16 sets",
        "remarks": "Specialty MOQ",
        "id": "BR-242"
      },
      {
        "code": "730119",
        "name": "Floortek Apex Safety Green",
        "desc": "Epoxy Mortar Floor Coating 0.5-1.5mm",
        "category": "Specialty Items (with MOQ)",
        "packaging": "20kg set",
        "casePack": "1",
        "srp": 11463,
        "casePrice": 11463,
        "moq": "16 sets",
        "remarks": "Specialty MOQ",
        "id": "BR-243"
      },
      {
        "code": "730089",
        "name": "Floortek Apex Safety Yellow",
        "desc": "Epoxy Mortar Floor Coating 0.5-1.5mm",
        "category": "Specialty Items (with MOQ)",
        "packaging": "20kg set",
        "casePack": "1",
        "srp": 11463,
        "casePrice": 11463,
        "moq": "16 sets",
        "remarks": "Specialty MOQ",
        "id": "BR-244"
      },
      {
        "code": "711347",
        "name": "Ritemix Blocksave (200L Drum)",
        "desc": "Cement saver for semi-dry concrete",
        "category": "Specialty Items (with MOQ)",
        "packaging": "200Ltr/drum",
        "casePack": "1",
        "srp": 20257,
        "casePrice": 20257,
        "moq": "1 drum",
        "remarks": "Specialty MOQ",
        "id": "BR-245"
      },
      {
        "code": "714249",
        "name": "Ritemix Blockspeed (250kg Drum)",
        "desc": "Accelerator for semi-dry concrete",
        "category": "Specialty Items (with MOQ)",
        "packaging": "250kg/drum",
        "casePack": "1",
        "srp": 39820,
        "casePrice": 39820,
        "moq": "1 drum",
        "remarks": "Specialty MOQ",
        "id": "BR-246"
      },
      {
        "code": "711200",
        "name": "Ritemix R60 (20L Cby)",
        "desc": "Retarding admixture",
        "category": "Specialty Items (with MOQ)",
        "packaging": "20Ltr/cby",
        "casePack": "1",
        "srp": 1206,
        "casePrice": 1206,
        "moq": "20 cby",
        "remarks": "Specialty MOQ",
        "id": "BR-247"
      },
      {
        "code": "711217",
        "name": "Ritemix R60 (200L Drum)",
        "desc": "Retarding admixture",
        "category": "Specialty Items (with MOQ)",
        "packaging": "200Ltr/drum",
        "casePack": "1",
        "srp": 7445,
        "casePrice": 7445,
        "moq": "1 drum",
        "remarks": "Specialty MOQ",
        "id": "BR-248"
      },
      {
        "code": "711187",
        "name": "Ritemix SP 193 (20L Cby)",
        "desc": "Superplastizing, High-range water reducing Admixture",
        "category": "Specialty Items (with MOQ)",
        "packaging": "20Ltr/cby",
        "casePack": "1",
        "srp": 1878,
        "casePrice": 1878,
        "moq": "20 cby",
        "remarks": "Specialty MOQ",
        "id": "BR-249"
      },
      {
        "code": "711194",
        "name": "Ritemix SP 193 (200L Drum)",
        "desc": "Superplastizing, High-range water reducing Admixture",
        "category": "Specialty Items (with MOQ)",
        "packaging": "200Ltr/drum",
        "casePack": "1",
        "srp": 12342,
        "casePrice": 12342,
        "moq": "1 drum",
        "remarks": "Specialty MOQ",
        "id": "BR-250"
      },
      {
        "code": "711163",
        "name": "Ritemix SPR 193 (20L Cby)",
        "desc": "Ligno plasticizer & retarder",
        "category": "Specialty Items (with MOQ)",
        "packaging": "20Ltr/cby",
        "casePack": "1",
        "srp": 1878,
        "casePrice": 1878,
        "moq": "20 cby",
        "remarks": "Specialty MOQ",
        "id": "BR-251"
      },
      {
        "code": "711170",
        "name": "Ritemix SPR 193 (200L Drum)",
        "desc": "Ligno plasticizer & retarder",
        "category": "Specialty Items (with MOQ)",
        "packaging": "200Ltr/drum",
        "casePack": "1",
        "srp": 12342,
        "casePrice": 12342,
        "moq": "1 drum",
        "remarks": "Specialty MOQ",
        "id": "BR-252"
      },
      {
        "code": "728550",
        "name": "Ritemix PCR 50 (200L Drum)",
        "desc": "High range water reducing and retarding",
        "category": "Specialty Items (with MOQ)",
        "packaging": "200L/drum",
        "casePack": "1",
        "srp": 8925,
        "casePrice": 8925,
        "moq": "1 drum",
        "remarks": "Specialty MOQ",
        "id": "BR-253"
      },
      {
        "code": "728543",
        "name": "Ritemix PCR 50 (1000L IBC)",
        "desc": "High range water reducing and retarding",
        "category": "Specialty Items (with MOQ)",
        "packaging": "1000L/IBC",
        "casePack": "1",
        "srp": 41475,
        "casePrice": 41475,
        "moq": "1 IBC",
        "remarks": "Specialty MOQ",
        "id": "BR-254"
      },
      {
        "code": "729915",
        "name": "Ritemix PCR 100 (1000L IBC)",
        "desc": "High range water reducing and retarding (Type G)",
        "category": "Specialty Items (with MOQ)",
        "packaging": "1000L/IBC",
        "casePack": "1",
        "srp": 65525,
        "casePrice": 65525,
        "moq": "1 IBC",
        "remarks": "Specialty MOQ",
        "id": "BR-255"
      },
      {
        "code": "729922",
        "name": "Ritemix PCR 200 (1000L IBC)",
        "desc": "High range water reducing and retarding (Type G)",
        "category": "Specialty Items (with MOQ)",
        "packaging": "1000L/IBC",
        "casePack": "1",
        "srp": 78335,
        "casePrice": 78335,
        "moq": "1 IBC",
        "remarks": "Specialty MOQ",
        "id": "BR-256"
      },
      {
        "code": "729939",
        "name": "Ritemix PCR 300 (1000L IBC)",
        "desc": "High range water reducing and retarding (Type G)",
        "category": "Specialty Items (with MOQ)",
        "packaging": "1000L/IBC",
        "casePack": "1",
        "srp": 97535,
        "casePrice": 97535,
        "moq": "1 IBC",
        "remarks": "Specialty MOQ",
        "id": "BR-257"
      }
    ]
  },
  "bostik": {
    "brandKey": "bostik",
    "brandName": "Bostik Philippines",
    "company": "Bostik Philippines, Inc. / Arkema Group",
    "badge": "Shopee PH / Market",
    "badgeColor": "#008080",
    "color": "#008080",
    "sourceDoc": "https://shopee.ph/mall/search?keyword=bostik",
    "effectiveDate": "Current Market 2026",
    "items": [
      {
        "id": "BK-001",
        "code": "BK-CM01",
        "name": "Bostik Patchfix Repair Mortar",
        "desc": "High-Build Non-Shrink Structural Cementitious Concrete Repair Mortar",
        "category": "Construction Materials",
        "packaging": "25 kg moisture-resistant multi-wall bag",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-002",
        "code": "BK-CM02",
        "name": "Bostik Flowfill Non-Shrink Grout GP",
        "desc": "General Purpose Non-Shrink Cementitious Precision Grout",
        "category": "Construction Materials",
        "packaging": "25 kg 4-ply moisture-resistant bag",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-003",
        "code": "BK-CM03",
        "name": "Bostik Flowfill HS",
        "desc": "High-Strength Ultra-Precision Non-Shrink Machinery Grout",
        "category": "Construction Materials",
        "packaging": "25 kg moisture-barrier bag",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-004",
        "code": "BK-CM04",
        "name": "Bostik 6000",
        "desc": "Next-Generation Single-Part Hot Melt Sealant for Insulated Glass & Panels",
        "category": "Construction Materials",
        "packaging": "200 kg steel drum / 20 kg pail",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-005",
        "code": "BK-CM05",
        "name": "Bostik MAROCOL 61131",
        "desc": "2-Component Solvent-Free Structural Polyurethane Panel Adhesive",
        "category": "Construction Materials",
        "packaging": "Part A: 25 kg pail / Part B: 5 kg container (or 250 kg drum ",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-006",
        "code": "BK-CM06",
        "name": "Bostik Aquagrip 29860",
        "desc": "Water-Based High-Tack Industrial Construction Assembly Adhesive",
        "category": "Construction Materials",
        "packaging": "20 kg pail / 200 kg drum",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-007",
        "code": "BK-CM07",
        "name": "Bostik Ardal T 8228M",
        "desc": "High-Tack Construction Dispersion Adhesive for Insulation & Linings",
        "category": "Construction Materials",
        "packaging": "18 kg pail / 200 kg drum",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-008",
        "code": "BK-CM08",
        "name": "Bostik TLH 2216E",
        "desc": "High-Performance Hot Melt Adhesive for Construction Components",
        "category": "Construction Materials",
        "packaging": "15 kg carton (blocks / pillows)",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-009",
        "code": "BK-CM09",
        "name": "Bostik TH 2157",
        "desc": "Thermoplastic Hot Melt Adhesive for Building Envelopes",
        "category": "Construction Materials",
        "packaging": "15 kg box (silicone-lined cartons)",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-010",
        "code": "BK-BC01",
        "name": "Bostik Addmix Plus",
        "desc": "Waterproofing and Plasticizing Chemical Admixture for Mortar & Concrete",
        "category": "Other Building Chemicals",
        "packaging": "1 Liter bottle, 4 Liters gallon, 20 Liters carboy",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-011",
        "code": "BK-BC02",
        "name": "Bostik Addmix Ultra",
        "desc": "High-Performance Polymer Modifier for Mortars & Repair Compounds",
        "category": "Other Building Chemicals",
        "packaging": "4 Liters gallon, 20 Liters pail",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-012",
        "code": "BK-BC03",
        "name": "Bostik Addmix Easy",
        "desc": "Liquid Integral Waterproofing Plaster Admixture",
        "category": "Other Building Chemicals",
        "packaging": "1 Liter bottle, 4 Liters gallon, 20 Liters container",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-013",
        "code": "BK-BC04",
        "name": "Bostik SBR Latex Bonding Agent",
        "desc": "Water-Resistant Styrene-Butadiene Rubber Bonding Agent & Slurry Primer",
        "category": "Other Building Chemicals",
        "packaging": "4 Liters gallon, 20 Liters carboy, 200 Liters drum",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-014",
        "code": "BK-BC05",
        "name": "Bostik PVA Bonding Agent",
        "desc": "Multi-Purpose Polyvinyl Acetate Bonding Emulsion & Dust Sealer",
        "category": "Other Building Chemicals",
        "packaging": "1 Liter bottle, 4 Liters gallon, 20 Liters pail",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-015",
        "code": "BK-BC06",
        "name": "Bostik Mould Release Oil",
        "desc": "High-Efficiency Concrete Formwork Release Agent",
        "category": "Other Building Chemicals",
        "packaging": "20 Liters carboy, 200 Liters drum",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-016",
        "code": "BK-BC07",
        "name": "Bostik Cure & Seal",
        "desc": "Non-Degrading Acrylic Concrete Curing Compound & Dustproofer",
        "category": "Other Building Chemicals",
        "packaging": "20 Liters container, 200 Liters drum",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-017",
        "code": "BK-SB01",
        "name": "Bostik Seal 'N' Flex AP",
        "desc": "All-Purpose Low-Modulus Polyurethane Architectural Joint Sealant",
        "category": "Sealing Bonding",
        "packaging": "600 ml sausage (foil pack), 300 ml cartridge",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-018",
        "code": "BK-SB02",
        "name": "Bostik Seal 'N' Flex Facade",
        "desc": "High-Performance Weatherproofing Facade Polyurethane Joint Sealant",
        "category": "Sealing Bonding",
        "packaging": "600 ml foil sausage",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-019",
        "code": "BK-SB03",
        "name": "Bostik Seal 'N' Flex FC",
        "desc": "Fast-Curing High-Modulus Polyurethane Sealant & Structural Adhesive",
        "category": "Sealing Bonding",
        "packaging": "600ml sausage",
        "casePack": "20",
        "srp": 520,
        "casePrice": 10400,
        "moq": "",
        "remarks": "Shopee PH Verified"
      },
      {
        "id": "BK-020",
        "code": "BK-SB04",
        "name": "Bostik Seal 'N' Flex PS",
        "desc": "Pick-Resistant Security Polyurethane Joint Sealant",
        "category": "Sealing Bonding",
        "packaging": "600 ml sausage",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-021",
        "code": "BK-SB05",
        "name": "Bostik Kitchen & Bathroom Silicone",
        "desc": "Premium Neutral Cure Anti-Fungal Sanitary Silicone Sealant",
        "category": "Sealing Bonding",
        "packaging": "300 ml cartridge",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-022",
        "code": "BK-SB06",
        "name": "Bostik Roof & Gutter Silicone",
        "desc": "Neutral Cure Weatherproof Silicone for Metal Roofs & Flashings",
        "category": "Sealing Bonding",
        "packaging": "300 ml cartridge (Grey, Clear)",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-023",
        "code": "BK-SB07",
        "name": "Bostik Fireban One",
        "desc": "Fire-Rated 4-Hour Polyurethane Architectural Joint Sealant",
        "category": "Sealing Bonding",
        "packaging": "600 ml foil sausage",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-024",
        "code": "BK-SB08",
        "name": "Bostik Firecaulk",
        "desc": "Intumescent Fire-Rated Acoustic Acrylic Sealant",
        "category": "Sealing Bonding",
        "packaging": "600 ml sausage, 300 ml cartridge",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-025",
        "code": "BK-SB09",
        "name": "Bostik Super Vulcaseal",
        "desc": "The Original All-Weather Elastomeric Sealant (Tapal King)",
        "category": "Sealing Bonding",
        "packaging": "1/4 Litre",
        "casePack": "24",
        "srp": 295,
        "casePrice": 7080,
        "moq": "",
        "remarks": "Shopee PH Verified"
      },
      {
        "id": "BK-026",
        "code": "BK-SB10",
        "name": "Bostik Super Vulcaseal All Indoor Gaps",
        "desc": "Paintable Flexible Acrylic Gap Filler Sealant",
        "category": "Sealing Bonding",
        "packaging": "1/4 Litre",
        "casePack": "24",
        "srp": 295,
        "casePrice": 7080,
        "moq": "",
        "remarks": "Shopee PH Verified"
      },
      {
        "id": "BK-027",
        "code": "BK-SB11",
        "name": "Bostik Fill-A-Gap",
        "desc": "Interior Flexible Acrylic Gap Sealant",
        "category": "Sealing Bonding",
        "packaging": "300 ml cartridge",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-028",
        "code": "BK-SB12",
        "name": "Bostik N310 No More Nails Classic",
        "desc": "High-Strength Synthetic Rubber Heavy-Duty Construction Adhesive",
        "category": "Sealing Bonding",
        "packaging": "320 g cartridge",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-029",
        "code": "BK-SB13",
        "name": "Bostik Rugby Original",
        "desc": "Iconic Heavy-Duty Chloroprene Contact Cement",
        "category": "Sealing Bonding",
        "packaging": "45 ml bottle, 300 ml can, 1 Liter can, 3.8 Liters (Gallon), ",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-030",
        "code": "BK-SB14",
        "name": "Bostik Rugby Excel",
        "desc": "Low-Odor, Toluene-Free Premium Contact Adhesive",
        "category": "Sealing Bonding",
        "packaging": "300 ml can, 1 Liter can, 3.8 Liters (Gallon)",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-031",
        "code": "BK-SB15",
        "name": "Bostik El Kapitan Marine Epoxy",
        "desc": "Heavy-Duty Waterproof 2-Part Marine & Structural Epoxy Adhesive",
        "category": "Sealing Bonding",
        "packaging": "Sets of 1/4 Liter, 1/2 Liter, 1 Liter, 4 Liters (Part A & Pa",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-032",
        "code": "BK-WF01",
        "name": "Bostik Fixall Standard",
        "desc": "Cementitious Adhesive for Ceramic Wall and Floor Tiles",
        "category": "Wall Floor",
        "packaging": "25kg bag",
        "casePack": "1",
        "srp": 285,
        "casePrice": 285,
        "moq": "",
        "remarks": "Shopee PH Verified"
      },
      {
        "id": "BK-033",
        "code": "BK-WF02",
        "name": "Bostik Fixall Excel",
        "desc": "Polymer-Modified Heavy-Duty Tile Adhesive for Porcelain & Granite",
        "category": "Wall Floor",
        "packaging": "25kg bag",
        "casePack": "1",
        "srp": 410,
        "casePrice": 410,
        "moq": "",
        "remarks": "Shopee PH Verified"
      },
      {
        "id": "BK-034",
        "code": "BK-WF03",
        "name": "Bostik Fixall Ultra",
        "desc": "Premium Polymer-Fortified Adhesive for Large-Format Tiles & Slabs",
        "category": "Wall Floor",
        "packaging": "25 kg bag",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-035",
        "code": "BK-WF04",
        "name": "Bostik Fixall Plus",
        "desc": "Flexible High-Adhesion Tile Adhesive for Facades & Submerged Pools",
        "category": "Wall Floor",
        "packaging": "25 kg bag",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-036",
        "code": "BK-WF05",
        "name": "Bostik Megagrout / Hydroment",
        "desc": "Polymer-Fortified Anti-Microbial Non-Shrink Tile Grout",
        "category": "Wall Floor",
        "packaging": "2 kg pouch / 20 kg bag (Multiple architectural colors)",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-037",
        "code": "BK-WF06",
        "name": "Bostik Ultra Fino Skimcoat",
        "desc": "Polymer-Modified Cementitious Architectural Thin Plaster Finish",
        "category": "Wall Floor",
        "packaging": "20 kg moisture-barrier multi-wall bag (White / Grey)",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-038",
        "code": "BK-WF07",
        "name": "Bostik Ultra Fino Skimpaste",
        "desc": "Ready-to-Use Acrylic Wall Putty & Leveling Paste",
        "category": "Wall Floor",
        "packaging": "5 kg tub, 25 kg plastic pail",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-039",
        "code": "BK-WF08",
        "name": "Bostik Ultra Fino Finishing Putty",
        "desc": "Ultra-Fine Architectural Finishing Putty for Interior Walls",
        "category": "Wall Floor",
        "packaging": "5 kg tub, 25 kg pail",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-040",
        "code": "BK-WF09",
        "name": "Bostik Ultraset SF",
        "desc": "Solvent-Free High-Performance Polyurethane Timber Flooring Adhesive",
        "category": "Wall Floor",
        "packaging": "16 kg pail (600 ml sausages also available)",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-041",
        "code": "BK-WF10",
        "name": "Bostik TLH 2299 E",
        "desc": "High-Tack Adhesive for Resilient Flooring & Durable Goods",
        "category": "Wall Floor",
        "packaging": "15 kg pail",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-042",
        "code": "BK-WP01",
        "name": "Bostik Powermix",
        "desc": "Advanced 2-Part Flexible Acrylic-Cementitious Waterproofing Membrane",
        "category": "Waterproofing",
        "packaging": "1 Gallon (4L)",
        "casePack": "4",
        "srp": 999,
        "casePrice": 3996,
        "moq": "",
        "remarks": "Shopee PH Verified"
      },
      {
        "id": "BK-043",
        "code": "BK-WP02",
        "name": "Bostik Powerseal",
        "desc": "Crystalline and Capillary Waterproofing Slurry for Concrete",
        "category": "Waterproofing",
        "packaging": "25 kg bag",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-044",
        "code": "BK-WP03",
        "name": "Bostik Boscoflex",
        "desc": "Two-Component Flexible Polymer-Modified Cementitious Membrane",
        "category": "Waterproofing",
        "packaging": "35 kg set (25 kg powder + 10 kg liquid) / 17.5 kg set",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-045",
        "code": "BK-WP04",
        "name": "Bostik Boscolastic",
        "desc": "High-Elasticity Crack-Bridging Cementitious Waterproofing Membrane",
        "category": "Waterproofing",
        "packaging": "30 kg set (20 kg powder + 10 kg liquid)",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-046",
        "code": "BK-WP05",
        "name": "Bostik Boscoseal Slurry",
        "desc": "Heavy-Duty Brushable Waterproof Slurry Coating",
        "category": "Waterproofing",
        "packaging": "25 kg bag",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-047",
        "code": "BK-WP06",
        "name": "Bostik Powerproof PU-D",
        "desc": "One-Component Polyurethane Dispersion Waterproofing Membrane",
        "category": "Waterproofing",
        "packaging": "20 kg plastic pail (White, Grey)",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-048",
        "code": "BK-WP07",
        "name": "Bostik Boscoseal PU",
        "desc": "High-Performance Pure Elastomeric Liquid Polyurethane Membrane",
        "category": "Waterproofing",
        "packaging": "25 kg metal drum",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-049",
        "code": "BK-WP08",
        "name": "Bostik Boscoseal PUW",
        "desc": "Water-Based Polyurethane Hybrid Elastomeric Membrane",
        "category": "Waterproofing",
        "packaging": "20 kg pail",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-050",
        "code": "BK-WP09",
        "name": "Bostik Boscoseal Torch-On 3mm",
        "desc": "APP Modified Bituminous Torch-Applied Waterproofing Sheet Membrane",
        "category": "Waterproofing",
        "packaging": "1m x 10m roll (10 m² per roll)",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-051",
        "code": "BK-WP10",
        "name": "Bostik BLOCK X550 TPO",
        "desc": "Reinforced High-Durability Thermoplastic Polyolefin (TPO) Roof Membrane",
        "category": "Waterproofing",
        "packaging": "2.0m x 20m roll (40 m² per roll)",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-052",
        "code": "BK-WP11",
        "name": "Bostik BLOCK X750 HDPE",
        "desc": "Pre-Applied Fully Bonded Sanded HDPE Basement Waterproofing Membrane",
        "category": "Waterproofing",
        "packaging": "1.2m x 20m roll / 2.0m x 20m roll",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-053",
        "code": "BK-WP12",
        "name": "Bostik Powerplug",
        "desc": "Ultra-Rapid Setting Hydraulic Water-Stopping Cement Mortar",
        "category": "Waterproofing",
        "packaging": "1 kg plastic tub, 5 kg tub, 25 kg pail",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BK-054",
        "code": "BK-WP13",
        "name": "Bostik Superswell",
        "desc": "Hydrophilic Swellable Waterstop for Concrete Construction Joints",
        "category": "Waterproofing",
        "packaging": "20 mm x 25 mm strip (5 meters per roll, 30 m per box) or 20 ",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      }
    ]
  },
  "davies": {
    "brandKey": "davies",
    "brandName": "Davies Paints Philippines",
    "company": "Davies Paints Philippines, Inc.",
    "badge": "Price List 2026",
    "badgeColor": "#7c3aed",
    "color": "#7c3aed",
    "sourceDoc": "https://toolsph.com/davies-paint-price/",
    "effectiveDate": "Current Market 2026",
    "items": [
      {
        "id": "DV-001",
        "code": "DV-EX01",
        "name": "DAVIES GLOSS-IT",
        "desc": "Quick Dry Enamel",
        "category": "Exterior Paints",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": 840,
        "casePrice": 3360,
        "moq": "",
        "remarks": "ToolsPH 2026 Reference"
      },
      {
        "id": "DV-002",
        "code": "DV-EX02",
        "name": "DAVIES ROOFSHIELD",
        "desc": "100% Acrylic Gloss Roof Paint",
        "category": "Exterior Paints",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": 820,
        "casePrice": 3280,
        "moq": "",
        "remarks": "ToolsPH 2026 Reference"
      },
      {
        "id": "DV-003",
        "code": "DV-EX03",
        "name": "DAVIES LIQUID TILE CAST",
        "desc": "High Performance Paints",
        "category": "Exterior Paints",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": 850,
        "casePrice": 3400,
        "moq": "",
        "remarks": "ToolsPH 2026 Reference"
      },
      {
        "id": "DV-004",
        "code": "DV-EX04",
        "name": "DAVIES ELASTOGEL ULTRA",
        "desc": "  Elastomeric Paint : 100% Crosslinking Acrylic ",
        "category": "Exterior Paints",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-005",
        "code": "DV-EX05",
        "name": "DAVIES KERAMIKOTE",
        "desc": "Polyurethane Coating System",
        "category": "Exterior Paints",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-006",
        "code": "DV-EX06",
        "name": "DAVIES LIQUID TILE PRIMER",
        "desc": "High Performance Paints",
        "category": "Exterior Paints",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": 850,
        "casePrice": 3400,
        "moq": "",
        "remarks": "ToolsPH 2026 Reference"
      },
      {
        "id": "DV-007",
        "code": "DV-EX07",
        "name": "DAVIES LIQUID TILE",
        "desc": "High Performance Paints",
        "category": "Exterior Paints",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": 850,
        "casePrice": 3400,
        "moq": "",
        "remarks": "ToolsPH 2026 Reference"
      },
      {
        "id": "DV-008",
        "code": "DV-EX08",
        "name": "DAVIES FUSION",
        "desc": "Dirt Resistant Flexible Paint",
        "category": "Exterior Paints",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-009",
        "code": "DV-EX09",
        "name": "DAVIES PONDO",
        "desc": "100% Acrylic Latex Paint",
        "category": "Exterior Paints",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-010",
        "code": "DV-EX10",
        "name": "DAVIES HOME BUDDY",
        "desc": "Polyester Body Filler",
        "category": "Exterior Paints",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-011",
        "code": "DV-EX11",
        "name": "DAVIES KERAMIKOTE PRIMER",
        "desc": "Polyurethane Coating System",
        "category": "Exterior Paints",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-012",
        "code": "DV-EX12",
        "name": "DAVIES CLASSITEX",
        "desc": "Water Based : Textured Paint",
        "category": "Exterior Paints",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-013",
        "code": "DV-EX13",
        "name": "DAVIES SUN & RAIN",
        "desc": "100% Acrylic Elastomeric Paint",
        "category": "Exterior Paints",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": 795,
        "casePrice": 3180,
        "moq": "",
        "remarks": "ToolsPH 2026 Reference"
      },
      {
        "id": "DV-014",
        "code": "DV-EX14",
        "name": "DAVIES KERAMIKOTE SEALER",
        "desc": "Polyurethane Coating System",
        "category": "Exterior Paints",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-015",
        "code": "DV-EX15",
        "name": "DAVIES ELASTOFLEXX",
        "desc": "Elastomeric Coating System",
        "category": "Exterior Paints",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-016",
        "code": "DV-EX16",
        "name": "DAVIES AQUA GLOSS-IT",
        "desc": "100% Acrylic Quick Dry Enamel",
        "category": "Exterior Paints",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": 840,
        "casePrice": 3360,
        "moq": "",
        "remarks": "ToolsPH 2026 Reference"
      },
      {
        "id": "DV-017",
        "code": "DV-WP01",
        "name": "DAVIES MORTAFLEX",
        "desc": "Cementitious Waterproofing Membrane Admixture",
        "category": "Waterproofing",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": 890,
        "casePrice": 3560,
        "moq": "",
        "remarks": "ToolsPH 2026 Reference"
      },
      {
        "id": "DV-018",
        "code": "DV-WP02",
        "name": "DAVIES SUPERDRY™ EXTREME",
        "desc": "Concrete Waterproofing Ready-To-Use",
        "category": "Waterproofing",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": 1150,
        "casePrice": 4600,
        "moq": "",
        "remarks": "ToolsPH 2026 Reference"
      },
      {
        "id": "DV-019",
        "code": "DV-IN01",
        "name": "DAVIES MEGACRYL MCS",
        "desc": "100% Acrylic Latex Paint",
        "category": "Interior Paints",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": 680,
        "casePrice": 2720,
        "moq": "",
        "remarks": "ToolsPH 2026 Reference"
      },
      {
        "id": "DV-020",
        "code": "DV-IN02",
        "name": "DAVIES MEGACRYL CONCRETE PUTTY",
        "desc": "Water-Based Concrete Putty",
        "category": "Interior Paints",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": 680,
        "casePrice": 2720,
        "moq": "",
        "remarks": "ToolsPH 2026 Reference"
      },
      {
        "id": "DV-021",
        "code": "DV-IN03",
        "name": "DAVIES MEGACRYL CONCRETE PRIMER",
        "desc": "Water-Based Concrete Primer & Sealer",
        "category": "Interior Paints",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": 680,
        "casePrice": 2720,
        "moq": "",
        "remarks": "ToolsPH 2026 Reference"
      },
      {
        "id": "DV-022",
        "code": "DV-IN04",
        "name": "DAVIES LIQUID PENETRATING SEALER",
        "desc": "High Performance Paints",
        "category": "Interior Paints",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-023",
        "code": "DV-IN05",
        "name": "DAVIES LIQUID TILE PUTTY",
        "desc": "High Performance Paints",
        "category": "Interior Paints",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": 850,
        "casePrice": 3400,
        "moq": "",
        "remarks": "ToolsPH 2026 Reference"
      },
      {
        "id": "DV-024",
        "code": "DV-IN06",
        "name": "DAVIES CONCRETE NEUTRALIZER",
        "desc": "Concrete Neutralizer",
        "category": "Interior Paints",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-025",
        "code": "DV-IN07",
        "name": "DAVIES FLAT WALL ENAMEL",
        "desc": "Alkyd-Based Paint",
        "category": "Interior Paints",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-026",
        "code": "DV-IN08",
        "name": "DAVIES INTERIOR SEMI-GLOSS ENAMEL",
        "desc": "Alkyd-Based Paint",
        "category": "Interior Paints",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-027",
        "code": "DV-IN09",
        "name": "DAVIES BIO-FRESH+",
        "desc": "Premium Interior Paint",
        "category": "Interior Paints",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": 890,
        "casePrice": 3560,
        "moq": "",
        "remarks": "ToolsPH 2026 Reference"
      },
      {
        "id": "DV-028",
        "code": "DV-IN10",
        "name": "DAVIES MEGACRYL FLAT LATEX",
        "desc": "100% Acrylic Latex Paint",
        "category": "Interior Paints",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": 680,
        "casePrice": 2720,
        "moq": "",
        "remarks": "ToolsPH 2026 Reference"
      },
      {
        "id": "DV-029",
        "code": "DV-FL01",
        "name": "DAVIES KERAMIFLOOR",
        "desc": "2-Component Polyurethane",
        "category": "Floor Coatings",
        "packaging": "4 Liters Set",
        "casePack": "4",
        "srp": 1150,
        "casePrice": 4600,
        "moq": "",
        "remarks": "ToolsPH 2026 Reference"
      },
      {
        "id": "DV-030",
        "code": "DV-FL02",
        "name": "DAVIES EPOSEAL",
        "desc": "Epoxy-Based Sealer",
        "category": "Floor Coatings",
        "packaging": "4 Liters Set",
        "casePack": "4",
        "srp": 1050,
        "casePrice": 4200,
        "moq": "",
        "remarks": "ToolsPH 2026 Reference"
      },
      {
        "id": "DV-031",
        "code": "DV-FL03",
        "name": "DAVIES ACREEX",
        "desc": "Chlorinated Rubber Solvent-Based",
        "category": "Floor Coatings",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": 950,
        "casePrice": 3800,
        "moq": "",
        "remarks": "ToolsPH 2026 Reference"
      },
      {
        "id": "DV-032",
        "code": "DV-FL04",
        "name": "DAVIES POWERFLOOR",
        "desc": "2-Component Solvent-Free Epoxy",
        "category": "Floor Coatings",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": 890,
        "casePrice": 3560,
        "moq": "",
        "remarks": "ToolsPH 2026 Reference"
      },
      {
        "id": "DV-033",
        "code": "DV-FL05",
        "name": "DAVIES EPOPATCH",
        "desc": "Epoxy-Based Putty",
        "category": "Floor Coatings",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-034",
        "code": "DV-FL06",
        "name": "DAVIES AQUAFLOOR",
        "desc": "Water-Based : 100% Acrylic",
        "category": "Floor Coatings",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-035",
        "code": "DV-WD01",
        "name": "DAVIES NITRO",
        "desc": "Wood Sanding Sealer",
        "category": "Wood Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-036",
        "code": "DV-WD02",
        "name": "DAVIES PROLUX",
        "desc": "Alkyd-Based : Wood Putty",
        "category": "Wood Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-037",
        "code": "DV-WD03",
        "name": "DAVIES INTERIOR WOOD PRIMER",
        "desc": "Alkyd-Based : Wood Primer",
        "category": "Wood Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-038",
        "code": "DV-WD04",
        "name": "DAVIES LAX-TITE",
        "desc": "Wood Filler",
        "category": "Wood Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-039",
        "code": "DV-WD05",
        "name": "DAVIES TIMBERPRIME",
        "desc": "Water-Based : Wood Primer",
        "category": "Wood Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-040",
        "code": "DV-WD06",
        "name": "DAVIES OIL WOODSTAIN",
        "desc": "Oil-Based",
        "category": "Wood Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-041",
        "code": "DV-WD07",
        "name": "DAVIES POLYFLOOR SEALER",
        "desc": "Polyurethane-Based",
        "category": "Wood Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-042",
        "code": "DV-WD08",
        "name": "DAVIES SPEEDGLAZE",
        "desc": "Lacquer Putty",
        "category": "Wood Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-043",
        "code": "DV-WD09",
        "name": "DAVIES SPEEDGLO",
        "desc": "Automotive Lacquer",
        "category": "Wood Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-044",
        "code": "DV-WD10",
        "name": "DAVIES PASTE WOOD FILLER",
        "desc": "Wood Filler",
        "category": "Wood Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-045",
        "code": "DV-WD11",
        "name": "DAVIES SPEEDPRIME",
        "desc": "Lacquer Primer",
        "category": "Wood Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-046",
        "code": "DV-WD12",
        "name": "DAVIES WOOD BLEACH",
        "desc": "Wood Preparation Solution",
        "category": "Wood Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-047",
        "code": "DV-WD13",
        "name": "DAVIES DIAMANTE",
        "desc": "Polyurethane Wood Varnish",
        "category": "Wood Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-048",
        "code": "DV-WD14",
        "name": "DAVIES POLYFLOOR TOPCOAT",
        "desc": "Polyurethane Wood Varnish",
        "category": "Wood Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-049",
        "code": "DV-WD15",
        "name": "DAVIES HI-SOLIDS SANDING SEALER",
        "desc": "Clear Lacquer",
        "category": "Wood Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-050",
        "code": "DV-WD16",
        "name": "DAVIES HI-SOLIDS CLEAR GLOSS LACQUER",
        "desc": "Clear Lacquer",
        "category": "Wood Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-051",
        "code": "DV-WD17",
        "name": "DAVIES AQUAWOOD",
        "desc": "Water-Based",
        "category": "Wood Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-052",
        "code": "DV-WD18",
        "name": "DAVIES HI-SOLIDS DEAD FLAT LACQUER",
        "desc": "Clear Lacquer",
        "category": "Wood Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-053",
        "code": "DV-MS01",
        "name": "DAVIES BLACKBOARD PAINT",
        "desc": "Alkyd-Based Paint",
        "category": "Metal Specialty",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-054",
        "code": "DV-MS02",
        "name": "DAVIES LIQUID TILE TINTING COLOR",
        "desc": "Solvent-Based : Colorant",
        "category": "Metal Specialty",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": 850,
        "casePrice": 3400,
        "moq": "",
        "remarks": "ToolsPH 2026 Reference"
      },
      {
        "id": "DV-055",
        "code": "DV-MS03",
        "name": "DAVIES ACRY-COLOR",
        "desc": "Water-Based : Colorant",
        "category": "Metal Specialty",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-056",
        "code": "DV-MS04",
        "name": "DAVIES AQUA METAL",
        "desc": "Water-Based : Metal Primer",
        "category": "Metal Specialty",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-057",
        "code": "DV-MS05",
        "name": "DAVIES METAL PRIMER",
        "desc": "Alkyd-Based : Metal Primer",
        "category": "Metal Specialty",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-058",
        "code": "DV-MS06",
        "name": "DAVIES DAYTONA",
        "desc": "Polyester Body Filler",
        "category": "Metal Specialty",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-059",
        "code": "DV-MS07",
        "name": "DAVIES OIL TINTING COLOR",
        "desc": "Alkyd-Based : Colorant",
        "category": "Metal Specialty",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-060",
        "code": "DV-MS08",
        "name": "DAVIES HI-HEAT RESISTING ALUMINUM",
        "desc": "Aluminum Paint",
        "category": "Metal Specialty",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-061",
        "code": "DV-MS09",
        "name": "DAVIES SILVER ALUMINUM FINISH",
        "desc": "Aluminum Paint",
        "category": "Metal Specialty",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-062",
        "code": "DV-MS10",
        "name": "DAVIES EPOXY ENAMEL NON-TOXIC",
        "desc": "Epoxy-Based",
        "category": "Metal Specialty",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-063",
        "code": "DV-MS11",
        "name": "DAVIES HEAT RESISTING ALUMINUM",
        "desc": "Aluminum Paint",
        "category": "Metal Specialty",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-064",
        "code": "DV-MS12",
        "name": "DAVIES EPOXY PRIMER",
        "desc": "Epoxy-Based ",
        "category": "Metal Specialty",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-065",
        "code": "DV-MS13",
        "name": "DAVIES EPOXY ENAMEL",
        "desc": "Epoxy-Based",
        "category": "Metal Specialty",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-066",
        "code": "DV-MS14",
        "name": "DAVIES RUSTY BAN",
        "desc": "Rust Converter and Primer ",
        "category": "Metal Specialty",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-067",
        "code": "DV-MS15",
        "name": "DAVIES STRIP-EZE PAINT REMOVER",
        "desc": "Paint Remover",
        "category": "Metal Specialty",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-068",
        "code": "DV-MS16",
        "name": "DAVIES GRECO RUST CONVERTER",
        "desc": "Rust Converter",
        "category": "Metal Specialty",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-069",
        "code": "DV-MS17",
        "name": "DAVIES SWIMMING POOL PAINT",
        "desc": "Chlorinated Rubber Based",
        "category": "Metal Specialty",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-070",
        "code": "DV-MS18",
        "name": "DAVIES X-RUST",
        "desc": "Anti-Corrosive Metal Primer",
        "category": "Metal Specialty",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-071",
        "code": "DV-RM01",
        "name": "DAVIES CRB TRAFFIC PAINT REFLECTORIZED",
        "desc": "Solvent-Based : Chlorinated Rubber Based",
        "category": "Road Markings",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": 1100,
        "casePrice": 4400,
        "moq": "",
        "remarks": "ToolsPH 2026 Reference"
      },
      {
        "id": "DV-072",
        "code": "DV-RM02",
        "name": "DAVIES CRB TRAFFIC PAINT",
        "desc": "Solvent-Based : Chlorinated Rubber Based",
        "category": "Road Markings",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": 1100,
        "casePrice": 4400,
        "moq": "",
        "remarks": "ToolsPH 2026 Reference"
      },
      {
        "id": "DV-073",
        "code": "DV-RM03",
        "name": "DAVIES SAFETRACK",
        "desc": "Thermoplastic",
        "category": "Road Markings",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-074",
        "code": "DV-RM04",
        "name": "DAVIES SAFETRACK THERMOPLASTIC PRIMER",
        "desc": "Thermoplastic Primer",
        "category": "Road Markings",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-075",
        "code": "DV-RM05",
        "name": "DAVIES TRAFFIC PAINT",
        "desc": "Alkyd-Based",
        "category": "Road Markings",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": 1100,
        "casePrice": 4400,
        "moq": "",
        "remarks": "ToolsPH 2026 Reference"
      },
      {
        "id": "DV-076",
        "code": "DV-RM06",
        "name": "DAVIES TRAFFIC PAINT REFLECTORIZED",
        "desc": "Alkyd-Based",
        "category": "Road Markings",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": 1100,
        "casePrice": 4400,
        "moq": "",
        "remarks": "ToolsPH 2026 Reference"
      },
      {
        "id": "DV-077",
        "code": "DV-WA01",
        "name": "DAVIES WALLART FIBRATEX",
        "desc": "Woven Textile Wall Covering Fiber",
        "category": "Wallart Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-078",
        "code": "DV-WA02",
        "name": "DAVIES WALLART DECOPRIME",
        "desc": "Water-based ",
        "category": "Wallart Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-079",
        "code": "DV-WA03",
        "name": "DAVIES WALLART METAL FOND",
        "desc": "Water-based",
        "category": "Wallart Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-080",
        "code": "DV-WA04",
        "name": "DAVIES WALLART FIBRATEX GLUE",
        "desc": "Water-Based : Adhesive",
        "category": "Wallart Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-081",
        "code": "DV-WA05",
        "name": "DAVIES WALLART INDUSTRIA TOPCOAT CLEAR",
        "desc": "Natural Concrete Finish",
        "category": "Wallart Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-082",
        "code": "DV-WA06",
        "name": "DAVIES WALLART METAL",
        "desc": "Metallic Effect",
        "category": "Wallart Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-083",
        "code": "DV-WA07",
        "name": "DAVIES WALLART TEXTURA BASECOAT",
        "desc": "Sandstone Effect",
        "category": "Wallart Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-084",
        "code": "DV-WA08",
        "name": "DAVIES WALLART INDUSTRIA",
        "desc": "Natural Concrete Finish",
        "category": "Wallart Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-085",
        "code": "DV-WA09",
        "name": "DAVIES WALLART CLASSICO",
        "desc": "Wood Graining Effect",
        "category": "Wallart Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-086",
        "code": "DV-WA10",
        "name": "DAVIES WALLART LUNE",
        "desc": "Soft Shimmering Effect",
        "category": "Wallart Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-087",
        "code": "DV-WA11",
        "name": "DAVIES WALLART TEXTURA TOPCOAT",
        "desc": "Sandstone Effect",
        "category": "Wallart Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-088",
        "code": "DV-WA12",
        "name": "DAVIES WALLART DOLCEVITA",
        "desc": "Pearly Effect",
        "category": "Wallart Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "DV-089",
        "code": "DV-WA13",
        "name": "DAVIES WALLART MAESTRO",
        "desc": "Rustic Italian Finish",
        "category": "Wallart Finishes",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      }
    ]
  },
  "boysen": {
    "brandKey": "boysen",
    "brandName": "Pacific Paint (Boysen)",
    "company": "Pacific Paint (Boysen) Philippines, Inc.",
    "badge": "Price List 2026",
    "badgeColor": "#dc2626",
    "color": "#dc2626",
    "sourceDoc": "https://toolsph.com/boysen-paint-price/",
    "effectiveDate": "Current Market 2026",
    "items": [
      {
        "id": "BY-001",
        "code": "B-7760",
        "name": "BOYSEN® Plexibond™ B-7760 Cementitious Waterproofing System",
        "desc": "**Outstanding Flexibility**\n\nPlexibond-modified cement possesses superior flexibility, eliminating cement-plastering def",
        "category": "Construction Chemicals",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-002",
        "code": "K-101 / K-103",
        "name": "Konstrukt™ Durafill™ K-101 Gypsum Putty and K-103 Fast-Setting Gypsum Compound",
        "desc": "• Specially formulated for interior gypsum board joints, fiber cement boards, and drywalls\n• Provides smooth, crack-free",
        "category": "Construction Chemicals",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-003",
        "code": "K-630",
        "name": "Konstrukt™ K-630 Join \"N\" Seal Hybrid Polyurethane Sealant",
        "desc": "For interior and exterior use\nFree of isocyanates, solvents, and silicones\nAdheres to the substrate well without the use",
        "category": "Construction Chemicals",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-004",
        "code": "K-231",
        "name": "Konstrukt™ Permaplast™ K-231 Deco Render",
        "desc": "• Premium decorative render finish for concrete facades, precast walls, and masonry\n• Outstanding weather and UV resista",
        "category": "Construction Chemicals",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-005",
        "code": "K-222",
        "name": "Konstrukt™ Permaplast™ K-222 Interior Render",
        "desc": "Fills in deep cracks from 3mm to 8mm, resulting in quick repairs done in less time with better value-for-money\nProvides ",
        "category": "Construction Chemicals",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-006",
        "code": "K-220 / K-252",
        "name": "Konstrukt™ Permaplast™ K-220 Interior Superfine White Skimcoat & K-252 Interior Skimcoat Sealer",
        "desc": "• Superfine white skimcoat for achieving ultra-smooth wall surfaces\n• Hides imperfections, pinholes, and roughness on co",
        "category": "Construction Chemicals",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-007",
        "code": "K-210",
        "name": "Konstrukt™ Permaplast™ K-210 Acrylic 2K Skimcoat",
        "desc": "• Two-component polymer-modified acrylic skimcoat for exterior and interior use\n• Provides high water repellency and cra",
        "category": "Construction Chemicals",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-008",
        "code": "K-202",
        "name": "Konstrukt™ Permaplast™ K-202 High-Performance Acrylic Render",
        "desc": "Fixes wall imperfections 3mm to 5mm\nMinimizes cracking and improves water resistance",
        "category": "Construction Chemicals",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-009",
        "code": "K-201",
        "name": "Konstrukt™ Permaplast™ K-201 High-Performance Acrylic Skimcoat",
        "desc": "Fixes wall imperfections from 2mm to 3mm thick\nMinimizes the use of putty\nMinimizes cracking and improves water resistan",
        "category": "Construction Chemicals",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-010",
        "code": "K-501",
        "name": "Konstrukt™ Sealtite™ K-501 2-pack Cementitious Waterproofing",
        "desc": "• Flexible two-pack cementitious waterproofing membrane\n• Ideal for wet areas, bathrooms, balconies, water tanks, and sw",
        "category": "Construction Chemicals",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-011",
        "code": "K-321 / K-302",
        "name": "Konstrukt™ Tileworks™ K-321 Tile Adhesion Promoter and K-302 All-Purpose Tile Adhesive",
        "desc": "• Heavy-duty tile adhesion promoter and all-purpose tile adhesive\n• High bond strength prevents tile debonding and hollo",
        "category": "Construction Chemicals",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-012",
        "code": "K-441",
        "name": "Konstrukt™ Trafficshield™ K-441 Floor Screed",
        "desc": "• Self-smoothing high-strength cementitious floor screed\n• Rapid strength development for fast return to service\n• Level",
        "category": "Construction Chemicals",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-013",
        "code": "B-ELASTIKOTE",
        "name": "BOYSEN® Elasti-kote™ Premium Elastomeric Wall Covering",
        "desc": "• 100% acrylic elastomeric wall covering with exceptional elasticity and elongation\n• Bridges dynamic hairline cracks an",
        "category": "High Performance Elastomeric",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-014",
        "code": "B-2900",
        "name": "BOYSEN® Acqua Epoxy™ Acrylic Water-based Epoxy Paint",
        "desc": "**Better Exterior Durability**\n\nThe acrylic nature of BOYSEN® Acqua Epoxy™ gives it better gloss retention and resistanc",
        "category": "Industrial Coating",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-015",
        "code": "B-19-100",
        "name": "BOYSEN® Alkyd Reflectorized Traffic Paint",
        "desc": "• Contains high-index retroreflective glass beads for superior nighttime visibility and driver safety\n• Rapid track-free",
        "category": "Industrial Coating",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-016",
        "code": "B-1900",
        "name": "BOYSEN® Alkyd Traffic Paint",
        "desc": "• Heavy-duty alkyd paint formulated specifically for roadway curbs, centerlines, and parking bays\n• Superior adhesion to",
        "category": "Industrial Coating",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-017",
        "code": "B-2100",
        "name": "BOYSEN® Epoxy Enamel",
        "desc": "• High-grade two-component polyamide-cured epoxy enamel for floors, tanks, and structural steel\n• Outstanding chemical r",
        "category": "Industrial Coating",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-018",
        "code": "B-2200",
        "name": "BOYSEN® Epoxy Primer",
        "desc": "• Premium two-component polyamide-cured epoxy barrier primer for steel and concrete substrates\n• Exceptional adhesion to",
        "category": "Industrial Coating",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-019",
        "code": "B-800",
        "name": "BOYSEN® Flatwall Enamel B-800",
        "desc": "• High-solids flatwall alkyd enamel for interior wood and architectural metal\n• Gives a rich, velvety flat matte finish ",
        "category": "Industrial Coating",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-020",
        "code": "B-95",
        "name": "BOYSEN® Heat Resisting Aluminum Paint B-95",
        "desc": "• Specially formulated with heat-resisting silicone-alkyd resin and fine aluminum flakes\n• Withstands continuous service",
        "category": "Industrial Coating",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-021",
        "code": "B-307",
        "name": "BOYSEN® Plasolux Primer Surfacer B-307",
        "desc": "• High-build alkyd primer surfacer for wood and metal surfaces\n• Fills minor wood grain indentations, sanding scratches,",
        "category": "Industrial Coating",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-022",
        "code": "POWERTRACK",
        "name": "BOYSEN® Powertrack™ Hi-Performance Thermoplastic Road Marking Paint",
        "desc": "Ensures good adhesion on road surfaces and glass bead retention to maintain the required retro-reflectance values\nFast d",
        "category": "Industrial Coating",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-023",
        "code": "B-600",
        "name": "BOYSEN® Quick Drying Enamel",
        "desc": "• Premium high-gloss alkyd enamel for interior and exterior wood and metal\n• Fast drying formula: dry to touch in 2 to 3",
        "category": "Industrial Coating",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-024",
        "code": "B-310",
        "name": "BOYSEN® Red Oxide Metal Primer B-310",
        "desc": "• Standard rust-inhibitive alkyd metal primer with pure red iron oxide pigments\n• Prevents rust creep and galvanic corro",
        "category": "Industrial Coating",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-025",
        "code": "B-330",
        "name": "BOYSEN® Rust-Off™ B-330 Gray Alkyd Metal Primer",
        "desc": "**Environment-friendly**\n\nIt is formulated without lead or chromates.\n\n**Superb Corrosion Resistance**\n\nIt is developed ",
        "category": "Industrial Coating",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-026",
        "code": "HUDSON",
        "name": "Hudson® Polyurethane Floor Varnish Reducer",
        "desc": "",
        "category": "Polyurethane Coatings",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-027",
        "code": "HUDSON",
        "name": "Hudson® Polyurethane Floor Varnish Reducer",
        "desc": "",
        "category": "Polyurethane Coatings",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-028",
        "code": "B-700",
        "name": "BOYSEN® Clear Acrylic Emulsion B-700",
        "desc": "• 100% acrylic emulsion designed as a high-gloss protective clear glaze\n• Enhances sheen and color depth of interior and",
        "category": "Premium Acrylic Water Based Paints And Coatings",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-029",
        "code": "B-701 / B-715",
        "name": "BOYSEN® Permacoat™ Latex",
        "desc": "• Acid-based chemical etching solution formulated for galvanized iron (G.I.) and aluminum\n• Removes factory passivating ",
        "category": "Premium Acrylic Water Based Paints And Coatings",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-030",
        "code": "B-3101",
        "name": "BOYSEN® Permatex™ B-3101 Textured Water-based Paint",
        "desc": "• High-build water-based acrylic paint for creating decorative textured wall finishes\n• Successfully hides surface uneve",
        "category": "Premium Acrylic Water Based Paints And Coatings",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-031",
        "code": "B-2500",
        "name": "BOYSEN® Roofgard™ Gloss Acrylic Water-based Roof Paint",
        "desc": "**Excellent Adhesion**\n\nIt provides excellent adhesion on properly prepared roofing materials such as galvanized and con",
        "category": "Premium Acrylic Water Based Paints And Coatings",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-032",
        "code": "B-5715",
        "name": "BOYSEN® Wallguard™ B-5715 Dirt Resisting Exterior Latex Paint",
        "desc": "BOYSEN® Wallguard™ Dirt Resisting Latex is 100% acrylic. It is highly resistant to alkali, mildew, airborne pollutants a",
        "category": "Premium Acrylic Water Based Paints And Coatings",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-033",
        "code": "DREAMCOAT",
        "name": "Nation™ Dreamcoat™ Latex",
        "desc": "• Quality economical latex paint for interior concrete, plaster, and drywalls\n• Provides smooth, velvety matte finish wi",
        "category": "Premium Economy Paints And Coatings",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-034",
        "code": "N-FDE",
        "name": "Nation™ Fast Dry Enamel",
        "desc": "• Economical alkyd enamel paint for interior and exterior wood and metal surfaces\n• Provides a tough, washable, protecti",
        "category": "Premium Economy Paints And Coatings",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-035",
        "code": "NS-800",
        "name": "Nation™ Flatwall Enamel NS-800",
        "desc": "• Economical alkyd enamel paint for interior and exterior wood and metal surfaces\n• Provides a tough, washable, protecti",
        "category": "Premium Economy Paints And Coatings",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-036",
        "code": "NS-LATEX",
        "name": "Nation™ NS Latex",
        "desc": "• Quality economical latex paint for interior concrete, plaster, and drywalls\n• Provides smooth, velvety matte finish wi",
        "category": "Premium Economy Paints And Coatings",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-037",
        "code": "NS-610",
        "name": "Nation™ Red Oxide Metal Primer NS-610",
        "desc": "• Economical rust-inhibitive alkyd metal primer with red iron oxide pigment\n• Prevents corrosion on interior and exterio",
        "category": "Premium Economy Paints And Coatings",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-038",
        "code": "TITAN™",
        "name": "Titan™ Superflex™ Elastomeric Paint",
        "desc": "• High-build 100% elastomeric paint designed to bridge dynamic hairline cracks\n• Exceptional elasticity and elongation a",
        "category": "Premium Economy Paints And Coatings",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-039",
        "code": "B-1711",
        "name": "BOYSEN® Acrytex™ Cast B-1711",
        "desc": "• High-build acrylic paste putty for patching surface defects under Acrytex systems\n• High flexibility and bond strength",
        "category": "Preparation Chemicals",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-040",
        "code": "B-99",
        "name": "BOYSEN® Aquaseal™ B-99",
        "desc": "• Silicone-based transparent penetrating water-repellent sealer for masonry\n• Penetrates deep into capillary pores witho",
        "category": "Preparation Chemicals",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-041",
        "code": "B-7304",
        "name": "BOYSEN® Chalk Blocker™ B-7304 Masonry Surface Conditioner",
        "desc": "• Advanced water-based micro-emulsion surface conditioner for chalking masonry\n• Penetrates deeply into porous, aged, an",
        "category": "Preparation Chemicals",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-042",
        "code": "B-711",
        "name": "BOYSEN® Gypsum Joint Compound B-711",
        "desc": "• Acid-based chemical etching solution formulated for galvanized iron (G.I.) and aluminum\n• Removes factory passivating ",
        "category": "Preparation Chemicals",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-043",
        "code": "B-1205",
        "name": "BOYSEN® Lacquer Flo B-1205",
        "desc": "",
        "category": "Preparation Chemicals",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-044",
        "code": "B-306",
        "name": "BOYSEN® Lacquer Spot Putty B-306",
        "desc": "",
        "category": "Preparation Chemicals",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-045",
        "code": "B-44",
        "name": "BOYSEN® Masonry Neutralizer B-44",
        "desc": "• Concentrated acid neutralizer solution for fresh, alkaline concrete and plaster\n• Neutralizes high alkalinity (pH > 9)",
        "category": "Preparation Chemicals",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-046",
        "code": "B-7311",
        "name": "BOYSEN® Perma-Putty™ B-7312 High-Build Masonry Putty",
        "desc": "• Water-based acrylic masonry putty for repairing surface cracks, indentations, and voids\n• Excellent adhesion to concre",
        "category": "Preparation Chemicals",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-047",
        "code": "B-71",
        "name": "BOYSEN® Metal Etching Solution B-71",
        "desc": "• Acid-based chemical etching solution formulated for galvanized iron (G.I.) and aluminum\n• Removes factory passivating ",
        "category": "Preparation Chemicals",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-048",
        "code": "B-PC",
        "name": "BOYSEN® Patching Compound",
        "desc": "",
        "category": "Preparation Chemicals",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-049",
        "code": "B-7311",
        "name": "BOYSEN® Perma-Putty™ B-7312 High-Build Masonry Putty",
        "desc": "• Water-based acrylic masonry putty for repairing surface cracks, indentations, and voids\n• Excellent adhesion to concre",
        "category": "Preparation Chemicals",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-050",
        "code": "B-311",
        "name": "BOYSEN® Plasolux Glazing Putty B-311",
        "desc": "",
        "category": "Preparation Chemicals",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-051",
        "code": "B-1701 / B-1710",
        "name": "BOYSEN® Acrytex™",
        "desc": "• Specialized solvent-based acrylic paint forming a seamless, impermeable moisture barrier\n• Outstanding resistance to s",
        "category": "Solvent Based Acrylic Paint",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-052",
        "code": "B-1700",
        "name": "BOYSEN® Acrytex™ Clear Coat B-1700",
        "desc": "",
        "category": "Solvent Based Acrylic Paint",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-053",
        "code": "B-1705",
        "name": "BOYSEN® Acrytex™ Primer B-1705",
        "desc": "• Dedicated solvent-based acrylic primer for BOYSEN® Acrytex paint systems\n• Deep penetrating action seals porous masonr",
        "category": "Solvent Based Acrylic Paint",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-054",
        "code": "B-1708",
        "name": "BOYSEN® Acrytex™ Sealer B-1708",
        "desc": "• Clear solvent-based acrylic sealer designed to penetrate and consolidate chalky masonry\n• Forms an impenetrable moistu",
        "category": "Solvent Based Acrylic Paint",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-055",
        "code": "B-1750",
        "name": "BOYSEN® Acrytex™ Reducer B-1750",
        "desc": "• High-purity solvent formulated to precise evaporation rates for optimal film formation\n• Enhances paint leveling, brus",
        "category": "Thinners And Reducers",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-056",
        "code": "B-55",
        "name": "BOYSEN® Epoxy Reducer B-55",
        "desc": "• High-purity solvent formulated to precise evaporation rates for optimal film formation\n• Enhances paint leveling, brus",
        "category": "Thinners And Reducers",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-057",
        "code": "B-50",
        "name": "BOYSEN® Lacquer Thinner B-50",
        "desc": "• High-purity solvent formulated to precise evaporation rates for optimal film formation\n• Enhances paint leveling, brus",
        "category": "Thinners And Reducers",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-058",
        "code": "B-0340",
        "name": "BOYSEN® Paint Thinner B-0340",
        "desc": "• High-purity solvent formulated to precise evaporation rates for optimal film formation\n• Enhances paint leveling, brus",
        "category": "Thinners And Reducers",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "BY-059",
        "code": "HUDSON",
        "name": "Hudson® Polyurethane Floor Varnish Reducer",
        "desc": "• High-purity solvent formulated to precise evaporation rates for optimal film formation\n• Enhances paint leveling, brus",
        "category": "Thinners And Reducers",
        "packaging": "4 Liters (Gallon)",
        "casePack": "4",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      }
    ]
  },
  "sika": {
    "brandKey": "sika",
    "brandName": "Sika Philippines",
    "company": "Sika Philippines, Inc.",
    "badge": "Shopee PH / Market",
    "badgeColor": "#e2001a",
    "color": "#e2001a",
    "sourceDoc": "https://shopee.ph/list/sika",
    "effectiveDate": "Current Market 2026",
    "items": [
      {
        "id": "SK-001",
        "code": "SK-BD01",
        "name": "SikaGrout®-214",
        "desc": "High Precision, Non-Shrink, Pourable Cementitious Grout",
        "category": "Build",
        "packaging": "25 kg multi-wall bag",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-002",
        "code": "SK-BD02",
        "name": "Sika AnchorFix®-3001",
        "desc": "High-Performance Pure Epoxy Chemical Anchoring Adhesive",
        "category": "Build",
        "packaging": "250 ml, 600 ml dual cartridge",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-003",
        "code": "SK-BD03",
        "name": "Sikament®-NN",
        "desc": "High-Range Water-Reducing Concrete Superplasticizer",
        "category": "Build",
        "packaging": "20 Liter carboy, 200 Liter drum, 1,000 Liter tote",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-004",
        "code": "SK-BD04",
        "name": "Plastocrete® Plus",
        "desc": "Waterproofing Concrete Admixture with Water-Reducing Effect",
        "category": "Build",
        "packaging": "4 Liter gallon, 20 Liter pail, 200 Liter drum",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-005",
        "code": "SK-BD05",
        "name": "Sikadur®-31 CF Normal",
        "desc": "Sika Construction Solution (Rigid Bonding)",
        "category": "Build",
        "packaging": "6 kg (A+B) Pre-batched unit",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-006",
        "code": "SK-BD06",
        "name": "Sikadur®-732",
        "desc": "Sika Construction Solution (Rigid Bonding)",
        "category": "Build",
        "packaging": "5 kg set",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-007",
        "code": "SK-BD07",
        "name": "Sikadur®-20 Crack Seal",
        "desc": "Sika Construction Solution (Rigid Bonding)",
        "category": "Build",
        "packaging": "160 mL",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-008",
        "code": "SK-BD08",
        "name": "SikaGrout®-212",
        "desc": "High-Strength, Shrinkage-Compensated Cementitious Grout",
        "category": "Build",
        "packaging": "25 kg multi-wall bag",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-009",
        "code": "SK-BD09",
        "name": "SikaGrout®-215",
        "desc": "High Early Strength, Pumpable, Non-Shrink Cementitious Grout",
        "category": "Build",
        "packaging": "25 kg bag",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-010",
        "code": "SK-PR01",
        "name": "Sika®-1",
        "desc": "Sika Construction Solution (Waterproofing Systems)",
        "category": "Protect",
        "packaging": "210L/Drum and 150L/Drum",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-011",
        "code": "SK-PR02",
        "name": "SikaTop®-107 Seal PH",
        "desc": "Sika Construction Solution (Waterproofing Systems)",
        "category": "Protect",
        "packaging": "25 Kg Set",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-012",
        "code": "SK-PR03",
        "name": "Davco® K11 Superflex",
        "desc": "Sika Construction Solution (Waterproofing Systems)",
        "category": "Protect",
        "packaging": "34kg Set",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-013",
        "code": "SK-PR04",
        "name": "SikaProof®-808",
        "desc": "Sika Construction Solution (Waterproofing Systems)",
        "category": "Protect",
        "packaging": "Roll width",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-014",
        "code": "SK-PR05",
        "name": "SikaShield® W159 ED 1,5 mm",
        "desc": "Sika Construction Solution (Waterproofing Systems)",
        "category": "Protect",
        "packaging": "Roll width",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-015",
        "code": "SK-PR06",
        "name": "Sika® Hydrotite CJ",
        "desc": "Sika Construction Solution (Waterproofing Systems)",
        "category": "Protect",
        "packaging": "Profile",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-016",
        "code": "SK-PR07",
        "name": "Sika Waterbar® V VN",
        "desc": "Sika Construction Solution (Waterproofing Systems)",
        "category": "Protect",
        "packaging": "20 m rolls (other lengths on request)",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-017",
        "code": "SK-PR08",
        "name": "SikaSwell® S-2",
        "desc": "Sika Construction Solution (Waterproofing Systems)",
        "category": "Protect",
        "packaging": "300 ml cartridges",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-018",
        "code": "SK-PR09",
        "name": "Sikadur®-752",
        "desc": "Sika Construction Solution (Waterproofing Systems)",
        "category": "Protect",
        "packaging": "5 kg set",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-019",
        "code": "SK-PR10",
        "name": "Sika® Injection-201 CE",
        "desc": "Sika Construction Solution (Waterproofing Systems)",
        "category": "Protect",
        "packaging": "Part A 10 kg Part B",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-020",
        "code": "SK-PR11",
        "name": "Sika® Injection-101 AP",
        "desc": "Sika Construction Solution (Waterproofing Systems)",
        "category": "Protect",
        "packaging": "Part A (Polyol)",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-021",
        "code": "SK-PR12",
        "name": "SikaProof® Membrane (paste)",
        "desc": "Sika Construction Solution (Waterproofing Systems)",
        "category": "Protect",
        "packaging": "20 Kg Pail",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-022",
        "code": "SK-PR13",
        "name": "Sikalastic® M 689",
        "desc": "Sika Construction Solution (Waterproofing Systems)",
        "category": "Protect",
        "packaging": "Part A (Polyamine)",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-023",
        "code": "SK-PR14",
        "name": "Sikalastic® M 640",
        "desc": "Sika Construction Solution (Roof Waterproofing Systems)",
        "category": "Protect",
        "packaging": "1.0 kg, 6.0 kg and 25.0 kg metal pails",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-024",
        "code": "SK-PR15",
        "name": "Sikalastic®-590",
        "desc": "Sika Construction Solution (Roof Waterproofing Systems)",
        "category": "Protect",
        "packaging": "20 kg Plastic pails.",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-025",
        "code": "SK-PR16",
        "name": "Sikalastic® HLM 5000 R SL",
        "desc": "Sika Construction Solution (Roof Waterproofing Systems)",
        "category": "Protect",
        "packaging": "22.5 kg in big open mouth pail",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-026",
        "code": "SK-PR17",
        "name": "Sarnafil® G 410-15 L Felt",
        "desc": "Sika Construction Solution (Roof Waterproofing Systems)",
        "category": "Protect",
        "packaging": "Standard rolls are wrapped individually in a blue PE-foil.",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-027",
        "code": "SK-PR18",
        "name": "Sarnafil® S 327-15 L",
        "desc": "Sika Construction Solution (Roof Waterproofing Systems)",
        "category": "Protect",
        "packaging": "Sarnafil® S 327-15 L standard rolls are wrapped individually",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-028",
        "code": "SK-PR19",
        "name": "Sarnacol®-2152",
        "desc": "Sika Construction Solution (Roof Waterproofing Systems)",
        "category": "Protect",
        "packaging": "Component A",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-029",
        "code": "SK-PR20",
        "name": "SikaShield® P35 MG IN 3 mm",
        "desc": "Sika Construction Solution (Roof Waterproofing Systems)",
        "category": "Protect",
        "packaging": "Roll width",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-030",
        "code": "SK-PR21",
        "name": "SikaShield® P34 S 3 mm",
        "desc": "Sika Construction Solution (Roof Waterproofing Systems)",
        "category": "Protect",
        "packaging": "Roll width",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-031",
        "code": "SK-PR22",
        "name": "Sikagard®-62",
        "desc": "Sika Construction Solution (Chemical Resistant Coatings)",
        "category": "Protect",
        "packaging": "Part A 7.5 Kg",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-032",
        "code": "SK-PR23",
        "name": "Sikacrete-213 FMY",
        "desc": "Sika Construction Solution (Fire Protection Systems)",
        "category": "Protect",
        "packaging": "12 kg bag on pallet of 54 bags",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-033",
        "code": "SK-PR24",
        "name": "Sikaflex®-400 Fire",
        "desc": "Sika Construction Solution (Fire Protection Systems)",
        "category": "Protect",
        "packaging": "600 ml foil pack, 20 foil packs per box",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-034",
        "code": "SK-PR25",
        "name": "Sikacryl®-620 Fire",
        "desc": "Sika Construction Solution (Fire Protection Systems)",
        "category": "Protect",
        "packaging": "600 ml foil pack, 12 foil packs per box",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-035",
        "code": "SK-FN01",
        "name": "Sikaflex®-11 FC+",
        "desc": "1-Component Multipurpose Polyurethane Sealant & Elastic Adhesive",
        "category": "Finish",
        "packaging": "310 ml cartridge, 600 ml sausage",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-036",
        "code": "SK-FN02",
        "name": "Sikafloor®-263 SL",
        "desc": "2-Component Self-Smoothing and Broadcast Epoxy Floor Resin",
        "category": "Finish",
        "packaging": "20 kg set (Part A: 15.8 kg + Part B: 4.2 kg)",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-037",
        "code": "SK-FN03",
        "name": "SikaCeram®-88",
        "desc": "Water-Resistant Cementitious Tile Adhesive for Ceramic Tiles",
        "category": "Finish",
        "packaging": "25 kg bag",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-038",
        "code": "SK-FN04",
        "name": "SikaHyflex®-250 Facade",
        "desc": "Sika Construction Solution (Joint Sealing & Elastic Caulking)",
        "category": "Finish",
        "packaging": "600 ml foil pack, 20 foil packs per box",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-039",
        "code": "SK-FN05",
        "name": "Sika® Boom AP",
        "desc": "Sika Construction Solution (Joint Sealing & Elastic Caulking)",
        "category": "Finish",
        "packaging": "Available in 500ml & 750ml",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-040",
        "code": "SK-FN06",
        "name": "Sikaflex®-140 Construction",
        "desc": "Sika Construction Solution (Joint Sealing & Elastic Caulking)",
        "category": "Finish",
        "packaging": "600 ml cylindrical foil pack: 20 foil packs per box",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-041",
        "code": "SK-FN07",
        "name": "Sikaflex® PRO-3",
        "desc": "Sika Construction Solution (Joint Sealing & Elastic Caulking)",
        "category": "Finish",
        "packaging": "600 ml foil pack, 20 foil packs per box",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-042",
        "code": "SK-FN08",
        "name": "Sikasil®-728 SL",
        "desc": "Sika Construction Solution (Joint Sealing & Elastic Caulking)",
        "category": "Finish",
        "packaging": "17 L (4.5 US gal.) pail",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-043",
        "code": "SK-FN09",
        "name": "Sika® Backer Rod PH",
        "desc": "Sika Construction Solution (Joint Sealing & Elastic Caulking)",
        "category": "Finish",
        "packaging": "200 piece / pack",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-044",
        "code": "SK-FN10",
        "name": "Sika® MultiSeal AP",
        "desc": "Sika Construction Solution (Joint Sealing & Elastic Caulking)",
        "category": "Finish",
        "packaging": "Length per roll",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-045",
        "code": "SK-FN11",
        "name": "Sika® Primer-3 N",
        "desc": "Sika Construction Solution (Joint Sealing & Elastic Caulking)",
        "category": "Finish",
        "packaging": "1 Liter bottle (4 bottles per box)",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-046",
        "code": "SK-FN12",
        "name": "SikaTile®-480 Dustless Premium Tile Adhesive",
        "desc": "Sika Construction Solution (Tile Setting Systems)",
        "category": "Finish",
        "packaging": "25 kg per bag",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-047",
        "code": "SK-FN13",
        "name": "SikaTile®-390 Heavy Duty Tile Adhesive",
        "desc": "Sika Construction Solution (Tile Setting Systems)",
        "category": "Finish",
        "packaging": "25 kg per bag",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-048",
        "code": "SK-FN14",
        "name": "SikaTile®-330 Regular Tile Adhesive",
        "desc": "Sika Construction Solution (Tile Setting Systems)",
        "category": "Finish",
        "packaging": "25 kg per bag",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-049",
        "code": "SK-FN15",
        "name": "SikaTile®-300 Standard Tile Adhesive",
        "desc": "Sika Construction Solution (Tile Setting Systems)",
        "category": "Finish",
        "packaging": "25 kg per bag",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-050",
        "code": "SK-FN16",
        "name": "SikaWall®-101 PH",
        "desc": "Sika Construction Solution (Plastering & Skimcoat Systems)",
        "category": "Finish",
        "packaging": "5 kg, 20 kg, 25 kg",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-051",
        "code": "SK-FN17",
        "name": "SikaWall®-103 PH",
        "desc": "Sika Construction Solution (Plastering & Skimcoat Systems)",
        "category": "Finish",
        "packaging": "5 kg pail, 20 kg pail, 25 kg pail",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-052",
        "code": "SK-FN18",
        "name": "SikaWall®-110 Superfine Skimcoat",
        "desc": "Sika Construction Solution (Plastering & Skimcoat Systems)",
        "category": "Finish",
        "packaging": "20 kg",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-053",
        "code": "SK-FN19",
        "name": "SikaWall®-113 Rendering Mortar",
        "desc": "Sika Construction Solution (Plastering & Skimcoat Systems)",
        "category": "Finish",
        "packaging": "25 kg per bag",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-054",
        "code": "SK-FN20",
        "name": "Sikafloor®-161",
        "desc": "2-Component Low-Viscosity Epoxy Primer & Leveling Binder",
        "category": "Finish",
        "packaging": "10 kg / 30 kg set (Part A: 23.7 kg + Part B: 6.3 kg)",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-055",
        "code": "SK-FN21",
        "name": "Sikafloor®-2540 W",
        "desc": "2-Component Water-Dispersed Epoxy Floor Coating",
        "category": "Finish",
        "packaging": "18 kg set (Part A: 13 kg + Part B: 5 kg)",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-056",
        "code": "SK-RP01",
        "name": "Sika® MonoTop®-615",
        "desc": "High-Build Polymer-Modified Structural Concrete Repair Mortar",
        "category": "Repair",
        "packaging": "25 kg bag",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-057",
        "code": "SK-RP02",
        "name": "SikaTop®-122",
        "desc": "Sika Construction Solution (Concrete Repair & Crack Injection)",
        "category": "Repair",
        "packaging": "29 kg: A (4 kg) + B (25 kg)",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-058",
        "code": "SK-RP03",
        "name": "SikaTop®-121",
        "desc": "Sika Construction Solution (Concrete Repair & Crack Injection)",
        "category": "Repair",
        "packaging": "25kg (A+B Set)",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-059",
        "code": "SK-RP04",
        "name": "Sika® CarboDur® S",
        "desc": "Sika Construction Solution (Structural Strengthening (CFRP))",
        "category": "Repair",
        "packaging": "100 meter per roll",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-060",
        "code": "SK-RP05",
        "name": "SikaWrap®-230 C",
        "desc": "Sika Construction Solution (Structural Strengthening (CFRP))",
        "category": "Repair",
        "packaging": "Fabric length per roll",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-061",
        "code": "SK-RP06",
        "name": "SikaWrap®-300 C",
        "desc": "Sika Construction Solution (Structural Strengthening (CFRP))",
        "category": "Repair",
        "packaging": "Fabric length per roll",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-062",
        "code": "SK-RP07",
        "name": "SikaWrap®-600 C",
        "desc": "Sika Construction Solution (Structural Strengthening (CFRP))",
        "category": "Repair",
        "packaging": "Fabric length per roll",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-063",
        "code": "SK-RP08",
        "name": "SikaWrap®-430 G",
        "desc": "Sika Construction Solution (Structural Strengthening (CFRP))",
        "category": "Repair",
        "packaging": "Fabric length per roll",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-064",
        "code": "SK-RP09",
        "name": "SikaWrap®-930 G",
        "desc": "Sika Construction Solution (Structural Strengthening (CFRP))",
        "category": "Repair",
        "packaging": "Fabric length per roll",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-065",
        "code": "SK-RP10",
        "name": "Sikadur®-30",
        "desc": "Sika Construction Solution (Structural Strengthening (CFRP))",
        "category": "Repair",
        "packaging": "6 kg (A+B)",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-066",
        "code": "SK-RP11",
        "name": "Sikadur®-330",
        "desc": "Sika Construction Solution (Structural Strengthening (CFRP))",
        "category": "Repair",
        "packaging": "5 kg (A+B) Pre-batched unit",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-067",
        "code": "SK-RP12",
        "name": "Sikadur®-300",
        "desc": "Sika Construction Solution (Structural Strengthening (CFRP))",
        "category": "Repair",
        "packaging": "30 kg / set",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      },
      {
        "id": "SK-068",
        "code": "SK-RP13",
        "name": "Sika® MonoTop®-610",
        "desc": "Bonding Primer & Reinforcement Anti-Corrosion Protection Slurry",
        "category": "Repair",
        "packaging": "25 kg bag",
        "casePack": "1",
        "srp": null,
        "casePrice": null,
        "moq": "",
        "remarks": "Pending Quotation"
      }
    ]
  }
};

class SupplierPriceListManager {
  constructor() {
    this.STORAGE_KEY = 'fcl_supplier_pricelists_v2';
    this.data = this.loadData();
    this.activeBrand = 'buildrite';
    this.activeCategory = 'all';
    this.activeStatus = 'all';
    this.searchQuery = '';
    this.sortField = null;
    this.sortOrder = 'asc';
    this.editingCell = null;
  }

  loadData() {
    if (typeof localStorage === 'undefined') {
      return JSON.parse(JSON.stringify(MASTER_SUPPLIER_CATALOGS));
    }
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = jsonParseSafe(stored);
        if (parsed && typeof parsed === 'object') {
          // Verify that all 5 brands exist
          let valid = true;
          for (const k of ['buildrite', 'bostik', 'davies', 'boysen', 'sika']) {
            if (!parsed[k] || !Array.isArray(parsed[k].items)) {
              valid = false;
              break;
            }
          }
          if (valid) return parsed;
        }
      }
    } catch (e) {
      console.warn('LocalStorage error, fallback to master catalogs:', e);
    }
    // Deep clone master
    return JSON.parse(JSON.stringify(MASTER_SUPPLIER_CATALOGS));
  }

  saveData() {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
      this.showToast('All changes auto-saved to storage', 'success');
      this.updateKpis();
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
      this.showToast('Storage save failed (Storage full)', 'error');
    }
  }

  resetBrandToMaster(brandKey) {
    const brandNames = {
      buildrite: 'Buildrite Chemicals',
      bostik: 'Bostik Philippines',
      davies: 'Davies Paints',
      boysen: 'Pacific Paint (Boysen)',
      sika: 'Sika Philippines'
    };
    const bName = brandNames[brandKey] || brandKey;
    if (!confirm(`Are you sure you want to reset all rates and items for ${bName} back to the standard manufacturer baseline?`)) {
      return;
    }
    this.data[brandKey] = JSON.parse(JSON.stringify(MASTER_SUPPLIER_CATALOGS[brandKey]));
    this.saveData();
    this.render();
    this.showToast('Brand rates restored to master baseline', 'info');
  }

  getBrandData(brandKey = this.activeBrand) {
    return this.data[brandKey] || this.data['buildrite'];
  }

  setBrand(brandKey) {
    if (!this.data[brandKey]) return;
    this.activeBrand = brandKey;
    this.activeCategory = 'all';
    this.activeStatus = 'all';
    this.searchQuery = '';
    const searchInput = document.getElementById('pricelistSearchInput');
    if (searchInput) searchInput.value = '';
    this.render();
  }

  setCategory(catName) {
    this.activeCategory = catName;
    this.renderCategoryPills();
    this.renderTableOnly();
  }

  setStatus(status) {
    this.activeStatus = status;
    document.querySelectorAll('.status-pill').forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-status') === status);
    });
    this.renderTableOnly();
  }

  setSearch(query) {
    this.searchQuery = (query || '').trim().toLowerCase();
    this.renderTableOnly();
  }

  setSort(field) {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }
    this.renderTableOnly();
  }

  updateItemField(brandKey, itemId, field, rawValue) {
    const brand = this.data[brandKey];
    if (!brand) return;
    const item = brand.items.find(i => i.id === itemId);
    if (!item) return;

    let val = rawValue;
    if (field === 'srp' || field === 'casePrice') {
      if (val === '' || val === null || val === undefined) {
        val = null;
      } else {
        const num = parseFloat(String(val).replace(/[^0-9.-]+/g, ''));
        val = isNaN(num) ? null : Math.round(num * 100) / 100;
      }
    }

    item[field] = val;

    // Auto-calculate case price if SRP updated and casePack > 1
    if (field === 'srp' && val !== null) {
      const packNum = parseFloat(item.casePack) || 1;
      if (packNum > 1 && (!item.casePrice || item.casePrice === 0)) {
        item.casePrice = Math.round(val * packNum * 100) / 100;
      }
    }

    this.saveData();
    this.renderTableOnly();
  }

  addNewItem(brandKey = this.activeBrand) {
    const brand = this.data[brandKey];
    if (!brand) return;

    const brandPrefixes = {
      buildrite: 'BR',
      bostik: 'BK',
      davies: 'DV',
      boysen: 'BY',
      sika: 'SK'
    };
    const prefix = brandPrefixes[brandKey] || 'PR';
    const newId = `${prefix}-${Date.now().toString().slice(-4)}`;

    const defaultCat = this.activeCategory !== 'all' 
      ? this.activeCategory 
      : (brand.items[0]?.category || 'General Products');

    const newItem = {
      id: newId,
      code: 'NEW-001',
      name: 'New Product Item',
      desc: 'Product description and specifications',
      category: defaultCat,
      packaging: '1 Gallon / Unit',
      casePack: '1',
      srp: null,
      casePrice: null,
      moq: '',
      remarks: 'User Added'
    };

    brand.items.unshift(newItem);
    this.saveData();
    this.render();
    this.showToast('New product added. Click any cell to edit details.', 'info');
  }

  deleteItem(brandKey, itemId) {
    const brand = this.data[brandKey];
    if (!brand) return;
    const idx = brand.items.findIndex(i => i.id === itemId);
    if (idx === -1) return;

    const itemName = brand.items[idx].name;
    if (confirm(`Remove product "${itemName}" from ${brand.brandName} catalog?`)) {
      brand.items.splice(idx, 1);
      this.saveData();
      this.render();
      this.showToast(`Removed "${itemName}"`, 'info');
    }
  }

  async exportToExcel(brandKey = this.activeBrand) {
    const brand = this.data[brandKey];
    if (!brand) return;

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
          const sh = wb.getWorksheet(1);
          if (sh) {
            const cleanSheetName = (brand.brandName || 'PriceList')
              .replace(/[\\/?*:[\]]/g, '_')
              .substring(0, 30);
            sh.name = cleanSheetName;

            // Header Title and Control Metadata
            sh.getCell('D1').value = `PRICE LIST - ${(brand.brandName || '').toUpperCase()}`;
            sh.getCell('I3').value = brand.effectiveDate || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

            const items = brand.items || [];
            const oldRowCount = sh.rowCount;

            items.forEach((it, idx) => {
              const r = 12 + idx;
              const row = sh.getRow(r);
              row.getCell(1).value = it.code || '';
              row.getCell(2).value = it.name || '';
              row.getCell(3).value = it.category || '';
              row.getCell(4).value = it.desc || '';
              row.getCell(5).value = it.packaging || '';
              row.getCell(6).value = it.casePack !== undefined && it.casePack !== '' ? (parseFloat(it.casePack) || 1) : 1;

              const srpVal = it.srp !== null && it.srp !== undefined && it.srp !== '' ? parseFloat(it.srp) : null;
              row.getCell(7).value = srpVal;
              if (srpVal !== null) row.getCell(7).numFmt = '₱#,##0.00';

              const caseVal = it.casePrice !== null && it.casePrice !== undefined && it.casePrice !== '' ? parseFloat(it.casePrice) : null;
              row.getCell(8).value = caseVal;
              if (caseVal !== null) row.getCell(8).numFmt = '₱#,##0.00';

              row.getCell(9).value = it.moq || '';
              row.getCell(10).value = it.remarks || '';
              row.commit();
            });

            const newLastRow = Math.max(12, 11 + items.length);

            // Blank out remaining rows from original template if items < original rowCount
            if (oldRowCount > newLastRow) {
              for (let r = newLastRow + 1; r <= oldRowCount; r++) {
                const row = sh.getRow(r);
                row.values = [];
              }
            }

            // Adjust Table1 range if present
            if (sh.tables && sh.tables.Table1 && sh.tables.Table1.table) {
              sh.tables.Table1.table.tableRef = `A11:J${newLastRow}`;
              sh.tables.Table1.table.autoFilterRef = `A11:J${newLastRow}`;
            }

            const outBuf = await wb.xlsx.writeBuffer();
            const blob = new Blob([outBuf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            const safeBrand = brand.brandName.toLowerCase().replace(/[^a-z0-9]/g, '_');
            a.href = url;
            a.download = `${safeBrand}_pricelist_2026.xlsx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            this.showToast(`Exported ${brand.brandName} price list to FCL Excel Template (.xlsx)`, 'success');
            return;
          }
        }
      }
    } catch (err) {
      console.warn('ExcelJS template export failed, falling back to CSV:', err);
    }

    // Graceful CSV Fallback
    const headers = [
      'Item Code',
      'Product Name',
      'Category',
      'Description',
      'Packaging / Unit',
      'Case Pack',
      'Unit SRP (PHP Vat-In)',
      'Case Price (PHP Vat-In)',
      'MOQ',
      'Remarks / Status'
    ];

    const rows = (brand.items || []).map(it => [
      it.code || '',
      it.name || '',
      it.category || '',
      it.desc || '',
      it.packaging || '',
      it.casePack || '1',
      it.srp !== null && it.srp !== undefined ? it.srp.toFixed(2) : '',
      it.casePrice !== null && it.casePrice !== undefined ? it.casePrice.toFixed(2) : '',
      it.moq || '',
      it.remarks || ''
    ]);

    const csvContent = [
      headers.map(h => `"${h.replace(/"/g, '""')}"`).join(','),
      ...rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(','))
    ].join('\r\n');

    // UTF-8 BOM for Microsoft Excel
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const safeBrand = brand.brandName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    a.href = url;
    a.download = `${safeBrand}_pricelist_2026.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showToast(`Exported ${brand.brandName} price list to Excel CSV`, 'info');
  }

  printCatalog(brandKey = this.activeBrand) {
    if (typeof window !== 'undefined') window.print();
  }

  // --- EXCEL / CSV BATCH IMPORT TOOL ENGINE ---

  downloadSampleTemplate() {
    const headers = [
      'Item Code',
      'Product Name',
      'Category',
      'Description',
      'Packaging / Unit',
      'Case Pack',
      'Unit SRP (PHP Vat-In)',
      'Case Price (PHP Vat-In)',
      'Coverage (sq.m/unit)',
      'Default Coats',
      'MOQ',
      'Remarks'
    ];

    const sampleRows = [
      ['BY-NEW-01', 'BOYSEN® Cool Shades™ Heat Reflective Paint', 'Topcoat / Finish', 'Heat-reflecting water-based roof coating', '4 Liters (Gallon)', '4', '895.00', '3580.00', '25.0', '2', '1 Gallon', 'New Summer 2026 Promo'],
      ['BR-NEW-02', 'Buildrite Sapal 2K Flexible Slurry', 'Waterproofing Systems', 'Two-component cementitious waterproofing slurry', '20kg Kit', '1', '1650.00', '1650.00', '18.0', '2', '1 Kit', 'For Roof Deck & Balcony'],
      ['DV-NEW-03', 'Davies Sun & Rain Elastomeric Topcoat', 'Topcoat / Finish', '100% acrylic elastomeric paint', '16 Liters (Pail)', '1', '3250.00', '3250.00', '80.0', '2', '1 Pail', 'Self-Priming Exterior'],
      ['SK-NEW-04', 'Sika MonoTop-612 High Performance Mortar', 'Structural Repair', 'Fiber-reinforced structural repair mortar', '25kg Bag', '1', '1280.00', '1280.00', '15.0', '1', '1 Bag', 'R4 Class Structural'],
      ['BK-NEW-05', 'Bostik Seal N Flex 1 Polyurethane', 'Joint Sealants', 'Low modulus PU architectural sealant', '600ml Sausage', '20', '385.00', '7700.00', '12.0', '1', '1 Sausage', 'Expansion Joints']
    ];

    const csvContent = [
      headers.map(h => `"${h.replace(/"/g, '""')}"`).join(','),
      ...sampleRows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(','))
    ].join('\r\n');

    if (typeof Blob !== 'undefined' && typeof document !== 'undefined') {
      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'VKBConstPro_Pricelist_Template.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      this.showToast('Downloaded sample CSV template', 'info');
    }
    return csvContent;
  }

  parseCsvContent(text) {
    if (!text || typeof text !== 'string') return [];
    // Strip UTF-8 BOM
    let clean = text.replace(/^\uFEFF/, '').trim();
    if (!clean) return [];

    // Detect delimiter from first non-empty line
    const firstLine = clean.split(/\r\n|\r|\n/)[0] || '';
    let delimiter = ',';
    const tabCount = (firstLine.match(/\t/g) || []).length;
    const semiCount = (firstLine.match(/;/g) || []).length;
    const commaCount = (firstLine.match(/,/g) || []).length;
    if (tabCount > commaCount && tabCount > semiCount) delimiter = '\t';
    else if (semiCount > commaCount && semiCount > tabCount) delimiter = ';';

    const rows = [];
    let currentRow = [];
    let currentCell = '';
    let inQuotes = false;
    let i = 0;
    const len = clean.length;

    while (i < len) {
      const char = clean[i];
      const nextChar = clean[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // Escaped quote
          currentCell += '"';
          i += 2;
          continue;
        } else {
          // Toggle quote mode
          inQuotes = !inQuotes;
          i++;
          continue;
        }
      }

      if (!inQuotes && char === delimiter) {
        currentRow.push(currentCell.trim());
        currentCell = '';
        i++;
        continue;
      }

      if (!inQuotes && (char === '\r' || char === '\n')) {
        currentRow.push(currentCell.trim());
        if (currentRow.some(cell => cell.length > 0)) {
          rows.push(currentRow);
        }
        currentRow = [];
        currentCell = '';
        if (char === '\r' && nextChar === '\n') {
          i += 2;
        } else {
          i++;
        }
        continue;
      }

      currentCell += char;
      i++;
    }

    if (currentCell.length > 0 || currentRow.length > 0) {
      currentRow.push(currentCell.trim());
      if (currentRow.some(cell => cell.length > 0)) {
        rows.push(currentRow);
      }
    }

    return rows;
  }

  detectColumnMapping(headerCells) {
    if (!Array.isArray(headerCells)) return {};
    const mapping = {};
    const norm = headerCells.map(h => (h || '').toString().toLowerCase().trim().replace(/[^a-z0-9]/g, ''));

    norm.forEach((h, idx) => {
      if (mapping.code === undefined && (h === 'code' || h === 'itemcode' || h === 'sku' || h === 'partno' || h === 'id' || h === 'itemno')) {
        mapping.code = idx;
      } else if (mapping.name === undefined && (h === 'productname' || h === 'name' || h === 'product' || h === 'itemname' || h === 'title')) {
        mapping.name = idx;
      } else if (mapping.category === undefined && (h === 'category' || h === 'cat' || h === 'classification' || h === 'group' || h === 'scope' || h === 'type' || h === 'helper')) {
        mapping.category = idx;
      } else if (mapping.desc === undefined && (h === 'desc' || h === 'description' || h === 'specs' || h === 'details' || h === 'specification')) {
        mapping.desc = idx;
      } else if (mapping.packaging === undefined && (h === 'packaging' || h === 'package' || h === 'unit' || h === 'packagingunit' || h === 'pack' || h === 'size')) {
        mapping.packaging = idx;
      } else if (mapping.casePack === undefined && (h === 'casepack' || h === 'packsize' || h === 'caseqty' || h === 'qtypercase' || h === 'pcsperbox')) {
        mapping.casePack = idx;
      } else if (mapping.srp === undefined && (h === 'unitsrp' || h === 'srp' || h === 'unitprice' || h === 'price' || h === 'retail' || h === 'unitcost' || h === 'vatin')) {
        mapping.srp = idx;
      } else if (mapping.casePrice === undefined && (h === 'caseprice' || h === 'boxprice' || h === 'casesrp')) {
        mapping.casePrice = idx;
      } else if (mapping.coverage === undefined && (h === 'coverage' || h === 'spread' || h === 'coverageperunit' || h === 'yield' || h === 'sqmunit')) {
        mapping.coverage = idx;
      } else if (mapping.coats === undefined && (h === 'coats' || h === 'defaultcoats' || h === 'coat' || h === 'noofcoats')) {
        mapping.coats = idx;
      } else if (mapping.moq === undefined && (h === 'moq' || h === 'minorder' || h === 'minimumorder')) {
        mapping.moq = idx;
      } else if (mapping.remarks === undefined && (h === 'remarks' || h === 'notes' || h === 'status' || h === 'comment')) {
        mapping.remarks = idx;
      } else if (mapping.brand === undefined && (h === 'brand' || h === 'brandname' || h === 'manufacturer')) {
        mapping.brand = idx;
      }
    });

    // Fallbacks if headers didn't match standard names
    if (mapping.code === undefined) {
      if (norm[0] && norm[0].includes('code')) mapping.code = 0;
    }
    if (mapping.name === undefined) {
      if (headerCells[1]) mapping.name = 1;
    }
    if (mapping.srp === undefined) {
      const pIdx = norm.findIndex(n => n.includes('srp') || n.includes('price') || n.includes('cost'));
      if (pIdx !== -1) mapping.srp = pIdx;
    }

    return mapping;
  }

  openImportModal(defaultBrand = this.activeBrand) {
    if (typeof document === 'undefined') return;
    const modal = document.getElementById('modalImportPricelist');
    if (!modal) return;

    this.pendingImport = null;
    const brandSelect = document.getElementById('importTargetBrandSelect');
    if (brandSelect) {
      brandSelect.value = defaultBrand || this.activeBrand || 'buildrite';
    }

    const previewWrap = document.getElementById('importPreviewContainer');
    if (previewWrap) previewWrap.style.display = 'none';

    const btnConfirm = document.getElementById('btnConfirmPricelistImport');
    if (btnConfirm) {
      btnConfirm.disabled = true;
      btnConfirm.textContent = 'Confirm & Import Data';
    }

    const fileInput = document.getElementById('importPricelistFileInput');
    if (fileInput) fileInput.value = '';

    const dropzone = document.getElementById('importDropzone');
    if (dropzone) {
      dropzone.classList.remove('has-file');
      const filenameLabel = document.getElementById('importDropzoneFilename');
      if (filenameLabel) filenameLabel.textContent = 'Drag & drop your Excel CSV / TSV file here, or click to browse';
    }

    modal.style.display = 'flex';
    modal.classList.add('active');
  }

  closeImportModal() {
    if (typeof document === 'undefined') return;
    const modal = document.getElementById('modalImportPricelist');
    if (!modal) return;
    modal.style.display = 'none';
    modal.classList.remove('active');
    this.pendingImport = null;
  }

  handleFileSelect(file) {
    if (!file) return;
    const dropzone = document.getElementById('importDropzone');
    const filenameLabel = document.getElementById('importDropzoneFilename');
    if (dropzone) dropzone.classList.add('has-file');
    if (filenameLabel) filenameLabel.textContent = `Selected: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        this.processImportText(text, file.name);
      } catch (err) {
        console.error('File reading error:', err);
        this.showToast('Failed to parse file: ' + err.message, 'error');
      }
    };
    reader.onerror = () => {
      this.showToast('Error reading uploaded file.', 'error');
    };
    reader.readAsText(file);
  }

  processImportText(text, fileName = 'Imported_Data.csv') {
    const rows = this.parseCsvContent(text);
    if (!rows || rows.length < 2) {
      this.showToast('File must contain a header row and at least 1 data row.', 'error');
      return null;
    }

    const headerRow = rows[0];
    const mapping = this.detectColumnMapping(headerRow);
    const dataRows = rows.slice(1);

    const brandSelect = typeof document !== 'undefined' ? document.getElementById('importTargetBrandSelect') : null;
    let targetBrand = brandSelect ? brandSelect.value : (this.activeBrand || 'buildrite');

    const currentCatalog = this.data[targetBrand] ? this.data[targetBrand].items : [];

    const parsedItems = [];
    let updatedCount = 0;
    let newCount = 0;

    dataRows.forEach((row, rowIdx) => {
      if (!row.some(c => c && c.trim().length > 0)) return;

      const codeRaw = mapping.code !== undefined ? row[mapping.code] : '';
      const nameRaw = mapping.name !== undefined ? row[mapping.name] : '';
      const catRaw = mapping.category !== undefined ? row[mapping.category] : '';
      const descRaw = mapping.desc !== undefined ? row[mapping.desc] : '';
      const pkgRaw = mapping.packaging !== undefined ? row[mapping.packaging] : '';
      const packRaw = mapping.casePack !== undefined ? row[mapping.casePack] : '1';
      const srpRaw = mapping.srp !== undefined ? row[mapping.srp] : '';
      const casePriceRaw = mapping.casePrice !== undefined ? row[mapping.casePrice] : '';
      const covRaw = mapping.coverage !== undefined ? row[mapping.coverage] : '';
      const coatRaw = mapping.coats !== undefined ? row[mapping.coats] : '1';
      const moqRaw = mapping.moq !== undefined ? row[mapping.moq] : '';
      const remarksRaw = mapping.remarks !== undefined ? row[mapping.remarks] : '';

      if (!nameRaw && !codeRaw) return;

      // Clean SRP
      let srp = null;
      if (srpRaw !== '' && srpRaw !== null && srpRaw !== undefined) {
        const num = parseFloat(String(srpRaw).replace(/[^0-9.-]+/g, ''));
        srp = isNaN(num) ? null : Math.round(num * 100) / 100;
      }

      // Clean Case Price
      let casePrice = null;
      if (casePriceRaw !== '' && casePriceRaw !== null && casePriceRaw !== undefined) {
        const num = parseFloat(String(casePriceRaw).replace(/[^0-9.-]+/g, ''));
        casePrice = isNaN(num) ? null : Math.round(num * 100) / 100;
      }

      // Auto-calculate case price if missing
      const packNum = parseFloat(packRaw) || 1;
      if (srp !== null && packNum > 1 && (casePrice === null || casePrice === 0)) {
        casePrice = Math.round(srp * packNum * 100) / 100;
      }

      const itemCode = (codeRaw || '').trim();
      const itemName = (nameRaw || '').trim();

      // Check if SKU exists in current target brand catalog
      const existing = itemCode
        ? currentCatalog.find(i => i.code && i.code.toLowerCase() === itemCode.toLowerCase())
        : currentCatalog.find(i => i.name && i.name.toLowerCase() === itemName.toLowerCase());

      const status = existing ? 'update' : 'new';
      if (status === 'update') updatedCount++; else newCount++;

      const brandPrefixes = { buildrite: 'BR', bostik: 'BK', davies: 'DV', boysen: 'BY', sika: 'SK' };
      const prefix = brandPrefixes[targetBrand] || 'PR';
      const fallbackId = `${prefix}-${Date.now().toString().slice(-4)}-${rowIdx + 1}`;

      parsedItems.push({
        id: existing ? existing.id : fallbackId,
        code: itemCode || (existing ? existing.code : `NEW-${rowIdx + 1}`),
        name: itemName || (existing ? existing.name : 'Unnamed Product'),
        desc: descRaw || (existing ? existing.desc : ''),
        category: catRaw || (existing ? existing.category : 'General Products'),
        packaging: pkgRaw || (existing ? existing.packaging : 'Unit'),
        casePack: packRaw || (existing ? existing.casePack : '1'),
        srp: srp !== null ? srp : (existing ? existing.srp : null),
        casePrice: casePrice !== null ? casePrice : (existing ? existing.casePrice : null),
        coverage: covRaw ? parseFloat(covRaw) : (existing && existing.coverage ? existing.coverage : 25.0),
        coats: coatRaw ? parseInt(coatRaw, 10) : (existing && existing.coats ? existing.coats : 1),
        moq: moqRaw || (existing ? existing.moq : ''),
        remarks: remarksRaw || (status === 'new' ? 'Imported from Excel' : (existing ? existing.remarks : '')),
        status: status
      });
    });

    this.pendingImport = {
      brandKey: targetBrand,
      fileName: fileName,
      items: parsedItems,
      totalCount: parsedItems.length,
      newCount: newCount,
      updatedCount: updatedCount,
      mapping: mapping
    };

    if (typeof document !== 'undefined') {
      this.renderImportPreview();
    }

    return this.pendingImport;
  }

  renderImportPreview() {
    if (!this.pendingImport || typeof document === 'undefined') return;
    const { items, totalCount, newCount, updatedCount, brandKey } = this.pendingImport;

    const previewContainer = document.getElementById('importPreviewContainer');
    const badgeTotal = document.getElementById('importBadgeTotal');
    const badgeNew = document.getElementById('importBadgeNew');
    const badgeUpdate = document.getElementById('importBadgeUpdate');
    const tableBody = document.getElementById('importPreviewTableBody');
    const btnConfirm = document.getElementById('btnConfirmPricelistImport');

    if (previewContainer) previewContainer.style.display = 'block';
    if (badgeTotal) badgeTotal.textContent = `${totalCount} rows ready`;
    if (badgeNew) badgeNew.textContent = `${newCount} new items`;
    if (badgeUpdate) badgeUpdate.textContent = `${updatedCount} updates`;

    if (btnConfirm) {
      btnConfirm.disabled = totalCount === 0;
      const bName = this.data[brandKey]?.brandName || brandKey;
      btnConfirm.textContent = `Confirm & Import ${totalCount} Items into ${bName}`;
    }

    if (tableBody) {
      const previewRows = items.slice(0, 15);
      tableBody.innerHTML = previewRows.map((it, idx) => {
        const isUpdate = it.status === 'update';
        const statusBadge = isUpdate
          ? `<span class="preview-badge badge-update">UPDATE (SKU ${escapeHtml(it.code)})</span>`
          : `<span class="preview-badge badge-new">+ NEW ITEM</span>`;

        const srpText = it.srp !== null && it.srp !== undefined
          ? `₱${parseFloat(it.srp).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
          : '<span style="color:#94a3b8;">Pending</span>';

        return `
          <tr>
            <td style="text-align:center; font-size:0.75rem; color:#64748b;">${idx + 1}</td>
            <td style="font-family:monospace; font-weight:700; font-size:0.78rem; color:#0f172a;">${escapeHtml(it.code || '—')}</td>
            <td style="font-weight:600; font-size:0.8rem; color:#1e293b;">
              ${escapeHtml(it.name)}
              ${it.desc ? `<div style="font-size:0.7rem; color:#64748b; font-weight:normal;">${escapeHtml(it.desc)}</div>` : ''}
            </td>
            <td><span class="cat-pill-cell" style="font-size:0.7rem;">${escapeHtml(it.category)}</span></td>
            <td style="font-size:0.78rem;">${escapeHtml(it.packaging)}</td>
            <td style="text-align:right; font-weight:700; font-size:0.8rem; color:#059669;">${srpText}</td>
            <td style="text-align:center;">${statusBadge}</td>
          </tr>
        `;
      }).join('');

      if (items.length > 15) {
        tableBody.innerHTML += `
          <tr>
            <td colspan="7" style="text-align:center; padding:0.6rem; font-size:0.75rem; color:#64748b; background:#f8fafc;">
              ... and ${items.length - 15} more rows will be imported
            </td>
          </tr>
        `;
      }
    }
  }

  confirmImport() {
    if (!this.pendingImport || !this.pendingImport.items || this.pendingImport.items.length === 0) {
      this.showToast('No items to import.', 'error');
      return;
    }

    const { brandKey, items, totalCount, newCount, updatedCount } = this.pendingImport;
    const brand = this.data[brandKey];
    if (!brand) {
      this.showToast(`Catalog ${brandKey} not found.`, 'error');
      return;
    }

    const comparisonItemsToRegister = [];

    items.forEach(it => {
      // Check existing in catalog
      const existingIdx = brand.items.findIndex(i => 
        (it.code && i.code && i.code.toLowerCase() === it.code.toLowerCase()) ||
        (i.name && i.name.toLowerCase() === it.name.toLowerCase())
      );

      if (existingIdx !== -1) {
        // Update existing
        const target = brand.items[existingIdx];
        if (it.name) target.name = it.name;
        if (it.desc) target.desc = it.desc;
        if (it.category) target.category = it.category;
        if (it.packaging) target.packaging = it.packaging;
        if (it.casePack) target.casePack = it.casePack;
        if (it.srp !== null) target.srp = it.srp;
        if (it.casePrice !== null) target.casePrice = it.casePrice;
        if (it.moq) target.moq = it.moq;
        if (it.remarks) target.remarks = it.remarks;
        it.id = target.id;
      } else {
        // Add new
        brand.items.unshift({
          id: it.id,
          code: it.code,
          name: it.name,
          desc: it.desc,
          category: it.category,
          packaging: it.packaging,
          casePack: it.casePack,
          srp: it.srp,
          casePrice: it.casePrice,
          moq: it.moq,
          remarks: it.remarks
        });
      }

      // Collect for comparison registry sync
      comparisonItemsToRegister.push({
        id: `${brandKey}-${(it.code || it.name).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        brandKey: brandKey,
        code: it.code,
        name: it.name,
        category: it.category,
        packaging: it.packaging,
        coveragePerUnit: it.coverage || 20.0,
        defaultCoats: it.coats || 1,
        srp: it.srp,
        notes: it.desc || it.remarks || ''
      });
    });

    // Save to supplier pricelist storage
    this.saveData();

    // Sync to product comparison registry
    if (typeof window !== 'undefined') {
      if (window.ProductComparisonData && window.ProductComparisonData.registerImportedProducts) {
        window.ProductComparisonData.registerImportedProducts(comparisonItemsToRegister);
      } else if (window.productComparison && window.productComparison.registerImportedProducts) {
        window.productComparison.registerImportedProducts(comparisonItemsToRegister);
      }
    } else if (typeof ProductComparisonData !== 'undefined' && ProductComparisonData.registerImportedProducts) {
      ProductComparisonData.registerImportedProducts(comparisonItemsToRegister);
    }

    this.activeBrand = brandKey;
    if (typeof document !== 'undefined') {
      this.render();
      this.closeImportModal();
    }

    this.showToast(`Imported ${totalCount} products into ${brand.brandName} (${newCount} new, ${updatedCount} updated)!`, 'success');
    return totalCount;
  }

  showToast(msg, type = 'info') {
    if (typeof document === 'undefined' || !document.getElementById) return;
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
      if (toast.classList) toast.classList.add('fade-out');
      setTimeout(() => { if (toast.remove) toast.remove(); }, 300);
    }, 2800);
  }

  // --- Filtering & Calculations ---
  getFilteredItems() {
    const brand = this.getBrandData();
    let items = [...brand.items];

    // Status filter
    if (this.activeStatus === 'priced') {
      items = items.filter(i => i.srp !== null && i.srp !== undefined && i.srp !== '');
    } else if (this.activeStatus === 'unpriced') {
      items = items.filter(i => i.srp === null || i.srp === undefined || i.srp === '');
    }

    // Category filter
    if (this.activeCategory !== 'all') {
      items = items.filter(i => (i.category || '').toLowerCase() === this.activeCategory.toLowerCase());
    }

    // Search query
    if (this.searchQuery) {
      const q = this.searchQuery;
      items = items.filter(i => 
        (i.name && i.name.toLowerCase().includes(q)) ||
        (i.code && i.code.toLowerCase().includes(q)) ||
        (i.desc && i.desc.toLowerCase().includes(q)) ||
        (i.category && i.category.toLowerCase().includes(q)) ||
        (i.packaging && i.packaging.toLowerCase().includes(q)) ||
        (i.remarks && i.remarks.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (this.sortField) {
      const f = this.sortField;
      const asc = this.sortOrder === 'asc';
      items.sort((a, b) => {
        let va = a[f];
        let vb = b[f];
        if (f === 'srp' || f === 'casePrice') {
          va = va === null || va === undefined ? -1 : va;
          vb = vb === null || vb === undefined ? -1 : vb;
          return asc ? va - vb : vb - va;
        }
        va = (va || '').toString().toLowerCase();
        vb = (vb || '').toString().toLowerCase();
        return asc ? va.localeCompare(vb) : vb.localeCompare(va);
      });
    }

    return items;
  }

  updateKpis() {
    const brand = this.getBrandData();
    const allItems = brand.items;
    const pricedItems = allItems.filter(i => i.srp !== null && i.srp !== undefined && i.srp !== '');
    const pendingItems = allItems.filter(i => i.srp === null || i.srp === undefined || i.srp === '');

    const totalCount = allItems.length;
    const pricedCount = pricedItems.length;
    const pendingCount = pendingItems.length;
    const pricedPercent = totalCount > 0 ? Math.round((pricedCount / totalCount) * 100) : 0;

    const sumSrp = pricedItems.reduce((acc, it) => acc + (parseFloat(it.srp) || 0), 0);
    const avgSrp = pricedCount > 0 ? sumSrp / pricedCount : 0;

    // Elements
    const elTotal = document.getElementById('kpiTotalItems');
    const elPriced = document.getElementById('kpiPricedCount');
    const elPending = document.getElementById('kpiPendingCount');
    const elAvg = document.getElementById('kpiAvgSrp');
    const elSubtitle = document.getElementById('kpiBrandSubtitle');
    const elPercent = document.getElementById('kpiPricedPercent');

    if (elTotal) elTotal.textContent = totalCount.toLocaleString();
    if (elPriced) elPriced.textContent = pricedCount.toLocaleString();
    if (elPending) elPending.textContent = pendingCount.toLocaleString();
    if (elPercent) elPercent.textContent = `${pricedPercent}% with active SRP`;
    if (elAvg) elAvg.innerHTML = `&#8369;${avgSrp.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (elSubtitle) elSubtitle.textContent = brand.brandName;

    // Status pill counters
    const pAll = document.getElementById('countPillAll');
    const pPriced = document.getElementById('countPillPriced');
    const pUnpriced = document.getElementById('countPillUnpriced');
    if (pAll) pAll.textContent = totalCount;
    if (pPriced) pPriced.textContent = pricedCount;
    if (pUnpriced) pUnpriced.textContent = pendingCount;
  }

  // --- Rendering UI ---
  render() {
    this.renderBrandTabs();
    this.renderBrandBanner();
    this.renderCategoryPills();
    this.updateKpis();
    this.renderTableOnly();
  }

  renderBrandTabs() {
    const container = document.getElementById('pricelistBrandTabs');
    if (!container) return;

    const brandKeys = ['buildrite', 'bostik', 'davies', 'boysen', 'sika'];
    container.innerHTML = brandKeys.map(k => {
      const b = this.data[k];
      const isActive = k === this.activeBrand;
      const count = b.items.length;
      return `
        <button class="supplier-tab-btn ${isActive ? 'active' : ''}" 
                data-pricelist-brand="${k}" 
                onclick="supplierPriceList.setBrand('${k}')">
          <span class="supplier-logo-pill" style="background:${b.badgeColor || '#0284c7'};">${k.toUpperCase()}</span>
          <span>${b.brandName}</span>
          <span class="tab-count-bubble">${count}</span>
        </button>
      `;
    }).join('');
  }

  renderBrandBanner() {
    const banner = document.getElementById('brandInfoBanner');
    if (!banner) return;
    const brand = this.getBrandData();

    const linkHtml = brand.sourceDoc.startsWith('http')
      ? `<a href="${brand.sourceDoc}" target="_blank" rel="noopener noreferrer" class="banner-link">${brand.sourceDoc} &nearr;</a>`
      : `<code>${brand.sourceDoc}</code>`;

    banner.innerHTML = `
      <div class="brand-banner-flex">
        <div class="brand-banner-left">
          <div class="brand-logo-badge" style="background:${brand.badgeColor || '#0284c7'};">
            ${brand.brandKey.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div class="brand-banner-title">
              <h3>${brand.brandName}</h3>
              <span class="meta-tag" style="background:#eff6ff; color:#1d4ed8; border-color:#bfdbfe;">${brand.badge}</span>
              <span class="meta-tag" style="background:#ecfdf5; color:#047857; border-color:#a7f3d0;">Effective: ${brand.effectiveDate}</span>
            </div>
            <div class="brand-banner-sub">
              ${brand.company} &bull; Reference: ${linkHtml}
            </div>
          </div>
        </div>
        <div class="brand-banner-right">
          <span class="spreadsheet-mode-pill">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>
            Excel Spreadsheet Mode &bull; Click Cells to Edit
          </span>
        </div>
      </div>
    `;
  }

  renderCategoryPills() {
    const container = document.getElementById('pricelistCategoryPills');
    if (!container) return;

    const brand = this.getBrandData();
    const categoriesMap = {};
    brand.items.forEach(i => {
      const cat = i.category || 'Uncategorized';
      categoriesMap[cat] = (categoriesMap[cat] || 0) + 1;
    });

    const categories = Object.keys(categoriesMap).sort();

    let html = `
      <button class="category-pill ${this.activeCategory === 'all' ? 'active' : ''}" 
              onclick="supplierPriceList.setCategory('all')">
        All Categories (${brand.items.length})
      </button>
    `;

    categories.forEach(cat => {
      const isAct = this.activeCategory.toLowerCase() === cat.toLowerCase();
      html += `
        <button class="category-pill ${isAct ? 'active' : ''}" 
                onclick="supplierPriceList.setCategory('${cat.replace(/'/g, "\'")}')">
          ${cat} (${categoriesMap[cat]})
        </button>
      `;
    });

    container.innerHTML = html;
  }

  renderTableOnly() {
    const tbody = document.getElementById('pricelistTableBody');
    const footerCount = document.getElementById('tableSummaryCount');
    if (!tbody) return;

    const items = this.getFilteredItems();
    if (footerCount) {
      footerCount.textContent = `Displaying ${items.length} item${items.length === 1 ? '' : 's'} in ${this.getBrandData().brandName}`;
    }

    if (items.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="11" class="empty-table-cell">
            <div class="empty-state-wrap">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <h4>No matching products found</h4>
              <p>Try clearing your search query or selecting "All Categories"</p>
              <button class="excel-btn excel-btn-reset" onclick="supplierPriceList.setCategory('all'); supplierPriceList.setSearch('');">
                Clear Filters
              </button>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    // Group by category if activeCategory === 'all' and not searching or custom sorting
    const showGrouping = this.activeCategory === 'all' && !this.searchQuery && !this.sortField;

    let html = '';
    let currentCat = null;
    let rowNum = 1;

    items.forEach(it => {
      if (showGrouping && it.category !== currentCat) {
        currentCat = it.category;
        const catCount = items.filter(x => x.category === currentCat).length;
        html += `
          <tr class="category-header-row">
            <td colspan="11">
              <div class="category-header-inner">
                <span class="cat-folder-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                </span>
                <strong>${currentCat}</strong>
                <span class="cat-row-badge">${catCount} items</span>
              </div>
            </td>
          </tr>
        `;
      }

      const srpDisplay = it.srp !== null && it.srp !== undefined
        ? `&#8369;${parseFloat(it.srp).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : `<span class="blank-price-tag">+ Enter Price</span>`;

      const casePriceDisplay = it.casePrice !== null && it.casePrice !== undefined
        ? `&#8369;${parseFloat(it.casePrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : `<span class="blank-price-tag muted">&mdash;</span>`;

      html += `
        <tr class="excel-row" data-item-id="${it.id}">
          <td class="col-idx">${rowNum++}</td>
          
          <!-- Code (Editable) -->
          <td class="col-code editable-cell" 
              onclick="supplierPriceList.startCellEdit(this, '${it.id}', 'code')"
              title="Click to edit item code">
            <span class="cell-text mono-code">${escapeHtml(it.code || '')}</span>
          </td>

          <!-- Product Name (Editable) -->
          <td class="col-name editable-cell" 
              onclick="supplierPriceList.startCellEdit(this, '${it.id}', 'name')"
              title="Click to edit product name">
            <div class="product-title-wrap">
              <span class="product-main-title">${escapeHtml(it.name || '')}</span>
              ${it.desc ? `<span class="product-sub-desc">${escapeHtml(it.desc)}</span>` : ''}
            </div>
          </td>

          <!-- Category (Editable) -->
          <td class="col-category editable-cell" 
              onclick="supplierPriceList.startCellEdit(this, '${it.id}', 'category')"
              title="Click to edit category">
            <span class="cat-pill-cell">${escapeHtml(it.category || '')}</span>
          </td>

          <!-- Packaging (Editable) -->
          <td class="col-pkg editable-cell" 
              onclick="supplierPriceList.startCellEdit(this, '${it.id}', 'packaging')"
              title="Click to edit packaging">
            <span class="cell-text">${escapeHtml(it.packaging || '')}</span>
          </td>

          <!-- Case Pack (Editable) -->
          <td class="col-casepack editable-cell text-center" 
              onclick="supplierPriceList.startCellEdit(this, '${it.id}', 'casePack')"
              title="Click to edit case pack">
            <span class="cell-text">${escapeHtml(it.casePack || '1')}</span>
          </td>

          <!-- Unit SRP (Editable) -->
          <td class="col-srp editable-cell text-right ${it.srp === null ? 'is-blank' : 'has-price'}" 
              onclick="supplierPriceList.startCellEdit(this, '${it.id}', 'srp')"
              title="Click to edit Unit SRP">
            <div class="price-cell-inner">
              ${srpDisplay}
            </div>
          </td>

          <!-- Case Price (Editable) -->
          <td class="col-caseprice editable-cell text-right" 
              onclick="supplierPriceList.startCellEdit(this, '${it.id}', 'casePrice')"
              title="Click to edit Case Price">
            <div class="price-cell-inner">
              ${casePriceDisplay}
            </div>
          </td>

          <!-- MOQ (Editable) -->
          <td class="col-moq editable-cell" 
              onclick="supplierPriceList.startCellEdit(this, '${it.id}', 'moq')"
              title="Click to edit MOQ">
            <span class="cell-text ${it.moq ? 'moq-tag' : 'text-muted'}">${escapeHtml(it.moq || '—')}</span>
          </td>

          <!-- Remarks (Editable) -->
          <td class="col-remarks editable-cell" 
              onclick="supplierPriceList.startCellEdit(this, '${it.id}', 'remarks')"
              title="Click to edit remarks">
            <span class="cell-text ${it.remarks && it.remarks.includes('*') ? 'remark-highlight' : ''}">${escapeHtml(it.remarks || '')}</span>
          </td>

          <!-- Actions -->
          <td class="col-actions text-center">
            <button class="row-action-btn" 
                    onclick="supplierPriceList.deleteItem('${this.activeBrand}', '${it.id}')" 
                    title="Remove item from catalog">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  }

  // --- Inline Cell Editing Engine ---
  startCellEdit(tdElement, itemId, field) {
    if (this.editingCell && this.editingCell.td === tdElement) return;
    if (this.editingCell) this.finishCellEdit();

    const brand = this.getBrandData();
    const item = brand.items.find(i => i.id === itemId);
    if (!item) return;

    let currentValue = item[field];
    if (currentValue === null || currentValue === undefined) currentValue = '';

    tdElement.classList.add('cell-editing');
    const originalHTML = tdElement.innerHTML;

    const input = document.createElement('input');
    input.type = (field === 'srp' || field === 'casePrice') ? 'number' : 'text';
    if (input.type === 'number') {
      input.step = 'any';
    }
    input.className = 'excel-inline-input';
    input.value = currentValue;

    tdElement.innerHTML = '';
    tdElement.appendChild(input);
    input.focus();
    if (input.select) input.select();

    this.editingCell = {
      td: tdElement,
      originalHTML: originalHTML,
      itemId: itemId,
      field: field,
      brandKey: this.activeBrand
    };

    const commitChange = () => {
      if (!this.editingCell) return;
      const newVal = input.value.trim();
      this.updateItemField(this.activeBrand, itemId, field, newVal);
      this.editingCell = null;
    };

    const cancelChange = () => {
      if (!this.editingCell) return;
      tdElement.classList.remove('cell-editing');
      tdElement.innerHTML = originalHTML;
      this.editingCell = null;
    };

    input.addEventListener('blur', commitChange);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        input.blur();
      } else if (e.key === 'Escape') {
        cancelChange();
      }
    });
  }

  finishCellEdit() {
    if (!this.editingCell) return;
    const input = this.editingCell.td.querySelector('input');
    if (input) {
      input.blur();
    }
  }
}

// Helpers
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function jsonParseSafe(str) {
  try { return JSON.parse(str); } catch (e) { return null; }
}

// Global Singleton Instance
let supplierPriceList = null;

function initSupplierPriceList() {
  if (!supplierPriceList) {
    supplierPriceList = new SupplierPriceListManager();
    window.supplierPriceList = supplierPriceList;
  }
  
  // Setup search input
  const searchInput = document.getElementById('pricelistSearchInput');
  if (searchInput && (!searchInput.dataset || !searchInput.dataset.initialized)) {
    if (searchInput.dataset) searchInput.dataset.initialized = 'true';
    searchInput.addEventListener('input', (e) => {
      supplierPriceList.setSearch(e.target.value);
    });
  }

  // Setup toolbar buttons
  if (btnAdd && (!btnAdd.dataset || !btnAdd.dataset.initialized)) {
    if (btnAdd.dataset) btnAdd.dataset.initialized = 'true';
    btnAdd.addEventListener('click', () => supplierPriceList.addNewItem());
  }

  const btnImport = document.getElementById('btnPricelistImport');
  if (btnImport && (!btnImport.dataset || !btnImport.dataset.initialized)) {
    if (btnImport.dataset) btnImport.dataset.initialized = 'true';
    btnImport.addEventListener('click', () => supplierPriceList.openImportModal());
  }

  const btnExport = document.getElementById('btnPricelistExport');
  if (btnExport && (!btnExport.dataset || !btnExport.dataset.initialized)) {
    if (btnExport.dataset) btnExport.dataset.initialized = 'true';
    btnExport.addEventListener('click', () => supplierPriceList.exportToExcel());
  }

  const btnPrint = document.getElementById('btnPricelistPrint');
  if (btnPrint && (!btnPrint.dataset || !btnPrint.dataset.initialized)) {
    if (btnPrint.dataset) btnPrint.dataset.initialized = 'true';
    btnPrint.addEventListener('click', () => supplierPriceList.printCatalog());
  }

  const btnReset = document.getElementById('btnPricelistReset');
  if (btnReset && (!btnReset.dataset || !btnReset.dataset.initialized)) {
    if (btnReset.dataset) btnReset.dataset.initialized = 'true';
    btnReset.addEventListener('click', () => supplierPriceList.resetBrandToMaster(supplierPriceList.activeBrand));
  }

  // Setup Batch Import Modal Listeners
  const btnCloseImport = document.getElementById('btnCloseImportModal');
  if (btnCloseImport && (!btnCloseImport.dataset || !btnCloseImport.dataset.initialized)) {
    if (btnCloseImport.dataset) btnCloseImport.dataset.initialized = 'true';
    btnCloseImport.addEventListener('click', () => supplierPriceList.closeImportModal());
  }

  const btnCancelImport = document.getElementById('btnCancelPricelistImport');
  if (btnCancelImport && (!btnCancelImport.dataset || !btnCancelImport.dataset.initialized)) {
    if (btnCancelImport.dataset) btnCancelImport.dataset.initialized = 'true';
    btnCancelImport.addEventListener('click', () => supplierPriceList.closeImportModal());
  }

  const btnDownloadTemplate = document.getElementById('btnDownloadImportTemplate');
  if (btnDownloadTemplate && (!btnDownloadTemplate.dataset || !btnDownloadTemplate.dataset.initialized)) {
    if (btnDownloadTemplate.dataset) btnDownloadTemplate.dataset.initialized = 'true';
    btnDownloadTemplate.addEventListener('click', () => supplierPriceList.downloadSampleTemplate());
  }

  const btnConfirmImport = document.getElementById('btnConfirmPricelistImport');
  if (btnConfirmImport && (!btnConfirmImport.dataset || !btnConfirmImport.dataset.initialized)) {
    if (btnConfirmImport.dataset) btnConfirmImport.dataset.initialized = 'true';
    btnConfirmImport.addEventListener('click', () => supplierPriceList.confirmImport());
  }

  const fileInput = document.getElementById('importPricelistFileInput');
  if (fileInput && (!fileInput.dataset || !fileInput.dataset.initialized)) {
    if (fileInput.dataset) fileInput.dataset.initialized = 'true';
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        supplierPriceList.handleFileSelect(e.target.files[0]);
      }
    });
  }

  const dropzone = document.getElementById('importDropzone');
  if (dropzone && (!dropzone.dataset || !dropzone.dataset.initialized)) {
    if (dropzone.dataset) dropzone.dataset.initialized = 'true';
    dropzone.addEventListener('click', () => {
      if (fileInput) fileInput.click();
    });
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('drag-over');
    });
    dropzone.addEventListener('dragleave', (e) => {
      e.preventDefault();
      dropzone.classList.remove('drag-over');
    });
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('drag-over');
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        supplierPriceList.handleFileSelect(e.dataTransfer.files[0]);
      }
    });
  }

  const targetBrandSelect = document.getElementById('importTargetBrandSelect');
  if (targetBrandSelect && (!targetBrandSelect.dataset || !targetBrandSelect.dataset.initialized)) {
    if (targetBrandSelect.dataset) targetBrandSelect.dataset.initialized = 'true';
    targetBrandSelect.addEventListener('change', () => {
      if (supplierPriceList.pendingImport && supplierPriceList.pendingImport.items) {
        supplierPriceList.processImportText(supplierPriceList.pendingImport.rawText || '', supplierPriceList.pendingImport.fileName);
      }
    });
  }

  // Setup status filter buttons
  document.querySelectorAll('.status-pill').forEach(btn => {
    if (!btn.dataset || !btn.dataset.initialized) {
      if (btn.dataset) btn.dataset.initialized = 'true';
      btn.addEventListener('click', () => {
        const status = btn.getAttribute('data-status');
        if (status) supplierPriceList.setStatus(status);
      });
    }
  });

  // Setup sortable columns
  document.querySelectorAll('.sortable-col').forEach(th => {
    if (!th.dataset || !th.dataset.initialized) {
      if (th.dataset) th.dataset.initialized = 'true';
      th.addEventListener('click', () => {
        const sortField = th.getAttribute('data-sort');
        if (sortField) supplierPriceList.setSort(sortField);
      });
    }
  });

  // Initial render
  supplierPriceList.render();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSupplierPriceList);
  } else {
    initSupplierPriceList();
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SupplierPriceListManager,
    MASTER_SUPPLIER_CATALOGS
  };
}