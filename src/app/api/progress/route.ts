import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchId = searchParams.get('searchId');

    if (!searchId) {
      return NextResponse.json({ error: 'Search ID is required' }, { status: 400 });
    }

    // Get search status from database
    const { data: searchData, error } = await supabase
      .from('search_history')
      .select('status, total_results, processed_count')
      .eq('id', searchId)
      .single();

    if (error) {
      console.error('Error fetching search progress:', error);
      return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
    }

    if (!searchData) {
      return NextResponse.json({ error: 'Search not found' }, { status: 404 });
    }

    // Calculate progress percentage
    let progress = 0;
    let message = 'Starting search...';
    let status = searchData.status;

    if (searchData.status === 'completed') {
      progress = 100;
      message = `Search completed! Found ${searchData.total_results || 0} leads.`;
    } else if (searchData.status === 'failed') {
      progress = 0;
      message = 'Search failed. Please try again.';
    } else if (searchData.status === 'running') {
      // Estimate progress based on processed count
      const total = searchData.total_results || 100; // Default estimate
      const processed = searchData.processed_count || 0;
      progress = Math.min(Math.round((processed / total) * 100), 95); // Cap at 95% until complete
      message = `Processing... Found ${processed} leads so far.`;
    }

    return NextResponse.json({
      progress,
      message,
      status,
      total_results: searchData.total_results || 0,
      processed_count: searchData.processed_count || 0
    });

  } catch (error) {
    console.error('Progress API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
