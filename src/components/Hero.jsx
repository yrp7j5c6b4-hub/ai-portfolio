import { useState, useEffect } from 'react'

export const Hero = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* 极简背景 */}
      <div className="absolute inset-0 bg-black">
        {/* 微妙的网格背景 */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }} />
      </div>

      {/* 极简导航栏 */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-gray-900' : ''}`}>
        <div className="container py-6 flex items-center justify-between">
          <div className="text-xl font-light tracking-widest uppercase text-white">
            Portfolio
          </div>
          <div className="hidden md:flex items-center gap-12 text-sm tracking-wide">
            <a href="#about" className="link">About</a>
            <a href="#projects" className="link">Work</a>
            <a href="#skills" className="link">Capabilities</a>
            <a href="#contact" className="link">Contact</a>
          </div>
          <div className="hidden md:block text-sm text-gray-500">
            Available for projects →
          </div>
        </div>
      </nav>

      {/* Hero 内容 */}
      <div className="container relative z-10">
        <div className="max-w-4xl">
          <p className="text-gray-500 text-sm tracking-widest uppercase mb-6">
            AI Designer & Creative Director
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight leading-none mb-8 text-white">
            Crafting Digital
            <br />
            <span className="text-gradient">Experiences</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed mb-12 font-light">
            Bridging the gap between artificial intelligence and design aesthetics. Creating unique visual solutions that resonate.
          </p>
          <div className="flex items-center gap-8">
            <a href="#contact" className="inline-flex items-center gap-2 text-white text-sm tracking-wide group">
              <span className="border-b border-white pb-1 group-hover:border-gray-500 transition-colors">
                Start a Project
              </span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a href="#projects" className="inline-flex items-center gap-2 text-gray-500 text-sm tracking-wide group">
              <span>View Work</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>

        {/* 极简滚动指示 */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <span className="text-xs text-gray-600 tracking-widest uppercase">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-gray-700 to-transparent" />
        </div>
      </div>
    </section>
  )
}
