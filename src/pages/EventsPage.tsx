import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, CalendarIcon, List } from 'lucide-react';
import { mockEvents } from '@/data/mockData';
import { useStore } from '@/hooks/useStore';
import Modal from '@/components/Modal';
import ConfirmDialog from '@/components/ConfirmDialog';
import FormField from '@/components/FormField';
import StatusBadge from '@/components/StatusBadge';

const emptyForm = { name: '', description: '', date: '', time: '', location: '', organizer: '', status: 'Planned' };

const EventsPage: React.FC = () => {
  const { items, add, update, remove } = useStore(mockEvents);
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setModalOpen(true); };
  const openEdit = (item: typeof mockEvents[0]) => {
    setForm({ name: item.name, description: item.description, date: item.date, time: item.time, location: item.location, organizer: item.organizer, status: item.status });
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
        <h1 className="text-2xl font-display font-bold text-foreground">Events & Calendar</h1>
        <div className="flex gap-2">
          <div className="flex bg-muted rounded-lg p-1">
            <button onClick={() => setView('list')} className={`px-3 py-1.5 text-sm rounded-md transition-colors ${view === 'list' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}><List className="h-4 w-4" /></button>
            <button onClick={() => setView('calendar')} className={`px-3 py-1.5 text-sm rounded-md transition-colors ${view === 'calendar' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}><CalendarIcon className="h-4 w-4" /></button>
          </div>
          <Button onClick={openAdd}><Plus className="h-4 w-4 mr-2" />Add Event</Button>
        </div>
      </div>

      {view === 'list' ? (
        <div className="table-container"><div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border bg-muted/50">
              <th className="text-left p-4 font-medium text-muted-foreground">Event</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Time</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Location</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Organizer</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
              <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
            </tr></thead>
            <tbody>
              {items.map(e => (
                <tr key={e.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-medium text-foreground">{e.name}</td>
                  <td className="p-4 text-muted-foreground">{e.date}</td>
                  <td className="p-4 text-muted-foreground">{e.time}</td>
                  <td className="p-4 text-muted-foreground">{e.location}</td>
                  <td className="p-4 text-muted-foreground">{e.organizer}</td>
                  <td className="p-4"><StatusBadge status={e.status} /></td>
                  <td className="p-4 text-right">
                    <div className="flex gap-1 justify-end">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(e)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(e.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(e => (
            <div key={e.id} className="erp-card">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-foreground">{e.name}</h3>
                <StatusBadge status={e.status} />
              </div>
              <p className="text-sm text-muted-foreground mb-2">{e.description}</p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>📅 {e.date} at {e.time}</p>
                <p>📍 {e.location}</p>
                <p>👤 {e.organizer}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Edit Event' : 'Add Event'}>
        <div className="space-y-4">
          <FormField label="Event Name" value={form.name} onChange={v => set('name', v)} required />
          <FormField label="Description" value={form.description} onChange={v => set('description', v)} />
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Date" value={form.date} onChange={v => set('date', v)} type="date" />
            <FormField label="Time" value={form.time} onChange={v => set('time', v)} />
          </div>
          <FormField label="Location" value={form.location} onChange={v => set('location', v)} />
          <FormField label="Organizer" value={form.organizer} onChange={v => set('organizer', v)} />
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Status</label>
            <select value={form.status} onChange={e => set('status', e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
              <option>Planned</option><option>Scheduled</option><option>In Progress</option><option>Completed</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleSave} className="flex-1">Save</Button>
          </div>
        </div>
      </Modal>
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => deleteId && remove(deleteId)} title="Delete Event" message="Are you sure?" />
    </div>
  );
};

export default EventsPage;
