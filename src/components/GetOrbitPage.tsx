import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Orbit,
  Pause,
  Play,
  Rocket,
  Send,
} from 'lucide-react';
import { REAL_EARTH_UNIVERSE_IMAGE } from '../data/akashVayuData';
import {
  calculateMissionPlan,
  SATELLITE_OPTIONS,
  TARGET_ORBIT_OPTIONS,
  type SatelliteTypeId,
  type TargetOrbitId,
} from '../utils/orbitPlanner';
import {
  validateContactForm,
  type ContactFormErrors,
} from '../utils/contactValidation';
import { InteractiveEarthCanvas } from './InteractiveEarthCanvas';

interface GetOrbitPageProps {
  onNavigate: (path: string) => void;
}

const LAUNCH_PHASES = [
  'Pre-Launch Telemetry Check',
  'Stage-1 Ascent & Max-Q',
  'Fairing Jettison & Upper Burn',
  'Target Orbit Insertion & Payload Deploy',
];

export function GetOrbitPage({ onNavigate }: GetOrbitPageProps) {
  const [satelliteType, setSatelliteType] = useState<SatelliteTypeId>('microsat');
  const [payloadKg, setPayloadKg] = useState<number>(75);
  const [orbitId, setOrbitId] = useState<TargetOrbitId>('sso-540');
  const [isPaused, setIsPaused] = useState(false);

  const [simActive, setSimActive] = useState(false);
  const [simPhaseIndex, setSimPhaseIndex] = useState(0);

  // Mission request form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submittedSummary, setSubmittedSummary] = useState<{
    fullName: string;
    email: string;
    organization: string;
    rocketName: string;
    payloadKg: number;
    orbitName: string;
    satelliteName: string;
  } | null>(null);

  const plan = useMemo(
    () => calculateMissionPlan(satelliteType, payloadKg, orbitId),
    [satelliteType, payloadKg, orbitId],
  );

  const handleSelectSatelliteType = (id: SatelliteTypeId) => {
    setSatelliteType(id);
    const chosen = SATELLITE_OPTIONS.find((item) => item.id === id);
    if (chosen) {
      setPayloadKg(chosen.defaultMassKg);
    }
  };

  useEffect(() => {
    if (!simActive) return;
    const timer = window.setInterval(() => {
      setSimPhaseIndex((prev) => {
        if (prev >= LAUNCH_PHASES.length - 1) {
          setSimActive(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1300);
    return () => window.clearInterval(timer);
  }, [simActive]);

  const handleStartSimulation = () => {
    setSimPhaseIndex(0);
    setSimActive(true);
    setIsPaused(false);
  };

  const handleSubmitMission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `Get Orbit Concept: ${plan.satellite.name} (${plan.payloadKg} kg) -> ${plan.orbit.name}`;
    const generatedMessage =
      notes.trim() ||
      `Requesting conceptual launch vehicle sizing review for ${plan.payloadKg} kg ${plan.satellite.name} to ${plan.orbit.name} (${plan.orbit.altitudeKm}) using ${plan.rocket.name}.`;

    const validation = validateContactForm({
      fullName,
      email,
      organization,
      subject,
      message: generatedMessage,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setSubmittedSummary({
      fullName: validation.sanitized.fullName,
      email: validation.sanitized.email,
      organization: validation.sanitized.organization,
      rocketName: plan.rocket.name,
      payloadKg: plan.payloadKg,
      orbitName: `${plan.orbit.name} (${plan.orbit.altitudeKm})`,
      satelliteName: plan.satellite.name,
    });
  };

  return (
    <div className="min-h-screen bg-[#05070D] text-white">
      {/* Universe Hero Banner */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <img
            src={REAL_EARTH_UNIVERSE_IMAGE}
            alt="Deep-space universe view of planet Earth over India"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05070D]/80 via-[#05070D]/75 to-[#05070D]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <button
            type="button"
            onClick={() => onNavigate('/vision')}
            className="inline-flex min-h-10 items-center gap-2 border border-white/20 bg-white/5 px-4 py-2 font-display text-xs font-bold tracking-wider text-white uppercase transition-colors hover:border-cyan-400 hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-cyan-400"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to AKASH VAYU</span>
          </button>

          <div className="mt-8 max-w-3xl">
            <p className="font-mono-tech text-xs font-medium tracking-[0.16em] text-cyan-300 uppercase">
              AKASH VAYU · Universe Mission Planner · Conceptual Sizing Simulator
            </p>
            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white uppercase sm:text-5xl">
              Configure Your Satellite &amp; Launch Orbit
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              Select which satellite you want to deploy, set your exact payload weight in kilograms,
              and pick a target orbit. Our conceptual planner automatically sizes the matching
              AKASH VAYU launch vehicle class and simulates your orbital path.
            </p>
          </div>
        </div>
      </section>

      {/* Main Configurator & Live Universe Simulation Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Customer Configurator */}
          <div className="space-y-8 lg:col-span-7">
            {/* Step 1: Satellite Class */}
            <div className="border border-white/15 bg-[#0B0E14] p-6">
              <p className="font-mono-tech text-xs text-cyan-300 uppercase">
                Step 01 · Choose Your Satellite Class
              </p>
              <h2 className="mt-1.5 font-display text-xl font-bold text-white uppercase">
                Which Satellite Do You Want to Deploy?
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {SATELLITE_OPTIONS.map((sat) => {
                  const active = sat.id === satelliteType;
                  return (
                    <button
                      key={sat.id}
                      type="button"
                      onClick={() => handleSelectSatelliteType(sat.id)}
                      aria-pressed={active}
                      className={`flex flex-col items-start border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                        active
                          ? 'border-cyan-400 bg-cyan-500/15 text-white'
                          : 'border-white/15 bg-[#05070D] text-slate-300 hover:border-white/35'
                      }`}
                    >
                      <span className="font-mono-tech text-[11px] text-cyan-300">
                        {sat.massRangeLabel}
                      </span>
                      <span className="mt-1 font-display text-sm font-bold text-white uppercase">
                        {sat.name}
                      </span>
                      <span className="mt-2 text-xs leading-relaxed text-slate-400">
                        {sat.typicalApplications}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Exact Payload Weight (kg) */}
            <div className="border border-white/15 bg-[#0B0E14] p-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-mono-tech text-xs text-cyan-300 uppercase">
                    Step 02 · Payload Mass Specification
                  </p>
                  <h2 className="mt-1.5 font-display text-xl font-bold text-white uppercase">
                    Exact Satellite Weight (kg)
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor="payload-kg-input" className="sr-only">
                    Payload weight in kilograms
                  </label>
                  <input
                    id="payload-kg-input"
                    type="number"
                    min={1}
                    max={500}
                    value={payloadKg}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (!Number.isNaN(val)) {
                        setPayloadKg(Math.max(1, Math.min(500, val)));
                      }
                    }}
                    className="w-24 border border-white/25 bg-[#05070D] px-3 py-2 text-right font-mono-tech text-base font-bold text-cyan-300 focus:border-cyan-400 focus:outline-none"
                  />
                  <span className="font-mono-tech text-sm text-slate-400">kg</span>
                </div>
              </div>

              <div className="mt-5">
                <input
                  type="range"
                  min={1}
                  max={500}
                  value={payloadKg}
                  onChange={(e) => setPayloadKg(Number(e.target.value))}
                  aria-label="Adjust payload weight slider in kilograms"
                  className="h-2 w-full cursor-pointer accent-cyan-400"
                />
                <div className="mt-2 flex justify-between font-mono-tech text-[11px] text-slate-400">
                  <span>1 kg (Nano)</span>
                  <span>120 kg (Micro)</span>
                  <span>300 kg (SmallSat)</span>
                  <span>500 kg (Cluster)</span>
                </div>
              </div>
            </div>

            {/* Step 3: Target Orbit */}
            <div className="border border-white/15 bg-[#0B0E14] p-6">
              <p className="font-mono-tech text-xs text-cyan-300 uppercase">
                Step 03 · Destination in Orbit
              </p>
              <h2 className="mt-1.5 font-display text-xl font-bold text-white uppercase">
                Select Target Orbital Regime
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {TARGET_ORBIT_OPTIONS.map((orb) => {
                  const active = orb.id === orbitId;
                  return (
                    <button
                      key={orb.id}
                      type="button"
                      onClick={() => setOrbitId(orb.id)}
                      aria-pressed={active}
                      className={`flex flex-col items-start border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                        active
                          ? 'border-cyan-400 bg-cyan-500/15 text-white'
                          : 'border-white/15 bg-[#05070D] text-slate-300 hover:border-white/35'
                      }`}
                    >
                      <span className="font-mono-tech text-[11px] text-cyan-300">
                        ALT {orb.altitudeKm} · INC {orb.inclinationDeg.toFixed(1)}°
                      </span>
                      <span className="mt-1 font-display text-sm font-bold text-white uppercase">
                        {orb.name}
                      </span>
                      <span className="mt-2 text-xs leading-relaxed text-slate-400">
                        {orb.summary}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Customer Launch Inquiry Form */}
            <div className="border border-white/15 bg-[#0B0E14] p-6">
              <p className="font-mono-tech text-xs text-cyan-300 uppercase">
                Step 04 · Conceptual Launch Inquiry
              </p>
              <h2 className="mt-1.5 font-display text-xl font-bold text-white uppercase">
                Log Your Custom Orbit Specification
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Note: All rocket classes represent AKASH VAYU pre-flight conceptual vehicle studies
                for mission planning dialogue—not active commercial launch bookings.
              </p>

              {submittedSummary ? (
                <div role="status" className="mt-6 border border-cyan-400/35 bg-[#05070D] p-5">
                  <div className="flex items-center gap-2.5 text-cyan-300">
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    <h3 className="font-display text-lg font-bold text-white uppercase">
                      Mission Concept Recorded
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">
                    Thank you, {submittedSummary.fullName}. Your conceptual profile for a{' '}
                    <span className="font-semibold text-white">
                      {submittedSummary.payloadKg} kg {submittedSummary.satelliteName}
                    </span>{' '}
                    targeting{' '}
                    <span className="font-semibold text-cyan-300">
                      {submittedSummary.orbitName}
                    </span>{' '}
                    matched with{' '}
                    <span className="font-semibold text-white">{submittedSummary.rocketName}</span>{' '}
                    has been recorded for engineering review.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmittedSummary(null)}
                    className="mt-4 inline-flex min-h-10 items-center border border-white/25 bg-white/10 px-4 py-2 font-display text-xs font-bold tracking-wider text-white uppercase hover:border-cyan-400 hover:text-cyan-300"
                  >
                    Configure Another Payload
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitMission} noValidate className="mt-5 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="orbit-fullName" className="block text-xs font-semibold text-slate-200">
                        Full Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="orbit-fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) setErrors((p) => ({ ...p, fullName: undefined }));
                        }}
                        placeholder="Your Name"
                        className="mt-1.5 block w-full border border-white/20 bg-[#05070D] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                      />
                      {errors.fullName && (
                        <p role="alert" className="mt-1 text-xs text-rose-400">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="orbit-email" className="block text-xs font-semibold text-slate-200">
                        Email Address <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="orbit-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                        }}
                        placeholder="you@organization.org"
                        className="mt-1.5 block w-full border border-white/20 bg-[#05070D] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                      />
                      {errors.email && (
                        <p role="alert" className="mt-1 text-xs text-rose-400">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="orbit-org" className="block text-xs font-semibold text-slate-200">
                        Organization / University
                      </label>
                      <input
                        id="orbit-org"
                        type="text"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder="Optional"
                        className="mt-1.5 block w-full border border-white/20 bg-[#05070D] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="orbit-notes" className="block text-xs font-semibold text-slate-200">
                        Additional Payload Notes
                      </label>
                      <input
                        id="orbit-notes"
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Dimensions, imaging band, timeline..."
                        className="mt-1.5 block w-full border border-white/20 bg-[#05070D] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex min-h-11 items-center gap-2 bg-cyan-400 px-6 py-2.5 font-display text-xs font-bold tracking-[0.12em] text-[#05070D] uppercase transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-cyan-300"
                  >
                    <span>Submit Orbit Concept</span>
                    <Send className="h-4 w-4" aria-hidden="true" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Live Universe Globe & Recommended Rocket Vehicle Sizing */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:col-span-5">
            {/* Live Interactive Universe Orbit Globe */}
            <div className="border border-white/15 bg-[#0B0E14] p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Orbit className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                  <span className="font-mono-tech text-xs text-cyan-300 uppercase">
                    Live Universe Trajectory Preview
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPaused((p) => !p)}
                  className="inline-flex min-h-8 items-center gap-1.5 border border-white/20 bg-[#05070D] px-2.5 py-1 font-mono-tech text-[11px] text-white uppercase hover:border-cyan-400"
                >
                  {isPaused ? (
                    <>
                      <Play className="h-3 w-3 text-cyan-300" />
                      <span>Resume</span>
                    </>
                  ) : (
                    <>
                      <Pause className="h-3 w-3 text-cyan-300" />
                      <span>Pause</span>
                    </>
                  )}
                </button>
              </div>

              <InteractiveEarthCanvas activeRegime={plan.orbit} isPaused={isPaused} />
            </div>

            {/* Dynamically Matched Launch Vehicle Card */}
            <div className="border border-cyan-400/40 bg-[#0B0E14] p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono-tech text-[11px] text-cyan-300 uppercase">
                    Recommended Conceptual Rocket
                  </p>
                  <h2
                    id="recommended-rocket-name"
                    className="mt-1 font-display text-2xl font-bold text-white uppercase"
                  >
                    {plan.rocket.name}
                  </h2>
                  <p className="mt-1 text-xs text-slate-400">{plan.rocket.subtitle}</p>
                </div>
                <Rocket className="h-6 w-6 shrink-0 text-cyan-300" aria-hidden="true" />
              </div>

              {/* Capacity Utilization Bar */}
              <div className="mt-5">
                <div className="flex justify-between font-mono-tech text-xs">
                  <span className="text-slate-300">
                    Payload: <strong className="text-white">{plan.payloadKg} kg</strong>
                  </span>
                  <span className="text-cyan-300">{plan.utilizationPercent}% Envelope Used</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden bg-white/10">
                  <div
                    className="h-full bg-cyan-400 transition-all duration-300"
                    style={{ width: `${plan.utilizationPercent}%` }}
                  />
                </div>
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/15 pt-5 font-mono-tech">
                <div>
                  <dt className="text-[10px] text-slate-400 uppercase">LEO Eq. Capacity</dt>
                  <dd className="mt-0.5 text-sm font-bold text-white">
                    {plan.rocket.maxLeoCapacityKg} kg
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] text-slate-400 uppercase">Est. Rocket Mass</dt>
                  <dd className="mt-0.5 text-sm font-bold text-white">
                    ~{plan.rocket.estimatedGlomTonnes} Tonnes
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] text-slate-400 uppercase">Orbit Velocity</dt>
                  <dd className="mt-0.5 text-sm font-bold text-cyan-300">
                    {plan.orbitalVelocityKmS} km/s
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] text-slate-400 uppercase">Orbital Period</dt>
                  <dd className="mt-0.5 text-sm font-bold text-cyan-300">
                    {plan.orbitalPeriodMin} min
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] text-slate-400 uppercase">Remaining Margin</dt>
                  <dd className="mt-0.5 text-sm font-bold text-white">
                    {plan.massMarginKg} kg
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] text-slate-400 uppercase">Fairing Envelope</dt>
                  <dd className="mt-0.5 text-sm font-bold text-white">
                    {plan.rocket.fairingSpec}
                  </dd>
                </div>
              </dl>

              {/* Interactive Launch Simulation Stepper */}
              <div className="mt-6 border-t border-white/15 pt-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono-tech text-[11px] text-slate-300 uppercase">
                    Conceptual Staging Simulator
                  </span>
                  <button
                    type="button"
                    onClick={handleStartSimulation}
                    className="inline-flex min-h-9 items-center gap-1.5 border border-cyan-400 bg-cyan-400/15 px-3 py-1.5 font-display text-[11px] font-bold tracking-wider text-cyan-300 uppercase transition-colors hover:bg-cyan-400 hover:text-[#05070D]"
                  >
                    <Rocket className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{simActive ? 'Simulating...' : 'Simulate Launch'}</span>
                  </button>
                </div>

                <ol className="mt-3 space-y-1.5 font-mono-tech text-[11px]">
                  {LAUNCH_PHASES.map((phase, idx) => {
                    const reached = idx <= simPhaseIndex;
                    return (
                      <li
                        key={phase}
                        className={`flex items-center justify-between border px-3 py-1.5 ${
                          reached
                            ? 'border-cyan-400/40 bg-cyan-500/10 text-cyan-200'
                            : 'border-white/10 bg-[#05070D] text-slate-500'
                        }`}
                      >
                        <span>
                          0{idx + 1}. {phase}
                        </span>
                        <span>{reached ? 'OK' : 'WAIT'}</span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
