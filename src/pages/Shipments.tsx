import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { 
  PlusCircle, 
  Truck, 
  Package, 
  Calendar, 
  MapPin, 
  Eye, 
  Pencil, 
  Trash2,
  ArrowUpDown
} from 'lucide-react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';

type ShipmentStatus = 'pending' | 'in-transit' | 'delivered' | 'returned';

interface Shipment {
  id: string;
  trackingNumber: string;
  customer: string;
  destination: string;
  status: ShipmentStatus;
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

const getStatusColor = (status: ShipmentStatus) => {
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

const getStatusText = (status: ShipmentStatus) => {
  return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
};

const shipmentFormSchema = z.object({
  trackingNumber: z.string().min(5, { message: "Tracking number is required." }),
  customer: z.string().min(2, { message: "Customer name is required." }),
  destination: z.string().min(3, { message: "Destination is required." }),
  status: z.enum(["pending", "in-transit", "delivered", "returned"], {
    required_error: "Please select a status.",
  }),
  items: z.coerce.number().min(1, { message: "At least one item is required." }),
  shippedDate: z.string().optional(),
  deliveryDate: z.string().min(1, { message: "Delivery date is required." }),
});

type ShipmentFormValues = z.infer<typeof shipmentFormSchema>;

const Shipments = () => {
  const [data, setData] = useState<Shipment[]>(shipments);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteShipmentId, setDeleteShipmentId] = useState<string | null>(null);
  
  const form = useForm<ShipmentFormValues>({
    resolver: zodResolver(shipmentFormSchema),
    defaultValues: {
      trackingNumber: "",
      customer: "",
      destination: "",
      status: "pending",
      items: 1,
      shippedDate: "",
      deliveryDate: "",
    },
  });

  const handleCreateShipment = () => {
    setIsEditing(false);
    const today = new Date().toISOString().split('T')[0];
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);
    const deliveryDate = futureDate.toISOString().split('T')[0];
    
    form.reset({
      trackingNumber: `SHP-${Math.floor(Math.random() * 100000)}`,
      customer: "",
      destination: "",
      status: "pending",
      items: 1,
      shippedDate: "",
      deliveryDate: deliveryDate,
    });
    setIsFormOpen(true);
  };

  const handleEditShipment = (shipment: Shipment) => {
    setIsEditing(true);
    setSelectedShipment(shipment);
    form.reset({
      trackingNumber: shipment.trackingNumber,
      customer: shipment.customer,
      destination: shipment.destination,
      status: shipment.status,
      items: shipment.items,
      shippedDate: shipment.shippedDate,
      deliveryDate: shipment.deliveryDate,
    });
    setIsFormOpen(true);
  };

  const handleViewShipment = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setIsDetailsOpen(true);
  };

  const handleDeleteConfirm = (id: string) => {
    setDeleteShipmentId(id);
  };

  const handleDeleteShipment = () => {
    if (deleteShipmentId) {
      setData(data.filter(shipment => shipment.id !== deleteShipmentId));
      toast.success("Shipment deleted successfully");
      setDeleteShipmentId(null);
    }
  };

  const onSubmit = (values: ShipmentFormValues) => {
    if (isEditing && selectedShipment) {
      setData(prev => prev.map(shipment => 
        shipment.id === selectedShipment.id 
          ? { ...shipment, ...values } 
          : shipment
      ));
      toast.success("Shipment updated successfully");
    } else {
      const newShipment: Shipment = {
        id: `${Math.floor(Math.random() * 10000)}`,
        trackingNumber: values.trackingNumber,
        customer: values.customer,
        destination: values.destination,
        status: values.status,
        items: values.items,
        shippedDate: values.shippedDate || "",
        deliveryDate: values.deliveryDate,
      };
      setData(prev => [...prev, newShipment]);
      toast.success("Shipment created successfully");
    }
    setIsFormOpen(false);
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
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => handleViewShipment(row.original)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleEditShipment(row.original)}>
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
    <Layout title="Shipments" subtitle="Track and manage your shipments">
      <div className="space-y-5">
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-semibold">Shipment List</h2>
            <p className="text-muted-foreground">View and manage all shipments</p>
          </div>
          <Button onClick={handleCreateShipment}>
            <Truck className="mr-2 h-4 w-4" />
            New Shipment
          </Button>
        </div>
        
        <DataTable
          columns={columns}
          data={data}
          searchKey="trackingNumber"
        />

        {selectedShipment && (
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Shipment Details</DialogTitle>
                <DialogDescription>
                  Tracking information for {selectedShipment.trackingNumber}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="rounded-lg border p-4">
                  <Badge variant="outline" className={getStatusColor(selectedShipment.status)}>
                    {getStatusText(selectedShipment.status)}
                  </Badge>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <Label>Shipment ID</Label>
                      <p className="text-sm font-medium">{selectedShipment.id}</p>
                    </div>
                    <div>
                      <Label>Tracking Number</Label>
                      <p className="text-sm font-medium">{selectedShipment.trackingNumber}</p>
                    </div>
                    <div>
                      <Label>Customer</Label>
                      <p className="text-sm font-medium">{selectedShipment.customer}</p>
                    </div>
                    <div>
                      <Label>Items</Label>
                      <p className="text-sm font-medium">{selectedShipment.items}</p>
                    </div>
                    <div>
                      <Label>Destination</Label>
                      <p className="text-sm font-medium">{selectedShipment.destination}</p>
                    </div>
                    <div>
                      <Label>Shipped Date</Label>
                      <p className="text-sm font-medium">
                        {selectedShipment.shippedDate || "Not shipped yet"}
                      </p>
                    </div>
                    <div>
                      <Label>Expected Delivery</Label>
                      <p className="text-sm font-medium">{selectedShipment.deliveryDate}</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="text-sm font-medium mb-2">Shipment Timeline</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <Package className="h-4 w-4" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium">Order Processed</p>
                        <p className="text-xs text-muted-foreground">Package prepared for shipping</p>
                      </div>
                    </div>
                    {selectedShipment.shippedDate && (
                      <div className="flex items-start">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <Truck className="h-4 w-4" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium">Shipped</p>
                          <p className="text-xs text-muted-foreground">Package en route to destination</p>
                        </div>
                      </div>
                    )}
                    {selectedShipment.status === 'delivered' && (
                      <div className="flex items-start">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium">Delivered</p>
                          <p className="text-xs text-muted-foreground">Package delivered to recipient</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => handleEditShipment(selectedShipment)}>
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
              <DialogTitle>{isEditing ? "Edit Shipment" : "Create New Shipment"}</DialogTitle>
              <DialogDescription>
                {isEditing 
                  ? "Update shipment information in the form below." 
                  : "Fill in the details to create a new shipment."}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
                <FormField
                  control={form.control}
                  name="trackingNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tracking Number</FormLabel>
                      <FormControl>
                        <Input placeholder="SHP-12345" {...field} readOnly={isEditing} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="customer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destination</FormLabel>
                      <FormControl>
                        <Input placeholder="New York, NY" {...field} />
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in-transit">In Transit</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="returned">Returned</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="items"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Items</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shippedDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shipped Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deliveryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Delivery Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
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
                    {isEditing ? "Update Shipment" : "Create Shipment"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <AlertDialog open={!!deleteShipmentId} onOpenChange={(open) => !open && setDeleteShipmentId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the shipment record
                and remove it from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteShipment} className="bg-destructive text-destructive-foreground">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default Shipments;
