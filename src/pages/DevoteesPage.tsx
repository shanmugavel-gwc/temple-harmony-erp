import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { mockDevotees } from '@/data/mockData';
import { useStore } from '@/hooks/useStore';
import Modal from '@/components/Modal';
import ConfirmDialog from '@/components/ConfirmDialog';
import FormField from '@/components/FormField';
import StatusBadge from '@/components/StatusBadge';

const emptyForm = { name: '', phone: '', email: '', address: '', city: '', state: '', country: 'India', status: 'Active', totalDonations: 0, lastVisit: '' };

const DevoteesPage: React.FC = () => {
  const { items, add, update, remove } = useStore(mockDevotees);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setModalOpen(true); };
  const openEdit = (item: typeof mockDevotees[0]) => {
    setForm({ name: item.name, phone: item.phone, email: item.email, address: item.address, city: item.city, state: item.state, country: item.country, status: item.status, totalDonations: item.totalDonations, lastVisit: item.lastVisit });
    setEditId(item.id); setModalOpen(true);
  };
  const handleSave = () => {
    if (editId) update(editId, form);
    else add(form as any);
    setModalOpen(false);
  };
  const set = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: val }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-foreground">Devotees</h1>
        <Button onClick={openAdd}><Plus className="h-4 w-4 mr-2" />Add Devotee</Button>
      </div>

      <div className="table-container">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border bg-muted/50">
              <th className="text-left p-4 font-medium text-muted-foreground">Name</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Phone</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Email</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Address</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
              <th className="text-right p-4 font-medium text-muted-foreground">Total Donations</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Last Visit</th>
              <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
            </tr></thead>
            <tbody>
              {items.map(d => (
                <tr key={d.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-medium text-foreground">{d.name}</td>
                  <td className="p-4 text-muted-foreground">{d.phone}</td>
                  <td className="p-4 text-muted-foreground">{d.email}</td>
                  <td className="p-4 text-muted-foreground">{d.address}</td>
                  <td className="p-4"><StatusBadge status={d.status} /></td>
                  <td className="p-4 text-right font-medium text-foreground">₹{d.totalDonations.toLocaleString()}</td>
                  <td className="p-4 text-muted-foreground">{d.lastVisit}</td>
                  <td className="p-4 text-right">
                    <div className="flex gap-1 justify-end">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(d)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(d.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Edit Devotee' : 'Add Devotee'}>
        <div className="space-y-4">
          <FormField label="Name" value={form.name} onChange={v => set('name', v)} required />
          <FormField label="Phone" value={form.phone} onChange={v => set('phone', v)} />
          <FormField label="Email" value={form.email} onChange={v => set('email', v)} type="email" />
          <FormField label="Address" value={form.address} onChange={v => set('address', v)} />
          <div className="grid grid-cols-2 gap-4">
            <FormField label="City" value={form.city} onChange={v => set('city', v)} />
            <FormField label="State" value={form.state} onChange={v => set('state', v)} />
          </div>
          <FormField label="Country" value={form.country} onChange={v => set('country', v)} />
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleSave} className="flex-1">Save</Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => deleteId && remove(deleteId)} title="Delete Devotee" message="Are you sure you want to delete this devotee? This action cannot be undone." />
    </div>
  );
};

export default DevoteesPage;
