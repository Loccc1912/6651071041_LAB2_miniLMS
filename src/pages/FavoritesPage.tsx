import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import coursesData from '../data/courses.json';
import { Course } from '../types/course';
import { CourseCard } from '../components/CourseCard';
import { CourseModal } from '../components/CourseModal';
import { formatCurrency } from '../utils';
import { Heart, ArrowLeft, Sparkles } from 'lucide-react';

export const FavoritesPage: React.FC = () => {
  const { favoriteIds } = useFavorites();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lọc các khóa học nằm trong danh sách yêu thích
  const favoriteCourses = useMemo(() => {
    return (coursesData as Course[]).filter((course) =>
      favoriteIds.includes(course.id)
    );
  }, [favoriteIds]);

  // Tính tổng học phí các khóa học yêu thích
  const totalCost = useMemo(() => {
    return favoriteCourses.reduce((sum, c) => sum + c.price, 0);
  }, [favoriteCourses]);

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-rose-500 font-semibold text-xs tracking-wider uppercase mb-1">
              <Heart className="w-4 h-4 fill-rose-500" />
              <span>Không gian học tập cá nhân</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Khóa Học Yêu Thích Của Bạn
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Lưu trữ và quản lý những khóa học bạn quan tâm để học tập bất cứ lúc nào.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold shadow-sm transition-colors self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tiếp tục khám phá</span>
          </Link>
        </div>

        {favoriteCourses.length > 0 ? (
          <>
            {/* Quick Summary Bar */}
            <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  {favoriteCourses.length}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    Đã lưu {favoriteCourses.length} khóa học vào danh sách
                  </div>
                  <div className="text-xs text-slate-500">
                    Dữ liệu được lưu trữ tự động trên trình duyệt (localStorage).
                  </div>
                </div>
              </div>

              <div className="text-right flex items-center gap-4">
                <div>
                  <div className="text-xs text-slate-500">Tổng học phí dự tính:</div>
                  <div className="text-lg font-extrabold text-emerald-700">
                    {formatCurrency(totalCost)}
                  </div>
                </div>
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all"
                >
                  Đăng ký trọn gói
                </button>
              </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onOpenModal={(c) => {
                    setSelectedCourse(c);
                    setIsModalOpen(true);
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          /* Empty Favorites State */
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm space-y-5 my-12">
            <div className="w-20 h-20 rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto border border-rose-100">
              <Heart className="w-10 h-10 stroke-1" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900">Danh sách yêu thích đang trống</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Bạn chưa lưu khóa học nào. Hãy nhấn vào biểu tượng trái tim trên các thẻ khóa học để lưu vào danh sách học tập sau này!
              </p>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Khám phá các khóa học ngay</span>
            </Link>
          </div>
        )}
      </div>

      {/* Modal Quick View */}
      <CourseModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
