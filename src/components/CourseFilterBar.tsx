import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { FilterState } from '../types/course';

interface CourseFilterBarProps {
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onResetFilters: () => void;
  categories: string[];
  totalResults: number;
}

export const CourseFilterBar: React.FC<CourseFilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  categories,
  totalResults,
}) => {
  const levels = ['Tất cả', 'Cơ bản', 'Trung cấp', 'Nâng cao'];

  const isFiltering =
    filters.searchTerm.trim() !== '' ||
    filters.category !== 'all' ||
    filters.level !== 'all' ||
    filters.priceFilter !== 'all' ||
    filters.sortBy !== 'featured';

  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 space-y-5">
      {/* Search Input Row & Result stats */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <label htmlFor="course-search-input" className="sr-only">
            Tìm kiếm khóa học theo tên hoặc giảng viên
          </label>
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="course-search-input"
            type="text"
            value={filters.searchTerm}
            onChange={(e) => onFilterChange('searchTerm', e.target.value)}
            placeholder="Tìm kiếm khóa học, kỹ năng, tên giảng viên..."
            className="w-full pl-12 pr-10 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm outline-none transition-all"
          />
          {filters.searchTerm && (
            <button
              onClick={() => onFilterChange('searchTerm', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              aria-label="Xóa từ khóa tìm kiếm"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort and Clear Options */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 flex-1 sm:flex-none">
            <ArrowUpDown className="w-4 h-4 text-slate-500 hidden sm:block" />
            <label htmlFor="sort-courses-select" className="sr-only">
              Sắp xếp khóa học
            </label>
            <select
              id="sort-courses-select"
              value={filters.sortBy}
              onChange={(e) =>
                onFilterChange('sortBy', e.target.value as FilterState['sortBy'])
              }
              className="w-full sm:w-auto px-3.5 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none cursor-pointer"
            >
              <option value="featured">Sắp xếp: Mặc định</option>
              <option value="rating">Đánh giá cao nhất</option>
              <option value="popular">Học viên đông nhất</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
            </select>
          </div>

          {isFiltering && (
            <button
              onClick={onResetFilters}
              className="px-3.5 py-3 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              Đặt lại
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Danh mục ngành nghề</span>
          </span>
          <span className="text-xs text-slate-500 font-medium">
            Tìm thấy <strong className="text-emerald-700 font-bold">{totalResults}</strong> khóa học
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onFilterChange('category', 'all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              filters.category === 'all'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tất cả danh mục
          </button>
          {categories.map((cat) => {
            const active = filters.category === cat;
            return (
              <button
                key={cat}
                onClick={() => onFilterChange('category', cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Level and Price Quick Filters */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
        {/* Level Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-slate-500 font-medium">Trình độ:</span>
          {levels.map((lvl) => {
            const active = (lvl === 'Tất cả' && filters.level === 'all') || filters.level === lvl;
            return (
              <button
                key={lvl}
                onClick={() => onFilterChange('level', lvl === 'Tất cả' ? 'all' : lvl)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  active
                    ? 'bg-emerald-100 text-emerald-800 font-bold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {lvl}
              </button>
            );
          })}
        </div>

        {/* Price Filters */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">Học phí:</span>
          {(
            [
              { label: 'Tất cả', value: 'all' },
              { label: 'Có phí', value: 'paid' },
              { label: 'Miễn phí', value: 'free' },
            ] as const
          ).map((p) => {
            const active = filters.priceFilter === p.value;
            return (
              <button
                key={p.value}
                onClick={() => onFilterChange('priceFilter', p.value)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  active
                    ? 'bg-emerald-100 text-emerald-800 font-bold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
