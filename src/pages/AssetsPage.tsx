import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { mockAssets } from '@/data/mockData';
import { useStore } from '@/hooks/useStore';
import Modal from '@/components/Modal';
import ConfirmDialog from '@/components/ConfirmDialog';
import FormField from '@/components/FormField';
import StatusBadge from '@/components/StatusBadge';

const emptyForm = { name: '', category: '', purchaseDate: '', condition: 'Good', maintenanceStatus: 'Up to Date', notes: '' };

const AssetsPage: React.FC = () => {
  const { items, add, update, remove } = useStore(mockAssets);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setModalOpen(true); };
  const openEdit = (item: typeof mockAssets[0]) => {
    setForm({ name: item.name, category: item.category, purchaseDate: item.purchaseDate, condition: item.condition, maintenanceStatus: item.maintenanceStatus, notes: '' });
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
        <h1 className="text-2xl font-display font-bold text-foreground">Assets</h1>
        <Button onClick={openAdd}><Plus className="h-4 w-4 mr-2" />Add Asset</Button>
      </div>
      <div className="table-container"><div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border bg-muted/50">
            <th className="text-left p-4 font-medium text-muted-foreground">Asset</th>
            <th className="text-left p-4 font-medium text-muted-foreground">Category</th>
            <th className="text-left p-4 font-medium text-muted-foreground">Purchase Date</th>
            <th className="text-left p-4 font-medium text-muted-foreground">Condition</th>
            <th className="text-left p-4 font-medium text-muted-foreground">Maintenance</th>
            <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
          </tr></thead>
          <tbody>
            {items.map(a => (
              <tr key={a.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-4 font-medium text-foreground">{a.name}</td>
                <td className="p-4 text-muted-foreground">{a.category}</td>
                <td className="p-4 text-muted-foreground">{a.purchaseDate}</td>
                <td className="p-4"><StatusBadge status={a.condition} /></td>
                <td className="p-4"><StatusBadge status={a.maintenanceStatus} /></td>
                <td className="p-4 text-right">
                  <div className="flex gap-1 justify-end">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(a)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteId(a.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div></div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Edit Asset' : 'Add Asset'}>
        <div className="space-y-4">
          <FormField label="Asset Name" value={form.name} onChange={v => set('name', v)} required />
          <FormField label="Category" value={form.category} onChange={v => set('category', v)} />
          <FormField label="Purchase Date" value={form.purchaseDate} onChange={v => set('purchaseDate', v)} type="date" />
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Condition</label>
            <select value={form.condition} onChange={e => set('condition', e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
              <option>Excellent</option><option>Good</option><option>Fair</option><option>Poor</option>
            </select>
          </div>
          <FormField label="Notes" value={form.notes} onChange={v => set('notes', v)} />
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleSave} className="flex-1">Save</Button>
          </div>
        </div>
      </Modal>
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => deleteId && remove(deleteId)} title="Delete Asset" message="Are you sure?" />
    </div>
  );
};

export default AssetsPage;
