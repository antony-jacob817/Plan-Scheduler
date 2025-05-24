import { useState } from 'react';
import { getDaysInMonth, isToday, getEventsForDate } from '../utils/dateUtils';
import { useEvents } from '../context/EventsContext';
import { getCategoryColor } from '../utils/colorUtils';
import { useTheme } from '../context/ThemeContext';
import EventModal from './EventModal';

interface MonthViewProps {
  currentDate: Date;
}

const MonthView: React.FC<MonthViewProps> = ({ currentDate }) => {
  const { events } = useEvents();
  const { darkMode } = useTheme();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  const days = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );
  
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowModal(true);
  };
  
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return (
    <>
      <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        {dayNames.map((day, index) => (
          <div 
            key={index} 
            className="bg-pink-50 dark:bg-purple-900 text-center py-2 font-medium text-gray-700 dark:text-gray-200"
          >
            {day}
          </div>
        ))}
        
        {days.map((day, index) => {
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          const isTodayDate = isToday(day);
          const dayEvents = getEventsForDate(events, day);
          const hasEvents = dayEvents.length > 0;
          
          return (
            <div
              key={index}
              onClick={() => handleDateClick(day)}
              className={`min-h-[100px] p-1 ${
                isCurrentMonth 
                  ? 'bg-white dark:bg-gray-800' 
                  : 'bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600'
              } hover:bg-pink-50 dark:hover:bg-purple-950 cursor-pointer transition-colors`}
            >
              <div className="flex justify-between">
                <div
                  className={`flex items-center justify-center w-7 h-7 rounded-full ${
                    isTodayDate
                      ? 'bg-pink-500 dark:bg-purple-600 text-white'
                      : ''
                  }`}
                >
                  {day.getDate()}
                </div>
              </div>
              
              <div className="mt-1 space-y-1 overflow-hidden">
                {dayEvents.slice(0, 3).map((event, eventIndex) => (
                  <div
                    key={event.id}
                    className={`text-xs px-1 py-0.5 rounded truncate ${
                      event.isTask 
                        ? 'border-l-4 border-gray-300 dark:border-gray-600' 
                        : getCategoryColor(event.category, darkMode)
                    }`}
                  >
                    {event.title}
                  </div>
                ))}
                
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 pl-1">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {showModal && selectedDate && (
        <EventModal 
          onClose={() => setShowModal(false)} 
          selectedDate={selectedDate}
          editEvent={null}
        />
      )}
    </>
  );
};

export default MonthView;