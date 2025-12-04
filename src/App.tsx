
import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Orders from '@/pages/Orders';
import CalendarView from '@/pages/CalendarView';
import Reception from '@/pages/Reception';
import Warehouse from '@/pages/Warehouse';
import WriteOff from '@/pages/WriteOff';
import Settings from '@/pages/Settings';
import Icon from '@/components/ui/icon';

const queryClient = new QueryClient();

const App = () => {
  const [activeTab, setActiveTab] = useState('orders');

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
              <TabsList className="grid w-full max-w-4xl grid-cols-6 mb-8">
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <Icon name="ShoppingCart" size={16} />
                  <span>Заказы</span>
                </TabsTrigger>
                <TabsTrigger value="reception" className="flex items-center gap-2">
                  <Icon name="ClipboardCheck" size={16} />
                  <span>Приёмка</span>
                </TabsTrigger>
                <TabsTrigger value="warehouse" className="flex items-center gap-2">
                  <Icon name="Warehouse" size={16} />
                  <span>Склад</span>
                </TabsTrigger>
                <TabsTrigger value="writeoff" className="flex items-center gap-2">
                  <Icon name="Trash2" size={16} />
                  <span>Списания</span>
                </TabsTrigger>
                <TabsTrigger value="calendar" className="flex items-center gap-2">
                  <Icon name="Calendar" size={16} />
                  <span>Календарь</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Icon name="BookOpen" size={16} />
                  <span>Справочники</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="orders" className="animate-fade-in">
                <Orders />
              </TabsContent>
              
              <TabsContent value="reception" className="animate-fade-in">
                <Reception />
              </TabsContent>
              
              <TabsContent value="warehouse" className="animate-fade-in">
                <Warehouse />
              </TabsContent>
              
              <TabsContent value="writeoff" className="animate-fade-in">
                <WriteOff />
              </TabsContent>
              
              <TabsContent value="calendar" className="animate-fade-in">
                <CalendarView />
              </TabsContent>
              
              <TabsContent value="settings" className="animate-fade-in">
                <Settings />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;