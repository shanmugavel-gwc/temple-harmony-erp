import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@omgtemple.com');
  const [password, setPassword] = useState('password');
  const [role, setRole] = useState<UserRole>('admin');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password, role);
    if (success) {
      navigate(role === 'devotee' ? '/donate' : '/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-secondary relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full border border-secondary-foreground/20" />
          <div className="absolute bottom-32 right-16 w-48 h-48 rounded-full border border-secondary-foreground/20" />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full border border-secondary-foreground/20" />
        </div>
        <div className="relative z-10 text-center text-secondary-foreground px-12 animate-fade-in">
          <Heart className="h-16 w-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-display font-bold mb-3">OMG Temple</h2>
          <p className="text-secondary-foreground/70 text-lg leading-relaxed">
            Manage devotees, services, donations & temple operations — all in one place.
          </p>
        </div>
      </div>

      {/* Right login form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm animate-fade-in">
          <div className="mb-8">
            <div className="lg:hidden flex items-center gap-2 mb-6">
              <Heart className="h-6 w-6 text-primary" />
              <span className="text-lg font-display font-bold text-foreground">OMG Temple</span>
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">Welcome back</h1>
            <p className="text-muted-foreground mt-1 text-sm">Sign in to continue to your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Role</Label>
              <select
                value={role}
                onChange={e => setRole(e.target.value as UserRole)}
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              >
                <option value="admin">Admin</option>
                <option value="manager">Temple Manager</option>
                <option value="devotee">Devotee</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Email</Label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Password</Label>
                <button type="button" className="text-xs text-primary hover:underline">Forgot?</button>
              </div>
              <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>

            <Button type="submit" className="w-full h-11 font-medium">Sign In</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
