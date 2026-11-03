/**
 * Type definitions for Course and EduLearn Platform
 * MSSV: 6651071041
 */

export type CourseLevel = 'Tất cả trình độ' | 'Cơ bản' | 'Trung cấp' | 'Nâng cao';

export type CourseCategory =
  | 'Lập trình'
  | 'Thiết kế đồ họa'
  | 'Marketing'
  | 'Kinh doanh'
  | 'Ngoại ngữ'
  | 'Công nghệ thông tin';

export interface Instructor {
  name: string;
  role: string;
  avatar: string;
}

export interface CurriculumChapter {
  id: string;
  title: string;
  duration: string;
  lessonsCount: number;
  lessons: string[];
}

export interface Course {
  id: string;
  title: string;
  instructor: Instructor;
  category: CourseCategory;
  shortDescription: string;
  description: string;
  price: number;
  originalPrice: number;
  studentsCount: number;
  rating: number;
  reviewsCount: number;
  duration: string;
  lecturesCount: number;
  level: CourseLevel;
  badge?: string;
  thumbnail: string;
  curriculum: CurriculumChapter[];
  requirements: string[];
  outcomes: string[];
  updatedAt: string;
}

export interface FilterState {
  searchTerm: string;
  category: string;
  level: string;
  priceFilter: 'all' | 'free' | 'paid';
  sortBy: 'featured' | 'rating' | 'price-asc' | 'price-desc' | 'popular';
}
