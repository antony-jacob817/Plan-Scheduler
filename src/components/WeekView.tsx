import { useState } from 'react';
import { getDaysInWeek, formatTime, getEventsForDate } from '../utils/dateUtils';
import { useEvents } from '../context/EventsContext';
import { getCategoryColor } from '../utils/colorUtils';
import { useTheme } from '../context/ThemeContext';
import EventModal from './EventModal';

interface WeekViewProps {
  currentDate: Date;
}

const WeekView: React.FC<WeekViewProps> = ({ currentDate }) => {
  const { events } = useEvents();
  const { darkMode } = useTheme();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  const days = getDaysInWeek(currentDate);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  const handleCellClick = (date: Date, hour: number) => {
    const newDate = new Date(date);
    newDate.setHours(hour);
    setSelectedDate(newDate);
    setShowModal(true);
  };
  
  return (
    <>
      <div className="flex flex-col h-[600px] overflow-auto">
        <div className="sticky top-0 z-10 flex border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="w-16 flex-shrink-0"></div>
          {days.map((day, dayIndex) => {
            const isToday = new Date().toDateString() === day.toDateString();
            return (
              <div 
                key={dayIndex}
                className="flex-1 text-center py-2 font-medium border-l border-gray-200 dark:border-gray-700"
              >
                <div className={isToday ? 'text-pink-600 dark:text-purple-400' : ''}>
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className={`text-sm ${isToday ? 'text-pink-600 dark:text-purple-400' : ''}`}>
                  {day.getDate()}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex flex-1">
          <div className="w-16 flex-shrink-0 border-r border-gray-200 dark:border-gray-700">
            {hours.map((hour) => (
              <div 
                key={hour} 
                className="h-12 text-xs text-right pr-2 text-gray-500 dark:text-gray-400"
                style={{ paddingTop: '2px' }}
              >
                {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
              </div>
            ))}
          </div>
          
          <div className="flex-1 grid grid-cols-7 divide-x divide-gray-200 dark:divide-gray-700">
            {days.map((day, dayIndex) => (
              <div key={dayIndex} className="relative">
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="h-12 border-b border-gray-200 dark:border-gray-700 hover:bg-pink-50 dark:hover:bg-purple-950 cursor-pointer transition-colors"
                    onClick={() => handleCellClick(day, hour)}
                  ></div>
                ))}
                
                {/* Events */}
                {getEventsForDate(events, day).map((event) => {
                  const startTime = new Date(event.start);
                  const endTime = new Date(event.end);
                  const startHour = startTime.getHours() + startTime.getMinutes() / 60;
                  const endHour = endTime.getHours() + endTime.getMinutes() / 60;
                  const duration = endHour - startHour;
                  
                  return (
                    <div
                      key={event.id}
                      className={`absolute left-0 right-0 mx-1 p-1 rounded text-xs overflow-hidden shadow-sm z-10 ${
                        event.isTask 
                          ? 'border-l-4 border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-800' 
                          : getCategoryColor(event.category, darkMode)
                      }`}
                      style={{
                        top: `${startHour * 3}rem`,
                        height: `${Math.max(duration * 3, 1.5)}rem`,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDate(day);
                        setShowModal(true);
                      }}
                    >
                      <div className="font-medium truncate">
                        {event.title}
                      </div>
                      <div className="truncate">
                        {formatTime(startTime)} - {formatTime(endTime)}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
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

export default WeekView;