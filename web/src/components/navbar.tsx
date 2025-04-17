import { Link } from "react-router-dom";
import NavIcon from "./navicon";
import { useData } from "../provider/dataprovider";

export default function Navbar({ title }: { title: string }) {
    const { closeTab } = useData();

    return (
        <nav>
            <div className="flex justify-between items-center pb-2">
                <div className="flex items-center bg-gray-800 p-2 rounded">
                    <h4 className="text-sm font-bold">{title}</h4>
                </div>
                <div className="flex items-center space-x-2">
                    <Link to="/">
                        <NavIcon name="plus" title="Add new" />
                    </Link>
                    <Link to="/history">
                        <NavIcon name="history" title="History" />
                    </Link>
                    <NavIcon name="cross" title="Close"
                        onClick={() => closeTab()} />
                </div>
            </div>
        </nav>
    )
}