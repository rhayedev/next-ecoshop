import { NextResponse } from 'next/server';

const PRODUCTS = [
    { id: '1', name: 'Chaise en bois', price: 100 },
    { id: '2', name: 'Table de cuisine', price: 250 },
    { id: '3', name: 'Lampe de bureau', price: 50 },
    { id: '4', name: 'Canapé 3 places', price: 500 },
    { id: '5', name: 'Tapis beige', price: 80 },
    { id: '6', name: 'Bureau chêne', price: 220 },
    { id: '7', name: 'Buffet scandinave', price: 330 },
    { id: '8', name: 'Fauteuil cuir', price: 430 },
    { id: '9', name: 'Lit double', price: 600 },
    { id: '10', name: 'Commode blanche', price: 150 },
];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.toLowerCase() ?? '';
    const page = Number(searchParams.get('page') ?? '1');

    const filtered = q
        ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(q))
        : PRODUCTS;

    const perPage = 5;
    const start = (page - 1) * perPage;
    const items = filtered.slice(start, start + perPage);

    return NextResponse.json({ items, total: filtered.length });
}
