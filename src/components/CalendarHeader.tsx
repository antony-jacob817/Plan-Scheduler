import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarView } from '../types';
import { getMonthName, getWeekRange } from '../utils/dateUtils';

interface CalendarHeaderProps {
  currentDate: Date;
  view: CalendarView;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onViewChange: (view: CalendarView) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  view,
  onPrev,
  onNext,
  onToday,
  onViewChange,
}) => {
  const getHeaderTitle = () => {
    if (view === 'month') {
      return getMonthName(currentDate);
    } else if (view === 'week') {
      return getWeekRange(currentDate);
    } else {
      return currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    }
  };

  return (
    <div className="flex justify-between items-center py-4 px-2">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          {getHeaderTitle()}
        </h2>
      </div>

      <div className="flex items-center space-x-1 sm:space-x-2">
        <button
          onClick={onToday}
          className="px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Today
        </button>
        
        <div className="flex">
          <button
            onClick={onPrev}
            className="p-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-l-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft size={18} className="text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={onNext}
            className="p-1.5 bg-white dark:bg-gray-800 border border-r border-t border-b border-gray-300 dark:border-gray-700 rounded-r-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronRight size={18} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>
        
        <div className="hidden sm:flex bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
          <button
            onClick={() => onViewChange('day')}
            className={`px-3 py-1.5 text-sm ${
              view === 'day'
                ? 'bg-pink-100 dark:bg-purple-900 text-pink-700 dark:text-purple-200'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
            } transition-colors`}
          >
            Day
          </button>
          <button
            onClick={() => onViewChange('week')}
            className={`px-3 py-1.5 text-sm ${
              view === 'week'
                ? 'bg-pink-100 dark:bg-purple-900 text-pink-700 dark:text-purple-200'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
            } transition-colors`}
          >
            Week
          </button>
          <button
            onClick={() => onViewChange('month')}
            className={`px-3 py-1.5 text-sm ${
              view === 'month'
                ? 'bg-pink-100 dark:bg-purple-900 text-pink-700 dark:text-purple-200'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
            } transition-colors`}
          >
            Month
          </button>
        </div>
        
        <div className="sm:hidden">
          <select
            value={view}
            onChange={(e) => onViewChange(e.target.value as CalendarView)}
            className="block w-full px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md"
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;