import SearchLogo from "./icon/searchLogo";

export default function HeaderSearch() {
    return (
        <div className="group flex-center relative min-w-10 min-h-10">
            <SearchLogo
                className="rounded-full absolute left-0 p-3 w-10 h-10 text-black bg-white"
                size={5}
            />
            <input
                type="search"
                placeholder="Cats"
                className="bg-white overflow-hidden h-10 w-full sm:group-hover:w-40 sm:pl-0 pl-10 sm:group-hover:pr-4 group-hover:pl-10 sm:w-0 trans-fast outline-0 text-[#5f1a84] trans-fast rounded-full"
            />
        </div>
    );
}