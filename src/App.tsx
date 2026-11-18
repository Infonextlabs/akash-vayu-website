/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { CareersSection } from './components/CareersSection';
import { ContactSection } from './components/ContactSection';
import { DetailModal, type ModalPayload } from './components/DetailModal';
import { Footer } from './components/Footer';
import { GetOrbitPage } from './components/GetOrbitPage';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProjectsSection } from './components/ProjectsSection';
import { TechnologySection } from './components/TechnologySection';
import { VisionSection } from './components/VisionSection';
import {
  CAREER_OPPORTUNITIES,
  CONCEPTUAL_PROJECTS,
  TECHNOLOGY_FOCUS_AREAS,
  type CareerOpportunity,
} from './data/akashVayuData';
import { useRouter } from './utils/useRouter';

export default function App() {
  const { route, navigate } = useRouter();
  const [contactSubject, setContactSubject] = useState<string>('');

  const modalPayload: ModalPayload = useMemo(() => {
    if (!route.detailType || !route.detailId) return null;

    if (route.detailType === 'technology') {
      const found = TECHNOLOGY_FOCUS_AREAS.find((item) => item.id === route.detailId);
      return found ? { type: 'technology', item: found } : null;
    }

    if (route.detailType === 'projects') {
      const found = CONCEPTUAL_PROJECTS.find((item) => item.id === route.detailId);
      return found ? { type: 'projects', item: found } : null;
    }

    if (route.detailType === 'careers') {
      const found = CAREER_OPPORTUNITIES.find((item) => item.id === route.detailId);
      return found ? { type: 'careers', item: found } : null;
    }

    return null;
  }, [route.detailId, route.detailType]);

  const handleCloseModal = () => {
    const fallbackPath = route.detailType ? `/${route.detailType}` : '/';
    navigate(fallbackPath, { skipScroll: true });
  };

  const handleExpressCareerInterest = (role: CareerOpportunity) => {
    setContactSubject(`Career Interest: ${role.title} (${role.code})`);
    navigate('/contact');
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#0A0A0A]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-[#0A0A0A] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to main content
      </a>

      <Navbar activeSection={route.section} onNavigate={(path) => navigate(path)} />

      <main id="main-content">
        {route.section === 'get-orbit' ? (
          <GetOrbitPage onNavigate={(path) => navigate(path)} />
        ) : (
          <>
            <HeroSection onNavigate={(path) => navigate(path)} />
            <AboutSection />
            <TechnologySection
              onSelectFocusArea={(area) =>
                navigate(`/technology/${area.id}`, { skipScroll: true })
              }
            />
            <VisionSection onOpenGetOrbit={() => navigate('/get-orbit')} />
            <ProjectsSection
              onSelectProject={(project) =>
                navigate(`/projects/${project.id}`, { skipScroll: true })
              }
            />
            <CareersSection
              onSelectRole={(role) =>
                navigate(`/careers/${role.id}`, { skipScroll: true })
              }
            />
            <ContactSection prefilledSubject={contactSubject} />
          </>
        )}
      </main>

      <Footer onNavigate={(path) => navigate(path)} />

      <DetailModal
        payload={modalPayload}
        onClose={handleCloseModal}
        onExpressInterest={handleExpressCareerInterest}
      />
    </div>
  );
}
