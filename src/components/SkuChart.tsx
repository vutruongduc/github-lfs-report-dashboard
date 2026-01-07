import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import type { UsageRecord } from '../types/usage';
import { processSkuSummary, formatNumber, formatCurrency } from '../utils/dataProcessing';

interface SkuChartProps {
  data: UsageRecord[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const SkuChart: React.FC<SkuChartProps> = ({ data }) => {
  const skuData = processSkuSummary(data);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{data.sku}</p>
          <p className="text-sm text-gray-600">
            Minutes: {formatNumber(data.totalMinutes)}
          </p>
          <p className="text-sm text-gray-600">
            Cost: {formatCurrency(data.totalCost)}
          </p>
          <p className="text-sm text-gray-600">
            Percentage: {data.percentage.toFixed(2)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage by SKU</h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={skuData as any}
            dataKey="totalMinutes"
            nameKey="sku"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label={(entry: any) =>
              `${entry.sku.replace('actions_', '')}: ${entry.percentage.toFixed(1)}%`
            }
            labelLine={true}
          >
            {skuData.map((_item, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-6 space-y-2">
        {skuData.map((sku, index) => (
          <div
            key={sku.sku}
            className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded"
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm font-medium text-gray-700">{sku.sku}</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">
                {formatNumber(sku.totalMinutes)} min
              </p>
              <p className="text-xs text-gray-500">{formatCurrency(sku.totalCost)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkuChart;
