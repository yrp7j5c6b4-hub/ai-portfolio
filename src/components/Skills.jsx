export const Skills = () => {
  const skills = [
    {
      title: 'AI Image Generation',
      description: 'Mastering tools like Midjourney, Stable Diffusion, and DALL-E to create unique visual content.',
    },
    {
      title: 'Brand Design',
      description: 'Building cohesive visual identities that communicate brand values and resonate with audiences.',
    },
    {
      title: 'UI/UX Design',
      description: 'Creating intuitive user interfaces and experiences for digital products and platforms.',
    },
    {
      title: 'Creative Direction',
      description: 'Leading creative vision from concept to execution, ensuring cohesive and impactful outcomes.',
    },
  ]

  return (
    <section id="skills" className="section bg-black">
      <div className="container">
        <div className="mb-20">
          <span className="text-gray-600 text-xs tracking-widest uppercase mb-4 block">Capabilities</span>
          <h2 className="text-4xl md:text-6xl font-extralight text-white">
            What I Do
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-20">
          {skills.map((skill, index) => (
            <div key={index} className="group border-t border-gray-900 pt-8 card-hover">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-light text-white">
                  {skill.title}
                </h3>
                <span className="text-gray-700 text-sm">0{index + 1}</span>
              </div>
              <p className="text-gray-500 leading-relaxed">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
