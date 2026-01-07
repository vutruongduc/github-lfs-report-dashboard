export interface UsageRecord {
  date: string;
  product: string;
  sku: string;
  quantity: number;
  unit_type: string;
  applied_cost_per_quantity: number;
  gross_amount: number;
  discount_amount: number;
  net_amount: number;
  username: string;
  organization: string;
  repository: string;
  workflow_path: string;
  cost_center_name: string;
}

export interface DailySummary {
  date: string;
  totalMinutes: number;
  totalGrossAmount: number;
  totalNetAmount: number;
  totalDiscountAmount: number;
}

export interface SkuSummary {
  sku: string;
  totalMinutes: number;
  totalCost: number;
  percentage: number;
}

export interface UserSummary {
  username: string;
  totalMinutes: number;
  totalCost: number;
  repositoryCount: number;
}

export interface RepositorySummary {
  repository: string;
  totalMinutes: number;
  totalCost: number;
  userCount: number;
}
