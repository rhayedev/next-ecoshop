import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { tag } = await req.json();
    if (!tag) {
      return NextResponse.json({ ok: false, error: 'Tag manquant' }, { status: 400 });
    }

    revalidateTag(tag);
    return NextResponse.json({ ok: true, revalidated: tag });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Erreur serveur' }, { status: 500 });
  }
}