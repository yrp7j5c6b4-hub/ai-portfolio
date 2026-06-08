export const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Futuristic Cityscape',
      category: 'AI Art',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sleek%20minimal%20architecture%20design%20monochrome%20landscape_16_9&image_size=landscape_16_9',
    },
    {
      id: 2,
      title: 'Brand Identity System',
      category: 'Branding',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimal%20geometric%20brand%20identity%20mockup%20dark%20background%20landscape_16_9&image_size=landscape_16_9',
    },
    {
      id: 3,
      title: 'Product Interface',
      category: 'UI/UX',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=clean%20modern%20app%20design%20dark%20theme%20minimalist%20landscape_16_9&image_size=landscape_16_9',
    },
  ]

  return (
    <section id="projects" className="section bg-gray-950">
      <div className="container">
        {/* 标题 */}
        <div className="mb-20">
          <span className="text-gray-600 text-xs tracking-widest uppercase mb-4 block">Selected Work</span>
          <h2 className="text-4xl md:text-6xl font-extralight text-white">
            Featured Projects
          </h2>
        </div>

        {/* 项目网格 */}
        <div className="space-y-32">
          {projects.map((project, index) => (
            <div key={project.id} className={`group grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <span className="text-gray-600 text-xs tracking-widest uppercase mb-3 block">
                  {project.category}
                </span>
                <h3 className="text-3xl md:text-4xl font-extralight text-white mb-4">
                  {project.title}
                </h3>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  Exploring the boundaries of AI-generated art and design. Each piece represents a unique blend of technology and creativity.
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-white text-sm tracking-wide group">
                  <span>View Project</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} card-hover`}>
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 底部链接 */}
        <div className="mt-32 pt-16 border-t border-gray-900 text-center">
          <p className="text-gray-600 mb-4">Looking for something specific?</p>
          <a href="#contact" className="inline-flex items-center gap-2 text-white text-sm tracking-wide group">
            <span className="border-b border-white pb-1 group-hover:border-gray-500 transition-colors">
              Let's Discuss Your Project
            </span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
