'use client'

import Image from 'next/image'

const experiences = [
	{
		company: 'Amadeus',
		logo: '/amadeus.jpeg',
		companyUrl: 'https://amadeus.com',
		role: 'Software Development Engineer 1',
		location: 'Bengaluru, India',
		period: 'Jul 2023 - Aug 2025',
		description:
			'Developed and optimized enterprise web applications for the Format and Deliver team, ensuring system reliability across distributed services.',
		technologies: ['C++', 'Java', 'Angular', 'Azure', 'MongoDB'],
	},
	{
		company: 'Amadeus',
		logo: '/amadeus.jpeg',
		companyUrl: 'https://amadeus.com',
		role: 'SDE Intern',
		location: 'Bengaluru, India',
		period: 'Jan 2023 - Jun 2023',
		description:
			'Built a full-stack web app to modernize workflows, enhancing security, compliance, and user experience.',
		technologies: ['Java', 'Angular', 'MySQL', 'Azure'],
	},
]

export default function Experience() {
	return (
		<section className="my-12">
			<h2 className="text-3xl font-bold mb-8 text-foreground text-tracking-tight">
				Work Experience
			</h2>

			<div className="space-y-10">
				{experiences.map((exp, index) => (
					<div key={index} className="flex gap-4 group">
						{/* Logo / Icon Column */}
						<div className="flex-shrink-0 mt-1">
							<div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center border border-border overflow-hidden relative">
								<Image 
									src={exp.logo} 
									alt={`${exp.company} logo`}
									fill
									className="object-cover"
								/>
							</div>
						</div>

						{/* Content Column */}
						<div className="flex-grow">
							<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
								<div className="flex flex-col">
									<a 
										href={exp.companyUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="font-semibold text-foreground hover:text-primary transition-colors"
									>
										{exp.company}
									</a>
									<span className="text-muted-foreground text-sm">
										{exp.role}
									</span>
								</div>
								<span className="text-sm text-muted-foreground tabular-nums">
									{exp.period}
								</span>
							</div>

							<p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-2xl">
								{exp.description}
							</p>

							{/* Minimal Tags */}
							<div className="flex flex-wrap gap-2 mt-3">
								{exp.technologies.map((tech) => (
									<span 
										key={tech} 
										className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded border border-border/50"
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

