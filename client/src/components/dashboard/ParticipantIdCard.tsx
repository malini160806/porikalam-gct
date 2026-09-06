import { Settings as GearIcon, User as UserIcon } from 'lucide-react';
import { SITE } from '@/constants/site';
import { resolveUploadUrl } from '@/lib/apiClient';
import { ParticipantQrCode } from './ParticipantQrCode';

type ParticipantIdCardProps = {
  name: string;
  username: string;
  department: string | null;
  yearOfStudy: string | null;
  photoUrl: string | null;
};

export function ParticipantIdCard({ name, username, department, yearOfStudy, photoUrl }: ParticipantIdCardProps) {
  const resolvedPhotoUrl = resolveUploadUrl(photoUrl);
  return (
    <div className="relative mx-auto flex w-full max-w-xs flex-col gap-5 overflow-hidden border border-gold/40 bg-gradient-to-br from-navy-deep via-navy to-tech-blue/50 p-6 text-cream shadow-card">
      <div className="pointer-events-none absolute inset-0 bp-grid-bg opacity-[0.12]" />

      <div className="relative flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/60 text-gold">
          <GearIcon size={18} strokeWidth={1.5} />
        </div>
        <div>
          <p className="font-heading text-sm font-bold tracking-wide text-gold">
            {SITE.name} {SITE.year}
          </p>
          <p className="font-body text-[9px] uppercase tracking-widest text-beige/70">{SITE.tagline}</p>
        </div>
      </div>

      <div className="relative flex h-24 w-24 items-center justify-center self-center overflow-hidden rounded-md border-2 border-cream/80 bg-cream/90">
        {resolvedPhotoUrl ? (
          <img src={resolvedPhotoUrl} alt={name} className="h-full w-full object-cover" />
        ) : (
          <UserIcon size={48} className="text-navy/40" strokeWidth={1} />
        )}
      </div>

      <div className="relative text-center">
        <p className="font-heading text-lg font-bold tracking-wide text-cream">{name}</p>
        <p className="font-body text-xs text-beige/75">
          {department || 'Department To Be Announced'}
          {yearOfStudy ? ` · ${yearOfStudy}` : ''}
        </p>
      </div>

      <p className="relative text-center font-heading text-sm font-bold uppercase tracking-[0.3em] text-gold">
        Participant
      </p>

      <div className="relative flex flex-col items-center gap-2 border-t border-gold/20 pt-4">
        <div className="flex h-24 w-24 items-center justify-center border border-cream/40 bg-cream/95 p-1.5">
          <ParticipantQrCode username={username} size={88} />
        </div>
        <span className="font-body text-[10px] uppercase tracking-wide text-beige/60">
          Show this at check-in — scans straight to {username}
        </span>
      </div>
    </div>
  );
}
