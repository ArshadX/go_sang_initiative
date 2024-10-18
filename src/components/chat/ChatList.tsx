"use client"; // Client-side rendering

import { RiSearchLine, RiMore2Line } from 'react-icons/ri';
import { useState } from 'react';
import { useRouter } from 'next/navigation'

interface Chat {
  name: string;
  message: string;
  time: string;
  avatar: string;
  unread: number;
}

interface ChatListProps {
  onChatSelect: (chatId: string) => void; // Specify the function type
}

const ChatList = () => {
  const router = useRouter(); // Initialize the router

  const chats: Chat[] = [
    {
      name: 'Jagvendra',
      message: 'Are you going via chaar murthi?',
      time: '7:47 AM',
      avatar: '/avatar1.jpg',
      unread: 2,
    },
    {
      name: 'Ankita',
      message: 'Can we meet at 5?',
      time: '8:15 AM',
      avatar: '/avatar2.jpg',
      unread: 1,
    },
    {
      name: 'Rahul',
      message: 'No, I will be late today.',
      time: '6:40 AM',
      avatar: '/avatar3.jpg',
      unread: 0,
    },
  ];

  // State to store the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Filter chats based on search query
  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle chat selection and navigation
  const handleChatSelect = (index: number) => {
    // Perform any additional actions if needed
    // onChatSelect(chats[index].name); 

    // Programmatically navigate to the selected chat page
    router.push(`/chat/${index}`);
  };

  return (
    <div className="flex flex-col h-screen w-full lg:w-1/3 bg-white border-r border-gray-200">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold">Chats</h1>
        <div className="ml-auto">
          <RiMore2Line className="text-gray-500 text-xl" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <RiSearchLine className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search chats"
            className="w-full pl-10 p-2 border rounded-lg bg-gray-100"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="overflow-y-auto flex-1">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat, index) => (
            <div
              key={index}
              className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleChatSelect(index)} // Call the handleChatSelect function
            >
              <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-semibold">{chat.name}</p>
                  <p className="text-xs text-gray-500">{chat.time}</p>
                </div>
                <p className="text-sm text-gray-500 truncate">{chat.message}</p>
              </div>
              {chat.unread > 0 && (
                <span className="ml-2 bg-teal-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                  {chat.unread}
                </span>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 p-4">No chats found</div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
