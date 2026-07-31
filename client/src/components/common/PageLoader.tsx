import { GearMotif } from './GearMotif';

export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-cream">
      <GearMotif className="h-12 w-12 animate-spin text-gold" />
    </div>
  );
}
