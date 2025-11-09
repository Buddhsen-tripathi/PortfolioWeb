'use client'

const experiences = [
	{
		company: 'Amadeus',
		companyUrl: 'https://amadeus.com',
		role: 'Software Development Engineer 1',
		location: 'Bengaluru, India',
		period: 'Jul 2023 - Aug 2025',
		description:
			'Contributed to the development and maintenance of enterprise web applications within the Format and Deliver team. Worked on optimizing application performance, implementing new features, and ensuring system reliability across distributed services.',
		technologies: ['C++', 'Java', 'Angular', 'Azure', 'MongoDB'],
	},
	{
		company: 'Amadeus',
		companyUrl: 'https://amadeus.com',
		role: 'SDE Intern',
		location: 'Bengaluru, India',
		period: 'Jan 2023 - Jun 2023',
		description:
			'Designed and developed a full-stack web application to modernize an existing workflow, enhancing security, compliance, and significantly improving user experience.',
		technologies: ['Java', 'Angular', 'MySQL', 'Azure'],
	},
]

export default function Experience() {
	return (
		<section className="my-12">
			<h2 className="text-3xl font-bold mb-8 text-foreground text-tracking-tight">
				Experience
			</h2>

			<div className="space-y-3">
				{experiences.map((exp, index) => (
					<div
						key={index}
						className="relative pl-8 pb-4 last:pb-0 group"
					>
						{/* Timeline line - smooth continuous line */}
						{index !== experiences.length - 1 && (
							<div className="absolute left-0.5 top-4 bottom-0 w-0.5 bg-border" />
						)}

						{/* Timeline dot */}
						<div className="absolute left-0 top-0 w-3 h-3 -translate-x-[3px] rounded-full bg-primary border-2 border-background ring-4 ring-background group-hover:scale-140 transition-transform duration-300 z-10" />

                        <div className="bg-card rounded-lg p-4 shadow-md shadow-primary/15 border border-border transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/20 hover:border-primary/30">
							{/* Header */}
							<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
								<div>
									<h3 className="text-xl font-semibold text-foreground transition-colors">
										{exp.role}
									</h3>
									<a
										href={exp.companyUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 text-primary font-medium mt-1 hover:text-primary/80 focus-ring rounded transition-colors w-fit"
									>
										<span>{exp.company}</span>
									</a>
								</div>
								<div className="flex flex-col gap-1 text-sm text-muted-foreground md:text-right">
									<div className="flex items-center gap-1.5 md:justify-end">
										<span>{exp.period}</span>
									</div>
									<div className="flex items-center gap-1.5 md:justify-end">
										<span>{exp.location}</span>
									</div>
								</div>
							</div>

							{/* Description */}
							<p className="text-muted-foreground mb-2 leading-relaxed text-sm">
								{exp.description}
							</p>

							{/* Technologies */}
							<div className="flex flex-wrap gap-2">
								{exp.technologies.map((tech, i) => (
									<span
										key={i}
										className="bg-secondary dark:bg-primary/90 text-primary-foreground px-2 py-1 rounded text-sm"
									>
										{tech}
									</span>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}