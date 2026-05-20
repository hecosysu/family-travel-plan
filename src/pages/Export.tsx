import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, FileCode, Check, Loader2 } from 'lucide-react';
import { tripsData, getTripsByYear } from '../data/trips';

export default function Export() {
  const [exportFormat, setExportFormat] = useState<'pdf' | 'html'>('pdf');
  const [exportScope, setExportScope] = useState<'all' | 'phase1' | 'phase2'>('all');
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let tripsToExport = tripsData;
    if (exportScope === 'phase1') {
      tripsToExport = tripsData.filter(trip => trip.year >= 2026 && trip.year <= 2040);
    } else if (exportScope === 'phase2') {
      tripsToExport = tripsData.filter(trip => trip.year >= 2041 && trip.year <= 2055);
    }

    if (exportFormat === 'html') {
      // Generate HTML content
      const htmlContent = generateHTML(tripsToExport);
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `家庭旅行计划_${exportScope}_${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // For PDF, we'll generate HTML that can be printed to PDF
      const htmlContent = generatePrintableHTML(tripsToExport);
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.print();
      }
    }

    setIsExporting(false);
    setExportComplete(true);
    setTimeout(() => setExportComplete(false), 3000);
  };

  const generateHTML = (trips: typeof tripsData) => {
    const tripsByYear = getTripsByYear();
    
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>家庭世界旅行计划</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #2C2C2C;
      background: #F5F1ED;
      padding: 40px 20px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    h1 {
      font-family: Georgia, serif;
      font-size: 2.5rem;
      color: #2C2C2C;
      text-align: center;
      margin-bottom: 10px;
    }
    .subtitle {
      text-align: center;
      color: #666;
      margin-bottom: 40px;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-bottom: 40px;
      padding: 20px;
      background: #FAFAF8;
      border-radius: 12px;
    }
    .stat {
      text-align: center;
    }
    .stat-value {
      font-size: 1.5rem;
      font-weight: bold;
      color: #D4A574;
    }
    .stat-label {
      font-size: 0.875rem;
      color: #666;
    }
    .year-section {
      margin-bottom: 30px;
    }
    .year-header {
      font-family: Georgia, serif;
      font-size: 1.5rem;
      color: #2C2C2C;
      padding-bottom: 10px;
      border-bottom: 2px solid #D4A574;
      margin-bottom: 20px;
    }
    .trip {
      margin-bottom: 30px;
      padding: 20px;
      background: #FAFAF8;
      border-radius: 12px;
      border-left: 4px solid #D4A574;
    }
    .trip-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .trip-name {
      font-family: Georgia, serif;
      font-size: 1.25rem;
      font-weight: bold;
      color: #2C2C2C;
    }
    .trip-type {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 500;
    }
    .trip-type.culture { background: #f3e8ff; color: #7c3aed; }
    .trip-type.nature { background: #dcfce7; color: #16a34a; }
    .trip-type.mixed { background: #dbeafe; color: #2563eb; }
    .trip-info {
      display: flex;
      gap: 20px;
      margin-bottom: 15px;
      font-size: 0.875rem;
      color: #666;
    }
    .trip-description {
      color: #444;
      margin-bottom: 15px;
      line-height: 1.8;
    }
    .trip-appeal {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-bottom: 15px;
    }
    .appeal-box {
      padding: 12px;
      background: white;
      border-radius: 8px;
    }
    .appeal-title {
      font-weight: 600;
      font-size: 0.875rem;
      color: #D4A574;
      margin-bottom: 5px;
    }
    .appeal-text {
      font-size: 0.8rem;
      color: #666;
    }
    .highlights {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .highlight {
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.75rem;
      border: 1px solid;
    }
    .highlight.architecture { background: #dbeafe; color: #1d4ed8; border-color: #bfdbfe; }
    .highlight.nature { background: #dcfce7; color: #15803d; border-color: #bbf7d0; }
    .highlight.culture { background: #f3e8ff; color: #7c3aed; border-color: #e9d5ff; }
    .highlight.food { background: #ffedd5; color: #c2410c; border-color: #fed7aa; }
    .highlight.landmark { background: #fee2e2; color: #dc2626; border-color: #fecaca; }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #E8E8E8;
      color: #999;
      font-size: 0.875rem;
    }
    @media print {
      body { background: white; padding: 0; }
      .container { box-shadow: none; max-width: 100%; }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>家庭世界旅行计划</h1>
    <p class="subtitle">2026-2055 · 30年环球之旅</p>
    
    <div class="stats">
      <div class="stat">
        <div class="stat-value">30年</div>
        <div class="stat-label">计划年数</div>
      </div>
      <div class="stat">
        <div class="stat-value">${trips.length}个</div>
        <div class="stat-label">目的地</div>
      </div>
      <div class="stat">
        <div class="stat-value">5个</div>
        <div class="stat-label">覆盖大洲</div>
      </div>
      <div class="stat">
        <div class="stat-value">4万元</div>
        <div class="stat-label">年度预算</div>
      </div>
    </div>

    ${Object.entries(tripsByYear)
      .filter(([year]) => trips.some(t => t.year === parseInt(year)))
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .map(([year, yearTrips]) => `
        <div class="year-section">
          <h2 class="year-header">${year}年</h2>
          ${yearTrips.map(trip => `
            <div class="trip">
              <div class="trip-header">
                <div class="trip-name">${trip.destinationName}</div>
                <span class="trip-type ${trip.destinationType}">
                  ${trip.destinationType === 'culture' ? '文化' : trip.destinationType === 'nature' ? '自然' : '混合'}
                </span>
              </div>
              <div class="trip-info">
                <span>📅 ${trip.season}</span>
                <span>💰 预算 ¥${trip.budget.toLocaleString()}</span>
              </div>
              <p class="trip-description">${trip.description}</p>
              <div class="trip-appeal">
                <div class="appeal-box">
                  <div class="appeal-title">对父母的吸引力</div>
                  <div class="appeal-text">${trip.appealToParents}</div>
                </div>
                <div class="appeal-box">
                  <div class="appeal-title">对女儿的吸引力</div>
                  <div class="appeal-text">${trip.appealToDaughter}</div>
                </div>
              </div>
              <div class="highlights">
                ${trip.highlights.map(h => `
                  <span class="highlight ${h.type}">
                    ${h.type === 'architecture' ? '建筑' : h.type === 'nature' ? '自然' : h.type === 'culture' ? '文化' : h.type === 'food' ? '美食' : '地标'} · ${h.title}
                  </span>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      `).join('')}

    <div class="footer">
      <p>用 ❤️ 打造的30年旅行计划</p>
      <p>导出时间：${new Date().toLocaleString('zh-CN')}</p>
    </div>
  </div>
</body>
</html>`;
  };

  const generatePrintableHTML = (trips: typeof tripsData) => {
    return generateHTML(trips);
  };

  const getScopeLabel = () => {
    switch (exportScope) {
      case 'phase1':
        return '第一阶段（2026-2040）';
      case 'phase2':
        return '第二阶段（2041-2055）';
      default:
        return '全部计划（2026-2055）';
    }
  };

  const getTripCount = () => {
    switch (exportScope) {
      case 'phase1':
        return 30;
      case 'phase2':
        return 30;
      default:
        return 60;
    }
  };

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
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl font-bold text-[#2C2C2C] mb-2">
            导出旅行计划
          </h1>
          <p className="text-[#2C2C2C]/70">
            将您的旅行计划导出为PDF或HTML格式
          </p>
        </div>

        {/* Export Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Format Selection */}
          <div className="card p-6">
            <h2 className="font-display text-lg font-bold text-[#2C2C2C] mb-4">
              选择格式
            </h2>
            <div className="space-y-3">
              <button
                onClick={() => setExportFormat('pdf')}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  exportFormat === 'pdf'
                    ? 'border-[#D4A574] bg-[#D4A574]/5'
                    : 'border-[#E8E8E8] hover:border-[#D4A574]/50'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  exportFormat === 'pdf' ? 'bg-[#D4A574]' : 'bg-[#2C2C2C]/5'
                }`}>
                  <FileText className={`w-6 h-6 ${
                    exportFormat === 'pdf' ? 'text-white' : 'text-[#2C2C2C]/60'
                  }`} />
                </div>
                <div className="text-left">
                  <div className="font-medium text-[#2C2C2C]">PDF 文档</div>
                  <div className="text-sm text-[#2C2C2C]/60">适合打印和分享</div>
                </div>
              </button>

              <button
                onClick={() => setExportFormat('html')}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  exportFormat === 'html'
                    ? 'border-[#D4A574] bg-[#D4A574]/5'
                    : 'border-[#E8E8E8] hover:border-[#D4A574]/50'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  exportFormat === 'html' ? 'bg-[#D4A574]' : 'bg-[#2C2C2C]/5'
                }`}>
                  <FileCode className={`w-6 h-6 ${
                    exportFormat === 'html' ? 'text-white' : 'text-[#2C2C2C]/60'
                  }`} />
                </div>
                <div className="text-left">
                  <div className="font-medium text-[#2C2C2C]">HTML 网页</div>
                  <div className="text-sm text-[#2C2C2C]/60">适合在浏览器中查看</div>
                </div>
              </button>
            </div>
          </div>

          {/* Scope Selection */}
          <div className="card p-6">
            <h2 className="font-display text-lg font-bold text-[#2C2C2C] mb-4">
              选择范围
            </h2>
            <div className="space-y-3">
              {[
                { id: 'all', label: '全部计划', desc: '2026-2055年，共60个目的地' },
                { id: 'phase1', label: '第一阶段', desc: '2026-2040年，共30个目的地' },
                { id: 'phase2', label: '第二阶段', desc: '2041-2055年，共30个目的地' },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setExportScope(option.id as typeof exportScope)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    exportScope === option.id
                      ? 'border-[#D4A574] bg-[#D4A574]/5'
                      : 'border-[#E8E8E8] hover:border-[#D4A574]/50'
                  }`}
                >
                  <div className="font-medium text-[#2C2C2C]">{option.label}</div>
                  <div className="text-sm text-[#2C2C2C]/60">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="card p-6 mb-8">
          <h2 className="font-display text-lg font-bold text-[#2C2C2C] mb-4">
            导出摘要
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 bg-[#FAFAF8] rounded-lg">
              <div className="text-sm text-[#2C2C2C]/60 mb-1">导出格式</div>
              <div className="font-medium text-[#2C2C2C]">
                {exportFormat === 'pdf' ? 'PDF 文档' : 'HTML 网页'}
              </div>
            </div>
            <div className="p-4 bg-[#FAFAF8] rounded-lg">
              <div className="text-sm text-[#2C2C2C]/60 mb-1">导出范围</div>
              <div className="font-medium text-[#2C2C2C]">{getScopeLabel()}</div>
            </div>
            <div className="p-4 bg-[#FAFAF8] rounded-lg">
              <div className="text-sm text-[#2C2C2C]/60 mb-1">目的地数量</div>
              <div className="font-medium text-[#2C2C2C]">{getTripCount()} 个</div>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <div className="text-center">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="btn-primary flex items-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                正在导出...
              </>
            ) : exportComplete ? (
              <>
                <Check className="w-4 h-4" />
                导出完成
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                导出 {exportFormat.toUpperCase()}
              </>
            )}
          </button>
          <p className="text-sm text-[#2C2C2C]/50 mt-4">
            {exportFormat === 'pdf' 
              ? '导出后将打开打印对话框，您可以选择保存为PDF' 
              : '导出后将下载HTML文件，可在浏览器中打开'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
