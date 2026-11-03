import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div
      className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full animate-pulse"
      aria-hidden="true"
    >
      {/* Thumbnail Skeleton */}
      <div className="relative aspect-video w-full bg-slate-200 skeleton-shimmer">
        <div className="absolute top-3 left-3 w-20 h-5 bg-slate-300 rounded-full" />
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-300" />
      </div>

      {/* Content Skeleton */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Category & Rating */}
          <div className="flex items-center justify-between">
            <div className="w-24 h-4 bg-slate-200 rounded" />
            <div className="w-16 h-4 bg-slate-200 rounded" />
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <div className="w-full h-5 bg-slate-200 rounded" />
            <div className="w-3/4 h-5 bg-slate-200 rounded" />
          </div>

          {/* Description line */}
          <div className="space-y-1">
            <div className="w-full h-3 bg-slate-100 rounded" />
            <div className="w-5/6 h-3 bg-slate-100 rounded" />
          </div>

          {/* Instructor Skeleton */}
          <div className="flex items-center gap-3 pt-2">
            <div className="w-9 h-9 rounded-full bg-slate-200" />
            <div className="space-y-1">
              <div className="w-24 h-3.5 bg-slate-200 rounded" />
              <div className="w-32 h-2.5 bg-slate-100 rounded" />
            </div>
          </div>
        </div>

        {/* Footer Skeleton: Price and Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="space-y-1">
            <div className="w-20 h-6 bg-slate-200 rounded" />
            <div className="w-14 h-3 bg-slate-100 rounded" />
          </div>
          <div className="w-24 h-9 bg-slate-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
};
