import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import Icon from '@/components/ui/icon';

interface MobileMenuProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MobileMenu = ({ activeTab, onTabChange }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);
  const { user, hasPermission } = useAuth();

  const menuItems = [
    { id: 'orders', label: 'Заказы', icon: 'ShoppingCart', permission: 'createOrders' as const },
    { id: 'reception', label: 'Приёмка', icon: 'ClipboardCheck', permission: 'reception' as const },
    { id: 'warehouse', label: 'Склад', icon: 'Warehouse', permission: 'warehouse' as const },
    { id: 'writeoff', label: 'Списания', icon: 'Trash2', permission: 'writeoff' as const },
    { id: 'calendar', label: 'Календарь', icon: 'Calendar', permission: 'createOrders' as const },
    { id: 'settings', label: 'Справочники', icon: 'BookOpen', permission: 'settings' as const },
  ];

  const visibleItems = menuItems.filter(item => hasPermission(item.permission));

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Icon name="Menu" size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Package" size={20} className="text-primary-foreground" />
            </div>
            <div>
              <p className="text-base">OrderFlow</p>
              <p className="text-xs text-muted-foreground font-normal">Система управления заказами</p>
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-2">
          <div className="px-3 py-2 bg-accent/50 rounded-lg">
            <p className="text-sm font-semibold">{user?.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                {user?.role === 'admin' && 'Администратор'}
                {user?.role === 'manager' && 'Менеджер'}
                {user?.role === 'warehouse' && 'Кладовщик'}
                {user?.role === 'viewer' && 'Наблюдатель'}
              </Badge>
              <span className="text-xs text-muted-foreground">{user?.restaurant}</span>
            </div>
          </div>

          <div className="mt-6 space-y-1">
            {visibleItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent'
                }`}
              >
                <Icon name={item.icon as any} size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <Button variant="outline" className="w-full" onClick={() => {}}>
            <Icon name="LogOut" size={16} className="mr-2" />
            Выйти
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
