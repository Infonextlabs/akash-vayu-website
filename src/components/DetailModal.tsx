import { useEffect } from 'react';
import { X } from 'lucide-react';
import type {
  CareerOpportunity,
  ConceptualProject,
  TechFocusArea,
} from '../data/akashVayuData';

export type ModalPayload =
  | { type: 'technology'; item: TechFocusArea }
  | { type: 'projects'; item: ConceptualProject }
  | { type: 'careers'; item: CareerOpportunity }
  | null;

interface DetailModalProps {
  payload: ModalPayload;
  onClose: () => void;
  onExpressInterest?: (role: CareerOpportunity) => void;
}

export function DetailModal({ payload, onClose, onExpressInterest }: DetailModalProps) {
  useEffect(() => {
    if (!payload) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [payload, onClose]);

  if (!payload) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto border border-black/15 bg-white p-6 text-[#0A0A0A] shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close detail dialog"
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center border border-black/15 text-[#0A0A0A] transition-colors hover:border-[#0057FF] hover:text-[#0057FF] focus-visible:outline-2 focus-visible:outline-[#0057FF]"
        >
          <X className="h-5 w-5" />
        </button>

        {payload.type === 'technology' && (
          <div>
            <p className="font-mono-tech text-xs font-semibold text-[#0057FF]">
              {payload.item.index} · {payload.item.subtitle}
            </p>
            <h2
              id="detail-modal-title"
              className="mt-2 pr-10 font-display text-2xl font-bold text-[#0A0A0A] uppercase sm:text-3xl"
            >
              {payload.item.title}
            </h2>

            <div className="mt-5 aspect-[16/9] w-full overflow-hidden border border-black/10 bg-[#0B101E]">
              <img
                src={payload.item.image}
                alt={payload.item.imageAlt}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>

            <dl className="mt-6 grid gap-4 border-y border-black/10 py-4 sm:grid-cols-3">
              {payload.item.keyParameters.map((param) => (
                <div key={param.label}>
                  <dt className="font-mono-tech text-[11px] text-slate-500 uppercase">
                    {param.label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-[#0A0A0A]">{param.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 space-y-3 text-sm leading-relaxed text-slate-700">
              {payload.item.details.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}

        {payload.type === 'projects' && (
          <div>
            <p className="font-mono-tech text-xs font-semibold text-[#0057FF]">
              {payload.item.code} · {payload.item.stage} · {payload.item.domain}
            </p>
            <h2
              id="detail-modal-title"
              className="mt-2 pr-10 font-display text-2xl font-bold text-[#0A0A0A] uppercase sm:text-3xl"
            >
              {payload.item.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700">{payload.item.summary}</p>

            <div className="mt-6 border border-black/10 bg-[#F7F7F7] p-4">
              <p className="font-mono-tech text-xs text-slate-500 uppercase">Architecture Focus</p>
              <p className="mt-1 text-sm font-semibold text-[#0A0A0A]">
                {payload.item.architectureFocus}
              </p>
            </div>

            <dl className="mt-6 grid gap-4 border-y border-black/10 py-4 sm:grid-cols-3">
              {payload.item.metrics.map((m) => (
                <div key={m.label}>
                  <dt className="font-mono-tech text-[11px] text-slate-500 uppercase">{m.label}</dt>
                  <dd className="mt-1 text-sm font-semibold text-[#0A0A0A]">{m.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6">
              <h3 className="font-display text-sm font-bold tracking-wider text-[#0A0A0A] uppercase">
                Research Objectives
              </h3>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-slate-700">
                {payload.item.objectives.map((obj, idx) => (
                  <li key={idx} className="flex gap-2.5">
                    <span className="font-mono-tech font-semibold text-[#0057FF]">
                      0{idx + 1}.
                    </span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {payload.type === 'careers' && (
          <div>
            <p className="font-mono-tech text-xs font-semibold text-[#0057FF]">
              {payload.item.code} · {payload.item.discipline} · {payload.item.location}
            </p>
            <h2
              id="detail-modal-title"
              className="mt-2 pr-10 font-display text-2xl font-bold leading-snug text-[#0A0A0A] uppercase sm:text-3xl"
            >
              {payload.item.title}
            </h2>
            <p className="mt-2 font-mono-tech text-xs text-slate-500">
              {payload.item.engagementLabel}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-700">{payload.item.summary}</p>

            <div className="mt-6 border-t border-black/10 pt-5">
              <h3 className="font-display text-sm font-bold tracking-wider text-[#0A0A0A] uppercase">
                Key Focus Areas
              </h3>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-slate-700">
                {payload.item.focusAreas.map((item, idx) => (
                  <li key={idx} className="flex gap-2.5">
                    <span className="font-mono-tech font-semibold text-[#0057FF]">
                      0{idx + 1}.
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-black/10 pt-5">
              <h3 className="font-display text-sm font-bold tracking-wider text-[#0A0A0A] uppercase">
                Preferred Engineering Background
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
                {payload.item.preferredBackground.map((item, idx) => (
                  <li key={idx} className="flex gap-2.5">
                    <span className="font-mono-tech font-semibold text-slate-400">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border border-black/10 bg-[#F7F7F7] p-4 text-xs leading-relaxed text-slate-600">
              AKASH VAYU is an early-stage Indian space-technology venture. Expressing interest
              shares your profile context directly with our founding engineering inquiry queue.
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-black/10 pt-4">
          {payload.type === 'careers' && onExpressInterest && (
            <button
              type="button"
              onClick={() => onExpressInterest(payload.item)}
              className="min-h-10 bg-[#0057FF] px-5 py-2 font-display text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#0A0A0A] focus-visible:outline-2 focus-visible:outline-[#0057FF]"
            >
              Express Interest
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="min-h-10 bg-[#0A0A0A] px-5 py-2 font-display text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#0057FF] focus-visible:outline-2 focus-visible:outline-[#0057FF]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
