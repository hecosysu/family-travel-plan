# 🚀 网站部署指南

## 方法一：GitHub Pages 自动部署（推荐）

### 步骤 1：创建 GitHub 仓库

1. 访问 https://github.com/new
2. 仓库名称填写：`family-travel-plan`
3. 选择 **Public**（公开）
4. 点击 **Create repository**

### 步骤 2：上传代码

在本地项目文件夹中执行：

```bash
# 初始化git（如果还没做）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 连接远程仓库（替换 YOUR_USERNAME 为你的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/family-travel-plan.git

# 推送代码
git branch -M main
git push -u origin main
```

### 步骤 3：启用 GitHub Pages

1. 打开你的仓库页面
2. 点击 **Settings**（设置）
3. 左侧菜单点击 **Pages**
4. **Source** 选择 **GitHub Actions**
5. 保存设置

### 步骤 4：等待部署

- GitHub Actions 会自动构建并部署网站
- 大约 1-2 分钟后，访问 `https://YOUR_USERNAME.github.io/family-travel-plan`

---

## 方法二：手动部署到任何静态托管

### 1. 获取构建文件

构建文件位于 `dist/` 文件夹中：
- `index.html` - 入口文件
- `assets/` - CSS/JS 资源文件

### 2. 上传到托管服务

支持的托管服务：

| 服务 | 网址 | 特点 |
|------|------|------|
| GitHub Pages | github.com | 免费，自动部署 |
| Netlify | netlify.com | 免费，支持自定义域名 |
| Vercel | vercel.com | 免费，快速部署 |
| Cloudflare Pages | pages.cloudflare.com | 免费，全球CDN |
| 腾讯云 COS | cloud.tencent.com | 国内访问快 |
| 阿里云 OSS | aliyun.com | 国内访问快 |

### 3. 以 Netlify 为例

1. 访问 https://app.netlify.com/drop
2. 将 `dist` 文件夹拖拽到网页上
3. 网站立即上线，获得随机域名
4. 可以在设置中修改域名

---

## 方法三：本地预览

### 使用 Python

```bash
cd dist
python3 -m http.server 8080
```

访问 http://localhost:8080

### 使用 Node.js

```bash
npx http-server dist -p 8080
```

### 使用 VS Code

安装 **Live Server** 插件，右键点击 `index.html` 选择 "Open with Live Server"

---

## 🔧 自定义域名（可选）

### GitHub Pages 自定义域名

1. 在 `dist` 文件夹中创建 `CNAME` 文件
2. 文件内容填写你的域名，如：`travel.example.com`
3. 在域名服务商添加 CNAME 记录指向 `YOUR_USERNAME.github.io`

### Netlify/Vercel 自定义域名

1. 在控制台点击 **Domain settings**
2. 点击 **Add custom domain**
3. 输入你的域名并按提示配置 DNS

---

## 📱 分享给朋友

部署完成后，你可以通过以下方式分享：

1. **直接发送链接**：`https://your-domain.com`
2. **生成二维码**：使用 https://cli.im 等工具生成二维码
3. **社交媒体**：分享到微信、微博、朋友圈
4. **邮件/短信**：发送给亲朋好友

---

## ❓ 常见问题

### Q: 网站打开空白？
A: 检查浏览器控制台是否有错误。可能是路径问题，确保 `vite.config.ts` 中设置了 `base: './'`

### Q: 图片加载不出来？
A: 确保所有图片使用 HTTPS 链接，或者将图片上传到图床

### Q: 如何更新网站内容？
A: 修改源代码后重新构建，然后重新部署

### Q: 手机访问样式错乱？
A: 网站已做响应式设计，确保 `<meta name="viewport">` 标签存在

---

## 📞 需要帮助？

如果遇到问题，可以：
1. 查看 GitHub Actions 的部署日志
2. 检查浏览器开发者工具的控制台
3. 参考 README.md 中的本地运行说明
