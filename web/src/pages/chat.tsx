import { useParams } from "react-router-dom";
import ChatArea from "../components/chatarea";
import ChatForm from "../components/chatform";
import Navbar from "../components/navbar";

declare global {
  interface Window {
    acquireVsCodeApi: () => {
      postMessage: (message: unknown) => void;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getState: () => any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setState: (state: any) => void;
    };
  }
}


function ChatPage() {
  const {id } = useParams();
  return (
    <div className="h-screen bg-gray-900 text-gray-100 p-4 overflow-hidden">
      <Navbar title={id ?? "New Chat"}/>
      <ChatArea />
      <ChatForm />
    </div>
  );
}

export default ChatPage;
