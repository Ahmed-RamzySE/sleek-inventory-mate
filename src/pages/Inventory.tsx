
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
  Check,
  X
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

// Sample inventory data
const inventoryData = [
  { 
    id: '001', 
    name: 'Smartphone X', 
    category: 'Electronics', 
    price: 799.99, 
    stockQuantity: 24, 
    inStock: true, 
    lastUpdated: '2023-05-15' 
  },
  { 
    id: '002', 
    name: 'Laptop Pro', 
    category: 'Electronics', 
    price: 1299.99, 
    stockQuantity: 12, 
    inStock: true, 
    lastUpdated: '2023-05-14' 
  },
  { 
    id: '003', 
    name: 'Wireless Earbuds', 
    category: 'Electronics', 
    price: 149.99, 
    stockQuantity: 36, 
    inStock: true, 
    lastUpdated: '2023-05-10' 
  },
  { 
    id: '004', 
    name: 'Smart TV 55"', 
    category: 'Electronics', 
    price: 699.99, 
    stockQuantity: 8, 
    inStock: true, 
    lastUpdated: '2023-05-08' 
  },
  { 
    id: '005', 
    name: 'Coffee Maker', 
    category: 'Appliances', 
    price: 89.99, 
    stockQuantity: 15, 
    inStock: true, 
    lastUpdated: '2023-05-05' 
  },
  { 
    id: '006', 
    name: 'Office Chair', 
    category: 'Furniture', 
    price: 199.99, 
    stockQuantity: 7, 
    inStock: true, 
    lastUpdated: '2023-05-03' 
  },
  { 
    id: '007', 
    name: 'Desk Lamp', 
    category: 'Home', 
    price: 49.99, 
    stockQuantity: 20, 
    inStock: true, 
    lastUpdated: '2023-04-28' 
  },
  { 
    id: '008', 
    name: 'Bluetooth Speaker', 
    category: 'Electronics', 
    price: 79.99, 
    stockQuantity: 0, 
    inStock: false, 
    lastUpdated: '2023-04-25' 
  },
  { 
    id: '009', 
    name: 'Fitness Tracker', 
    category: 'Wearables', 
    price: 129.99, 
    stockQuantity: 18, 
    inStock: true, 
    lastUpdated: '2023-04-22' 
  },
  { 
    id: '010', 
    name: 'Gaming Console', 
    category: 'Electronics', 
    price: 499.99, 
    stockQuantity: 5, 
    inStock: true, 
    lastUpdated: '2023-04-20' 
  },
];

const Inventory = () => {
  const [inventory] = useState(inventoryData);

  const columns: ColumnDef<typeof inventoryData[0]>[] = [
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
            Product Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        )
      },
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => {
        const category = row.getValue('category') as string;
        return (
          <Badge variant="outline" className="font-normal">
            {category}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'price',
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        )
      },
      cell: ({ row }) => {
        const price = row.getValue('price') as number;
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(price);
        return formatted;
      },
    },
    {
      accessorKey: 'stockQuantity',
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Stock
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        )
      },
    },
    {
      accessorKey: 'inStock',
      header: 'Status',
      cell: ({ row }) => {
        const inStock = row.getValue('inStock') as boolean;
        return (
          <div className="flex items-center">
            {inStock ? (
              <Badge className="bg-emerald-500">
                <Check className="mr-1 h-3 w-3" /> In Stock
              </Badge>
            ) : (
              <Badge variant="destructive">
                <X className="mr-1 h-3 w-3" /> Out of Stock
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'lastUpdated',
      header: 'Last Updated',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const product = row.original;

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
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <Layout title="Inventory" subtitle="Manage your products and stock levels">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Products</h2>
          <p className="text-muted-foreground">
            {inventory.length} items in total
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="animate-fade-in">
        <DataTable
          columns={columns}
          data={inventory}
          searchKey="name"
        />
      </div>
    </Layout>
  );
};

export default Inventory;
