import { useState } from 'react'

export default function ImagePreview({ style, thumbnail, onViewLarge, onDownload }) {
  const [loading, setLoading] = useState(!thumbnail)
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <div className="aspect-square bg-gray-50 relative">
        {thumbnail ? (
          <img 
            src={thumbnail} 
            alt={`${style}风格主图`}
            className="w-full h-full object-contain"
            onLoad={() => setLoading(false)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        )}
        
        {loading && thumbnail && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      <div className="p-3 bg-gray-50 border-t border-gray-200">
        <p className="text-sm font-medium text-gray-700 mb-2">{style}风格</p>
        <div className="flex gap-2">
          <button
            onClick={() => onViewLarge(style)}
            className="flex-1 px-3 py-1.5 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50 transition flex items-center justify-center gap-1"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
            查看大图
          </button>
          <button
            onClick={() => onDownload(style)}
            className="flex-1 px-3 py-1.5 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700 transition flex items-center justify-center gap-1"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            下载
          </button>
        </div>
      </div>
    </div>
  )
}
