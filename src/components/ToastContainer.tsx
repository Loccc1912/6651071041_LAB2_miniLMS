import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useFavorites();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      role="region"
      aria-label="Thông báo hệ thống"
      aria-live="polite"
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isInfo = toast.type === 'info';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border transition-all duration-300 transform translate-y-0 ${
              isSuccess
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : isInfo
                ? 'bg-sky-50 border-sky-200 text-sky-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600" aria-hidden="true" />}
              {isInfo && <Info className="w-5 h-5 text-sky-600" aria-hidden="true" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-600" aria-hidden="true" />}
            </div>

            <p className="text-sm font-medium leading-relaxed flex-1">{toast.message}</p>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1 -mr-1 -mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Đóng thông báo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
