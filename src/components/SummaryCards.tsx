import React from 'react';
import { Clock, DollarSign, Users, GitBranch } from 'lucide-react';
import type { UsageRecord } from '../types/usage';
import { formatNumber, formatCurrency } from '../utils/dataProcessing';

interface SummaryCardsProps {
  data: UsageRecord[];
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ data }) => {
  const totalMinutes = data.reduce((sum, record) => sum + record.quantity, 0);
  const totalCost = data.reduce((sum, record) => sum + record.gross_amount, 0);
  const uniqueUsers = new Set(data.map((record) => record.username)).size;
  const uniqueRepos = new Set(data.map((record) => record.repository)).size;

  const cards = [
    {
      title: 'Total Usage',
      value: formatNumber(totalMinutes),
      unit: 'minutes',
      icon: Clock,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    {
      title: 'Total Cost',
      value: formatCurrency(totalCost),
      unit: '',
      icon: DollarSign,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
    },
    {
      title: 'Unique Users',
      value: formatNumber(uniqueUsers),
      unit: 'users',
      icon: Users,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
    },
    {
      title: 'Repositories',
      value: formatNumber(uniqueRepos),
      unit: 'repos',
      icon: GitBranch,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="glass-card p-6 card-hover"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
              <div className={`${card.bgColor} p-3 rounded-lg`}>
                <Icon className={`w-6 h-6 ${card.textColor}`} />
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              {card.unit && (
                <p className="text-sm text-gray-500 mt-1">{card.unit}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
