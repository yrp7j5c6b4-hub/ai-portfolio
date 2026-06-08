// 模板数据
export const TEMPLATES = [
  {
    id: 1,
    name: '简约风格',
    description: '简洁明了，重点突出产品本身',
    thumbnail: 'https://via.placeholder.com/120x120/ffffff/6366f1?text=简约',
    style: '简约',
    mainTitle: '{brand} {name}',
    subTitle: '{sellingPoint}',
    tag: '¥{price}',
    backgroundColor: '#f8fafc'
  },
  {
    id: 2,
    name: '促销风格',
    description: '强调优惠打折，适合大促场景',
    thumbnail: 'https://via.placeholder.com/120x120/ffffff/ef4444?text=促销',
    style: '促销',
    mainTitle: '限时{discount}%OFF {brand} {name}',
    subTitle: '{sellingPoint}',
    tag: '¥{price}',
    backgroundColor: '#fef2f2'
  },
  {
    id: 3,
    name: '种草风格',
    description: '故事感强，适合内容电商',
    thumbnail: 'https://via.placeholder.com/120x120/ffffff/8b5cf6?text=种草',
    style: '种草',
    mainTitle: '{scenario} · {brand} {name}',
    subTitle: '{sellingPoint}',
    tag: '种草推荐',
    backgroundColor: '#faf5ff'
  },
  {
    id: 4,
    name: '专业风格',
    description: '强调品质和功能，适合高客单价',
    thumbnail: 'https://via.placeholder.com/120x120/ffffff/06b6d4?text=专业',
    style: '专业',
    mainTitle: '【{brand}】{name}',
    subTitle: '{sellingPoint}',
    tag: '品质优选',
    backgroundColor: '#f0f9ff'
  }
]

// 设置默认配置
export const DEFAULT_SETTINGS = {
  defaultStyle: '简约',
  imageSize: 800,
  showPrice: true,
  showTag: true,
  autoSaveToLibrary: false,
  copyOnGenerate: false,
  language: 'zh-CN',
  theme: 'light'
}

// 保留模板数据但移除了硬编码的统计数据
// 统计数据现在从任务列表动态计算
