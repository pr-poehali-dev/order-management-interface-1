import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import IntegrationStatus from '@/components/IntegrationStatus';
import StatusIndicator from '@/components/StatusIndicator';
import Icon from '@/components/ui/icon';

const Dashboard = () => {
  const metrics = [
    { title: 'Активные заказы', value: '24', change: '+12%', icon: 'ShoppingCart', trend: 'up' },
    { title: 'Ожидают утверждения', value: '8', change: '+3', icon: 'Clock', trend: 'up' },
    { title: 'Доставка сегодня', value: '15', change: '100%', icon: 'Truck', trend: 'neutral' },
    { title: 'Просрочено', value: '2', change: '-50%', icon: 'AlertTriangle', trend: 'down' },
  ];

  const recentOrders = [
    { id: 'ORD-2024-1847', supplier: 'МетроКэш', items: 45, total: '128 450 ₽', status: 'pending', date: '04.12.2024' },
    { id: 'ORD-2024-1846', supplier: 'Фудсервис', items: 32, total: '89 200 ₽', status: 'approved', date: '04.12.2024' },
    { id: 'ORD-2024-1845', supplier: 'РЦ Москва', items: 78, total: '256 780 ₽', status: 'delivered', date: '03.12.2024' },
    { id: 'ORD-2024-1844', supplier: 'Лента Опт', items: 24, total: '54 320 ₽', status: 'in_transit', date: '03.12.2024' },
  ];

  const alerts = [
    { type: 'critical', message: 'Задержка поставки от МетроКэш на 2 дня', time: '10 минут назад' },
    { type: 'warning', message: 'Низкий остаток: Мука пшеничная (5 кг)', time: '1 час назад' },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Быстрые действия</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              <Button className="h-auto py-4 flex items-center justify-start gap-3">
                <Icon name="Plus" size={20} />
                <span>Новый заказ поставщику</span>
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
          <CardContent className="space-y-4">
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
          </CardContent>
        </Card>
      </div>

      {/* Integrations */}
      <IntegrationStatus />
    </div>
  );
};

export default Dashboard;