import { Heart, Map, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2C2C2C] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4A574] to-[#c49464] flex items-center justify-center">
                <Map className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">家庭旅行计划</h3>
                <p className="text-sm text-white/60">30年环球之旅</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              记录我们一家三口的30年世界旅行计划，从2026年到2055年，探索60个精彩目的地。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-white/70 hover:text-[#D4A574] transition-colors">
                  首页
                </a>
              </li>
              <li>
                <a href="/timeline" className="text-white/70 hover:text-[#D4A574] transition-colors">
                  时间线
                </a>
              </li>
              <li>
                <a href="/export" className="text-white/70 hover:text-[#D4A574] transition-colors">
                  导出计划
                </a>
              </li>
              <li>
                <a href="/about" className="text-white/70 hover:text-[#D4A574] transition-colors">
                  关于我们
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">联系我们</h4>
            <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
              <Mail className="w-4 h-4" />
              <span>family.travel@example.com</span>
            </div>
            <p className="text-white/50 text-xs mt-4">
              用 <Heart className="w-3 h-3 inline text-red-400" /> 打造的旅行计划
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/50 text-sm">
          <p>&copy; 2026-2055 家庭世界旅行计划. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  );
}
