import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import coursesData from '../data/courses.json';
import { Course } from '../types/course';
import { formatCurrency } from '../utils';
import { useFavorites } from '../context/FavoritesContext';
import {
  ArrowLeft,
  Heart,
  Star,
  Users,
  Clock,
  BookOpen,
  Calendar,
  CheckCircle,
  ShieldCheck,
  ChevronRight,
  Layers,
  Award,
  PlayCircle,
  Share2,
} from 'lucide-react';

export const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const course: Course | undefined = useMemo(() => {
    return (coursesData as Course[]).find((c) => c.id === id);
  }, [id]);

  if (!course) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mb-4 border border-rose-100">
          <BookOpen className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Không tìm thấy khóa học</h1>
        <p className="text-sm text-slate-500 max-w-md mb-6">
          Khóa học với mã &ldquo;{id}&rdquo; không tồn tại hoặc đã được cập nhật đường dẫn mới.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại trang danh sách</span>
        </Link>
      </div>
    );
  }

  const favorited = isFavorite(course.id);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* 1. Breadcrumb & Back Bar */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2 flex-wrap">
              <Link to="/" className="hover:text-emerald-600 font-medium transition-colors">
                Trang chủ
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link to="/" className="hover:text-emerald-600 font-medium transition-colors">
                {course.category}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-800 font-semibold truncate max-w-xs sm:max-w-md">
                {course.title}
              </span>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Dark/Emerald Banner with Course Summary */}
      <div className="bg-slate-900 text-white py-12 lg:py-16 relative overflow-hidden">
        {/* Background glow decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Course Overview */}
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {course.category}
                </span>
                {course.badge && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-400 text-amber-950">
                    {course.badge}
                  </span>
                )}
                <span className="text-xs text-slate-400">Trình độ: {course.level}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-snug tracking-tight">
                {course.title}
              </h1>

              <p className="text-base text-slate-300 leading-relaxed max-w-3xl">
                {course.shortDescription}
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs sm:text-sm text-slate-300 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-white">{course.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">
                    ({course.reviewsCount.toLocaleString()} học viên đánh giá)
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>{course.studentsCount.toLocaleString()} người đã học</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-400">
                  <Calendar className="w-4 h-4" />
                  <span>Cập nhật gần nhất: {course.updatedAt}</span>
                </div>
              </div>

              {/* Instructor snippet */}
              <div className="flex items-center gap-3 pt-2">
                <img
                  src={course.instructor.avatar}
                  alt={`Giảng viên ${course.instructor.name}`}
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-md"
                />
                <div>
                  <div className="text-xs text-slate-400">Giảng viên hướng dẫn:</div>
                  <div className="text-sm font-bold text-white hover:text-emerald-400 transition-colors">
                    {course.instructor.name}
                  </div>
                  <div className="text-xs text-slate-400">{course.instructor.role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Content & Sticky Enrollment Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Info Columns */}
          <div className="lg:col-span-8 space-y-8 order-2 lg:order-1">
            {/* Learning Outcomes */}
            <section
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-4"
              aria-labelledby="outcomes-heading"
            >
              <h2 id="outcomes-heading" className="text-lg md:text-xl font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                <span>Những kiến thức & kỹ năng bạn sẽ đạt được</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {course.outcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Course Curriculum */}
            <section
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-5"
              aria-labelledby="curriculum-heading"
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h2 id="curriculum-heading" className="text-lg md:text-xl font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  <span>Chương trình giảng dạy chi tiết</span>
                </h2>
                <div className="text-xs text-slate-500 font-medium">
                  {course.curriculum.length} chương • {course.lecturesCount} bài học • {course.duration}
                </div>
              </div>

              <div className="space-y-4">
                {course.curriculum.map((chapter, index) => (
                  <div
                    key={chapter.id}
                    className="border border-slate-200 rounded-xl overflow-hidden hover:border-emerald-200 transition-colors"
                  >
                    <div className="p-4 bg-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                          {index + 1}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-slate-800">
                          {chapter.title}
                        </h3>
                      </div>
                      <span className="text-xs text-slate-500 font-medium">
                        {chapter.lessonsCount} bài • {chapter.duration}
                      </span>
                    </div>

                    <ul className="divide-y divide-slate-100 px-4 py-3 bg-white text-xs sm:text-sm text-slate-600 space-y-2">
                      {chapter.lessons.map((lesson, lIdx) => (
                        <li key={lIdx} className="py-2 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <PlayCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                            <span>{lesson}</span>
                          </div>
                          <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                            Xem trước
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Course Detailed Description */}
            <section
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-4"
              aria-labelledby="description-heading"
            >
              <h2 id="description-heading" className="text-lg md:text-xl font-bold text-slate-900">
                Mô tả chi tiết khóa học
              </h2>
              <div className="text-sm text-slate-600 leading-relaxed space-y-3 whitespace-pre-line">
                <p>{course.description}</p>
                <p>
                  Toàn bộ bài giảng được xây dựng bám sát theo các dự án thực tế tại doanh nghiệp, kết hợp video hướng dẫn từng bước và bài tập thực hành kèm mã nguồn mẫu để bạn đối chiếu.
                </p>
              </div>
            </section>

            {/* Requirements */}
            <section
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-4"
              aria-labelledby="requirements-heading"
            >
              <h2 id="requirements-heading" className="text-lg md:text-xl font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-600" />
                <span>Yêu cầu khóa học</span>
              </h2>
              <ul className="space-y-2.5 text-sm text-slate-600">
                {course.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Sticky Card */}
          <div className="lg:col-span-4 order-1 lg:order-2 sticky top-24">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              {/* Media Preview Box */}
              <div className="relative aspect-video bg-slate-900 group cursor-pointer overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={`Xem trước nội dung khóa học ${course.title}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 text-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <PlayCircle className="w-8 h-8 fill-emerald-600 text-white" />
                  </div>
                </div>
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-semibold text-white drop-shadow">
                  Xem video giới thiệu khóa học
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-6">
                {/* Pricing Box */}
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-emerald-600">
                      {course.price === 0 ? 'Miễn phí' : formatCurrency(course.price)}
                    </span>
                    {course.originalPrice > course.price && (
                      <span className="text-sm text-slate-400 line-through">
                        {formatCurrency(course.originalPrice)}
                      </span>
                    )}
                  </div>
                  {course.originalPrice > course.price && (
                    <span className="text-xs font-semibold text-rose-600 mt-1 inline-block">
                      Tiết kiệm{' '}
                      {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}%
                    </span>
                  )}
                </div>

                {/* Primary Action Buttons */}
                <div className="space-y-3">
                  <button
                    type="button"
                    className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-600/20 hover:shadow-xl transition-all text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    Đăng Ký Học Ngay
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleFavorite(course)}
                    className={`w-full py-3 px-6 rounded-xl border font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                      favorited
                        ? 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300 hover:text-emerald-700 hover:bg-slate-50'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span>{favorited ? 'Đã lưu vào danh sách yêu thích' : 'Thêm vào yêu thích'}</span>
                  </button>
                </div>

                {/* Guarantee Note */}
                <div className="flex items-center gap-2 text-xs text-slate-500 justify-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Cam kết hoàn tiền trong 30 ngày nếu không hài lòng</span>
                </div>

                {/* What includes */}
                <div className="pt-4 border-t border-slate-100 space-y-3 text-xs text-slate-600">
                  <h4 className="font-bold text-slate-900">Khóa học bao gồm:</h4>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>{course.duration} video bài giảng chất lượng Full HD</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <span>{course.lecturesCount} bài học và mã nguồn thực hành kèm theo</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>Chứng chỉ hoàn thành có giá trị xác thực trực tuyến</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Share2 className="w-4 h-4 text-emerald-600" />
                    <span>Quyền truy cập trọn đời trên cả máy tính và điện thoại</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
