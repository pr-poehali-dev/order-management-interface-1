import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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

const WriteOff = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);

  const writeOffRequests = [
    { 
      id: 'WO-2024-089', 
      date: '04.12.2024', 
      product: 'Листья салата', 
      quantity: 2, 
      unit: 'кг',
      reason: 'expiry', 
      restaurant: 'Ресторан №1',
      author: 'Иванов И.И.',
      status: 'pending',
      amount: '360 ₽'
    },
    { 
      id: 'WO-2024-088', 
      date: '04.12.2024', 
      product: 'Котлеты говяжьи', 
      quantity: 3, 
      unit: 'кг',
      reason: 'damage', 
      restaurant: 'Ресторан №2',
      author: 'Петров П.П.',
      status: 'pending',
      amount: '1 740 ₽'
    },
    { 
      id: 'WO-2024-087', 
      date: '03.12.2024', 
      product: 'Сыр чеддер', 
      quantity: 1, 
      unit: 'кг',
      reason: 'expiry', 
      restaurant: 'Ресторан №3',
      author: 'Сидоров С.С.',
      status: 'approved',
      amount: '750 ₽'
    },
    { 
      id: 'WO-2024-086', 
      date: '03.12.2024', 
      product: 'Булки для бургеров', 
      quantity: 3, 
      unit: 'уп',
      reason: 'damage', 
      restaurant: 'Ресторан №1',
      author: 'Иванов И.И.',
      status: 'rejected',
      amount: '960 ₽'
    },
    { 
      id: 'WO-2024-085', 
      date: '02.12.2024', 
      product: 'Соус барбекю', 
      quantity: 2, 
      unit: 'л',
      reason: 'expiry', 
      restaurant: 'Ресторан №2',
      author: 'Петров П.П.',
      status: 'approved',
      amount: '320 ₽'
    },
  ];

  const reasonsData = [
    { reason: 'expiry', label: 'Истёк срок годности', count: 45, amount: '18 450 ₽', percentage: 52 },
    { reason: 'damage', label: 'Порча товара', count: 28, amount: '12 680 ₽', percentage: 32 },
    { reason: 'defect', label: 'Брак производителя', count: 12, amount: '5 230 ₽', percentage: 14 },
    { reason: 'other', label: 'Прочее', count: 2, amount: '890 ₽', percentage: 2 },
  ];

  const topWriteOffProducts = [
    { product: 'Мясные изделия', count: 23, amount: '12 950 ₽' },
    { product: 'Хлебобулочные', count: 18, amount: '5 240 ₽' },
    { product: 'Овощи', count: 15, amount: '3 780 ₽' },
    { product: 'Молочные', count: 12, amount: '7 450 ₽' },
  ];

  const getStatusBadge = (status: string) => {
    const config = {
      pending: { label: 'Ожидает утверждения', variant: 'secondary' as const, icon: 'Clock' },
      approved: { label: 'Утверждено', variant: 'default' as const, icon: 'CheckCircle' },
      rejected: { label: 'Отклонено', variant: 'destructive' as const, icon: 'XCircle' },
    };
    return config[status as keyof typeof config] || config.pending;
  };

  const getReasonBadge = (reason: string) => {
    const config = {
      expiry: { label: 'Срок годности', color: 'bg-red-500/10 text-red-600 border-red-200' },
      damage: { label: 'Порча', color: 'bg-yellow-500/10 text-yellow-600 border-yellow-200' },
      defect: { label: 'Брак', color: 'bg-orange-500/10 text-orange-600 border-orange-200' },
      other: { label: 'Прочее', color: 'bg-gray-500/10 text-gray-600 border-gray-200' },
    };
    return config[reason as keyof typeof config] || config.other;
  };

  const filteredRequests = writeOffRequests.filter(request => {
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesSearch = request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.product.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    pending: writeOffRequests.filter(r => r.status === 'pending').length,
    approved: writeOffRequests.filter(r => r.status === 'approved').length,
    totalMonth: writeOffRequests.length,
    totalAmount: '37 450 ₽',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Списания продукции</h2>
          <p className="text-muted-foreground mt-1">Оформление и учёт списания товаров</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Icon name="Plus" size={16} className="mr-2" />
          Создать списание
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-500/10 rounded-lg">
                <Icon name="Clock" size={24} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.pending}</p>
                <p className="text-sm text-muted-foreground">Ожидают утверждения</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Icon name="CheckCircle" size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.approved}</p>
                <p className="text-sm text-muted-foreground">Утверждено в месяце</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Icon name="FileText" size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalMonth}</p>
                <p className="text-sm text-muted-foreground">Всего за месяц</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-500/10 rounded-lg">
                <Icon name="TrendingDown" size={24} className="text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalAmount}</p>
                <p className="text-sm text-muted-foreground">Сумма списаний</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="requests" className="w-full">
        <TabsList>
          <TabsTrigger value="requests" className="flex items-center gap-2">
            <Icon name="FileText" size={16} />
            Заявки на списание
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <Icon name="BarChart3" size={16} />
            Аналитика
          </TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Поиск по номеру или товару..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[220px]">
                    <SelectValue placeholder="Статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все статусы</SelectItem>
                    <SelectItem value="pending">Ожидает утверждения</SelectItem>
                    <SelectItem value="approved">Утверждено</SelectItem>
                    <SelectItem value="rejected">Отклонено</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Icon name="Filter" size={16} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>№ заявки</TableHead>
                      <TableHead>Дата</TableHead>
                      <TableHead>Товар</TableHead>
                      <TableHead className="text-right">Количество</TableHead>
                      <TableHead>Причина</TableHead>
                      <TableHead>Ресторан</TableHead>
                      <TableHead>Автор</TableHead>
                      <TableHead className="text-right">Сумма</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => {
                      const statusBadge = getStatusBadge(request.status);
                      const reasonBadge = getReasonBadge(request.reason);
                      
                      return (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.id}</TableCell>
                          <TableCell className="text-muted-foreground">{request.date}</TableCell>
                          <TableCell>{request.product}</TableCell>
                          <TableCell className="text-right">
                            {request.quantity} {request.unit}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={reasonBadge.color}>
                              {reasonBadge.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{request.restaurant}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">{request.author}</TableCell>
                          <TableCell className="text-right font-semibold">{request.amount}</TableCell>
                          <TableCell>
                            <Badge {...statusBadge} className="gap-1">
                              <Icon name={statusBadge.icon as any} size={12} />
                              {statusBadge.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              {request.status === 'pending' && (
                                <Button 
                                  variant="default" 
                                  size="sm"
                                  onClick={() => setIsApprovalDialogOpen(true)}
                                >
                                  <Icon name="Check" size={14} className="mr-1" />
                                  Утвердить
                                </Button>
                              )}
                              <Button variant="ghost" size="sm">
                                <Icon name="Eye" size={14} />
                              </Button>
                              {request.status === 'pending' && (
                                <Button variant="ghost" size="sm">
                                  <Icon name="Edit" size={14} />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Показано {filteredRequests.length} из {writeOffRequests.length} заявок
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    <Icon name="ChevronLeft" size={14} />
                  </Button>
                  <Button variant="outline" size="sm">1</Button>
                  <Button variant="outline" size="sm">
                    <Icon name="ChevronRight" size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Reasons Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="PieChart" size={18} />
                  Причины списаний
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reasonsData.map((item, index) => {
                    const reasonBadge = getReasonBadge(item.reason);
                    
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={reasonBadge.color}>
                              {reasonBadge.label}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{item.count} случаев</p>
                            <p className="text-sm text-muted-foreground">{item.amount}</p>
                          </div>
                        </div>
                        <div className="relative h-3 bg-accent rounded-full overflow-hidden">
                          <div 
                            className="absolute h-full bg-primary transition-all"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground text-right">{item.percentage}% от всех списаний</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="TrendingDown" size={18} />
                  Топ категорий по списаниям
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topWriteOffProducts.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center font-bold text-red-600">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold">{item.product}</p>
                          <p className="text-sm text-muted-foreground">{item.count} списаний</p>
                        </div>
                      </div>
                      <p className="font-semibold text-red-600">{item.amount}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trend Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="LineChart" size={18} />
                Динамика списаний
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-accent/30 rounded-lg border-2 border-dashed">
                <div className="text-center">
                  <Icon name="LineChart" size={48} className="mx-auto text-muted-foreground mb-3" />
                  <p className="text-sm font-medium">График динамики списаний</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Помесячный анализ объёмов и причин списаний
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Export Section */}
          <Card>
            <CardHeader>
              <CardTitle>Отчёты по списаниям</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
                  <Icon name="FileText" size={24} />
                  <span>Отчёт по причинам</span>
                </Button>
                <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
                  <Icon name="Package" size={24} />
                  <span>Отчёт по товарам</span>
                </Button>
                <Button variant="outline" className="h-auto py-6 flex flex-col gap-2">
                  <Icon name="Building" size={24} />
                  <span>Отчёт по ресторанам</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Write-Off Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Создание заявки на списание</DialogTitle>
            <DialogDescription>
              Оформите списание товара с указанием причины
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Ресторан</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите ресторан" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="r1">Ресторан №1</SelectItem>
                    <SelectItem value="r2">Ресторан №2</SelectItem>
                    <SelectItem value="r3">Ресторан №3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Дата списания</Label>
                <Input type="date" defaultValue="2024-12-04" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Товар</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Начните вводить название..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="milk">Молоко 3.2% (24 л в наличии)</SelectItem>
                  <SelectItem value="chicken">Курица охлаждённая (8 кг в наличии)</SelectItem>
                  <SelectItem value="smetana">Сметана 20% (12 кг в наличии)</SelectItem>
                  <SelectItem value="bread">Хлеб белый (45 шт в наличии)</SelectItem>
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
                <Input value="л" disabled />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Причина списания</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите причину" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expiry">Истёк срок годности</SelectItem>
                  <SelectItem value="damage">Порча товара</SelectItem>
                  <SelectItem value="defect">Брак производителя</SelectItem>
                  <SelectItem value="other">Другая причина</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Комментарий</Label>
              <Textarea
                placeholder="Опишите детали списания..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Фотофиксация (необязательно)</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-accent/50 transition-colors cursor-pointer">
                <Icon name="Camera" size={32} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Загрузить фото</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Приложите фото товара для подтверждения
                </p>
              </div>
            </div>

            <div className="p-4 bg-accent/30 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Стоимость списания:</span>
                <span className="font-semibold text-lg">840 ₽</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Автоматически рассчитано на основе текущей цены товара
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Отмена
              </Button>
              <Button onClick={() => setIsCreateDialogOpen(false)}>
                <Icon name="FileText" size={16} className="mr-2" />
                Создать заявку
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Approval Dialog */}
      <Dialog open={isApprovalDialogOpen} onOpenChange={setIsApprovalDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Утверждение списания</DialogTitle>
            <DialogDescription>
              Подтвердите или отклоните заявку на списание WO-2024-089
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-accent/30 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Товар:</span>
                <span className="font-semibold">Молоко 3.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Количество:</span>
                <span className="font-semibold">12 л</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Причина:</span>
                <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-200">
                  Срок годности
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Сумма:</span>
                <span className="font-semibold text-lg">840 ₽</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Автор:</span>
                <span className="font-semibold">Иванов И.И.</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Комментарий (необязательно)</Label>
              <Textarea
                placeholder="Добавьте комментарий к решению..."
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button 
                variant="destructive" 
                onClick={() => setIsApprovalDialogOpen(false)}
              >
                <Icon name="XCircle" size={16} className="mr-2" />
                Отклонить
              </Button>
              <Button onClick={() => setIsApprovalDialogOpen(false)}>
                <Icon name="CheckCircle" size={16} className="mr-2" />
                Утвердить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WriteOff;