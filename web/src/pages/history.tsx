import Navbar from "../components/navbar";

export default function HistoryPage() {
    return (
        <div className="h-screen bg-gray-900 text-gray-100 p-4 overflow-hidden">
            <Navbar title="History"/>
            <h1 className="text-2xl font-bold">History</h1>
            <p className="text-gray-400">This is the history page.</p>
        </div>
    );
}