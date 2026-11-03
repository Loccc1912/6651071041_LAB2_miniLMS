import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Course, FilterState } from '../types/course';
import coursesData from '../data/courses.json';
import { CourseCard } from '../components/CourseCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { CourseModal } from '../components/CourseModal';
import { HeroSection } from '../components/HeroSection';
import { CourseFilterBar } from '../components/CourseFilterBar';
import { BookOpen, Sparkles, AlertCircle } from 'lucide-react';

export const ListPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const coursesSectionRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    category: 'all',
    level: 'all',
    priceFilter: 'all',
    sortBy: 'featured',
  });

  // Giả lập tải dữ liệu khóa học với Skeleton Loading (800ms)
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setCourses(coursesData as Course[]);
      setLoading(false);
    }, 750);

    return () => clearTimeout(timer);
  }, []);

  // Danh sách các danh mục duy nhất
  const categories = useMemo(() => {
    return Array.from(new Set(coursesData.map((c) => c.category)));
  }, []);

  // Xử lý thay đổi bộ lọc
  const handleFilterChange = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchTerm: '',
      category: 'all',
      level: 'all',
      priceFilter: 'all',
      sortBy: 'featured',
    });
  };

  // Lọc và sắp xếp khóa học
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // 1. Lọc theo từ khóa tìm kiếm (tiêu đề, mô tả hoặc giảng viên)
      if (filters.searchTerm.trim() !== '') {
        const query = filters.searchTerm.toLowerCase().trim();
        const matchesTitle = course.title.toLowerCase().includes(query);
        const matchesDesc = course.shortDescription.toLowerCase().includes(query);
        const matchesInstructor = course.instructor.name.toLowerCase().includes(query);
        const matchesCategory = course.category.toLowerCase().includes(query);

        if (!matchesTitle && !matchesDesc && !matchesInstructor && !matchesCategory) {
          return false;
        }
      }

      // 2. Lọc theo danh mục
      if (filters.category !== 'all' && course.category !== filters.category) {
        return false;
      }

      // 3. Lọc theo trình độ
      if (filters.level !== 'all' && course.level !== filters.level) {
        return false;
      }

      // 4. Lọc theo học phí
      if (filters.priceFilter === 'free' && course.price > 0) {
        return false;
      }
      if (filters.priceFilter === 'paid' && course.price === 0) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (filters.sortBy === 'popular') {
        return b.studentsCount - a.studentsCount;
      }
      if (filters.sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (filters.sortBy === 'price-desc') {
        return b.price - a.price;
      }
      return 0; // featured
    });
  }, [courses, filters]);

  // Cuộn mượt mà đến khu vực khóa học
  const scrollToCourses = () => {
    coursesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenModal = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection onExploreClick={scrollToCourses} />

      {/* 2. Main Course Section */}
      <main
        id="courses-section"
        ref={coursesSectionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 scroll-mt-20"
      >
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-semibold text-xs tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Chương trình giảng dạy hàng đầu</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Tất Cả Khóa Học Trực Tuyến
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Chọn lựa khóa học phù hợp với mục tiêu phát triển bản thân và thăng tiến nghề nghiệp trong thời đại số.
            </p>
          </div>

          <div className="text-xs text-slate-500 bg-slate-100/80 px-3.5 py-1.5 rounded-full self-start md:self-auto border border-slate-200">
            Hiển thị <strong className="text-slate-900 font-bold">{filteredCourses.length}</strong> / {courses.length} khóa học
          </div>
        </div>

        {/* 3. Filter Bar */}
        <CourseFilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          categories={categories}
          totalResults={filteredCourses.length}
        />

        {/* 4. Course Grid with Responsive Breakpoints */}
        {/* 
          Breakpoints theo đúng yêu cầu đề bài:
          - Mobile (< 640px): 1 cột (grid-cols-1)
          - Tablet (640px - 1024px): 2 cột (sm:grid-cols-2 lg:grid-cols-3)
          - Desktop (> 1024px): 3-4 cột (lg:grid-cols-3 xl:grid-cols-4)
        */}
        {loading ? (
          <section aria-label="Đang tải danh sách khóa học">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          </section>
        ) : filteredCourses.length > 0 ? (
          <section aria-label="Danh sách khóa học">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onOpenModal={handleOpenModal}
                />
              ))}
            </div>
          </section>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto border border-amber-200">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Không tìm thấy khóa học phù hợp</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Không có khóa học nào khớp với các tiêu chí tìm kiếm hiện tại của bạn. Vui lòng thử tìm từ khóa khác hoặc xóa bộ lọc.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>Xem tất cả khóa học</span>
            </button>
          </div>
        )}
      </main>

      {/* 5. Course Detail Modal */}
      <CourseModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};
