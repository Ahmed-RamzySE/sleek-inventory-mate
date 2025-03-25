
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { 
  MoreHorizontal, 
  Edit, 
  Trash, 
  Plus,
  FileText,
  ArrowUpDown,
  Clock,
  PackageCheck,
  Truck,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered';

// Sample orders data
const ordersData = [
  { 
    id: 'ORD-001', 
    customer: 'John Smith', 
    date: '2023-05-15', 
    total: 1299.99, 
    status: 'Pending' as OrderStatus,
    items: 3,
    paymentMethod: 'Credit Card'
  },
  { 
    id: 'ORD-002', 
    customer: 'Emily Johnson', 
    date: '2023-05-14', 
    total: 549.98, 
    status: 'Processing' as OrderStatus,
    items: 2,
    paymentMethod: 'PayPal'
  },
  { 
    id: 'ORD-003', 
    customer: 'Michael Davis', 
    date: '2023-05-13', 
    total: 799.99, 
    status: 'Shipped' as OrderStatus,
    items: 1,
    paymentMethod: 'Credit Card'
  },
  { 
    id: 'ORD-004', 
    customer: 'Sarah Wilson', 
    date: '2023-05-10', 
    total: 329.97, 
    status: 'Delivered' as OrderStatus,
    items: 3,
    paymentMethod: 'PayPal'
  },
  { 
    id: 'ORD-005', 
    customer: 'Robert Brown', 
    date: '2023-05-09', 
    total: 1499.98, 
    status: 'Delivered' as OrderStatus,
    items: 2,
    paymentMethod: 'Credit Card'
  },
  { 
    id: 'ORD-006', 
    customer: 'Jennifer Lee', 
    date: '2023-05-08', 
    total: 249.99, 
    status: 'Processing' as OrderStatus,
    items: 1,
    paymentMethod: 'PayPal'
  },
  { 
    id: 'ORD-007', 
    customer: 'David Garcia', 
    date: '2023-05-07', 
    total: 699.99, 
    status: 'Pending' as OrderStatus,
    items: 1,
    paymentMethod: 'Credit Card'
  },
  { 
    id: 'ORD-008', 
    customer: 'Lisa Martinez', 
    date: '2023-05-05', 
    total: 899.97, 
    status: 'Shipped' as OrderStatus,
    items: 3,
    paymentMethod: 'PayPal'
  },
  { 
    id: 'ORD-009', 
    customer: 'Kevin Wilson', 
    date: '2023-05-03', 
    total: 449.99, 
    status: 'Delivered' as OrderStatus,
    items: 1,
    paymentMethod: 'Credit Card'
  },
  { 
    id: 'ORD-010', 
    customer: 'Michelle Thompson', 
    date: '2023-05-01', 
    total: 1099.98, 
    status: 'Processing' as OrderStatus,
    items: 2,
    paymentMethod: 'PayPal'
  },
];

const Orders = () => {
  const [orders] = useState(ordersData);

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return <Clock className="mr-1 h-3 w-3" />;
      case 'Processing':
        return <PackageCheck className="mr-1 h-3 w-3" />;
      case 'Shipped':
        return <Truck className="mr-1 h-3 w-3" />;
      case 'Delivered':
        return <CheckCircle2 className="mr-1 h-3 w-3" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return "bg-yellow-500";
      case 'Processing':
        return "bg-blue-500";
      case 'Shipped':
        return "bg-purple-500";
      case 'Delivered':
        return "bg-emerald-500";
      default:
        return "bg-gray-500";
    }
  };

  const columns: ColumnDef<typeof ordersData[0]>[] = [
    {
      accessorKey: 'id',
      header: 'Order ID',
    },
    {
      accessorKey: 'customer',
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Customer
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        )
      },
    },
    {
      accessorKey: 'date',
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        )
      },
    },
    {
      accessorKey: 'total',
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        )
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('total'));
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(amount);
        
        return formatted;
      },
    },
    {
      accessorKey: 'items',
      header: 'Items',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as OrderStatus;
        return (
          <Badge className={getStatusColor(status)}>
            {getStatusIcon(status)} {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'paymentMethod',
      header: 'Payment',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const order = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash className="mr-2 h-4 w-4" />
                Cancel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <Layout title="Orders" subtitle="Manage customer orders">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Order List</h2>
          <p className="text-muted-foreground">
            {orders.length} orders in total
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Order
        </Button>
      </div>

      <div className="animate-fade-in">
        <DataTable
          columns={columns}
          data={orders}
          searchKey="customer"
        />
      </div>
    </Layout>
  );
};

export default Orders;
