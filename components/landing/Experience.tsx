'use client'

import Image from 'next/image'

const experiences = [
	{
		company: 'Amadeus',
		logo: '/amadeus.jpeg',
		companyUrl: 'https://amadeus.com/en',
		role: 'Software Development Engineer 1',
		location: 'Bengaluru, India',
		period: 'Jul 2023 - Aug 2025',
	},
	{
		company: 'Amadeus',
		logo: '/amadeus.jpeg',
		companyUrl: 'https://amadeus.com/en',
		role: 'Software Development Engineer Intern',
		location: 'Bengaluru, India',
		period: 'Jan 2023 - Jun 2023'
	},
]

export default function Experience() {
	return (
		<section>
			<h2 className="text-2xl font-bold mb-5 text-tracking-tight">
				Work Experience
			</h2>

			<div className="space-y-6">
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
							<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-1 mb-1 mt-1">
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
								<div className="flex flex-col items-start sm:items-end">
									<span className="text-sm text-muted-foreground tabular-nums">
										{exp.location}
									</span>
									<span className="text-sm text-muted-foreground tabular-nums">
										{exp.period}
									</span>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}
