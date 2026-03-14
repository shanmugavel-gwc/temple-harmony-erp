import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import omgLogo from '@/assets/omg-logo.png';

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
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={omgLogo} alt="OMG Temple" className="h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-display font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground mt-1">Sign in to OMG Temple ERP</p>
        </div>

        <form onSubmit={handleSubmit} className="erp-card space-y-5">
          <div className="space-y-1.5">
            <Label>Role</Label>
            <select
              value={role}
              onChange={e => setRole(e.target.value as UserRole)}
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="admin">Admin</option>
              <option value="manager">Temple Manager</option>
              <option value="devotee">Devotee</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>

          <div className="space-y-1.5">
            <Label>Password</Label>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>

          <Button type="submit" className="w-full">Sign In</Button>

          <button type="button" className="w-full text-sm text-primary hover:underline">
            Forgot Password?
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
