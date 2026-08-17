import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, KeyRound, LogIn } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { CornerOrnament } from '@/components/common/CornerOrnament';
import { loginParticipant, ParticipantAuthError } from '@/lib/participantAuth';
import { loginAdmin } from '@/lib/adminAuth';
import { useAdminSession } from '@/context/AdminSessionContext';

export function LoginForm() {
  const navigate = useNavigate();
  const { refresh: refreshAdminSession } = useAdminSession();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await loginParticipant(username.trim(), password);
      navigate('/dashboard');
    } catch (participantErr) {
      // Not a participant account — this same form doubles as the admin sign-in,
      // so silently check whether it's an admin account before surfacing an error.
      try {
        await loginAdmin(username.trim(), password);
        await refreshAdminSession();
        navigate('/admin/dashboard');
      } catch {
        setError(participantErr instanceof ParticipantAuthError ? participantErr.message : 'Could not sign you in right now.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
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
        <h2 className="font-heading text-2xl font-semibold tracking-wide text-navy">Welcome Back</h2>
        <p className="font-body text-sm text-slate">Sign in with your participant username.</p>
        <Divider className="mt-1" />
      </div>

      <div className="relative flex flex-col gap-5">
        <Input
          label="Username"
          required
          autoComplete="username"
          placeholder="PKM260001"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-0 top-4 flex h-10 w-10 items-center justify-center text-slate/60 hover:text-brown"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <Link to="/forgot-password" className="self-end font-body text-xs font-semibold text-brown hover:underline">
          Forgot password?
        </Link>
      </div>

      {error && <p className="relative font-body text-sm text-red-700">{error}</p>}

      <Button type="submit" variant="primary" size="lg" icon={<LogIn size={16} />} disabled={isSubmitting} className="relative">
        {isSubmitting ? 'Signing in…' : 'Sign In'}
      </Button>

      <p className="relative text-center font-body text-xs text-slate">
        New to Porikkalam?{' '}
        <Link to="/register" className="font-semibold text-brown hover:underline">
          Create your profile
        </Link>
      </p>
    </motion.form>
  );
}
