import { useState } from 'react';
import Header from './components/Header';
import CalendarHeader from './components/CalendarHeader';
import MonthView from './components/MonthView';
import WeekView from './components/WeekView';
import DayView from './components/DayView';
import TodayEvents from './components/TodayEvents';
import { ThemeProvider } from './context/ThemeContext';
import { EventsProvider } from './context/EventsContext';
import { CalendarView } from './types';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>('month');
  
  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    
    setCurrentDate(newDate);
  };
  
  const handleNext = () => {
    const newDate = new Date(currentDate);
    
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    
    setCurrentDate(newDate);
  };
  
  const handleToday = () => {
    setCurrentDate(new Date());
  };
  
  return (
    <ThemeProvider>
      <EventsProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          <Header title="Kalendo" />
          
          <main className="container mx-auto p-4 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4">
                  <CalendarHeader
                    currentDate={currentDate}
                    view={view}
                    onPrev={handlePrevious}
                    onNext={handleNext}
                    onToday={handleToday}
                    onViewChange={setView}
                  />
                  
                  {view === 'month' && <MonthView currentDate={currentDate} />}
                  {view === 'week' && <WeekView currentDate={currentDate} />}
                  {view === 'day' && <DayView currentDate={currentDate} />}
                </div>
              </div>
              
              <div>
                <TodayEvents />
              </div>
            </div>
          </main>
          
          <footer className="mt-8 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Kalendo &copy; {new Date().getFullYear()} - Built with React</p>
          </footer>
        </div>
      </EventsProvider>
    </ThemeProvider>
  );
}

export default App;