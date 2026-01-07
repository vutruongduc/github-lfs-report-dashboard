import React from 'react';
import { Filter, X } from 'lucide-react';
import type { UsageRecord } from '../types/usage';

export interface FilterState {
    startDate: string;
    endDate: string;
    username: string;
    repository: string;
    sku: string;
    costCenter: string;
}

interface FilterBarProps {
    data: UsageRecord[];
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    onClearFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
    data,
    filters,
    onFilterChange,
    onClearFilters,
}) => {
    // Extract unique values for dropdowns
    const uniqueUsers = Array.from(new Set(data.map((r) => r.username))).sort();
    const uniqueRepos = Array.from(new Set(data.map((r) => r.repository))).sort();
    const uniqueSkus = Array.from(new Set(data.map((r) => r.sku))).sort();
    const uniqueCostCenters = Array.from(new Set(data.map((r) => r.cost_center_name))).filter(Boolean).sort();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        onFilterChange({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const hasActiveFilters = Object.values(filters).some(Boolean);

    return (
        <div className="glass-card p-4 card-hover mb-8">
            <div className="flex items-center gap-2 mb-4 text-slate-700">
                <Filter className="w-5 h-5" />
                <h3 className="font-semibold">Filters</h3>
                {hasActiveFilters && (
                    <button
                        onClick={onClearFilters}
                        className="ml-auto text-sm text-red-500 hover:text-red-700 flex items-center gap-1 px-2 py-1 bg-red-50 rounded-md transition-colors"
                    >
                        <X className="w-4 h-4" />
                        Clear All
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {/* Date Range */}
                <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        value={filters.startDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white/50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        value={filters.endDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white/50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                </div>

                {/* Username */}
                <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">User</label>
                    <select
                        name="username"
                        value={filters.username}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white/50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                        <option value="">All Users</option>
                        {uniqueUsers.map((u) => (
                            <option key={u} value={u}>{u}</option>
                        ))}
                    </select>
                </div>

                {/* Repository */}
                <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">Repository</label>
                    <select
                        name="repository"
                        value={filters.repository}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white/50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                        <option value="">All Repositories</option>
                        {uniqueRepos.map((r) => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>
                </div>

                {/* SKU */}
                <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">SKU</label>
                    <select
                        name="sku"
                        value={filters.sku}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white/50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                        <option value="">All SKUs</option>
                        {uniqueSkus.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>

                {/* Cost Center */}
                <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500">Cost Center</label>
                    <select
                        name="costCenter"
                        value={filters.costCenter}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white/50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                        <option value="">All Cost Centers</option>
                        {uniqueCostCenters.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
