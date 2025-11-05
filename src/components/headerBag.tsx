import { useEffect, useRef, useState } from "react";
import CartSummary from "./CartSummary";
import BagLogo from "./icon/bagLogo";
import { useCart } from '@/app/stores/useCart';
import ChevronDown from "./icon/chevronDown";

export default function headerBag() {
    const [isOpen, setIsOpen] = useState(false);
    const NumberOfItems = useCart((s) => s.items.length);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="hover:cursor-pointer bg-violet-500/10 text-violet-500 trans-fast flex-center pl-2 relative pr-5 rounded-xl hover:bg-violet-500/20">
                <BagLogo
                    className="rounded-full w-10 h-10 p-2"
                    size={2}
                />
                <span className="absolute -right-2 -top-3 text-sm w-7 flex-center h-7 bg-red-500 text-red-200 font-bold rounded-full">{NumberOfItems}</span>
                <p className="">My bag</p>
                <ChevronDown
                    className={`w-3 ml-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </div>
            <div className={`${isOpen ? 'flex' : 'hidden'} absolute top-full shadow-md p-2 border-gray-700 border rounded-xl bg-[#171717] translate-y-2 w-96`}>
                <CartSummary />
            </div>
        </div>
    );
}