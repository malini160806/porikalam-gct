import { AnnouncementBar } from './AnnouncementBar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { ScrollProgress } from '@/components/common/ScrollProgress';
import { MouseGlow } from '@/components/common/MouseGlow';
import { ScrollTint } from '@/components/common/ScrollTint';
import { PageTransition } from '@/components/common/PageTransition';

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <ScrollProgress />
      <MouseGlow />
      <ScrollTint />
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1 pt-[109px]">
        <PageTransition />
      </main>
      <Footer />
    </div>
  );
}
