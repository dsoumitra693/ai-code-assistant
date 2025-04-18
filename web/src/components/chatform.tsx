import { useState } from "react";

export default function ChatForm({onSubmit, isLoading}:{onSubmit: (text: string) => void, isLoading?: boolean}) {
    const [text, setText] = useState(""); 

    return (
        <form className={`h-22 flex gap-2 absolute top-[82%] left-0 right-0 p-1 bg-gray-800 m-3 rounded`}>
            <textarea
                rows={1}
                placeholder="Type your message..."
                className="flex-1 p-2 rounded resize-none overflow-hidden border-0 outline-hidden"
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        onSubmit(text);
                        setText("");
                    }
                }}
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                }
                }
                onFocus={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                }
                }
                onBlur={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                }
                }
                
            />
            <button
                type="submit"
                aria-label="Send message"
                onClick={(e) => {
                    e.preventDefault();
                    onSubmit(text);
                    setText("");
                }}
                disabled={text.length === 0 || isLoading}
                className={`${text.length > 0 ? "bg-blue-500":"bg-gray-700"} transition-all text-white px-4 py-2 rounded h-10 absolute right-0 bottom-0 m-1`}
            >
                Send
            </button>
        </form>
    );
}