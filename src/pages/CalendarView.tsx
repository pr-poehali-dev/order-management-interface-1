import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 4)); // December 4, 2024

  const deliveries = [
    { date: 4, supplier: 'ИВЛ', orders: 2, status: 'today' },
    { date: 5, supplier: 'Белая дача', orders: 3, status: 'upcoming' },
    { date: 5, supplier: 'Балтика', orders: 1, status: 'upcoming' },
    { date: 6, supplier: 'ПепсиКо', orders: 1, status: 'upcoming' },
    { date: 6, supplier: 'ИВЛ', orders: 2, status: 'upcoming' },
    { date: 9, supplier: 'Белая дача', orders: 1, status: 'upcoming' },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });

  const getDeliveriesForDay = (day: number) => {
    return deliveries.filter(d => d.date === day);
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Календарь поставок</h2>
          <p className="text-muted-foreground mt-1">Планирование и отслеживание доставок</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Icon name="Download" size={16} className="mr-2" />
            Экспорт
          </Button>
          <Button>
            <Icon name="Plus" size={16} className="mr-2" />
            Новая поставка
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="capitalize">{monthName}</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={previousMonth}>
                  <Icon name="ChevronLeft" size={16} />
                </Button>
                <Button variant="outline" size="sm" onClick={nextMonth}>
                  <Icon name="ChevronRight" size={16} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'].map((day) => (
                <div key={day} className="text-center text-sm font-semibold text-muted-foreground p-2">
                  {day}
                </div>
              ))}
              
              {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                <div key={`empty-${index}`} className="p-2" />
              ))}
              
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const dayDeliveries = getDeliveriesForDay(day);
                const isToday = day === 4;
                
                return (
                  <div
                    key={day}
                    className={`min-h-24 p-2 border rounded-lg hover:bg-accent/50 transition-colors ${
                      isToday ? 'border-primary border-2 bg-primary/5' : ''
                    }`}
                  >
                    <div className={`text-sm font-semibold mb-2 ${isToday ? 'text-primary' : ''}`}>
                      {day}
                    </div>
                    <div className="space-y-1">
                      {dayDeliveries.map((delivery, idx) => (
                        <div
                          key={idx}
                          className="text-xs p-1.5 bg-primary/10 rounded border border-primary/20 truncate"
                        >
                          {delivery.supplier}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deliveries List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Ближайшие поставки</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {deliveries.slice(0, 6).map((delivery, index) => (
                <div key={index} className="p-3 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">
                      {delivery.date} декабря
                    </span>
                    {delivery.status === 'today' && (
                      <Badge variant="default" className="text-xs">
                        Сегодня
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{delivery.supplier}</p>
                  <p className="text-xs text-muted-foreground">
                    {delivery.orders} {delivery.orders === 1 ? 'заказ' : 'заказа'}
                  </p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Показать все
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Icon name="Truck" size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Поставок на неделе</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Icon name="Calendar" size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">15</p>
                <p className="text-sm text-muted-foreground">Запланировано</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Icon name="CheckCircle" size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-muted-foreground">Выполнено</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-500/10 rounded-lg">
                <Icon name="Clock" size={24} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Задержек</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarView;