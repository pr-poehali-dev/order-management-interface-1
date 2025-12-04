import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import Icon from '@/components/ui/icon';

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

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Icon name="Package" size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalItems}</p>
                <p className="text-sm text-muted-foreground">Позиций на складе</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-500/10 rounded-lg">
                <Icon name="TrendingDown" size={24} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.lowStock}</p>
                <p className="text-sm text-muted-foreground">Низкий запас</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-500/10 rounded-lg">
                <Icon name="Clock" size={24} className="text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.expiring}</p>
                <p className="text-sm text-muted-foreground">Истекает срок</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Icon name="MapPin" size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.locations}</p>
                <p className="text-sm text-muted-foreground">Складских зон</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Поиск товаров..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Категория" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все категории</SelectItem>
                    <SelectItem value="Бакалея">Бакалея</SelectItem>
                    <SelectItem value="Молочная продукция">Молочная продукция</SelectItem>
                    <SelectItem value="Мясо">Мясо</SelectItem>
                    <SelectItem value="Масла">Масла</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Локация" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все локации</SelectItem>
                    <SelectItem value="Ресторан №1">Ресторан №1</SelectItem>
                    <SelectItem value="Ресторан №2">Ресторан №2</SelectItem>
                    <SelectItem value="Ресторан №3">Ресторан №3</SelectItem>
                    <SelectItem value="РЦ Москва">РЦ Москва</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Icon name="Download" size={16} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Наименование</TableHead>
                      <TableHead>Категория</TableHead>
                      <TableHead className="text-right">Остаток</TableHead>
                      <TableHead>Уровень запаса</TableHead>
                      <TableHead>Местоположение</TableHead>
                      <TableHead>Локация</TableHead>
                      <TableHead>Срок годности</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInventory.map((item) => {
                      const stockLevel = getStockLevel(item.quantity, item.min);
                      const stockPercentage = Math.min((item.quantity / item.min) * 100, 100);
                      const expiryBadge = getExpiryBadge(item.status, item.daysToExpiry);
                      
                      return (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.product}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{item.category}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="font-semibold">{item.quantity} {item.unit}</div>
                            <div className="text-xs text-muted-foreground">мин: {item.min}</div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <Progress value={stockPercentage} className="h-2" />
                              <p className="text-xs text-muted-foreground">{stockLevel.label}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Icon name="MapPin" size={14} className="text-muted-foreground" />
                              <span className="text-sm">{item.location}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">{item.restaurant}</TableCell>
                          <TableCell>
                            <Badge {...expiryBadge} className={expiryBadge.className}>
                              <Icon name={expiryBadge.icon as any} size={12} className="mr-1" />
                              {expiryBadge.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Icon name="MoreVertical" size={14} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expiry" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="AlertTriangle" size={18} />
                Товары с истекающим сроком годности
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventoryData
                  .filter(item => item.status === 'critical' || item.status === 'expiring')
                  .sort((a, b) => a.daysToExpiry - b.daysToExpiry)
                  .map((item) => {
                    const expiryBadge = getExpiryBadge(item.status, item.daysToExpiry);
                    
                    return (
                      <div key={item.id} className={`p-4 border-2 rounded-lg ${
                        item.status === 'critical' ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Icon 
                                name={item.status === 'critical' ? 'AlertCircle' : 'AlertTriangle'} 
                                size={20} 
                                className={item.status === 'critical' ? 'text-red-600' : 'text-yellow-600'} 
                              />
                              <h3 className="font-semibold">{item.product}</h3>
                              <Badge {...expiryBadge} className={expiryBadge.className}>
                                {expiryBadge.label}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-4 gap-4 text-sm ml-8">
                              <div>
                                <span className="text-muted-foreground">Остаток:</span>
                                <span className="font-semibold ml-2">{item.quantity} {item.unit}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Локация:</span>
                                <span className="font-semibold ml-2">{item.restaurant}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Место:</span>
                                <span className="font-semibold ml-2">{item.location}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Срок:</span>
                                <span className="font-semibold ml-2">{item.expiry}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Icon name="ShoppingCart" size={14} className="mr-1" />
                              Списать
                            </Button>
                            <Button variant="outline" size="sm">
                              <Icon name="ArrowRightLeft" size={14} className="mr-1" />
                              Переместить
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Планирование и проведение инвентаризации</CardTitle>
                <Button onClick={() => setIsInventoryDialogOpen(true)}>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Новая инвентаризация
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>№ инвентаризации</TableHead>
                      <TableHead>Дата</TableHead>
                      <TableHead>Зона склада</TableHead>
                      <TableHead>Локация</TableHead>
                      <TableHead className="text-right">Позиций</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead className="text-right">Расхождения</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventoryPlans.map((plan) => {
                      const statusBadge = getInventoryStatusBadge(plan.status);
                      
                      return (
                        <TableRow key={plan.id}>
                          <TableCell className="font-medium">{plan.id}</TableCell>
                          <TableCell>{plan.date}</TableCell>
                          <TableCell>{plan.location}</TableCell>
                          <TableCell className="text-muted-foreground">{plan.restaurant}</TableCell>
                          <TableCell className="text-right">{plan.items}</TableCell>
                          <TableCell>
                            <Badge {...statusBadge}>{statusBadge.label}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {plan.discrepancies ? (
                              <Badge variant="destructive">{plan.discrepancies}</Badge>
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              {plan.status === 'in_progress' && (
                                <Button variant="default" size="sm">
                                  <Icon name="Play" size={14} className="mr-1" />
                                  Продолжить
                                </Button>
                              )}
                              {plan.status === 'planned' && (
                                <Button variant="default" size="sm">
                                  <Icon name="Play" size={14} className="mr-1" />
                                  Начать
                                </Button>
                              )}
                              {plan.status === 'completed' && (
                                <>
                                  <Button variant="ghost" size="sm">
                                    <Icon name="Eye" size={14} />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Icon name="Download" size={14} />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Mobile Inventory Mode Banner */}
          <Card className="border-primary bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <Icon name="Smartphone" size={32} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Мобильный режим инвентаризации</h3>
                  <p className="text-sm text-muted-foreground">
                    Используйте мобильное устройство или сканер для проведения инвентаризации на складе
                  </p>
                </div>
                <Button>
                  <Icon name="Smartphone" size={16} className="mr-2" />
                  Открыть на телефоне
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Transfer Dialog */}
      <Dialog open={isTransferDialogOpen} onOpenChange={setIsTransferDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Оформление перемещения</DialogTitle>
            <DialogDescription>
              Внутреннее перемещение товаров между складскими зонами или локациями
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Откуда</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите зону" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a12">Склад А-12</SelectItem>
                    <SelectItem value="cold1">Холод-1</SelectItem>
                    <SelectItem value="cold2">Холод-2</SelectItem>
                    <SelectItem value="b05">Склад Б-05</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Куда</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите зону" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a12">Склад А-12</SelectItem>
                    <SelectItem value="cold1">Холод-1</SelectItem>
                    <SelectItem value="cold2">Холод-2</SelectItem>
                    <SelectItem value="b05">Склад Б-05</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Товар</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите товар" />
                </SelectTrigger>
                <SelectContent>
                  {inventoryData.map(item => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.product} ({item.quantity} {item.unit} на {item.location})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Количество</Label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label>Единица измерения</Label>
                <Input value="кг" disabled />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Причина перемещения</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите причину" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reorg">Реорганизация склада</SelectItem>
                  <SelectItem value="temp">Температурный режим</SelectItem>
                  <SelectItem value="transfer">Передача в другой отдел</SelectItem>
                  <SelectItem value="other">Другое</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsTransferDialogOpen(false)}>
                Отмена
              </Button>
              <Button onClick={() => setIsTransferDialogOpen(false)}>
                <Icon name="ArrowRightLeft" size={16} className="mr-2" />
                Оформить перемещение
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Inventory Dialog */}
      <Dialog open={isInventoryDialogOpen} onOpenChange={setIsInventoryDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Планирование инвентаризации</DialogTitle>
            <DialogDescription>
              Создайте новую инвентаризацию для проверки складских остатков
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Дата проведения</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Время начала</Label>
                <Input type="time" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Зона склада</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите зону" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Весь склад</SelectItem>
                  <SelectItem value="a">Склад А</SelectItem>
                  <SelectItem value="cold">Холодильное оборудование</SelectItem>
                  <SelectItem value="b">Склад Б</SelectItem>
                </SelectContent>
              </Select>
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
              <Label>Ответственный</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите сотрудника" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emp1">Иванов И.И.</SelectItem>
                  <SelectItem value="emp2">Петров П.П.</SelectItem>
                  <SelectItem value="emp3">Сидоров С.С.</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 bg-accent/30 rounded-lg">
              <p className="text-sm font-medium mb-2">Ожидаемое количество позиций:</p>
              <p className="text-3xl font-bold">156</p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsInventoryDialogOpen(false)}>
                Отмена
              </Button>
              <Button onClick={() => setIsInventoryDialogOpen(false)}>
                <Icon name="Save" size={16} className="mr-2" />
                Создать инвентаризацию
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Warehouse;
