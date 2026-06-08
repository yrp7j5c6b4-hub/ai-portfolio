# 部署指南

## 使用 Vercel 部署您的作品集网站

### 方法一：通过 GitHub 部署（推荐）

#### 第一步：创建 GitHub 仓库

1. 访问 [GitHub](https://github.com) 并登录
2. 点击右上角的 **"+"** 按钮，选择 **"New repository"**
3. 填写仓库信息：
   - Repository name: `ai-portfolio`
   - Description: `AI Designer Portfolio`
   - 选择 **Public**（公开）
   - 不要勾选 "Add a README file"（我们已有代码）
4. 点击 **"Create repository"**

#### 第二步：上传代码到 GitHub

在项目根目录执行以下命令：

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit - AI Designer Portfolio"

# 添加远程仓库（将 YOUR_USERNAME 替换为您的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/ai-portfolio.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

#### 第三步：连接到 Vercel

1. 访问 [Vercel](https://vercel.com) 并登录（推荐使用 GitHub 账号登录）
2. 点击 **"Add New..."** 按钮，选择 **"Project"**
3. 在列表中找到您的 `ai-portfolio` 仓库，点击 **"Import"**
4. Vercel 会自动检测到这是 Vite + React 项目
5. 配置项目设置：
   - Framework Preset: **Vite** (自动检测)
   - Root Directory: `.` (默认)
   - Build Command: `npm run build` (自动检测)
   - Output Directory: `dist` (自动检测)
6. 点击 **"Deploy"** 按钮
7. 等待部署完成（约1-2分钟）
8. 部署成功后，您会获得一个 URL，如：`your-project.vercel.app`

#### 第四步：自定义域名（可选）

1. 在 Vercel 项目设置中，选择 **"Domains"**
2. 输入您想要的域名
3. 按照提示配置 DNS 记录
4. 等待域名生效

### 方法二：使用 Vercel CLI 快速部署

#### 第一步：安装 Vercel CLI

```bash
npm install -g vercel
```

#### 第二步：登录 Vercel

```bash
vercel login
```

#### 第三步：部署项目

```bash
# 在项目根目录执行
vercel

# 按照提示操作：
# - Set up and deploy? Y
# - Which scope? 选择您的账号
# - Link to existing project? N
# - Project name? ai-portfolio
# - Directory? ./
# - Override settings? N

# 等待部署完成
```

#### 第四步：生产环境部署

```bash
vercel --prod
```

### 部署后的优势

✅ **全球CDN加速** - 网站加载速度快
✅ **自动HTTPS** - 免费SSL证书
✅ **预览部署** - 每次推送都有预览链接
✅ **自定义域名** - 支持免费绑定域名
✅ **实时监控** - 查看访问统计

### 更新网站

更新代码后，只需推送代码到 GitHub，Vercel 会自动重新部署：

```bash
git add .
git commit -m "Update website"
git push
```

### 常见问题

**Q: 部署失败怎么办？**
A: 检查终端错误信息，常见问题包括：
- 依赖安装失败 - 检查 package.json
- 构建命令错误 - 确认 build 脚本正确
- 路径问题 - 确保 vite.config.js 配置正确

**Q: 可以使用自己的域名吗？**
A: 可以！Vercel 支持免费绑定自定义域名

**Q: 网站访问慢怎么办？**
A: Vercel 使用全球CDN，通常访问速度很快。如果慢，可以在 Vercel 控制台查看性能分析。

**Q: 如何查看访问统计？**
A: Vercel 仪表盘提供详细的访问数据，包括访问量、访客来源等。

### 获取帮助

- Vercel 官方文档: https://vercel.com/docs
- GitHub: https://github.com/YOUR_USERNAME/ai-portfolio
- 实时预览: https://your-project.vercel.app
