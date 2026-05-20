import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import {
  Grid3X3,
  Clock,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  Filter,
} from 'lucide-react';
import {
  tripsData,
  getTripsByYear,
  gradientColors,
  highlightLabels,
  highlightColors,
  Trip,
} from '../data/trips';

type ViewMode = 'timeline' | 'grid';
type FilterType = 'all' | 'culture' | 'nature' | 'mixed';

function TripCard({ trip, index }: { trip: Trip; index: number }) {
  const gradientColor = gradientColors[index % gradientColors.length];

  return (
    <Link href={`/trip/${trip.id}`}>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ y: -4 }}
        className="card cursor-pointer group"
      >
        {/* Gradient Header */}
        <div className={`h-24 bg-gradient-to-r ${gradientColor} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="font-display text-xl font-bold">{trip.destinationName}</h3>
            <p className="text-white/80 text-sm">{trip.year}年</p>
          </div>
          <div className="absolute top-4 right-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm`}>
              {trip.destinationType === 'culture'
                ? '文化'
                : trip.destinationType === 'nature'
                ? '自然'
                : '混合'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-sm text-[#2C2C2C]/70 line-clamp-2 mb-4">
            {trip.description}
          </p>

          {/* Info */}
          <div className="flex items-center gap-4 text-xs text-[#2C2C2C]/60 mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{trip.season}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>预算 ¥{trip.budget.toLocaleString()}</span>
            </div>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap gap-1">
            {trip.highlights.slice(0, 3).map((highlight, idx) => (
              <span
                key={idx}
                className={`px-2 py-1 rounded-full text-xs border ${highlightColors[highlight.type]}`}
              >
                {highlightLabels[highlight.type]}
              </span>
            ))}
            {trip.highlights.length > 3 && (
              <span className="px-2 py-1 rounded-full text-xs bg-[#2C2C2C]/5 text-[#2C2C2C]/60">
                +{trip.highlights.length - 3}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

function TimelineYear({
  year,
  trips,
  isExpanded,
  onToggle,
}: {
  year: number;
  trips: Trip[];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const isPhase1 = year >= 2026 && year <= 2040;

  return (
    <div className="mb-6">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-[#FAFAF8] rounded-xl border border-[#E8E8E8] hover:border-[#D4A574]/30 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-display font-bold ${
              isPhase1
                ? 'bg-gradient-to-br from-rose-400 to-pink-400'
                : 'bg-gradient-to-br from-blue-400 to-indigo-400'
            }`}
          >
            {year.toString().slice(-2)}
          </div>
          <div className="text-left">
            <h3 className="font-display text-lg font-bold text-[#2C2C2C]">
              {year}年
            </h3>
            <p className="text-sm text-[#2C2C2C]/60">
              {trips.length}个目的地 · {isPhase1 ? '家庭三人旅行' : '夫妻两人旅行'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#2C2C2C]/60 hidden sm:block">
            {isExpanded ? '收起' : '展开'}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-[#2C2C2C]/60" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[#2C2C2C]/60" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {trips.map((trip) => (
                <TripCard key={trip.id} trip={trip} index={parseInt(trip.id)} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Timeline() {
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');
  const [filter, setFilter] = useState<FilterType>('all');
  const [expandedYears, setExpandedYears] = useState<number[]>([2026]);
  const tripsByYear = getTripsByYear();

  const filteredTrips =
    filter === 'all'
      ? tripsData
      : tripsData.filter((trip) => trip.destinationType === filter);

  const filteredTripsByYear =
    filter === 'all'
      ? tripsByYear
      : Object.entries(tripsByYear).reduce(
          (acc, [year, trips]) => {
            const filtered = trips.filter((trip) => trip.destinationType === filter);
            if (filtered.length > 0) {
              acc[parseInt(year)] = filtered;
            }
            return acc;
          },
          {} as Record<number, Trip[]>
        );

  const toggleYear = (year: number) => {
    setExpandedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-[#2C2C2C] mb-2">
            旅行时间线
          </h1>
          <p className="text-[#2C2C2C]/70">
            探索我们30年的旅行计划，从2026年到2055年
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-[#FAFAF8] p-1 rounded-lg border border-[#E8E8E8]">
            <button
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                viewMode === 'timeline'
                  ? 'bg-[#D4A574] text-white'
                  : 'text-[#2C2C2C]/70 hover:text-[#2C2C2C]'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">时间线</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#D4A574] text-white'
                  : 'text-[#2C2C2C]/70 hover:text-[#2C2C2C]'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
              <span className="text-sm font-medium">网格</span>
            </button>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#2C2C2C]/60" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as FilterType)}
              className="px-4 py-2 bg-[#FAFAF8] border border-[#E8E8E8] rounded-lg text-sm text-[#2C2C2C] focus:outline-none focus:border-[#D4A574]"
            >
              <option value="all">全部类型</option>
              <option value="culture">文化</option>
              <option value="nature">自然</option>
              <option value="mixed">混合</option>
            </select>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 ml-auto">
            <div className="text-sm text-[#2C2C2C]/60">
              共 <span className="font-bold text-[#2C2C2C]">{filteredTrips.length}</span> 个目的地
            </div>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {viewMode === 'timeline' ? (
            <motion.div
              key="timeline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {Object.entries(filteredTripsByYear)
                .sort(([a], [b]) => parseInt(a) - parseInt(b))
                .map(([year, trips]) => (
                  <TimelineYear
                    key={year}
                    year={parseInt(year)}
                    trips={trips}
                    isExpanded={expandedYears.includes(parseInt(year))}
                    onToggle={() => toggleYear(parseInt(year))}
                  />
                ))}
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredTrips.map((trip, index) => (
                <TripCard key={trip.id} trip={trip} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {filteredTrips.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2C2C2C]/5 flex items-center justify-center">
              <MapPin className="w-8 h-8 text-[#2C2C2C]/30" />
            </div>
            <h3 className="font-display text-lg font-bold text-[#2C2C2C] mb-2">
              没有找到目的地
            </h3>
            <p className="text-[#2C2C2C]/60">尝试调整筛选条件</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
