"use client"; // Use client-side rendering

import { useEffect, useState } from 'react';
import ChatInterface from '@/components/chat/ChatInterface';
interface ChatInterfaceProps {
  params: { id: string };
}

const Page = ({ params }: ChatInterfaceProps) => {
  const { id } = params; // Extract the chat ID from params
  const [selectedChatId, setSelectedChatId] = useState(id);
console.log(params);
  useEffect(() => {
   
  }, [selectedChatId]);



  // Sample chat messages
  const sampleChatMessages = [
    { id: '1', sender: 'receiver', message: 'Hey, are you still offering a ride?', time: '7:46 AM' },
    { id: '2', sender: 'user', message: 'Yes, but I am going via NH24.', time: '7:48 AM' },
    { id: '3', sender: 'receiver', message: 'That works for me! Where can I join?', time: '7:49 AM' },
    { id: '4', sender: 'user', message: 'Meet me at the main square near Chaar Murthi.', time: '7:50 AM' },
    { id: '5', sender: 'receiver', message: 'Okay, I’ll be there in 10 minutes.', time: '7:52 AM' },
    { id: '6', sender: 'user', message: 'Great, see you soon!', time: '7:53 AM' },
  ];

  return (
    <div>
       
      <ChatInterface
        chatId={selectedChatId}
        chatUserName="Vimal Sharma"
        chatMessages={sampleChatMessages}
        isRideAvailable={false}  
      />
    </div>
  );
};

export default Page;
