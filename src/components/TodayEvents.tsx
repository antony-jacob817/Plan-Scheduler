import { useState } from 'react';
import { getTodayEvents, formatTime } from '../utils/dateUtils';
import { useEvents } from '../context/EventsContext';
import { getCategoryBadgeColor, getPriorityColor } from '../utils/colorUtils';
import { Calendar, Clock, Check, Edit } from 'lucide-react';
import { EventCategory } from '../types';
import EventModal from './EventModal';

const TodayEvents: React.FC = () => {
  const { events } = useEvents();
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'All'>('All');
  const [showModal, setShowModal] = useState(false);
  const [editEvent, setEditEvent] = useState<any>(null);
  
  const todayEvents = getTodayEvents(events);
  const filteredEvents = selectedCategory === 'All' 
    ? todayEvents 
    : todayEvents.filter(event => event.category === selectedCategory);
  
  const handleEditEvent = (event: any) => {
    setEditEvent(event);
    setShowModal(true);
  };
  
  const categories: Array<EventCategory | 'All'> = ['All', 'Work', 'Personal', 'Health', 'Social', 'Other'];
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center">
          <Calendar size={18} className="mr-2 text-pink-500 dark:text-purple-400" />
          Today's Events
        </h2>
        
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as EventCategory | 'All')}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-md py-1 pl-3 pr-8 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-purple-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      {filteredEvents.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No events scheduled for today
        </div>
      ) : (
        <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
          {filteredEvents.map((event) => (
            <div 
              key={event.id} 
              className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md hover:bg-pink-50 dark:hover:bg-purple-950 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">
                    {event.title}
                  </h3>
                  
                  <div className="flex items-center mt-1 text-sm text-gray-600 dark:text-gray-300">
                    <Clock size={14} className="mr-1" />
                    <span>
                      {formatTime(event.start)} - {formatTime(event.end)}
                    </span>
                  </div>
                  
                  {event.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {event.description}
                    </p>
                  )}
                  
                  <div className="flex mt-2 space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getCategoryBadgeColor(event.category)}`}>
                      {event.category}
                    </span>
                    
                    {event.isTask && event.priority && (
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(event.priority)}`}>
                        {event.priority}
                      </span>
                    )}
                    
                    {event.isTask && (
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                        Task
                      </span>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => handleEditEvent(event)}
                  className="p-1 text-gray-500 hover:text-pink-500 dark:hover:text-purple-400 transition-colors"
                >
                  <Edit size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showModal && (
        <EventModal 
          onClose={() => {
            setShowModal(false);
            setEditEvent(null);
          }}
          editEvent={editEvent}
        />
      )}
    </div>
  );
};

export default TodayEvents;