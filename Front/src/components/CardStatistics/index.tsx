import React from 'react';

import type { IconType } from 'react-icons';

interface CardStatisticsProps{
    icon: IconType,
    label: string,
    value: string

}

function CardStatistics({ icon: Icon, label, value }: CardStatisticsProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col gap-2 min-w-[200px] flex-1">
      <div className="bg-black text-white p-2 rounded-lg w-fit">
        <Icon size={24} />
      </div>
      
      <div className="mt-2">
        <p className="text-gray-500 text-sm font-medium">{label}</p>
        <h3 className="text-4xl font-bold text-black">{value}</h3>
      </div>
    </div>
  );
}

export default CardStatistics;