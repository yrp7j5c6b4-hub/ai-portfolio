const STORAGE_KEY = 'ecommerce_generator_tasks'

// 从localStorage读取任务
export function getTasks() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      return JSON.parse(data)
    }
  } catch (e) {
    console.error('读取任务失败', e)
  }
  return []
}

// 保存任务到localStorage
export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch (e) {
    console.error('保存任务失败', e)
  }
}

// 添加新任务
export function addTask(task) {
  const tasks = getTasks()
  const newTask = {
    id: Date.now(),
    createdAt: new Date().toISOString().split('T')[0],
    status: 'completed',
    generatedCopies: 4,
    generatedImages: 4,
    ...task
  }
  const updatedTasks = [newTask, ...tasks]
  saveTasks(updatedTasks)
  return newTask
}

// 删除任务
export function deleteTask(id) {
  const tasks = getTasks()
  const updatedTasks = tasks.filter(t => t.id !== id)
  saveTasks(updatedTasks)
  return updatedTasks
}

// 计算统计数据
export function getStats() {
  const tasks = getTasks()
  
  const totalProducts = tasks.length
  const completedProducts = tasks.filter(t => t.status === 'completed').length
  const pendingProducts = tasks.filter(t => t.status === 'pending').length
  
  // 计算总生成内容数（假设每个任务生成4个文案和4张图）
  const totalCopies = tasks.reduce((sum, t) => sum + (t.generatedCopies || 0), 0)
  const totalImages = tasks.reduce((sum, t) => sum + (t.generatedImages || 0), 0)
  const totalGenerated = totalCopies + totalImages
  
  // 计算今日生成数
  const today = new Date().toISOString().split('T')[0]
  const todayTasks = tasks.filter(t => t.createdAt === today)
  const todayCopies = todayTasks.reduce((sum, t) => sum + (t.generatedCopies || 0), 0)
  const todayImages = todayTasks.reduce((sum, t) => sum + (t.generatedImages || 0), 0)
  const todayGenerated = todayCopies + todayImages
  
  return {
    totalProducts,
    completedProducts,
    pendingProducts,
    totalTemplates: 4,
    favoriteTemplates: 2,
    totalGenerated,
    todayGenerated
  }
}

// 初始化示例数据
export function initSampleData() {
  const tasks = getTasks()
  if (tasks.length === 0) {
    const sampleTasks = [
      {
        id: 1,
        name: 'Nike Air Zoom 跑鞋',
        status: 'completed',
        createdAt: new Date().toISOString().split('T')[0],
        generatedCopies: 4,
        generatedImages: 4
      },
      {
        id: 2,
        name: '无线蓝牙耳机 Pro',
        status: 'completed',
        createdAt: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        generatedCopies: 4,
        generatedImages: 4
      },
      {
        id: 3,
        name: '抹茶曲奇饼干礼盒',
        status: 'pending',
        createdAt: new Date(Date.now() - 172800000).toISOString().split('T')[0],
        generatedCopies: 0,
        generatedImages: 0
      }
    ]
    saveTasks(sampleTasks)
    return sampleTasks
  }
  return tasks
}
