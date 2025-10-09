import HearthLogo from "./icon/heartLogo";

export default function ProductCard() {
    return (
        <div className="w-72 aspect-[9:16] flex group flex-col gap-2 rounded relative">
            <div className="overflow-hidden rounded">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVfHORQFLyUf_rNove-xUmxIskDeMJ63REz_YIMQ6S0vCyQdkBvJos4igKspvCgpqnpy8h0xM--1uckzZIxDgyoHy37-MowkF-YzvVx8"
                    alt=""
                    className="grayscale-75 hover:grayscale-0 group-hover:rounded-t-[24px] rounded-b-xl hover:scale-110 cursor-pointer z-0 transition-all duration-300 ease-in-out rounded-t-[4px]"
                />
            </div>
            <div className="flex gap-2 relative z-10">
                <button className="group-hover:rounded-bl-[24px] rounded-bl-[4px] rounded-t-xl w-full py-2 hover:cursor-pointer bg-orange-500">
                    Add to Bag
                </button>
                <button className="group-hover:rounded-br-[24px] rounded-br-[4px] flex items-center justify-center group rounded-t-xl text-white w-fit px-5 hover:cursor-pointer bg-orange-800">
                    <HearthLogo className="group-hover:text-red-200 duration-300 ease-in-out transition-all" />
                </button>
            </div>
        </div>
    );
}
