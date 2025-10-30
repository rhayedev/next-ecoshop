'use client';
import { useCart } from '@/app/stores/useCart';
import CrossLogo from './icon/crossLogo';
import PlusLogo from './icon/plusLogo';
import MinusLogo from './icon/minusLogo';
import TrashLogo from './icon/trashLogo';

export default function CartSummary() {
    const items = useCart((s) => s.items);
    const total = useCart((s) => s.total());
    const clear = useCart((s) => s.clear);

    if (items.length === 0) return <p className='bg-gray-50 border p-4 rounded-lg text-black'>Votre panier est vide</p>;

    return (
        <div className="p-4 rounded-xl bg-[#0c0c0c] w-full ring-offset-white text-white">
            <div className='justify-between flex relative'>
                <h2 className="font-semibold w-full flex-center mb-4">Panier</h2>
                <CrossLogo className='absolute right-0' />
            </div>
            <ul className='gap-2 flex flex-col'>
                {items.map((i) => (
                    <li className='bg-violet-100/20 flex flex-col gap-2 shadow text-white rounded-xl p-3' key={i.id}>
                        <p>{i.name}</p>
                        <p className='text-sm'>{i.price} €</p>
                        <div className='flex justify-between'>
                            <div className='flex gap-4 items-center'>
                            <button><PlusLogo size={34} className='p-2 rounded-md bg-violet-100/10 text-violet-500'/></button>
                            <p>{i.qty}</p>
                                <button><MinusLogo size={34} className='p-2 rounded-md bg-violet-100/10 text-violet-500' /></button>
                            </div>
                            <button><TrashLogo size={34} className='p-2 rounded-md bg-red-100/10 text-red-500' /></button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className='flex justify-between items-center mt-5'>
                <p className="mt-2 font-bold">Total : {total} €</p>
                <button onClick={clear}><TrashLogo size={34} className='p-2 rounded-md bg-red-100/20 text-red-500' /></button>

            </div>
        </div>
    );
}
