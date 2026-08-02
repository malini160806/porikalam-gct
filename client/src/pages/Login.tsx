import { PageHero } from '@/components/common/PageHero';
import { FloatingIcon } from '@/components/common/FloatingIcon';
import { LoginForm } from '@/components/auth/LoginForm';
import lightbulbIcon from '@/assets/motifs/lightbulb.png';
import leafIcon from '@/assets/motifs/leaf.png';

export default function Login() {
  return (
    <>
      <PageHero title="Sign In" subtitle="Welcome back — sign in with your participant username." />
      <section className="relative overflow-hidden bg-cream py-20">
        <FloatingIcon src={lightbulbIcon} className="absolute -left-6 top-8 h-32 w-32" variant="bob" duration={6.5} />
        <FloatingIcon src={leafIcon} className="absolute -right-8 bottom-6 h-36 w-36" duration={44} />
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8">
          <LoginForm />
        </div>
      </section>
    </>
  );
}
