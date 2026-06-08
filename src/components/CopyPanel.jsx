import { useState } from 'react'

export default function CopyPanel({ copy, onCopy }) {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = () => {
    onCopy(copy.fullText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition bg-white">
      <div className="flex items-center justify-between mb-3">
        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
          {copy.style}
        </span>
        <button
          onClick={handleCopy}
          className={`text-xs transition flex items-center gap-1
            ${copied ? 'text-green-600' : 'text-indigo-600 hover:text-indigo-800'}`}
        >
          {copied ? (
            <>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              已复制
            </>
          ) : (
            <>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              复制
            </>
          )}
        </button>
      </div>
      
      <div className="space-y-2">
        <p className="font-bold text-gray-900 text-base leading-tight">
          {copy.mainTitle}
        </p>
        {copy.subTitle && (
          <p className="text-red-600 font-medium text-sm">{copy.subTitle}</p>
        )}
        {copy.tag && (
          <span className="inline-block px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">
            #{copy.tag}
          </span>
        )}
      </div>
    </div>
  )
}
