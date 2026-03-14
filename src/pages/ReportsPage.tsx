import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';

const reportTypes = [
  { id: 'donations', title: 'Donation Document', description: 'Detailed donation history and analytics' },
  { id: 'devotees', title: 'Devotee Document', description: 'Devotee registration and engagement data' },
  { id: 'bookings', title: 'Service Booking Document', description: 'Service booking trends and revenue' },
  { id: 'inventory', title: 'Inventory Document', description: 'Stock usage, alerts, and supplier data' },
];

const DocumentPage: React.FC = () => {
  const [selected, setSelected] = useState('donations');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold text-foreground">Document</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportTypes.map(r => (
          <button
            key={r.id}
            onClick={() => setSelected(r.id)}
            className={`erp-card text-left transition-all ${selected === r.id ? 'ring-2 ring-primary' : ''}`}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{r.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{r.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="erp-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-display font-semibold text-foreground">
            {reportTypes.find(r => r.id === selected)?.title}
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />Export PDF</Button>
            <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />Export Excel</Button>
          </div>
        </div>

        <div className="text-center py-12 text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Select date range and filters to generate report</p>
          <div className="flex gap-3 justify-center mt-4">
            <input type="date" className="h-9 rounded-md border border-input bg-background px-3 text-sm" />
            <input type="date" className="h-9 rounded-md border border-input bg-background px-3 text-sm" />
            <Button size="sm">Generate</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPage;
