import React from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import PageHeader from '@/components/Dashboard/PageHeader';
import FunnelChartSection from '@/components/Dashboard/FunnelChartSection';
import SourceChartCard from '@/components/Dashboard/SourceChartCard';
import LeadsTrackingCard from '@/components/Dashboard/LeadsTrackingCard';
import ReasonsLostSection from '@/components/Dashboard/ReasonsLostSection';
import QuickStatsGrid from '@/components/Dashboard/QuickStatsGrid';

/**
 * LeadsDashboardPage serves as the main view for the leads overview dashboard.
 * It assembles various dashboard components within the MainAppLayout.
 * The layout is responsive, displaying content in a single column on smaller screens
 * and a two-column grid on medium screens and larger, with specific items
 * spanning both columns.
 */
const LeadsDashboardPage: React.FC = () => {
  return (
    <MainAppLayout>
      <PageHeader />
      {/* 
        The main content grid. Uses 'grid-cols-1' for mobile (default) 
        and 'md:grid-cols-2' for medium screens and above. 
        'gap-8' is used as specified in layout requirements.
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Row 1: FunnelChartSection and SourceChartCard side-by-side on medium+ screens */}
        <FunnelChartSection />
        <SourceChartCard />

        {/* Row 2: LeadsTrackingCard spans both columns on medium+ screens */}
        <LeadsTrackingCard className="md:col-span-2" />

        {/* Row 3: ReasonsLostSection spans both columns on medium+ screens */}
        <ReasonsLostSection className="md:col-span-2" />

        {/* Row 4: QuickStatsGrid spans both columns on medium+ screens */}
        <QuickStatsGrid className="md:col-span-2" />
      </div>
    </MainAppLayout>
  );
};

export default LeadsDashboardPage;
