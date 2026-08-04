import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHero } from '@/components/common/PageHero';
import { FloatingIcon } from '@/components/common/FloatingIcon';
import { RegistrationWizard } from '@/components/auth/RegistrationWizard';
import { RegistrationSuccess } from '@/components/auth/RegistrationSuccess';
import gearIcon from '@/assets/motifs/gear.webp';
import roboticArmIcon from '@/assets/motifs/robotic-arm.webp';

export default function Register() {
  const navigate = useNavigate();
  const [result, setResult] = useState<{ username: string; fullName: string } | null>(null);

  return (
    <>
      <PageHero
        title="Join Porikkalam 2026"
        subtitle="One profile, one username — your pass to every event on campus."
      />
      <section className="relative overflow-hidden bg-cream py-20">
        <div className="absolute inset-0 bp-grid-bg opacity-30" />
        <FloatingIcon src={gearIcon} className="absolute -left-8 top-10 h-40 w-40" duration={38} />
        <FloatingIcon
          src={roboticArmIcon}
          className="absolute -right-6 bottom-10 h-36 w-36"
          variant="bob"
          duration={7}
        />
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8">
          {result ? (
            <RegistrationSuccess
              username={result.username}
              fullName={result.fullName}
              onContinue={() => navigate('/login')}
            />
          ) : (
            <RegistrationWizard onSuccess={setResult} />
          )}
        </div>
      </section>
    </>
  );
}
