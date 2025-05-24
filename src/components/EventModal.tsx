import { useState, useEffect } from 'react';
import { useEvents } from '../context/EventsContext';
import { CalendarEvent, EventCategory, Priority } from '../types';
import { X } from 'lucide-react';

interface EventModalProps {
  onClose: () => void;
  selectedDate?: Date;
  editEvent?: CalendarEvent | null;
}

const EventModal: React.FC<EventModalProps> = ({ 
  onClose, 
  selectedDate = new Date(),
  editEvent = null
}) => {
  const { addEvent, updateEvent, deleteEvent } = useEvents();
  const isEditMode = !!editEvent;
  
  const [formData, setFormData] = useState<CalendarEvent>({
    id: editEvent?.id || crypto.randomUUID(),
    title: editEvent?.title || '',
    description: editEvent?.description || '',
    start: editEvent?.start || (() => {
      const date = new Date(selectedDate);
      date.setMinutes(0);
      return date.toISOString();
    })(),
    end: editEvent?.end || (() => {
      const date = new Date(selectedDate);
      date.setHours(date.getHours() + 1);
      date.setMinutes(0);
      return date.toISOString();
    })(),
    category: editEvent?.category || 'Work',
    isTask: editEvent?.isTask || false,
    priority: editEvent?.priority || 'Medium',
    repeat: editEvent?.repeat || false,
  });
  
  const formatDateTimeForInput = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode) {
      updateEvent(formData);
    } else {
      addEvent(formData);
    }
    
    onClose();
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : value
    }));
  };
  
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this event?')) {
      deleteEvent(formData.id);
      onClose();
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            {isEditMode ? 'Edit Event' : 'New Event'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Add title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Add description"
              ></textarea>
            </div>
            
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                name="isTask"
                id="isTask"
                checked={formData.isTask}
                onChange={handleChange}
                className="h-4 w-4 text-pink-600 dark:text-purple-500 focus:ring-pink-500 dark:focus:ring-purple-500 border-gray-300 dark:border-gray-700 rounded"
              />
              <label htmlFor="isTask" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                This is a task
              </label>
            </div>
            
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start
                </label>
                <input
                  type="datetime-local"
                  name="start"
                  value={formatDateTimeForInput(formData.start)}
                  onChange={(e) => setFormData({
                    ...formData,
                    start: new Date(e.target.value).toISOString()
                  })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  End
                </label>
                <input
                  type="datetime-local"
                  name="end"
                  value={formatDateTimeForInput(formData.end)}
                  onChange={(e) => setFormData({
                    ...formData,
                    end: new Date(e.target.value).toISOString()
                  })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Health">Health</option>
                <option value="Social">Social</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            {formData.isTask && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            )}
            
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                name="repeat"
                id="repeat"
                checked={formData.repeat}
                onChange={handleChange}
                className="h-4 w-4 text-pink-600 dark:text-purple-500 focus:ring-pink-500 dark:focus:ring-purple-500 border-gray-300 dark:border-gray-700 rounded"
              />
              <label htmlFor="repeat" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Repeat
              </label>
            </div>
            
            <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              {isEditMode && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                >
                  Delete
                </button>
              )}
              
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-pink-500 dark:bg-purple-600 hover:bg-pink-600 dark:hover:bg-purple-700 text-white rounded-md transition-colors"
              >
                {isEditMode ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;