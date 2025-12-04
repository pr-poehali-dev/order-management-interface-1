import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const Analytics = () => {
  const topSuppliers = [
    { name: 'МетроКэш', orders: 45, amount: '1 234 500 ₽', trend: '+12%' },
    { name: 'РЦ Москва', orders: 38, amount: '987 650 ₽', trend: '+8%' },
    { name: 'Фудсервис', orders: 32, amount: '756 200 ₽', trend: '+5%' },
    { name: 'Лента Опт', orders: 28, amount: '623 400 ₽', trend: '-3%' },
  ];

  const topProducts = [
    { name: 'Мука пшеничная в/с', quantity: '450 кг', amount: '45 600 ₽', orders: 12 },
    { name: 'Масло подсолнечное', quantity: '280 л', amount: '38 200 ₽', orders: 15 },
    { name: 'Сахар-песок', quantity: '320 кг', amount: '35 800 ₽', orders: 10 },
    { name: 'Курица охлаждённая', quantity: '180 кг', amount: '54 900 ₽', orders: 8 },
  ];

  const inventoryAlerts = [
    { product: 'Мука пшеничная', current: '5 кг', min: '50 кг', status: 'critical' },
    { product: 'Сахар-песок', current: '28 кг', min: '30 кг', status: 'warning' },
    { product: 'Масло растительное', current: '15 л', min: '20 л', status: 'warning' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Аналитика продаж и остатков</h2>
          <p className="text-muted-foreground mt-1">Анализ закупок и контроль запасов</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="month">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Последняя неделя</SelectItem>
              <SelectItem value="month">Последний месяц</SelectItem>
              <SelectItem value="quarter">Последний квартал</SelectItem>
              <SelectItem value="year">Последний год</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Icon name="Download" size={16} className="mr-2" />
            Экспорт
          </Button>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Динамика заказов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-accent/30 rounded-lg border-2 border-dashed">
              <div className="text-center">
                <Icon name="TrendingUp" size={48} className="mx-auto text-muted-foreground mb-3" />
                <p className="text-sm font-medium">График динамики заказов</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Сравнение текущего и предыдущего периода
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Структура расходов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-accent/30 rounded-lg border-2 border-dashed">
              <div className="text-center">
                <Icon name="PieChart" size={48} className="mx-auto text-muted-foreground mb-3" />
                <p className="text-sm font-medium">Распределение по категориям</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Топ категории товаров по объёму закупок
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Suppliers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Store" size={18} />
              Топ поставщиков
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSuppliers.map((supplier, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold">{supplier.name}</p>
                      <p className="text-sm text-muted-foreground">{supplier.orders} заказов</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{supplier.amount}</p>
                    <p className={`text-sm ${supplier.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {supplier.trend}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Package" size={18} />
              Топ товаров
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold mb-1">{product.name}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{product.quantity}</span>
                      <span>•</span>
                      <span>{product.orders} заказов</span>
                    </div>
                  </div>
                  <p className="font-semibold">{product.amount}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="AlertTriangle" size={18} />
            Критические остатки
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {inventoryAlerts.map((alert, index) => (
              <div key={index} className={`p-4 border-2 rounded-lg ${
                alert.status === 'critical' ? 'border-destructive bg-destructive/5' : 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20'
              }`}>
                <div className="flex items-start gap-3">
                  <Icon 
                    name={alert.status === 'critical' ? 'AlertCircle' : 'AlertTriangle'} 
                    size={20} 
                    className={alert.status === 'critical' ? 'text-destructive' : 'text-yellow-600'} 
                  />
                  <div className="flex-1">
                    <p className="font-semibold mb-1">{alert.product}</p>
                    <div className="text-sm space-y-1">
                      <p className="text-muted-foreground">
                        Текущий остаток: <span className="font-semibold">{alert.current}</span>
                      </p>
                      <p className="text-muted-foreground">
                        Минимум: <span className="font-semibold">{alert.min}</span>
                      </p>
                    </div>
                    <Button size="sm" variant="outline" className="mt-3 w-full">
                      Создать заказ
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
