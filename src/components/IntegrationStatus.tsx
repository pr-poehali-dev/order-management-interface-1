import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Integration {
  id: string;
  name: string;
  type: 'POS' | 'ERP' | 'Loyalty' | 'API';
  status: 'connected' | 'error' | 'pending';
  lastSync: string;
  icon: string;
}

const IntegrationStatus = () => {
  const integrations: Integration[] = [
    { 
      id: 'pos', 
      name: 'Burger King POS', 
      type: 'POS', 
      status: 'connected', 
      lastSync: '2 минуты назад',
      icon: 'ShoppingBag'
    },
    { 
      id: 'erp', 
      name: 'SAP ERP', 
      type: 'ERP', 
      status: 'connected', 
      lastSync: '5 минут назад',
      icon: 'Database'
    },
    { 
      id: 'loyalty', 
      name: 'Система лояльности', 
      type: 'Loyalty', 
      status: 'error', 
      lastSync: '1 час назад',
      icon: 'Award'
    },
    { 
      id: 'api', 
      name: 'Внешний API', 
      type: 'API', 
      status: 'pending', 
      lastSync: 'Не синхронизировано',
      icon: 'Cloud'
    },
  ];

  const getStatusBadge = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return { label: 'Подключено', variant: 'default' as const, color: 'text-green-600' };
      case 'error':
        return { label: 'Ошибка', variant: 'destructive' as const, color: 'text-red-600' };
      case 'pending':
        return { label: 'Ожидание', variant: 'secondary' as const, color: 'text-yellow-600' };
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Plug" size={18} />
          Интеграции
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {integrations.map((integration) => {
            const status = getStatusBadge(integration.status);
            return (
              <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    integration.status === 'connected' ? 'bg-green-100 dark:bg-green-950' :
                    integration.status === 'error' ? 'bg-red-100 dark:bg-red-950' :
                    'bg-yellow-100 dark:bg-yellow-950'
                  }`}>
                    <Icon 
                      name={integration.icon as any} 
                      size={20} 
                      className={status.color}
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{integration.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">{integration.type}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {integration.lastSync}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge {...status}>{status.label}</Badge>
                  <Button variant="ghost" size="sm">
                    <Icon name="RefreshCw" size={14} />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        <Button variant="outline" className="w-full mt-4">
          <Icon name="Settings" size={16} className="mr-2" />
          Настроить интеграции
        </Button>
      </CardContent>
    </Card>
  );
};

export default IntegrationStatus;
