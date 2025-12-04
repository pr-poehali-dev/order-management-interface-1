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
import Icon from '@/components/ui/icon';

interface Product {
  id: string;
  name: string;
  category: string;
  unit: string;
  minStock: number;
  price: string;
  status: string;
}

interface ProductsTabProps {
  products: Product[];
  categories: string[];
  isProductDialogOpen: boolean;
  setIsProductDialogOpen: (open: boolean) => void;
}

const ProductsTab = ({ products, categories, isProductDialogOpen, setIsProductDialogOpen }: ProductsTabProps) => {
  return (
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
  );
};

export default ProductsTab;
