import ChatForm from "../components/chatform";
import Navbar from "../components/navbar";
import { useData } from "../provider/dataprovider";
import { randomId } from "../utils/randomId";
import { useNavigate } from "react-router-dom";


function HomePage() {
  const navigate = useNavigate()
  const {createNewChat} = useData();
  return (
    <div className="h-screen bg-gray-900 text-gray-100 p-4 overflow-hidden">
      <Navbar title="New Chat" />
      <ChatForm onSubmit={(text) => {
        const id = randomId(10, text.slice(0, 20).split(' ').join('-'))
        createNewChat(id)
        navigate(`/chat/${id}`, {
          state: {
            prompt: text
          }
        })
      }} />
    </div>
  );
}

export default HomePage;
