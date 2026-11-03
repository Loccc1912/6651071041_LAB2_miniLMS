import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Heart,
  Facebook,
  Youtube,
  Github,
  Linkedin,
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-10 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 inline-flex" aria-label="EduLearn - Về trang chủ">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Edu<span className="text-emerald-400">Learn</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Nền tảng học trực tuyến hiện đại (mini LMS) cung cấp các khóa học chất lượng cao về Công nghệ thông tin, Lập trình, Thiết kế đồ họa và Marketing thực chiến.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <p className="flex items-center gap-2">
                <span className="font-semibold text-emerald-400">MSSV:</span> 6651071041
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold text-emerald-400">Đề tài:</span> Nền tảng khóa học trực tuyến (mini LMS)
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold text-emerald-400">Màu chủ đạo:</span> Emerald (#059669)
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Danh mục đào tạo</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">
                  Lập trình ứng dụng
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">
                  Thiết kế đồ họa UI/UX
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">
                  Quản trị Kinh doanh
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">
                  Ngoại ngữ chuyên ngành
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Hỗ trợ & Chính sách</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-emerald-400 transition-colors">
                  Khóa học đã lưu
                </Link>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer transition-colors">
                  Câu hỏi thường gặp (FAQ)
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer transition-colors">
                  Chính sách hoàn tiền
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-white cursor-pointer transition-colors">
                  Điều khoản dịch vụ
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Thông tin liên hệ</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Trường Đại học Giao thông Vận tải - Phân hiệu tại TP.HCM (UTC2)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>contact@edulearn.vn</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>(+84) 987 654 321</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="EduLearn trên Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="EduLearn trên Youtube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Mã nguồn EduLearn trên GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="EduLearn trên LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026 EduLearn. Bản quyền thuộc về sinh viên MSSV: <span className="text-slate-300 font-semibold">6651071041</span>. Môn học Thiết kế Web.
          </p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Xây dựng với</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>bằng React 18, TypeScript & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
