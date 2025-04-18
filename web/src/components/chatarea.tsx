import { Chat } from "../utils/type";
import { marked } from "marked";
import DOMPurify from "dompurify";

export default function ChatArea({ ai_code_chats }: { ai_code_chats: Chat[] }) {
    return (
        <main className="flex-1 overflow-scroll p-4 h-full">
            <div className="flex flex-col gap-4">
                {ai_code_chats && ai_code_chats.length ? (
                    ai_code_chats.map((chat, index) => {
                        const rawHtml = marked(chat.content) as string;
                        const cleanHtml = DOMPurify.sanitize(rawHtml);

                        return (
                            <div
                                key={index}
                                className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`p-3 rounded-lg max-w-[90%] whitespace-pre-wrap ${
                                        chat.role === "user"
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-700 text-gray-100"
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: cleanHtml }}
                                />
                            </div>
                        );
                    })
                ) : (
                    <div className="h-30 w-full flex items-center justify-center">
                        <p className="text-gray-400 text-center">Start a new chat.</p>
                    </div>
                )}
                <div className="h-30 w-full" />
            </div>
        </main>
    );
}
