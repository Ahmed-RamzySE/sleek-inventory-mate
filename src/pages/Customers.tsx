import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { PlusCircle, Mail, Phone, UserPlus, Pencil, Trash2, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';

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

const customerFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  status: z.enum(["active", "inactive"], {
    required_error: "Please select a status.",
  }),
});

type CustomerFormValues = z.infer<typeof customerFormSchema>;

const Customers = () => {
  const [data, setData] = useState<Customer[]>(customers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteCustomerId, setDeleteCustomerId] = useState<string | null>(null);
  
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      status: "active",
    },
  });

  const handleCreateCustomer = () => {
    setIsEditing(false);
    form.reset({
      name: "",
      email: "",
      phone: "",
      status: "active",
    });
    setIsFormOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setIsEditing(true);
    setSelectedCustomer(customer);
    form.reset({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      status: customer.status,
    });
    setIsFormOpen(true);
  };

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailsOpen(true);
  };

  const handleDeleteConfirm = (id: string) => {
    setDeleteCustomerId(id);
  };

  const handleDeleteCustomer = () => {
    if (deleteCustomerId) {
      setData(data.filter(customer => customer.id !== deleteCustomerId));
      toast.success("Customer deleted successfully");
      setDeleteCustomerId(null);
    }
  };

  const onSubmit = (values: CustomerFormValues) => {
    if (isEditing && selectedCustomer) {
      setData(prev => prev.map(customer => 
        customer.id === selectedCustomer.id 
          ? { ...customer, ...values } 
          : customer
      ));
      toast.success("Customer updated successfully");
    } else {
      const newCustomer: Customer = {
        id: `CUS-${Math.floor(Math.random() * 10000)}`,
        name: values.name,
        email: values.email,
        phone: values.phone,
        status: values.status,
        totalOrders: 0,
        lastOrderDate: '-',
      };
      setData(prev => [...prev, newCustomer]);
      toast.success("Customer created successfully");
    }
    setIsFormOpen(false);
  };

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
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => handleViewCustomer(row.original)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleEditCustomer(row.original)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteConfirm(row.original.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Layout title="Customers" subtitle="Manage your customers">
      <div className="space-y-5">
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-semibold">Customer List</h2>
            <p className="text-muted-foreground">View and manage all your customers</p>
          </div>
          <Button onClick={handleCreateCustomer}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
        
        <DataTable
          columns={columns}
          data={data}
          searchKey="name"
        />

        {selectedCustomer && (
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Customer Details</DialogTitle>
                <DialogDescription>
                  Detailed information about {selectedCustomer.name}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Customer ID</Label>
                    <p className="text-sm font-medium">{selectedCustomer.id}</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <p className="text-sm">
                      <Badge variant={selectedCustomer.status === 'active' ? 'default' : 'secondary'} className={selectedCustomer.status === 'active' ? 'bg-green-500' : ''}>
                        {selectedCustomer.status === 'active' ? 'Active' : 'Inactive'}
                      </Badge>
                    </p>
                  </div>
                  <div>
                    <Label>Name</Label>
                    <p className="text-sm font-medium">{selectedCustomer.name}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p className="text-sm font-medium">{selectedCustomer.email}</p>
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <p className="text-sm font-medium">{selectedCustomer.phone}</p>
                  </div>
                  <div>
                    <Label>Total Orders</Label>
                    <p className="text-sm font-medium">{selectedCustomer.totalOrders}</p>
                  </div>
                  <div>
                    <Label>Last Order Date</Label>
                    <p className="text-sm font-medium">{selectedCustomer.lastOrderDate}</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => handleEditCustomer(selectedCustomer)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <DialogClose asChild>
                  <Button variant="secondary">Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Customer" : "Add New Customer"}</DialogTitle>
              <DialogDescription>
                {isEditing 
                  ? "Update customer information in the form below." 
                  : "Fill in the details to create a new customer."}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="(123) 456-7890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="active" id="active" />
                            <Label htmlFor="active">Active</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="inactive" id="inactive" />
                            <Label htmlFor="inactive">Inactive</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter className="pt-4">
                  <Button variant="outline" type="button" onClick={() => setIsFormOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {isEditing ? "Update Customer" : "Create Customer"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <AlertDialog open={!!deleteCustomerId} onOpenChange={(open) => !open && setDeleteCustomerId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the customer record
                and remove it from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteCustomer} className="bg-destructive text-destructive-foreground">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default Customers;
