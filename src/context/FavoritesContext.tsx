import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Course } from '../types/course';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface FavoritesContextType {
  favoriteIds: string[];
  isFavorite: (courseId: string) => boolean;
  toggleFavorite: (course: Course) => void;
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

const FAVORITES_STORAGE_KEY = 'edulearn_favorite_course_ids_6651071041';

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Khởi tạo danh sách yêu thích từ localStorage
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed as string[];
        }
      }
    } catch {
      // Fallback nếu localStorage bị chặn hoặc dữ liệu không hợp lệ
    }
    return [];
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // 2. Tự động đồng bộ vào localStorage khi favoriteIds thay đổi
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch {
      // Bỏ qua nếu localStorage đầy
    }
  }, [favoriteIds]);

  const addToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 3200);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const isFavorite = useCallback(
    (courseId: string): boolean => {
      return favoriteIds.includes(courseId);
    },
    [favoriteIds]
  );

  const toggleFavorite = useCallback(
    (course: Course) => {
      setFavoriteIds((prev) => {
        const exists = prev.includes(course.id);
        if (exists) {
          addToast(`Đã xóa "${course.title}" khỏi danh sách yêu thích.`, 'info');
          return prev.filter((id) => id !== course.id);
        } else {
          addToast(`Đã thêm "${course.title}" vào danh sách yêu thích!`, 'success');
          return [...prev, course.id];
        }
      });
    },
    [addToast]
  );

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        isFavorite,
        toggleFavorite,
        toasts,
        removeToast,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
