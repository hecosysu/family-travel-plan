import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Map, Download, Info, Menu, X, Home } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/', label: '首页', icon: Home },
  { href: '/timeline', label: '时间线', icon: Map },
  { href: '/export', label: '导出', icon: Download },
  { href: '/about', label: '关于', icon: Info },
];

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAFAF8]/95 backdrop-blur-sm border-b border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4A574] to-[#c49464] flex items-center justify-center">
                <Map className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-display text-xl font-semibold text-[#2C2C2C]">
                  家庭旅行计划
                </h1>
                <p className="text-xs text-[#2C2C2C]/60">30年环球之旅</p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#D4A574]/10 text-[#D4A574]'
                        : 'text-[#2C2C2C]/70 hover:text-[#2C2C2C] hover:bg-[#2C2C2C]/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#2C2C2C]/70 hover:text-[#2C2C2C] hover:bg-[#2C2C2C]/5"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={{
          height: mobileMenuOpen ? 'auto' : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="md:hidden overflow-hidden bg-[#FAFAF8] border-t border-[#E8E8E8]"
      >
        <nav className="px-4 py-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#D4A574]/10 text-[#D4A574]'
                      : 'text-[#2C2C2C]/70 hover:text-[#2C2C2C] hover:bg-[#2C2C2C]/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </Link>
            );
          })}
        </nav>
      </motion.div>
    </header>
  );
}
