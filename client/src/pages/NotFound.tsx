import { Button } from '@/components/ui/Button';
import { TempleSilhouette } from '@/components/common/TempleSilhouette';
import { Divider } from '@/components/ui/Divider';

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center gap-6 navy-paper px-4 py-24 text-center text-cream">
      <TempleSilhouette className="h-32 w-32 text-gold/60" strokeWidth={1} />
      <span className="font-heading text-6xl text-gold">404</span>
      <h1 className="font-heading text-2xl text-cream">This Path Has Faded Into History</h1>
      <Divider />
      <p className="max-w-sm font-body text-sm text-beige/80">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button to="/" variant="primary">
        Return Home
      </Button>
    </section>
  );
}
