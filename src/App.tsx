
import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import RoleGuard from '@/components/RoleGuard';
import MobileMenu from '@/components/MobileMenu';
import RoleSwitcher from '@/components/RoleSwitcher';
import Orders from '@/pages/Orders';
import CalendarView from '@/pages/CalendarView';
import Reception from '@/pages/Reception';
import Warehouse from '@/pages/Warehouse';
import WriteOff from '@/pages/WriteOff';
import Settings from '@/pages/Settings';
import Icon from '@/components/ui/icon';

const queryClient = new QueryClient();

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('orders');
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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50 backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MobileMenu activeTab={activeTab} onTabChange={setActiveTab} />
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Package" size={24} className="text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-foreground">OrderFlow</h1>
                <p className="text-xs text-muted-foreground">Система управления заказами</p>
              </div>
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

      <main className="container mx-auto px-4 md:px-6 py-4 md:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`hidden md:grid w-full max-w-4xl mb-8 grid-cols-${visibleMenuItems.length}`}>
            {visibleMenuItems.map((item) => (
              <TabsTrigger 
                key={item.id} 
                value={item.id} 
                className="flex items-center gap-2"
              >
                <Icon name={item.icon as any} size={16} />
                <span className="hidden lg:inline">{item.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="orders" className="animate-fade-in">
            <RoleGuard permission="createOrders">
              <Orders />
            </RoleGuard>
          </TabsContent>
          
          <TabsContent value="reception" className="animate-fade-in">
            <RoleGuard permission="reception">
              <Reception />
            </RoleGuard>
          </TabsContent>
          
          <TabsContent value="warehouse" className="animate-fade-in">
            <RoleGuard permission="warehouse">
              <Warehouse />
            </RoleGuard>
          </TabsContent>
          
          <TabsContent value="writeoff" className="animate-fade-in">
            <RoleGuard permission="writeoff">
              <WriteOff />
            </RoleGuard>
          </TabsContent>
          
          <TabsContent value="calendar" className="animate-fade-in">
            <RoleGuard permission="createOrders">
              <CalendarView />
            </RoleGuard>
          </TabsContent>
          
          <TabsContent value="settings" className="animate-fade-in">
            <RoleGuard permission="settings">
              <Settings />
            </RoleGuard>
          </TabsContent>
        </Tabs>
      </main>
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