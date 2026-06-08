// 文案模板配置 - 电商风格
export const TEMPLATES = {
  简约: {
    mainTitle: (product) => {
      const brand = product.brand ? `${product.brand} ` : ''
      return `${brand}${product.name}`
    },
    subTitle: (product) => product.sellingPoint,
    tag: (product) => product.price ? `¥${product.price}` : '',
    description: '简洁明了，重点突出产品本身'
  },
  促销: {
    mainTitle: (product) => {
      const brand = product.brand ? `${product.brand} ` : ''
      const discount = product.originalPrice 
        ? `限时${Math.round((1 - product.price / product.originalPrice) * 100)}%OFF ` 
        : ''
      return `${discount}${brand}${product.name}`
    },
    subTitle: (product) => product.sellingPoint,
    tag: (product) => product.price ? (product.originalPrice ? `¥${product.price} 原价¥${product.originalPrice}` : `¥${product.price}`) : '',
    description: '强调优惠打折，适合大促场景'
  },
  种草: {
    mainTitle: (product) => {
      const scenarios = ['穿搭分享', '好物推荐', '运动必备', '日常穿搭', '亲测好用', '必买清单'];
      const brand = product.brand ? `${product.brand} ` : ''
      return `${scenarios[Math.floor(Math.random() * scenarios.length)]} · ${brand}${product.name}`;
    },
    subTitle: (product) => product.sellingPoint,
    tag: () => '种草推荐',
    description: '故事感强，适合内容电商'
  },
  专业: {
    mainTitle: (product) => {
      const brand = product.brand ? `${product.brand} ` : ''
      return `${brand}${product.name}`
    },
    subTitle: (product) => product.sellingPoint,
    tag: (product) => product.price ? `¥${product.price}` : '品质优选',
    description: '强调品质和功能，适合高客单价'
  }
}

export const STYLES = ['简约', '促销', '种草', '专业']

export const CATEGORIES = ['女装', '男装', '数码', '食品', '家居', '鞋包', '美妆', '运动']

// 输入校验规则
export const VALIDATION_RULES = {
  name: { min: 2, max: 50, message: '商品名称需2-50个字符' },
  sellingPoint: { min: 5, max: 200, message: '商品卖点需5-200个字符' },
  price: { min: 0, message: '价格必须为正数' },
  imageMaxSize: 5 * 1024 * 1024, // 5MB
  imageMaxCount: 5
}

// 校验函数
export function validateField(field, value) {
  const rule = VALIDATION_RULES[field]
  if (!rule) return { valid: true }
  
  if (field === 'name' || field === 'sellingPoint') {
    const length = (value || '').trim().length
    if (length < rule.min || length > rule.max) {
      return { valid: false, message: rule.message }
    }
  }
  
  if (field === 'price') {
    const num = parseFloat(value)
    if (value && (isNaN(num) || num < rule.min)) {
      return { valid: false, message: rule.message }
    }
  }
  
  return { valid: true }
}

// 校验图片
export function validateImage(file) {
  const errors = []
  
  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    errors.push('仅支持 JPG/PNG 格式')
  }
  
  if (file.size > VALIDATION_RULES.imageMaxSize) {
    errors.push('单张图片不超过5MB')
  }
  
  return { valid: errors.length === 0, errors }
}

// 生成文案
export function generateCopy(product, style) {
  const template = TEMPLATES[style]
  const title = template.mainTitle(product)
  const subtitle = template.subTitle(product)
  const tag = typeof template.tag === 'function' ? template.tag(product) : template.tag
  
  return {
    style,
    mainTitle: title,
    subTitle: subtitle,
    tag: tag,
    fullText: `${title}\n${subtitle}${tag ? '\n' + tag : ''}`
  }
}

// 生成所有风格的文案
export function generateAllCopies(product) {
  return STYLES.map(style => generateCopy(product, style))
}

// Canvas 绘制工具函数
export function wrapText(ctx, text, maxWidth) {
  const words = text.split('')
  const lines = []
  let currentLine = ''
  
  for (const char of words) {
    const testLine = currentLine + char
    const metrics = ctx.measureText(testLine)
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine)
      currentLine = char
    } else {
      currentLine = testLine
    }
  }
  if (currentLine) lines.push(currentLine)
  return lines.length ? lines : ['']
}

export function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

export function drawPlaceholder(ctx, x, y, maxW, maxH) {
  ctx.fillStyle = '#e5e7eb'
  const w = 200
  const h = 200
  ctx.fillRect(x + (maxW - w) / 2, y + (maxH - h) / 2, w, h)
  ctx.fillStyle = '#9ca3af'
  ctx.font = '16px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('商品图片', x + maxW / 2, y + maxH / 2)
}

// 提取图片主色调
function getImageDominantColor(img) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  const size = 50
  canvas.width = size
  canvas.height = size
  
  ctx.drawImage(img, 0, 0, size, size)
  
  const imageData = ctx.getImageData(0, 0, size, size)
  const pixels = imageData.data
  
  let r = 0, g = 0, b = 0, count = 0
  
  for (let i = 0; i < pixels.length; i += 4) {
    const alpha = pixels[i + 3]
    if (alpha > 128) {
      r += pixels[i]
      g += pixels[i + 1]
      b += pixels[i + 2]
      count++
    }
  }
  
  if (count === 0) {
    return { r: 255, g: 255, b: 255 }
  }
  
  return {
    r: Math.round(r / count),
    g: Math.round(g / count),
    b: Math.round(b / count)
  }
}

// 将RGB转换为HSL
function rgbToHsl(r, g, b) {
  r /= 255
  g /= 255
  b /= 255
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2
  
  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
      default: h = 0
    }
  }
  
  return { h: h * 360, s: s * 100, l: l * 100 }
}

// 将HSL转换为RGB
function hslToRgb(h, s, l) {
  s /= 100
  l /= 100
  
  const a = s * Math.min(l, 1 - l)
  const f = n => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
  }
  
  return { r: f(0), g: f(8), b: f(4) }
}

// 根据图片主色生成亮背景色
function generateLightBackground(color) {
  const hsl = rgbToHsl(color.r, color.g, color.b)
  
  // 提高亮度，使背景亮于商品图片
  let newL = Math.min(95, hsl.l + 40)
  if (newL < 70) newL = 85
  
  // 适当降低饱和度
  let newS = Math.max(10, hsl.s - 30)
  if (newS < 15) newS = 20
  
  return hslToRgb(hsl.h, newS, newL)
}

// 绘制背景
function drawBackground(ctx, width, height, dominantColor) {
  const bgColor = generateLightBackground(dominantColor)
  ctx.fillStyle = `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`
  ctx.fillRect(0, 0, width, height)
}

// 生成主图到 Canvas - 电商风格
export function generateMainImage(canvas, product, style) {
  return new Promise((resolve) => {
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height
    
    const template = TEMPLATES[style]
    const mainTitle = template.mainTitle(product)
    const subTitle = template.subTitle(product)
    const tag = typeof template.tag === 'function' ? template.tag(product) : template.tag
    
    const padding = 30
    
    const drawTextContent = (dominantColor) => {
      const textAreaY = height * 0.72
      const textX = padding
      
      ctx.textAlign = 'left'
      ctx.textBaseline = 'top'
      
      ctx.fillStyle = dominantColor ? '#1f2937' : '#ffffff'
      ctx.font = 'bold 28px sans-serif'
      const titleLines = wrapText(ctx, mainTitle, width - padding * 2)
      titleLines.forEach((line, i) => {
        ctx.fillText(line, textX, textAreaY + i * 38)
      })
      
      if (subTitle) {
        ctx.fillStyle = dominantColor ? '#6b7280' : '#fef3c7'
        ctx.font = '24px sans-serif'
        ctx.fillText(subTitle, textX, textAreaY + titleLines.length * 38 + 20)
      }
      
      if (tag) {
        const tagY = height - padding - 35
        ctx.fillStyle = '#ef4444'
        ctx.font = 'bold 20px sans-serif'
        ctx.fillText(tag, textX, tagY)
      }
      
      resolve()
    }
    
    if (product.images && product.images.length > 0) {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        // 提取图片主色调
        const dominantColor = getImageDominantColor(img)
        
        // 绘制背景（基于主色调生成亮色背景）
        drawBackground(ctx, width, height, dominantColor)
        
        // 将商品图片平铺到整个主图上（覆盖约70%高度）
        const imageAreaHeight = height * 0.65
        const scale = Math.max(width / img.width, imageAreaHeight / img.height)
        const imgWidth = img.width * scale
        const imgHeight = img.height * scale
        
        // 图片居中并向上偏移一点，让底部有更多空间放文字
        const imgX = (width - imgWidth) / 2
        const imgY = (imageAreaHeight - imgHeight) / 2
        
        ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight)
        
        drawTextContent(dominantColor)
      }
      img.onerror = () => {
        ctx.fillStyle = '#f3f4f6'
        ctx.fillRect(0, 0, width, height)
        drawPlaceholder(ctx, width, padding, width - padding * 2, height * 0.65)
        drawTextContent(null)
      }
      img.src = product.images[0]
    } else {
      ctx.fillStyle = '#f3f4f6'
      ctx.fillRect(0, 0, width, height)
      drawPlaceholder(ctx, width, padding, width - padding * 2, height * 0.65)
      drawTextContent(null)
    }
  })
}

// 生成主图 DataURL
export async function generateMainImageDataUrl(product, style, size = 800) {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  await generateMainImage(canvas, product, style)
  return canvas.toDataURL('image/png')
}
