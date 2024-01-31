'use client';
 
import { useChat } from 'ai/react';
 
export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const mongoHandleSubmit = async () => {
    try {

        const response = await fetch("/api/chat/createNewChat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messages
            }),
        });

        const data = await response.json();
        console.log(data)

    } catch (error) {
        console.error("Error submitting the chat:", error);
    }
};
const finalSubmit = (e: any) => {
  e.preventDefault();
  handleSubmit(e);
  mongoHandleSubmit();
};

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}
 
      <form onSubmit={finalSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}