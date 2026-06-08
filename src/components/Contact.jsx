export const Contact = () => {
  return (
    <section id="contact" className="section min-h-screen flex items-center bg-black relative">
      {/* 背景线条 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-gray-900 to-transparent" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-gray-600 text-xs tracking-widest uppercase mb-6 block">Get In Touch</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white mb-8 leading-none">
            Let's Create
            <br />
            <span className="text-gradient">Together</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto mb-12 leading-relaxed">
            Whether you have a project in mind, need creative consultation, or just want to connect — I'd love to hear from you.
          </p>

          <div className="mb-16">
            <a href="mailto:hello@example.com" className="inline-flex items-center gap-3 text-white text-2xl md:text-3xl font-light tracking-wide group">
              <span className="border-b-2 border-white pb-2 group-hover:border-gray-500 transition-colors">
                hello@example.com
              </span>
              <span className="transform group-hover:translate-x-2 transition-transform">→</span>
            </a>
          </div>

          {/* 社交链接 */}
          <div className="flex items-center justify-center gap-8 mb-16">
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm tracking-wide">
              Twitter
            </a>
            <span className="text-gray-800">•</span>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm tracking-wide">
              LinkedIn
            </a>
            <span className="text-gray-800">•</span>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm tracking-wide">
              Instagram
            </a>
            <span className="text-gray-800">•</span>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm tracking-wide">
              Dribbble
            </a>
          </div>

          {/* 位置信息 */}
          <div className="text-gray-600 text-sm">
            <p>Based in San Francisco</p>
            <p className="mt-2">Available Worldwide</p>
          </div>
        </div>
      </div>
    </section>
  )
}
