import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, KeyRound, Mail, Send } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { CornerOrnament } from '@/components/common/CornerOrnament';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mx-auto flex w-full max-w-sm flex-col gap-6 overflow-hidden border border-gold/30 bg-white/50 p-8 shadow-card sm:p-10"
    >
      <CornerOrnament corner="top-left" />
      <CornerOrnament corner="bottom-right" />

      <div className="relative flex flex-col items-center gap-2 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 text-brown">
          <KeyRound size={24} strokeWidth={1.5} />
        </div>
        <h2 className="font-heading text-2xl font-semibold tracking-wide text-navy">Reset Password</h2>
        <p className="font-body text-sm text-slate">
          Enter the email linked to your participant account.
        </p>
        <Divider className="mt-1" />
      </div>

      {submitted ? (
        <div className="relative flex flex-col items-center gap-3 text-center">
          <CheckCircle2 size={28} className="text-brown" />
          <p className="font-body text-sm text-navy">
            If an account exists for <strong>{email}</strong>, a reset link has been sent. Check your
            inbox shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="relative flex flex-col gap-5">
          <Input
            label="Email Address"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" variant="primary" size="lg" icon={<Send size={16} />}>
            Send Reset Link
          </Button>
        </form>
      )}

      <p className="relative flex items-center justify-center gap-1.5 text-center font-body text-xs text-slate">
        <Mail size={12} className="text-brown" />
        Remembered it?{' '}
        <Link to="/login" className="font-semibold text-brown hover:underline">
          Back to Sign In
        </Link>
      </p>
    </motion.div>
  );
}
