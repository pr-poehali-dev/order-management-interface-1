import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
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

const Settings = () => {
  const [activeSubTab, setActiveSubTab] = useState('products');
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isSupplierDialogOpen, setIsSupplierDialogOpen] = useState(false);
  const [isWarehouseDialogOpen, setIsWarehouseDialogOpen] = useState(false);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);

  const products = [
    { id: 'P-001', name: 'Мука пшеничная в/с', category: 'Мука и крупы', unit: 'кг', minStock: 50, price: '912 ₽', status: 'active' },
    { id: 'P-002', name: 'Масло подсолнечное', category: 'Масла', unit: 'л', minStock: 20, price: '1 273 ₽', status: 'active' },
    { id: 'P-003', name: 'Сахар-песок', category: 'Сахар', unit: 'кг', minStock: 30, price: '895 ₽', status: 'active' },
    { id: 'P-004', name: 'Курица охлаждённая', category: 'Мясо', unit: 'кг', minStock: 15, price: '3 050 ₽', status: 'active' },
    { id: 'P-005', name: 'Молоко 3.2%', category: 'Молочные', unit: 'л', minStock: 25, price: '85 ₽', status: 'inactive' },
  ];

  const suppliers = [
    { id: 'S-001', name: 'МетроКэш', contact: 'Иванов Сергей', phone: '+7 (495) 123-45-67', email: 'info@metrocash.ru', terms: 'Отсрочка 14 дней', status: 'active' },
    { id: 'S-002', name: 'Фудсервис', contact: 'Петрова Мария', phone: '+7 (495) 234-56-78', email: 'orders@foodservice.ru', terms: 'Предоплата 50%', status: 'active' },
    { id: 'S-003', name: 'РЦ Москва', contact: 'Сидоров Андрей', phone: '+7 (495) 345-67-89', email: 'rc@moscow.ru', terms: 'По договору', status: 'active' },
    { id: 'S-004', name: 'Лента Опт', contact: 'Козлов Дмитрий', phone: '+7 (495) 456-78-90', email: 'opt@lenta.ru', terms: 'Отсрочка 7 дней', status: 'inactive' },
  ];

  const warehouses = [
    { id: 'W-001', name: 'Ресторан Сухой', type: 'Ресторанный', zones: 12, capacity: '500 м²', status: 'active' },
    { id: 'W-002', name: 'Ресторан Фризер', type: 'Ресторанный', zones: 4, capacity: '50 м²', status: 'active' },
    { id: 'W-003', name: 'Ресторан Кулер', type: 'Ресторанный', zones: 4, capacity: '50 м²', status: 'active' },
  ];

  const users = [
    { id: 'U-001', name: 'Иван Петров', role: 'Администратор', email: 'i.petrov@company.ru', phone: '+7 (999) 111-22-33', restaurant: 'Все', status: 'active' },
    { id: 'U-002', name: 'Мария Сидорова', role: 'Менеджер заказов', email: 'm.sidorova@company.ru', phone: '+7 (999) 222-33-44', restaurant: 'Ресторан №1', status: 'active' },
    { id: 'U-003', name: 'Алексей Козлов', role: 'Кладовщик', email: 'a.kozlov@company.ru', phone: '+7 (999) 333-44-55', restaurant: 'Ресторан №1', status: 'active' },
    { id: 'U-004', name: 'Елена Новикова', role: 'Менеджер заказов', email: 'e.novikova@company.ru', phone: '+7 (999) 444-55-66', restaurant: 'Ресторан №2', status: 'inactive' },
  ];

  const businessRules = [
    { id: 'BR-001', name: 'Автоматическое списание просроченных', type: 'Списание', description: 'Автоматически создавать заявки на списание за 2 дня до истечения срока', enabled: true },
    { id: 'BR-002', name: 'Двухэтапное утверждение заказов', type: 'Утверждение', description: 'Заказы свыше 100 000 ₽ требуют утверждения директора', enabled: true },
    { id: 'BR-003', name: 'FIFO ротация товаров', type: 'Ротация', description: 'Использовать товары с ближайшим сроком годности в первую очередь', enabled: true },
    { id: 'BR-004', name: 'Уведомление о низких остатках', type: 'Уведомления', description: 'Отправлять email при достижении минимального остатка', enabled: false },
  ];

  const categories = [
    'Мука и крупы', 'Масла', 'Сахар', 'Мясо', 'Молочные', 'Овощи', 'Фрукты', 'Напитки', 'Специи', 'Прочее'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Справочники и настройки</h2>
          <p className="text-muted-foreground mt-1">Управление базовой информацией и настройками системы</p>
        </div>
      </div>

      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Icon name="Package" size={16} />
            Номенклатура
          </TabsTrigger>
          <TabsTrigger value="suppliers" className="flex items-center gap-2">
            <Icon name="Store" size={16} />
            Поставщики
          </TabsTrigger>
          <TabsTrigger value="warehouses" className="flex items-center gap-2">
            <Icon name="Warehouse" size={16} />
            Склады
          </TabsTrigger>
          <TabsTrigger value="rules" className="flex items-center gap-2">
            <Icon name="Settings" size={16} />
            Бизнес-процессы
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Icon name="Users" size={16} />
            Пользователи
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Package" size={18} />
                  Номенклатура товаров
                </CardTitle>
                <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить товар
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Новый товар</DialogTitle>
                      <DialogDescription>
                        Добавьте новую позицию в номенклатуру
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Наименование товара</Label>
                          <Input placeholder="Например: Мука пшеничная" />
                        </div>
                        <div className="space-y-2">
                          <Label>Артикул/Код</Label>
                          <Input placeholder="P-XXX" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Категория</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите категорию" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Единица измерения</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите ед. изм." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kg">кг</SelectItem>
                              <SelectItem value="l">л</SelectItem>
                              <SelectItem value="pcs">шт</SelectItem>
                              <SelectItem value="pack">уп</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Минимальный остаток</Label>
                          <Input type="number" placeholder="0" />
                        </div>
                        <div className="space-y-2">
                          <Label>Средняя цена</Label>
                          <Input type="number" placeholder="0 ₽" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Описание</Label>
                        <Textarea placeholder="Дополнительная информация о товаре..." rows={3} />
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <Label>Активный товар</Label>
                          <p className="text-sm text-muted-foreground">Товар доступен для заказа</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" onClick={() => setIsProductDialogOpen(false)}>
                          Отмена
                        </Button>
                        <Button onClick={() => setIsProductDialogOpen(false)}>
                          Добавить товар
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 relative">
                  <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Поиск по названию или артикулу..." className="pl-10" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все категории</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Icon name="Filter" size={18} />
                </Button>
              </div>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Код</TableHead>
                      <TableHead>Наименование</TableHead>
                      <TableHead>Категория</TableHead>
                      <TableHead>Ед. изм.</TableHead>
                      <TableHead className="text-right">Мин. остаток</TableHead>
                      <TableHead className="text-right">Средняя цена</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.id}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell className="text-muted-foreground">{product.category}</TableCell>
                        <TableCell>{product.unit}</TableCell>
                        <TableCell className="text-right">{product.minStock}</TableCell>
                        <TableCell className="text-right font-semibold">{product.price}</TableCell>
                        <TableCell>
                          <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                            {product.status === 'active' ? 'Активен' : 'Неактивен'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm">
                              <Icon name="Edit" size={14} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Icon name="Trash2" size={14} />
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

        <TabsContent value="suppliers" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Store" size={18} />
                  Поставщики
                </CardTitle>
                <Dialog open={isSupplierDialogOpen} onOpenChange={setIsSupplierDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить поставщика
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Новый поставщик</DialogTitle>
                      <DialogDescription>
                        Добавьте нового поставщика в систему
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Название компании</Label>
                        <Input placeholder="ООО «Название»" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Контактное лицо</Label>
                          <Input placeholder="ФИО представителя" />
                        </div>
                        <div className="space-y-2">
                          <Label>Телефон</Label>
                          <Input placeholder="+7 (___) ___-__-__" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input type="email" placeholder="email@company.ru" />
                      </div>
                      <div className="space-y-2">
                        <Label>Адрес</Label>
                        <Input placeholder="Город, улица, дом" />
                      </div>
                      <div className="space-y-2">
                        <Label>Условия поставки</Label>
                        <Textarea placeholder="Отсрочка платежа, минимальная сумма заказа..." rows={3} />
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <Label>Активный поставщик</Label>
                          <p className="text-sm text-muted-foreground">Доступен для создания заказов</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" onClick={() => setIsSupplierDialogOpen(false)}>
                          Отмена
                        </Button>
                        <Button onClick={() => setIsSupplierDialogOpen(false)}>
                          Добавить поставщика
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 relative">
                  <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Поиск по названию или контакту..." className="pl-10" />
                </div>
                <Button variant="outline">
                  <Icon name="Filter" size={18} />
                </Button>
              </div>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Код</TableHead>
                      <TableHead>Название</TableHead>
                      <TableHead>Контактное лицо</TableHead>
                      <TableHead>Телефон</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Условия</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {suppliers.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell className="font-medium">{supplier.id}</TableCell>
                        <TableCell className="font-semibold">{supplier.name}</TableCell>
                        <TableCell>{supplier.contact}</TableCell>
                        <TableCell className="text-muted-foreground">{supplier.phone}</TableCell>
                        <TableCell className="text-muted-foreground">{supplier.email}</TableCell>
                        <TableCell>{supplier.terms}</TableCell>
                        <TableCell>
                          <Badge variant={supplier.status === 'active' ? 'default' : 'secondary'}>
                            {supplier.status === 'active' ? 'Активен' : 'Неактивен'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm">
                              <Icon name="Edit" size={14} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Icon name="Trash2" size={14} />
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

        <TabsContent value="warehouses" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Warehouse" size={18} />
                  Склады и локации
                </CardTitle>
                <Dialog open={isWarehouseDialogOpen} onOpenChange={setIsWarehouseDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить склад
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Новый склад</DialogTitle>
                      <DialogDescription>
                        Добавьте новый склад или локацию хранения
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Название склада</Label>
                        <Input placeholder="Например: Склад №1 - Основной" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Тип склада</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите тип" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="central">Центральный</SelectItem>
                              <SelectItem value="restaurant">Ресторанный</SelectItem>
                              <SelectItem value="temp">Временный</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Количество зон</Label>
                          <Input type="number" placeholder="0" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Адрес</Label>
                        <Input placeholder="Город, улица, дом" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Площадь</Label>
                          <Input placeholder="м²" />
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
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <Label>Активный склад</Label>
                          <p className="text-sm text-muted-foreground">Используется в системе</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" onClick={() => setIsWarehouseDialogOpen(false)}>
                          Отмена
                        </Button>
                        <Button onClick={() => setIsWarehouseDialogOpen(false)}>
                          Добавить склад
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 relative">
                  <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Поиск по названию или адресу..." className="pl-10" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все типы</SelectItem>
                    <SelectItem value="central">Центральный</SelectItem>
                    <SelectItem value="restaurant">Ресторанный</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Код</TableHead>
                      <TableHead>Название</TableHead>
                      <TableHead>Тип</TableHead>
                      <TableHead className="text-right">Зон</TableHead>
                      <TableHead>Площадь</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {warehouses.map((warehouse) => (
                      <TableRow key={warehouse.id}>
                        <TableCell className="font-medium">{warehouse.id}</TableCell>
                        <TableCell className="font-semibold">{warehouse.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{warehouse.type}</Badge>
                        </TableCell>
                        <TableCell className="text-right">{warehouse.zones}</TableCell>
                        <TableCell>{warehouse.capacity}</TableCell>
                        <TableCell>
                          <Badge variant={warehouse.status === 'active' ? 'default' : 'secondary'}>
                            {warehouse.status === 'active' ? 'Активен' : 'Неактивен'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm">
                              <Icon name="Edit" size={14} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Icon name="Trash2" size={14} />
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

        <TabsContent value="rules" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Settings" size={18} />
                Настройка бизнес-процессов
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {businessRules.map((rule) => (
                  <div key={rule.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{rule.name}</h4>
                        <Badge variant="outline">{rule.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{rule.description}</p>
                    </div>
                    <div className="flex items-center gap-4 ml-6">
                      <Switch checked={rule.enabled} />
                      <Button variant="ghost" size="sm">
                        <Icon name="Edit" size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-6">
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить новое правило
              </Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Icon name="Clock" size={16} />
                  Настройки уведомлений
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email уведомления</Label>
                    <p className="text-sm text-muted-foreground">Отправлять на email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Telegram уведомления</Label>
                    <p className="text-sm text-muted-foreground">Отправлять в Telegram</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push уведомления</Label>
                    <p className="text-sm text-muted-foreground">Браузерные уведомления</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Icon name="FileText" size={16} />
                  Настройки документов
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Формат номера заказа</Label>
                  <Input defaultValue="ORD-YYYY-####" />
                </div>
                <div className="space-y-2">
                  <Label>Префикс накладной</Label>
                  <Input defaultValue="RCP-YYYY-####" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Печать штрих-кодов</Label>
                    <p className="text-sm text-muted-foreground">Автоматически на документах</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Users" size={18} />
                  Пользователи и права доступа
                </CardTitle>
                <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить пользователя
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Новый пользователь</DialogTitle>
                      <DialogDescription>
                        Добавьте нового пользователя и настройте права доступа
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>ФИО</Label>
                          <Input placeholder="Иванов Иван Иванович" />
                        </div>
                        <div className="space-y-2">
                          <Label>Роль</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите роль" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Администратор</SelectItem>
                              <SelectItem value="manager">Менеджер заказов</SelectItem>
                              <SelectItem value="warehouse">Кладовщик</SelectItem>
                              <SelectItem value="viewer">Наблюдатель</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input type="email" placeholder="email@company.ru" />
                        </div>
                        <div className="space-y-2">
                          <Label>Телефон</Label>
                          <Input placeholder="+7 (___) ___-__-__" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Ресторан/Объект</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите объект" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Все объекты</SelectItem>
                            <SelectItem value="r1">Ресторан №1</SelectItem>
                            <SelectItem value="r2">Ресторан №2</SelectItem>
                            <SelectItem value="r3">Ресторан №3</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-3 p-4 border rounded-lg">
                        <Label>Права доступа</Label>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Создание заказов</span>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Утверждение заказов</span>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Приёмка товаров</span>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Управление складом</span>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Списания</span>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Доступ к аналитике</span>
                            <Switch />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <Label>Активный пользователь</Label>
                          <p className="text-sm text-muted-foreground">Может входить в систему</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" onClick={() => setIsUserDialogOpen(false)}>
                          Отмена
                        </Button>
                        <Button onClick={() => setIsUserDialogOpen(false)}>
                          Добавить пользователя
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 relative">
                  <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Поиск по имени или email..." className="pl-10" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все роли</SelectItem>
                    <SelectItem value="admin">Администратор</SelectItem>
                    <SelectItem value="manager">Менеджер заказов</SelectItem>
                    <SelectItem value="warehouse">Кладовщик</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Код</TableHead>
                      <TableHead>ФИО</TableHead>
                      <TableHead>Роль</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Телефон</TableHead>
                      <TableHead>Объект</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell className="font-semibold">{user.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
                        <TableCell className="text-muted-foreground">{user.phone}</TableCell>
                        <TableCell>{user.restaurant}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                            {user.status === 'active' ? 'Активен' : 'Неактивен'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm">
                              <Icon name="Key" size={14} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Icon name="Edit" size={14} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Icon name="Trash2" size={14} />
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
    </div>
  );
};

export default Settings;