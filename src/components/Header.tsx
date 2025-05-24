import { useState } from 'react';
import { Sun, Moon, PlusCircle, CalendarDays } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import EventModal from './EventModal';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header className="bg-white dark:bg-gray-900 shadow-md py-4 px-6 flex justify-between items-center transition-colors duration-300">
        <div className="flex items-center">
          <CalendarDays className="text-2xl text-pink-600 dark:text-purple-400 mr-1" />
          <h1 className="text-2xl font-bold text-pink-600 dark:text-purple-400">
            Kalendo
          </h1>
        </div>
        
        <div className="flex space-x-4 items-center">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center px-4 py-2 bg-pink-500 hover:bg-pink-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white rounded-full transition-colors duration-200"
          >
            <PlusCircle size={18} className="mr-2" />
            <span>Create</span>
          </button>
          
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <Moon size={20} className="text-purple-400" />
            ) : (
              <Sun size={20} className="text-pink-600" />
            )}
          </button>
        </div>
      </header>
      
      {showModal && (
        <EventModal onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default Header;