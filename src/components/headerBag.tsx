import { useState } from "react";
import CartSummary from "./CartSummary";
import BagLogo from "./icon/bagLogo";
import { useCart } from '@/app/stores/useCart';

export default function headerBag() {
    const [isOpen, setIsOpen] = useState(false);
    const NumberOfItems = useCart((s) => s.items.length);

    return (
        <div className="relative">
            <div onClick={()=>setIsOpen(!isOpen)} className="hover:cursor-pointer hover:bg-violet-100 trans-fast flex-center pl-2 relative pr-5 rounded-full bg-white">
                <BagLogo
                    className="rounded-full w-10 h-10 p-2 text-violet-600"
                    size={2}
                />
                <span className="absolute -right-2 -top-3 text-sm w-7 flex-center h-7 bg-red-500 text-red-200 font-bold rounded-full">{NumberOfItems}</span>
                <p className="text-violet-500">My bag</p>
            </div>
            <div className={`${isOpen ? 'flex' : 'hidden'} absolute top-full translate-y-8 w-96`}>
                <CartSummary />
            </div>
        </div>
    );
}