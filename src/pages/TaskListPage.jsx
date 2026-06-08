import { useState } from 'react'

export default function TaskListPage({ onNavigate, tasks, onDeleteTask }) {
  const [filter, setFilter] = useState('all')

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true
    return task.status === filter
  })

  const getStatusBadge = (status) => {
    const styles = {
      completed: 'bg-green-100 text-green-700',
      pending: 'bg-gray-100 text-gray-700',
      processing: 'bg-blue-100 text-blue-700'
    }
    const labels = {
      completed: '已完成',
      pending: '待处理',
      processing: '处理中'
    }
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    )
  }

  const getStats = () => {
    return {
      all: tasks.length,
      completed: tasks.filter(t => t.status === 'completed').length,
      pending: tasks.filter(t => t.status === 'pending').length,
      processing: tasks.filter(t => t.status === 'processing').length
    }
  }

  const stats = getStats()

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">商品任务列表</h2>
            <p className="text-gray-500 text-sm">管理和查看所有商品生成任务</p>
          </div>
          <button 
            onClick={() => onNavigate('generator')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            新建任务
          </button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '全部', value: stats.all, color: 'indigo' },
          { label: '已完成', value: stats.completed, color: 'green' },
          { label: '待处理', value: stats.pending, color: 'gray' },
          { label: '处理中', value: stats.processing, color: 'blue' }
        ].map((stat, index) => (
          <button
            key={index}
            onClick={() => setFilter(stat.label === '全部' ? 'all' : stat.label === '已完成' ? 'completed' : stat.label === '待处理' ? 'pending' : 'processing')}
            className={`p-4 rounded-xl shadow-md transition ${
              filter === (stat.label === '全部' ? 'all' : stat.label === '已完成' ? 'completed' : stat.label === '待处理' ? 'pending' : 'processing')
                ? 'bg-indigo-600 text-white'
                : 'bg-white hover:shadow-lg'
            }`}
          >
            <p className={`text-2xl font-bold ${filter === (stat.label === '全部' ? 'all' : stat.label === '已完成' ? 'completed' : stat.label === '待处理' ? 'pending' : 'processing') ? 'text-white' : 'text-gray-800'}`}>
              {stat.value}
            </p>
            <p className={`text-sm ${filter === (stat.label === '全部' ? 'all' : stat.label === '已完成' ? 'completed' : stat.label === '待处理' ? 'pending' : 'processing') ? 'text-indigo-100' : 'text-gray-500'}`}>
              {stat.label}
            </p>
          </button>
        ))}
      </div>

      {/* 任务列表 */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="font-semibold text-gray-800">任务列表</h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          {filteredTasks.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>暂无任务</p>
            </div>
          ) : (
            filteredTasks.map(task => (
              <div key={task.id} className="px-6 py-4 hover:bg-gray-50 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{task.name}</h4>
                      <p className="text-sm text-gray-500">
                        创建于 {task.createdAt} · 生成 {task.generatedCopies} 套文案 · {task.generatedImages} 张主图
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(task.status)}
                    <div className="flex items-center gap-1">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => onDeleteTask(task.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition"
                      >
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
