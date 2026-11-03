import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  Code2,
  Heart,
  Eye,
  Loader2,
  User,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Intro Banner */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Bài Thực Hành Môn Thiết Kế Web – Buổi 2</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Về Nền Tảng <span className="text-emerald-600">EduLearn</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            EduLearn là sản phẩm web hiện đại được phát triển theo bộ tiêu chuẩn khắt khe về hiệu năng, khả năng tiếp cận (Accessibility WCAG AA) và trải nghiệm người dùng cao cấp.
          </p>
        </div>

        {/* Student Identification Card */}
        <div className="bg-gradient-to-br from-white to-emerald-50/50 rounded-3xl p-6 sm:p-8 border border-emerald-200/80 shadow-md">
          <div className="flex items-center gap-3 pb-4 border-b border-emerald-100 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Thông Tin Bài Thực Hành Cá Nhân</h2>
              <p className="text-xs text-slate-500">Trường Đại học Giao thông Vận tải - Phân hiệu TP.HCM (UTC2)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <div className="text-xs text-slate-400 font-medium">Mã số sinh viên (MSSV)</div>
              <div className="text-lg font-extrabold text-emerald-700 mt-0.5">6651071041</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <div className="text-xs text-slate-400 font-medium">Chủ đề bài làm (D = 1)</div>
              <div className="text-base font-bold text-slate-900 mt-0.5">Khóa học trực tuyến (mini LMS)</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <div className="text-xs text-slate-400 font-medium">Màu chủ đạo (C = 1)</div>
              <div className="text-base font-bold text-emerald-600 mt-0.5 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-600 inline-block shadow-sm" />
                <span>Emerald (#059669)</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <div className="text-xs text-slate-400 font-medium">Biến số S (Tổng các chữ số)</div>
              <div className="text-base font-bold text-slate-900 mt-0.5">
                6+6+5+1+0+7+1+0+4+1 = 31
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <div className="text-xs text-slate-400 font-medium">Biến số D (S mod 15)</div>
              <div className="text-base font-bold text-slate-900 mt-0.5">31 mod 15 = 1 (Bảng 1, dòng 1)</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <div className="text-xs text-slate-400 font-medium">Biến số F (2 số cuối mod 10)</div>
              <div className="text-base font-bold text-slate-900 mt-0.5">41 mod 10 = 1 (Bảng 2, dòng 1)</div>
            </div>
          </div>
        </div>

        {/* 3 Mandatory Features Overview */}
        <div className="space-y-6">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-slate-900">Ba Tính Năng Bắt Buộc Theo Đề Bài</h2>
            <p className="text-sm text-slate-500 mt-1">
              Được hiện thực hóa trọn vẹn theo đúng yêu cầu biến thể F = 1.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:border-emerald-200 transition-colors space-y-3">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                <Heart className="w-6 h-6 fill-rose-500" />
              </div>
              <h3 className="text-base font-bold text-slate-900">1. Yêu Thích (Favorites)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Lưu danh sách khóa học vào <code className="text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded font-mono">localStorage</code>. Trạng thái icon trái tim cập nhật trực quan tức thì, có thông báo Toast sinh động và khôi phục nguyên vẹn khi tải lại trang.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:border-emerald-200 transition-colors space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">2. Modal Chi Tiết</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cửa sổ hiển thị thông tin khóa học ở giữa màn hình. Đóng dễ dàng qua nút đóng, nhấn bên ngoài overlay hoặc phím <kbd className="bg-slate-100 border px-1 rounded text-slate-700 font-mono">ESC</kbd>. Tích hợp cơ chế Focus Trap chống thoát focus ra ngoài.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:border-emerald-200 transition-colors space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Loader2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">3. Skeleton Loading</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hiệu ứng chuyển động Shimmer mô phỏng chính xác khung Card thật trong lúc chờ tải dữ liệu. Giúp giao diện mượt mà, chuyên nghiệp và tránh hiện tượng màn hình trống gây khó chịu cho người dùng.
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack Highlights */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-emerald-600" />
            <span>Công Nghệ Bắt Buộc Áp Dụng</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-xs font-medium text-slate-700">
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>React 18 Hooks</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>TypeScript Strict</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Tailwind CSS</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>React Router v6</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Vitest Unit Test</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>ESLint Clean Code</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Context API State</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>WCAG AA Accessibility</span>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-600/25 transition-all hover:-translate-y-0.5"
          >
            <span>Trải nghiệm EduLearn ngay</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
