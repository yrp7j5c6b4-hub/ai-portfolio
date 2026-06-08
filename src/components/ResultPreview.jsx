import { useEffect, useState, useRef } from 'react'
import ImagePreview from './ImagePreview'
import CopyPanel from './CopyPanel'
import { STYLES, generateAllCopies, generateMainImageDataUrl } from '../utils/generator'

export default function ResultPreview({ results, isGenerating, productData, onViewLarge, onDownload, onCopy, onRegenerate }) {
  const [thumbnails, setThumbnails] = useState({})
  const resultRef = useRef(null)
  
  // 生成缩略图
  useEffect(() => {
    if (!results || !productData.sellingPoint) return
    
    setThumbnails({}) // 重置
    
    STYLES.forEach(async (style) => {
      try {
        const dataUrl = await generateMainImageDataUrl(productData, style)
        setThumbnails(prev => ({ ...prev, [style]: dataUrl }))
      } catch (err) {
        console.error(`生成${style}风格主图失败:`, err)
      }
    })
  }, [results, productData])
  
  // 生成完成后滚动到结果区
  useEffect(() => {
    if (results && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [results])
  
  if (isGenerating) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center justify-center min-h-96">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-600 font-medium">正在生成主图和文案...</p>
        <p className="text-sm text-gray-400 mt-1">请稍候，预计需要1-2秒</p>
        <div className="mt-4 flex gap-2">
          {STYLES.map(style => (
            <span key={style} className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
              {style}
            </span>
          ))}
        </div>
      </div>
    )
  }
  
  if (!results) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center justify-center min-h-96 text-gray-400">
        <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="font-medium">填写左侧商品信息</p>
        <p className="text-sm mt-1">点击"一键生成"开始创作</p>
        <div className="mt-6 p-4 bg-gray-50 rounded-lg max-w-sm">
          <p className="text-xs text-gray-500 text-center">
            支持4种风格的主图和文案生成<br/>
            简约 · 促销 · 种草 · 专业
          </p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6" ref={resultRef}>
      {/* 主图预览区 */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            主图预览
          </h2>
          {onRegenerate && (
            <button
              onClick={onRegenerate}
              className="text-sm text-indigo-600 hover:text-indigo-800 transition flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              重新生成
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {STYLES.map(style => (
            <ImagePreview
              key={style}
              style={style}
              thumbnail={thumbnails[style]}
              onViewLarge={onViewLarge}
              onDownload={onDownload}
            />
          ))}
        </div>
      </div>
      
      {/* 文案展示区 */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            文案方案
          </h2>
          <span className="text-xs text-gray-400">共{results.copies.length}套文案</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.copies.map((copy) => (
            <CopyPanel
              key={copy.style}
              copy={copy}
              onCopy={onCopy}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
