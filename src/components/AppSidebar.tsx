import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard, Users, BookOpen, CalendarDays, Heart,
  CalendarCheck, CheckSquare, Package, Building2, BarChart3,
  Settings, LogOut
} from 'lucide-react';
import omgLogo from '@/assets/omg-logo.png';

const adminLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/devotees', label: 'Devotees', icon: Users },
  { to: '/services', label: 'Services', icon: BookOpen },
  { to: '/bookings', label: 'Bookings', icon: CalendarDays },
  { to: '/donations', label: 'Donations', icon: Heart },
  { to: '/events', label: 'Events & Calendar', icon: CalendarCheck },
  { to: '/tasks', label: 'Tasks', icon: CheckSquare },
  { to: '/inventory', label: 'Inventory', icon: Package },
  { to: '/assets', label: 'Assets', icon: Building2 },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
];

const managerLinks = adminLinks.filter(l => !['/reports', '/settings', '/assets'].includes(l.to));
const devoteeLinks = [
  { to: '/services', label: 'Services', icon: BookOpen },
  { to: '/bookings', label: 'Bookings', icon: CalendarDays },
  { to: '/events', label: 'Events', icon: CalendarCheck },
  { to: '/donate', label: 'Donate', icon: Heart },
];

const AppSidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const links = user?.role === 'admin' ? adminLinks : user?.role === 'manager' ? managerLinks : devoteeLinks;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-secondary text-secondary-foreground flex flex-col min-h-screen shrink-0">
      <div className="p-5 border-b border-sidebar-border">
        <img src={omgLogo} alt="OMG Temple" className="h-10 brightness-0 invert" />
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-secondary-foreground/70 hover:text-secondary-foreground hover:bg-sidebar-accent/50'
              }`
            }
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-secondary-foreground/70 hover:text-secondary-foreground hover:bg-sidebar-accent/50 w-full transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
