"use client"; // Ensure this is a client component

import { useState } from 'react';
import ChatList from '@/components/chat/ChatList';
import ChatInterface from './[id]/page'; // Import the ChatInterface component
import { RiArrowLeftLine } from "react-icons/ri"; // Import the back icon

const ChatPage = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null); // State to track selected chat

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId); 
  };

  const handleBack = () => {
    setSelectedChatId(null); // Clear the selected chat to go back to the list
  };

  return (
    <div className="flex h-screen">
      {/* Chat List or Back Button */}
      {selectedChatId ? (
        <div className="flex-none p-4 bg-gray-100 border-r">
          {/* <button 
            onClick={handleBack}
            className="flex items-center space-x-2 text-blue-500"
          >
            <RiArrowLeftLine className="text-2xl" />
            <span>Back to chats</span>
          </button> */}
        </div>
      ) : (
        <ChatList onChatSelect={handleChatSelect} />
      )}

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
