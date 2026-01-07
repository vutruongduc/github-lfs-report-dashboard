import { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import FileUpload from './components/FileUpload';
import SummaryCards from './components/SummaryCards';
import DailyUsageChart from './components/DailyUsageChart';
import SkuChart from './components/SkuChart';
import TopUsersChart from './components/TopUsersChart';
import TopRepositoriesChart from './components/TopRepositoriesChart';
import CostAnalysisChart from './components/CostAnalysisChart';
import DataTable from './components/DataTable';
import type { UsageRecord } from './types/usage';

function App() {
  const [data, setData] = useState<UsageRecord[] | null>(null);

  const handleDataLoaded = (loadedData: UsageRecord[]) => {
    setData(loadedData);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                GitHub Actions/LFS Usage Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Analyze and visualize your GitHub Actions and LFS usage reports
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
            {/* Summary Cards */}
            <SummaryCards data={data} />

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DailyUsageChart data={data} />
              <SkuChart data={data} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TopUsersChart data={data} />
              <TopRepositoriesChart data={data} />
            </div>

            <CostAnalysisChart data={data} />

            {/* Data Table */}
            <DataTable data={data} />

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
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            GitHub Actions/LFS Usage Dashboard - Built with React, TypeScript, and Recharts
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
