
interface ButtonHoverScaleProps {
    title: string;
    Onclick: () => void;
}


export default function ButtonHoverScale({ title, Onclick }: ButtonHoverScaleProps) {

    return (
        <button className="px-4 py-2 relative group" onClick={Onclick}>
            <p>{title}</p>
            <div className="absolute top-0 flex left-0 w-full h-full group-hover:p-0 p-2 trans-cubic">
                <span className="w-full h-full rounded-xl group-hover:bg-violet-500/20 trans-cubic"></span>
            </div>
        </button>
    );
}
