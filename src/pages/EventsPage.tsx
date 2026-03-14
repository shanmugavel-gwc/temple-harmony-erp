import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, CalendarIcon, List, ChevronLeft, ChevronRight, X, MapPin, Clock, User, Calendar } from 'lucide-react';
import { mockEvents } from '@/data/mockData';
import { useStore } from '@/hooks/useStore';
import Modal from '@/components/Modal';
import ConfirmDialog from '@/components/ConfirmDialog';
import FormField from '@/components/FormField';
import StatusBadge from '@/components/StatusBadge';

const emptyForm = { name: '', description: '', date: '', time: '', location: '', organizer: '', status: 'Planned' };

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const EventsPage: React.FC = () => {
  const { items, add, update, remove } = useStore(mockEvents);
  const [view, setView] = useState<'list' | 'calendar'>('calendar');
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2));
  const [detailEvent, setDetailEvent] = useState<typeof mockEvents[0] | null>(null);

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

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days: { day: number; isCurrentMonth: boolean; date: string }[] = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const m = month === 0 ? 12 : month;
      const y = month === 0 ? year - 1 : year;
      days.push({ day: d, isCurrentMonth: false, date: `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}` });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      days.push({ day: d, isCurrentMonth: true, date: `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}` });
    }

    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      const m = month + 2 > 12 ? 1 : month + 2;
      const y = month + 2 > 12 ? year + 1 : year;
      days.push({ day: d, isCurrentMonth: false, date: `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}` });
    }

    return days;
  }, [currentDate]);

  const eventsByDate = useMemo(() => {
    const map: Record<string, typeof items> = {};
    items.forEach(e => {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
    });
    return map;
  }, [items]);

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const statusDotColors: Record<string, string> = {
    Scheduled: 'bg-secondary',
    Planned: 'bg-accent',
    'In Progress': 'bg-primary',
    Completed: 'bg-muted-foreground',
  };

  const statusColors: Record<string, string> = {
    Scheduled: 'bg-secondary text-secondary-foreground',
    Planned: 'bg-accent text-accent-foreground',
    'In Progress': 'bg-primary text-primary-foreground',
    Completed: 'bg-muted text-muted-foreground',
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-foreground">Events & Festivals</h1>
        <div className="flex gap-2">
          <div className="flex bg-muted rounded-lg p-1">
            <button onClick={() => setView('list')} className={`px-3 py-1.5 text-sm rounded-md transition-colors ${view === 'list' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}><List className="h-4 w-4" /></button>
            <button onClick={() => setView('calendar')} className={`px-3 py-1.5 text-sm rounded-md transition-colors ${view === 'calendar' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}><CalendarIcon className="h-4 w-4" /></button>
          </div>
          <Button onClick={openAdd} size="sm"><Plus className="h-4 w-4 mr-1" />Add Event</Button>
        </div>
      </div>

      {view === 'list' ? (
        <div className="table-container"><div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border bg-muted/50">
              <th className="text-left p-3 font-medium text-muted-foreground text-xs">Event</th>
              <th className="text-left p-3 font-medium text-muted-foreground text-xs">Date</th>
              <th className="text-left p-3 font-medium text-muted-foreground text-xs">Time</th>
              <th className="text-left p-3 font-medium text-muted-foreground text-xs">Location</th>
              <th className="text-left p-3 font-medium text-muted-foreground text-xs">Organizer</th>
              <th className="text-left p-3 font-medium text-muted-foreground text-xs">Status</th>
              <th className="text-right p-3 font-medium text-muted-foreground text-xs">Actions</th>
            </tr></thead>
            <tbody>
              {items.map(e => (
                <tr key={e.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-medium text-foreground text-sm">{e.name}</td>
                  <td className="p-3 text-muted-foreground text-sm">{e.date}</td>
                  <td className="p-3 text-muted-foreground text-sm">{e.time}</td>
                  <td className="p-3 text-muted-foreground text-sm">{e.location}</td>
                  <td className="p-3 text-muted-foreground text-sm">{e.organizer}</td>
                  <td className="p-3"><StatusBadge status={e.status} /></td>
                  <td className="p-3 text-right">
                    <div className="flex gap-1 justify-end">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(e)}><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDeleteId(e.id)}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div></div>
      ) : (
        <div className="erp-card !p-4">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-foreground">
              {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={prevMonth}><ChevronLeft className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={nextMonth}><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map(d => (
              <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">{d}</div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 border-t border-l border-border">
            {calendarDays.map((cell, i) => {
              const events = eventsByDate[cell.date] || [];
              const isToday = cell.date === todayStr;
              return (
                <div
                  key={i}
                  className={`min-h-[90px] border-r border-b border-border p-1.5 transition-colors ${
                    cell.isCurrentMonth ? 'bg-card' : 'bg-muted/30'
                  } ${isToday ? 'bg-primary/5' : ''}`}
                >
                  <span className={`text-xs font-medium inline-flex items-center justify-center w-6 h-6 rounded-full ${
                    isToday ? 'bg-primary text-primary-foreground' : cell.isCurrentMonth ? 'text-foreground' : 'text-muted-foreground/50'
                  }`}>
                    {cell.day}
                  </span>
                  <div className="mt-0.5 space-y-0.5">
                    {events.slice(0, 2).map(ev => (
                      <button
                        key={ev.id}
                        onClick={() => setDetailEvent(ev)}
                        className="w-full text-left rounded border border-border bg-card hover:bg-muted/40 transition-colors p-1.5 mt-1"
                      >
                        <div className="flex items-center gap-1 mb-0.5">
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${statusDotColors[ev.status] || 'bg-muted-foreground'}`} />
                          <span className="text-[10px] font-medium text-foreground truncate">{ev.name}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground">{ev.time}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{ev.location}</p>
                      </button>
                    ))}
                    {events.length > 2 && (
                      <p className="text-[10px] text-muted-foreground pl-1">+{events.length - 2} more</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex gap-4 mt-3 pt-3 border-t border-border">
            {Object.entries(statusColors).map(([status, cls]) => (
              <div key={status} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-sm ${cls.split(' ')[0]}`} />
                <span className="text-[10px] text-muted-foreground">{status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Event Detail Popup */}
      {detailEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setDetailEvent(null)}
        >
          <div
            className="bg-card border border-border rounded-xl shadow-lg w-full max-w-sm mx-4 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Popup Header */}
            <div className="flex items-start justify-between p-4 border-b border-border">
              <div className="flex-1 pr-2">
                <h3 className="text-base font-semibold text-foreground">{detailEvent.name}</h3>
                <StatusBadge status={detailEvent.status} />
              </div>
              <button
                onClick={() => setDetailEvent(null)}
                className="text-muted-foreground hover:text-foreground transition-colors mt-0.5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Popup Body */}
            <div className="p-4 space-y-3">
              {detailEvent.description && (
                <p className="text-sm text-muted-foreground">{detailEvent.description}</p>
              )}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-foreground">{detailEvent.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-foreground">{detailEvent.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-foreground">{detailEvent.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-foreground">{detailEvent.organizer}</span>
                </div>
              </div>
            </div>

            {/* Popup Footer */}
            <div className="flex gap-2 px-4 pb-4">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => { setDetailEvent(null); setDeleteId(detailEvent.id); }}
              >
                <Trash2 className="h-3.5 w-3.5 mr-1 text-destructive" />Delete
              </Button>
              <Button
                size="sm"
                className="flex-1"
                onClick={() => { setDetailEvent(null); openEdit(detailEvent); }}
              >
                <Pencil className="h-3.5 w-3.5 mr-1" />Edit
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Edit Event' : 'Add Event'}>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Event Name" value={form.name} onChange={v => set('name', v)} required />
          <FormField label="Description" value={form.description} onChange={v => set('description', v)} />
          <div className="col-span-2  grid grid-cols-2 gap-4">
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
          <div className="col-span-2 flex gap-3 pt-2">
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