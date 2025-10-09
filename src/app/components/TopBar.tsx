export default function TopBar() {
    return (
        <div className="w-full flex items-center justify-center p-5">
            <div className="px-10 rounded-[4rem] h-10 text-sm flex justify-center gap-10">
                <button>Home</button>
                <button>Store</button>
                <button>Search</button>
                <button>Bag</button>
            </div>
        </div>
    );
}
