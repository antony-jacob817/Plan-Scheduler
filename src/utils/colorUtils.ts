export const getCategoryColor = (category: string, darkMode: boolean = false): string => {
  const colors = {
    Work: darkMode ? 'bg-blue-700 border-blue-500' : 'bg-blue-500 border-blue-400',
    Personal: darkMode ? 'bg-pink-700 border-pink-500' : 'bg-pink-500 border-pink-400',
    Health: darkMode ? 'bg-green-700 border-green-500' : 'bg-green-500 border-green-400',
    Social: darkMode ? 'bg-purple-700 border-purple-500' : 'bg-purple-500 border-purple-400',
    Other: darkMode ? 'bg-gray-700 border-gray-500' : 'bg-gray-500 border-gray-400'
  };
  
  return colors[category as keyof typeof colors] || colors.Other;
};

export const getCategoryTextColor = (category: string): string => {
  const colors = {
    Work: 'text-blue-600 dark:text-blue-400',
    Personal: 'text-pink-600 dark:text-pink-400',
    Health: 'text-green-600 dark:text-green-400',
    Social: 'text-purple-600 dark:text-purple-400',
    Other: 'text-gray-600 dark:text-gray-400'
  };
  
  return colors[category as keyof typeof colors] || colors.Other;
};

export const getPriorityColor = (priority: string): string => {
  const colors = {
    Low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    High: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  };
  
  return colors[priority as keyof typeof colors] || '';
};

export const getCategoryBadgeColor = (category: string): string => {
  const colors = {
    Work: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Personal: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    Health: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Social: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    Other: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  };
  
  return colors[category as keyof typeof colors] || colors.Other;
};