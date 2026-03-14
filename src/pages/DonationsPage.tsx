import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { mockDonations } from '@/data/mockData';
import { useStore } from '@/hooks/useStore';
import Modal from '@/components/Modal';
import ConfirmDialog from '@/components/ConfirmDialog';
import FormField from '@/components/FormField';

const emptyForm = { donorName: '', phone: '', email: '', category: 'General', amount: 0, paymentMethod: 'Cash', date: '' };

const DonationsPage: React.FC = () => {
  const { items, add, update, remove } = useStore(mockDonations);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setModalOpen(true); };
  const openEdit = (item: typeof mockDonations[0]) => {
    setForm({ donorName: item.donorName, phone: '', email: '', category: item.category, amount: item.amount, paymentMethod: item.paymentMethod, date: item.date });
    setEditId(item.id); setModalOpen(true);
  };
  const handleSave = () => {
    if (editId) update(editId, { ...form, amount: Number(form.amount) });
    else add({ ...form, amount: Number(form.amount) } as any);
    setModalOpen(false);
  };
  const set = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: key === 'amount' ? Number(val) : val }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-foreground">Donations</h1>
        <Button onClick={openAdd}><Plus className="h-4 w-4 mr-2" />Record Donation</Button>
      </div>
      <div className="table-container"><div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border bg-muted/50">
            <th className="text-left p-4 font-medium text-muted-foreground">ID</th>
            <th className="text-left p-4 font-medium text-muted-foreground">Donor</th>
            <th className="text-right p-4 font-medium text-muted-foreground">Amount</th>
            <th className="text-left p-4 font-medium text-muted-foreground">Category</th>
            <th className="text-left p-4 font-medium text-muted-foreground">Method</th>
            <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
            <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
          </tr></thead>
          <tbody>
            {items.map(d => (
              <tr key={d.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-4 font-medium text-foreground">{d.id}</td>
                <td className="p-4 text-foreground">{d.donorName}</td>
                <td className="p-4 text-right font-display font-bold text-foreground">₹{d.amount.toLocaleString()}</td>
                <td className="p-4"><span className="bg-accent/10 text-accent px-2 py-0.5 rounded-full text-xs font-medium">{d.category}</span></td>
                <td className="p-4 text-muted-foreground">{d.paymentMethod}</td>
                <td className="p-4 text-muted-foreground">{d.date}</td>
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
      </div></div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Edit Donation' : 'Record Donation'}>
        <div className="space-y-4">
          <FormField label="Donor Name" value={form.donorName} onChange={v => set('donorName', v)} required />
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Phone" value={form.phone} onChange={v => set('phone', v)} />
            <FormField label="Email" value={form.email} onChange={v => set('email', v)} type="email" />
          </div>
          <FormField label="Amount (₹)" value={String(form.amount)} onChange={v => set('amount', v)} type="number" required />
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Category</label>
            <select value={form.category} onChange={e => set('category', e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
              <option>General</option><option>Annadanam</option><option>Temple Renovation</option><option>Festival Fund</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Payment Method</label>
            <select value={form.paymentMethod} onChange={e => set('paymentMethod', e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
              <option>Cash</option><option>UPI</option><option>Card</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleSave} className="flex-1">Save</Button>
          </div>
        </div>
      </Modal>
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => deleteId && remove(deleteId)} title="Delete Donation" message="Are you sure?" />
    </div>
  );
};

export default DonationsPage;
