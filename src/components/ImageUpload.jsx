import { useCallback, useState } from 'react'
import { validateImage, VALIDATION_RULES } from '../utils/generator'

export default function ImageUpload({ images, onChange, disabled }) {
  const [isDragging, setIsDragging] = useState(false)
  const [errors, setErrors] = useState([])
  
  const processFiles = useCallback((files) => {
    const newErrors = []
    const validFiles = []
    
    files.forEach(file => {
      const validation = validateImage(file)
      if (validation.valid) {
        validFiles.push(file)
      } else {
        newErrors.push(`${file.name}: ${validation.errors.join(', ')}`)
      }
    })
    
    if (newErrors.length > 0) {
      setErrors(newErrors)
      setTimeout(() => setErrors([]), 3000)
    }
    
    if (validFiles.length > 0 && images.length < VALIDATION_RULES.imageMaxCount) {
      const newImages = validFiles
        .slice(0, VALIDATION_RULES.imageMaxCount - images.length)
        .map(f => URL.createObjectURL(f))
      onChange([...images, ...newImages])
    }
  }, [images, onChange])
  
  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    if (disabled) return
    
    const files = Array.from(e.dataTransfer.files)
    processFiles(files)
  }, [disabled, processFiles])
  
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    processFiles(files)
    e.target.value = '' // 重置以允许重复选择相同文件
  }
  
  const removeImage = (index) => {
    const newImages = [...images]
    URL.revokeObjectURL(newImages[index])
    newImages.splice(index, 1)
    onChange(newImages)
  }
  
  const remainingSlots = VALIDATION_RULES.imageMaxCount - images.length
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">商品图片</label>
      
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition cursor-pointer
          ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => !disabled && document.getElementById('file-input').click()}
      >
        <input
          id="file-input"
          type="file"
          accept="image/jpeg,image/png"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled}
        />
        <div className="flex flex-col items-center">
          <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-500 text-sm">
            点击或拖拽上传图片
          </p>
          <p className="text-gray-400 text-xs mt-1">
            剩余可上传 {remainingSlots} 张（JPG/PNG，单张≤5MB）
          </p>
        </div>
      </div>
      
      {errors.length > 0 && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600">
          {errors.map((err, i) => <p key={i}>{err}</p>)}
        </div>
      )}
      
      {images.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-3">
          {images.map((img, index) => (
            <div key={index} className="relative group">
              <img 
                src={img} 
                alt={`商品图${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg border border-gray-200 shadow-sm"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-lg flex items-center justify-center">
                <button
                  onClick={(e) => { e.stopPropagation(); removeImage(index) }}
                  className="w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600 transition"
                  disabled={disabled}
                >
                  ×
                </button>
              </div>
              <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1 rounded">
                {index + 1}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
