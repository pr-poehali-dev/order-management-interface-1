
import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button } from '@/components/ui/button';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import RoleGuard from '@/components/RoleGuard';
import RoleSwitcher from '@/components/RoleSwitcher';
import Orders from '@/pages/Orders';
import CalendarView from '@/pages/CalendarView';
import Reception from '@/pages/Reception';
import Warehouse from '@/pages/Warehouse';
import WriteOff from '@/pages/WriteOff';
import Settings from '@/pages/Settings';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

const queryClient = new QueryClient();

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { user, hasPermission } = useAuth();

  const menuItems = [
    { id: 'orders', label: 'Заказы', icon: 'ShoppingCart', permission: 'createOrders' as const },
    { id: 'reception', label: 'Приёмка', icon: 'ClipboardCheck', permission: 'reception' as const },
    { id: 'warehouse', label: 'Склад', icon: 'Warehouse', permission: 'warehouse' as const },
    { id: 'writeoff', label: 'Списания', icon: 'Trash2', permission: 'writeoff' as const },
    { id: 'calendar', label: 'Календарь', icon: 'Calendar', permission: 'createOrders' as const },
    { id: 'settings', label: 'Справочники', icon: 'BookOpen', permission: 'settings' as const },
  ];

  const visibleMenuItems = menuItems.filter(item => hasPermission(item.permission));

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return <RoleGuard permission="createOrders"><Orders /></RoleGuard>;
      case 'reception':
        return <RoleGuard permission="reception"><Reception /></RoleGuard>;
      case 'warehouse':
        return <RoleGuard permission="warehouse"><Warehouse /></RoleGuard>;
      case 'writeoff':
        return <RoleGuard permission="writeoff"><WriteOff /></RoleGuard>;
      case 'calendar':
        return <RoleGuard permission="createOrders"><CalendarView /></RoleGuard>;
      case 'settings':
        return <RoleGuard permission="settings"><Settings /></RoleGuard>;
      default:
        return <RoleGuard permission="createOrders"><Orders /></RoleGuard>;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={cn(
        "border-r bg-card transition-all duration-300 flex flex-col",
        isSidebarCollapsed ? "w-16" : "w-64"
      )}>
        {/* Logo Section */}
        <div className="border-b p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Package" size={24} className="text-primary-foreground" />
            </div>
            {!isSidebarCollapsed && (
              <div>
                <h1 className="text-lg font-bold text-foreground">OrderFlow</h1>
                <p className="text-xs text-muted-foreground">Система управления</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-3 space-y-1">
          {visibleMenuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3",
                isSidebarCollapsed ? "px-3" : "px-4"
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon name={item.icon as any} size={20} />
              {!isSidebarCollapsed && <span>{item.label}</span>}
            </Button>
          ))}
        </nav>

        {/* Collapse Button */}
        <div className="border-t p-3">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            <Icon name={isSidebarCollapsed ? "ChevronRight" : "ChevronLeft"} size={20} />
            {!isSidebarCollapsed && <span>Свернуть</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b bg-card sticky top-0 z-50 backdrop-blur-sm bg-card/95">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold">
                  {visibleMenuItems.find(item => item.id === activeTab)?.label || 'OrderFlow'}
                </h2>
              </div>
              
              <div className="flex items-center gap-2 md:gap-4">
                <button className="relative p-2 hover:bg-accent rounded-lg transition-colors">
                  <Icon name="Bell" size={20} className="text-muted-foreground" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-pulse"></span>
                </button>
                <RoleSwitcher />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppContent />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;