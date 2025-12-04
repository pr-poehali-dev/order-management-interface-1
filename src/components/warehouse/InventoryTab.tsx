import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import Icon from '@/components/ui/icon';

interface InventoryItem {
  id: number;
  product: string;
  category: string;
  quantity: number;
  unit: string;
  location: string;
  restaurant: string;
  min: number;
  expiry: string;
  daysToExpiry: number;
  status: string;
}

interface InventoryTabProps {
  filteredInventory: InventoryItem[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  locationFilter: string;
  setLocationFilter: (value: string) => void;
  getStockLevel: (quantity: number, min: number) => { color: string; label: string };
  getExpiryBadge: (status: string, days: number) => any;
}

const InventoryTab = ({
  filteredInventory,
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  locationFilter,
  setLocationFilter,
  getStockLevel,
  getExpiryBadge,
}: InventoryTabProps) => {
  return (
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
                <TableHead>Ресторан</TableHead>
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
  );
};

export default InventoryTab;