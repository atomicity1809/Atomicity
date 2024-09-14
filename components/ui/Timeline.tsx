import React, { ReactNode } from 'react';

interface TimelineProps {
  children: ReactNode;
}

const Timeline: React.FC<TimelineProps> = ({ children }) => (
  <div className="relative">
    <div className="border-l border-gray-300">
      {children}
    </div>
  </div>
);

interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  start: string;
  end: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ date, title, description, start, end }) => (
  <div className="relative mb-8">
    <div className="absolute w-3.5 h-3.5 bg-blue-600 rounded-full -left-1.75 border border-white" />
    <div className="flex flex-col md:flex-row items-start">
      <div className="flex-1 md:ml-8">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <div className="mt-2 text-gray-500">
          <span className="flex items-center">
            <span className="font-semibold">{start}</span> - <span className="font-semibold">{end}</span>
          </span>
        </div>
      </div>
    </div>
    <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
      </svg>
    </div>
  </div>
);


export { Timeline, TimelineItem };
