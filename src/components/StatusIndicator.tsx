import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface StatusIndicatorProps {
  type: 'stock' | 'expiry' | 'delivery' | 'quality';
  value: number;
  threshold?: { warning: number; critical: number };
  unit?: string;
}

const StatusIndicator = ({ type, value, threshold, unit = '' }: StatusIndicatorProps) => {
  const getStockStatus = () => {
    if (!threshold) return { color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-950', icon: 'CheckCircle', label: 'Норма' };
    
    if (value <= threshold.critical) {
      return { color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-950', icon: 'AlertCircle', label: 'Критично' };
    } else if (value <= threshold.warning) {
      return { color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-950', icon: 'AlertTriangle', label: 'Низкий' };
    }
    return { color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-950', icon: 'CheckCircle', label: 'Норма' };
  };

  const getExpiryStatus = () => {
    if (value <= 2) {
      return { color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-950', icon: 'AlertCircle', label: 'Срочно', badgeVariant: 'destructive' as const };
    } else if (value <= 7) {
      return { color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-950', icon: 'Clock', label: 'Внимание', badgeVariant: 'outline' as const };
    }
    return { color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-950', icon: 'CheckCircle', label: 'Норма', badgeVariant: 'default' as const };
  };

  const getDeliveryStatus = () => {
    if (value < 0) {
      return { color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-950', icon: 'XCircle', label: `Просрочено (${Math.abs(value)} дн.)`, badgeVariant: 'destructive' as const };
    } else if (value === 0) {
      return { color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-950', icon: 'Clock', label: 'Сегодня', badgeVariant: 'outline' as const };
    } else if (value === 1) {
      return { color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-950', icon: 'Truck', label: 'Завтра', badgeVariant: 'default' as const };
    }
    return { color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-950', icon: 'Calendar', label: `Через ${value} дн.`, badgeVariant: 'default' as const };
  };

  const getQualityStatus = () => {
    if (value >= 90) {
      return { color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-950', icon: 'CheckCircle', label: 'Отлично', badgeVariant: 'default' as const };
    } else if (value >= 70) {
      return { color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-950', icon: 'AlertTriangle', label: 'Удовл.', badgeVariant: 'outline' as const };
    }
    return { color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-950', icon: 'XCircle', label: 'Плохо', badgeVariant: 'destructive' as const };
  };

  let status;
  switch (type) {
    case 'stock':
      status = getStockStatus();
      break;
    case 'expiry':
      status = getExpiryStatus();
      break;
    case 'delivery':
      status = getDeliveryStatus();
      break;
    case 'quality':
      status = getQualityStatus();
      break;
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${status.bg}`}>
        <Icon name={status.icon as any} size={16} className={status.color} />
      </div>
      <div>
        <p className="text-sm font-semibold">
          {value}{unit}
        </p>
        {'badgeVariant' in status && (
          <Badge variant={status.badgeVariant} className="text-xs mt-0.5">
            {status.label}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default StatusIndicator;
