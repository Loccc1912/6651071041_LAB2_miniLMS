import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Star, Award, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-slate-50 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-100">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-200/20 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-semibold shadow-sm border border-emerald-200/80">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Nền Tảng Đào Tạo Công Nghệ Hàng Đầu 2026</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Nâng Tầm Kỹ Năng. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700">
                Khai Phóng Tương Lai
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Khám phá hàng chục khóa học chất lượng cao từ các chuyên gia đầu ngành. 
              Lộ trình bài bản từ Zero đến Master về Lập trình, Thiết kế UI/UX, Marketing và Ngoại ngữ thực chiến.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                type="button"
                onClick={onExploreClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-600/25 transition-all hover:-translate-y-0.5 hover:shadow-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none flex items-center justify-center gap-2"
              >
                <span>Khám phá khóa học ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/favorites"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold border border-slate-200 shadow-sm transition-all hover:border-emerald-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none flex items-center justify-center gap-2"
              >
                <PlayCircle className="w-4 h-4 text-emerald-600" />
                <span>Khóa học đã lưu</span>
              </Link>
            </div>

            {/* Social Proof & Rating */}
            <div className="pt-6 border-t border-slate-200/70 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-600">
              <div className="flex items-center -space-x-2">
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                  alt="Học viên EduLearn"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                  alt="Học viên EduLearn"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80"
                  alt="Học viên EduLearn"
                />
                <div className="h-9 w-9 rounded-full ring-2 ring-white bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                  +12k
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="font-bold text-slate-800 ml-1">4.9 / 5.0</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Từ hơn 12.000+ học viên trên toàn quốc</p>
              </div>
            </div>
          </div>

          {/* Right Visual Image & Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Photo Card */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                  alt="Nhóm sinh viên học tập trực tuyến cùng EduLearn"
                  className="w-full h-[380px] sm:h-[440px] object-cover"
                />
              </div>

              {/* Floating Badge 1 - Top Left */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce-slow">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Cam kết chất lượng</div>
                  <div className="text-[11px] text-slate-500">Giáo trình chuẩn quốc tế</div>
                </div>
              </div>

              {/* Floating Badge 2 - Bottom Right */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-slate-900">Chứng chỉ uy tín</div>
                  <div className="text-xs text-slate-500">Có giá trị tuyển dụng cao</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Stat Highlights in Grid */}
        <div className="mt-14 pt-10 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 bg-white/60 rounded-2xl border border-slate-100 shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">24+</div>
            <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1">Khóa học chuyên sâu</div>
          </div>
          <div className="p-4 bg-white/60 rounded-2xl border border-slate-100 shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">100%</div>
            <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1">Giảng viên chuyên gia</div>
          </div>
          <div className="p-4 bg-white/60 rounded-2xl border border-slate-100 shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">30.000+</div>
            <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1">Học viên tham gia</div>
          </div>
          <div className="p-4 bg-white/60 rounded-2xl border border-slate-100 shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">98%</div>
            <div className="text-xs sm:text-sm font-medium text-slate-600 mt-1">Hài lòng tuyệt đối</div>
          </div>
        </div>
      </div>
    </section>
  );
};
