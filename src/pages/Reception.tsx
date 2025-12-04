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

const Reception = () => {
  const [selectedOrder, setSelectedOrder] = useState('');
  const [scanMode, setScanMode] = useState(false);
  const [isDiscrepancyDialogOpen, setIsDiscrepancyDialogOpen] = useState(false);

  const pendingOrders = [
    { id: 'ORD-2024-1847', supplier: 'МетроКэш', date: '04.12.2024', items: 45, status: 'in_transit' },
    { id: 'ORD-2024-1846', supplier: 'Фудсервис', date: '04.12.2024', items: 32, status: 'in_transit' },
    { id: 'ORD-2024-1844', supplier: 'Лента Опт', date: '03.12.2024', items: 24, status: 'in_transit' },
  ];

  const comparisonData = [
    { product: 'Мука пшеничная в/с', unit: 'кг', ordered: 50, received: 48, expiry: '01.06.2025', status: 'shortage' },
    { product: 'Масло подсолнечное', unit: 'л', ordered: 30, received: 30, expiry: '15.08.2025', status: 'ok' },
    { product: 'Сахар-песок', unit: 'кг', ordered: 40, received: 42, expiry: '01.12.2025', status: 'surplus' },
    { product: 'Курица охлаждённая', unit: 'кг', ordered: 25, received: 25, expiry: '08.12.2024', status: 'defect' },
    { product: 'Молоко 3.2%', unit: 'л', ordered: 60, received: 60, expiry: '10.12.2024', status: 'ok' },
  ];

  const receptionHistory = [
    { id: 'RCP-2024-234', order: 'ORD-2024-1845', date: '03.12.2024', supplier: 'РЦ Москва', items: 78, discrepancies: 2, status: 'completed' },
    { id: 'RCP-2024-233', order: 'ORD-2024-1843', date: '02.12.2024', supplier: 'МетроКэш', items: 67, discrepancies: 0, status: 'completed' },
    { id: 'RCP-2024-232', order: 'ORD-2024-1841', date: '01.12.2024', supplier: 'Фудсервис', items: 45, discrepancies: 1, status: 'completed' },
  ];

  const getStatusBadge = (status: string) => {
    const config = {
      ok: { label: 'Соответствует', variant: 'default' as const, color: 'text-green-600' },
      shortage: { label: 'Недостача', variant: 'destructive' as const, color: 'text-red-600' },
      surplus: { label: 'Излишек', variant: 'secondary' as const, color: 'text-blue-600' },
      defect: { label: 'Брак/Срок', variant: 'outline' as const, color: 'text-yellow-600' },
    };
    return config[status as keyof typeof config] || config.ok;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Приёмка продукции</h2>
          <p className="text-muted-foreground mt-1">Регистрация поступлений и сверка с заказами</p>
        </div>
      </div>

      <Tabs defaultValue="reception" className="w-full">
        <TabsList>
          <TabsTrigger value="reception" className="flex items-center gap-2">
            <Icon name="ClipboardCheck" size={16} />
            Приёмка
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Icon name="History" size={16} />
            История
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reception" className="space-y-6 mt-6">
          {/* Order Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Package" size={18} />
                Выбор заказа для приёмки
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Заказ на приёмку</Label>
                    <Select value={selectedOrder} onValueChange={setSelectedOrder}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите заказ" />
                      </SelectTrigger>
                      <SelectContent>
                        {pendingOrders.map((order) => (
                          <SelectItem key={order.id} value={order.id}>
                            {order.id} — {order.supplier} ({order.items} поз.)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedOrder && (
                    <div className="p-4 bg-accent/30 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Поставщик:</span>
                        <span className="font-semibold">МетроКэш</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Дата заказа:</span>
                        <span className="font-semibold">04.12.2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Позиций:</span>
                        <span className="font-semibold">45</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Сканирование штрих-кодов</Label>
                    <Button
                      variant={scanMode ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setScanMode(!scanMode)}
                    >
                      <Icon name={scanMode ? 'ScanLine' : 'Scan'} size={16} className="mr-2" />
                      {scanMode ? 'Активно' : 'Включить'}
                    </Button>
                  </div>
                  
                  {scanMode && (
                    <div className="p-6 border-2 border-dashed rounded-lg border-primary bg-primary/5">
                      <div className="text-center space-y-3">
                        <Icon name="ScanLine" size={48} className="mx-auto text-primary animate-pulse" />
                        <p className="font-semibold">Режим сканирования активен</p>
                        <p className="text-sm text-muted-foreground">
                          Сканируйте штрих-коды товаров для автоматического заполнения
                        </p>
                        <Input
                          placeholder="Штрих-код появится здесь..."
                          className="text-center font-mono"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Номер накладной</Label>
                    <Input placeholder="Введите номер накладной" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Table */}
          {selectedOrder && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="GitCompare" size={18} />
                    Сверка: Заказ vs Факт
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Icon name="Camera" size={14} className="mr-2" />
                      Фото
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="FileText" size={14} className="mr-2" />
                      Накладная
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Наименование</TableHead>
                        <TableHead>Ед. изм.</TableHead>
                        <TableHead className="text-right">Заказано</TableHead>
                        <TableHead className="text-right">Получено</TableHead>
                        <TableHead className="text-right">Разница</TableHead>
                        <TableHead>Срок годности</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead className="text-right">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {comparisonData.map((item, index) => {
                        const difference = item.received - item.ordered;
                        const status = getStatusBadge(item.status);
                        
                        return (
                          <TableRow key={index} className={item.status !== 'ok' ? 'bg-destructive/5' : ''}>
                            <TableCell className="font-medium">{item.product}</TableCell>
                            <TableCell>{item.unit}</TableCell>
                            <TableCell className="text-right">{item.ordered}</TableCell>
                            <TableCell className="text-right">
                              <Input
                                type="number"
                                defaultValue={item.received}
                                className="w-20 text-right"
                              />
                            </TableCell>
                            <TableCell className={`text-right font-semibold ${
                              difference > 0 ? 'text-blue-600' : 
                              difference < 0 ? 'text-red-600' : 
                              'text-green-600'
                            }`}>
                              {difference > 0 ? '+' : ''}{difference}
                            </TableCell>
                            <TableCell>
                              <Input type="date" defaultValue={item.expiry} className="w-36" />
                            </TableCell>
                            <TableCell>
                              <Badge {...status}>
                                {status.label}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              {item.status !== 'ok' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setIsDiscrepancyDialogOpen(true)}
                                >
                                  <Icon name="AlertCircle" size={14} className="mr-1" />
                                  Акт
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center justify-between mt-6 p-4 bg-accent/30 rounded-lg">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Статус сверки:</p>
                    <div className="flex gap-4">
                      <span className="text-sm">✅ Совпало: <strong>2</strong></span>
                      <span className="text-sm">⚠️ Расхождений: <strong>3</strong></span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline">
                      Сохранить черновик
                    </Button>
                    <Button>
                      <Icon name="CheckCircle" size={16} className="mr-2" />
                      Завершить приёмку
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>История приёмки</CardTitle>
                <div className="flex gap-3">
                  <Input placeholder="Поиск по номеру..." className="w-64" />
                  <Button variant="outline">
                    <Icon name="Filter" size={16} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>№ приёмки</TableHead>
                      <TableHead>№ заказа</TableHead>
                      <TableHead>Дата</TableHead>
                      <TableHead>Поставщик</TableHead>
                      <TableHead className="text-right">Позиций</TableHead>
                      <TableHead className="text-right">Расхождений</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {receptionHistory.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.id}</TableCell>
                        <TableCell>{record.order}</TableCell>
                        <TableCell className="text-muted-foreground">{record.date}</TableCell>
                        <TableCell>{record.supplier}</TableCell>
                        <TableCell className="text-right">{record.items}</TableCell>
                        <TableCell className="text-right">
                          {record.discrepancies > 0 ? (
                            <Badge variant="destructive">{record.discrepancies}</Badge>
                          ) : (
                            <span className="text-green-600">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">Завершено</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm">
                              <Icon name="Eye" size={14} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Icon name="Download" size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Discrepancy Dialog */}
      <Dialog open={isDiscrepancyDialogOpen} onOpenChange={setIsDiscrepancyDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Оформление акта расхождения</DialogTitle>
            <DialogDescription>
              Зафиксируйте недостачу, излишек, брак или несоответствие срока годности
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Тип расхождения</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shortage">Недостача</SelectItem>
                    <SelectItem value="surplus">Излишек</SelectItem>
                    <SelectItem value="defect">Брак</SelectItem>
                    <SelectItem value="expiry">Срок годности</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Товар</Label>
                <Input value="Мука пшеничная в/с" disabled />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Заказано</Label>
                <Input type="number" value="50" disabled />
              </div>
              <div className="space-y-2">
                <Label>Фактически</Label>
                <Input type="number" value="48" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Описание проблемы</Label>
              <Textarea
                placeholder="Опишите выявленное расхождение..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Фотофиксация</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-accent/50 transition-colors cursor-pointer">
                <Icon name="Camera" size={32} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Загрузить фото</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Или перетащите файлы сюда
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsDiscrepancyDialogOpen(false)}>
                Отмена
              </Button>
              <Button onClick={() => setIsDiscrepancyDialogOpen(false)}>
                <Icon name="Save" size={16} className="mr-2" />
                Создать акт
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reception;
