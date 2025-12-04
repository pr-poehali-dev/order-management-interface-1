import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

interface RoleGuardProps {
  children: ReactNode;
  permission?: keyof ReturnType<typeof useAuth>['user']['permissions'];
  fallback?: ReactNode;
}

const RoleGuard = ({ children, permission, fallback }: RoleGuardProps) => {
  const { hasPermission } = useAuth();

  if (permission && !hasPermission(permission)) {
    return fallback || (
      <Alert variant="destructive" className="max-w-2xl mx-auto mt-8">
        <Icon name="Lock" size={18} />
        <AlertDescription>
          У вас нет доступа к этому разделу. Обратитесь к администратору для получения прав.
        </AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
};

export default RoleGuard;
