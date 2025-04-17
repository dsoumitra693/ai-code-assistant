import { useEffect } from "react";
import ChatArea from "../components/chatarea";
import ChatForm from "../components/chatform";
import Navbar from "../components/navbar";
import { useData } from "../provider/dataprovider";
import { randomId } from "../utils/randomId";


function HomePage() {
  const { createNewChat } = useData();

  useEffect(() => {
    createNewChat(randomId(8, 'chat-'));
  }, []);

  return (
    <div className="h-screen bg-gray-900 text-gray-100 p-4 overflow-hidden">
      <Navbar title="New Chat" />
      <ChatArea />
      <ChatForm />
    </div>
  );
}

export default HomePage;
