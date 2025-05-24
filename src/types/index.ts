export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  start: string; // ISO string
  end: string; // ISO string
  category: EventCategory;
  isTask: boolean;
  priority?: Priority;
  repeat: boolean;
  color?: string;
}

export type EventCategory = 'Work' | 'Personal' | 'Health' | 'Social' | 'Other';

export type Priority = 'Low' | 'Medium' | 'High';

export type CalendarView = 'day' | 'week' | 'month';

export interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export interface EventsContextType {
  events: CalendarEvent[];
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (event: CalendarEvent) => void;
  deleteEvent: (id: string) => void;
  clearAllEvents: () => void;
}