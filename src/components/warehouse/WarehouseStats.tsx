import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface WarehouseStatsProps {
  stats: {
    totalItems: number;
    lowStock: number;
    expiring: number;
    locations: number;
  };
}

const WarehouseStats = ({ stats }: WarehouseStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Icon name="Package" size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalItems}</p>
              <p className="text-sm text-muted-foreground">Позиций на складе</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <Icon name="TrendingDown" size={24} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.lowStock}</p>
              <p className="text-sm text-muted-foreground">Низкий запас</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-500/10 rounded-lg">
              <Icon name="Clock" size={24} className="text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.expiring}</p>
              <p className="text-sm text-muted-foreground">Истекает срок</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Icon name="MapPin" size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.locations}</p>
              <p className="text-sm text-muted-foreground">Складских зон</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WarehouseStats;
