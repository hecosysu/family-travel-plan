import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Globe, Calendar, MapPin, Heart } from 'lucide-react';
import { tripsData, getTripsByPhase } from '../data/trips';

const stats = [
  { icon: Calendar, label: '计划年数', value: '30年' },
  { icon: MapPin, label: '目的地', value: '60个' },
  { icon: Globe, label: '覆盖大洲', value: '5个' },
  { icon: Heart, label: '年度预算', value: '4万元' },
];

export default function Home() {
  const { phase1, phase2 } = getTripsByPhase();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4A574]/10 via-transparent to-[#D4A574]/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-[#D4A574]/10 text-[#D4A574] text-sm font-medium mb-6">
                2026 - 2055
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#2C2C2C] mb-6 leading-tight"
            >
              我们的30年
              <br />
              <span className="text-[#D4A574]">世界旅行计划</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-[#2C2C2C]/70 mb-8 leading-relaxed"
            >
              为一家三口（夫妻37岁、女儿4岁）规划的30年环球旅行，
              <br className="hidden md:block" />
              探索60个精彩目的地，创造一生的美好回忆。
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/timeline">
                <button className="btn-primary flex items-center justify-center gap-2">
                  查看时间线
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/export">
                <button className="btn-secondary">导出计划</button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-[#FAFAF8] border-y border-[#E8E8E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#D4A574]/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#D4A574]" />
                  </div>
                  <div className="font-display text-2xl font-bold text-[#2C2C2C]">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#2C2C2C]/60">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Phases Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-[#2C2C2C] mb-4">
              旅行阶段
            </h2>
            <p className="text-[#2C2C2C]/70 max-w-2xl mx-auto">
              我们的旅行计划分为两个阶段，根据女儿的成长调整旅行方式
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Phase 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="card p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center text-white font-display text-2xl font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-[#2C2C2C]">
                    第一阶段：家庭三人旅行
                  </h3>
                  <p className="text-[#2C2C2C]/60">2026-2040年</p>
                </div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span className="text-[#2C2C2C]/70">女儿年龄：4-18岁</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span className="text-[#2C2C2C]/70">旅行特点：家庭互动、儿童友好</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span className="text-[#2C2C2C]/70">目的地数量：{phase1.length}个</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {phase1.slice(0, 6).map((trip) => (
                  <span
                    key={trip.id}
                    className="px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-xs"
                  >
                    {trip.destinationName}
                  </span>
                ))}
                <span className="px-3 py-1 bg-[#2C2C2C]/5 text-[#2C2C2C]/60 rounded-full text-xs">
                  +{phase1.length - 6}个
                </span>
              </div>
            </motion.div>

            {/* Phase 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="card p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center text-white font-display text-2xl font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-[#2C2C2C]">
                    第二阶段：夫妻两人旅行
                  </h3>
                  <p className="text-[#2C2C2C]/60">2041-2055年</p>
                </div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-[#2C2C2C]/70">夫妻年龄：55-69岁</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-[#2C2C2C]/70">旅行特点：深度文化、舒适体验</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-[#2C2C2C]/70">目的地数量：{phase2.length}个</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {phase2.slice(0, 6).map((trip) => (
                  <span
                    key={trip.id}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                  >
                    {trip.destinationName}
                  </span>
                ))}
                <span className="px-3 py-1 bg-[#2C2C2C]/5 text-[#2C2C2C]/60 rounded-full text-xs">
                  +{phase2.length - 6}个
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-[#2C2C2C] mb-4">
              精选目的地
            </h2>
            <p className="text-[#2C2C2C]/70 max-w-2xl mx-auto">
              从我们60个精心选择的目的地中，挑选一些特别精彩的地方
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tripsData.slice(0, 6).map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <Link href={`/trip/${trip.id}`}>
                  <div className="card cursor-pointer group">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={trip.photos[0]}
                        alt={trip.destinationName}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[#D4A574] font-medium">
                          {trip.year}年
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          trip.destinationType === 'culture'
                            ? 'bg-purple-100 text-purple-700'
                            : trip.destinationType === 'nature'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {trip.destinationType === 'culture'
                            ? '文化'
                            : trip.destinationType === 'nature'
                            ? '自然'
                            : '混合'}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-[#2C2C2C] mb-2">
                        {trip.destinationName}
                      </h3>
                      <p className="text-sm text-[#2C2C2C]/60 line-clamp-2">
                        {trip.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/timeline">
              <button className="btn-primary flex items-center gap-2 mx-auto">
                查看全部目的地
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
