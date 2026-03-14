import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { mockInventory } from '@/data/mockData';
import { useStore } from '@/hooks/useStore';
import Modal from '@/components/Modal';
import ConfirmDialog from '@/components/ConfirmDialog';
import FormField from '@/components/FormField';
import StatusBadge from '@/components/StatusBadge';

const emptyForm = { name: '', category: '', quantity: 0, unit: '', stockStatus: 'In Stock', supplier: '' };

const InventoryPage: React.FC = () => {
  const { items, add, update, remove } = useStore(mockInventory);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setModalOpen(true); };
  const openEdit = (item: typeof mockInventory[0]) => {
    setForm({ name: item.name, category: item.category, quantity: item.quantity, unit: item.unit, stockStatus: item.stockStatus, supplier: item.supplier });
    setEditId(item.id); setModalOpen(true);
  };
  const handleSave = () => {
    if (editId) update(editId, { ...form, quantity: Number(form.quantity) });
    else add({ ...form, quantity: Number(form.quantity) } as any);
    setModalOpen(false);
  };
  const set = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: key === 'quantity' ? Number(val) : val }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-foreground">Inventory</h1>
        <Button onClick={openAdd}><Plus className="h-4 w-4 mr-2" />Add Item</Button>
      </div>
      <div className="table-container"><div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border bg-muted/50">
            <th className="text-left p-4 font-medium text-muted-foreground">Item</th>
            <th className="text-left p-4 font-medium text-muted-foreground">Category</th>
            <th className="text-right p-4 font-medium text-muted-foreground">Quantity</th>
            <th className="text-left p-4 font-medium text-muted-foreground">Unit</th>
            <th className="text-left p-4 font-medium text-muted-foreground">Stock</th>
            <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
          </tr></thead>
          <tbody>
            {items.map(i => (
              <tr key={i.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-4 font-medium text-foreground">{i.name}</td>
                <td className="p-4 text-muted-foreground">{i.category}</td>
                <td className="p-4 text-right text-foreground">{i.quantity}</td>
                <td className="p-4 text-muted-foreground">{i.unit}</td>
                <td className="p-4"><StatusBadge status={i.stockStatus} /></td>
                <td className="p-4 text-right">
                  <div className="flex gap-1 justify-end">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(i)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteId(i.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div></div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Edit Item' : 'Add Item'}>
        <div className="space-y-4">
          <FormField label="Item Name" value={form.name} onChange={v => set('name', v)} required />
          <FormField label="Category" value={form.category} onChange={v => set('category', v)} />
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Quantity" value={String(form.quantity)} onChange={v => set('quantity', v)} type="number" />
            <FormField label="Unit" value={form.unit} onChange={v => set('unit', v)} />
          </div>
          <FormField label="Supplier" value={form.supplier} onChange={v => set('supplier', v)} />
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleSave} className="flex-1">Save</Button>
          </div>
        </div>
      </Modal>
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => deleteId && remove(deleteId)} title="Delete Item" message="Are you sure?" />
    </div>
  );
};

export default InventoryPage;
