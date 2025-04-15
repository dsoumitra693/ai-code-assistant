import { useEffect } from "react";
import ChatArea from "../components/chatarea";
import ChatForm from "../components/chatform";
import Navbar from "../components/navbar";
import { useData } from "../provider/dataprovider";

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


function HomePage() {
  const {getDataByKey, setDataByKey} = useData();
 


  useEffect(() => {

  },[])

  return (
    <div className="h-screen bg-gray-900 text-gray-100 p-4 overflow-hidden">
      <Navbar title="New Chat"/>
      <ChatArea />
      <ChatForm />
    </div>
  );
}

export default HomePage;
