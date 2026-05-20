import { motion } from 'framer-motion';
import { Heart, Map, Calendar, Users, Target, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Map,
    title: '60个精选目的地',
    description: '覆盖五大洲，从亚洲到欧洲，从美洲到非洲，精选最值得探索的地方',
  },
  {
    icon: Calendar,
    title: '30年长期规划',
    description: '从2026年到2055年，根据家庭不同阶段的需求，科学规划旅行节奏',
  },
  {
    icon: Users,
    title: '家庭为中心',
    description: '第一阶段适合亲子旅行，第二阶段适合夫妻深度探索',
  },
  {
    icon: Target,
    title: '合理预算规划',
    description: '每年4万元预算，平衡旅行品质和经济实惠',
  },
  {
    icon: Sparkles,
    title: '丰富的亮点推荐',
    description: '每个目的地都有3-5个精选亮点，深入了解当地特色',
  },
  {
    icon: Heart,
    title: '记录美好回忆',
    description: '支持添加评论、记录和照片，保存每一段旅程的珍贵记忆',
  },
];

const budgetBreakdown = [
  { item: '机票', percentage: 40, amount: 16000, color: 'bg-blue-400' },
  { item: '住宿', percentage: 35, amount: 14000, color: 'bg-green-400' },
  { item: '餐饮', percentage: 15, amount: 6000, color: 'bg-orange-400' },
  { item: '活动与门票', percentage: 8, amount: 3200, color: 'bg-purple-400' },
  { item: '其他杂费', percentage: 2, amount: 800, color: 'bg-gray-400' },
];

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-8"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="font-display text-3xl font-bold text-[#2C2C2C] mb-4">
              关于我们的旅行计划
            </h1>
            <p className="text-[#2C2C2C]/70 max-w-2xl mx-auto">
              这是一个为一个三口之家规划的30年世界旅行计划，记录我们对世界的向往和探索的决心
            </p>
          </motion.div>
        </div>

        {/* Family Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-8 mb-12"
        >
          <h2 className="font-display text-xl font-bold text-[#2C2C2C] mb-6 text-center">
            我们的家庭
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center text-white text-2xl">
                👨
              </div>
              <h3 className="font-medium text-[#2C2C2C]">爸爸</h3>
              <p className="text-sm text-[#2C2C2C]/60">37岁 · 旅行规划师</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-2xl">
                👩
              </div>
              <h3 className="font-medium text-[#2C2C2C]">妈妈</h3>
              <p className="text-sm text-[#2C2C2C]/60">37岁 · 摄影爱好者</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white text-2xl">
                👧
              </div>
              <h3 className="font-medium text-[#2C2C2C]">女儿</h3>
              <p className="text-sm text-[#2C2C2C]/60">4岁 · 小小探险家</p>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="font-display text-xl font-bold text-[#2C2C2C] mb-6 text-center">
            计划特色
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="card p-6"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#D4A574]/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#D4A574]" />
                  </div>
                  <h3 className="font-medium text-[#2C2C2C] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#2C2C2C]/60">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Budget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card p-8 mb-12"
        >
          <h2 className="font-display text-xl font-bold text-[#2C2C2C] mb-6 text-center">
            年度预算分配
          </h2>
          <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="text-4xl font-display font-bold text-[#D4A574]">
                ¥40,000
              </div>
              <div className="text-[#2C2C2C]/60">年度旅行预算</div>
            </div>
            <div className="space-y-3">
              {budgetBreakdown.map((item) => (
                <div key={item.item} className="flex items-center gap-4">
                  <div className="w-24 text-sm text-[#2C2C2C]/70">{item.item}</div>
                  <div className="flex-1 h-8 bg-[#F5F1ED] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} flex items-center justify-end px-2`}
                      style={{ width: `${item.percentage}%` }}
                    >
                      <span className="text-xs text-white font-medium">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="w-20 text-right text-sm text-[#2C2C2C]/70">
                    ¥{item.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="card p-8"
        >
          <h2 className="font-display text-xl font-bold text-[#2C2C2C] mb-6 text-center">
            我们的旅行理念
          </h2>
          <div className="prose prose-sm max-w-none text-[#2C2C2C]/70">
            <p className="mb-4">
              旅行不仅是看风景，更是一种生活方式。我们希望通过30年的旅行计划，让女儿在成长过程中开阔眼界、了解世界，也让我们夫妻在退休后继续探索未知。
            </p>
            <p className="mb-4">
              这个计划不是一成不变的，而是随着我们的生活变化而调整的。重要的是保持对世界的好奇心和探索的勇气。
            </p>
            <p>
              我们相信，最好的教育在路上，最好的回忆在旅途中。愿这个30年的旅行计划能够如期实现，也愿每一个目的地都能给我们带来惊喜和感动。
            </p>
          </div>
        </motion.div>

        {/* Footer Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <blockquote className="font-display text-xl text-[#2C2C2C]/80 italic">
            "旅行不在于目的地，而在于沿途的风景和看风景的心情。"
          </blockquote>
        </motion.div>
      </div>
    </motion.div>
  );
}
