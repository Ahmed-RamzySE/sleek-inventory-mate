
import React from 'react';
import Layout from '@/components/layout/Layout';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { PlusCircle, Truck, Package, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Shipment {
  id: string;
  trackingNumber: string;
  orderNumber: string;
  customer: string;
  origin: string;
  destination: string;
  status: 'pending' | 'in-transit' | 'delivered' | 'cancelled';
  createdDate: string;
  estimatedDelivery: string;
}

const shipments: Shipment[] = [
  {
    id: '1',
    trackingNumber: 'TRK-12345',
    orderNumber: 'ORD-5678',
    customer: 'Alice Johnson',
    origin: 'Warehouse A',
    destination: 'New York, NY',
    status: 'pending',
    createdDate: '2023-10-15',
    estimatedDelivery: '2023-10-20',
  },
  {
    id: '2',
    trackingNumber: 'TRK-23456',
    orderNumber: 'ORD-6789',
    customer: 'Bob Smith',
    origin: 'Warehouse B',
    destination: 'Los Angeles, CA',
    status: 'in-transit',
    createdDate: '2023-10-14',
    estimatedDelivery: '2023-10-19',
  },
  {
    id: '3',
    trackingNumber: 'TRK-34567',
    orderNumber: 'ORD-7890',
    customer: 'Charlie Davis',
    origin: 'Warehouse A',
    destination: 'Chicago, IL',
    status: 'delivered',
    createdDate: '2023-10-10',
    estimatedDelivery: '2023-10-15',
  },
  {
    id: '4',
    trackingNumber: 'TRK-45678',
    orderNumber: 'ORD-8901',
    customer: 'Diana Miller',
    origin: 'Warehouse C',
    destination: 'Houston, TX',
    status: 'in-transit',
    createdDate: '2023-10-12',
    estimatedDelivery: '2023-10-17',
  },
  {
    id: '5',
    trackingNumber: 'TRK-56789',
    orderNumber: 'ORD-9012',
    customer: 'Edward Wilson',
    origin: 'Warehouse B',
    destination: 'Phoenix, AZ',
    status: 'cancelled',
    createdDate: '2023-10-08',
    estimatedDelivery: '2023-10-13',
  },
];

const getStatusBadge = (status: Shipment['status']) => {
  switch (status) {
    case 'pending':
      return <Badge variant="outline">Pending</Badge>;
    case 'in-transit':
      return <Badge variant="secondary">In Transit</Badge>;
    case 'delivered':
      return <Badge variant="success">Delivered</Badge>;
    case 'cancelled':
      return <Badge variant="destructive">Cancelled</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const columns: ColumnDef<Shipment>[] = [
  {
    accessorKey: 'trackingNumber',
    header: 'Tracking #',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Truck className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{row.original.trackingNumber}</span>
      </div>
    ),
  },
  {
    accessorKey: 'orderNumber',
    header: 'Order #',
  },
  {
    accessorKey: 'customer',
    header: 'Customer',
  },
  {
    accessorKey: 'origin',
    header: 'Origin',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Package className="h-4 w-4 text-muted-foreground" />
        <span>{row.original.origin}</span>
      </div>
    ),
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
    cell: ({ row }) => getStatusBadge(row.original.status),
  },
  {
    accessorKey: 'estimatedDelivery',
    header: 'Est. Delivery',
  },
  {
    id: 'actions',
    cell: () => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">View</Button>
        <Button variant="ghost" size="sm">Update</Button>
      </div>
    ),
  },
];

const Shipments = () => {
  return (
    <Layout title="Shipments" subtitle="Track and manage shipments">
      <div className="space-y-5">
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-semibold">Shipment List</h2>
            <p className="text-muted-foreground">Track and manage all shipments</p>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Shipment
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
