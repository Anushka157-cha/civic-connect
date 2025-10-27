export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Good Morning';
  if (hour >= 12 && hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};

export const CATEGORIES = [
  'Waste Management',
  'Roads and Potholes',
  'Streetlights',
  'Water Supply',
  'Sewage and Drainage',
  'Public Parks',
  'Illegal Constructions',
  'Others',
];

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};