import { Key } from "react";
import Navbar from "../components/navbar";
import { useData } from "../provider/dataprovider";

export default function HistoryPage() {
    const { data } = useData();

    return (
        <div className="h-screen bg-gray-900 text-gray-100 p-4 overflow-hidden">
            <Navbar title="History" />
            {!data ?
                <>
                    <h1 className="text-2xl font-bold">History</h1>
                    <p className="text-gray-400">This is the history page.</p>
                </>
                :
                <div className="mt-4">
                    {data && data?.chatHistory.length === 0 ? (
                        <p className="text-gray-500">No chat history available.</p>
                    ) : (
                        <ul className="list-disc pl-5">
                            {data?.chatHistory.map((chat: string, index: Key) => (
                                <li key={index} className="text-gray-300">
                                    {chat}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>}
        </div>
    );
}