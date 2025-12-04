import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import IntegrationStatus from '@/components/IntegrationStatus';
import StatusIndicator from '@/components/StatusIndicator';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const Dashboard = () => {
  const [isCreateOrderDialogOpen, setIsCreateOrderDialogOpen] = useState(false);
  const [orderItems, setOrderItems] = useState<Array<{id: number, product: string, quantity: number, unit: string}>>([]);

  const availableProducts = [
    { id: 1, name: 'Булки для бургеров', unit: 'уп', price: 320 },
    { id: 2, name: 'Котлеты говяжьи', unit: 'кг', price: 580 },
    { id: 3, name: 'Сыр чеддер', unit: 'кг', price: 750 },
    { id: 4, name: 'Листья салата', unit: 'кг', price: 180 },
    { id: 5, name: 'Картофель фри', unit: 'кг', price: 145 },
    { id: 6, name: 'Соус барбекю', unit: 'л', price: 250 },
    { id: 7, name: 'Кетчуп', unit: 'л', price: 180 },
    { id: 8, name: 'Горчица', unit: 'л', price: 150 },
    { id: 9, name: 'Лук', unit: 'кг', price: 90 },
    { id: 10, name: 'Огурчики маринованные', unit: 'кг', price: 220 },
  ];

  const addOrderItem = () => {
    setOrderItems([...orderItems, { id: Date.now(), product: '', quantity: 0, unit: 'кг' }]);
  };

  const removeOrderItem = (id: number) => {
    setOrderItems(orderItems.filter(item => item.id !== id));
  };
  const metrics = [
    { title: 'Активные заказы', value: '24', change: '+12%', icon: 'ShoppingCart', trend: 'up' },
    { title: 'Ожидают утверждения', value: '8', change: '+3', icon: 'Clock', trend: 'up' },
    { title: 'Доставка сегодня', value: '15', change: '100%', icon: 'Truck', trend: 'neutral' },
    { title: 'Просрочено', value: '2', change: '-50%', icon: 'AlertTriangle', trend: 'down' },
  ];

  const recentOrders = [
    { id: 'ORD-2024-1847', supplier: 'ПепсиКо', items: 45, total: '128 450 ₽', status: 'pending', date: '04.12.2024' },
    { id: 'ORD-2024-1846', supplier: 'Балтика', items: 32, total: '89 200 ₽', status: 'approved', date: '04.12.2024' },
    { id: 'ORD-2024-1845', supplier: 'ИВЛ', items: 78, total: '256 780 ₽', status: 'delivered', date: '03.12.2024' },
    { id: 'ORD-2024-1844', supplier: 'Белая дача', items: 24, total: '54 320 ₽', status: 'in_transit', date: '03.12.2024' },
  ];

  const alerts = [
    { type: 'critical', message: 'Задержка поставки от ПепсиКо на 2 дня', time: '10 минут назад' },
    { type: 'warning', message: 'Низкий остаток: Булки для бургеров (5 уп)', time: '1 час назад' },
    { type: 'info', message: 'Заказ ORD-2024-1843 доставлен', time: '2 часа назад' },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Ожидает', variant: 'secondary' as const },
      approved: { label: 'Утверждён', variant: 'default' as const },
      in_transit: { label: 'В пути', variant: 'outline' as const },
      delivered: { label: 'Доставлен', variant: 'default' as const },
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Быстрые действия</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button 
              className="h-auto py-4 flex items-center justify-start gap-3"
              onClick={() => setIsCreateOrderDialogOpen(true)}
            >
              <Icon name="Plus" size={20} />
              <span>Создать заказ</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex items-center justify-start gap-3">
              <Icon name="ArrowRightLeft" size={20} />
              <span>Внутреннее перемещение</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex items-center justify-start gap-3">
              <Icon name="FileText" size={20} />
              <span>Сформировать отчёт</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Status Indicators Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Ключевые показатели</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">Остатки на складе</span>
              <StatusIndicator type="stock" value={15} threshold={{ warning: 30, critical: 10 }} unit=" поз." />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">Срок годности товаров</span>
              <StatusIndicator type="expiry" value={3} unit=" дн." />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">Ближайшая доставка</span>
              <StatusIndicator type="delivery" value={0} />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">Качество поставок</span>
              <StatusIndicator type="quality" value={92} unit="%" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${
                metric.trend === 'up' ? 'bg-primary/10' : 
                metric.trend === 'down' ? 'bg-destructive/10' : 
                'bg-muted'
              }`}>
                <Icon name={metric.icon as any} size={18} className={
                  metric.trend === 'up' ? 'text-primary' : 
                  metric.trend === 'down' ? 'text-destructive' : 
                  'text-muted-foreground'
                } />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {metric.change} от предыдущей недели
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Последние заказы</CardTitle>
              <Button variant="ghost" size="sm">
                <Icon name="ArrowRight" size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-semibold text-sm">{order.id}</span>
                      <Badge {...getStatusBadge(order.status)}>
                        {getStatusBadge(order.status).label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{order.supplier}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {order.items} позиций • {order.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{order.total}</p>
                    <Button variant="ghost" size="sm" className="mt-1">
                      <Icon name="Eye" size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Bell" size={18} />
              Уведомления
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className="flex gap-3 p-3 border rounded-lg">
                  <div className={`mt-1 ${
                    alert.type === 'critical' ? 'text-destructive' :
                    alert.type === 'warning' ? 'text-yellow-600' :
                    'text-primary'
                  }`}>
                    <Icon name={
                      alert.type === 'critical' ? 'AlertCircle' :
                      alert.type === 'warning' ? 'AlertTriangle' :
                      'Info'
                    } size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Показать все
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Create Order Dialog */}
      <Dialog open={isCreateOrderDialogOpen} onOpenChange={setIsCreateOrderDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Создать новый заказ</DialogTitle>
            <DialogDescription>
              Заполните данные для создания заказа поставщику
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Дата поставки</Label>
                <Input type="date" defaultValue="2024-12-06" />
              </div>
              <div className="space-y-2">
                <Label>Поставщик</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите поставщика" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pepsi">ПепсиКо</SelectItem>
                    <SelectItem value="baltika">Балтика</SelectItem>
                    <SelectItem value="ivl">ИВЛ</SelectItem>
                    <SelectItem value="belaya">Белая дача</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Ингредиенты для заказа</Label>
                <Button variant="outline" size="sm" onClick={addOrderItem}>
                  <Icon name="Plus" size={14} className="mr-2" />
                  Добавить товар
                </Button>
              </div>

              {orderItems.length > 0 && (
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Товар</TableHead>
                        <TableHead className="text-right">Количество</TableHead>
                        <TableHead>Ед. изм.</TableHead>
                        <TableHead className="text-right">Цена</TableHead>
                        <TableHead className="text-right">Сумма</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderItems.map((item) => {
                        const product = availableProducts.find(p => p.name === item.product);
                        const total = product ? product.price * item.quantity : 0;
                        
                        return (
                          <TableRow key={item.id}>
                            <TableCell>
                              <Select 
                                value={item.product}
                                onValueChange={(value) => {
                                  const prod = availableProducts.find(p => p.name === value);
                                  setOrderItems(orderItems.map(i => 
                                    i.id === item.id 
                                      ? {...i, product: value, unit: prod?.unit || 'кг'} 
                                      : i
                                  ));
                                }}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Выберите товар" />
                                </SelectTrigger>
                                <SelectContent>
                                  {availableProducts.map(p => (
                                    <SelectItem key={p.id} value={p.name}>
                                      {p.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell className="text-right">
                              <Input 
                                type="number" 
                                value={item.quantity || ''} 
                                onChange={(e) => {
                                  setOrderItems(orderItems.map(i => 
                                    i.id === item.id 
                                      ? {...i, quantity: Number(e.target.value)} 
                                      : i
                                  ));
                                }}
                                className="w-20 text-right"
                                min="0"
                              />
                            </TableCell>
                            <TableCell className="text-muted-foreground">{item.unit}</TableCell>
                            <TableCell className="text-right text-muted-foreground">
                              {product?.price} ₽
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                              {total.toLocaleString()} ₽
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeOrderItem(item.id)}
                              >
                                <Icon name="X" size={14} />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                  <div className="p-4 border-t bg-accent/20">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Итого:</span>
                      <span className="text-xl font-bold">
                        {orderItems.reduce((sum, item) => {
                          const product = availableProducts.find(p => p.name === item.product);
                          return sum + (product ? product.price * item.quantity : 0);
                        }, 0).toLocaleString()} ₽
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {orderItems.length === 0 && (
                <div className="p-8 border-2 border-dashed rounded-lg text-center">
                  <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Нажмите "Добавить товар" чтобы начать формирование заказа
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsCreateOrderDialogOpen(false);
                  setOrderItems([]);
                }}
              >
                Отмена
              </Button>
              <Button 
                onClick={() => {
                  setIsCreateOrderDialogOpen(false);
                  setOrderItems([]);
                }}
                disabled={orderItems.length === 0}
              >
                Создать заказ
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;