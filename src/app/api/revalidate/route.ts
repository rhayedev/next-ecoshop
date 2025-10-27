import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const secret = process.env.REVALIDATE_SECRET;

		if (body.secret !== secret) {
			return NextResponse.json(
				{ revalidated: false, message: 'Invalid token' },
				{ status: 401 }
			);
		}

		const path = body.path; // ex: "/news/
		await fetch(`http://localhost:3000${path}`, { method: 'GET', cache: 'no-store' });

		return NextResponse.json({ revalidated: true });
	} catch (err) {
		return NextResponse.json({ revalidated: false, error: (err as Error).message });
	}
}
