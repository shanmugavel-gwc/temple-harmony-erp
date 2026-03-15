import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Download, Search } from 'lucide-react';
import { useStore } from '@/hooks/useStore';
import Modal from '@/components/Modal';
import ConfirmDialog from '@/components/ConfirmDialog';
import FormField from '@/components/FormField';
import StatusBadge from '@/components/StatusBadge';

// Mock data based on the image
const mockEmployees = [
  { id: '1', name: 'Pandit Sharma', role: 'Priest', department: 'Pooja', joined: 'Jan 2020', salary: 35000, status: 'Active' },
  { id: '2', name: 'Suresh Kumar', role: 'Staff', department: 'Kitchen', joined: 'Mar 2021', salary: 22000, status: 'Active' },
  { id: '3', name: 'Meena Devi', role: 'Volunteer', department: 'Admin', joined: 'Jul 2023', salary: null, status: 'Active' },
];

const emptyForm = { 
  name: '', 
  role: '', 
  department: '', 
  joined: '', 
  salary: '', 
  status: 'Active',
  phone: '',
  email: '',
  address: ''
};

const HrPayrollPage: React.FC = () => {
  const { items, add, update, remove } = useStore(mockEmployees);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [searchTerm, setSearchTerm] = useState('');

  const openAdd = () => { 
    setForm(emptyForm); 
    setEditId(null); 
    setModalOpen(true); 
  };

  const openEdit = (item: typeof mockEmployees[0]) => {
    setForm({
      name: item.name,
      role: item.role,
      department: item.department,
      joined: item.joined,
      salary: item.salary?.toString() || '',
      status: item.status,
      phone: '',
      email: '',
      address: ''
    });
    setEditId(item.id);
    setModalOpen(true);
  };

  const handleSave = () => {
    const formattedForm = {
      ...form,
      salary: form.salary ? Number(form.salary) : null
    };
    
    if (editId) update(editId, formattedForm);
    else add(formattedForm as any);
    setModalOpen(false);
  };

  const set = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: val }));

  // Filter items based on search
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">HR & Payroll</h1>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center justify-end gap-4">
        
        <div className="flex gap-2">
          <Button onClick={openAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 font-medium text-muted-foreground">Name</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Role</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Department</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Joined</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Salary</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(emp => (
                <tr key={emp.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-medium text-foreground">{emp.name}</td>
                  <td className="p-4 text-muted-foreground">{emp.role}</td>
                  <td className="p-4 text-muted-foreground">{emp.department}</td>
                  <td className="p-4 text-muted-foreground">{emp.joined}</td>
                  <td className="p-4 text-right font-medium text-foreground">
                    {emp.salary ? `₹${emp.salary.toLocaleString()}` : '—'}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={emp.status} />
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex gap-1 justify-end">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(emp)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(emp.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        title={editId ? 'Edit Employee' : 'Add New Employee'}
      >
        <div className="grid grid-cols-2 gap-4">
          <FormField 
            label="Full Name" 
            value={form.name} 
            onChange={v => set('name', v)} 
            required 
          />
          <FormField 
            label="Role" 
            value={form.role} 
            onChange={v => set('role', v)} 
            required 
          />
          <FormField 
            label="Department" 
            value={form.department} 
            onChange={v => set('department', v)} 
            required 
          />
          <FormField 
            label="Joined Date" 
            value={form.joined} 
            onChange={v => set('joined', v)} 
            placeholder="Jan 2020"
            required 
          />
          <FormField 
            label="Salary (₹)" 
            value={form.salary} 
            onChange={v => set('salary', v)} 
            type="number"
            placeholder="Enter salary or leave blank for volunteers"
          />
          
       
          
          <FormField 
            label="Phone" 
            value={form.phone} 
            onChange={v => set('phone', v)} 
            type="tel"
          />
          <FormField 
            label="Email" 
            value={form.email} 
            onChange={v => set('email', v)} 
            type="email"
          />
          
          <div className="">
            <FormField 
              label="Address" 
              value={form.address} 
              onChange={v => set('address', v)} 
            />
          </div>

          <div className="col-span-2 flex gap-3 pt-4 mt-2 ">
            <Button variant="outline" onClick={() => setModalOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              {editId ? 'Update' : 'Save'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog 
        open={!!deleteId} 
        onClose={() => setDeleteId(null)} 
        onConfirm={() => {
          if (deleteId) remove(deleteId);
          setDeleteId(null);
        }} 
        title="Delete Employee" 
        message="Are you sure you want to delete this employee record? This action cannot be undone." 
      />
    </div>
  );
};

export default HrPayrollPage;