import { type FormEvent } from 'react';
import { ShieldCheck } from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function CertificateVerify() {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <>
      <PageHero title="Certificate Verification" subtitle="Confirm the authenticity of a Porikkalam certificate." />

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 border border-navy/15 bg-white/40 p-8 text-center">
            <ShieldCheck size={32} className="text-gold" strokeWidth={1.5} />
            <Badge variant="outline">Verification Opens After The Event</Badge>
            <p className="font-body text-sm text-slate">
              Enter the certificate ID printed on your certificate to verify it once the event concludes.
            </p>
            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
              <Input
                label="Certificate ID"
                id="certificateId"
                name="certificateId"
                placeholder="e.g. PKM26-CERT-0001"
                disabled
              />
              <Button type="submit" variant="primary" disabled>
                Verify Certificate
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
