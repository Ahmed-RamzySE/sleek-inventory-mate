
import React from 'react';
import Layout from '@/components/layout/Layout';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { PlusCircle, Truck, Package, Calendar, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Shipment {
  id: string;
  trackingNumber: string;
  customer: string;
  destination: string;
  status: 'pending' | 'in-transit' | 'delivered' | 'returned';
  items: number;
  shippedDate: string;
  deliveryDate: string;
}

const shipments: Shipment[] = [
  {
    id: '1',
    trackingNumber: 'SHP-12345',
    customer: 'Alice Johnson',
    destination: 'New York, NY',
    status: 'delivered',
    items: 3,
    shippedDate: '2023-09-10',
    deliveryDate: '2023-09-15',
  },
  {
    id: '2',
    trackingNumber: 'SHP-23456',
    customer: 'Bob Smith',
    destination: 'Los Angeles, CA',
    status: 'in-transit',
    items: 2,
    shippedDate: '2023-10-01',
    deliveryDate: '2023-10-05',
  },
  {
    id: '3',
    trackingNumber: 'SHP-34567',
    customer: 'Charlie Davis',
    destination: 'Chicago, IL',
    status: 'pending',
    items: 5,
    shippedDate: '',
    deliveryDate: '2023-10-25',
  },
  {
    id: '4',
    trackingNumber: 'SHP-45678',
    customer: 'Diana Miller',
    destination: 'Houston, TX',
    status: 'returned',
    items: 1,
    shippedDate: '2023-09-20',
    deliveryDate: '2023-09-28',
  },
];

const getStatusColor = (status: Shipment['status']) => {
  switch (status) {
    case 'delivered':
      return 'bg-green-500 hover:bg-green-600';
    case 'in-transit':
      return 'bg-blue-500 hover:bg-blue-600';
    case 'pending':
      return 'bg-yellow-500 hover:bg-yellow-600';
    case 'returned':
      return 'bg-red-500 hover:bg-red-600';
    default:
      return '';
  }
};

const getStatusText = (status: Shipment['status']) => {
  return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
};

const columns: ColumnDef<Shipment>[] = [
  {
    accessorKey: 'trackingNumber',
    header: 'Tracking #',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Package className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{row.original.trackingNumber}</span>
      </div>
    ),
  },
  {
    accessorKey: 'customer',
    header: 'Customer',
  },
  {
    accessorKey: 'destination',
    header: 'Destination',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <span>{row.original.destination}</span>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant="default" className={getStatusColor(row.original.status)}>
        {getStatusText(row.original.status)}
      </Badge>
    ),
  },
  {
    accessorKey: 'items',
    header: 'Items',
  },
  {
    accessorKey: 'shippedDate',
    header: 'Shipped Date',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.original.shippedDate ? (
          <>
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{row.original.shippedDate}</span>
          </>
        ) : (
          <span className="text-muted-foreground">Not shipped</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: 'deliveryDate',
    header: 'Delivery Date',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span>{row.original.deliveryDate}</span>
      </div>
    ),
  },
  {
    id: 'actions',
    cell: () => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">View</Button>
        <Button variant="ghost" size="sm">Track</Button>
      </div>
    ),
  },
];

const Shipments = () => {
  return (
    <Layout title="Shipments" subtitle="Track and manage your shipments">
      <div className="space-y-5">
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-semibold">Shipment List</h2>
            <p className="text-muted-foreground">View and manage all shipments</p>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Shipment
          </Button>
        </div>
        
        <DataTable
          columns={columns}
          data={shipments}
          searchKey="trackingNumber"
        />
      </div>
    </Layout>
  );
};

export default Shipments;
