import { useState, useMemo } from 'react';
import { BarChart3 } from 'lucide-react';
import FileUpload from './components/FileUpload';
import SummaryCards from './components/SummaryCards';
import DailyUsageChart from './components/DailyUsageChart';
import SkuChart from './components/SkuChart';
import TopUsersChart from './components/TopUsersChart';
import TopRepositoriesChart from './components/TopRepositoriesChart';
import CostAnalysisChart from './components/CostAnalysisChart';
import AnomalyCostChart from './components/AnomalyCostChart';
import DataTable from './components/DataTable';
import FilterBar, { type FilterState } from './components/FilterBar';
import type { UsageRecord } from './types/usage';

function App() {
  const [data, setData] = useState<UsageRecord[] | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    startDate: '',
    endDate: '',
    username: '',
    repository: '',
    sku: '',
    costCenter: '',
  });

  const handleDataLoaded = (loadedData: UsageRecord[]) => {
    setData(loadedData);
    setFilters({
      startDate: '',
      endDate: '',
      username: '',
      repository: '',
      sku: '',
      costCenter: '',
    });
  };

  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((record) => {
      if (filters.startDate && record.date < filters.startDate) return false;
      if (filters.endDate && record.date > filters.endDate) return false;
      if (filters.username && record.username !== filters.username) return false;
      if (filters.repository && record.repository !== filters.repository) return false;
      if (filters.sku && record.sku !== filters.sku) return false;
      if (filters.costCenter && record.cost_center_name !== filters.costCenter) return false;
      return true;
    });
  }, [data, filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                LFS & Actions Report
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Usage Analytics Dashboard
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!data ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <FileUpload onDataLoaded={handleDataLoaded} />
            <div className="mt-8 max-w-2xl text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Get Started
              </h2>
              <p className="text-gray-600 mb-4">
                Upload your GitHub Actions or LFS usage report CSV file to start
                analyzing your usage patterns, costs, and trends.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                <h3 className="font-medium text-blue-900 mb-2">
                  Expected CSV Format:
                </h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• date, product, sku, quantity, unit_type</li>
                  <li>• applied_cost_per_quantity, gross_amount, discount_amount, net_amount</li>
                  <li>• username, organization, repository, workflow_path</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <FilterBar
              data={data}
              filters={filters}
              onFilterChange={setFilters}
              onClearFilters={() => setFilters({
                startDate: '',
                endDate: '',
                username: '',
                repository: '',
                sku: '',
                costCenter: '',
              })}
            />

            {/* Summary Cards */}
            <SummaryCards data={filteredData} />

            {/* Cost Analysis Section - prioritized */}
            <div className="space-y-6">
              <CostAnalysisChart data={filteredData} />
              <AnomalyCostChart data={filteredData} />
            </div>

            {/* Users & Repos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TopUsersChart data={filteredData} />
              <TopRepositoriesChart data={filteredData} />
            </div>

            {/* Usage Trends */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DailyUsageChart data={filteredData} />
              <SkuChart data={filteredData} />
            </div>

            {/* Data Table */}
            <DataTable data={filteredData} />

            {/* Upload New File Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={() => setData(null)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Upload new file"
              >
                Upload New File
              </button>
            </div>
          </div>
        )}
      </main >

      {/* Footer */}
      < footer className="bg-white border-t border-gray-200 mt-12" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            GitHub Actions/LFS Usage Dashboard - Built with React, TypeScript, and Recharts
          </p>
        </div>
      </footer >
    </div >
  );
}

export default App;
