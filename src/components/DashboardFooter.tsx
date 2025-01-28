// src/components/DashboardFooter.tsx
const DashboardFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='w-full bg-base-200 py-4 mt-8 border-t border-neutral transition-all duration-300 ease-in-out'>
      <div className='max-w-screen-xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left'>
        <p className='text-xs md:text-sm text-muted-foreground'>
          &copy; {currentYear} ASTAWON. All rights reserved.
        </p>
        <p className='text-xs md:text-sm text-muted-foreground mt-2 md:mt-0'>
          Created by <span className="text-primary">Eliyanto Sarage</span>.
        </p>
      </div>
    </footer>
  );
};

export default DashboardFooter;
