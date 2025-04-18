import { useParams, useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
import ChatArea from "../components/chatarea";
import ChatForm from "../components/chatform";
import { useData } from "../provider/dataprovider";
import { useEffect, useRef, useState, useCallback } from "react";
import useAI from "../hooks/useAI";
import useExecuteCode from "../hooks/useExecuteCode";

function ChatPage() {
  const { id } = useParams();
  const { data, addMessage } = useData();
  const [isWaitingForFeedback, setIsWaitingForFeedback] = useState(false);
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const { generatePlan } = useAI();
  const location = useLocation();
  const prompt = location.state?.prompt;
  const { executePlan } = useExecuteCode();

  // Prevent handling the prompt multiple times
  const promptHandled = useRef(false);

  // Handle initial prompt from navigation state
  useEffect(() => {
    if (!prompt || promptHandled.current) return;
    promptHandled.current = true;

    const processPrompt = async () => {
      // setChats((prev) => [...prev, { role: "user", content: prompt }]);
      addMessage(id!, { role: "user", content: prompt });
      setLoading(true);
      const res = await generatePlan(prompt);
      console.log("res", res);

      if (res.success) {
        // setChats((prev) => [
        //   ...prev,
        //   { role: "assistant", content: res.data },
        //   { role: "assistant", content: "Does the plan seem good?" },
        // ]);
        addMessage(id!, {
          role: "assistant",
          content: res.data,
        });

        addMessage(id!, {
          role: "assistant",
          content: "Does the plan seem good?",
        });
        console.log("plan", res.data);
        setPlan(res.data);
        setIsWaitingForFeedback(true);
      }
      setLoading(false);
    };

    processPrompt();
  }, [prompt, generatePlan]);

  // Simple handler for sending messages
  const handleSend = useCallback(
    async (text: string) => {
      const userMessage = { role: "user", content: text };
      // setChats((prev) => [...prev, userMessage])
      addMessage(id!, userMessage);

      // If waiting for feedback, handle "no" responses
      if (isWaitingForFeedback) {
        if (/^no$|^n$/i.test(text.trim())) {
          setIsWaitingForFeedback(false);
          // setChats((prev) => [
          //   ...prev,
          //   {
          //     role: "assistant",
          //     content: "I'm sorry, could you tell me how to fix this?",
          //   },
          // ]);
          addMessage(id!, {
            role: "assistant",
            content: "I'm sorry, could you tell me how to fix this?",
          });
        } else if (/^yes$|^y$/i.test(text.trim())) {
          setIsWaitingForFeedback(false);
          // setChats((prev) => [
          //   ...prev,
          //   {
          //     role: "assistant",
          //     content: "Executing Your Plan.",
          //   },
          // ]);
          addMessage(id!, {
            role: "assistant",
            content: "Executing Your Plan.",
          });
          executePlan(plan);
        } else {
          setIsWaitingForFeedback(true);
          // setChats((prev) => [
          //   ...prev,
          //   {
          //     role: "assistant",
          //     content: "Could you please answer in Yes or No",
          //   },
          // ]);
          addMessage(id!, {
            role: "assistant",
            content: "Could you please answer in Yes or No",
          });
        }
        return;
      }

      setLoading(true);
      const res = await generatePlan(text);

      if (res.success) {
        // setChats((prev) => [
        //   ...prev,
        //   { role: "assistant", content: res.data },
        //   { role: "assistant", content: "Does the plan seem good?" },
        // ]);
        addMessage(id!, {
          role: "assistant",
          content: res.data,
        });
        addMessage(id!, { role: "assistant", content: "Does the plan seem good?" });

        setPlan(res.data);
        setIsWaitingForFeedback(true);
      }
      setLoading(false);
    },
    [generatePlan, isWaitingForFeedback, executePlan, plan]
  );

  console.log(data.individualChat);

  return (
    <div className="h-screen bg-gray-900 text-gray-100 p-4 overflow-hidden">
      <Navbar title={id ?? "New Chat"} />
      <ChatArea ai_code_chats={data.individualChat[id!]} />
      <ChatForm isLoading={loading} onSubmit={handleSend} />
    </div>
  );
}

export default ChatPage;
