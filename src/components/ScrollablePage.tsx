import React, { ReactNode } from 'react';

interface ScrollablePageProps {
  children: ReactNode;
  title: string;
}

const ScrollablePage: React.FC<ScrollablePageProps> = ({ children, title }) => {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white shadow-md p-4 z-10">
        <h1 className="text-xl font-bold text-center">{title}</h1>
      </header>
      <main className="flex-grow overflow-y-auto">
        <div className="p-4 pb-32"> {/* Added pb-24 for extra bottom padding */}
          {children}
        </div>
      </main>
    </div>
  );
};

export default ScrollablePage;