import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRoute, Link } from 'wouter';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Wallet,
  Tag,
  ExternalLink,
  MessageSquare,
  BookOpen,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  getTripById,
  gradientColors,
  highlightColors,
  highlightLabels,
} from '../data/trips';

export default function TripDetail() {
  const [, params] = useRoute('/trip/:id');
  const trip = params?.id ? getTripById(params.id) : null;
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'comments' | 'records'>('overview');

  if (!trip) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-[#2C2C2C] mb-2">
            目的地未找到
          </h1>
          <Link href="/timeline">
            <button className="btn-primary mt-4">返回时间线</button>
          </Link>
        </div>
      </div>
    );
  }

  const gradientColor = gradientColors[parseInt(trip.id) % gradientColors.length];

  const nextPhoto = () => {
    setActivePhotoIndex((prev) => (prev + 1) % trip.photos.length);
  };

  const prevPhoto = () => {
    setActivePhotoIndex((prev) => (prev - 1 + trip.photos.length) % trip.photos.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <div className={`relative h-[50vh] bg-gradient-to-r ${gradientColor}`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10">
          <Link href="/timeline">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>返回</span>
            </button>
          </Link>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm">
                  {trip.year}年
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  trip.destinationType === 'culture'
                    ? 'bg-purple-500/80 text-white'
                    : trip.destinationType === 'nature'
                    ? 'bg-green-500/80 text-white'
                    : 'bg-blue-500/80 text-white'
                }`}>
                  {trip.destinationType === 'culture'
                    ? '文化'
                    : trip.destinationType === 'nature'
                    ? '自然'
                    : '混合'}
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
                {trip.destinationName}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card p-6"
            >
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D4A574]/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-[#D4A574]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#2C2C2C]/60">推荐季节</p>
                    <p className="font-medium text-[#2C2C2C]">{trip.season}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D4A574]/10 flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-[#D4A574]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#2C2C2C]/60">年度预算</p>
                    <p className="font-medium text-[#2C2C2C]">¥{trip.budget.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D4A574]/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#D4A574]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#2C2C2C]/60">旅行状态</p>
                    <p className="font-medium text-[#2C2C2C]">
                      {trip.status === 'planned'
                        ? '计划中'
                        : trip.status === 'completed'
                        ? '已完成'
                        : '已取消'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-[#E8E8E8]">
              {[
                { id: 'overview', label: '概览', icon: BookOpen },
                { id: 'comments', label: '评论', icon: MessageSquare },
                { id: 'records', label: '记录', icon: ImageIcon },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-[#D4A574] text-[#D4A574]'
                        : 'border-transparent text-[#2C2C2C]/60 hover:text-[#2C2C2C]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Description */}
                  <div className="card p-6">
                    <h2 className="font-display text-xl font-bold text-[#2C2C2C] mb-4">
                      目的地介绍
                    </h2>
                    <p className="text-[#2C2C2C]/80 leading-relaxed">
                      {trip.description}
                    </p>
                  </div>

                  {/* Appeal */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="card p-6">
                      <h3 className="font-display text-lg font-bold text-[#2C2C2C] mb-3">
                        对父母的吸引力
                      </h3>
                      <p className="text-[#2C2C2C]/70 text-sm">
                        {trip.appealToParents}
                      </p>
                    </div>
                    <div className="card p-6">
                      <h3 className="font-display text-lg font-bold text-[#2C2C2C] mb-3">
                        对女儿的吸引力
                      </h3>
                      <p className="text-[#2C2C2C]/70 text-sm">
                        {trip.appealToDaughter}
                      </p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="card p-6">
                    <h2 className="font-display text-xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
                      <Tag className="w-5 h-5 text-[#D4A574]" />
                      亮点推荐
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {trip.highlights.map((highlight, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(highlight.url, '_blank', 'noopener,noreferrer');
                          }}
                          className={`flex items-center justify-between p-3 rounded-lg border ${highlightColors[highlight.type]} hover:shadow-md transition-all group cursor-pointer text-left`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-sm font-medium shrink-0">
                              {highlightLabels[highlight.type]}
                            </span>
                            <span className="text-[#2C2C2C]/70 truncate">{highlight.title}</span>
                          </div>
                          <ExternalLink className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'comments' && (
                <div className="card p-6">
                  <div className="text-center py-12">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 text-[#2C2C2C]/20" />
                    <h3 className="font-display text-lg font-bold text-[#2C2C2C] mb-2">
                      暂无评论
                    </h3>
                    <p className="text-[#2C2C2C]/60 text-sm">
                      旅行完成后可以添加评论
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'records' && (
                <div className="card p-6">
                  <div className="text-center py-12">
                    <ImageIcon className="w-12 h-12 mx-auto mb-4 text-[#2C2C2C]/20" />
                    <h3 className="font-display text-lg font-bold text-[#2C2C2C] mb-2">
                      暂无记录
                    </h3>
                    <p className="text-[#2C2C2C]/60 text-sm">
                      旅行完成后可以添加照片和记录
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Photo Gallery */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="card overflow-hidden"
            >
              {/* Main Photo */}
              <div className="relative aspect-[4/3]">
                <img
                  src={trip.photos[activePhotoIndex]}
                  alt={`${trip.destinationName} - ${activePhotoIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                
                {/* Navigation */}
                <button
                  onClick={prevPhoto}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Counter */}
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/50 text-white text-xs rounded-full">
                  {activePhotoIndex + 1} / {trip.photos.length}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="p-4">
                <div className="grid grid-cols-5 gap-2">
                  {trip.photos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setActivePhotoIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                        index === activePhotoIndex
                          ? 'border-[#D4A574]'
                          : 'border-transparent hover:border-[#D4A574]/50'
                      }`}
                    >
                      <img
                        src={photo}
                        alt={`${trip.destinationName} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="card p-6"
            >
              <h3 className="font-display text-lg font-bold text-[#2C2C2C] mb-4">
                快速操作
              </h3>
              <div className="space-y-3">
                <Link href="/export">
                  <button className="w-full btn-secondary flex items-center justify-center gap-2">
                    导出计划
                  </button>
                </Link>
                <Link href="/timeline">
                  <button className="w-full btn-secondary flex items-center justify-center gap-2">
                    查看全部目的地
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
