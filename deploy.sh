#!/bin/bash

# 家庭世界旅行计划网站 - 快速部署脚本
# 使用方法: ./deploy.sh

echo "🚀 开始部署家庭世界旅行计划网站..."

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请在项目根目录运行此脚本"
    exit 1
fi

# 检查git是否初始化
if [ ! -d ".git" ]; then
    echo "📦 初始化Git仓库..."
    git init
    git config user.email "family.travel@example.com"
    git config user.name "Family Travel"
fi

# 安装依赖
echo "📥 安装依赖..."
npm install

# 构建项目
echo "🔨 构建项目..."
npm run build

# 检查构建是否成功
if [ ! -d "dist" ]; then
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi

echo "✅ 构建成功！"

# 询问部署方式
echo ""
echo "请选择部署方式："
echo "1) GitHub Pages (推荐 - 免费且自动部署)"
echo "2) Netlify (拖拽部署)"
echo "3) 仅本地预览"
read -p "请输入选项 (1-3): " choice

case $choice in
    1)
        echo ""
        echo "📤 部署到 GitHub Pages..."
        echo ""
        echo "请确保你已经："
        echo "1. 在 GitHub 创建了名为 'family-travel-plan' 的仓库"
        echo "2. 仓库设置为 Public"
        echo ""
        read -p "请输入你的 GitHub 用户名: " username
        
        # 添加远程仓库
        git remote remove origin 2>/dev/null
        git remote add origin "https://github.com/$username/family-travel-plan.git"
        
        # 提交代码
        git add .
        git commit -m "Update website" || true
        
        # 推送
        git branch -M main
        git push -u origin main || {
            echo "❌ 推送失败，请检查："
            echo "1. 仓库是否存在"
            echo "2. 是否有权限"
            echo "3. 网络连接"
            exit 1
        }
        
        echo ""
        echo "✅ 代码已推送到 GitHub！"
        echo ""
        echo "接下来请："
        echo "1. 访问 https://github.com/$username/family-travel-plan"
        echo "2. 点击 Settings → Pages"
        echo "3. Source 选择 GitHub Actions"
        echo "4. 等待 1-2 分钟后访问 https://$username.github.io/family-travel-plan"
        ;;
        
    2)
        echo ""
        echo "📦 准备 Netlify 部署包..."
        echo ""
        echo "请执行以下步骤："
        echo "1. 访问 https://app.netlify.com/drop"
        echo "2. 将 'dist' 文件夹拖拽到网页上"
        echo "3. 网站将立即上线"
        echo ""
        echo "dist 文件夹位置: $(pwd)/dist"
        ;;
        
    3)
        echo ""
        echo "🖥️  启动本地服务器..."
        cd dist
        python3 -m http.server 8080 &
        SERVER_PID=$!
        echo ""
        echo "✅ 本地服务器已启动！"
        echo "🌐 访问地址: http://localhost:8080"
        echo ""
        echo "按 Ctrl+C 停止服务器"
        wait $SERVER_PID
        ;;
        
    *)
        echo "❌ 无效选项"
        exit 1
        ;;
esac

echo ""
echo "🎉 完成！"
