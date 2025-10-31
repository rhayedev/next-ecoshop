'use client';
import { useCart, CartState, CartItem } from '@/app/stores/useCart';
import CrossLogo from './icon/crossLogo';
import PlusLogo from './icon/plusLogo';
import MinusLogo from './icon/minusLogo';
import TrashLogo from './icon/trashLogo';

export default function CartSummary() {
    const items = useCart((s: CartState) => s.items);
    const total = useCart((s: CartState) => s.total());
    const clear = useCart((s: CartState) => s.clear);
    const add = useCart((s: CartState) => s.add);
    const remove = useCart((s: CartState) => s.remove);

    if (items.length === 0)
        return (
            <div className="p-4 rounded-xl bg-[#0c0c0c] shadow-md w-full ring-offset-white text-white">
                <p className="bg-violet-100/20 p-4 rounded-lg">
                Votre sac est vide
            </p>
            </div>
        );

    function increment(item: CartItem) {
        add({ id: item.id, name: item.name, price: item.price }, 1);
    }

    function decrement(item: CartItem) {
        if (item.qty > 1) {
            add({ id: item.id, name: item.name, price: item.price }, -1);
        } else {
            remove(item.id);
        }
    }

    function removeItem(item: CartItem) {
        remove(item.id);
    }

    return (
        <div className="p-4 rounded-xl bg-[#0c0c0c] shadow-md w-full ring-offset-white text-white">
            <div className="justify-between flex relative">
                <h2 className="font-semibold w-full flex-center mb-4">My bag</h2>
            </div>

            <ul className="gap-2 flex flex-col">
                {items.map((i) => (
                    <li
                        className="bg-violet-100/20 flex gap-5 shadow text-white rounded-xl p-3"
                        key={i.id}
                    >
                        <div className="h-24 p-5 aspect-square rounded-xl bg-gray-100">
                            <img
                                src="https://cdn.cultura.com/cdn-cgi/image/width=830/media/pim/6925281988219.png"
                                alt=""
                                className="grayscale-100 group-hover:grayscale-0 rounded-b-xl cursor-pointer trans-fast rounded-t-[4px]"
                            />
                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <p>{i.name}</p>
                            <p className="text-sm">{i.price} €</p>
                            <div className="flex justify-between">
                                <div className="flex gap-4 items-center">
                                    <button onClick={() => decrement(i)}>
                                        <MinusLogo
                                            size={34}
                                            className="p-2 rounded-md bg-violet-100/10 text-violet-500"
                                        />
                                    </button>
                                    <p>{i.qty}</p>
                                    <button onClick={() => increment(i)}>
                                        <PlusLogo
                                            size={34}
                                            className="p-2 rounded-md bg-violet-100/10 text-violet-500"
                                        />
                                    </button>
                                </div>
                                <button onClick={() => removeItem(i)}>
                                    <TrashLogo
                                        size={34}
                                        className="p-2 rounded-md bg-red-100/10 text-red-500"
                                    />
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="flex justify-between items-center mt-5">
                <p className="mt-2 font-bold">Total : {total} €</p>
                <button onClick={clear}>
                    <TrashLogo
                        size={34}
                        className="p-2 rounded-md bg-red-100/20 text-red-500"
                    />
                </button>
            </div>
        </div>
    );
}
