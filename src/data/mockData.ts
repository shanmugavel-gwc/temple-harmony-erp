// Mock data for all modules

export const mockDevotees = [
  { id: '1', name: 'Rajesh Kumar', phone: '+91 98765 43210', email: 'rajesh@email.com', address: 'MG Road, Bangalore', city: 'Bangalore', state: 'Karnataka', country: 'India', status: 'Active', totalDonations: 125000, lastVisit: '2026-03-12' },
  { id: '2', name: 'Priya Sharma', phone: '+91 87654 32109', email: 'priya@email.com', address: 'Anna Nagar, Chennai', city: 'Chennai', state: 'Tamil Nadu', country: 'India', status: 'Active', totalDonations: 75000, lastVisit: '2026-03-10' },
  { id: '3', name: 'Amit Patel', phone: '+91 76543 21098', email: 'amit@email.com', address: 'SG Highway, Ahmedabad', city: 'Ahmedabad', state: 'Gujarat', country: 'India', status: 'Active', totalDonations: 250000, lastVisit: '2026-03-14' },
  { id: '4', name: 'Sunita Reddy', phone: '+91 65432 10987', email: 'sunita@email.com', address: 'Banjara Hills, Hyderabad', city: 'Hyderabad', state: 'Telangana', country: 'India', status: 'Inactive', totalDonations: 50000, lastVisit: '2026-01-15' },
  { id: '5', name: 'Vikram Singh', phone: '+91 54321 09876', email: 'vikram@email.com', address: 'Connaught Place, Delhi', city: 'Delhi', state: 'Delhi', country: 'India', status: 'Active', totalDonations: 180000, lastVisit: '2026-03-13' },
];

export const mockServices = [
  { id: '1', name: 'Ganesh Pooja', description: 'Special Ganesh Chaturthi pooja', price: 1100, duration: '1 hour', status: 'Active' },
  { id: '2', name: 'Satyanarayana Pooja', description: 'Full Satyanarayana Vrat Katha', price: 2500, duration: '2 hours', status: 'Active' },
  { id: '3', name: 'Abhishekam', description: 'Sacred milk and water abhishekam', price: 500, duration: '30 mins', status: 'Active' },
  { id: '4', name: 'Homam', description: 'Fire ritual with sacred mantras', price: 5000, duration: '3 hours', status: 'Active' },
  { id: '5', name: 'Archana', description: 'Name-specific archana with flowers', price: 100, duration: '15 mins', status: 'Active' },
];

export const mockBookings = [
  { id: 'BK001', devoteeName: 'Rajesh Kumar', serviceName: 'Ganesh Pooja', date: '2026-03-15', time: '09:00 AM', paymentStatus: 'Paid', bookingStatus: 'Confirmed' },
  { id: 'BK002', devoteeName: 'Priya Sharma', serviceName: 'Abhishekam', date: '2026-03-16', time: '07:00 AM', paymentStatus: 'Pending', bookingStatus: 'Pending' },
  { id: 'BK003', devoteeName: 'Amit Patel', serviceName: 'Homam', date: '2026-03-17', time: '06:00 AM', paymentStatus: 'Paid', bookingStatus: 'Confirmed' },
  { id: 'BK004', devoteeName: 'Sunita Reddy', serviceName: 'Satyanarayana Pooja', date: '2026-03-18', time: '10:00 AM', paymentStatus: 'Paid', bookingStatus: 'Completed' },
  { id: 'BK005', devoteeName: 'Vikram Singh', serviceName: 'Archana', date: '2026-03-14', time: '08:00 AM', paymentStatus: 'Refunded', bookingStatus: 'Cancelled' },
];

export const mockDonations = [
  { id: 'DN001', donorName: 'Rajesh Kumar', amount: 25000, category: 'General', paymentMethod: 'UPI', date: '2026-03-14' },
  { id: 'DN002', donorName: 'Priya Sharma', amount: 10000, category: 'Temple Renovation', paymentMethod: 'Card', date: '2026-03-13' },
  { id: 'DN003', donorName: 'Amit Patel', amount: 100000, category: 'Annadanam', paymentMethod: 'Cash', date: '2026-03-12' },
  { id: 'DN004', donorName: 'Sunita Reddy', amount: 5000, category: 'Festival Fund', paymentMethod: 'UPI', date: '2026-03-11' },
  { id: 'DN005', donorName: 'Vikram Singh', amount: 50000, category: 'General', paymentMethod: 'Card', date: '2026-03-10' },
];

export const mockEvents = [
  { id: '1', name: 'Maha Shivaratri', description: 'Grand celebration of Lord Shiva', date: '2026-03-20', time: '06:00 AM', location: 'Main Temple Hall', organizer: 'Head Priest', status: 'Scheduled' },
  { id: '2', name: 'Satyanarayana Pooja', description: 'Monthly community pooja', date: '2026-03-25', time: '10:00 AM', location: 'Prayer Hall', organizer: 'Temple Committee', status: 'Planned' },
  { id: '3', name: 'Navratri Festival', description: '9-day festival celebration', date: '2026-04-06', time: '05:00 AM', location: 'Entire Temple', organizer: 'Festival Committee', status: 'Planned' },
  { id: '4', name: 'Hanuman Jayanti', description: 'Birthday of Lord Hanuman', date: '2026-04-14', time: '06:00 AM', location: 'Hanuman Shrine', organizer: 'Head Priest', status: 'Planned' },
];

export const mockTasks = [
  { id: '1', name: 'Morning Aarti', assignedTo: 'Pandit Sharma', dueDate: '2026-03-14', time: '05:30 AM', status: 'Completed', type: 'pooja' as const },
  { id: '2', name: 'Evening Aarti', assignedTo: 'Pandit Verma', dueDate: '2026-03-14', time: '06:30 PM', status: 'Pending', type: 'pooja' as const },
  { id: '3', name: 'Noon Bhog', assignedTo: 'Kitchen Staff', dueDate: '2026-03-14', time: '12:00 PM', status: 'In Progress', type: 'pooja' as const },
  { id: '4', name: 'Clean main hall', assignedTo: 'Ramu', dueDate: '2026-03-15', status: 'Pending', type: 'general' as const },
  { id: '5', name: 'Update donation records', assignedTo: 'Seema', dueDate: '2026-03-14', status: 'In Progress', type: 'general' as const },
  { id: '6', name: 'Flower arrangement', assignedTo: 'Lakshmi', dueDate: '2026-03-14', status: 'Completed', type: 'general' as const },
];

export const mockInventory = [
  { id: '1', name: 'Camphor', category: 'Pooja Items', quantity: 50, unit: 'packets', stockStatus: 'In Stock', supplier: 'Shree Suppliers' },
  { id: '2', name: 'Ghee', category: 'Pooja Items', quantity: 5, unit: 'liters', stockStatus: 'Low Stock', supplier: 'Dairy Fresh' },
  { id: '3', name: 'Flowers (Marigold)', category: 'Pooja Items', quantity: 200, unit: 'bundles', stockStatus: 'In Stock', supplier: 'Garden Fresh' },
  { id: '4', name: 'Incense Sticks', category: 'Pooja Items', quantity: 8, unit: 'boxes', stockStatus: 'Low Stock', supplier: 'Agarbatti House' },
  { id: '5', name: 'Rice', category: 'Kitchen', quantity: 100, unit: 'kg', stockStatus: 'In Stock', supplier: 'Grain Mart' },
  { id: '6', name: 'Coconuts', category: 'Pooja Items', quantity: 3, unit: 'dozens', stockStatus: 'Low Stock', supplier: 'Fresh Fruits' },
];

export const mockAssets = [
  { id: '1', name: 'Main Temple Bell', category: 'Temple Fixtures', purchaseDate: '2020-01-15', condition: 'Good', maintenanceStatus: 'Up to Date' },
  { id: '2', name: 'Sound System', category: 'Electronics', purchaseDate: '2023-06-20', condition: 'Excellent', maintenanceStatus: 'Up to Date' },
  { id: '3', name: 'Generator 5KVA', category: 'Electrical', purchaseDate: '2022-03-10', condition: 'Good', maintenanceStatus: 'Due Soon' },
  { id: '4', name: 'CCTV Camera Set', category: 'Security', purchaseDate: '2024-01-05', condition: 'Excellent', maintenanceStatus: 'Up to Date' },
  { id: '5', name: 'Kitchen Equipment', category: 'Kitchen', purchaseDate: '2021-08-15', condition: 'Fair', maintenanceStatus: 'Overdue' },
];

export const donationTrendData = [
  { month: 'Oct', amount: 320000 },
  { month: 'Nov', amount: 450000 },
  { month: 'Dec', amount: 680000 },
  { month: 'Jan', amount: 520000 },
  { month: 'Feb', amount: 410000 },
  { month: 'Mar', amount: 590000 },
];

export const donationCategoryData = [
  { name: 'General', value: 45, color: 'hsl(1, 76%, 52%)' },
  { name: 'Annadanam', value: 25, color: 'hsl(233, 53%, 35%)' },
  { name: 'Renovation', value: 15, color: 'hsl(270, 43%, 32%)' },
  { name: 'Festival Fund', value: 15, color: 'hsl(40, 70%, 50%)' },
];

export const serviceBookingData = [
  { service: 'Archana', bookings: 120 },
  { service: 'Abhishekam', bookings: 85 },
  { service: 'Homam', bookings: 45 },
  { service: 'Ganesh Pooja', bookings: 65 },
  { service: 'Satyanarayan', bookings: 55 },
];

export const inventoryUsageData = [
  { item: 'Camphor', used: 40, remaining: 50 },
  { item: 'Ghee', used: 15, remaining: 5 },
  { item: 'Flowers', used: 150, remaining: 200 },
  { item: 'Incense', used: 12, remaining: 8 },
  { item: 'Coconuts', used: 9, remaining: 3 },
];
