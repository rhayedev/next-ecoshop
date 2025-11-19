import { NextResponse } from 'next/server';
import { Products } from '@/app/lib/products';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pageParam = searchParams.get('page');
  const q = searchParams.get('q')?.toLowerCase() ?? null;

  const all = await Products.list();
  let filtered = all;

  if (q) {
    filtered = all.filter((p) => p.name.toLowerCase().includes(q));
  }

  if (!pageParam) {
    return NextResponse.json(filtered);
  }

  const PAGE_SIZE = 6;
  const page = parseInt(pageParam, 10) || 1;
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const items = filtered.slice(start, end);

  return NextResponse.json({
    items,
    page,
    totalItems: filtered.length,
    totalPages: Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)),
  });
}
