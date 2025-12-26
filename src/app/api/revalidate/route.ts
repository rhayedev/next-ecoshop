import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { tag } = await req.json();
    revalidateTag("/", tag);
    return NextResponse.json({ ok: true, revalidated: tag });
}
