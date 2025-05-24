import { useState } from 'react';
import { formatTime, getEventsForDate } from '../utils/dateUtils';
import { useEvents } from '../context/EventsContext';
import { getCategoryColor } from '../utils/colorUtils';
import { useTheme } from '../context/ThemeContext';
import EventModal from './EventModal';

interface DayViewProps {
  currentDate: Date;
}

const DayView: React.FC<DayViewProps> = ({ currentDate }) => {
  const { events } = useEvents();
  const { darkMode } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const dayEvents = getEventsForDate(events, currentDate);
  
  const handleCellClick = (hour: number) => {
    const newDate = new Date(currentDate);
    newDate.setHours(hour);
    setSelectedHour(hour);
    setShowModal(true);
  };
  
  return (
    <>
      <div className="flex flex-col h-[600px] overflow-auto">
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
          
          <div className="flex-1">
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-12 border-b border-gray-200 dark:border-gray-700 hover:bg-pink-50 dark:hover:bg-purple-950 cursor-pointer transition-colors"
                onClick={() => handleCellClick(hour)}
              ></div>
            ))}
            
            {/* Events */}
            {dayEvents.map((event) => {
              const startTime = new Date(event.start);
              const endTime = new Date(event.end);
              const startHour = startTime.getHours() + startTime.getMinutes() / 60;
              const endHour = endTime.getHours() + endTime.getMinutes() / 60;
              const duration = endHour - startHour;
              
              return (
                <div
                  key={event.id}
                  className={`absolute left-16 right-4 p-2 rounded text-xs overflow-hidden shadow-sm z-10 ${
                    event.isTask 
                      ? 'border-l-4 border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-800' 
                      : getCategoryColor(event.category, darkMode)
                  }`}
                  style={{
                    top: `${startHour * 3 + 48}px`, // 48px is header height
                    height: `${Math.max(duration * 3, 1.5)}rem`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowModal(true);
                  }}
                >
                  <div className="font-medium truncate">
                    {event.title}
                  </div>
                  <div className="truncate">
                    {formatTime(startTime)} - {formatTime(endTime)}
                  </div>
                  {event.description && (
                    <div className="truncate text-gray-700 dark:text-gray-300">
                      {event.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {showModal && (
        <EventModal 
          onClose={() => setShowModal(false)} 
          selectedDate={selectedHour !== null ? (() => {
            const date = new Date(currentDate);
            date.setHours(selectedHour);
            return date;
          })() : currentDate}
          editEvent={null}
        />
      )}
    </>
  );
};

export default DayView;