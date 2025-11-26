"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, 
  Github, 
  Send, 
  CheckCircle, 
  Clock, 
  Trophy,
  Palette,
  Users,
  Wrench,
  Lightbulb,
  TrendingUp,
  Twitter,
  MessageSquare,
  Play,
  Video,
  Info
} from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";

interface RatingCriteria {
  visual_appeal: number | null;
  user_experience: number | null;
  execution: number | null;
  creativity: number | null;
  scalability: number | null;
}

interface RatedProject {
  id: string;
  name: string;
  project_url: string | null;
  github_url: string | null;
  twitter_handle: string;
  description: string;
  ratings: RatingCriteria | null;
  feedback: string | null;
  youtube_video_url: string | null;
  status: "pending" | "reviewed" | "featured";
  created_at: string;
}

const RatingBar = ({ label, value, icon: Icon, description }: { label: string; value: number; icon: any; description: string }) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <span className="text-muted-foreground">{label}</span>
        <Tooltip content={<span className="max-w-xs">{description}</span>}>
          <button type="button" className="text-muted-foreground/60 hover:text-muted-foreground transition-colors">
            <Info className="w-3.5 h-3.5" />
          </button>
        </Tooltip>
      </div>
      <span className="font-semibold">{value}/10</span>
    </div>
    <div className="h-2 bg-muted rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value * 10}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full rounded-full bg-primary"
      />
    </div>
  </div>
);

const ProjectPreview = ({ url }: { url: string }) => {
  const [loaded, setLoaded] = useState(false);
  
  // Extract domain for display
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  return (
    <div className="relative w-full h-48 sm:h-56 bg-muted rounded-t-lg overflow-hidden border-b">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground text-sm">
            Loading preview...
          </div>
        </div>
      )}
      <iframe
        src={url}
        title="Project Preview"
        className={`w-[200%] h-[200%] scale-50 origin-top-left border-0 pointer-events-none ${loaded ? 'opacity-100' : 'opacity-0'}`}
        sandbox="allow-scripts allow-same-origin"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
        <p className="text-white text-xs truncate">{getDomain(url)}</p>
      </div>
    </div>
  );
};

export default function RateMyProjectPage() {
  const [activeTab, setActiveTab] = useState<"submit" | "showcase">("showcase");
  const [projects, setProjects] = useState<RatedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    project_url: "",
    github_url: "",
    twitter_handle: "",
    description: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/rate-my-project");
      const data = await res.json();
      if (data.projects) {
        // Sort by overall rating (highest first), unrated projects go to the end
        const sorted = [...data.projects].sort((a: RatedProject, b: RatedProject) => {
          const scoreA = getOverallScoreValue(a.ratings);
          const scoreB = getOverallScoreValue(b.ratings);
          if (scoreA === null && scoreB === null) return 0;
          if (scoreA === null) return 1;
          if (scoreB === null) return -1;
          return scoreB - scoreA;
        });
        setProjects(sorted);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper to get numeric score for sorting
  const getOverallScoreValue = (ratings: RatingCriteria | null): number | null => {
    if (!ratings) return null;
    const values = [
      ratings.visual_appeal,
      ratings.user_experience,
      ratings.execution,
      ratings.creativity,
      ratings.scalability,
    ].filter((v): v is number => v !== null);
    if (values.length === 0) return null;
    return values.reduce((a, b) => a + b, 0) / values.length;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    // Validate at least one URL is provided
    if (!formData.project_url && !formData.github_url) {
      setError("Please provide either a live site URL or GitHub URL");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/rate-my-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit project");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        project_url: "",
        github_url: "",
        twitter_handle: "",
        description: "",
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const getOverallScore = (ratings: RatingCriteria | null) => {
    if (!ratings) return null;
    const values = [
      ratings.visual_appeal,
      ratings.user_experience,
      ratings.execution,
      ratings.creativity,
      ratings.scalability,
    ].filter((v): v is number => v !== null);
    if (values.length === 0) return null;
    return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "featured":
        return (
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
            <Trophy className="w-3 h-3 mr-1" /> Featured
          </Badge>
        );
      case "reviewed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            <CheckCircle className="w-3 h-3 mr-1" /> Reviewed
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </Badge>
        );
    }
  };

  return (
    <main className="flex-1 px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Rate My Project
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            Submit your project and get honest feedback across 5 key criteria.
          </p>
          
          {/* Criteria Overview */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6">
            <Badge variant="outline" className="gap-1 text-xs sm:text-sm">
              <Palette className="w-3 h-3" /> Visual
            </Badge>
            <Badge variant="outline" className="gap-1 text-xs sm:text-sm">
              <Users className="w-3 h-3" /> UX
            </Badge>
            <Badge variant="outline" className="gap-1 text-xs sm:text-sm">
              <Wrench className="w-3 h-3" /> Execution
            </Badge>
            <Badge variant="outline" className="gap-1 text-xs sm:text-sm">
              <Lightbulb className="w-3 h-3" /> Creativity
            </Badge>
            <Badge variant="outline" className="gap-1 text-xs sm:text-sm">
              <TrendingUp className="w-3 h-3" /> Scalability
            </Badge>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-8">
          <Button
            variant={activeTab === "showcase" ? "default" : "outline"}
            onClick={() => setActiveTab("showcase")}
            className="gap-1.5 sm:gap-2 text-xs sm:text-sm px-3 sm:px-4"
            size="sm"
          >
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Project</span> Showcase
          </Button>
          <Button
            variant={activeTab === "submit" ? "default" : "outline"}
            onClick={() => setActiveTab("submit")}
            className="gap-1.5 sm:gap-2 text-xs sm:text-sm px-3 sm:px-4"
            size="sm"
          >
            <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Submit <span className="hidden xs:inline">Your Project</span>
          </Button>
        </div>

        {/* Submit Form */}
        {activeTab === "submit" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            {submitted ? (
              <Card className="border-green-200 dark:border-green-800">
                <CardContent className="pt-6 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Project Submitted!</h2>
                  <p className="text-muted-foreground mb-4">
                    Thanks for submitting your project! I&apos;ll review it soon and you might see it
                    featured in an upcoming video.
                  </p>
                  <Button onClick={() => setSubmitted(false)}>Submit Another Project</Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Submit Your Project</CardTitle>
                  <CardDescription>
                    Fill out the form below to submit your project for review. At least one URL (site or GitHub) is required.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="twitter_handle">Twitter/X Handle *</Label>
                      <div className="relative">
                        <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="twitter_handle"
                          placeholder="@username"
                          className="pl-10"
                          value={formData.twitter_handle}
                          onChange={(e) =>
                            setFormData({ ...formData, twitter_handle: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="project_url">Live Site URL</Label>
                        <Input
                          id="project_url"
                          type="url"
                          placeholder="https://myproject.com"
                          value={formData.project_url}
                          onChange={(e) =>
                            setFormData({ ...formData, project_url: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="github_url">GitHub URL</Label>
                        <Input
                          id="github_url"
                          type="url"
                          placeholder="https://github.com/username/repo"
                          value={formData.github_url}
                          onChange={(e) =>
                            setFormData({ ...formData, github_url: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground -mt-2">
                      * At least one URL is required
                    </p>

                    <div className="space-y-2">
                      <Label htmlFor="description">Project Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Tell me about your project, what it does, and what makes it special..."
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        rows={4}
                        required
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-500">{error}</p>
                    )}

                    <Button type="submit" className="w-full" disabled={submitting}>
                      {submitting ? "Submitting..." : "Submit Project"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}

        {/* Project Showcase */}
        {activeTab === "showcase" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Loading projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    No projects have been reviewed yet. Be the first to submit!
                  </p>
                  <Button onClick={() => setActiveTab("submit")}>Submit Your Project</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`h-full flex flex-col overflow-hidden ${project.status === "featured" ? "ring-2 ring-yellow-400" : ""}`}>
                      {/* Project Preview */}
                      {project.project_url && (
                        <ProjectPreview url={project.project_url} />
                      )}
                      
                      <CardHeader className="pb-3 px-4 sm:px-6">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <CardTitle className="text-base sm:text-lg truncate">{project.name}</CardTitle>
                            <a 
                              href={`https://twitter.com/${project.twitter_handle.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs sm:text-sm text-blue-500 hover:underline flex items-center gap-1"
                            >
                              <Twitter className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">{project.twitter_handle}</span>
                            </a>
                          </div>
                          <div className="flex flex-col items-end gap-1.5 sm:gap-2 flex-shrink-0">
                            {getStatusBadge(project.status)}
                            {project.ratings && getOverallScore(project.ratings) && (
                              <div className="text-2xl font-bold text-primary">
                                {getOverallScore(project.ratings)}<span className="text-sm text-muted-foreground">/10</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="flex-1 flex flex-col pt-0 px-4 sm:px-6">
                        <p className="text-xs sm:text-sm text-muted-foreground mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Rating Bars */}
                        {project.ratings && (
                          <div className="space-y-2.5 sm:space-y-3 mb-4">
                            {project.ratings.visual_appeal !== null && (
                              <RatingBar 
                                label="Visual Appeal" 
                                value={project.ratings.visual_appeal} 
                                icon={Palette}
                                description="Clean layout, good use of colors, spacing, typography. Is it scroll-stopping at first glance?"
                              />
                            )}
                            {project.ratings.user_experience !== null && (
                              <RatingBar 
                                label="User Experience" 
                                value={project.ratings.user_experience} 
                                icon={Users}
                                description="Easy and intuitive to use. Clear messaging, smooth flow, understandable in 5 seconds?"
                              />
                            )}
                            {project.ratings.execution !== null && (
                              <RatingBar 
                                label="Execution" 
                                value={project.ratings.execution} 
                                icon={Wrench}
                                description="Quality of work and attention to detail. No broken logic, sloppy writing, or half-done features?"
                              />
                            )}
                            {project.ratings.creativity !== null && (
                              <RatingBar 
                                label="Creativity" 
                                value={project.ratings.creativity} 
                                icon={Lightbulb}
                                description="Does it feel fresh? Unique angle, not just a copy-paste trend, shows personality or innovative thinking?"
                              />
                            )}
                            {project.ratings.scalability !== null && (
                              <RatingBar 
                                label="Scalability" 
                                value={project.ratings.scalability} 
                                icon={TrendingUp}
                                description="Can this project grow? Potential to become a series, attract more users, expand well over time?"
                              />
                            )}
                          </div>
                        )}

                        {project.feedback && (
                          <div className="bg-muted/50 rounded-lg p-2.5 sm:p-3 mb-4 text-xs sm:text-sm">
                            <p className="font-medium mb-1 flex items-center gap-1.5">
                              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                              Feedback
                            </p>
                            <p className="text-muted-foreground">{project.feedback}</p>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 mt-auto pt-3 sm:pt-4">
                          {project.project_url && (
                            <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm h-8 sm:h-9">
                              <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
                                Live
                              </a>
                            </Button>
                          )}
                          {project.github_url && (
                            <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm h-8 sm:h-9">
                              <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                                <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
                                Code
                              </a>
                            </Button>
                          )}
                          {project.youtube_video_url && (
                            <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm h-8 sm:h-9 text-red-500 border-red-200 hover:bg-red-50 dark:hover:bg-red-950">
                              <a href={project.youtube_video_url} target="_blank" rel="noopener noreferrer">
                                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 fill-current" />
                                <span className="hidden xs:inline">Watch </span>Review
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
}
