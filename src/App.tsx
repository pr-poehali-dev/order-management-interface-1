
import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Dashboard from '@/pages/Dashboard';
import Orders from '@/pages/Orders';
import Analytics from '@/pages/Analytics';
import CalendarView from '@/pages/CalendarView';
import Icon from '@/components/ui/icon';

const queryClient = new QueryClient();

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-background">
          <header className="border-b bg-card sticky top-0 z-50 backdrop-blur-sm bg-card/95">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Package" size={24} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-foreground">OrderFlow</h1>
                    <p className="text-xs text-muted-foreground">Система управления заказами</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <button className="relative p-2 hover:bg-accent rounded-lg transition-colors">
                    <Icon name="Bell" size={20} className="text-muted-foreground" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
                  </button>
                  <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="User" size={18} className="text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-6 py-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-2xl grid-cols-4 mb-8">
                <TabsTrigger value="dashboard" className="flex items-center gap-2">
                  <Icon name="LayoutDashboard" size={16} />
                  <span>Дашборд</span>
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <Icon name="ShoppingCart" size={16} />
                  <span>Заказы</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <Icon name="TrendingUp" size={16} />
                  <span>Аналитика</span>
                </TabsTrigger>
                <TabsTrigger value="calendar" className="flex items-center gap-2">
                  <Icon name="Calendar" size={16} />
                  <span>Календарь</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="animate-fade-in">
                <Dashboard />
              </TabsContent>
              
              <TabsContent value="orders" className="animate-fade-in">
                <Orders />
              </TabsContent>
              
              <TabsContent value="analytics" className="animate-fade-in">
                <Analytics />
              </TabsContent>
              
              <TabsContent value="calendar" className="animate-fade-in">
                <CalendarView />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;