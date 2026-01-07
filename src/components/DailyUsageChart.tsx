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
import { processDailySummary, formatNumber, formatCurrency } from '../utils/dataProcessing';

interface DailyUsageChartProps {
  data: UsageRecord[];
}

const DailyUsageChart: React.FC<DailyUsageChartProps> = ({ data }) => {
  const dailyData = processDailySummary(data);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{payload[0].payload.date}</p>
          <p className="text-sm text-blue-600">
            Minutes: {formatNumber(payload[0].value)}
          </p>
          <p className="text-sm text-green-600">
            Gross: {formatCurrency(payload[0].payload.totalGrossAmount)}
          </p>
          <p className="text-sm text-purple-600">
            Net: {formatCurrency(payload[0].payload.totalNetAmount)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (

    <div className="glass-card p-6 card-hover">
      <h3 className="text-lg font-bold text-slate-800 mb-6">Daily Usage Trend</h3>
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
            label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalMinutes"
            stroke="#3b82f6"
            strokeWidth={2}
            name="Usage (minutes)"
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyUsageChart;
