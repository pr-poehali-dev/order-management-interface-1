import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Icon from '@/components/ui/icon';

interface InventoryPlan {
  id: string;
  date: string;
  location: string;
  inventoryType: string;
  status: string;
  items: number;
}

interface AuditTabProps {
  inventoryPlans: InventoryPlan[];
  getInventoryStatusBadge: (status: string) => { label: string; variant: 'secondary' | 'default' | 'outline' };
}

const AuditTab = ({ inventoryPlans, getInventoryStatusBadge }: AuditTabProps) => {
  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-200 dark:border-blue-900 rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100">Мобильная инвентаризация</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              Для проведения инвентаризации используйте мобильное устройство со сканером штрих-кодов
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Планы инвентаризации</CardTitle>
            <Button>
              <Icon name="Plus" size={16} className="mr-2" />
              Запланировать
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>№ Инвентаризации</TableHead>
                  <TableHead>Дата</TableHead>
                  <TableHead>Локация</TableHead>
                  <TableHead>Тип инвентаризации</TableHead>
                  <TableHead className="text-right">Позиций</TableHead>
                  <TableHead>Статус</TableHead>
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
                      <TableCell className="text-muted-foreground">{plan.inventoryType}</TableCell>
                      <TableCell className="text-right">{plan.items}</TableCell>
                      <TableCell>
                        <Badge {...statusBadge}>{statusBadge.label}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {plan.status === 'planned' && (
                            <Button variant="ghost" size="sm">
                              <Icon name="Play" size={14} />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <Icon name="Eye" size={14} />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Icon name="Download" size={14} />
                          </Button>
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
    </div>
  );
};

export default AuditTab;