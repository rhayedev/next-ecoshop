import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}) as unknown as NextResponse);
    const { tag, id } = body ?? {};

    if (tag) {
      revalidateTag(String(tag));
      return NextResponse.json({ ok: true, revalidated: `tag:${tag}` });
    }

    if (id) {
      const t = `news:${id}`;
      revalidateTag(t);
      return NextResponse.json({ ok: true, revalidated: `tag:${t}` });
    }

    return NextResponse.json(
      { ok: false, error: 'Body must include { tag } or { id }' },
      { status: 400 },
    );
  } catch (err: unknown) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
