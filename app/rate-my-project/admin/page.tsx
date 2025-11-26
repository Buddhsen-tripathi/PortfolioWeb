"use client";

import { useState, useEffect, useCallback } from "react";
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
  Trash2, 
  Save, 
  Lock,
  CheckCircle,
  Clock,
  Trophy,
  Eye,
  Twitter,
  Palette,
  Users,
  Wrench,
  Lightbulb,
  TrendingUp
} from "lucide-react";

interface RatingCriteria {
  visual_appeal: number | null;
  user_experience: number | null;
  execution: number | null;
  creativity: number | null;
  scalability: number | null;
}

interface Project {
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

const RatingSlider = ({ 
  label, 
  value, 
  onChange, 
  icon: Icon, 
  description 
}: { 
  label: string; 
  value: number | null; 
  onChange: (value: number | null) => void; 
  icon: any; 
  description: string;
}) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <span className="text-lg font-bold">{value ?? '-'}/10</span>
    </div>
    <p className="text-xs text-muted-foreground">{description}</p>
    <div className="flex items-center gap-2">
      <input
        type="range"
        min="1"
        max="10"
        value={value ?? 5}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
      />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onChange(null)}
        className="text-xs"
      >
        Clear
      </Button>
    </div>
  </div>
);

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{
    ratings: RatingCriteria;
    feedback: string;
    youtube_video_url: string;
    status: string;
  }>({
    ratings: {
      visual_appeal: null,
      user_experience: null,
      execution: null,
      creativity: null,
      scalability: null,
    },
    feedback: "",
    youtube_video_url: "",
    status: "pending",
  });

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/rate-my-project/admin?status=${statusFilter}`, {
        headers: {
          Authorization: `Bearer ${adminKey}`,
        },
      });
      
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      
      const data = await res.json();
      if (data.projects) {
        setProjects(data.projects);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  }, [adminKey, statusFilter]);

  useEffect(() => {
    if (authenticated) {
      fetchProjects();
    }
  }, [authenticated, statusFilter, fetchProjects]);

  const handleLogin = async () => {
    const res = await fetch("/api/rate-my-project/admin?status=all", {
      headers: {
        Authorization: `Bearer ${adminKey}`,
      },
    });
    
    if (res.ok) {
      setAuthenticated(true);
      localStorage.setItem("admin_key", adminKey);
    } else {
      alert("Invalid admin key");
    }
  };

  useEffect(() => {
    const savedKey = localStorage.getItem("admin_key");
    if (savedKey) {
      setAdminKey(savedKey);
      fetch("/api/rate-my-project/admin?status=all", {
        headers: { Authorization: `Bearer ${savedKey}` },
      }).then((res) => {
        if (res.ok) {
          setAuthenticated(true);
        }
      });
    }
  }, []);

  const startEditing = (project: Project) => {
    setEditingId(project.id);
    setEditForm({
      ratings: project.ratings || {
        visual_appeal: null,
        user_experience: null,
        execution: null,
        creativity: null,
        scalability: null,
      },
      feedback: project.feedback || "",
      youtube_video_url: project.youtube_video_url || "",
      status: project.status,
    });
  };

  const saveProject = async (id: string) => {
    try {
      const res = await fetch("/api/rate-my-project/admin", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminKey}`,
        },
        body: JSON.stringify({
          id,
          ...editForm,
        }),
      });

      if (res.ok) {
        setEditingId(null);
        fetchProjects();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to save");
      }
    } catch (err) {
      console.error("Error saving project:", err);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/rate-my-project/admin?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminKey}`,
        },
      });

      if (res.ok) {
        fetchProjects();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete");
      }
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "featured":
        return <Trophy className="w-4 h-4 text-yellow-500" />;
      case "reviewed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
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

  if (!authenticated) {
    return (
      <main className="flex-1 px-6 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <Lock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <CardTitle>Admin Access</CardTitle>
              <CardDescription>Enter your admin key to manage project reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin_key">Admin Key</Label>
                  <Input
                    id="admin_key"
                    type="password"
                    placeholder="Enter admin key..."
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  />
                </div>
                <Button onClick={handleLogin} className="w-full">
                  Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage project submissions and ratings</p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              localStorage.removeItem("admin_key");
              setAuthenticated(false);
              setAdminKey("");
            }}
          >
            Logout
          </Button>
        </div>

        {/* Status Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {["all", "pending", "reviewed", "featured"].map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status !== "all" && (
                <span className="ml-2 text-xs opacity-70">
                  ({projects.filter((p) => status === "all" || p.status === status).length})
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">
                    {projects.filter((p) => p.status === "pending").length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Reviewed</p>
                  <p className="text-2xl font-bold">
                    {projects.filter((p) => p.status === "reviewed").length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Featured</p>
                  <p className="text-2xl font-bold">
                    {projects.filter((p) => p.status === "featured").length}
                  </p>
                </div>
                <Trophy className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : projects.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground">No projects found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(project.status)}
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <Badge variant="outline">{project.status}</Badge>
                        {project.ratings && getOverallScore(project.ratings) && (
                          <Badge className="bg-primary text-primary-foreground">
                            {getOverallScore(project.ratings)}/10
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {editingId !== project.id ? (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => startEditing(project)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Review
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteProject(project.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => saveProject(project.id)}
                            >
                              <Save className="w-4 h-4 mr-1" />
                              Save
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingId(null)}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                    <CardDescription className="flex items-center gap-4">
                      <a 
                        href={`https://twitter.com/${project.twitter_handle.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-500 hover:underline"
                      >
                        <Twitter className="w-3 h-3" />
                        {project.twitter_handle}
                      </a>
                      <span>•</span>
                      <span>{new Date(project.created_at).toLocaleDateString()}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{project.description}</p>

                    <div className="flex gap-4 mb-4">
                      {project.project_url && (
                        <a
                          href={project.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-blue-500 hover:underline"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Site
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-blue-500 hover:underline"
                        >
                          <Github className="w-4 h-4" />
                          GitHub
                        </a>
                      )}
                    </div>

                    {editingId === project.id && (
                      <div className="border-t pt-4 mt-4 space-y-6">
                        {/* Rating Sliders */}
                        <div className="grid gap-6 md:grid-cols-2">
                          <RatingSlider
                            label="Visual Appeal"
                            value={editForm.ratings.visual_appeal}
                            onChange={(v) => setEditForm({
                              ...editForm,
                              ratings: { ...editForm.ratings, visual_appeal: v }
                            })}
                            icon={Palette}
                            description="Clean layout, colors, spacing, typography, scroll-stopping?"
                          />
                          <RatingSlider
                            label="User Experience"
                            value={editForm.ratings.user_experience}
                            onChange={(v) => setEditForm({
                              ...editForm,
                              ratings: { ...editForm.ratings, user_experience: v }
                            })}
                            icon={Users}
                            description="Easy, intuitive, clear messaging, smooth flow, understandable in 5s?"
                          />
                          <RatingSlider
                            label="Execution"
                            value={editForm.ratings.execution}
                            onChange={(v) => setEditForm({
                              ...editForm,
                              ratings: { ...editForm.ratings, execution: v }
                            })}
                            icon={Wrench}
                            description="Quality, attention to detail, no broken logic or half-done features?"
                          />
                          <RatingSlider
                            label="Creativity & Originality"
                            value={editForm.ratings.creativity}
                            onChange={(v) => setEditForm({
                              ...editForm,
                              ratings: { ...editForm.ratings, creativity: v }
                            })}
                            icon={Lightbulb}
                            description="Fresh, unique angle, not copy-paste, shows personality?"
                          />
                          <RatingSlider
                            label="Scalability"
                            value={editForm.ratings.scalability}
                            onChange={(v) => setEditForm({
                              ...editForm,
                              ratings: { ...editForm.ratings, scalability: v }
                            })}
                            icon={TrendingUp}
                            description="Can grow, potential series, attract more users, expand over time?"
                          />
                        </div>

                        {/* Feedback */}
                        <div className="space-y-2">
                          <Label>Feedback</Label>
                          <Textarea
                            value={editForm.feedback}
                            onChange={(e) =>
                              setEditForm({ ...editForm, feedback: e.target.value })
                            }
                            placeholder="Your detailed feedback for this project..."
                            rows={4}
                          />
                        </div>

                        {/* YouTube URL */}
                        <div className="space-y-2">
                          <Label>YouTube Video URL</Label>
                          <Input
                            value={editForm.youtube_video_url}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                youtube_video_url: e.target.value,
                              })
                            }
                            placeholder="https://youtube.com/watch?v=..."
                          />
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                          <Label>Status</Label>
                          <div className="flex gap-2">
                            {["pending", "reviewed", "featured"].map((status) => (
                              <Button
                                key={status}
                                variant={
                                  editForm.status === status ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() =>
                                  setEditForm({ ...editForm, status })
                                }
                              >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Show current ratings if not editing */}
                    {editingId !== project.id && project.ratings && (
                      <div className="border-t pt-4 mt-4">
                        <div className="grid gap-2 md:grid-cols-5 text-sm">
                          {project.ratings.visual_appeal !== null && (
                            <div className="flex items-center gap-1">
                              <Palette className="w-3 h-3 text-muted-foreground" />
                              <span>Visual: {project.ratings.visual_appeal}</span>
                            </div>
                          )}
                          {project.ratings.user_experience !== null && (
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3 text-muted-foreground" />
                              <span>UX: {project.ratings.user_experience}</span>
                            </div>
                          )}
                          {project.ratings.execution !== null && (
                            <div className="flex items-center gap-1">
                              <Wrench className="w-3 h-3 text-muted-foreground" />
                              <span>Exec: {project.ratings.execution}</span>
                            </div>
                          )}
                          {project.ratings.creativity !== null && (
                            <div className="flex items-center gap-1">
                              <Lightbulb className="w-3 h-3 text-muted-foreground" />
                              <span>Creative: {project.ratings.creativity}</span>
                            </div>
                          )}
                          {project.ratings.scalability !== null && (
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-3 h-3 text-muted-foreground" />
                              <span>Scale: {project.ratings.scalability}</span>
                            </div>
                          )}
                        </div>
                        {project.feedback && (
                          <p className="text-sm text-muted-foreground mt-2">
                            <span className="font-medium">Feedback:</span> {project.feedback}
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
