import React from "react";

type SearchLogoProps = {
    size?: number | string;
    className?: string;
};

const MinusLogo: React.FC<SearchLogoProps> = ({
    size = 24,
    className = "",
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            width={size}
            height={size}
            viewBox="0 0 640 640"
            fill="currentColor"
        >
            <path d="M96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320z" />
        </svg>
    );
};

export default MinusLogo;
