import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const orders = [
    { id: 'ORD-2024-1847', date: '04.12.2024', supplier: 'МетроКэш', restaurant: 'Ресторан №1', items: 45, total: '128 450 ₽', status: 'pending', delivery: '06.12.2024' },
    { id: 'ORD-2024-1846', date: '04.12.2024', supplier: 'Фудсервис', restaurant: 'Ресторан №1', items: 32, total: '89 200 ₽', status: 'approved', delivery: '05.12.2024' },
    { id: 'ORD-2024-1845', date: '03.12.2024', supplier: 'РЦ Москва', restaurant: 'Ресторан №2', items: 78, total: '256 780 ₽', status: 'delivered', delivery: '04.12.2024' },
    { id: 'ORD-2024-1844', date: '03.12.2024', supplier: 'Лента Опт', restaurant: 'Ресторан №1', items: 24, total: '54 320 ₽', status: 'in_transit', delivery: '05.12.2024' },
    { id: 'ORD-2024-1843', date: '02.12.2024', supplier: 'МетроКэш', restaurant: 'Ресторан №3', items: 67, total: '189 500 ₽', status: 'delivered', delivery: '03.12.2024' },
    { id: 'ORD-2024-1842', date: '02.12.2024', supplier: 'РЦ Москва', restaurant: 'Ресторан №2', items: 93, total: '312 890 ₽', status: 'cancelled', delivery: '-' },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Ожидает', variant: 'secondary' as const, icon: 'Clock' },
      approved: { label: 'Утверждён', variant: 'default' as const, icon: 'CheckCircle' },
      in_transit: { label: 'В пути', variant: 'outline' as const, icon: 'Truck' },
      delivered: { label: 'Доставлен', variant: 'default' as const, icon: 'Package' },
      cancelled: { label: 'Отменён', variant: 'destructive' as const, icon: 'XCircle' },
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Управление заказами</h2>
          <p className="text-muted-foreground mt-1">Отслеживайте и управляйте всеми заказами</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <Icon name="Plus" size={18} />
              Создать заказ
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Новый заказ</DialogTitle>
              <DialogDescription>
                Создайте новый заказ поставщику или внутреннее перемещение
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Тип заказа</Label>
                  <Select defaultValue="supplier">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="supplier">Заказ поставщику</SelectItem>
                      <SelectItem value="internal">Внутреннее перемещение</SelectItem>
                      <SelectItem value="rc">Заказ с РЦ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
              </div>
              <div className="space-y-2">
                <Label>Поставщик</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите поставщика" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metro">МетроКэш</SelectItem>
                    <SelectItem value="food">Фудсервис</SelectItem>
                    <SelectItem value="lenta">Лента Опт</SelectItem>
                    <SelectItem value="rc">РЦ Москва</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Дата поставки</Label>
                <Input type="date" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Позиции заказа</Label>
                  <Button variant="outline" size="sm">
                    <Icon name="Plus" size={14} className="mr-1" />
                    Добавить позицию
                  </Button>
                </div>
                <div className="border rounded-lg p-4 space-y-2">
                  <Input placeholder="Поиск по номенклатуре..." />
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Добавьте товары для заказа
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Отмена
                </Button>
                <Button>Создать заказ</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск по номеру заказа или поставщику..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Все статусы" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="pending">Ожидает</SelectItem>
                <SelectItem value="approved">Утверждён</SelectItem>
                <SelectItem value="in_transit">В пути</SelectItem>
                <SelectItem value="delivered">Доставлен</SelectItem>
                <SelectItem value="cancelled">Отменён</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Icon name="Filter" size={18} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Номер заказа</TableHead>
                  <TableHead>Дата</TableHead>
                  <TableHead>Поставщик</TableHead>
                  <TableHead>Ресторан</TableHead>
                  <TableHead className="text-right">Позиций</TableHead>
                  <TableHead className="text-right">Сумма</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Доставка</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => {
                  const status = getStatusBadge(order.status);
                  return (
                    <TableRow key={order.id} className="hover:bg-accent/50">
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell className="text-muted-foreground">{order.date}</TableCell>
                      <TableCell>{order.supplier}</TableCell>
                      <TableCell className="text-muted-foreground">{order.restaurant}</TableCell>
                      <TableCell className="text-right">{order.items}</TableCell>
                      <TableCell className="text-right font-semibold">{order.total}</TableCell>
                      <TableCell>
                        <Badge {...status} className="gap-1">
                          <Icon name={status.icon as any} size={12} />
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{order.delivery}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="sm">
                            <Icon name="Eye" size={14} />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Icon name="Edit" size={14} />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Icon name="MoreVertical" size={14} />
                          </Button>
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
              Показано {filteredOrders.length} из {orders.length} заказов
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                <Icon name="ChevronLeft" size={14} />
              </Button>
              <Button variant="outline" size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">
                <Icon name="ChevronRight" size={14} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
