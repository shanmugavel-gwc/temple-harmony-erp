import React from 'react';
import {
  Heart, CalendarDays, Users, Wallet, TrendingUp, CalendarCheck,
  CheckSquare, AlertTriangle
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import {
  donationTrendData, donationCategoryData, serviceBookingData,
  inventoryUsageData
} from '@/data/mockData';

const kpis = [
  { label: "Today's Donations", value: '₹1,90,000', icon: Heart, color: 'bg-primary/10 text-primary' },
  { label: "Today's Bookings", value: '24', icon: CalendarDays, color: 'bg-blue-50 text-blue-600' },
  { label: 'Total Devotees', value: '2,847', icon: Users, color: 'bg-emerald-50 text-emerald-600' },
  { label: 'Cash & Bank', value: '₹45,20,000', icon: Wallet, color: 'bg-amber-50 text-amber-600' },
  { label: 'Revenue (MTD)', value: '₹12,40,000', icon: TrendingUp, color: 'bg-purple-50 text-purple-600' },
  { label: 'Upcoming Events', value: '4', icon: CalendarCheck, color: 'bg-indigo-50 text-indigo-600' },
  { label: 'Pending Tasks', value: '7', icon: CheckSquare, color: 'bg-teal-50 text-teal-600' },
  { label: 'Inventory Alerts', value: '3', icon: AlertTriangle, color: 'bg-red-50 text-red-600' },
];

const recentActivity = [
  { text: 'Donation received from Rajesh Kumar ₹25,000', time: '10 min ago' },
  { text: 'Evening Aarti completed', time: '1 hour ago' },
  { text: 'Camphor issued to temple kitchen', time: '2 hours ago' },
  { text: 'New booking: Ganesh Pooja by Priya Sharma', time: '3 hours ago' },
  { text: 'Maintenance request approved', time: '4 hours ago' },
];

const upcomingEvents = [
  { name: 'Maha Shivaratri', date: 'Mar 20' },
  { name: 'Satyanarayana Pooja', date: 'Mar 25' },
  { name: 'Navratri Festival', date: 'Apr 6' },
];

const pendingApprovals = [
  { text: 'Leave request - Pandit Verma', type: 'Leave' },
  { text: 'Maintenance - Generator servicing', type: 'Maintenance' },
  { text: 'Hundi opening log - March 13', type: 'Audit' },
];

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(kpi => (
          <div key={kpi.label} className="kpi-card">
            <div className={`kpi-icon ${kpi.color}`}>
              <kpi.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{kpi.label}</p>
              <p className="text-xl font-display font-bold text-foreground">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 erp-card">
          <h3 className="text-base font-semibold text-foreground mb-4">Donation Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={donationTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 15%, 90%)" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} tickFormatter={v => `₹${(v/1000)}k`} />
              <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
              <Line type="monotone" dataKey="amount" stroke="hsl(1, 76%, 52%)" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="erp-card">
          <h3 className="text-base font-semibold text-foreground mb-4">Donation Categories</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={donationCategoryData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>
                {donationCategoryData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Second Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="erp-card">
          <h3 className="text-base font-semibold text-foreground mb-4">Service Bookings</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={serviceBookingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 15%, 90%)" />
              <XAxis dataKey="service" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="bookings" fill="hsl(233, 53%, 35%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="erp-card">
          <h3 className="text-base font-semibold text-foreground mb-4">Inventory Usage</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={inventoryUsageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 15%, 90%)" />
              <XAxis dataKey="item" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Legend />
              <Bar dataKey="used" fill="hsl(270, 43%, 32%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="remaining" fill="hsl(40, 70%, 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="erp-card">
          <h3 className="text-base font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                <div>
                  <p className="text-sm text-foreground">{a.text}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="erp-card">
          <h3 className="text-base font-semibold text-foreground mb-4">Pending Approvals</h3>
          <div className="space-y-3">
            {pendingApprovals.map((a, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-foreground">{a.text}</p>
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{a.type}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="erp-card">
          <h3 className="text-base font-semibold text-foreground mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {upcomingEvents.map((e, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium text-foreground">{e.name}</p>
                <span className="text-xs text-muted-foreground">{e.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
