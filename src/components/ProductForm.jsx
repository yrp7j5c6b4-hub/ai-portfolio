import { useState, useCallback } from 'react'
import ImageUpload from './ImageUpload'
import { CATEGORIES, STYLES, TEMPLATES, validateField } from '../utils/generator'
import { TEST_PRODUCTS, generatePlaceholderImage } from '../utils/testData'

export default function ProductForm({ productData, setProductData, onGenerate, isGenerating, isUsingAI, setIsUsingAI }) {
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  
  const updateField = (field, value) => {
    setProductData(prev => ({ ...prev, [field]: value }))
    
    // 实时校验
    const validation = validateField(field, value)
    setErrors(prev => ({ ...prev, [field]: validation.valid ? '' : validation.message }))
  }
  
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }
  
  const validateForm = useCallback(() => {
    const newErrors = {}
    
    const nameValidation = validateField('name', productData.name)
    if (!nameValidation.valid) newErrors.name = nameValidation.message
    
    const sellingPointValidation = validateField('sellingPoint', productData.sellingPoint)
    if (!sellingPointValidation.valid) newErrors.sellingPoint = sellingPointValidation.message
    
    if (!productData.name.trim()) newErrors.name = '请输入商品名称'
    if (!productData.sellingPoint.trim()) newErrors.sellingPoint = '请输入商品卖点'
    
    setErrors(newErrors)
    setTouched({ name: true, sellingPoint: true })
    
    return Object.keys(newErrors).length === 0
  }, [productData])
  
  const handleSubmit = () => {
    if (validateForm()) {
      onGenerate()
    }
  }
  
  const getFieldError = (field) => touched[field] && errors[field]
  
  const [selectedTestProduct, setSelectedTestProduct] = useState('')

  const loadTestProduct = (product) => {
    setSelectedTestProduct(String(product.id))
    setProductData({
      ...product,
      images: [generatePlaceholderImage()]
    })
    setErrors({})
    setTouched({})
  }

  const handleTestProductChange = (e) => {
    const id = e.target.value
    setSelectedTestProduct(id)
    if (id) {
      const product = TEST_PRODUCTS.find(p => String(p.id) === id)
      if (product) {
        loadTestProduct(product)
      }
    }
  }

  const clearForm = () => {
    setProductData({
      name: '',
      sellingPoint: '',
      category: '',
      price: '',
      originalPrice: '',
      brand: '',
      images: [],
      style: '简约'
    })
    setSelectedTestProduct('')
    setErrors({})
    setTouched({})
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        商品信息
      </h2>
      
      {/* 测试数据入口 */}
      <div className="mb-5 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-center gap-2 text-amber-700 text-sm font-medium mb-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          测试数据入口
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            value={selectedTestProduct}
            onChange={handleTestProductChange}
            className="flex-1 px-3 py-2 border border-amber-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
          >
            <option value="">选择测试商品...</option>
            {TEST_PRODUCTS.map(product => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          <button
            onClick={clearForm}
            className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            清空表单
          </button>
        </div>
        <p className="text-xs text-amber-600 mt-2">
          提示：选择测试商品可快速填充表单数据，便于测试全流程
        </p>
      </div>
      
      <div className="space-y-4">
        {/* 商品名称 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            商品名称 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={productData.name}
            onChange={(e) => updateField('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            placeholder="请输入商品名称（2-50字符）"
            maxLength={50}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition
              ${getFieldError('name') ? 'border-red-500' : 'border-gray-300 focus:border-indigo-500'}`}
          />
          {getFieldError('name') && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
          <p className="text-gray-400 text-xs mt-1">{productData.name.length}/50</p>
        </div>
        
        {/* 商品卖点 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            商品卖点 <span className="text-red-500">*</span>
          </label>
          <textarea
            value={productData.sellingPoint}
            onChange={(e) => updateField('sellingPoint', e.target.value)}
            onBlur={() => handleBlur('sellingPoint')}
            placeholder="请输入商品卖点，如：轻薄透气、防晒UPF50+、便携收纳"
            rows={3}
            maxLength={200}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none
              ${getFieldError('sellingPoint') ? 'border-red-500' : 'border-gray-300 focus:border-indigo-500'}`}
          />
          {getFieldError('sellingPoint') && (
            <p className="text-red-500 text-xs mt-1">{errors.sellingPoint}</p>
          )}
          <p className="text-gray-400 text-xs mt-1">{productData.sellingPoint.length}/200</p>
        </div>
        
        {/* 商品类目 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">商品类目</label>
          <select
            value={productData.category}
            onChange={(e) => updateField('category', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-white"
          >
            <option value="">请选择类目</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        {/* 价格和原价 */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">价格（元）</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">¥</span>
              <input
                type="number"
                value={productData.price}
                onChange={(e) => updateField('price', e.target.value)}
                placeholder="现价"
                min="0"
                step="0.01"
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">原价（元）</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">¥</span>
              <input
                type="number"
                value={productData.originalPrice}
                onChange={(e) => updateField('originalPrice', e.target.value)}
                placeholder="原价（可选）"
                min="0"
                step="0.01"
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>
          </div>
        </div>
        
        {/* 品牌名称 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">品牌名称</label>
          <input
            type="text"
            value={productData.brand || ''}
            onChange={(e) => updateField('brand', e.target.value)}
            placeholder="品牌名称（可选，影响文案风格）"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />
        </div>
        
        {/* 商品图片 */}
        <ImageUpload
          images={productData.images}
          onChange={(imgs) => updateField('images', imgs)}
          disabled={isGenerating}
        />
        
        {/* 文案风格 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">文案风格偏好</label>
          <div className="grid grid-cols-2 gap-2">
            {STYLES.map(style => (
              <label
                key={style}
                className={`px-3 py-2 rounded-lg cursor-pointer transition text-sm font-medium border
                  ${productData.style === style 
                    ? 'bg-indigo-600 text-white border-indigo-600' 
                    : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'}`}
              >
                <input
                  type="radio"
                  name="style"
                  value={style}
                  checked={productData.style === style}
                  onChange={(e) => updateField('style', e.target.value)}
                  className="sr-only"
                />
                <span className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full border-2 flex items-center justify-center
                    ${productData.style === style ? 'border-white' : 'border-gray-400'}`}>
                    {productData.style === style && (
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                    )}
                  </span>
                  {style}
                </span>
              </label>
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-2">
            {TEMPLATES[productData.style]?.description}
          </p>
        </div>

        {/* AI智能生成开关 */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-800">AI智能生成文案</p>
                <p className="text-xs text-gray-500">基于DeepSeek大模型生成高质量抖音电商文案</p>
              </div>
            </div>
            <button
              onClick={() => setIsUsingAI(!isUsingAI)}
              className={`w-12 h-6 rounded-full transition ${
                isUsingAI ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow transition ${
                isUsingAI ? 'translate-x-6' : 'translate-x-0.5'
              }`}></div>
            </button>
          </div>
          {isUsingAI && (
            <p className="text-xs text-indigo-600 mt-2 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              AI生成需要几秒钟时间，请耐心等待
            </p>
          )}
        </div>
      </div>
      
      {/* 生成按钮 */}
      <button
        onClick={handleSubmit}
        disabled={isGenerating}
        className={`w-full mt-6 py-3 rounded-lg font-medium text-white transition flex items-center justify-center gap-2
          ${isGenerating 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg'}`}
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            生成中...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            一键生成
          </>
        )}
      </button>
    </div>
  )
}
