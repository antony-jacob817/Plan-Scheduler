export const getDaysInMonth = (year: number, month: number): Date[] => {
  const date = new Date(year, month, 1);
  const days: Date[] = [];
  
  // Add days from previous month to fill the first week
  const firstDay = date.getDay();
  const prevMonthDays = firstDay === 0 ? 6 : firstDay - 1; // Adjust for week starting on Monday
  
  for (let i = prevMonthDays; i > 0; i--) {
    const prevDate = new Date(year, month, 1 - i);
    days.push(prevDate);
  }
  
  // Add days of current month
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  
  // Add days from next month to complete the grid (up to 6 rows x 7 days = 42)
  const remainingDays = 42 - days.length;
  for (let i = 0; i < remainingDays; i++) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  
  return days;
};

export const getDaysInWeek = (date: Date): Date[] => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust for week starting on Monday
  const monday = new Date(date.setDate(diff));
  
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(monday);
    nextDay.setDate(monday.getDate() + i);
    days.push(nextDay);
  }
  
  return days;
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (date: Date | string): string => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export const getMonthName = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

export const getWeekRange = (date: Date): string => {
  const days = getDaysInWeek(date);
  const firstDay = days[0];
  const lastDay = days[6];
  
  if (firstDay.getMonth() === lastDay.getMonth()) {
    return `${firstDay.toLocaleDateString('en-US', { month: 'long' })} ${firstDay.getDate()} - ${lastDay.getDate()}, ${firstDay.getFullYear()}`;
  } else if (firstDay.getFullYear() === lastDay.getFullYear()) {
    return `${firstDay.toLocaleDateString('en-US', { month: 'short' })} ${firstDay.getDate()} - ${lastDay.toLocaleDateString('en-US', { month: 'short' })} ${lastDay.getDate()}, ${firstDay.getFullYear()}`;
  } else {
    return `${firstDay.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - ${lastDay.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
  }
};

export const getTodayEvents = (events: any[], date: Date = new Date()): any[] => {
  return events.filter(event => {
    const eventDate = new Date(event.start);
    return isSameDay(eventDate, date);
  }).sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
};

export const getEventsForDate = (events: any[], date: Date): any[] => {
  return events.filter(event => {
    const eventDate = new Date(event.start);
    return isSameDay(eventDate, date);
  }).sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
};