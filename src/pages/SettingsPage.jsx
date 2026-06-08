import { useState } from 'react'
import { DEFAULT_SETTINGS } from '../data/mockData'

export default function SettingsPage() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [activeSection, setActiveSection] = useState('general')

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const sections = [
    { id: 'general', label: '基本设置', icon: 'settings' },
    { id: 'style', label: '风格偏好', icon: 'palette' },
    { id: 'advanced', label: '高级设置', icon: 'sliders' }
  ]

  const styles = ['简约', '促销', '种草', '专业']

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">设置</h2>
        <p className="text-gray-500 text-sm">配置基础参数和个性化选项</p>
      </div>

      <div className="flex gap-6">
        {/* 侧边栏 */}
        <div className="w-64">
          <div className="bg-white rounded-xl shadow-md p-4">
            <nav className="space-y-1">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeSection === section.id 
                      ? 'bg-indigo-50 text-indigo-600 font-medium' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {section.icon === 'settings' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                  {section.icon === 'palette' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  )}
                  {section.icon === 'sliders' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  )}
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-md p-6">
            {/* 基本设置 */}
            {activeSection === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">基本设置</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">语言设置</label>
                      <select 
                        value={settings.language}
                        onChange={(e) => updateSetting('language', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      >
                        <option value="zh-CN">简体中文</option>
                        <option value="zh-TW">繁体中文</option>
                        <option value="en-US">English</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">主题模式</label>
                      <select 
                        value={settings.theme}
                        onChange={(e) => updateSetting('theme', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      >
                        <option value="light">浅色模式</option>
                        <option value="dark">深色模式</option>
                        <option value="system">跟随系统</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">主图尺寸</label>
                      <select 
                        value={settings.imageSize}
                        onChange={(e) => updateSetting('imageSize', parseInt(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      >
                        <option value={600}>600 × 600 px</option>
                        <option value={800}>800 × 800 px</option>
                        <option value={1000}>1000 × 1000 px</option>
                        <option value={1200}>1200 × 1200 px</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-4">快捷键设置</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">生成图文</span>
                      <kbd className="px-3 py-1 bg-gray-100 rounded text-sm font-mono">Ctrl + G</kbd>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">复制文案</span>
                      <kbd className="px-3 py-1 bg-gray-100 rounded text-sm font-mono">Ctrl + C</kbd>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">下载图片</span>
                      <kbd className="px-3 py-1 bg-gray-100 rounded text-sm font-mono">Ctrl + S</kbd>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 风格偏好 */}
            {activeSection === 'style' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">默认文案风格</h3>
                  <p className="text-sm text-gray-500 mb-4">设置生成时默认使用的文案风格</p>
                  
                  <div className="grid grid-cols-4 gap-3">
                    {styles.map(style => (
                      <button
                        key={style}
                        onClick={() => updateSetting('defaultStyle', style)}
                        className={`p-4 rounded-xl border-2 transition ${
                          settings.defaultStyle === style
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-indigo-300'
                        }`}
                      >
                        <span className={`font-medium ${
                          settings.defaultStyle === style ? 'text-indigo-600' : 'text-gray-700'
                        }`}>
                          {style}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">显示价格</h4>
                      <p className="text-sm text-gray-500">在生成的文案中包含价格信息</p>
                    </div>
                    <button
                      onClick={() => updateSetting('showPrice', !settings.showPrice)}
                      className={`w-12 h-6 rounded-full transition ${
                        settings.showPrice ? 'bg-indigo-600' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow transition ${
                        settings.showPrice ? 'translate-x-6' : 'translate-x-0.5'
                      }`}></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">显示标签</h4>
                      <p className="text-sm text-gray-500">在生成的主图中显示促销标签</p>
                    </div>
                    <button
                      onClick={() => updateSetting('showTag', !settings.showTag)}
                      className={`w-12 h-6 rounded-full transition ${
                        settings.showTag ? 'bg-indigo-600' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow transition ${
                        settings.showTag ? 'translate-x-6' : 'translate-x-0.5'
                      }`}></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">自动复制文案</h4>
                      <p className="text-sm text-gray-500">生成完成后自动复制文案到剪贴板</p>
                    </div>
                    <button
                      onClick={() => updateSetting('copyOnGenerate', !settings.copyOnGenerate)}
                      className={`w-12 h-6 rounded-full transition ${
                        settings.copyOnGenerate ? 'bg-indigo-600' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow transition ${
                        settings.copyOnGenerate ? 'translate-x-6' : 'translate-x-0.5'
                      }`}></div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 高级设置 */}
            {activeSection === 'advanced' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">存储设置</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">自动保存到素材库</h4>
                      <p className="text-sm text-gray-500">生成的图文自动保存到素材库中</p>
                    </div>
                    <button
                      onClick={() => updateSetting('autoSaveToLibrary', !settings.autoSaveToLibrary)}
                      className={`w-12 h-6 rounded-full transition ${
                        settings.autoSaveToLibrary ? 'bg-indigo-600' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow transition ${
                        settings.autoSaveToLibrary ? 'translate-x-6' : 'translate-x-0.5'
                      }`}></div>
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-4">数据管理</h3>
                  
                  <div className="space-y-3">
                    <button className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition flex items-center justify-between">
                      <span className="text-gray-700">导出所有数据</span>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                    <button className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition flex items-center justify-between">
                      <span className="text-gray-700">清空缓存</span>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <button className="w-full px-4 py-3 text-left bg-red-50 hover:bg-red-100 rounded-lg transition flex items-center justify-between">
                      <span className="text-red-600">重置所有设置</span>
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-4">关于</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 text-sm">版本: 1.0.0</p>
                    <p className="text-gray-500 text-xs mt-1">商品主图与文案生成工具</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
