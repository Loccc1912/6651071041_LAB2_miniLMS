import React from 'react';
import { Course } from '../types/course';
import { formatCurrency, truncateText } from '../utils';
import { useFavorites } from '../context/FavoritesContext';
import { Heart, Star, Clock, BookOpen, Eye, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  course: Course;
  onOpenModal: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onOpenModal }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(course.id);

  return (
    <article className="group bg-white rounded-2xl border border-slate-100/90 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col h-full overflow-hidden relative">
      {/* Thumbnail Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={course.thumbnail}
          alt={`Hình ảnh khóa học ${course.title} của giảng viên ${course.instructor.name}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/95 backdrop-blur-md text-emerald-800 shadow-sm border border-emerald-100">
            {course.category}
          </span>
          {course.badge && (
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-amber-400 text-amber-950 shadow-sm font-sans">
              {course.badge}
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(course);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-md transition-all duration-200 transform active:scale-90 ${
            favorited
              ? 'bg-rose-50 text-rose-500 hover:bg-rose-100 scale-105'
              : 'bg-white/80 text-slate-600 hover:bg-white hover:text-rose-500'
          }`}
          aria-label={
            favorited
              ? `Xóa "${course.title}" khỏi danh sách yêu thích`
              : `Thêm "${course.title}" vào danh sách yêu thích`
          }
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-200 ${
              favorited ? 'fill-rose-500 scale-110' : ''
            }`}
          />
        </button>

        {/* Bottom stats inside image */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white/90 font-medium">
          <div className="flex items-center gap-1.5 drop-shadow-sm">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 drop-shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>{course.lecturesCount} bài</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Rating & Level */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-slate-800">{course.rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal">
                ({course.reviewsCount.toLocaleString()})
              </span>
            </div>
            <span className="text-slate-500 font-medium px-2 py-0.5 rounded bg-slate-100">
              {course.level}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 text-base leading-snug">
            <Link to={`/item/${course.id}`} className="hover:underline focus:outline-none focus:text-emerald-700">
              {course.title}
            </Link>
          </h3>

          {/* Short description */}
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
            {truncateText(course.shortDescription, 95)}
          </p>

          {/* Instructor row */}
          <div className="flex items-center gap-2.5 pt-1.5">
            <img
              src={course.instructor.avatar}
              alt={`Ảnh đại diện giảng viên ${course.instructor.name}`}
              className="w-8 h-8 rounded-full object-cover border border-slate-200"
              loading="lazy"
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-800 truncate">
                {course.instructor.name}
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                {course.instructor.role}
              </p>
            </div>
          </div>
        </div>

        {/* Footer: Price & Action buttons */}
        <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-lg font-extrabold text-emerald-600 tracking-tight">
              {course.price === 0 ? 'Miễn phí' : formatCurrency(course.price)}
            </div>
            {course.originalPrice > course.price && (
              <span className="text-xs text-slate-400 line-through">
                {formatCurrency(course.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Modal Quick View Button */}
            <button
              onClick={() => onOpenModal(course)}
              className="p-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl border border-slate-200 transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              title="Xem nhanh chi tiết qua cửa sổ modal"
              aria-label={`Xem nhanh thông tin khóa học ${course.title} qua modal`}
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Direct Page Link Button */}
            <Link
              to={`/item/${course.id}`}
              className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm hover:shadow-md transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              aria-label={`Xem trang chi tiết đầy đủ khóa học ${course.title}`}
            >
              <span>Xem khóa</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
