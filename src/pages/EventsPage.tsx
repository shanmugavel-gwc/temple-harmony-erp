import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, CalendarIcon, List, ChevronLeft, ChevronRight, X, MapPin, Clock, User, Calendar, Bell, MoreHorizontal, Flower2, Utensils, Music, Sun, Moon, Star } from 'lucide-react';
import { useStore } from '@/hooks/useStore';
import Modal from '@/components/Modal';
import ConfirmDialog from '@/components/ConfirmDialog';
import FormField from '@/components/FormField';
import StatusBadge from '@/components/StatusBadge';

// Generate temple/mahasiarti style events
const generateTempleEvents = () => {
  const today = new Date();
  const events = [];
  
  const templeNames = [
    'Sri Mariamman Temple - Maha Shivaratri',
    'Sri Srinivasa Perumal Temple - Brahmotsavam',
    'Sri Veeramakaliamman Temple - Navaratri',
    'Sri Thendayuthapani Temple - Thaipusam',
    'Sri Layan Sithi Vinayagar Temple - Vinayagar Chaturthi',
    'Buddha Tooth Relic Temple - Vesak Day',
    'Sri Krishna Temple - Krishna Janmashtami',
    'Sri Vadapathira Kaliamman Temple - Deepavali',
    'Tibetan Buddhist Temple - Losar Festival',
    'Sri Muneeswaran Temple - Panguni Uthiram',
    'Lian Shan Shuang Lin Monastery - Ullambana',
    'Sri Ruthra Kaliamman Temple - Adi Pooram',
    'Sakya Muni Buddha Gaya Temple - Kathina Ceremony',
    'Sri Arulmigu Murugan Temple - Skanda Sashti',
    'Kwan Im Thong Hood Cho Temple - Guanyin Birthday'
  ];
  
  const poojaTimings = [
    '4:30 AM - Suprabhatam',
    '6:00 AM - Abhishekam',
    '8:00 AM - Alankaram',
    '9:00 AM - Archana',
    '11:00 AM - Ucchi Kalam Pooja',
    '12:00 PM - Maha Naivedyam',
    '5:00 PM - Deeparadhana',
    '6:30 PM - Pradosham Pooja',
    '7:30 PM - Annadhanam',
    '8:00 PM - Arthajama Pooja'
  ];
  
  const locations = [
    'Temple Street, Little India',
    'Race Course Road, Singapore',
    'Serangoon Road, Singapore',
    'Tank Road, Singapore',
    'Keong Saik Road, Singapore',
    'Telok Ayer Street, Singapore',
    'Changi Village, Singapore',
    'Geylang Road, Singapore',
    'River Valley Road, Singapore',
    'Punggol, Singapore',
    'Yishun, Singapore',
    'Toa Payoh, Singapore',
    'Woodlands, Singapore',
    'Jurong East, Singapore',
    'Sengkang, Singapore'
  ];
  
  const organizers = [
    'Hindu Endowments Board',
    'Singapore Buddhist Federation',
    'Temple Management Committee',
    'Sri Thendayuthapani Temple Trust',
    'Buddhist & Pali College',
    'Hindu Advisory Board',
    'Singapore Indian Chamber of Commerce',
    'Tibetan Buddhist Centre',
    'Chinese Buddhist Society',
    'Sri Mariamman Temple Trustees',
    'Singapore Saiva Sithanda Sangam',
    'Buddhist Fellowship Singapore',
    'Sri Krishna Mandir Committee',
    'Singapore Buddhist Lodge',
    'Inter-Religious Organisation'
  ];
  
  const festivals = [
    {
      name: 'Maha Shivaratri',
      description: 'Grand night celebration of Lord Shiva. Special abhishekam every 3 hours, chanting of Rudram, and night-long vigil. Free prasadam distributed.',
      poojas: ['Rudrabhishekam', 'Laghu Rudram', 'Maha Rudram', 'Shiva Sahasranama Archana']
    },
    {
      name: 'Navaratri',
      description: 'Nine nights of Divine Mother worship. Golu display, devotional songs, and cultural performances each evening. Special homam on final day.',
      poojas: ['Durga Pooja', 'Lakshmi Pooja', 'Saraswati Pooja', 'Ayudha Pooja']
    },
    {
      name: 'Thaipusam',
      description: 'Kavadi procession from Sri Srinivasa Perumal Temple to Sri Thendayuthapani Temple. Free refreshments and medical aid along the route.',
      poojas: ['Pal Abhishekam', 'Kavadi Pooja', 'Paal Koodam', 'Annadhanam']
    },
    {
      name: 'Vinayagar Chaturthi',
      description: 'Birthday of Lord Ganesha. Special homam, modak offering, and procession to sea for immersion.',
      poojas: ['Ganapati Homam', 'Modak Naivedyam', 'Vigneshwara Pooja', 'Immersion Ceremony']
    },
    {
      name: 'Vesak Day',
      description: 'Birth, enlightenment, and passing of Buddha. Three-step ceremony, bathing of baby Buddha, and candle-light procession.',
      poojas: ['Bathing Ceremony', 'Three-Step Ceremony', 'Candle Procession', 'Dana (Offering)']
    },
    {
      name: 'Krishna Janmashtami',
      description: 'Birth of Lord Krishna. Midnight celebration, dahi handi, and devotional singing. Sweets distribution.',
      poojas: ['Nandotsavam', 'Dahi Handi', 'Krishna Abhishekam', 'Sweets Distribution']
    },
    {
      name: 'Deepavali',
      description: 'Festival of Lights. Lakshmi Pooja, oil bath tradition, and cultural programs. Free sweets and gifts.',
      poojas: ['Lakshmi Pooja', 'Kubera Pooja', 'Deepa Daanam', 'Cultural Night']
    },
    {
      name: 'Panguni Uthiram',
      description: 'Celestial wedding of deities. Procession of deities around temple streets. Free meals served.',
      poojas: ['Thirukalyanam', 'Procession', 'Theerthavari', 'Annadhanam']
    },
    {
      name: 'Skanda Sashti',
      description: 'Six days of worship for Lord Murugan. Kavadi, spiritual discourses, and abhishekam.',
      poojas: ['Soorasamharam', 'Kavadi', 'Pal Kudam', 'Vel Pooja']
    },
    {
      name: 'Ullambana (Hungry Ghost Festival)',
      description: 'Prayers for ancestors. Chanting of sutras, offering to monks, and releasing of lanterns on water.',
      poojas: ['Ancestor Prayer', 'Monk Offering', 'Lantern Release', 'Sutra Chanting']
    }
  ];
  
  const statuses = ['Planned', 'Scheduled', 'In Progress', 'Completed'];
  const times = ['04:30', '06:00', '08:00', '09:00', '11:00', '12:00', '17:00', '18:30', '19:30', '20:00'];
  
  // Generate events for today and next 10 days
  for (let i = 0; i <= 10; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    
    // Add 2-4 events per day (temples are busy!)
    const eventsPerDay = Math.floor(Math.random() * 3) + 2;
    
    for (let j = 0; j < eventsPerDay; j++) {
      const festivalIndex = (i + j) % festivals.length;
      const festival = festivals[festivalIndex];
      const randomIndex = (i * 3 + j) % templeNames.length;
      const timeIndex = (i + j) % times.length;
      
      // Determine if it's a special festival day
      const isFestivalDay = Math.random() > 0.4;
      const poojaType = festival.poojas[Math.floor(Math.random() * festival.poojas.length)];
      
      events.push({
        id: `temple-event-${i}-${j}-${Date.now()}`,
        name: isFestivalDay ? templeNames[randomIndex] : `${templeNames[randomIndex].split(' - ')[0]} - Daily Pooja`,
        description: isFestivalDay 
          ? festival.description
          : `Daily rituals and poojas at the temple. All devotees welcome. Prasadam available after pooja.`,
        date: dateStr,
        time: times[timeIndex],
        poojaType: isFestivalDay ? poojaType : 'Daily Pooja',
        location: locations[randomIndex % locations.length],
        organizer: organizers[randomIndex % organizers.length],
        status: i === 0 ? 'In Progress' : i < 3 ? 'Scheduled' : statuses[Math.floor(Math.random() * statuses.length)],
        attendees: Math.floor(Math.random() * 1000) + 200,
        offerings: ['Fruits', 'Flowers', 'Coconuts', 'Sandal Paste', 'Incense'][Math.floor(Math.random() * 5)],
        specialPooja: isFestivalDay ? festival.poojas.join(', ') : 'Regular Archana',
        prasadam: ['Pongal', 'Puliyodarai', 'Sundal', 'Payasam', 'Curd Rice'][Math.floor(Math.random() * 5)],
        isTempleEvent: true,
        festivalName: isFestivalDay ? festival.name : null
      });
    }
  }
  
  return events;
};

const staticEvents = generateTempleEvents();

const emptyForm = { 
  name: '', 
  description: '', 
  date: '', 
  time: '', 
  location: '', 
  organizer: '', 
  status: 'Planned',
  poojaType: '',
  offerings: '',
  specialPooja: '',
  prasadam: '',
  attendees: 0,
  festivalName: ''
};

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const EventsPage: React.FC = () => {
  const { items, add, update, remove } = useStore(staticEvents);
  const [view, setView] = useState<'list' | 'calendar'>('calendar');
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [detailEvent, setDetailEvent] = useState<typeof staticEvents[0] | null>(null);
  const [filter, setFilter] = useState<'all' | 'festivals' | 'daily'>('all');

  const openAdd = () => { setForm(emptyForm); setEditId(null); setModalOpen(true); };
  const openEdit = (item: typeof staticEvents[0]) => {
    setForm({ 
      name: item.name, 
      description: item.description, 
      date: item.date, 
      time: item.time, 
      location: item.location, 
      organizer: item.organizer, 
      status: item.status,
      poojaType: item.poojaType || '',
      offerings: item.offerings || '',
      specialPooja: item.specialPooja || '',
      prasadam: item.prasadam || '',
      attendees: item.attendees || 0,
      festivalName: item.festivalName || ''
    });
    setEditId(item.id); setModalOpen(true);
  };
  const handleSave = () => {
    if (editId) update(editId, { ...form, isTempleEvent: true });
    else add({ ...form, id: `temple-event-${Date.now()}`, isTempleEvent: true } as any);
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

  // Set initial selected date to today
  React.useEffect(() => {
    setSelectedDate(todayStr);
  }, []);

  const statusDotColors: Record<string, string> = {
    Scheduled: 'bg-secondary',
    Planned: 'bg-accent',
    'In Progress': 'bg-primary',
    Completed: 'bg-muted-foreground',
  };

  // Get events for selected date with filter
  const selectedDateEvents = selectedDate ? eventsByDate[selectedDate] || [] : [];
  const filteredEvents = selectedDateEvents.filter(event => {
    if (filter === 'all') return true;
    if (filter === 'festivals') return event.festivalName;
    if (filter === 'daily') return !event.festivalName;
    return true;
  });
  
  // Format selected date for display
  const formatSelectedDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Format time for display
  const formatTime = (timeStr: string) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  // Get festival icon based on name
  const getFestivalIcon = (festivalName: string) => {
    if (festivalName?.includes('Shivaratri')) return <Moon className="h-3 w-3" />;
    if (festivalName?.includes('Navaratri')) return <Star className="h-3 w-3" />;
    if (festivalName?.includes('Deepavali')) return <Sun className="h-3 w-3" />;
    if (festivalName?.includes('Vesak')) return <Flower2 className="h-3 w-3" />;
    return <Flower2 className="h-3 w-3" />;
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-foreground">Temple Events & Festivals</h1>
        <div className="flex gap-2">
          <div className="flex bg-muted rounded-lg p-1">
            <button onClick={() => setView('list')} className={`px-3 py-1.5 text-sm rounded-md transition-colors ${view === 'list' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}><List className="h-4 w-4" /></button>
            <button onClick={() => setView('calendar')} className={`px-3 py-1.5 text-sm rounded-md transition-colors ${view === 'calendar' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}><CalendarIcon className="h-4 w-4" /></button>
          </div>
          <Button onClick={openAdd} size="sm"><Plus className="h-4 w-4 mr-1" />Add Temple Event</Button>
        </div>
      </div>

      {view === 'list' ? (
        <div className="table-container"><div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border bg-muted/50">
              <th className="text-left p-3 font-medium text-muted-foreground text-xs">Event/Pooja</th>
              <th className="text-left p-3 font-medium text-muted-foreground text-xs">Date</th>
              <th className="text-left p-3 font-medium text-muted-foreground text-xs">Time</th>
              <th className="text-left p-3 font-medium text-muted-foreground text-xs">Temple</th>
              <th className="text-left p-3 font-medium text-muted-foreground text-xs">Pooja Type</th>
              <th className="text-left p-3 font-medium text-muted-foreground text-xs">Prasadam</th>
              <th className="text-right p-3 font-medium text-muted-foreground text-xs">Actions</th>
            </tr></thead>
            <tbody>
              {items.map(e => (
                <tr key={e.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-medium text-foreground text-sm">
                    <div className="flex items-center gap-2">
                      {e.festivalName ? getFestivalIcon(e.festivalName) : <Flower2 className="h-3 w-3 text-muted-foreground" />}
                      <span>{e.name}</span>
                    </div>
                    {e.festivalName && (
                      <span className="text-xs text-primary block">{e.festivalName}</span>
                    )}
                  </td>
                  <td className="p-3 text-muted-foreground text-sm">{e.date}</td>
                  <td className="p-3 text-muted-foreground text-sm">{e.time}</td>
                  <td className="p-3 text-muted-foreground text-sm">{e.location.split(',')[0]}</td>
                  <td className="p-3 text-muted-foreground text-sm">{e.poojaType || 'Daily Pooja'}</td>
                  <td className="p-3 text-muted-foreground text-sm">{e.prasadam || 'Annadhanam'}</td>
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
        <div className="flex gap-6">
          {/* Calendar - Left Side */}
          <div className="w-[60%] bg-card rounded-xl border border-border p-5">
            {/* Calendar Header with Month and Navigation */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={prevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS.map(day => (
                <div key={day} className="text-center text-xs font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((cell, i) => {
                const events = eventsByDate[cell.date] || [];
                const isToday = cell.date === todayStr;
                const isSelected = cell.date === selectedDate;
                const hasFestival = events.some(e => e.festivalName);
                
                return (
                  <div
                    key={i}
                    onClick={() => setSelectedDate(cell.date)}
                    className={`
                      aspect-square p-1 rounded-lg transition-all cursor-pointer
                      ${cell.isCurrentMonth ? 'bg-background' : 'bg-muted/20 text-muted-foreground/50'}
                      ${isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-card' : ''}
                      ${hasFestival ? 'bg-orange-50 dark:bg-orange-950/20' : ''}
                      hover:bg-muted/50
                    `}
                  >
                    <div className="h-full flex flex-col">
                      <span className={`
                        text-xs font-medium inline-flex items-center justify-center w-6 h-6 rounded-full
                        ${isToday ? 'bg-primary text-primary-foreground' : ''}
                        ${hasFestival && !isToday ? 'text-orange-600 dark:text-orange-400' : ''}
                      `}>
                        {cell.day}
                      </span>
                      {events.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-0.5">
                          {events.slice(0, 3).map((ev, idx) => (
                            <div
                              key={idx}
                              className={`w-1.5 h-1.5 rounded-full ${ev.festivalName ? 'bg-orange-500' : statusDotColors[ev.status] || 'bg-muted-foreground'}`}
                              title={ev.festivalName || ev.name}
                            />
                          ))}
                          {events.length > 3 && (
                            <span className="text-[8px] text-muted-foreground">+{events.length - 3}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Events Sidebar - Right Side */}
          <div className="w-[40%] space-y-4">
            {/* Header with date and filters */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                {selectedDate ? formatSelectedDate(selectedDate) : 'Select a date'}
              </h3>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={openAdd}
                title="Add temple event"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-1 bg-muted rounded-lg p-1">
              <button 
                onClick={() => setFilter('all')}
                className={`flex-1 px-2 py-1 text-xs rounded-md transition-colors ${filter === 'all' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter('festivals')}
                className={`flex-1 px-2 py-1 text-xs rounded-md transition-colors ${filter === 'festivals' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}
              >
                Festivals
              </button>
              <button 
                onClick={() => setFilter('daily')}
                className={`flex-1 px-2 py-1 text-xs rounded-md transition-colors ${filter === 'daily' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}
              >
                Daily Pooja
              </button>
            </div>

            {/* Events List */}
            <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
              {filteredEvents.length > 0 ? (
                filteredEvents.map(event => (
                  <div
                    key={event.id}
                    onClick={() => setDetailEvent(event)}
                    className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {event.festivalName ? (
                          getFestivalIcon(event.festivalName)
                        ) : (
                          <Flower2 className="h-4 w-4 text-orange-500" />
                        )}
                        <h4 className="font-medium text-foreground">{event.name}</h4>
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1 -mr-1">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                    
                    {event.festivalName && (
                      <div className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400 mb-1">
                        <Star className="h-3 w-3" />
                        <span className="font-medium">{event.festivalName}</span>
                      </div>
                    )}

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Bell className="h-3 w-3" />
                        <span>{formatTime(event.time)} - {event.poojaType || 'Pooja'}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Utensils className="h-3 w-3" />
                        <span>Prasadam: {event.prasadam || 'Annadhanam'}</span>
                      </div>
                      
                      {event.description && (
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                          {event.description}
                        </p>
                      )}

                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{event.location}</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <User className="h-3 w-3" />
                        <span>{event.organizer}</span>
                      </div>

                      <div className="text-xs font-medium mt-1">
                        <span className="text-orange-600 dark:text-orange-400">
                          {event.attendees} devotees expected
                        </span>
                        {event.offerings && (
                          <span className="text-muted-foreground ml-2">
                            • Offerings: {event.offerings}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quick action buttons */}
                    <div className="flex gap-2 mt-3 pt-2 border-t border-border">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs flex-1"
                        onClick={(e) => { e.stopPropagation(); openEdit(event); }}
                      >
                        <Pencil className="h-3 w-3 mr-1" />Edit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs flex-1 text-destructive hover:text-destructive"
                        onClick={(e) => { e.stopPropagation(); setDeleteId(event.id); }}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />Delete
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-card border border-border rounded-xl p-8 text-center">
                  <Flower2 className="h-8 w-8 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-4">No temple events for this date</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={openAdd}
                  >
                    <Plus className="h-3 w-3 mr-1" />Add Temple Event
                  </Button>
                </div>
              )}

              {/* "Add more events for today" section */}
              {selectedDate === todayStr && filteredEvents.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <Button 
                    variant="ghost" 
                    className="w-full text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-950/30"
                    onClick={openAdd}
                  >
                    <Plus className="h-4 w-4 mr-2" />Add more temple events for today
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Event Detail Popup */}
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
                <div className="flex items-center gap-2 mb-1">
                  {detailEvent.festivalName ? (
                    getFestivalIcon(detailEvent.festivalName)
                  ) : (
                    <Flower2 className="h-4 w-4 text-orange-500" />
                  )}
                  <h3 className="text-base font-semibold text-foreground">{detailEvent.name}</h3>
                </div>
                {detailEvent.festivalName && (
                  <span className="text-xs text-orange-600 dark:text-orange-400 block mb-1">
                    {detailEvent.festivalName}
                  </span>
                )}
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
                  <span className="text-foreground">{formatTime(detailEvent.time)} - {detailEvent.poojaType || 'Pooja'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-foreground">{detailEvent.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-foreground">{detailEvent.organizer}</span>
                </div>
                {detailEvent.poojaType && (
                  <div className="flex items-center gap-2 text-sm">
                    <Flower2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-foreground">Pooja: {detailEvent.poojaType}</span>
                  </div>
                )}
                {detailEvent.prasadam && (
                  <div className="flex items-center gap-2 text-sm">
                    <Utensils className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-foreground">Prasadam: {detailEvent.prasadam}</span>
                  </div>
                )}
                {detailEvent.offerings && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Offerings:</span>
                    <span>{detailEvent.offerings}</span>
                  </div>
                )}
                {detailEvent.attendees > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Expected Devotees:</span>
                    <span>{detailEvent.attendees}</span>
                  </div>
                )}
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
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Edit Temple Event' : 'Add Temple Event'}>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Event/Pooja Name" value={form.name} onChange={v => set('name', v)} required />
          <FormField label="Festival Name (if any)" value={form.festivalName} onChange={v => set('festivalName', v)} />
          <FormField label="Description" value={form.description} onChange={v => set('description', v)} />
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <FormField label="Date" value={form.date} onChange={v => set('date', v)} type="date" />
            <FormField label="Time" value={form.time} onChange={v => set('time', v)} type="time" />
          </div>
          <FormField label="Pooja Type" value={form.poojaType} onChange={v => set('poojaType', v)} />
          <FormField label="Prasadam" value={form.prasadam} onChange={v => set('prasadam', v)} />
          <FormField label="Offerings" value={form.offerings} onChange={v => set('offerings', v)} />
          <FormField label="Special Poojas" value={form.specialPooja} onChange={v => set('specialPooja', v)} />
          <FormField label="Location/Temple" value={form.location} onChange={v => set('location', v)} />
          <FormField label="Organizer" value={form.organizer} onChange={v => set('organizer', v)} />
          <FormField label="Expected Devotees" value={String(form.attendees)} onChange={v => set('attendees', v)} type="number" />
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

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => deleteId && remove(deleteId)} title="Delete Temple Event" message="Are you sure you want to delete this temple event?" />
    </div>
  );
};

export default EventsPage;