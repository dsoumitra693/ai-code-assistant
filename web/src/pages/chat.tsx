import { useParams } from "react-router-dom";
import ChatArea from "../components/chatarea";
import ChatForm from "../components/chatform";
import Navbar from "../components/navbar";


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
