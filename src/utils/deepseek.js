// DeepSeek API 配置
export const API_CONFIG = {
  apiKey: 'sk-ed4523f7867749bd86db48e96d11de17',
  baseUrl: 'https://api.deepseek.com/v1',
  model: 'deepseek-chat'
}

// 调用DeepSeek API
export async function callDeepSeekAPI(messages, options = {}) {
  const apiKey = options.apiKey || API_CONFIG.apiKey
  const model = options.model || API_CONFIG.model
  
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages,
        stream: false,
        temperature: 0.7,
        max_tokens: 500
      })
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API请求失败: ${response.status} - ${errorText}`)
    }
    
    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error('DeepSeek API 调用失败:', error)
    throw error
  }
}

// 文案风格提示词模板
export const COPY_PROMPTS = {
  简约: (product) => `你是一位电商文案专家，请为以下商品生成一条简洁的抖音带货文案。

商品信息：
- 商品名称：${product.name || ''}
- 商品卖点：${product.sellingPoint || ''}
- 商品类目：${product.category || ''}
- 价格：${product.price ? '¥' + product.price : '未定价'}
- 品牌：${product.brand || '未知'}

要求：
1. 简洁明了，直击卖点
2. 适合抖音短视频口播
3. 15字以内的主标题
4. 20字以内的副标题
5. 格式：主标题|副标题

请直接输出，不要添加解释。`,

  促销: (product) => `你是一位电商文案专家，请为以下商品生成一条促销风格的抖音带货文案。

商品信息：
- 商品名称：${product.name || ''}
- 商品卖点：${product.sellingPoint || ''}
- 商品类目：${product.category || ''}
- 现价：${product.price ? '¥' + product.price : '未定价'}
- 原价：${product.originalPrice ? '¥' + product.originalPrice : '无'}
- 品牌：${product.brand || '未知'}

要求：
1. 突出限时优惠、折扣信息
2. 制造紧迫感，促进下单
3. 适合抖音短视频口播
4. 20字以内的主标题（含折扣信息）
5. 15字以内的副标题
6. 格式：主标题|副标题|标签

请直接输出，不要添加解释。`,

  种草: (product) => `你是一位种草达人，请为以下商品生成一条生活化、真实感的抖音种草文案。

商品信息：
- 商品名称：${product.name || ''}
- 商品卖点：${product.sellingPoint || ''}
- 商品类目：${product.category || ''}
- 价格：${product.price ? '¥' + product.price : '未定价'}
- 品牌：${product.brand || '未知'}

要求：
1. 像朋友推荐一样自然、真实
2. 融入使用场景或个人感受
3. 适合抖音短视频口播
4. 20字以内的主标题（生活化场景）
5. 25字以内的副标题（个人感受）
6. 格式：主标题|副标题|标签（种草推荐）

请直接输出，不要添加解释。`,

  专业: (product) => `你是一位专业电商运营，请为以下商品生成一条体现品质与专业的抖音带货文案。

商品信息：
- 商品名称：${product.name || ''}
- 商品卖点：${product.sellingPoint || ''}
- 商品类目：${product.category || ''}
- 价格：${product.price ? '¥' + product.price : '未定价'}
- 品牌：${product.brand || '未知'}

要求：
1. 强调产品品质、专业性
2. 适合高客单价商品
3. 适合抖音短视频口播
4. 20字以内的主标题（品质背书）
5. 25字以内的副标题（功能亮点）
6. 格式：主标题|副标题|标签（品质优选）

请直接输出，不要添加解释。`
}

// 解析API返回的文案
export function parseCopyResponse(response, style) {
  try {
    const lines = response.split('|').map(line => line.trim())
    return {
      style,
      mainTitle: lines[0] || '',
      subTitle: lines[1] || '',
      tag: lines[2] || (style === '种草' ? '种草推荐' : style === '专业' ? '品质优选' : style === '促销' ? '限时特惠' : ''),
      fullText: response
    }
  } catch {
    return {
      style,
      mainTitle: response.substring(0, 20),
      subTitle: '',
      tag: '',
      fullText: response
    }
  }
}

// 生成所有风格的文案（并行调用API）
export async function generateAllCopiesWithAPI(product) {
  const styles = ['简约', '促销', '种草', '专业']
  
  const promises = styles.map(async (style) => {
    try {
      const prompt = COPY_PROMPTS[style](product)
      const messages = [
        { role: 'system', content: '你是一位专业的电商带货文案专家，擅长创作抖音风格的文案。' },
        { role: 'user', content: prompt }
      ]
      
      const response = await callDeepSeekAPI(messages)
      return parseCopyResponse(response, style)
    } catch (error) {
      console.error(`生成${style}文案失败:`, error)
      // 如果API失败，返回一个错误标记
      return {
        style,
        mainTitle: `【${style}风格】生成失败`,
        subTitle: error.message || '请检查API配置或稍后重试',
        tag: '',
        fullText: '',
        error: true
      }
    }
  })
  
  return Promise.all(promises)
}
