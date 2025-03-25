
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Warehouse, 
  Users, 
  TruckIcon, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const SidebarItem = ({ icon, label, to, isActive, isCollapsed }: SidebarItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 my-1 rounded-md transition-all duration-200",
        isActive 
          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
        isCollapsed && "justify-center p-2"
      )}
    >
      <div className="w-5 h-5">{icon}</div>
      {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', to: '/' },
    { icon: <Package size={20} />, label: 'Inventory', to: '/inventory' },
    { icon: <ShoppingCart size={20} />, label: 'Orders', to: '/orders' },
    { icon: <Warehouse size={20} />, label: 'Warehouses', to: '/warehouses' },
    { icon: <Users size={20} />, label: 'Customers', to: '/customers' },
    { icon: <TruckIcon size={20} />, label: 'Shipments', to: '/shipments' },
    { icon: <BarChart3 size={20} />, label: 'Reports', to: '/reports' },
    { icon: <Settings size={20} />, label: 'Settings', to: '/settings' },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div 
      className={cn(
        "h-screen flex flex-col bg-sidebar transition-all duration-300 border-r border-sidebar-border relative",
        isCollapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="text-sidebar-foreground font-semibold text-lg">
            IMS
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors duration-200"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="flex-1 py-4 px-2 overflow-y-auto scrollbar-none">
        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.to}
              icon={item.icon}
              label={item.label}
              to={item.to}
              isActive={location.pathname === item.to}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>
      </div>

      <div className="border-t border-sidebar-border p-4">
        <div className={cn(
          "flex items-center gap-3",
          isCollapsed && "justify-center"
        )}>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            A
          </div>
          {!isCollapsed && (
            <div className="text-sm">
              <div className="font-medium text-sidebar-foreground">Admin User</div>
              <div className="text-sidebar-foreground/70 text-xs">admin@example.com</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
