import { PageHero } from '@/components/common/PageHero';
import { FloatingIcon } from '@/components/common/FloatingIcon';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import lightbulbIcon from '@/assets/motifs/lightbulb.png';
import gearIcon from '@/assets/motifs/gear.png';

export default function ForgotPassword() {
  return (
    <>
      <PageHero title="Reset Password" subtitle="We'll help you get back into your account." />
      <section className="relative overflow-hidden bg-cream py-20">
        <div className="absolute inset-0 bp-grid-bg opacity-30" />
        <FloatingIcon src={lightbulbIcon} className="absolute -left-6 top-8 h-32 w-32" variant="bob" duration={6.5} />
        <FloatingIcon src={gearIcon} className="absolute -right-8 bottom-6 h-36 w-36" duration={44} />
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8">
          <ForgotPasswordForm />
        </div>
      </section>
    </>
  );
}
