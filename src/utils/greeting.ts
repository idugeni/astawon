// src/utils/greeting.ts
export const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) return 'Selamat Pagi';
  if (currentHour < 18) return 'Selamat Siang';
  return 'Selamat Malam';
};
