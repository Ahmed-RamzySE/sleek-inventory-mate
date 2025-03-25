
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Download, FileText, BarChart3, PieChart, Truck, Package } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';

// Sample data for charts
const monthlyData = [
  { name: 'Jan', sales: 4000, orders: 240, inventory: 2400 },
  { name: 'Feb', sales: 3000, orders: 198, inventory: 2210 },
  { name: 'Mar', sales: 2000, orders: 120, inventory: 2290 },
  { name: 'Apr', sales: 2780, orders: 190, inventory: 2000 },
  { name: 'May', sales: 1890, orders: 230, inventory: 2181 },
  { name: 'Jun', sales: 2390, orders: 310, inventory: 2500 },
  { name: 'Jul', sales: 3490, orders: 350, inventory: 2100 },
  { name: 'Aug', sales: 4000, orders: 400, inventory: 2400 },
  { name: 'Sep', sales: 3800, orders: 380, inventory: 2290 },
  { name: 'Oct', sales: 4200, orders: 420, inventory: 2300 },
  { name: 'Nov', sales: 3950, orders: 395, inventory: 2400 },
  { name: 'Dec', sales: 5000, orders: 500, inventory: 2500 },
];

const categoryData = [
  { name: 'Electronics', value: 400 },
  { name: 'Furniture', value: 300 },
  { name: 'Clothing', value: 300 },
  { name: 'Food', value: 200 },
  { name: 'Books', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Reports = () => {
  const [date, setDate] = useState<Date>();

  return (
    <Layout title="Reports" subtitle="View and analyze your business data">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Tabs defaultValue="sales" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="sales">Sales</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="customers">Customers</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <CalendarIcon className="h-4 w-4" />
                      {date ? format(date, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
            
            <TabsContent value="sales" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DashboardCard title="Monthly Sales" description="Sales trends over the past year">
                  <ChartContainer config={{}} className="h-[300px]">
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip />
                      <Legend />
                      <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                  </ChartContainer>
                </DashboardCard>
                
                <DashboardCard title="Sales by Category" description="Product category breakdown">
                  <ChartContainer config={{}} className="h-[300px]">
                    <RechartsPieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </RechartsPieChart>
                  </ChartContainer>
                </DashboardCard>
              </div>
              
              <DashboardCard title="Sales vs. Orders" description="Comparison of sales revenue and order volume">
                <ChartContainer config={{}} className="h-[300px]">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <ChartTooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#82ca9d" />
                  </LineChart>
                </ChartContainer>
              </DashboardCard>
            </TabsContent>
            
            <TabsContent value="inventory" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DashboardCard title="Inventory Levels" description="Current inventory by month">
                  <ChartContainer config={{}} className="h-[300px]">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip />
                      <Legend />
                      <Bar dataKey="inventory" fill="#82ca9d" />
                    </BarChart>
                  </ChartContainer>
                </DashboardCard>
                
                <DashboardCard title="Low Stock Items" description="Products that need reordering">
                  <div className="space-y-4 mt-2">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="flex justify-between items-center p-3 border rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-muted rounded flex items-center justify-center">
                            <Package className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Product {item}</p>
                            <p className="text-sm text-muted-foreground">SKU-{1000 + item}</p>
                          </div>
                        </div>
                        <Badge variant="destructive">{item} left</Badge>
                      </div>
                    ))}
                  </div>
                </DashboardCard>
              </div>
            </TabsContent>
            
            <TabsContent value="customers" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DashboardCard title="Top Customers" description="Customers by order volume">
                  <div className="space-y-4 mt-2">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="flex justify-between items-center p-3 border rounded-md">
                        <div className="flex items-center gap-3">
                          <div className={cn("h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium")}>
                            {String.fromCharCode(64 + item)}
                          </div>
                          <div>
                            <p className="font-medium">Customer {item}</p>
                            <p className="text-sm text-muted-foreground">{6-item}0 orders</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium">${(6-item) * 1000}</span>
                      </div>
                    ))}
                  </div>
                </DashboardCard>
                
                <DashboardCard title="Customer Acquisition" description="New customers over time">
                  <ChartContainer config={{}} className="h-[300px]">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip />
                      <Legend />
                      <Line type="monotone" dataKey="orders" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ChartContainer>
                </DashboardCard>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="bg-muted/50 p-4 rounded-lg border">
          <div className="flex items-start gap-4">
            <FileText className="h-6 w-6 text-muted-foreground mt-1" />
            <div>
              <h3 className="font-medium">Available Reports</h3>
              <p className="text-sm text-muted-foreground mb-4">Generate and download detailed reports</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { icon: BarChart3, title: 'Sales Report' },
                  { icon: PieChart, title: 'Inventory Report' },
                  { icon: FileText, title: 'Customer Report' },
                  { icon: Truck, title: 'Shipping Report' },
                  { icon: Package, title: 'Product Report' },
                  { icon: CalendarIcon, title: 'Monthly Summary' },
                ].map((report, index) => (
                  <Button variant="outline" key={index} className="flex items-center justify-start gap-2 h-auto py-3">
                    <report.icon className="h-4 w-4" />
                    <span>{report.title}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
