import { useState } from 'react'
import { TEMPLATES } from '../data/mockData'

export default function TemplateLibraryPage() {
  const [templates, setTemplates] = useState(TEMPLATES)
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  const toggleFavorite = (id) => {
    setTemplates(prev => prev.map(t => 
      t.id === id ? { ...t, isFavorite: !t.isFavorite } : t
    ))
  }

  const handleSelect = (template) => {
    setSelectedTemplate(template)
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">模板库</h2>
            <p className="text-gray-500 text-sm">查看与管理收藏的图文模板</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="搜索模板..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              添加模板
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* 模板列表 */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">全部模板</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition">全部</button>
                <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition">已收藏</button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {templates.map(template => (
                <button
                  key={template.id}
                  onClick={() => handleSelect(template)}
                  className={`p-4 rounded-xl border-2 transition ${
                    selectedTemplate?.id === template.id 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-gray-200 hover:border-indigo-300 hover:shadow-md'
                  }`}
                >
                  <div className="relative mb-3">
                    <div 
                      className="w-full aspect-square rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: template.backgroundColor }}
                    >
                      <span className="text-3xl font-bold text-gray-400">{template.style}</span>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(template.id) }}
                      className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition ${
                        template.isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </button>
                  </div>
                  <h4 className="font-medium text-gray-800 text-sm">{template.name}</h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{template.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 模板详情 */}
        <div className="w-80">
          {selectedTemplate ? (
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">模板详情</h3>
                <button 
                  onClick={() => toggleFavorite(selectedTemplate.id)}
                  className={`p-2 rounded-full transition ${
                    selectedTemplate.isFavorite ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </button>
              </div>
              
              <div 
                className="w-full aspect-square rounded-lg mb-4 flex items-center justify-center"
                style={{ backgroundColor: selectedTemplate.backgroundColor }}
              >
                <span className="text-4xl font-bold text-gray-400">{selectedTemplate.style}</span>
              </div>
              
              <h4 className="text-lg font-bold text-gray-800 mb-2">{selectedTemplate.name}</h4>
              <p className="text-gray-500 text-sm mb-4">{selectedTemplate.description}</p>
              
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">主标题模板</p>
                  <p className="text-sm font-medium text-gray-800">{selectedTemplate.mainTitle}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">副标题模板</p>
                  <p className="text-sm font-medium text-gray-800">{selectedTemplate.subTitle}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">标签模板</p>
                  <p className="text-sm font-medium text-gray-800">{selectedTemplate.tag}</p>
                </div>
              </div>
              
              <div className="mt-6 space-y-2">
                <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                  使用此模板
                </button>
                <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                  编辑模板
                </button>
                <button className="w-full py-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                  删除模板
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center h-64">
              <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <p className="text-gray-400 text-sm">选择一个模板查看详情</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
