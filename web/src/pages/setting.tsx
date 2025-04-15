import Navbar from "../components/navbar";

export default function SettingPage() {
    return (
        <div className="h-screen bg-gray-900 text-gray-100 p-4 overflow-hidden">
            <Navbar title="Settings"/>
            <h1 className="text-2xl font-bold">Setting</h1>
            <p className="text-gray-400">This is the settings page.</p>
        </div>
    );
}