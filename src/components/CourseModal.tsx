import React, { useEffect, useRef } from 'react';
import { Course } from '../types/course';
import { formatCurrency } from '../utils';
import { useFavorites } from '../context/FavoritesContext';
import {
  X,
  Star,
  Clock,
  BookOpen,
  Users,
  CheckCircle,
  Heart,
  Calendar,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface CourseModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({ course, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  // Focus trap & ESC handling
  useEffect(() => {
    if (!isOpen) return;

    // Lưu lại phần tử đang focus trước khi modal mở
    previouslyFocusedElementRef.current = document.activeElement as HTMLElement;

    // Ngăn chặn cuộn trang phía sau
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Tìm tất cả các phần tử có thể nhận focus trong modal
    const getFocusableElements = (): HTMLElement[] => {
      if (!modalRef.current) return [];
      const focusableSelectors =
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
      return Array.from(modalRef.current.querySelectorAll<HTMLElement>(focusableSelectors));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Phím ESC để đóng modal
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // 2. Focus trap: Giữ phím Tab bên trong modal
      if (e.key === 'Tab') {
        const focusable = getFocusableElements();
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Tự động focus vào nút đóng khi mở modal
    const timer = setTimeout(() => {
      const focusable = getFocusableElements();
      if (focusable.length > 0) {
        focusable[0].focus();
      }
    }, 50);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      clearTimeout(timer);

      // Trả lại focus cho phần tử kích hoạt trước đó
      if (previouslyFocusedElementRef.current) {
        previouslyFocusedElementRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen || !course) return null;

  const favorited = isFavorite(course.id);

  // Xử lý khi nhấn bên ngoài overlay
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-fade-in"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-course-title"
      aria-describedby="modal-course-description"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col border border-slate-100"
      >
        {/* Modal Header Bar with Close Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {course.category}
            </span>
            {course.badge && (
              <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                {course.badge}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(course)}
              className={`p-2 rounded-full border transition-colors ${
                favorited
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50'
              }`}
              aria-label={favorited ? `Xóa "${course.title}" khỏi yêu thích` : `Thêm "${course.title}" vào yêu thích`}
            >
              <Heart className={`w-5 h-5 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Đóng cửa sổ chi tiết khóa học"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="overflow-y-auto px-6 py-6 space-y-6">
          {/* Top Banner / Image & Overview */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 relative rounded-xl overflow-hidden shadow-md group aspect-video md:aspect-[4/3] bg-slate-100">
              <img
                src={course.thumbnail}
                alt={`Ảnh minh họa cho khóa học ${course.title}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 text-white text-xs font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>{course.duration}</span>
                <span className="mx-1">•</span>
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>{course.lecturesCount} bài học</span>
              </div>
            </div>

            <div className="md:col-span-7 flex flex-col justify-between space-y-3">
              <div>
                <h2 id="modal-course-title" className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {course.title}
                </h2>
                <p id="modal-course-description" className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {course.shortDescription}
                </p>
              </div>

              {/* Stats Bar */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-2 text-xs text-slate-600 border-t border-slate-100">
                <div className="flex items-center gap-1 text-amber-500 font-semibold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm text-slate-800">{course.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">({course.reviewsCount.toLocaleString()} đánh giá)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>{course.studentsCount.toLocaleString()} học viên</span>
                </div>
                <div className="flex items-center gap-1">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-500">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Cập nhật: {course.updatedAt}</span>
                </div>
              </div>

              {/* Instructor info card */}
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <img
                  src={course.instructor.avatar}
                  alt={`Chân dung giảng viên ${course.instructor.name}`}
                  className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{course.instructor.name}</h4>
                  <p className="text-xs text-slate-500">{course.instructor.role}</p>
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <div className="text-2xl font-extrabold text-emerald-600">
                    {course.price === 0 ? 'Miễn phí' : formatCurrency(course.price)}
                  </div>
                  {course.originalPrice > course.price && (
                    <span className="text-xs text-slate-400 line-through">
                      {formatCurrency(course.originalPrice)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/item/${course.id}`}
                    onClick={onClose}
                    className="px-4 py-2.5 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    Xem trang chi tiết đầy đủ
                  </Link>
                  <button
                    onClick={() => {
                      toggleFavorite(course);
                    }}
                    className="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:shadow-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    {favorited ? 'Đã lưu yêu thích' : 'Lưu vào yêu thích'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="border-t border-slate-100 pt-5">
            <h3 className="text-base font-bold text-slate-900 mb-2">Mô tả khóa học</h3>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {course.description}
            </p>
          </div>

          {/* Outcomes */}
          {course.outcomes && course.outcomes.length > 0 && (
            <div className="border-t border-slate-100 pt-5">
              <h3 className="text-base font-bold text-slate-900 mb-3">Bạn sẽ học được gì</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {course.outcomes.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Curriculum Accordion */}
          {course.curriculum && course.curriculum.length > 0 && (
            <div className="border-t border-slate-100 pt-5">
              <h3 className="text-base font-bold text-slate-900 mb-3">Nội dung khóa học</h3>
              <div className="space-y-3">
                {course.curriculum.map((chapter) => (
                  <div key={chapter.id} className="border border-slate-200 rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between p-3.5 bg-slate-50/80">
                      <div className="flex items-center gap-2">
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-semibold text-slate-800">{chapter.title}</span>
                      </div>
                      <span className="text-xs text-slate-500 font-medium">
                        {chapter.lessonsCount} bài • {chapter.duration}
                      </span>
                    </div>
                    <ul className="divide-y divide-slate-100 px-4 py-2 bg-white text-xs text-slate-600">
                      {chapter.lessons.map((lesson, idx) => (
                        <li key={idx} className="py-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span>{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Nhấn <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-700 font-mono">ESC</kbd> hoặc click bên ngoài để đóng</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg font-medium transition-colors focus:ring-2 focus:ring-emerald-500"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
