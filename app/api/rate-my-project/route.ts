import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// GET - Fetch all reviewed/featured projects (public)
export async function GET() {
  try {
    const { data: projects, error } = await supabaseAdmin
      .from("project_submissions")
      .select("id, name, project_url, github_url, twitter_handle, description, ratings, feedback, youtube_video_url, status, created_at")
      .in("status", ["reviewed", "featured"])
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
      return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }

    return NextResponse.json({ projects });
  } catch (err) {
    console.error("Error in GET /api/rate-my-project:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST - Submit a new project
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      project_url,
      github_url,
      twitter_handle,
      description,
    } = body;

    // Validation
    if (!name || !twitter_handle || !description) {
      return NextResponse.json(
        { error: "Name, Twitter handle, and description are required" },
        { status: 400 }
      );
    }

    // At least one URL required
    if (!project_url && !github_url) {
      return NextResponse.json(
        { error: "At least one URL (site or GitHub) is required" },
        { status: 400 }
      );
    }

    // URL validation (if provided)
    if (project_url && !isValidUrl(project_url)) {
      return NextResponse.json({ error: "Invalid project URL" }, { status: 400 });
    }
    if (github_url && !isValidUrl(github_url)) {
      return NextResponse.json({ error: "Invalid GitHub URL" }, { status: 400 });
    }

    // Clean twitter handle
    const cleanTwitterHandle = twitter_handle.trim().startsWith('@') 
      ? twitter_handle.trim() 
      : `@${twitter_handle.trim()}`;

    // Insert the project
    const { data, error } = await supabaseAdmin
      .from("project_submissions")
      .insert([
        {
          name: name.trim(),
          project_url: project_url?.trim() || null,
          github_url: github_url?.trim() || null,
          twitter_handle: cleanTwitterHandle,
          description: description.trim(),
          status: "pending",
          ratings: null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to submit project" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Project submitted successfully!",
      project: data,
    });
  } catch (err) {
    console.error("Error in POST /api/rate-my-project:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}
