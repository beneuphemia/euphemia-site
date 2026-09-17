/**
 * EUPHEMIA — SINGLE SOURCE OF TRUTH FOR ALL WEBSITE COPY
 * ---------------------------------------------------------------
 * Every user-facing word on the site is defined in this one file.
 * Components never contain hardcoded marketing copy — they read from
 * the `site` object below. To change wording, edit THIS FILE ONLY;
 * no component, layout, or styling changes are required.
 *
 * HOW TO REVIEW WORDING (Chief Science Officer):
 *   • "CURRENT COPY"  = wording already live on the current website.
 *     These are the words we are keeping. Treat as the baseline truth.
 *   • "PROPOSED COPY" = wording introduced by the Gemini redesign and
 *     NOT yet signed off. These blocks are flagged with
 *     `⚠️ PROPOSED — CSO REVIEW` comments below. Review, adjust, or
 *     delete them before merging to main.
 */

export const site = {
  /* ────────────────────────────────────────────────────────────────
   * BRAND — CURRENT COPY
   * ──────────────────────────────────────────────────────────────── */
  brand: {
    name: "EUPHEMIA",
    /** Shown under the wordmark. Empty on the live site today. */
    tagline: "",
    motto: "veritas per aquam",
    /** Optional English gloss of the motto (empty today). */
    mottoTranslation: "",
    copyright: "© 2025 Euphemia Ltd · UK",
  },

  /* ────────────────────────────────────────────────────────────────
   * METADATA (page <title>, description, social) — CURRENT COPY
   * ──────────────────────────────────────────────────────────────── */
  meta: {
    title: "Euphemia — Physics-Based Drug Discovery",
    description:
      "Computational drug discovery powered by rigorous physics simulation and machine learning. Specialists in water network and solvation modeling.",
    keywords: [
      "drug discovery",
      "molecular simulation",
      "computational chemistry",
      "FEP",
      "solvation",
      "water networks",
    ],
    ogTitle: "Euphemia",
    ogDescription: "Where physics meets drug discovery.",
  },

  /* ────────────────────────────────────────────────────────────────
   * NAVIGATION — CURRENT COPY
   * ──────────────────────────────────────────────────────────────── */
  nav: {
    links: [
      { label: "Science", href: "#science" },
      { label: "Approach", href: "#approach" },
      { label: "Contact", href: "#contact" },
    ],
    /** Primary action button (top right). */
    cta: "Get in touch",
    ctaHref: "#contact",
    /**
     * ⚠️ PROPOSED — CSO REVIEW
     * The redesign showed a partner-status pill in the mobile menu, e.g.
     * "Now Accepting Q2/Q3 2026 Partner Programs". Left empty to hide.
     */
    statusBadge: "",
  },

  /* ────────────────────────────────────────────────────────────────
   * HERO — CURRENT COPY
   * ──────────────────────────────────────────────────────────────── */
  hero: {
    eyebrow: "Computational Drug Discovery",
    headlineA: "The physics of",
    headlineB: "water, made precise.",
    body:
      "Euphemia combines rigorous molecular simulation with machine learning to map solvation networks that conventional docking ignores — turning water from noise into signal.",
    primaryCta: "Partner with us",
    primaryCtaHref: "#contact",
    secondaryCta: "Our science →",
    secondaryCtaHref: "#science",
    stats: [
      { value: "~10³", label: "Water sites mapped", color: "#1B4FD8" },
      { value: "GCMC", label: "Grand canonical engine", color: "#C9A84C" },
      { value: "FEP+", label: "Rigorous ΔΔG", color: "#C03A2B" },
    ],
  },

  /* ────────────────────────────────────────────────────────────────
   * SCIENCE (three pillars) — CURRENT COPY
   * ──────────────────────────────────────────────────────────────── */
  science: {
    eyebrow: "The science",
    heading: "Solvation is the unsolved problem.",
    body:
      "Every drug binds in water. The binding-site water network dictates whether a molecule displaces a thermodynamically costly water molecule, inherits a favourable one, or misses the pocket entirely. Docking scores ignore this. Euphemia does not.",
    pillars: [
      {
        id: "physics",
        tag: "Physics",
        title: "Grand Canonical Monte Carlo",
        body:
          "We use GCMC/MD to equilibrate explicit water networks across binding sites at thermodynamic resolution — finding every occupied, displáceable, and structural water position.",
      },
      {
        id: "ml",
        tag: "Machine Learning",
        title: "ML-accelerated scoring",
        body:
          "Solvation-aware descriptors trained on free energy data let us screen chemical space at scale without sacrificing physical accuracy — ML guided by physics, not replacing it.",
      },
      {
        id: "truth",
        tag: "Truth",
        title: "Rigorous ΔΔG validation",
        body:
          "Free Energy Perturbation benchmarks against crystallographic water positions and experimental affinities. Predictions are only as trustworthy as their calibration.",
      },
    ],
  },

  /* ────────────────────────────────────────────────────────────────
   * APPROACH / PIPELINE — CURRENT COPY
   * ──────────────────────────────────────────────────────────────── */
  approach: {
    eyebrow: "Our approach",
    headingA: "Physics as the foundation.",
    headingB: "ML as the accelerant.",
    paragraphs: [
      "The field has bifurcated into two camps: empirical ML models that train on affinity data without physical understanding, and academic simulation workflows too slow for drug discovery timescales.",
      "Euphemia sits at neither pole. Physics sets the boundary conditions; machine learning navigates within them. The result is predictions that generalise to novel chemotypes — the cases where data-only models fail.",
    ],
    steps: [
      {
        number: "01",
        title: "Target hydration mapping",
        description:
          "GCMC/MD across the binding site, producing a thermodynamic water map with occupancy and ΔG per site.",
      },
      {
        number: "02",
        title: "Solvation-aware virtual screening",
        description:
          "ML scoring functions informed by water displacement thermodynamics — not just shape complementarity.",
      },
      {
        number: "03",
        title: "FEP lead optimisation",
        description:
          "Rigorous relative binding free energy calculations for shortlisted compounds, prioritised by experimental tractability.",
      },
    ],
  },

  /* ────────────────────────────────────────────────────────────────
   * DIFFERENTIATION — CURRENT COPY
   * ──────────────────────────────────────────────────────────────── */
  differentiation: {
    eyebrow: "Where Euphemia differs",
    heading: "Where Euphemia differs",
    rows: [
      {
        label: "vs. Docking",
        left: "Shape + electrostatic scoring",
        right: "Water displacement ΔG as primary binding signal",
      },
      {
        label: "vs. Pure ML",
        left: "Interpolation within training distribution",
        right: "Physics-grounded generalisation to novel scaffolds",
      },
      {
        label: "vs. Academic MD",
        left: "Publication timescales, no decision pipeline",
        right: "Campaign-ready throughput with rigour maintained",
      },
      {
        label: "vs. Schrödinger / FEP+",
        left: "General-purpose; water networks as add-on",
        right: "Water network analysis as the core differentiator",
      },
    ],
  },

  /* ────────────────────────────────────────────────────────────────
   * CONTACT — CURRENT COPY
   * ──────────────────────────────────────────────────────────────── */
  contact: {
    eyebrow: "Work with us",
    heading: "Serious about solvation?",
    body:
      "We partner with biotech and pharma teams where water network modelling is a bottleneck — early target validation, hit-to-lead, or FEP campaign design. If you have a target and want to understand its hydration, let's talk.",
    email: "info@euphemia.ai",
  },

  /* ────────────────────────────────────────────────────────────────
   * ⚠️ PROPOSED — CSO REVIEW
   * Target Hydration Explorer (interactive case studies).
   * These three case studies (KRAS G12D, CDK2 vs CDK1, BCL-2) and every
   * Kd / ΔG / potency figure below were introduced by the Gemini redesign.
   * They are NOT current-site claims and have not been signed off.
   * ──────────────────────────────────────────────────────────────── */
  explorer: {
    eyebrow: "Interactive Target Explorer",
    heading: "How Solvation Thermodynamics Unlocks Nanomolar Affinity",
    body:
      "Toggle binding-pocket water molecules below or click the 2D hydration map to observe how explicit displacement thermodynamics drives compound potency.",
    hint: "Click nodes to displace",
    targets: [
      {
        id: "kras-g12d",
        name: "KRAS G12D (Switch-II Cryptic Pocket)",
        class: "Oncogenic Small GTPase",
        pdbId: "7T47",
        challenge:
          "Hydrophobic Switch-II sub-pocket was deemed 'undruggable' because static docking predicted severe steric clash and zero net binding energy.",
        conventionalDockingError:
          "Glide/AutoDock scored lead series at >10 µM due to ignoring 3 trapped, high-energy waters.",
        euphemiaAdvantage:
          "Euphemia GCMC mapped a cluster of 3 unstable waters (ΔG = +4.1 kcal/mol). Synthesizing a tailored naphthyl moiety that expels W2 & W3 unlocked 3.2 nM potency.",
        defaultKd: "480 nM",
        optimizedKd: "3.2 nM",
        deltaDeltaG: "-2.9 kcal/mol",
        waters: [
          { id: "w1", label: "W1 (H-Bond Asp12)", role: "Conserved (Structural)", deltaG: -4.8, enthalpy: -6.2, entropy: 1.4, occupancy: 0.98, isDisplaced: false, coord: { x: 30, y: 40 } },
          { id: "w2", label: "W2 (Switch-II Core)", role: "Unstable (Displaceable)", deltaG: 3.8, enthalpy: 1.1, entropy: 2.7, occupancy: 0.62, isDisplaced: true, coord: { x: 55, y: 35 } },
          { id: "w3", label: "W3 (Cryptic Apex)", role: "Unstable (Displaceable)", deltaG: 4.2, enthalpy: 0.8, entropy: 3.4, occupancy: 0.58, isDisplaced: true, coord: { x: 70, y: 55 } },
          { id: "w4", label: "W4 (Allosteric Rim)", role: "Metastable", deltaG: -0.4, enthalpy: -1.2, entropy: 0.8, occupancy: 0.74, isDisplaced: false, coord: { x: 45, y: 75 } },
        ],
      },
      {
        id: "cdk2-cdk1",
        name: "CDK2 vs CDK1 (Kinase Isoform Selectivity)",
        class: "Cell Cycle Serine/Threonine Kinase",
        pdbId: "1HCK",
        challenge:
          "CDK2 and CDK1 possess 93% sequence identity in the ATP binding cleft. Standard docking fails to produce selective leads, causing clinical off-target toxicity.",
        conventionalDockingError:
          "Standard scoring functions predict identical binding affinity for both isoforms (selectivity ratio ~1.1x).",
        euphemiaAdvantage:
          "Euphemia identified a distinct water pentamer network in the CDK2 hinge region with a unique bridging thermodynamic penalty not present in CDK1.",
        defaultKd: "140 nM",
        optimizedKd: "1.8 nM",
        deltaDeltaG: "-2.6 kcal/mol",
        waters: [
          { id: "w1", label: "W1 (Hinge Backbone)", role: "Conserved (Structural)", deltaG: -5.1, enthalpy: -7.0, entropy: 1.9, occupancy: 0.99, isDisplaced: false, coord: { x: 35, y: 30 } },
          { id: "w2", label: "W2 (Divergent Pocket)", role: "Unstable (Displaceable)", deltaG: 3.4, enthalpy: 0.9, entropy: 2.5, occupancy: 0.61, isDisplaced: true, coord: { x: 60, y: 45 } },
          { id: "w3", label: "W3 (DFG Gatekeeper)", role: "Metastable", deltaG: 1.2, enthalpy: -0.5, entropy: 1.7, occupancy: 0.69, isDisplaced: false, coord: { x: 50, y: 70 } },
        ],
      },
      {
        id: "bcl2-ppi",
        name: "BCL-2 / BCL-xL (Protein-Protein Interface)",
        class: "Apoptosis Regulator PPI",
        pdbId: "4AQ3",
        challenge:
          "Broad, shallow hydrophobic groove lacks deep defined pockets. Traditional docking suffers high false positive rates and poor hit-to-lead triage.",
        conventionalDockingError:
          "Over-predicts lipophilic contacts while neglecting the immense desolvation cost of burying flat non-polar surfaces.",
        euphemiaAdvantage:
          "GCMC identified two high-occupancy hydration hot-spots that, when displaced by a rigid chlorobiphenyl core, yielded 85-fold selectivity over BCL-xL.",
        defaultKd: "620 nM",
        optimizedKd: "7.4 nM",
        deltaDeltaG: "-2.7 kcal/mol",
        waters: [
          { id: "w1", label: "W1 (BH3 Domain Rim)", role: "Unstable (Displaceable)", deltaG: 4.6, enthalpy: 1.2, entropy: 3.4, occupancy: 0.52, isDisplaced: true, coord: { x: 40, y: 35 } },
          { id: "w2", label: "W2 (Groove Flank)", role: "Unstable (Displaceable)", deltaG: 3.1, enthalpy: 0.6, entropy: 2.5, occupancy: 0.67, isDisplaced: true, coord: { x: 65, y: 50 } },
          { id: "w3", label: "W3 (Asp103 Bridge)", role: "Conserved (Structural)", deltaG: -4.3, enthalpy: -5.8, entropy: 1.5, occupancy: 0.96, isDisplaced: false, coord: { x: 30, y: 65 } },
        ],
      },
    ],
  },

  /* ────────────────────────────────────────────────────────────────
   * ⚠️ PROPOSED — CSO REVIEW
   * Quantitative Benchmarks section. Every number below was introduced
   * by the Gemini redesign and has NOT been validated or signed off.
   * ──────────────────────────────────────────────────────────────── */
  benchmarks: {
    eyebrow: "Quantitative Rigor",
    heading: "Validated Against Wet-Lab Affinity and Crystal Structures",
    body:
      "Biopharma partners and biotech investors require reproducible physical accuracy. We benchmark continuously against prospective experimental datasets.",
    cards: [
      { value: "0.74", unit: "kcal/mol", label: "Mean Unsigned Error (MUE)", note: "Across 18 target campaigns" },
      { value: "R² = 0.89", unit: "", label: "Experimental Correlation", note: "Calibrated vs ITC & SPR Kd" },
      { value: "94.2%", unit: "", label: "Water Site Recovery", note: "<1.0 Å of X-ray crystal waters" },
      { value: "10,000×", unit: "", label: "Sampling Speedup", note: "Neural-accelerated GCMC" },
    ],
    tabs: [
      {
        id: "fep",
        label: "FEP+ Affinity Prediction (ΔΔG)",
        heading: "Prospective Blind Evaluation on 420+ Clinical & Preclinical Analogs",
        body:
          "Evaluated across kinases, nuclear receptors, proteases, and challenging protein-protein interactions. Euphemia accurately tracks subtle atomic changes (e.g. Me → Cl, F substitution, scaffold morphs) where standard docking produces pure noise.",
        items: [
          { label: "Pearson r", value: "0.94", note: "" },
          { label: "True Positive Rate", value: "88.5%", note: "" },
          { label: "Forcefield", value: "Amber14SB / OpenFF", note: "" },
        ],
      },
      {
        id: "water",
        label: "Crystallographic Water Network Benchmark",
        heading: "142 High-Resolution Protein-Ligand X-Ray Crystal Structures (<1.5 Å)",
        body:
          "Benchmarked against the PDBbind high-resolution crystal water dataset. Euphemia correctly identifies both tightly bound conserved structural waters (responsible for target selectivity) and displaced high-energy solvent positions with 94.2% spatial precision.",
        items: [
          { label: "Spatial Precision", value: "0.68 Å RMSD", note: "Average distance to crystallographic oxygen" },
          { label: "False Positive Waters", value: "< 4.1%", note: "Over-hydration artifact suppression" },
          { label: "Thermodynamic Calibration", value: "Explicit TIP4P", note: "Accurate bulk water chemical potential" },
        ],
      },
      {
        id: "screening",
        label: "Virtual Screening Enrichment (EF 1%)",
        heading: "Virtual Screening Enrichment: DUD-E Benchmark Comparison",
        body:
          "When screening massive small-molecule libraries, standard docking ranks hundreds of inactive molecules at the top due to false electrostatic compliments in wet cavities. Solvation conditioning eliminates these false positives.",
        items: [
          { label: "Euphemia Solvation-Conditioned ML", value: "EF 1% = 24.8", note: "" },
          { label: "Standard Docking (Glide / Vina)", value: "EF 1% = 5.2", note: "" },
        ],
      },
    ],
  },

  /* ────────────────────────────────────────────────────────────────
   * ⚠️ PROPOSED — CSO REVIEW
   * "Request Target Pilot" partnership modal copy.
   * ──────────────────────────────────────────────────────────────── */
  modal: {
    eyebrow: "Biopharma Partnership · Diligence",
    heading: "Request a Target Hydration Audit",
    body:
      "Tell us about your therapeutic target or evaluation criteria. All inquiries are strictly confidential under mutual standard CDAs.",
    fields: {
      name: "Your Name",
      email: "Work Email",
      organization: "Organization / Fund",
      targetFamily: "Target Family",
      targetNotes: "Target Scope or PDB Code (Optional)",
    },
    placeholders: {
      name: "Dr. Jane Smith",
      email: "jsmith@biotech.com",
      organization: "Biopharma / VC Name",
      targetNotes: "e.g. Evaluating lead series selectivity across CDK isoforms, PDB 1HCK; interested in 4-week pilot campaign.",
    },
    targetFamilies: [
      "Kinase / ATP Pocket",
      "Cryptic / Undruggable Pocket (KRAS, etc)",
      "Protein-Protein Interaction (PPI)",
      "GPCR / Allosteric Site",
      "Protease / Hydrolase",
      "VC Evaluation / Institutional Diligence",
      "Other Therapeutic Class",
    ],
    assurance: "Strict non-disclosure. We routinely execute bilateral CDAs before data transfer.",
    submit: "Submit Partnership Request",
    emailDirect: "Email Directly",
    successTitle: "Request Received",
    successBody:
      "Thank you, {name}. Our scientific leadership team will review your target inquiry and get back to you within 24 business hours.",
    close: "Close",
  },

  /* ────────────────────────────────────────────────────────────────
   * Hero 3D simulation — UI chrome labels (not scientific claims).
   * ──────────────────────────────────────────────────────────────── */
  simulation: {
    title: "GCMC Binding Pocket Engine",
    badge: "Explicit H₂O",
    modes: {
      deltaG: "ΔG Map",
      gcmc: "GCMC Trials",
      docking: "Ligand Pose",
    },
    controls: {
      pocket: "Pocket",
      field: "Field",
      tags: "Tags",
      tooltipPocket: "Toggle protein cavity atoms",
      tooltipField: "Toggle energy field mesh",
      tooltipTags: "Toggle ΔG tags",
      zoomOut: "Zoom out",
      zoomIn: "Zoom in",
      pause: "Pause",
      rotate: "Rotate",
      reset: "Reset View",
      legendDisplaceable: "Displaceable (+ΔG)",
      legendStructural: "Structural (-ΔG)",
      legendLigand: "Ligand Core",
      telemetryTitle: "Cavity Hydration Energetics",
      telemetryTemp: "T = 300 K (1 atm)",
      telemetryHot: "Hot Waters",
      telemetryStructural: "Structural",
      telemetryDisplacement: "Displacement",
    },
    /**
     * ⚠️ PROPOSED — CSO REVIEW
     * Telemetry figures shown in the hero overlay are illustrative demo
     * values from the redesign, not validated results.
     */
    telemetry: {
      hotSites: "3 sites",
      hotEnergy: "+4.2 kcal",
      structuralSites: "3 sites",
      structuralEnergy: "-5.4 kcal",
      displacementGain: "-2.8 kcal",
      displacementKd: ">100x Kd",
      gcmcSampling: "μ = -6.2 kcal/mol | Active GCMC Sampling",
    },
  },
};
