export type SatelliteTypeId = 'cubesat' | 'microsat' | 'smallsat' | 'constellation';
export type TargetOrbitId = 'eq-480' | 'sso-540' | 'meo-1200' | 'deep-2000';

export interface SatelliteOption {
  id: SatelliteTypeId;
  name: string;
  massRangeLabel: string;
  defaultMassKg: number;
  minMassKg: number;
  maxMassKg: number;
  typicalApplications: string;
}

export interface TargetOrbitOption {
  id: TargetOrbitId;
  name: string;
  orbitType: string;
  altitudeNumKm: number;
  altitudeKm: string;
  inclinationDeg: number;
  ascendingNodeDeg: number;
  focusLat: number;
  focusLon: number;
  energyFactor: number;
  summary: string;
}

export interface ConceptualRocketClass {
  id: 'vayu-light' | 'vayu-core' | 'vayu-heavy';
  name: string;
  subtitle: string;
  maxLeoCapacityKg: number;
  estimatedGlomTonnes: number;
  stages: string;
  fairingSpec: string;
  propulsionConcept: string;
}

export interface MissionSizingResult {
  satellite: SatelliteOption;
  orbit: TargetOrbitOption;
  rocket: ConceptualRocketClass;
  payloadKg: number;
  effectiveLeoMassKg: number;
  utilizationPercent: number;
  massMarginKg: number;
  orbitalVelocityKmS: number;
  orbitalPeriodMin: number;
  isWithinEnvelope: boolean;
}

export const SATELLITE_OPTIONS: SatelliteOption[] = [
  {
    id: 'cubesat',
    name: 'CubeSat / Nanosatellite (1U–12U)',
    massRangeLabel: '1 – 25 kg',
    defaultMassKg: 12,
    minMassKg: 1,
    maxMassKg: 25,
    typicalApplications: 'Technology validation, IoT telemetry, academic research payloads.',
  },
  {
    id: 'microsat',
    name: 'Micro-Satellite Platform',
    massRangeLabel: '26 – 120 kg',
    defaultMassKg: 75,
    minMassKg: 26,
    maxMassKg: 120,
    typicalApplications: 'Multispectral Earth observation, coastal tracking, atmospheric sensing.',
  },
  {
    id: 'smallsat',
    name: 'Small-Satellite Bus',
    massRangeLabel: '121 – 300 kg',
    defaultMassKg: 185,
    minMassKg: 121,
    maxMassKg: 300,
    typicalApplications: 'High-resolution optical payloads, regional communications, radar imaging.',
  },
  {
    id: 'constellation',
    name: 'Multi-Payload / Heavy Bus',
    massRangeLabel: '301 – 500 kg',
    defaultMassKg: 380,
    minMassKg: 301,
    maxMassKg: 500,
    typicalApplications: 'Rideshare cluster dispensers or extended orbital transfer missions.',
  },
];

export const TARGET_ORBIT_OPTIONS: TargetOrbitOption[] = [
  {
    id: 'sso-540',
    name: 'Sun-Synchronous Polar LEO',
    orbitType: 'Sun-Synchronous LEO Concept',
    altitudeNumKm: 540,
    altitudeKm: '540 km',
    inclinationDeg: 97.5,
    ascendingNodeDeg: 78,
    focusLat: 20.5,
    focusLon: 78.9,
    energyFactor: 1.12,
    summary: 'Consistent solar lighting geometry across India for Earth observation payloads.',
  },
  {
    id: 'eq-480',
    name: 'Equatorial Low-Inclination LEO',
    orbitType: 'Equatorial LEO Concept',
    altitudeNumKm: 480,
    altitudeKm: '480 km',
    inclinationDeg: 14.0,
    ascendingNodeDeg: 65,
    focusLat: 12.9,
    focusLon: 80.2,
    energyFactor: 1.0,
    summary: 'High-revisit tropical and maritime corridor minimizing launch plane-change delta-V.',
  },
  {
    id: 'meo-1200',
    name: 'High-Altitude Telemetry Orbit',
    orbitType: 'High-LEO / Transfer Concept',
    altitudeNumKm: 1200,
    altitudeKm: '1,200 km',
    inclinationDeg: 45.0,
    ascendingNodeDeg: 95,
    focusLat: 23.0,
    focusLon: 72.6,
    energyFactor: 1.35,
    summary: 'Extended ground-station visibility footprint across the Indian subcontinent.',
  },
  {
    id: 'deep-2000',
    name: 'High-Polar / Deep Escort Envelope',
    orbitType: 'High-Energy Orbital Concept',
    altitudeNumKm: 2000,
    altitudeKm: '2,000 km',
    inclinationDeg: 88.0,
    ascendingNodeDeg: 112,
    focusLat: 28.6,
    focusLon: 77.2,
    energyFactor: 1.6,
    summary: 'Higher-energy deployment corridor for radiation experiments and relay demonstrators.',
  },
];

export const CONCEPTUAL_ROCKET_CLASSES: ConceptualRocketClass[] = [
  {
    id: 'vayu-light',
    name: 'Vayu-Light · Micro Concept',
    subtitle: 'Light Dedicated Orbital Concept (≤ 100 kg LEO eq.)',
    maxLeoCapacityKg: 100,
    estimatedGlomTonnes: 14,
    stages: '3-Stage Conceptual Vehicle',
    fairingSpec: '1.1 m Diameter Composite Fairing',
    propulsionConcept: 'Green Hybrid / Solid Kick-Stage Study',
  },
  {
    id: 'vayu-core',
    name: 'Vayu-Core · Medium Concept',
    subtitle: 'Primary Small-Sat Concept (101 – 280 kg LEO eq.)',
    maxLeoCapacityKg: 280,
    estimatedGlomTonnes: 34,
    stages: '2-Stage Orbital Concept',
    fairingSpec: '1.6 m Diameter Modular Fairing',
    propulsionConcept: 'Liquid Methalox Turbopump Concept',
  },
  {
    id: 'vayu-heavy',
    name: 'Vayu-Heavy · Modular Concept',
    subtitle: 'Cluster & High-Altitude Concept (281 – 800 kg LEO eq.)',
    maxLeoCapacityKg: 800,
    estimatedGlomTonnes: 78,
    stages: '2-Stage + Booster Core Concept',
    fairingSpec: '2.2 m Payload Dispenser Fairing',
    propulsionConcept: 'Clustered Liquid Core + Restartable Upper Stage',
  },
];

const EARTH_RADIUS_KM = 6371;
const EARTH_MU_KM3_S2 = 398600.4418;

export function calculateMissionPlan(
  satelliteTypeId: SatelliteTypeId,
  rawPayloadKg: number,
  orbitId: TargetOrbitId,
): MissionSizingResult {
  const satellite =
    SATELLITE_OPTIONS.find((item) => item.id === satelliteTypeId) ?? SATELLITE_OPTIONS[0];
  const orbit =
    TARGET_ORBIT_OPTIONS.find((item) => item.id === orbitId) ?? TARGET_ORBIT_OPTIONS[0];

  const payloadKg = Math.max(1, Math.min(500, Math.round(rawPayloadKg)));
  const effectiveLeoMassKg = Math.ceil(payloadKg * orbit.energyFactor);

  const rocket =
    CONCEPTUAL_ROCKET_CLASSES.find((cls) => effectiveLeoMassKg <= cls.maxLeoCapacityKg) ??
    CONCEPTUAL_ROCKET_CLASSES[CONCEPTUAL_ROCKET_CLASSES.length - 1];

  const maxPayloadAtOrbitKg = Math.floor(rocket.maxLeoCapacityKg / orbit.energyFactor);
  const utilizationPercent = Math.min(100, Math.round((payloadKg / maxPayloadAtOrbitKg) * 100));
  const massMarginKg = Math.max(0, maxPayloadAtOrbitKg - payloadKg);

  const orbitalRadiusKm = EARTH_RADIUS_KM + orbit.altitudeNumKm;
  const orbitalVelocityKmS = Number(Math.sqrt(EARTH_MU_KM3_S2 / orbitalRadiusKm).toFixed(2));
  const orbitalPeriodMin = Number(
    ((2 * Math.PI * Math.sqrt(Math.pow(orbitalRadiusKm, 3) / EARTH_MU_KM3_S2)) / 60).toFixed(1),
  );

  return {
    satellite,
    orbit,
    rocket,
    payloadKg,
    effectiveLeoMassKg,
    utilizationPercent,
    massMarginKg,
    orbitalVelocityKmS,
    orbitalPeriodMin,
    isWithinEnvelope: payloadKg <= maxPayloadAtOrbitKg,
  };
}
