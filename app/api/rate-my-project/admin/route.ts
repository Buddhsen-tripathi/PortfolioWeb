import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// Admin authentication using environment variable
function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get("Authorization");
  const adminKey = process.env.ADMIN_SECRET_KEY;
  
  if (!adminKey) {
    console.error("ADMIN_SECRET_KEY is not set in environment variables");
    return false;
  }
  
  return authHeader === `Bearer ${adminKey}`;
}

// GET - Fetch all projects (including pending) for admin
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let query = supabaseAdmin
      .from("project_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    const { data: projects, error } = await query;

    if (error) {
      console.error("Error fetching projects:", error);
      return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }

    return NextResponse.json({ projects });
  } catch (err) {
    console.error("Error in admin GET:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH - Update a project (rate, add feedback, change status)
export async function PATCH(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ratings, feedback, youtube_video_url, status } = body;

    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    // Validate ratings if provided
    if (ratings) {
      const ratingFields = ['visual_appeal', 'user_experience', 'execution', 'creativity', 'scalability'];
      for (const field of ratingFields) {
        if (ratings[field] !== null && ratings[field] !== undefined) {
          if (ratings[field] < 1 || ratings[field] > 10) {
            return NextResponse.json({ error: `${field} must be between 1 and 10` }, { status: 400 });
          }
        }
      }
    }

    // Build update object
    const updateData: Record<string, any> = {};
    if (ratings !== undefined) updateData.ratings = ratings;
    if (feedback !== undefined) updateData.feedback = feedback;
    if (youtube_video_url !== undefined) updateData.youtube_video_url = youtube_video_url;
    if (status !== undefined) updateData.status = status;
    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabaseAdmin
      .from("project_submissions")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating project:", error);
      return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Project updated successfully!",
      project: data,
    });
  } catch (err) {
    console.error("Error in admin PATCH:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE - Delete a project
export async function DELETE(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("project_submissions")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting project:", error);
      return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully!",
    });
  } catch (err) {
    console.error("Error in admin DELETE:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
