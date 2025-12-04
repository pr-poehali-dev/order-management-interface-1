import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import WarehouseStats from '@/components/warehouse/WarehouseStats';
import InventoryTab from '@/components/warehouse/InventoryTab';
import ExpiryTab from '@/components/warehouse/ExpiryTab';
import AuditTab from '@/components/warehouse/AuditTab';

const Warehouse = () => {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false);
  const [isInventoryDialogOpen, setIsInventoryDialogOpen] = useState(false);

  const inventoryData = [
    { 
      id: 1, 
      product: 'Мука пшеничная в/с', 
      category: 'Бакалея', 
      quantity: 145, 
      unit: 'кг', 
      location: 'Склад А-12', 
      restaurant: 'Ресторан №1',
      min: 50, 
      expiry: '2025-06-01', 
      daysToExpiry: 179,
      status: 'ok' 
    },
    { 
      id: 2, 
      product: 'Молоко 3.2%', 
      category: 'Молочная продукция', 
      quantity: 24, 
      unit: 'л', 
      location: 'Холод-1', 
      restaurant: 'Ресторан №1',
      min: 30, 
      expiry: '2024-12-10', 
      daysToExpiry: 6,
      status: 'expiring' 
    },
    { 
      id: 3, 
      product: 'Курица охлаждённая', 
      category: 'Мясо', 
      quantity: 8, 
      unit: 'кг', 
      location: 'Холод-2', 
      restaurant: 'Ресторан №2',
      min: 15, 
      expiry: '2024-12-08', 
      daysToExpiry: 4,
      status: 'critical' 
    },
    { 
      id: 4, 
      product: 'Сахар-песок', 
      category: 'Бакалея', 
      quantity: 178, 
      unit: 'кг', 
      location: 'Склад Б-05', 
      restaurant: 'РЦ Москва',
      min: 100, 
      expiry: '2025-12-01', 
      daysToExpiry: 362,
      status: 'ok' 
    },
    { 
      id: 5, 
      product: 'Масло подсолнечное', 
      category: 'Масла', 
      quantity: 42, 
      unit: 'л', 
      location: 'Склад А-08', 
      restaurant: 'Ресторан №1',
      min: 20, 
      expiry: '2025-08-15', 
      daysToExpiry: 254,
      status: 'ok' 
    },
    { 
      id: 6, 
      product: 'Сметана 20%', 
      category: 'Молочная продукция', 
      quantity: 12, 
      unit: 'кг', 
      location: 'Холод-1', 
      restaurant: 'Ресторан №3',
      min: 10, 
      expiry: '2024-12-09', 
      daysToExpiry: 5,
      status: 'expiring' 
    },
  ];

  const inventoryPlans = [
    { id: 'INV-2024-012', date: '15.12.2024', location: 'Склад А', restaurant: 'Ресторан №1', status: 'planned', items: 156 },
    { id: 'INV-2024-011', date: '10.12.2024', location: 'Холодильник', restaurant: 'Ресторан №2', status: 'in_progress', items: 89 },
    { id: 'INV-2024-010', date: '01.12.2024', location: 'РЦ Москва', restaurant: 'РЦ Москва', status: 'completed', items: 342, discrepancies: 5 },
  ];

  const getExpiryBadge = (status: string, days: number) => {
    if (status === 'critical') {
      return { variant: 'destructive' as const, label: `${days} дн.`, icon: 'AlertCircle' };
    } else if (status === 'expiring') {
      return { variant: 'outline' as const, label: `${days} дн.`, icon: 'AlertTriangle', className: 'border-yellow-500 text-yellow-600' };
    }
    return { variant: 'secondary' as const, label: `${days} дн.`, icon: 'CheckCircle' };
  };

  const getStockLevel = (quantity: number, min: number) => {
    const percentage = (quantity / min) * 100;
    if (percentage < 50) return { color: 'bg-red-600', label: 'Критический' };
    if (percentage < 100) return { color: 'bg-yellow-500', label: 'Низкий' };
    return { color: 'bg-green-600', label: 'Нормальный' };
  };

  const getInventoryStatusBadge = (status: string) => {
    const config = {
      planned: { label: 'Запланирована', variant: 'secondary' as const },
      in_progress: { label: 'В процессе', variant: 'default' as const },
      completed: { label: 'Завершена', variant: 'outline' as const },
    };
    return config[status as keyof typeof config];
  };

  const filteredInventory = inventoryData.filter(item => {
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesLocation = locationFilter === 'all' || item.restaurant === locationFilter;
    const matchesSearch = item.product.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesLocation && matchesSearch;
  });

  const stats = {
    totalItems: inventoryData.length,
    lowStock: inventoryData.filter(item => item.quantity < item.min).length,
    expiring: inventoryData.filter(item => item.status === 'expiring' || item.status === 'critical').length,
    locations: new Set(inventoryData.map(item => item.location)).size,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Управление складом и запасами</h2>
          <p className="text-muted-foreground mt-1">Отслеживание наличия, сроков годности и инвентаризация</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsTransferDialogOpen(true)}>
            <Icon name="ArrowRightLeft" size={16} className="mr-2" />
            Перемещение
          </Button>
          <Button onClick={() => setIsInventoryDialogOpen(true)}>
            <Icon name="ClipboardList" size={16} className="mr-2" />
            Инвентаризация
          </Button>
        </div>
      </div>

      <WarehouseStats stats={stats} />

      <Tabs defaultValue="inventory" className="w-full">
        <TabsList>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Icon name="Package" size={16} />
            Остатки
          </TabsTrigger>
          <TabsTrigger value="expiry" className="flex items-center gap-2">
            <Icon name="Calendar" size={16} />
            Сроки годности
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center gap-2">
            <Icon name="ClipboardList" size={16} />
            Инвентаризация
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-6 mt-6">
          <InventoryTab
            filteredInventory={filteredInventory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            getStockLevel={getStockLevel}
            getExpiryBadge={getExpiryBadge}
          />
        </TabsContent>

        <TabsContent value="expiry" className="space-y-6 mt-6">
          <ExpiryTab
            inventoryData={inventoryData}
            getExpiryBadge={getExpiryBadge}
          />
        </TabsContent>

        <TabsContent value="audit" className="space-y-6 mt-6">
          <AuditTab
            inventoryPlans={inventoryPlans}
            getInventoryStatusBadge={getInventoryStatusBadge}
          />
        </TabsContent>
      </Tabs>

      {/* Transfer Dialog */}
      <Dialog open={isTransferDialogOpen} onOpenChange={setIsTransferDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Перемещение товара</DialogTitle>
            <DialogDescription>
              Перемещение товара между складскими зонами
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Товар</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите товар" />
                </SelectTrigger>
                <SelectContent>
                  {inventoryData.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.product} ({item.quantity} {item.unit})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Откуда</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Исходная локация" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="w1">Склад А-12</SelectItem>
                    <SelectItem value="w2">Холод-1</SelectItem>
                    <SelectItem value="w3">Склад Б-05</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Куда</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Целевая локация" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="w1">Склад А-12</SelectItem>
                    <SelectItem value="w2">Холод-1</SelectItem>
                    <SelectItem value="w3">Склад Б-05</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Количество для перемещения</Label>
              <Input type="number" placeholder="0" />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsTransferDialogOpen(false)}>
                Отмена
              </Button>
              <Button onClick={() => setIsTransferDialogOpen(false)}>
                Переместить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Inventory Dialog */}
      <Dialog open={isInventoryDialogOpen} onOpenChange={setIsInventoryDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Запланировать инвентаризацию</DialogTitle>
            <DialogDescription>
              Создайте план инвентаризации для выбранной локации
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Дата инвентаризации</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Время начала</Label>
                <Input type="time" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Локация</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите локацию" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="r1">Ресторан №1</SelectItem>
                  <SelectItem value="r2">Ресторан №2</SelectItem>
                  <SelectItem value="r3">Ресторан №3</SelectItem>
                  <SelectItem value="rc">РЦ Москва</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Складская зона</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите зону" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="w1">Склад А</SelectItem>
                  <SelectItem value="w2">Холодильник</SelectItem>
                  <SelectItem value="w3">Сухой склад</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Ответственный</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите сотрудника" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="u1">Алексей Козлов</SelectItem>
                  <SelectItem value="u2">Мария Сидорова</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsInventoryDialogOpen(false)}>
                Отмена
              </Button>
              <Button onClick={() => setIsInventoryDialogOpen(false)}>
                Запланировать
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Warehouse;
