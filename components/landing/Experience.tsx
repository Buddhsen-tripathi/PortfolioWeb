'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const experiences = [
	{
		title: 'Software Development Engineer 1',
		company: 'Amadeus',
		companyUrl: 'https://amadeus.com/en',
		websiteDisplayName: 'amadeus.com',
		period: {
			start: 'Jul 2023',
			end: 'Aug 2025'
		},
		tech: ['Java', 'C++', 'TypeScript', 'React', 'Node.js', 'AWS', 'Docker', 'Kubernetes'],
	},
	{
		title: 'Software Development Engineer Intern',
		company: 'Amadeus',
		companyUrl: 'https://amadeus.com/en',
		websiteDisplayName: 'amadeus.com',
		period: {
			start: 'Jan 2023',
			end: 'Jun 2023'
		},
		tech: ['Java', 'Spring Boot', 'PostgreSQL', 'REST APIs'],
	},
]

interface LinkTextProps {
	href: string
	children: React.ReactNode
	className?: string
}

const LinkText = ({ href, children, className = "" }: LinkTextProps) => (
	<Link
		href={href}
		target="_blank"
		className={`relative inline-flex items-center gap-0.5 text-sm font-normal transition-all after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:gap-1 hover:text-primary hover:after:w-full ${className}`}
	>
		<span>{children}</span>
		<ArrowUpRight className="h-3.5 w-3.5" />
	</Link>
)

export default function Experience() {
	return (
		<section className="space-y-6 duration-1000 animate-in fade-in fill-mode-both animation-delay-700">
			<h2 className="font-serif text-xl font-medium italic leading-snug text-primary">
				experience.
			</h2>

			<div className="space-y-6">
				{experiences.map((exp, index) => (
					<div
						key={index}
						className="flex flex-col gap-3 rounded-lg"
					>
						<div className="flex flex-wrap items-start justify-between gap-2">
							<div>
								<h3 className="font-normal text-primary">
									{exp.title}, {exp.company}
								</h3>
								<div className="flex items-center justify-start gap-1.5 text-sm text-muted-foreground">
									at,{" "}
									<LinkText href={exp.companyUrl}>
										{exp.websiteDisplayName}
									</LinkText>
								</div>
							</div>
							<p className="text-sm font-normal text-muted-foreground">
								{exp.period.start} - {exp.period.end}
							</p>
						</div>

						{/* Tech Stack */}
						{exp.tech && exp.tech.length > 0 && (
							<div className="flex flex-wrap gap-1.5">
								{exp.tech.map((tech, techIndex) => (
									<span
										key={techIndex}
										className="text-xs text-muted-foreground opacity-70 hover:opacity-100 transition-opacity"
									>
										[{tech}]
									</span>
								))}
							</div>
						)}
					</div>
				))}
			</div>
		</section>
	)
}
