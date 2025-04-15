const ai_code_chats = [
    {
        "role": "system",
        "content": "You are a helpful assistant."
    },
    {
        "role": "user",
        "content": "Hello! How can I improve my coding skills?"
    },
    {
        "role": "assistant",
        "content": "Practice regularly, work on projects, and learn from others."
    },
    {
        "role": "user",
        "content": "Can you recommend some resources?"
    },
    {
        "role": "assistant",
        "content": "Sure! Websites like Codecademy, freeCodeCamp, and LeetCode are great for learning."
    },
    {
        "role": "user",
        "content": "Thanks! I'll check them out."
    },
    {
        "role": "assistant",
        "content": "You're welcome! Happy coding!"
    },
    {
        "role": "user",
        "content": "What about books?"
    },
    {
        "role": "assistant",
        "content": "Books like 'Clean Code' and 'The Pragmatic Programmer' are excellent."
    },
    {
        "role": "user",
        "content": "Great! I'll add them to my reading list."
    },
    {
        "role": "assistant",
        "content": "Good choice! They will help you a lot."
    }
]

export default function ChatArea() {
    return (
        <main className="flex-1 overflow-scroll p-4 h-full">
            <div className="flex flex-col gap-4">
                {ai_code_chats.map((chat, index) => (
                    <div key={index} className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`p-3 rounded-lg ${chat.role === "user" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-100"}`}>
                            <p>{chat.content}</p>
                        </div>
                    </div>
                ))}
                <div className="h-30 w-full"/>
            </div>
        </main>
    )
}