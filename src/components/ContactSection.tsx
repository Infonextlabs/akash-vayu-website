import { useEffect, useState } from 'react';
import { CheckCircle2, ExternalLink, Globe, Send } from 'lucide-react';
import {
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from '../utils/contactValidation';
import { OFFICIAL_FACEBOOK, OFFICIAL_INSTAGRAM } from '../data/akashVayuData';
import { FacebookIcon } from './FacebookIcon';
import { InstagramIcon } from './InstagramIcon';

const INITIAL_VALUES: ContactFormValues = {
  fullName: '',
  email: '',
  organization: '',
  subject: '',
  message: '',
};

const SOCIAL_CHANNELS = [
  { name: 'LinkedIn', status: 'Corporate profile placeholder' },
  { name: 'X (Twitter)', status: 'Announcements channel placeholder' },
  { name: 'GitHub', status: 'Open research placeholder' },
  { name: 'YouTube', status: 'Technical briefings placeholder' },
];

interface ContactSectionProps {
  prefilledSubject?: string;
}

export function ContactSection({ prefilledSubject }: ContactSectionProps) {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submittedData, setSubmittedData] = useState<ContactFormValues | null>(null);
  const [selectedChannelNote, setSelectedChannelNote] = useState<string | null>(null);

  useEffect(() => {
    if (!prefilledSubject) return;
    setSubmittedData(null);
    setValues((prev) => ({ ...prev, subject: prefilledSubject }));
  }, [prefilledSubject]);

  const handleChange = (field: keyof ContactFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateContactForm(values);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setSubmittedData(validation.sanitized);
    setValues(INITIAL_VALUES);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-16 border-t border-black/10 bg-[#F7F7F7] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Contact Context & Social Placeholders */}
          <div className="lg:col-span-5">
            <p className="font-mono-tech text-xs font-medium tracking-[0.16em] text-[#0057FF] uppercase">
              06 · Contact AKASH VAYU
            </p>
            <h2
              id="contact-heading"
              className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0A0A0A] uppercase [text-wrap:balance] sm:text-4xl"
            >
              Build India&apos;s Space Future With Us
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              Whether you represent an academic laboratory, aerospace engineering community, or
              deep-tech ecosystem initiative, use the inquiry form to connect with AKASH VAYU.
            </p>

            <div className="mt-8 border-t border-black/10 pt-6">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-[#0A0A0A]">
                <Globe className="h-4 w-4 text-[#0057FF]" aria-hidden="true" />
                <span>Venture Communications Notice</span>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                Direct corporate addresses, phone lines, and physical facility details are withheld
                during our pre-operational phase and will be published once formal communications
                channels open.
              </p>

              <div className="mt-6">
                <p className="font-mono-tech text-xs text-slate-500 uppercase">
                  Official Social Channels
                </p>
                <div className="mt-2.5 space-y-2.5">
                  <a
                    href={OFFICIAL_INSTAGRAM.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-12 w-full items-center justify-between gap-3 border border-black/15 bg-white px-3.5 py-2.5 text-left transition-colors hover:border-[#0057FF] focus-visible:outline-2 focus-visible:outline-[#0057FF]"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#0A0A0A] text-white transition-colors group-hover:bg-[#0057FF]">
                        <InstagramIcon className="h-4.5 w-4.5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono-tech text-[10px] tracking-wider text-slate-500 uppercase">
                          Instagram · Official
                        </span>
                        <span className="block truncate font-display text-xs font-bold tracking-wide text-[#0A0A0A] transition-colors group-hover:text-[#0057FF] sm:text-sm">
                          {OFFICIAL_INSTAGRAM.username}
                        </span>
                      </span>
                    </span>
                    <ExternalLink
                      className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-[#0057FF]"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Open @akashvayuaerospace on Instagram in a new tab</span>
                  </a>

                  <a
                    href={OFFICIAL_FACEBOOK.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-12 w-full items-center justify-between gap-3 border border-black/15 bg-white px-3.5 py-2.5 text-left transition-colors hover:border-[#0057FF] focus-visible:outline-2 focus-visible:outline-[#0057FF]"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#0A0A0A] text-white transition-colors group-hover:bg-[#0057FF]">
                        <FacebookIcon className="h-4.5 w-4.5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono-tech text-[10px] tracking-wider text-slate-500 uppercase">
                          Facebook · Official
                        </span>
                        <span className="block truncate font-display text-xs font-bold tracking-wide text-[#0A0A0A] transition-colors group-hover:text-[#0057FF] sm:text-sm">
                          {OFFICIAL_FACEBOOK.label}
                        </span>
                      </span>
                    </span>
                    <ExternalLink
                      className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-[#0057FF]"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Open AKASH VAYU on Facebook in a new tab</span>
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <p className="font-mono-tech text-xs text-slate-500 uppercase">
                  Social Channels (Placeholders)
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2.5">
                  {SOCIAL_CHANNELS.map((channel) => (
                    <button
                      key={channel.name}
                      type="button"
                      onClick={() =>
                        setSelectedChannelNote(
                          `${channel.name}: ${channel.status}. Official handle will be linked upon launch.`,
                        )
                      }
                      className="flex min-h-10 items-center justify-between border border-black/15 bg-white px-3 py-2 text-left text-xs font-semibold text-[#0A0A0A] transition-colors hover:border-[#0057FF] hover:text-[#0057FF] focus-visible:outline-2 focus-visible:outline-[#0057FF]"
                    >
                      <span>{channel.name}</span>
                      <span className="font-mono-tech text-[10px] text-slate-500">Soon</span>
                    </button>
                  ))}
                </div>
                {selectedChannelNote && (
                  <p role="status" className="mt-3 font-mono-tech text-xs text-[#0057FF]">
                    {selectedChannelNote}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Validated Contact Form */}
          <div className="lg:col-span-7">
            <div className="border border-black/15 bg-white p-6 sm:p-8">
              {submittedData ? (
                <div role="status" className="py-6">
                  <div className="flex items-center gap-3 text-[#0057FF]">
                    <CheckCircle2 className="h-6 w-6 shrink-0" aria-hidden="true" />
                    <h3 className="font-display text-2xl font-bold text-[#0A0A0A] uppercase">
                      Inquiry Recorded
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">
                    Thank you, {submittedData.fullName}. Your message regarding{' '}
                    <span className="font-semibold text-[#0A0A0A]">{submittedData.subject}</span>{' '}
                    has been validated and logged for review.
                  </p>

                  <dl className="mt-6 grid gap-4 border border-black/10 bg-[#F7F7F7] p-4 sm:grid-cols-2">
                    <div>
                      <dt className="font-mono-tech text-[11px] text-slate-500 uppercase">Email</dt>
                      <dd className="mt-1 text-sm text-[#0A0A0A]">{submittedData.email}</dd>
                    </div>
                    <div>
                      <dt className="font-mono-tech text-[11px] text-slate-500 uppercase">
                        Organization
                      </dt>
                      <dd className="mt-1 text-sm text-[#0A0A0A]">
                        {submittedData.organization || 'Not specified'}
                      </dd>
                    </div>
                  </dl>

                  <button
                    type="button"
                    onClick={() => setSubmittedData(null)}
                    className="mt-6 inline-flex min-h-11 items-center border border-black/20 bg-[#0A0A0A] px-5 py-2.5 font-display text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#0057FF] focus-visible:outline-2 focus-visible:outline-[#0057FF]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-fullName"
                        className="block text-sm font-semibold text-[#0A0A0A]"
                      >
                        Full Name <span className="text-[#0057FF]">*</span>
                      </label>
                      <input
                        id="contact-fullName"
                        name="fullName"
                        type="text"
                        required
                        value={values.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={errors.fullName ? 'error-fullName' : undefined}
                        placeholder="e.g. Aarav Kulkarni"
                        className="mt-2 block w-full border border-black/20 bg-[#F7F7F7] px-3.5 py-2.5 text-sm text-[#0A0A0A] placeholder:text-slate-400 focus:border-[#0057FF] focus:bg-white focus:outline-none"
                      />
                      {errors.fullName && (
                        <p id="error-fullName" role="alert" className="mt-1.5 text-xs text-red-600">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-semibold text-[#0A0A0A]"
                      >
                        Email Address <span className="text-[#0057FF]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={values.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'error-email' : undefined}
                        placeholder="name@organization.org"
                        className="mt-2 block w-full border border-black/20 bg-[#F7F7F7] px-3.5 py-2.5 text-sm text-[#0A0A0A] placeholder:text-slate-400 focus:border-[#0057FF] focus:bg-white focus:outline-none"
                      />
                      {errors.email && (
                        <p id="error-email" role="alert" className="mt-1.5 text-xs text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-organization"
                        className="block text-sm font-semibold text-[#0A0A0A]"
                      >
                        Organization
                      </label>
                      <input
                        id="contact-organization"
                        name="organization"
                        type="text"
                        value={values.organization}
                        onChange={(e) => handleChange('organization', e.target.value)}
                        aria-invalid={Boolean(errors.organization)}
                        aria-describedby={errors.organization ? 'error-organization' : undefined}
                        placeholder="University, Lab, or Company (optional)"
                        className="mt-2 block w-full border border-black/20 bg-[#F7F7F7] px-3.5 py-2.5 text-sm text-[#0A0A0A] placeholder:text-slate-400 focus:border-[#0057FF] focus:bg-white focus:outline-none"
                      />
                      {errors.organization && (
                        <p
                          id="error-organization"
                          role="alert"
                          className="mt-1.5 text-xs text-red-600"
                        >
                          {errors.organization}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-sm font-semibold text-[#0A0A0A]"
                      >
                        Subject <span className="text-[#0057FF]">*</span>
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        required
                        value={values.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        aria-invalid={Boolean(errors.subject)}
                        aria-describedby={errors.subject ? 'error-subject' : undefined}
                        placeholder="Research collaboration, Advisory, General"
                        className="mt-2 block w-full border border-black/20 bg-[#F7F7F7] px-3.5 py-2.5 text-sm text-[#0A0A0A] placeholder:text-slate-400 focus:border-[#0057FF] focus:bg-white focus:outline-none"
                      />
                      {errors.subject && (
                        <p id="error-subject" role="alert" className="mt-1.5 text-xs text-red-600">
                          {errors.subject}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-semibold text-[#0A0A0A]"
                    >
                      Message <span className="text-[#0057FF]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      value={values.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'error-message' : undefined}
                      placeholder="Share details of your inquiry or proposed area of scientific dialogue..."
                      className="mt-2 block w-full border border-black/20 bg-[#F7F7F7] px-3.5 py-2.5 text-sm text-[#0A0A0A] placeholder:text-slate-400 focus:border-[#0057FF] focus:bg-white focus:outline-none"
                    />
                    {errors.message && (
                      <p id="error-message" role="alert" className="mt-1.5 text-xs text-red-600">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <span className="font-mono-tech text-xs text-slate-500">
                      Fields marked * are required.
                    </span>
                    <button
                      type="submit"
                      className="inline-flex min-h-11 items-center gap-2 bg-[#0A0A0A] px-6 py-2.5 font-display text-xs font-bold tracking-[0.12em] text-white uppercase transition-colors duration-200 hover:bg-[#0057FF] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0057FF]"
                    >
                      <span>Submit Inquiry</span>
                      <Send className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
