import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import Icon from '@/components/ui/icon';

const RoleSwitcher = () => {
  const { user, login } = useAuth();

  const roles = [
    { 
      id: 'admin', 
      name: 'Администратор', 
      email: 'admin@company.ru',
      description: 'Полный доступ ко всем функциям',
      icon: 'Shield'
    },
    { 
      id: 'manager', 
      name: 'Менеджер заказов', 
      email: 'manager@company.ru',
      description: 'Управление заказами и аналитика',
      icon: 'Briefcase'
    },
    { 
      id: 'warehouse', 
      name: 'Кладовщик', 
      email: 'warehouse@company.ru',
      description: 'Приёмка, склад, списания',
      icon: 'Package'
    },
    { 
      id: 'viewer', 
      name: 'Наблюдатель', 
      email: 'viewer@company.ru',
      description: 'Только просмотр аналитики',
      icon: 'Eye'
    },
  ];

  const handleRoleSwitch = (email: string) => {
    login(email, 'demo');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="User" size={16} className="text-primary" />
          </div>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-semibold">{user?.name}</span>
            <Badge variant="outline" className="text-xs">
              {user?.role === 'admin' && 'Администратор'}
              {user?.role === 'manager' && 'Менеджер'}
              {user?.role === 'warehouse' && 'Кладовщик'}
              {user?.role === 'viewer' && 'Наблюдатель'}
            </Badge>
          </div>
          <Icon name="ChevronDown" size={16} className="hidden md:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Переключить роль (демо)</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {roles.map((role) => (
          <DropdownMenuItem
            key={role.id}
            onClick={() => handleRoleSwitch(role.email)}
            className="flex items-start gap-3 p-3 cursor-pointer"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
              <Icon name={role.icon as any} size={18} className="text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold">{role.name}</p>
                {user?.role === role.id && (
                  <Icon name="Check" size={14} className="text-primary" />
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {role.description}
              </p>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">
          <Icon name="LogOut" size={16} className="mr-2" />
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoleSwitcher;
