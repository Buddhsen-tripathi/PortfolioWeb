import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const SITE_VISITOR_SLUG = '_site_visitors';

export async function GET() {
    const { data, error } = await supabaseAdmin
        .from('views')
        .select('count')
        .eq('slug', SITE_VISITOR_SLUG)
        .single();

    if (error && error.code !== 'PGRST116') {
        console.error("Fetch Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ visitors: data?.count || 0 });
}

export async function POST() {
    // Use the existing RPC function to increment
    const { error: incrementError } = await supabaseAdmin
        .rpc('increment_view_count', { post_slug: SITE_VISITOR_SLUG });

    if (incrementError) {
        console.error("Visitor Count Error:", incrementError);
        return NextResponse.json({ error: incrementError.message }, { status: 500 });
    }

    // Fetch the updated count
    const { data, error: fetchError } = await supabaseAdmin
        .from('views')
        .select('count')
        .eq('slug', SITE_VISITOR_SLUG)
        .single();

    if (fetchError) {
        console.error("Fetch Error:", fetchError);
        return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    return NextResponse.json({ visitors: data?.count || 0 });
}
