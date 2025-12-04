import { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'admin' | 'manager' | 'warehouse' | 'viewer';

interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  restaurant: string;
  permissions: {
    createOrders: boolean;
    approveOrders: boolean;
    reception: boolean;
    warehouse: boolean;
    writeoff: boolean;
    analytics: boolean;
    settings: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  hasPermission: (permission: keyof User['permissions']) => boolean;
  isRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const rolePermissions: Record<UserRole, User['permissions']> = {
  admin: {
    createOrders: true,
    approveOrders: true,
    reception: true,
    warehouse: true,
    writeoff: true,
    analytics: true,
    settings: true,
  },
  manager: {
    createOrders: true,
    approveOrders: true,
    reception: true,
    warehouse: false,
    writeoff: false,
    analytics: true,
    settings: false,
  },
  warehouse: {
    createOrders: false,
    approveOrders: false,
    reception: true,
    warehouse: true,
    writeoff: true,
    analytics: false,
    settings: false,
  },
  viewer: {
    createOrders: false,
    approveOrders: false,
    reception: false,
    warehouse: false,
    writeoff: false,
    analytics: true,
    settings: false,
  },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>({
    id: 'U-001',
    name: 'Иван Петров',
    role: 'admin',
    email: 'i.petrov@company.ru',
    restaurant: 'Все',
    permissions: rolePermissions.admin,
  });

  const login = (email: string, _password: string) => {
    let role: UserRole = 'viewer';
    if (email.includes('admin')) role = 'admin';
    else if (email.includes('manager')) role = 'manager';
    else if (email.includes('warehouse')) role = 'warehouse';

    setUser({
      id: 'U-001',
      name: 'Тестовый пользователь',
      role,
      email,
      restaurant: 'Ресторан №1',
      permissions: rolePermissions[role],
    });
  };

  const logout = () => {
    setUser(null);
  };

  const hasPermission = (permission: keyof User['permissions']) => {
    return user?.permissions[permission] ?? false;
  };

  const isRole = (role: UserRole) => {
    return user?.role === role;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasPermission, isRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
