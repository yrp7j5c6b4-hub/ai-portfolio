export const About = () => {
  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '3+', label: 'Years Experience' },
    { number: '30+', label: 'Happy Clients' },
  ]

  return (
    <section id="about" className="section bg-black">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* 标题区域 */}
          <div className="lg:col-span-4">
            <span className="text-gray-600 text-xs tracking-widest uppercase mb-4 block">About</span>
            <h2 className="text-4xl md:text-5xl font-extralight text-white leading-tight mb-6">
              AI Designer
              <br />
              & Digital Artist
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              A creator specializing in the intersection of artificial intelligence and design aesthetics. Crafting unique visual solutions that push boundaries.
            </p>
            <div className="flex gap-4">
              <a href="mailto:hello@example.com" className="text-white text-sm border-b border-white pb-1 hover:border-gray-500 transition-colors">
                hello@example.com
              </a>
            </div>
          </div>

          {/* 头像区域 - 使用渐变占位符 */}
          <div className="lg:col-span-4">
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-gray-700 text-9xl font-extralight">✦</div>
            </div>
          </div>

          {/* 数据统计 */}
          <div className="lg:col-span-4 space-y-12">
            {stats.map((stat, index) => (
              <div key={index} className="border-l border-gray-800 pl-8">
                <div className="text-5xl font-extralight text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-500 text-sm tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}

            <div className="border-l border-gray-800 pl-8">
              <h3 className="text-white text-lg mb-4 font-light">Expertise</h3>
              <div className="space-y-2 text-gray-500 text-sm">
                <div>AI Image Generation</div>
                <div>Brand Design</div>
                <div>UI/UX Design</div>
                <div>Visual Systems</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
