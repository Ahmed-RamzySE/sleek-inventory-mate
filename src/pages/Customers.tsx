
import React from 'react';
import Layout from '@/components/layout/Layout';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { PlusCircle, Mail, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  totalOrders: number;
  lastOrderDate: string;
}

const customers: Customer[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '(555) 123-4567',
    status: 'active',
    totalOrders: 12,
    lastOrderDate: '2023-09-15',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    phone: '(555) 234-5678',
    status: 'active',
    totalOrders: 8,
    lastOrderDate: '2023-10-02',
  },
  {
    id: '3',
    name: 'Charlie Davis',
    email: 'charlie@example.com',
    phone: '(555) 345-6789',
    status: 'inactive',
    totalOrders: 3,
    lastOrderDate: '2023-05-20',
  },
  {
    id: '4',
    name: 'Diana Miller',
    email: 'diana@example.com',
    phone: '(555) 456-7890',
    status: 'active',
    totalOrders: 16,
    lastOrderDate: '2023-10-18',
  },
  {
    id: '5',
    name: 'Edward Wilson',
    email: 'edward@example.com',
    phone: '(555) 567-8901',
    status: 'active',
    totalOrders: 5,
    lastOrderDate: '2023-09-30',
  },
];

const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'name',
    header: 'Customer Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4 text-muted-foreground" />
        <span>{row.original.email}</span>
      </div>
    ),
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Phone className="h-4 w-4 text-muted-foreground" />
        <span>{row.original.phone}</span>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={row.original.status === 'active' ? 'default' : 'secondary'} className={row.original.status === 'active' ? 'bg-green-500 hover:bg-green-600' : ''}>
        {row.original.status === 'active' ? 'Active' : 'Inactive'}
      </Badge>
    ),
  },
  {
    accessorKey: 'totalOrders',
    header: 'Total Orders',
  },
  {
    accessorKey: 'lastOrderDate',
    header: 'Last Order',
  },
  {
    id: 'actions',
    cell: () => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">View</Button>
        <Button variant="ghost" size="sm">Edit</Button>
      </div>
    ),
  },
];

const Customers = () => {
  return (
    <Layout title="Customers" subtitle="Manage your customers">
      <div className="space-y-5">
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-semibold">Customer List</h2>
            <p className="text-muted-foreground">View and manage all your customers</p>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
        
        <DataTable
          columns={columns}
          data={customers}
          searchKey="name"
        />
      </div>
    </Layout>
  );
};

export default Customers;
