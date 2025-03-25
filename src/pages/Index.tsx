
import React from 'react';
import Layout from '@/components/layout/Layout';
import StatsCard from '@/components/dashboard/StatsCard';
import InventoryChart from '@/components/dashboard/InventoryChart';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Package, ShoppingCart, AlertTriangle, TruckIcon, Layers, ArrowUp, ArrowDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data
const inventoryTrends = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 700 },
  { name: 'Jun', value: 900 },
  { name: 'Jul', value: 1000 },
];

const lowStockItems = [
  { name: 'Smartphone X', quantity: 5, threshold: 10 },
  { name: 'Laptop Pro', quantity: 3, threshold: 15 },
  { name: 'Wireless Earbuds', quantity: 7, threshold: 20 },
  { name: 'Smart TV 55"', quantity: 2, threshold: 5 },
];

const recentTransactions = [
  { id: 'TRX-001', type: 'IN', product: 'Smartphone X', quantity: 20, date: '2023-05-15' },
  { id: 'TRX-002', type: 'OUT', product: 'Laptop Pro', quantity: 5, date: '2023-05-14' },
  { id: 'TRX-003', type: 'IN', product: 'Wireless Earbuds', quantity: 50, date: '2023-05-13' },
  { id: 'TRX-004', type: 'OUT', product: 'Smart TV 55"', quantity: 3, date: '2023-05-12' },
];

const Dashboard = () => {
  return (
    <Layout title="Dashboard" subtitle="Welcome back, Admin">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Inventory"
          value="1,234"
          icon={Package}
          trend={{ value: 12, isPositive: true }}
          className="animate-fade-in"
        />
        <StatsCard
          title="Pending Orders"
          value="28"
          icon={ShoppingCart}
          trend={{ value: 5, isPositive: true }}
          className="animate-fade-in [animation-delay:100ms]"
        />
        <StatsCard
          title="Low Stock Items"
          value="8"
          icon={AlertTriangle}
          trend={{ value: 2, isPositive: false }}
          className="animate-fade-in [animation-delay:200ms]"
        />
        <StatsCard
          title="Shipments Today"
          value="12"
          icon={TruckIcon}
          trend={{ value: 18, isPositive: true }}
          className="animate-fade-in [animation-delay:300ms]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DashboardCard 
          title="Inventory Trends" 
          description="Total inventory items over time"
          className="animate-fade-in [animation-delay:400ms]"
        >
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={inventoryTrends}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: 'hsl(var(--foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--muted))' }}
                />
                <YAxis 
                  tick={{ fill: 'hsl(var(--foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--muted))' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    borderColor: 'hsl(var(--border))' 
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <InventoryChart className="animate-fade-in [animation-delay:500ms]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard 
          title="Low Stock Alerts" 
          description="Items below reorder threshold"
          className="animate-fade-in [animation-delay:600ms]"
        >
          <div className="space-y-4">
            {lowStockItems.map((item) => (
              <div 
                key={item.name} 
                className="flex items-center justify-between p-3 rounded-md bg-card"
              >
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Quantity: {item.quantity} / Threshold: {item.threshold}
                  </div>
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-rose-500/10 text-rose-500">
                  <AlertTriangle size={18} />
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard 
          title="Recent Transactions" 
          description="Latest inventory movements"
          className="animate-fade-in [animation-delay:700ms]"
        >
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between p-3 rounded-md bg-card"
              >
                <div>
                  <div className="font-medium">{transaction.product}</div>
                  <div className="text-sm text-muted-foreground">
                    {transaction.id} - {transaction.date}
                  </div>
                </div>
                <div className={`flex items-center gap-1 ${
                  transaction.type === 'IN' 
                    ? 'text-emerald-500' 
                    : 'text-rose-500'
                }`}>
                  {transaction.type === 'IN' ? (
                    <ArrowUp size={18} />
                  ) : (
                    <ArrowDown size={18} />
                  )}
                  <span className="font-medium">{transaction.quantity}</span>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </Layout>
  );
};

export default Dashboard;
