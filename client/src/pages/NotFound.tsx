import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import templeColor from '@/assets/heritage/temple-illustration-color.webp';

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center gap-6 navy-paper px-4 py-24 text-center text-cream">
      <img
        src={templeColor}
        alt="A weathered temple gopuram, faded like this page"
        className="h-40 w-auto border border-gold/30 opacity-90 shadow-card"
      />
      <span className="font-heading text-5xl font-extrabold tracking-wide text-gold sm:text-7xl">404</span>
      <h1 className="font-heading text-3xl font-bold uppercase tracking-wide text-cream sm:text-4xl">
        This Path Has Faded Into History
      </h1>
      <Divider />
      <p className="font-quote max-w-sm text-lg italic text-beige/85">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button to="/" variant="primary">
        Return Home
      </Button>
    </section>
  );
}
