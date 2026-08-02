import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { loginParticipant, ParticipantAuthError } from '@/lib/participantAuth';

export function LoginForm() {
  const navigate = useNavigate();
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
    } catch (err) {
      setError(err instanceof ParticipantAuthError ? err.message : 'Could not sign you in right now.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-sm flex-col gap-5 border border-navy/15 bg-white/40 p-8">
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
          className="absolute right-3 top-9 text-slate/60 hover:text-brown"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {error && <p className="font-body text-sm text-red-700">{error}</p>}

      <Button type="submit" variant="primary" size="lg" icon={<LogIn size={16} />} disabled={isSubmitting}>
        {isSubmitting ? 'Signing in…' : 'Sign In'}
      </Button>

      <p className="text-center font-body text-xs text-slate">
        New to Porikkalam?{' '}
        <Link to="/register" className="font-semibold text-brown hover:underline">
          Create your profile
        </Link>
      </p>
    </form>
  );
}
