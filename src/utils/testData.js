// 测试商品数据
export const TEST_PRODUCTS = [
  {
    id: 1,
    name: 'Nike Air Zoom 透气缓震跑鞋',
    sellingPoint: '飞织网面 透气缓震 轻便舒适 防滑耐磨',
    category: '运动',
    price: '599',
    originalPrice: '899',
    brand: 'Nike',
    style: '专业'
  },
  {
    id: 2,
    name: '无线蓝牙耳机 Pro版',
    sellingPoint: '主动降噪 40小时续航 蓝牙5.3 Hi-Fi音质 舒适佩戴',
    category: '数码',
    price: '299',
    originalPrice: '599',
    brand: '小米',
    style: '专业'
  },
  {
    id: 3,
    name: '日式抹茶曲奇饼干礼盒',
    sellingPoint: '进口抹茶粉 低糖配方 独立包装 酥脆口感',
    category: '食品',
    price: '45',
    originalPrice: '68',
    brand: '良品铺子',
    style: '种草'
  },
  {
    id: 4,
    name: '男士商务休闲皮鞋',
    sellingPoint: '头层牛皮 透气舒适 防滑耐磨 百搭款式',
    category: '鞋包',
    price: '359',
    originalPrice: '599',
    brand: '红蜻蜓',
    style: '专业'
  },
  {
    id: 5,
    name: '家用空气炸锅 大容量',
    sellingPoint: '5L大容量 无油烹饪 智能控温 多功能菜单',
    category: '家居',
    price: '299',
    originalPrice: '499',
    brand: '美的',
    style: '促销'
  },
  {
    id: 6,
    name: '女士保湿面霜 补水滋润',
    sellingPoint: '玻尿酸补水 烟酰胺提亮 温和不刺激 敏感肌适用',
    category: '美妆',
    price: '128',
    originalPrice: '198',
    brand: '欧莱雅',
    style: '种草'
  },
  {
    id: 7,
    name: '运动瑜伽垫 加宽加厚',
    sellingPoint: '8mm加厚 防滑耐用 环保材质 便携收纳',
    category: '运动',
    price: '69',
    originalPrice: '129',
    brand: '李宁',
    style: '简约'
  },
  {
    id: 8,
    name: '男士纯棉短袖T恤',
    sellingPoint: '新疆长绒棉 透气吸汗 简约百搭 多色可选',
    category: '男装',
    price: '79',
    originalPrice: '159',
    brand: '凡客诚品',
    style: '简约'
  }
]

// 生成随机占位图片（使用纯色占位图）
export function generatePlaceholderImage() {
  const colors = ['#e5e7eb', '#f3f4f6', '#f9fafb', '#ffffff']
  const color = colors[Math.floor(Math.random() * colors.length)]
  
  const canvas = document.createElement('canvas')
  canvas.width = 600
  canvas.height = 600
  const ctx = canvas.getContext('2d')
  
  ctx.fillStyle = color
  ctx.fillRect(0, 0, 600, 600)
  
  ctx.fillStyle = '#9ca3af'
  ctx.font = '24px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('商品图片占位', 300, 290)
  ctx.font = '16px sans-serif'
  ctx.fillText('(测试数据)', 300, 320)
  
  return canvas.toDataURL('image/png')
}

// 获取测试商品列表
export function getTestProducts() {
  return TEST_PRODUCTS
}

// 获取单个测试商品
export function getTestProduct(id) {
  return TEST_PRODUCTS.find(p => p.id === id)
}
