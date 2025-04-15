import { ICONS } from "../constants";

interface NavIconProps {
    name: keyof typeof ICONS;
    title?: string;
    onClick?: () => void;
    className?: string;
}


export default function NavIcon({
    name,
    title,
    onClick=() => {},
}:NavIconProps) {
     const Icon = ICONS[name];
    return(
        <button
            onClick={onClick}
            className={'flex items-center p-2 rounded bg-gray-800 hover:bg-gray-700 transition-colors duration-200 ' + (title ? 'tooltip' : '')}
            data-tooltip={title}
            data-tooltip-id={title}
            data-tooltip-content={title}
            data-tooltip-place="bottom"
            data-tooltip-type="dark"
            data-tooltip-effect="solid"
            data-tooltip-variant="dark"
            title={title}
        >
            <span className="text-lg"><Icon/></span>
        </button>
    )
}