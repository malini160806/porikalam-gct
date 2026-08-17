import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, UserPlus, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { CornerOrnament } from '@/components/common/CornerOrnament';
import { signupAdmin, AdminAuthError } from '@/lib/adminAuth';
import { useAdminSession } from '@/context/AdminSessionContext';
import gctBuildingBanner from '@/assets/heritage/gct-building-banner.png';

export default function AdminSignup() {
  const navigate = useNavigate();
  const { refresh } = useAdminSession();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [signupCode, setSignupCode] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await signupAdmin({
        name: name.trim(),
        username: username.trim(),
        email: email.trim(),
        signupCode: signupCode.trim(),
        password,
      });
      await refresh();
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err instanceof AdminAuthError ? err.message : 'Could not create your admin account right now.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-deep px-4 py-16">
      <img
        src={gctBuildingBanner}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.12]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-deep via-navy-deep/85 to-navy-deep" />
      <div className="pointer-events-none absolute inset-0 bp-grid-bg opacity-20" />

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative flex w-full max-w-sm flex-col gap-6 overflow-hidden border border-gold/30 bg-navy/70 p-8 shadow-[0_0_50px_-12px_rgba(212,175,55,0.35)] backdrop-blur-sm sm:p-10"
      >
        <CornerOrnament corner="top-left" className="z-10" />
        <CornerOrnament corner="bottom-right" className="z-10" />

        <div className="relative flex flex-col items-center gap-2 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 text-gold shadow-[0_0_18px_-4px_rgba(212,175,55,0.5)]">
            <ShieldCheck size={24} strokeWidth={1.5} />
          </div>
          <h1 className="font-heading text-2xl font-bold uppercase tracking-widest text-gold">Admin Signup</h1>
          <p className="font-body text-xs uppercase tracking-[0.2em] text-beige/70">
            Porikkalam 2026 — Event Administration
          </p>
          <Divider className="mt-1" />
        </div>

        <div className="relative flex flex-col gap-5">
          <div>
            <label htmlFor="admin-name" className="font-body text-xs font-semibold uppercase tracking-wider text-beige/70">
              Full Name
            </label>
            <input
              id="admin-name"
              required
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 w-full border border-gold/25 bg-navy-deep/60 px-4 py-3 font-body text-sm text-cream placeholder:text-beige/40 outline-none transition-all duration-200 focus:border-gold focus:ring-1 focus:ring-gold focus:shadow-[0_0_12px_0_rgba(212,175,55,0.35)]"
            />
          </div>

          <div>
            <label htmlFor="admin-username" className="font-body text-xs font-semibold uppercase tracking-wider text-beige/70">
              Username
            </label>
            <input
              id="admin-username"
              required
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1.5 w-full border border-gold/25 bg-navy-deep/60 px-4 py-3 font-body text-sm text-cream placeholder:text-beige/40 outline-none transition-all duration-200 focus:border-gold focus:ring-1 focus:ring-gold focus:shadow-[0_0_12px_0_rgba(212,175,55,0.35)]"
            />
          </div>

          <div>
            <label htmlFor="admin-email" className="font-body text-xs font-semibold uppercase tracking-wider text-beige/70">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full border border-gold/25 bg-navy-deep/60 px-4 py-3 font-body text-sm text-cream placeholder:text-beige/40 outline-none transition-all duration-200 focus:border-gold focus:ring-1 focus:ring-gold focus:shadow-[0_0_12px_0_rgba(212,175,55,0.35)]"
            />
          </div>

          <div className="relative">
            <label htmlFor="admin-password" className="font-body text-xs font-semibold uppercase tracking-wider text-beige/70">
              Password
            </label>
            <input
              id="admin-password"
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full border border-gold/25 bg-navy-deep/60 px-4 py-3 pr-11 font-body text-sm text-cream placeholder:text-beige/40 outline-none transition-all duration-200 focus:border-gold focus:ring-1 focus:ring-gold focus:shadow-[0_0_12px_0_rgba(212,175,55,0.35)]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-0 top-[34px] flex h-11 w-11 items-center justify-center text-beige/50 hover:text-gold"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div>
            <label htmlFor="admin-signup-code" className="font-body text-xs font-semibold uppercase tracking-wider text-beige/70">
              Signup Code
            </label>
            <input
              id="admin-signup-code"
              required
              value={signupCode}
              onChange={(e) => setSignupCode(e.target.value)}
              className="mt-1.5 w-full border border-gold/25 bg-navy-deep/60 px-4 py-3 font-body text-sm text-cream placeholder:text-beige/40 outline-none transition-all duration-200 focus:border-gold focus:ring-1 focus:ring-gold focus:shadow-[0_0_12px_0_rgba(212,175,55,0.35)]"
            />
            <p className="mt-1.5 font-body text-[11px] text-beige/50">Provided by an existing super admin.</p>
          </div>
        </div>

        {error && (
          <p role="alert" className="relative border border-red-500/30 bg-red-950/30 px-3 py-2 font-body text-sm text-red-300">
            {error}
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          icon={<UserPlus size={16} />}
          disabled={isSubmitting}
          className="relative w-full"
        >
          {isSubmitting ? 'Creating Account…' : 'Create Admin Account'}
        </Button>

        <div className="relative flex flex-col items-center gap-2">
          <Link to="/admin/login" className="font-body text-xs text-beige/50 transition-colors hover:text-gold">
            Already have an account? Sign in
          </Link>
          <Link to="/" className="font-body text-xs text-beige/50 transition-colors hover:text-gold">
            ← Back to Porikkalam 2026
          </Link>
        </div>
      </motion.form>
    </div>
  );
}
