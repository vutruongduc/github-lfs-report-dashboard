import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { UsageRecord } from '../types/usage';
import { processDailySummary, formatCurrency } from '../utils/dataProcessing';

interface CostAnalysisChartProps {
  data: UsageRecord[];
}

const CostAnalysisChart: React.FC<CostAnalysisChartProps> = ({ data }) => {
  const dailyData = processDailySummary(data);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{payload[0].payload.date}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (

    <div className="glass-card p-6 card-hover">
      <h3 className="text-lg font-bold text-slate-800 mb-6">Cost Analysis</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={dailyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            stroke="#6b7280"
          />
          <YAxis
            tick={{ fontSize: 12 }}
            stroke="#6b7280"
            label={{ value: 'Cost ($)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalGrossAmount"
            stroke="#10b981"
            strokeWidth={2}
            name="Gross Amount"
            dot={{ fill: '#10b981', r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="totalNetAmount"
            stroke="#3b82f6"
            strokeWidth={2}
            name="Net Amount"
            dot={{ fill: '#3b82f6', r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="totalDiscountAmount"
            stroke="#f59e0b"
            strokeWidth={2}
            name="Discount"
            dot={{ fill: '#f59e0b', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600 mb-1">Total Gross</p>
          <p className="text-xl font-bold text-green-900">
            {formatCurrency(
              dailyData.reduce((sum, d) => sum + d.totalGrossAmount, 0)
            )}
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 mb-1">Total Net</p>
          <p className="text-xl font-bold text-blue-900">
            {formatCurrency(
              dailyData.reduce((sum, d) => sum + d.totalNetAmount, 0)
            )}
          </p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="text-sm text-orange-600 mb-1">Total Discount</p>
          <p className="text-xl font-bold text-orange-900">
            {formatCurrency(
              dailyData.reduce((sum, d) => sum + d.totalDiscountAmount, 0)
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CostAnalysisChart;
