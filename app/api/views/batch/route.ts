import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

// GET /api/views/batch?slugs=slug1,slug2,slug3
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const slugsParam = searchParams.get('slugs');
    
    if (!slugsParam) {
        return NextResponse.json({ error: 'No slugs provided' }, { status: 400 });
    }

    const slugs = slugsParam.split(',').filter(Boolean);
    
    if (slugs.length === 0) {
        return NextResponse.json({ views: {} });
    }

    const { data, error } = await supabaseAdmin
        .from('views')
        .select('slug, count')
        .in('slug', slugs);

    if (error) {
        console.error("Batch Fetch Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Convert array to object for easy lookup
    const viewsMap: Record<string, number> = {};
    slugs.forEach(slug => {
        viewsMap[slug] = 0; // Default to 0
    });
    
    data?.forEach(item => {
        viewsMap[item.slug] = item.count;
    });

    return NextResponse.json({ views: viewsMap });
}
