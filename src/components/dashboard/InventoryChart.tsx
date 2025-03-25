
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { cn } from '@/lib/utils';

// Sample data - Replace with actual data in production
const data = [
  { name: 'Electronics', value: 240 },
  { name: 'Clothing', value: 180 },
  { name: 'Furniture', value: 120 },
  { name: 'Books', value: 60 },
  { name: 'Toys', value: 30 },
  { name: 'Sports', value: 90 },
];

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-md text-sm">
        <p className="font-medium">{`${label}`}</p>
        <p className="text-primary">{`${payload[0].value} items`}</p>
      </div>
    );
  }

  return null;
};

interface InventoryChartProps {
  className?: string;
  title?: string;
}

const InventoryChart: React.FC<InventoryChartProps> = ({
  className,
  title = "Inventory by Category"
}) => {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                axisLine={{ stroke: 'hsl(var(--muted))' }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                axisLine={{ stroke: 'hsl(var(--muted))' }}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                radius={[4, 4, 0, 0]} 
                fill="hsl(var(--primary))" 
                barSize={30}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryChart;
