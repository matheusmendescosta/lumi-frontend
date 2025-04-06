import React from 'react';
import CardSection from './CardSection';
import OverviewSection from './OverviewSection';

const DashboardPage = () => {
  return (
    <div className="p-4 space-y-6">
      <CardSection />
      <OverviewSection />
    </div>
  );
};

export default DashboardPage;
