import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import {
  GraduationCap,
  Heart,
  Menu,
  X,
  User,
  BookOpen,
  Info,
} from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { favoriteIds } = useFavorites();

  const navLinks = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Khóa học', path: '/', hash: '#courses-section' },
    { name: 'Yêu thích', path: '/favorites', badge: favoriteIds.length },
    { name: 'Giới thiệu', path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg p-1"
            aria-label="EduLearn - Về trang chủ"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  Edu<span className="text-emerald-600">Learn</span>
                </span>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  LMS
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block -mt-0.5 font-medium tracking-wide">
                Nền tảng tri thức số
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Điều hướng chính">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path + (link.hash || '')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all relative ${
                    active
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.name === 'Yêu thích' && <Heart className="w-4 h-4 text-rose-500" />}
                    {link.name === 'Khóa học' && <BookOpen className="w-4 h-4 text-slate-400" />}
                    {link.name === 'Giới thiệu' && <Info className="w-4 h-4 text-slate-400" />}
                    <span>{link.name}</span>
                    {link.badge !== undefined && link.badge > 0 && (
                      <span className="ml-1 px-1.5 py-0.2 text-[11px] font-bold rounded-full bg-rose-500 text-white animate-pulse">
                        {link.badge}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/favorites"
              className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-colors relative"
              aria-label={`Xem danh sách khóa học yêu thích (${favoriteIds.length} khóa)`}
            >
              <Heart className={`w-5 h-5 ${favoriteIds.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favoriteIds.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {favoriteIds.length}
                </span>
              )}
            </Link>

            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <User className="w-4 h-4 text-emerald-600" />
              <span>Đăng nhập</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/favorites"
              className="p-2 rounded-lg text-slate-600 relative hover:text-rose-600"
              aria-label="Khóa học yêu thích"
            >
              <Heart className={`w-6 h-6 ${favoriteIds.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favoriteIds.length > 0 && (
                <span className="absolute 0 top-0.5 right-0.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {favoriteIds.length}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu điều hướng'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg animate-fade-in">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path + (link.hash || '')}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium ${
                  active
                    ? 'bg-emerald-50 text-emerald-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{link.name}</span>
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-500 text-white">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-100">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Đăng nhập tài khoản</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
