import type { CareerDiscipline, ProjectStage } from '../utils/catalogFilters';
import heroEarthOrbitImg from '../assets/images/hero_earth_orbit_1794727364486.jpg';
import realEarthIndiaImg from '../assets/images/real_earth_india_space_1794891987550.jpg';
import techSatelliteImg from '../assets/images/tech_satellite_1794727364297.jpg';
import techAerospaceImg from '../assets/images/tech_aerospace_1794727365669.jpg';
import techExplorationImg from '../assets/images/tech_exploration_1794727365389.jpg';
import techEarthObsImg from '../assets/images/tech_earth_obs_1794727365387.jpg';
import techSpaceResearchImg from '../assets/images/tech_space_research_1794727366753.jpg';
import techAiSpaceImg from '../assets/images/tech_ai_space_1794727367036.jpg';

export interface TechFocusArea {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  image: string;
  imageAlt: string;
  researchFocus: string;
  explorationHorizon: string;
  keyParameters: { label: string; value: string }[];
  details: string[];
}

export interface ConceptualProject {
  id: string;
  code: string;
  title: string;
  stage: ProjectStage;
  domain: string;
  summary: string;
  architectureFocus: string;
  targetOrbit: string;
  metrics: { label: string; value: string }[];
  objectives: string[];
}

export interface CareerOpportunity {
  id: string;
  code: string;
  title: string;
  discipline: Exclude<CareerDiscipline, 'All'>;
  engagementLabel: string;
  location: string;
  summary: string;
  focusAreas: string[];
  preferredBackground: string[];
}

export const FOUNDER_PROFILE = {
  name: 'Rathod Omprakash',
  role: 'Founder & CEO',
  organization: 'AKASH VAYU',
  photo: '/assets/aistudio/WhatsApp_Image_2026-11-03_at_6.41.53_PM__1__a4d919e3.jpeg',
  photoAlt: 'Portrait of Rathod Omprakash, Founder and CEO of AKASH VAYU',
  quote:
    'India’s next chapter in space belongs to builders who combine fearless long-term imagination with patient, verifiable engineering discipline.',
  bio: [
    'As Founder & CEO of AKASH VAYU, Rathod Omprakash leads the venture’s strategic vision—shaping an engineering-first aerospace organization committed to modular satellite architectures, clean propulsion studies, and intelligent orbital systems built from India.',
    'Focused on building credibility through first-principles research rather than premature claims, he guides AKASH VAYU’s early-stage conceptual roadmap, research collaborations, and foundational technical talent assembly.',
  ],
  highlights: [
    { label: 'Leadership', value: 'Founder & CEO' },
    { label: 'Venture Mandate', value: 'Indigenous Space-Tech R&D' },
    { label: 'Base', value: 'India' },
  ],
};

export interface OrbitalRegimePreset {
  id: string;
  name: string;
  orbitType: string;
  altitudeKm: string;
  inclinationDeg: number;
  ascendingNodeDeg: number;
  focusLat: number;
  focusLon: number;
  summary: string;
}

export const HERO_IMAGE = heroEarthOrbitImg;
export const REAL_EARTH_UNIVERSE_IMAGE = realEarthIndiaImg;

export const OFFICIAL_INSTAGRAM = {
  username: '@akashvayuaerospace',
  url: 'https://www.instagram.com/akashvayuaerospace/',
} as const;

export const OFFICIAL_FACEBOOK = {
  label: 'AKASH VAYU',
  url: 'https://www.facebook.com/share/1FHybtNNCg/',
} as const;

export const ABOUT_PILLARS = [
  {
    id: 'vision',
    index: '01',
    title: 'Our Vision',
    statement:
      'To contribute meaningfully to India’s next generation of indigenous space technology through disciplined research, systems thinking, and scientific ambition.',
  },
  {
    id: 'mission',
    index: '02',
    title: 'Our Mission',
    statement:
      'To explore modular satellite architectures, intelligent onboard software, and sustainable aerospace engineering concepts engineered for global relevance.',
  },
  {
    id: 'philosophy',
    index: '03',
    title: 'Our Philosophy',
    statement:
      'First-principles engineering over spectacle. Every conceptual system we study is evaluated for reliability, mass efficiency, and measurable real-world utility.',
  },
  {
    id: 'goals',
    index: '04',
    title: 'Our Long-Term Goals',
    statement:
      'Build deep technical readiness across small-satellite platforms, Earth observation analytics, and autonomous orbital systems as India’s space economy expands.',
  },
];

export const TECHNOLOGY_FOCUS_AREAS: TechFocusArea[] = [
  {
    id: 'satellite-technology',
    index: '01',
    title: 'Satellite Technology',
    subtitle: 'Focus Area · Future Development Interest',
    shortDescription:
      'Conceptualizing modular small-satellite bus architectures, thermal management layouts, and power distribution topologies for versatile orbital payloads.',
    image: techSatelliteImg,
    imageAlt: 'Conceptual modular small satellite bus with gold thermal insulation and optical sensor',
    researchFocus: 'Modular Bus & Payload Interfaces',
    explorationHorizon: 'Conceptual Architecture Studies',
    keyParameters: [
      { label: 'Form Factor Study', value: '6U – 50 kg Class' },
      { label: 'Thermal Design', value: 'Passive + MLI Bus' },
      { label: 'Status', value: 'Focus Area (Pre-Flight)' },
    ],
    details: [
      'Exploring standardized electrical and mechanical payload interfaces to reduce integration cycles for future Indian micro-satellite missions.',
      'Investigating radiation-aware avionics partitioning and fault-tolerant power buses tailored to low Earth orbit thermal cycling.',
      'Note: AKASH VAYU presents Satellite Technology strictly as an active R&D focus area and future development interest, not a flight-proven commercial product.',
    ],
  },
  {
    id: 'aerospace-engineering',
    index: '02',
    title: 'Aerospace Engineering',
    subtitle: 'Focus Area · Future Development Interest',
    shortDescription:
      'Studying lightweight composite airframes, structural dynamics, and clean propulsion testbed concepts suited for next-generation orbital access.',
    image: techAerospaceImg,
    imageAlt: 'Conceptual composite aerodynamic fairing mounted on an engineering test rig',
    researchFocus: 'Structures, Materials & Propulsion Concepts',
    explorationHorizon: 'Simulation & Bench Study',
    keyParameters: [
      { label: 'Material Class', value: 'Carbon / Ti Composites' },
      { label: 'Analysis Method', value: 'FEA & CFD Modeling' },
      { label: 'Status', value: 'Focus Area (Pre-Flight)' },
    ],
    details: [
      'Evaluating high-strength carbon-fiber and titanium hybrid geometries for mass reduction under ascent acoustic and thermal loads.',
      'Examining non-toxic green propellant architectures and modular ground test instrumentation methodologies.',
      'Note: All aerospace hardware studies represent early-stage engineering exploration rather than operational launch vehicles.',
    ],
  },
  {
    id: 'space-exploration',
    index: '03',
    title: 'Space Exploration',
    subtitle: 'Focus Area · Future Development Interest',
    shortDescription:
      'Investigating cislunar trajectory mechanics, deep-space optical navigation concepts, and resilient communication relay frameworks.',
    image: techExplorationImg,
    imageAlt: 'Conceptual unmanned deep-space probe traversing above a sunlit lunar horizon',
    researchFocus: 'Cislunar & Deep-Space Mission Concepts',
    explorationHorizon: 'Long-Term Exploration Roadmap',
    keyParameters: [
      { label: 'Orbital Domain', value: 'Cislunar / L-Points' },
      { label: 'Guidance Study', value: 'Optical Relative Nav' },
      { label: 'Status', value: 'Long-Term Research' },
    ],
    details: [
      'Modeling low-energy transfer trajectories and autonomous optical landmark tracking beyond geostationary altitudes.',
      'Studying resilient deep-space link budgets and delay-tolerant data framing to support future scientific exploration concepts.',
      'Note: AKASH VAYU has not conducted deep-space missions; this domain reflects our long-term scientific exploration interest.',
    ],
  },
  {
    id: 'earth-observation',
    index: '04',
    title: 'Earth Observation',
    subtitle: 'Focus Area · Future Development Interest',
    shortDescription:
      'Designing conceptual multispectral imaging workflows for coastal monitoring, precision agriculture, and climate resilience across the Indian subcontinent.',
    image: techEarthObsImg,
    imageAlt: 'Orbital Earth observation view over South Asian river deltas, coastlines, and mountain ridges',
    researchFocus: 'Multispectral Sensing & Environmental Data',
    explorationHorizon: 'Algorithm & Sensor Concepting',
    keyParameters: [
      { label: 'Spectral Bands', value: 'VNIR / SWIR Study' },
      { label: 'Regional Focus', value: 'South Asia & Littoral' },
      { label: 'Status', value: 'Focus Area (Concept)' },
    ],
    details: [
      'Researching atmospheric correction pipelines and cloud-masking heuristics tuned to monsoon-season optical imagery.',
      'Exploring compact electro-optical payload trade-offs balancing ground sample distance against swath revisit frequency.',
      'Note: Earth Observation represents a future application pillar under conceptual study.',
    ],
  },
  {
    id: 'space-research',
    index: '05',
    title: 'Space Research',
    subtitle: 'Focus Area · Future Development Interest',
    shortDescription:
      'Exploring thermal-vacuum qualification methodologies, orbital debris mitigation theory, and microgravity experimental payload enclosures.',
    image: techSpaceResearchImg,
    imageAlt: 'Aerospace thermal vacuum chamber and precision optical laser alignment bench',
    researchFocus: 'Environmental Testing & Microgravity Systems',
    explorationHorizon: 'Laboratory Framework Design',
    keyParameters: [
      { label: 'Environment', value: 'Thermal-Vacuum Spec' },
      { label: 'Focus', value: 'Debris-Safe Deorbit' },
      { label: 'Status', value: 'Ongoing Research' },
    ],
    details: [
      'Defining rigorous qualification frameworks for sub-assembly survivability across extreme orbital thermal gradients.',
      'Investigating passive and active end-of-life deorbit concepts aligned with international space sustainability principles.',
      'Note: Presented as scientific research interests guiding our long-term technical roadmap.',
    ],
  },
  {
    id: 'ai-space-technology',
    index: '06',
    title: 'AI & Space Technology',
    subtitle: 'Focus Area · Future Development Interest',
    shortDescription:
      'Developing onboard edge-inference models for anomaly detection, autonomous task scheduling, and bandwidth-efficient orbital data prioritization.',
    image: techAiSpaceImg,
    imageAlt: 'Macro photograph of an autonomous spacecraft flight computer module and optical star-tracker',
    researchFocus: 'Onboard Autonomy & Edge Telemetry',
    explorationHorizon: 'Software Simulation & Prototyping',
    keyParameters: [
      { label: 'Compute Target', value: 'Low-SWaP Edge SoC' },
      { label: 'Primary Role', value: 'Fault & Cloud Triage' },
      { label: 'Status', value: 'In Simulation Study' },
    ],
    details: [
      'Prototyping lightweight computer-vision filters that discard cloud-occluded Earth observation frames prior to downlink.',
      'Studying deterministic safety wrappers around onboard machine learning so attitude and flight control remain strictly verifiable.',
      'Note: Algorithms are evaluated in simulated hardware-in-the-loop environments as future development capabilities.',
    ],
  },
];

export const ORBITAL_REGIMES: OrbitalRegimePreset[] = [
  {
    id: 'india-corridor',
    name: 'Indian Peninsula Observation Track',
    orbitType: 'Sun-Synchronous LEO Concept',
    altitudeKm: '540 km',
    inclinationDeg: 97.5,
    ascendingNodeDeg: 78,
    focusLat: 20.5,
    focusLon: 78.9,
    summary:
      'Conceptual polar sun-synchronous pass over the Indian subcontinent designed for consistent solar illumination in Earth observation studies.',
  },
  {
    id: 'equatorial-leo',
    name: 'Equatorial Low-Inclination Ring',
    orbitType: 'Equatorial LEO Concept',
    altitudeKm: '480 km',
    inclinationDeg: 14.0,
    ascendingNodeDeg: 65,
    focusLat: 12.9,
    focusLon: 80.2,
    summary:
      'Low-inclination orbital geometry optimized for high-revisit tropical atmospheric and maritime corridor modeling.',
  },
  {
    id: 'cislunar-relay',
    name: 'High-Altitude Telemetry Envelope',
    orbitType: 'Elliptical Transfer Concept',
    altitudeKm: '1,200 km',
    inclinationDeg: 45.0,
    ascendingNodeDeg: 95,
    focusLat: 23.0,
    focusLon: 72.6,
    summary:
      'Theoretical medium-inclination relay arc exploring extended ground-station visibility windows across South Asia.',
  },
];

export const CONCEPTUAL_PROJECTS: ConceptualProject[] = [
  {
    id: 'vayusat-01',
    code: 'AV-SYS-01',
    title: 'VayuSat Modular Bus Architecture',
    stage: 'CONCEPT',
    domain: 'Satellite Technology',
    summary:
      'A conceptual 12U-class modular small-satellite reference architecture emphasizing rapid payload swap-out and thermally decoupled avionics bays.',
    architectureFocus: 'Standardized backplane bus with dual-redundant power routing',
    targetOrbit: '500–600 km Sun-Synchronous (Theoretical)',
    metrics: [
      { label: 'Envelope Class', value: '12U Conceptual' },
      { label: 'Target Payload Mass', value: '≤ 8.5 kg' },
      { label: 'Maturity', value: 'Architecture Study' },
    ],
    objectives: [
      'Establish clean mechanical and harness separation between bus avionics and experimental optical payloads.',
      'Model worst-case cold and hot orbital beta-angle thermal profiles before physical prototyping.',
      'Ensure passive deorbit compliance within 5 years of conceptual mission end-of-life.',
    ],
  },
  {
    id: 'agni-flow-bench',
    code: 'AV-PROP-02',
    title: 'Clean Micro-Thruster Simulation Study',
    stage: 'IN DEVELOPMENT',
    domain: 'Aerospace Engineering',
    summary:
      'Computational fluid dynamics and bench-level valve timing research for low-toxicity orbital attitude and station-keeping propulsion concepts.',
    architectureFocus: 'Non-toxic monopropellant injector geometry & thermal soak modeling',
    targetOrbit: 'LEO Station-Keeping Envelope (Simulated)',
    metrics: [
      { label: 'Phase', value: 'CFD & Cold-Flow Spec' },
      { label: 'Propellant Focus', value: 'Non-Toxic Green Class' },
      { label: 'Maturity', value: 'In Development (Lab Model)' },
    ],
    objectives: [
      'Characterize micro-nozzle expansion efficiency under simulated vacuum backpressure conditions.',
      'Develop deterministic solenoid valve timing firmware for milli-Newton impulse precision.',
      'Validate material compatibility across high-cycle thermal soak scenarios.',
    ],
  },
  {
    id: 'bhoomilens-pipeline',
    code: 'AV-EO-03',
    title: 'BhoomiLens Multispectral Analytics Concept',
    stage: 'CONCEPT',
    domain: 'Earth Observation',
    summary:
      'An end-to-end conceptual processing pipeline for coastal turbidity, watershed stress, and agricultural canopy indices using open synthetic orbital datasets.',
    architectureFocus: 'Automated radiometric calibration & cloud-occlusion screening',
    targetOrbit: 'Sub-10 m GSD Conceptual Swath',
    metrics: [
      { label: 'Spectral Focus', value: 'RGB + NIR + Red-Edge' },
      { label: 'Data Source', value: 'Open Synthetic Benchmarks' },
      { label: 'Maturity', value: 'Concept Design' },
    ],
    objectives: [
      'Reduce raw imagery downlink volume by prioritizing cloud-free littoral tiles onboard.',
      'Benchmark atmospheric haze compensation across humid tropical coastal baselines.',
      'Document reproducible geospatial verification methods for environmental researchers.',
    ],
  },
  {
    id: 'suryaedge-autonomy',
    code: 'AV-AI-04',
    title: 'SuryaEdge Fault-Tolerant Autonomy Kernel',
    stage: 'IN DEVELOPMENT',
    domain: 'AI & Space Technology',
    summary:
      'Software-in-the-loop autonomy framework combining deterministic state machines with lightweight anomaly scoring for unattended orbital operations.',
    architectureFocus: 'Deterministic watchdog supervisor wrapping quantized edge inference',
    targetOrbit: 'Onboard Flight Software Testbed',
    metrics: [
      { label: 'Verification', value: 'Software-in-the-Loop' },
      { label: 'Safety Guard', value: 'Deterministic Watchdog' },
      { label: 'Maturity', value: 'In Development (Software)' },
    ],
    objectives: [
      'Detect simulated power-bus voltage drift and thermal anomalies prior to ground pass windows.',
      'Guarantee zero interference with core Attitude Determination and Control System (ADCS) safety loops.',
      'Run inference within strict embedded memory and wattage ceilings typical of small-sat processors.',
    ],
  },
];

export const CAREER_OPPORTUNITIES: CareerOpportunity[] = [
  {
    id: 'propulsion-systems-engineer',
    code: 'AV-CAR-01',
    title: 'Propulsion & Fluid Systems Engineer',
    discipline: 'Propulsion & Systems',
    engagementLabel: 'Open Talent Interest · Full-Time Track',
    location: 'India (Early-Stage R&D)',
    summary:
      'Lead computational fluid dynamics, injector thermal modeling, and cold-flow bench test specifications for clean orbital micro-propulsion concepts.',
    focusAreas: [
      'Model non-toxic monopropellant combustion and micro-nozzle expansion behavior under simulated vacuum conditions.',
      'Specify pressure transducers, valve actuation timing, and safe ground-test instrumentation schemas.',
      'Document failure-mode analyses and material compatibility matrices for long-duration thermal soak cycles.',
    ],
    preferredBackground: [
      'Strong fundamentals in compressible fluid mechanics, thermodynamics, and propulsion cycle analysis.',
      'Hands-on familiarity with CFD simulation tooling, instrumentation scripting, or laboratory fluid rigs.',
      'Discipline for clear engineering documentation and pre-flight verification rigor.',
    ],
  },
  {
    id: 'flight-software-avionics-architect',
    code: 'AV-CAR-02',
    title: 'Flight Software & Avionics Architect',
    discipline: 'Avionics & Software',
    engagementLabel: 'Open Talent Interest · Full-Time Track',
    location: 'India (Early-Stage R&D)',
    summary:
      'Architect deterministic embedded flight kernels, watchdog supervisors, and hardware-in-the-loop simulation testbeds for compact satellite buses.',
    focusAreas: [
      'Design partitioned telemetry, command handling, and fault-recovery state machines in memory-safe or MISRA-aligned C/C++ or Rust.',
      'Build repeatable software-in-the-loop (SIL) harnesses simulating orbital power, thermal, and attitude edge cases.',
      'Establish clean electrical-interface definitions between payload compute modules and core flight controllers.',
    ],
    preferredBackground: [
      'Experience with real-time operating systems (RTOS), bare-metal microcontrollers, or deterministic embedded systems.',
      'Understanding of serial buses (CAN, SPI, SpaceWire concepts) and fault-tolerant telemetry framing.',
      'Commitment to automated testing and reproducible verification pipelines.',
    ],
  },
  {
    id: 'spacecraft-structures-thermal-engineer',
    code: 'AV-CAR-03',
    title: 'Spacecraft Structures & Thermal Engineer',
    discipline: 'Spacecraft Structures',
    engagementLabel: 'Open Talent Interest · Full-Time Track',
    location: 'India (Early-Stage R&D)',
    summary:
      'Develop conceptual 12U-class modular satellite bus CAD layouts, finite-element vibration analyses, and passive orbital thermal-control architectures.',
    focusAreas: [
      'Design lightweight aluminum and carbon-composite primary structures capable of withstanding launch acoustic envelopes.',
      'Analyze 90-minute LEO sunlit-to-eclipse thermal cycling across optical benches and power subsystems.',
      'Define standardized mechanical payload mounting and thermal-vacuum qualification test criteria.',
    ],
    preferredBackground: [
      'Proficiency in parametric CAD and structural/thermal FEA modeling (modal, random vibration, conductive/radiative heat transfer).',
      'Knowledge of aerospace fasteners, MLI routing concepts, and low-outgassing material selection.',
      'Ability to collaborate closely across avionics and optical payload constraints.',
    ],
  },
  {
    id: 'orbital-ai-earth-observation-scientist',
    code: 'AV-CAR-04',
    title: 'Orbital AI & Earth Observation Scientist',
    discipline: 'AI & Orbital Data',
    engagementLabel: 'Research & Engineering Fellowship Track',
    location: 'India (Hybrid R&D)',
    summary:
      'Prototype quantized computer-vision models for onboard cloud screening, coastal turbidity estimation, and autonomous orbital anomaly detection.',
    focusAreas: [
      'Develop low-SWaP computer vision pipelines capable of prioritizing cloud-free multispectral Earth observation frames prior to downlink.',
      'Benchmark radiometric calibration and atmospheric haze correction on synthetic and open South Asian littoral datasets.',
      'Design verifiable safety boundaries wrapping edge-inference models within deterministic flight software rules.',
    ],
    preferredBackground: [
      'Background in machine learning optimization, geospatial remote sensing (VNIR/SWIR), or onboard edge inference.',
      'Fluency in Python, numerical simulation, and model quantization for constrained embedded targets.',
      'Passion for translating orbital data science into measurable climate, coastal, and agricultural utility.',
    ],
  },
];
