"use client"; // Ensure this is a client component

import { useState } from 'react';
import ChatList from '@/components/chat/ChatList';
import ChatInterface from './[id]/page'; // Import the ChatInterface component

const ChatPage = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null); // State to track selected chat

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId); // Update the selected chat ID
  };

  return (
    <div className="flex h-screen">
      <ChatList onChatSelect={handleChatSelect} />

      {/* Chat Interface */}
      <div className="flex-1 border-l border-gray-200 flex flex-col">
        {selectedChatId ? (
          <ChatInterface params={{ id: selectedChatId }} />
        ) : (
          <div className="flex items-center justify-center flex-1">
            <h2 className="text-lg text-gray-500">Select a chat to start messaging</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
