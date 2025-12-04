import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

interface ExpiryTabProps {
  inventoryData: InventoryItem[];
  getExpiryBadge: (status: string, days: number) => any;
}

const ExpiryTab = ({ inventoryData, getExpiryBadge }: ExpiryTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="AlertTriangle" size={18} />
          Товары с истекающим сроком годности
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {inventoryData
            .filter(item => item.status === 'critical' || item.status === 'expiring')
            .sort((a, b) => a.daysToExpiry - b.daysToExpiry)
            .map((item) => {
              const expiryBadge = getExpiryBadge(item.status, item.daysToExpiry);
              
              return (
                <div key={item.id} className={`p-4 border-2 rounded-lg ${
                  item.status === 'critical' ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon 
                          name={item.status === 'critical' ? 'AlertCircle' : 'AlertTriangle'} 
                          size={20} 
                          className={item.status === 'critical' ? 'text-red-600' : 'text-yellow-600'} 
                        />
                        <h3 className="font-semibold">{item.product}</h3>
                        <Badge {...expiryBadge} className={expiryBadge.className}>
                          {expiryBadge.label}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm ml-8">
                        <div>
                          <span className="text-muted-foreground">Остаток:</span>
                          <span className="font-semibold ml-2">{item.quantity} {item.unit}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Локация:</span>
                          <span className="font-semibold ml-2">{item.restaurant}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Местоположение:</span>
                          <span className="font-semibold ml-2">{item.location}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Срок годности:</span>
                          <span className="font-semibold ml-2">{item.expiry}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Icon name="Trash2" size={14} className="mr-1" />
                        Списать
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="ArrowRightLeft" size={14} className="mr-1" />
                        Переместить
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpiryTab;
