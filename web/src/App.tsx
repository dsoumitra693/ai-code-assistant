import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import SettingPage from "./pages/setting";
import HistoryPage from "./pages/history";
import ChatPage from "./pages/chat";
import DataProvider from "./provider/dataprovider";

declare global {
  interface Window {
    acquireVsCodeApi: () => {
      postMessage: (message: unknown) => void;
    };
  }
}

export default function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat/:id" element={<ChatPage />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </DataProvider>
  )
}