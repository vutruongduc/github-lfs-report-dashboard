import type {
  UsageRecord,
  DailySummary,
  SkuSummary,
  UserSummary,
  RepositorySummary,
} from '../types/usage';

export const processDailySummary = (data: UsageRecord[]): DailySummary[] => {
  const dailyMap = new Map<string, DailySummary>();

  data.forEach((record) => {
    const existing = dailyMap.get(record.date);
    if (existing) {
      existing.totalMinutes += record.quantity;
      existing.totalGrossAmount += record.gross_amount;
      existing.totalNetAmount += record.net_amount;
      existing.totalDiscountAmount += record.discount_amount;
    } else {
      dailyMap.set(record.date, {
        date: record.date,
        totalMinutes: record.quantity,
        totalGrossAmount: record.gross_amount,
        totalNetAmount: record.net_amount,
        totalDiscountAmount: record.discount_amount,
      });
    }
  });

  return Array.from(dailyMap.values()).sort((a, b) =>
    a.date.localeCompare(b.date)
  );
};

export const processSkuSummary = (data: UsageRecord[]): SkuSummary[] => {
  const skuMap = new Map<string, { totalMinutes: number; totalCost: number }>();

  data.forEach((record) => {
    const existing = skuMap.get(record.sku);
    if (existing) {
      existing.totalMinutes += record.quantity;
      existing.totalCost += record.gross_amount;
    } else {
      skuMap.set(record.sku, {
        totalMinutes: record.quantity,
        totalCost: record.gross_amount,
      });
    }
  });

  const allTotalMinutes = Array.from(skuMap.values()).reduce(
    (sum, item) => sum + item.totalMinutes,
    0
  );

  return Array.from(skuMap.entries())
    .map(([sku, { totalMinutes, totalCost }]) => ({
      sku,
      totalMinutes,
      totalCost,
      percentage: (totalMinutes / allTotalMinutes) * 100,
    }))
    .sort((a, b) => b.totalMinutes - a.totalMinutes);
};

export const processUserSummary = (data: UsageRecord[]): UserSummary[] => {
  const userMap = new Map<
    string,
    { totalMinutes: number; totalCost: number; repositories: Set<string> }
  >();

  data.forEach((record) => {
    const existing = userMap.get(record.username);
    if (existing) {
      existing.totalMinutes += record.quantity;
      existing.totalCost += record.gross_amount;
      existing.repositories.add(record.repository);
    } else {
      userMap.set(record.username, {
        totalMinutes: record.quantity,
        totalCost: record.gross_amount,
        repositories: new Set([record.repository]),
      });
    }
  });

  return Array.from(userMap.entries())
    .map(([username, { totalMinutes, totalCost, repositories }]) => ({
      username,
      totalMinutes,
      totalCost,
      repositoryCount: repositories.size,
    }))
    .sort((a, b) => b.totalMinutes - a.totalMinutes)
    .slice(0, 10);
};

export const processRepositorySummary = (
  data: UsageRecord[]
): RepositorySummary[] => {
  const repoMap = new Map<
    string,
    { totalMinutes: number; totalCost: number; users: Set<string> }
  >();

  data.forEach((record) => {
    const existing = repoMap.get(record.repository);
    if (existing) {
      existing.totalMinutes += record.quantity;
      existing.totalCost += record.gross_amount;
      existing.users.add(record.username);
    } else {
      repoMap.set(record.repository, {
        totalMinutes: record.quantity,
        totalCost: record.gross_amount,
        users: new Set([record.username]),
      });
    }
  });

  return Array.from(repoMap.entries())
    .map(([repository, { totalMinutes, totalCost, users }]) => ({
      repository,
      totalMinutes,
      totalCost,
      userCount: users.size,
    }))
    .sort((a, b) => b.totalMinutes - a.totalMinutes)
    .slice(0, 10);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export interface CostAnomaly {
  date: string;
  totalCost: number;
  averageCost: number;
  difference: number;
  percentage: number;
}

export const processCostAnomalies = (data: UsageRecord[], thresholdMultiplier = 1.5): CostAnomaly[] => {
  // Aggregate cost by date first
  const dailyCosts = new Map<string, number>();
  data.forEach((record) => {
    dailyCosts.set(
      record.date,
      (dailyCosts.get(record.date) || 0) + record.gross_amount
    );
  });

  const costValues = Array.from(dailyCosts.values());
  if (costValues.length === 0) return [];

  const totalCost = costValues.reduce((a, b) => a + b, 0);
  const averageCost = totalCost / costValues.length;

  // Simple anomaly detection: significantly higher than average
  // We can refine this to use deviation, but for now 1.5x or 2x average is a good start visualization

  return Array.from(dailyCosts.entries())
    .filter(([_, cost]) => cost > averageCost * thresholdMultiplier)
    .map(([date, cost]) => ({
      date,
      totalCost: cost,
      averageCost,
      difference: cost - averageCost,
      percentage: ((cost - averageCost) / averageCost) * 100
    }))
    .sort((a, b) => b.totalCost - a.totalCost);
};
