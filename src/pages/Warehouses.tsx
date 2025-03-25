
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
  MapPin
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardCard from '@/components/dashboard/DashboardCard';

// Sample warehouses data
const warehousesData = [
  { 
    id: 'WH-001', 
    name: 'North Distribution Center', 
    location: 'Seattle, WA', 
    manager: 'David Wilson', 
    capacity: 5000,
    utilized: 3850,
    products: 120,
  },
  { 
    id: 'WH-002', 
    name: 'East Coast Warehouse', 
    location: 'Boston, MA', 
    manager: 'Sarah Johnson', 
    capacity: 8000,
    utilized: 6200,
    products: 215,
  },
  { 
    id: 'WH-003', 
    name: 'Central Fulfillment', 
    location: 'Chicago, IL', 
    manager: 'Michael Brown', 
    capacity: 6500,
    utilized: 5900,
    products: 180,
  },
  { 
    id: 'WH-004', 
    name: 'Southern Distribution', 
    location: 'Atlanta, GA', 
    manager: 'Emma Davis', 
    capacity: 4500,
    utilized: 2800,
    products: 95,
  },
  { 
    id: 'WH-005', 
    name: 'West Coast Facility', 
    location: 'Los Angeles, CA', 
    manager: 'James Martinez', 
    capacity: 7500,
    utilized: 6300,
    products: 210,
  },
];

const Warehouses = () => {
  const [warehouses] = useState(warehousesData);

  const columns: ColumnDef<typeof warehousesData[0]>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Warehouse Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        )
      },
    },
    {
      accessorKey: 'location',
      header: 'Location',
      cell: ({ row }) => {
        const location = row.getValue('location') as string;
        return (
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
            {location}
          </div>
        );
      },
    },
    {
      accessorKey: 'manager',
      header: 'Manager',
    },
    {
      accessorKey: 'products',
      header: 'Products',
      cell: ({ row }) => {
        const products = row.getValue('products') as number;
        return (
          <Badge variant="outline">
            {products} SKUs
          </Badge>
        );
      },
    },
    {
      accessorKey: 'utilized',
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Utilization
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        )
      },
      cell: ({ row }) => {
        const utilized = row.getValue('utilized') as number;
        const capacity = row.original.capacity;
        const percentage = Math.round((utilized / capacity) * 100);
        
        let color = 'bg-emerald-500';
        if (percentage > 90) {
          color = 'bg-red-500';
        } else if (percentage > 70) {
          color = 'bg-yellow-500';
        }
        
        return (
          <div className="flex flex-col w-32">
            <div className="flex justify-between text-xs mb-1">
              <span>{percentage}%</span>
              <span>{utilized.toLocaleString()} / {capacity.toLocaleString()}</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className={`${color} h-2 rounded-full`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const warehouse = row.original;

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
                View Inventory
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // Calculate total stats
  const totalCapacity = warehouses.reduce((sum, warehouse) => sum + warehouse.capacity, 0);
  const totalUtilized = warehouses.reduce((sum, warehouse) => sum + warehouse.utilized, 0);
  const totalProducts = warehouses.reduce((sum, warehouse) => sum + warehouse.products, 0);
  const utilizationPercentage = Math.round((totalUtilized / totalCapacity) * 100);

  return (
    <Layout title="Warehouses" subtitle="Manage warehouse locations and inventory">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Capacity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCapacity.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Units across all warehouses</p>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in [animation-delay:100ms]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Storage Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{utilizationPercentage}%</div>
            <div className="w-full bg-secondary rounded-full h-2 mt-2">
              <div
                className={`${utilizationPercentage > 90 ? 'bg-red-500' : utilizationPercentage > 70 ? 'bg-yellow-500' : 'bg-emerald-500'} h-2 rounded-full`}
                style={{ width: `${utilizationPercentage}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{totalUtilized.toLocaleString()} of {totalCapacity.toLocaleString()} units used</p>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in [animation-delay:200ms]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground mt-1">Unique SKUs across all warehouses</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Warehouse Locations</h2>
          <p className="text-muted-foreground">
            {warehouses.length} locations in total
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Warehouse
        </Button>
      </div>

      <div className="animate-fade-in [animation-delay:300ms]">
        <DataTable
          columns={columns}
          data={warehouses}
          searchKey="name"
        />
      </div>
    </Layout>
  );
};

export default Warehouses;
